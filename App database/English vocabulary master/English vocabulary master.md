---
aliases:
  - 000_Vocabulary_Master_MOC
  - Vocabulary Master
  - English Vocabulary Master MOC
tags:
  - vocabulary-master
  - moc
  - master-dashboard
banner: "[[banner.jpg]]"
banner_y: 0.5
banner_icon: 👑
---

# 📚 English Vocabulary Master — Master Non-Classical Lexicon Hub

> [!abstract] 📚 Vault Master Index
> **Scope:** Non-classical expressive English vocabulary (Anglo-Saxon, Old Norse, Celtic, Germanic, and global loanwords).  
> **Architecture:** 5 Categories · 30 Semantic Clusters · Thematic Word Sections · 514 Lexical Cards.  
> **Tracker:** 📊 [[Vocabulary Learning Progress|Open Learning Progress Dashboard]]

Welcome to the **English Vocabulary Master** vault. This vault is dedicated exclusively to **non-Greek and non-Latin expressive English vocabulary** (Old English/Anglo-Saxon, Old Norse, Celtic/Gaelic, Germanic, and global non-classical loanwords from Persian, Sanskrit, Arabic, Japanese, and Yiddish).

Every word in this vault is structured into an **Obsidian Lexical Card** linked through a streamlined hierarchy: **Categories ➔ Semantic Clusters ➔ Thematic Word Sections**.

---

## 🧭 Semantic Clusters Index (30 Expressive Clusters)

