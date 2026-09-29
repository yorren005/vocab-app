---
status: unread
type: root_dashboard
---
# Dashboard — punct
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">punct-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“point or prick”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sturdy wooden framework supporting the roof of a house.</span>
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

The root **punct** means point or prick. It refers to a sharp prick, tiny dot, or precise point. In English, this root forms words such as *punctual*, *puncture*, *punctuation*, and *acupuncture*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: point or prick
> The root **punct** means point or prick. It refers to a sharp prick, tiny dot, or precise point. In English, this root forms words such as *punctual*, *puncture*, *punctuation*, and *acupuncture*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Point or prick</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *punctual* and *puncture*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **punct** comes from a Latin word that means *"point or prick"*.
  - At its core, it describes point or prick.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **punct** in an English word, think of **underlying structure and framework**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of point or prick.
  - **Mental & Social**: How people experience, organize, or communicate about point or prick.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Punctual**: Happening or doing something at the agreed or proper time.
  - **Puncture**: A small hole in something, especially in a tire, caused by a sharp object. 2. Make a small hole in something.
  - **Punctuation**: The marks, such as period, comma, and parentheses, used in writing to separate sentences and clarify meaning.
  - **Acupuncture**: A system of complementary medicine in which fine needles are inserted in the skin at specific points. 2. Treat with acupuncture.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">punct</mark>, think of <mark class="hl-def">underlying structure and framework</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **punct** operates through three morphological channels:
- **Direct Latin Participial Stem (`punct-` < *punctum*)**:
  - *punctum* $\to$ **punctuate**, **punctuation**, **puncture**, **punctual**, **punctuality**, **punctilious**.
  - *acu-* ("needle") + *punctūra* $\to$ **acupuncture**.
  - *com-* + *punctiō* $\to$ **compunction**.
- **The Present Verbal & Nasal Stem (`pung-` < *pungere*)**:
  - *pungēns* $\to$ **pungent**, **pungency**.
  - *ex-* + *pungere* $\to$ **expunge**.
- **Old French & Vernacular Stems (`point-` / `punch-` / `poign-`)**:
  - *punctum* via French $\to$ **point**, **appoint**, **appointment**.
  - *poindre* $\to$ **poignant**, **poignancy**.
  - *poinson* $\to$ **punch**, **pounce**.

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

The derivatives of **punct** span five rich conceptual arenas:
- **Geometry, Coordinates & Time**: *point* (a dot or exact position), *punctual* (happening or doing something at the agreed or proper time; on the dot), *punctuality*.
- **Textual Editing & Writing**: *punctuate* (insert punctuation marks in; interrupt at intervals), *punctuation*, *expunge* (erase or remove completely, originally by pricking out).
- **Physical Piercing & Medicine**: *puncture* (a small hole in a tire or flesh caused by a piercing object), *acupuncture* (traditional Chinese medical treatment using fine needles).
- **Sensory Sharpness & Emotional Remorse**: *pungent* (having a sharply strong taste or smell; sharp and biting in tone), *poignant* (evoking a keen sense of sadness or regret; sharp), *compunction* (a feeling of guilt or moral scruple).
- **Social Etiquette & Precision**: *punctilious* (showing great attention to detail or correct behavior; meticulous about every fine point).

---

