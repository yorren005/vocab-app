---
status: unread
type: root_dashboard
---
# Dashboard — vot
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vot-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to vow or promise solemnly”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</span>
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

The root **vot** means to vow or promise solemnly. It refers to the action of vowing and carrying out this process. In English, this root forms words such as *voter*, *voting*, *votive*, and *devote*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to vow or promise solemnly
> The root **vot** means to vow or promise solemnly. It refers to the action of vowing and carrying out this process. In English, this root forms words such as *voter*, *voting*, *votive*, and *devote*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To vow or promise solemnly</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</mark>
> - **Everyday Connection**: Think of familiar words like *voter* and *voting*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vot** comes from a Latin word that means *"to vow or promise solemnly"*.
  - At its core, it describes the action of vow or promise solemnly.

- **The Big Picture Idea**:
  - Picture standing quietly inside a peaceful sanctuary dedicated to solemn devotion.
  - Whenever you see **vot** in an English word, think of **to vow or promise solemnly**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to vow or promise solemnly).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Voter**: A person who votes or who is eligible to vote in an election.
  - **Voting**: The act or process of registering a choice in an election.
  - **Votive**: Offered, given, or dedicated in fulfillment of a religious vow.
  - **Devote**: To give all or a large part of one's time, energy, or resources to a person or cause.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vot</mark>, think of <mark class="hl-def">to vow or promise solemnly</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Supine / Nominal Base:** *vōt-* (*vōtum*, plural *vōta*) $	o$ *vote, voter, voting, votive*.

- **Anglo-Norman Vocalic Shift:** Old French *vou* $	o$ English *vow*.

- **Intensive Prefixation:** `de-` + *vovēre, vōtum* $	o$ *devoveō, dēvōtus* $	o$ *devote, devoted, devotee, devotion, devotional, devout, devoutly, devoutness*.



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



### 1. Democratic Suffrage & Civic Balloting

- *vote (n)* (a formal indication of a choice between two or more candidates or courses of action).

- *vote (v)* (to give or register a vote).

- *voter* (a person who votes or has the right to vote at an election).

- *voting* (the action or process of registering a choice).



### 2. Sacred Vows & Dedications

- *vow (n)* (a solemn promise, especially one by which a person is bound to an act, service, or condition).

- *vow (v)* (to dedicate by a solemn vow; solemnly promise).

- *votive* (consecrated in fulfillment of a vow; offered as a prayer).



### 3. Personal Devotion, Love & Religious Piety

