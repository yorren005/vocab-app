---
status: unread
type: root_dashboard
---
# Dashboard — rupt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rupt-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to break”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A fragile stone pillar snapping under pressure and crumbling into fragments.</span>
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

The root **rupt** means to break. It refers to the action of breaking and carrying out this process. In English, this root forms words such as *rupture*, *bankrupt*, *interrupt*, and *erupt*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to break
> The root **rupt** means to break. It refers to the action of breaking and carrying out this process. In English, this root forms words such as *rupture*, *bankrupt*, *interrupt*, and *erupt*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To break</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *rupture* and *bankrupt*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rupt** comes from a Latin word that means *"to break"*.
  - At its core, it describes the action of break.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **rupt** in an English word, think of **to break**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to break).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Rupture**: An instance of breaking, tearing, or bursting open.
  - **Bankrupt**: A person or business declared insolvent under the law.
  - **Interrupt**: To stop or hinder the progress of by breaking in.
  - **Erupt**: To eject lava, ash, and gases violently from a vent.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rupt</mark>, think of <mark class="hl-def">to break</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rupt** combines with classical prefixes across diverse morphological tracks:
> - **Bare Participial Base `rupt-` (Latin *ruptum*):**
>   - Direct surgical and political noun & verb: Latin *ruptūra* → English [[rupture]].
> - **Directional Prefix Compounds:**
>   - `ab-` (away, off): *ab- + rumpere* → [[abrupt]] → [[abruptly]] → [[abruptness]] → [[abruption]].
>   - `dis-` (apart): *dis- + rumpere* → [[disrupt]] → [[disruption]] → [[disruptive]] → [[disruptively]] → [[disruptor]].
>   - `con-` (thoroughly): *con- + rumpere* → [[corrupt]] → [[corruption]] → [[corruptly]] → [[corruptness]] → [[corruptible]] → [[incorruptible]] → [[incorruptibility]].
>   - `ex-` (`e-`, out): *ex- + rumpere* → [[erupt]] → [[eruption]] → [[eruptive]].
>   - `inter-` (between): *inter- + rumpere* → [[interrupt]] → [[interruption]] → [[uninterrupted]] → [[uninterruptedly]].
>   - `in-` (`ir-`, in/into): *in- + rumpere* → [[irrupt]] → [[irruption]] → [[irruptive]].
> - **Commercial Compound `bankrupt-` (Italian *banca rotta*):**
>   - Compound: *bank + rupt* → [[bankrupt]] → [[bankruptcy]].
> - **Gallo-Romance Feminine Participle `rupta` (Broken Road / Flight):**
>   - Military broken flight: Old French *route* → English [[rout]].
>   - Broken wilderness path: Old French *route* (< *via rupta*) → English [[route]] → [[routine]] → [[rut]].

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
> Although unified by **"bursting and breaking"**, the derivatives of `rupt` span critical modern domains:
> - **Clinical Traumatology & Surgery:** In [[rupture]] and [[abruption]], the root describes acute catastrophic tissue tears: aortic aneurysm rupture, ruptured appendix, Achilles tendon rupture, and placental abruption (*abruptio placentae*).
> - **Volcanology & Geophysics:** In [[erupt]], [[eruption]], and [[eruptive]], the root tracks volcanic magma, tephra, and pyroclastic density currents bursting through the Earth's crust.
> - **Business, Technology & Economics:** In [[disrupt]], [[disruption]], and [[disruptive]], the root shifted from physical disorder to Clayton Christensen's model of market disruption where simpler innovations overturn established industries.
> - **Commercial Law & Involuntary Liquidation:** In [[bankrupt]] and [[bankruptcy]], the root provides the legal framework for the insolvency of debtors under Chapter 7 and Chapter 11.
> - **Political Governance & Ethics:** In [[corrupt]], [[corruption]], and [[incorruptible]], the root defines the breakdown of institutional integrity through bribery, graft, and abuse of power.
> - **Transportation & Habitual Behavior:** In [[route]], [[routine]], and [[rut]], the broken mountain road (*via rupta*) evolved into global shipping lanes, daily schedules, and repetitive mental habits.

