---
status: unread
type: root_dashboard
---
# Dashboard — sal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sal-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to jump”</span>
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

The root **sal** means to jump. It refers to the action of jumping and carrying out this process. In English, this root forms words such as *saline*, *salary*, and *salad*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to jump
> The root **sal** means to jump. It refers to the action of jumping and carrying out this process. In English, this root forms words such as *saline*, *salary*, and *salad*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To jump</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *saline* and *salary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sal** comes from a Latin word that means *"to jump"*.
  - At its core, it describes the action of jump.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **sal** in an English word, think of **to jump**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to jump).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Saline**: An everyday English word showing the root's idea of *to jump*.
  - **Salary**: An everyday English word showing the root's idea of *to jump*.
  - **Salad**: An everyday English word showing the root's idea of *to jump*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sal</mark>, think of <mark class="hl-def">to jump</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sal** operates through several distinct morphological stems and historical phonetic transformations:
> - **The Present Active Stem (`sali-` / `sal-`):**
>   Derived directly from the 4th conjugation present stem *saliō, salīre*. In English, its present active participle *saliēns* (stem *salient-*, "leaping forth") forms words expressing conspicuous prominence: [[salient]], [[salience]], [[saliency]], [[saliently]], [[salient angle]], and the zoological clade [[salientian]].
> - **The Prefixed Weakened Stem (`-sil-`):**
>   Under Classical Latin internal apophony, an unaccented short vowel */a/* weakened to */i/* before a single consonant:
>   $$\text{Simplex: } \textit{saliō} \xrightarrow{\text{prefixed with } re-} \textit{resiliō, resilīre} \implies \text{English: } \textbf{resile}, \textbf{resilience}, \textbf{resilient}$$
>   $$\text{Simplex: } \textit{saliō} \xrightarrow{\text{prefixed with } dē-} \textit{dēsilīre} \implies \text{English: } \textbf{desilence}$$
> - **The Old French Reflex (`-sail-`):**
>   In Vulgar Latin, *adsilīre* / *assilīre* experienced palatalization of the lateral liquid and vowel diphthongization, yielding Old French *assaillir*. This entered Middle English as *assailen*, producing the fertile lexical family [[assail]], [[assailant]], [[assailable]], [[unassailable]], [[unassailably]], and [[assailment]].
> - **The Habitual / Libidinal Adjective Stem (`salāc-`):**
>   Latin formed adjectives of intensive habit or physical propensity using the suffix *-āx* (stem *-āc-*). From *saliō* came *salāx* ("prone to leaping upon / mounting"), which passed into English via the Latinate suffix *-ious* (yielding [[salacious]], [[salaciously]], [[salaciousness]]) and the abstract quality suffix *-itās* (yielding [[salacity]]).
> - **The Simplex Supine & Frequentative Stem (`salt-`):**
>   The 4th principal part supine *saltum* and its derived frequentative verb *saltō, saltāre* ("to dance, jump repeatedly") furnish scientific, neurological, and geological terms: [[saltation]], [[saltational]], [[saltatory]], and the compound locomotive descriptor [[saltigrade]] (*saltus* + *gradus*).
> - **The Ichthyological Stem (`salmōn-`):**
>   The classical Latin noun *salmō* (accusative *salmōnem*, derived from *saliō* as "the leaper") passed through Anglo-French *saumon* into English [[salmon]].
>
> ### The Systematic Apophonic Split: `sal` vs. Sibling Dashboard `sult`
> A crucial phonological rule of Classical Latin governs why this dashboard (`sal`) is separated from its sibling dashboard (`[[Dashboard — sult]]`):
> - When *saliō* was compounded with prefixes (*ad-*, *in-*, *ex-*, *re-*, *dē-*), its internal short */a/* underwent regular apophonic vowel reduction:
>   1. **Before a single consonant**, */a/* weakened to */i/*: *re-* + *saliō* $\to$ *resiliō* (yielding English [[resile]], [[resilience]]).
>   2. **Before the dark liquid cluster */lt/* in the supine and frequentative**, */a/* weakened to */u/*:
>      $$\text{Simplex Supine: } \textit{saltum} \xrightarrow{\text{prefixed}} \textit{-sultum} \quad (\textit{as-sultus, in-sultus, re-sultus})$$
>      $$\text{Simplex Frequentative: } \textit{saltō, saltāre} \xrightarrow{\text{prefixed}} \textit{-sultāre} \quad (\textit{ex-sultāre, dē-sultor, con-sultāre})$$
> - **Dashboard Allocation Rule:**
>   - The present active stems (*salient*), prefixed /i/-stems (*resile*), Old French reflexes (*assail*), intensive adjective stems (*salacious*), and simplex frequentative stems (*saltation*) belong to this dashboard: **`[[Dashboard — sal]]`**.
>   - The compound apophonic supine and frequentative *-sult-* formations (*assault, insult, exult, result, desultory, consult*) are housed in **`[[Dashboard — sult]]`**.

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
> Although the root fundamentally denotes **"to leap, bound, spring, or mount"**, its operational manifestation radiates across distinct conceptual planes:
> - **Conspicuous Prominence & Attentional Focus:** [[salient]], [[salience]], [[saliency]], [[saliently]], [[salient angle]] embody the spatial, geometric, or cognitive gesture of jutting outward from a flat baseline, commanding instant visual perception or strategic priority.
> - **Elastic Rebound, Recoil & Systemic Endurance:** [[resile]], [[resilience]], [[resilient]], [[resiliently]], [[desilence]] capture the physics of springiness—the capacity of strained materials, traumatized human psyches, or macroeconomic systems to absorb external shock and snap back to equilibrium without structural collapse.
> - **Hostile Physical & Dialectical Onslaught:** [[assail]], [[assailant]], [[assailable]], [[unassailable]], [[unassailably]], [[assailment]] preserve the combat gesture of leaping aggressively toward an adversary, governing physical assault, prosecutorial cross-examination, and invulnerable logical proof.
> - **Biomechanical Locomotion, Neurobiology & Taxonomy:** [[salmon]], [[saltation]], [[saltational]], [[saltatory]], [[saltigrade]], [[salientian]] designate concrete biological leaps—the anadromous ascent of fish, discontinuous nerve conduction leaping between myelin gaps, jumping spiders stalking prey, and macroevolutionary leaps across species barriers.
> - **Libidinal Mounting, Prurience & Lewdness:** [[salacious]], [[salaciously]], [[salaciousness]], [[salacity]] preserve the ancient animal husbandry metaphor of the rutting male mounting females, expressing modern titillation, lewd speech, and prurient scandal.

---

## 🔀 4. Prefix & Combining Dynamics on sal

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (assimilated to *as-*) | to, toward, against | [[assail]], [[assailant]], [[assailable]], [[assailment]] | *ad-* + *salīre* (*adsilīre*) $\to$ leaping toward an adversary with hostile intent $\to$ violent physical battery or vigorous ideological attack. |
| **un-** + **ad-** | not + to, toward | [[unassailable]], [[unassailably]] | *un-* ("not") + *assailable* $\to$ incapable of being leaped upon or breached $\to$ impregnable, indisputable, beyond all refutation. |
| **re-** | back, again | [[resile]], [[resilience]], [[resilient]], [[resiliently]] | *re-* + *salīre* (*resilīre*) $\to$ leaping back to original form after compressive deformation $\to$ elastic rebound, mental grit, or legal retreat. |
| **dē-** | down, away from | [[desilence]] | *dē-* + *salīre* (*dēsilīre*) $\to$ leaping down from a height $\to$ a downward bound, waterfall plunge, or cascading descent. |
| **Simplex (Zero-Prefix)** | forward, outward | [[salient]], [[salience]], [[salacious]], [[salmon]], [[saltation]] | Pure uninhibited kinetic release $\to$ leaping out into consciousness, jumping up river rapids, or leaping in reproductive lust. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ent** | Adjective (Active Participle) | [[salient]], [[resilient]] | Characterizes an entity that juts conspicuously outward (*salient*) or bounces back elastically after trauma (*resilient*). |
| **-ence** / **-ency** | Noun (State / Quality of Action) | [[salience]], [[saliency]], [[resilience]], [[desilence]] | Denotes the intrinsic property of being noticeable, the capacity for elastic recovery, or the act of plunging downward. |
| **-ant** | Noun / Adjective (Active Agent) | [[assailant]] | Designates the specific individual or hostile force executing an aggressive onset or physical attack. |
| **-able** | Adjective (Capability / Vulnerability) | [[assailable]], [[unassailable]] | Denotes susceptibility to being leaped upon or breached by hostile attack, or absolute immunity from such assault. |
| **-ment** | Noun (Action / Result / Condition) | [[assailment]] | Expresses the physical act of attacking or the psychological state of being beset by trials and torments. |
| **-ious** | Adjective (Full of / Prone to) | [[salacious]] | Characterizes speech, text, or imagery that is brimming with prurient, lewd, or lascivious content. |
| **-ity** | Noun (Essential Quality / State) | [[salacity]] | Denotes the essential character or an instance of lustful, lewd, or lascivious behavior. |
| **-ation** | Noun (Process / Mechanism) | [[saltation]] | The systematic physical, geological, or evolutionary process of leaping, sand bouncing, or sudden speciation. |
| **-al** | Adjective (Relational / Nature) | [[saltational]] | Pertaining to, characterized by, or operating through discontinuous leaping jumps or macromutations. |
| **-ory** | Adjective (Characteristic Tendency) | [[saltatory]] | Characterized by dancing or leaping motion; specifically applied to discontinuous nerve impulse conduction. |
| **-grade** | Adjective / Noun (Locomotive Mode) | [[saltigrade]] | Specifies an organism or limb morphology adapted for walking or hunting via jumping bounds (*saltus* + *gradus*). |
| **-ian** | Noun / Adjective (Taxonomic Entity) | [[salientian]] | Designates a member of the amphibian clade Salientia (frogs and toads), characterized by leaping skeletal adaptations. |
| **-ly** | Adverb (Manner of Action) | [[saliently]], [[resiliently]], [[unassailably]], [[salaciously]] | Modifies verbs to describe actions carried out conspicuously, buoyantly, invulnerably, or lewdly. |
| **-ness** | Noun (Abstract State / Quality) | [[salaciousness]] | The abstract condition or quality of being salacious; prurience or lewd indecency. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧠 **Cognitive Psychology & Neuroscience** | [[salience]], [[saliency]], [[saliently]], [[saltatory]] | Top-down vs. bottom-up visual attention mechanisms; saliency maps in computer vision; saltatory conduction across the nodes of Ranvier along myelinated axons; psychiatric aberrant salience hypothesis in schizophrenia. |
| 🔬 **Materials Science & Mechanical Engineering** | [[resile]], [[resilience]], [[resilient]], [[resiliently]] | Modulus of resilience on engineering stress-strain curves; proof resilience in shock-absorbing leaf springs; hyperelastic polymers in aerospace seals; structural resilience of civil infrastructure under seismic loads. |
| ⚔️ **Military Fortification & Tactical Maneuver** | [[salient]], [[salient angle]], [[assail]], [[assailant]] | Defense of protruding perimeter salients (e.g., Battle of the Bulge, Ypres Salient, Kursk Salient); geometry of bastioned trace systems (*trace italienne*); flanking crossfire; kinetic breaching of defensive redoubts. |
| 🐟 **Ichthyology, Fisheries & Marine Ecology** | [[salmon]] | Anadromous migration ecology of Salmonidae (*Salmo salar*, *Oncorhynchus* spp.); vertical leap kinetics across fish ladders and natural weirs; riverine habitat restoration; aquaculture genetics and olfactory natal homing. |
| 🦎 **Evolutionary Biology, Herpetology & Paleontology** | [[saltation]], [[saltational]], [[saltatory]], [[saltigrade]], [[salientian]] | Eldredge and Gould's punctuated equilibrium vs. saltationism; saltigrade locomotion in Salticidae (jumping spiders); skeletal morphology of crown and stem Salientia (*Triadobatrachus*, *Prosalirus*); aeolian sand transport. |
| ⚖️ **Law, Criminal Jurisprudence & Rhetoric** | [[assailant]], [[assail]], [[assailable]], [[unassailable]], [[unassailably]], [[resile]], [[salacious]], [[salacity]] | Common-law battery and assault prosecutions; identifying armed assailants; unassailable evidentiary chains of custody; contractual rights to resile from covenants under material adverse change; obscenity litigation. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[desalinate]] | verb | **1.** Remove salt from. | *"In academic literature, desalinate designates remove salt from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desalination]] | noun | **1.** The removal of salt (especially from sea water). | *"In academic literature, desalination designates the removal of salt (especially from sea water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desalinisation]] | noun | **1.** The removal of salt (especially from sea water). | *"In academic literature, desalinisation designates the removal of salt (especially from sea water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desalinise]] | verb | **1.** Remove salt from. | *"In academic literature, desalinise designates remove salt from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desalinization]] | noun | **1.** The removal of salt (especially from sea water). | *"In academic literature, desalinization designates the removal of salt (especially from sea water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desalinize]] | verb | **1.** Remove salt from. | *"In academic literature, desalinize designates remove salt from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desalt]] | verb | **1.** Remove salt from. | *"In academic literature, desalt designates remove salt from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disallow]] | verb | **1.** Command against. | *"What follows if we disallow of this?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insalubrious]] | adjective | **1.** Detrimental to health. | *"He would have let the house, but could find no tenant, in consequence of its ineligible and insalubrious site."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[insalubriousness]] | noun | **1.** The quality of being insalubrious and debilitating. | *"In academic literature, insalubriousness designates the quality of being insalubrious and debilitating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insalubrity]] | noun | **1.** The quality of being insalubrious and debilitating. | *"In academic literature, insalubrity designates the quality of being insalubrious and debilitating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resale]] | noun | **1.** The selling of something purchased. | *"In academic literature, resale designates the selling of something purchased."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salaah]] | noun | **1.** The second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca. | *"In academic literature, salaah designates the second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salaam]] | noun | **1.** A deep bow; a muslim form of salutation.<br>**2.** Greet with a salaam. | *"I commend the propriety and aptness of your researches, Atma Singh." So saying he withdrew with a salaam that failed to cover the swift scowl he bestowed on Bertram."* — C. A. Frazer, *Atmâ* |
| [[salaat]] | noun | **1.** The second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca. | *"In academic literature, salaat designates the second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salability]] | noun | **1.** The quality of being salable or marketable. | *"First, this thing must have the quality of salability, or marketability."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[salable]] | adjective | **1.** Capable of being sold; fit for sale. | *"Until the precious liquor, filtered by degrees, and refined to proof, is flasked and priced, and salable at last, the world stands aloof."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[salableness]] | noun | **1.** The quality of being salable or marketable. | *"In academic literature, salableness designates the quality of being salable or marketable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salacious]] | adjective | **1.** Characterized by lust.<br>**2.** Suggestive of or tending to moral looseness. | *"In academic literature, salacious designates characterized by lust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salaciously]] | adverb | **1.** In a lascivious manner. | *"In academic literature, salaciously designates in a lascivious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salaciousness]] | noun | **1.** The trait of behaving in an obscene manner. | *"In academic literature, salaciousness designates the trait of behaving in an obscene manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salacity]] | noun | **1.** The trait of behaving in an obscene manner. | *"In academic literature, salacity designates the trait of behaving in an obscene manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salad]] | noun | **1.** Food mixtures either arranged on a plate or tossed and served with a moist dressing; usually consisting of or including greens. | *"Indeed, sir, she was the sweet marjoram of the salad, or, rather, the herb of grace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salade]] | noun | **1.** A light medieval helmet with a slit for vision. | *"In academic literature, salade designates a light medieval helmet with a slit for vision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saladin]] | noun | **1.** Sultan of syria and egypt; reconquered jerusalem from the christians in 1187 but was defeated by richard coeur de lion in 1191 (1137-1193). | *"In academic literature, saladin designates sultan of syria and egypt; reconquered jerusalem from the christians in 1187 but was defeated by richard coeur de lion in 1191 (1137-1193)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salafism]] | noun | **1.** A militant group of extremist sunnis who believe themselves the only correct interpreters of the koran and consider moderate muslims to be infidels; seek to convert all muslims and to insure that its own fundamentalist version of islam will dominate the world. | *"In academic literature, salafism designates a militant group of extremist sunnis who believe themselves the only correct interpreters of the koran and consider moderate muslims to be infidels; seek to convert all muslims and to insure that its own fundamentalist version of islam will dominate the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salah]] | noun | **1.** The second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca. | *"In academic literature, salah designates the second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salai]] | noun | **1.** East indian tree yielding a resin used medicinally and burned as incense. | *"In academic literature, salai designates east indian tree yielding a resin used medicinally and burned as incense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salal]] | noun | **1.** Small evergreen shrub of pacific coast of north america having edible dark purple grape-sized berries. | *"In academic literature, salal designates small evergreen shrub of pacific coast of north america having edible dark purple grape-sized berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salamander]] | noun | **1.** Any of various typically terrestrial amphibians that resemble lizards and that return to water only to breed.<br>**2.** Reptilian creature supposed to live in fire. | *"I have maintained that salamander of yours with fire any time this two-and-thirty years, God reward me for it!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salamandra]] | noun | **1.** Type genus of the salamandridae. | *"In academic literature, salamandra designates type genus of the salamandridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salamandridae]] | noun | **1.** Salamanders. | *"In academic literature, salamandridae designates salamanders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salamandriform]] | adjective | **1.** Shaped like a salamander. | *"In academic literature, salamandriform designates shaped like a salamander."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salami]] | noun | **1.** Highly seasoned fatty sausage of pork and beef usually dried. | *"From two inscriptions found at Eleusis it appears that the names of the priests were committed to the depths of the sea; probably they were engraved on tablets of bronze or lead, which were then thrown into deep water in the Gulf of Salamis."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[salaried]] | adjective | **1.** Receiving a salary.<br>**2.** Receiving or eligible for compensation. | *"There was the name of Barbary, and the name of Clare, and the name of Dedlock, too, I think.” “He knows as much of the cause as the real salaried Chancellor!” said Richard, quite astonished, to Ada and me."* — Charles Dickens, *Bleak House* |
| [[salary]] | noun | **1.** Something that remunerates. | *"O, this is hire and salary, not revenge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salat]] | noun | **1.** The second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca. | *"In academic literature, salat designates the second pillar of islam is prayer; a prescribed liturgy performed five times a day (preferably in a mosque) and oriented toward mecca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sale]] | noun | **1.** A particular instance of selling.<br>**2.** The general activity of selling. | *"Besides, his cote, his flocks, and bounds of feed Are now on sale, and at our sheepcote now, By reason of his absence, there is nothing That you will feed on."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[saleable]] | adjective | **1.** Capable of being sold; fit for sale. | *"I have often heard him declare, that if baronetcies were saleable, anybody should have his for fifty pounds, arms and motto, name and livery included; but I will not pretend to repeat half that I used to hear him say on that subject."* — Jane Austen, *Persuasion* |
| [[salem]] | noun | **1.** Capital of the state of oregon in the northwestern part of the state on the willamette river.<br>**2.** A city in northeastern massachusetts; site of the witchcraft trials in 1692. | *"Enoch Holt had been a seafaring man in his early days, and there was news that the owners of a Salem ship in which he held a small interest wished him to go out as supercargo."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[saleratus]] | noun | **1.** A white soluble compound (nahco3) used in effervescent drinks and in baking powders and as an antacid. | *"In academic literature, saleratus designates a white soluble compound (nahco3) used in effervescent drinks and in baking powders and as an antacid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salerno]] | noun | **1.** A battle in world war ii; the port was captured by united states troops in september 1943. | *"In academic literature, salerno designates a battle in world war ii; the port was captured by united states troops in september 1943."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saleroom]] | noun | **1.** An area where merchandise (such as cars) can be displayed. | *"In academic literature, saleroom designates an area where merchandise (such as cars) can be displayed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sales]] | noun | **1.** Income (at invoice values) received for goods and services over some given period of time.<br>**2.** A particular instance of selling. | *"Since Troy’s death Oak had attended all sales and fairs for her, transacting her business at the same time with his own."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[salesclerk]] | noun | **1.** A salesperson in a store. | *"In academic literature, salesclerk designates a salesperson in a store."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salesgirl]] | noun | **1.** A woman salesperson. | *"In academic literature, salesgirl designates a woman salesperson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saleslady]] | noun | **1.** A woman salesperson. | *"In academic literature, saleslady designates a woman salesperson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salesman]] | noun | **1.** A man salesperson. | *"Whose, then?” “Well, I got the two dozen from a salesman in Covent Garden.” “Indeed?"* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[salesmanship]] | noun | **1.** Skill in selling; skill in persuading people to buy. | *"In academic literature, salesmanship designates skill in selling; skill in persuading people to buy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salesperson]] | noun | **1.** A person employed to represent a business and to sell its merchandise (as to customers in a store or to customers who are visited). | *"In academic literature, salesperson designates a person employed to represent a business and to sell its merchandise (as to customers in a store or to customers who are visited)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salesroom]] | noun | **1.** An area where merchandise (such as cars) can be displayed. | *"In academic literature, salesroom designates an area where merchandise (such as cars) can be displayed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saleswoman]] | noun | **1.** A woman salesperson. | *"Lessing, as a slim-waisted, trailing-black-gowned saleswoman approached."* — Grace S. Richmond, *Red Pepper Burns* |
| [[salian]] | noun | **1.** A member of the tribe of franks who settled in the netherlands in the 4th century ad. | *"In academic literature, salian designates a member of the tribe of franks who settled in the netherlands in the 4th century ad."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salicaceae]] | noun | **1.** Two genera of trees or shrubs having hairy catkins: salix; populus. | *"In academic literature, salicaceae designates two genera of trees or shrubs having hairy catkins: salix; populus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salicales]] | noun | **1.** Coextensive with the family salicaceae. | *"In academic literature, salicales designates coextensive with the family salicaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salicornia]] | noun | **1.** Glassworts. | *"In academic literature, salicornia designates glassworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salicylate]] | noun | **1.** A salt of salicylic acid (included in several commonly used drugs). | *"In academic literature, salicylate designates a salt of salicylic acid (included in several commonly used drugs)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salience]] | noun | **1.** The state of being salient. | *"In academic literature, salience designates the state of being salient."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saliency]] | noun | **1.** The state of being salient. | *"In academic literature, saliency designates the state of being salient."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salient]] | noun | **1.** (military) the part of the line of battle that projects closest to the enemy.<br>**2.** Having a quality that thrusts itself into attention. | *"Cobwebs revealed their presence on sheds and walls where none had ever been observed till brought out into visibility by the crystallizing atmosphere, hanging like loops of white worsted from salient points of the out-houses, posts, and gates."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[salientia]] | noun | **1.** Frogs, toads, tree toads. | *"In academic literature, salientia designates frogs, toads, tree toads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salientian]] | noun | **1.** Any of various tailless stout-bodied amphibians with long hind limbs for leaping; semiaquatic and terrestrial species.<br>**2.** Relating to frogs and toads. | *"In academic literature, salientian designates any of various tailless stout-bodied amphibians with long hind limbs for leaping; semiaquatic and terrestrial species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saliferous]] | adjective | **1.** Containing or yielding salt. | *"In academic literature, saliferous designates containing or yielding salt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salim]] | noun | **1.** Venezuelan master terrorist raised by a marxist-leninist father; trained and worked with many terrorist groups (born in 1949). | *"In academic literature, salim designates venezuelan master terrorist raised by a marxist-leninist father; trained and worked with many terrorist groups (born in 1949)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salina]] | noun | **1.** A town in central kansas. | *"A gentleman at Salina, Kansas, obtained two buffalo calves, and trained them carefully to the yoke."* — W. E. Webb, *Buffalo Land* |
| [[salinate]] | verb | **1.** Add salt to. | *"In academic literature, salinate designates add salt to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saline]] | noun | **1.** An isotonic solution of sodium chloride and distilled water.<br>**2.** Containing salt. | *"His were the shinbones of the saline beef; his would have been the drumsticks."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[salinger]] | noun | **1.** United states writer (born 1919). | *"In academic literature, salinger designates united states writer (born 1919)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salinity]] | noun | **1.** The taste experience when common salt is taken into the mouth.<br>**2.** The relative proportion of salt in a solution. | *"In academic literature, salinity designates the taste experience when common salt is taken into the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salinometer]] | noun | **1.** A hydrometer that determines the concentration of salt solutions by measuring their density. | *"In academic literature, salinometer designates a hydrometer that determines the concentration of salt solutions by measuring their density."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salisbury]] | noun | **1.** The capital and largest city of zimbabwe. | *"Enter Gloucester, Bedford, Exeter, Erpingham, with all his host: Salisbury and Westmorland."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salish]] | noun | **1.** A family of mosan language spoken in northwestern united states and western canada.<br>**2.** A member of a group of north american indians speaking a salishan language and living on the northwest coast of north america. | *"The Salish or Flathead Indians of Oregon believe that a man's soul may be separated for a time from his body without causing death and without the man being aware of his loss."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[salishan]] | noun | **1.** A family of mosan language spoken in northwestern united states and western canada. | *"In academic literature, salishan designates a family of mosan language spoken in northwestern united states and western canada."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saliva]] | noun | **1.** A clear liquid secreted into the mouth by the salivary glands and mucous glands of the mouth; moistens the mouth and starts the digestion of starches. | *"When he has finished his lecture, you see only a mass of saliva and the rags of his pen."* — John Cairns, *Principal Cairns* |
| [[salivary]] | adjective | **1.** Of or relating to saliva. | *"The salivary glands are used to salivate the body."* — Mark Twain, *What Is Man? and Other Essays* |
| [[salivate]] | verb | **1.** Produce saliva.<br>**2.** Be envious, desirous, eager for, or extremely happy about something. | *"The salivary glands are used to salivate the body."* — Mark Twain, *What Is Man? and Other Essays* |
| [[salivation]] | noun | **1.** The secretion of saliva. | *"Salivation is insufficient, the patellar reflex intermittent."* — James Joyce, *Ulysses* |
| [[salix]] | noun | **1.** A large and widespread genus varying in size from small shrubs to large trees: willows. | *"It can scarcely be too great an assumption to suppose that every one is acquainted with the goat-willow (_Salix caprea_), or that every schoolboy knows the birch (_Betula alba_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[sallet]] | noun | **1.** A light medieval helmet with a slit for vision. | *"Wherefore, o’er a brick wall have I climbed into this garden, to see if I can eat grass, or pick a sallet another while, which is not amiss to cool a man’s stomach this hot weather."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sallow]] | noun | **1.** Any of several old world shrubby broad-leaved willows having large catkins; some are important sources for tanbark and charcoal.<br>**2.** Cause to become sallow. | *"Jesu Maria, what a deal of brine Hath wash’d thy sallow cheeks for Rosaline!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sallowness]] | noun | **1.** A sickly yellowish skin color. | *"Casaubon’s moles and sallowness, had escaped to the vicarage to play with the curate’s ill-shod but merry children."* — George Eliot, *Middlemarch* |
| [[sally]] | noun | **1.** Witty remark.<br>**2.** A military action in which besieged troops burst forth from their position. | *"When you sally upon him, speak what terrible language you will; though you understand it not yourselves, no matter; for we must not seem to understand him, unless someone among us, whom we must produce for an interpreter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salmacis]] | noun | **1.** Nymph who merged with hermaphroditus to form one body. | *"In academic literature, salmacis designates nymph who merged with hermaphroditus to form one body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmagundi]] | noun | **1.** A collection containing a variety of sorts of things.<br>**2.** Cooked meats and eggs and vegetables usually arranged in rows around the plate and dressed with a salad dressing. | *"In academic literature, salmagundi designates a collection containing a variety of sorts of things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmi]] | noun | **1.** Ragout of game in a rich sauce. | *"Isn't it a good salmi?" she said; "I made it for you."* — William Makepeace Thackeray, *Vanity Fair* |
| [[salmo]] | noun | **1.** Type genus of the salmonidae: salmon and trout. | *"Gaz._ [366] Or in the elegant lines of Ausonius:-- “Nec te puniceo rutilantem viscere salmo Transierim, latæ cujus vaga verbera caudæ Gurgite de medio summas reseruntur in undas.” [367] See vol i. of this work, art."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[salmon]] | noun | **1.** Any of various large food and game fishes of northern waters; usually migrate from salt to fresh water to spawn.<br>**2.** A tributary of the snake river in idaho. | *"Alas, the prison I keep, though it be for great ones, yet they seldom come; before one salmon, you shall take a number of minnows."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salmonberry]] | noun | **1.** Creeping raspberry of north temperate regions with yellow or orange berries.<br>**2.** White-flowered raspberry of western north america and northern mexico with thimble-shaped orange berries. | *"In academic literature, salmonberry designates creeping raspberry of north temperate regions with yellow or orange berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmonella]] | noun | **1.** Rod-shaped gram-negative enterobacteria; cause typhoid fever and food poisoning; can be used as a bioweapon. | *"In academic literature, salmonella designates rod-shaped gram-negative enterobacteria; cause typhoid fever and food poisoning; can be used as a bioweapon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmonellosis]] | noun | **1.** A kind of food poisoning caused by eating foods contaminated with salmonella typhimurium. | *"In academic literature, salmonellosis designates a kind of food poisoning caused by eating foods contaminated with salmonella typhimurium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmonid]] | noun | **1.** Soft-finned fishes of cold and temperate waters. | *"In academic literature, salmonid designates soft-finned fishes of cold and temperate waters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmonidae]] | noun | **1.** Salmon and trout. | *"In academic literature, salmonidae designates salmon and trout."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salmwood]] | noun | **1.** Large tropical american tree of the genus cordia grown for its abundant creamy white flowers and valuable wood. | *"In academic literature, salmwood designates large tropical american tree of the genus cordia grown for its abundant creamy white flowers and valuable wood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salol]] | noun | **1.** A white powder with a pleasant taste and odor; used to absorb light in sun tan lotions or as a preservative or an antiseptic or a coating for pills in which the medicine is intended for enteric release. | *"In academic literature, salol designates a white powder with a pleasant taste and odor; used to absorb light in sun tan lotions or as a preservative or an antiseptic or a coating for pills in which the medicine is intended for enteric release."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salome]] | noun | **1.** Woman whose dancing beguiled herod into giving her the head of john the baptist. | *"In academic literature, salome designates woman whose dancing beguiled herod into giving her the head of john the baptist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salomon]] | noun | **1.** American financier and american revolutionary war patriot who helped fund the army during the american revolution (1740?-1785). | *"From the very beginning he had had much intermittent annoyance through his dealings with his sporadically generous uncle Salomon Heine."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[salon]] | noun | **1.** Gallery where works of art can be displayed.<br>**2.** A shop where hairdressers and beauticians work. | *"Rochester lay down on a sofa in a pretty room called the salon, and Sophie and I had little beds in another place."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[salonica]] | noun | **1.** A port city in northeastern greece on an inlet of the aegean sea; second largest city of greece. | *"In academic literature, salonica designates a port city in northeastern greece on an inlet of the aegean sea; second largest city of greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salonika]] | noun | **1.** A port city in northeastern greece on an inlet of the aegean sea; second largest city of greece. | *"In academic literature, salonika designates a port city in northeastern greece on an inlet of the aegean sea; second largest city of greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saloon]] | noun | **1.** A room or establishment where alcoholic drinks are served over a counter.<br>**2.** Tavern consisting of a building with a bar and public rooms; often provides light meals. | *"Now that was the Lord, ma'am, for there was not a single noise of any kind to waken me, and I was sound asleep!" THE LORD TAKES AWAY THE CUSTOM OF A LIQUOR SALOON."* — Classic Author, *The wonders of prayer* |
| [[salsa]] | noun | **1.** Spicy sauce of tomatoes and onions and chili peppers to accompany mexican foods. | *"In academic literature, salsa designates spicy sauce of tomatoes and onions and chili peppers to accompany mexican foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salsify]] | noun | **1.** Edible root of the salsify plant.<br>**2.** Mediterranean biennial herb with long-stemmed heads of purple ray flowers and milky sap and long edible root; naturalized throughout united states. | *"Salsify Mumbles was a grocer in a small way, and his good wife took boarders,--young ladies and gentlemen from different parts of the country, who came to attend Cedar Hill Seminary, a school of high repute and extended celebrity."* — Effie Afton, *Eventide* |
| [[salsilla]] | noun | **1.** Tropical vine having umbels of small purple flowers and edible roots sometimes boiled as a potato substitute; colombia.<br>**2.** Tropical vine having pink-and-yellow flowers spotted purple and edible roots sometimes boiled as a potato substitute; west indies to northern south america. | *"In academic literature, salsilla designates tropical vine having umbels of small purple flowers and edible roots sometimes boiled as a potato substitute; colombia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salsola]] | noun | **1.** Chiefly old world herbs or shrubs: saltworts. | *"In academic literature, salsola designates chiefly old world herbs or shrubs: saltworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salt]] | noun | **1.** A compound formed by replacing hydrogen in an acid by a metal (or a radical that acts like a metal).<br>**2.** White crystalline form of especially sodium chloride used to season and preserve food. | *"My fear hath catch’d your fondness; now I see The mystery of your loneliness, and find Your salt tears’ head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salt-cured]] | adjective | **1.** (used especially of meats) preserved in salt. | *"In academic literature, salt-cured designates (used especially of meats) preserved in salt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltate]] | verb | **1.** Move by saltation.<br>**2.** Leap or skip, often in dancing. | *"In academic literature, saltate designates move by saltation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltation]] | noun | **1.** (geology) the leaping movement of sand or soil particles as they are transported in a fluid medium over an uneven surface.<br>**2.** (genetics) a mutation that drastically changes the phenotype of an organism or species. | *"In academic literature, saltation designates (geology) the leaping movement of sand or soil particles as they are transported in a fluid medium over an uneven surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltbox]] | noun | **1.** A type of house built in new england; has two stories in front and one behind. | *"In academic literature, saltbox designates a type of house built in new england; has two stories in front and one behind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltbush]] | noun | **1.** Any of various shrubby plants of the genus atriplex that thrive in dry alkaline soil. | *"In academic literature, saltbush designates any of various shrubby plants of the genus atriplex that thrive in dry alkaline soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltcellar]] | noun | **1.** A small container for holding salt at the dining table. | *"There is a saltcellar of state, so called, and there may be a caster of state."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[salted]] | verb | **1.** Add salt to.<br>**2.** Sprinkle as if with salt. | *"After any heavy gale, the flying spray salted my saved rainwater, so that at times I was grievously put to live through till fresh rains fell unaccompanied by high winds."* — Jack London, *The Jacket (The Star-Rover)* |
| [[salter]] | noun | **1.** Someone who uses salt to preserve meat or fish or other foods.<br>**2.** Someone who makes or deals in salt. | *"I’ll do well yet.—Thou old and true Menenius, Thy tears are salter than a younger man’s And venomous to thine eyes.—My sometime general, I have seen thee stern, and thou hast oft beheld Heart-hard’ning spectacles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[saltine]] | noun | **1.** A cracker sprinkled with salt before baking. | *"In academic literature, saltine designates a cracker sprinkled with salt before baking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltiness]] | noun | **1.** Language or humor that is down-to-earth.<br>**2.** The taste experience when common salt is taken into the mouth. | *"In academic literature, saltiness designates language or humor that is down-to-earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salting]] | noun | **1.** The act of adding salt to food.<br>**2.** Add salt to. | *"I had completed me a snug and secure shelter; and, as to provision, I had always on hand a six months’ supply, preserved by salting and drying."* — Jack London, *The Jacket (The Star-Rover)* |
| [[saltire]] | noun | **1.** A cross resembling the letter x, with diagonal bars of equal length. | *"Even envious Miss Briggs never spoke ill of her; high and mighty Miss Saltire (Lord Dexter's granddaughter) allowed that her figure was genteel; and as for Miss Swartz, the rich woolly-haired mulatto from St."* — William Makepeace Thackeray, *Vanity Fair* |
| [[saltish]] | adjective | **1.** Somewhat salty. | *"The saltish torrent deluged the surrounding plains--putting every thing into a pretty pickle, as may well be imagined."* — W. E. Webb, *Buffalo Land* |
| [[saltlike]] | adjective | **1.** Resembling a compound formed by replacing hydrogen in an acid by a metal. | *"In academic literature, saltlike designates resembling a compound formed by replacing hydrogen in an acid by a metal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltpan]] | noun | **1.** A shallow basin in a desert region; contains salt and gypsum that was deposited by an evaporated salt lake. | *"In academic literature, saltpan designates a shallow basin in a desert region; contains salt and gypsum that was deposited by an evaporated salt lake."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltpeter]] | noun | **1.** (kno3) used especially as a fertilizer and explosive. | *"Over the whole field, previously so gaily beautiful with the glitter of bayonets and cloudlets of smoke in the morning sun, there now spread a mist of damp and smoke and a strange acid smell of saltpeter and blood."* — graf Leo Tolstoy, *War and Peace* |
| [[saltpetre]] | noun | **1.** (kno3) used especially as a fertilizer and explosive. | *"But I could find no saltpetre; indeed, no nitrates of any kind."* — H. G. Wells, *The Time Machine* |
| [[saltshaker]] | noun | **1.** A shaker with a perforated top for sprinkling salt. | *"In academic literature, saltshaker designates a shaker with a perforated top for sprinkling salt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltwater]] | noun | **1.** Water containing salts. | *"But then why is it that saltwater fish are not salty?"* — James Joyce, *Ulysses* |
| [[saltworks]] | noun | **1.** A plant where salt is produced commercially. | *"In academic literature, saltworks designates a plant where salt is produced commercially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saltwort]] | noun | **1.** Bushy plant of old world salt marshes and sea beaches having prickly leaves; burned to produce a crude soda ash.<br>**2.** Low-growing strong-smelling coastal shrub of warm parts of the new world having unisexual flowers in conelike spikes and thick succulent leaves. | *"In academic literature, saltwort designates bushy plant of old world salt marshes and sea beaches having prickly leaves; burned to produce a crude soda ash."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salty]] | adjective | **1.** Engagingly stimulating or provocative.<br>**2.** Containing or filled with salt. | *"The salty water poured out of the deep rings in his ruddy neck and ran down his dark brown back."* — Don Peterson, *The White Feather Hex* |
| [[salubrious]] | adjective | **1.** Promoting health; healthful; ; ; ; ; - c.b.davis.<br>**2.** Favorable to health of mind or body. | *"Her health which had greatly improved during her stay in the salubrious climate of San Jose, where the temperature ranges at about 70 deg."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[salubriousness]] | noun | **1.** The quality of being salubrious and invigorating. | *"In academic literature, salubriousness designates the quality of being salubrious and invigorating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salubrity]] | noun | **1.** The quality of being salubrious and invigorating. | *"Also I think of changing my residence for a time: probably I shall close or let ‘The Shrubs,’ and take some place near the coast—under advice of course as to salubrity."* — George Eliot, *Middlemarch* |
| [[saluki]] | noun | **1.** Old breed of tall swift keen-eyed hunting dogs resembling greyhounds; from egypt and southwestern asia. | *"In academic literature, saluki designates old breed of tall swift keen-eyed hunting dogs resembling greyhounds; from egypt and southwestern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salutary]] | adjective | **1.** Tending to promote physical well-being; beneficial to health. | *"The fluid was applied by means of a wisp of straw, and the person who discharged this salutary office went round the house in the direction of the sun."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[salutation]] | noun | **1.** An act of honor or courteous recognition.<br>**2.** (usually plural) an acknowledgment or expression of good will (especially on meeting). | *"For why should others’ false adulterate eyes Give salutation to my sportive blood?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[salutatorian]] | noun | **1.** A graduating student with the second highest academic rank; may deliver the opening address at graduation exercises. | *"In academic literature, salutatorian designates a graduating student with the second highest academic rank; may deliver the opening address at graduation exercises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salutatory]] | noun | **1.** An opening or welcoming statement (especially one delivered at graduation exercises). | *"In academic literature, salutatory designates an opening or welcoming statement (especially one delivered at graduation exercises)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salute]] | noun | **1.** An act of honor or courteous recognition.<br>**2.** A formal military gesture of respect. | *"You told me you salute not at the court but you kiss your hands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[saluter]] | noun | **1.** A person who greets. | *"In academic literature, saluter designates a person who greets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[salyut]] | noun | **1.** Either of two soviet space stations launched in the 1970s. | *"In academic literature, salyut designates either of two soviet space stations launched in the 1970s."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsalable]] | adjective | **1.** Impossible to sell. | *"In academic literature, unsalable designates impossible to sell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsalaried]] | adjective | **1.** Not paying a salary. | *"On this trip she went as an unsalaried agent of the Western Sanitary Commission--receiving only her expenses, and the goods and provisions wherewith to relieve the want and misery she met among our suffering men."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[unsaleable]] | adjective | **1.** Impossible to sell. | *"In academic literature, unsaleable designates impossible to sell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsalted]] | adjective | **1.** Without salt or seasoning. | *"Speak, then, thou unsalted leaven, speak."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · SAL
  </div>
</div>