```dataviewjs
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

const clusterData = [
  { num: "01", cat: "🌿 Nature & Wilderness", name: "Cluster Earth and Stone", focus: "Jagged crags, sliding scree, granite tors, wooded cloughs, and ancient barrows." },
  { num: "02", cat: "🌿 Nature & Wilderness", name: "Cluster Fire and Heat", focus: "Live gleeds, flash searing, choked smoldering, sultry atmosphere, and hearth embers." },
  { num: "03", cat: "🌿 Nature & Wilderness", name: "Cluster Water and Liquid", focus: "Roiling spates, mountain freshets, treacherous mires, fens, and sloughs." },
  { num: "04", cat: "🌿 Nature & Wilderness", name: "Cluster Light and Darkness", focus: "Liminal gloaming, impenetrable murk, swart shadows, lustrous sheens, and dappled komorebi." },
  { num: "05", cat: "🌿 Nature & Wilderness", name: "Cluster Weather and Wilderness", focus: "Blustering squalls, howling gales, windswept heaths, and frozen taigas." },
  { num: "06", cat: "🌿 Nature & Wilderness", name: "Cluster Time and Seasons", focus: "Fleeting spells, ancient yore, lingering tides, and waning hours." },
  { num: "07", cat: "🧠 Mind & Senses", name: "Cluster Mind and Emotion", focus: "Existential weltschmerz, angst, secret schadenfreude, hollow yearning, and brazen chutzpah." },
  { num: "08", cat: "🧠 Mind & Senses", name: "Cluster Pride and Humility", focus: "Haughty defiance, surly churlishness, unbowed courage, and groveling servility." },
  { num: "09", cat: "🧠 Mind & Senses", name: "Cluster Sleep and Waking", focus: "Deep slumber, somnolent drowsing, nocturnal vigils, and sudden rousings." },
  { num: "10", cat: "🧠 Mind & Senses", name: "Cluster Sight and Vision", focus: "Piercing scrutiny, sharp ken, furtive leers, and blurred bleariness." },
  { num: "11", cat: "🧠 Mind & Senses", name: "Cluster Sound and Silence", focus: "Deafening din, ringing clangor, deep bellowing, muffled thrumming, and solemn hush." },
  { num: "12", cat: "🧠 Mind & Senses", name: "Cluster Speech and Lore", focus: "Idle prattling, harsh chiding, ancient skaldic lore, and poetic kennings." },
  { num: "13", cat: "🏃 Motion & Physicality", name: "Cluster Motion and Force", focus: "Visceral physical torque, wrenching, heaving, thrashing, and kinetic momentum." },
  { num: "14", cat: "🏃 Motion & Physicality", name: "Cluster Speed and Haste", focus: "Rapid celerity, sudden spurts, panicked scurrying, and darting velocity." },
  { num: "15", cat: "🏃 Motion & Physicality", name: "Cluster Journey and Travel", focus: "Arduous trudging, nomadic roving, highland sojourns, and wayfaring treks." },
  { num: "16", cat: "🏃 Motion & Physicality", name: "Cluster Beauty and Ugliness", focus: "Wabi-sabi aged patina, kintsugi gold mending, winsome grace, and squalid grime." },
  { num: "17", cat: "🏃 Motion & Physicality", name: "Cluster Pain and Healing", focus: "Throbbing pangs, smarting burns, soothing salves, and herbal balms." },
  { num: "18", cat: "🏃 Motion & Physicality", name: "Cluster Feast and Hunger", focus: "Ravenous famine, hearty quaffing, guzzling mead, and gluttonous swilling." },
  { num: "19", cat: "🏃 Motion & Physicality", name: "Cluster Growth and Decay", focus: "Burgeoning organic sprouts, blossoming canopies, festering blight, and rotting carrion." },
  { num: "20", cat: "⚔️ Conflict & Strategy", name: "Cluster Conflict and Strife", focus: "Martial onslaughts, broadsword cleaving, violent sundering, and generational feuds." },
  { num: "21", cat: "⚔️ Conflict & Strategy", name: "Cluster Stealth and Cunning", focus: "Furtive skulking, shame-ridden slinking, lurking ambushes, and crafty guile." },
  { num: "22", cat: "⚔️ Conflict & Strategy", name: "Cluster Shadow and Secrecy", focus: "Veils of mist, enshrouded citadels, secret ciphers, and eavesdropping scouts." },
  { num: "23", cat: "⚔️ Conflict & Strategy", name: "Cluster Bound and Restraint", focus: "Iron fetters, wooden shackles, tethered steeds, and hamstrung mobility." },
  { num: "24", cat: "⚔️ Conflict & Strategy", name: "Cluster Fate and Fortune", focus: "Dark dooms, ominous forebodings, unforeseen haps, and ill-starred mishaps." },
  { num: "25", cat: "⚔️ Conflict & Strategy", name: "Cluster Magic and Spell", focus: "Eldritch sorceries, runic talismans, binding hexes, and protective wards." },
  { num: "26", cat: "🏛️ Society & Habitation", name: "Cluster Shelter and Abode", focus: "Granite keeps, mountain havens, rustic bowers, and squalid hovels." },
  { num: "27", cat: "🏛️ Society & Habitation", name: "Cluster Trade and Barter", focus: "Shrewd haggling, market truck, peddling wares, and bustling bazaars." },
  { num: "28", cat: "🏛️ Society & Habitation", name: "Cluster Wealth and Poverty", focus: "Miserly hoards, threadbare garments, penury, and skimping provisions." },
  { num: "29", cat: "🏛️ Society & Habitation", name: "Cluster Friendship and Enmity", focus: "Kindred amity, loyal comrades, bitter nemeses, and spurned alliances." },
  { num: "30", cat: "🏛️ Society & Habitation", name: "Cluster Craft and Shaping", focus: "Forging steel, hewing oak timbers, fettling gear, and deftly soldered joints." }
];

const clusterPages = dv.pages('"English vocabulary master"').where(p => p.file.name.startsWith("Cluster ") && p.file.folder.replace(/\\/g, '/').split('/').length === 2);
const clusterInfoMap = new Map();
for (let cp of clusterPages) {
    clusterInfoMap.set(cp.file.name, {
        status: cp.status || "unread",
        path: cp.file.path
    });
}

const words = dv.pages('"English vocabulary master"').where(p => p.cluster && p.type !== "cluster_dashboard" && p.type !== "semantic_field");
const wordStats = new Map();
let grandTotal = 0, grandLearned = 0, grandLearning = 0;

for (let w of words) {
    const normFolder = w.file.folder.replace(/\\/g, '/');
    const parts = normFolder.split('/');
    const cName = parts.length > 1 ? parts[1] : null;
    if (cName) {
        if (!wordStats.has(cName)) wordStats.set(cName, { total: 0, learned: 0, learning: 0 });
        const d = wordStats.get(cName);
        d.total++;
        grandTotal++;
        if (w.status === "learned") { d.learned++; grandLearned++; }
        else if (w.status === "learning") { d.learning++; grandLearning++; }
    }
}

// Top Grand Progress HUD
const gPct = grandTotal > 0 ? ((grandLearned / grandTotal) * 100).toFixed(1) : "0.0";
const gStudyPct = grandTotal > 0 ? ((grandLearning / grandTotal) * 100).toFixed(1) : "0.0";

dv.paragraph('\n' +
'<div class="zen-hud-card" style="background:var(--zen-bg-card, #ffffff); border:1px solid var(--zen-border, #e6dfd3); border-radius:4px; padding:20px 24px; margin:16px 0 24px; box-shadow:var(--zen-shadow, 0 4px 18px rgba(40,35,30,0.05));">\n' +
'  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:18px;">\n' +
'    <div style="display:flex; flex-direction:column; gap:4px;">\n' +
'      <div style="display:flex; align-items:center; gap:8px;">\n' +
'        <span style="font-weight:800; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--zen-vermillion, #c23b2b); font-family:Georgia, serif;">ENGLISH VOCABULARY GRAND MASTERY HUD</span>\n' +
'      </div>\n' +
'      <div style="font-size:20px; font-weight:800; color:var(--zen-ink, #1f1f1e); letter-spacing:-0.2px;">Expressive Semantic Clusters <span style="font-size:12px; font-weight:500; color:var(--text-muted); font-family:Georgia, serif;">(' + (grandTotal) + ' items)</span></div>\n' +
'    </div>\n' +
'    <div style="display:flex; align-items:center; gap:16px; background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:10px 20px; border-radius:6px; box-shadow:none;">\n' +
'      <div style="position:relative; width:58px; height:58px; display:flex; align-items:center; justify-content:center;">\n' +
'        <svg style="width:58px; height:58px; transform:rotate(-90deg);" viewBox="0 0 36 36">\n' +
'          <path stroke="var(--zen-border-subtle, rgba(128,128,128,0.18))" stroke-width="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>\n' +
'          <path stroke="var(--apple-green, #30D158)" stroke-width="3.5" stroke-dasharray="' + (gPct) + ', 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style="filter:drop-shadow(0 0 3px var(--zen-moss-glow));"/>\n' +
'        </svg>\n' +
'        <span style="position:absolute; font-family:Georgia, serif; font-size:12px; font-weight:800; color:var(--zen-ink, #1f1f1e);">' + (gPct) + '%</span>\n' +
'      </div>\n' +
'      <div>\n' +
'        <div style="font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--text-muted); font-family:Georgia, serif;">Mastery Dial</div>\n' +
'        <div style="font-size:15px; font-weight:800; color:var(--zen-moss, #2b6d3b); font-family:Georgia, serif;">' + (grandLearned) + ' / ' + (grandTotal) + '</div>\n' +
'        <div style="font-size:10px; color:var(--text-faint);">' + (grandLearning) + ' study · ' + (grandTotal - grandLearned - grandLearning) + ' unread</div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px; padding-top:12px; border-top:1px solid var(--zen-border-subtle, #f0eae0);">\n' +
'    <div style="background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:12px 16px; border-radius:4px; border:1px solid var(--zen-border, #e6dfd3); display:flex; justify-content:space-between; align-items:center;">\n' +
'      <span style="font-size:12px; color:var(--text-muted);">🟢 Mastered</span>\n' +
'      <span style="font-family:Georgia, serif; font-size:15px; font-weight:800; color:var(--zen-moss, #2b6d3b);">' + (grandLearned) + '</span>\n' +
'    </div>\n' +
'    <div style="background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:12px 16px; border-radius:4px; border:1px solid var(--zen-border, #e6dfd3); display:flex; justify-content:space-between; align-items:center;">\n' +
'      <span style="font-size:12px; color:var(--text-muted);">🟡 Studying</span>\n' +
'      <span style="font-family:Georgia, serif; font-size:15px; font-weight:800; color:var(--zen-ochre, #b58514);">' + (grandLearning) + '</span>\n' +
'    </div>\n' +
'    <div style="background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:12px 16px; border-radius:4px; border:1px solid var(--zen-border, #e6dfd3); display:flex; justify-content:space-between; align-items:center;">\n' +
'      <span style="font-size:12px; color:var(--text-muted);">🔴 Unread</span>\n' +
'      <span style="font-family:Georgia, serif; font-size:15px; font-weight:800; color:var(--text-faint);">' + (grandTotal - grandLearned - grandLearning) + '</span>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n' +
'');

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

function makeAppleToggle(rawStatus, filePath, clusterName) {
    let curIdx = states.findIndex(s => s.key === rawStatus);
    if (curIdx === -1) curIdx = 0;

    const toggle = document.createElement('div');
    toggle.className = 'apple-c';
    toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

    const track = document.createElement('div');
    track.className = 'track-c';
    track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

    const label = document.createElement('span');
    label.className = 'label ' + states[curIdx].cls;
    label.textContent = states[curIdx].label;

    toggle.appendChild(track);
    toggle.appendChild(label);

    toggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        const halo = track.querySelector('.halo-c');
        halo.className = 'halo-c ' + nxt.p;
        label.className = 'label ' + nxt.cls;
        label.textContent = nxt.label;

        const file = app.vault.getAbstractFileByPath(filePath);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice('' + (clusterName) + ': marked ' + (nxt.key) + '');
        }
    });
    return toggle;
}

function makeProgressBar(learned, learning, total) {
    const lPct = total > 0 ? ((learned / total) * 100).toFixed(1) : "0.0";
    const gPct = total > 0 ? ((learning / total) * 100).toFixed(1) : "0.0";
    
    const wrap = document.createElement('div');
    wrap.style = "display:flex; align-items:center; gap:10px; min-width:170px;";
    
    const track = document.createElement('div');
    track.style = "flex:1; height:7px; background:var(--background-modifier-border, #1e293b); border-radius:999px; overflow:hidden; display:flex; gap:1px; border:1px solid var(--background-modifier-border, #2d3748);";
    
    const lBar = document.createElement('div');
    lBar.style = "width:" + lPct + "%; background:var(--apple-green, #30D158); border-radius:999px 0 0 999px; box-shadow:0 0 6px rgba(48,209,88,0.6);";
    
    const gBar = document.createElement('div');
    gBar.style = "width:" + gPct + "%; background:var(--apple-amber, #FF9F0A); box-shadow:0 0 6px rgba(255,159,10,0.6);";
    
    track.appendChild(lBar);
    track.appendChild(gBar);
    wrap.appendChild(track);
    
    const pctLabel = document.createElement('span');
    pctLabel.style = "font-size:11.5px; font-weight:700; color:" + (learned > 0 ? "var(--apple-green, #30D158)" : "var(--text-muted)") + "; min-width:42px; text-align:right;";
    pctLabel.textContent = lPct + "%";
    wrap.appendChild(pctLabel);
    
    const countLabel = document.createElement('span');
    countLabel.style = "font-size:11px; color:var(--text-faint, #64748b); min-width:60px;";
    countLabel.textContent = "(" + learned + "/" + total + ")";
    wrap.appendChild(countLabel);
    
    return wrap;
}

const rows = [];
for (let c of clusterData) {
    const clusterPath = 'English vocabulary master/' + (c.name) + '/' + (c.name) + '.md';
    const cInfo = clusterInfoMap.get(c.name) || { status: "unread", path: clusterPath };
    const toggle = makeAppleToggle(cInfo.status, cInfo.path, c.name);

    const wData = wordStats.get(c.name) || { total: 0, learned: 0, learning: 0 };
    const progressBar = makeProgressBar(wData.learned, wData.learning, wData.total);

    const clusterLink = dv.fileLink(clusterPath, false, c.name);
    rows.push([c.num, c.cat, clusterLink, toggle, progressBar, c.focus]);
}

dv.table(["#", "Category", "Semantic Cluster", "Cluster Status Toggle", "Mastery Progress Bar", "Core Themes & Semantic Range"], rows);
```

