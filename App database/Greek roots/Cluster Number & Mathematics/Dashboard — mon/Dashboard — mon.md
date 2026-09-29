---
status: unread
type: root_dashboard
---
# Dashboard — mon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μόνος μονάς μονάδος (mónos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“alone, only”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'alone, only'.</span>
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

The Greek root **mon** (μόνος μονάς μονάδος (mónos)) signifies alone, only. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *mon*, *monachism*, *monad*, *monadic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: alone, only
> The Greek root **mon** fundamentally denotes **alone, only**. The physical sensory observation and cognitive anchor underlying 'alone, only'. In classical Greek antiquity, the root denoted 'alone, only', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">alone, only</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'alone, only'.</mark>
> - **Everyday Connection**: Think of familiar words like *mon*, *monachism*, *monad*, *monadic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mon** derives from Ancient Greek <mark class="hl-stem">μόνος μονάς μονάδος (mónos)</mark>, meaning "alone, only".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with mon**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'alone, only'.
  - Whenever you see **mon** in an English word, think immediately of **alone, only**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mon</mark>, think of <mark class="hl-def">alone, only</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `mon-` (from *μόνος μονάς μονάδος (mónos)*).
> - **Combining Stem with -o- Connective:** `mono-` (standard Greek combining vowel utilized before consonants).
> - **Ablaut & Dialectal Variations:** Demonstrates standard apophonic grade shifts and dialectal adaptations in classical compounding.
> - **Prefix Dynamics:** Readily compounds with Greek prepositions (*anti-*, *syn-*, *dia-*, *peri-*, *hyper-*, *hypo-*, *ana-*, *cata-*) to alter direction, degree, or relation.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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

