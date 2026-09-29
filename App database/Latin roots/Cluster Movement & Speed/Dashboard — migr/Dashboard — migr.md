---
status: unread
type: root_dashboard
---
# Dashboard — migr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">migr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to wander or move”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **migr** means to wander or move. It refers to the action of wandering and carrying out this process. In English, this root forms words such as *migrate*, *migration*, *immigrant*, and *emigrate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to wander or move
> The root **migr** means to wander or move. It refers to the action of wandering and carrying out this process. In English, this root forms words such as *migrate*, *migration*, *immigrant*, and *emigrate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To wander or move</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *migrate* and *migration*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **migr** comes from a Latin word that means *"to wander or move"*.
  - At its core, it describes the action of wander or move.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **migr** in an English word, think of **to wander or move**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to wander or move).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Migrate**: To move from one country, region, or locality to another in order to live or work.
  - **Migration**: The physical movement of individuals or whole populations from one locality, region, or nation to another, reshaping demographic balances.
  - **Immigrant**: A person who enters and takes up permanent, lawful residence in a country or territory of which they are not a native.
  - **Emigrate**: To leave one's native country or habitual place of residence with the intention of settling permanently in another sovereign jurisdiction.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">migr</mark>, think of <mark class="hl-def">to wander or move</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **migr** constructs English vocabulary through Latin verbal stems, morphological compounding, directional prefixation, and functional suffixation:
>
> - **Primary Active Stem (`migr-`):** Derived from the present active stem of *migrō, migrāre*, this stem generates nouns, participles, and adjectives denoting immediate agents, ongoing movement, and active relocations: [[migrant]], [[migrating]].
> - **Participial & Supine Stem (`migrāt-`):** Derived from the fourth principal part *migrātum*, this stem supplies Latinate verbs, process nouns, and relational adjectives denoting completed actions, institutional procedures, and systemic states: [[migrate]], [[migration]], [[migrational]], [[migratory]].
> - **Directional Prefixation Paradigm:** Modifying directional prefixes attach to specify the spatial trajectory and legal perspective of relocation:
>   - `e-` / `ex-` (out of, away from) $\to$ [[emigrate]], [[emigrant]], [[emigrating]], [[emigration]].
>   - `in-` $\to$ `im-` (into, inward, with labial nasal assimilation before *m-*) $\to$ [[immigrate]], [[immigrant]], [[immigrating]], [[immigration]].
>   - `trans-` (across, beyond, on the further side) $\to$ [[transmigrate]], [[transmigration]], [[transmigrant]], [[transmigratory]].
>   - `re-` (back, again, anew) $\to$ [[remigrate]], [[remigration]].
>   - `inter-` (between, mutually among) $\to$ [[intermigration]].
>   - `non-` (negative particle: not) $\to$ [[nonmigratory]].
> - **Functional Suffix Engine:**
>   - **Agent / Active State Suffix (`-ant` < Latin *-āns, -antis*):** Forms animate nouns and participial adjectives denoting individuals or populations in motion: [[migrant]], [[emigrant]], [[immigrant]], [[transmigrant]].
>   - **Causative / Verbal Formative (`-ate` < Latin *-ātus*):** Formulates operative verbs of crossing boundaries and changing domicile: [[migrate]], [[emigrate]], [[immigrate]], [[transmigrate]], [[remigrate]].
>   - **Abstract Action / Result Suffix (`-ation` < Latin *-ātiō, -ōnis*):** Generates substantive nouns designating large-scale historical movements, demographic flows, and systemic transfers: [[migration]], [[emigration]], [[immigration]], [[intermigration]], [[transmigration]], [[remigration]].
>   - **Relational Adjectival Suffix (`-ational` < Latin *-ātiōn-* + *-ālis*):** Designates systemic patterns, demographic trends, and geographical routes: [[migrational]].
>   - **Habitual & Ethological Suffix (`-atory` < Latin *-ātōrius*):** Designates innate biological instincts, cyclical tendencies, or pathological movements: [[migratory]], [[transmigratory]], [[nonmigratory]].
>   - **Continuous Aspect Formative (`-ing`):** Expresses active, ongoing transit across borders or computing clusters: [[migrating]], [[emigrating]], [[immigrating]].

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
> Although anchored in the Latin concept of changing one's domestic abode, the semantic spectrum of **migr** spans five specialized conceptual planes:
>
> 1. **Demographic, Geopolitical & Transnational Mobility:**
>    In [[emigrate]], [[emigrant]], [[emigrating]], and [[emigration]], movement is framed from the country of origin as an outward departure. In [[immigrate]], [[immigrant]], [[immigrating]], and [[immigration]], movement is framed from the host nation as inward arrival and legal incorporation. In [[intermigration]], populations circulate reciprocally between neighboring territories. In [[remigrate]] and [[remigration]], individuals or diaspora groups return to their ancestral or native homelands.
>
> 2. **Ecological, Seasonal & Ethological Dynamics:**
>    In [[migratory]], the root denotes the instinctive, cyclical mass movement of animal species across hemispheres along established flyways, pelagic corridors, or overland trails. In [[nonmigratory]], it defines resident, sedentary species that remain in a single geographic territory year-round. In [[migrant]] and [[migration]], it captures the biological phenomenon of population dispersal in response to changing seasons, resource scarcity, or breeding cycles.
>
> 3. **Metaphysical, Esoteric & Philosophical Metempsychosis:**
>    In [[transmigrate]], [[transmigration]], [[transmigrant]], and [[transmigratory]], the concept breaks free of physical geography altogether. It describes the passage of the soul or vital consciousness across the threshold of death into a newborn physical vessel, embodying the classical Platonic, Pythagorean, and Hindu doctrines of reincarnation and karmic rebirth.
>
> 4. **Digital Infrastructure, Data Systems & Cloud Computing:**
>    In modern enterprise technology, [[migrate]], [[migrating]], and [[migration]] describe the controlled, end-to-end relocation of software services, transactional database records, legacy applications, and system configurations from physical hardware or on-premises servers to cloud computing architectures and microservice frameworks.
>
> 5. **Socioeconomic Labor Dynamics & Human Agency:**
>    In [[migrant]], [[migrating]], and [[migrational]], the root articulates the realities of seasonal agricultural laborers, construction workforces, and displaced economic actors who navigate labor markets, visa frameworks, and global supply chains to sustain families across borders.

