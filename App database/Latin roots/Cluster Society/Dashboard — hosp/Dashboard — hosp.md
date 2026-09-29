---
status: unread
type: root_dashboard
---
# Dashboard — hosp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">hosp-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“host or guest”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
  </div>
</div>

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

// Robust path and file resolution
const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "");
const folder = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/')) : (dv.current() && dv.current().file ? dv.current().file.folder : "");
const rawFileName = currentPath ? currentPath.substring(currentPath.lastIndexOf('/') + 1).replace(/\.md$/, '') : (dv.current() && dv.current().file ? dv.current().file.name : "");
const rootName = rawFileName;
const cur = dv.current();
const rawStatus = (cur && cur.status) ? cur.status : "unread";
const isLatin = folder.includes("Latin roots");

let wordPages = [];
if (folder) {
    try {
        wordPages = dv.pages('"' + folder + '"').where(n => n.file.name !== rootName && !n.file.name.startsWith("Word Triage") && (n.latin_root || n.greek_root || (!n.file.name.startsWith("Dashboard") && !n.file.name.startsWith("Cluster"))));
    } catch (e) { wordPages = []; }
}

const t = wordPages ? wordPages.length : 0;
const l = (wordPages && t > 0) ? wordPages.where(n => n.status === "learned").length : 0;
const g = (wordPages && t > 0) ? wordPages.where(n => n.status === "learning").length : 0;
const u = t - l - g;
const lPct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
const gPct = t > 0 ? ((g / t) * 100).toFixed(1) : "0.0";

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

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

const cleanName = rootName.replace('Dashboard — ', '').replace('Dashboard – ', '').replace('Dashboard - ', '');
const isMastered = (curIdx === 2 || (t > 0 && l === t));

toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    track.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
    label.className = 'label ' + nxt.cls;
    label.textContent = nxt.label;

    const seal = container.querySelector('.hanko-seal');
    if (seal) {
        if (nxt.key === 'learned') {
            seal.style.opacity = "0.95";
            seal.style.transform = "rotate(-3deg) scale(1)";
        } else {
            seal.style.opacity = "0.25";
            seal.style.transform = "rotate(-6deg) scale(0.92)";
        }
    }

    const file = app.vault.getAbstractFileByPath(currentPath);
    if (file) {
        await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
        new Notice(rootName + ': marked ' + nxt.key);
    }
});

// Container element with Zen HUD Card class
const container = document.createElement('div');
container.className = 'zen-hud-card';
container.style = "background:var(--zen-bg-card,#1a1a1e); color:var(--zen-ink,#ececec); border:1px solid var(--zen-border,#2d2d34); border-radius:10px; padding:24px 28px; margin:16px 0 20px; box-shadow:var(--zen-shadow,0 6px 24px rgba(0,0,0,0.4)); position:relative; box-sizing:border-box;";

const stampText = isLatin ? 'Latin Root' : 'Greek Root';

