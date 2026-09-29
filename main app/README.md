# Obsidian Vocab — Mobile Native App

A dedicated, standalone **Native Mobile Application** (Capacitor & Android APK ready) for the unified Classical Greek, Latin roots, and English vocabulary vault (52,000+ words).

Minimalist design system with custom **Scandinavian Birch (Light Mode)** and **Volcanic Obsidian (Dark Mode)**, 4-tab bottom navigation, interactive 3D flip card study deck, and a persistent 3-state mastery tracking system.

---

## 📱 Mobile Architecture & Features

### 1. 🏠 Home Tab (Main Hub & Navigation Stack)
- **Vault Disciplines**: Greek Roots (17,987 words), Latin Roots (33,028 words), English Vocab Master (583 words), Advanced English (385 lessons), Basic English (39 rules), and Philosophy (38 inquiries).
- **Drill-down Navigation Stack**: Tapping sections opens them in an isolated subpage with horizontal slide transitions.
- **Top Breadcrumbs Bar**: Small sticky header with back button (`←`), clickable multi-level breadcrumbs (`Home / Greek Roots / Cluster Action`), and real-time mastery badges.
- **Horizontal Swipe Gestures**:
  - Swipe **left-to-right**: Go back to previous page in the stack.
  - Swipe **right-to-left**: Advance to next section or sibling discipline.
- **Automatic Word Card Routing**: Clicking any vocabulary word link automatically navigates to **Tab 2 (Word Cards)** with that specific card open in study mode.

### 2. 🗂️ Word Cards Tab (Exhaustive Collection)
- **Exhaustive Deck**: Browse and drill all 51,000+ words & roots.
- **Instant Search & Filter**: Real-time debounced search, category chips, and mastery filters (🔴 Unread, 🟡 Studying, 🟢 Learned).
- **Interactive 3D Card Deck**:
  - Front: Word, cluster tag, origin hints, and flip prompt.
  - Back: Full definitions, semantic range, authentic academic quotations, and cluster hub links.
  - 1-tap rating buttons: `🔴 Unread`, `🟡 Studying`, `🟢 Learned`.
  - Horizontal swipe: swipe left for next card, swipe right for previous card.
- **List View**: Switch to list mode for fast virtualized scrolling and status inspection.

### 3. 🎲 Daily Word Tab (Totally Random Cards)
- **Spaced Repetition & Discovery**: Pulls completely random cards across the entire 52,000+ vault on every shuffle.
- **Interactive Flashcard**: Tap to reveal blurred definition and etymology.
- **1-Tap Rating**: `🔴 Need Review`, `🟡 Studying`, `🟢 Got It!`.
- **Daily Review Counter**: Real-time streak tracking words reviewed today.
- **Swipe-left** or tap `🎲 Draw Next Random Word` to pull the next random card instantly.

### 4. ⚙️ Settings Tab (Themes, Typography & HUD)
- **Dual Themes**: ☀️ Scandinavian Birch (Light) & 🌙 Volcanic Obsidian (Dark).
- **Typography**: Inter Sans, Georgia Serif, or JetBrains Mono; font size and line height sliders.
- **Mastery Tracking HUD**: Live segmented progress bar and exact counts for Learned, Studying, and Unread notes.
- **Data Management**: Export study progress to JSON, reset local progress, or sync bidirectionally with the server/Git.

---

## 🛠️ Build & Android APK Compilation

### Prerequisites
- Node.js >= 18
- Android SDK (`%LOCALAPPDATA%\Android\Sdk`) & JDK 17

### Commands

```bash
# 1. Sync web assets with Capacitor Android project
npm run cap:sync

# 2. Compile standalone Debug Android APK
npm run cap:build

# 3. Open in Android Studio
npm run cap:open

# 4. Optional: Run local testing server (accessible on local network)
npm start
```

### Generated APK Location
```
android/app/build/outputs/apk/debug/app-debug.apk
```
This APK is standalone and can be installed directly onto any Android phone (`adb install app-debug.apk`).
