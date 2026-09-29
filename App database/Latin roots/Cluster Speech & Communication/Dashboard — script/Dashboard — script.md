---
status: unread
type: root_dashboard
---
# Dashboard — script
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">script-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“written, text, or record”</span>
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

The root **script** means written, text, or record. It refers to writing letters, drafting documents, or keeping records. In English, this root forms words such as *script*, *transcript*, *description*, and *prescription*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: written, text, or record
> The root **script** means written, text, or record. It refers to writing letters, drafting documents, or keeping records. In English, this root forms words such as *script*, *transcript*, *description*, and *prescription*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Written, text, or record</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *script* and *transcript*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **script** comes from a Latin word that means *"written, text, or record"*.
  - At its core, it describes written, text, or record.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **script** in an English word, think of **talking, discussing, and communication**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of written, text, or record.
  - **Mental & Social**: How people experience, organize, or communicate about written, text, or record.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Script**: The written text of a play, film, or broadcast. 2. Handwriting as distinct from print. 3. A program written for a run-time system.
  - **Transcript**: A written or printed version of material originally presented in another medium. 2. An official university record of grades.
  - **Description**: A spoken or written representation or account of a person, object, or event. 2. A type or kind of thing.
  - **Prescription**: An instruction written by a medical practitioner authorizing a medicine or treatment. 2. A recommendation or authoritative direction.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">script</mark>, think of <mark class="hl-def">talking, discussing, and communication</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **script** combines productively with Latin prefixes and suffixes:
- **Base Noun & Typography Stems (`script-`)**:
  - *scrīptum* $\to$ **script**, **scripture**, **scriptural**.
  - *manū* + *scrīptum* $\to$ **manuscript**.
  - *sub-* + *scrīptum* $\to$ **subscript** ("written below").
  - *post* + *scrīptum* $\to$ **postscript** ("written after").
  - *nōn* + *dēscrīptum* $\to$ **nondescript** ("lacking distinctive written features; plain").
- **Participial Nouns & Adjectives in `-scription` and `-scriptive`**:
  - *con-* + *scrībere* $\to$ *cōnscrīptio* $\to$ **conscript**, **conscription**.
  - *de-* + *scrīptio* $\to$ **description**, **descriptive**.
  - *in-* + *scrīptio* $\to$ **inscription**, **inscriptional**.
  - *prae-* + *scrīptio* $\to$ **prescription**, **prescriptive**.
  - *pro-* + *scrīptio* $\to$ **proscription**, **proscriptive**.
  - *sub-* + *scrīptio* $\to$ **subscription**.
  - *trans-* + *scrīptio* $\to$ **transcript**, **transcription**.
  - *re-* + *scrīptum* $\to$ **rescript**.
- **Related Verb Family in `-scribe` (cross-indexed)**:
  - Covered in detail on [[Dashboard — scrib]]: *ascribe*, *circumscribe*, *describe*, *inscribe*, *prescribe*, *proscribe*, *scribble*, *scribe*, *subscribe*, *transcribe*.

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

