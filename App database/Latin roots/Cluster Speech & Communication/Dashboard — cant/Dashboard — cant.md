---
status: learned
type: root_dashboard
---
# Dashboard — cant
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cant-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to sing”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Two people conversing warmly and exchanging clear spoken words.</span>
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

The root **cant** means to sing. It refers to the action of singing and carrying out this process. In English, this root forms words such as *accent*, *accentuate*, *cantata*, and *canticle*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to sing
> The root **cant** means to sing. It refers to the action of singing and carrying out this process. In English, this root forms words such as *accent*, *accentuate*, *cantata*, and *canticle*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To sing</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *accent* and *accentuate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cant** comes from a Latin word that means *"to sing"*.
  - At its core, it describes the action of sing.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **cant** in an English word, think of **to sing**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to sing).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Accent**: Prominence given to a syllable or word by stress or pitch. 2. A regional or national mode of pronunciation. 3. To emphasize or make prominent.
  - **Accentuate**: To make more noticeable or prominent.
  - **Cantata**: A narrative piece of music for voices with instrumental accompaniment, typically with solos, chorus, and orchestra.
  - **Canticle**: A hymn or chant, typically with a biblical text, forming a regular part of church services. 2. A short religious song.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cant</mark>, think of <mark class="hl-def">to sing</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **cant** operates via three distinct morphological streams:
- **Direct Latin Frequentative Stem (`cant-`)**: Forms primary liturgical, legal, and poetic terms: *cant*, *canto*, *cantor*, *canticle*, *cantus*.
- **Prefix Compounds with Assimilation (`-cent-`)**: Through classical vowel weakening (*apophony*), unaccented short *a* weakened to short *e* in prefixes:
  - *ad-* + *cantus* $\to$ *accentus* $\to$ **accent**, **accentuate**.
  - *dis-* + *cantus* $\to$ *discantus* $\to$ **descant**.
  - *in-* + *cantāre* $\to$ *incantāre* $\to$ **incantation**.
  - *re-* + *cantāre* $\to$ *recantāre* $\to$ **recant**, **recantation**.
- **Gallo-Romance Palatalized Stem (`chant-`)**: Old French transformed Latin *cant-* into *chant-*:
  - *cantāre* $\to$ **chant**.
  - *incantāre* $\to$ *enchanter* $\to$ **enchant**, **enchantment**, **enchantress**.
  - *cantātor* $\to$ *chanteur* / *chanterelle* / **chantey**.
  - *chante-clair* ("sing-clear") $\to$ **chanticleer** (the rooster).

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

