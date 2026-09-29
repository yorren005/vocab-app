# 🏛️ Pure Vocabulary Database

This directory contains the self-contained, high-performance vocabulary database for the **Obsidian Vocab App** (Web, Desktop, and Android APK).

---

## 📂 Exact Tree Folder Structure

```text
App database/
├── 00 Language Hub.md                  # Master interactive navigation portal
├── database-manifest.json              # Versioned catalog manifest & telemetry
│
├── Latin roots/                        # 🏛️ Classical Latin Root Mastery (32,175 words)
│   ├── 03_Reference_and_Rules/         # Latin phonology, suffixes & prefixes
│   ├── Cluster Action/                 # Cluster directory
│   │   ├── Cluster Action.md           # Cluster MOC (Map of Content)
│   │   ├── Dashboard — act/            # Root Dashboard subfolder
│   │   │   ├── Dashboard — act.md      # Root study dashboard & progress tracker
│   │   │   ├── action.md               # Individual vocabulary word card
│   │   │   ├── actionable.md
│   │   │   └── ...
│   │   └── Dashboard — ag/
│   │       └── ...
│   └── Cluster Body/
│       └── ...
│
├── Greek roots/                        # 🏛️ Classical Greek Root Mastery (17,942 words)
│   ├── 03_Reference_and_Rules/         # Greek morphemes & dialectal sound shifts
│   ├── Cluster Mind & Thought/
│   │   ├── Cluster Mind & Thought.md   # Cluster MOC
│   │   └── Dashboard — psych/
│   │       ├── Dashboard — psych.md    # Root study dashboard & progress tracker
│   │       ├── psyche.md               # Individual vocabulary word card
│   │       └── ...
│   └── ...
│
└── English vocabulary master/          # 💎 Modern Nuance & Thematic Mastery (514 words)
    ├── Cluster Beauty and Ugliness/
    │   ├── Cluster Beauty and Ugliness.md
    │   ├── Semantic Field — Patina, Grace and Squalor.md
    │   ├── comely.md                   # Individual vocabulary word card
    │   ├── bonny.md
    │   └── ...
    └── ...
```

---

## ⚡ Adding & Editing Vocabulary

The app is built for effortless additions and edits:

### 1. Adding a New Word
Simply create a markdown file inside the desired root dashboard or cluster folder:
- **Latin / Greek root derivative**: Put `myword.md` inside `Latin roots/Cluster <Name>/Dashboard — <root>/`.
- **English vocabulary master**: Put `myword.md` inside `English vocabulary master/Cluster <Name>/`.

#### Word Card Format:
```markdown
---
status: unread
---
# myword

> [!book] 📖 Concise Definition & Semantic Range
> 1. **Primary Meaning**: Concise, clear definition.
> 2. **Nuance / Usage**: Key connotation or register.

> [!tip] 🎯 Usage & Syntactic Application
> - **Grammatical Class**: Adjective / Noun / Verb.
> - **Syntactic Constructions**: Predicative or attributive usage notes.

> [!quote] 💬 Contextual Usage & Authentic Quotations
> - 📜 **Author (*Work*):** *"Sample authentic sentence showcasing the word in context."*
```

### 2. Live Instant Updates
- **Automatic Watcher**: When the server is running (`npm start`), any edits, additions, renames, or deletions in `App database/` trigger the live watcher and auto-rebuild the index in **~1.0 second**.
- **Instant Note Fetching**: Notes are read directly from disk when opened, so any text updates are immediately visible on the next view.
- **Manual Re-index**: Run `npm run reindex` at any time to force an immediate catalog refresh.
- **Verification**: Run `npm run verify-db` to verify all cluster, dashboard, and word counts.
- **Sync to Android**: Run `npm run cap:sync` to refresh the index and push all assets to the native Android APK build.
