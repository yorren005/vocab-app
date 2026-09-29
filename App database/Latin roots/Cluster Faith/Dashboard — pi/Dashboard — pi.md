---
status: unread
type: root_dashboard
---
# Dashboard — pi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pi-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“dutiful or pious”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Placing your full trust in a loyal friend or keeping a solemn promise.</span>
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

The root **pi** means dutiful or pious. It refers to dutiful, pious, reverent, compassionate. In English, this root forms words such as *holy*, *pious*, *piously*, and *piousness*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: dutiful or pious
> The root **pi** means dutiful or pious. It refers to dutiful, pious, reverent, compassionate. In English, this root forms words such as *holy*, *pious*, *piously*, and *piousness*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Dutiful or pious</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Placing your full trust in a loyal friend or keeping a solemn promise.</mark>
> - **Everyday Connection**: Think of familiar words like *holy* and *pious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pi** comes from a Latin word that means *"dutiful or pious"*.
  - At its core, it describes dutiful or pious.

- **The Big Picture Idea**:
  - Picture placing your full trust in a loyal friend or keeping a solemn promise.
  - Whenever you see **pi** in an English word, think of **trust, loyalty, and faith**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of dutiful or pious.
  - **Mental & Social**: How people experience, organize, or communicate about dutiful or pious.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Holy**: An everyday English word showing the root's idea of *dutiful or pious*.
  - **Pious**: Devoutly religious.
  - **Piously**: In a devout, reverent, or religiously observant manner.
  - **Piousness**: The quality or state of being pious.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pi</mark>, think of <mark class="hl-def">trust, loyalty, and faith</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root **pi** generates English vocabulary across four distinct morphological channels:
>
> 1. **The Pure Adjectival Stem `pi-`** (from *pius*):
>    - Adjectives of devotion and their derived forms: *pious*, *piously*, *piousness*.
>    - Negative compounds with *in-* (assimilated to *im-*): *impious*, *impiously*, *impiousness*.
>    - *Note on Phonology:* Note the striking English stress shift and vowel alternation between *pious* /ˈpaɪ.əs/ (diphthong /aɪ/) and *impious* /ˈɪm.pi.əs/ (short vowel /ɪ/ with primary initial stress).
> 2. **The Abstract Nominal Stem `piet-`** (from *pietās, pietātis*):
>    - Classical Latin reborrowings: *piety*, *impiety*, *pietism*, *pietist*, *pietistic*.
>    - Italian art-historical reflex: *Pietà* (the Mother of God mourning her Son).
> 3. **The Norman / Anglo-French Romance Stem `pit-`** (from Old French *pité* < *pietātem*):
>    - *pity*, *pitiful*, *pitiless*, *piteous* (< Late Latin *pietōsus*), *pitiable*.
> 4. **The Ritual Purificatory Stem `piā-` / `piāt-`** (from *piāre*, *piātum*, *expiāre*):
>    - *expiate*, *expiation*, *expiatory*, *expiable*, *inexpiable*, *expiator*.
>    - Direct nominal/adjectival Latin loans: *piaculum*, *piacular*.

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

> [!tip] 🌈 The Four Conceptual Provinces of `pi`
>
> ```
>                            ┌── 1. Sacred Devotion & Filial Duty (pious, piety, pietism, impious)
>                            ├── 2. Pathos, Mercy & Compassion (pity, pitiful, pitiless, piteous, Pietà)
>   [pi: dutiful / sacred] ──┼── 3. Ritual Cleansing & Atonement (expiate, expiation, expiatory, inexpiable)
>                            └── 4. Sacrificial Dread & Atrocity (piaculum, piacular)
> ```
>
> 1. **Sacred Devotion, Filial Duty & Reverence:**
>    - The classical Roman alignment of one's conduct with divine law, parental gratitude, and national honor: *pious*, *piously*, *piety* (filial piety), *impious* (sacrilegious), *impiety*, *pietism* (heartfelt religious movement).
> 2. **Pathos, Mercy & Compassionate Sorrow:**
>    - The medieval Christian internalization of *pietas* as empathy for suffering creatures: *pity*, *pitiful*, *pitiless* (ruthless, devoid of empathy), *piteous* (arousing lamentation), *pitiable*, and the supreme visual representation in art history: the *Pietà*.
> 3. **Ritual Cleansing & Moral Atonement:**
>    - The judicial and spiritual extinguishing of moral guilt through penance or restitution: *expiate* (make amends for wrongdoing), *expiation*, *expiatory*, *expiable*, *inexpiable* (so heinous that no apology or penalty can ever wash it away).
> 4. **Sacrificial Dread & Cosmic Pollution:**
>    - The archaic religious apprehension of crimes that outrage heaven: *piaculum* (a sin demanding sacrificial slaughter, or the sacrificial victim itself), *piacular* (expiatory, or abominably sinful).

---

## 🔀 4. Prefix & Combining Dynamics on pi

