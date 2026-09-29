---
status: unread
type: root_dashboard
---
# Dashboard — sult
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sult-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to jump”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **sult** means to jump. It refers to the action of jumping and carrying out this process. In English, this root forms words such as *salient*, *salience*, *resile*, and *resilient*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to jump
> The root **sult** means to jump. It refers to the action of jumping and carrying out this process. In English, this root forms words such as *salient*, *salience*, *resile*, and *resilient*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To jump</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *salient* and *salience*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sult** comes from a Latin word that means *"to jump"*.
  - At its core, it describes the action of jump.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **sult** in an English word, think of **to jump**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to jump).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Salient**: Standing out conspicuously.
  - **Salience**: The quality or state of being salient.
  - **Resile**: To spring back.
  - **Resilient**: Capable of withstanding shock and returning to original form after stretching, bending, or compression.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sult</mark>, think of <mark class="hl-def">to jump</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sult** is governed by a fundamental phonological law of Latin vowel reduction (apophony) and exists alongside several sibling stems:
> - **The Latin Apophonic Shift ($a \to u$ before $/lt/$):**
>   In Classical Latin historical phonology, an unstressed short internal vowel */a/* underwent regular vowel weakening. When followed by an */l/* that preceded another consonant (especially a dental like */t/), the velarized 'dark' */l/* pulled the preceding vowel toward */u/:
>   $$\text{Simplex Supine: } \textit{saltum} \xrightarrow{\text{prefixed}} \textit{-sultum}$$
>   $$\text{Simplex Frequentative: } \textit{saltāre} \xrightarrow{\text{prefixed}} \textit{-sultāre}$$
>   Hence, simplex *saltō* yields compound *as-sultō*, *in-sultō*, *ex-sultō*, *re-sultō*, and *dē-sultō*.
> - **The Simplex Present Active Stem:** `sal-` / `sali-` (from *saliō, salīre*) — forms English present participles and verbs that retain the unreduced vowel: *sal-ient*, *sal-ience*, and through prefixation with unweakened vowel, *re-sile*, *re-sili-ent*, *re-sili-ence*.
> - **The Simplex Frequentative & Noun Stem:** `salt-` (from *saltō, saltāre* and *saltus, saltūs*) — generates technical scientific and evolutionary terms: *salt-atory*, *salt-ation*, *salti-grade*.
> - **The Romance Contracted Compound:** `somer-` + `sault` (from *super-* + *saltus* via Old Provençal *sobresaut*) — forms *somersault*.
> - **The Frequentative Deliberative Convergence:** `consult-` (from *consultāre*, frequentative of *consulere*) — by morphological attraction and identical phonetic rules, the verb for joint deliberation converged on the *-sult-* stem: *consult*, *consult-ant*, *consult-ation*, *consult-ative*.

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
> Although the root fundamentally denotes **"to leap, bound, or spring"**, its operational manifestation radiates across distinct conceptual planes:
> - **Hostile Physical & Military Combat:** [[assault]], [[assaultive]], [[assaulter]] capture violent kinetic rushes against enemy fortifications, personal battery in criminal law, and physical onslaught.
> - **Interpersonal Affront & Verbal Degradation:** [[insult]], [[insulter]], [[insulting]], [[insultingly]] preserve the ancient gesture of trampling upon an opponent, expressing mockery, insolence, and wounded dignity.
> - **Ecstatic Jubilation & Triumphant Release:** [[exult]], [[exultant]], [[exultantly]], [[exultation]] represent the upward bodily surge of joy, victorious celebration, and religious elation.
> - **Cognitive Discontinuity & Haphazard Movement:** [[desultory]], [[desultorily]], [[desultoriness]] evoke the acrobat leaping between steeds, expressing unfocused conversation, casual reading, and rambling thoughts.
> - **Causal Entailment, Physics & Consequences:** [[result]], [[resultant]], [[resulting]] embody the physical rebound transformed into the logical consequence or net vector outcome of interacting forces.
> - **Deliberation, Strategic Counsel & Advisory Work:** [[consult]], [[consultant]], [[consultation]], [[consultative]], [[consulting]] designate the collaborative gathering of experts to examine evidence and deliberate policy.
> - **Elastic Recoil, Prominence & Physical Recovery:** [[salient]], [[salience]], [[resile]], [[resilience]], [[resilient]], [[resiliently]] govern visual conspicuousness, the mechanical bounce-back of materials, and psychological fortitude under crisis.
> - **Gymnastic Acrobatics & Biological Locomotion:** [[somersault]], [[saltatory]], [[saltation]], [[saltigrade]] describe aerial body rotations, jumping nerve conduction, windblown sand grains, and leaping predatory spiders.

