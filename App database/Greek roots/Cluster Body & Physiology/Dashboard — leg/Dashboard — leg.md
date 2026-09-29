---
status: unread
type: root_dashboard
---
# Dashboard — leg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">leg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“say”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'say'.</span>
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

The Greek root **leg** (λέγειν λέγεσθαι λεκτός λεκτικός λέξις λεξικός λεξικόν λόγος λεγόμενον λογεῖον (légein)) signifies say. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *alexia*, *alexithymia*, *apologetic*, *apologia*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: say
> The Greek root **leg** fundamentally denotes **say**. The physical sensory observation and cognitive anchor underlying 'say'. In classical Greek antiquity, the root denoted 'say', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">say</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'say'.</mark>
> - **Everyday Connection**: Think of familiar words like *alexia*, *alexithymia*, *apologetic*, *apologia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **leg** derives from Ancient Greek <mark class="hl-stem">λέγειν λέγεσθαι λεκτός λεκτικός λέξις λεξικός λεξικόν λόγος λεγόμενον λογεῖον (légein)</mark>, meaning "say".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with leg**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'say'.
  - Whenever you see **leg** in an English word, think immediately of **say**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">leg</mark>, think of <mark class="hl-def">say</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `leg-` (from *λέγειν λέγεσθαι λεκτός λεκτικός λέξις λεξικός λεξικόν λόγος λεγόμενον λογεῖον (légein)*).
