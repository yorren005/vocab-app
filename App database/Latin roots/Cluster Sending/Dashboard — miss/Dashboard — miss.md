---
status: unread
type: root_dashboard
---
# Dashboard — miss
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">miss-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sent or dispatched”</span>
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

The root **miss** means sent or dispatched. It refers to sending out messengers, releasing goods, or discharging items. In English, this root forms words such as *mission*, *missile*, *dismiss*, and *permission*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: sent or dispatched
> The root **miss** means sent or dispatched. It refers to sending out messengers, releasing goods, or discharging items. In English, this root forms words such as *mission*, *missile*, *dismiss*, and *permission*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sent or dispatched</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *mission* and *missile*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **miss** comes from a Latin word that means *"sent or dispatched"*.
  - At its core, it describes sent or dispatched.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **miss** in an English word, think of **sending outward and dispatching**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sent or dispatched.
  - **Mental & Social**: How people experience, organize, or communicate about sent or dispatched.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Mission**: An important operational assignment carried out by a person or group.
  - **Missile**: An everyday English word showing the root's idea of *sent or dispatched*.
  - **Dismiss**: An everyday English word showing the root's idea of *sent or dispatched*.
  - **Permission**: An everyday English word showing the root's idea of *sent or dispatched*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">miss</mark>, think of <mark class="hl-def">sending outward and dispatching</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Participial / Supine Base:** *miss-* (*missus, missum*) $	o$ *missile, missive*.

