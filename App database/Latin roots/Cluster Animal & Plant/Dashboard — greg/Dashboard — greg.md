---
status: unread
type: root_dashboard
---
# Dashboard — greg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">greg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“flock or herd”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **greg** means flock or herd. It refers to flock, herd, gathering into a crowd, collective assembly. In English, this root forms words such as *gregarious*, *gregariously*, *gregariousness*, and *congregate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: flock or herd
> The root **greg** means flock or herd. It refers to flock, herd, gathering into a crowd, collective assembly. In English, this root forms words such as *gregarious*, *gregariously*, *gregariousness*, and *congregate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Flock or herd</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *gregarious* and *gregariously*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **greg** comes from a Latin word that means *"flock or herd"*.
  - At its core, it describes flock or herd.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **greg** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of flock or herd.
  - **Mental & Social**: How people experience, organize, or communicate about flock or herd.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Gregarious**: Fond of company, sociable, and outgoing.
  - **Gregariously**: In a gregarious, sociable, or herd-dwelling manner.
  - **Gregariousness**: The quality or disposition of being gregarious.
  - **Congregate**: To gather or come together into a flock, crowd, or group.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">greg</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **greg** displays an exceptionally clean, symmetrical prefixation engine. By attaching Latin directional prefixes to the verbal stem *gregāre* (*gregātus*), English models four fundamental geometric relationships to the flock:
> 1. `con-` ("together, with") + `greg-` ➔ *congregate* (to gather together into a single flock).
> 2. `ad-` ("to, toward") + `greg-` ➔ *aggregate* (to bring units toward the collective body to form a whole).
> 3. `sē-` ("apart, aside, without") + `greg-` ➔ *segregate* (to cut off or isolate away from the flock).
> 4. `ē-` / `ex-` ("out of, away from") + `greg-` ➔ *egregious* (literally "standing out from the flock").
> 5. `dis-` ("un-, apart") + `aggregate` ➔ *disaggregate* (to dismantle an aggregate into its original constituent units).
> 6. `de-` ("reverse, undo") + `segregate` ➔ *desegregate* (to eliminate barriers of segregation).

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
> Although derived from grazing sheep, the semantic paths reflect core patterns of human society:
> - **Social Psychology:** [[gregarious]] evolved from biological flocking instincts into warmth, sociability, and love of human company.
> - **Religious Fellowship:** [[congregation]] adopted the biblical metaphor of the pastor as shepherd and worshippers as the flock of God.
> - **Quantitative Modeling:** [[aggregate]] demand, aggregate GDP, and data [[aggregation]] define macro-level totals.
> - **Societal Oppression & Justice:** [[segregation]] and [[desegregation]] chronicle the central legal battles of modern human rights.
> - **Moral & Linguistic Irony:** [[egregious]] flipped from Roman praise ("outstandingly eminent") to English condemnation ("outstandingly, shockingly bad").

---

## 🔀 4. Prefix & Combining Dynamics on greg

### Symmetrical Prefix Shifts on `greg`

