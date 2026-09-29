---
status: unread
type: root_dashboard
---
# Dashboard — leg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">leg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“law”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community establishing fair rules to ensure order and peaceful living.</span>
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

The root **leg** means law. It refers to established rules, legal justice, and social regulations. In English, this root forms words such as *legal*, *legislate*, *legible*, and *legend*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: law
> The root **leg** means law. It refers to established rules, legal justice, and social regulations. In English, this root forms words such as *legal*, *legislate*, *legible*, and *legend*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Law</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *legal* and *legislate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **leg** comes from a Latin word that means *"law"*.
  - At its core, it describes law.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **leg** in an English word, think of **rules, rights, and the law**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of law.
  - **Mental & Social**: How people experience, organize, or communicate about law.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Legal**: Relating to the law or jurisprudence.
  - **Legislate**: To make or enact laws.
  - **Legible**: Clear enough to be read.
  - **Legend**: A traditional story sometimes popularly regarded as historical but unauthenticated.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">leg</mark>, think of <mark class="hl-def">rules, rights, and the law</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates across three morphological tiers:
> 1. **The Statutory Base `leg-` / `legisl-` (from *lēx, lēgis*):**
>    - Adjectives in `-al` and `-imate`: *legal*, *illegal*, *legitimate*, *illegitimate*.
>    - Compounds with *ferre / lātum* ("to carry, propose"): *legislate*, *legislation*, *legislative*, *legislator*, *legislature*.
>    - Compounds with *prīvus* ("private"): *privilege*, *privileged*, *underprivileged*.
>    - Anglo-Norman sound shift ($g \to y$): *loyal*, *loyalty*, *disloyal*.
> 2. **The Commissioning & Bequest Base `legat-` (from *lēgāre*):**
>    - *legacy*, *legate*, *delegate*, *delegation*, *relegate*, *relegation*.
> 3. **The Gathering & Reading Base `leg-` / `lig-` (from *legere*):**
>    - *legible*, *illegible*, *legend*, *legendary*, *legion*, *legionary*.
>    - Medial vowel weakening ($e \to i$): *eligible* (< *ēligere*), *diligent* (< *dīligere*), *intelligent* (< *intellegere*).

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
> - **Statutory Law & Governance:** *Legal*, *illegal*, *legitimate*, *legislate*, *legislature*, *privilege* — constitutional lawmaking, statutory compliance, and fundamental civil rights.
> - **Testamentary Succession & Diplomatic Deputation:** *Legacy*, *legate*, *delegate*, *relegate* — bequeathing wealth; dispatching papal/parliamentary envoys; banishing to a lower sphere.
> - **Civic & Feudal Fidelity:** *Loyal*, *loyalty*, *disloyal*, *colleague*, *collegial* — allegiance to the constitutional crown; equal partnership among public magistrates.
> - **Textual Clarity, Folklore & Reading:** *Legible*, *illegible*, *legend*, *legendary* — decipherable handwriting; ancient hagiographic narratives read in refectories.
> - **Discernment, Industry & Military Organization:** *Eligible*, *diligent*, *intelligent*, *legion* — qualified for office; industrious care; the Roman army's drafted levies.

---

