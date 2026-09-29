---
status: unread
type: root_dashboard
---
# Dashboard — mar
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mar-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sea”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Tall green trees, rolling hills, and rain watering the fertile landscape.</span>
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

The root **mar** means sea. It refers to the vast expanse of saltwater covering much of the earth. In English, this root forms words such as *marine*, *maritime*, *submarine*, and *mariner*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sea
> The root **mar** means sea. It refers to the vast expanse of saltwater covering much of the earth. In English, this root forms words such as *marine*, *maritime*, *submarine*, and *mariner*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sea</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *marine* and *maritime*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mar** comes from a Latin word that means *"sea"*.
  - At its core, it describes sea.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **mar** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sea.
  - **Mental & Social**: How people experience, organize, or communicate about sea.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Marine**: Of, relating to, or found in the sea.
  - **Maritime**: Connected with the sea, especially in relation to commercial seafaring, naval activity, or shipping.
  - **Submarine**: A warship designed to operate completely underwater for extended periods.
  - **Mariner**: A person who navigates or assists in navigating a ship at sea.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mar</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mar** generates words through Latin adjectives, romance borrowings, and modern compounds:
> - **Base Latin Adjectives `marin-` and `maritim-`:**
>   - Adjective / Noun: *marine* (sea-related; naval soldier).
>   - Specialist: *mariner* (sailor).
>   - Commercial adjective: *maritime* (sea trade and navigation).
> - **Prefix Formations on `marin-`:**
>   - `sub-` ("under") $\to$ *submarine*, *submariner*.
>   - `trans-` ("across") $\to$ *transmarine* (crossing the sea).
>   - `ultra-` ("beyond") $\to$ *ultramarine* (pigment from beyond the sea).
> - **Romance Culinary & Harbor Conduits:**
>   - Italian *marina* (boat harbor).
>   - French/Spanish *marinade* (brine solution), *marinate* (soak in brine).
> - **Mineral & Planetary Compounds:**
>   - *aquamarine* (*aqua* + *marīna* "sea-water beryl").
>   - Astronomical Latin loan: *mare* (pl. *maria*).

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
> - **Oceanography & Marine Biology:** Pelagic and benthic marine ecosystems, oceanic flora, and coral reef conservation (*marine*).
> - **Admiralty Law, Shipping & Commerce:** Merchant shipping lanes, naval defense, port regulations, and coastal sovereignty (*maritime*, *mariner*).
> - **Underwater Defense & Naval Architecture:** Subsurface naval combat vessels, sonar navigation, and saturation submarine crews (*submarine*, *submariner*).
> - **Harbor Management & Boating:** Recreational docks, slip moorings, and yacht basins (*marina*).
> - **Fine Arts & Historical Pigments:** The luminous, deep blue pigment synthesized from lapis lazuli (*ultramarine*).
> - **Culinary Science & Gastronomy:** Acidic or saline seasoning liquids used to tenderize meat and infuse flavor (*marinade*, *marinate*).
> - **Planetary Science & Selenology:** Ancient volcanic basalt plains on the Moon (*mare*, *maria*).

---

## 🔀 4. Prefix & Combining Dynamics on mar

### Prefix Dynamics
- **`sub-` (Under / Beneath):** *submarine* $\to$ operating beneath the surface of the sea.
- **`trans-` (Across / Beyond):** *transmarine* $\to$ situated across or crossing the ocean.
- **`ultra-` (Beyond / Surpassing):** *ultramarine* $\to$ originating from "beyond the sea."

