---
status: unread
type: root_dashboard
---
# Dashboard — act
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">act-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to drive, do, or act”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Pushing a cart forward or stepping onto a stage to make things happen.</span>
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

The root **act** means to drive, do, or act. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *action*, *activate*, *actor*, and *active*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to drive, do, or act
> The root **act** means to drive, do, or act. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *action*, *activate*, *actor*, and *active*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To drive, do, or act</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Pushing a cart forward or stepping onto a stage to make things happen.</mark>
> - **Everyday Connection**: Think of familiar words like *action* and *activate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **act** comes from a Latin word that means *"to drive, do, or act"*.
  - At its core, it describes the action of drive, do, or act.

- **The Big Picture Idea**:
  - Picture pushing a cart forward or stepping onto a stage to make things happen.
  - Whenever you see **act** in an English word, think of **doing something and setting things in motion**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to drive, do, or act).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Action**: An everyday English word showing the root's idea of *to drive, do, or act*.
  - **Activate**: To make operative, active, or functional.
  - **Actor**: A person who portrays a character in a dramatic production on stage, film, or television.
  - **Active**: Engaged in action, energetic movement, or practical operation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">act</mark>, think of <mark class="hl-def">doing something and setting things in motion</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `act-` (< Latin *āctum*, supine/participial stem of *agere*): Productive base for nouns of action, agent nouns, and adjectives.
- **Prefix & Combining Machinery**:
  - `counter-` ("against"): *counteract, counteraction*.
  - `de-` ("down, removal"): *deactivate, deactivation*.
  - `en-` ("into"): *enact, enactment*.
  - `inter-` ("between, mutual"): *interact, interaction, interactive*.
  - `pro-` ("forward, before"): *proactive*.
  - `re-` ("back, again"): *react, reaction, reactive*.
  - `trans-` ("across, through"): *transact, transaction*.

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
                      ┌── Civic & Legal: act, actionable, enactment, actuary
                      │
   [act] ─────────────┼── Theatrical & Performative: actor, actress, acting
  (To drive, do)      │
                      ├── Mechanical & Scientific: actin, activate, actuator, deactivate
                      │
                      └── Dynamic Interaction: interact, counteract, proactive, react