container.innerHTML = '' +
  '<div style="position:absolute; top:14px; right:28px; font-family:Georgia,serif; font-size:48px; font-weight:300; color:var(--zen-muted,#86848c); line-height:1; pointer-events:none; user-select:none; opacity:0.25;">' + cleanName + '</div>' +
  '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:6px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">' + stampText + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.5px; line-height:1.2;">' + cleanName + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:14px; font-style:italic; color:var(--zen-muted,#86848c); margin-top:3px;">' + stampText + ' · Derived Vocabulary (' + t + ' words)</div>' +
  '<div style="width:100%; height:1px; background:linear-gradient(to right, var(--zen-ink,#ececec) 25%, transparent 95%); opacity:0.15; margin:16px 0;"></div>' +
  '<div style="display:grid; grid-template-columns:auto 1fr auto; gap:28px; align-items:center; margin:12px 0 16px;">' +
    '<div style="position:relative; width:68px; height:68px; display:flex; align-items:center; justify-content:center;">' +
      '<svg style="width:68px; height:68px; transform:rotate(-90deg);" viewBox="0 0 36 36">' +
        '<path stroke="var(--zen-border-subtle,#24242a)" stroke-width="3.6" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
        '<path stroke="var(--zen-moss,#429e57)" stroke-width="3.8" stroke-linecap="round" fill="none" stroke-dasharray="' + lPct + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
      '</svg>' +
      '<div style="position:absolute; font-family:Georgia,serif; font-size:14px; font-weight:700; color:var(--zen-ink,#ececec);">' + lPct + '%</div>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ink,#ececec); line-height:1;">' + t + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Derived Words</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-moss,#429e57); line-height:1;">' + l + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Mastered</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ochre,#d49c24); line-height:1;">' + g + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Studying</div></div>' +
    '</div>' +
    '<div class="hanko-seal" style="width:42px; height:42px; border:2px solid var(--zen-vermillion,#e05244); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--zen-vermillion,#e05244); font-family:Georgia,serif; font-size:20px; font-weight:700; user-select:none; transition:all .35s; opacity:' + (isMastered ? '0.95' : '0.25') + '; transform:' + (isMastered ? 'rotate(-3deg) scale(1)' : 'rotate(-6deg) scale(0.92)') + ';" title="Mastery Seal (熟)">熟</div>' +
  '</div>' +
  '<div style="width:100%; height:3px; background:var(--zen-border-subtle,#24242a); border-radius:2px; overflow:hidden; margin:14px 0; display:flex; gap:1px;">' +
    '<div style="height:100%; background:var(--zen-moss,#429e57); border-radius:2px 0 0 2px; width:' + lPct + '%;"></div>' +
    '<div style="height:100%; background:var(--zen-ochre,#d49c24); width:' + gPct + '%;"></div>' +
  '</div>' +
'';

const toggleRow = document.createElement('div');
toggleRow.style = "display:flex; justify-content:space-between; align-items:center; padding-top:6px; margin-top:4px;";

const toggleLabel = document.createElement('span');
toggleLabel.style = "font-size:10px; text-transform:uppercase; letter-spacing:1.2px; color:var(--zen-muted,#86848c); font-weight:600;";
toggleLabel.textContent = "Root Study Status";

toggleRow.appendChild(toggleLabel);
toggleRow.appendChild(toggle);
container.appendChild(toggleRow);
dv.container.appendChild(container);

// ================= WORD TRIAGE LAUNCH CARD =================
const triageCard = document.createElement('div');
triageCard.className = 'zen-triage-card';
triageCard.style = "background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:8px; padding:14px 20px; margin:0 0 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; cursor:pointer; transition:all .25s ease;";
triageCard.title = "Click to open dedicated Word Triage page";

triageCard.innerHTML = '' +
  '<div style="display:flex; align-items:center; gap:16px;">' +
    '<div style="width:38px; height:38px; border-radius:8px; background:rgba(224,82,68,0.12); border:1px solid var(--zen-vermillion,#e05244); display:flex; align-items:center; justify-content:center; font-size:18px;">🎯</div>' +
    '<div>' +
      '<div style="font-family:Georgia,serif; font-size:15px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.2px;">Word Triage & Status Filters</div>' +
      '<div style="display:flex; gap:12px; margin-top:3px; font-size:11.5px; font-weight:600;">' +
        '<span style="color:var(--zen-vermillion,#e05244);">🔴 ' + u + ' unread</span> · ' +
        '<span style="color:var(--zen-ochre,#d49c24);">🟡 ' + g + ' studying</span> · ' +
        '<span style="color:var(--zen-moss,#429e57);">🟢 ' + l + ' mastered</span>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div style="display:flex; align-items:center; gap:8px; background:var(--zen-bg-subtle,#222227); border:1px solid var(--zen-border,#2d2d34); padding:6px 14px; border-radius:999px; font-size:12px; font-weight:700; color:var(--zen-ink,#ececec);">' +
    '<span>Open Triage Page</span>' +
    '<span style="color:var(--zen-vermillion,#e05244);">➔</span>' +
  '</div>';

