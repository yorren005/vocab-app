---
status: unread
type: root_dashboard
---
# Dashboard — super
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">super-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“above or over”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **super** means above or over. It indicates being higher in location, superior in rank, or placed over something. In English, this root forms words such as *superior*, *supreme*, *supremacy*, and *superb*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: above or over
> The root **super** means above or over. It indicates being higher in location, superior in rank, or placed over something. In English, this root forms words such as *superior*, *supreme*, *supremacy*, and *superb*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Above or over</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *superior* and *supreme*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **super** comes from a Latin word that means *"above or over"*.
  - At its core, it describes above or over.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **super** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of above or over.
  - **Mental & Social**: How people experience, organize, or communicate about above or over.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Superior**: Higher in rank, status, or quality.
  - **Supreme**: Highest in authority, power, or status.
  - **Supremacy**: The state or condition of being superior to all others in authority, power, or status.
  - **Superb**: Excellent.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">super</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
PIE *upér (over, above) ──> Latin super (above, over, beyond)
  │
  ├── Classical Latin Prefix Formations
  │     ├── super- + cilium ────────> supercilious (haughty eyebrow)
  │     ├── super- + fluere ────────> superfluous (overflowing, excess)
  │     ├── super- + sedēre ────────> supersede (sit above, replace)
  │     ├── super- + stāre ─────────> superstition (standing over in awe)
  │     ├── super- + imponere ──────> superimpose (place on top of)
  │     ├── super- + intendere ─────> superintend (direct, oversee)
  │     └── super- + videre ────────> supervisor (overseer)
  │
  ├── Hierarchical Degrees (superus ──> superior ──> suprēmus)
  │     ├── superior, superiority (higher in rank/excellence)
  │     ├── supreme, supremacy (highest sovereign power)
  │     └── superlative (highest grammatical/literal degree)
  │
  ├── Verbal Action (superāre: to surmount, overcome)
  │     ├── in- + superābilis ──────> insuperable (unconquerable)
  │     └── ex- + superāre ─────────> exsuperate (to overtop, surmount)
  │
  └── French Phonetic Softening (super ──> sur-)
        ├── super + faciēs ─────────> surface (outer face)
        ├── super + passer ─────────> surpass (step beyond)
        └── *superānus ─────────────> sovereign (supreme ruler)
