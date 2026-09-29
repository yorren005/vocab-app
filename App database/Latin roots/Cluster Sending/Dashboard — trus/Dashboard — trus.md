---
status: unread
type: root_dashboard
---
# Dashboard — trus
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">trus-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to thrust or push”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing a messenger or sending a written letter on a long journey.</span>
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

The root **trus** means to thrust or push. It refers to applying pressure against something to move it away. In English, this root forms words such as *intrusion*, *obtrusive*, and *abstruse*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to thrust or push
> The root **trus** means to thrust or push. It refers to applying pressure against something to move it away. In English, this root forms words such as *intrusion*, *obtrusive*, and *abstruse*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To thrust or push</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *intrusion* and *obtrusive*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **trus** comes from a Latin word that means *"to thrust or push"*.
  - At its core, it describes the action of thrust or push.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **trus** in an English word, think of **to thrust or push**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to thrust or push).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Intrusion**: The action of intruding or putting oneself in a place uninvited.
  - **Obtrusive**: Noticeable or prominent in an unwelcome or intrusive way.
  - **Abstruse**: Difficult to understand.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">trus</mark>, think of <mark class="hl-def">to thrust or push</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Participial Base:** *trūs-* (*trūsus, trūsa, trūsum*) $	o$ *abstruse, abstrusely, abstruseness*.

- **Nominalizations in *-iō*:**

  - `ex-` + *trūsiō* $	o$ *extrusion*.

  - `in-` + *trūsiō* $	o$ *intrusion*.

  - `ob-` + *trūsiō* $	o$ *obtrusion*.

  - `pro-` + *trūsiō* $	o$ *protrusion*.

- **Adjectival Formations in *-ive*:**

  - *extrusive, intrusive, intrusively, intrusiveness*.

  - *obtrusive, obtrusively, obtrusiveness, unobtrusive, unobtrusively*.

  - *protrusive*.



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



### 1. Law, Security & Cyber Defense

