# 🏛️ Obsidian Vocab — Architecture & Repository Structure

An offline-first, high-performance vocabulary mastery platform designed for classical and modern philology. Features a **two-tier architecture** with strict decoupling between the **Markdown Database** and the **Application Engine**.

---

## 🏗️ Architectural Separation: Database vs Application

This repository is strictly partitioned into three independent top-level layers:

```text
Vocab app/
├── App database/       # 📚 1. THE DATA LAYER (Pure Markdown Database)
├── main app/           # ⚡ 2. THE APPLICATION LAYER (Web App & Live Server)
└── android/            # 📱 3. THE MOBILE LAYER (Capacitor Native Android Container)
```

```mermaid
graph TD
    subgraph DATA_LAYER["📚 1. App database/ (Source of Truth)"]
        LR["🏛️ Latin roots/<br/>(32,175 word notes)"]
        GR["🏛️ Greek roots/<br/>(17,942 word notes)"]
        VM["💎 English vocabulary master/<br/>(514 word notes)"]
        HUB["🗺️ 00 Language Hub.md"]
        MAN["📋 database-manifest.json"]
    end

    subgraph APP_LAYER["⚡ 2. main app/ (Application Engine)"]
        SERVER["Node.js Server<br/>(server.mjs)"]
        WATCHER["Live Watcher<br/>(fs.watch on App database)"]
        INDEX["In-Memory RAM Index<br/>(vault-index.json)"]
        UI["Mobile & Desktop Web UI<br/>(TikTok-style Feed & Dataview)"]
    end

    subgraph MOBILE_LAYER["📱 3. android/ (Native Mobile APK)"]
        CAP["Capacitor Shell"]
        APK["Offline Android APK<br/>(app-debug.apk)"]
    end

    DATA_LAYER -->|Live disk reads /api/note| SERVER
    DATA_LAYER -->|Auto-rebuild on file changes (~0.9s)| WATCHER
    WATCHER --> INDEX
    INDEX --> UI
    APP_LAYER -->|npm run cap:sync| CAP
    CAP --> APK
```

---

## 📂 Layer 1: App database/ (The Database)
> **Location:** [`App database/`](file:///c:/Users/user/Desktop/Vocab%20app/App%20database)  
> **Total Vocabulary Notes:** 50,631 markdown notes (285 MB)  
> **Source of Truth:** Pure, human-readable Markdown with YAML frontmatter, clean concise definitions, syntactic usage, and authentic literature citations.

* **`Latin roots/`**: 60 Clusters, 782 Root Dashboards, 32,175 individual derived word notes.
* **`Greek roots/`**: 30 Clusters, 810 Root Dashboards, 17,942 individual derived word notes.
* **`English vocabulary master/`**: 30 Clusters, 30 Semantic Fields, 514 nuanced vocabulary notes.
* **`00 Language Hub.md`**: Master navigation portal.
* **`database-manifest.json`**: Machine-readable catalog metadata.
* **`README.md`**: Detailed guide on how to add, format, or edit vocabulary notes.

*Zero vendor lock-in:* You can open and edit this folder directly in **Obsidian**, **VS Code**, or any text editor.

---

## ⚡ Layer 2: main app/ (The Application)
> **Location:** [`main app/`](file:///c:/Users/user/Desktop/Vocab%20app/main%20app)  
> **Stack:** Node.js, Vanilla ES Modules, DataviewJS Engine, Web Speech API, Progressive Web App (PWA).

* **Live Watcher**: Actively watches `App database/`. Any file addition or edit automatically updates the in-memory index in **< 1.0 second** without restarting the server.
* **TikTok-Style Word Feed (Tab 2)**: Vertical swipe gestures through 50,000+ words with instant 0ms response.
* **Dynamic DataviewJS**: Live morphological root tables, completion rings, and progress toggles (🔴 Unread, 🟡 Studying, 🟢 Learned).
* **Audio Pronunciation**: SpeechSynthesis engine with pitch, rate, and accent support.
* **API Endpoints**:
  * `GET /api/vault-index` — High-speed index retrieval.
  * `GET /api/note?path=...` — Instant on-demand disk read.
  * `POST /api/reindex` — Sub-second catalog re-index.
  * `POST /api/frontmatter` — Glide status tracking.

---

## 📱 Layer 3: android/ (Native Mobile APK)
> **Location:** [`android/`](file:///c:/Users/user/Desktop/Vocab%20app/android)  
> **Stack:** Capacitor 8, Android SDK, Gradle 8.14.

* **Offline-First:** Bundles the pre-indexed database and core notes directly into `assets/public/` so the app functions 100% offline without requiring internet or a local server.
* **Native Navigation:** Hardware back button handling, smooth swipe physics, and edge-to-edge Android viewport support.

---

## 🚀 Quick Start & Development Commands

From the `main app/` directory:

```bash
# 1. Start the Live Web App & Server
npm start

# 2. Verify Database Tree Structure & File Integrity
npm run verify-db

# 3. Force Instant In-Memory Database Re-index
npm run reindex

# 4. Sync Database & Web Assets to Native Android App
npm run cap:sync

# 5. Build Fresh Debug APK
npm run cap:build
```
