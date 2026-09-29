---
status: unread
type: root_dashboard
---
# Dashboard — habit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">habit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“have, hold, or dwell”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Laying bricks to build a sturdy home or resting inside a safe shelter.</span>
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

The root **habit** means have, hold, or dwell. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *take*, *habitat*, *habitation*, and *habitable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: have, hold, or dwell
> The root **habit** means have, hold, or dwell. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *take*, *habitat*, *habitation*, and *habitable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Have, hold, or dwell</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Laying bricks to build a sturdy home or resting inside a safe shelter.</mark>
> - **Everyday Connection**: Think of familiar words like *take* and *habitat*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **habit** comes from a Latin word that means *"have, hold, or dwell"*.
  - At its core, it describes have, hold, or dwell.

- **The Big Picture Idea**:
  - Picture laying bricks to build a sturdy home or resting inside a safe shelter.
  - Whenever you see **habit** in an English word, think of **building, crafting, and dwelling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of have, hold, or dwell.
  - **Mental & Social**: How people experience, organize, or communicate about have, hold, or dwell.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Take**: An everyday English word showing the root's idea of *have, hold, or dwell*.
  - **Habitat**: The natural environment, geographic locality, and specific conditions in which a plant, animal, or organism normally lives and thrives.
  - **Habitation**: A house, home, or physical structure used as a place of human residence.
  - **Habitable**: Suitable, safe, and comfortable for human residence.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">habit</mark>, think of <mark class="hl-def">building, crafting, and dwelling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Compounding Behavior
> The root **habit** operates across several primary morphological branches in English:
> - **Primary Verb Base:** `habit-` / `in-habit` / `co-habit`:
>   - Simple base *habit-* rarely stands alone as a finite verb today, but dominates through directional prefixation: *in- + habit* → [[inhabit]], *co- + habit* → [[cohabit]].
> - **Verbal Nouns & Agent Suffixes:**
>   - `habit-` + `-ant` → [[habitant]] (resident; historic French-Canadian settler).
>   - `inhabit-` + `-ant` → [[inhabitant]] (standard permanent resident).
>   - `cohabit-` + `-ant` / `-ee` → [[cohabitant]], [[cohabitee]] (domestic partner).
> - **Capacity & Evaluation Adjectives:**
>   - `habit-` + `-able` → [[habitable]] ("fit to dwell in").
>   - `in-` + `habit-` + `-able` → [[inhabitable]] ("capable of being inhabited").
>   - Negations: `un-` + `habitable` → *uninhabitable*, `un-` + `inhabited` → [[uninhabited]].
> - **Abstract Action & Legal State:**
>   - `habit-` + `-ation` → [[habitation]] (dwelling place; act of living).
>   - `inhabit-` + `-ation` → [[inhabitation]] (state of residing).
>   - `cohabit-` + `-ation` → [[cohabitation]] (living together).
>   - `habit-` + `-ancy` → [[habitancy]] (legal domicile/status).
> - **Ecological Compounds:**
>   - Prefixation onto the bare Latin verb *habitat*: [[microhabitat]], *macrohabitat*.

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

> [!tip] 🌈 Spectrum of Meaning Across Four Concentric Domains
> 1. **Ecological & Planetary Niche:** The natural environment supporting species life, extending from microscopic soil pockets to the circumstellar "Goldilocks" zone of exoplanets ([[habitat]], [[microhabitat]], [[habitable]], [[habitability]]).
> 2. **Domestic & Human Tenancy:** The physical home, permanent shelter, and architectural dwelling of human societies ([[habitation]], [[inhabit]], [[inhabitant]], [[inhabitation]], [[uninhabited]]).
> 3. **Social, Legal & Conjugal Co-presence:** Intimate living arrangements, legal residency, domestic partnership without marriage, and regular presence in social venues ([[cohabit]], [[cohabitation]], [[cohabitant]], [[cohabitee]], [[habitué]], [[habitancy]]).
> 4. **Structural & Environmental Viability:** Assessments of safety, toxicity, radiation, or extreme climate that determine whether a structure or ecosystem can sustain life ([[habitable]], [[inhabitable]], [[uninhabitable]], [[uninhabitability]]).

---

## 🔀 4. Prefix & Combining Dynamics on habit

### Prefix & Combining Element Dynamics

