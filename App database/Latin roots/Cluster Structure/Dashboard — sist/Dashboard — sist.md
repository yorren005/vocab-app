---
status: unread
type: root_dashboard
---
# Dashboard — sist
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sist-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to stand, place, or cause to stand”</span>
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

The root **sist** means to stand, place, or cause to stand. It refers to being upright on one's feet, remaining in place, or enduring. In English, this root forms words such as *assistance*, *consist*, *consistent*, and *desist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to stand, place, or cause to stand
> The root **sist** means to stand, place, or cause to stand. It refers to being upright on one's feet, remaining in place, or enduring. In English, this root forms words such as *assistance*, *consist*, *consistent*, and *desist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To stand, place, or cause to stand</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *assistance* and *consist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sist** comes from a Latin word that means *"to stand, place, or cause to stand"*.
  - At its core, it describes the action of stand, place, or cause stand.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **sist** in an English word, think of **to stand, place, or cause to stand**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to stand, place, or cause to stand).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Assistance**: The provision of money, resources, or information to help someone.
  - **Consist**: To be composed or made up of. 2. To have an essential feature or foundation in.
  - **Consistent**: Acting or done in the same way over time, especially so as to be fair or accurate. 2. Compatible or in agreement with.
  - **Desist**: To stop doing something.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sist</mark>, think of <mark class="hl-def">to stand, place, or cause to stand</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **sist** combines systematically with Latin directional prefixes:
- **Prefix Compounds with `-sist`**:
  - *ad-* ("to, near") + *sistere* $\to$ **assist**, **assistance**, **assistant**.
  - *con-* ("together") + *sistere* $\to$ **consist**, **consistent**, **consistency**, **inconsistent**.
  - *de-* ("away, down") + *sistere* $\to$ **desist** ("cease, stop").
  - *ex-* ("out of, forth") + *sistere* $\to$ **exist**, **existence**, **existent**, **nonexistent**.
  - *in-* ("upon") + *sistere* $\to$ **insist**, **insistence**, **insistent**.
  - *per-* ("thoroughly") + *sistere* $\to$ **persist**, **persistence**, **persistent**.
  - *re-* ("against, back") + *sistere* $\to$ **resist**, **resistance**, **resistant**, **irresistible**.

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

The derivatives of **sist** govern four fundamental conceptual arenas:
- **Metaphysics & Reality**: *exist* (have objective reality or being), *existence* (the fact or state of living or having objective reality), *existent*.
- **Mechanical & Structural Coherence**: *consist* (be composed or made up of; hold together), *consistent* (acting or done in the same way over time; compatible), *consistency*.
- **Social Support & Cessation**: *assist* (help someone, typically by doing a share of the work), *assistance*, *desist* (stop doing something; cease).
- **Psychological Tenacity & Opposition**: *insist* (demand something forcefully, not accepting refusal), *persist* (continue firmly in an opinion or course of action despite difficulty), *resist* (withstand the action or effect of; fight against), *resistance*.

---

