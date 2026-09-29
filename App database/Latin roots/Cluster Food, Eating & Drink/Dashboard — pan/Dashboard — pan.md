---
status: unread
type: root_dashboard
---
# Dashboard — pan
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pan-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to spread or bread”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gathering at a dining table to share nourishment, bread, and refreshing water.</span>
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

The root **pan** means to spread or bread. It refers to bread, the shared loaf, companionship. In English, this root forms words such as *pastor*, *accompany*, *accompaniment*, and *accompanist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to spread or bread
> The root **pan** means to spread or bread. It refers to bread, the shared loaf, companionship. In English, this root forms words such as *pastor*, *accompany*, *accompaniment*, and *accompanist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To spread or bread</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *pastor* and *accompany*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pan** comes from a Latin word that means *"to spread or bread"*.
  - At its core, it describes the action of spread or bread.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **pan** in an English word, think of **to spread or bread**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to spread or bread).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Pastor**: An everyday English word showing the root's idea of *to spread or bread*.
  - **Accompany**: To go along with or escort as an associate or companion.
  - **Accompaniment**: An instrumental or vocal musical part designed to support, complement, or enrich a solo performer.
  - **Accompanist**: A musician who plays an accompaniment for a singer or soloist.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pan</mark>, think of <mark class="hl-def">to spread or bread</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *pānis*
> English acquired derivatives of *pānis* through several rich historical channels:
> 1. **The Late Latin Compound *compāniō* ("bread-sharer"):**
>    - *com-* ("with") + *pānis* $ightarrow$ Late Latin *compāniō* (stem *compāniōn-*).
>    - Entered Anglo-Norman as *companiun* $ightarrow$ **companion**, **companionship**, **companionable**.
>    - Formed collective noun *compānia* in Old French $ightarrow$ *compagnie* $ightarrow$ **company**.
>    - Formed causative verb *acompagnier* $ightarrow$ **accompany**, **accompaniment**, **accompanist**.
> 2. **The Latin Locative / Receptacle Stem *pānārium* ("bread-basket / pantry"):**
>    - *pānārium* $ightarrow$ Old French *panier* $ightarrow$ English **pannier** (pack-basket).
>    - *pānārius* (adjective) $ightarrow$ English **panary** (relating to breadmaking).
>    - Medieval Latin *pānētāria* $ightarrow$ Anglo-French *panetrie* $ightarrow$ English **pantry**.
> 3. **The Feudal Sovereign Provision *appānāre* ("to provide with bread"):**
>    - *ad-* + *pānis* $ightarrow$ Medieval Latin *appānāre* $ightarrow$ Old French *apaner* $ightarrow$ English **appanage** (princely endowment).
> 4. **Eucharistic Theology:**
>    - *in-* + *pānis* $ightarrow$ Medieval Latin *impānātiō* $ightarrow$ English **impanation** (Christ embodied in Eucharistic bread).
> 5. **Romance Culinary Diminutives & Compounds:**
>    - Italian *pane* + diminutive *-ino* $ightarrow$ **panini** (little bread rolls).
>    - Italian *pane* + augmentative *-one* $ightarrow$ **panettone** (large sweet bread).
>    - Spanish *en-* + *pan* + *-ada* $ightarrow$ **empanada** (wrapped in bread).
>    - Late Latin *pānāta* $ightarrow$ Spanish/French **panada** (bread paste/gruel).

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