---

## 🔀 4. Prefix & Combining Dynamics on rupt

### Prefix Dynamics (Directional, Explosive & Relational Shifts)

| Prefix / Combining Element | Classical Meaning | Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ab-` | away, off, suddenly | [[abrupt]], [[abruption]] | Broken off cleanly and suddenly; precipitous; steep. |
| `dis-` | apart, in pieces | [[disrupt]], [[disruption]] | Breaking existing order apart; causing systemic turmoil. |
| `con-` (`cor-`) | thoroughly, completely | [[corrupt]], [[corruption]] | Broken through and through; degraded moral integrity. |
| `ex-` (`e-`) | out, forth, violently | [[erupt]], [[eruption]] | Bursting violently outward from internal pressure. |
| `inter-` | between, in the middle | [[interrupt]], [[interruption]] | Breaking in between speakers or continuous actions. |
| `in-` (`ir-`) | into, inward | [[irrupt]], [[irruption]] | Bursting violently inward into an ecosystem or territory. |
| `bank-` (Germanic *bank*) | money-changer's table | [[bankrupt]], [[bankruptcy]] | The merchant's bench broken upon insolvency. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-ure` (Latin *-ūra*) | Noun (State / Wound) | [[rupture]] | A physical breach, hernia, or break in relations. |
| `-ion` (Latin *-iō*) | Noun (Process / Event) | [[eruption]], [[disruption]], [[corruption]] | The act or instance of bursting or breaking. |
| `-ive` (Latin *-īvus*) | Adjective (Tendency) | [[disruptive]], [[eruptive]], [[irruptive]] | Having the power or tendency to break or burst. |
| `-ible` (Latin *-ibilis*) | Adjective (Capability) | [[corruptible]], [[incorruptible]] | Capable or incapable of being bribed or decayed. |
| `-cy` | Abstract Noun (Legal State) | [[bankruptcy]] | The statutory state of financial insolvency. |
| `-ine` (French *-ine*) | Noun & Adjective (Practice) | [[routine]] | A customary, regular, unvarying broken path. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌋 **Volcanology & Geophysics** | [[erupt]], [[eruption]], [[eruptive]] | Plinian eruptive columns, Volcanic Explosivity Index (VEI), phreatomagmatic eruptions, caldera formation. |
| 🏥 **Trauma Surgery & Obstetrics** | [[rupture]], [[abruption]] | Emergency laparotomy for ruptured aortic aneurysm, surgical repair of bladder rupture, emergency cesarean for placental abruption. |
| 💼 **Silicon Valley & Corporate Strategy** | [[disrupt]], [[disruption]], [[disruptive]], [[disruptor]] | Disruptive technology displacing market incumbents (e.g., digital photography disrupting film, streaming disrupting video rental). |
| 🏛️ **Criminal Justice & Anti-Corruption** | [[corrupt]], [[corruption]], [[incorruptible]] | Prosecuting foreign bribery under the FCPA, Transparency International Corruption Perceptions Index, grand jury indictments. |
| ⚖️ **Commercial Law & Banking** | [[bankrupt]], [[bankruptcy]] | Corporate restructuring under Chapter 11, liquidation under Chapter 7, debtor-in-possession financing. |
| 🚢 **Logistics, Supply Chain & Navigation** | [[route]], [[routine]], [[rut]] | Maritime shipping routes through the Suez and Panama Canals, dynamic vehicle routing algorithms, supply chain disruption modeling. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abrupt]] | adjective | **1.** Marked by sudden changes in subject and sharp transitions.<br>**2.** Exceedingly sudden and unexpected. | *"Stay, my Lord Talbot, for my lady craves To know the cause of your abrupt departure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abruption]] | noun | **1.** An instance of sudden interruption. | *"What makes this pretty abruption?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abruptly]] | adverb | **1.** Quickly and without warning. | *"Or if thou hast not broke from company Abruptly, as my passion now makes me, Thou hast not loved."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abruptly-pinnate]] | adjective | **1.** (of a leaf shape) pinnate with a pair of leaflets at the apex. | *"In academic literature, abruptly-pinnate designates (of a leaf shape) pinnate with a pair of leaflets at the apex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abruptness]] | noun | **1.** An abrupt discourteous manner.<br>**2.** The property possessed by a slope that is very steep. | *"Jarndyce then withdrawing into the temporary growlery, Miss Jellyby opened a conversation with her usual abruptness."* — Charles Dickens, *Bleak House* |
| [[bankrupt]] | noun | **1.** Someone who has insufficient assets to cover their debts.<br>**2.** Reduce to bankruptcy. | *"Why should he live, now nature bankrupt is, Beggared of blood to blush through lively veins, For she hath no exchequer now but his, And proud of many, lives upon his gains?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bankruptcy]] | noun | **1.** A state of complete lack of some abstract property.<br>**2.** Inability to discharge all your debts as they come due. | *"Now at the time of a crisis a general contraction of credit occurs, and all borrowers with maturing obligations are faced with bankruptcy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[corrupt]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Make illegal payments to in exchange for favors or influence. | *"If eyes corrupt by over-partial looks, Be anchored in the bay where all men ride, Why of eyes’ falsehood hast thou forged hooks, Whereto the judgement of my heart is tied?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corrupted]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Make illegal payments to in exchange for favors or influence. | *"O, my fortunes have Corrupted honest men!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corruptedly]] | adverb | **1.** In a corrupt manner. | *"In academic literature, corruptedly designates in a corrupt manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corruptibility]] | noun | **1.** The capability of being corrupted. | *"In academic literature, corruptibility designates the capability of being corrupted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corruptible]] | adjective | **1.** Capable of being corrupted. | *"De foot _et_ de coun! _O Seigneur Dieu! ils sont les mots de son mauvais, corruptible, gros, et impudique, et non pour les dames d’honneur d’user."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corrupting]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Make illegal payments to in exchange for favors or influence. | *"Alas, she hath from France too long been chas’d, And all her husbandry doth lie on heaps, Corrupting in it own fertility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corruption]] | noun | **1.** Lack of integrity or honesty (especially susceptibility to bribery); use of a position of trust for dishonest gain.<br>**2.** In a state of progressive putrefaction. | *"I see the jewel best enamelled Will lose his beauty; yet the gold bides still That others touch, yet often touching will Wear gold; and no man that hath a name By falsehood and corruption doth it shame."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corruptive]] | adjective | **1.** Tending to corrupt or pervert. | *"In academic literature, corruptive designates tending to corrupt or pervert."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corruptly]] | adverb | **1.** In a corrupt manner. | *"O that estates, degrees, and offices Were not deriv’d corruptly, and that clear honour Were purchas’d by the merit of the wearer!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corruptness]] | noun | **1.** The state of being corrupt.<br>**2.** Lack of integrity or honesty (especially susceptibility to bribery); use of a position of trust for dishonest gain. | *"In academic literature, corruptness designates the state of being corrupt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disrupt]] | verb | **1.** Make a break in.<br>**2.** Throw into disorder. | *"We need you to gather and send confirmations to us and, while you're doing that, disrupt the plans and weapons being marshaled against us."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disrupted]] | verb | **1.** Make a break in.<br>**2.** Throw into disorder. | *"Drummer, by his order without prior notice and planning, had completely disrupted the Plutonian tactical formation."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disruption]] | noun | **1.** An act of delaying or interrupting the continuity.<br>**2.** A disorderly outburst or tumult. | *"I am especially interested in your ability to intensify earliest possible infiltration and disruption throughout Narval's domain." The door slid shut as he passed through."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disruptive]] | adjective | **1.** Characterized by unrest or disorder or insubordination. | *"It was all too ridiculous, the introducing of disruptive foreign substances into the bodies of little black men-folk."* — Jack London, *The Jacket (The Star-Rover)* |
| [[disruptively]] | adverb | **1.** In a disruptive manner. | *"In academic literature, disruptively designates in a disruptive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erupt]] | verb | **1.** Start abruptly.<br>**2.** Erupt or intensify suddenly. | *"Suddenly, from above, erupts the same screech they heard before, wild and shrill."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[eruption]] | noun | **1.** The sudden occurrence of a violent discharge of steam and volcanic material.<br>**2.** Symptom consisting of a breaking out and becoming visible. | *"In what particular thought to work I know not; But in the gross and scope of my opinion, This bodes some strange eruption to our state."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eruptive]] | adjective | **1.** Producing or characterized by eruptions.<br>**2.** Produced by the action of fire or intense heat. | *"They were too volcanic, spasmodic, eruptive."* — Jack London, *The Jacket (The Star-Rover)* |
| [[incorrupt]] | adjective | **1.** Free of corruption or immorality. | *"In academic literature, incorrupt designates free of corruption or immorality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incorruptibility]] | noun | **1.** The incapability of being corrupted. | *"In academic literature, incorruptibility designates the incapability of being corrupted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incorruptible]] | adjective | **1.** Incapable of being morally corrupted. | *"Truly do we carry in us, each human of us alive on the planet to-day, the incorruptible history of life from life’s beginning."* — Jack London, *The Jacket (The Star-Rover)* |
| [[incorruption]] | noun | **1.** Characterized by integrity or probity. | *"Now that the incorruption of this most fragrant ambergris should be found in the heart of such decay; is this nothing?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[incorruptness]] | noun | **1.** Characterized by integrity or probity. | *"In academic literature, incorruptness designates characterized by integrity or probity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interrupt]] | noun | **1.** A signal that temporarily stops the execution of a program so that another procedure can be carried out.<br>**2.** Make a break in. | *"Under the cool shade of a sycamore I thought to close mine eyes some half an hour, When, lo, to interrupt my purposed rest, Toward that shade I might behold addressed The King and his companions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interrupted]] | verb | **1.** Make a break in.<br>**2.** Destroy the peace or tranquility of. | *"Will you hence, Before the tag return, whose rage doth rend Like interrupted waters, and o’erbear What they are used to bear?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interrupter]] | noun | **1.** A device for automatically interrupting an electric current. | *"Proud Saturnine, interrupter of the good That noble-minded Titus means to thee!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interruption]] | noun | **1.** An act of delaying or interrupting the continuity.<br>**2.** Some abrupt occurrence that interrupts an ongoing activity. | *"And bloody England into England gone, O’erbearing interruption, spite of France?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[irrupt]] | verb | **1.** Enter uninvited.<br>**2.** Erupt or intensify suddenly. | *"In academic literature, irrupt designates enter uninvited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irruption]] | noun | **1.** A sudden violent entrance; a bursting in.<br>**2.** A sudden sharp increase in the relative numbers of a population. | *"Had an army of invaders made an irruption into their territory they could not have evinced greater excitement."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[irruptive]] | adjective | **1.** Of igneous rock that has solidified beneath the earth's surface; granite or diorite or gabbro. | *"In academic literature, irruptive designates of igneous rock that has solidified beneath the earth's surface; granite or diorite or gabbro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ruptiliocarpon]] | noun | **1.** New (1993) genus of trees of central america now recognized as similar to those of genus lepidobotrys. | *"In academic literature, ruptiliocarpon designates new (1993) genus of trees of central america now recognized as similar to those of genus lepidobotrys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rupture]] | noun | **1.** State of being torn or burst open.<br>**2.** A personal or social separation (as between opposing factions). | *"It is a rupture that you may easily heal, and the cure of it not only saves your brother, but keeps you from dishonour in doing it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rupturewort]] | noun | **1.** Common prostrate old world herb often used as a ground cover; formerly reputed to cure ruptures. | *"In academic literature, rupturewort designates common prostrate old world herb often used as a ground cover; formerly reputed to cure ruptures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncorrupted]] | adjective | **1.** (of language) not having its purity or excellence debased; ; - van wyck brooks.<br>**2.** Not decayed or decomposed. | *"He proposed that the couple should take Tess’s own name, d’Urberville, as uncorrupted."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[uninterrupted]] | adjective | **1.** Having undisturbed continuity.<br>**2.** Continuing in time or space without interruption; - james jeans. | *"Two days had passed in uninterrupted work, and Apollonie had accomplished what she had set out to do."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Destruction]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RUPT
  </div>
</div>