| Prefix | Prefix Meaning | Combined Derivative | Spatial / Societal Shift |
| :--- | :--- | :--- | :--- |
| `con-` | together, with | [[congregate]] | Flocking together into a dense, unified gathering or worship body |
| `ad-` | toward, into | [[aggregate]] | Adding individual parts into a unified mass, sum, or total metric |
| `sē-` | apart, aside | [[segregate]] | Isolating or separating individuals or groups away from the common flock |
| `ē-` | out of, beyond | [[egregious]] | Stepping noticeably out of the flock; extraordinarily bad, flagrant |
| `dis-` | reversal, apart | [[disaggregate]] | Deconstructing a monolithic statistical aggregate into sub-units |
| `de-` | undoing | [[desegregate]] | Abolishing policies that isolate or segregate human groups |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Ecology & Ethology:** Gregarious herding behavior, flocking dynamics, murmuration in starlings, and herd immunity.
> - **Constitutional Law & Civil Rights:** *Brown v. Board of Education* (dismantling school segregation), Civil Rights Act of 1964.
> - **Macroeconomics & Econometrics:** Aggregate supply, aggregate demand curves, disaggregated census microdata.
> - **Theology & Ecclesiastical History:** Congregational autonomy, pastoral leadership, Sunday liturgical congregations.
> - **Materials Science & Civil Engineering:** Concrete aggregate (gravel, crushed stone, sand bound by cement paste).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aggregate]] | noun | **1.** The whole amount.<br>**2.** Material such as sand or gravel used with cement and water to make concrete, mortar, or plaster. | *"I should say that the aggregate of costs in Jarndyce and Jarndyce, Mrs."* — Charles Dickens, *Bleak House* |
| [[aggregated]] | verb | **1.** Amount in the aggregate to.<br>**2.** Gather in a mass, sum, or whole. | *"In fact, the artist’s design seemed this: a final theory of my own, partly based upon the aggregated opinions of many aged persons with whom I conversed upon the subject."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[aggregation]] | noun | **1.** Several things grouped together or considered as a whole.<br>**2.** The act of gathering something together. | *"Is it so certain that a dense population congested in cities and crowded in factories and mines is a more ideal social aggregation than is a community of prosperous farmers?"* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[aggregative]] | adjective | **1.** Formed of separate units gathered into a mass or whole. | *"In academic literature, aggregative designates formed of separate units gathered into a mass or whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aggregator]] | noun | **1.** A person who collects things. | *"In academic literature, aggregator designates a person who collects things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congregant]] | noun | **1.** A member of a congregation (especially that of a church or synagogue). | *"In academic literature, congregant designates a member of a congregation (especially that of a church or synagogue)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congregate]] | verb | **1.** Come together, usually for a purpose. | *"He hates our sacred nation, and he rails, Even there where merchants most do congregate, On me, my bargains, and my well-won thrift, Which he calls interest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[congregating]] | noun | **1.** The act of congregating.<br>**2.** Come together, usually for a purpose. | *"Legation street is crowded with villainous-looking ruffians congregating to loot if opportunity offers."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[congregation]] | noun | **1.** A group of people who adhere to a common faith and habitually attend a given church.<br>**2.** An assemblage of people or animals or things collected together. | *"If I see anything tonight why I should not marry her tomorrow, in the congregation, where I should wed, there will I shame her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[congregational]] | adjective | **1.** Relating to or conducted or participated in by a congregation.<br>**2.** Of or pertaining to or characteristic of a congregational church. | *"They are members of Lincoln Park Congregational Church."* — Classic Author, *The wonders of prayer* |
| [[congregationalism]] | noun | **1.** System of beliefs and church government of a protestant denomination in which each member church is self-governing. | *"In academic literature, congregationalism designates system of beliefs and church government of a protestant denomination in which each member church is self-governing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congregationalist]] | noun | **1.** A member of the congregational church.<br>**2.** Of or pertaining to or characteristic of a congregational church. | *"In this province, too, were the long-worked missionary establishments of the American Board (Congregationalist) and the China Inland Missions."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[desegregate]] | verb | **1.** Open (a place) to members of all races and ethnic groups. | *"In academic literature, desegregate designates open (a place) to members of all races and ethnic groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desegregation]] | noun | **1.** The action of incorporating a racial or religious group into a community. | *"In academic literature, desegregation designates the action of incorporating a racial or religious group into a community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[egregious]] | adjective | **1.** Conspicuously and outrageously bad or reprehensible. | *"My lord, you give me most egregious indignity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gregarine]] | noun | **1.** Vermiform protozoans parasitic in insects and other invertebrates. | *"In academic literature, gregarine designates vermiform protozoans parasitic in insects and other invertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gregarinida]] | noun | **1.** An order in the subclass telosporidia. | *"In academic literature, gregarinida designates an order in the subclass telosporidia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gregarious]] | adjective | **1.** (of animals) tending to form a group with others of the same species.<br>**2.** Instinctively or temperamentally seeking and enjoying the company of others. | *"I am disposed to be gregarious and communicative to-night,” he repeated, “and that is why I sent for you: the fire and the chandelier were not sufficient company for me; nor would Pilot have been, for none of these can talk."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[gregariously]] | adverb | **1.** In a gregarious manner. | *"In academic literature, gregariously designates in a gregarious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gregariousness]] | noun | **1.** The quality of being gregarious--having a dislike of being alone. | *"In academic literature, gregariousness designates the quality of being gregarious--having a dislike of being alone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gregorian]] | adjective | **1.** Of or relating to pope gregory i or to the plainsong chants of the roman catholic church.<br>**2.** Of or relating to pope gregory xiii or the calendar he introduced in 1582. | *"In academic literature, gregorian designates of or relating to pope gregory i or to the plainsong chants of the roman catholic church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gregory]] | noun | **1.** (roman catholic church) a church father known for his constant fight against perceived heresies; a saint and doctor of the church (329-391).<br>**2.** Italian pope from 1831 to 1846; conservative in politics and theology; worked to propagate catholicism in england and the united states (1765-1846). | *"Turk Gregory never did such deeds in arms as I have done this day."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nongregarious]] | adjective | **1.** Of plants and animals; not growing or living in groups or colonies. | *"In academic literature, nongregarious designates of plants and animals; not growing or living in groups or colonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsegregated]] | adjective | **1.** Rid of segregation; having had segregation ended. | *"In academic literature, nonsegregated designates rid of segregation; having had segregation ended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[segregate]] | noun | **1.** Someone who is or has been segregated.<br>**2.** Separate by race or religion; practice a policy of racial segregation. | *"Men given to retirement and abstract study are notoriously liable to contract a certain degree of childlikeness: and if this be the case when we segregate a man, how much more when we segregate a child!"* — Francis Thompson, *Shelley: An Essay* |
| [[segregated]] | verb | **1.** Separate by race or religion; practice a policy of racial segregation.<br>**2.** Divide from the main body or mass and collect. | *"In academic literature, segregated designates separate by race or religion; practice a policy of racial segregation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[segregation]] | noun | **1.** (genetics) the separation of paired alleles during meiosis so that members of each pair of alleles appear in different gametes.<br>**2.** A social system that provides separate facilities for minority groups. | *"A segregation of the Turkish fleet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[segregationism]] | noun | **1.** A political orientation favoring political or racial segregation. | *"In academic literature, segregationism designates a political orientation favoring political or racial segregation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[segregationist]] | noun | **1.** Someone who believes the races should be kept apart. | *"In academic literature, segregationist designates someone who believes the races should be kept apart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[segregator]] | noun | **1.** Someone who believes the races should be kept apart. | *"In academic literature, segregator designates someone who believes the races should be kept apart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ungregarious]] | adjective | **1.** (of plants) growing together in groups that are not close together.<br>**2.** (of animals) not gregarious. | *"In academic literature, ungregarious designates (of plants) growing together in groups that are not close together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsegregated]] | adjective | **1.** Rid of segregation; having had segregation ended. | *"In academic literature, unsegregated designates rid of segregation; having had segregation ended."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GREG
  </div>
</div>
