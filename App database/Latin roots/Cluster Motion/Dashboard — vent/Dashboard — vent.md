---
status: unread
type: root_dashboard
---
# Dashboard — vent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to come”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **vent** means to come. It refers to the action of coming and carrying out this process. In English, this root forms words such as *invent*, *event*, *convention*, and *adventure*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to come
> The root **vent** means to come. It refers to the action of coming and carrying out this process. In English, this root forms words such as *invent*, *event*, *convention*, and *adventure*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To come</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *invent* and *event*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vent** comes from a Latin word that means *"to come"*.
  - At its core, it describes the action of come.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **vent** in an English word, think of **to come**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to come).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Invent**: To create, design, or originate a new device, mechanism, or process.
  - **Event**: A thing that happens, especially one of importance.
  - **Convention**: A formal meeting or assembly of delegates, representatives, or members of a profession or political party.
  - **Adventure**: N.** 1. An unusual, exciting, hazardous, or daring experience or undertaking.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vent</mark>, think of <mark class="hl-def">to come</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vent** functions as the past-participial and supine base of Latin *veniō* (*ventum*, *ventūrus*), operating through rigorous morphological affixes in English word formation:
>
> - **Supine & Participial Stem:** `vent-` (from Latin *ventum*, neuter supine and perfect passive participle, and *ventūrus*, future active participle).
> - **Future Participial Noun Suffix `-ure` (< Latin *-ūra*):** Combined with *ad-* to form *adventūra* ("that which will arrive"), yielding *adventure* and its aphetic doublet *venture*, carrying the sense of courting future fortune or daring uncertainty.
> - **Abstract Noun Suffix `-ion` (< Latin *-iō, -iōnem*):** Attaches directly to the supine base to generate foundational action and state nouns:
>   - *ad-* + *vent-* + *-ion* $\to$ *advention* (historical) / *invention* (*in-* + *vent-* + *-ion*).
>   - *con-* + *vent-* + *-ion* $\to$ *convention* (act of assembling $\to$ customary rule).
>   - *circum-* + *vent-* + *-ion* $\to$ *circumvention* (act of bypassing).
>   - *contra-* + *vent-* + *-ion* $\to$ *contravention* (act of coming against a law).
>   - *prae-* + *vent-* + *-ion* $\to$ *prevention* (act of anticipating and stopping).
>   - *sub-* + *vent-* + *-ion* $\to$ *subvention* (financial aid coming under a cause).
> - **Adjectival & Relational Suffixes (`-ive`, `-itious`, `-al`, `-ory`):**
>   - `-ive` (< *-īvus*): expressing active disposition or function (*inventive*, *preventive*, *circumventive*).
>   - `-itious` (< *-īcius* / *-ītius*): denoting origin, incidental arrival, or external quality (*adventitious*, "coming from abroad, extraneous").
>   - `-al` (< *-ālis*): forming relational adjectives (*conventional*, *eventual*, *inventorial*).
>   - `-ory` (< *-ōrium* / *-ōrius*): designating a descriptive catalogue or place of finding (*inventory*).
> - **Prefix Dynamics:**
>   - `ad-` ("to, toward") $\to$ *advent*, *adventive*, *adventitious*, *adventure*.
>   - `circum-` ("around, about") $\to$ *circumvent*, *circumvention*, *circumventive*.
>   - `con-` ("together, fully") $\to$ *convent*, *convention*, *conventional*.
>   - `contra-` ("against") $\to$ *contravention*.
>   - `e- / ex-` ("out, forth") $\to$ *event*, *eventual*, *eventuality*.
>   - `in-` ("into, upon") $\to$ *invent*, *invention*, *inventory*.
>   - `prae- / pre-` ("before, in advance") $\to$ *prevent*, *prevention*, *preventive*.
>   - `sub-` ("under, up from below") $\to$ *subvention*, *subventionary*.
>   - `dis-` ("undoing, separation") $\to$ *disinvent*.
>   - `re-` ("again, anew") $\to$ *reinvent*, *reinvention*.
>   - `mis-` ("badly, wrongly") $\to$ *misadventure*.
>   - `un-` ("not, reversal") $\to$ *unconventional*, *uneventful*, *uninventive*, *unpreventable*.

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
> Although the root fundamentally denotes **"to come, arrive, happen"**, its semantic realization branches across six primary operational planes:
>
> - **1. Temporal Arrival & Sacred Manifestation:** In [[advent]], [[adventive]], [[adventitious]], [[adventitiously]], and [[adventitiousness]], coming represents an arrival across time, geography, or biology—from the advent of revolutionary technology and the liturgical Advent of Christ to non-native plant species arriving in foreign soil.
> - **2. Existential Risk & Daring Enterprise:** In [[adventure]], [[adventurer]], [[adventuresome]], [[adventurous]], [[adventurously]], [[adventurousness]], [[misadventure]], [[venture]], [[venturer]], [[venturesome]], and [[venturesomeness]], the future participle *ventūra* ("things about to come") evokes human agency facing the unpredictable future—exploring untamed frontiers, underwriting high-risk capital ventures, or suffering legal catastrophe (*death by misadventure*).
> - **3. Civic Convergence, Norms & Social Consensus:** In [[convent]], [[convention]], [[conventional]], [[conventionality]], [[conventionalize]], [[conventionally]], [[unconventional]], and [[unconventionally]], physical gathering (*conventus*) evolves into the social fabric of custom, diplomatic treaties (the Geneva Conventions), artistic canons, and standard practices, against which the *unconventional* mind rebels.
> - **4. Intellectual Discovery, Generative Creation & Stock-Taking:** In [[invent]], [[invention]], [[inventive]], [[inventively]], [[inventiveness]], [[inventor]], [[disinvent]], [[reinvent]], [[reinvention]], [[uninventive]], [[inventory]], and [[inventorial]], the physical act of "coming upon" (*inventiō*) flowers into technological ingenuity, imaginative fabrication, and the rigorous accounting of material goods found in stock.
> - **5. Historical Occurrence, Causality & Inevitable Outcome:** In [[event]], [[eventful]], [[eventfully]], [[uneventful]], [[uneventfully]], [[eventual]], [[eventuality]], and [[eventually]], what "comes out" of antecedent causes (*ēventus*) governs the unfolding of history, unforeseen contingencies, and final philosophical outcomes.
> - **6. Strategic Preemption, Evasion & Institutional Support:** In [[prevent]], [[preventable]], [[unpreventable]], [[prevention]], [[preventive]], [[preventively]], [[preventiveness]], [[preventative]], [[circumvent]], [[circumvention]], [[circumventive]], [[contravention]], [[subvention]], and [[subventionary]], motion is strategically manipulated—racing ahead of an evil to block it (*prevention*), finding a way around legal barriers (*circumvention*), trespassing against mandates (*contravention*), or coming under with state financial aid (*subvention*).

