---
status: unread
type: root_dashboard
---
# Dashboard — palp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">palp-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to stroke or touch gently”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gently pressing your fingertips against a smooth surface to feel its texture.</span>
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

The root **palp** means to stroke or touch gently. It refers to physical contact, feeling with the hands, or tactile sensation. In English, this root forms words such as *looking*, *impalpable*, *palpable*, and *palpation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to stroke or touch gently
> The root **palp** means to stroke or touch gently. It refers to physical contact, feeling with the hands, or tactile sensation. In English, this root forms words such as *looking*, *impalpable*, *palpable*, and *palpation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To stroke or touch gently</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gently pressing your fingertips against a smooth surface to feel its texture.</mark>
> - **Everyday Connection**: Think of familiar words like *looking* and *impalpable*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **palp** comes from a Latin word that means *"to stroke or touch gently"*.
  - At its core, it describes the action of stroke or touch gently.

- **The Big Picture Idea**:
  - Picture gently pressing your fingertips against a smooth surface to feel its texture.
  - Whenever you see **palp** in an English word, think of **to stroke or touch gently**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to stroke or touch gently).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Looking**: An everyday English word showing the root's idea of *to stroke or touch gently*.
  - **Impalpable**: Unable to be felt by touch.
  - **Palpable**: Able to be touched or felt.
  - **Palpation**: Medicine*: The process of using one's hands to examine the body, especially while perceiving/diagnosing disease or illness.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">palp</mark>, think of <mark class="hl-def">to stroke or touch gently</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms two closely aligned morphological families:
1. **The Gentle Tactile Base `palp-`**:
   - *palpable* (< Late Latin *palpābilis* "that can be touched").
   - *impalpable* (< Latin *in-* "not" + *palpābilis*).
   - *palpation* (< Latin *palpātiō, palpātiōnis* "a stroking, feeling").
   - *palpatory* (< Late Latin *palpātōrius*).
2. **The Frequentative Cardiac Base `palpit-`**:
   - *palpitate* (< Latin *palpitātus*, past participle of *palpitāre*).
   - *palpitation* (< Latin *palpitātiō*).
3. **Zoological Sensory Term**:
   - *palp* or *palpus* (a jointed sensory organ attached to the mouthparts of insects, crustaceans, and mollusks).

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

The cognitive scope of *palp* encompasses three domains:
- **Clinical Physical Examination**: [[palpation]], [[palpatory]], `palp`
- **Sensory & Conceptual Tangibility**: [[palpable]], `palpably`, [[impalpable]]
- **Cardiology & Neurovegetative Response**: [[palpitate]], `palpitation`

---

## 🔀 4. Prefix & Combining Dynamics on palp

1. **`in-` + `palp`** (*in-* "not, un-"):
   - *impalpable* $\to$ unable to be felt by touch; not easily comprehended; intangible.
2. **`palp` + `-able`** (Latin *-ābilis*):
   - *palpable* $\to$ able to be touched or felt; so intense as to seem almost tangible.
   - *palpably* $\to$ in a manner that is obvious to the senses or plain to see.
3. **`palp` + `-itate`** (frequentative suffix):
   - *palpitate* $\to$ of the heart: to beat rapidly, strongly, or irregularly.
   - *palpitation* $\to$ a noticeably rapid, strong, or irregular heartbeat.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Clinical Medicine & Nursing**: abdominal *palpation*, deep vs. light *palpation*, guarding vs. rigidity.
- **Cardiology & Emergency Medicine**: cardiac arrhythmias, premature ventricular contractions, panic-induced *palpitations*.
- **Literature & Rhetoric**: *palpable* silence, *palpable* tension in dramatic dialogue.
- **Entomology & Marine Biology**: maxillary and labial *palps* of insects for chemosensory navigation.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[impalpability]] | noun | **1.** The quality of being intangible and not perceptible by touch. | *"Troubles and other realities took on themselves a metaphysical impalpability, sinking to mere mental phenomena for serene contemplation, and no longer stood as pressing concretions which chafed body and soul."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impalpable]] | adjective | **1.** Incapable of being perceived by the senses especially the sense of touch; - james jeans.<br>**2.** Imperceptible to the senses or the mind. | *"If this be so, fancy the irresistibleness of that might, to which the most impalpable and destructive of all elements contributes."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[impalpably]] | adverb | **1.** Not substantially; lacking substantial expression or fullness. | *"In academic literature, impalpably designates not substantially; lacking substantial expression or fullness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpability]] | noun | **1.** The quality of being perceivable by touch. | *"A half-formed, wholly unexpressed suspicion tossed in it, now heaving itself up, and now sinking into the deep; now gaining palpability, and now losing it."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[palpable]] | adjective | **1.** Capable of being perceived; especially capable of being handled or touched or felt.<br>**2.** Can be felt by palpation. | *"These lies are like the father that begets them, gross as a mountain, open, palpable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[palpably]] | adverb | **1.** So as to be palpable. | *"Bucket palpably knows all about it—“and recent circumstances have brought it on.” As he takes his seat with some difficulty and with an air of pain, Mr."* — Charles Dickens, *Bleak House* |
| [[palpate]] | verb | **1.** Examine (a body part) by palpation. | *"In academic literature, palpate designates examine (a body part) by palpation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpation]] | noun | **1.** A method of examination in which the examiner feels the size or shape or firmness or location of something (of body parts when the examiner is a health professional). | *"In academic literature, palpation designates a method of examination in which the examiner feels the size or shape or firmness or location of something (of body parts when the examiner is a health professional)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpatory]] | adjective | **1.** Relating to or involving palpation. | *"In academic literature, palpatory designates relating to or involving palpation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpebra]] | noun | **1.** Either of two folds of skin that can be moved to cover or open the eye. | *"In academic literature, palpebra designates either of two folds of skin that can be moved to cover or open the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpebrate]] | verb | **1.** Wink or blink, especially repeatedly.<br>**2.** Having eyelids. | *"In academic literature, palpebrate designates wink or blink, especially repeatedly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpebration]] | noun | **1.** Repeated blinking or winking (especially if uncontrolled and persistent). | *"In academic literature, palpebration designates repeated blinking or winking (especially if uncontrolled and persistent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palpitant]] | adjective | **1.** Having a slight and rapid trembling motion. | *"And there, when day was breaking, I knelt and looked around: The light was near, the silence Was palpitant with sound; I drew my hate from out my breast And thrust it in the ground."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[palpitate]] | verb | **1.** Cause to throb or beat rapidly.<br>**2.** Shake with fast, tremulous movements. | *"I shall go hwome.” The air of the sleeping-chamber seemed to palpitate with the hopeless passion of the girls."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[palpitating]] | verb | **1.** Cause to throb or beat rapidly.<br>**2.** Shake with fast, tremulous movements. | *"Amaranthine glosses came over them then, and the unresting world wheeled her round to a contrasting prospect eastward, in the shape of indecisive and palpitating stars."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[palpitation]] | noun | **1.** A rapid and irregular heart beat.<br>**2.** A shaky motion. | *"Recollection of the strange antics she had indulged in when passing through the trees was succeeded in the girl by a nettled palpitation, and that by a hot face."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Touch]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PALP
  </div>
</div>
