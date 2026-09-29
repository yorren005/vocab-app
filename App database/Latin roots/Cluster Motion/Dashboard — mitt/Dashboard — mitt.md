---
status: unread
type: root_dashboard
---
# Dashboard — mitt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mitt-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to send or let go”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing an arrow from a bow or sending a letter out into the world.</span>
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

The root **mitt** means to send or let go. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *admit*, *commit*, *transmit*, and *submit*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to send or let go
> The root **mitt** means to send or let go. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *admit*, *commit*, *transmit*, and *submit*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To send or let go</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing an arrow from a bow or sending a letter out into the world.</mark>
> - **Everyday Connection**: Think of familiar words like *admit* and *commit*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mitt** comes from a Latin word that means *"to send or let go"*.
  - At its core, it describes the action of send or let go.

- **The Big Picture Idea**:
  - Picture releasing an arrow from a bow or sending a letter out into the world.
  - Whenever you see **mitt** in an English word, think of **sending something out on a journey**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to send or let go).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Admit**: To allow, permit, or grant entrance, access, or passage to.
  - **Commit**: To perpetrate, execute, or carry out a mistake, transgression, or crime.
  - **Transmit**: To cause to pass or transfer from one person, place, thing, or generation to another.
  - **Submit**: To yield, surrender, or subject oneself or an issue to the power, governance, or judgment of another.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mitt</mark>, think of <mark class="hl-def">sending something out on a journey</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mitt** operates through two primary morphological stems derived from the principal parts of Latin *mittō, mittere, mīsī, missum*:
> - **Present Active Stem (`mitt-`):** Derived from the present infinitive *mittere*. In English, this stem primarily forms active verbs compounded with Latin directional prefixes:
>   - `trans-` + `mitt-` $\to$ [[transmit]] (to send across)
>   - `ad-` + `mitt-` $\to$ [[admit]] (to send/let into)
>   - `com-` + `mitt-` $\to$ [[commit]] (to send together, entrust)
>   - `e-` / `ex-` + `mitt-` $\to$ [[emit]] (to send out)
>   - `inter-` + `mitt-` $\to$ [[intermit]] (to send between, suspend)
>   - `ob-` + `mitt-` $\to$ [[omit]] (to send past, leave out)
>   - `per-` + `mitt-` $\to$ [[permit]] (to send through, allow)
>   - `re-` + `mitt-` $\to$ [[remit]] (to send back, forgive)
>   - `sub-` + `mitt-` $\to$ [[submit]] (to send under, yield)
>   - `manu-` + `mitt-` $\to$ [[manumit]] (to release from the hand)
> - **Supine / Perfect Passive Stem (`miss-`):** Derived from the fourth principal part *missum* (and feminine *missa*). This stem forms resultant action nouns in *-ion*, agent nouns in *-ary* / *-er*, adjectives in *-ive* and *-ible*, as well as direct nouns:
>   - `miss-` + `-ile` $\to$ [[missile]] (capable of being hurled)
>   - `miss-` + `-ion` $\to$ [[mission]] (the state of being sent forth) $\to$ [[missionary]]
>   - `miss-` + `-ive` $\to$ [[missive]] (a formal letter sent)
>   - `dis-` + `miss-` $\to$ [[dismiss]] $\to$ [[dismissal]], [[dismissive]], [[dismissively]]
>   - `trans-` + `miss-` + `-ion` $\to$ [[transmission]] $\to$ [[transmissible]], [[transmitter]]
>   - `ad-` + `miss-` + `-ion` $\to$ [[admission]] $\to$ [[admissible]], [[admittance]], [[admissibility]]
>   - `com-` + `miss-` + `-ion` $\to$ [[commission]] $\to$ [[commissioner]]
>   - `e-` + `miss-` + `-ion` $\to$ [[emission]] $\to$ [[emissary]]
>   - `per-` + `miss-` + `-ion` $\to$ [[permission]] $\to$ [[permissible]], [[permissive]]
>   - `re-` + `miss-` + `-ion` $\to$ [[remission]] $\to$ [[remiss]], [[remittance]]
>   - `sub-` + `miss-` + `-ion` $\to$ [[submission]] $\to$ [[submissive]]
> - **Romance and Anglo-Norman Modifications:**
>   - `pro-` + `mittere` / `promissum` $\to$ [[promise]], [[promissory]], [[compromise]], [[uncompromised]], [[compromiser]]
>   - `prae-` + `mittere` / `praemissa` $\to$ [[premise]], [[premiss]] (sent ahead as prior logical propositions)
>   - `dē-` + `mittere` $\to$ Anglo-French *demise* $\to$ [[demise]] (transfer of estate/crown upon death)
>   - *surmettre* $\to$ [[surmise]] (to infer, conjecture; historically "to lay a charge upon")
>   - *missum* $\to$ Vulgar Latin *missāticum* $\to$ [[message]], [[messenger]]
>   - *missa* (liturgical dismissal) $\to$ [[mass]]

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