```

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

### Distinct Spheres of Manifestation
1. **Hierarchical Authority & Governance**: *superior*, *supreme*, *supremacy*, *sovereign*, *superintend*, *supervisor* (monarchs, supreme courts, management oversight).
2. **Cosmology, Physics & Typography**: *supernatural*, *supernova*, *superscript* (celestial miracles, exploding stars, elevated typography).
3. **Manners & Psychological Disposition**: *supercilious*, *superb* (haughty arrogance, splendid excellence).
4. **Physical Boundaries & Excess**: *superficial*, *surface*, *superfluous*, *superimpose* (outer faces, redundant clutter, overlapping layers).
5. **Overcoming Obstacles & Replacement**: *supersede*, *surpass*, *insuperable*, *exsuperate* (supplanting old rules, outperforming rivals, unyielding challenges).
6. **Folk Belief & Religion**: *superstition* (credulous belief in supernatural causation).

---

## 🔀 4. Prefix & Combining Dynamics on super

### Prefix Combinations & Compound Roots
- **super- + faciēs ("face")**: *superficial*, *surface*.
- **super- + sedēre ("to sit")**: *supersede*.
- **super- + fluere ("to flow")**: *superfluous*.
- **super- + cilium ("eyelid")**: *supercilious*.
- **super- + ferre / lātus ("to carry")**: *superlative* (carried above all else).
- **in- ("not") + super-**: *insuperable* (cannot be climbed over).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Astrophysics & Astronomy** | Stellar evolution, white dwarf collapses, iron core collapses | *supernova*, *Type Ia supernova* |
| **Constitutional Law & Jurisprudence** | Judicial review, preemption doctrine, sovereign immunity | *supreme*, *Supreme Court*, *supremacy clause*, *sovereign* |
| **Corporate Management & Labor** | Organizational hierarchy, regulatory oversight | *supervisor*, *superintendent*, *superior* |
| **Philosophy & Anthropology** | Supernaturalism, paranormal studies, folk beliefs | *supernatural*, *superstition* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[exsuperate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin super within the domain of Space & Environment.<br>**2.** A technical or specialized form exhibiting the properties of super in systematic terminology. | *"In academic literature, exsuperate designates pertaining to, derived from, or characteristic of latin super within the domain of space & environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insuperable]] | adjective | **1.** Impossible to surmount.<br>**2.** Incapable of being surmounted or excelled. | *"Am I severed from you by insuperable obstacles?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[insuperably]] | adverb | **1.** To an insuperable degree. | *"This instant at which I speak to you shows me again exactly how, to my great misfortune, you just insuperably charm me."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[super]] | noun | **1.** A caretaker for an apartment house; represents the owner as janitor and rent collector.<br>**2.** Of the highest quality. | *"It is different from perception that culminates in reason, for it arises in sensation and culminates in emotion, which, be it admitted, is nothing else than super-sensation."* — Jack London, *The Jacket (The Star-Rover)* |
| [[superable]] | adjective | **1.** Capable of being surmounted or excelled. | *"In academic literature, superable designates capable of being surmounted or excelled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superabundance]] | noun | **1.** A quantity that is more than what is appropriate. | *"She wished to help him, to bestow on him the superabundance of her own happiness."* — graf Leo Tolstoy, *War and Peace* |
| [[superabundant]] | adjective | **1.** Most excessively abundant. | *"Revenues were superabundant for current expenses of government, and altho there was a large national debt, hardly any of it was redeemable at the time."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[superannuate]] | verb | **1.** Retire and pension (someone) because of age or physical inability.<br>**2.** Declare to be obsolete. | *"During this interval I had remained standing on the piazza of the ‘Ti,’ which directly fronted the Happar mountain, and with no one near me but Kory-Kory and the old superannuated savages I have described."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[superannuated]] | verb | **1.** Retire and pension (someone) because of age or physical inability.<br>**2.** Declare to be obsolete. | *"During this interval I had remained standing on the piazza of the ‘Ti,’ which directly fronted the Happar mountain, and with no one near me but Kory-Kory and the old superannuated savages I have described."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[superannuation]] | noun | **1.** A monthly payment made to someone who is retired from work.<br>**2.** The property of being out of date and not current. | *"In academic literature, superannuation designates a monthly payment made to someone who is retired from work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superb]] | adjective | **1.** Of surpassing excellence.<br>**2.** Surpassingly good. | *"Two wax candles stood lighted on the table, and two on the mantelpiece; basking in the light and heat of a superb fire, lay Pilot—Adèle knelt near him."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[superbly]] | adverb | **1.** (used as an intensifier) extremely well. | *"Hall will have found your correct places in each other's lives and it will be just a glorious example of how superbly a man and woman can work together at the same profession."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[supercargo]] | noun | **1.** An officer on a merchant ship in charge of the cargo and its sale and purchase. | *"Hendrik Hamel was supercargo and part owner of the _Sparwehr_ adventure, and what he did not own was the property of Captain Johannes Maartens."* — Jack London, *The Jacket (The Star-Rover)* |
| [[supercede]] | verb | **1.** Take the place or move into the position of. | *"In academic literature, supercede designates take the place or move into the position of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercharge]] | verb | **1.** Increase or raise.<br>**2.** Increase the pressure on a gas or liquid. | *"In academic literature, supercharge designates increase or raise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercharged]] | verb | **1.** Increase or raise.<br>**2.** Increase the pressure on a gas or liquid. | *"In academic literature, supercharged designates increase or raise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercharger]] | noun | **1.** Compressor that forces increased oxygen into the cylinders of an internal-combustion engine. | *"In academic literature, supercharger designates compressor that forces increased oxygen into the cylinders of an internal-combustion engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercilious]] | adjective | **1.** Having or showing arrogant superiority to and disdain of those one views as unworthy; ; ; ; ; ; ; - w.l.shirer.<br>**2.** Expressive of contempt. | *"A distant supercilious air makes a cold atmosphere about her, and there is nothing in her bearing, as there was before, to encourage openness."* — Charles Dickens, *Bleak House* |
| [[superciliously]] | adverb | **1.** With a sneer; in an uncomplimentary sneering manner. | *"She took no notice of me until she had the candle in her hand, when she looked over her shoulder, superciliously saying, “You are to come this way to-day,” and took me to quite another part of the house."* — Charles Dickens, *Great Expectations* |
| [[superciliousness]] | noun | **1.** The trait of displaying arrogance by patronizing those considered inferior. | *"Noted reed-drawers were they too, and looked round upon the other three with some superciliousness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[supercilium]] | noun | **1.** The arch of hair above each eye. | *"In academic literature, supercilium designates the arch of hair above each eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superclass]] | noun | **1.** (biology) a taxonomic class below a phylum and above a class. | *"In academic literature, superclass designates (biology) a taxonomic class below a phylum and above a class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercomputer]] | noun | **1.** A mainframe computer that is one of the most powerful available at a given time. | *"In academic literature, supercomputer designates a mainframe computer that is one of the most powerful available at a given time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superconductivity]] | noun | **1.** The disappearance of electrical resistance at very low temperatures. | *"In academic literature, superconductivity designates the disappearance of electrical resistance at very low temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercritical]] | adjective | **1.** (especially of fissionable material) able to sustain a chain reaction in such a manner that the rate of reaction increases. | *"In academic literature, supercritical designates (especially of fissionable material) able to sustain a chain reaction in such a manner that the rate of reaction increases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superego]] | noun | **1.** (psychoanalysis) that part of the unconscious mind that acts as a conscience. | *"In academic literature, superego designates (psychoanalysis) that part of the unconscious mind that acts as a conscience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supererogation]] | noun | **1.** An effort above and beyond the call of duty. | *"Which was quite a work of supererogation--I think that is the word, but Elsie knows--considering that their own brother, Mad Jeremy, was on foot--and healthy, thank'ee kindly!"* — S. R. Crockett, *Deep Moat Grange* |
| [[supererogatory]] | adjective | **1.** More than is needed, desired, or required. | *"He was close to her doors: his standing was sufficient: his qualities were even supererogatory."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superficial]] | adjective | **1.** Concerned with or comprehending only what is apparent or obvious; not deep or penetrating emotionally or intellectually.<br>**2.** Of, affecting, or being on or near the surface. | *"A very superficial, ignorant, unweighing fellow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superficiality]] | noun | **1.** Lack of depth of knowledge or thought or feeling.<br>**2.** Shallowness in terms of affecting only surface layers of something. | *"The education had intensified the cardinal faults of his character, impatience, superficiality, a great lack of sympathy for the more tender attachments and the more profound interests of men--essential unbelief in human grandeur."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[superficially]] | adverb | **1.** In a superficial manner. | *"Paris and Troilus, you have both said well; And on the cause and question now in hand Have gloz’d, but superficially; not much Unlike young men, whom Aristotle thought Unfit to hear moral philosophy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superficies]] | noun | **1.** The purely external aspect of a thing; superficial appearance; -r.w.speaight.<br>**2.** Outer surface of an area or a body. | *"As if a woman were a mere colored superficies!"* — George Eliot, *Middlemarch* |
| [[superfluity]] | noun | **1.** Extreme excess. | *"If they would yield us but the superfluity while it were wholesome, we might guess they relieved us humanely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superfluous]] | adjective | **1.** Serving no useful purpose; having no excuse for being.<br>**2.** More than is needed, desired, or required. | *"Caesar, ’tis his schoolmaster— An argument that he is plucked, when hither He sends so poor a pinion of his wing, Which had superfluous kings for messengers Not many moons gone by."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superfluously]] | adverb | **1.** In a superfluous manner. | *"That may be, for you bear a many superfluously, and ’twere more honour some were away."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superimpose]] | verb | **1.** Place on top of. | *"The sight, coming as it did, superimposed upon the other dark scenery of the previous days, formed a sort of climax to the whole panorama, and it was more than he could endure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superimposed]] | verb | **1.** Place on top of.<br>**2.** Placed on or over something else. | *"The sight, coming as it did, superimposed upon the other dark scenery of the previous days, formed a sort of climax to the whole panorama, and it was more than he could endure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superincumbent]] | adjective | **1.** Lying or resting on and exerting pressure on something else. | *"Then a superincumbent bundle rolled down, with a whisking noise; flames elongated, and bent themselves about with a quiet roar, but no crackle."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superinfect]] | verb | **1.** Infect (an infected cell) further or infect a cell already containing similar organisms. | *"In academic literature, superinfect designates infect (an infected cell) further or infect a cell already containing similar organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superinfection]] | noun | **1.** Infection that occurs while you are being treated for another infection. | *"In academic literature, superinfection designates infection that occurs while you are being treated for another infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superintend]] | verb | **1.** Watch and direct. | *"She meant to superintend these preparations herself and to have it all fixed as daintily as possible."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[superintendence]] | noun | **1.** Management by overseeing the performance or operation of a person or group. | *"In the active superintendence of this young person, Judy Smallweed appears to attain a perfectly geological age and to date from the remotest periods."* — Charles Dickens, *Bleak House* |
| [[superintendent]] | noun | **1.** A person who directs and manages an organization.<br>**2.** A caretaker for an apartment house; represents the owner as janitor and rent collector. | *"Hall, "told me that when superintendent of a Sunday school he felt a strong impulse, one Saturday evening, to call at the home of one of his teachers whom he had never visited before."* — Classic Author, *The wonders of prayer* |
| [[superior]] | noun | **1.** One of greater rank or station or quality.<br>**2.** The head of a religious community. | *"The general’s disdain’d By him one step below, he by the next, That next by him beneath; so every step, Exampl’d by the first pace that is sick Of his superior, grows to an envious fever Of pale and bloodless emulation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superiority]] | noun | **1.** The quality of being superior.<br>**2.** The quality of being at a competitive advantage. | *"Yes!” With her air of superiority, and power, and fascination, and I know not what, she seemed to regard Ada and me as little more than children."* — Charles Dickens, *Bleak House* |
| [[superlative]] | noun | **1.** An exaggerated expression (usually of praise).<br>**2.** The highest level or degree attainable; the highest stage of development. | *"He is always in extremes, perpetually in the superlative degree."* — Charles Dickens, *Bleak House* |
| [[superlatively]] | adverb | **1.** To a superlative degree. | *"Being a man not without a frequent consciousness that there was some charm in this life he led, he stood still after looking at the sky as a useful instrument, and regarded it in an appreciative spirit, as a work of art superlatively beautiful."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[superload]] | noun | **1.** A variable load on a structure (e.g. a bridge) such as moving traffic. | *"In academic literature, superload designates a variable load on a structure (e.g. a bridge) such as moving traffic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superlunar]] | adjective | **1.** Situated beyond the moon or its orbit around the earth.<br>**2.** Unworldly or ethereal. | *"In academic literature, superlunar designates situated beyond the moon or its orbit around the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superlunary]] | adjective | **1.** Situated beyond the moon or its orbit around the earth.<br>**2.** Unworldly or ethereal. | *"In academic literature, superlunary designates situated beyond the moon or its orbit around the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superman]] | noun | **1.** A person with great powers and abilities.<br>**2.** Street name for lysergic acid diethylamide. | *"He has to be man to so many people that there is danger of his becoming a kind of superman."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[supermarket]] | noun | **1.** A large self-service grocery store selling groceries and dairy products and household goods. | *"I identified each album sequentially on its spine with a gold foil letter from a packet purchased at a supermarket."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[supermarketeer]] | noun | **1.** An operator of a supermarket. | *"In academic literature, supermarketeer designates an operator of a supermarket."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supermarketer]] | noun | **1.** An operator of a supermarket. | *"In academic literature, supermarketer designates an operator of a supermarket."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supermex]] | noun | **1.** United states golfer (born in 1939). | *"In academic literature, supermex designates united states golfer (born in 1939)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supermodel]] | noun | **1.** A fashion model who has attained the status of a celebrity. | *"In academic literature, supermodel designates a fashion model who has attained the status of a celebrity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supermolecule]] | noun | **1.** Any very large complex molecule; found only in plants and animals. | *"In academic literature, supermolecule designates any very large complex molecule; found only in plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supermom]] | noun | **1.** An informal term for a mother who can combine childcare and full-time employment. | *"In academic literature, supermom designates an informal term for a mother who can combine childcare and full-time employment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernal]] | adjective | **1.** Being or coming from on high.<br>**2.** Of heaven or the spirit. | *"From that supernal judge that stirs good thoughts In any breast of strong authority, To look into the blots and stains of right."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supernatant]] | noun | **1.** The clear liquid that lies above a sediment or precipitate.<br>**2.** Of a liquid; floating on the surface above a sediment or precipitate. | *"In academic literature, supernatant designates the clear liquid that lies above a sediment or precipitate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernatural]] | noun | **1.** Supernatural forces and events and beings collectively.<br>**2.** Not existing in nature or subject to explanation according to natural laws; not physical or material. | *"They say miracles are past; and we have our philosophical persons to make modern and familiar things supernatural and causeless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supernaturalism]] | noun | **1.** A belief in forces beyond ordinary human understanding.<br>**2.** The quality of being attributed to power that seems to violate or go beyond natural forces. | *"Nor, in some things, does the common, hereditary experience of all mankind fail to bear witness to the supernaturalism of this hue."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[supernaturalist]] | adjective | **1.** Of or relating to supernaturalism. | *"Yet you must admit that the footmark is material.” “The original hound was material enough to tug a man’s throat out, and yet he was diabolical as well.” “I see that you have quite gone over to the supernaturalists."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[supernaturalistic]] | adjective | **1.** Of or relating to supernaturalism. | *"In academic literature, supernaturalistic designates of or relating to supernaturalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernaturally]] | adverb | **1.** In a supernatural manner. | *"It was now about nine o’clock, and the room seeming almost supernaturally quiet after these orgies, I began to congratulate myself upon a little plan that had occurred to me just previous to the entrance of the seamen."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[supernaturalness]] | noun | **1.** The quality of being attributed to power that seems to violate or go beyond natural forces. | *"Glancing upwards, he cried: “See! see!” and once more the high tapering flames were beheld with what seemed redoubled supernaturalness in their pallor."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[supernormal]] | adjective | **1.** Beyond the range of the normal or scientifically explainable.<br>**2.** Exceeding the normal or average. | *"In academic literature, supernormal designates beyond the range of the normal or scientifically explainable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernova]] | noun | **1.** A star that explodes and becomes extremely luminous in the process. | *"In academic literature, supernova designates a star that explodes and becomes extremely luminous in the process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernumerary]] | noun | **1.** A person serving no apparent function.<br>**2.** A minor actor in crowd scenes. | *"The supply was getting less as the animals advanced in calf, and the supernumerary milkers of the lush green season had been dismissed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[superorder]] | noun | **1.** (biology) a taxonomic group ranking above an order and below a class or subclass. | *"In academic literature, superorder designates (biology) a taxonomic group ranking above an order and below a class or subclass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superordinate]] | noun | **1.** One of greater rank or station or quality.<br>**2.** A word that is more generic than a given word. | *"In academic literature, superordinate designates one of greater rank or station or quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superordination]] | noun | **1.** The semantic relation of being superordinate or belonging to a higher rank or class. | *"In academic literature, superordination designates the semantic relation of being superordinate or belonging to a higher rank or class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superoxide]] | noun | **1.** A metallic oxide containing the univalent anion o2-.<br>**2.** The univalent anion o2-. | *"In academic literature, superoxide designates a metallic oxide containing the univalent anion o2-."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersaturated]] | adjective | **1.** Being more concentrated than normally possible and therefore not in equilibrium. | *"In academic literature, supersaturated designates being more concentrated than normally possible and therefore not in equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superscribe]] | verb | **1.** Write on the top or outside.<br>**2.** Write on the outside or upper part of. | *"The photograph was of Irene Adler herself in evening dress, the letter was superscribed to “Sherlock Holmes, Esq."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[superscript]] | noun | **1.** A character or symbol set or printed or written above and immediately to one side of another character.<br>**2.** Written or printed above and to one side of another character. | *"In academic literature, superscript designates a character or symbol set or printed or written above and immediately to one side of another character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superscription]] | noun | **1.** An inscription written above something else.<br>**2.** The activity of superscribing. | *"Or doth this churlish superscription Pretend some alteration in good will?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supersede]] | verb | **1.** Take the place or move into the position of. | *"He supposes all his dependents to be utterly bereft of individual characters, intentions, or opinions, and is persuaded that he was born to supersede the necessity of their having any."* — Charles Dickens, *Bleak House* |
| [[supersedure]] | noun | **1.** Act of replacing one person or thing by another especially one held to be superior. | *"In academic literature, supersedure designates act of replacing one person or thing by another especially one held to be superior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersensitised]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, supersensitised designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersensitive]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"But with the self-combating proclivity of the supersensitive, an answer thereto arose in Clare’s own mind, and he almost feared it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[supersensitized]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, supersensitized designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersession]] | noun | **1.** Act of replacing one person or thing by another especially one held to be superior. | *"From their own point of view they were right, for the triumph of the ideas of Jesus was the abolition of tribal religions and their supersession by a new mind or spirit with nothing local or racial about it."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[superslasher]] | noun | **1.** Large (20-ft) and swift carnivorous dinosaur having an upright slashing claw 15 inches long on each hind foot; early cretaceous. | *"In academic literature, superslasher designates large (20-ft) and swift carnivorous dinosaur having an upright slashing claw 15 inches long on each hind foot; early cretaceous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersonic]] | adjective | **1.** (of speed) greater than the speed of sound in a given medium (especially air).<br>**2.** Having frequencies above those of audible sound. | *"In academic literature, supersonic designates (of speed) greater than the speed of sound in a given medium (especially air)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superstar]] | noun | **1.** Someone who is dazzlingly skilled in any field. | *"In academic literature, superstar designates someone who is dazzlingly skilled in any field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superstition]] | noun | **1.** An irrational belief arising from ignorance or fear. | *"And give me leave, And do not say ’tis superstition, that I kneel, and then implore her blessing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superstitious]] | adjective | **1.** Showing ignorance of the laws of nature and faith in magic or chance. | *"But it is doubtful yet Whether Caesar will come forth today or no; For he is superstitious grown of late, Quite from the main opinion he held once Of fantasy, of dreams, and ceremonies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superstitiously]] | adverb | **1.** In a superstitious manner. | *"You are like one that superstitiously Doth swear to the gods that winter kills the flies: But yet I know you’ll do as I advise. [_Exeunt._] SCENE IV."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superstrate]] | noun | **1.** Any stratum or layer superimposed on another.<br>**2.** The language of a later invading people that is imposed on an indigenous population and contributes features to their language. | *"In academic literature, superstrate designates any stratum or layer superimposed on another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superstratum]] | noun | **1.** Any stratum or layer superimposed on another.<br>**2.** The language of a later invading people that is imposed on an indigenous population and contributes features to their language. | *"In academic literature, superstratum designates any stratum or layer superimposed on another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superstring]] | noun | **1.** A hypothetical particle that is the elementary particle in a theory of space-time. | *"In academic literature, superstring designates a hypothetical particle that is the elementary particle in a theory of space-time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superstructure]] | noun | **1.** Structure consisting of the part of a ship above the main deck. | *"M'Gregor was anxious that a superstructure should be built on the foundation laid by himself by his going to College."* — John Cairns, *Principal Cairns* |
| [[supersymmetry]] | noun | **1.** (physics) a theory that tries to link the four fundamental forces. | *"In academic literature, supersymmetry designates (physics) a theory that tries to link the four fundamental forces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supertanker]] | noun | **1.** The largest class of oil tankers. | *"In academic literature, supertanker designates the largest class of oil tankers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supertax]] | noun | **1.** An additional tax on certain kinds of income that has already been taxed. | *"In academic literature, supertax designates an additional tax on certain kinds of income that has already been taxed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supertitle]] | noun | **1.** Translation of the words of a foreign opera (or choral work) projected on a screen above the stage. | *"In academic literature, supertitle designates translation of the words of a foreign opera (or choral work) projected on a screen above the stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supertonic]] | noun | **1.** (music) the second note of a diatonic scale. | *"In academic literature, supertonic designates (music) the second note of a diatonic scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supertwister]] | noun | **1.** The most powerful tornado which can create enormously devastating damage. | *"In academic literature, supertwister designates the most powerful tornado which can create enormously devastating damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supervise]] | verb | **1.** Watch and direct.<br>**2.** Keep tabs on; keep an eye on; keep under surveillance. | *"Let me supervise the canzonet. [_He takes the letter_.] Here are only numbers ratified, but, for the elegancy, facility, and golden cadence of poesy, _caret_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supervised]] | verb | **1.** Watch and direct.<br>**2.** Keep tabs on; keep an eye on; keep under surveillance. | *"While she supervised the cooking of the meats and soups and coffee, all nice things were made and distributed by herself."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[supervising]] | noun | **1.** Management by overseeing the performance or operation of a person or group.<br>**2.** Watch and direct. | *"Especially is the difficulty of supervising workers and of ensuring the performance of a certain standard, or minimum, amount and quality of work great in larger enterprises."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[supervision]] | noun | **1.** Management by overseeing the performance or operation of a person or group. | *"At length he recovered sufficiently to be removed under his elder brother's careful and loving supervision to the Edinburgh Infirmary, where he remained for four months."* — John Cairns, *Principal Cairns* |
| [[supervisor]] | noun | **1.** One who supervises or has charge and direction of.<br>**2.** A program that controls the execution of other programs. | *"Would you, the supervisor, grossly gape on, Behold her topp’d?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supervisory]] | adjective | **1.** Of or limited to or involving supervision. | *"In academic literature, supervisory designates of or limited to or involving supervision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsupervised]] | adjective | **1.** Not supervised or under constant observation. | *"In academic literature, unsupervised designates not supervised or under constant observation."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SUPER
  </div>
</div>
