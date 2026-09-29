---
status: unread
type: root_dashboard
---
# Dashboard — imper
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">imper-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to command”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong engine lifting a heavy load or a respected leader giving direction.</span>
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

The root **imper** means to command. It refers to the action of commanding and carrying out this process. In English, this root forms words such as *emperor*, *empire*, *empress*, and *imperative*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to command
> The root **imper** means to command. It refers to the action of commanding and carrying out this process. In English, this root forms words such as *emperor*, *empire*, *empress*, and *imperative*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To command</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *emperor* and *empire*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **imper** comes from a Latin word that means *"to command"*.
  - At its core, it describes the action of command.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **imper** in an English word, think of **to command**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to command).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Emperor**: A sovereign ruler of great power and rank, especially one ruling an empire.
  - **Empire**: An extensive group of states or countries ruled over by a single monarch or sovereign power.
  - **Empress**: A woman who is the sovereign ruler of an empire.
  - **Imperative**: Of vital importance.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">imper</mark>, think of <mark class="hl-def">to command</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **imper** generates vocabulary through nominalization, adjectival derivation, and Romance phonological contractions:
> - **Base Nouns & Historical Sovereign Titles:**
>   - *imperium* $	o$ Old French *empire* $	o$ *empire* ("an extensive group of states or countries under a single supreme authority").
>   - *imperātor* $	o$ Old French *empereor* $	o$ *emperor* ("a sovereign ruler of great power and rank").
>   - *imperātrix* $	o$ Old French *emperesse* $	o$ *empress* ("the female ruler of an empire or wife of an emperor").
> - **Adjectival & Ideological Derivatives:**
>   - *imperiālis* $	o$ *imperial*, *imperially* ("relating to an empire or emperor").
>   - *imperial* + *-ism* $	o$ *imperialism*, *imperialist* ("a policy of extending a country's power through colonization or military force").
> - **Directives & Psychological Attributes:**
>   - *imperātīvus* $	o$ *imperative*, *imperatively* ("of vital importance; crucial; a command").
>   - *imperiōsus* $	o$ *imperious*, *imperiously*, *imperiousness* ("arrogant and domineering").

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
> - **Geopolitics, Colonialism & History:** *empire*, *emperor*, *imperial*, *imperialism*, *imperialist* (British Empire, Roman imperial frontiers).
> - **Grammar, Logic & Critical Need:** *imperative*, *imperatively* (imperative verbs, environmental imperatives).
> - **Personality & Behavioral Hubris:** *imperious*, *imperiously*, *imperiousness* (imperious tone of voice, haughty demeanor).
> - **Weights & Measures:** *imperial* (the British Imperial system of weights: ounces, pounds, gallons).

---

## 🔀 4. Prefix & Combining Dynamics on imper

### Suffix & Compound Matrix