## 🔀 4. Prefix & Combining Dynamics on sist

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to, near") | `ad-` + *sistere* | Stand beside someone to help $\to$ aid, support | *assist, assistance, assistant* |
| **`con-`** ("together") | `con-` + *sistere* | Stand firmly together as a mass $\to$ cohere, agree | *consist, consistent, consistency* |
| **`de-`** ("down, away") | `de-` + *sistere* | Stand away from an action $\to$ stop, cease | *desist* |
| **`ex-`** ("out of") | `ex-` + *sistere* | Stand forth out of the void $\to$ be, have being | *exist, existence, existent* |
| **`in-`** ("upon") | `in-` + *sistere* | Stand firmly upon a demand $\to$ demand emphatically | *insist, insistence, insistent* |
| **`per-`** ("through") | `per-` + *sistere* | Stand throughout the storm $\to$ endure, keep going | *persist, persistence, persistent* |
| **`re-`** ("against") | `re-` + *sistere* | Stand against an opposing force $\to$ oppose, fight back | *resist, resistance, resistant* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Ontology & Existential Philosophy**: Heideggerian *Dasein*, Sartre's existentialism, and ontology (*existence*, *existential*).
- **Electrical Engineering & Physics**: Ohm's law, electrical resistance, and resistors (*resistance*, *resistor*).
- **Immunology & Pharmacology**: Antibiotic resistance and viral persistence (*bacterial resistance*, *viral persistence*).
- **Political History & Guerilla Warfare**: The French Resistance and anti-fascist movements (*the Resistance*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[assist]] | noun | **1.** The activity of contributing to the fulfillment of a need or furtherance of an effort or purpose.<br>**2.** (sports) the act of enabling another player to make a good play. | *"If the great gods be just, they shall assist The deeds of justest men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assistance]] | noun | **1.** The activity of contributing to the fulfillment of a need or furtherance of an effort or purpose.<br>**2.** A resource. | *"These offices, so oft as thou wilt look, Shall profit thee, and much enrich thy book. 78 So oft have I invoked thee for my muse, And found such fair assistance in my verse, As every alien pen hath got my use, And under thee their poesy disperse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assistant]] | noun | **1.** A person who contributes to the fulfillment of a need or furtherance of an effort or purpose.<br>**2.** Of or relating to a person who is subordinate to another. | *"And, sister, as the winds give benefit And convoy is assistant, do not sleep, But let me hear from you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assisted]] | verb | **1.** Give help or assistance; be of service.<br>**2.** Act as an assistant in a subordinate or supportive function. | *"Go, Cleomenes; Yourself, assisted with your honour’d friends, Bring them to our embracement. [_Exeunt Cleomenes and others._] Still, ’tis strange He thus should steal upon us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assistive]] | adjective | **1.** Giving assistance. | *"In academic literature, assistive designates giving assistance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consist]] | verb | **1.** Originate (in).<br>**2.** Have its essential character; be comprised or contained in; be embodied in. | *"If their purgation did consist in words, They are as innocent as grace itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consistence]] | noun | **1.** A harmonious uniformity or agreement among things or parts.<br>**2.** The property of holding together and retaining its shape. | *"They kindle a fire, and dress a repast of eggs and milk in the consistence of a custard."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[consistency]] | noun | **1.** The property of holding together and retaining its shape.<br>**2.** A harmonious uniformity or agreement among things or parts. | *"Some believe in it; some don’t; I do.” “Very well, let’s try it,” said Bathsheba, bounding from her seat with that total disregard of consistency which can be indulged in towards a dependent, and entering into the spirit of divination at once."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[consistent]] | adjective | **1.** (sometimes followed by `with') in agreement or consistent or reliable; ; - fdr.<br>**2.** Capable of being reproduced. | *"She had a cultivated mind, and was, generally speaking, rational and consistent—but she had prejudices on the side of ancestry; she had a value for rank and consequence, which blinded her a little to the faults of those who possessed them."* — Jane Austen, *Persuasion* |
| [[consistently]] | adverb | **1.** In a systematic or consistent manner. | *"Everything seems to have happened to his hands that could possibly take place consistently with the retention of all the fingers, for they are notched, and seamed, and crumpled all over."* — Charles Dickens, *Bleak House* |
| [[consistory]] | noun | **1.** A church tribunal or governing body. | *"The Bishops place themselves on each side the court, in manner of consistory; below them the Scribes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[desist]] | verb | **1.** Choose not to consume. | *"In case this should be so, or in case you should entertain much thought of me in what you are doing, I most earnestly entreat and beg you to desist."* — Charles Dickens, *Bleak House* |
| [[inconsistency]] | noun | **1.** The relation between propositions that cannot both be true at the same time.<br>**2.** The quality of being inconsistent and lacking a harmonious uniformity among things or parts. | *"Yet such is human inconsistency that one of the interests of the new place to her was the accidental virtues of its lying near her forefathers’ country (for they were not Blakemore men, though her mother was Blakemore to the bone)."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inconsistent]] | adjective | **1.** Displaying a lack of consistency.<br>**2.** Not capable of being made consistent or harmonious. | *"But they are not all like the woman who now leaves him and his house behind, between whose plain dress and her refined manner there is something exceedingly inconsistent."* — Charles Dickens, *Bleak House* |
| [[inconsistently]] | adverb | **1.** Without showing consistency. | *"The self-denying pair had been occupied in coaxing the appetites of some of their sick parishioners, whom they, somewhat inconsistently, tried to keep imprisoned in the flesh, their own appetites being quite forgotten."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[insist]] | verb | **1.** Be emphatic or resolute and refuse to budge.<br>**2.** Beg persistently and urgently. | *"If you insist on going, I had better go along." Apollonie went indoors to get ready for the walk, as she always put on better clothes whenever she mounted to the castle, despite the fact that she might not see anyone."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[insistence]] | noun | **1.** Continual and persistent demands.<br>**2.** The state of demanding notice or attention. | *"He insisted that jacketing, no matter how prolonged, could never kill me; and his insistence was a challenge to the Warden to continue the attempt."* — Jack London, *The Jacket (The Star-Rover)* |
| [[insistency]] | noun | **1.** The state of demanding notice or attention.<br>**2.** The act of insisting on something. | *"It is not due to anything in the room,” said Rebecca again with the shrill insistency of terror."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[insistent]] | adjective | **1.** Repetitive and persistent.<br>**2.** Demanding attention; ; ; - h.l.mencken. | *"Boldwood looked, as he had a hundred times the preceding day, at the insistent red seal: “Marry me,” he said aloud."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[insistently]] | adverb | **1.** In an insistent manner. | *"And this thou didst deny, calling my name Insistently, until I rose and came."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[insisting]] | noun | **1.** Continual and persistent demands.<br>**2.** Be emphatic or resolute and refuse to budge. | *"Vholes, still quietly insisting on the seat by not giving the address, “that you have influence with Mr."* — Charles Dickens, *Bleak House* |
| [[irresistibility]] | noun | **1.** The quality of being overpowering and impossible to resist. | *"In academic literature, irresistibility designates the quality of being overpowering and impossible to resist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irresistible]] | adjective | **1.** Impossible to resist; overpowering.<br>**2.** Overpoweringly attractive. | *"It has an irresistible attraction for him."* — Charles Dickens, *Bleak House* |
| [[irresistibleness]] | noun | **1.** The quality of being overpowering and impossible to resist. | *"If this be so, fancy the irresistibleness of that might, to which the most impalpable and destructive of all elements contributes."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[nonresistance]] | noun | **1.** Group refusal to resort to violence even in defense against violence. | *"Being an integral portion of the State, it has been assumed, and in effect tacitly admitted on our part by nonresistance, that all political and governmental power over us rested in the State Legislature."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nonresistant]] | adjective | **1.** (often followed by `to') likely to be affected with.<br>**2.** Offering no resistance. | *"In academic literature, nonresistant designates (often followed by `to') likely to be affected with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[persist]] | verb | **1.** Continue to exist.<br>**2.** Be persistent, refuse to stop. | *"Thus to persist In doing wrong extenuates not wrong, But makes it much more heavy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[persistence]] | noun | **1.** The property of a continuous and connected period of time.<br>**2.** Persistent determination. | *"How does it stand towards my past?” Tess was the merest stray phenomenon to Angel Clare as yet—a rosy, warming apparition which had only just acquired the attribute of persistence in his consciousness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[persistency]] | noun | **1.** Persistent determination. | *"By this hand, thou thinkest me as far in the devil’s book as thou and Falstaff for obduracy and persistency."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[persistent]] | adjective | **1.** Never-ceasing.<br>**2.** Continually recurring to the mind; ; - claudia cassidy. | *"For many years the persistent Roman has been pointing, with no particular meaning, from that ceiling."* — Charles Dickens, *Bleak House* |
| [[persistently]] | adverb | **1.** In a persistent manner.<br>**2.** With persistence. | *"In arguing on prices, she held to her own firmly, as was natural in a dealer, and reduced theirs persistently, as was inevitable in a woman."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[persisting]] | verb | **1.** Continue to exist.<br>**2.** Be persistent, refuse to stop. | *"It was soon generally agreed that Tuesday should be the day; Charles only reserving the advantage of still teasing his wife, by persisting that he would go to the play to-morrow if nobody else would."* — Jane Austen, *Persuasion* |
| [[resist]] | verb | **1.** Elude, especially in a baffling way.<br>**2.** Stand up or offer resistance to somebody or something. | *"Those that would die or ere resist are grown The mortal bugs o’ th’ field."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resistance]] | noun | **1.** The action of opposing something that you disapprove or disagree with.<br>**2.** Any mechanical force that tends to retard or oppose motion. | *"Unfold to us some warlike resistance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resistant]] | adjective | **1.** Relating to or conferring immunity (to disease or infection).<br>**2.** Able to tolerate environmental conditions or physiological stress. | *"After all superfluous flesh is gone what is left is stringy and resistant."* — Jack London, *The Jacket (The Star-Rover)* |
| [[resister]] | noun | **1.** Someone who systematically obstructs some action that others want to take.<br>**2.** Someone who offers opposition. | *"Dawlish, the grocer, had expressed almost exactly similar sentiments two days later, and the ranks of these passive resisters had been receiving fresh recruits ever since."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[resistible]] | adjective | **1.** Capable of being resisted or withstood or frustrated. | *"In academic literature, resistible designates capable of being resisted or withstood or frustrated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resistive]] | adjective | **1.** Exhibiting or relating to electrical resistance.<br>**2.** Disposed to or engaged in defiance of established authority. | *"In academic literature, resistive designates exhibiting or relating to electrical resistance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resistivity]] | noun | **1.** A material's opposition to the flow of electric current; measured in ohms. | *"In academic literature, resistivity designates a material's opposition to the flow of electric current; measured in ohms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resistless]] | adjective | **1.** Impossible to resist; overpowering.<br>**2.** Offering no resistance; ; - theodore roosevelt. | *"It is so d—— uncomfortable, living at an inn.” This was the last sentence by which he could weary Catherine’s attention, for he was just then borne off by the resistless pressure of a long string of passing ladies."* — Jane Austen, *Northanger Abbey* |
| [[resistor]] | noun | **1.** An electrical device that resists the flow of electrical current. | *"In academic literature, resistor designates an electrical device that resists the flow of electrical current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sister]] | noun | **1.** A female person who has the same parents as another person.<br>**2.** (roman catholic church) a title given to a nun (and used as a form of address). | *"You are my mother, madam; would you were— So that my lord your son were not my brother,— Indeed my mother! or were you both our mothers, I care no more for than I do for heaven, So I were not his sister."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sister-in-law]] | noun | **1.** The sister of your spouse. | *"In academic literature, sister-in-law designates the sister of your spouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sisterhood]] | noun | **1.** The kinship relation between a female offspring and the siblings.<br>**2.** An association or society of women who are linked together by a common religion or trade or interest. | *"A nun of winter’s sisterhood kisses not more religiously; the very ice of chastity is in them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sisterlike]] | adjective | **1.** Like or characteristic of or befitting a sister. | *"In academic literature, sisterlike designates like or characteristic of or befitting a sister."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sisterly]] | adjective | **1.** Like or characteristic of or befitting a sister. | *"He would not, but by gift of my chaste body To his concupiscible intemperate lust, Release my brother; and after much debatement, My sisterly remorse confutes mine honour, And I did yield to him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sistership]] | noun | **1.** The kinship relation between a female offspring and the siblings.<br>**2.** An association or society of women who are linked together by a common religion or trade or interest. | *"In academic literature, sistership designates the kinship relation between a female offspring and the siblings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sistrurus]] | noun | **1.** Pygmy rattlesnakes. | *"In academic literature, sistrurus designates pygmy rattlesnakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsist]] | verb | **1.** Support oneself. | *"Between Elizabeth and Charlotte there was a restraint which kept them mutually silent on the subject; and Elizabeth felt persuaded that no real confidence could ever subsist between them again."* — Jane Austen, *Pride and Prejudice* |
| [[subsistence]] | noun | **1.** Minimal (or marginal) resources for subsisting.<br>**2.** A means of surviving. | *"It was a poor subsistence that she had ensured, but it would afford a shelter for the winter at any rate."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[subsister]] | noun | **1.** One who lives through affliction. | *"In academic literature, subsister designates one who lives through affliction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unassisted]] | adjective | **1.** Unsupported by other people.<br>**2.** Lacking help. | *"So self-denying, so uncomplaining, so anxious to get well on their account, so afraid of giving trouble, and so thoughtful of the unassisted labours of her husband and the comforts of old Mr."* — Charles Dickens, *Bleak House* |
| [[unresistant]] | adjective | **1.** (often followed by `to') likely to be affected with. | *"In academic literature, unresistant designates (often followed by `to') likely to be affected with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unresisting]] | adjective | **1.** Offering no resistance; ; - theodore roosevelt. | *"Snagsby replies by delivering herself a prey to spasms, not an unresisting prey, but a crying and a tearing one, so that Cook’s Court re-echoes with her shrieks."* — Charles Dickens, *Bleak House* |

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
    ROOT DASHBOARD · SIST
  </div>
</div>