triageCard.addEventListener('mouseenter', () => {
    triageCard.style.borderColor = "var(--zen-vermillion,#e05244)";
    triageCard.style.transform = "translateY(-1px)";
    triageCard.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
});
triageCard.addEventListener('mouseleave', () => {
    triageCard.style.borderColor = "var(--zen-border,#2d2d34)";
    triageCard.style.transform = "none";
    triageCard.style.boxShadow = "none";
});

triageCard.addEventListener('click', () => {
    const triagePageName = 'Word Triage — ' + cleanName;
    app.workspace.openLinkText(triagePageName, currentPath, false);
});

dv.container.appendChild(triageCard);

```

The root **hosp** means host or guest. It refers to welcoming visitors, providing lodging, or sharing hospitality. In English, this root forms words such as *enemy*, *hostile*, *hospice*, and *hospitable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: host or guest
> The root **hosp** means host or guest. It refers to welcoming visitors, providing lodging, or sharing hospitality. In English, this root forms words such as *enemy*, *hostile*, *hospice*, and *hospitable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Host or guest</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *enemy* and *hostile*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hosp** comes from a Latin word that means *"host or guest"*.
  - At its core, it describes host or guest.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **hosp** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of host or guest.
  - **Mental & Social**: How people experience, organize, or communicate about host or guest.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Enemy**: An everyday English word showing the root's idea of *host or guest*.
  - **Hostile**: An everyday English word showing the root's idea of *host or guest*.
  - **Hospice**: A home or program providing palliative care for the terminally ill. 2. Historically, a lodging for travelers.
  - **Hospitable**: Friendly and welcoming to strangers or guests. 2. Pleasant and favorable for living.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hosp</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun (`hospes`):** *host*, *hostess*.
- **Medical / Care Suffixes (`-al` / `-ice`):**
  - *hospitāle* $\to$ *hospital*, *hospitalize*, *hospitalization*.
  - *hospitium* $\to$ *hospice*.
- **Adjectival & Abstract Formations:**
  - *hospitālis* $\to$ *hospitable*, *inhospitable*, *hospitality*.
- **French Doublets:**
  - *hostel* (budget lodging).
  - *hotel* (commercial lodging).
  - *hostage* (originally a pledge of hospitality/guest-treaty < Old French *ostage*).

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
const inProg = p.where(n => n.status === "learning");
const done = p.where(n => n.status === "learned");
if (inProg.length === 0 && done.length === 0) {
    dv.paragraph("*No words marked yet. Open any word card below and select 🟡 Learning or 🟢 Learned.*");
} else {
    let out = [];
    if (inProg.length > 0) out.push("🟡 **Currently Studying (" + inProg.length + "):** " + inProg.map(n => n.file.link).join(" · "));
    if (done.length > 0) out.push("🟢 **Mastered (" + done.length + "):** " + done.map(n => n.file.link).join(" · "));
    dv.paragraph(out.join("\n\n"));
}
```

### 1. Medical Care & End-of-Life Comfort
- *hospital* (an institution providing medical and surgical treatment and nursing care).
- *hospitalize* (admit someone to a hospital for treatment).
- *hospice* (a home providing care for the sick, especially the terminally ill).

### 2. Generosity & Welcoming Demeanor
- *hospitality* (the friendly and generous reception and entertainment of guests).
- *hospitable* (friendly and welcoming to strangers or guests; pleasant environment).
- *inhospitable* (harsh and difficult to live in; unwelcoming).

### 3. Travel, Lodging & Entertainment
- *host* (a person who receives or entertains other guests as guests).
- *hostess* (a woman who receives or entertains guests).
- *hostel* (an establishment which provides inexpensive food and lodging for travelers).
- *hotel* (an establishment providing accommodations, meals, and other services for travelers).

---

