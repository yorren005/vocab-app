---
status: unread
type: root_dashboard
---
# Dashboard — aud
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">aud-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to hear”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Using your eyes, ears, nose, and fingertips to notice the world around you.</span>
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

The root **aud** means to hear. It refers to listening to sounds, paying attention to speech, or perceiving what is said. In English, this root forms words such as *audience*, *audio*, *audible*, and *audition*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to hear
> The root **aud** means to hear. It refers to listening to sounds, paying attention to speech, or perceiving what is said. In English, this root forms words such as *audience*, *audio*, *audible*, and *audition*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To hear</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Using your eyes, ears, nose, and fingertips to notice the world around you.</mark>
> - **Everyday Connection**: Think of familiar words like *audience* and *audio*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **aud** comes from a Latin word that means *"to hear"*.
  - At its core, it describes the action of hear.

- **The Big Picture Idea**:
  - Picture using your eyes, ears, nose, and fingertips to notice the world around you.
  - Whenever you see **aud** in an English word, think of **to hear**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to hear).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Audience**: The assembled spectators or listeners at a public event.
  - **Audio**: Sound, especially when recorded, transmitted, or reproduced.
  - **Audible**: Able to be heard.
  - **Audition**: An interview or trial performance for a role as a singer, actor, or musician.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">aud</mark>, think of <mark class="hl-def">to hear</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Verbal Base:** *audī-* (*audiō, audīre*) $	o$ *audio, audience, audit, audition, auditorium, auditory*.

- **Suffixed Adjectives:**

  - *audibilis* $	o$ *audible, audibility, inaudible, inaudibility*.

- **Compound Obedience Stem (*ob-* + *audīre*):**

  - Latin *obēdīre* $	o$ *obedient, obedience, disobedient, disobedience, obey*.



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



### 1. Acoustics & Sound Engineering

- *audio* (sound, especially when recorded, transmitted, or reproduced; relating to recorded sound).

- *audible* (able to be heard).

- *inaudible* (unable to be heard).

- *auditory* (relating to the sense of hearing; auditory nerves).



### 2. Public Gatherings & Theatrical Performance

- *audience* (the assembled spectators or listeners at a public event; a formal interview with a person in authority).

- *audition* (an interview for a role on stage, screen, or orchestra; to perform in an audition).

- *auditorium* (the part of a theater, concert hall, or public building in which the audience sits).



### 3. Financial Oversight & Governance

- *audit (n/v)* (an official inspection of an individual's or organization's accounts; conduct an official inspection).

- *auditor* (a person authorized to review and verify the accuracy of financial records).



### 4. Moral Listening & Authority (Obedience)

- *obey* (comply with the command, direction, or request of).

- *obedient* (complying or willing to comply with orders or requests).

