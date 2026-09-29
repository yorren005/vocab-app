---
status: unread
type: root_dashboard
---
# Dashboard — verb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">verb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“word”</span>
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

The root **verb** means word. It refers to a unit of language carrying meaning in speech or writing. In English, this root forms words such as *verbal*, *verbatim*, *adverb*, and *proverb*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: word
> The root **verb** means word. It refers to a unit of language carrying meaning in speech or writing. In English, this root forms words such as *verbal*, *verbatim*, *adverb*, and *proverb*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Word</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *verbal* and *verbatim*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **verb** comes from a Latin word that means *"word"*.
  - At its core, it describes word.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **verb** in an English word, think of **talking, discussing, and communication**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of word.
  - **Mental & Social**: How people experience, organize, or communicate about word.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Verbal**: Relating to or in the form of words. 2. Spoken rather than written.
  - **Verbatim**: In exactly the same words as were used originally.
  - **Adverb**: A word or phrase that modifies or qualifies an adjective, verb, or other adverb.
  - **Proverb**: A short, pithy saying in general use, stating a general truth or piece of advice.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">verb</mark>, think of <mark class="hl-def">talking, discussing, and communication</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **verb** operates through three main morphological avenues:
- **Base Lexical & Grammatical Stems (`verb-` < *verbum*)**:
  - *verbum* $\to$ **verb**, **verbal**, **verbally**, **verbalize**, **verbalization**.
  - *ad-* + *verbum* $\to$ *adverbium* $\to$ **adverb**, **adverbial**.
  - *pro-* + *verbum* $\to$ *prōverbium* $\to$ **proverb**, **proverbial**, **proverbially**.
  - *verbum* + *-ōsus* $\to$ *verbōsus* $\to$ **verbose**, **verbosity**.
  - *verbum* + *-ātim* $\to$ **verbatim**.
  - *verbiage* (via French < *verbum*).
- **Acoustic Striking & Echo Stem (`reverber-` < *verberāre*)**:
  - *re-* + *verberāre* $\to$ **reverberate**, **reverberation**, **reverb**, **reverberant**.

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

The derivatives of **verb** organize into four core domains:
- **Grammar & Linguistic Action**: *verb* (word expressing action, occurrence, or state), *adverb* (word qualifying a verb, adjective, or clause), *verbal* (relating to words; spoken rather than written).
- **Literal Fidelity & Oral Communication**: *verbatim* (in exactly the same words as were used originally), *verbalize* (express ideas in words).
- **Wordiness, Rhetorical Style & Prolixity**: *verbose* (using or expressed in more words than are needed), *verbosity*, *verbiage* (speech or writing that uses too many words).
- **Traditional Folk Wisdom**: *proverb* (short, pithy saying stating a general truth), *proverbial* (referred to in a proverb; widely known).
- **Acoustic Resonance & Social Repercussions**: *reverberate* (echo through an enclosed space; produce prolonged effects), *reverberation*, *reverb*.

---

