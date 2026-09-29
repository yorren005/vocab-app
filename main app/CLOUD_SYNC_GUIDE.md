# 🌐 24/7 Cloud & Git Bi-directional Sync Architecture Guide

This guide explains how your **Obsidian Studio PWA** maintains real-time, bi-directional synchronization across **mobile devices (iOS & Android)**, **remote laptops**, and your **local desktop vault (`D:\Language`)** via Git.

---

## 🏛️ System Architecture

```
                  ┌─────────────────────────────┐
                  │      GitHub Repository      │
                  │  (yorren005/Language.git)   │
                  └──────────────┬──────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
        Git Pull / Push                 Git Pull / Push
  (Auto-sync every 3-5 min)       (Auto-sync every 3-5 min)
                 │                               │
                 ▼                               ▼
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │  Primary Desktop PC       │   │  24/7 Cloud Server        │
    │  Location: D:\Language    │   │  (Railway / Render / VPS) │
    │  • Native Obsidian App    │   │  • Node.js + Git Engine   │
    │  • sync-desktop.ps1 or    │   │  • server.mjs + git-sync  │
    │    Obsidian Git Plugin    │   │  • Persistent Vault Disk  │
    └───────────────────────────┘   └─────────────┬─────────────┘
                                                  │
                                       HTTPS REST / PWA App
                                       (Instant reads & writes)
                                                  │
                                   ┌──────────────┴──────────────┐
                                   ▼                             ▼
                      ┌─────────────────────────┐   ┌─────────────────────────┐
                      │  Mobile Devices         │   │  Remote Desktops        │
                      │  (iPhone / Android PWA) │   │  (Work Mac / Laptop PWA)│
                      │  • Offline queue        │   │  • Dual-pane study mode │
                      │  • 875 Dataview HUDs    │   │  • Instant cloud sync   │
                      │  • Learning toggles     │   │  • Fullscreen PWA window│
                      └─────────────────────────┘   └─────────────────────────┘
```

---

## 🔑 Step 1: Create a GitHub Personal Access Token (PAT)

To allow the 24/7 cloud server to push and pull your private vault repository securely:

1. Go to GitHub: **Settings ➔ Developer settings ➔ Personal access tokens ➔ Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Name it: `Obsidian-Studio-Cloud-Sync`.
4. Set Expiration: `No expiration` (or 1 year).
5. Check the **`repo`** scope (Full control of private repositories).
6. Click **Generate token** and copy the token (starts with `ghp_...`).

---

## ☁️ Step 2: Deploy to Cloud (Choose One)

### Option A: Railway (Recommended — 2-minute setup)
1. Sign up / log in to [railway.app](https://railway.app).
2. Click **New Project ➔ Deploy from GitHub repo**.
3. Select your repository (`yorren005/Knowledge_app_obsidian_copy` or `yorren005/Knowledge`).
4. Set the Root Directory to: `obsidian-web-app/PWA app` (or root if repository contains the PWA directly).
5. In **Variables**, add:
   - `PORT` = `3080`
   - `VAULT_PATH` = `/data/vault`
   - `GIT_REPO_URL` = `https://github.com/yorren005/Language.git`
   - `GITHUB_TOKEN` = `ghp_your_token_from_step_1`
   - `AUTH_TOKEN` = `your-secure-passcode` (Passcode to protect your vault from public access)
   - `GIT_PULL_INTERVAL_SEC` = `180`
6. In **Volumes**, click **Add Volume** mounted to `/data/vault`.
7. Click **Deploy**. Railway will give you a public HTTPS URL (e.g. `https://obsidian-production.up.railway.app`).

---

### Option B: Render (Free Tier)
1. Sign up / log in to [render.com](https://render.com).
2. Click **New ➔ Blueprint** and connect your GitHub repo (it will automatically detect `render.yaml`).
3. Fill in the environment variables (`GIT_REPO_URL`, `GITHUB_TOKEN`, `AUTH_TOKEN`).
4. Click **Apply**.

---

### Option C: Any Docker VPS / Home Server
If you have a Linux VPS or home server running Docker:
```bash
# Clone the repository
git clone https://github.com/yorren005/Knowledge_app_obsidian_copy.git
cd Knowledge_app_obsidian_copy

# Copy .env template and set your token
cp .env.example .env
nano .env

# Start with Docker Compose
docker compose up -d
```

---

## 💻 Step 3: Synchronize Your Main Desktop Vault (`D:\Language`)

To ensure that changes you make in the native Obsidian desktop app sync with GitHub (and therefore with your mobile devices), choose either **Script** or **Plugin**:

### Choice 1: The Automated PowerShell Daemon (`sync-desktop.ps1`)
Run the companion script included in this repository:
```powershell
# Run a one-time sync check:
powershell -ExecutionPolicy Bypass -File .\sync-desktop.ps1 -Once

# Or keep it running in the background (checks every 5 minutes):
powershell -ExecutionPolicy Bypass -File .\sync-desktop.ps1
```

### Choice 2: Obsidian Desktop Git Community Plugin (Native)
1. In Obsidian Desktop on your PC, go to **Settings ➔ Community plugins ➔ Browse**.
2. Search and install **Obsidian Git**, then enable it.
3. In Obsidian Git settings:
   - **Vault backup interval (minutes)**: `5`
   - **Auto pull interval (minutes)**: `5`
   - **Auto pull on startup**: `ON`
   - **Commit message on auto backup**: `sync: desktop update [{{date}}]`

Now, whenever you write notes on your desktop PC in Obsidian, they are automatically pushed to GitHub and pulled by your cloud app!

---

## 📱 Step 4: Installing the App on Mobile & Desktops

Once your cloud instance is running at your HTTPS URL:

### On iPhone / iPad (iOS):
1. Open the URL in **Safari**.
2. Tap the **Share** button (box with upward arrow) at the bottom.
3. Scroll down and tap **"Add to Home Screen"**.
4. The app icon appears on your home screen. When launched, it runs in **standalone fullscreen mode** without any Safari browser chrome.

### On Android:
1. Open the URL in **Chrome**.
2. Tap the three dots (menu) in the top-right corner.
3. Tap **"Install app"** (or **"Add to Home screen"**).
4. The app installs into your Android app drawer with full standalone windowing and offline support.

### On Windows / Mac / Linux Laptops:
1. Open the URL in **Google Chrome**, **Microsoft Edge**, or **Brave**.
2. Click the **"Install" icon** on the right side of the URL bar (or menu ➔ Apps ➔ "Install Obsidian Studio as an app").
3. A standalone desktop application window opens, pinned to your Windows Taskbar or macOS Dock.

---

## 📶 Step 5: Offline Mode & Mutation Queue

- **Reading Offline**: The Service Worker (`sw.js`) caches the vault index, stylesheets, and visited notes. You can browse and study without an internet connection.
- **Editing Offline**: If you toggle learning statuses, write in the scratchpad, or edit notes without internet, the changes are stored in an **Offline Mutation Queue** in `localStorage`.
- **Automatic Sync**: The moment your device regains internet connection, the queue automatically flushes to the server, and the status bar updates to **🟢 Git Synced**.
