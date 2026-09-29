---
status: unread
type: root_dashboard
---
# Dashboard — phan
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">φαίνειν φαντός φαινόμενον φάσις (phaínein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to show, visible”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'to show, visible'.</span>
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

The Greek root **phan** (φαίνειν φαντός φαινόμενον φάσις (phaínein)) signifies to show, visible. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *diaphanous*, *emphasis*, *epiphany*, *fantasy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to show, visible
> The Greek root **phan** fundamentally denotes **to show, visible**. The physical sensory observation and cognitive anchor underlying 'to show, visible'. In classical Greek antiquity, the root denoted 'to show, visible', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">to show, visible</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'to show, visible'.</mark>
> - **Everyday Connection**: Think of familiar words like *diaphanous*, *emphasis*, *epiphany*, *fantasy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phan** derives from Ancient Greek <mark class="hl-stem">φαίνειν φαντός φαινόμενον φάσις (phaínein)</mark>, meaning "to show, visible".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with phan**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'to show, visible'.
  - Whenever you see **phan** in an English word, think immediately of **to show, visible**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phan</mark>, think of <mark class="hl-def">to show, visible</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `phan-` (from *φαίνειν φαντός φαινόμενον φάσις (phaínein)*).
> - **Combining Stem with -o- Connective:** `phano-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Phan
> - **1. Direct & Concrete Anchor:** Literal instantiation of to show, visible in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on phan

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `phan-` | [[diaphanous]] | Primary root semantic foundation denoting to show, visible. |
| **Connecting -o-** | `phano-` | [[emphasis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `phan` | [[epiphany]] | Relational or directional modification of the core root sense. |

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
| [[anaphase]] | noun | **1.** The stage of meiosis or mitosis when chromosomes move toward opposite ends of the nuclear spindle. | *"In academic literature, anaphase designates the stage of meiosis or mitosis when chromosomes move toward opposite ends of the nuclear spindle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aphanite]] | noun | **1.** Fine-grained homogeneous rock (such as basalt) containing minerals undetectable by the naked eye. | *"In academic literature, aphanite designates fine-grained homogeneous rock (such as basalt) containing minerals undetectable by the naked eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aphanitic]] | adjective | **1.** Of or relating to aphanite. | *"In academic literature, aphanitic designates of or relating to aphanite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diaphanous]] | noun | **1.** Characterized by such fineness of texture as to permit seeing through.<br>**2.** Characterized by extreme delicacy of form : ethereal. | *"The water shone pacifically; the sky, without a speck, was a benign immensity of unstained light; the very mist on the Essex marsh was like a gauzy and radiant fabric, hung from the wooded rises inland, and draping the low shores in diaphanous folds."* — Joseph Conrad, *Heart of Darkness* |
| [[emphasis]] | noun | **1.** Force or intensity of expression that gives impressiveness or importance to something.<br>**2.** A particular prominence given in reading or speaking to one or more words or syllables. | *"Be choked with such another emphasis!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[emphasise]] | verb | **1.** Give extra weight to (a communication).<br>**2.** To stress, single out as important. | *"What I would emphasise is, that under the head of Pride your sister is a great and opportune example to you.” “Under _all_ heads that are included in the composition of a fine character, she is.” “Say so; but take this one."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[emphasised]] | verb | **1.** Give extra weight to (a communication).<br>**2.** To stress, single out as important. | *"Now,” said Wemmick, “questioning being over,” which he emphasised and repeated for my guidance, “I come to what I did, after hearing what I heard."* — Charles Dickens, *Great Expectations* |
| [[emphasize]] | verb | **1.** To stress, single out as important.<br>**2.** Give extra weight to (a communication). | *"At the same time, to emphasize the exorcism, they knock on doors, window-shutters, chests, and other domestic articles of furniture."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[emphatic]] | adjective | **1.** Spoken with emphasis.<br>**2.** Sudden and strong. | *"But people who know better should be very emphatic in suppressing it." "What was the misfortune that happened long ago in the castle and then again?" Kurt asked in great suspense."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[epiphany]] | noun | **1.** A Christian festival held on January 6 in commemoration of the coming of the Magi as the first manifestation of Christ to the Gentiles or in the Eastern Church in commemoration of the baptism of Christ.<br>**2.** An appearance or manifestation especially of a divine being. | *"It was a grand farewell dinner, as he and Denísov were leaving to join their regiment after Epiphany."* — graf Leo Tolstoy, *War and Peace* |
| [[epiphenomenon]] | noun | **1.** A secondary phenomenon that is a by-product of another phenomenon. | *"In academic literature, epiphenomenon designates a secondary phenomenon that is a by-product of another phenomenon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasise]] | verb | **1.** Indulge in fantasies.<br>**2.** Portray in the mind. | *"In academic literature, fantasise designates indulge in fantasies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasist]] | noun | **1.** A creator of fantasies. | *"In academic literature, fantasist designates a creator of fantasies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasize]] | verb | **1.** Indulge in fantasies.<br>**2.** Portray in the mind. | *"In academic literature, fantasize designates indulge in fantasies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantastic]] | adjective | **1.** Ludicrously odd.<br>**2.** Extraordinarily good or great ; used especially as intensifiers. | *"There with fantastic garlands did she make Of crow-flowers, nettles, daisies, and long purples, That liberal shepherds give a grosser name, But our cold maids do dead men’s fingers call them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantastical]] | adjective | **1.** Existing in fancy only; - nathaniel hawthorne.<br>**2.** Ludicrously odd. | *"Ne’er a fantastical knave of them all shall flout me out of my calling. [_Exit._] SCENE IV."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantastically]] | adverb | **1.** Exceedingly; extremely. | *"Re-enter Ophelia, fantastically dressed with straws and flowers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantasy]] | noun | **1.** The power or process of creating especially unrealistic or improbable mental images in response to psychological need; also : a mental image or a series of mental images (such as a daydream) so created.<br>**2.** A creation of the imagination: such as. | *"But if thy love were ever like to mine— As sure I think did never man love so— How many actions most ridiculous Hast thou been drawn to by thy fantasy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metaphase]] | noun | **1.** The stage of mitosis and meiosis in which the chromosomes become arranged in the equatorial plane of the spindle.<br>**2.** A section in the equatorial plane of the metaphase spindle having the chromosomes oriented upon it. | *"In academic literature, metaphase designates the stage of mitosis and meiosis in which the chromosomes become arranged in the equatorial plane of the spindle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phan]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of to show, visible. | *"In academic literature, phan designates adjective*) pertaining to, derived from, or characteristic of to show, visible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phanerogam]] | noun | **1.** Plant that reproduces by means of seeds not spores. | *"In academic literature, phanerogam designates plant that reproduces by means of seeds not spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phanerogamae]] | noun | **1.** In former classification systems: one of two major plant divisions, including all seed-bearing plants; superseded by the division spermatophyta. | *"In academic literature, phanerogamae designates in former classification systems: one of two major plant divisions, including all seed-bearing plants; superseded by the division spermatophyta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phaneromania]] | noun | **1.** An irresistible desire to pick at superficial body parts (as in obsessive nail-biting). | *"In academic literature, phaneromania designates an irresistible desire to pick at superficial body parts (as in obsessive nail-biting)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phanerozoic]] | noun | **1.** Of, relating to, or being an eon of geologic history that comprises the Paleozoic, Mesozoic, and Cenozoic or the corresponding systems of rocks. | *"In academic literature, phanerozoic designates of, relating to, or being an eon of geologic history that comprises the paleozoic, mesozoic, and cenozoic or the corresponding systems of rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phantasm]] | noun | **1.** A product of fantasy: such as.<br>**2.** Delusive appearance : illusion. | *"A personal, human feeling for a brief moment got the better of the artificial phantasm of life he had served so long."* — graf Leo Tolstoy, *War and Peace* |
| [[phantasma]] | noun | **1.** A ghostly appearing figure.<br>**2.** Something existing in perception only. | *"In academic literature, phantasma designates a ghostly appearing figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phantasmagoria]] | noun | **1.** A constantly changing medley of real or imagined images (as in a dream). | *"The flesh is phantasmagoria and apparitional."* — Jack London, *The Jacket (The Star-Rover)* |
| [[phantasmagoric]] | adjective | **1.** Characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys. | *"Possibly, it was an instinctive device of her spirit to relieve itself by the exhibition of these phantasmagoric forms, from the cruel weight and hardness of the reality."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[phantasmagorical]] | adjective | **1.** Characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys. | *"In academic literature, phantasmagorical designates characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phantasmal]] | adjective | **1.** Resembling or characteristic of a phantom. | *"The conversation at the table mixed in with his phantasmal orchestra till he thought: “What a fluty voice one of those milkmaids has!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[phantasy]] | noun | **1.** Something many people believe that is false.<br>**2.** Fiction with a large amount of imagination in it. | *"Nor a spot More fit to stir the poet's phantasy; Grey Old Man of the Mountain, awfully There, from thy wreath of clouds thou dost uprear Those features grand,--the same eternally!"* — Effie Afton, *Eventide* |
| [[phantom]] | noun | **1.** Something apparent to sense but with no substantial existence : apparition.<br>**2.** Something elusive or visionary. | *"Whatever you do on this side the grave, never give one lingering glance towards the horrible phantom that has haunted us so many years."* — Charles Dickens, *Bleak House* |
| [[phase]] | noun | **1.** A particular appearance or state in a regularly recurring cycle of changes.<br>**2.** A distinguishable part in a course, development, or cycle. | *"It was a second to remember another phase of the matter."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[phene]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phan.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, phene designates a term designating an entity, condition, or phenomenon derived from greek phan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phenetic]] | noun | **1.** Of or relating to taxonomic analysis that emphasizes the overall similarities of characteristics among biological taxa without regard to phylogenetic relationships. | *"In academic literature, phenetic designates of or relating to taxonomic analysis that emphasizes the overall similarities of characteristics among biological taxa without regard to phylogenetic relationships."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phenology]] | noun | **1.** A branch of science dealing with the relations between climate and periodic biological phenomena (such as bird migration or plant flowering).<br>**2.** Periodic biological phenomena that are correlated with climatic conditions. | *"In academic literature, phenology designates a branch of science dealing with the relations between climate and periodic biological phenomena (such as bird migration or plant flowering)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phenomenon]] | noun | **1.** An observable fact or event : an item of experience or reality.<br>**2.** Someone or something that is very popular or impressive especially because of an unusual quality or ability. | *"He is, in sense and attachment, a phenomenon."* — Charles Dickens, *Bleak House* |
| [[polyphase]] | noun | **1.** Having or producing two or more phases. | *"In academic literature, polyphase designates having or producing two or more phases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prophase]] | noun | **1.** The initial stage of mitosis and of the mitotic division of meiosis characterized by the condensation of chromosomes consisting of two chromatids, disappearance of the nucleolus and nuclear membrane, and formation of mitotic spindle.<br>**2.** The initial stage of the first division of meiosis in which the chromosomes become visible, homologous pairs of chromosomes undergo synapsis and crossing over, chiasmata appear, chromosomes condense with homologues visible as tetrads, and the nuclear membrane and nucleolus disappear. | *"In academic literature, prophase designates the initial stage of mitosis and of the mitotic division of meiosis characterized by the condensation of chromosomes consisting of two chromatids, disappearance of the nucleolus and nuclear membrane, and formation of mitotic spindle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telophase]] | noun | **1.** The final stage of mitosis and of the second division of meiosis in which the spindle disappears and the nucleus reforms around each set of chromosomes.<br>**2.** The final stage in the first division of meiosis that may be missing in some organisms and is characterized by the gathering at opposite poles of the cell of half of the original number of chromosomes including one from each homologous pair. | *"In academic literature, telophase designates the final stage of mitosis and of the second division of meiosis in which the spindle disappears and the nucleus reforms around each set of chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theophany]] | noun | **1.** A visible manifestation of a deity. | *"In academic literature, theophany designates a visible manifestation of a deity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tryptophan]] | noun | **1.** A crystalline essential amino acid C11H12N2O2 that is widely distributed in proteins.<br>**2.** The levorotatory form of tryptophan that is a precursor of serotonin and was used formerly as a dietary supplement especially to promote sleep and relieve depression. | *"In academic literature, tryptophan designates a crystalline essential amino acid c11h12n2o2 that is widely distributed in proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unemphatic]] | adjective | **1.** Not emphasized. | *"I like her better as she is.” Hence, when she found that Dorothea was making arrangements for her final departure to Lowick, Celia raised her eyebrows with disappointment, and in her quiet unemphatic way shot a needle-arrow of sarcasm."* — George Eliot, *Middlemarch* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light & Vision]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHAN
  </div>
</div>