```

---

## 🔀 4. Prefix & Combining Dynamics on act
- **`en-` + `act`**: *enactment* — the formal passage of a statutory bill into legal effect.
- **`counter-` + `act`**: *counteract* — to apply a contrary force to neutralize an effect.
- **`inter-` + `act`**: *interact* — to drive mutual action between two or more parties.
- **`pro-` + `act` + `-ive`**: *proactive* — anticipating future events by taking decisive initiative.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Statutory Law**: Legislative *enactments*; *actionable* tort claims; *acta* of government.
- **Actuarial Science & Insurance**: *Actuaries* calculating mortality tables, annuities, and catastrophic loss risk.
- **Robotics & Mechatronics**: Linear and rotary *actuators* translating electronic control signals into mechanical force.
- **Cell Biology & Biochemistry**: Microfilament *actin* dynamics in cytoskeletal motility and cytokinesis.
- **Dramaturgy & Cinema**: Method *actors* executing five-*act* classical dramatic structures.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word                      | POS       | Authoritative Definitions                                                                                                                                                                                                                                                                      | Authentic Illustrative Sentence                                                                                                    |
| :------------------------ | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [[abactinal]]             | adjective | **1.** (of radiate animals) located on the surface or end opposite to that on which the mouth is situated.                                                                                                                                                                                     | *"The treatise offered an incisive discussion of abactinal, examining its conceptual origins in classical antiquity."*             |
| [[abreact]]               | verb      | **1.** Discharge bad feelings or tension through verbalization.                                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of abreact, examining its conceptual origins in classical antiquity."*               |
| [[abreaction]]            | noun      | **1.** (psychoanalysis) purging of emotional tensions.                                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of abreaction, examining its conceptual origins in classical antiquity."*            |
| [[act]]                   | noun      | **1.** A legal document codifying the result of deliberations of a committee or society or legislative body.<br>**2.** Something that people do or cause to happen.                                                                                                                            | *"The treatise offered an incisive discussion of act, examining its conceptual origins in classical antiquity."*                   |
| [[actable]]               | adjective | **1.** Capable of being acted; suitable for the stage.                                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of actable, examining its conceptual origins in classical antiquity."*               |
| [[action]]                | noun      | **1.** Something done (usually as opposed to something said).<br>**2.** The state of being active.                                                                                                                                                                                             | *"The treatise offered an incisive discussion of action, examining its conceptual origins in classical antiquity."*                |
| [[actionable]]            | adjective | **1.** Affording grounds for legal action.                                                                                                                                                                                                                                                     | *"The treatise offered an incisive discussion of actionable, examining its conceptual origins in classical antiquity."*            |
| [[actitis]]               | noun      | **1.** A genus of scolopacidae.                                                                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of actitis, examining its conceptual origins in classical antiquity."*               |
| [[actium]]                | noun      | **1.** An ancient town on a promontory in western greece.<br>**2.** The naval battle in which antony and cleopatra were defeated by octavian's fleet under agrippa in 31 bc.                                                                                                                   | *"The treatise offered an incisive discussion of actium, examining its conceptual origins in classical antiquity."*                |
| [[activase]]              | noun      | **1.** A thrombolytic agent (trade name activase) that causes fibrinolysis at the site of a blood clot; used in treating acute myocardial infarction.                                                                                                                                          | *"The treatise offered an incisive discussion of activase, examining its conceptual origins in classical antiquity."*              |
| [[activate]]              | verb      | **1.** Put in motion or move to act.<br>**2.** Make active or more active.                                                                                                                                                                                                                     | *"The treatise offered an incisive discussion of activate, examining its conceptual origins in classical antiquity."*              |
| [[activated]]             | verb      | **1.** Put in motion or move to act.<br>**2.** Make active or more active.                                                                                                                                                                                                                     | *"The treatise offered an incisive discussion of activated, examining its conceptual origins in classical antiquity."*             |
| [[activating]]            | noun      | **1.** The activity of causing to have energy and be active.<br>**2.** Put in motion or move to act.                                                                                                                                                                                           | *"The treatise offered an incisive discussion of activating, examining its conceptual origins in classical antiquity."*            |
| [[activation]]            | noun      | **1.** Stimulation of activity in an organism or chemical.<br>**2.** The activity of causing to have energy and be active.                                                                                                                                                                     | *"The treatise offered an incisive discussion of activation, examining its conceptual origins in classical antiquity."*            |
| [[activator]]             | noun      | **1.** (biology) any agency bringing about activation; a molecule that increases the activity of an enzyme or a protein that increases the production of a gene product in dna transcription.                                                                                                  | *"The treatise offered an incisive discussion of activator, examining its conceptual origins in classical antiquity."*             |
| [[active]]                | noun      | **1.** Chemical agent capable of activity.<br>**2.** The voice used to indicate that the grammatical subject of the verb is performing the action or causing the happening denoted by the verb.                                                                                                | *"The treatise offered an incisive discussion of active, examining its conceptual origins in classical antiquity."*                |
| [[actively]]              | adverb    | **1.** In an active manner.                                                                                                                                                                                                                                                                    | *"The treatise offered an incisive discussion of actively, examining its conceptual origins in classical antiquity."*              |
| [[activeness]]            | noun      | **1.** The state of being active.<br>**2.** The trait of being active; moving or acting rapidly and energetically.                                                                                                                                                                             | *"The treatise offered an incisive discussion of activeness, examining its conceptual origins in classical antiquity."*            |
| [[activewear]]            | noun      | **1.** Attire worn for sport or for casual wear.                                                                                                                                                                                                                                               | *"The treatise offered an incisive discussion of activewear, examining its conceptual origins in classical antiquity."*            |
| [[activism]]              | noun      | **1.** A policy of taking direct and militant action to achieve a political or social goal.                                                                                                                                                                                                    | *"The treatise offered an incisive discussion of activism, examining its conceptual origins in classical antiquity."*              |
| [[activist]]              | noun      | **1.** A militant reformer.<br>**2.** Advocating or engaged in activism.                                                                                                                                                                                                                       | *"The treatise offered an incisive discussion of activist, examining its conceptual origins in classical antiquity."*              |
| [[activistic]]            | adjective | **1.** Advocating or engaged in activism.                                                                                                                                                                                                                                                      | *"The treatise offered an incisive discussion of activistic, examining its conceptual origins in classical antiquity."*            |
| [[activity]]              | noun      | **1.** Any specific behavior.<br>**2.** The state of being active.                                                                                                                                                                                                                             | *"The treatise offered an incisive discussion of activity, examining its conceptual origins in classical antiquity."*              |
| [[actomyosin]]            | noun      | **1.** A protein complex in muscle fibers; composed of myosin and actin; shortens when stimulated and causes muscle contractions.                                                                                                                                                              | *"The treatise offered an incisive discussion of actomyosin, examining its conceptual origins in classical antiquity."*            |
| [[actor]]                 | noun      | **1.** A theatrical performer.<br>**2.** A person who acts and gets things done.                                                                                                                                                                                                               | *"The treatise offered an incisive discussion of actor, examining its conceptual origins in classical antiquity."*                 |
| [[actress]]               | noun      | **1.** A female actor.                                                                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of actress, examining its conceptual origins in classical antiquity."*               |
| [[acts]]                  | noun      | **1.** A new testament book describing the development of the early church from christ's ascension to paul's sojourn at rome.<br>**2.** A legal document codifying the result of deliberations of a committee or society or legislative body.                                                  | *"The treatise offered an incisive discussion of acts, examining its conceptual origins in classical antiquity."*                  |
| [[actual]]                | adjective | **1.** Presently existing in fact and not merely potential or possible.<br>**2.** Taking place in reality; not pretended or imitated.                                                                                                                                                          | *"The treatise offered an incisive discussion of actual, examining its conceptual origins in classical antiquity."*                |
| [[actualisation]]         | noun      | **1.** Making real or giving the appearance of reality.                                                                                                                                                                                                                                        | *"The treatise offered an incisive discussion of actualisation, examining its conceptual origins in classical antiquity."*         |
| [[actualise]]             | verb      | **1.** Make real or concrete; give reality or substance to.<br>**2.** Represent or describe realistically.                                                                                                                                                                                     | *"The treatise offered an incisive discussion of actualise, examining its conceptual origins in classical antiquity."*             |
| [[actuality]]             | noun      | **1.** The state of actually existing objectively.                                                                                                                                                                                                                                             | *"The treatise offered an incisive discussion of actuality, examining its conceptual origins in classical antiquity."*             |
| [[actualization]]         | noun      | **1.** Making real or giving the appearance of reality.                                                                                                                                                                                                                                        | *"The treatise offered an incisive discussion of actualization, examining its conceptual origins in classical antiquity."*         |
| [[actualize]]             | verb      | **1.** Make real or concrete; give reality or substance to.<br>**2.** Represent or describe realistically.                                                                                                                                                                                     | *"The treatise offered an incisive discussion of actualize, examining its conceptual origins in classical antiquity."*             |
| [[actually]]              | adverb    | **1.** In actual fact.<br>**2.** Used to imply that one would expect the fact to be the opposite of that stated; surprisingly.                                                                                                                                                                 | *"The treatise offered an incisive discussion of actually, examining its conceptual origins in classical antiquity."*              |
| [[actuarial]]             | adjective | **1.** Of or relating to the work of an actuary.                                                                                                                                                                                                                                               | *"The treatise offered an incisive discussion of actuarial, examining its conceptual origins in classical antiquity."*             |
| [[actuary]]               | noun      | **1.** Someone versed in the collection and interpretation of numerical data (especially someone who uses statistics to calculate insurance premiums).                                                                                                                                         | *"The treatise offered an incisive discussion of actuary, examining its conceptual origins in classical antiquity."*               |
| [[actuate]]               | verb      | **1.** Put in motion or move to act.<br>**2.** Give an incentive for action.                                                                                                                                                                                                                   | *"The treatise offered an incisive discussion of actuate, examining its conceptual origins in classical antiquity."*               |
| [[actuated]]              | verb      | **1.** Put in motion or move to act.<br>**2.** Give an incentive for action.                                                                                                                                                                                                                   | *"The treatise offered an incisive discussion of actuated, examining its conceptual origins in classical antiquity."*              |
| [[actuating]]             | verb      | **1.** Put in motion or move to act.<br>**2.** Give an incentive for action.                                                                                                                                                                                                                   | *"The treatise offered an incisive discussion of actuating, examining its conceptual origins in classical antiquity."*             |
| [[actuation]]             | noun      | **1.** The act of propelling.                                                                                                                                                                                                                                                                  | *"The treatise offered an incisive discussion of actuation, examining its conceptual origins in classical antiquity."*             |
| [[actuator]]              | noun      | **1.** A mechanism that puts something into automatic action.                                                                                                                                                                                                                                  | *"The treatise offered an incisive discussion of actuator, examining its conceptual origins in classical antiquity."*              |
| [[adactylia]]             | noun      | **1.** Congenital absence of fingers and/or toes.                                                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of adactylia, examining its conceptual origins in classical antiquity."*             |
| [[adactylism]]            | noun      | **1.** Congenital absence of fingers and/or toes.                                                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of adactylism, examining its conceptual origins in classical antiquity."*            |
| [[adactylous]]            | adjective | **1.** Without fingers and/or toes.                                                                                                                                                                                                                                                            | *"The treatise offered an incisive discussion of adactylous, examining its conceptual origins in classical antiquity."*            |
| [[adactyly]]              | noun      | **1.** Congenital absence of fingers and/or toes.                                                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of adactyly, examining its conceptual origins in classical antiquity."*              |
| [[antibacterial]]         | noun      | **1.** Any drug that destroys bacteria or inhibits their growth.<br>**2.** Destroying bacteria or inhibiting their growth.                                                                                                                                                                     | *"The treatise offered an incisive discussion of antibacterial, examining its conceptual origins in classical antiquity."*         |
| [[antihemophilic factor]] | noun      | **1.** Pertaining to, derived from, or characteristic of Latin act within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of act in systematic terminology.                                                                                          | *"The treatise offered an incisive discussion of antihemophilic factor, examining its conceptual origins in classical antiquity."* |
| [[atactic]]               | adjective | **1.** Lacking motor coordination; marked or caused by ataxia.                                                                                                                                                                                                                                 | *"The treatise offered an incisive discussion of atactic, examining its conceptual origins in classical antiquity."*               |
| [[coact]]                 | verb      | **1.** Act together, as of organisms.                                                                                                                                                                                                                                                          | *"The treatise offered an incisive discussion of coact, examining its conceptual origins in classical antiquity."*                 |
| [[coaction]]              | noun      | **1.** Act of working jointly.                                                                                                                                                                                                                                                                 | *"The treatise offered an incisive discussion of coaction, examining its conceptual origins in classical antiquity."*              |
| [[counteract]]            | verb      | **1.** Act in opposition to.<br>**2.** Oppose or check by a counteraction.                                                                                                                                                                                                                     | *"The treatise offered an incisive discussion of counteract, examining its conceptual origins in classical antiquity."*            |
| [[counteraction]]         | noun      | **1.** Action intended to nullify the effects of some previous action.                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of counteraction, examining its conceptual origins in classical antiquity."*         |
| [[counteractive]]         | adjective | **1.** Opposing or neutralizing or mitigating an effect by contrary action.                                                                                                                                                                                                                    | *"The treatise offered an incisive discussion of counteractive, examining its conceptual origins in classical antiquity."*         |
| [[counteractively]]       | adverb    | **1.** In a counteractive manner.                                                                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of counteractively, examining its conceptual origins in classical antiquity."*       |
| [[deactivate]]            | verb      | **1.** Remove from active military status or reassign.<br>**2.** Make inactive.                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of deactivate, examining its conceptual origins in classical antiquity."*            |
| [[deactivated]]           | verb      | **1.** Remove from active military status or reassign.<br>**2.** Make inactive.                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of deactivated, examining its conceptual origins in classical antiquity."*           |
| [[deactivation]]          | noun      | **1.** Breaking up a military unit (by transfers or discharges).<br>**2.** The act of deactivating or making ineffective (as a bomb).                                                                                                                                                          | *"The treatise offered an incisive discussion of deactivation, examining its conceptual origins in classical antiquity."*          |
| [[enact]]                 | verb      | **1.** Order by virtue of superior authority; decree.<br>**2.** Act out; represent or perform as if in a play.                                                                                                                                                                                 | *"The treatise offered an incisive discussion of enact, examining its conceptual origins in classical antiquity."*                 |
| [[enactment]]             | noun      | **1.** The passing of a law by a legislative body.<br>**2.** A legal document codifying the result of deliberations of a committee or society or legislative body.                                                                                                                             | *"The treatise offered an incisive discussion of enactment, examining its conceptual origins in classical antiquity."*             |
| [[exact]]                 | verb      | **1.** Claim as due or just.<br>**2.** Take as an undesirable consequence of some event or state of affairs.                                                                                                                                                                                   | *"The treatise offered an incisive discussion of exact, examining its conceptual origins in classical antiquity."*                 |
| [[exacta]]                | noun      | **1.** A bet that you can pick the first and second finishers in the right order.                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of exacta, examining its conceptual origins in classical antiquity."*                |
| [[exacting]]              | verb      | **1.** Claim as due or just.<br>**2.** Take as an undesirable consequence of some event or state of affairs.                                                                                                                                                                                   | *"The treatise offered an incisive discussion of exacting, examining its conceptual origins in classical antiquity."*              |
| [[exaction]]              | noun      | **1.** Act of demanding or levying by force or authority.                                                                                                                                                                                                                                      | *"The treatise offered an incisive discussion of exaction, examining its conceptual origins in classical antiquity."*              |
| [[exactitude]]            | noun      | **1.** The quality of being exact.                                                                                                                                                                                                                                                             | *"The treatise offered an incisive discussion of exactitude, examining its conceptual origins in classical antiquity."*            |
| [[exactly]]               | adverb    | **1.** Indicating exactness or preciseness.<br>**2.** Just as it should be.                                                                                                                                                                                                                    | *"The treatise offered an incisive discussion of exactly, examining its conceptual origins in classical antiquity."*               |
| [[exactness]]             | noun      | **1.** The quality of being exact.                                                                                                                                                                                                                                                             | *"The treatise offered an incisive discussion of exactness, examining its conceptual origins in classical antiquity."*             |
| [[hyperactive]]           | adjective | **1.** More active than normal.                                                                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of hyperactive, examining its conceptual origins in classical antiquity."*           |
| [[hyperactivity]]         | noun      | **1.** A condition characterized by excessive restlessness and movement.                                                                                                                                                                                                                       | *"The treatise offered an incisive discussion of hyperactivity, examining its conceptual origins in classical antiquity."*         |
| [[inaction]]              | noun      | **1.** The state of being inactive.                                                                                                                                                                                                                                                            | *"The treatise offered an incisive discussion of inaction, examining its conceptual origins in classical antiquity."*              |
| [[inactivate]]            | verb      | **1.** Release from military service or remove from the active list of military service.<br>**2.** Make inactive.                                                                                                                                                                              | *"The treatise offered an incisive discussion of inactivate, examining its conceptual origins in classical antiquity."*            |
| [[inactivation]]          | noun      | **1.** The process of rendering inactive.<br>**2.** Breaking up a military unit (by transfers or discharges).                                                                                                                                                                                  | *"The treatise offered an incisive discussion of inactivation, examining its conceptual origins in classical antiquity."*          |
| [[inactive]]              | adjective | **1.** (chemistry) not participating in a chemical reaction; chemically inert.<br>**2.** (pathology) not progressing or increasing; or progressing slowly.                                                                                                                                     | *"The treatise offered an incisive discussion of inactive, examining its conceptual origins in classical antiquity."*              |
| [[inactiveness]]          | noun      | **1.** The state of being inactive.<br>**2.** A disposition to remain inactive or inert.                                                                                                                                                                                                       | *"The treatise offered an incisive discussion of inactiveness, examining its conceptual origins in classical antiquity."*          |
| [[inactivity]]            | noun      | **1.** The state of being inactive.<br>**2.** A disposition to remain inactive or inert.                                                                                                                                                                                                       | *"The treatise offered an incisive discussion of inactivity, examining its conceptual origins in classical antiquity."*            |
| [[inexact]]               | adjective | **1.** Not exact.                                                                                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of inexact, examining its conceptual origins in classical antiquity."*               |
| [[inexactitude]]          | noun      | **1.** The quality of being inaccurate and having errors.                                                                                                                                                                                                                                      | *"The treatise offered an incisive discussion of inexactitude, examining its conceptual origins in classical antiquity."*          |
| [[inexactly]]             | adverb    | **1.** In an imprecise manner.                                                                                                                                                                                                                                                                 | *"The treatise offered an incisive discussion of inexactly, examining its conceptual origins in classical antiquity."*             |
| [[inexactness]]           | noun      | **1.** The quality of being inaccurate and having errors.                                                                                                                                                                                                                                      | *"The treatise offered an incisive discussion of inexactness, examining its conceptual origins in classical antiquity."*           |
| [[interact]]              | verb      | **1.** Act together or towards others or with others.                                                                                                                                                                                                                                          | *"The treatise offered an incisive discussion of interact, examining its conceptual origins in classical antiquity."*              |
| [[interaction]]           | noun      | **1.** A mutual or reciprocal action; interacting.<br>**2.** (physics) the transfer of energy between elementary particles or between an elementary particle and a field or between fields; mediated by gauge bosons.                                                                          | *"The treatise offered an incisive discussion of interaction, examining its conceptual origins in classical antiquity."*           |
| [[interactional]]         | adjective | **1.** Capable of acting on or influencing each other.                                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of interactional, examining its conceptual origins in classical antiquity."*         |
| [[interactive]]           | adjective | **1.** Used especially of drugs or muscles that work together so the total effect is greater than the sum of the two (or more).<br>**2.** Capable of acting on or influencing each other.                                                                                                      | *"The treatise offered an incisive discussion of interactive, examining its conceptual origins in classical antiquity."*           |
| [[interactivity]]         | noun      | **1.** Pertaining to, derived from, or characteristic of Latin act within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of act in systematic terminology.                                                                                          | *"The treatise offered an incisive discussion of interactivity, examining its conceptual origins in classical antiquity."*         |
| [[overact]]               | verb      | **1.** Exaggerate one's acting.                                                                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of overact, examining its conceptual origins in classical antiquity."*               |
| [[overacting]]            | noun      | **1.** Poor acting by a ham actor.<br>**2.** Exaggerate one's acting.                                                                                                                                                                                                                          | *"The treatise offered an incisive discussion of overacting, examining its conceptual origins in classical antiquity."*            |
| [[overactive]]            | adjective | **1.** More active than normal.                                                                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of overactive, examining its conceptual origins in classical antiquity."*            |
| [[overactivity]]          | noun      | **1.** Excessive activity.                                                                                                                                                                                                                                                                     | *"The treatise offered an incisive discussion of overactivity, examining its conceptual origins in classical antiquity."*          |
| [[overreact]]             | verb      | **1.** Show an exaggerated response to something.                                                                                                                                                                                                                                              | *"The treatise offered an incisive discussion of overreact, examining its conceptual origins in classical antiquity."*             |
| [[overreaction]]          | noun      | **1.** An excessive reaction; a reaction with inappropriate emotional behavior.                                                                                                                                                                                                                | *"The treatise offered an incisive discussion of overreaction, examining its conceptual origins in classical antiquity."*          |
| [[proactive]]             | adjective | **1.** Descriptive of any event or stimulus or process that has an effect on events or stimuli or processes that occur subsequently.<br>**2.** (of a policy or person or action) controlling a situation by causing something to happen rather than waiting to respond to it after it happens. | *"The treatise offered an incisive discussion of proactive, examining its conceptual origins in classical antiquity."*             |
| [[react]]                 | verb      | **1.** Show a response or a reaction to something.<br>**2.** Act against or in opposition to.                                                                                                                                                                                                  | *"The treatise offered an incisive discussion of react, examining its conceptual origins in classical antiquity."*                 |
| [[reactance]]             | noun      | **1.** Opposition to the flow of electric current resulting from inductance and capacitance (rather than resistance).                                                                                                                                                                          | *"The treatise offered an incisive discussion of reactance, examining its conceptual origins in classical antiquity."*             |
| [[reactant]]              | noun      | **1.** A chemical substance that is present at the start of a chemical reaction.                                                                                                                                                                                                               | *"The treatise offered an incisive discussion of reactant, examining its conceptual origins in classical antiquity."*              |
| [[reaction]]              | noun      | **1.** (chemistry) a process in which one or more substances are changed into others.<br>**2.** An idea evoked by some experience.                                                                                                                                                             | *"The treatise offered an incisive discussion of reaction, examining its conceptual origins in classical antiquity."*              |
| [[reactionary]]           | noun      | **1.** An extreme conservative; an opponent of progress or liberalism.<br>**2.** Extremely conservative.                                                                                                                                                                                       | *"The treatise offered an incisive discussion of reactionary, examining its conceptual origins in classical antiquity."*           |
| [[reactionism]]           | noun      | **1.** The political orientation of reactionaries.                                                                                                                                                                                                                                             | *"The treatise offered an incisive discussion of reactionism, examining its conceptual origins in classical antiquity."*           |
| [[reactionist]]           | adjective | **1.** Extremely conservative.                                                                                                                                                                                                                                                                 | *"The treatise offered an incisive discussion of reactionist, examining its conceptual origins in classical antiquity."*           |
| [[reactivate]]            | verb      | **1.** Activate (an old file) anew.                                                                                                                                                                                                                                                            | *"The treatise offered an incisive discussion of reactivate, examining its conceptual origins in classical antiquity."*            |
| [[reactive]]              | adjective | **1.** Participating readily in reactions.<br>**2.** Reacting to a stimulus.                                                                                                                                                                                                                   | *"The treatise offered an incisive discussion of reactive, examining its conceptual origins in classical antiquity."*              |
| [[reactivity]]            | noun      | **1.** Responsive to stimulation.<br>**2.** Ready susceptibility to chemical change.                                                                                                                                                                                                           | *"The treatise offered an incisive discussion of reactivity, examining its conceptual origins in classical antiquity."*            |
| [[reactor]]               | noun      | **1.** An electrical device used to introduce reactance into a circuit.<br>**2.** (physics) any of several kinds of apparatus that maintain and control a nuclear reaction for the production of energy or artificial elements.                                                                | *"The treatise offered an incisive discussion of reactor, examining its conceptual origins in classical antiquity."*               |
| [[redact]]                | noun      | **1.** Someone who puts text into appropriate form for publication.<br>**2.** Formulate in a particular style or language.                                                                                                                                                                     | *"The treatise offered an incisive discussion of redact, examining its conceptual origins in classical antiquity."*                |
| [[redaction]]             | noun      | **1.** Putting something (as a literary work or a legislative bill) into acceptable form.<br>**2.** The act of putting something in writing.                                                                                                                                                   | *"The treatise offered an incisive discussion of redaction, examining its conceptual origins in classical antiquity."*             |
| [[redactor]]              | noun      | **1.** Someone who puts text into appropriate form for publication.                                                                                                                                                                                                                            | *"The treatise offered an incisive discussion of redactor, examining its conceptual origins in classical antiquity."*              |
| [[reenact]]               | verb      | **1.** Enact or perform again.<br>**2.** Enact again.                                                                                                                                                                                                                                          | *"The treatise offered an incisive discussion of reenact, examining its conceptual origins in classical antiquity."*               |
| [[reenactment]]           | noun      | **1.** Performing a role in an event that occurred at an earlier time.                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of reenactment, examining its conceptual origins in classical antiquity."*           |
| [[reenactor]]             | noun      | **1.** A person who enacts a role in an event that occurred earlier.                                                                                                                                                                                                                           | *"The treatise offered an incisive discussion of reenactor, examining its conceptual origins in classical antiquity."*             |
| [[retroactive]]           | adjective | **1.** Descriptive of any event or stimulus or process that has an effect on the effects of events or stimuli or process that occurred previously.<br>**2.** Affecting things past.                                                                                                            | *"The treatise offered an incisive discussion of retroactive, examining its conceptual origins in classical antiquity."*           |
| [[retroactively]]         | adverb    | **1.** After the fact.                                                                                                                                                                                                                                                                         | *"The treatise offered an incisive discussion of retroactively, examining its conceptual origins in classical antiquity."*         |
| [[transact]]              | verb      | **1.** Conduct business.                                                                                                                                                                                                                                                                       | *"The treatise offered an incisive discussion of transact, examining its conceptual origins in classical antiquity."*              |
| [[transactinide]]         | noun      | **1.** Any of the artificially produced elements with atomic numbers greater than 103.<br>**2.** Of or belonging to the elements with atomic numbers greater than 103.                                                                                                                         | *"The treatise offered an incisive discussion of transactinide, examining its conceptual origins in classical antiquity."*         |
| [[transaction]]           | noun      | **1.** The act of transacting within or between groups (as carrying on commercial activities).                                                                                                                                                                                                 | *"The treatise offered an incisive discussion of transaction, examining its conceptual origins in classical antiquity."*           |
| [[transactional]]         | noun      | **1.** Pertaining to, derived from, or characteristic of Latin act within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of act in systematic terminology.                                                                                          | *"The treatise offered an incisive discussion of transactional, examining its conceptual origins in classical antiquity."*         |
| [[transactions]]          | noun      | **1.** A written account of what transpired at a meeting.<br>**2.** The act of transacting within or between groups (as carrying on commercial activities).                                                                                                                                    | *"The treatise offered an incisive discussion of transactions, examining its conceptual origins in classical antiquity."*          |
| [[transactor]]            | noun      | **1.** Someone who conducts or carries on business or negotiations.                                                                                                                                                                                                                            | *"The treatise offered an incisive discussion of transactor, examining its conceptual origins in classical antiquity."*            |
| [[unactable]]             | adjective | **1.** Not actable.                                                                                                                                                                                                                                                                            | *"The treatise offered an incisive discussion of unactable, examining its conceptual origins in classical antiquity."*             |
| [[underact]]              | verb      | **1.** Act (a role) with great restraint.                                                                                                                                                                                                                                                      | *"The treatise offered an incisive discussion of underact, examining its conceptual origins in classical antiquity."*              |
| [[underactive]]           | adjective | **1.** Abnormally inactive.                                                                                                                                                                                                                                                                    | *"The treatise offered an incisive discussion of underactive, examining its conceptual origins in classical antiquity."*           |
| [[unexacting]]            | adjective | **1.** Not rigorous.                                                                                                                                                                                                                                                                           | *"The treatise offered an incisive discussion of unexacting, examining its conceptual origins in classical antiquity."*            |
| [[unreactive]]            | adjective | **1.** (chemistry) not reacting chemically.<br>**2.** Not tending to react to stimulation.                                                                                                                                                                                                     | *"The treatise offered an incisive discussion of unreactive, examining its conceptual origins in classical antiquity."*            |

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
    ROOT DASHBOARD · ACT
  </div>
</div>
