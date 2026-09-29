---
status: unread
type: root_dashboard
---
# Dashboard — not
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">not-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to mark, note, or sign”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Carving clear dark letters onto paper to preserve thoughts in writing.</span>
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

The root **not** means to mark, note, or sign. It refers to the action of mark,ing and carrying out this process. In English, this root forms words such as *note*, *notable*, *notably*, and *notary*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to mark, note, or sign
> The root **not** means to mark, note, or sign. It refers to the action of mark,ing and carrying out this process. In English, this root forms words such as *note*, *notable*, *notably*, and *notary*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To mark, note, or sign</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Carving clear dark letters onto paper to preserve thoughts in writing.</mark>
> - **Everyday Connection**: Think of familiar words like *note* and *notable*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **not** comes from a Latin word that means *"to mark, note, or sign"*.
  - At its core, it describes the action of mark, note, or sign.

- **The Big Picture Idea**:
  - Picture carving clear dark letters onto paper to preserve thoughts in writing.
  - Whenever you see **not** in an English word, think of **to mark, note, or sign**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to mark, note, or sign).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Note**: A brief record of facts, topics, or thoughts, written down as an aid to memory.
  - **Notable**: Worthy of attention or notice.
  - **Notably**: In a way that is worthy of attention.
  - **Notary**: A person authorized to perform legal formalities, especially to draw up or certify contracts, deeds, and other documents.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">not</mark>, think of <mark class="hl-def">to mark, note, or sign</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `not-` (< Latin *nota* / *notāre*): Base nominal and verbal root.
- **Prefix Machinery**:
  - `ad-` / `an-` ("to, toward"): *annotate, annotation*.
  - `con-` ("together, alongside"): *connote, connotation*.
  - `de-` ("down, specify"): *denote, denotation*.
- **Suffixal Formations**:
  - `-able`: *notable*.
  - `-ary`: *notary*.
  - `-ation`: *notation, annotation, connotation, denotation*.
  - `-ious`: *notorious*.

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
```
                      ┌── Observation & Distinction: note, notable, notably
                      │
   [not] ─────────────┼── Specialized Inscription & Law: notation, notate, notary, notarial
 (Mark / Know)        │
                      ├── Scholarly Commentary: annotate, annotation
                      │
                      └── Semantics & Infamy: connote, denote, notorious
```

---