> - **Combining Stem with -o- Connective:** `lego-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Leg
> - **1. Direct & Concrete Anchor:** Literal instantiation of say in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on leg

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `leg-` | [[alexia]] | Primary root semantic foundation denoting say. |
| **Connecting -o-** | `lego-` | [[alexithymia]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `leg` | [[apologetic]] | Relational or directional modification of the core root sense. |

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
| [[acatalectic]] | noun | **1.** (prosody) a line of verse that has the full number of syllables.<br>**2.** (verse) metrically complete; especially having the full number of syllables in the final metrical foot. | *"In academic literature, acatalectic designates (prosody) a line of verse that has the full number of syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alexia]] | noun | **1.** Aphasia marked by loss of ability to read. | *"In academic literature, alexia designates aphasia marked by loss of ability to read."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alexithymia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek leg.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, alexithymia designates a term designating an entity, condition, or phenomenon derived from greek leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogical]] | noun | **1.** Of, relating to, or based on analogy.<br>**2.** Expressing or implying analogy. | *"Though the certainty of this criterion is far from demonstrable, yet it has the savor of analogical probability."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[apologetic]] | noun | **1.** Feeling or showing regret : regretfully acknowledging fault or failure : expressing an apology.<br>**2.** Offered in defense or vindication. | *"The old woman was terribly apologetic about having gone into the room."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[apologia]] | noun | **1.** A defense especially of one's opinions, position, or actions.<br>**2.** Defense of one's life : a written justification for one's beliefs or course of conduct. | *"In academic literature, apologia designates a defense especially of one's opinions, position, or actions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apologise]] | verb | **1.** Defend, explain, clear away, or make excuses for by reasoning.<br>**2.** Acknowledge faults or shortcomings or failing. | *"Rochester; “and in the interim, I shall myself look out for employment and an asylum for you.” “Thank you, sir; I am sorry to give—” “Oh, no need to apologise!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[apologist]] | noun | **1.** Someone who speaks or writes in defense of someone or something that is typically controversial, unpopular, or subject to criticism. | *"He speaks of "the friendly Apollo." But the weakness of Plutarch as an apologist is his weakness as biographer--he never really gets at the bottom of anything."* — T. R. Glover, *The Jesus of History* |
| [[apologize]] | noun | **1.** To express regret for something done or said : to make an apology.<br>**2.** To offer a defense or excuse or admission of fault for (something)—used in negative statements. | *"The relations between us are of an unfortunate description, Lady Dedlock; but as they are not of my making, I will not apologize for them."* — Charles Dickens, *Bleak House* |
| [[apology]] | noun | **1.** An admission of error or discourtesy accompanied by an expression of regret.<br>**2.** An expression of regret for not being able to do something. | *"That you will take your instant leave o’ the king, And make this haste as your own good proceeding, Strengthen’d with what apology you think May make it probable need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[catalectic]] | noun | **1.** (prosody) a line of verse that lacks a syllable in the last metrical foot.<br>**2.** (verse) metrically incomplete; especially lacking one or more syllables in the final metrical foot. | *"A catalectic tetrameter of iambs marching."* — James Joyce, *Ulysses* |
| [[catalexis]] | noun | **1.** The absence of a syllable in the last foot of a line or verse. | *"In academic literature, catalexis designates the absence of a syllable in the last foot of a line or verse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delegate]] | noun | **1.** A person appointed or elected to represent others.<br>**2.** Transfer power to someone. | *"Then, there are wifely duties which you would not wish to delegate to any one else." "No, never!" she cried."* — Martha Finley, *Elsie's Kith and Kin* |
| [[delegation]] | noun | **1.** A group of representatives or delegates.<br>**2.** Authorizing subordinates to make certain decisions. | *"I was just breaking a last muffin and beginning to smile when I saw a delegation coming down the street and turning into my front gate; I rose to meet it with distinction."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[dialect]] | noun | **1.** A regional variety of language distinguished by features of vocabulary, grammar, and pronunciation from other regional varieties and constituting together with them a single language.<br>**2.** One of two or more cognate languages. | *"To go out of my dialect, which you discommend so much."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dialectal]] | adjective | **1.** Belonging to or characteristic of a dialect. | *"In academic literature, dialectal designates belonging to or characteristic of a dialect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialectic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of say. | *"At the same time he can use the Old Testament in an efficient way for dialectic, when an "argumentum ad hominem" best meets the case (Mark 7:6; Luke 20:37, 44)."* — T. R. Glover, *The Jesus of History* |
| [[dialectical]] | adjective | **1.** Of or relating to or employing dialectic. | *"Casaubon; digestion was made difficult by the interference of citations, or by the rivalry of dialectical phrases ringing against each other in his brain."* — George Eliot, *Middlemarch* |
| [[dialectically]] | adverb | **1.** In a dialectic manner. | *"So at Dodona the oak-god Zeus was coupled with Dione, whose very name is only a dialectically different form of Juno; and so on the top of Mount Cithaeron, as we have seen, he appears to have been periodically wedded to an oaken image of Hera."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[dialectician]] | noun | **1.** A logician skilled in dialectic. | *"This fixed idea of the rhapsodist was delivered with animated enthusiasm, in a manner entirely declamatory, for he had plainly no skill as a dialectician."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[dialectologist]] | noun | **1.** A specialist in dialectology. | *"In academic literature, dialectologist designates a specialist in dialectology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialectology]] | noun | **1.** The systematic study of dialect.<br>**2.** The body of data available for study of a dialect. | *"In academic literature, dialectology designates the systematic study of dialect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialog]] | noun | **1.** The conversational element of literary or dramatic composition (such as a movie, play, or novel).<br>**2.** A conversation between two or more persons; also : a similar exchange between a person and something else (such as a computer) —usually used before another noun. | *"In academic literature, dialog designates the conversational element of literary or dramatic composition (such as a movie, play, or novel)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dyslectic]] | noun | **1.** A person who has dyslexia.<br>**2.** Having impaired ability to comprehend written words usually associated with a neurologic disorder. | *"In academic literature, dyslectic designates a person who has dyslexia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dyslexia]] | noun | **1.** A variable often familial learning disability involving difficulties in acquiring and processing language that is typically manifested by a lack of proficiency in reading, spelling, and writing. | *"In academic literature, dyslexia designates a variable often familial learning disability involving difficulties in acquiring and processing language that is typically manifested by a lack of proficiency in reading, spelling, and writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dyslexic]] | noun | **1.** A variable often familial learning disability involving difficulties in acquiring and processing language that is typically manifested by a lack of proficiency in reading, spelling, and writing. | *"In academic literature, dyslexic designates a variable often familial learning disability involving difficulties in acquiring and processing language that is typically manifested by a lack of proficiency in reading, spelling, and writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dyslogia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek leg.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, dyslogia designates a term designating an entity, condition, or phenomenon derived from greek leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dyslogism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek leg.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, dyslogism designates a term designating an entity, condition, or phenomenon derived from greek leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ethnolect]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek leg.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, ethnolect designates a term designating an entity, condition, or phenomenon derived from greek leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterologic]] | adjective | **1.** Not corresponding in structure or evolutionary origin. | *"In academic literature, heterologic designates not corresponding in structure or evolutionary origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterological]] | adjective | **1.** Not corresponding in structure or evolutionary origin. | *"In academic literature, heterological designates not corresponding in structure or evolutionary origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homologic]] | adjective | **1.** Similar in evolutionary origin but not in function. | *"In academic literature, homologic designates similar in evolutionary origin but not in function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homological]] | adjective | **1.** Similar in evolutionary origin but not in function. | *"In academic literature, homological designates similar in evolutionary origin but not in function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercatalectic]] | noun | **1.** (prosody) a line of poetry having an extra syllable or syllables at the end of the last metrical foot.<br>**2.** (verse) having an extra syllable or syllables at the end of a metrically complete verse or in a metrical foot. | *"In academic literature, hypercatalectic designates (prosody) a line of poetry having an extra syllable or syllables at the end of the last metrical foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leg]] | noun | **1.** A limb of an animal used especially for supporting the body and for walking: such as.<br>**2.** One of the paired vertebrate limbs that in bipeds extend from the top of the thigh to the foot. | *"I would I were invisible, to catch the strong fellow by the leg. [_Orlando and Charles wrestle._] ROSALIND."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legal]] | adjective | **1.** Established by or founded upon law or official or accepted rules.<br>**2.** Of or relating to jurisprudence. | *"Was ever seen An emperor in Rome thus overborne, Troubled, confronted thus; and, for the extent Of legal justice, used in such contempt?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legalise]] | verb | **1.** Make legal. | *"The artist may of course, in wanton moods, dream of some Paradise (for art) where the direct appeal to the intelligence might be legalised; for to such extravagances as these his yearning mind can scarce hope ever completely to close itself."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[legalism]] | noun | **1.** Strict conformity to the letter of the law rather than its spirit. | *"In academic literature, legalism designates strict conformity to the letter of the law rather than its spirit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legality]] | noun | **1.** Lawfulness by virtue of conformity to a legal statute. | *"The Sanhedrim has not the right.” “Pilate is willing that it should take that right.” “But it is a fine question of legality,” I insisted."* — Jack London, *The Jacket (The Star-Rover)* |
| [[legalize]] | verb | **1.** Make legal. | *"It organized and tried to legalize a control of State elections by Federal troops."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[legally]] | adverb | **1.** By law; conforming to the law.<br>**2.** In a legal manner. | *"Tess would fain not have conversed with Marian of the man who was legally, if not actually, her husband; but the irresistible fascination of the subject betrayed her into reciprocating Marian’s remarks."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[legate]] | noun | **1.** A member of a legation. | *"Enter Winchester in Cardinal’s habit, a Legate and two Ambassadors."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legateship]] | noun | **1.** The post or office of legate. | *"In academic literature, legateship designates the post or office of legate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legation]] | noun | **1.** The post or office of legate.<br>**2.** A permanent diplomatic mission headed by a minister. | *"Shortly after this his older brother, Gansevoort Melville, sailed for England as secretary of legation to Ambassador McLane, and the manuscript was intrusted to Gansevoort for submission to John Murray."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[leger]] | noun | **1.** A record in which commercial accounts are recorded.<br>**2.** French painter who was an early cubist (1881-1955). | *"Leger, and the colloquy between the Rector and his wife ended."* — William Makepeace Thackeray, *Vanity Fair* |
| [[leggy]] | adjective | **1.** (of plants) having tall spindly stems.<br>**2.** Having long legs. | *"In academic literature, leggy designates (of plants) having tall spindly stems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legibility]] | noun | **1.** Distinctness that makes perception easy.<br>**2.** A quality of writing (print or handwriting) that can be easily read. | *"Guppy, going to the window, tumbles into a pair of love-birds, to whom he says in his confusion, “I beg your pardon, I am sure.” This does not tend to the greater legibility of his notes."* — Charles Dickens, *Bleak House* |
| [[legible]] | adjective | **1.** (of handwriting, print, etc.) capable of being read or deciphered. | *"The letter, with a direction hardly legible, to “Miss A."* — Jane Austen, *Persuasion* |
| [[leging]] | noun | **1.** A garment covering the leg (usually extending from the knee to the ankle). | *"In academic literature, leging designates a garment covering the leg (usually extending from the knee to the ankle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legomenon]] | noun | **1.** A word or form occurring only once in a document or corpus. | *"In academic literature, legomenon designates a word or form occurring only once in a document or corpus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexeme]] | noun | **1.** A meaningful linguistic unit that is an item in the vocabulary of a language. | *"In academic literature, lexeme designates a meaningful linguistic unit that is an item in the vocabulary of a language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexical]] | noun | **1.** Of or relating to words or the vocabulary of a language as distinguished from its grammar and construction.<br>**2.** Of or relating to a lexicon or to lexicography. | *"In academic literature, lexical designates of or relating to words or the vocabulary of a language as distinguished from its grammar and construction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicalise]] | verb | **1.** Make or coin into a word or accept a new word into the lexicon of a language. | *"In academic literature, lexicalise designates make or coin into a word or accept a new word into the lexicon of a language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicalize]] | verb | **1.** Make or coin into a word or accept a new word into the lexicon of a language. | *"In academic literature, lexicalize designates make or coin into a word or accept a new word into the lexicon of a language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexically]] | adverb | **1.** By means of words. | *"In academic literature, lexically designates by means of words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicographer]] | noun | **1.** A compiler or writer of a dictionary; a student of the lexical component of language. | *"In the principles of religion and morality, Miss Sedley will be found worthy of an establishment which has been honoured by the presence of THE GREAT LEXICOGRAPHER, and the patronage of the admirable Mrs."* — William Makepeace Thackeray, *Vanity Fair* |
| [[lexicographic]] | adjective | **1.** Of or relating to lexicography. | *"In academic literature, lexicographic designates of or relating to lexicography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicographical]] | adjective | **1.** Of or relating to lexicography. | *"In academic literature, lexicographical designates of or relating to lexicography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicography]] | noun | **1.** The editing or making of a dictionary.<br>**2.** The principles and practices of dictionary making. | *"In academic literature, lexicography designates the editing or making of a dictionary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicologist]] | noun | **1.** A compiler or writer of a dictionary; a student of the lexical component of language. | *"In academic literature, lexicologist designates a compiler or writer of a dictionary; a student of the lexical component of language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicology]] | noun | **1.** A branch of linguistics concerned with the signification and application of words. | *"In academic literature, lexicology designates a branch of linguistics concerned with the signification and application of words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexicon]] | noun | **1.** A book containing an alphabetical arrangement of the words in a language and their definitions : dictionary.<br>**2.** The vocabulary of a language, an individual speaker or group of speakers, or a subject. | *"He had compiled a Greek Lexicon which had some repute in its day, but he was not an inspiring teacher, and his gruff manners made him far from popular."* — John Cairns, *Principal Cairns* |
| [[lexigram]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek leg.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, lexigram designates a term designating an entity, condition, or phenomenon derived from greek leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lexis]] | noun | **1.** lexicon. | *"Classical and authoritative lexicons catalog lexis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logic]] | noun | **1.** A science that deals with the principles and criteria of validity of inference and demonstration : the science of the formal principles of reasoning.<br>**2.** A branch or variety of logic. | *"How now, how now, chopp’d logic?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logical]] | adjective | **1.** Capable of or reflecting the capability for correct and valid reasoning.<br>**2.** Based on known statements or events or conditions. | *"Within the remote depths of his constitution, so gentle and affectionate as he was in general, there lay hidden a hard logical deposit, like a vein of metal in a soft loam, which turned the edge of everything that attempted to traverse it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[logicality]] | noun | **1.** Correct and valid reasoning. | *"In academic literature, logicality designates correct and valid reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logically]] | adverb | **1.** According to logical reasoning.<br>**2.** In a logical manner. | *"But money and private property are not essentially and logically bound up together, for a certain measure of private property always has been found where money was little or not at all used."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[logicalness]] | noun | **1.** Correct and valid reasoning. | *"In academic literature, logicalness designates correct and valid reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logician]] | noun | **1.** A person skilled at symbolic logic. | *"Mill's achievements as an economist, logician, psychologist, and politician are known more or less vaguely to all educated men; but his capacity and his actual work as a critic are comparatively little regarded."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[logicism]] | noun | **1.** (philosophy) the philosophical theory that all of mathematics can be derived from formal logic. | *"In academic literature, logicism designates (philosophy) the philosophical theory that all of mathematics can be derived from formal logic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logion]] | noun | **1.** Saying; especially : a saying attributed to Jesus. | *"In academic literature, logion designates saying; especially : a saying attributed to jesus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logistician]] | noun | **1.** A person skilled at symbolic logic. | *"I can give you a quick rundown on each now, if you wish." "I do." "Myra is a logistician and a Medic certified to Level 4 in space-related trauma, physical and psychological."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[logos]] | noun | **1.** The divine wisdom manifest in the creation, government, and redemption of the world and often identified with the second person of the Trinity.<br>**2.** Reason that in ancient Greek philosophy is the controlling principle in the universe. | *"To explain Jesus, his friends and contemporaries spoke of him as the Logos, the Sacrifice, "Christ our Passover," the Messiah, and so forth."* — T. R. Glover, *The Jesus of History* |
| [[paralegal]] | noun | **1.** A person with specialized training who assists lawyers. | *"In academic literature, paralegal designates a person with specialized training who assists lawyers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolegomenon]] | noun | **1.** Prefatory remarks; specifically : a formal essay or critical discussion serving to introduce and interpret an extended work. | *"In academic literature, prolegomenon designates prefatory remarks; specifically : a formal essay or critical discussion serving to introduce and interpret an extended work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relegate]] | verb | **1.** Refer to another person for decision or judgment.<br>**2.** Assign to a lower position; reduce in rank. | *"Whatever promises the nation makes, the nation must perform; and the nation can not with safety relegate this duty to the states."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[relegation]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** The act of assigning (someone or something) to a particular class or category. | *"He objected to the dissociation of school and home life--to that relegation of domestic interests and duties to the background, which large and highly-organized schools, and teachers much above the home level, must necessarily involve."* — F. W. H. Myers, *Wordsworth* |
| [[unapologetic]] | adjective | **1.** Unwilling to make or express an apology. | *"In academic literature, unapologetic designates unwilling to make or express an apology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlogical]] | adjective | **1.** Lacking in correct logical relation. | *"In academic literature, unlogical designates lacking in correct logical relation."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & Physiology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LEG
  </div>
</div>