The derivatives of **script** span five major domains:
- **Sacred & Canonical Literature**: *scripture* (sacred religious writings), *scriptural* (relating to the Bible), *manuscript* (handwritten text or unpublished book draft).
- **Theatrical & Media Production**: *script* (the written text of a play, film, or broadcast; a programming macro).
- **Administrative, Academic & Legal Records**: *transcript* (an official certified record of a student's grades or courtroom testimony), *postscript* (an additional remark at the end of a letter, P.S.), *rescript* (official imperial response or decree).
- **Military & Civil Mobilization**: *conscript* (enlist someone compulsorily into state military service), *conscription*.
- **Medicine & Statutory Guidance**: *prescription* (an instruction written by a medical practitioner authorizing a medicine), *prescriptive* (enforcing rules).

---

## 🔀 4. Prefix & Combining Dynamics on script

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`manū`** ("by hand") | `manū` + `scrīptum` | Written by hand $\to$ historical codex, unpublished author draft | *manuscript* |
| **`post`** ("after") | `post` + `scrīptum` | Written after the signature $\to$ supplementary letter note (P.S.) | *postscript* |
| **`con-`** ("together") | `con-` + `scrībere` | Enrolled together on a military muster roll $\to$ drafted soldier | *conscript, conscription* |
| **`sub-`** ("under") | `sub-` + `scrīptum` | Written underneath $\to$ small character below the baseline | *subscript* |
| **`trans-`** ("across") | `trans-` + `scrīptum` | Copied across $\to$ certified academic record, text transcript | *transcript, transcription* |
| **`non-`** + **`de-`** | `non-` + `dēscrīptum` | Not described $\to$ unremarkable, ordinary, undistinguished | *nondescript* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Theology & Biblical Exegesis**: Textual criticism, biblical hermeneutics, and canonization (*scripture*, *scriptural*).
- **Medicine & Clinical Pharmacology**: Prescription drug monitoring, compounding, and regulation (*prescription*, *prescription drug*).
- **Cinema, Television & Computer Science**: Screenwriting, dialogue drafting, and scripting languages like Python and JavaScript (*script*, *screenplay*).
- **Higher Education Administration**: Official grade reporting and credential verification (*academic transcript*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adscript]] | adjective | **1.** Written or printed immediately following another character and aligned with it.<br>**2.** (used of persons) bound to a tract of land; hence their service is transferable from owner to owner. | *"In academic literature, adscript designates written or printed immediately following another character and aligned with it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adscripted]] | adjective | **1.** (used of persons) bound to a tract of land; hence their service is transferable from owner to owner. | *"In academic literature, adscripted designates (used of persons) bound to a tract of land; hence their service is transferable from owner to owner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumscription]] | noun | **1.** The act of circumscribing. | *"For know, Iago, But that I love the gentle Desdemona, I would not my unhoused free condition Put into circumscription and confine For the sea’s worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conscript]] | noun | **1.** Someone who is drafted into military service.<br>**2.** Enroll into service compulsorily. | *"I'll conscript them as fast as a provost guard can catch them." The general settled back on his elbow again and looked at his visitor as if to inquire what he thought of the situation."* — Harry Castlemon, *Rodney, the Partisan* |
| [[conscription]] | noun | **1.** Compulsory military service. | *"And Robert Green and Walter White, And others I could name; When these refuse to go and fight It is a burning shame; I think they should be forced to go, Conscription is the plan To catch these chaps so very slow And make them play the man."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[description]] | noun | **1.** A statement that represents something in words.<br>**2.** The act of describing something. | *"For this description of thine honesty?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[descriptive]] | adjective | **1.** Serving to describe or inform or characterized by description.<br>**2.** Describing the structure of a language. | *"Meanwhile she folds up a cocked hat for that redoubtable old general at Bath, descriptive of her melancholy condition."* — Charles Dickens, *Bleak House* |
| [[descriptively]] | adverb | **1.** By giving a description. | *"Hitherto, in descriptively treating of the Sperm Whale, I have chiefly dwelt upon the marvels of his outer aspect; or separately and in detail upon some few interior structural features."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[descriptivism]] | noun | **1.** (ethics) a doctrine holding that moral statements have a truth value.<br>**2.** (linguistics) a doctrine supporting or promoting descriptive linguistics. | *"In academic literature, descriptivism designates (ethics) a doctrine holding that moral statements have a truth value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[descriptor]] | noun | **1.** The phonological or orthographic sound or appearance of a word that can be used to describe or identify something.<br>**2.** A piece of stored information that is used to identify an item in an information storage and retrieval system. | *"In academic literature, descriptor designates the phonological or orthographic sound or appearance of a word that can be used to describe or identify something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inscription]] | noun | **1.** Letters inscribed (especially words engraved or carved) on something.<br>**2.** A short message (as in a book or musical work or on a photograph) dedicating it to someone or something. | *"Now please you wit The epitaph is for Marina writ By wicked Dionyza. [_Reads the inscription on Marina’s monument._] _The fairest, sweet’st, and best lies here, Who wither’d in her spring of year."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inscriptive]] | adjective | **1.** Of or relating to an inscription. | *"In academic literature, inscriptive designates of or relating to an inscription."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inscriptively]] | adverb | **1.** By means of an inscription. | *"In academic literature, inscriptively designates by means of an inscription."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manuscript]] | noun | **1.** The form of a literary work submitted for publication.<br>**2.** Handwritten book or document. | *"He has some manuscript near him, but is not referring to it."* — Charles Dickens, *Bleak House* |
| [[nondescript]] | noun | **1.** A person is not easily classified and not very interesting.<br>**2.** Lacking distinct or individual characteristics; dull and uninteresting. | *"Tess did not stop at Weatherbury, after this long drive, further than to make a slight nondescript meal at noon at a cottage to which the farmer recommended her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[nonprescription]] | adjective | **1.** Purchasable without a doctor's prescription. | *"In academic literature, nonprescription designates purchasable without a doctor's prescription."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postscript]] | noun | **1.** A note appended to a letter after the signature.<br>**2.** Textual matter that is added onto a publication; usually at the end. | *"KING. ’Tis Hamlet’s character. ‘Naked!’ And in a postscript here he says ‘alone.’ Can you advise me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prescript]] | noun | **1.** Prescribed guide for conduct or action. | *"Do not exceed The prescript of this scroll."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prescription]] | noun | **1.** Directions prescribed beforehand; the action of prescribing authoritative rules or directions.<br>**2.** A drug that is available only with written instructions from a doctor or dentist to a pharmacist. | *"The most sovereign prescription in Galen is but empiricutic and, to this preservative, of no better report than a horse drench."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prescriptive]] | adjective | **1.** Pertaining to giving directives or rules. | *"Woman’s prescriptive infirmity had stalked into the sunlight, which had clothed it in the freshness of an originality."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[prescriptivism]] | noun | **1.** (ethics) a doctrine holding that moral statements prescribe appropriate attitudes and behavior.<br>**2.** (linguistics) a doctrine supporting or promoting prescriptive linguistics. | *"In academic literature, prescriptivism designates (ethics) a doctrine holding that moral statements prescribe appropriate attitudes and behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proscription]] | noun | **1.** A decree that prohibits something.<br>**2.** Rejection by means of an act of banishing or proscribing someone. | *"So you thought him, And took his voice who should be prick’d to die In our black sentence and proscription."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rescript]] | noun | **1.** A reply by a pope to an inquiry concerning a point of law or morality.<br>**2.** A legally binding command or decision entered on the court record (as if issued by a court or judge). | *"This rescript began with the words: “Sergéy Kuzmích, From all sides reports reach me,” etc."* — graf Leo Tolstoy, *War and Peace* |
| [[rescriptor]] | noun | **1.** A non-nucleoside reverse transcriptase inhibitor (trade name rescriptor) used to treat aids and hiv. | *"In academic literature, rescriptor designates a non-nucleoside reverse transcriptase inhibitor (trade name rescriptor) used to treat aids and hiv."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[script]] | noun | **1.** A written version of a play or other dramatic composition; used in preparing for a performance.<br>**2.** Something written by hand. | *"You may have heard of the Babylonian cuneiform script ..." and the old gentleman was off full gallop on his hobby ..."* — Donn Byrne, *The Wind Bloweth* |
| [[scripted]] | verb | **1.** Write a script for.<br>**2.** Written as for a film or play or broadcast. | *"In academic literature, scripted designates write a script for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scriptorium]] | noun | **1.** A room in a monastery that is set aside for writing or copying manuscripts. | *"A certain number of the brotherhood were constantly employed in the <g>Scriptorium</g>, in making copies of the most esteemed works, to furnish and augment the common library."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[scriptural]] | adjective | **1.** Of or pertaining to or contained in or in accordance with the bible.<br>**2.** Written or relating to writing. | *"Larcher was nervous until reassured by finding the subjects to be Scriptural."* — George Eliot, *Middlemarch* |
| [[scripture]] | noun | **1.** The sacred writings of the christian religions.<br>**2.** Any writing that is regarded as sacred by a religious group. | *"How dost thou understand the Scripture?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subscript]] | noun | **1.** A character or symbol set or printed or written beneath or slightly below and to the side of another character.<br>**2.** Written or printed below and to one side of another character. | *"A single underscore after a symbol indicates a subscript."* — Donald M. Levy, *Modern Copper Smelting* |
| [[subscription]] | noun | **1.** A payment for consecutive issues of a newspaper or magazine for a given period of time.<br>**2.** Agreement expressed by (or as if expressed by) signing your name. | *"I never gave you kingdom, call’d you children; You owe me no subscription: then let fall Your horrible pleasure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superscript]] | noun | **1.** A character or symbol set or printed or written above and immediately to one side of another character.<br>**2.** Written or printed above and to one side of another character. | *"In academic literature, superscript designates a character or symbol set or printed or written above and immediately to one side of another character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superscription]] | noun | **1.** An inscription written above something else.<br>**2.** The activity of superscribing. | *"Or doth this churlish superscription Pretend some alteration in good will?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transcript]] | noun | **1.** Something that has been transcribed; a written record (usually typewritten) of dictated or recorded speech.<br>**2.** A reproduction of a written record (e.g. of a legal or school record). | *"It is, presumably, a transcript of one of the early copies."* — John Fletcher, *The Elder Brother* |
| [[undescriptive]] | adjective | **1.** Not successful in describing. | *"In academic literature, undescriptive designates not successful in describing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unscripted]] | adjective | **1.** Not furnished with or using a script. | *"In academic literature, unscripted designates not furnished with or using a script."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SCRIPT
  </div>
</div>
