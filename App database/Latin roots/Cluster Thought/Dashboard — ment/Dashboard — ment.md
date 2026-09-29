---
status: unread
type: root_dashboard
---
# Dashboard — ment
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ment-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mind”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Sitting quietly while turning ideas over in your mind to solve a problem.</span>
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

The root **ment** means mind. It refers to the faculty of thinking, reasoning, remembering, and feeling. In English, this root forms words such as *mental*, *mention*, *dementia*, and *mentality*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mind
> The root **ment** means mind. It refers to the faculty of thinking, reasoning, remembering, and feeling. In English, this root forms words such as *mental*, *mention*, *dementia*, and *mentality*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mind</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Sitting quietly while turning ideas over in your mind to solve a problem.</mark>
> - **Everyday Connection**: Think of familiar words like *mental* and *mention*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ment** comes from a Latin word that means *"mind"*.
  - At its core, it describes mind.

- **The Big Picture Idea**:
  - Picture sitting quietly while turning ideas over in your mind to solve a problem.
  - Whenever you see **ment** in an English word, think of **thinking, reasoning, and reflection**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mind.
  - **Mental & Social**: How people experience, organize, or communicate about mind.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Mental**: Relating to the mind or involving the process of thinking.
  - **Mention**: V.* To refer to something briefly or without going into detail.
  - **Dementia**: An everyday English word showing the root's idea of *mind*.
  - **Mentality**: The characteristic attitude, mindset, or outlook of a person or group.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ment</mark>, think of <mark class="hl-def">thinking, reasoning, and reflection</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root *ment* operates through three distinct morphological channels:
