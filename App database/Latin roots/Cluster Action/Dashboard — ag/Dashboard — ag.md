---
status: unread
type: root_dashboard
---
# Dashboard — ag
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ag-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to drive, do, or act”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands actively pushing a lever or carrying out purposeful work.</span>
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

The root **ag** means to drive, do, or act. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *agenda*, *agent*, *agency*, and *agitate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to drive, do, or act
> The root **ag** means to drive, do, or act. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *agenda*, *agent*, *agency*, and *agitate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To drive, do, or act</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *agenda* and *agent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ag** comes from a Latin word that means *"to drive, do, or act"*.
  - At its core, it describes the action of drive, do, or act.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **ag** in an English word, think of **to drive, do, or act**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to drive, do, or act).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Agenda**: A list of items of business to be considered or transacted at a meeting.
  - **Agent**: A person or entity authorized to act on behalf of another.
  - **Agency**: The capacity, condition, or state of acting or exerting power.
  - **Agitate**: To stir up, disturb, or shake briskly.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ag</mark>, think of <mark class="hl-def">to drive, do, or act</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `ag-` (< Latin *agere*): Base present verbal stem.
  - `agit-` (< Latin *agitāre*): Frequentative stem denoting iterative or intense driving.
  - `-ig-` (compounded vowel-reduction form of *agere*): *co-agulate* (*co-* + *agere*), *ex-igent* (*ex-* + *agere*).
- **Prefix & Combining Machinery**:
  - `co-` ("together"): *coagulate, coagulation* (< *co-agere*, "to drive together").
  - `ex-` ("out, thoroughly"): *exigent, exigency* (< *ex-igere*, "to drive out, demand").
  - `prod-` ("forth, away"): *prodigal* (< *prod-igere*, "to drive forth, squander").

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
                      ┌── Governance & Mandate: agenda, agent, agency, agential
                      │
    [ag] ─────────────┼── Kinetic Speed & Nimbleness: agile, agility
(To drive, conduct)   │
                      ├── Turbulence & Shaking: agitate, agitation, agitator
                      │
                      └── Fluid Dynamics & Urgency: coagulate, exigent, prodigal