### Prefix Dynamics

| Prefix | Morpheme Meaning | Latin Source Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `ex-` | out, thoroughly, completely | *expiāre* | [[expiate]], [[expiation]], [[expiatory]] | To cleanse *completely out*; to wipe away ritual or moral contamination through sacrificial penance. |
| `in-` (→ *im-*) | not, un- | *impius*, *impietās* | [[impious]], [[impiety]], [[impiousness]] | *Lacking* sacred reverence; actively contemptuous of sacred bonds, parents, or divine majesty. |
| `in-` (negative) | not, un- | *inexpiābilis* | [[inexpiable]] | *Incapable* of being cleansed or atoned for; irremediable; admitting no peace or reconciliation. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ous` | Full of, possessing | *pi-* + *-ous* | [[pious]] | Marked by reverence and devout observance. |
| `-ety` | State, quality, or virtue | *pi-* + *-etās* | [[piety]], [[impiety]] | The condition of being reverently dutiful; or its violation. |
| `-y` (Norman) | State, emotion, feeling | *pité* | [[pity]] | Sympathetic sorrow and compassion for another's distress. |
| `-eous` / `-ous` | Producing, arousing | *pietōsus* | [[piteous]] | Moving onlookers to profound compassion and grief. |
| `-ful` | Abounding in | *pity* + *-ful* | [[pitiful]] | Evoking compassionate sympathy, or contemptibly wretched. |
| `-less` | Devoid of, lacking | *pity* + *-less* | [[pitiless]] | Merciless, unsparing, completely destitute of sympathy. |
| `-able` | Capable of being | *pity* + *-able* | [[pitiable]] | Worthy of or exciting pity; miserable. |
| `-ate` | Action / verbalization | *expiātus* | [[expiate]] | To perform an action that wipes out guilt or sin. |
| `-tion` | Process or result | *expiātiō* | [[expiation]] | The ritual act or theological mechanism of atonement. |
| `-atory` | Serving to, tending to | *expiātōrius* | [[expiatory]] | Designed to appease wrath or make moral restitution. |
| `-ism` | Devotional doctrine/system | *Pietismus* | [[pietism]] | Devotional movement prioritizing personal religious feeling. |
| `-ular` | Pertaining to | *piāculāris* | [[piacular]] | Relating to expiatory sacrifice, or requiring atonement. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| 🎨 **Art History & Aesthetics** | [[Pietà]], [[piteous]], [[pitiful]] | A **Pietà** is a specific Christian artistic genre depicting Mary mourning over the crucified Christ on her lap, immortalized in Michelangelo’s 1499 sculpture in St. Peter's Basilica. |
| 🏛️ **Classical History & Epic Poetry** | [[piety]], [[pious]], [[impious]], [[piaculum]] | **Pietas** is the defining heroic motif of Virgil’s *Aeneid*; the epithet *pius Aeneas* anchors Roman imperial ideology as founded upon divine duty rather than sheer brutal conquest. |
| ⚖️ **Law, Ethics & Penology** | [[expiate]], [[expiation]], [[inexpiable]] | In restorative justice and penal philosophy, the **expiatory theory of punishment** argues that an offender must suffer a proportionate penalty to morally wash away the guilt of his crime. Crimes against humanity are often characterized as morally **inexpiable**. |
| ⛪ **Theology & Church History** | [[pietism]], [[pietist]], [[expiatory]], [[impiety]] | **Pietism** was a major 17th-century renewal movement within German Lutheranism led by Philipp Spener and August Francke, emphasizing experiential faith, personal sanctification, and charitable works over rigid scholastic dogma. |
| 🧠 **Moral Psychology & Literature** | [[pity]], [[pitiless]], [[pitiable]] | Aristotle's *Poetics* defines the central catharsis of tragedy as the purging of two specific emotions: *eleos* (**pity**) and *phobos* (fear). Shakespeare repeatedly contrasts the **pitiless** tyrant with the softening influence of compassion. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[copious]] | adjective | **1.** Large in number or quantity (especially of discourse).<br>**2.** Affording an abundant supply. | *"The next morning a copious rain fell again, and the fields that had been left dry were well watered_." THE HUSHED TEMPEST."* — Classic Author, *The wonders of prayer* |
| [[copiously]] | adverb | **1.** In an abundant manner. | *"Most of them were copiously annotated, and his annotations were, as a rule, characterised by a refreshing trenchancy,--in the case of some, as of Gibbon, tempered with respect; in the case of others, as of F.W."* — John Cairns, *Principal Cairns* |
| [[copiousness]] | noun | **1.** The property of a more than adequate quantity or supply. | *"Wordsworth expounded the ruinous tendency of Reform and manufactures with even unusual copiousness, on account of the admiring affection with which he felt himself surrounded."* — F. W. H. Myers, *Wordsworth* |
| [[epi]] | noun | **1.** A self-report personality inventory based on hans eysenck's factor analysis of personality which assumes three basic factors (the two most important being extraversion to introversion and neuroticism). | *"Confine yourself to "what is in your power" (_ta epi soi_), and no man can hurt you."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[expiate]] | verb | **1.** Make amends for. | *"XXII My glass shall not persuade me I am old, So long as youth and thou are of one date; But when in thee time’s furrows I behold, Then look I death my days should expiate."* — William Shakespeare, *Shakespeare's Sonnets* |
| [[expiation]] | noun | **1.** Compensation for a wrong.<br>**2.** The act of atoning for sin or wrongdoing (especially appeasing a deity). | *"It is on the supreme Deity of Christ--on the expiation made for sin by the Maker and Sovereign of worlds--that the whole fabric of evangelical truth rests."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[expiative]] | adjective | **1.** Having power to atone for or offered by way of expiation or propitiation. | *"In academic literature, expiative designates having power to atone for or offered by way of expiation or propitiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expiatory]] | adjective | **1.** Having power to atone for or offered by way of expiation or propitiation. | *"Hence too we can understand why an ancient Roman law, attributed to King Tullus Hostilius, prescribed that, when incest had been committed, an expiatory sacrifice should be offered by the pontiffs in the grove of Diana."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[impiety]] | noun | **1.** Unrighteousness by virtue of lacking respect for a god. | *"To keep that oath were more impiety Than Jephthah’s when he sacrificed his daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impious]] | adjective | **1.** Lacking piety or reverence for a god.<br>**2.** Lacking due respect or dutifulness. | *"The gates of monarchs Are arch’d so high that giants may jet through And keep their impious turbans on without Good morrow to the sun."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impiously]] | adverb | **1.** In an impious manner. | *"Who can impair thee, mighty King, or bound Thy Empire? easily the proud attempt Of Spirits apostat and thir Counsels vaine Thou hast repeld, while impiously they thought Thee to diminish, and from thee withdraw The number of thy worshippers."* — John Milton, *Paradise Lost* |
| [[impiousness]] | noun | **1.** Unrighteousness by virtue of lacking respect for a god. | *"In academic literature, impiousness designates unrighteousness by virtue of lacking respect for a god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pi]] | noun | **1.** The ratio of the circumference to the diameter of a circle; approximately equal to 3.14159265358979323846...<br>**2.** Someone who can be employed as a detective to collect information. | *"Tant pis!” said her Ladyship, “I hope it may do her good!” Then, in a lower tone, but still loud enough for me to hear, “I noticed her; I am a judge of physiognomy, and in hers I see all the faults of her class.” “What are they, madam?” inquired Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[pietism]] | noun | **1.** 17th and 18th-century german movement in the lutheran church stressing personal piety and devotion.<br>**2.** Exaggerated or affected piety and religious zeal. | *"In academic literature, pietism designates 17th and 18th-century german movement in the lutheran church stressing personal piety and devotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pietistic]] | adjective | **1.** Of or relating to pietism.<br>**2.** Excessively or hypocritically pious. | *"In academic literature, pietistic designates of or relating to pietism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pietistical]] | adjective | **1.** Of or relating to pietism.<br>**2.** Excessively or hypocritically pious. | *"In academic literature, pietistical designates of or relating to pietism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piety]] | noun | **1.** Righteousness by virtue of being pious. | *"No, thou villain, thou art full of piety, as shall be proved upon thee by good witness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pious]] | adjective | **1.** Having or showing or expressing reverence for a deity. | *"So Follow’d my banishment, and this twenty years This rock and these demesnes have been my world, Where I have liv’d at honest freedom, paid More pious debts to heaven than in all The fore-end of my time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[piously]] | adverb | **1.** In a devout and pious manner. | *"Primitive customs always take on a religious sanction, and every member of the tribe is piously bound to do as his fathers have done and as his neighbors are doing."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[piousness]] | noun | **1.** Righteousness by virtue of being pious. | *"In academic literature, piousness designates righteousness by virtue of being pious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscina]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pi within the domain of Faith.<br>**2.** A technical or specialized form exhibiting the properties of pi in systematic terminology. | *"In academic literature, piscina designates pertaining to, derived from, or characteristic of latin pi within the domain of faith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piteous]] | adjective | **1.** Deserving or inciting pity; ; ; - galsworthy. | *"Long stay’d he so, At last,—a little shaking of mine arm, And thrice his head thus waving up and down, He rais’d a sigh so piteous and profound As it did seem to shatter all his bulk And end his being."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[piteously]] | adverb | **1.** In a piteous manner. | *"Say that the last I spoke was “Antony”, And word it, prithee, piteously."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pity]] | noun | **1.** A feeling of sympathy and sorrow for the misfortunes of others.<br>**2.** An unfortunate development. | *"Be it lawful I love thee as thou lov’st those, Whom thine eyes woo as mine importune thee, Root pity in thy heart that when it grows, Thy pity may deserve to pitied be."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Faith]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PI
  </div>
</div>
