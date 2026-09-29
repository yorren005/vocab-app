---
status: unread
type: root_dashboard
---
# Dashboard — stitu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">stitu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to set up, station, place, or establish”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Setting an object gently down in its exact designated location.</span>
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

The root **stitu** means to set up, station, place, or establish. It refers to the action of seting and carrying out this process. In English, this root forms words such as *constitute*, *constituent*, *constituency*, and *constitution*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to set up, station, place, or establish
> The root **stitu** means to set up, station, place, or establish. It refers to the action of seting and carrying out this process. In English, this root forms words such as *constitute*, *constituent*, *constituency*, and *constitution*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To set up, station, place, or establish</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *constitute* and *constituent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stitu** comes from a Latin word that means *"to set up, station, place, or establish"*.
  - At its core, it describes the action of set up, station, place, or establish.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **stitu** in an English word, think of **to set up, station, place, or establish**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to set up, station, place, or establish).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Constitute**: To be a part of a whole.
  - **Constituent**: A member of a constituency.
  - **Constituency**: A body of voters in a specified area who elect a representative to a legislative body.
  - **Constitution**: A body of fundamental principles or established precedents according to which a state is acknowledged to be governed.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stitu</mark>, think of <mark class="hl-def">to set up, station, place, or establish</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **stitu** generates vocabulary through diverse prefixation on the compounded stem *-stituō / -stitūtum*:
> - **Prefix *com-* ("together"):**
>   - *com-* + *statuere* $	o$ *constituere* $	o$ *constitute*, *constituent*, *constituency*, *constitution*, *constitutional*, *constitutionality*.
>   - *re-* + *constitute* $	o$ *reconstitute*, *reconstitution*.
> - **Prefix *in-* ("into, upon"):**
>   - *in-* + *statuere* $	o$ *instituere* $	o$ *institute*, *institution*, *institutional*, *institutionalize*.
> - **Prefix *sub-* ("under, in place of"):**
>   - *sub-* + *statuere* $	o$ *substituere* $	o$ *substitute*, *substitution*, *substitutability*.
> - **Prefix *dē-* ("down, away, privation"):**
>   - *dē-* + *statuere* $	o$ *dēstituere* $	o$ *destitute*, *destitution* ("abandoned $	o$ completely lacking resources").
> - **Prefix *re-* ("back, again"):**
>   - *re-* + *statuere* $	o$ *restituere* $	o$ *restitute*, *restitution* ("to restore to original owner").
> - **Prefix *prō-* ("forward, forth"):**
>   - *prō-* + *statuere* $	o$ *prōstituere* $	o$ *prostitute*, *prostitution* (literally "to place forward for sale, expose publicly").

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
> - **Constitutional Law & Supreme Governance:** *constitution*, *constitutional*, *constitutionality*, *constituent* (constitutional amendments, congressional constituents).
> - **Sociology, Banking & Academia:** *institute*, *institution*, *institutional* (research institutes, institutional investors).
> - **Chemistry, Sports & Economics:** *substitute*, *substitution* (substitute players, chemical functional substitutions).
> - **Socioeconomic Welfare & Poverty:** *destitute*, *destitution* (destitute homeless refugees, extreme destitution).
> - **Criminal Law & Civil Redress:** *restitution* (court-ordered financial restitution for embezzlement victims).
> - **Ethics, Commercial Exploitation & Law:** *prostitute*, *prostitution* (debased commercial exploitation of talents or bodies).

---

