/**
 * Create a GitHub repo and push this workspace to it.
 *
 *   GITHUB_TOKEN=ghp_xxx node push-github.mjs [repo-name] [public|private]
 *
 * Defaults: repo "aimirah", private. The token is read from the environment and
 * passed to git as a per-command header, so it never lands in .git/config.
 */
import { execSync } from "node:child_process";

const token = process.env.GITHUB_TOKEN;
const name = process.argv[2] || "aimirah";
const isPublic = (process.argv[3] || "private") === "public";

if (!token) {
  console.error("GITHUB_TOKEN is not set.");
  console.error("GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)");
  console.error("Scope needed: repo  (or a fine-grained token with Contents: read/write)");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

const run = cmd => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

async function api(path, init = {}) {
  const res = await fetch(`https://api.github.com${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(`${res.status} — ${body.message || res.statusText}`), { status: res.status, body });
  return body;
}

const me = await api("/user");
console.log(`account:  ${me.login}`);

let repo;
try {
  repo = await api("/user/repos", {
    method: "POST",
    body: JSON.stringify({
      name,
      private: !isPublic,
      description: "Aimirah | MI4 Inc — React Bits component showcase and 4IM/Flux fluid studio",
    }),
  });
  console.log(`created:  ${repo.full_name} (${isPublic ? "public" : "private"})`);
} catch (error) {
  if (error.status !== 422) throw error;
  repo = await api(`/repos/${me.login}/${name}`);
  console.log(`reusing:  ${repo.full_name} (already exists)`);
}

const url = `https://github.com/${repo.full_name}.git`;

try {
  run(`git remote remove origin`);
} catch {
  /* no remote yet */
}
run(`git remote add origin ${url}`);
run(`git branch -M main`);

const push = execSync(
  `git -c http.extraheader="AUTHORIZATION: Bearer ${token}" push -u origin main`,
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
);

console.log(push.trim().split("\n").slice(-1)[0]);
console.log(`\nREPO URL: ${repo.html_url}`);