## 🔀 4. Prefix & Combining Dynamics on verb

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to, near") | `ad-` + *verbum* | Added to the verb $\to$ grammatical modifier of actions | *adverb, adverbial* |
| **`pro-`** ("forth, before") | `pro-` + *verbum* | Spoken forth as common wisdom $\to$ folk adage, maxim | *proverb, proverbial, proverbially* |
| **`-ātim`** (adverbial) | `verbum` + `-ātim` | Word by word $\to$ precisely quoted, exact transcription | *verbatim* |
| **`-ōsus`** ("full of") | `verbum` + `-ōsus` | Full of words $\to$ tedious prolixity, excessively wordy | *verbose, verbosity* |
| **`re-`** + `verberāre` | `re-` + *verberāre* | Strike back against a wall $\to$ acoustic echo, prolonged shock | *reverberate, reverberation, reverb* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Theoretical & Descriptive Linguistics**: Morphosyntax, parts of speech, and argument structure (*verb*, *adverb*, *verbal phrase*).
- **Jurisprudence & Legal Drafting**: Strict statutory interpretation and witness testimony (*verbatim transcript*).
- **Audio Engineering & Music Production**: Convolution reverb, acoustic room acoustics, and echo chambers (*reverb*, *reverberation*).
- **Anthropology & Paremiology**: The cross-cultural study of folk proverbs and cultural maxims (*proverb*, *proverbial wisdom*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adverb]] | noun | **1.** The word class that qualifies verbs or clauses.<br>**2.** A word that modifies something other than a noun. | *"Still less does he use an adverb from the abstract, like "providentially." He says, "your heavenly Father." He does not talk of "humanity"; he says, "your brethren." He has no jargon, no technical terms, no scholastic vocabulary."* — T. R. Glover, *The Jesus of History* |
| [[adverbial]] | noun | **1.** A word or group of words function as an adverb.<br>**2.** Of or relating to or functioning as an adverb. | *"Why, it is just like being the past tense of the compound reflexive adverbial incandescent hypodermic irregular accusative Noun of Multitude; which is father to the expression which the grammarians call Verb."* — Mark Twain, *What Is Man? and Other Essays* |
| [[adverbially]] | adverb | **1.** As an adverb. | *"In academic literature, adverbially designates as an adverb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonverbal]] | adjective | **1.** Being other than verbal communication.<br>**2.** Lacking verbal skill. | *"In academic literature, nonverbal designates being other than verbal communication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonverbally]] | adverb | **1.** Without words. | *"In academic literature, nonverbally designates without words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proverb]] | noun | **1.** A condensed but memorable saying embodying some important fact of experience that is taken as true by many people. | *"O Lord, I must laugh; Have at you with a proverb:—Shall I set in my staff?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proverbial]] | adjective | **1.** Of or relating to or resembling or expressed in a proverb.<br>**2.** Widely known and spoken of. | *"The listener’s proverbial fate was not absolutely hers; she had heard no evil of herself, but she had heard a great deal of very painful import."* — Jane Austen, *Persuasion* |
| [[proverbially]] | adverb | **1.** In the manner of something that has become a byword. | *"Rural communities are proverbially conservative; the American farmer is proverbially an individualist."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[proverbs]] | noun | **1.** An old testament book consisting of proverbs from various israeli sages (including solomon).<br>**2.** A condensed but memorable saying embodying some important fact of experience that is taken as true by many people. | *"They said they were an-hungry, sighed forth proverbs That hunger broke stone walls, that dogs must eat, That meat was made for mouths, that the gods sent not Corn for the rich men only."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverb]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin verb within the domain of Speech & Communication.<br>**2.** A technical or specialized form exhibiting the properties of verb in systematic terminology. | *"Reverse thy state; And in thy best consideration check This hideous rashness: answer my life my judgement, Thy youngest daughter does not love thee least; Nor are those empty-hearted, whose low sounds Reverb no hollowness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverberance]] | noun | **1.** Having the character of a loud deep sound; the quality of being resonant. | *"In academic literature, reverberance designates having the character of a loud deep sound; the quality of being resonant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reverberant]] | adjective | **1.** Having a tendency to reverberate or be repeatedly reflected. | *"In academic literature, reverberant designates having a tendency to reverberate or be repeatedly reflected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reverberate]] | verb | **1.** Ring or echo with sound.<br>**2.** Have a long or continuing effect. | *"Do but start And echo with the clamour of thy drum, And even at hand a drum is ready brac’d That shall reverberate all as loud as thine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverberating]] | verb | **1.** Ring or echo with sound.<br>**2.** Have a long or continuing effect. | *"At the end of the passage, while the bell was still reverberating, I found Sarah Pocket, who appeared to have now become constitutionally green and yellow by reason of me."* — Charles Dickens, *Great Expectations* |
| [[reverberation]] | noun | **1.** The repetition of a sound resulting from reflection of the sound waves.<br>**2.** A remote or indirect consequence of some action. | *"Just before dawn he was assisted in waking by the abnormal reverberation of familiar music."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[reverberative]] | adjective | **1.** Characterized by resonance. | *"In academic literature, reverberative designates characterized by resonance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreverberant]] | adjective | **1.** Not reverberant; lacking a tendency to reverberate. | *"In academic literature, unreverberant designates not reverberant; lacking a tendency to reverberate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unverbalised]] | adjective | **1.** Not made explicit. | *"In academic literature, unverbalised designates not made explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unverbalized]] | adjective | **1.** Not made explicit. | *"In academic literature, unverbalized designates not made explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verb]] | noun | **1.** The word class that serves as the predicate of a sentence.<br>**2.** A content word that denotes an action, occurrence, or state of existence. | *"It will be proved to thy face that thou hast men about thee that usually talk of a noun and a verb, and such abominable words as no Christian ear can endure to hear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verbal]] | adjective | **1.** Communicated in the form of words.<br>**2.** Of or relating to or formed from words in general. | *"Snagsby, we’re ready for you.” First, Jo has to complete his errand of good nature by handing over the physic he has been to get, which he delivers with the laconic verbal direction that “it’s to be all took d’rectly.” Secondly, Mr."* — Charles Dickens, *Bleak House* |
| [[verbalisation]] | noun | **1.** The words that are spoken in the activity of verbalization.<br>**2.** The activity of expressing something in words. | *"In academic literature, verbalisation designates the words that are spoken in the activity of verbalization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalise]] | verb | **1.** Be verbose.<br>**2.** Express in speech. | *"In academic literature, verbalise designates be verbose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalised]] | verb | **1.** Be verbose.<br>**2.** Express in speech. | *"In academic literature, verbalised designates be verbose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbaliser]] | noun | **1.** Someone who expresses in language; someone who talks (especially someone who delivers a public speech or someone especially garrulous). | *"In academic literature, verbaliser designates someone who expresses in language; someone who talks (especially someone who delivers a public speech or someone especially garrulous)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalism]] | noun | **1.** The communication (in speech or writing) of your beliefs or opinions.<br>**2.** Overabundance of words. | *"In academic literature, verbalism designates the communication (in speech or writing) of your beliefs or opinions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalization]] | noun | **1.** The words that are spoken in the activity of verbalization.<br>**2.** The activity of expressing something in words. | *"In academic literature, verbalization designates the words that are spoken in the activity of verbalization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalize]] | verb | **1.** Be verbose.<br>**2.** Express in speech. | *"In academic literature, verbalize designates be verbose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalized]] | verb | **1.** Be verbose.<br>**2.** Express in speech. | *"In academic literature, verbalized designates be verbose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbalizer]] | noun | **1.** Someone who expresses in language; someone who talks (especially someone who delivers a public speech or someone especially garrulous). | *"In academic literature, verbalizer designates someone who expresses in language; someone who talks (especially someone who delivers a public speech or someone especially garrulous)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbally]] | adverb | **1.** As a verb.<br>**2.** By means of language. | *"Chadband’s being much given to describe himself, both verbally and in writing, as a vessel, he is occasionally mistaken by strangers for a gentleman connected with navigation, but he is, as he expresses it, “in the ministry.” Mr."* — Charles Dickens, *Bleak House* |
| [[verbascum]] | noun | **1.** Genus of coarse herbs and subshrubs mostly with woolly leaves. | *"Shepherdesses and children passed sprigs of mullein (_verbascum_) and nuts across the flames; the nuts were supposed to cure toothache, and the mullein to protect the cattle from sickness and sorcery."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[verbatim]] | adjective | **1.** In precisely the same words used by a writer or speaker.<br>**2.** Using exactly the same words. | *"Think not, although in writing I preferr’d The manner of thy vile outrageous crimes, That therefore I have forged, or am not able Verbatim to rehearse the method of my pen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verbena]] | noun | **1.** Any of numerous tropical or subtropical american plants of the genus verbena grown for their showy spikes of variously colored flowers. | *"In academic literature, verbena designates any of numerous tropical or subtropical american plants of the genus verbena grown for their showy spikes of variously colored flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbenaceae]] | noun | **1.** Family of new world tropical and subtropical herbs and shrubs and trees. | *"In academic literature, verbenaceae designates family of new world tropical and subtropical herbs and shrubs and trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbesina]] | noun | **1.** Herbs and shrubs of warm north america to mexico; includes plants formerly placed in genus actinomeris. | *"In academic literature, verbesina designates herbs and shrubs of warm north america to mexico; includes plants formerly placed in genus actinomeris."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbiage]] | noun | **1.** Overabundance of words.<br>**2.** The manner in which something is expressed in words; - g.s.patton. | *"In academic literature, verbiage designates overabundance of words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbify]] | verb | **1.** Make into a verb. | *"In academic literature, verbify designates make into a verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbolatry]] | noun | **1.** The worship of words. | *"In academic literature, verbolatry designates the worship of words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbose]] | adjective | **1.** Using or containing too many words. | *"Chadband’s piling verbose flights of stairs, one upon another, after this fashion."* — Charles Dickens, *Bleak House* |
| [[verbosely]] | adverb | **1.** In a verbose manner. | *"These offences were verbosely described in a long indictment which had originally included the fourth man who had been captured, but against whom the grand jury had refused to find a true bill."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[verboseness]] | noun | **1.** An expressive style that uses excessive or empty words. | *"In academic literature, verboseness designates an expressive style that uses excessive or empty words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verbosity]] | noun | **1.** An expressive style that uses excessive or empty words. | *"He draweth out the thread of his verbosity finer than the staple of his argument."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verboten]] | adjective | **1.** Excluded from use or mention. | *"In academic literature, verboten designates excluded from use or mention."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VERB
  </div>
</div>