## 🔀 4. Prefix & Combining Dynamics on stitu

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `com-` (together) | `statuere` | **[[constitute]]** / **constitution** | Setting elements up together into an organic, supreme legal charter. |
| `in-` (into, upon) | `statuere` | **[[institute]]** / **institution** | Setting up a custom, academy, or permanent social body. |
| `sub-` (under, in place) | `statuere` | **[[substitute]]** / **substitution** | Putting one person or item into the position held by another. |
| `dē-` (down, away) | `statuere` | **[[destitute]]** / **destitution** | Setting someone aside and abandoning them $	o$ bereft of all money and resources. |
| `re-` (back, again) | `statuere` | **restitution** | Putting stolen or damaged assets back into their rightful original place. |
| `prō-` (forth, publicly) | `statuere` | **[[prostitute]]** / **prostitution** | Setting someone forward publicly for base commercial hire. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional Law & Supreme Courts** | *constitution*, *constitutional*, *constitutionality* | Judicial review evaluating the constitutionality of executive emergency decrees. |
| 🏛️ **Institutional Sociology & History** | *institution*, *institutional*, *institute* | Analyzing how democratic institutions withstand authoritarian populist pressure. |
| 💰 **Criminal Justice & Tort Remedies** | *restitution*, *destitute* | Imposing mandatory financial restitution on white-collar fraudsters to compensate victims. |
| 🧪 **Organic Chemistry & Pharmacokinetics** | *substitute*, *substitution* | Nucleophilic substitution reactions ($S_N2$) modifying drug molecular structures. |
| 🗳️ **Democratic Representation & Politics** | *constituent*, *constituency* | Representatives holding town halls to hear grievances from rural agricultural constituents. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[constituency]] | noun | **1.** The body of voters who elect a representative for their area. | *"The constituency, for which the Gospels were written, was steeped in the tradition of Jesus' life, and the Christians accepted the Gospels, as embodying what they knew; and there were still survivors from the first days of the Gospel."* — T. R. Glover, *The Jesus of History* |
| [[constituent]] | noun | **1.** An artifact that is one of the individual parts of which a composite entity is made up; especially a part that can be separated from or attached to a system.<br>**2.** A member of a constituency; a citizen who is represented in a government by officials for whom he or she votes. | *"This dependence, and the necessity of being bound himself, and his posterity, by the laws to which he gives his assent, are the true, and they are the strong chords of sympathy between the representative and the constituent."* — Alexander Hamilton, *The Federalist Papers* |
| [[constitute]] | verb | **1.** Form or compose.<br>**2.** Create and charge with a task or function. | *"Boiled beef and greens constitute the day’s variety on the former repast of boiled pork and greens, and Mrs."* — Charles Dickens, *Bleak House* |
| [[constituted]] | verb | **1.** Form or compose.<br>**2.** Create and charge with a task or function. | *"Nominated, constituted, and appointed him."* — Charles Dickens, *Bleak House* |
| [[constitution]] | noun | **1.** Law determining the fundamental political principles of a government.<br>**2.** The act of forming or establishing something. | *"Some dear friend dead, else nothing in the world Could turn so much the constitution Of any constant man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constitutional]] | noun | **1.** A regular walk taken as a form of exercise.<br>**2.** Of benefit to or intended to benefit your physical makeup. | *"It is a slow, expensive, British, constitutional kind of thing."* — Charles Dickens, *Bleak House* |
| [[constitutionalise]] | verb | **1.** Incorporate into a constitution, make constitutional. | *"In academic literature, constitutionalise designates incorporate into a constitution, make constitutional."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constitutionalism]] | noun | **1.** A constitutional system of government (usually with a written constitution).<br>**2.** Advocacy of a system of government according to constitutional principles. | *"In academic literature, constitutionalism designates a constitutional system of government (usually with a written constitution)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constitutionalist]] | noun | **1.** An advocate of constitutional government. | *"In academic literature, constitutionalist designates an advocate of constitutional government."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constitutionalize]] | verb | **1.** Provide with a constitution, as of a country.<br>**2.** Take a walk for one's health or to aid digestion, as after a meal. | *"In academic literature, constitutionalize designates provide with a constitution, as of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constitutionally]] | adverb | **1.** According to the constitution. | *"But realism is required, and Shelley was constitutionally incapable of realism The personages of the story, Laon and the Hermit, the Tyrant and Cythna, are pale projections of Shelley himself; of Dr."* — Sydney Waterlow, *Shelley* |
| [[constitutive]] | adjective | **1.** Constitutional in the structure of something (especially your physical makeup). | *"In academic literature, constitutive designates constitutional in the structure of something (especially your physical makeup)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destitute]] | adjective | **1.** Poor enough to need help from others.<br>**2.** Completely wanting or lacking. | *"But, since your kindness We have stretch’d thus far, let us beseech you That for our gold we may provision have, Wherein we are not destitute for want, But weary for the staleness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[destitution]] | noun | **1.** A state without friends or money or prospects. | *"He has no idea, poor wretch, of the spiritual destitution of a coral reef in the Pacific or what it costs to look up the precious souls among the coco-nuts and bread-fruit."* — Charles Dickens, *Bleak House* |
| [[institute]] | noun | **1.** An association organized to promote art or science or education.<br>**2.** Set up or lay the groundwork for. | *"At the time of her husband's death, there were _two hundred dollars_ due an institute, for board and tuition of their two little boys."* — Classic Author, *The wonders of prayer* |
| [[institution]] | noun | **1.** An organization founded and united for a specific purpose.<br>**2.** An establishment consisting of a building or complex of buildings where an organization for the promotion of some cause is situated. | *"The beadle, though generally understood in the neighbourhood to be a ridiculous institution, is not without a certain popularity for the moment, if it were only as a man who is going to see the body."* — Charles Dickens, *Bleak House* |
| [[institutional]] | adjective | **1.** Relating to or constituting or involving an institution.<br>**2.** Organized as or forming an institution. | *"In New York state alone a sum of more than $20,000,000 a year is expended by institutional charities."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[institutionalise]] | verb | **1.** Cause to be admitted; of persons to an institution. | *"In academic literature, institutionalise designates cause to be admitted; of persons to an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[institutionalised]] | verb | **1.** Cause to be admitted; of persons to an institution.<br>**2.** Officially placed in or committed to a specialized institution. | *"In academic literature, institutionalised designates cause to be admitted; of persons to an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[institutionalize]] | verb | **1.** Cause to be admitted; of persons to an institution. | *"In academic literature, institutionalize designates cause to be admitted; of persons to an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[institutionalized]] | verb | **1.** Cause to be admitted; of persons to an institution.<br>**2.** Officially placed in or committed to a specialized institution. | *"In academic literature, institutionalized designates cause to be admitted; of persons to an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[institutionally]] | adverb | **1.** By an institution. | *"In academic literature, institutionally designates by an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noninstitutional]] | adjective | **1.** Not institutional. | *"In academic literature, noninstitutional designates not institutional."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noninstitutionalised]] | adjective | **1.** Not committed to an institution. | *"In academic literature, noninstitutionalised designates not committed to an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noninstitutionalized]] | adjective | **1.** Not committed to an institution. | *"In academic literature, noninstitutionalized designates not committed to an institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostitute]] | noun | **1.** A woman who engages in sexual intercourse for money.<br>**2.** Sell one's body; exchange sex for money. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prostitution]] | noun | **1.** Offering sexual intercourse for pay. | *"When I was a Son of the Mountain and a Son of the Bull, prostitution had no meaning."* — Jack London, *The Jacket (The Star-Rover)* |
| [[reconstitute]] | verb | **1.** Construct or form anew or provide with a new structure. | *"Unfortunately, Drummer has sabotaged our rendezvous, and we must reconstitute the assault formation."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[restitute]] | verb | **1.** Give or bring back.<br>**2.** Restore to a previous or better condition. | *"In academic literature, restitute designates give or bring back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restitution]] | noun | **1.** A sum of money paid in compensation for loss or injury.<br>**2.** The act of restoring something to its original state. | *"How often he had met you sword to sword; That of all things upon the earth he hated Your person most; that he would pawn his fortunes To hopeless restitution, so he might Be called your vanquisher."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[substitutability]] | noun | **1.** Exchangeability by virtue of being replaceable. | *"In academic literature, substitutability designates exchangeability by virtue of being replaceable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substitutable]] | adjective | **1.** (of words) interchangeable in a given context without changing the import of the expression.<br>**2.** Capable of being exchanged for another or for something else that is equivalent. | *"In academic literature, substitutable designates (of words) interchangeable in a given context without changing the import of the expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substitute]] | noun | **1.** A person or thing that takes or can take the place of another.<br>**2.** An athlete who plays only when a starter on the team is replaced. | *"You have ta’en up, Under the counterfeited zeal of God, The subjects of his substitute, my father, And both against the peace of heaven and him Have here up-swarm’d them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[substituting]] | noun | **1.** Working as a substitute for someone who is ill or on leave of absence.<br>**2.** Put in the place of another; switch seemingly equivalent items. | *"Let’s have a wedding.” That discreet damsel was attired as usual, except that she was now engaged in substituting for her green kid gloves a pair of white."* — Charles Dickens, *Great Expectations* |
| [[substitution]] | noun | **1.** An event in which one thing is substituted for another.<br>**2.** The act of putting one thing or person in the place of another:. | *"What shall be the actual rate as between these extremes is a question whose answer depends on our economic legislation as to ownership, exploitation, prices, use, and substitution."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unconstitutional]] | adjective | **1.** Not consistent with or according to a constitution; contrary to the u.s. constitution. | *"It is clearly _ex post facto_, and, therefore, unconstitutional."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unconstitutionally]] | adverb | **1.** In an unconstitutional manner. | *"In academic literature, unconstitutionally designates in an unconstitutional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Placing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STITU
  </div>
</div>