```
                                  ┌── Fellowship & Commerce ──── companion, companionship, company, accompany
                                  │
                                  ├── Domestic & Architectural ─ pantry, pannier, panary
                                  │
    [PAN-] ───────────────────────┼── Global Gastronomy ──────── empanada, panini, panettone, panatela, panada
  (bread / loaf)                  │
                                  ├── Feudal & Sovereign Law ─── appanage (apanage)
                                  │
                                  └── Theology & Science ─────── impanation, panary fermentation, panivorous
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Camaraderie, Music & Enterprise:** *companion*, *companionship*, *companionable*, *companionably*, *company*, *accompany*, *accompaniment*, *accompanist*, *unaccompanied*, *companionway*.
> 2. **Storage & Transport of Bread:** *pantry*, *pannier*, *panary*.
> 3. **Feudal Endowment & Sovereignty:** *appanage* (*apanage*).
> 4. **Eucharistic Doctrine:** *impanation*, *impanate*.
> 5. **Baking Science & Diet:** *panary*, *panification*, *panivorous*.
> 6. **International Culinary Heritage:** *empanada*, *panini*, *panettone*, *panatela*, *panada*.

---

## 🔀 4. Prefix & Combining Dynamics on pan

### Prefix Dynamics

| Prefix / Combining Form | Core Value | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `com-` | with, together | **companion**, **company** | Sharing bread at the same table; hence an intimate comrade or commercial firm. |
| `ad-` + `com-` | to, toward + together | **accompany** | To join another as an escort, partner, or supporting musical voice. |
| `ad-` | to, toward (maintenance) | **appanage** | Providing royal younger sons with "bread" (estate revenues) for their sustenance. |
| `in-` | in, within | **impanation** | The theological incorporation of Christ's substance within the bread of the host. |
| `en-` (Spanish) | into, encased within | **empanada** | Savory meats or fruits encased within folded bread dough. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ship` | Abstract noun (relationship) | **companionship** | The state, intimacy, or fellowship of companions. |
| `-able` | Adjectival (fit for / inclined to) | **companionable** | Warm, friendly, and pleasant to associate with. |
| `-ary` / `-ier` (Latin *-ārium*) | Receptacle / place noun | **pannier**, **panary** | A basket or storage room dedicated to holding bread. |
| `-ry` (Latin *-āria*) | Locational noun | **pantry** | Room or cupboard where dry foodstuffs and bread are stored. |
| `-ification` | Noun of making / conversion | **panification** | The chemical and baking process of making flour into bread. |
| `-ivorous` | Adjective of diet | **panivorous** | Subsisting on bread. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🤝 **Social Psychology & Military History** | *companion*, *companionship*, *company* | Analyzing primary group cohesion in military units; tracing how ancient bread-sharing (*contubernium*) formed modern company commands. |
| 🎵 **Musicology & Performance** | *accompany*, *accompaniment*, *accompanist*, *unaccompanied* | Rehearsing vocal lieder and instrumental sonatas; mastering the delicate balance between soloists and collaborative pianists. |
| 🍞 **Food Science & Industrial Baking** | *panary*, *panification*, *panada* | Formulating industrial bread doughs; regulating panary fermentation rates, yeast dough proofing, and starch gelatinization. |
| 📜 **Feudal History & Constitutional Law** | *appanage* | Examining European monarchical land grants designed to provision younger royal princes without partitioning sovereign realm borders. |
| ⛪ **Sacramental Theology & Ecumenism** | *impanation*, *impanate* | Analyzing Lutheran and Anglican historical Eucharistic debates regarding consubstantiation vs. Roman transubstantiation. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[companion]] | noun | **1.** A friend who is frequently in the company of another.<br>**2.** A traveler who accompanies you. | *"Virginity, by being once lost, may be ten times found; by being ever kept, it is ever lost. ’Tis too cold a companion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[companionship]] | noun | **1.** The state of being with someone. | *"If it be honour in your wars to seem The same you are not, which for your best ends You adopt your policy, how is it less or worse That it shall hold companionship in peace With honour as in war, since that to both It stands in like request?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[empanada]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pan within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of pan in systematic terminology. | *"In academic literature, empanada designates pertaining to, derived from, or characteristic of latin pan within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pan]] | noun | **1.** Cooking utensil consisting of a wide metal vessel.<br>**2.** (greek mythology) god of fields and woods and shepherds and flocks; represented as a man with goat's legs and horns and ears; identified with roman sylvanus or faunus. | *"Good Bardolph, put thy face between his sheets, and do the office of a warming-pan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[panic]] | noun | **1.** An overwhelming feeling of fear and anxiety.<br>**2.** Sudden mass fear and anxiety over anticipated events. | *"He followed me when I called him: but cast a regretful look at the postern by which we had gone out, through which I had dragged him back in a panic (I confess it) unworthy of me."* — Mrs. Oliphant, *A Beleaguered City* |
| [[panification]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pan within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of pan in systematic terminology. | *"In academic literature, panification designates pertaining to, derived from, or characteristic of latin pan within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pan within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of pan in systematic terminology. | *"In academic literature, panivorous designates pertaining to, derived from, or characteristic of latin pan within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pannier]] | noun | **1.** Either of a pair of bags or boxes hung over the rear wheel of a vehicle (as a bicycle).<br>**2.** A large basket (usually one of a pair) carried by a beast of burden or on by a person. | *"The turkeys in my pannier are quite starved.—What, ostler!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pantry]] | noun | **1.** A small storeroom for storing foods or wines. | *"Madam, the guests are come, supper served up, you called, my young lady asked for, the Nurse cursed in the pantry, and everything in extremity."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Food, Eating & Drink]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PAN
  </div>
</div>