---

## 📜 Master Reference & Rhetoric Guides
* [[01_Phonaesthemic_Sound_Symbolism|🎵 Phonaesthemic Sound-Symbolism Guide (`gl-`, `wr-`, `sk-`, `sl-`, `sn-`)]]
* [[02_Anglo_Saxon_Kennings_Compounding|🏹 Anglo-Saxon Kennings & Compounding Engine]]
* [[03_Non_Classical_Linguistic_Strata|🏛️ The 8 Non-Classical Linguistic Strata]]
* [[04_Dual_Core_Rhetorical_Playbook|⚡ The Dual-Core Rhetorical Playbook (Saxon Punch vs Latinate Frame)]]

---

## 🔗 Cross-Vault Navigation
- **Classical Latin Roots Vault:** → [[Latin roots|Latin Roots Knowledge Base]]
- **Classical Greek Roots Vault:** → [[Greek roots|Greek Roots Knowledge Base]]


> [!status] 🎯 **Status:**

```dataviewjs
if(!document.getElementById('apple-toggle-css')){const s=document.createElement('style');s.id='apple-toggle-css';s.textContent=':root{--apple-red:#FF375F;--apple-red-glow:rgba(255,55,95,0.45);--apple-amber:#FF9F0A;--apple-amber-glow:rgba(255,159,10,0.45);--apple-green:#30D158;--apple-green-glow:rgba(48,209,88,0.45)}.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--background-secondary,#111624);border:1px solid var(--background-modifier-border,#232d42);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--text-muted,#3b4b6b);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.35)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:48px;height:18px;background:var(--background-primary,#090d17);border-radius:999px;border:1px solid var(--background-modifier-border,#1c2436);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--text-faint,#334155);opacity:.6}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:14px;height:14px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:5px;height:5px;border-radius:999px;background:#fff;box-shadow:0 0 4px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--apple-red);box-shadow:0 0 12px var(--apple-red),0 0 20px var(--apple-red-glow)}.apple-c .halo-c.p1{transform:translateX(15px);background:var(--apple-amber);box-shadow:0 0 12px var(--apple-amber),0 0 20px var(--apple-amber-glow)}.apple-c .halo-c.p2{transform:translateX(30px);background:var(--apple-green);box-shadow:0 0 12px var(--apple-green),0 0 20px var(--apple-green-glow)}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:48px}.apple-c .label.unread{color:var(--apple-red)}.apple-c .label.learning{color:var(--apple-amber)}.apple-c .label.learned{color:var(--apple-green)}';document.head.appendChild(s);}
const p = dv.current();
const rawStatus = p.status || "unread";
const states = [{ key: 'unread', label: 'unread', cls: 'unread', p: 'p0' }, { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' }, { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }];
let curIdx = states.findIndex(s => s.key === rawStatus);
if (curIdx === -1) curIdx = 0;
const toggle = document.createElement('div');
toggle.className = 'apple-c';
toggle.title = 'Click to glide: unread ➔ learning ➔ learned';
const track = document.createElement('div');
track.className = 'track-c';
track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';
const label = document.createElement('span');
label.className = 'label ' + states[curIdx].cls;
label.textContent = states[curIdx].label;
toggle.appendChild(track);
toggle.appendChild(label);
toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    track.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
    label.className = 'label ' + nxt.cls;
    label.textContent = nxt.label;
    const file = app.vault.getAbstractFileByPath(p.file.path);
    if (file) {
        await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
        new Notice('' + (p.file.name) + ': marked ' + (nxt.key) + '');
    }
});
dv.container.appendChild(toggle);
```

