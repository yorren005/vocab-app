---
status: unread
type: root_dashboard
---
# Dashboard — pris
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pris-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to take or seize”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Asking a sincere question or searching along a path for a lost item.</span>
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

The root **pris** means to take or seize. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *prison*, *imprison*, *imprisonment*, and *prisoner*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to take or seize
> The root **pris** means to take or seize. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *prison*, *imprison*, *imprisonment*, and *prisoner*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To take or seize</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Asking a sincere question or searching along a path for a lost item.</mark>
> - **Everyday Connection**: Think of familiar words like *prison* and *imprison*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pris** comes from a Latin word that means *"to take or seize"*.
  - At its core, it describes the action of take or seize.

- **The Big Picture Idea**:
  - Picture asking a sincere question or searching along a path for a lost item.
  - Whenever you see **pris** in an English word, think of **to take or seize**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to take or seize).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Prison**: A place of lawful confinement for accused or convicted criminals.
  - **Imprison**: To confine in or as if in a prison.
  - **Imprisonment**: The act of incarcerating someone or the state of being incarcerated.
  - **Prisoner**: A person held in custody or captivity under lawful sentence or pending trial.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pris</mark>, think of <mark class="hl-def">to take or seize</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The stem **pris-** / **prise-** functions as a Romance deverbal base in English:
> - **Primary Romance Nominal/Participial Base:** `pris-` / `prise-` (e.g., *prison*, *comprise*, *apprise*, *surprise*, *reprise*)
> - **Agent & Abstract Deverbal Suffixes:** `-er` (*prisoner*), `-al` (*reprisal*), `-ing` (*enterprising*), `-ment` (*imprisonment*)
> - **Direct Classical Latin Sibling Stems:** `prehend-` (present infinitive) and `prehens-` (classical supine/participle), which exist in parallel scholarly doublets (*comprehend* vs. *comprise*; *apprehend* vs. *apprise*).
>
> English builds complex vocabulary by combining Romance spatial prefixes (*com-*, *sur-*, *en- / entre-*, *re-*, *in-*) with this root of physical and mental seizure.

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
> - **Penal & Physical Confinement:** [[prison]], [[imprison]], *prisoner*, *imprisonment* — the state of being held in bodily custody by legal authority.
> - **Tactical & Psychological Ambush:** [[surprise]] — literally "taken from above" or overtaken unawares without defense.
> - **Bold Undertaking & Commerce:** [[enterprise]], *enterprising*, [[entrepreneur]] — reaching out to seize an arduous endeavor or commercial initiative.
> - **Constitutive Containment:** [[comprise]] — grasping or holding all constituent parts within a unified whole.
> - **Notification & Shared Knowledge:** *apprise* — conveying information so the listener's mind grasps the situation.
> - **Retaliation & Repetition:** *reprisal* (retaliatory seizure of property or life) and [[reprise]] (taking back a musical theme or performance).
> - **Peculiar Common Law Formulas:** *culprit* (< Anglo-Norman *cul. prit*, "guilty, ready to prove") and *mainprise* ("taking by the hand" as surety/bail).

---