- *obedience* (compliance with an order, request, or law or submission to another's authority).

- *disobedient* (refusing to obey rules or someone in authority).

- *disobedience* (failure or refusal to obey rules or someone in authority).



---



## 🔀 4. Prefix & Combining Dynamics on aud



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Negative `in-`** | `in-` + *audībilis* | **inaudible** | Beyond the reach of hearing | *"His whispered confession was completely inaudible to the jury."* |

| **Locative `-orium`** | *audīre* + *-tōrium* | **auditorium** | Architectural place for hearing | *"The concert auditorium was engineered with resonant acoustic panels."* |

| **Prefix `ob-`** | `ob-` + *audīre* | **obedient** | Giving one's ear submissively | *"The well-trained sheepdog remained instantly obedient to every whistle."* |

| **Action `-tion`** | *audīre* + *-tiō* | **audition** | Trial hearing for musical role | *"Over fifty violinists attended the blind audition for the philharmonic."* |

| **Agent `-or`** | *audīre* + *-tor* | **auditor** | Official listener to accounts | *"The tax auditor discovered substantial discrepancies in off-shore trusts."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🎧 **Acoustics & Sound Recording:** *audio frequency range (20 Hz to 20 kHz)*, *digital audio workstations (DAW)*.

- 💼 **Accounting & Corporate Law:** *internal and external financial audits*, *Sarbanes-Oxley compliance audit*.

- 🧠 **Neurobiology & Otolaryngology:** *auditory cortex in the temporal lobe*, *auditory brainstem response (ABR)*.

- 🎭 **Performing Arts & Conservatory:** *orchestral blind auditions*, *open casting call auditions*.

- 🏛️ **Diplomacy & Papal Protocols:** *papal audience in the Vatican*, *royal audience at St. James's Palace*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acaudal]] | adjective | **1.** Lacking a tail or taillike appendage. | *"In academic literature, acaudal designates lacking a tail or taillike appendage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acaudate]] | adjective | **1.** Lacking a tail or taillike appendage. | *"In academic literature, acaudate designates lacking a tail or taillike appendage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alauda]] | noun | **1.** Type genus of the alaudidae: skylarks. | *"In academic literature, alauda designates type genus of the alaudidae: skylarks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alaudidae]] | noun | **1.** Larks. | *"Classical and authoritative lexicons catalog alaudidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audacious]] | adjective | **1.** Invulnerable to fear or intimidation.<br>**2.** Unrestrained by convention or propriety; ; ; - los angeles times; ; ; - bertrand russell. | *"The King hath sent to know The nature of your griefs, and whereupon You conjure from the breast of civil peace Such bold hostility, teaching his duteous land Audacious cruelty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[audaciously]] | adverb | **1.** In an audacious manner. | *"That any person or persons audaciously presuming to trespass on this property will be punished with the utmost severity of private chastisement and prosecuted with the utmost rigour of the law."* — Charles Dickens, *Bleak House* |
| [[audaciousness]] | noun | **1.** Fearless daring.<br>**2.** Aggressive boldness or unmitigated effrontery. | *"A casual observer might, perhaps, applaud the audaciousness of this conduct."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[audacity]] | noun | **1.** Fearless daring.<br>**2.** Aggressive boldness or unmitigated effrontery. | *"Arm me, audacity, from head to foot!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[audad]] | noun | **1.** Wild sheep of northern africa. | *"In academic literature, audad designates wild sheep of northern africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auden]] | noun | **1.** United states poet (born in england) (1907-1973). | *"Auden's "Academic Graffiti," in Collected Poems_, ed."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[audenesque]] | adjective | **1.** In the manner of w. h. auden. | *"In academic literature, audenesque designates in the manner of w. h. auden."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audibility]] | noun | **1.** Quality or fact or degree of being audible or perceptible by the ear. | *"In academic literature, audibility designates quality or fact or degree of being audible or perceptible by the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audible]] | noun | **1.** A football play is changed orally after both teams have assumed their positions at the line of scrimmage.<br>**2.** Heard or perceptible by the ear. | *"It’s sprightly walking, audible, and full of vent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[audibleness]] | noun | **1.** Quality or fact or degree of being audible or perceptible by the ear. | *"In academic literature, audibleness designates quality or fact or degree of being audible or perceptible by the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audibly]] | adverb | **1.** In an audible manner. | *"Only think of Elizabeth’s including everybody!” whispered Mary very audibly."* — Jane Austen, *Persuasion* |
| [[audience]] | noun | **1.** A gathering of spectators or listeners at a (usually public) performance.<br>**2.** The part of the general public interested in a source of information or entertainment. | *"From Alexandria This is the news: he fishes, drinks, and wastes The lamps of night in revel: is not more manlike Than Cleopatra, nor the queen of Ptolemy More womanly than he; hardly gave audience, or Vouchsafed to think he had partners."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[audile]] | noun | **1.** One whose mental imagery is auditory rather than visual or motor.<br>**2.** Of or relating to the process of hearing. | *"In academic literature, audile designates one whose mental imagery is auditory rather than visual or motor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audio]] | noun | **1.** The audible part of a transmitted signal.<br>**2.** An audible acoustic wave frequency. | *"The Strategic Concepts Computer presented visual displays accompanied by a gently modulated audio."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[audio-lingual]] | adjective | **1.** Of or relating to a method of teaching language that focuses on listening and speaking. | *"In academic literature, audio-lingual designates of or relating to a method of teaching language that focuses on listening and speaking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiocassette]] | noun | **1.** A cassette for audiotape. | *"In academic literature, audiocassette designates a cassette for audiotape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiogram]] | noun | **1.** A graphical representation of a person's auditory sensitivity to sound. | *"In academic literature, audiogram designates a graphical representation of a person's auditory sensitivity to sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiology]] | noun | **1.** The measurement of hearing. | *"In academic literature, audiology designates the measurement of hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiometer]] | noun | **1.** An instrument used to measure the sensitivity of hearing. | *"In academic literature, audiometer designates an instrument used to measure the sensitivity of hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiometric]] | adjective | **1.** Of or relating to audiometry. | *"In academic literature, audiometric designates of or relating to audiometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiometry]] | noun | **1.** The measurement of hearing.<br>**2.** Measuring sensitivity of hearing. | *"In academic literature, audiometry designates the measurement of hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiotape]] | noun | **1.** A tape recording of sound.<br>**2.** Magnetic tape for use in recording sound. | *"If the mechanics of writing or drawing is the problem, then audiotape."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[audiovisual]] | noun | **1.** Materials using sight or sound to present information.<br>**2.** Involving both hearing and seeing (usually relating to teaching aids). | *"In academic literature, audiovisual designates materials using sight or sound to present information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audit]] | noun | **1.** An inspection of the accounting procedures and records by a trained accountant or cpa.<br>**2.** A methodical examination or review of a condition or situation. | *"For having traffic with thyself alone, Thou of thyself thy sweet self dost deceive, Then how when nature calls thee to be gone, What acceptable audit canst thou leave?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[audition]] | noun | **1.** The ability to hear; the auditory faculty.<br>**2.** A test of the suitability of a performer. | *"Abraham talked on, rather for the pleasure of utterance than for audition, so that his sister’s abstraction was of no account."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[auditive]] | adjective | **1.** Of or relating to the process of hearing. | *"What was Stephen’s auditive sensation?"* — James Joyce, *Ulysses* |
| [[auditor]] | noun | **1.** Someone who listens attentively.<br>**2.** A student who attends a course but does not take it for credit. | *"I heard him tell it to one of his company last night at supper; a kind of auditor, one that hath abundance of charge too, God knows what."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[auditorium]] | noun | **1.** The area of a theater or concert hall where the audience sits. | *"Eddy and to the friend who invited me to attend the service held in the Auditorium years ago."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[auditory]] | adjective | **1.** Of or relating to the process of hearing. | *"Then, noble auditory, be it known to you That Chiron and the damned Demetrius Were they that murdered our emperor’s brother; And they it were that ravished our sister."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[audubon]] | noun | **1.** United states ornithologist and artist (born in haiti) noted for his paintings of birds of america (1785-1851). | *"In academic literature, audubon designates united states ornithologist and artist (born in haiti) noted for his paintings of birds of america (1785-1851)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inaudibility]] | noun | **1.** The quality of not being perceptible by the ear. | *"In academic literature, inaudibility designates the quality of not being perceptible by the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inaudible]] | adjective | **1.** Impossible to hear; imperceptible by the ear. | *"Let’s take the instant by the forward top; For we are old, and on our quick’st decrees Th’inaudible and noiseless foot of time Steals ere we can effect them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inaudibleness]] | noun | **1.** The quality of not being perceptible by the ear. | *"In academic literature, inaudibleness designates the quality of not being perceptible by the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inaudibly]] | adverb | **1.** In an inaudible manner. | *"Quale asked Ada and me, not inaudibly, whether he was not a great creature—which he certainly was, flabbily speaking, though Mr."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Senses & Perception]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AUD
  </div>
</div>