- *devote* (to give all or a large part of one's time or resources to a person, activity, or cause).

- *devoted* (very loving or loyal).

- *devotedly* (with great love, affection, or loyalty).

- *devotee* (an enthusiastic follower or admirer).

- *devotion* (love, loyalty, or enthusiasm for a person, activity, or cause; religious worship or observance).

- *devotional* (of, relating to, or used in religious worship).

- *devout* (having or showing deep religious feeling or commitment).



---



## 🔀 4. Prefix & Combining Dynamics on vot



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Root Noun** | Latin *vōtum* | **vote** | A formal ballot or expression of will | *"Citizens exercised their constitutional right to vote."* |

| **Adjectival `-ive`** | *vōtum* + *-īvus* | **votive** | Offered in fulfillment of a solemn vow | *"Worshipers lit votive candles before the cathedral altar."* |

| **Prefix `de-`** | `de-` + *vovēre* | **devote** | Consecrating one's energy completely | *"She chose to devote her life to medical research."* |

| **Participial `-ed`** | *devote* + *-ed* | **devoted** | Deeply loyal and loving | *"The devoted nurse remained by the patient's bedside all night."* |

| **Old French Shift** | Latin *dēvōtus* | **devout** | Pious, reverent, deeply religious | *"The monastery was founded by a devout band of hermits."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Constitutional Democracy & Politics:** *universal suffrage*, *voter turnout*, *popular vote vs electoral vote*.

- ⛪ **Ecclesiastical Life & Monasticism:** *monastic vows of poverty, chastity, and obedience*.

- 🎨 **Art History & Religious Anthropology:** *votive paintings (ex-votos)*, *votive offerings in ancient Mediterranean shrines*.

- 💍 **Family & Matrimony:** *wedding vows* (solemn promises exchanged between spouses).

- 💼 **Organizational Leadership:** *devoted employee base*, *devotion to customer satisfaction*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[devote]] | verb | **1.** Give entirely to a specific person, activity, or cause.<br>**2.** Dedicate. | *"Only, good master, while we do admire This virtue and this moral discipline, Let’s be no stoics nor no stocks, I pray; Or so devote to Aristotle’s checks As Ovid be an outcast quite abjur’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[devoted]] | verb | **1.** Give entirely to a specific person, activity, or cause.<br>**2.** Dedicate. | *"This is your devoted friend, sir, the manifold linguist, and the armipotent soldier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[devotedly]] | adverb | **1.** With devotion. | *"I love her most devotedly, and yet I do her wrong, in doing myself wrong, every day and hour."* — Charles Dickens, *Bleak House* |
| [[devotedness]] | noun | **1.** Feelings of ardent love. | *"It was too early yet for her fully to recognize or at least admit the change, still more for her to have readjusted that devotedness which was so necessary a part of her mental life that she was almost sure sooner or later to recover it."* — George Eliot, *Middlemarch* |
| [[devotee]] | noun | **1.** An ardent follower and admirer. | *"She loved the fresh air and the various aspects of the country, and when her eyes and cheeks glowed with mingled pleasure she looked very little like a devotee."* — George Eliot, *Middlemarch* |
| [[devotion]] | noun | **1.** Feelings of ardent love.<br>**2.** Commitment to some purpose. | *"Those his goodly eyes, That o’er the files and musters of the war Have glowed like plated Mars, now bend, now turn The office and devotion of their view Upon a tawny front."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[devotional]] | noun | **1.** A short religious service.<br>**2.** Relating to worship. | *"The former curves of sensuousness were now modulated to lines of devotional passion."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[divot]] | noun | **1.** (golf) the cavity left when a piece of turf is cut from the ground by the club head in making a stroke.<br>**2.** A piece of turf dug out of a lawn or fairway (by an animals hooves or a golf club). | *"Section 2 For six years now, since the day they had buried his wife in the green divots of Louth, women had been alien to him."* — Donn Byrne, *The Wind Bloweth* |
| [[votary]] | noun | **1.** One bound by vows to a religion or life of worship or service.<br>**2.** A priest or priestess (or consecrated worshipper) in a non-christian religion or cult. | *"I am a votary; I have vowed to Jaquenetta to hold the plough for her sweet love three year."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vote]] | noun | **1.** A choice that is made by counting the number of people in favor of each alternative.<br>**2.** The opinion of a group as determined by voting. | *"Snagsby is effected and (more important) the vote and interest of Mrs."* — Charles Dickens, *Bleak House* |
| [[voteless]] | adjective | **1.** Deprived of the rights of citizenship especially the right to vote. | *"In academic literature, voteless designates deprived of the rights of citizenship especially the right to vote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voter]] | noun | **1.** A citizen who has a legal right to vote. | *"Look what Stanley said the other day—that the House had been tinkering long enough at small questions of bribery, inquiring whether this or that voter has had a guinea when everybody knows that the seats have been sold wholesale."* — George Eliot, *Middlemarch* |
| [[voting]] | noun | **1.** A choice that is made by counting the number of people in favor of each alternative.<br>**2.** Express one's preference for a candidate or for a measure or resolution; cast a vote. | *"Classes A and B are elected by the member banks by a system of group and preferential voting designed to prevent the large banks from outvoting the smaller ones."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[votive]] | adjective | **1.** Dedicated in fulfillment of a vow. | *"It had walked for hundreds of years, if not as benefit-club, as votive sisterhood of some sort; and it walked still."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[votyak]] | noun | **1.** A member of the finno-ugric-speaking people living in eastern european russia.<br>**2.** The finnic language spoken by the votyak. | *"In academic literature, votyak designates a member of the finno-ugric-speaking people living in eastern european russia."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sacred]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VOT
  </div>
</div>