---

## 🔀 4. Prefix & Combining Dynamics on vent

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[advent]], [[adventure]] | Motion *toward* an observer (arrival) or toward an uncertain future (perilous undertaking). |
| `circum-` | around, about | [[circumvent]], [[circumvention]] | Coming *around* an obstacle, fortification, or rule; strategic evasion or outflanking. |
| `con-` | together, with | [[convent]], [[convention]] | Coming *together* into an assembly, yielding shared customs, treaties, and formal agreements. |
| `contra-` | against, opposite | [[contravention]] | Coming *against* a statute, treaty, or principle; a legal breach or violation. |
| `e- / ex-` | out of, forth | [[event]], [[eventual]] | Coming *out* from prior causes; an occurrence, happening, or ultimate consequence. |
| `in-` | in, into, upon | [[invent]], [[inventory]] | Coming *upon* something; discovering a novel device/argument or cataloguing goods found. |
| `prae- / pre-` | before, in front of | [[prevent]], [[prevention]] | Coming *before*; historically preceding to guide, and modernly anticipating so as to block. |
| `sub-` | under, from below | [[subvention]], [[subventionary]] | Coming *under* to support; financial aid, subsidy, or endowment provided to an institution. |
| `dis-` | apart, reversal | [[disinvent]] | To *undo* or abolish an invention; conceptually reversing a technological discovery. |
| `re-` | back, again | [[reinvent]], [[reinvention]] | Coming upon *again*; transforming or creating anew from existing foundations. |
| `mis-` | badly, wrongly | [[misadventure]] | An unfortunate coming-to-pass; an accident, disaster, or mishap without criminal intent. |
| `un-` | not, opposite of | [[unconventional]], [[uneventful]] | Negation of the base: not bound by social custom, or devoid of significant occurrences. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ure` (< *-ūra*) | Noun (Future Act / Destiny) | [[adventure]], [[venture]] | Denotes an undertaking courting future fortune, risk, or hazardous enterprise. |
| `-ion` (< *-iō, -iōnem*) | Noun (Action / Result / State) | [[convention]], [[invention]] | Solidifies verbal action into an abstract noun, institutional body, or physical device. |
| `-ive` (< *-īvus*) | Adjective / Agent Noun | [[inventive]], [[preventive]] | Marks the active capacity or propensity to discover solutions or forestall harms. |
| `-itious` (< *-īcius*) | Adjective (Origin / Quality) | [[adventitious]] | Denotes coming from outside; accidental, extrinsic, or arising in an unusual botanical locus. |
| `-or` (< *-or*) | Noun (Agent / Originator) | [[inventor]] | Identifies the personal agent who discovers, creates, or designs a new process or machine. |
| `-ory` (< *-ōrium*) | Noun / Relational Adj. | [[inventory]], [[inventorial]] | Designates a detailed ledger, register, or catalogue of goods and assets discovered. |
| `-al` (< *-ālis*) | Adjective (Pertaining to) | [[conventional]], [[eventual]] | Converts nouns into relational adjectives describing adherence to norms or final outcome. |
| `-ity` (< *-itās*) | Noun (State / Property) | [[eventuality]], [[conventionality]] | Expresses the abstract condition of being contingent or bound to customary tradition. |
| `-ize` (< Greek *-izein*) | Verb (Causative / Formative) | [[conventionalize]] | To cause something to conform to established artistic, cultural, or social conventions. |
| `-some` (< OE *-sum*) | Adjective (Tendency / Character) | [[venturesome]], [[adventuresome]] | Conveys an inherent disposition or inclination toward courting daring risks. |
| `-able` (< *-ābilis*) | Adjective (Passive Capacity) | [[preventable]], [[unpreventable]] | Indicates capability of being stopped, avoided, or forestalled by timely intervention. |
| `-ly` (< OE *-līce*) | Adverb (Manner / Mode) | [[eventually]], [[conventionally]] | Modifies verbs and clauses to express finality in time or conformity with social standard. |
| `-ness` (< OE *-nes*) | Noun (Abstract Quality) | [[inventiveness]], [[preventiveness]] | Designates the intrinsic quality of creative brilliance or prophylactic efficacy. |
| `-ary` (< *-ārius*) | Adjective (Relating to) | [[subventionary]] | Characterizes policies, funds, or measures that relate to state subsidies or financial aid. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Classical Rhetoric & Invention** | [[invent]], [[invention]], [[inventive]], [[inventor]] | Cicero's *inventiō*: the foundational heuristic canon of discovering persuasive proofs and authentic arguments by surveying rhetorical *loci* (topoi). |
| ⛪ **Liturgy & Christian Theology** | [[advent]], [[adventive]] | The sacred season of Advent; the dual eschatological contemplation of Christ's historical Incarnation and triumphant Second Coming (*Adventus Domini*). |
| 📦 **Corporate Accounting & Logistics** | [[inventory]], [[inventorial]] | Perpetual stock auditing, warehouse supply-chain tracking, balance-sheet valuation of goods on hand, and just-in-time inventory control. |
| 🩺 **Public Health & Epidemiology** | [[prevent]], [[prevention]], [[preventive]], [[preventable]] | Primary, secondary, and tertiary prophylaxis; preventive oncology; immunization campaigns designed to eradicate preventable communicable mortality. |
| 💼 **Venture Capital & Entrepreneurship** | [[venture]], [[venturer]], [[venturesome]] | Early-stage equity syndication, angel financing, entrepreneurial risk-taking, and joint commercial ventures navigating market volatility. |
| 🌐 **Diplomacy & International Law** | [[convention]], [[conventional]], [[contravention]] | The Geneva Conventions governing warfare; the Vienna Convention on Diplomatic Relations; legal sanctions for treaty contravention. |
| 🌿 **Botany & Evolutionary Biology** | [[adventitious]], [[adventive]] | Adventitious root systems emerging from stems rather than radicles; adventive plant species establishing feral colonies in non-native biomes. |
| ⚖️ **Jurisprudence & Civil Law** | [[circumvention]], [[misadventure]], [[subvention]] | Evasion of statutory tax obligations; coroner verdicts of accidental death by misadventure; sovereign subventions subsidizing public infrastructure. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advent]] | noun | **1.** Arrival that has been awaited (especially of something momentous).<br>**2.** The season including the four sundays preceding christmas. | *"I am the turned-forth, be it known to you, That have preserved her welfare in my blood And from her bosom took the enemy’s point, Sheathing the steel in my advent’rous body."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adventism]] | noun | **1.** Any christian religion that believes the second coming of christ is imminent. | *"In academic literature, adventism designates any christian religion that believes the second coming of christ is imminent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventist]] | noun | **1.** A member of christian denomination that expects the imminent advent of christ. | *"In academic literature, adventist designates a member of christian denomination that expects the imminent advent of christ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventitia]] | noun | **1.** An enveloping or covering membrane or layer of body tissue. | *"In academic literature, adventitia designates an enveloping or covering membrane or layer of body tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventitial]] | adjective | **1.** Of or pertaining to the adventitia. | *"In academic literature, adventitial designates of or pertaining to the adventitia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventitious]] | adjective | **1.** Associated by chance and not an integral part; - frederick w. robertson. | *"It was then that the ecstasy and the dream began, in which emotion was the matter of the universe, and matter but an adventitious intrusion likely to hinder you from spinning where you wanted to spin."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[adventive]] | adjective | **1.** Not native and not fully established; locally or temporarily naturalized. | *"In academic literature, adventive designates not native and not fully established; locally or temporarily naturalized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventure]] | noun | **1.** A wild and exciting undertaking (not necessarily lawful).<br>**2.** Take a risk in the hope of a favorable outcome. | *"If you saw yourself with your eyes or knew yourself with your judgement, the fear of your adventure would counsel you to a more equal enterprise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adventurer]] | noun | **1.** A person who enjoys taking risks.<br>**2.** Someone who travels into little known regions (especially for some scientific purpose). | *"There she is with plenty of money, and a house and farm, and horses, and comfort, and here am I living from hand to mouth—a needy adventurer."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[adventuresome]] | adjective | **1.** Willing to undertake or seeking out new and daring enterprises. | *"In academic literature, adventuresome designates willing to undertake or seeking out new and daring enterprises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventuress]] | noun | **1.** A woman adventurer. | *"The facts are briefly these: Some five years ago, during a lengthy visit to Warsaw, I made the acquaintance of the well-known adventuress, Irene Adler."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[adventurism]] | noun | **1.** Recklessness in politics or foreign affairs. | *"In academic literature, adventurism designates recklessness in politics or foreign affairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventuristic]] | adjective | **1.** Of or pertaining to adventurism. | *"In academic literature, adventuristic designates of or pertaining to adventurism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventurous]] | adjective | **1.** Willing to undertake or seeking out new and daring enterprises. | *"But if I cannot win you to this love, Go search like nobles, like noble subjects, And in your search spend your adventurous worth; Whom if you find, and win unto return, You shall like diamonds sit about his crown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adventurousness]] | noun | **1.** The trait of being adventurous. | *"In academic literature, adventurousness designates the trait of being adventurous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumvent]] | verb | **1.** Surround so as to force to give up.<br>**2.** Beat through cleverness and wit. | *"This might be the pate of a politician which this ass now o’er-offices, one that would circumvent God, might it not?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumvention]] | noun | **1.** The act of evading by going around. | *"What ever have been thought on in this state That could be brought to bodily act ere Rome Had circumvention? ’Tis not four days gone Since I heard thence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contravention]] | noun | **1.** Coming into conflict with. | *"This power must either be a direct negative on the State laws, or an authority in the federal courts to overrule such as might be in manifest contravention of the articles of Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[convent]] | noun | **1.** A religious residence especially for nuns.<br>**2.** A community of people in a religious order (especially nuns) living together. | *"One of our convent, and his confessor, Gives me this instance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conventicle]] | noun | **1.** A secret unauthorized meeting for religious worship.<br>**2.** A building for religious assembly (especially nonconformists, e.g., quakers). | *"Ay, all of you have laid your heads together— Myself had notice of your conventicles— And all to make away my guiltless life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convention]] | noun | **1.** A large formal assembly.<br>**2.** Something regarded as a normative example. | *"Why not be revenged on society by shaping his future domesticities loosely, instead of kissing the pedagogic rod of convention in this ensnaring manner?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conventional]] | adjective | **1.** Following accepted customs and proprieties.<br>**2.** Conforming with accepted standards. | *"Most of the misery had been generated by her conventional aspect, and not by her innate sensations."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conventionalisation]] | noun | **1.** The act of conventionalizing; conforming to a conventional style. | *"In academic literature, conventionalisation designates the act of conventionalizing; conforming to a conventional style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventionalise]] | verb | **1.** Make conventional or adapt to conventions. | *"In some instances the tiled roof of the tower is represented by tile-mouldings on the shoulder; but in this instance the form is entirely conventionalised into a cylindrical vase supported by three bear-shaped feet."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[conventionalised]] | verb | **1.** Make conventional or adapt to conventions.<br>**2.** Using artistic forms and conventions to create effects; not natural or spontaneous. | *"In some instances the tiled roof of the tower is represented by tile-mouldings on the shoulder; but in this instance the form is entirely conventionalised into a cylindrical vase supported by three bear-shaped feet."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[conventionalism]] | noun | **1.** Orthodoxy as a consequence of being conventional. | *"Such crystallization, such conventionalisms, yield only to the dissolving power of the spiritual warmth of life-full personalities."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[conventionality]] | noun | **1.** Conformity with conventional thought and behavior.<br>**2.** Unoriginality as a result of being too conventional. | *"Her unsophisticated open-air existence required no varnish of conventionality to make it palatable to him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conventionalization]] | noun | **1.** The act of conventionalizing; conforming to a conventional style. | *"In academic literature, conventionalization designates the act of conventionalizing; conforming to a conventional style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventionalize]] | verb | **1.** Make conventional or adapt to conventions.<br>**2.** Represent according to a conventional style. | *"I thought it was only women who were privileged to change their mind,” she began brightly; but Arkwright ignored her attempt to conventionalize the situation."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[conventionalized]] | verb | **1.** Make conventional or adapt to conventions.<br>**2.** Represent according to a conventional style. | *"In academic literature, conventionalized designates make conventional or adapt to conventions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventionally]] | adverb | **1.** In a conventional manner. | *"The more his life changed, the more it was the same thing--the same plunging without forethought, the same disregard for all that is conventionally deemed necessary."* — Sydney Waterlow, *Shelley* |
| [[conventioneer]] | noun | **1.** Someone who attends a convention. | *"In academic literature, conventioneer designates someone who attends a convention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventual]] | adjective | **1.** Of communal life sequestered from the world under religious vows. | *"Whether the barn had ever formed one of a group of conventual buildings nobody seemed to be aware; no trace of such surroundings remained."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[coventry]] | noun | **1.** The state of being banished or ostracized (excluded from society by general consent).<br>**2.** An industrial city in central england; devastated by air raids during world war ii; remembered as the home of lady godiva in the 11th century. | *"Bardolph, get thee before to Coventry; fill me a bottle of sack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[event]] | noun | **1.** Something that happens at a given place and time.<br>**2.** A special set of circumstances. | *"Poor lord, is’t I That chase thee from thy country, and expose Those tender limbs of thine to the event Of the none-sparing war?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eventide]] | noun | **1.** The latter part of the day (the period of decreasing daylight from late afternoon until nightfall). | *"Though the overshadowing trees and the approach of eventide enveloped them in gloom, Bathsheba could see plainly enough to discern the extreme poverty of the woman’s garb, and the sadness of her face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[eventration]] | noun | **1.** Protrusion of the intestine through the abdominal wall. | *"In academic literature, eventration designates protrusion of the intestine through the abdominal wall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eventual]] | adjective | **1.** Expected to follow in the indefinite future from causes already operating. | *"The business companies have had a dismal history of hardship to surviving members and of eventual failure."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[eventuality]] | noun | **1.** A possible event or occurrence or result. | *"What exactitude, what minuteness, what knowledge of the locality, what foresight for every eventuality, every possibility even to the smallest detail!"* — graf Leo Tolstoy, *War and Peace* |
| [[eventually]] | adverb | **1.** After an unspecified period of time or an especially long delay. | *"When you had the presence of mind to suggest that Benwick would be the properest person to fetch a surgeon, you could have little idea of his being eventually one of those most concerned in her recovery.” “Certainly I could have none."* — Jane Austen, *Persuasion* |
| [[eventuate]] | verb | **1.** Come out in the end. | *"In academic literature, eventuate designates come out in the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intervention]] | noun | **1.** The act of intervening (as to mediate a dispute, etc.).<br>**2.** A policy of intervening in the affairs of other countries. | *"When at length the vote came to be taken, and Fraser was elected by a majority of three, there were few who doubted that the intervention of the Berwick minister had been of critical importance in bringing about this result."* — John Cairns, *Principal Cairns* |
| [[intraventricular]] | adjective | **1.** Within the system of ventricles in the brain. | *"In academic literature, intraventricular designates within the system of ventricles in the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invent]] | verb | **1.** Come up with (an idea, plan, explanation, theory, or principle) after a mental effort.<br>**2.** Make up something artificial or untrue. | *"I say she never did invent this letter; This is a man’s invention, and his hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invention]] | noun | **1.** The creation of something in the mind.<br>**2.** A creation (a new device or process) resulting from study and experimentation. | *"O give thyself the thanks if aught in me, Worthy perusal stand against thy sight, For who’s so dumb that cannot write to thee, When thou thyself dost give invention light?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inventive]] | adjective | **1.** (used of persons or artifacts) marked by independence and creativity in thought or action; ; - lewis mumford. | *"It seemed as if, could I but go back to the idea which had last entered my mind as I stood at the window, some inventive suggestion would rise for my relief."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[inventively]] | adverb | **1.** In an inventive manner. | *"In academic literature, inventively designates in an inventive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inventiveness]] | noun | **1.** The power of creative imagination. | *"It's a wonder the modern child has a trace of resource or inventiveness left in him."* — Grace S. Richmond, *Red Pepper Burns* |
| [[inventor]] | noun | **1.** Someone who is the first to think of or make something. | *"But in these cases We still have judgement here; that we but teach Bloody instructions, which being taught, return To plague th’ inventor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inventory]] | noun | **1.** A detailed list of all the items in stock.<br>**2.** The merchandise that a shop has on hand. | *"The leanness that afflicts us, the object of our misery, is as an inventory to particularize their abundance; our sufferance is a gain to them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inventorying]] | noun | **1.** Making an itemized list of merchandise or supplies on hand.<br>**2.** Make or include in an itemized record or report. | *"In academic literature, inventorying designates making an itemized list of merchandise or supplies on hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misadventure]] | noun | **1.** An instance of misfortune. | *"Your looks are pale and wild, and do import Some misadventure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonevent]] | noun | **1.** An anticipated event that turns out to be far less significant than was expected. | *"In academic literature, nonevent designates an anticipated event that turns out to be far less significant than was expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonintervention]] | noun | **1.** A foreign policy of staying out of other countries' disputes. | *"Wait, I have not finished...” he said to Prince Andrew, seizing him by the arm, “I believe that intervention will be stronger than nonintervention."* — graf Leo Tolstoy, *War and Peace* |
| [[peradventure]] | noun | **1.** Doubt or uncertainty as to whether something is the case.<br>**2.** By chance. | *"Yet you must be saying Martius is proud, who, in a cheap estimation, is worth all your predecessors since Deucalion, though peradventure some of the best of ’em were hereditary hangmen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prevent]] | verb | **1.** Keep from happening or arising; make impossible.<br>**2.** Stop (someone or something) from doing something or being in a certain state. | *"Give my love fame faster than Time wastes life, So thou prevent’st his scythe, and crooked knife. 101 O truant Muse what shall be thy amends, For thy neglect of truth in beauty dyed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preventable]] | adjective | **1.** Capable of being prevented; - a.l.guerard. | *"In academic literature, preventable designates capable of being prevented; - a.l.guerard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preventative]] | noun | **1.** Remedy that prevents or slows the course of an illness or disease.<br>**2.** Any obstruction that impedes or is burdensome. | *"In academic literature, preventative designates remedy that prevents or slows the course of an illness or disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prevention]] | noun | **1.** The act of preventing. | *"But God be thanked for prevention, Which I in sufferance heartily will rejoice, Beseeching God and you to pardon me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preventive]] | noun | **1.** Remedy that prevents or slows the course of an illness or disease.<br>**2.** Any obstruction that impedes or is burdensome. | *"A similar preventive is employed for the same purpose by North American Indians and European peasants."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[proventil]] | noun | **1.** A bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness. | *"In academic literature, proventil designates a bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reinvent]] | verb | **1.** Bring back into existence.<br>**2.** Create anew and make over. | *"In academic literature, reinvent designates bring back into existence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventeen]] | noun | **1.** The cardinal number that is the sum of sixteen and one.<br>**2.** Being one more than sixteen. | *"FIRST SOLDIER. _Boskos vauvado._ I understand thee, and can speak thy tongue. _Kerelybonto._ Sir, Betake thee to thy faith, for seventeen poniards are at thy bosom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seventeenth]] | noun | **1.** Position 17 in a countable series of things.<br>**2.** Coming next after the sixteenth in position. | *"I had just finished my seventeenth and Leonore her eighteenth year when a summer came which was to bring grave changes."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[seventies]] | noun | **1.** The decade from 1970 to 1979.<br>**2.** The time of life between 70 and 80. | *"Massachusetts developed in the seventies a commission of "the advisory type" which investigated and made public the conditions, leaving to public opinion the correction of the evils."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[seventieth]] | noun | **1.** Position 70 in a countable series of things.<br>**2.** The ordinal number of seventy in counting order. | *"It is now that part of New York known as Bloomingdale, on the west side, between about Seventieth and One Hundredth Streets."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[seventy]] | noun | **1.** The cardinal number that is the product of ten and seven.<br>**2.** Being ten more than sixty. | *"Worthy Martius, Had we no other quarrel else to Rome but that Thou art thence banished, we would muster all From twelve to seventy and, pouring war Into the bowels of ungrateful Rome, Like a bold flood o’erbear ’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seventy-eight]] | noun | **1.** The cardinal number that is the sum of seventy and eight.<br>**2.** A shellac based phonograph record that played at 78 revolutions per minute. | *"In academic literature, seventy-eight designates the cardinal number that is the sum of seventy and eight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-fifth]] | adjective | **1.** The ordinal number of seventy-five in counting order. | *"In academic literature, seventy-fifth designates the ordinal number of seventy-five in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-five]] | adjective | **1.** Being five more than seventy. | *"In academic literature, seventy-five designates being five more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-four]] | adjective | **1.** Being four more than seventy. | *"In academic literature, seventy-four designates being four more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-nine]] | adjective | **1.** Being nine more than seventy. | *"In academic literature, seventy-nine designates being nine more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-one]] | adjective | **1.** Being one more than seventy. | *"In academic literature, seventy-one designates being one more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-seven]] | adjective | **1.** Being seven more than seventy. | *"In academic literature, seventy-seven designates being seven more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-six]] | adjective | **1.** Being six more than seventy. | *"In academic literature, seventy-six designates being six more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-three]] | adjective | **1.** Being three more than seventy. | *"In academic literature, seventy-three designates being three more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-two]] | adjective | **1.** Being two more than seventy. | *"In academic literature, seventy-two designates being two more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvent]] | verb | **1.** Guarantee financial support of. | *"In academic literature, subvent designates guarantee financial support of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvention]] | noun | **1.** Grant of financial aid as from a government to an educational institution.<br>**2.** The act or process of providing aid or help of any sort. | *"But further, the general public interests may be recognized through the payments in aid of the funds (subsidies, subventions)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[supervention]] | noun | **1.** A following on in addition. | *"In academic literature, supervention designates a following on in addition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unadventurous]] | adjective | **1.** Lacking in boldness. | *"In academic literature, unadventurous designates lacking in boldness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconventional]] | adjective | **1.** Not conforming to accepted rules or standards.<br>**2.** Not conventional or conformist. | *"There are occasions when girls like Bathsheba will put up with a great deal of unconventional behaviour."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unconventionality]] | noun | **1.** Originality by virtue of being unconventional.<br>**2.** Unorthodoxy by virtue of being unconventional. | *"Impulsiveness, unconventionality, and girlish irresponsibility were all very delightful, of course--at times; but not now, certainly."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[unconventionally]] | adverb | **1.** In an unconventional manner. | *"In academic literature, unconventionally designates in an unconventional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninventive]] | adjective | **1.** Deficient in originality or creativity; lacking powers of invention. | *"In academic literature, uninventive designates deficient in originality or creativity; lacking powers of invention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpreventable]] | adjective | **1.** Not preventable. | *"There is also an unpreventable wear of parts that cannot be replaced without replacing the whole machine."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[unvented]] | adjective | **1.** Not provided with vents. | *"In academic literature, unvented designates not provided with vents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unventilated]] | adjective | **1.** Not ventilated. | *"In academic literature, unventilated designates not ventilated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vent]] | noun | **1.** A hole for the escape of gas or air.<br>**2.** External opening of urinary or genital system of a lower vertebrate. | *"I did think thee, for two ordinaries, to be a pretty wise fellow; thou didst make tolerable vent of thy travel; it might pass."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ventail]] | noun | **1.** A medieval hood of mail suspended from a basinet to protect the head and neck. | *"In academic literature, ventail designates a medieval hood of mail suspended from a basinet to protect the head and neck."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vented]] | verb | **1.** Give expression or utterance to.<br>**2.** Expose to cool or cold air so as to cool or freshen. | *"His marriage seemed an unmitigated calamity; and he was afraid of going to Rosamond before he had vented himself in this solitary rage, lest the mere sight of her should exasperate him and make him behave unwarrantably."* — George Eliot, *Middlemarch* |
| [[venter]] | noun | **1.** A speaker who expresses or gives vent to a personal opinion or grievance.<br>**2.** The region of the body of a vertebrate between the thorax and the pelvis. | *"Do not venter, Ile make your wedding cloaths fit closer t'ee then; I but disturb you, lie go see my nephew: _Lew_."* — John Fletcher, *The Elder Brother* |
| [[ventilate]] | verb | **1.** Expose to cool or cold air so as to cool or freshen.<br>**2.** Expose to the circulation of fresh air so as to retard spoilage. | *"But one pamphlet, 'A Proposal for putting Reform to the Vote' (1817), is characteristic of the way in which he was always labouring to do something, not merely to ventilate existing evils, but to promote some practical scheme for abolishing them."* — Sydney Waterlow, *Shelley* |
| [[ventilated]] | verb | **1.** Expose to cool or cold air so as to cool or freshen.<br>**2.** Expose to the circulation of fresh air so as to retard spoilage. | *"The house was ventilated by two round holes, like the lights of a ship’s cabin, with wood slides."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ventilation]] | noun | **1.** The act of supplying fresh air and getting rid of foul air.<br>**2.** A mechanical system in a building that provides fresh air. | *"Along each side wall was a range of striding buttresses, throwing deep shadows on the spaces between them, which were perforated by lancet openings, combining in their proportions the precise requirements both of beauty and ventilation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ventilator]] | noun | **1.** A device (such as a fan) that introduces fresh air or expels foul air.<br>**2.** A device that facilitates breathing in cases of respiratory failure. | *"The next day after this, on going into his room, he laid before me an empty envelope, and a five dollar bill, and asked me the question, "Did you throw that envelope with that bill in it, through that ventilator?" I assured him that I did not."* — Classic Author, *The wonders of prayer* |
| [[ventilatory]] | adjective | **1.** Provided with ventilation or involving pulmonary ventilation. | *"In academic literature, ventilatory designates provided with ventilation or involving pulmonary ventilation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venting]] | noun | **1.** The act of venting.<br>**2.** Give expression or utterance to. | *"Darcy was attending them to their carriage, Miss Bingley was venting her feelings in criticisms on Elizabeth’s person, behaviour, and dress."* — Jane Austen, *Pride and Prejudice* |
| [[ventner]] | noun | **1.** United states geneticist who published the complete base sequences for all the genes of a free-living organism, the influenza bacterium; later led team that developed a first draft of the entire human genome (born in 1946). | *"In academic literature, ventner designates united states geneticist who published the complete base sequences for all the genes of a free-living organism, the influenza bacterium; later led team that developed a first draft of the entire human genome (born in 1946)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventolin]] | noun | **1.** A bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness. | *"In academic literature, ventolin designates a bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventose]] | noun | **1.** Sixth month of the revolutionary calendar (february and march); the windy month. | *"In academic literature, ventose designates sixth month of the revolutionary calendar (february and march); the windy month."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventral]] | adjective | **1.** Toward or on or near the belly (front of a primate or lower surface of a lower animal).<br>**2.** Nearest to or facing toward the axis of an organ or organism. | *"In academic literature, ventral designates toward or on or near the belly (front of a primate or lower surface of a lower animal)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventrally]] | adverb | **1.** In a ventral location or direction. | *"In academic literature, ventrally designates in a ventral location or direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricle]] | noun | **1.** One of four connected cavities in the brain; is continuous with the central canal of the spinal cord and contains cerebrospinal fluid.<br>**2.** A chamber of the heart that receives blood from an atrium and pumps it to the arteries. | *"These are begot in the ventricle of memory, nourished in the womb of _pia mater_, and delivered upon the mellowing of occasion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ventricose]] | adjective | **1.** Having a swelling on one side. | *"In academic literature, ventricose designates having a swelling on one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricous]] | adjective | **1.** Having a swelling on one side. | *"In academic literature, ventricous designates having a swelling on one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricular]] | adjective | **1.** Of or relating to a ventricle (of the heart or brain). | *"In academic literature, ventricular designates of or relating to a ventricle (of the heart or brain)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventriculus]] | noun | **1.** Thick-walled muscular pouch below the crop in many birds and reptiles for grinding food. | *"In academic literature, ventriculus designates thick-walled muscular pouch below the crop in many birds and reptiles for grinding food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventriloquism]] | noun | **1.** The art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy). | *"He’s uncommonly good at ventriloquism, and he did it uncommonly well, by God!"* — George Eliot, *Middlemarch* |
| [[ventriloquist]] | noun | **1.** A performer who projects the voice into a wooden dummy. | *"Make haste up, Millers.” Millers, who was the other nurse, retired into the house, and by degrees the child’s wailing was hushed and stopped, as if it were a young ventriloquist with something in its mouth."* — Charles Dickens, *Great Expectations* |
| [[ventriloquy]] | noun | **1.** The art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy). | *"In academic literature, ventriloquy designates the art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venture]] | noun | **1.** Any venturesome undertaking especially one with an uncertain outcome.<br>**2.** An investment that is very risky but could yield great profits. | *"Upon thy certainty and confidence What dar’st thou venture?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venturer]] | noun | **1.** A merchant who undertakes a trading venture (especially a venture that sends goods overseas).<br>**2.** A person who enjoys taking risks. | *"The whole surface of your land, gentlemen, is one wild sea of beauty, ready to toss into the lap of every venturer upon it, a farm."* — W. E. Webb, *Buffalo Land* |
| [[venturesome]] | adjective | **1.** Disposed to venture or take risks. | *"It was most venturesome for a woman, at night, and alone."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[venturesomeness]] | noun | **1.** The trait of being adventurous. | *"Look again at his venturesomeness in trusting the Gospel to the twelve and to us--and in facing the Cross."* — T. R. Glover, *The Jesus of History* |
| [[venturi]] | noun | **1.** United states architect (born in 1925).<br>**2.** A tube with a constriction; used to control fluid flow (as in the air inlet of a carburetor). | *"In academic literature, venturi designates united states architect (born in 1925)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venturous]] | adjective | **1.** Disposed to venture or take risks. | *"Of all exploits since first I follow’d arms Ne’er heard I of a warlike enterprise More venturous or desperate than this."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · VENT
  </div>
</div>