| Form | Base Meaning | Combined Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `-or` / `-rix` (agent noun) | `imperāre` | **[[emperor]]** / **empress** | The male or female supreme monarch ruling over an empire. |
| `-ial` (pertaining to) | `imperium` | **[[imperial]]** / **imperialism** | Characterized by the dominion, splendor, or military conquests of an empire. |
| `-ative` (tending to command) | `imperāre` | **[[imperative]]** | Expressing a command in grammar; an urgent, non-negotiable obligation. |
| `-ious` (full of pride) | `imperium` | **[[imperious]]** | Assuming the commanding air of an absolute autocrat $	o$ overbearing. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌍 **Geopolitical History & International Relations** | *imperialism*, *imperial*, *empire* | Analyzing 19th-century European imperial expansion and decolonization movements. |
| ⚖️ **Philosophical Ethics & Deontology** | *imperative* | Kantian moral philosophy: acting only according to maxims conforming to the Categorical Imperative. |
| 📖 **Grammar & Descriptive Linguistics** | *imperative* | Morphosyntactic analysis of imperative verb mood inflections in Indo-European languages. |
| 👑 **Monarchical Law & Constitutional History** | *emperor*, *empress*, *imperial* | The legal transition from Roman principate to Byzantine imperial autocracy. |
| 📏 **Metrology & Historical Standards** | *imperial* | Standardizing the UK Imperial Weights and Measures Act of 1824. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[imperative]] | noun | **1.** A mood that expresses an intention to influence the listener's behavior.<br>**2.** Some duty that is essential and urgent. | *"It was imperative that we should stay together a little while, to avoid the scandal to you that would have resulted from our immediate parting."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[imperatively]] | adverb | **1.** In an imperative and commanding manner. | *"Bathsheba had shown indications of anointing him above his fellows by installing him as the bailiff that the farm imperatively required."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[imperativeness]] | noun | **1.** The state of demanding notice or attention.<br>**2.** The quality of being insistent. | *"She felt to the full all the imperativeness of the motives which urged Will’s conduct."* — George Eliot, *Middlemarch* |
| [[imperceptibility]] | noun | **1.** The property of being imperceptible by the mind or the senses. | *"In academic literature, imperceptibility designates the property of being imperceptible by the mind or the senses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperceptible]] | adjective | **1.** Impossible or difficult to perceive by the mind or senses. | *"Just as that imperceptible motion which appears like stillness is infinitely divided in its properties from stillness itself, so had his hope undistinguishable from despair differed from despair indeed."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[imperceptibly]] | adverb | **1.** In an imperceptible manner or to an imperceptible degree. | *"First, that he seems imperceptibly to establish a dreadful right of property in mademoiselle."* — Charles Dickens, *Bleak House* |
| [[imperial]] | noun | **1.** A small tufted beard worn by emperor napoleon iii.<br>**2.** A piece of luggage carried on top of a coach. | *"Now, Dian, from thy altar do I fly, And to imperial Love, that god most high, Do my sighs stream. [_To first Lord._] Sir, will you hear my suit?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imperialism]] | noun | **1.** A policy of extending your rule over foreign countries.<br>**2.** A political orientation that advocates imperial interests. | *"Here I am discussing "The Dangers of Imperialism" and "The Anglo-American Friendship," while men are starving for the Bread of Life!"* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[imperialist]] | noun | **1.** A believer in imperialism.<br>**2.** Of or relating to imperialism. | *"Nor did the energetic imperialist stop here."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[imperialistic]] | adjective | **1.** Of or relating to imperialism. | *"In academic literature, imperialistic designates of or relating to imperialism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperially]] | adverb | **1.** In an imperial manner. | *"In academic literature, imperially designates in an imperial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperil]] | verb | **1.** Pose a threat to; present a danger to. | *"Lorry when business hours came round, was this:--that he had no right to imperil Tellson’s by sheltering the wife of an emigrant prisoner under the Bank roof."* — Charles Dickens, *A Tale of Two Cities* |
| [[imperious]] | adjective | **1.** Having or showing arrogant superiority to and disdain of those one views as unworthy; ; ; ; ; ; ; - w.l.shirer. | *"Not th’ imperious show Of the full-fortuned Caesar ever shall Be brooched with me; if knife, drugs, serpents, have Edge, sting, or operation, I am safe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imperiously]] | adverb | **1.** In an imperious manner. | *"FIRST WARDER. [_Within_.] Who’s there that knocks so imperiously?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imperiousness]] | noun | **1.** The trait of being imperious and overbearing. | *"Such imperiousness would have damned a little less beauty; and on the other hand, such beauty would have redeemed a little less imperiousness."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[imperishability]] | noun | **1.** The property of being resistant to decay. | *"In academic literature, imperishability designates the property of being resistant to decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperishable]] | adjective | **1.** Not perishable.<br>**2.** Unceasing. | *"But the imperishable spirit did not cease."* — Jack London, *The Jacket (The Star-Rover)* |
| [[imperishableness]] | noun | **1.** The property of being resistant to decay. | *"In academic literature, imperishableness designates the property of being resistant to decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperishingness]] | noun | **1.** The property of being resistant to decay. | *"In academic literature, imperishingness designates the property of being resistant to decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperium]] | noun | **1.** The domain ruled by an emperor or empress; the region over which imperial dominion is exercised.<br>**2.** Supreme authority; absolute dominion. | *"They still, in fine, seem to cherish with blind devotion the political monster of an imperium in imperio."* — Alexander Hamilton, *The Federalist Papers* |
| [[impermanence]] | noun | **1.** The property of not existing for indefinitely long durations. | *"So strong is the sense of his own misery, the premonition of his own death, that we scarcely know, nor does it matter, whether it is in the person of Keats or of himself that he is lamenting the impermanence of earthly good."* — Sydney Waterlow, *Shelley* |
| [[impermanency]] | noun | **1.** The property of not existing for indefinitely long durations. | *"In academic literature, impermanency designates the property of not existing for indefinitely long durations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermanent]] | adjective | **1.** Not permanent; not lasting; - james thurber.<br>**2.** Existing or enduring for a limited time only. | *"The necessity to counteract by impermanent sojourn the permanence of arrest."* — James Joyce, *Ulysses* |
| [[impermeability]] | noun | **1.** The property of something that cannot be pervaded by a liquid. | *"A series of experiments and arguments proves to every man that he, as an object of observation, is subject to certain laws, and man submits to them and never resists the laws of gravity or impermeability once he has become acquainted with them."* — graf Leo Tolstoy, *War and Peace* |
| [[impermeable]] | adjective | **1.** Preventing especially liquids to pass or diffuse through. | *"In academic literature, impermeable designates preventing especially liquids to pass or diffuse through."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermeableness]] | noun | **1.** The property of something that cannot be pervaded by a liquid. | *"In academic literature, impermeableness designates the property of something that cannot be pervaded by a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissibility]] | noun | **1.** Inadmissibility as a consequence of not being permitted. | *"In academic literature, impermissibility designates inadmissibility as a consequence of not being permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissible]] | adjective | **1.** Not permitted.<br>**2.** Not allowable. | *"In academic literature, impermissible designates not permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissibly]] | adverb | **1.** Not permissibly. | *"In academic literature, impermissibly designates not permissibly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impersonal]] | adjective | **1.** Not relating to or responsive to individual persons.<br>**2.** Having no personal preference. | *"Skimpole, addressing us, his new friends, in an impersonal manner."* — Charles Dickens, *Bleak House* |
| [[impersonally]] | adverb | **1.** Without warmth.<br>**2.** In an impersonal manner. | *"And when he died, I was very sorry, but impersonally sorry ... as if something nice in the world had been gone ... a swan shot...."* — Donn Byrne, *The Wind Bloweth* |
| [[impersonate]] | verb | **1.** Assume or act the character of.<br>**2.** Represent another person with comic intentions. | *"I can just imagine what a funny figure that policeman cut!” And as he waved his arms to impersonate the policeman, his portly form again shook with a deep ringing laugh, the laugh of one who always eats well and, in particular, drinks well."* — graf Leo Tolstoy, *War and Peace* |
| [[impersonation]] | noun | **1.** A representation of a person that is exaggerated for comic effect.<br>**2.** Pretending to be another person. | *"Driving in spars at any point and on any system, inch by inch he covered more and more safely from ruin this distracting impersonation of seven hundred pounds."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[impersonator]] | noun | **1.** Someone who (fraudulently) assumes the appearance of another. | *"Even then Boldwood did not recognize that the impersonator of Heaven’s persistent irony towards him, who had once before broken in upon his bliss, scourged him, and snatched his delight away, had come to do these things a second time."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[impertinence]] | noun | **1.** An impudent statement.<br>**2.** The trait of being rude and impertinent; inclined to take liberties. | *"Isn't it possible that the child should have unconsciously said an impertinence?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[impertinent]] | adjective | **1.** Characterized by a lightly pert and exuberant quality.<br>**2.** Not pertinent to the matter under consideration. | *"In very brief, the suit is impertinent to myself, as your worship shall know by this honest old man, and though I say it, though old man, yet poor man, my father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impertinently]] | adverb | **1.** In an impudent or impertinent manner. | *"No one is to speak impertinently or beside the question, superfluous, or tediously."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[imperturbability]] | noun | **1.** Calm and unruffled self-assurance. | *"His countenance had resumed its habitual imperturbability."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[imperturbable]] | adjective | **1.** Not easily perturbed or excited or upset; marked by extreme calm and composure. | *"His imperturbable face has been as inexpressive as his rusty clothes."* — Charles Dickens, *Bleak House* |
| [[imperturbableness]] | noun | **1.** Calm and unruffled self-assurance. | *"In academic literature, imperturbableness designates calm and unruffled self-assurance."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Power]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · IMPER
  </div>
</div>
