/**
 * Deploy site-static/ to Netlify with nothing but a personal access token.
 *
 *   NETLIFY_TOKEN=<your token> node deploy-netlify.mjs [subdomain]
 *
 * Creates the site, uploads the prebuilt zip, prints the live URL.
 * Token is read from the environment only — never written to disk.
 */
import { readFileSync } from "node:fs";

const token = process.env.NETLIFY_TOKEN;
const wanted = process.argv[2] || "";
const zip = readFileSync(new URL("./aimirah-static.zip", import.meta.url));

if (!token) {
  console.error("NETLIFY_TOKEN is not set.");
  console.error("Netlify → User settings → Applications → Personal access tokens → New access token");
  process.exit(1);
}

const auth = { Authorization: `Bearer ${token}` };

async function api(path, init = {}) {
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    ...init,
    headers: { ...auth, ...(init.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${body.message || JSON.stringify(body)}`);
  }
  return body;
}

/* Reuse the site if it already exists, otherwise create it. */
async function resolveSite(name) {
  if (!name) return api("/sites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const existing = await api(`/sites?name=${encodeURIComponent(name)}`);
  if (Array.isArray(existing) && existing.length) return existing[0];

  try {
    return await api("/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    const again = await api(`/sites?name=${encodeURIComponent(name)}`);
    if (Array.isArray(again) && again.length) return again[0];
    throw error;
  }
}

const site = await resolveSite(wanted);

console.log(`site:     ${site.name} (${site.id})`);

const deploy = await api(`/sites/${site.id}/deploys`, {
  method: "POST",
  headers: { "Content-Type": "application/zip" },
  body: zip,
});

console.log(`deploy:   ${deploy.state} (${deploy.id})`);
console.log(`LIVE URL: ${site.ssl_url || site.url}`);