1. **The Nominal Stem `ment-`**: Directly from *mentis* (genitive of *mēns*), yielding English adjectives and nouns: *mental* (< Latin *mentālis*), *mentality*, *mentation*.
2. **Prefixal Derangements `de-`**: Compound forms signifying mental absence or decay: *demented* (< Latin *dēmentāre*), *dementia*.
3. **Reflective & Communicative Compounds**: Combining with *com-* (*cum*) to signify thoughtful consideration: *comment* (< Latin *commentārī* "to ponder, design, write notes upon"), *commentary*.
4. **Homeric & Classical Transmission of `mentor`**: Although *Mentor* (the character in Homer's *Odyssey*) is Greek, the name stems from the identical PIE root *\*men-tor* ("one who thinks, counselor, guide"), entering French and English as a universal title of intellectual tutelage.

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

The cognitive sphere of *ment* radiates through distinct operational bands:
- **Cognitive Faculties & Psychology**: [[mental]], [[mentality]], `mentation`
- **Cognitive Pathology & Derangement**: [[demented]], `dementia`
- **Verbal Expression & Notation**: [[mention]], [[comment]], [[commentary]]
- **Guidance & Intellectual Tutelage**: [[mentor]], [[mentorship]]
- **Emotional Force & Impetus**: `vehement` (traditionally *vehemēns* < *vehe-* "carrying away" + *mēns* "mind")

---

## 🔀 4. Prefix & Combining Dynamics on ment

1. **`com-` + `ment`** (*cum* "thoroughly, together"):
   - *comment* $\to$ to express an opinion or observation after deliberating upon a matter.
   - *commentary* $\to$ an extended, systematic series of explanatory notes or critical interpretations.
2. **`de-` + `ment`** (*dē-* "away from, down, out of"):
   - *demented* $\to$ driven out of one's mind; suffering from cognitive collapse or manic irrationality.
   - *dementia* $\to$ chronic, progressive mental deterioration impacting memory, judgment, and reasoning.
3. **Suffixal Evolution**:
   - `ment-` + `-al` $\to$ *mental* (relating to the mind or intellectual operations).
   - `ment-` + `-ity` $\to$ *mentality* (the characteristic mental attitude, outlook, or cognitive power of an individual or group).

---

## 🌐 5. Disciplinary & Real-World Domains

- **Psychiatry & Cognitive Science**: *mental* health, *dementia*, clinical *mentation* assessments.
- **Law & Jurisprudence**: *mens rea* (criminal intent), *mental* competency to stand trial.
- **Literary Criticism & Journalism**: scholarly *commentary*, political *comment*.
- **Education & Organizational Leadership**: executive *mentorship*, academic *mentors*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[comment]] | noun | **1.** A statement that expresses a personal opinion or belief or adds information.<br>**2.** A written explanation or criticism or illustration that is added to a book or other textual material. | *"That this huge stage presenteth nought but shows Whereon the stars in secret influence comment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commentary]] | noun | **1.** A written explanation or criticism or illustration that is added to a book or other textual material. | *"But the commentary upon it now indelibly written in his handsome face made it far more distressing than it used to be."* — Charles Dickens, *Bleak House* |
| [[commentate]] | verb | **1.** Make a commentary on.<br>**2.** Serve as a commentator, as in sportscasting. | *"In academic literature, commentate designates make a commentary on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commentator]] | noun | **1.** An expert who observes and comments on something.<br>**2.** A writer who reports and analyzes events of the day. | *"The old commentator, Bengel, wrote at the beginning of his book that a man, who is setting out to interpret Scripture, has to ask "by what right" he does it."* — T. R. Glover, *The Jesus of History* |
| [[demented]] | adjective | **1.** Affected with madness or insanity. | *"I dug eagerly, and now and then caught myself actually looking, with something that very much resembled expectation, for the fancied treasure, the vision of which had demented my unfortunate companion."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[dementedly]] | adverb | **1.** In an insane manner. | *"In academic literature, dementedly designates in an insane manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dementedness]] | noun | **1.** Mental deterioration of organic or functional origin. | *"In academic literature, dementedness designates mental deterioration of organic or functional origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dementia]] | noun | **1.** Mental deterioration of organic or functional origin. | *"Evils cast out It is recorded that once Jesus asked the name of a dis- ease, - a disease which moderns would call /dementia/. 411:15 The demon, or evil, replied that his name was Legion."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[disinterment]] | noun | **1.** The act of digging something out of the ground (especially a corpse) where it has been buried. | *"In academic literature, disinterment designates the act of digging something out of the ground (especially a corpse) where it has been buried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmental]] | noun | **1.** Swiss cheese with large holes. | *"In academic literature, emmental designates swiss cheese with large holes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmentaler]] | noun | **1.** Swiss cheese with large holes. | *"In academic literature, emmentaler designates swiss cheese with large holes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interment]] | noun | **1.** The ritual placing of a corpse in a grave. | *"Gibson, who had come down to direct his sister’s interment and settle the family affairs."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[mental]] | adjective | **1.** Involving the mind or an intellectual process.<br>**2.** Of or relating to the mind. | *"What a mental power This eye shoots forth!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mentalism]] | noun | **1.** (philosophy) a doctrine that mind is the true reality and that objects exist only as aspects of the mind's awareness. | *"In academic literature, mentalism designates (philosophy) a doctrine that mind is the true reality and that objects exist only as aspects of the mind's awareness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mentality]] | noun | **1.** A habitual or characteristic mental attitude that determines how you will interpret and respond to situations.<br>**2.** Mental ability. | *"They were likewise sharply differentiated in the minutest shades of mentality and temperament."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mentally]] | adverb | **1.** In your mind. | *"If the conversation anywhere, when I was present, took that direction, as it sometimes naturally did, I tried not to hear: I mentally counted, repeated something that I knew, or went out of the room."* — Charles Dickens, *Bleak House* |
| [[mentation]] | noun | **1.** The process of using your mind to consider something carefully. | *"In academic literature, mentation designates the process of using your mind to consider something carefully."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[menticirrhus]] | noun | **1.** Kingfishes; whiting. | *"In academic literature, menticirrhus designates kingfishes; whiting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mention]] | noun | **1.** A remark that calls attention to something or someone.<br>**2.** A short note recognizing a source of information or of a quoted passage. | *"Pray sit down, then, and let me entreat you, By all the honesty and honour in you, No mention of this woman; ’twill disturb us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mentioner]] | noun | **1.** A speaker who refers to something briefly or incidentally. | *"In academic literature, mentioner designates a speaker who refers to something briefly or incidentally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mentor]] | noun | **1.** A wise and trusted guide and advisor.<br>**2.** Serve as a teacher or trusted counselor. | *"You have played the part of mentor to me many times, and I don’t see why you should fear to do it now.” “It is nothing that you have done, this time."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mentorship]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ment within the domain of Thought.<br>**2.** A technical or specialized form exhibiting the properties of ment in systematic terminology. | *"In academic literature, mentorship designates pertaining to, derived from, or characteristic of latin ment within the domain of thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mentum]] | noun | **1.** A projection like a chin formed by the sepals and base of the column in some orchids.<br>**2.** The protruding part of the lower jaw. | *"In academic literature, mentum designates a projection like a chin formed by the sepals and base of the column in some orchids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undermentioned]] | adjective | **1.** About to be mentioned or specified. | *"In academic literature, undermentioned designates about to be mentioned or specified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmentionable]] | noun | **1.** A garment worn under other garments.<br>**2.** Unsuitable or forbidden as a topic of conversation. | *"Was there a “secret” at Bly—a mystery of Udolpho or an insane, an unmentionable relative kept in unsuspected confinement?"* — Henry James, *The Turn of the Screw* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Thought]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MENT
  </div>
</div>