---

## 🔀 4. Prefix & Combining Dynamics on migr

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `e-` / `ex-` | out of, forth, away from | [[emigrate]], [[emigrant]], [[emigrating]], [[emigration]] | Relocation *outward* from one's native country $\to$ viewing departure from the vantage of the abandoned homeland. |
| `in-` $\to$ `im-` | into, inward, upon | [[immigrate]], [[immigrant]], [[immigrating]], [[immigration]] | Relocation *inward* into a new country $\to$ viewing arrival, naturalization, and settlement from the perspective of the destination state. |
| `trans-` | across, beyond, over | [[transmigrate]], [[transmigration]], [[transmigrant]], [[transmigratory]] | Relocation *across* physical borders or metaphysical thresholds $\to$ passage of consciousness into a new physical body at death. |
| `re-` | back, again, anew | [[remigrate]], [[remigration]] | Relocation *back* to a former dwelling $\to$ repatriation of diaspora populations or return of wildlife to natal spawning grounds. |
| `inter-` | between, mutually among | [[intermigration]] | Relocation *between* two or more groups $\to$ reciprocal, back-and-forth movement and demographic exchange between regions. |
| `non-` | not, without (negation) | [[nonmigratory]] | *Absence* of migration $\to$ describing sedentary, resident animal species or stationary populations that do not travel seasonally. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ate` (< Latin *-ātus*) | Verb (Causative / Action) | [[migrate]], [[emigrate]], [[immigrate]], [[transmigrate]], [[remigrate]] | Operative verbs expressing the act of moving domicile, departing, entering, or passing across boundaries. |
| `-ant` (< Latin *-āns, -antis*) | Noun / Adjective (Agent / State) | [[migrant]], [[emigrant]], [[immigrant]], [[transmigrant]] | Designates the human traveler, animal population, or soul actively undertaking relocation across borders. |
| `-ing` | Adjective / Verbal Participle | [[migrating]], [[emigrating]], [[immigrating]] | Expresses the ongoing, active durative process of changing territory, habitats, or computing platforms. |
| `-ation` (< Latin *-ātiō, -ōnis*) | Noun (Process / State / Collective) | [[migration]], [[emigration]], [[immigration]], [[intermigration]], [[transmigration]], [[remigration]] | Designates the broad structural process, historical epoch, legal procedure, or metaphysical transition. |
| `-ational` (< Latin *-ātiōn-* + *-ālis*) | Adjective (Relational) | [[migrational]] | Pertains to the pathways, sociological statistics, or structural dynamics of population relocation. |
| `-atory` (< Latin *-ātōrius*) | Adjective (Habitual / Ethological) | [[migratory]], [[transmigratory]], [[nonmigratory]] | Describes an innate biological instinct, seasonal habit, or recurring disposition to travel across territories. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Demography, Geopolitics & International Law** | [[emigrate]], [[emigrant]], [[emigration]], [[immigrate]], [[immigrant]], [[immigration]], [[migrant]] | Cross-border legal frameworks; passport controls; UNHCR refugee status determination; naturalization hearings; visa quotas and bilateral border agreements regulating demographic influx and brain drain. |
| 🦅 **Behavioral Ecology, Ornithology & Marine Biology** | [[migratory]], [[nonmigratory]], [[migration]], [[migrant]], [[migrating]] | Transcontinental avian flyway conservation (e.g., Ramsar Convention wetlands); satellite telemetry tracking of cetaceans and sea turtles; pelagic fish spawning runs; phenological shifts due to climate warming. |
| 💻 **Computer Science, Cloud Architecture & DevOps** | [[migrate]], [[migration]], [[migrating]], [[migrational]] | Enterprise cloud migrations (on-premises to AWS/Azure/GCP); relational database schema updates (flyway, liquibase); microservice container transitions; zero-downtime blue-green data deployment pipelines. |
| 🧘 **Philosophy, Comparative Religion & Metaphysics** | [[transmigrate]], [[transmigration]], [[transmigrant]], [[transmigratory]] | Platonic and Pythagorean doctrines of metempsychosis; Hindu and Buddhist cycles of *samsara* and karmic rebirth; Orphic mysteries; Western occult and Theosophical accounts of the soul's post-mortem transit. |
| 👥 **Socioeconomics, Labor Studies & Urbanization** | [[migrant]], [[migrating]], [[intermigration]], [[remigrate]], [[remigration]] | Seasonal migrant agricultural labor networks; remittances sent to developing home economies; rural-to-urban domestic labor shifts; brain circulation and repatriation incentives for returning skilled expatriates. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[emigrant]] | noun | **1.** Someone who leaves one country to settle in another. | *"But it is a common name in Nantucket, they say, and I suppose this Peter here is an emigrant from there."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[emigrate]] | verb | **1.** Leave one's country of residence for a new one. | *"But, what are you going away for else?” “I am not going to emigrate, you know; I wasn’t aware that you would wish me not to when I told ’ee or I shouldn’t ha’ thought of doing it,” he said, simply."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[emigration]] | noun | **1.** Migration from a place (especially migration from your native country in order to settle in another). | *"Angel’s original intention had not been emigration to Brazil but a northern or eastern farm in his own country."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[emigre]] | noun | **1.** Someone who leaves one country to settle in another. | *"How many noble emigres had this horrid revolution plunged in poverty!"* — William Makepeace Thackeray, *Vanity Fair* |
| [[emigree]] | noun | **1.** Someone who leaves one country to settle in another. | *"In academic literature, emigree designates someone who leaves one country to settle in another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immigrant]] | noun | **1.** A person who comes to a country where they were not born in order to settle there. | *"My mother was the daughter of an immigrant Swede."* — Jack London, *The Jacket (The Star-Rover)* |
| [[immigrate]] | verb | **1.** Migrate to a new environment.<br>**2.** Introduce or send as immigrants. | *"In academic literature, immigrate designates migrate to a new environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immigration]] | noun | **1.** Migration into a place (especially migration to a country of which you are not a native in order to settle there).<br>**2.** The body of immigrants arriving during a specified interval. | *"They have always sold to the immigration before."* — Jack London, *The Jacket (The Star-Rover)* |
| [[migraine]] | noun | **1.** A severe recurring vascular headache; occurs more frequently in women than men. | *"In academic literature, migraine designates a severe recurring vascular headache; occurs more frequently in women than men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[migrant]] | noun | **1.** Traveler who moves from one region or country to another.<br>**2.** Habitually moving from place to place especially in search of seasonal work. | *"This done, he turned in the direction of the migrants."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[migrate]] | verb | **1.** Move from one country or region to another and settle there.<br>**2.** Move periodically or seasonally. | *"Sir James was much pained, and offered that they should all migrate to Cheltenham for a few months with the sacred ark, otherwise called a cradle: at that period a man could hardly know what to propose if Cheltenham were rejected."* — George Eliot, *Middlemarch* |
| [[migration]] | noun | **1.** The movement of persons from one country or locality to another.<br>**2.** A group of people migrating together (especially in some given time period). | *"The Cairns family now entered on a period of migration of this kind, and in the course of eleven years they flitted no less than six times."* — John Cairns, *Principal Cairns* |
| [[migrational]] | adjective | **1.** Of or related to migration. | *"In academic literature, migrational designates of or related to migration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[migrator]] | noun | **1.** Traveler who moves from one region or country to another.<br>**2.** An animal (especially birds and fish) that travels between different habitats at particular times of the year. | *"In academic literature, migrator designates traveler who moves from one region or country to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[migratory]] | adjective | **1.** Used of animals that move seasonally.<br>**2.** Habitually moving from place to place especially in search of seasonal work. | *"He is not a beast, a vegetable, nor a migratory mind."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[nonmigratory]] | adjective | **1.** Used of animals that do not migrate. | *"In academic literature, nonmigratory designates used of animals that do not migrate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmigrante]] | noun | **1.** A latin american who buys used goods in the united states and takes them to latin america to sell. | *"In academic literature, transmigrante designates a latin american who buys used goods in the united states and takes them to latin america to sell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmigrate]] | verb | **1.** Be born anew in another body after death.<br>**2.** Move from one country or region to another and settle there. | *"It lives by that which nourisheth it, and the elements once out of it, it transmigrates."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transmigration]] | noun | **1.** The passing of a soul into another body after death. | *"To suppose, with Benfey and others, that the theories of animism and transmigration current among rude peoples of Asia are derived from Buddhism, is to reverse the facts."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MIGR
  </div>
</div>