- **Institutional Nominal Formations in *-iō*:**

  - *missiō* $	o$ *mission, missionary, missioner*.

  - `ad-` + *missiō* $	o$ *admission*.

  - `con-` + *missiō* $	o$ *commission, commissioner, decommission, recommission*.

  - `e-` + *missiō* $	o$ *emission*.

  - `inter-` + *missiō* $	o$ *intermission*.

  - `manū-` + *missiō* $	o$ *manumission* (sending slave from master's hand/power).

  - `ob-` + *missiō* $	o$ *omission*.

  - `per-` + *missiō* $	o$ *permission*.

  - `re-` + *missiō* $	o$ *remission*.

  - `sub-` + *missiō* $	o$ *submission, submissive*.

  - `trans-` + *missiō* $	o$ *transmission*.



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



### 1. Institutional Deployments & Spaceflight

- *mission* (an important assignment carried out, often involving travel; the sending of an aircraft or spacecraft).

- *missionary* (a person sent on a religious mission; relating to such a mission).

- *missioner* (a person sent on a religious mission).



### 2. Legal Authority, Entrustment & Mandates

- *commission (n)* (an instruction, command, or duty given to a person or group; a group entrusted with an inquiry).

- *commission (v)* (give an order for or authorize the production of).

- *commissioner* (a representative of supreme authority in an area; head of an executive department).

- *decommission* (withdraw something from active service, as a warship or nuclear reactor).

- *recommission* (place back into active service).



### 3. Physical Emitted Signals & Energy

- *emission* (the production and discharge of something, especially gas or radiation).

- *transmission* (the action or process of transmitting something; the broadcasting of radio/television; car gear system).



### 4. Legal Releases, Pauses & Tolerances

- *admission* (the process or fact of entering or being allowed to enter a place or organization; a confession).

- *permission* (consent; formal authorization).

- *omission* (someone or something that has been left out or excluded; failure to act).

- *remission* (the cancellation of a debt, charge, or penalty; a temporary diminution of the severity of disease).

- *intermission* (a pause or break, especially between parts of a play, opera, or film).

- *manumission* (release from slavery; the act of freeing a slave).

- *submission* (the action or fact of yielding to a superior force or authority; an act of presenting a proposal).

- *submissive* (ready to conform to the authority or will of others; meekly obedient).



---



## 🔀 4. Prefix & Combining Dynamics on miss



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `ad-`** | `ad-` + *missiō* | **admission** | Allowing entrance / sending inside | *"The university granted admission to top regional scholarship applicants."* |

| **Prefix `con-`** | `con-` + *missiō* | **commission** | Entrusting authority jointly | *"The governor appointed a judicial commission to investigate municipal corruption."* |

| **Prefix `inter-`** | `inter-` + *missiō* | **intermission** | Sending a pause between acts | *"Theatergoers mingled in the lobby during the fifteen-minute intermission."* |

| **Prefix `re-`** | `re-` + *missiō* | **remission** | Sending back a penalty / disease abating | *"The oncology team celebrated the patient's complete cancer remission."* |

| **Compound `manu-`**| *manus* + *missiō* | **manumission** | Releasing a slave from master's hand | *"George Washington's will provided for the eventual manumission of his slaves."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🚀 **Aerospace & Space Exploration:** *NASA mission control*, *mission architecture to Mars*.

- 🏥 **Clinical Oncology:** *complete remission vs partial remission of malignancy*.

- 🚗 **Mechanical Engineering:** *automatic transmission*, *continuously variable transmission (CVT)*.

- ⚖️ **International Human Rights & History:** *manumission deeds*, *truth and reconciliation commissions*.

- 🌿 **Environmental Science:** *carbon emissions monitoring*, *net-zero emission protocols*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[admissibility]] | noun | **1.** Acceptability by virtue of being admissible. | *"In academic literature, admissibility designates acceptability by virtue of being admissible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admissible]] | adjective | **1.** Deserving to be admitted. | *"It will be shown in the next paper that this CONCURRENT JURISDICTION in the article of taxation was the only admissible substitute for an entire subordination, in respect to this branch of power, of the State authority to that of the Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[admission]] | noun | **1.** The act of admitting someone to enter.<br>**2.** An acknowledgment of the truth of something. | *"He doth rely on none; But carries on the stream of his dispose, Without observance or respect of any, In will peculiar and in self-admission."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admissive]] | adjective | **1.** Characterized by or allowing admission. | *"In academic literature, admissive designates characterized by or allowing admission."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commissar]] | noun | **1.** An official of the communist party who was assigned to teach party principles to a military unit. | *"In academic literature, commissar designates an official of the communist party who was assigned to teach party principles to a military unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commissariat]] | noun | **1.** A stock or supply of foods. | *"I never want to see a chicken again except alive." For the last week monotony had been the keynote of our commissariat."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[commissary]] | noun | **1.** A retail store that sells equipment and provisions (usually to military personnel).<br>**2.** A snack bar in a film studio. | *"On Commissary Goldie’s Brains Lord, to account who dares thee call, Or e’er dispute thy pleasure?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[commission]] | noun | **1.** A special group delegated to consider some matter;  - milton berle.<br>**2.** A fee for services rendered based on a percentage of an amount received or collected or agreed to be paid (as distinguished from a salary). | *"You are more saucy with lords and honourable personages than the commission of your birth and virtue gives you heraldry."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commissionaire]] | noun | **1.** A uniformed doorman. | *"You know Peterson, the commissionaire?” “Yes.” “It is to him that this trophy belongs.” “It is his hat.” “No, no, he found it."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[commissioned]] | verb | **1.** Put into commission; equip for service; of ships.<br>**2.** Place an order for. | *"And truly when the stars go out and the wan day peeps into the turret-chamber, finding him at his oldest, he looks as if the digger and the spade were both commissioned and would soon be digging."* — Charles Dickens, *Bleak House* |
| [[commissioner]] | noun | **1.** A government administrator.<br>**2.** A member of a commission. | *"I p. 364.] [Footnote 7: In the first annual report of the United States Commissioner of Labor is given a long catalog of theories that have been suggested, many of them quite fantastic.] [Footnote 8: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commissioning]] | noun | **1.** The act of granting authority to undertake certain functions.<br>**2.** Put into commission; equip for service; of ships. | *"Collins; and as they walked down the garden, he was commissioning her with his best respects to all her family, not forgetting his thanks for the kindness he had received at Longbourn in the winter, and his compliments to Mr. and Mrs."* — Jane Austen, *Pride and Prejudice* |
| [[commissure]] | noun | **1.** A bundle of nerve fibers passing from one side to the other of the brain or spinal cord. | *"In academic literature, commissure designates a bundle of nerve fibers passing from one side to the other of the brain or spinal cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decommission]] | verb | **1.** Withdraw from active service. | *"In academic literature, decommission designates withdraw from active service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dismiss]] | verb | **1.** Bar from attention or consideration.<br>**2.** Cease to consider; put out of judicial consideration. | *"Dismiss them home. [_Exit Aedile._] Here comes his mother."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismissal]] | noun | **1.** A judgment disposing of the matter without a trial.<br>**2.** Official notice that you have been fired from your job. | *"George takes his dismissal in great dudgeon, the greater because a clerk coming up the stairs has heard the last words of all and evidently applies them to him."* — Charles Dickens, *Bleak House* |
| [[dismissed]] | verb | **1.** Bar from attention or consideration.<br>**2.** Cease to consider; put out of judicial consideration. | *"I kneeled before him; ’Twas very faintly he said “Rise”; dismissed me Thus with his speechless hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismissible]] | adjective | **1.** Subject to dismissal. | *"In academic literature, dismissible designates subject to dismissal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dismission]] | noun | **1.** Official notice that you have been fired from your job.<br>**2.** The termination of someone's employment (leaving them free to depart). | *"You must not stay here longer; your dismission Is come from Caesar; therefore hear it, Antony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismissive]] | adjective | **1.** Showing indifference or disregard.<br>**2.** Stopping to associate with. | *"In academic literature, dismissive designates showing indifference or disregard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emissary]] | noun | **1.** Someone sent on a mission to represent the interests of someone else. | *"And now I find he’s in everybody’s mouth in Middlemarch as the editor of the ‘Pioneer.’ There are stories going about him as a quill-driving alien, a foreign emissary, and what not.” “Casaubon won’t like that,” said the Rector."* — George Eliot, *Middlemarch* |
| [[emission]] | noun | **1.** The act of emitting; causing to flow forth.<br>**2.** A substance that is emitted or released. | *"The imposition of duties on imported articles, and the emission of paper money, are specimens of each kind."* — Alexander Hamilton, *The Federalist Papers* |
| [[impermissibility]] | noun | **1.** Inadmissibility as a consequence of not being permitted. | *"In academic literature, impermissibility designates inadmissibility as a consequence of not being permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissible]] | adjective | **1.** Not permitted.<br>**2.** Not allowable. | *"In academic literature, impermissible designates not permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissibly]] | adverb | **1.** Not permissibly. | *"In academic literature, impermissibly designates not permissibly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadmissibility]] | noun | **1.** Unacceptability as a consequence of not being admissible. | *"In academic literature, inadmissibility designates unacceptability as a consequence of not being admissible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadmissible]] | adjective | **1.** Not deserving to be admitted. | *"Without this, there would be no responsibility whatever in the executive department an idea inadmissible in a free government."* — Alexander Hamilton, *The Federalist Papers* |
| [[intermission]] | noun | **1.** The act of suspending activity temporarily.<br>**2.** A time interval during which there is a temporary cessation of something. | *"You lov’d, I lov’d; for intermission No more pertains to me, my lord, than you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intromission]] | noun | **1.** The act of putting one thing into another. | *"In academic literature, intromission designates the act of putting one thing into another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miss]] | noun | **1.** A young woman.<br>**2.** A failure to hit (or meet or find etc). | *"Who ever strove To show her merit that did miss her love?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[missal]] | noun | **1.** (roman catholic church) a book containing all the prayers and responses needed to celebrate mass throughout the year. | *"Van Helsing opened his missal and began to read, and Quincey and I followed as well as we could."* — Bram Stoker, *Dracula* |
| [[missed]] | verb | **1.** Fail to perceive or to catch with the senses or the mind.<br>**2.** Feel or suffer from the lack of. | *"Your Coriolanus is not much missed But with his friends."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[missile]] | noun | **1.** A rocket carrying a warhead of conventional or nuclear explosives; may be ballistic or directed by remote control.<br>**2.** A weapon that is forcibly thrown or projected at a targets but is not self-propelled. | *"Seventy-six hundred thousand million of parcels of bank-notes!” “Will somebody give me a quart pot?” exclaims her exasperated husband, looking helplessly about him and finding no missile within his reach."* — Charles Dickens, *Bleak House* |
| [[missing]] | verb | **1.** Fail to perceive or to catch with the senses or the mind.<br>**2.** Feel or suffer from the lack of. | *"My lord, the roynish clown, at whom so oft Your grace was wont to laugh, is also missing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mission]] | noun | **1.** An organization of missionaries in a foreign land sent to carry on religious work.<br>**2.** An operation that is assigned by a higher headquarters. | *"Quale’s mission to be in ecstasies with everybody else’s mission and that it was the most popular mission of all."* — Charles Dickens, *Bleak House* |
| [[missional]] | adjective | **1.** Relating to or connected to a religious mission. | *"In academic literature, missional designates relating to or connected to a religious mission."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missionary]] | noun | **1.** Someone who attempts to convert others to a particular doctrine or program.<br>**2.** Someone sent on a mission--especially a religious or charitable mission to a foreign country. | *"Over their heads hung the picture of Angel’s sister, the eldest of the family, sixteen years his senior, who had married a missionary and gone out to Africa."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[missioner]] | noun | **1.** Someone sent on a mission--especially a religious or charitable mission to a foreign country. | *"It was the men’s temperance retreat conducted by the missioner, the reverend John Hughes S."* — James Joyce, *Ulysses* |
| [[missis]] | noun | **1.** Informal term of address for someone's wife. | *"In the morning, I said, 'Laura, did you sleep well last night?' She replied, 'O, missis, my heart too full of joy to sleep."* — Classic Author, *The wonders of prayer* |
| [[mississippi]] | noun | **1.** A major north american river and the chief river of the united states; rises in northern minnesota and flows southward into the gulf of mexico.<br>**2.** A state in the deep south on the gulf of mexico; one of the confederate states during the american civil war. | *"In the Mississippi Valley since 1880 natural gas, abundant coal, ore, and timber have made possible a great growth of industries without protection against the Eastern states."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mississippian]] | noun | **1.** From 345 million to 310 million years ago; increase of land areas; primitive ammonites; winged insects.<br>**2.** A native or resident of mississippi. | *"In academic literature, mississippian designates from 345 million to 310 million years ago; increase of land areas; primitive ammonites; winged insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missive]] | noun | **1.** A written message addressed to a person or organization. | *"I wrote to you When rioting in Alexandria; you Did pocket up my letters, and with taunts Did gibe my missive out of audience."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[missoula]] | noun | **1.** A university town in western montana. | *"In academic literature, missoula designates a university town in western montana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missouri]] | noun | **1.** A midwestern state in central united states; a border state during the american civil war, missouri was admitted to the confederacy without actually seceding from the union.<br>**2.** The longest river in the united states; arises in montana and flows southeastward to become a tributary of the mississippi at saint louis. | *"They denied us harshly, and wanted to know who of us had sold them food when we drove them from Missouri."* — Jack London, *The Jacket (The Star-Rover)* |
| [[missourian]] | noun | **1.** A native or resident of missouri. | *"Jeff Thompson has just been round behind the Cape pulling up the railroad, but some of the Yankee critter-fellers went out there and run him off," replied the long-haired Missourian."* — Harry Castlemon, *Rodney, the Partisan* |
| [[misstate]] | verb | **1.** State something incorrectly. | *"Is the divine Principle of creation misstated?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[misstatement]] | noun | **1.** A statement that contains a mistake. | *"Passing over what appears in my colleague’s speech as extracts from newspapers, to whose misstatements he has contributed a full share, I come now to notice his animadversions on the Riddleberger bill."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[misstep]] | noun | **1.** An unintentional but embarrassing blunder. | *"Down Mount Franklin and over the narrow path cut in the cragged side of Monroe, where a single misstep would hurl the horse and rider down a fathomless abyss, into whose depths the eye dares hardly for a moment gaze."* — Effie Afton, *Eventide* |
| [[missus]] | noun | **1.** Informal term of address for someone's wife. | *"I warn you if you bark again I shall go straight for master and missus and bring them home from the party, and then, oh, won’t master whip you, just.” She tied the unhappy dog up again, but do you think Nana ceased to bark?"* — J. M. Barrie, *Peter Pan* |
| [[missy]] | noun | **1.** A young woman. | *"Will ye wait, missy?” “No,” said she; and taking her basket Tess trudged on."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[noncommissioned]] | adjective | **1.** (of military officers) appointed from enlisted personnel. | *"A French noncommissioned officer of hussars, in crimson uniform and a shaggy cap, shouted to the approaching Balashëv to halt."* — graf Leo Tolstoy, *War and Peace* |
| [[nontransmissible]] | adjective | **1.** Not acquirable by inheritance.<br>**2.** (of disease) not capable of being passed on. | *"In academic literature, nontransmissible designates not acquirable by inheritance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[omissible]] | adjective | **1.** Capable of being left out. | *"In academic literature, omissible designates capable of being left out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[omission]] | noun | **1.** A mistake resulting from neglect.<br>**2.** Something that has been omitted. | *"O, then, beware: Those wounds heal ill that men do give themselves; Omission to do what is necessary Seals a commission to a blank of danger; And danger, like an ague, subtly taints Even then when they sit idly in the sun."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[omissive]] | adjective | **1.** Characterized by omissions. | *"In academic literature, omissive designates characterized by omissions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permissibility]] | noun | **1.** Admissibility as a consequence of being permitted. | *"In academic literature, permissibility designates admissibility as a consequence of being permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permissible]] | adjective | **1.** That may be permitted especially as according to rule.<br>**2.** That may be accepted or conceded. | *"Casaubon again and left off receiving favors from him, it would clearly be permissible to hate him the more."* — George Eliot, *Middlemarch* |
| [[permissibly]] | adverb | **1.** In a permissible manner. | *"In academic literature, permissibly designates in a permissible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permission]] | noun | **1.** Approval to do something.<br>**2.** The act of giving a formal (usually written) authorization. | *"What Antony shall speak, I will protest He speaks by leave and by permission; And that we are contented Caesar shall Have all true rights and lawful ceremonies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[permissive]] | adjective | **1.** Not preventive.<br>**2.** Granting or inclined or able to grant permission; not strict in discipline. | *"Sith ’twas my fault to give the people scope, ’Twould be my tyranny to strike and gall them For what I bid them do; for we bid this be done When evil deeds have their permissive pass And not the punishment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[permissively]] | adverb | **1.** In a permissive manner. | *"In academic literature, permissively designates in a permissive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permissiveness]] | noun | **1.** A disposition to allow freedom of choice and behavior. | *"In academic literature, permissiveness designates a disposition to allow freedom of choice and behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[premiss]] | noun | **1.** A statement that is assumed to be true and from which a conclusion can be drawn.<br>**2.** Take something as preexisting and given. | *"That standpoint was unquestioned by Celsus. [Sidenote: The failure of Celsus] Confident in the truth of his premisses and the conclusions that follow from them, Celsus charged the Christians with folly and dogmatism."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[pretermission]] | noun | **1.** Letting pass without notice. | *"Should his child sicken unto death,--why, look For scarce abatement of his cheerfulness, {160} Or pretermission of the daily craft!"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[promissory]] | adjective | **1.** Relating to or having the character of a promise. | *"It differs from promissory notes and bonds in that its value is not based on the interest it yields, but mainly on its monetary uses."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[readmission]] | noun | **1.** The act of admitting someone again. | *"Wilson, and expressing regret that no proposal having for its object the readmission of Master Byron to the academy could be entertained."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[remiss]] | adjective | **1.** Failing in what duty requires. | *"He, being remiss, Most generous, and free from all contriving, Will not peruse the foils; so that with ease, Or with a little shuffling, you may choose A sword unbated, and in a pass of practice, Requite him for your father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remission]] | noun | **1.** An abatement in intensity or degree (as in the manifestations of a disease).<br>**2.** A payment of money sent to a person in another place. | *"Though I owe My revenge properly, my remission lies In Volscian breasts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remissness]] | noun | **1.** The quality of being lax and neglectful. | *"The General, meanwhile, though offended every morning by Frederick’s remissness in writing, was free from any real anxiety about him, and had no more pressing solicitude than that of making Miss Morland’s time at Northanger pass pleasantly."* — Jane Austen, *Northanger Abbey* |
| [[submission]] | noun | **1.** Something (manuscripts or architectural plans and models or estimates or works of art of all genres etc.) submitted for the judgment of others (as in a competition).<br>**2.** The act of submitting; usually surrendering power to another. | *"And therefore tell her I return great thanks, And in submission will attend on her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submissive]] | adjective | **1.** Inclined or willing to submit to orders or wishes of others or showing such inclination.<br>**2.** Abjectly submissive; characteristic of a slave or servant; ; - s.h.adams. | *"On what submissive message art thou sent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submissively]] | adverb | **1.** In a servile manner. | *"Turveydrop’s deportment so submissively that they had become excellent friends."* — Charles Dickens, *Bleak House* |
| [[submissiveness]] | noun | **1.** The trait of being willing to yield to the will of another person or a superior force etc. | *"Lydgate relied much on the psychological difference between what for the sake of variety I will call goose and gander: especially on the innate submissiveness of the goose as beautifully corresponding to the strength of the gander."* — George Eliot, *Middlemarch* |
| [[transmissible]] | adjective | **1.** (of disease) capable of being transmitted by infection.<br>**2.** Occurring among members of a family usually by heredity. | *"It was a curse transmissible to children, but if he desired to keep the influence his genius gave him, he could not tell the world why he refused to marry."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[transmission]] | noun | **1.** The act of sending a message; causing a message to be transmitted.<br>**2.** Communication by means of transmitted signals. | *"It lay quietly sheltered from the motions of the sea, and under a favourable pressure for the transmission of the electric spark which passes from Europe to America in .32 of a second."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[unpermissive]] | adjective | **1.** Not inclined to grant permission; severe in discipline. | *"In academic literature, unpermissive designates not inclined to grant permission; severe in discipline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpermissiveness]] | noun | **1.** A lack of permissiveness or indulgence and a tendency to confine behavior within certain specified limits. | *"In academic literature, unpermissiveness designates a lack of permissiveness or indulgence and a tendency to confine behavior within certain specified limits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsubmissive]] | adjective | **1.** Not servile or submissive. | *"In academic literature, unsubmissive designates not servile or submissive."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MISS
  </div>
</div>