## 🔀 4. Prefix & Combining Dynamics on punct

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`acu-`** ("needle") | `acus` + `punctūra` | Piercing with fine needles $\to$ therapeutic medical insertion | *acupuncture* |
| **`com-`** ("with, intensely") | `com-` + *pungere* | Stung intensely by guilt $\to$ prick of conscience, remorse | *compunction* |
| **`ex-`** ("out") | `ex-` + *pungere* | Prick out a name from a list $\to$ delete, erase, blot out | *expunge* |
| **`ad-`** ("to") | `ad-` + *punctum* $\to$ *appointer* | Direct to a specific point/office $\to$ assign, designate | *appoint, appointment* |
| **`-ous`** (adjectival) | `punctum` + `-ilious` | Obsessed with every tiny point of etiquette $\to$ meticulous | *punctilious* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Classical Orthography & Typography**: Grammatical periods, semicolons, and commas (*punctuation marks*).
- **Medicine & Integrative Therapeutics**: Needling of myofascial trigger points (*acupuncture*, *venipuncture*).
- **Culinary Arts & Chemistry**: Volatile organic sulfur compounds in alliums and spices (*pungent aroma*, *pungency*).
- **Jurisprudence & Record Sealing**: The legal expungement of criminal records (*expungement*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acupuncture]] | noun | **1.** Treatment of pain or disease by inserting the tips of needles at specific points on the skin. | *"In academic literature, acupuncture designates treatment of pain or disease by inserting the tips of needles at specific points on the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compunction]] | noun | **1.** A feeling of deep regret (usually for some misdeed). | *"It may be that he pursues her doggedly and steadily, with no touch of compunction, remorse, or pity."* — Charles Dickens, *Bleak House* |
| [[expunction]] | noun | **1.** Deletion by an act of expunging or erasing. | *"In academic literature, expunction designates deletion by an act of expunging or erasing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[punctilio]] | noun | **1.** A fine point of etiquette or petty formality.<br>**2.** Strict observance of formalities. | *"The preliminaries had been conducted with proper punctilio."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[punctilious]] | adjective | **1.** Marked by precise accordance with details. | *"Though not the most ardent of lovers, he was one of the most punctilious of men, and appeared earnestly solicitous that his mission should be speedily and courteously executed."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[punctiliously]] | adverb | **1.** In a punctilious manner. | *"The sea-vultures all in pious mourning, the air-sharks all punctiliously in black or speckled."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[punctiliousness]] | noun | **1.** Strict attention to minute details. | *"In academic literature, punctiliousness designates strict attention to minute details."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[punctual]] | adjective | **1.** Acting or arriving or performed exactly at the time appointed. | *"He was punctual and diligent; he did what he had to do, sir,” said Mrs."* — Charles Dickens, *Bleak House* |
| [[punctuality]] | noun | **1.** The quality or habit of adhering to an appointed time. | *"Turveydrop, “let me, even under the present exceptional circumstances, recommend strict punctuality."* — Charles Dickens, *Bleak House* |
| [[punctually]] | adverb | **1.** At the proper time. | *"Usually Apollonie was dreadfully anxious to hear how punctually she had fulfilled her duties, and she always chose lunch-time for that purpose because then no other affair interfered with talking."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[punctuate]] | verb | **1.** Insert punctuation marks into.<br>**2.** To stress, single out as important. | *"I won't think you're--dead!” “You--blessed--little-goose!” scolded Bertram, punctuating each word with a kiss."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[punctuation]] | noun | **1.** Something that makes repeated and regular interruptions or divisions.<br>**2.** The marks used to clarify meaning by indicating separation of words into sentences and clauses and phrases. | *"Piper has a good deal to say, chiefly in parentheses and without punctuation, but not much to tell."* — Charles Dickens, *Bleak House* |
| [[punctum]] | noun | **1.** (anatomy) a point or small area. | *"I have plenty of ideas and facts, you know, and I can see he is just the man to put them into shape—remembers what the right quotations are, _omne tulit punctum_, and that sort of thing—gives subjects a kind of turn."* — George Eliot, *Middlemarch* |
| [[puncturable]] | adjective | **1.** Capable of being punctured. | *"In academic literature, puncturable designates capable of being punctured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[puncture]] | noun | **1.** Loss of air pressure in a tire when a hole is made by some sharp object.<br>**2.** A small hole made by a sharp object. | *"Not a puncture, not a weak spot anywhere."* — Jane Austen, *Persuasion* |
| [[punctured]] | verb | **1.** Pierce with a pointed object; make a hole into.<br>**2.** Make by piercing. | *"The adjacent low-lying ground for half a mile in breadth is a stagnant river with melancholy trees for islands in it and a surface punctured all over, all day long, with falling rain."* — Charles Dickens, *Bleak House* |
| [[punctureless]] | adjective | **1.** Being without punctures or incapable of being punctured. | *"In academic literature, punctureless designates being without punctures or incapable of being punctured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpunctual]] | adjective | **1.** Not punctual; after the appointed time. | *"I glanced at Herbert’s home, and at his character, and at his having no means but such as he was dependent on his father for; those, uncertain and unpunctual."* — Charles Dickens, *Great Expectations* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Structure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PUNCT
  </div>
</div>