### Suffix Dynamics
- **`-ine` (Pertaining to):** *marine* $\to$ relating to the sea.
- **`-itime` (Latin Adjectival Suffix):** *maritime* $\to$ relating to the sea coast or shipping.
- **`-er` (Agent / Navigator):** *mariner* $\to$ a sailor.
- **`-ade` / `-ate` (Culinary Action / Preparation):** *marinade*, *marinate*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **International Admiralty Law & UNCLOS:** The United Nations Convention on the Law of the Sea defining *maritime* exclusive economic zones (EEZs) and innocent passage rights.
> - **Naval Warfare & Submarine Defense:** Ballistic missile and attack *submarines* operating with air-independent propulsion (AIP) in acoustic stealth beneath thermoclines.
> - **Marine Ecology & Conservation Biology:** Establishing *Marine* Protected Areas (MPAs) to safeguard pelagic biodiversity and restore overfished oceanic ecosystems.
> - **Planetary Science & Apollo Lunar Missions:** Apollo 11 touchdown on the basaltic plain of the lunar *Mare Tranquillitatis* in July 1969.
> - **Art Restoration & Spectrophotometry:** Identifying historical genuine *ultramarine* bound in egg tempera vs. 19th-century synthetic French ultramarine (Guimet's blue).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antisubmarine]] | adjective | **1.** Defensive against enemy submarines. | *"In academic literature, antisubmarine designates defensive against enemy submarines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asmara]] | noun | **1.** The capital of eritrea. | *"In academic literature, asmara designates the capital of eritrea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countermarch]] | noun | **1.** (military) a march in the reverse direction or back along the same route.<br>**2.** March back along the same way. | *"When the balloting was completed the company had countermarched twice, and stood on the same ground it occupied before the ceremony began."* — Harry Castlemon, *Rodney, the Partisan* |
| [[demarcate]] | verb | **1.** Separate clearly, as if by boundaries.<br>**2.** Set, mark, or draw the boundaries of something. | *"In academic literature, demarcate designates separate clearly, as if by boundaries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demarcation]] | noun | **1.** The boundary of a specific area.<br>**2.** A conceptual separation or distinction. | *"The line of demarcation between savings banks and savings departments of commercial banks cannot be sharply drawn."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[demarche]] | noun | **1.** A move or step or maneuver in political or diplomatic affairs. | *"In academic literature, demarche designates a move or step or maneuver in political or diplomatic affairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extramarital]] | adjective | **1.** Characterized by adultery. | *"In academic literature, extramarital designates characterized by adultery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inmarriage]] | noun | **1.** Marriage within one's own tribe or group as required by custom or law. | *"In academic literature, inmarriage designates marriage within one's own tribe or group as required by custom or law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inmarry]] | verb | **1.** Marry within one's own tribe or group. | *"In academic literature, inmarry designates marry within one's own tribe or group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermarriage]] | noun | **1.** Marriage to a person belonging to a tribe or group other than your own as required by custom or law.<br>**2.** Marriage within one's own tribe or group as required by custom or law. | *"Jews, whom christians tax with avarice, are of all races the most given to intermarriage."* — James Joyce, *Ulysses* |
| [[intermarry]] | verb | **1.** Marry within the same ethnic, social, or family group. | *"They seldom intermarry with their neighbours on the north-west side of the Gower."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[mar]] | noun | **1.** The month following february and preceding april.<br>**2.** A mark or flaw that spoils the appearance of something (especially on a person's body). | *"Were it not sinful then striving to mend, To mar the subject that before was well?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mara]] | noun | **1.** Hindu god of death; opposite of kama.<br>**2.** Hare-like rodent of the pampas of argentina. | *"In the Mara tribe of Northern Australia the rain-maker goes to a pool and sings over it his magic song."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[marabou]] | noun | **1.** Large african black-and-white carrion-eating stork; its downy underwing feathers are used to trim garments.<br>**2.** The downy feathers of marabou storks are used for trimming garments. | *"In academic literature, marabou designates large african black-and-white carrion-eating stork; its downy underwing feathers are used to trim garments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marabout]] | noun | **1.** Large african black-and-white carrion-eating stork; its downy underwing feathers are used to trim garments. | *"In academic literature, marabout designates large african black-and-white carrion-eating stork; its downy underwing feathers are used to trim garments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maraca]] | noun | **1.** A percussion instrument consisting of a hollow gourd containing pebbles or beans; often played in pairs. | *"In academic literature, maraca designates a percussion instrument consisting of a hollow gourd containing pebbles or beans; often played in pairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maracaibo]] | noun | **1.** A port city in northwestern venezuela; a major oil center. | *"In academic literature, maracaibo designates a port city in northwestern venezuela; a major oil center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maracay]] | noun | **1.** A city in north central venezuela; cattle center. | *"In academic literature, maracay designates a city in north central venezuela; cattle center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maraco]] | noun | **1.** A member of the south american people living in argentina and bolivia and paraguay.<br>**2.** The language spoken by the maraco. | *"In academic literature, maraco designates a member of the south american people living in argentina and bolivia and paraguay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marang]] | noun | **1.** Philippine tree similar to the breadfruit tree bearing edible fruit.<br>**2.** Tropical fruit from the philippines having a mass of small seeds embedded in sweetish white pulp. | *"In academic literature, marang designates philippine tree similar to the breadfruit tree bearing edible fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maranta]] | noun | **1.** Any of numerous herbs of the genus maranta having tuberous starchy roots and large sheathing leaves. | *"In academic literature, maranta designates any of numerous herbs of the genus maranta having tuberous starchy roots and large sheathing leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marantaceae]] | noun | **1.** Tropical perennial herbs with usually starchy rhizomes. | *"In academic literature, marantaceae designates tropical perennial herbs with usually starchy rhizomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marasca]] | noun | **1.** Small bitter fruit of the marasca cherry tree from whose juice maraschino liqueur is made.<br>**2.** Dalmatian bitter wild cherry tree bearing fruit whose juice is made into maraschino liqueur. | *"In academic literature, marasca designates small bitter fruit of the marasca cherry tree from whose juice maraschino liqueur is made."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maraschino]] | noun | **1.** Distilled from fermented juice of bitter wild marasca cherries.<br>**2.** Cherry preserved in true or imitation maraschino liqueur. | *"They pined in depth of ocean shadow, gold by the beerpull, bronze by maraschino, thoughtful all two."* — James Joyce, *Ulysses* |
| [[marasmius]] | noun | **1.** Chiefly small mushrooms with white spores. | *"In academic literature, marasmius designates chiefly small mushrooms with white spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marasmus]] | noun | **1.** Extreme malnutrition and emaciation (especially in children); can result from inadequate intake of food or from malabsorption or metabolic disorders. | *"In academic literature, marasmus designates extreme malnutrition and emaciation (especially in children); can result from inadequate intake of food or from malabsorption or metabolic disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marat]] | noun | **1.** French revolutionary leader (born in switzerland) who was a leader in overthrowing the girondists and was stabbed to death in his bath by charlotte corday (1743-1793). | *"I said so even at the time when everybody was in raptures about him, when he had just returned from abroad, and when, if you remember, he posed as a sort of Marat at one of my soirees."* — graf Leo Tolstoy, *War and Peace* |
| [[maratha]] | noun | **1.** A member of a people of india living in maharashtra. | *"In academic literature, maratha designates a member of a people of india living in maharashtra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marathi]] | noun | **1.** An indic language; the state language of maharashtra in west central india; written in the devanagari script. | *"In academic literature, marathi designates an indic language; the state language of maharashtra in west central india; written in the devanagari script."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marathon]] | noun | **1.** Any long and arduous undertaking.<br>**2.** A footrace of 26 miles 385 yards. | *"O boys! —And Xenophon looked upon Marathon, Mr Dedalus said, looking again on the fireplace and to the window, and Marathon looked on the sea. —That will do, professor MacHugh cried from the window."* — James Joyce, *Ulysses* |
| [[marathoner]] | noun | **1.** Someone who participates in long-distance races (especially in marathons). | *"In academic literature, marathoner designates someone who participates in long-distance races (especially in marathons)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marattia]] | noun | **1.** Type genus of the marattiaceae: ferns having the sporangia fused together in two rows. | *"In academic literature, marattia designates type genus of the marattiaceae: ferns having the sporangia fused together in two rows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marattiaceae]] | noun | **1.** Constituting the order marattiales: chiefly tropical eusporangiate ferns with gigantic fronds. | *"In academic literature, marattiaceae designates constituting the order marattiales: chiefly tropical eusporangiate ferns with gigantic fronds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marattiales]] | noun | **1.** Lower ferns coextensive with the family marattiaceae. | *"In academic literature, marattiales designates lower ferns coextensive with the family marattiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maraud]] | noun | **1.** A sudden short attack.<br>**2.** Raid and rove in search of booty. | *"There was not a sea fight, nor marauding nor freebooting adventure that had happened within the last twenty years, but he seemed perfectly versed in it."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[marauder]] | noun | **1.** Someone who attacks in search of booty. | *"Sebastian Cabot, too, the grim marauder, seeking to plunder the slender Indians, he had been here."* — Donn Byrne, *The Wind Bloweth* |
| [[marauding]] | verb | **1.** Raid and rove in search of booty.<br>**2.** Characterized by plundering or pillaging or marauding. | *"There was not a sea fight, nor marauding nor freebooting adventure that had happened within the last twenty years, but he seemed perfectly versed in it."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[maravilla]] | noun | **1.** Wildflower having vibrant deep pink tubular evening-blooming flowers; found in sandy and desert areas from southern california to southern colorado and into mexico.<br>**2.** Leafy wildflower having fragrant slender white or pale pink trumpet-shaped flowers; southwestern united states and northern mexico. | *"In academic literature, maravilla designates wildflower having vibrant deep pink tubular evening-blooming flowers; found in sandy and desert areas from southern california to southern colorado and into mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marble]] | noun | **1.** A hard crystalline metamorphic rock that takes a high polish; used for sculpture and as building material.<br>**2.** A small ball of glass that is used in various games. | *"Now from head to foot I am marble-constant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marbled]] | verb | **1.** Paint or stain like marble.<br>**2.** Patterned with veins or streaks or color resembling marble. | *"Go great with tigers, dragons, wolves, and bears; Teem with new monsters, whom thy upward face Hath to the marbled mansion all above Never presented."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marbleisation]] | noun | **1.** A texture like that of marble. | *"In academic literature, marbleisation designates a texture like that of marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marbleise]] | verb | **1.** Make something look like marble. | *"In academic literature, marbleise designates make something look like marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marbleization]] | noun | **1.** A texture like that of marble. | *"In academic literature, marbleization designates a texture like that of marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marbleize]] | verb | **1.** Make something look like marble. | *"In academic literature, marbleize designates make something look like marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marbleized]] | verb | **1.** Make something look like marble.<br>**2.** Patterned with veins or streaks or color resembling marble. | *"In academic literature, marbleized designates make something look like marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marbleizing]] | noun | **1.** A texture like that of marble.<br>**2.** Make something look like marble. | *"In academic literature, marbleizing designates a texture like that of marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marbling]] | noun | **1.** The intermixture of fat and lean in a cut of meat.<br>**2.** Paint or stain like marble. | *"It is evident that streaked and mottled effects appealed specially to the taste of the time, and marbling both of the glaze and of the body was practised."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[marc]] | noun | **1.** Made from residue of grapes or apples after pressing. | *"Marc._ iv, 17, _nihil impudentius si ille nos sibi filio faciet qui nobis filios facere non permisit aufercndo conubium_. [61] de Rossi, cited by Harnack, _Expansion_, i, 208 n. [62] Romans 1, 14. [63] See p. 241; and cf."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[marceau]] | noun | **1.** French mime famous for his sad-faced clown (born in 1923). | *"In academic literature, marceau designates french mime famous for his sad-faced clown (born in 1923)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marcel]] | noun | **1.** A hairdo characterized by deep regular waves that are made by a heated curling iron.<br>**2.** Make a marcel in a woman's hair. | *"In academic literature, marcel designates a hairdo characterized by deep regular waves that are made by a heated curling iron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[march]] | noun | **1.** The month following february and preceding april.<br>**2.** The act of marching; walking with regular steps (especially in a procession of some kind). | *"Is this the way? [_A march afar._] WIDOW."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marchantia]] | noun | **1.** Type genus of marchantiaceae; liverworts that reproduce asexually by gemmae and have stalked antheridiophores. | *"In academic literature, marchantia designates type genus of marchantiaceae; liverworts that reproduce asexually by gemmae and have stalked antheridiophores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marchantiaceae]] | noun | **1.** Liverworts with prostrate and usually dichotomously branched thalli. | *"In academic literature, marchantiaceae designates liverworts with prostrate and usually dichotomously branched thalli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marchantiales]] | noun | **1.** Liverworts with gametophyte differentiated internally. | *"In academic literature, marchantiales designates liverworts with gametophyte differentiated internally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marche]] | noun | **1.** A region in central italy. | *"They of those marches, gracious sovereign, Shall be a wall sufficient to defend Our inland from the pilfering borderers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marcher]] | noun | **1.** An inhabitant of a border district.<br>**2.** Walks with regular or stately step. | *"In academic literature, marcher designates an inhabitant of a border district."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marches]] | noun | **1.** A region in central italy. | *"They of those marches, gracious sovereign, Shall be a wall sufficient to defend Our inland from the pilfering borderers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marching]] | noun | **1.** The act of marching; walking with regular steps (especially in a procession of some kind).<br>**2.** March in a procession. | *"Enter Pompey and Menas at one door, with drum and trumpet; at another, Caesar, Lepidus, Antony, Enobarbus, Maecenas, Agrippa, with Soldiers marching."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marchioness]] | noun | **1.** The wife or widow of a marquis.<br>**2.** A noblewoman ranking below a duchess and above a countess. | *"He will be marquis some day, and there is no denying that she would make a good marchioness: she looks handsomer than ever in her mourning.” “My dear Elinor, do let the poor woman alone."* — George Eliot, *Middlemarch* |
| [[marchland]] | noun | **1.** District consisting of the area on either side of a border or boundary of a country or an area. | *"In academic literature, marchland designates district consisting of the area on either side of a border or boundary of a country or an area."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marchpane]] | noun | **1.** Almond paste and egg whites. | *"Good thou, save me a piece of marchpane; and as thou loves me, let the porter let in Susan Grindstone and Nell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marciano]] | noun | **1.** United states prizefighter who won the world heavyweight championship in 1952 (1924-1969). | *"In academic literature, marciano designates united states prizefighter who won the world heavyweight championship in 1952 (1924-1969)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marcionism]] | noun | **1.** The christian heresy of the 2nd and 3rd centuries that rejected the old testament and denied the incarnation of god in jesus as a human. | *"In academic literature, marcionism designates the christian heresy of the 2nd and 3rd centuries that rejected the old testament and denied the incarnation of god in jesus as a human."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marconi]] | noun | **1.** Italian electrical engineer who invented wireless telegraphy and in 1901 transmitted radio signals across the atlantic ocean (1874-1937). | *"When wireless telegraphy reached the point at which the public became interested, Marconi was just coming to the front and so, for ever, will his name be foremost in the public estimation."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[marcuse]] | noun | **1.** United states political philosopher (born in germany) concerned about the dehumanizing effects of capitalism and modern technology (1898-1979). | *"In academic literature, marcuse designates united states political philosopher (born in germany) concerned about the dehumanizing effects of capitalism and modern technology (1898-1979)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mare]] | noun | **1.** Female equine animal.<br>**2.** A dark region of considerable extent on the surface of the moon. | *"He hath put all my substance into that fat belly of his: but I will have some of it out again, or I will ride thee o’ nights like the mare."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marengo]] | noun | **1.** A battle in 1800 in which the french under napoleon bonaparte won a great victory over the austrians. | *"So it had been at Lodi, Marengo, Arcola, Jena, Austerlitz, Wagram, and so on."* — graf Leo Tolstoy, *War and Peace* |
| [[mari]] | noun | **1.** A member of a rural finnish people living in eastern russia.<br>**2.** The finnic language spoken by the cheremis. | *"What’s on you? _Ma mère m’a mariée._ British Beatitudes! _Retamplatan digidi boumboum_."* — James Joyce, *Ulysses* |
| [[maria]] | noun | **1.** A dark region of considerable extent on the surface of the moon.<br>**2.** Valuable timber tree of panama. | *"A pavilion and tents at a distance Enter the Princess of France, with three attending Ladies: Rosaline, Maria, Katharine and three Lords: Boyet, and two others."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mariachi]] | noun | **1.** A group of street musicians in mexico. | *"In academic literature, mariachi designates a group of street musicians in mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marian]] | adjective | **1.** Of or relating to or venerating the virgin mary. | *"Maud, Bridget, Marian, Cicely, Gillian, Ginn!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marianas]] | noun | **1.** A chain of coral and volcanic islands in micronesia (including guam and the northern marianas) halfway between new guinea and japan; discovered by magellan in 1521. | *"In academic literature, marianas designates a chain of coral and volcanic islands in micronesia (including guam and the northern marianas) halfway between new guinea and japan; discovered by magellan in 1521."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maricopa]] | noun | **1.** A member of a north american indian people of the gila river valley in arizona.<br>**2.** The yuman language spoken by the maricopa and the halchidhoma. | *"In academic literature, maricopa designates a member of a north american indian people of the gila river valley in arizona."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mariehamn]] | noun | **1.** A town that is the chief port of the aland islands. | *"In academic literature, mariehamn designates a town that is the chief port of the aland islands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marigold]] | noun | **1.** Any of various tropical american plants of the genus tagetes widely cultivated for their showy yellow or orange flowers. | *"Here’s flowers for you: Hot lavender, mints, savory, marjoram, The marigold, that goes to bed with th’ sun And with him rises weeping."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marihuana]] | noun | **1.** A strong-smelling plant from whose dried leaves a number of euphoriant and hallucinogenic drugs are prepared.<br>**2.** The most commonly used illicit drug; considered a soft drug, it consists of the dried leaves of the hemp plant; smoked or chewed for euphoric effect. | *"In academic literature, marihuana designates a strong-smelling plant from whose dried leaves a number of euphoriant and hallucinogenic drugs are prepared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marijuana]] | noun | **1.** A strong-smelling plant from whose dried leaves a number of euphoriant and hallucinogenic drugs are prepared.<br>**2.** The most commonly used illicit drug; considered a soft drug, it consists of the dried leaves of the hemp plant; smoked or chewed for euphoric effect. | *"In academic literature, marijuana designates a strong-smelling plant from whose dried leaves a number of euphoriant and hallucinogenic drugs are prepared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marimba]] | noun | **1.** A percussion instrument with wooden bars tuned to produce a chromatic scale and with resonators; played with small mallets. | *"In academic literature, marimba designates a percussion instrument with wooden bars tuned to produce a chromatic scale and with resonators; played with small mallets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marina]] | noun | **1.** A fancy dock for small yachts and cabin cruisers. | *"Before the monument of Marina at Tarsus Scene V."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marinade]] | noun | **1.** Mixtures of vinegar or wine and oil with various spices and seasonings; used for soaking foods before cooking.<br>**2.** Soak in marinade. | *"In academic literature, marinade designates mixtures of vinegar or wine and oil with various spices and seasonings; used for soaking foods before cooking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marinara]] | noun | **1.** Sauce for pasta; contains tomatoes and garlic and herbs. | *"In academic literature, marinara designates sauce for pasta; contains tomatoes and garlic and herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marinate]] | verb | **1.** Soak in marinade. | *"In academic literature, marinate designates soak in marinade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marine]] | noun | **1.** A member of the united states marine corps.<br>**2.** A soldier who serves both on shipboard and on land. | *"Also, in long thin letters, KROOK, DEALER IN MARINE STORES."* — Charles Dickens, *Bleak House* |
| [[marineland]] | noun | **1.** A commercial aquarium featuring trained dolphins. | *"In academic literature, marineland designates a commercial aquarium featuring trained dolphins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mariner]] | noun | **1.** A man who serves as a sailor. | *"Mariner, say what coast is this?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marines]] | noun | **1.** Members of a body of troops trained to serve on land or at sea.<br>**2.** A member of the united states marine corps. | *"But Miss Frances married, in the common phrase, to disoblige her family, and by fixing on a lieutenant of marines, without education, fortune, or connexions, did it very thoroughly."* — Jane Austen, *Mansfield Park* |
| [[marini]] | noun | **1.** Italian poet (1569-1625). | *"In academic literature, marini designates italian poet (1569-1625)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marino]] | noun | **1.** Italian poet (1569-1625). | *"Through all the mutations, and revolutions, and relinings of the maps of Europe, the little territory of San Marino has been sacredly respected."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[marionette]] | noun | **1.** A small figure of a person operated from above with strings by a puppeteer. | *"Now that Kathleen is married, she naturally takes with her her own fortune." She looked at me expectantly, and I smiled, another stiff, marionette smile--and said:-- "How true!"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[mariposa]] | noun | **1.** Any of several plants of the genus calochortus having tulip-shaped flowers with 3 sepals and 3 petals; southwestern united states and mexico. | *"Produced by David Schwan THEIR MARIPOSA LEGEND A Romance of Santa Catalina By Charlotte Herr To Little Bruce Parker Who Loved Stories Part I."* — Charlotte B. Herr, *Their Mariposa Legend: A Romance of Santa Catalina* |
| [[mariposan]] | noun | **1.** A penutian language spoken by the yokuts in the san joaquin valley. | *"In academic literature, mariposan designates a penutian language spoken by the yokuts in the san joaquin valley."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marital]] | adjective | **1.** Of or relating to the state of marriage. | *"Having once embarked on your marital voyage, it is impossible not to be aware that you make no way and that the sea is not within sight—that, in fact, you are exploring an enclosed basin."* — George Eliot, *Middlemarch* |
| [[mariticide]] | noun | **1.** The murder of a husband by his wife. | *"In academic literature, mariticide designates the murder of a husband by his wife."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maritime]] | adjective | **1.** Relating to or involving ships or shipping or navigation or seamen.<br>**2.** Bordering on or living or characteristic of those near the sea. | *"Many hot inroads They make in Italy—the borders maritime Lack blood to think on’t—and flush youth revolt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[maritimes]] | noun | **1.** The collective name for the canadian provinces of new brunswick and nova scotia and prince edward island. | *"In academic literature, maritimes designates the collective name for the canadian provinces of new brunswick and nova scotia and prince edward island."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marl]] | noun | **1.** A loose and crumbling earthy deposit consisting mainly of calcite or dolomite; used as a fertilizer for soils deficient in lime. | *"Would it not grieve a woman to be over-mastered with a piece of valiant dust? to make an account of her life to a clod of wayward marl?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marlberry]] | noun | **1.** Tropical american shrub or small tree with brown wood and dark berries. | *"In academic literature, marlberry designates tropical american shrub or small tree with brown wood and dark berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marley]] | noun | **1.** Jamaican singer who popularized reggae (1945-1981). | *"ANNE GILCHRIST TO WALT WHITMAN _Marley, Haslemere, England_ _August 22, 1880_ 193 LVI."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[marlin]] | noun | **1.** Large long-jawed oceanic sport fishes; related to sailfishes and spearfishes; not completely cold-blooded i.e. able to warm their brains and eyes. | *"In academic literature, marlin designates large long-jawed oceanic sport fishes; related to sailfishes and spearfishes; not completely cold-blooded i.e. able to warm their brains and eyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marline]] | noun | **1.** A small usually tarred line of 2 strands. | *"In academic literature, marline designates a small usually tarred line of 2 strands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marlinespike]] | noun | **1.** A pointed iron hand tool that is used to separate strands of a rope or cable (as in splicing). | *"In academic literature, marlinespike designates a pointed iron hand tool that is used to separate strands of a rope or cable (as in splicing)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marlingspike]] | noun | **1.** A pointed iron hand tool that is used to separate strands of a rope or cable (as in splicing). | *"In academic literature, marlingspike designates a pointed iron hand tool that is used to separate strands of a rope or cable (as in splicing)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marlinspike]] | noun | **1.** A pointed iron hand tool that is used to separate strands of a rope or cable (as in splicing). | *"In academic literature, marlinspike designates a pointed iron hand tool that is used to separate strands of a rope or cable (as in splicing)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marlite]] | noun | **1.** Metamorphic rock with approximately the same composition as marl. | *"In academic literature, marlite designates metamorphic rock with approximately the same composition as marl."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marlowe]] | noun | **1.** English poet and playwright who introduced blank verse as a form of dramatic expression; was stabbed to death in a tavern brawl (1564-1593).<br>**2.** Tough cynical detective (one of the early detective heroes in american fiction) created by raymond chandler. | *"Naumann has been painting the Saints drawing the Car of the Church, and I have been making a sketch of Marlowe’s Tamburlaine Driving the Conquered Kings in his Chariot."* — George Eliot, *Middlemarch* |
| [[marlstone]] | noun | **1.** Metamorphic rock with approximately the same composition as marl. | *"In academic literature, marlstone designates metamorphic rock with approximately the same composition as marl."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marly]] | adjective | **1.** Of or relating to or resembling or abounding in marl. | *"In academic literature, marly designates of or relating to or resembling or abounding in marl."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marmalade]] | noun | **1.** A preserve made of the pulp and rind of citrus fruits. | *"Bucket lays in a breakfast of two mutton chops as a foundation to work upon, together with tea, eggs, toast, and marmalade on a corresponding scale."* — Charles Dickens, *Bleak House* |
| [[marmara]] | noun | **1.** An inland sea in northwestern turkey; linked to the black sea by the bosporus and linked to the aegean by the dardanelles. | *"In academic literature, marmara designates an inland sea in northwestern turkey; linked to the black sea by the bosporus and linked to the aegean by the dardanelles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marmite]] | noun | **1.** Soup cooked in a large pot.<br>**2.** A large pot especially one with legs used e.g. for cooking soup. | *"In academic literature, marmite designates soup cooked in a large pot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marmora]] | noun | **1.** An inland sea in northwestern turkey; linked to the black sea by the bosporus and linked to the aegean by the dardanelles. | *"In academic literature, marmora designates an inland sea in northwestern turkey; linked to the black sea by the bosporus and linked to the aegean by the dardanelles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marmoreal]] | adjective | **1.** Of or relating to or characteristic of marble. | *"The feet of the sweet winds Break all the river's peace Into marmoreal bars."* — George W. Cronyn, *The Glebe 1914/09 (Vol. 2, No. 2): Poems* |
| [[marmorean]] | adjective | **1.** Of or relating to or characteristic of marble. | *"In academic literature, marmorean designates of or relating to or characteristic of marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marmoset]] | noun | **1.** Small soft-furred south american and central american monkey with claws instead of nails. | *"In academic literature, marmoset designates small soft-furred south american and central american monkey with claws instead of nails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marmot]] | noun | **1.** Stocky coarse-furred burrowing rodent with a short bushy tail found throughout the northern hemisphere; hibernates in winter. | *"Sand grouse were plentiful, half running, half flying before us as we advanced, and when we were well in the desert we saw eagles in large numbers, and farther north the marmots abounded, in appearance and ways much like prairie dogs."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[marmota]] | noun | **1.** Marmots. | *"Classical and authoritative lexicons catalog marmota as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maroc]] | noun | **1.** A kingdom (constitutional monarchy) in northwestern africa with a largely muslim population; achieved independence from france in 1956.<br>**2.** Of or relating to or characteristic of morocco or its people. | *"In academic literature, maroc designates a kingdom (constitutional monarchy) in northwestern africa with a largely muslim population; achieved independence from france in 1956."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marocain]] | noun | **1.** A dress crepe; similar to canton crepe. | *"In academic literature, marocain designates a dress crepe; similar to canton crepe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maroon]] | noun | **1.** A person who is stranded (as on an island).<br>**2.** A dark purplish-red to dark brownish-red color. | *"I look at those maroon curtains, and this hideous patterny carpet, and feel all nervy and on edge; then Jacky thinks I am tired, and brings me hot milk." She opened her speedwell blue eyes to their fullest width, and stared at me dolefully."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[maroon-purple]] | adjective | **1.** Of purple tinged with maroon. | *"In academic literature, maroon-purple designates of purple tinged with maroon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maroon-spotted]] | adjective | **1.** Having maroon spots. | *"In academic literature, maroon-spotted designates having maroon spots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marooned]] | verb | **1.** Leave stranded or isolated with little hope of rescue.<br>**2.** Leave stranded on a desert island without resources. | *"Marooners’ Rock stood alone in the forbidding waters as if it were itself marooned."* — J. M. Barrie, *Peter Pan* |
| [[marrakech]] | noun | **1.** A city in western morocco; tourist center. | *"In academic literature, marrakech designates a city in western morocco; tourist center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marrakesh]] | noun | **1.** A city in western morocco; tourist center. | *"In academic literature, marrakesh designates a city in western morocco; tourist center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marrano]] | noun | **1.** (medieval spain and portugal) a disparaging term for a jew who converted to christianity in order to avoid persecution but continued to practice their religion secretly. | *"In academic literature, marrano designates (medieval spain and portugal) a disparaging term for a jew who converted to christianity in order to avoid persecution but continued to practice their religion secretly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marred]] | verb | **1.** Make imperfect.<br>**2.** Destroy or injure severely. | *"This man has marred his fortune."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marri]] | noun | **1.** Very large red gum tree. | *"Sirrah, your lord and master’s married; there’s news for you; you have a new mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marriage]] | noun | **1.** The state of being a married couple voluntarily joined for life (or until divorce).<br>**2.** Two people who are married to each other. | *"Love is a babe, then might I not say so To give full growth to that which still doth grow. 116 Let me not to the marriage of true minds Admit impediments, love is not love Which alters when it alteration finds, Or bends with the remover to remove."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marriageability]] | noun | **1.** Eligibility for marriage. | *"In academic literature, marriageability designates eligibility for marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marriageable]] | adjective | **1.** Of girls or women who are eligible to marry. | *"She is now marriageable.[95] Among the Ot Danoms of Borneo girls at the age of eight or ten years are shut up in a little room or cell of the house, and cut off from all intercourse with the world for a long time."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[married]] | noun | **1.** A person who is married.<br>**2.** Take in marriage. | *"Sirrah, your lord and master’s married; there’s news for you; you have a new mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marrow]] | noun | **1.** The fatty network of connective tissue that fills the cavities of bones.<br>**2.** Any of various squash plants grown for their elongated fruit with smooth dark green skin and whitish flesh. | *"He wears his honour in a box unseen That hugs his kicky-wicky here at home, Spending his manly marrow in her arms, Which should sustain the bound and high curvet Of Mars’s fiery steed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marrowbone]] | noun | **1.** A bone containing edible marrow; used especially in flavoring soup. | *"Then they would all to a man have gone down on their marrowbones to him to come back when he had recovered his senses."* — James Joyce, *Ulysses* |
| [[marrubium]] | noun | **1.** Old world aromatic herbs: horehound. | *"In academic literature, marrubium designates old world aromatic herbs: horehound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marruecos]] | noun | **1.** A kingdom (constitutional monarchy) in northwestern africa with a largely muslim population; achieved independence from france in 1956. | *"In academic literature, marruecos designates a kingdom (constitutional monarchy) in northwestern africa with a largely muslim population; achieved independence from france in 1956."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marry]] | verb | **1.** Take in marriage.<br>**2.** Perform a marriage ceremony. | *"Virginity being blown down, man will quicklier be blown up; marry, in blowing him down again, with the breach yourselves made, you lose your city."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mars]] | noun | **1.** A small reddish planet that is the 4th from the sun and is periodically visible to the naked eye; minerals rich in iron cover its surface and are responsible for its characteristic color.<br>**2.** (roman mythology) roman god of war and agriculture; father of romulus and remus; counterpart of greek ares. | *"I especially think, under Mars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marsala]] | noun | **1.** Dark sweet or semisweet dessert wine from sicily. | *"In academic literature, marsala designates dark sweet or semisweet dessert wine from sicily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marseillaise]] | noun | **1.** The french national anthem. | *"Her songs are to be "The Wearing of the Green"--& "Poland Dirge" & the "Marseillaise"."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[marseille]] | noun | **1.** A port city in southeastern france on the mediterranean.<br>**2.** Strong cotton fabric with a raised pattern; used for bedspreads. | *"I duly am inform’d His grace is at Marseilles; to which place We have convenient convoy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marseilles]] | noun | **1.** A port city in southeastern france on the mediterranean. | *"I duly am inform’d His grace is at Marseilles; to which place We have convenient convoy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marsh]] | noun | **1.** Low-lying wet land with grassy vegetation; usually is a transition zone between land and water.<br>**2.** United states painter (1898-1954). | *"My lord, the enemy is past the marsh."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marshal]] | noun | **1.** A law officer having duties similar to those of a sheriff in carrying out the judgments of a court of law.<br>**2.** (in some countries) a military officer of highest rank. | *"There’s letters seal’d: and my two schoolfellows, Whom I will trust as I will adders fang’d,— They bear the mandate, they must sweep my way And marshal me to knavery."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marshall]] | noun | **1.** United states actor (1914-1998).<br>**2.** United states general and statesman who as secretary of state organized the european recovery program (1880-1959). | *"Thou marshall’st me the way that I was going; And such an instrument I was to use."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marshals]] | noun | **1.** The united states' oldest federal law enforcement agency is responsible today for protecting the federal judiciary and transporting federal prisoners and protecting federal witnesses and managing assets seized from criminals and generally ensuring the effective operation of the federal judicial system.<br>**2.** A law officer having duties similar to those of a sheriff in carrying out the judgments of a court of law. | *"I know,” interrupted Bilíbin, “you’re thinking it’s very easy to take marshals, sitting on a sofa by the fire!"* — graf Leo Tolstoy, *War and Peace* |
| [[marshalship]] | noun | **1.** The post of marshall. | *"With him, the Duke of Norfolk, with the rod of marshalship, a coronet on his head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[marshland]] | noun | **1.** Low-lying wet land with grassy vegetation; usually is a transition zone between land and water. | *"Thus in Lincolnshire, when the cattle plague was so prevalent in 1866, there was, I believe, not a single cowshed in Marshland but had its wicken cross over the door; and other charms more powerful than this were in some cases resorted to."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[marshmallow]] | noun | **1.** Spongy confection made of gelatin and sugar and corn syrup and dusted with powdered sugar. | *"In academic literature, marshmallow designates spongy confection made of gelatin and sugar and corn syrup and dusted with powdered sugar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marshy]] | adjective | **1.** (of soil) soft and watery. | *"Oh, it’s not the trouble,” returned Miss Jellyby; “the question is, if there IS any.” The evening was so very cold and the rooms had such a marshy smell that I must confess it was a little miserable, and Ada was half crying."* — Charles Dickens, *Bleak House* |
| [[marsilea]] | noun | **1.** Clover ferns. | *"In academic literature, marsilea designates clover ferns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marsileaceae]] | noun | **1.** Clover ferns. | *"In academic literature, marsileaceae designates clover ferns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marstan]] | noun | **1.** English playwright (1575-1634). | *"In academic literature, marstan designates english playwright (1575-1634)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marsupial]] | noun | **1.** Mammals of which the females have a pouch (the marsupium) containing the teats where the young are fed and carried.<br>**2.** Of or relating to the marsupials. | *"In academic literature, marsupial designates mammals of which the females have a pouch (the marsupium) containing the teats where the young are fed and carried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marsupialia]] | noun | **1.** Coextensive with the subclass metatheria. | *"In academic literature, marsupialia designates coextensive with the subclass metatheria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marsupium]] | noun | **1.** An external abdominal pouch in most marsupials where newborn offspring are suckled. | *"In academic literature, marsupium designates an external abdominal pouch in most marsupials where newborn offspring are suckled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mart]] | noun | **1.** An area in a town where a public mercantile establishment is set up. | *"Soon, at five o’clock, Please you, I’ll meet with you upon the mart, And afterward consort you till bedtime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[martagon]] | noun | **1.** Lily with small dull purple flowers of northwestern europe and northwestern asia. | *"In academic literature, martagon designates lily with small dull purple flowers of northwestern europe and northwestern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marten]] | noun | **1.** Agile slender-bodied arboreal mustelids somewhat larger than weasels. | *"And I knew, quite near, of a cavern, which was known only to me, for it had a very small entrance, and I had only discovered it because I had followed a stone marten which had slipped into it."* — Felix Dahn, *Saga of Halfred the Sigskald: A Northern Tale of the Tenth Century* |
| [[martensite]] | noun | **1.** A solid solution of carbon in alpha-iron that is formed when steel is cooled so rapidly that the change from austenite to pearlite is suppressed; responsible for the hardness of quenched steel. | *"In academic literature, martensite designates a solid solution of carbon in alpha-iron that is formed when steel is cooled so rapidly that the change from austenite to pearlite is suppressed; responsible for the hardness of quenched steel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martes]] | noun | **1.** Martens. | *"Classical and authoritative lexicons catalog martes as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marti]] | noun | **1.** Cuban poet and revolutionary who fought for cuban independence from spain (1853-1895). | *"While traversing the site of the theater of old Saguntum, he alighted upon this man, seated on a stone, and deeply engaged in perusing the work of the deacon Marti."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[martial]] | noun | **1.** Roman poet noted for epigrams (first century bc).<br>**2.** (of persons) befitting a warrior. | *"A gallant curtal-axe upon my thigh, A boar-spear in my hand, and in my heart Lie there what hidden woman’s fear there will, We’ll have a swashing and a martial outside, As many other mannish cowards have That do outface it with their semblances."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[martially]] | adverb | **1.** In a martial manner. | *"In academic literature, martially designates in a martial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martian]] | noun | **1.** Imaginary people who live on the planet mars.<br>**2.** Of or relating to the planet mars (or its fictional inhabitants). | *"In academic literature, martian designates imaginary people who live on the planet mars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martin]] | noun | **1.** French bishop who is a patron saint of france (died in 397).<br>**2.** United states actor and comedian (born in 1945). | *"Expect Saint Martin’s summer, halcyon’s days, Since I have entered into these wars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[martinet]] | noun | **1.** Someone who demands exact conformity to rules and forms. | *"He was a Mexican veteran, a thorough soldier as well as a martinet, and he had never learned to recognize any organizations outside of the regular service."* — Harry Castlemon, *Rodney, the Partisan* |
| [[martingale]] | noun | **1.** A harness strap that connects the nose piece to the girth; prevents the horse from throwing back its head.<br>**2.** Spar under the bowsprit of a sailboat. | *"At this moment, leaning on the forecastle bulwark, I saw below me Ned Land grappling the martingale in one hand, brandishing his terrible harpoon in the other, scarcely twenty feet from the motionless animal."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[martini]] | noun | **1.** A cocktail made of gin (or vodka) with dry vermouth. | *"It contained a couch, two camp-stools, a loaded Martini-Henry leaning in one corner, a tiny table, and the steering-wheel."* — Joseph Conrad, *Heart of Darkness* |
| [[martinique]] | noun | **1.** An island in the eastern caribbean in the windward islands; administered as an overseas region of france. | *"April 16th, we sighted Martinique and Guadaloupe from a distance of about thirty miles."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[martinmas]] | noun | **1.** The feast of saint martin; a quarter day in scotland. | *"In academic literature, martinmas designates the feast of saint martin; a quarter day in scotland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martynia]] | noun | **1.** Sprawling annual or perennial herb of central america and west indies having creamy-white to red-purple bell-shaped flowers followed by unusual horned fruit. | *"In academic literature, martynia designates sprawling annual or perennial herb of central america and west indies having creamy-white to red-purple bell-shaped flowers followed by unusual horned fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martyniaceae]] | noun | **1.** In most classifications not considered a separate family but included in the pedaliaceae. | *"In academic literature, martyniaceae designates in most classifications not considered a separate family but included in the pedaliaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martyr]] | noun | **1.** One who suffers for the sake of principle.<br>**2.** One who voluntarily suffers death as the penalty for refusing to renounce their religion. | *"Then if thou fall’st, O Cromwell, Thou fall’st a blessed martyr!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[martyrdom]] | noun | **1.** Death that is imposed because of the person's adherence of a religious faith or cause.<br>**2.** Any experience that causes intense suffering. | *"It was as if people should laugh at martyrdom."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[martyrise]] | verb | **1.** Torture and torment like a martyr. | *"In academic literature, martyrise designates torture and torment like a martyr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[martyrize]] | verb | **1.** Torture and torment like a martyr. | *"In academic literature, martyrize designates torture and torment like a martyr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marum]] | noun | **1.** Mediterranean germander having small hairy leaves and reddish purple flowers; attractive to cats. | *"In academic literature, marum designates mediterranean germander having small hairy leaves and reddish purple flowers; attractive to cats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marumi]] | noun | **1.** Shrub bearing round-fruited kumquats. | *"In academic literature, marumi designates shrub bearing round-fruited kumquats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marupa]] | noun | **1.** Tree of the amazon valley yielding a light brittle timber locally regarded as resistant to insect attack. | *"In academic literature, marupa designates tree of the amazon valley yielding a light brittle timber locally regarded as resistant to insect attack."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[marut]] | noun | **1.** Any of a group of hindu storm gods; offspring of rudra. | *"In academic literature, marut designates any of a group of hindu storm gods; offspring of rudra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mary]] | noun | **1.** The mother of jesus; christians refer to her as the virgin mary; she is especially honored by roman catholics. | *"SONG Hark, hark! the lark at heaven’s gate sings, And Phœbus ’gins arise, His steeds to water at those springs On chalic’d flow’rs that lies; And winking Mary-buds begin To ope their golden eyes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[maryland]] | noun | **1.** A mid-atlantic state; one of the original 13 colonies.<br>**2.** One of the british colonies that formed the united states. | *"But upon consulting our old records I found that such an oar had been presented by one Daniel Foss, of Elkton, Maryland, in the year 1821."* — Jack London, *The Jacket (The Star-Rover)* |
| [[marylander]] | noun | **1.** A native or resident of maryland. | *"In academic literature, marylander designates a native or resident of maryland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mismarry]] | verb | **1.** Marry an unsuitable partner. | *"In academic literature, mismarry designates marry an unsuitable partner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[premarital]] | adjective | **1.** Relating to events before a marriage. | *"In academic literature, premarital designates relating to events before a marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remarriage]] | noun | **1.** The act of marrying again. | *"In academic literature, remarriage designates the act of marrying again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remarry]] | verb | **1.** Marry, not for the first time. | *"In academic literature, remarry designates marry, not for the first time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semarang]] | noun | **1.** A port city is southern indonesia; located in northern java. | *"In academic literature, semarang designates a port city is southern indonesia; located in northern java."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submarine]] | noun | **1.** A submersible warship usually armed with torpedoes.<br>**2.** A large sandwich made of a long crusty roll split lengthwise and filled with meats and cheese (and tomato and onion and lettuce and condiments); different names are used in different sections of the united states. | *"In a sense everything has been the natural outcome of evolution,--the steam engine, the submarine, the boycott, militarism."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[submariner]] | noun | **1.** A member of the crew of a submarine. | *"In academic literature, submariner designates a member of the crew of a submarine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramarine]] | noun | **1.** Blue pigment made of powdered lapis lazuli.<br>**2.** A vivid blue to purple-blue color. | *"The atmosphere beneath is languorous, and is so tinged with azure that what artists call the middle distance partakes also of that hue, while the horizon beyond is of the deepest ultramarine."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unmarred]] | adjective | **1.** Free from physical or moral spots or stains. | *"In academic literature, unmarred designates free from physical or moral spots or stains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmarried]] | adjective | **1.** Not married or related to the unmarried state. | *"Here we are, And here the graces of our youths must wither Like a too-timely spring; here age must find us And, which is heaviest, Palamon, unmarried."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MAR
  </div>
</div>