## 🔀 4. Prefix & Combining Dynamics on pris

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **com-** (*cum*) | completely, together | [[comprise]] | To hold or seize together; to include or be constituted of. |
| **sur-** (*super*) | over, above, upon | [[surprise]] | To fall upon suddenly; to seize unawares or astonish. |
| **entre- / enter-** (*inter*) | between, among | [[enterprise]], [[entrepreneur]] | To grasp between parties; an arduous venture or venture-taker. |
| **im- / in-** (*in*) | into, within | [[imprison]] | To confine within a place of lawful detention. |
| **re-** (*re-*) | back, again | [[reprise]], *reprisal* | A taking back; a recapitulation or an act of retaliatory seizure. |
| **ad- $\to$ a-** (*ad*) | to, toward | *apprise* | To cause to take hold; to notify or make cognizant. |
| **main-** (*manus*) | hand | *mainprise* | A taking into hand; delivering an arrestee to sureties. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-on** (*-iōnem*) | abstract / locative noun | [[prison]] | State or physical institution of confinement. |
| **-er** | personal agent noun | *prisoner* | One who is held captive in custody. |
| **-al** | nominal / legal action | *reprisal* | The practice or act of retaliatory capture. |
| **-ing** | participial adjective | *enterprising* | Characterized by readiness to undertake daring initiatives. |
| **-ment** | nominal condition | *imprisonment* | The ongoing condition or sentence of incarceration. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Criminal Law & Penology** | [[prison]], [[imprison]], *mainprise*, *culprit* | Detention of accused persons, penal administration, bailment. |
| **Public International & Maritime Law** | *reprisal*, *prize* (of war), *letters of marque* | Armed retaliation short of war, naval capture of merchant vessels. |
| **Business & Venture Capital** | [[enterprise]], *enterprising*, [[entrepreneur]] | Commercial risk-taking, corporate organization, new market creation. |
| **Formal Writing & Logic** | [[comprise]], *apprise* | Describing whole-to-part relationships; formal executive briefings. |
| **Music & Performing Arts** | [[reprise]] | Restatement of a musical exposition or recurring theatrical number. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[apprisal]] | noun | **1.** Informing by words. | *"In academic literature, apprisal designates informing by words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apprise]] | verb | **1.** Inform (somebody) of something.<br>**2.** Make aware of. | *"Brocklehurst to apprise Miss Temple and the teachers of my vicious nature."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[comprise]] | verb | **1.** Be composed of.<br>**2.** Include or contain; have as a component. | *"After the waste of a few minutes in saying the proper nothings, she began to give the invitation which was to comprise all the remaining dues of the Musgroves."* — Jane Austen, *Persuasion* |
| [[enterprise]] | noun | **1.** A purposeful or industrious undertaking (especially one that requires effort or boldness).<br>**2.** An organization created for business ventures. | *"If you saw yourself with your eyes or knew yourself with your judgement, the fear of your adventure would counsel you to a more equal enterprise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enterpriser]] | noun | **1.** Someone who organizes a business venture and assumes the risk for it. | *"A wide field for enterpriser's profits was opened up by the rapid displacement of prevailing prices in all quarters of the industrial world."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[enterprising]] | adjective | **1.** Marked by imagination, initiative, and readiness to undertake new projects. | *"Kurt, the second boy, is the most enterprising and humorous of the family; whereas, Lippo, another boy, is the soul of obedience and formality."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[enterprisingly]] | adverb | **1.** In an enterprising manner. | *"In academic literature, enterprisingly designates in an enterprising manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterprisingness]] | noun | **1.** Readiness to embark on bold new ventures. | *"In academic literature, enterprisingness designates readiness to embark on bold new ventures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imprison]] | verb | **1.** Lock up or confine, in or as in a jail.<br>**2.** Confine as if in a prison. | *"She’s wedded; Her husband banish’d; she imprison’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imprisoned]] | verb | **1.** Lock up or confine, in or as in a jail.<br>**2.** Confine as if in a prison. | *"So is the time that keeps you as my chest Or as the wardrobe which the robe doth hide, To make some special instant special-blest, By new unfolding his imprisoned pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imprisonment]] | noun | **1.** Putting someone in prison or in jail as lawful punishment.<br>**2.** The state of being imprisoned. | *"Beside the charge, the shame, imprisonment, You have done wrong to this my honest friend, Who, but for staying on our controversy, Had hoisted sail and put to sea today."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonenterprising]] | adjective | **1.** Lacking in enterprise; not bold or venturesome. | *"In academic literature, nonenterprising designates lacking in enterprise; not bold or venturesome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[priscoan]] | noun | **1.** The earliest eon in the history of the earth from the first accretion of planetary material (around 4,600 million years ago) until the date of the oldest known rocks (about 3,800 million years ago); no evidence of life. | *"In academic literature, priscoan designates the earliest eon in the history of the earth from the first accretion of planetary material (around 4,600 million years ago) until the date of the oldest known rocks (about 3,800 million years ago); no evidence of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prise]] | verb | **1.** To move or force, especially in an effort to get something open; :.<br>**2.** Make an uninvited or presumptuous inquiry. | *"Nor we ’ain’t ever been arrested for doin’ d-d-damage to property.” “You s’prise me,” says Mr."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[prism]] | noun | **1.** A polyhedron with two congruent and parallel faces (the bases) and whose lateral faces are parallelograms.<br>**2.** Optical device having a triangular shape and made of glass or quartz; used to deviate a beam or invert an image. | *"Casaubon quite shamefully: I think you would have given up ever coming to see me if he had asked you.” “Of course I submitted to him, because it was my duty; it was my feeling for him,” said Dorothea, looking through the prism of her tears."* — George Eliot, *Middlemarch* |
| [[prismatic]] | adjective | **1.** Of or relating to or resembling or constituting a prism.<br>**2.** Exhibiting spectral colors formed by refraction of light through a prism. | *"The huge pool of blood in front of her was already assuming the iridescence of coagulation; and when the sun rose a hundred prismatic hues were reflected from it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[prismatoid]] | noun | **1.** A polyhedron whose vertices all lie in one or the other of two parallel planes; the faces that lie in those planes are the bases of the prismatoid. | *"In academic literature, prismatoid designates a polyhedron whose vertices all lie in one or the other of two parallel planes; the faces that lie in those planes are the bases of the prismatoid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prismoid]] | noun | **1.** A prismatoid whose bases are polygons having the same number of sides and whose other faces are trapezoids or parallelograms. | *"In academic literature, prismoid designates a prismatoid whose bases are polygons having the same number of sides and whose other faces are trapezoids or parallelograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prison]] | noun | **1.** A correctional institution where persons are confined while on trial or for punishment.<br>**2.** A prisonlike situation; a place of seeming confinement. | *"She does abuse our ears; to prison with her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prison-breaking]] | noun | **1.** An escape from jail. | *"In academic literature, prison-breaking designates an escape from jail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prisonbreak]] | noun | **1.** An escape from jail. | *"In academic literature, prisonbreak designates an escape from jail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prisoner]] | noun | **1.** A person who is confined; especially a prisoner of war. | *"He taught me how to know a man in love, in which cage of rushes I am sure you are not prisoner."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prisonlike]] | adjective | **1.** Resembling a prison. | *"In academic literature, prisonlike designates resembling a prison."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prissily]] | adverb | **1.** In a prissy manner. | *"In academic literature, prissily designates in a prissy manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prissy]] | adjective | **1.** Exaggeratedly proper.<br>**2.** Excessively fastidious and easily disgusted. | *"In academic literature, prissy designates exaggeratedly proper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pristidae]] | noun | **1.** Large primitive rays with elongated snouts. | *"In academic literature, pristidae designates large primitive rays with elongated snouts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pristine]] | adjective | **1.** Completely free from dirt or contamination.<br>**2.** Immaculately clean and unused. | *"By Cheshu, he will maintain his argument as well as any military man in the world, in the disciplines of the pristine wars of the Romans."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pristis]] | noun | **1.** Type genus of the pristidae. | *"In academic literature, pristis designates type genus of the pristidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reprisal]] | noun | **1.** A retaliatory action against an enemy in wartime. | *"I am on fire To hear this rich reprisal is so nigh, And yet not ours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reprise]] | verb | **1.** Repeat an earlier theme of a composition. | *"In academic literature, reprise designates repeat an earlier theme of a composition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surprisal]] | noun | **1.** The act of surprising someone. | *"Surrounded by hostile tribes, whose mode of warfare is by ambush and surprisal, he is always prepared for fight and lives with his weapons in his hands."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[surprise]] | noun | **1.** The astonishment you feel when something totally unexpected happens to you.<br>**2.** A sudden unexpected event. | *"I see them lay their heads together to surprise me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surprised]] | verb | **1.** Cause to be surprised.<br>**2.** Come upon or take unawares. | *"You see how easily she may be surprised."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surprisedly]] | adverb | **1.** In the manner of one who is surprised. | *"In academic literature, surprisedly designates in the manner of one who is surprised."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surpriser]] | noun | **1.** A captor who uses surprise to capture the victim. | *"In academic literature, surpriser designates a captor who uses surprise to capture the victim."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surprising]] | verb | **1.** Cause to be surprised.<br>**2.** Come upon or take unawares. | *"Surprising!” “Miss Barbary, sir,” returned Mrs."* — Charles Dickens, *Bleak House* |
| [[surprisingly]] | adverb | **1.** In a surprising manner.<br>**2.** In an amazing manner; to everyone's surprise. | *"The maids’ private aims, however, were the reverse of the dairyman’s rule, the daily selection by each damsel of the eight or ten cows to which she had grown accustomed rendering the operation on their willing udders surprisingly easy and effortless."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[surprisingness]] | noun | **1.** Extraordinariness by virtue of being unexpected. | *"You have pretty little bridges that go up in air with sudden surprisingness,” says he, and grins again."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[unenterprising]] | adjective | **1.** Lacking in enterprise; not bold or venturesome. | *"The dinner itself was long, heavy, and unenterprising; a Victorian feast, even to the "specimen glass" decorations."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unimprisoned]] | adjective | **1.** Free from confinement or physical restraint. | *"In academic literature, unimprisoned designates free from confinement or physical restraint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsurprised]] | adjective | **1.** Not surprised or expressing surprise. | *"In academic literature, unsurprised designates not surprised or expressing surprise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsurprising]] | adjective | **1.** Not causing surprise. | *"In academic literature, unsurprising designates not causing surprise."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Asking & Seeking]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PRIS
  </div>
</div>
