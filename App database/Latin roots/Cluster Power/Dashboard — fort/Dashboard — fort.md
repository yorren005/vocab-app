---
status: unread
type: root_dashboard
---
# Dashboard — fort
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fort-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“strong”</span>
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

The root **fort** means strong. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *fort*, *fortify*, *fortitude*, and *comfort*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: strong
> The root **fort** means strong. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *fort*, *fortify*, *fortitude*, and *comfort*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Strong</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *fort* and *fortify*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fort** comes from a Latin word that means *"strong"*.
  - At its core, it describes strong.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **fort** in an English word, think of **power, ability, and authority**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of strong.
  - **Mental & Social**: How people experience, organize, or communicate about strong.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fort**: An everyday English word showing the root's idea of *strong*.
  - **Fortify**: To provide a place with defensive works as protection against attack.
  - **Fortitude**: Courage in pain or adversity.
  - **Comfort**: A state of physical ease and freedom from pain or constraint.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fort</mark>, think of <mark class="hl-def">power, ability, and authority</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **fort** generates vocabulary through nominalization, factitives with *-ficāre*, and Romance prefixation:
> - **Base Adjective & Military Nouns:**
>   - *fortis* $	o$ *fort* ("a fortified military building"), *fortress* ("a large, permanent fort").
>   - *fortis* + *facere* $	o$ *fortificāre* $	o$ *fortify*, *fortification* ("to make strong with walls or nutrients").
>   - *fortitūdō* $	o$ *fortitude* ("courage in pain or adversity").
>   - Italian *forte* $	o$ *forte* ("a person's strong suit; loud in music").
> - **Prefix Modifications with *con-* (*com-*):**
>   - *con-* + *fortis* $	o$ Late Latin *confortāre* $	o$ *comfort*, *comfortable*, *comforting*, *discomfort*.
>   - *ex-* + *fortis* $	o$ Old French *esforcier* $	o$ *effort*, *effortless* ("straining one's strength").
> - **Romance Nominalization *fortia* $	o$ *force*:**
>   - *force* $	o$ *force*, *forceful*, *forcible*.
>   - *in-* + *force* $	o$ *enforce*, *enforcement*, *enforceable*.
>   - *re-* + *in-* + *force* $	o$ *reinforce*, *reinforcement*.
> - **Musical Italian Compound:**
>   - *piano* ("soft") + *forte* ("loud") $	o$ *pianoforte* (the piano, able to play both soft and loud notes).

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
> - **Military Architecture & Defense:** *fort*, *fortress*, *fortify*, *fortification* (star forts, coastal defense batteries).
> - **Moral Philosophy & Character:** *fortitude*, *forte* (stoic resilience, special talents).
> - **Psychology, Well-Being & Hospitality:** *comfort*, *comfortable*, *discomfort* (consoling grief, ergonomic furniture).
> - **Classical Mechanics & Physics:** *force*, *forceful* (Newton's second law $F = ma$, gravitational force).
> - **Law Enforcement & Police Power:** *enforce*, *enforcement*, *reinforce* (traffic enforcement, reinforcing police lines).
> - **Music & Organology:** *forte*, *pianoforte* (dynamic markings, keyboard instruments).

---

## 🔀 4. Prefix & Combining Dynamics on fort

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `com-` (thoroughly) | `fortis` | **[[comfort]]** / **comfortable** | Imparting strength to someone in distress $	o$ solace, physical ease. |
| `ex-` (out, thoroughly) | `fortis` | **[[effort]]** / **effortless** | Putting forth one's physical or mental strength to achieve a task. |
| `en-` (in, into) | `force` | **[[enforce]]** / **enforcement** | Compelling obedience to a law through institutional power. |
| `re-` + `en-` (again-in) | `force` | **[[reinforce]]** / **reinforcement** | Adding fresh troops, steel beams, or psychological incentives. |
| `dis-` (privative not) | `comfort` | **[[discomfort]]** | Depriving of physical ease or emotional peace. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🪖 **Military Engineering & History** | *fortress*, *fortification*, *reinforce* | Constructing Vauban-style star fortifications; reinforcing exposed flanks. |
| ⚖️ **Criminal Jurisprudence & Policing** | *enforce*, *enforcement*, *force* | Law enforcement agencies executing warrants; prosecuting excessive force. |
| ⚙️ **Classical Mechanics & Civil Engineering** | *force*, *reinforce*, *reinforcement* | Calculating structural shear forces; pouring steel-reinforced concrete. |
| 🎵 **Acoustics & Classical Music** | *forte*, *pianoforte* | Orchestral dynamic markings ($f, ff$); Bartolomeo Cristofori inventing the pianoforte. |
| 🧠 **Palliative Care & Clinical Psychology** | *comfort*, *fortitude* | Providing palliative comfort care for terminal patients; cultivating emotional fortitude. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[comfort]] | noun | **1.** A state of being relaxed and feeling no pain.<br>**2.** A feeling of freedom from worry or disappointment. | *"But thou, to whom my jewels trifles are, Most worthy comfort, now my greatest grief, Thou best of dearest, and mine only care, Art left the prey of every vulgar thief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comfortable]] | adjective | **1.** Providing or experiencing physical well-being or relief (`comfy' is informal).<br>**2.** Free from stress or conducive to mental ease; having or affording peace of mind. | *"The best wishes that can be forg’d in your thoughts be servants to you! [_To Helena._] Be comfortable to my mother, your mistress, and make much of her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comfortableness]] | noun | **1.** A state of being relaxed and feeling no pain.<br>**2.** A feeling of being at ease in a relationship. | *"I was only alive to the condensed confidential comfortableness of sharing a pipe and a blanket with a real friend."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[comfortably]] | adverb | **1.** In mental comfort; without stress.<br>**2.** In physical comfort. | *"Oh, this is better, this is lovely," the sick man replied, comfortably leaning back in the chair."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[comforted]] | verb | **1.** Give moral or emotional strength to.<br>**2.** Lessen pain or discomfort; alleviate. | *"In his bright radiance and collateral light Must I be comforted, not in his sphere."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comforter]] | noun | **1.** Commiserates with someone who has had misfortune.<br>**2.** A person who reduces the intensity (e.g., of fears) and calms and pacifies. | *"The heavens have blessed you with a goodly son To be your comforter when he is gone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comforting]] | verb | **1.** Give moral or emotional strength to.<br>**2.** Lessen pain or discomfort; alleviate. | *"When it pleaseth their deities to take the wife of a man from him, it shows to man the tailors of the earth; comforting therein that when old robes are worn out, there are members to make new."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comfortingly]] | adverb | **1.** In a comforting or consoling manner. | *"He's jumped out on that log, see?” “He's all right, girl, he's all right,” said Uncle Henry comfortingly."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[comfortless]] | adjective | **1.** Without comfort. | *"Sweet recreation barr’d, what doth ensue But moody and dull melancholy, Kinsman to grim and comfortless despair, And at her heels a huge infectious troop Of pale distemperatures and foes to life?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comforts]] | noun | **1.** Things that make you comfortable and at ease.<br>**2.** A state of being relaxed and feeling no pain. | *"He that comforts my wife is the cherisher of my flesh and blood; he that cherishes my flesh and blood loves my flesh and blood; he that loves my flesh and blood is my friend; ergo, he that kisses my wife is my friend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discomfort]] | noun | **1.** The state of being tense and feeling pain.<br>**2.** An uncomfortable feeling of mental painfulness or distress. | *"What mean you, sir, To give them this discomfort?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effort]] | noun | **1.** Earnest and conscientious activity intended to do or accomplish something.<br>**2.** Use of physical or mental energy; hard work. | *"She had made an effort to keep her children from harmful influences and to implant in them a hate for these things."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[effortless]] | adjective | **1.** Requiring or apparently requiring no effort.<br>**2.** Not showing effort or strain. | *"The maids’ private aims, however, were the reverse of the dairyman’s rule, the daily selection by each damsel of the eight or ten cows to which she had grown accustomed rendering the operation on their willing udders surprisingly easy and effortless."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[effortlessly]] | adverb | **1.** Without effort or apparent effort. | *"In academic literature, effortlessly designates without effort or apparent effort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effortlessness]] | noun | **1.** The quality of requiring little effort. | *"In academic literature, effortlessness designates the quality of requiring little effort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fort]] | noun | **1.** A fortified military post where troops are stationed.<br>**2.** A fortified defensive structure. | *"ALICE. _C’est bien dit, madame; il est fort bon anglais._ KATHARINE. _Dites-moi l’anglais pour le bras._ ALICE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortaz]] | noun | **1.** A parenteral cephalosporin (trade names fortaz and tazicef) used to treat moderate infections. | *"In academic literature, fortaz designates a parenteral cephalosporin (trade names fortaz and tazicef) used to treat moderate infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forte]] | noun | **1.** An asset of special worth or utility.<br>**2.** (music) loud. | *"This young man, besides having a great deal to say for himself about Africa and a project of his for teaching the coffee colonists to teach the natives to turn piano-forte legs and establish an export trade, delighted in drawing Mrs."* — Charles Dickens, *Bleak House* |
| [[forte-piano]] | noun | **1.** A keyboard instrument that is played by depressing keys that cause hammers to strike tuned strings and produce sounds. | *"In academic literature, forte-piano designates a keyboard instrument that is played by depressing keys that cause hammers to strike tuned strings and produce sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortemente]] | adjective | **1.** Chiefly a direction or description in music; loud and strong. | *"In academic literature, fortemente designates chiefly a direction or description in music; loud and strong."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forties]] | noun | **1.** The time of life between 40 and 50.<br>**2.** The decade from 1940 to 1949. | *"Indeed, until the early Forties of last century, such a thing was scarcely known."* — John Cairns, *Principal Cairns* |
| [[fortieth]] | noun | **1.** Position 40 in a countable series of things.<br>**2.** The ordinal number of forty in counting order. | *"But at this moment the _Nautilus_, raised by the last waves of the tide, quitted her coral bed exactly at the fortieth minute fixed by the Captain."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[fortification]] | noun | **1.** Defensive structure consisting of walls or mounds built around a stronghold to strengthen it.<br>**2.** The art or science of strengthening defenses. | *"This fortification, gentlemen, shall we see’t?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortified]] | verb | **1.** Make strong or stronger.<br>**2.** Enclose by or as if by a fortification. | *"Sit down awhile, And let us once again assail your ears, That are so fortified against our story, What we two nights have seen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortify]] | verb | **1.** Make strong or stronger.<br>**2.** Enclose by or as if by a fortification. | *"And fortify yourself in your decay With means more blessed than my barren rhyme?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortissimo]] | noun | **1.** (music) loud.<br>**2.** Chiefly a direction or description in music. | *"In academic literature, fortissimo designates (music) loud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortitude]] | noun | **1.** Strength of mind that enables one to endure adversity with courage. | *"Coward of France, how much he wrongs his fame, Despairing of his own arm’s fortitude, To join with witches and the help of hell!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortnight]] | noun | **1.** A period of fourteen consecutive days. | *"They have had inkling this fortnight what we intend to do, which now we’ll show ’em in deeds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortnightly]] | adjective | **1.** Occurring every two weeks.<br>**2.** Every two weeks. | *"The law is especially favorable to the hand-laborer in regard to the collection of his wages, requiring monthly or fortnightly or sometimes weekly payments."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[fortran]] | noun | **1.** A high-level programing language for mathematical and scientific purposes; stands for formula translation. | *"In academic literature, fortran designates a high-level programing language for mathematical and scientific purposes; stands for formula translation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortress]] | noun | **1.** A fortified defensive structure. | *"Most noble Antony, Let not the piece of virtue which is set Betwixt us, as the cement of our love To keep it builded, be the ram to batter The fortress of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortuitous]] | adjective | **1.** Having no cause or apparent cause.<br>**2.** Occurring by happy chance. | *"Minchin in return was quite sure that man was not a mere machine or a fortuitous conjunction of atoms; if Mrs."* — George Eliot, *Middlemarch* |
| [[fortuitously]] | adverb | **1.** By good fortune. | *"Wopsle’s great-aunt, who staggered at a boy fortuitously, and pulled his ears."* — Charles Dickens, *Great Expectations* |
| [[fortuitousness]] | noun | **1.** The quality of happening accidentally and by lucky chance. | *"In academic literature, fortuitousness designates the quality of happening accidentally and by lucky chance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortuity]] | noun | **1.** Anything that happens suddenly or by chance without an apparent cause. | *"In academic literature, fortuity designates anything that happens suddenly or by chance without an apparent cause."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortuna]] | noun | **1.** (roman mythology) the goddess of fortune and good luck; counterpart of greek tyche. | *"PISTOL. _Si fortuna me tormenta, spero me contenta._ [_Exeunt all but Prince John and the Lord Chief Justice._] LANCASTER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortunate]] | adjective | **1.** Having unexpected good fortune.<br>**2.** Supremely favored. | *"I am most fortunate thus accidentally to encounter you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortunately]] | adverb | **1.** By good fortune. | *"I know ’tis from Cordelia, Who hath most fortunately been inform’d Of my obscured course."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortune]] | noun | **1.** An unknown and unpredictable phenomenon that causes an event to result one way rather than another.<br>**2.** A large amount of wealth or prosperity. | *"If thou wilt leave me, do not leave me last, When other petty griefs have done their spite, But in the onset come, so shall I taste At first the very worst of fortune’s might."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fortunella]] | noun | **1.** Small genus of shrubs native to south china producing small ovoid fruits resembling oranges: includes kumquats. | *"In academic literature, fortunella designates small genus of shrubs native to south china producing small ovoid fruits resembling oranges: includes kumquats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortuneteller]] | noun | **1.** A person who foretells your personal future. | *"In academic literature, fortuneteller designates a person who foretells your personal future."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fortunetelling]] | noun | **1.** The practice of predicting people's futures (usually for payment). | *"In academic literature, fortunetelling designates the practice of predicting people's futures (usually for payment)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty]] | noun | **1.** The cardinal number that is the product of ten and four.<br>**2.** Being ten more than thirty. | *"I saw her once Hop forty paces through the public street And, having lost her breath, she spoke and panted, That she did make defect perfection, And, breathless, pour breath forth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[forty-eight]] | adjective | **1.** Being eight more than forty. | *"In academic literature, forty-eight designates being eight more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-eighth]] | adjective | **1.** The ordinal number of forty-eight in counting order. | *"In academic literature, forty-eighth designates the ordinal number of forty-eight in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-fifth]] | adjective | **1.** The ordinal number of forty-five in counting order. | *"In academic literature, forty-fifth designates the ordinal number of forty-five in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-first]] | adjective | **1.** The ordinal number of forty-one in counting order. | *"In academic literature, forty-first designates the ordinal number of forty-one in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-five]] | noun | **1.** A .45-caliber pistol.<br>**2.** Being five more than forty. | *"In academic literature, forty-five designates a .45-caliber pistol."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-four]] | adjective | **1.** Being four more than forty. | *"In academic literature, forty-four designates being four more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-fourth]] | adjective | **1.** The ordinal number of forty-four in counting order. | *"In academic literature, forty-fourth designates the ordinal number of forty-four in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-nine]] | adjective | **1.** Being nine more than forty. | *"In academic literature, forty-nine designates being nine more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-niner]] | noun | **1.** A miner who took part in the california gold rush in 1849.<br>**2.** Being nine more than forty. | *"In academic literature, forty-niner designates a miner who took part in the california gold rush in 1849."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-ninth]] | adjective | **1.** The ordinal number of forty-nine in counting order. | *"In academic literature, forty-ninth designates the ordinal number of forty-nine in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-one]] | adjective | **1.** Being one more than forty. | *"In academic literature, forty-one designates being one more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-second]] | adjective | **1.** The ordinal number of forty-two in counting order. | *"In academic literature, forty-second designates the ordinal number of forty-two in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-seven]] | adjective | **1.** Being seven more than forty. | *"In academic literature, forty-seven designates being seven more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-seventh]] | adjective | **1.** The ordinal number of forty-seven in counting order. | *"In academic literature, forty-seventh designates the ordinal number of forty-seven in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-six]] | adjective | **1.** Being six more than forty. | *"In academic literature, forty-six designates being six more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-sixth]] | adjective | **1.** The ordinal number of forty-six in counting order. | *"In academic literature, forty-sixth designates the ordinal number of forty-six in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-third]] | adjective | **1.** The ordinal number of forty-three in counting order. | *"In academic literature, forty-third designates the ordinal number of forty-three in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-three]] | adjective | **1.** Being three more than forty. | *"In academic literature, forty-three designates being three more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[forty-two]] | adjective | **1.** Being two more than forty. | *"In academic literature, forty-two designates being two more than forty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misfortunate]] | adjective | **1.** Deserving or inciting pity; ; ; - galsworthy. | *"In academic literature, misfortunate designates deserving or inciting pity; ; ; - galsworthy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misfortune]] | noun | **1.** Unnecessary and unforeseen trouble resulting from an unfortunate event.<br>**2.** An unfortunate state resulting from unfavorable outcomes. | *"Why, brother Rivers, are you yet to learn What late misfortune is befall’n King Edward?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pianoforte]] | noun | **1.** A keyboard instrument that is played by depressing keys that cause hammers to strike tuned strings and produce sounds. | *"Tangle’s learned friends, each armed with a little summary of eighteen hundred sheets, bob up like eighteen hammers in a pianoforte, make eighteen bows, and drop into their eighteen places of obscurity."* — Charles Dickens, *Bleak House* |
| [[uncomfortable]] | adjective | **1.** Conducive to or feeling mental discomfort.<br>**2.** Providing or experiencing physical discomfort. | *"Uncomfortable time, why cam’st thou now To murder, murder our solemnity?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncomfortableness]] | noun | **1.** The state of being tense and feeling pain.<br>**2.** Embarrassment deriving from the feeling that others are critically aware of you. | *"In academic literature, uncomfortableness designates the state of being tense and feeling pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncomfortably]] | adverb | **1.** In physical discomfort. | *"Seated at the same table, though with his chair modestly and uncomfortably drawn a little way from it, sits a bald, mild, shining man who coughs respectfully behind his hand when the lawyer bids him fill his glass."* — Charles Dickens, *Bleak House* |
| [[unfortunate]] | noun | **1.** A person who suffers misfortune.<br>**2.** Not favored by fortune; marked or accompanied by or resulting in ill fortune. | *"Your unfortunate son,_ BERTRAM."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unfortunately]] | adverb | **1.** By bad luck. | *"Please have nothing to do with it, otherwise you'll be sorry." "You can be perfectly reassured, for unfortunately nothing whatever can be done," Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |

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
    ROOT DASHBOARD · FORT
  </div>
</div>