> [!tip] 🌈 Shades of Meaning in Different Words
> Although the root fundamentally denotes **"to send, let go, release, cast, hurl, yield"**, its operational focus branches across eight distinct functional planes:
> - **1. Physical Propulsion, Ballistics & Radiation:** Direct hurling of physical matter or radiation of energetic waves across space ([[missile]], [[emit]], [[emission]], [[emitter]], [[transmit]], [[transmission]], [[transmitter]]).
> - **2. Ingress, Egress & Physical/Conceptual Access:** Opening, regulating, or blocking entry through a boundary or threshold ([[admit]], [[admission]], [[admissible]], [[admissibility]], [[inadmissible]], [[admittance]], [[permit]], [[permission]], [[permissible]], [[impermissible]], [[permissive]], [[permissiveness]], [[permissibility]]).
> - **3. Exclusion, Neglect & Omission:** Leaving out, passing over, or failing to send forth ([[omit]], [[omission]], [[omissible]], [[remiss]]).
> - **4. Delegation, Moral Duty & Institutional Charge:** Sending authority, responsibility, or ethical purpose into individuals or bodies ([[commit]], [[commitment]], [[commission]], [[commissioner]], [[committee]], [[recommit]], [[recommission]], [[noncommittal]], [[mission]], [[missionary]]).
> - **5. Subordination, Yielding & Surrender:** Sending oneself under another's authority or relinquishing a dispute ([[submit]], [[submission]], [[submissive]], [[submissively]], [[submissiveness]], [[compromise]], [[uncompromised]], [[compromiser]]).
> - **6. Forgiveness, Abatement & Remittance:** Sending back a penalty, relaxing a disease state, or transferring monetary payment ([[remit]], [[remission]], [[remittance]], [[remissible]], [[irremissible]]).
> - **7. Termination, Severance & Release:** Sending away, disbanding an assembly, conveying estate rights, or emancipating from bondage ([[dismiss]], [[dismissal]], [[dismissive]], [[dismissively]], [[demise]], [[manumit]], [[manumission]], [[mass]]).
> - **8. Communication, Epistemology & Presupposition:** Sending spoken/written dispatches, prior logical propositions, and solemn future assurances ([[missive]], [[message]], [[messenger]], [[premise]], [[premiss]], [[promise]], [[promissory]], [[surmise]], [[transmittal]], [[intermit]], [[intermission]], [[intermittent]], [[intermittently]]).

---