> [!tip] 🌈 The Conceptual Facets of Mon
> - **1. Direct & Concrete Anchor:** Literal instantiation of alone, only in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on mon

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `mon-` | [[mon]] | Primary root semantic foundation denoting alone, only. |
| **Connecting -o-** | `mono-` | [[monachism]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `mon` | [[monad]] | Relational or directional modification of the core root sense. |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences & Biology:** Morphological categorization and taxonomic naming conventions.
- **Medicine & Healthcare:** Clinical diagnostic terminology, anatomical structures, and pathology.
- **Philosophy, Logic & Rhetoric:** Theoretical frameworks, dialectical categories, and cognitive models.
- **Modern Academic English:** High-register lexicon across humanities, social sciences, and technical literature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[amon]] | noun | **1.** A primeval egyptian personification of air and breath; worshipped especially at thebes. | *"You don't carry such a thing as a good palm-leaf fan amon'st your stuff, I expect?"* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[demon]] | noun | **1.** An evil supernatural being.<br>**2.** A cruel wicked and inhuman person. | *"Sir Leicester receives the gout as a troublesome demon, but still a demon of the patrician order."* — Charles Dickens, *Bleak House* |
| [[demonism]] | noun | **1.** A belief in and reverence for devils (especially satan). | *"No: but here thou beholdest even in a dumb brute, the instinct of the knowledge of the demonism in the world."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mon]] | abbreviation | **1.** monetary.<br>**2.** a member of the dominant native people of Pegu division, Myanmar (Burma). | *"Thy dæmon—that thy spirit which keeps thee—is Noble, courageous, high, unmatchable, Where Caesar’s is not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monachism]] | adjective | **1.** monastic. | *"In the town and immediate neighbourhood are some remains of religious houses, under various denominations; for the situation of Chepstow, presenting many advantages for commerce, was not less favourable for monachism."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[monad]] | noun | **1.** unit, one.<br>**2.** atom. | *"How 90:3 were the loaves and fishes multiplied on the shores of Galilee, - and that, too, without meal or monad from which loaf or fish could come?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[monadic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of alone, only. | *"A phrase like that of Clement of Alexandria, "deifying into apathy we become monadic," is seas away from anything we find in the speech of Jesus."* — T. R. Glover, *The Jesus of History* |
| [[monal]] | noun | **1.** Brilliantly colored pheasant of southern asia. | *"In academic literature, monal designates brilliantly colored pheasant of southern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monarchal]] | adjective | **1.** Having the characteristics of or befitting or worthy of a monarch.<br>**2.** Ruled by or having the supreme power resting with a monarch. | *"In academic literature, monarchal designates having the characteristics of or befitting or worthy of a monarch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monarchic]] | adjective | **1.** Ruled by or having the supreme power resting with a monarch. | *"It was true; Euergetes is a well-known kingly title, but the explanation that it was the reward for strenuous use of monarchic authority was new."* — T. R. Glover, *The Jesus of History* |
| [[monarchical]] | adjective | **1.** Having the characteristics of or befitting or worthy of a monarch.<br>**2.** Ruled by or having the supreme power resting with a monarch. | *"In the latter case, no doubt, the disproportionate force, as well as the monarchical form, of the new confederate, had its share of influence on the events."* — Alexander Hamilton, *The Federalist Papers* |
| [[monarchism]] | noun | **1.** Monarchical government or principles. | *"In academic literature, monarchism designates monarchical government or principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monarchist]] | noun | **1.** Monarchical government or principles.<br>**2.** Opposed to or hostile toward monarchies or monarchs. | *"Each party had its taunts in use, the Federalists being denounced as monarchists, the Anti-Federalists as Democrats; the one presumed to be looking forward to monarchy, the other to the rule of the mob."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[monarchy]] | noun | **1.** Undivided rule or absolute sovereignty by a single person.<br>**2.** A nation or state having a monarchical government. | *"Good my sovereign, Take up the English short, and let them know Of what a monarchy you are the head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monastery]] | noun | **1.** A house for persons under religious vows; especially : an establishment for monks. | *"This is a thing that Angelo knows not; for he this very day receives letters of strange tenour, perchance of the Duke’s death, perchance entering into some monastery; but, by chance, nothing of what is writ."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monastic]] | noun | **1.** Of or relating to monasteries or to monks or nuns.<br>**2.** Resembling (as in seclusion or ascetic simplicity) life in a monastery. | *"They had rambled round by a road which led to the well-known ruins of the Cistercian abbey behind the mill, the latter having, in centuries past, been attached to the monastic establishment."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monastical]] | adjective | **1.** Of communal life sequestered from the world under religious vows. | *"In academic literature, monastical designates of communal life sequestered from the world under religious vows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monasticism]] | noun | **1.** Of or relating to monasteries or to monks or nuns.<br>**2.** Resembling (as in seclusion or ascetic simplicity) life in a monastery. | *"It is significant that Christian monasticism and the coenobite life began in Egypt, where, as we learn from papyri found in recent years, great monasteries of Serapis existed long before our era."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monism]] | noun | **1.** A view that there is only one kind of ultimate substance.<br>**2.** The view that reality is one unitary organic whole with no independent parts. | *"In academic literature, monism designates a view that there is only one kind of ultimate substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monist]] | noun | **1.** A view that there is only one kind of ultimate substance.<br>**2.** The view that reality is one unitary organic whole with no independent parts. | *"In academic literature, monist designates a view that there is only one kind of ultimate substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monistic]] | adjective | **1.** Of or relating to the philosophical doctrine of monism; - j.s.roucek. | *"In academic literature, monistic designates of or relating to the philosophical doctrine of monism; - j.s.roucek."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monition]] | noun | **1.** A firm rebuke.<br>**2.** Cautionary advice about something imminent (especially imminent danger or other unpleasantness). | *"Bagnet growls, “Old girl!” and winks monitions to her to find out what’s the matter."* — Charles Dickens, *Bleak House* |
| [[monk]] | noun | **1.** A man who is a member of a religious order and lives in a monastery; also : friar. | *"I told my lord the Duke, by th’ devil’s illusions The monk might be deceived, and that ’twas dangerous For him to ruminate on this so far until It forged him some design, which, being believed, It was much like to do."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monoid]] | noun | **1.** Adjective & Noun*) Resembling, having the physical form of, or akin to alone, only. | *"In academic literature, monoid designates adjective & noun*) resembling, having the physical form of, or akin to alone, only."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolith]] | noun | **1.** A single great stone often in the form of an obelisk or column.<br>**2.** A massive structure. | *"The place took its name from a stone pillar which stood there, a strange rude monolith, from a stratum unknown in any local quarry, on which was roughly carved a human hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monolithic]] | noun | **1.** Of, relating to, or resembling a monolith : huge, massive.<br>**2.** Formed from a single crystal. | *"In academic literature, monolithic designates of, relating to, or resembling a monolith : huge, massive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monometer]] | noun | **1.** A line of verse consisting of a single metrical foot or dipody. | *"In academic literature, monometer designates a line of verse consisting of a single metrical foot or dipody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopod]] | noun | **1.** A one-legged support (as for a camera). | *"In academic literature, monopod designates a one-legged support (as for a camera)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopsony]] | noun | **1.** An oligopsony limited to one buyer. | *"In academic literature, monopsony designates an oligopsony limited to one buyer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monos]] | noun | **1.** Monophonic reproduction.<br>**2.** Infectious mononucleosis. | *"In academic literature, monos designates monophonic reproduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudomonad]] | noun | **1.** Bacteria usually producing greenish fluorescent water-soluble pigment; some pathogenic for plants and animals. | *"In academic literature, pseudomonad designates bacteria usually producing greenish fluorescent water-soluble pigment; some pathogenic for plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Mathematics]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MON
  </div>
</div>