```

---

## 🔀 4. Prefix & Combining Dynamics on ag
- **`co-` + `ag-` + `-ulate`**: *coagulate* — to drive disparate liquid particles together into a solid gel or clot.
- **`ex-` + `ig-` + `-ent`**: *exigent* — driving forth with pressing, unavoidable urgency.
- **`prod-` + `ig-` + `-al`**: *prodigal* — driving one's substance forth into wasteful dispersion.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Corporate Governance & Management**: Executive *agendas*; fiduciary *agency*; principal-*agent* dynamics.
- **Hematology & Vascular Medicine**: Blood *coagulation* cascades; factor VIII *coagulants*; deep vein thrombosis.
- **Political Science & Social Movements**: Labor *agitators*; political *agitation*; revolutionary change agents.
- **Athletic Kinesiology & Robotics**: Neuromuscular *agility*; multi-directional obstacle courses; *agile* manufacturing.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ag]] | noun | **1.** A soft white precious univalent metallic element having the highest electrical and thermal conductivity of any metal; occurs in argentite and in free form; used in coins and jewelry and tableware and photography. | *"COMINIUS. [_to Sicinius_.] Aged sir, hands off."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[agency]] | noun | **1.** An administrative unit of government.<br>**2.** A business that serves other businesses. | *"I would not have you think that I am overlooking the Divine agency in what has befallen me."* — John Cairns, *Principal Cairns* |
| [[agenda]] | noun | **1.** A temporally organized plan for matters to be attended to.<br>**2.** A list of matters to be taken up (as at a meeting). | *"Agenda: to instruct the Correspondent to requisition a new scrubbing brush for the Infants' School."* — Anthony Pryde, *Nightfall* |
| [[agent]] | noun | **1.** An active and efficient cause; capable of producing a certain effect.<br>**2.** A representative who acts on behalf of other persons or organizations. | *"Think on my words. [_Exit Pisanio._] A sly and constant knave, Not to be shak’d; the agent for his master, And the remembrancer of her to hold The hand-fast to her lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[agential]] | adjective | **1.** Of or relating to an agent or agency. | *"In academic literature, agential designates of or relating to an agent or agency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agitate]] | verb | **1.** Try to stir up public opinion.<br>**2.** Cause to be agitated, excited, or roused. | *"It won’t much agitate Ma; I am only pen and ink to HER."* — Charles Dickens, *Bleak House* |
| [[agitated]] | verb | **1.** Try to stir up public opinion.<br>**2.** Cause to be agitated, excited, or roused. | *"Well, I shall get some to-morrow," he said, quite agitated."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[agitating]] | verb | **1.** Try to stir up public opinion.<br>**2.** Cause to be agitated, excited, or roused. | *"In the middle of this agitating scene Mäzli arrived, perfectly happy and filled with her recent experiences."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[agitative]] | adjective | **1.** Causing or tending to cause anger or resentment. | *"In academic literature, agitative designates causing or tending to cause anger or resentment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agitator]] | noun | **1.** One who agitates; a political troublemaker. | *"On this issue an agitator and preacher named Kalloch was elected Mayor."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[agrarian]] | adjective | **1.** Relating to rural matters. | *"O’Brien and others, the agrarian policy of Michael Davitt, the constitutional agitation of Charles Stewart Parnell (M."* — James Joyce, *Ulysses* |
| [[agricultural]] | adjective | **1.** Relating to or used in or promoting agriculture or farming.<br>**2.** Relating to rural matters. | *"The young barons left the castle in order to attend a university in Germany, and Philip also left for an agricultural school."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[agriculture]] | noun | **1.** A large-scale farming enterprise.<br>**2.** The practice of cultivating the land or raising stock. | *"The long strap which ran from the driving-wheel of his engine to the red thresher under the rick was the sole tie-line between agriculture and him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[agriculturist]] | noun | **1.** Someone concerned with the science or art or business of cultivating the soil. | *"In contemplating Bathsheba as a woman, he had forgotten the accidents of her position as an agriculturist—that being as much of a farmer, and as extensive a farmer, as himself, her probable whereabouts was out-of-doors at this time of the year."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[antagonise]] | verb | **1.** Act in opposition to.<br>**2.** Provoke the hostility of. | *"In academic literature, antagonise designates act in opposition to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antagonism]] | noun | **1.** A state of deep-seated ill-will.<br>**2.** The relation between opposing principles or forces or factors. | *"Feeling herself in antagonism, she was quite in accord."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[antagonist]] | noun | **1.** Someone who offers opposition.<br>**2.** A muscle that relaxes while another contracts. | *"As little does he think how near together he and his antagonist have suffered in the fortunes of two sisters, and his antagonist, who knows it now, is not the man to tell him."* — Charles Dickens, *Bleak House* |
| [[antagonistic]] | adjective | **1.** Indicating opposition or resistance.<br>**2.** Characterized by antagonism or antipathy. | *"Whether from a purely mechanical, or from any other cause, when Bathsheba arose it was with a quieted spirit, and a regret for the antagonistic instincts which had seized upon her just before."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[antagonize]] | verb | **1.** Provoke the hostility of.<br>**2.** Act in opposition to. | *"These pioneers, in their contact with the members of divers creeds, races and nations, covering a range which offers no parallel in either the north or south continents, must neither antagonize them nor compromise with their own essential principles."* — Effendi Shoghi, *Citadel of Faith* |
| [[anticoagulant]] | noun | **1.** Medicine that prevents or retards the clotting of blood. | *"In academic literature, anticoagulant designates medicine that prevents or retards the clotting of blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticoagulation]] | noun | **1.** The administration of an anticoagulant drug to retard coagulation of the blood. | *"In academic literature, anticoagulation designates the administration of an anticoagulant drug to retard coagulation of the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coagulable]] | adjective | **1.** Capable of coagulating and becoming thick. | *"In academic literature, coagulable designates capable of coagulating and becoming thick."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coagulant]] | noun | **1.** An agent that produces coagulation. | *"In academic literature, coagulant designates an agent that produces coagulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coagulate]] | verb | **1.** Change from a liquid to a thickened or solid state.<br>**2.** Cause to change from a liquid to a solid or thickened state. | *"Roasted in wrath and fire, And thus o’ersized with coagulate gore, With eyes like carbuncles, the hellish Pyrrhus Old grandsire Priam seeks._ So, proceed you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coagulated]] | verb | **1.** Change from a liquid to a thickened or solid state.<br>**2.** Cause to change from a liquid to a solid or thickened state. | *"After his blood has coagulated in the sun, it is burned along with the frontal bone, the flesh attached to it, and the brain; the ashes are then scattered over the ground to fertilise it."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[coagulation]] | noun | **1.** The process of forming semisolid lumps in a liquid. | *"The huge pool of blood in front of her was already assuming the iridescence of coagulation; and when the sun rose a hundred prismatic hues were reflected from it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[coagulator]] | noun | **1.** An agent that produces coagulation. | *"In academic literature, coagulator designates an agent that produces coagulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coagulum]] | noun | **1.** A lump of material formed from the content of a liquid. | *"In academic literature, coagulum designates a lump of material formed from the content of a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoagulant]] | noun | **1.** Medicine that prevents or retards the clotting of blood. | *"In academic literature, decoagulant designates medicine that prevents or retards the clotting of blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magniloquence]] | noun | **1.** High-flown style; excessive use of verbal ornamentation. | *"In academic literature, magniloquence designates high-flown style; excessive use of verbal ornamentation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magniloquent]] | adjective | **1.** Lofty in style. | *"In academic literature, magniloquent designates lofty in style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magniloquently]] | adverb | **1.** In a rhetorically grandiloquent manner. | *"In academic literature, magniloquently designates in a rhetorically grandiloquent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octagonal]] | adjective | **1.** Of or relating to or shaped like an octagon. | *"From the middle of the building an ugly flat-topped octagonal tower ascended against the east horizon, and viewed from this spot, on its shady side and against the light, it seemed the one blot on the city’s beauty."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[reagent]] | noun | **1.** A chemical agent for use in chemical reactions. | *"He affirmed his significance as a conscious rational animal proceeding syllogistically from the known to the unknown and a conscious rational reagent between a micro and a macrocosm ineluctably constructed upon the incertitude of the void."* — James Joyce, *Ulysses* |
| [[septuagenarian]] | noun | **1.** Someone whose age is in the seventies. | *"In academic literature, septuagenarian designates someone whose age is in the seventies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexagenarian]] | noun | **1.** Someone whose age is in the sixties.<br>**2.** Being from 60 to 69 years old. | *"In academic literature, sexagenarian designates someone whose age is in the sixties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unagitated]] | adjective | **1.** Not physically disturbed or set in motion.<br>**2.** Not agitated or disturbed emotionally. | *"In academic literature, unagitated designates not physically disturbed or set in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AG
  </div>
</div>