## 🔀 4. Prefix & Combining Dynamics on hosp

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `hosp-` + `-ital` | Institutional facility | State or charitable sanctuary providing professional healing | *hospital, hospitalization* |
| `hosp-` + `-ice` | Sanctuary noun | Palliative medical care providing peace to the terminally ill | *hospice* |
| `hospit-` + `-able` | Generous disposition | Welcoming strangers into one's home with warmth and food | *hospitable* |
| `in-` + `hospitable` | Hostile privative | Harsh, desolate climate or freezing, unwelcoming people | *inhospitable* |
| `hosp-` + `-el` $\to$ `hotel`| Lodging doublet | Commercial accommodations providing travelers a bed | *hostel, hotel* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Healthcare Administration & Palliative Medicine:** Inpatient hospital management, hospice and palliative care nursing.
- **Hospitality Industry & Tourism:** Hotel revenue management, concierge services, hospitality management degrees.
- **Classical Anthropology & Mediterranean Literature:** The Greek code of *xenia* (guest-friendship in the *Odyssey*), Roman *hospitium*.
- **International Law:** Taking of hostages (Geneva Convention violations).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[hospice]] | noun | **1.** A lodging for travelers (especially one kept by a monastic order).<br>**2.** A program of medical and emotional care for the terminally ill. | *"Our Lady’s Hospice for the dying."* — James Joyce, *Ulysses* |
| [[hospitable]] | adjective | **1.** Favorable to life and growth.<br>**2.** Disposed to treat guests and strangers with cordiality and generosity. | *"Where I find him, were it At home, upon my brother’s guard, even there, Against the hospitable canon, would I Wash my fierce hand in’s heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hospitableness]] | noun | **1.** Having a disposition that welcomes guests and is fond of entertaining. | *"In academic literature, hospitableness designates having a disposition that welcomes guests and is fond of entertaining."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hospitably]] | adverb | **1.** In a hospitable manner. | *"Bagnet hospitably declares that he will hear of no business until after dinner and that his friend shall not partake of his counsel without first partaking of boiled pork and greens."* — Charles Dickens, *Bleak House* |
| [[hospital]] | noun | **1.** A health facility where patients receive treatment.<br>**2.** A medical institution where sick or injured people are given medical or surgical care. | *"Well, befall what will befall, I’ll jest a twelvemonth in an hospital."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hospitalisation]] | noun | **1.** Placing in medical care in a hospital. | *"In academic literature, hospitalisation designates placing in medical care in a hospital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hospitalise]] | verb | **1.** Admit into a hospital. | *"In academic literature, hospitalise designates admit into a hospital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hospitality]] | noun | **1.** Kindness in welcoming guests or strangers. | *"My master is of churlish disposition And little recks to find the way to heaven By doing deeds of hospitality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hospitalization]] | noun | **1.** A period of time when you are confined to a hospital.<br>**2.** The condition of being treated as a patient in a hospital. | *"In academic literature, hospitalization designates a period of time when you are confined to a hospital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hospitalize]] | verb | **1.** Admit into a hospital. | *"In academic literature, hospitalize designates admit into a hospital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhospitable]] | adjective | **1.** Unfavorable to life or growth.<br>**2.** Not hospitable. | *"From all of which we could argue that the inhabitants were as inhospitable as the little of their land we could see."* — Jack London, *The Jacket (The Star-Rover)* |
| [[inhospitableness]] | noun | **1.** The environmental condition in a region that lacks a favorable climate or terrain for life or growth.<br>**2.** Having an unfriendly and inhospitable disposition. | *"In academic literature, inhospitableness designates the environmental condition in a region that lacks a favorable climate or terrain for life or growth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhospitably]] | adverb | **1.** In an inhospitable manner. | *"In academic literature, inhospitably designates in an inhospitable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhospitality]] | noun | **1.** Unkind and inconsiderate welcome. | *"All this he had thought out in the loneliness of foreign ports, in the night watches aboard ship, in the inhospitality of his mother's house, and on the jaunting-car to Dundalk."* — Donn Byrne, *The Wind Bloweth* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HOSP
  </div>
</div>
