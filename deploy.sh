#!/usr/bin/env bash
# Full pipeline: static export -> zip -> Netlify.  Usage: ./deploy.sh [subdomain]
set -euo pipefail
cd "$(dirname "$0")"

NAME="${1:-aimirah-mi4}"
TOKEN="${NETLIFY_TOKEN:-$(cat /tmp/ntoken 2>/dev/null || true)}"
[ -n "$TOKEN" ] || { echo "Set NETLIFY_TOKEN, or put it in /tmp/ntoken" >&2; exit 1; }

STATIC_EXPORT=1 npm run build
rm -rf site-static
cp -r out site-static

python3 - <<'PY'
import os, zipfile
root = "site-static"
if os.path.exists("aimirah-static.zip"):
    os.remove("aimirah-static.zip")
n = 0
with zipfile.ZipFile("aimirah-static.zip", "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for dp, _, fs in os.walk(root):
        for f in fs:
            full = os.path.join(dp, f)
            z.write(full, os.path.relpath(full, root))
            n += 1
print(f"zipped {n} files")
PY

NETLIFY_TOKEN="$TOKEN" node deploy-netlify.mjs "$NAME"
