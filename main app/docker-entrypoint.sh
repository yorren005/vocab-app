#!/bin/sh
set -e

echo "🚀 Starting Obsidian Studio Cloud Container..."

# If GIT_REPO_URL and GITHUB_TOKEN are provided, configure Git credentials
if [ -n "$GIT_REPO_URL" ] && [ -n "$GITHUB_TOKEN" ]; then
  # Inject token into repo URL if HTTPS
  AUTH_REPO_URL=$(echo "$GIT_REPO_URL" | sed "s|https://|https://x-access-token:${GITHUB_TOKEN}@|")
else
  AUTH_REPO_URL="$GIT_REPO_URL"
fi

# Clone vault if not already present
VAULT_DIR="${VAULT_PATH:-/data/vault}"
mkdir -p "$VAULT_DIR"

if [ -n "$AUTH_REPO_URL" ] && [ ! -d "$VAULT_DIR/.git" ]; then
  echo "📥 Cloning vault from $GIT_REPO_URL into $VAULT_DIR..."
  git clone "$AUTH_REPO_URL" "$VAULT_DIR"
  echo "✅ Vault clone complete."
fi

# Start the Node.js server
exec node server.mjs