| Prefix / Element | Semantic Function | Derived Form | Resulting Synthesis |
| :--- | :--- | :--- | :--- |
| `in-` | in, into, within | [[inhabit]], [[inhabitant]], [[inhabitable]] | To dwell *within* an enclosed territory or structure. |
| `co-` | together, jointly | [[cohabit]], [[cohabitation]], [[cohabitant]] | To dwell *together* under one roof as partners. |
| `un-` | not (reversal / negation) | [[uninhabitable]], [[uninhabited]], [[uninhabitability]] | *Not* capable of being lived in; deserted. |
| `micro-` | small, localized | [[microhabitat]] | A minute, localized biological niche (e.g., under a rotting log). |

### Suffix Transformations (Grammatical Function)

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-at` *(Latin 3rd sg.)* | Noun (Linnaean citation) | [[habitat]] | "It dwells" → the natural environment of an organism. |
| `-able` | Adjective (Fitness / Capacity) | [[habitable]], [[inhabitable]], [[uninhabitable]] | Fit to sustain life or human settlement. |
| `-ability` | Noun (State of Capacity) | [[habitability]], [[uninhabitability]] | The measurable capacity of an environment to sustain life. |
| `-ation` | Noun (Act, Process, Abode) | [[habitation]], [[inhabitation]], [[cohabitation]] | The act of dwelling; an architectural dwelling. |
| `-ant` | Noun (Agent / Occupant) | [[habitant]], [[inhabitant]], [[cohabitant]] | One who resides in a specified place. |
| `-ee` | Noun (Passive Legal Entity) | [[cohabitee]] | One of the parties involved in a domestic cohabitation. |
| `-ancy` | Noun (Legal Status / Condition) | [[habitancy]] | The state or condition of legal residency or settlement. |
| `-é` *(French past part.)* | Noun (Habitual Agent) | [[habitué]] | One who habitually frequents a particular salon or establishment. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🌿 **Ecology & Conservation Biology** | [[habitat]], [[microhabitat]], [[inhabit]] | Habitat fragmentation, biodiversity corridors, wetland restoration, and the ecological destruction of critical habitats by deforestation and urbanization. |
| 🚀 **Astrophysics & Astrobiology** | [[habitable]], [[habitability]], [[uninhabitable]] | The circumstellar "Habitable Zone" (Goldilocks Zone) around stars where liquid water can persist on planetary surfaces, evaluating exoplanet habitability via James Webb Space Telescope atmospheric spectroscopy. |
| ⚖️ **Family Law & Urban Planning** | [[cohabit]], [[cohabitation]], [[cohabitant]], [[cohabitee]], [[habitation]], [[habitancy]] | Cohabitation agreements between unmarried couples, tenant rights under the implied warranty of habitability in housing codes, and zoning definitions of single-family habitations. |
| 📜 **History & Anthropology** | [[habitant]], [[inhabitant]], [[uninhabited]] | The French-Canadian *habitants* of New France along the St. Lawrence River under the seigneurial system; demographic surveys of ancient settlement patterns. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cohabit]] | verb | **1.** Share living quarters; usually said of people who are not married and live together as a couple. | *"Thus among the hill tribes of Assam, not only are men forbidden to cohabit with their wives during or after a raid, but they may not eat food cooked by a woman; nay, they should not address a word even to their own wives."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[cohabitation]] | noun | **1.** The act of living together and having a sexual relationship (especially without being married). | *"Sometimes it was protracted as long as ten days at a time, especially during the first years of cohabitation."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[habit]] | noun | **1.** An established custom.<br>**2.** (psychology) an automatic pattern of behavior in reaction to a specific situation; may be inherited or acquired through frequent repetition. | *"O love’s best habit is in seeming trust, And age in love loves not to have years told."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habitability]] | noun | **1.** Suitability for living in or on. | *"In academic literature, habitability designates suitability for living in or on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitable]] | adjective | **1.** Fit for habitation. | *"Jarndyce, “a habitable doll’s house with good board and a few tin people to get into debt with and borrow money of would set the boy up in life."* — Charles Dickens, *Bleak House* |
| [[habitableness]] | noun | **1.** Suitability for living in or on. | *"In academic literature, habitableness designates suitability for living in or on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitant]] | noun | **1.** A person who inhabits a particular place. | *"Yet not to Earth are those bright Luminaries Officious, but to thee Earths habitant."* — John Milton, *Paradise Lost* |
| [[habitat]] | noun | **1.** The type of environment in which an organism or group normally lives or occurs. | *"The compartment was generous by space habitat standards."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[habitation]] | noun | **1.** The native habitat or home of an animal or plant.<br>**2.** Housing that someone is living in. | *"O what a mansion have those vices got, Which for their habitation chose out thee, Where beauty’s veil doth cover every blot, And all things turns to fair, that eyes can see!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habited]] | verb | **1.** Put a habit on.<br>**2.** Dressed in a habit. | *"Enter King and others as masquers, habited like shepherds, ushered by the Lord Chamberlain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habitual]] | adjective | **1.** Commonly used or practiced; usual. | *"I bear it, and I hide it.” Even in the thinking of her endurance, she drew her habitual air of proud indifference about her like a veil, though she soon cast it off again."* — Charles Dickens, *Bleak House* |
| [[habitually]] | adverb | **1.** According to habit or custom. | *"It is habitually hard upon Sir Leicester, whose countenance it greenly mottles in the manner of sage-cheese and in whose aristocratic system it effects a dismal revolution."* — Charles Dickens, *Bleak House* |
| [[habituate]] | verb | **1.** Take or consume (regularly or habitually).<br>**2.** Make psychologically or physically used (to something). | *"However I determine, poesy must be laid aside for some time; my mind has been vitiated with idleness, and it will take a good deal of effort to habituate it to the routine of business.--I am, my dear Sir, yours sincerely, R."* — Robert Burns, *The Letters of Robert Burns* |
| [[habituation]] | noun | **1.** Being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs).<br>**2.** A general accommodation to unchanging environmental conditions. | *"In academic literature, habituation designates being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitude]] | noun | **1.** Habitual mode of behavior. | *"When we got to La Clairière we were ready to sink down with fatigue like all the rest--nay, even more than the rest, for we were not used to it, and for my part I had altogether lost the habitude of long walks."* — Mrs. Oliphant, *A Beleaguered City* |
| [[habitue]] | noun | **1.** A regular patron. | *"Captain Runcie, of the S.S. _Gympie_, an old _habitue_ of New Guinea, took the chair."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[habitus]] | noun | **1.** Person's predisposition to be affected by something (as a disease).<br>**2.** Constitution of the human body. | *"In academic literature, habitus designates person's predisposition to be affected by something (as a disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhabit]] | verb | **1.** Inhabit or live in; be an inhabitant of.<br>**2.** Be present in. | *"There’s none but witches do inhabit here, And therefore ’tis high time that I were hence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inhabitable]] | adjective | **1.** Fit for habitation. | *"The only apartments now inhabitable are those of its loyal and intelligent warden and his family, whose civility and general information respecting the castle are very acceptable to its daily visitors."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[inhabitancy]] | noun | **1.** The act of dwelling in or living permanently in a place (said of both animals and men). | *"In academic literature, inhabitancy designates the act of dwelling in or living permanently in a place (said of both animals and men)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhabitant]] | noun | **1.** A person who inhabits a particular place. | *"There is more litter and lumber in it than of old, and it is dirtier if possible; likewise, it is ghostly with traces of its dead inhabitant and even with his chalked writing on the wall."* — Charles Dickens, *Bleak House* |
| [[inhabitation]] | noun | **1.** The act of dwelling in or living permanently in a place (said of both animals and men). | *"It's a wild inhabitation for my young love to be in."* — Donn Byrne, *The Wind Bloweth* |
| [[inhabited]] | verb | **1.** Inhabit or live in; be an inhabitant of.<br>**2.** Be present in. | *"JAQUES. [_Aside_.] O knowledge ill-inhabited, worse than Jove in a thatched house!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uninhabitable]] | adjective | **1.** Not fit for habitation. | *"Uninhabitable, and almost inaccessible,— SEBASTIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uninhabited]] | adjective | **1.** Not having inhabitants; not lived in. | *"His course brought him in sight of the Island of Ascension, at that time uninhabited, and _never visited by any ship_, except for the purpose of collecting turtles, which abound on the coast."* — Classic Author, *The wonders of prayer* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Building & Dwelling]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HABIT
  </div>
</div>