## 🔀 4. Prefix & Combining Dynamics on leg

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `in-` / `il-` | not, un- (privative) | [[illegal]], [[illegitimate]], [[illegible]], [[ineligible]] | Contrary to statutory law; born outside wedlock; unreadable; unqualified. |
| `prīvus` | individual, private | [[privilege]], [[privileged]] | A private law or immunity granted to a specific person or class. |
| `con-` / `col-` | together, with | [[colleague]], [[college]], [[collect]] | Gathered together under the same law; an official partner or institution. |
| `de-` | down, away, from | [[delegate]], [[delegation]] | Sent away with legal authority; committing powers to a deputy. |
| `re-` | back, away | [[relegate]], [[relegation]] | Assigned away; sent into exile or consigned to an inferior rank. |
| `ex-` / `ē-` | out, forth | [[eligible]], [[elect]] | Chosen out from a pool of candidates based on statutory qualification. |
| `dis-` | apart, thoroughly | [[diligence]], [[diligent]], [[disloyal]] | Singling out with earnest devotion; or breaching feudal allegiance. |
| `ad-` / `al-` | to, toward, before | [[allege]], [[allegation]] | Bringing a formal charge before the court; pleading legal justification. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Relational) | [[legal]], [[collegial]], [[loyal]] | Pertaining to enacted statutory law, professional peers, or faithful duty. |
| `-ate` / `-ation` | Verb / Noun (Enactment) | [[legislate]], [[legislation]], [[delegation]] | The constitutional process of passing statutory bills or sending envoys. |
| `-ature` | Noun (Collective Body) | [[legislature]] | The sovereign institutional assembly empowered to enact laws. |
| `-ible` | Adjective (Capacity) | [[legible]], [[eligible]] | Capable of being deciphered by the eye, or qualified for selection. |
| `-ence` / `-ent` | Noun / Adjective (Quality) | [[diligence]], [[diligent]], [[intelligence]] | The state of careful, selective effort and mental comprehension. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Constitutional Law & Jurisprudence** | [[legal]], [[illegal]], [[legislation]], [[legislature]], [[privilege]], [[legitimate]] | The legislative branch under Article I; attorney-client privilege; the principle of legality (*nullum crimen sine lege*); statutory legitimacy. |
| 🗳️ **Electoral Politics & Representation** | [[legislator]], [[delegate]], [[eligible]], [[elect]] | Congressional district delegates; voting eligibility criteria; ballot initiatives. |
| 📜 **Probate Law & Estate Planning** | [[legacy]], [[legate]], [[relegate]] | Testamentary bequests; charitable legacy endowments; executor distributions. |
| 🎓 **Higher Education & Professional Ethics** | [[colleague]], [[collegial]], [[college]], [[collegiate]] | Faculty collegiality; university electoral colleges; professional associations. |
| 📖 **Paleography, Epigraphy & Typography** | [[legible]], [[illegible]], [[legend]] | Deciphering ancient epigraphic inscriptions; legibility of typographic fonts; maps with explanatory legends. |
| ⚔️ **Military History & Historiography** | [[legion]], [[legionary]], [[legendary]] | The Roman Marian legion reforms; French Foreign Legion; legendary epic poetry. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allegation]] | noun | **1.** (law) a formal accusation against somebody (often in a court of law).<br>**2.** Statements affirming or denying certain matters of fact that you are prepared to prove. | *"My Lord of Suffolk, Buckingham, and York, Reprove my allegation if you can, Or else conclude my words effectual."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[allege]] | verb | **1.** Report or maintain. | *"The reasons you allege do more conduce To the hot passion of distemp’red blood Than to make up a free determination ’Twixt right and wrong; for pleasure and revenge Have ears more deaf than adders to the voice Of any true decision."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alleged]] | verb | **1.** Report or maintain.<br>**2.** Declared but not proved; - wall street journal. | *"The great Duke Came to the bar, where to his accusations He pleaded still not guilty and alleged Many sharp reasons to defeat the law."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[allegedly]] | adverb | **1.** According to what has been alleged. | *"In academic literature, allegedly designates according to what has been alleged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allegement]] | noun | **1.** Statements affirming or denying certain matters of fact that you are prepared to prove. | *"In academic literature, allegement designates statements affirming or denying certain matters of fact that you are prepared to prove."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allegiance]] | noun | **1.** The act of binding yourself (intellectually or emotionally) to a course of action.<br>**2.** The loyalty that citizens owe to their country (or subjects to their sovereign). | *"Yet he that can endure To follow with allegiance a fallen lord Does conquer him that did his master conquer, And earns a place i’ th’ story."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[allegiant]] | adjective | **1.** Steadfast in devotion (especially to your lawful monarch or government). | *"For your great graces Heaped upon me, poor undeserver, I Can nothing render but allegiant thanks, My prayers to heaven for you, my loyalty, Which ever has and ever shall be growing, Till death, that winter, kill it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[allegoric]] | adjective | **1.** Used in or characteristic of or containing allegory. | *"They were explained away by the allegoric method."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[allegorical]] | adjective | **1.** Used in or characteristic of or containing allegory. | *"Not only are the personages too transparently allegorical, but the allegory is insipid; especially tactless is the treatment of the marriage between Prometheus, the Spirit of Humanity, and Asia, the Spirit of Nature, as a romantic love affair."* — Sydney Waterlow, *Shelley* |
| [[allegorically]] | adverb | **1.** In an allegorical manner. | *"In academic literature, allegorically designates in an allegorical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allegorise]] | verb | **1.** Interpret as an allegory.<br>**2.** Make into an allegory. | *"In academic literature, allegorise designates interpret as an allegory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allegoriser]] | noun | **1.** Someone who communicates in allegories. | *"In academic literature, allegoriser designates someone who communicates in allegories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allegorize]] | verb | **1.** Interpret as an allegory.<br>**2.** Make into an allegory. | *"The more reasonable among Jews and Christians," says Celsus, "try to allegorize them [the Scriptures], but they are beyond being {194} allegorized and are nothing but sheer mythology of the silliest type."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[allegorizer]] | noun | **1.** Someone who communicates in allegories. | *"In academic literature, allegorizer designates someone who communicates in allegories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allegory]] | noun | **1.** A short moral story (often with animal characters).<br>**2.** A visible symbol representing an abstract idea. | *"Here, beneath the painted ceiling, with foreshortened Allegory staring down at his intrusion as if it meant to swoop upon him, and he cutting it dead, Mr."* — Charles Dickens, *Bleak House* |
| [[allegretto]] | noun | **1.** A quicker tempo than andante but not as fast as allegro.<br>**2.** A musical composition or musical passage to be performed at a somewhat quicker tempo than andante but not as fast as allegro. | *"Wi’ hand on hainch, and upward e’e, He croon’d his gamut, one, two, three, Then in an arioso key, The wee Apoll Set off wi’ allegretto glee His giga solo."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[allegro]] | noun | **1.** A brisk and lively tempo.<br>**2.** A musical composition or musical passage to be performed quickly in a brisk lively manner. | *"Elizabeth of course belongs to the_ allegro _or_ allegra _division of the army of Venus."* — Jane Austen, *Pride and Prejudice* |
| [[college]] | noun | **1.** The body of faculty and students of a college.<br>**2.** An institution of higher education created to educate and grant degrees; often a part of a university. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collegial]] | adjective | **1.** Characterized by or having authority vested equally among colleagues; ; - merle fainsod.<br>**2.** Of or resembling or typical of a college or college students. | *"In academic literature, collegial designates characterized by or having authority vested equally among colleagues; ; - merle fainsod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collegian]] | noun | **1.** A student (or former student) at a college or university. | *"A crew that enters the race with the odds against it is unnerved and undone, thinks the patriotic collegian. [Sidenote: Knowledge and skill affecting the result] In nearly all wagers, judgment in some degree influences the choice of sides."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[collegiate]] | adjective | **1.** Of or resembling or typical of a college or college students. | *"This church before the Reformation had collegiate rank, and is now the sole remaining relic of the ancient village of Dunglass."* — John Cairns, *Principal Cairns* |
| [[delegacy]] | noun | **1.** The state of serving as an official and authorized delegate or agent.<br>**2.** A group of representatives or delegates. | *"In academic literature, delegacy designates the state of serving as an official and authorized delegate or agent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delegate]] | noun | **1.** A person appointed or elected to represent others.<br>**2.** Transfer power to someone. | *"Then, there are wifely duties which you would not wish to delegate to any one else." "No, never!" she cried."* — Martha Finley, *Elsie's Kith and Kin* |
| [[delegating]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** Transfer power to someone. | *"In academic literature, delegating designates authorizing subordinates to make certain decisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delegation]] | noun | **1.** A group of representatives or delegates.<br>**2.** Authorizing subordinates to make certain decisions. | *"I was just breaking a last muffin and beginning to smile when I saw a delegation coming down the street and turning into my front gate; I rose to meet it with distinction."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[elegance]] | noun | **1.** A refined quality of gracefulness and good taste.<br>**2.** A quality of neatness and ingenious simplicity in the solution of a problem (especially in science or mathematics). | *"Greater still when Ada asked me what she had said, and when I replied that she had been kind and interested, and when Ada, while admitting her beauty and elegance, remarked upon her proud manner and her imperious chilling air."* — Charles Dickens, *Bleak House* |
| [[elegant]] | adjective | **1.** Refined and tasteful in appearance or behavior or style.<br>**2.** Suggesting taste, ease, and wealth. | *"Her figure is elegant and has the effect of being tall."* — Charles Dickens, *Bleak House* |
| [[elegantly]] | adverb | **1.** With elegance; in a tastefully elegant manner.<br>**2.** In a gracefully elegant manner. | *"The bride was elegantly dressed; the two bridesmaids were duly inferior; her father gave her away; her mother stood with salts in her hand, expecting to be agitated; her aunt tried to cry; and the service was impressively read by Dr."* — Jane Austen, *Mansfield Park* |
| [[elegiac]] | adjective | **1.** Resembling or characteristic of or appropriate to an elegy.<br>**2.** Expressing sorrow often for something past. | *"Nowhere has Heine struck a more truly elegiac note than in the stanza: Der Tod, das ist die kuehle Nacht, Das Leben ist der schwuele Tag."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[elegise]] | verb | **1.** Compose an elegy. | *"In academic literature, elegise designates compose an elegy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elegist]] | noun | **1.** The author of a mournful poem lamenting the dead. | *"In academic literature, elegist designates the author of a mournful poem lamenting the dead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elegize]] | verb | **1.** Compose an elegy. | *"In academic literature, elegize designates compose an elegy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elegy]] | noun | **1.** A mournful poem; a lament for the dead. | *"Lapraik Epistle To William Simson One Night As I Did Wander Tho’ Cruel Fate Should Bid Us Part Song—Rantin’, Rovin’ Robin Elegy On The Death Of Robert Ruisseaux Epistle To John Goldie, In Kilmarnock The Holy Fair Third Epistle To J."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[extralegal]] | adjective | **1.** Not regulated or sanctioned by law. | *"In academic literature, extralegal designates not regulated or sanctioned by law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illegal]] | adjective | **1.** Prohibited by law or by official or accepted rules. | *"He had persistently elevated Hellenic Paganism at the expense of Christianity; yet in that civilization an illegal surrender was not certain disesteem."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[illegalise]] | verb | **1.** Declare illegal; outlaw. | *"In academic literature, illegalise designates declare illegal; outlaw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illegality]] | noun | **1.** Unlawfulness by virtue of violating some legal statute. | *"Various notables - Materia Medica, Anatomy, Physiology, Scho- lastic Theology, and Jurisprudence - rose to the ques- 437:24 tion of expelling Christian Science from the bar, for such high-handed illegality."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[illegalize]] | verb | **1.** Declare illegal; outlaw. | *"In academic literature, illegalize designates declare illegal; outlaw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illegally]] | adverb | **1.** In an illegal manner. | *"Clair, then it is obvious that no crime has been committed, and that, therefore, I am illegally detained.” “No crime, but a very great error has been committed,” said Holmes."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[illegibility]] | noun | **1.** The quality of writing (print or handwriting) that cannot be deciphered. | *"In academic literature, illegibility designates the quality of writing (print or handwriting) that cannot be deciphered."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illegible]] | adjective | **1.** (of handwriting, print, etc.) not legible. | *"Of these, Graham, bright, witty, versatile, the most notorious of punsters and the most illegible of writers, was his chief intimate, and their friendship continued unbroken and close for half a century."* — John Cairns, *Principal Cairns* |
| [[illegibly]] | adverb | **1.** In an illegible manner. | *"In academic literature, illegibly designates in an illegible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illegitimacy]] | noun | **1.** The status of being born to parents who were not married.<br>**2.** Unlawfulness by virtue of not being authorized by or in accordance with law. | *"In academic literature, illegitimacy designates the status of being born to parents who were not married."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illegitimate]] | noun | **1.** The illegitimate offspring of unmarried parents.<br>**2.** Contrary to or forbidden by law. | *"I am a bastard begot, bastard instructed, bastard in mind, bastard in valour, in everything illegitimate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[illegitimately]] | adverb | **1.** In a manner disapproved or not allowed by custom.<br>**2.** Of biological parents not married to each other. | *"Legitimately applied they yield science; illegitimately applied they yield magic, the bastard sister of science."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[inelegance]] | noun | **1.** The quality of lacking refinement and good taste. | *"In academic literature, inelegance designates the quality of lacking refinement and good taste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inelegant]] | adjective | **1.** Lacking in refinement or grace or good taste. | *"In academic literature, inelegant designates lacking in refinement or grace or good taste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inelegantly]] | adverb | **1.** Without elegance. | *"Her skirt was short in front and narrow below the waist, and her sailor blouse was comfortably but inelegantly loose round the armholes."* — Anthony Pryde, *Nightfall* |
| [[intercollegiate]] | adjective | **1.** Used of competition between colleges or universities. | *"In academic literature, intercollegiate designates used of competition between colleges or universities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leg]] | noun | **1.** A human limb; commonly used to refer to a whole limb but technically only the part of the limb between the knee and ankle.<br>**2.** A structure in animals that is similar to a human leg and used for locomotion. | *"I would I were invisible, to catch the strong fellow by the leg. [_Orlando and Charles wrestle._] ROSALIND."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legacy]] | noun | **1.** (law) a gift of personal property by will. | *"But if thou live remembered not to be, Die single and thine image dies with thee. 4 Unthrifty loveliness why dost thou spend, Upon thyself thy beauty’s legacy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legal]] | adjective | **1.** Established by or founded upon law or official or accepted rules.<br>**2.** Of or relating to jurisprudence. | *"Was ever seen An emperor in Rome thus overborne, Troubled, confronted thus; and, for the extent Of legal justice, used in such contempt?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legalese]] | noun | **1.** A style that uses the abstruse technical vocabulary of the law. | *"In academic literature, legalese designates a style that uses the abstruse technical vocabulary of the law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legalisation]] | noun | **1.** The act of making lawful. | *"In academic literature, legalisation designates the act of making lawful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legalise]] | verb | **1.** Make legal. | *"The artist may of course, in wanton moods, dream of some Paradise (for art) where the direct appeal to the intelligence might be legalised; for to such extravagances as these his yearning mind can scarce hope ever completely to close itself."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[legalism]] | noun | **1.** Strict conformity to the letter of the law rather than its spirit. | *"In academic literature, legalism designates strict conformity to the letter of the law rather than its spirit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legality]] | noun | **1.** Lawfulness by virtue of conformity to a legal statute. | *"The Sanhedrim has not the right.” “Pilate is willing that it should take that right.” “But it is a fine question of legality,” I insisted."* — Jack London, *The Jacket (The Star-Rover)* |
| [[legalization]] | noun | **1.** The act of making lawful. | *"In academic literature, legalization designates the act of making lawful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legalize]] | verb | **1.** Make legal. | *"It organized and tried to legalize a control of State elections by Federal troops."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[legally]] | adverb | **1.** By law; conforming to the law.<br>**2.** In a legal manner. | *"Tess would fain not have conversed with Marian of the man who was legally, if not actually, her husband; but the irresistible fascination of the subject betrayed her into reciprocating Marian’s remarks."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[legate]] | noun | **1.** A member of a legation. | *"Enter Winchester in Cardinal’s habit, a Legate and two Ambassadors."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legatee]] | noun | **1.** Someone to whom a legacy is bequeathed. | *"Reed: his intention to adopt me and make me his legatee."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[legateship]] | noun | **1.** The post or office of legate. | *"In academic literature, legateship designates the post or office of legate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legation]] | noun | **1.** The post or office of legate.<br>**2.** A permanent diplomatic mission headed by a minister. | *"Shortly after this his older brother, Gansevoort Melville, sailed for England as secretary of legation to Ambassador McLane, and the manuscript was intrusted to Gansevoort for submission to John Murray."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[legato]] | adjective | **1.** (music) without breaks between notes; smooth and connected.<br>**2.** Connecting the notes; in music. | *"In academic literature, legato designates (music) without breaks between notes; smooth and connected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legend]] | noun | **1.** A story about mythical or supernatural beings or events.<br>**2.** Brief description accompanying an illustration. | *"On that occasion, Cook’s Court was in a manner revolutionized by the new inscription in fresh paint, PEFFER AND SNAGSBY, displacing the time-honoured and not easily to be deciphered legend PEFFER only."* — Charles Dickens, *Bleak House* |
| [[legendary]] | adjective | **1.** So celebrated as to having taken on the nature of a legend.<br>**2.** Celebrated in fable or legend. | *"Scores of persons have deliriously found themselves made parties in Jarndyce and Jarndyce without knowing how or why; whole families have inherited legendary hatreds with the suit."* — Charles Dickens, *Bleak House* |
| [[leger]] | noun | **1.** A record in which commercial accounts are recorded.<br>**2.** French painter who was an early cubist (1881-1955). | *"Leger, and the colloquy between the Rector and his wife ended."* — William Makepeace Thackeray, *Vanity Fair* |
| [[legerdemain]] | noun | **1.** An illusory feat; considered magical by naive observers. | *"But this kind of logical legerdemain will never counteract the plain suggestions of justice and common-sense."* — Alexander Hamilton, *The Federalist Papers* |
| [[legerity]] | noun | **1.** The gracefulness of a person or animal that is quick and nimble. | *"In academic literature, legerity designates the gracefulness of a person or animal that is quick and nimble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leggy]] | adjective | **1.** (of plants) having tall spindly stems.<br>**2.** Having long legs. | *"In academic literature, leggy designates (of plants) having tall spindly stems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legibility]] | noun | **1.** Distinctness that makes perception easy.<br>**2.** A quality of writing (print or handwriting) that can be easily read. | *"Guppy, going to the window, tumbles into a pair of love-birds, to whom he says in his confusion, “I beg your pardon, I am sure.” This does not tend to the greater legibility of his notes."* — Charles Dickens, *Bleak House* |
| [[legible]] | adjective | **1.** (of handwriting, print, etc.) capable of being read or deciphered. | *"The letter, with a direction hardly legible, to “Miss A."* — Jane Austen, *Persuasion* |
| [[legibly]] | adverb | **1.** In a legible manner. | *"Copy me a line or two of that valuation, with the figures at the end.” At that time the opinion existed that it was beneath a gentleman to write legibly, or with a hand in the least suitable to a clerk."* — George Eliot, *Middlemarch* |
| [[leging]] | noun | **1.** A garment covering the leg (usually extending from the knee to the ankle). | *"In academic literature, leging designates a garment covering the leg (usually extending from the knee to the ankle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legion]] | noun | **1.** Archaic terms for army.<br>**2.** Association of ex-servicemen. | *"If all the devils of hell be drawn in little, and Legion himself possessed him, yet I’ll speak to him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legionary]] | noun | **1.** A soldier who is a member of a legion (especially the french foreign legion). | *"My own twenty legionaries were close to hand and in readiness."* — Jack London, *The Jacket (The Star-Rover)* |
| [[legionella]] | noun | **1.** The motile aerobic rod-shaped gram-negative bacterium that thrives in central heating and air conditioning systems and can cause legionnaires' disease. | *"In academic literature, legionella designates the motile aerobic rod-shaped gram-negative bacterium that thrives in central heating and air conditioning systems and can cause legionnaires' disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legionnaire]] | noun | **1.** A member of the american legion.<br>**2.** A soldier who is a member of a legion (especially the french foreign legion). | *"In academic literature, legionnaire designates a member of the american legion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legislate]] | verb | **1.** Make laws, bills, etc. or bring into effect by legislation. | *"Construe either of these articles by the rules which would justify the construction put on the new Constitution, and they vest in the existing Congress a power to legislate in all cases whatsoever."* — Alexander Hamilton, *The Federalist Papers* |
| [[legislating]] | noun | **1.** The act of making or enacting laws.<br>**2.** Make laws, bills, etc. or bring into effect by legislation. | *"Whether sixty-five members for a few years, and a hundred or two hundred for a few more, be a safe depositary for a limited and well-guarded power of legislating for the United States?"* — Alexander Hamilton, *The Federalist Papers* |
| [[legislation]] | noun | **1.** Law enacted by a legislative body.<br>**2.** The act of making or enacting laws. | *"Other protective labor and social legislation 23."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[legislative]] | adjective | **1.** Relating to a legislature or composed of members of a legislature.<br>**2.** Of or relating to or created by legislation. | *"Not all this variety is essential to an efficient monetary system and several of the kinds survive as the result of historical accidents (political and legislative)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[legislatively]] | adverb | **1.** By legislation. | *"In academic literature, legislatively designates by legislation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legislator]] | noun | **1.** Someone who makes or enacts laws. | *"The harmonizing of these needs in the laws of taxation requires a high degree of wisdom, of foresight, and of integrity in the legislator and in the citizen."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[legislatorship]] | noun | **1.** The office of legislator. | *"In academic literature, legislatorship designates the office of legislator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legislature]] | noun | **1.** Persons who make or amend or repeal laws. | *"By changing the rates on foreign exports or imports, the railroads frequently have made or nullified tariff rates and have defeated the intention of the legislature."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[legitimacy]] | noun | **1.** Lawfulness by virtue of being authorized or in accordance with law.<br>**2.** Undisputed credibility. | *"On March 24, 1814, he married Harriet in church, to settle any possible question as to the legitimacy of his children; but they parted soon after."* — Sydney Waterlow, *Shelley* |
| [[legitimate]] | verb | **1.** Make legal.<br>**2.** Show or affirm to be just and legitimate. | *"Sirrah, your brother is legitimate; Your father’s wife did after wedlock bear him, And if she did play false, the fault was hers; Which fault lies on the hazards of all husbands That marry wives."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legitimately]] | adverb | **1.** In a manner acceptable to common custom.<br>**2.** In a lawfully recognized manner. | *"Nor, perhaps, will it fail to be eventually perceived, that behind those forms and usages, as it were, he sometimes masked himself; incidentally making use of them for other and more private ends than they were legitimately intended to subserve."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[legitimation]] | noun | **1.** The act of rendering a person legitimate.<br>**2.** The act of making lawful. | *"I have disclaim’d Sir Robert and my land; Legitimation, name, and all is gone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legitimatise]] | verb | **1.** Make legal. | *"In academic literature, legitimatise designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legitimatize]] | verb | **1.** Make legal. | *"In academic literature, legitimatize designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legitimise]] | verb | **1.** Make legal. | *"In academic literature, legitimise designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legitimize]] | verb | **1.** Make legal. | *"I cannot sense your meaning sometimes.” “If I cannot legitimize our former relations at least I can assist you."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[legless]] | adjective | **1.** Not having legs. | *"In academic literature, legless designates not having legs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leglike]] | adjective | **1.** Resembling or functioning like a leg. | *"In academic literature, leglike designates resembling or functioning like a leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lego]] | noun | **1.** (trademark) a child's plastic construction set for making mechanical models. | *"In academic literature, lego designates (trademark) a child's plastic construction set for making mechanical models."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legs]] | noun | **1.** Staying power.<br>**2.** A human limb; commonly used to refer to a whole limb but technically only the part of the limb between the knee and ankle. | *"His legs bestrid the ocean; his reared arm Crested the world; his voice was propertied As all the tuned spheres, and that to friends; But when he meant to quail and shake the orb, He was as rattling thunder."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legume]] | noun | **1.** An erect or climbing bean or pea plant of the family leguminosae.<br>**2.** The fruit or seed of any of various bean or pea plants consisting of a case that splits along both sides when ripe and having the seeds attach to one side of the case. | *"If the legumes are also examined, a few pustules will sometimes be found on them."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[leguminosae]] | noun | **1.** A large family of trees, shrubs, vines, and herbs bearing bean pods; divided for convenience into the subfamilies caesalpiniaceae; mimosaceae; papilionaceae. | *"In academic literature, leguminosae designates a large family of trees, shrubs, vines, and herbs bearing bean pods; divided for convenience into the subfamilies caesalpiniaceae; mimosaceae; papilionaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leguminous]] | adjective | **1.** Relating to or consisting of legumes. | *"They were mimosas, figs, hibisci, and palm trees, mingled together in profusion; and under the shelter of their verdant vault grew orchids, leguminous plants, and ferns."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[nonlegal]] | adjective | **1.** Not regulated or sanctioned by law. | *"In academic literature, nonlegal designates not regulated or sanctioned by law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolegomenon]] | noun | **1.** A preliminary discussion inserted at the beginning of a book or treatise. | *"In academic literature, prolegomenon designates a preliminary discussion inserted at the beginning of a book or treatise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relegate]] | verb | **1.** Refer to another person for decision or judgment.<br>**2.** Assign to a lower position; reduce in rank. | *"Whatever promises the nation makes, the nation must perform; and the nation can not with safety relegate this duty to the states."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[relegating]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** Refer to another person for decision or judgment. | *"In academic literature, relegating designates authorizing subordinates to make certain decisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relegation]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** The act of assigning (someone or something) to a particular class or category. | *"He objected to the dissociation of school and home life--to that relegation of domestic interests and duties to the background, which large and highly-organized schools, and teachers much above the home level, must necessarily involve."* — F. W. H. Myers, *Wordsworth* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LEG
  </div>
</div>
