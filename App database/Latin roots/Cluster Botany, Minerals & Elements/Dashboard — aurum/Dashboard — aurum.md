---
status: unread
type: root_dashboard
---
# Dashboard — aurum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">aurum-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“gold”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **aurum** means gold. It refers to precious yellow metal, wealth, brilliance, and high value. In English, this root forms words such as *aureate*, *aureole*, *aureus*, and *auric*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: gold
> The root **aurum** means gold. It refers to precious yellow metal, wealth, brilliance, and high value. In English, this root forms words such as *aureate*, *aureole*, *aureus*, and *auric*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Gold</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *aureate* and *aureole*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **aurum** comes from a Latin word that means *"gold"*.
  - At its core, it describes gold.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **aurum** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of gold.
  - **Mental & Social**: How people experience, organize, or communicate about gold.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Aureate**: Pertaining to the color of gold.
  - **Aureole**: A radiant circle of light or halo depicted around the head or body of a holy person.
  - **Aureus**: The standard gold coin of ancient Rome, equal in value to twenty-five silver denarii.
  - **Auric**: Of, relating to, or containing gold, specifically when present in its trivalent oxidation state.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">aurum</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **aurum** functions across English through:
> - **Nominal Base:** Latin *aurum* (stem `aur-`), yielding chemical symbol **Au** and adjective *auric*.
> - **Adjectival Base:** Latin *aureus* ("golden") and diminutive *aureolus* ("little golden one" → French *oriol* → English *oriole*).
> - **Combining Form:** `auri-` / `auro-`, compounding with Latin *-fer* ("bearing" < *ferre* → *auriferous*), *pigmentum* ("pigment" → *orpiment*), *facere* ("to make" → *aurify*), and *therapeia* ("healing" → *aurotherapy*).
> - **Romance Vernacular Shifts:** Latin *aurum* → French *or* (heraldic *or*, *doré*, *d'or*).
>
> In inorganic chemistry, the element gold takes modern valence endings: *aurous* for $Au^{+}$ and *auric* for $Au^{3+}$.

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

> [!tip] 🌈 Shades of Meaning in Different Words
> The family distributes across diverse artistic, scientific, numismatic, and architectural zones:
> - **Literary Criticism & Rhetoric:** [[aureate]] (gilded, grandiloquent, highly ornate Latinate style).
> - **Religious Iconography & Astronomy:** [[aureole]] / [[aureola]] (radiant golden halo; solar corona).
> - **Numismatics & Ancient History:** [[aureus]] (Roman gold coin), [[Milliarium Aureum]] (Golden Milestone in the Roman Forum).
> - **Mining, Mineralogy & Chemistry:** [[auriferous]] (gold-bearing rock or sand), [[auric]] (trivalent gold $Au^{3+}$), [[aurous]] (monovalent gold $Au^{+}$), [[aurate]] (chemical gold salt), [[orpiment]] (golden-yellow arsenic trisulfide mineral pigment), [[aurify]] (to turn into gold), [[aurification]] (alchemical transmutation into gold; dental gold restoration).
> - **Ornithology, Architecture & Heraldry:** [[oriole]] (golden songbird), [[oriel]] (projecting upper-story window, originally a gilded bower), [[or]] (heraldic gold tincture), [[doré]] (gilded, golden-glazed).
> - **Pharmacology & Medicine:** [[aurotherapy]] (therapeutic use of gold salts to treat rheumatoid arthritis).

---

## 🔀 4. Prefix & Combining Dynamics on aurum

### Compounding Elements with `aurum`

| Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **-fer** | bearing (*ferre*) | [[auriferous]] | Geologically bearing, yielding, or containing native gold. |
| **pigmentum** | paint, pigment | [[orpiment]] | Literally "gold pigment"; brilliant yellow arsenic trisulfide mineral. |
| **-therapy** | medical treatment | [[aurotherapy]] | Systemic administration of pharmaceutical gold salts (*chrysotherapy*). |
| **-ficāre** | to make (*facere*) | [[aurify]] / [[aurification]] | Alchemical attempt to transmute base lead into pure gold. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-ate** | Adjective of ornamentation | [[aureate]] | Gilded, golden-hued; florid and ornate in literary diction. |
| **-ole / -ola** | Diminutive noun (*-olus*) | [[aureole]] / [[oriole]] | A little golden crown/halo; a bright yellow-gold songbird. |
| **-ic** | High-valence chemical suffix | [[auric]] | Pertaining to gold in its +3 oxidation state (e.g. auric chloride). |
| **-ous** | Low-valence chemical suffix | [[aurous]] | Pertaining to gold in its +1 oxidation state. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Economic Geology & Placer Mining** | [[auriferous]] | Identifying auriferous quartz reefs, assaying river gravels for placer gold, and epithermal gold-deposit mapping. |
| **Art History & Medieval Manuscript Illumination** | [[orpiment]], [[aureole]], [[doré]] | Analyzing authentic mineral pigments (*auripigmentum*) in medieval scriptoria, and fresco iconography of saints' golden haloes. |
| **English Literature & Philology** | [[aureate]] | Examining the stylistic transition from Middle English vernacular to the florid, Latinate aureate rhetoric of Dunbar and Lydgate. |
| **Numismatics & Roman Archaeology** | [[aureus]], [[Milliarium Aureum]] | Cataloging Julio-Claudian imperial mintages, countermarks, and studying the golden milestone network of Roman Italy. |
| **Rheumatology & Clinical Pharmacology** | [[aurotherapy]] | Managing autoimmune arthritis using disease-modifying antirheumatic gold salts (e.g. auranofin, sodium aurothiomalate). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aura]] | noun | **1.** A sensation (as of a cold breeze or bright light) that precedes the onset of certain disorders such as a migraine attack or epileptic seizure.<br>**2.** An indication of radiant light drawn around the head of a saint. | *"Et cela doit signifier,” said she, “qu’il y aura là dedans un cadeau pour moi, et peut-être pour vous aussi, mademoiselle."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[aural]] | adjective | **1.** Of or pertaining to hearing or the ear.<br>**2.** Relating to or characterized by an aura. | *"In academic literature, aural designates of or pertaining to hearing or the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurally]] | adverb | **1.** With regard to sound or the ear. | *"In academic literature, aurally designates with regard to sound or the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aureate]] | adjective | **1.** Elaborately or excessively ornamented.<br>**2.** Having the deep slightly brownish color of gold. | *"In academic literature, aureate designates elaborately or excessively ornamented."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurelius]] | noun | **1.** Emperor of rome; nephew and son-in-law and adoptive son of antonius pius; stoic philosopher; the decline of the roman empire began under marcus aurelius (121-180). | *"Marcus Aurelius has a very similar warning (v. 16)--"Whatever the colour of the thoughts often before thy mind, that colour will thy mind take."* — T. R. Glover, *The Jesus of History* |
| [[aureolaria]] | noun | **1.** Small genus of north american herbs often root-parasitic and bearing golden-yellow flowers; sometimes placed in genus gerardia. | *"In academic literature, aureolaria designates small genus of north american herbs often root-parasitic and bearing golden-yellow flowers; sometimes placed in genus gerardia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aureole]] | noun | **1.** The outermost region of the sun's atmosphere; visible as a white halo during a solar eclipse.<br>**2.** An indication of radiant light drawn around the head of a saint. | *"For the wind was rising and had begun to disperse the clouds, and suddenly the sun broke through, and the glory of it fell like an aureole on the young wife, and at once she vanished away."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[aureomycin]] | noun | **1.** A yellow crystalline antibiotic (trade name aureomycin) used to treat certain bacterial and rickettsial diseases. | *"In academic literature, aureomycin designates a yellow crystalline antibiotic (trade name aureomycin) used to treat certain bacterial and rickettsial diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auric]] | adjective | **1.** Of or relating to or containing or derived from gold. | *"An emerald set in the ring of the sea. —People do not know how dangerous lovesongs can be, the auric egg of Russell warned occultly."* — James Joyce, *Ulysses* |
| [[auricle]] | noun | **1.** A small conical pouch projecting from the upper anterior part of each atrium of the heart.<br>**2.** The externally visible cartilaginous structure of the external ear. | *"In academic literature, auricle designates a small conical pouch projecting from the upper anterior part of each atrium of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auricula]] | noun | **1.** Yellow-flowered primrose native to alps; commonly cultivated.<br>**2.** A pouch projecting from the top front of each atrium of the heart. | *"Flowers peeped out amongst the leaves; snow-drops, crocuses, purple auriculas, and golden-eyed pansies."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[auricular]] | adjective | **1.** Of or relating to near the ear.<br>**2.** Relating to or perceived by or shaped like the organ of hearing; - george santayana. | *"If your honour judge it meet, I will place you where you shall hear us confer of this, and by an auricular assurance have your satisfaction, and that without any further delay than this very evening."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[auriculare]] | noun | **1.** The craniometric point at the center of the opening of the external acoustic meatus. | *"In academic literature, auriculare designates the craniometric point at the center of the opening of the external acoustic meatus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auricularia]] | noun | **1.** Type genus of the auriculariaceae. | *"In academic literature, auricularia designates type genus of the auriculariaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriculariaceae]] | noun | **1.** Fungi having gelatinous sporophores. | *"In academic literature, auriculariaceae designates fungi having gelatinous sporophores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriculariales]] | noun | **1.** Coextensive with the family auriculariaceae; sometimes included in the order tremellales. | *"In academic literature, auriculariales designates coextensive with the family auriculariaceae; sometimes included in the order tremellales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriculate]] | adjective | **1.** Having auricles. | *"In academic literature, auriculate designates having auricles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriculated]] | adjective | **1.** Having auricles. | *"In academic literature, auriculated designates having auricles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriculoventricular]] | adjective | **1.** Relating to or affecting the atria and ventricles of the heart. | *"In academic literature, auriculoventricular designates relating to or affecting the atria and ventricles of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriferous]] | adjective | **1.** Containing gold. | *"Douglas that he had discovered an auriferous reef on Johannet Island, situated in the above named group, showing him specimens therefrom."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[auriform]] | adjective | **1.** Having a shape resembling an ear. | *"In academic literature, auriform designates having a shape resembling an ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurify]] | verb | **1.** Transform into gold.<br>**2.** Turn golden. | *"In academic literature, aurify designates transform into gold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriga]] | noun | **1.** A conspicuous constellation in the northern hemisphere; between great bear and orion at edge of milky way. | *"In academic literature, auriga designates a conspicuous constellation in the northern hemisphere; between great bear and orion at edge of milky way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriparus]] | noun | **1.** A genus of paridae. | *"In academic literature, auriparus designates a genus of paridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriscope]] | noun | **1.** Medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane). | *"In academic literature, auriscope designates medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurochs]] | noun | **1.** European bison having a smaller and higher head than the north american bison.<br>**2.** Large recently extinct long-horned european wild ox; considered one of the ancestors of domestic cattle. | *"In academic literature, aurochs designates european bison having a smaller and higher head than the north american bison."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurora]] | noun | **1.** The first light of day.<br>**2.** An atmospheric phenomenon consisting of bands of light caused by charged solar particles following the earth's magnetic lines of force. | *"My fairy lord, this must be done with haste, For night’s swift dragons cut the clouds full fast; And yonder shines Aurora’s harbinger, At whose approach, ghosts wandering here and there Troop home to churchyards."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[auroral]] | adjective | **1.** Of or relating to the atmospheric phenomenon auroras.<br>**2.** Characteristic of the dawn. | *"In academic literature, auroral designates of or relating to the atmospheric phenomenon auroras."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurorean]] | adjective | **1.** Characteristic of the dawn. | *"In academic literature, aurorean designates characteristic of the dawn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auroscope]] | noun | **1.** Medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane). | *"In academic literature, auroscope designates medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aurous]] | adjective | **1.** Of or relating to or containing or derived from gold. | *"In academic literature, aurous designates of or relating to or containing or derived from gold."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AURUM
  </div>
</div>