- *intrusion* (the action of intruding; wrongful entry onto another's property; unauthorized access to computer systems).

- *intrusive* (causing disruption or annoyance through being unwelcome or uninvited).

- *intrusively* (in an intrusive or unwelcome manner).

- *intrusiveness* (the quality or condition of being intrusive).



### 2. Social Behavior & Etiquette

- *obtrusive* (noticeable or prominent in an unwelcome or intrusive way).

- *obtrusively* (in an obtrusive or glaringly obvious manner).

- *obtrusiveness* (the quality of being obtrusive).

- *obtrusion* (the act of obtruding; an unwanted imposition).

- *unobtrusive* (not conspicuous or attracting attention).

- *unobtrusively* (in a discreet, quiet, or inconspicuous manner).



### 3. Geology, Manufacturing & Mechanics

- *extrusion* (the act or process of shaping material by forcing it through a die; extrusive rock formation).

- *extrusive* (relating to rock that has been forced out onto the Earth's surface as lava).

- *protrusion* (something that protrudes, sticks out, or extends beyond a surface).

- *protrusive* (tending to protrude or stick out).



### 4. Epistemology & Esoteric Thought

- *abstruse* (difficult to understand; obscure; concealed from easy comprehension).

- *abstrusely* (in an obscure or hard-to-understand manner).

- *abstruseness* (the quality of being abstruse or obscure).



---



## 🔀 4. Prefix & Combining Dynamics on trus



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `abs-`** | `abs-` + *trūsum* | **abstruse** | Thrust away from sight / obscure | *"The philosopher delivered an abstruse lecture on quantum ontology."* |

| **Action `-tion`** | `in-` + *trūsiō* | **intrusion** | The act of thrusting into uninvited | *"The cyber security firewall repelled a malicious network intrusion."* |

| **Adjectival `-ive`** | `ob-` + *trūsīvus* | **obtrusive** | Glaringly thrust forward | *"Neon advertising signs were deemed obtrusive in the historic square."* |

| **Negative `un-`** | `un-` + *obtrusive* | **unobtrusive** | Quietly blending in without imposition | *"The security detail remained completely unobtrusive during the state banquet."* |

| **Prefix `pro-`** | `pro-` + *trūsiō* | **protrusion** | Physical result of thrusting forward | *"Doctors examined a painful hernia protrusion in the abdominal wall."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🌋 **Geology & Volcanology:** *extrusive igneous rocks (basalt, pumice)*, *intrusive plutonic rock (granite)*.

- 💻 **Computer Science & Cybersecurity:** *host intrusion prevention systems (HIPS)*, *intrusive memory scraping*.

- 📚 **Literary Criticism & Philosophy:** *abstruse academic jargon*, *unobtrusive prose style*.

- 🏥 **Clinical Radiology & Surgery:** *disc protrusion vs extrusion in lumbar MRI scans*.

- 🎨 **Interior Design & Architecture:** *unobtrusive recessed lighting*, *obtrusive structural pillars*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antitrust]] | adjective | **1.** Of laws and regulations; designed to protect trade and commerce from unfair business practices. | *"In academic literature, antitrust designates of laws and regulations; designed to protect trade and commerce from unfair business practices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distrust]] | noun | **1.** Doubt about someone's honesty.<br>**2.** The trait of not trusting others. | *"Make me not offended In your distrust."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distrustful]] | adjective | **1.** Having or showing distrust; ; - b.n.cardozo; - thomas jefferson. | *"I did think that I and both these young creatures might be friends instead of distrustful foes and that we might so far counter-act the suit and prove too strong for it."* — Charles Dickens, *Bleak House* |
| [[distrustfully]] | adverb | **1.** With distrust. | *"George looks distrustfully from the painted ceiling to the ground, from the ground to Mr."* — Charles Dickens, *Bleak House* |
| [[distrustfulness]] | noun | **1.** The trait of not trusting others. | *"In academic literature, distrustfulness designates the trait of not trusting others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entrust]] | verb | **1.** Confer a trust upon.<br>**2.** Put into the care or protection of someone. | *"Then came many of the officers to beg leave to entrust to the care of Mr. and Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[etruscan]] | noun | **1.** A native or inhabitant of ancient etruria; the etruscans influenced the romans (who had suppressed them by about 200 bc). | *"But where repose the all Etruscan three-- Dante, and Petrarch, and, scarce less than they, The Bard of Prose, creative spirit! he Of the Hundred Tales of love--where did they lay Their bones, distinguished from our common clay In death as life?"* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[extrusion]] | noun | **1.** Something that bulges out or is protuberant or projects from its surroundings.<br>**2.** Squeezing out by applying pressure. | *"In academic literature, extrusion designates something that bulges out or is protuberant or projects from its surroundings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extrusive]] | adjective | **1.** Of rock material; forced out while molten through cracks in the earth's surface. | *"In academic literature, extrusive designates of rock material; forced out while molten through cracks in the earth's surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intrusion]] | noun | **1.** Any entry into an area not previously occupied.<br>**2.** Entrance by force or without permission or welcome. | *"Here, beneath the painted ceiling, with foreshortened Allegory staring down at his intrusion as if it meant to swoop upon him, and he cutting it dead, Mr."* — Charles Dickens, *Bleak House* |
| [[intrusive]] | adjective | **1.** Tending to intrude (especially upon privacy).<br>**2.** Of rock material; forced while molten into cracks between layers of other rock. | *"We both felt intrusive and out of place, and we both thought that Mrs."* — Charles Dickens, *Bleak House* |
| [[intrusiveness]] | noun | **1.** Aggressiveness as evidenced by intruding; by advancing yourself or your ideas without invitation. | *"These, after exhausting other modes of amusement, now thronged about Hester Prynne with rude and boorish intrusiveness."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[intrust]] | verb | **1.** Confer a trust upon. | *"Well, I will henceforth intrust my felicity to no one’s keeping but my own.” The first agonies of this disappointment would not allow me to be reasonable or just."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[mistrust]] | noun | **1.** Doubt about someone's honesty.<br>**2.** The trait of not trusting others. | *"Yet your mistrust cannot make me a traitor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistrustful]] | adjective | **1.** Openly distrustful and unwilling to confide. | *"I hold it cowardice To rest mistrustful where a noble heart Hath pawned an open hand in sign of love; Else might I think that Clarence, Edward’s brother, Were but a feigned friend to our proceedings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistrustfully]] | adverb | **1.** With distrust. | *"They looked at him and at his shoes mistrustfully, as at an alien."* — graf Leo Tolstoy, *War and Peace* |
| [[obtrusive]] | adjective | **1.** Undesirably noticeable.<br>**2.** Sticking out; protruding. | *"Sir Leicester, avoiding, with some trouble those obtrusive sounds, says, “True.” At this juncture a considerable noise of voices is heard in the hall."* — Charles Dickens, *Bleak House* |
| [[obtrusively]] | adverb | **1.** In an obtrusive manner. | *"From the ceiling, foreshortened Allegory, in the person of one impossible Roman upside down, points with the arm of Samson (out of joint, and an odd one) obtrusively toward the window."* — Charles Dickens, *Bleak House* |
| [[obtrusiveness]] | noun | **1.** An unwelcome conspicuousness. | *"He stood as opposed to Captain Wentworth, in all his own unwelcome obtrusiveness; and the evil of his attentions last night, the irremediable mischief he might have done, was considered with sensations unqualified, unperplexed."* — Jane Austen, *Persuasion* |
| [[protrusible]] | adjective | **1.** Capable of being thrust forward, as the tongue. | *"In academic literature, protrusible designates capable of being thrust forward, as the tongue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protrusile]] | adjective | **1.** Capable of being thrust forward, as the tongue. | *"In academic literature, protrusile designates capable of being thrust forward, as the tongue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protrusion]] | noun | **1.** Something that bulges out or is protuberant or projects from its surroundings.<br>**2.** The act of projecting out from something. | *"Raffles’ slow wink and slight protrusion of his tongue was worse than a nightmare, because it held the certitude that it was not a nightmare, but a waking misery."* — George Eliot, *Middlemarch* |
| [[protrusive]] | adjective | **1.** Thrusting outward. | *"In academic literature, protrusive designates thrusting outward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[truss]] | noun | **1.** (medicine) a bandage consisting of a pad and belt; worn to hold a hernia in place by pressure.<br>**2.** A framework of beams (rafters, posts, struts) forming a rigid structure that supports a roof or bridge or other structure. | *"The waggon, from its position, seemed to have been left there for the night, for beyond about half a truss of hay which was heaped in the bottom, it was quite empty."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[trussed]] | verb | **1.** Tie the wings and legs of a bird before cooking it.<br>**2.** Secure with or as if with ropes. | *"Now my father, Twenty to one, is trussed up in a trice Tomorrow morning."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trust]] | noun | **1.** Something (as property) held by one party (the trustee) for the benefit of another (the beneficiary).<br>**2.** Certainty based on past experience. | *"O love’s best habit is in seeming trust, And age in love loves not to have years told."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trustbuster]] | noun | **1.** A federal agent who engages in trust busting. | *"In academic literature, trustbuster designates a federal agent who engages in trust busting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trusted]] | verb | **1.** Have confidence or faith in.<br>**2.** Allow without fear. | *"Look you, the worm is not to be trusted but in the keeping of wise people; for indeed there is no goodness in the worm."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trustee]] | noun | **1.** A person (or institution) to whom legal title to property is entrusted to use for another's benefit.<br>**2.** Members of a governing board. | *"I was his sole trustee, and I could have had nine thousand by a stroke of the pen at any minute.’ ‘Mr."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[trusteeship]] | noun | **1.** A dependent country; administered by another country under the supervision of the united nations.<br>**2.** The position of trustee. | *"A better code of business morality has developed, and the railroad management's relationship of private trusteeship toward the shareholders and of public trusteeship toward the patrons of the road is now much more fully recognized."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[truster]] | noun | **1.** A supporter who accepts something as true. | *"I would not hear your enemy say so; Nor shall you do my ear that violence, To make it truster of your own report Against yourself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trustful]] | adjective | **1.** Inclined to believe or confide readily; full of trust; - nordhoff & hall. | *"They brought a chair on either side of me, and put me between them, and really seemed to have fallen in love with me instead of one another, they were so confiding, and so trustful, and so fond of me."* — Charles Dickens, *Bleak House* |
| [[trustfully]] | adverb | **1.** With trust; in a trusting manner.<br>**2.** In a trustful manner. | *"And trustfully flew one of the doves from Thoril's hand to Halfred's broad shoulder, and cooed lovingly to the other."* — Felix Dahn, *Saga of Halfred the Sigskald: A Northern Tale of the Tenth Century* |
| [[trustfulness]] | noun | **1.** The trait of believing in the honesty and reliability of others. | *"To her sublime trustfulness he was all that goodness could be—knew all that a guide, philosopher, and friend should know."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[trustiness]] | noun | **1.** The trait of deserving trust and confidence. | *"In academic literature, trustiness designates the trait of deserving trust and confidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trusting]] | verb | **1.** Have confidence or faith in.<br>**2.** Allow without fear. | *"That can such sweet use make of what they hate, When saucy trusting of the cozen’d thoughts Defiles the pitchy night; so lust doth play With what it loathes, for that which is away."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trustingly]] | adverb | **1.** With trust; in a trusting manner. | *"She led her little boy, by the hand, who trustingly walked by her side."* — Classic Author, *The wonders of prayer* |
| [[trustingness]] | noun | **1.** The trait of believing in the honesty and reliability of others. | *"In academic literature, trustingness designates the trait of believing in the honesty and reliability of others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trustor]] | noun | **1.** (law) a person who creates a trust by giving real or personal property in trust to a trustee for the benefit of a beneficiary; a person who gives such property is said to settle it on the trustee. | *"In academic literature, trustor designates (law) a person who creates a trust by giving real or personal property in trust to a trustee for the benefit of a beneficiary; a person who gives such property is said to settle it on the trustee."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trustworthiness]] | noun | **1.** The trait of deserving trust and confidence. | *"The poor child had become altogether unbelieving as to the trustworthiness of that Key which had made the ambition and the labor of her husband’s life."* — George Eliot, *Middlemarch* |
| [[trustworthy]] | adjective | **1.** Worthy of trust or belief.<br>**2.** Taking responsibility for one's conduct and obligations. | *"Say nothing to any one of what passes between us.” The timid little beauty promises in all earnestness to be trustworthy."* — Charles Dickens, *Bleak House* |
| [[trusty]] | noun | **1.** A convict who is considered trustworthy and granted special privileges.<br>**2.** Worthy of trust or belief. | *"It were fit you knew him; lest, reposing too far in his virtue, which he hath not, he might at some great and trusty business, in a main danger fail you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unintrusive]] | adjective | **1.** Not interfering or meddling. | *"In academic literature, unintrusive designates not interfering or meddling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unobtrusive]] | adjective | **1.** Not obtrusive or undesirably noticeable. | *"Assuredly their wonted fires must have lived in Fanny’s ashes when events were so shaped as to chariot her hither in this natural, unobtrusive, yet effectual manner."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unobtrusively]] | adverb | **1.** In an unobtrusive manner. | *"So frankly, and yet so unobtrusively, they lay bare his soul, as far as they saw it."* — T. R. Glover, *The Jesus of History* |
| [[unobtrusiveness]] | noun | **1.** The quality of not sticking out in an unwelcome way. | *"In academic literature, unobtrusiveness designates the quality of not sticking out in an unwelcome way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untrustiness]] | noun | **1.** The trait of not deserving trust or confidence. | *"In academic literature, untrustiness designates the trait of not deserving trust or confidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untrusting]] | adjective | **1.** Openly distrustful and unwilling to confide. | *"In academic literature, untrusting designates openly distrustful and unwilling to confide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untrustworthiness]] | noun | **1.** The trait of not deserving trust or confidence. | *"In academic literature, untrustworthiness designates the trait of not deserving trust or confidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untrustworthy]] | adjective | **1.** Not worthy of trust or belief. | *"He had wished to know, finally, in the name of his mother, if Tess could really come to manage the old lady’s fowl-farm or not; the lad who had hitherto superintended the birds having proved untrustworthy."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[untrusty]] | adjective | **1.** Not worthy of trust or belief. | *"In academic literature, untrusty designates not worthy of trust or belief."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sending]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TRUS
  </div>
</div>