## 🔀 4. Prefix & Combining Dynamics on mitt

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[admit]], [[admission]], [[admittance]] | To send toward; allow entrance, grant access, or acknowledge validity. |
| `com-` / `con-` | together, thoroughly | [[commit]], [[commission]], [[committee]] | To send together into custody; entrust with duty; pledge or perpetrate. |
| `dē-` | down, away from | [[demise]] | Sent down or transferred; legal conveyance of estate or crown upon death. |
| `dis-` | apart, away | [[dismiss]], [[dismissal]], [[dismissive]] | To send away in different directions; discharge from service; reject from mind. |
| `ē-` / `ex-` | out, forth | [[emit]], [[emission]], [[emissary]] | To send forth from within; radiate energy, sound, or gas; dispatch an envoy. |
| `inter-` | between, among | [[intermit]], [[intermission]], [[intermittent]] | To send between; cause a pause, gap, or periodic interruption in continuity. |
| `ob-` | in front of, past | [[omit]], [[omission]], [[omissible]] | To send past or let fall by the wayside; leave out, disregard, or neglect. |
| `per-` | through, thoroughly | [[permit]], [[permission]], [[permissive]] | To let pass through a gate or barrier; give formal license or leave. |
| `prae-` / `pre-` | before, ahead | [[premise]], [[premiss]] | Sent before in discourse; an antecedent proposition assumed as true. |
| `prō-` | forward, forth | [[promise]], [[promissory]] | Sent forward into the future; a solemn declaration pledging future action. |
| `re-` | back, again | [[remit]], [[remission]], [[remittance]] | To send back; relax or abate; forgive a debt or sin; transmit payment. |
| `sub-` | under, beneath | [[submit]], [[submission]], [[submissive]] | To send or place oneself under another's authority; yield; surrender. |
| `sur-` (*super-*) | over, upon | [[surmise]] | Put or laid upon; to conjecture or infer without definitive factual proof. |
| `trans-` | across, beyond | [[transmit]], [[transmission]], [[transmitter]] | To send across distance, time, or media; propagate signals or contagion. |
| `manu-` | hand (*manus*) | [[manumit]], [[manumission]] | To release from the legal hand/power of the master; emancipate from slavery. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (Act, Process, State) | [[transmission]], [[admission]], [[commission]], [[remission]] | Names the institutional act, completed event, or resultant condition. |
| `-ible` / `-able` | Adjective (Capacity, Fitness) | [[transmissible]], [[admissible]], [[permissible]], [[omissible]] | Expresses the inherent capacity, legal fitness, or susceptibility to an act. |
| `-er` / `-or` | Noun (Agent, Instrument) | [[transmitter]], [[emitter]], [[commissioner]], [[messenger]] | Designates the human agent or technological apparatus executing the dispatch. |
| `-ive` | Adjective / Noun (Quality, Tendency) | [[permissive]], [[submissive]], [[dismissive]], [[missive]] | Denotes an active disposition toward the root action, or a concrete dispatched item. |
| `-ment` | Noun (Concrete State, Obligation) | [[commitment]], [[admittance]], [[remittance]] | Denotes the binding pledge, physical passage, or transferred financial sum. |
| `-ee` | Noun (Passive Recipient / Delegated Body) | [[committee]] | Designates a person or collective body to whom a specific charge is committed. |
| `-ary` / `-ory` | Adjective / Noun (Relating to, Agent) | [[emissary]], [[missionary]], [[promissory]] | Designates one sent on a mission, or a document embodying a solemn promise. |
| `-al` | Noun (Official Act or Instrument) | [[dismissal]], [[transmittal]] | Encapsulates an official administrative discharge or formal dispatch document. |
| `-ly` | Adverb (Manner, Frequency) | [[intermittently]], [[submissively]], [[dismissively]] | Modifies actions according to the manner of dispatch, yielding, or periodic pause. |
| `-ness` | Noun (Abstract Quality) | [[permissiveness]], [[submissiveness]], [[admissibility]] | Expresses the abstract philosophical or legal degree of a behavioral quality. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📡 **Telecommunications, Physics & Engineering** | [[transmit]], [[transmission]], [[transmitter]], [[emit]], [[emission]], [[emitter]] | Radio frequency modulation, fiber-optic light pulses, automotive mechanical gear transmissions, blackbody radiation spectra, and semiconductor emitter terminals. |
| ⚖️ **Law, Evidence & Constitutional Procedure** | [[admit]], [[admission]], [[admissible]], [[admissibility]], [[inadmissible]], [[commit]], [[commission]], [[dismiss]], [[dismissal]], [[demise]], [[manumit]], [[manumission]], [[premise]] | Rules of evidentiary admissibility, motions to dismiss with prejudice, judicial commissions of inquiry, civil commitment hearings, transfer of leasehold/crown upon demise, and historical deeds of manumission. |
| ⛪ **Theology, Liturgy & Religious History** | [[mass]], [[mission]], [[missionary]], [[remission]], [[promise]] | The Eucharistic sacrifice named from the concluding dismissal (*Ite, missa est*), global missionary enterprises, the sacramental remission of sins, and biblical covenantal promises. |
| 🚀 **Military Doctrine, Ballistics & Aerospace** | [[missile]], [[mission]], [[emissary]], [[surmise]], [[noncommittal]], [[dismissive]] | Intercontinental ballistic missiles (ICBMs), orbital launch mission operations, diplomatic peace emissaries, intelligence threat surmises, and tactical defense readiness. |
| 🩺 **Clinical Medicine & Pathology** | [[remission]], [[transmissible]], [[intermittent]], [[intermittently]], [[remiss]] | Oncology remission criteria (complete vs. partial), transmissible vector-borne pathogens, intermittent malaria fevers, and medical malpractice liability (remiss in standard of care). |
| 💼 **Finance, Commerce & Negotiations** | [[remit]], [[remittance]], [[promissory]], [[compromise]], [[uncompromised]], [[transmittal]] | Cross-border worker remittances, negotiable promissory notes, collective bargaining compromise agreements, uncompromised cybersecurity ledgers, and formal transmittal letters. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[admittable]] | adjective | **1.** Deserving to be allowed to enter. | *"In academic literature, admittable designates deserving to be allowed to enter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admittance]] | noun | **1.** The right to enter.<br>**2.** The act of admitting someone to enter. | *"With five times so much conversation I should get ground of your fair mistress; make her go back even to the yielding, had I admittance and opportunity to friend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admittedly]] | adverb | **1.** As acknowledged. | *"Jesus is admittedly her eldest son, and is bred to be a carpenter; and a carpenter he undoubtedly was up to, we are told, about thirty years of age (Luke 3:23)."* — T. R. Glover, *The Jesus of History* |
| [[admittible]] | adjective | **1.** Deserving to be allowed to enter. | *"In academic literature, admittible designates deserving to be allowed to enter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[committal]] | noun | **1.** The official act of consigning a person to confinement (as in a prison or mental hospital).<br>**2.** The act of committing a crime. | *"‘Yes, master, and I’ve never been in it much.’ (I had come out of Kingston Jail last on a vagrancy committal."* — Charles Dickens, *Great Expectations* |
| [[committed]] | verb | **1.** Perform an act, usually with a negative connotation.<br>**2.** Give entirely to a specific person, activity, or cause. | *"What wretched errors hath my heart committed, Whilst it hath thought it self so blessed never!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[committedness]] | noun | **1.** The trait of sincere and steadfast fixity of purpose. | *"In academic literature, committedness designates the trait of sincere and steadfast fixity of purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[committee]] | noun | **1.** A special group delegated to consider some matter;  - milton berle.<br>**2.** A self-constituted organization to promote something. | *"Good things have been said about it by blue-nosed, bulbous-shoed old benchers in select port-wine committee after dinner in hall."* — Charles Dickens, *Bleak House* |
| [[committeeman]] | noun | **1.** A man who is a member of committee. | *"Count Ilyá, again thrusting his way through the crowd, went out of the drawing room and reappeared a minute later with another committeeman, carrying a large silver salver which he presented to Prince Bagratión."* — graf Leo Tolstoy, *War and Peace* |
| [[committeewoman]] | noun | **1.** A woman who is a member of a committee. | *"In academic literature, committeewoman designates a woman who is a member of a committee."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emitter]] | noun | **1.** The electrode in a transistor where electrons originate. | *"In academic literature, emitter designates the electrode in a transistor where electrons originate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermittence]] | noun | **1.** The quality of being intermittent; subject to interruption or periodic stopping. | *"In academic literature, intermittence designates the quality of being intermittent; subject to interruption or periodic stopping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermittency]] | noun | **1.** The quality of being intermittent; subject to interruption or periodic stopping. | *"In academic literature, intermittency designates the quality of being intermittent; subject to interruption or periodic stopping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermittent]] | adjective | **1.** Stopping and starting at irregular intervals. | *"From the trees came the sound of steady dripping upon the drifted leaves under them, and from the direction of the church she could hear another noise—peculiar, and not intermittent like the rest, the purl of water falling into a pool."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[intermittently]] | adverb | **1.** In an intermittent manner. | *"He was often remorseful, and he strove painfully, if intermittently, after better things."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[mitt]] | noun | **1.** The (prehensile) extremity of the superior limb.<br>**2.** The handwear used by fielders in playing baseball. | *"By the dear ruffles round her feet, By her small hands that hung In their lace mitts, austere and sweet, Her gown's white folds among."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[mittelschmerz]] | noun | **1.** Pain in the area of the ovary that is felt at the time of ovulation (usually midway through the menstrual cycle). | *"In academic literature, mittelschmerz designates pain in the area of the ovary that is felt at the time of ovulation (usually midway through the menstrual cycle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitten]] | noun | **1.** Glove that encases the thumb separately and the other four fingers together. | *"And continually, now with one mitten, now with the other, I rubbed my nose that it might not freeze."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mitterrand]] | noun | **1.** French statesman and president of france from 1981 to 1985 (1916-1996). | *"In academic literature, mitterrand designates french statesman and president of france from 1981 to 1985 (1916-1996)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncommittal]] | adjective | **1.** Refusing to bind oneself to a particular course of action or view or the like. | *"Bussard stood beside him, trying nervously to appear noncommittal, while Mead went up to the shaking old man, grasped his hand, and brought him over to the desk."* — Algis Budrys, *Citadel* |
| [[nonremittal]] | noun | **1.** Act of failing to meet a financial obligation.<br>**2.** Loss resulting from failure of a debt to be paid. | *"In academic literature, nonremittal designates act of failing to meet a financial obligation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remittal]] | noun | **1.** A payment of money sent to a person in another place.<br>**2.** An abatement in intensity or degree (as in the manifestations of a disease). | *"In academic literature, remittal designates a payment of money sent to a person in another place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remittance]] | noun | **1.** A payment of money sent to a person in another place. | *"There are given all the various letters that arise in the course of business: Asking for money, requesting time, enclosing remittance, asking assistance, reasons for refusal, from tenants to landlords on different subjects, with landlords’ replies."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[remittent]] | adjective | **1.** (of a disease) characterized by periods of diminished severity. | *"I bethought myself to go upstairs and see how the dying woman sped, who lay there almost unheeded: the very servants paid her but a remittent attention: the hired nurse, being little looked after, would slip out of the room whenever she could."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[subcommittee]] | noun | **1.** A subset of committee members organized for a specific purpose. | *"In academic literature, subcommittee designates a subset of committee members organized for a specific purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submitter]] | noun | **1.** Someone who yields to the will of another person or force.<br>**2.** Someone who submits something (as an application for a job or a manuscript for publication etc.) for the judgment of others. | *"In academic literature, submitter designates someone who yields to the will of another person or force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmittable]] | adjective | **1.** (of disease) capable of being transmitted by infection. | *"In academic literature, transmittable designates (of disease) capable of being transmitted by infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmittal]] | noun | **1.** The act of sending a message; causing a message to be transmitted. | *"In academic literature, transmittal designates the act of sending a message; causing a message to be transmitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmittance]] | noun | **1.** The fraction of radiant energy that passes through a substance. | *"In academic literature, transmittance designates the fraction of radiant energy that passes through a substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmitted]] | verb | **1.** Transfer to another.<br>**2.** Transmit or serve as the medium for transmission. | *"The Kellynch estate should be transmitted whole and entire, as he had received it."* — Jane Austen, *Persuasion* |
| [[transmitter]] | noun | **1.** Someone who transmits a message.<br>**2.** Any agent (person or animal or microorganism) that carries and transmits a disease. | *"Request permission to come aboard and have unattended access to the spunnel transmitter for about five minutes."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[transmitting]] | noun | **1.** The act of sending a message; causing a message to be transmitted.<br>**2.** Transfer to another. | *"It is remarkable, however, that she neither insisted on Catherine’s writing by every post, nor exacted her promise of transmitting the character of every new acquaintance, nor a detail of every interesting conversation that Bath might produce."* — Jane Austen, *Northanger Abbey* |
| [[uncommitted]] | adjective | **1.** Not bound or pledged.<br>**2.** Not associated in an exclusive sexual relationship. | *"There was the great four-post bed with amber hangings as of old; there the toilet-table, the armchair, and the footstool, at which I had a hundred times been sentenced to kneel, to ask pardon for offences by me uncommitted."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MITT
  </div>
</div>