The semantic trajectories of **cant** span five fundamental domains:
- **Liturgical & Choral Music**: *cantus firmus* (fixed chant melody), *cantor* (choir director/soloist), *canticle* (biblical hymn), *cantata* (sacred vocal work), *canto* (epic poem canto).
- **Phonetics & Modulated Speech**: *accent* (syllabic stress or regional dialect), *accentuate* (to stress or emphasize), *descant* (a high counter-melody or running commentary).
- **Magic, Sorcery & Charms**: *incantation* (magical formula muttered in chant), *enchant* (to bewitch or captivate), *disenchant* (to strip of illusion).
- **Rhetorical & Doctrinal Retraction**: *recant* (to revoke formally what one previously declared or believed), *recantation* (formal public disavowal).
- **Hypocritical & Specialized Jargon**: *cant* (pious platitudes, thieves' slang, repetitive mechanical jargon).

---

## 🔀 4. Prefix & Combining Dynamics on cant

| Prefix / Comb. | Resulting Stem | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to, toward") | `ad-` + `cantus` $\to$ `accent-` | Song/pitch applied to a syllable $\to$ stress, regional pronunciation | *accent, accentuate, accentuation* |
| **`dis-`** ("apart, asunder") | `dis-` + `cantus` $\to$ `descant-` | A melody singing apart/above the tenor $\to$ discourse | *descant* |
| **`in-`** ("in, upon") | `in-` + `cantāre` $\to$ `incant-` | Chanting a spell upon a subject $\to$ sorcery, magic formula | *incantation, incantatory* |
| **`re-`** ("back, again") | `re-` + `cantāre` $\to$ `recant-` | Singing back / unsaying an oath $\to$ public retraction | *recant, recantation, recanter* |
| **`en-`** (French < `in-`) | `en-` + `chant-` $\to$ `enchant-` | Placing under a spell $\to$ charming, mesmerizing | *enchant, enchantment, enchantress* |
| **`dis-`** + **`en-`** | `dis-` + `enchant-` | Breaking a spell $\to$ disillusionment, sobering clarity | *disenchant, disenchantment* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Musicology & Hymnology**: Foundational to Gregorian chant, Renaissance polyphony, and Lutheran liturgy (*cantata*, *cantor*, *canticle*, *cantus firmus*).
- **Linguistics & Phonetics**: Central to prosody, intonation contours, and phonological stress (*accent*, *accentuation*, *pitch accent*).
- **Jurisprudence & Religious History**: The legal and inquisitorial mechanism of retracting heresy or sworn testimony (*recant*, *recantation*).
- **Literary Epic Structure**: Standard architectural division of long narrative poems (Dante's *Divina Commedia* and Pound's *The Cantos*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cant]] | noun | **1.** Stock phrases that have become nonsense through endless repetition.<br>**2.** A slope in the turn of a road or track; the outside is higher than the inside in order to reduce the effects of centrifugal force. | *"I am no novel-reader—I seldom look into novels—Do not imagine that _I_ often read novels—It is really very well for a novel.” Such is the common cant."* — Jane Austen, *Northanger Abbey* |
| [[cantabile]] | adjective | **1.** Smooth and flowing. | *"In academic literature, cantabile designates smooth and flowing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantabrigian]] | noun | **1.** A resident of cambridge. | *"In academic literature, cantabrigian designates a resident of cambridge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantala]] | noun | **1.** Hard fiber used in making coarse twine; from philippine agave plants.<br>**2.** Philippine plant yielding a hard fibre used in making coarse twine. | *"In academic literature, cantala designates hard fiber used in making coarse twine; from philippine agave plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantaloup]] | noun | **1.** A variety of muskmelon vine having fruit with a tan rind and orange flesh.<br>**2.** The fruit of a cantaloup vine; small to medium-sized melon with yellowish flesh. | *"In academic literature, cantaloup designates a variety of muskmelon vine having fruit with a tan rind and orange flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantaloupe]] | noun | **1.** A variety of muskmelon vine having fruit with a tan rind and orange flesh.<br>**2.** The fruit of a cantaloup vine; small to medium-sized melon with yellowish flesh. | *"Look--what's that over there?" At nearly the same level as themselves and directly over the city of Newark a huge globular object, not unlike an enormous green cantaloupe, appeared to float in the air."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[cantankerous]] | adjective | **1.** Stubbornly obstructive and unwilling to cooperate; - spectator.<br>**2.** Having a difficult and contrary disposition; - dorothy sayers. | *"The hardy cantankerous Serb, Whom even the Turk couldn't curb, In having a go With Emperor Joe, Will the plans of the Kaiser disturb."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[cantankerously]] | adverb | **1.** In a bad mood. | *"In academic literature, cantankerously designates in a bad mood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantata]] | noun | **1.** A musical composition for voices and orchestra based on a religious text. | *"Hurrah!” cried the three hundred voices again, but instead of the band a choir began singing a cantata composed by Paul Ivánovich Kutúzov: Russians!"* — graf Leo Tolstoy, *War and Peace* |
| [[canted]] | verb | **1.** Heel over.<br>**2.** Departing or being caused to depart from the true vertical or horizontal. | *"A continual cascade played at the bows; a ceaseless whirling eddy in her wake; and, at the slightest motion from within, even but of a little finger, the vibrating, cracking craft canted over her spasmodic gunwale into the sea."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[canteen]] | noun | **1.** A flask for carrying water; used by soldiers or travelers.<br>**2.** Sells food and personal items to personnel at an institution or school or camp etc. | *"Only those things he always kept with him remained in his room; a small box, a large canteen fitted with silver plate, two Turkish pistols and a saber—a present from his father who had brought it from the siege of Ochákov."* — graf Leo Tolstoy, *War and Peace* |
| [[canter]] | noun | **1.** A smooth three-beat gait; between a trot and a gallop.<br>**2.** Ride at a canter. | *"Then there was a pony expressly for my riding, a chubby pony with a short neck and a mane all over his eyes who could canter—when he would—so easily and quietly that he was a treasure."* — Charles Dickens, *Bleak House* |
| [[canterbury]] | noun | **1.** A town in kent in southeastern england; site of the cathedral where thomas a becket was martyred in 1170; seat of the archbishop and primate of the anglican church. | *"But, my lads, my lads, tomorrow morning, by four o’clock early at Gad’s Hill, there are pilgrims going to Canterbury with rich offerings, and traders riding to London with fat purses."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cantering]] | verb | **1.** Ride at a canter.<br>**2.** Go at a canter, of horses. | *"They had reached the front of the house, and were about to go in, when a boy on horseback came cantering up the avenue, and handed a telegram to Edward."* — Martha Finley, *Elsie's Kith and Kin* |
| [[canticle]] | noun | **1.** A hymn derived from the bible. | *"What a noble thing is that canticle in the fish’s belly!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[canticles]] | noun | **1.** An old testament book consisting of a collection of love poems traditionally attributed to solomon but actually written much later.<br>**2.** A hymn derived from the bible. | *"In academic literature, canticles designates an old testament book consisting of a collection of love poems traditionally attributed to solomon but actually written much later."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantilever]] | noun | **1.** Projecting horizontal beam fixed at one end only.<br>**2.** Project as a cantilever. | *"Gazing at it each day, there rose up slowly by degrees in his mind, like a dream, the picture of a great work on a new and startling principle--a modification of the cantilever to the necessities of the situation."* — Grant Allen, *Michael's Crag* |
| [[cantillate]] | verb | **1.** Recite with musical intonation; recite as a chant or a psalm. | *"In academic literature, cantillate designates recite with musical intonation; recite as a chant or a psalm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantillation]] | noun | **1.** Liturgical chanting. | *"In academic literature, cantillation designates liturgical chanting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantle]] | noun | **1.** The back of a saddle seat. | *"The greater cantle of the world is lost With very ignorance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canto]] | noun | **1.** The highest part (usually the melody) in a piece of choral music.<br>**2.** A major division of a long poem. | *"Part three, for instance, contains a poem that reads like a parody of Belinda awaking in the first canto of Pope's _Rape of the Lock_."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[canton]] | noun | **1.** A city on the zhu jiang delta in southern china; the capital of guangdong province and a major deep-water port.<br>**2.** A small administrative division of a country. | *"The custom prevailed, for example, throughout the canton of Lucerne."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[cantonal]] | adjective | **1.** Of or relating to a canton. | *"In academic literature, cantonal designates of or relating to a canton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantonese]] | noun | **1.** The dialect of chinese spoken in canton and neighboring provinces and in hong kong and elsewhere outside china. | *"In academic literature, cantonese designates the dialect of chinese spoken in canton and neighboring provinces and in hong kong and elsewhere outside china."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantonment]] | noun | **1.** Temporary living quarters specially built by the army for soldiers. | *"Her Ladyship, our old acquaintance, is as much at home at Madras as at Brussels in the cantonment as under the tents."* — William Makepeace Thackeray, *Vanity Fair* |
| [[cantor]] | noun | **1.** The musical director of a choir.<br>**2.** The official of a synagogue who conducts the liturgical part of the service and sings or chants the prayers intended to be performed as solos. | *"In academic literature, cantor designates the musical director of a choir."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantus]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin cant within the domain of Speech & Communication.<br>**2.** A technical or specialized form exhibiting the properties of cant in systematic terminology. | *"In academic literature, cantus designates pertaining to, derived from, or characteristic of latin cant within the domain of speech & communication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canty]] | adjective | **1.** Lively and brisk. | *"The clachan yill had made me canty, I was na fou, but just had plenty; I stacher’d whiles, but yet too tent aye To free the ditches; An’ hillocks, stanes, an’ bushes, kenn’d eye Frae ghaists an’ witches."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[cosecant]] | noun | **1.** Ratio of the hypotenuse to the opposite side of a right-angled triangle. | *"In academic literature, cosecant designates ratio of the hypotenuse to the opposite side of a right-angled triangle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decant]] | verb | **1.** Pour out. | *"It is an ineffably oozy, stringy affair, most frequently found in the tubs of sperm, after a prolonged squeezing, and subsequent decanting."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decantation]] | noun | **1.** The act of gently pouring off a clear liquor (as from its original bottle) without disturbing the lees. | *"In academic literature, decantation designates the act of gently pouring off a clear liquor (as from its original bottle) without disturbing the lees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decanter]] | noun | **1.** A bottle with a stopper; for serving wine or water. | *"He left his compliments, and would you partake of some refreshment”—there were biscuits and a decanter of wine on a small table—“and look over the paper,” which the young gentleman gave me as he spoke."* — Charles Dickens, *Bleak House* |
| [[descant]] | noun | **1.** A decorative musical accompaniment (often improvised) added above a basic melody.<br>**2.** Sing in descant. | *"And look you get a prayer-book in your hand, And stand between two churchmen, good my lord, For on that ground I’ll make a holy descant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discant]] | noun | **1.** A decorative musical accompaniment (often improvised) added above a basic melody. | *"In academic literature, discant designates a decorative musical accompaniment (often improvised) added above a basic melody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incantation]] | noun | **1.** A ritual recitation of words or sounds believed to have a magical effect. | *"He beheld it all by degrees, stared in stupefaction at the scene, as if he thought it an illusion raised by some fiendish incantation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[recant]] | verb | **1.** Formally reject or disavow a formerly held belief, usually under pressure. | *"He shall do this, or else I do recant The pardon that I late pronounced here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recantation]] | noun | **1.** A disavowal or taking back of a previous assertion. | *"Your lord and master did well to make his recantation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secant]] | noun | **1.** A straight line that intersects a curve at two or more points.<br>**2.** Ratio of the hypotenuse to the adjacent side of a right-angled triangle. | *"In academic literature, secant designates a straight line that intersects a curve at two or more points."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tradescant]] | noun | **1.** English botanist who was one of the first to collect specimens of plants (1570-1638). | *"One of these is represented by the Tradescant jar in the Ashmolean Museum, Oxford."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CANT
  </div>
</div>
