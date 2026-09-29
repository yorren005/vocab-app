---
status: unread
type: root_dashboard
---
# Dashboard — salu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">salu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“health”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body and its healthy or changing physical states.</span>
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

The root **salu** means health. It refers to health, safety, wholeness, greeting, rescue. In English, this root forms words such as *sound*, *intact*, *safe*, and *safely*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: health
> The root **salu** means health. It refers to health, safety, wholeness, greeting, rescue. In English, this root forms words such as *sound*, *intact*, *safe*, and *safely*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Health</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body and its healthy or changing physical states.</mark>
> - **Everyday Connection**: Think of familiar words like *sound* and *intact*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **salu** comes from a Latin word that means *"health"*.
  - At its core, it describes health.

- **The Big Picture Idea**:
  - Picture the physical human body and its healthy or changing physical states.
  - Whenever you see **salu** in an English word, think of **the human body and its conditions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of health.
  - **Mental & Social**: How people experience, organize, or communicate about health.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Sound**: An everyday English word showing the root's idea of *health*.
  - **Intact**: An everyday English word showing the root's idea of *health*.
  - **Safe**: Free from hurt, injury, danger, or risk.
  - **Safely**: In a manner free from danger, injury, or harm.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">salu</mark>, think of <mark class="hl-def">the human body and its conditions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **salu** operates through two intertwined classical Latin stems:
> - **The Third-Declension Stem:** *salūs* (oblique stem `salūt-`, as in genitive *salūtis*), source of *salutary*, *salutation*, *salute*, *salutatorian*.
> - **The Adjectival/Verbal Stem:** *salvus* ("safe") / *salvāre* ("to save", stem `salv-`), source of *salvation*, *salvage*, *salvo*, *salver*.
> - **Vernacular French Sound Erosion:** Latin *salvus* → Old French *sauf* (English *safe*) and *sauver* (English *save*).
> - **The Health-Giving Suffix:** Latin *salūbris* ("wholesome" → English *salubrious*, *salubrity*).
>
> English uses Latin abstract noun formatives (*-ation*, *-ity*), agents (*-or*, *-er*), and academic titles (*-atorian*) to bridge vernacular safety with high ceremonial honor.

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
> The family distributes across diverse somatic, civic, military, and spiritual spheres:
> - **Physical Health & Environmental Wholesomeness:** [[salubrious]] (promoting health, wholesome air/climate), [[salubriously]] (in a health-promoting manner), [[salubriousness]] / [[salubrity]] (healthfulness), [[salutary]] (producing beneficial effects; wholesome).
> - **Ceremonial Greetings & Academic Ranks:** [[salutation]] (greeting, letter heading), [[salute]] (military hand or artillery honor; greeting), [[salutatory]] (welcoming address at commencement), [[salutatorian]] (graduating student who delivers the welcoming address).
> - **Maritime Law, Rescue & Property:** [[salvage]] (rescue of wrecked ship/cargo; property saved), [[salvageable]] (capable of being saved), [[salvor]] / [[salvager]] (one who rescues marine property).
> - **Theology, Ethics & Deliverance:** [[salvation]] (deliverance from sin or ruin), [[salvationist]] (evangelical rescuer; Salvation Army member), [[save]] (rescue from danger; preserve), [[savior]] (one who rescues).
> - **Security, Defense & Vessels:** [[safe]] (secure, uninjured; lockbox), [[safely]] (securely), [[safety]] (state of protection), [[salver]] (ornate serving tray), [[salvo]] (simultaneous artillery discharge or burst of cheers).

---

## 🔀 4. Prefix & Combining Dynamics on salu

### Morphological Elements with `salu / salv`