---

## 🔀 4. Prefix & Combining Dynamics on sult

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (assimilated to *as-*) | to, toward | [[assault]] / [[assaultive]] | *ad-* + *-sultum* $\to$ leaping toward with violent momentum $\to$ physical battery or military offensive. |
| **con-** | together, thoroughly | [[consult]] / [[consultation]] | *con-* + *consultāre* $\to$ jumping/gathering together in joint deliberation $\to$ to seek expert counsel. |
| **dē-** | down, away from | [[desultory]] / [[desultorily]] | *dē-* + *-sultor* $\to$ leaping down from horse to horse $\to$ jumping aimlessly between subjects without plan. |
| **ex-** | out, forth, upward | [[exult]] / [[exultation]] | *ex-* + *-sultāre* $\to$ leaping upward/outward from oneself $\to$ rejoicing triumphantly in celebration. |
| **in-** | upon, against | [[insult]] / [[insulting]] | *in-* + *-sultāre* $\to$ leaping upon to trample underfoot $\to$ an insolent verbal affront or scornful injury. |
| **re-** | back, again | [[result]] / [[resilient]] | *re-* + *-sultāre* / *resilīre* $\to$ leaping back or ricocheting $\to$ an outcome or consequence; elastic recovery. |
| **super-** (via Provençal *sobre-*) | over, above | [[somersault]] | *super-* + *saltus* $\to$ an over-leap $\to$ an acrobatic 360-degree flip rolling head over heels. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-er** / **-or** | Noun (Agent / Performer) | [[assaulter]], [[insulter]] | Denotes the specific person who executes a physical assault or delivers a verbal insult. |
| **-ant** | Noun / Adjective (Active State/Agent) | [[consultant]], [[exultant]], [[resultant]] | Forms nouns of professional role (*consultant*) or adjectives of active condition (*exultant*, *resultant*). |
| **-ation** / **-ion** | Noun (Action / State / Process) | [[consultation]], [[exultation]], [[saltation]] | The systematic process or emotional state of conferring, rejoicing, or geological/biological jumping. |
| **-ive** | Adjective (Disposition / Tendency) | [[assaultive]], [[consultative]] | Expressing an aggressive propensity to attack, or designed for advisory and deliberative functions. |
| **-ory** | Adjective (Characteristic Nature) | [[desultory]], [[saltatory]] | Characterized by erratic, jumping movement or adapted for leaping (in neurobiology and anatomy). |
| **-ence** / **-ency** | Noun (Quality / Property) | [[salience]], [[resilience]] | The intrinsic property of projecting prominently, or the elastic capacity to rebound from stress. |
| **-ent** | Adjective (Active Attribute) | [[salient]], [[resilient]] | Characterizes an entity that juts conspicuously outward or bounces back elastically after impact. |
| **-ly** | Adverb (Manner of Action) | [[desultorily]], [[exultantly]], [[insultingly]], [[resiliently]] | Modifies verbs to describe actions carried out in an erratic, triumphant, offensive, or buoyant manner. |
| **-grade** | Adjective / Noun (Locomotive Form) | [[saltigrade]] | Specifies an animal or anatomical mechanism adapted for walking or hunting by jumping. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚔️ **Military Science & Tactical Combat** | [[assault]], [[assaulter]], [[assaultive]] | Breaching fortified perimeters, amphibious assault operations, mechanized infantry shock-assault doctrines, combined-arms coordination. |
| ⚖️ **Criminal Law & Jurisprudence** | [[assault]], [[assaultive]], [[insult]], [[resile]] | Common-law assault (intentional creation of apprehension of imminent battery), tortious injury, withdrawing or resiling from binding contractual covenants. |
| 🗣️ **Rhetoric, Polemics & Social Psychology** | [[insult]], [[insulter]], [[insulting]], [[insultingly]], [[salience]] | *Ad hominem* fallacies, political invective, perceptual salience in media framing, social degradation rituals. |
| 📐 **Logic, Mathematics & Vector Physics** | [[result]], [[resultant]], [[resulting]] | Vector sum of concurrent forces in Newtonian mechanics, resultant velocity vectors, logical conclusions derived in formal deductive proofs. |
| 💼 **Corporate Governance & Management Consulting** | [[consult]], [[consultant]], [[consultation]], [[consultative]], [[consulting]] | Strategic enterprise advisory, external management audits, stakeholder consultative bodies, restructuring advisories. |
| 🎪 **Gymnastics, Circus Arts & Biomechanics** | [[somersault]], [[saltatory]], [[saltation]], [[saltigrade]] | Acrobatic floor tumbling, saltatory conduction along myelinated axons in neurobiology, saltigrade hunting patterns in jumping spiders (*Salticidae*). |
| 🧪 **Materials Science & Cognitive Psychology** | [[resile]], [[resilience]], [[resilient]], [[resiliently]] | Modulus of resilience in stress-strain engineering curves, post-traumatic psychological recovery, supply chain resilience under macroeconomic shocks. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[consult]] | verb | **1.** Get or ask advice from.<br>**2.** Seek information from. | *"Now part them again, lest they consult about the giving up of some more towns in France."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consultancy]] | noun | **1.** The practice of giving expert advice within a particular field. | *"In academic literature, consultancy designates the practice of giving expert advice within a particular field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consultant]] | noun | **1.** An expert who gives advice. | *"I insisted upon calling in a consultant from B--, whose verdict is that the lungs are seriously threatened."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[consultation]] | noun | **1.** A conference (usually with someone important).<br>**2.** A conference between two or more people to consider a particular question. | *"Vholes had copies of these papers and had been in consultation with him throughout."* — Charles Dickens, *Bleak House* |
| [[consultative]] | adjective | **1.** Giving advice; ,. | *"In academic literature, consultative designates giving advice; ,."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consultatory]] | adjective | **1.** Giving advice; ,. | *"In academic literature, consultatory designates giving advice; ,."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consultive]] | adjective | **1.** Giving advice; ,. | *"In academic literature, consultive designates giving advice; ,."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desultory]] | adjective | **1.** Marked by lack of definite plan or regularity or purpose; jumping from one thing to another. | *"My poor life and heart, how weak I am!” she moaned, in a relaxed, desultory way, heedless of Liddy’s presence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[insult]] | noun | **1.** A rude expression intended to offend or hurt.<br>**2.** A deliberately offensive act or something producing the effect of deliberate disrespect. | *"Who might be your mother, That you insult, exult, and all at once, Over the wretched?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insulting]] | verb | **1.** Treat, mention, or speak to rudely.<br>**2.** Expressing extreme contempt. | *"If it were so, I might have let alone The insulting hand of Douglas over you, Which would have been as speedy in your end As all the poisonous potions in the world, And saved the treacherous labour of your son."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insultingly]] | adverb | **1.** In a disrespectful and insulting manner.<br>**2.** In an unfair and insulting manner. | *"If he had spoken insultingly, you should have used your horsewhip on him."* — Sutton E. Griggs, *Unfettered: A Novel* |
| [[result]] | noun | **1.** A phenomenon that follows and is caused by some previous phenomenon.<br>**2.** A statement that solves a problem or explains how to solve the problem. | *"Such kinds of jokes are very much akin to roughness, and from small cruelties larger ones soon result."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[resultant]] | noun | **1.** The final point in a process.<br>**2.** Something that results. | *"The particular economic problems which are presented to each generation of our people are the resultant of all these factors taken together."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sultan]] | noun | **1.** The ruler of a muslim country (especially of the former ottoman empire). | *"The sultan is puzzled: "What meanest thou?"* — Sydney Waterlow, *Shelley* |
| [[sultana]] | noun | **1.** Pale yellow seedless grape used for raisins and wine.<br>**2.** Dried seedless grape. | *"Ye monarchs, take the East and West Frae Indus to Savannah; Gie me, within my straining grasp, The melting form of Anna: There I’ll despise Imperial charms, An Empress or Sultana, While dying raptures in her arms I give and take wi’ Anna!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[sultanate]] | noun | **1.** Country or territory ruled by a sultan. | *"Under a weak, or a careless, or even an absent, Emperor Rome was governed by such men and such methods as we suppose to be peculiar to Sultanates and the East."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[sultrily]] | adverb | **1.** In a sultry and sensual manner. | *"In academic literature, sultrily designates in a sultry and sensual manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sultriness]] | noun | **1.** Oppressively hot and humid weather.<br>**2.** The quality of expressing or arousing sexual desire. | *"After such a revelation, let him smile with what sultriness he would, he could much sooner turn grapes purple, or pumpkins yellow, than melt the iron-branded impression out of the beholder’s memory."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[sultry]] | adjective | **1.** Sexually exciting or gratifying.<br>**2.** Characterized by oppressive heat and humidity. | *"Methinks it is very sultry and hot for my complexion."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SULT
  </div>
</div>