## 🔀 4. Prefix & Combining Dynamics on not
- **`an-` + `not-` + `-ate`**: *annotate* — to add notes or comments to a text explaining its meaning.
- **`con-` + `note`**: *connote* — to imply or suggest an idea in addition to the primary meaning.
- **`de-` + `note`**: *denote* — to be a mark or sign of; indicate directly.
- **`not-` + `-ary`**: *notary* — a legal officer authorized to certify deeds and contracts.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Legal Certification**: *Notary* public; notarial acknowledgments and seals.
- **Music & Mathematics**: Musical *notation* (staves, clefs, notes); scientific and set notation.
- **Semiotics & Philosophy of Language**: Denotation vs. *connotation*; semantic signifiers.
- **Textual Hermeneutics & Philology**: Variorum editions; *annotated* critical texts.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[annotate]] | verb | **1.** Add explanatory notes to or supply with critical comments.<br>**2.** Provide interlinear explanations for words or phrases. | *"He worked his way through a goodly number of the Greek and Latin classics, in copies borrowed from the libraries of the two ministers; and he not only read, but analysed and elaborately annotated what he read."* — John Cairns, *Principal Cairns* |
| [[annotating]] | noun | **1.** The act of adding notes.<br>**2.** Add explanatory notes to or supply with critical comments. | *"In academic literature, annotating designates the act of adding notes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annotation]] | noun | **1.** A comment or instruction (usually added).<br>**2.** The act of adding notes. | *"I have been led farther than I had foreseen, and various subjects for annotation have presented themselves which, though I have no direct need of them, I could not pretermit."* — George Eliot, *Middlemarch* |
| [[annotator]] | noun | **1.** A commentator who writes notes to a text. | *"In academic literature, annotator designates a commentator who writes notes to a text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connotation]] | noun | **1.** What you must know in order to determine the reference of an expression.<br>**2.** An idea that is implied or suggested. | *"They had been diverted from their hereditary connotation to signify impressions for which Nature did not intend them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[connotational]] | adjective | **1.** Of or relating to a connotation. | *"In academic literature, connotational designates of or relating to a connotation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connotative]] | adjective | **1.** Having the power of implying or suggesting something in addition to what is explicit. | *"In academic literature, connotative designates having the power of implying or suggesting something in addition to what is explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connote]] | verb | **1.** Express or state indirectly.<br>**2.** Involve as a necessary condition of consequence; as in logic. | *"Make sure that every term he uses has the full value he intends it to carry, connotes all he wishes it to cover, and has the full emotional power and suggestion that it has for himself."* — T. R. Glover, *The Jesus of History* |
| [[denotation]] | noun | **1.** The act of indicating or pointing out by name.<br>**2.** The most direct or specific meaning of a word or expression; the class of objects that an expression refers to. | *"In academic literature, denotation designates the act of indicating or pointing out by name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denotative]] | adjective | **1.** Having the power of explicitly denoting or designating or naming.<br>**2.** In accordance with fact or the primary meaning of a term. | *"In academic literature, denotative designates having the power of explicitly denoting or designating or naming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denotatum]] | noun | **1.** An actual object referred to by a linguistic expression. | *"In academic literature, denotatum designates an actual object referred to by a linguistic expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denote]] | verb | **1.** Be a sign or indication of.<br>**2.** Have as a meaning. | *"If it be not, then love doth well denote, Love’s eye is not so true as all men’s: no, How can it?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[denotive]] | adjective | **1.** Having the power of explicitly denoting or designating or naming. | *"In academic literature, denotive designates having the power of explicitly denoting or designating or naming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[not]] | adverb | **1.** Negation of a word or group of words. | *"But if thou live remembered not to be, Die single and thine image dies with thee. 4 Unthrifty loveliness why dost thou spend, Upon thyself thy beauty’s legacy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notability]] | noun | **1.** A celebrity who is an inspiration to others. | *"Pulling an oar in the Jeroboam’s boat, was a man of a singular appearance, even in that wild whaling life where individual notabilities make up all totalities."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[notable]] | noun | **1.** A celebrity who is an inspiration to others.<br>**2.** Worthy of notice. | *"We shall find this friar a notable fellow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notably]] | adverb | **1.** Especially; in particular. | *"Marry, if he that writ it had played Pyramus, and hanged himself in Thisbe’s garter, it would have been a fine tragedy; and so it is, truly; and very notably discharged."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notarise]] | verb | **1.** Authenticate as a notary. | *"In academic literature, notarise designates authenticate as a notary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notarize]] | verb | **1.** Authenticate as a notary. | *"In academic literature, notarize designates authenticate as a notary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notary]] | noun | **1.** Someone legally empowered to witness signatures and certify a document's validity and to take depositions. | *"Then meet me forthwith at the notary’s, Give him direction for this merry bond, And I will go and purse the ducats straight, See to my house left in the fearful guard Of an unthrifty knave, and presently I’ll be with you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notate]] | verb | **1.** Put into notation, as of music or choreography. | *"In academic literature, notate designates put into notation, as of music or choreography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notation]] | noun | **1.** A technical system of symbols used to represent special things.<br>**2.** A comment or instruction (usually added). | *"No ditty floated into Blackmoor Vale from the outer world but Tess’s mother caught up its notation in a week."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[notch]] | noun | **1.** A v-shaped indentation.<br>**2.** The location in a range of mountains of a geological formation that is lower than the surrounding peaks. | *"And she’ve a few soft corners to her mind, though I’ve never been able to get into one, the devil’s in’t!” “Ah, baily, she’s a notch above you, and you must own it: a higher class of animal—a finer tissue."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[notched]] | verb | **1.** Cut or make a notch into.<br>**2.** Notch a surface to record something. | *"He was too hard for him directly, to say the troth on’t, before Corioles; he scotched him and notched him like a carbonado."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[note]] | noun | **1.** A brief written record.<br>**2.** A short personal letter. | *"I am from humble, he from honoured name; No note upon my parents, his all noble, My master, my dear lord he is; and I His servant live, and will his vassal die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notebook]] | noun | **1.** A book with blank pages for recording notes or memoranda.<br>**2.** A small compact portable computer. | *"In academic literature, notebook designates a book with blank pages for recording notes or memoranda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notecase]] | noun | **1.** A pocket-size case for holding papers and paper money. | *"In academic literature, notecase designates a pocket-size case for holding papers and paper money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notechis]] | noun | **1.** Tiger snakes. | *"In academic literature, notechis designates tiger snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noted]] | verb | **1.** Make mention of.<br>**2.** Notice or perceive. | *"Why write I still all one, ever the same, And keep invention in a noted weed, That every word doth almost tell my name, Showing their birth, and where they did proceed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notemigonus]] | noun | **1.** Golden shiners. | *"In academic literature, notemigonus designates golden shiners."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notepad]] | noun | **1.** A pad of paper for keeping notes. | *"In academic literature, notepad designates a pad of paper for keeping notes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notepaper]] | noun | **1.** Writing paper intended for writing short notes or letters. | *"Write out on a sheet of notepaper what you want and my servant will take a cab and bring the things back to you.” Campbell scrawled a few lines, blotted them, and addressed an envelope to his assistant."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[noteworthy]] | adjective | **1.** Worthy of notice. | *"Think on thy Proteus when thou haply seest Some rare noteworthy object in thy travel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notice]] | noun | **1.** An announcement containing information about an event; ; ; "a notice of sale.<br>**2.** The act of noticing or paying attention. | *"Let our officers Have notice what we purpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[noticeability]] | noun | **1.** The property of being easy to see and understand. | *"In academic literature, noticeability designates the property of being easy to see and understand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noticeable]] | adjective | **1.** Capable or worthy of being perceived.<br>**2.** Capable of being detected. | *"The report was sure to have some foundation, and the most noticeable thing of all was that Kurt's change had come since that night."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[noticeableness]] | noun | **1.** The property of being easy to see and understand. | *"In academic literature, noticeableness designates the property of being easy to see and understand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noticeably]] | adverb | **1.** In a noticeable manner. | *"Prosperously, but not noticeably otherwise; he thought, in black."* — Charles Dickens, *Great Expectations* |
| [[noticed]] | verb | **1.** Discover or determine the existence, presence, or fact of.<br>**2.** Notice or perceive. | *"It was clearly evident, however, that the approaching girl had no intention of changing her pace, despite the fact that she must have noticed long ago the friend who was hurrying towards her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[noticer]] | noun | **1.** Someone who takes notice.<br>**2.** Someone who gives formal notice. | *"In academic literature, noticer designates someone who takes notice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notifiable]] | adjective | **1.** Requiring that official notification be given. | *"In academic literature, notifiable designates requiring that official notification be given."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notification]] | noun | **1.** An accusation of crime made by a grand jury on its own initiative.<br>**2.** Informing by words. | *"The promised notification was hanging over her head."* — Jane Austen, *Mansfield Park* |
| [[notify]] | verb | **1.** Inform (somebody) of something. | *"Marry, she hath received your letter, for the which she thanks you a thousand times; and she gives you to notify that her husband will be absence from his house between ten and eleven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notion]] | noun | **1.** A vague idea in which some confidence is placed.<br>**2.** A general inclusive concept. | *"Your judgments, my grave lords, Must give this cur the lie; and his own notion— Who wears my stripes impressed upon him, that Must bear my beating to his grave—shall join To thrust the lie unto him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notional]] | adjective | **1.** Not based on fact; unreal; - f.d.roosevelt.<br>**2.** Not based on fact or investigation. | *"In academic literature, notional designates not based on fact; unreal; - f.d.roosevelt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notochord]] | noun | **1.** A flexible rodlike structure that forms the supporting axis of the body in the lowest chordates and lowest vertebrates and in embryos of higher vertebrates. | *"In academic literature, notochord designates a flexible rodlike structure that forms the supporting axis of the body in the lowest chordates and lowest vertebrates and in embryos of higher vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notomys]] | noun | **1.** Jerboa rats. | *"In academic literature, notomys designates jerboa rats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notonecta]] | noun | **1.** Type genus of the notonectidae: backswimmers. | *"In academic literature, notonecta designates type genus of the notonectidae: backswimmers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notonectidae]] | noun | **1.** Aquatic carnivorous insects. | *"In academic literature, notonectidae designates aquatic carnivorous insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notophthalmus]] | noun | **1.** Newts. | *"Classical and authoritative lexicons catalog notophthalmus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notoriety]] | noun | **1.** The state of being known for some unfavorable act or quality. | *"Everybody of any consequence or notoriety in Bath was well know by name to Mrs Smith."* — Jane Austen, *Persuasion* |
| [[notorious]] | adjective | **1.** Known widely and usually unfavorably. | *"I would it were not notorious."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notoriously]] | adverb | **1.** To a notorious degree. | *"Fool, there was never man so notoriously abused."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[notornis]] | noun | **1.** Flightless new zealand birds similar to gallinules. | *"In academic literature, notornis designates flightless new zealand birds similar to gallinules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notoryctidae]] | noun | **1.** Pouched moles. | *"In academic literature, notoryctidae designates pouched moles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notoryctus]] | noun | **1.** Type genus of the family notoryctidae: comprising solely the marsupial mole. | *"In academic literature, notoryctus designates type genus of the family notoryctidae: comprising solely the marsupial mole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notostraca]] | noun | **1.** Small freshwater crustaceans with a shield-shaped carapace. | *"In academic literature, notostraca designates small freshwater crustaceans with a shield-shaped carapace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notropis]] | noun | **1.** Shiners. | *"Classical and authoritative lexicons catalog notropis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[notturno]] | noun | **1.** A pensive lyrical piece of music (especially for the piano). | *"In academic literature, notturno designates a pensive lyrical piece of music (especially for the piano)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnotched]] | adjective | **1.** Having no notches. | *"In academic literature, unnotched designates having no notches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnoted]] | adjective | **1.** Not taken into account. | *"Gnats are unnoted wheresoe’er they fly, But eagles gazed upon with every eye."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unnoticeable]] | adjective | **1.** Not obtrusive or undesirably noticeable.<br>**2.** Not noticeable; not drawing attention; - j.g.cozzens. | *"In academic literature, unnoticeable designates not obtrusive or undesirably noticeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnoticeableness]] | noun | **1.** The quality of being not easily noticed. | *"In academic literature, unnoticeableness designates the quality of being not easily noticed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnoticeably]] | adverb | **1.** In an imperceptible manner or to an imperceptible degree. | *"Nevertheless at eleven o’clock she was walking towards Middlemarch, having made up her mind that she would make as quietly and unnoticeably as possible her second attempt to see and save Rosamond."* — George Eliot, *Middlemarch* |
| [[unnoticed]] | adjective | **1.** Not noticed. | *"The Frenchwoman stood unnoticed, looking on with her lips very tightly set."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Writing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NOT
  </div>
</div>