| Combining Element | Nature & Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **-bris** | Health-bearing (*-fer*) | [[salubrious]] | Bearing or promoting vigorous physical health and wholesome vitality. |
| **-aris** | Pertaining to (*-ary*) | [[salutary]] | Producing advantageous, corrective, or beneficial results for well-being. |
| **-atio** | Action / Greeting noun | [[salutation]] | The formal act of wishing someone health, peace, and well-being. |
| **-atorian** | Academic orator agent | [[salutatorian]] | The scholar appointed to deliver the welcoming (*salutatory*) commencement speech. |
| **-age** | Commercial / Legal right | [[salvage]] | The maritime operation or legal compensation for rescuing shipwrecked cargo. |
| **-o** (Italian) | Artillery discharge | [[salvo]] | A simultaneous burst of artillery fired originally as a military salute (*salve*). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Admiralty & Maritime Law** | [[salvage]], [[salvor]], [[salvageable]] | Lloyd’s Open Form (LOF) salvage contracts, marine insurance underwriting, and environmental hazard mitigation from oil tanker groundings. |
| **Constitutional Law & Political Philosophy** | [[salutary]], [[safety]] | Applying Cicero's maxim (*Salus populi suprema lex esto*) to state emergency powers, and Edmund Burke's doctrine of "salutary neglect." |
| **Public Health & Environmental Medicine** | [[salubrious]], [[salubrity]], [[salutary]] | Assessing the salubrious microclimate of alpine sanitariums, urban air quality monitoring, and implementing salutary water filtration systems. |
| **Academic Ceremonials & Higher Education** | [[salutatorian]], [[salutatory]] | University commencement hierarchies: distinguishing the valedictorian (farewell address) from the salutatorian (welcoming address). |
| **Military Etiquette & Naval Customs** | [[salute]], [[salvo]] | Protocol for hand salutes between ranks, international 21-gun presidential naval gun salutes, and military burial rifle volleys. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[insalubrious]] | adjective | **1.** Detrimental to health. | *"He would have let the house, but could find no tenant, in consequence of its ineligible and insalubrious site."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[insalubriousness]] | noun | **1.** The quality of being insalubrious and debilitating. | *"In academic literature, insalubriousness designates the quality of being insalubrious and debilitating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insalubrity]] | noun | **1.** The quality of being insalubrious and debilitating. | *"In academic literature, insalubrity designates the quality of being insalubrious and debilitating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salubrious]] | adjective | **1.** Promoting health; healthful; ; ; ; ; - c.b.davis.<br>**2.** Favorable to health of mind or body. | *"Her health which had greatly improved during her stay in the salubrious climate of San Jose, where the temperature ranges at about 70 deg."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[salubriousness]] | noun | **1.** The quality of being salubrious and invigorating. | *"In academic literature, salubriousness designates the quality of being salubrious and invigorating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salubrity]] | noun | **1.** The quality of being salubrious and invigorating. | *"Also I think of changing my residence for a time: probably I shall close or let ‘The Shrubs,’ and take some place near the coast—under advice of course as to salubrity."* — George Eliot, *Middlemarch* |
| [[salutary]] | adjective | **1.** Tending to promote physical well-being; beneficial to health. | *"The fluid was applied by means of a wisp of straw, and the person who discharged this salutary office went round the house in the direction of the sun."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[salutation]] | noun | **1.** An act of honor or courteous recognition.<br>**2.** (usually plural) an acknowledgment or expression of good will (especially on meeting). | *"For why should others’ false adulterate eyes Give salutation to my sportive blood?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salutatorian]] | noun | **1.** A graduating student with the second highest academic rank; may deliver the opening address at graduation exercises. | *"In academic literature, salutatorian designates a graduating student with the second highest academic rank; may deliver the opening address at graduation exercises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salutatory]] | noun | **1.** An opening or welcoming statement (especially one delivered at graduation exercises). | *"In academic literature, salutatory designates an opening or welcoming statement (especially one delivered at graduation exercises)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salute]] | noun | **1.** An act of honor or courteous recognition.<br>**2.** A formal military gesture of respect. | *"You told me you salute not at the court but you kiss your hands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[saluter]] | noun | **1.** A person who greets. | *"In academic literature, saluter designates a person who greets."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SALU
  </div>
</div>
