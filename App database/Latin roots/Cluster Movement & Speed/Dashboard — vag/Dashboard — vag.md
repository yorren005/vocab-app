---
status: unread
type: root_dashboard
---
# Dashboard — vag
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vag-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to wander”</span>
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

The root **vag** means to wander. It refers to the action of wandering and carrying out this process. In English, this root forms words such as *vague*, *vagrant*, and *extravagant*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to wander
> The root **vag** means to wander. It refers to the action of wandering and carrying out this process. In English, this root forms words such as *vague*, *vagrant*, and *extravagant*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To wander</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *vague* and *vagrant*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vag** comes from a Latin word that means *"to wander"*.
  - At its core, it describes the action of wander.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **vag** in an English word, think of **to wander**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to wander).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Vague**: Not clearly, precisely, or explicitly expressed or stated.
  - **Vagrant**: A person without a settled home, permanent employment, or visible means of support who wanders from place to place.
  - **Extravagant**: Exceeding the limits of reason, moderation, necessity, or propriety.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vag</mark>, think of <mark class="hl-def">to wander</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vag** functions in English through clear morphological stems, historical phonetic reductions, participial nominalizations, and compounding elements:
>
> - **Primary Deponent Verbal Stem (`vagā-` / `vagāt-`):** From *vagor, vagārī, vagātus sum*, the past participial stem *vagāt-* generates formal Latinate verbs of detour and discursive drifting: with prefix *dis-* $\to$ [[divagate]] ("to wander away from the topic"), and its abstract action noun [[divagation]].
> - **Adjectival Base (`vag-`):** From *vagus, -a, -um*, the root yields the direct French loan [[vague]], which generates standard English affixational derivatives: [[vaguely]] and [[vagueness]].
> - **Participial Agent Stem (`vagant-`):** From the present active participle *vagāns, vagantis* ("wandering"), English borrows legal and descriptive agents: [[vagrant]] (originally one wandering without a home) and its derivative state [[vagrancy]].
> - **Tendency / Habitual Suffixation (`-abond` < Latin `-ābundus`):** The Latin suffix *-bundus* denoted a prolonged state or active propensity. Combined with *vagārī*, it produced Late Latin *vagābundus* ("prone to roving"), yielding French *vagabond* and English [[vagabond]], which further spawned [[vagabondage]].
> - **Verbal Noun Shift (`vagary`):** Direct anglicization of the Latin infinitive *vagārī* produced [[vagary]], which later spawned the descriptive adjective [[vagarious]].
> - **Neoclassical Compounding Engine:** The root unites with classical Latin prefixes and nominal bases to form vivid specialized vocabularies:
>   - **Spatial Prefixation (`extra-` "outside, beyond"):** $\to$ Medieval Latin *extravagāns* ("wandering outside"), yielding [[extravagant]], [[extravagantly]], [[extravagance]], and the Italianate theatrical noun [[extravaganza]].
>   - **Directional Prefixation (`di-` < `dis-` "apart, away"):** $\to$ Latin *dīvagārī* ("to wander apart"), yielding [[divagate]] and [[divagation]].
>   - **Biological & Ecological Stem (`vagilis` "prone to wandering"):** From *vagor* + *-ilis*, producing [[vagile]] ("motile, dispersing") and [[vagility]] ("dispersal capacity").
>   - **Compound Nominal Prefixes:**
>     - With **nox, noctis** ("night"): $\to$ Latin *noctivagus* $\to$ [[noctivagant]] ("wandering through the night").
>     - With **sōlus** ("alone"): $\to$ Latin *sōlivagus* $\to$ [[solivagant]] ("wandering solitary").
>     - With **mundus** ("world"): $\to$ Latin *mundivagus* $\to$ [[mundivagant]] ("wandering over the globe").
>   - **Medical & Neuroanatomical Formations:**
>     - Direct anatomical borrowing: [[vagus]] (Cranial Nerve X).
>     - Adjectival extension: [[vagal]].
>     - Vascular compound with **vās** ("vessel"): $\to$ [[vasovagal]] ("involving blood vessels and the vagus nerve").
>     - Surgical compound with Greek **-tomia** ("cutting"): $\to$ [[vagotomy]] ("surgical severance of the vagus nerve").

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
> Although rooted in the elemental physical gesture of unanchored wandering, the semantic spectrum of **vag** articulates seven distinct conceptual planes across English:
>
> 1. **Physical Itinerancy, Homelessness & Civic Vagrancy:**
>    In [[vagrant]] and [[vagrancy]], the root expresses the socio-legal classification of individuals moving without fixed residence or visible means of support. In [[vagabond]] and [[vagabondage]], the wandering carries a romantic, nomadic, or shiftless bohemian connotation of drifting from town to town.
>
> 2. **Perceptual Indistinctness & Epistemic Uncertainty:**
>    In [[vague]], [[vaguely]], and [[vagueness]], the physical motion of wandering transforms into optical haziness, semantic ambiguity, and intellectual imprecision. When a boundary wanders or fluctuates, its exact location cannot be fixed; hence, a vague outline, vague memory, or vague policy statement.
>
> 3. **Rhetorical & Discursive Digression:**
>    In [[divagate]] and [[divagation]], the root captures discursive wandering: an orator or author who drifts away from the primary line of argument to explore tangential anecdotes or parenthetical observations.
>
> 4. **Normative, Financial & Theatrical Transgression (Wandering Beyond Bounds):**
>    In [[extravagant]], [[extravagantly]], and [[extravagance]], wandering breaches boundaries of fiscal moderation, decorum, and common sense—spending money wildly or making absurdly inflated claims. In [[extravaganza]], this breach of limits ascends into spectacular artistic excess: an opulent, fantastical theatrical production that defies naturalistic constraints.
>
> 5. **Gross Neuroanatomy & Autonomic Reflexes (The Wandering Highway):**
>    In [[vagus]], [[vagal]], [[vasovagal]], and [[vagotomy]], the root provides the definitive anatomical terminology for Cranial Nerve X. Its meandering course through the thorax and viscera governs heart rate, fainting spells (*vasovagal syncope*), digestion, and surgical ulcer treatments.
>
> 6. **Capricious Whimsy & Volatile Fluctuations:**
>    In [[vagary]] and [[vagarious]], wandering shifts from physical steps to sudden, erratic excursions of the mind or external reality—the unpredictable whims of human desire or the capricious vagaries of stock markets and winter storms.
>
> 7. **Ecological Mobility & Solitary / Planetary Wanderings:**
>    In [[vagile]] and [[vagility]], evolutionary biology measures an organism\'s capacity to disperse across landscapes. In poetic compounds like [[noctivagant]] (night-wandering), [[solivagant]] (wandering alone), and [[mundivagant]] (world-roving), the root evokes archetypal figures of solitary, global, or nocturnal traversal.

---

## 🔀 4. Prefix & Combining Dynamics on vag

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `extra-` | outside, beyond | [[extravagant]], [[extravagantly]], [[extravagance]], [[extravaganza]] | Wandering *outside* established boundaries $\to$ exceeding the limits of financial prudence, moderation, decorum, or artistic restraint. |
| `di-` (< `dis-`) | apart, away, aside | [[divagate]], [[divagation]] | Wandering *away or aside* $\to$ digressing from the main subject of discourse or departing from a physical path. |
| `nocti-` (< *nox, noctis*) | night | [[noctivagant]] | Wandering *in the night* $\to$ active or roaming under cover of darkness. |
| `soli-` (< *sōlus*) | alone, sole | [[solivagant]] | Wandering *alone* $\to$ traveling without companions; living a solitary, itinerant lifestyle. |
| `mundi-` (< *mundus*) | world, globe | [[mundivagant]] | Wandering *across the world* $\to$ roaming over the entire earth; globetrotting. |
| `vaso-` (< *vās, vāsis*) | vessel, duct | [[vasovagal]] | Combining blood *vessels* with the *vagus nerve* $\to$ a neurovascular reflex causing sudden bradycardia and vasodilation. |
| `-tomy` (< Greek *tomē*) | cutting, incision | [[vagotomy]] | Surgical *cutting* of the *vagus nerve* $\to$ transecting vagal branches to reduce gastric acid secretion. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ue` (< French < Latin *-us*) | Adjective (Base Form) | [[vague]] | Expresses the quality of being unfixed, indefinite, hazy, or lacking sharp definition. |
| `-ly` | Adverb (Manner) | [[vaguely]], [[extravagantly]] | Modifies an action performed in an indistinct, obscure, or financially excessive manner. |
| `-ness` | Noun (State / Quality) | [[vagueness]] | Denotes the abstract condition of being indefinite, imprecise, or hazy. |
| `-ant` (< Latin *-āns, -antis*) | Noun / Adjective (Participial Agent) | [[vagrant]], [[extravagant]], [[noctivagant]], [[solivagant]], [[mundivagant]] | Designates a person or entity characterized by wandering, or the act of roving itself. |
| `-ancy` (< Latin *-antia*) | Noun (State / Offense) | [[vagrancy]] | Denotes the legal condition, social status, or criminal offense of wandering without fixed abode. |
| `-abond` (< Latin *-ābundus*) | Noun / Adjective (Habitual State) | [[vagabond]] | Signifies a person having an innate propensity or continuous habit of wandering. |
| `-age` (< Latin *-āticum*) | Noun (Condition / Practice) | [[vagabondage]] | Names the collective practice, condition, or state of living as a vagabond. |
| `-ary` (< Latin *-āria* / *-āre*) | Noun (Caprice / Whim) | [[vagary]] | Designates an erratic, whimsical excursion of thought, action, or environmental circumstance. |
| `-arious` (< Latin *-ārius*) | Adjective (Characterized by) | [[vagarious]] | Describes a temperament or behavior marked by erratic whims, caprices, and unpredictability. |
| `-ate` (< Latin *-ātus*) | Verb (Causative / Action) | [[divagate]] | Formulates the formal verbal action of straying or digressing from a topic. |
| `-ation` (< Latin *-ātiō*) | Noun (Process / Product) | [[divagation]] | The act, instance, or rhetorical product of wandering away from a main subject. |
| `-ance` (< Latin *-antia*) | Noun (State / Conduct) | [[extravagance]] | The habit, quality, or instance of spending or acting beyond prudent limits. |
| `-anza` (< Italian *-anza*) | Noun (Theatrical Spectacle) | [[extravaganza]] | An elaborate, spectacular, and fantastical theatrical or musical presentation. |
| `-us` | Noun (Latin Nominative) | [[vagus]] | The anatomical proper noun designating the tenth cranial nerve (*nervus vagus*). |
| `-al` (< Latin *-ālis*) | Adjective (Relational) | [[vagal]] | Relating to or mediated by the vagus nerve in physiological and clinical contexts. |
| `-ile` (< Latin *-ilis*) | Adjective (Capacity / Tendency) | [[vagile]] | Capable of moving freely; motile and prone to spatial dispersal in ecological niches. |
| `-ility` (< Latin *-ilitās*) | Noun (Capacity / Trait) | [[vagility]] | The inherent physiological or ecological capacity of an organism to disperse geographically. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧠 **Gross Anatomy & Autonomic Neurophysiology** | [[vagus]], [[vagal]], [[vasovagal]], [[vagotomy]] | Innervation of thoracic and abdominal viscera by Cranial Nerve X; measurement of heart rate variability (HRV) via resting vagal tone; evaluation of neurocardiogenic fainting (*vasovagal syncope*); implantable vagus nerve stimulation (VNS) for drug-resistant epilepsy and clinical depression; surgical vagotomy protocols for recalcitrant peptic ulcers. |
| ⚖️ **Jurisprudence, Criminology & Municipal Law** | [[vagrant]], [[vagrancy]], [[vagabond]], [[vagabondage]] | Historical English Poor Laws and Vagrancy Acts (e.g., the Vagrancy Act of 1824); modern constitutional challenges to loitering and anti-camping municipal ordinances under the Eighth and Fourteenth Amendments; sociopolitical regulation of homelessness, public space, and unhoused populations. |
| 🔭 **Astronomy, Cosmology & History of Science** | *stellae vagae* (historical Latin), [[vagary]] | Ancient Greco-Roman distinction between fixed stars (*stellae fixae*) and wandering planets (*stellae vagae*); tracking planetary retrograde loops across the celestial sphere; ancient geocentric models versus Copernican heliocentrism. |
| 💰 **Economics, Consumer Behavior & Personal Finance** | [[extravagant]], [[extravagantly]], [[extravagance]] | Conspicuous consumption and luxury spending exceeding disposable income; budgetary oversight and fiscal discipline in corporate and sovereign finance; behavioral economics of hedonic treadmills and debt accumulation. |
| 🎭 **Performing Arts, Musical Theatre & Spectacle** | [[extravaganza]] | Nineteenth-century Victorian theatrical extravaganzas blending burlesque, fairy-tale fantasy, and pantomime; modern Olympic opening ceremonies; lavish Broadway musical revues and multimedia festival staging. |
| 🌿 **Evolutionary Biology, Biogeography & Population Genetics** | [[vagile]], [[vagility]] | Assessing species dispersal capacity across geographic barriers (e.g., islands, mountain ranges); determining how high versus low vagility affects gene flow, allopatric speciation rates, and vulnerability to habitat fragmentation. |
| 🗣️ **Rhetoric, Literary Criticism & Composition** | [[divagate]], [[divagation]], [[vague]], [[vagueness]], [[vagary]] | Critical analysis of digressive narrative techniques in epic poetry and modernist fiction (e.g., Laurence Sterne\'s *Tristram Shandy*, Marcel Proust); stylistic critiques targeting political obfuscation, administrative vagueness, and discursive wanderings. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[divagate]] | verb | **1.** Lose clarity or turn aside especially from the main subject of attention or course of argument in writing, thinking, or speaking. | *"In academic literature, divagate designates lose clarity or turn aside especially from the main subject of attention or course of argument in writing, thinking, or speaking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divagation]] | noun | **1.** A message that departs from the main subject.<br>**2.** A turning aside (of your course or attention or concern). | *"Let us be set down at Queen's Crawley without further divagation, and see how Miss Rebecca Sharp speeds there."* — William Makepeace Thackeray, *Vanity Fair* |
| [[extravagance]] | noun | **1.** The quality of exceeding the appropriate limits of decorum or probability or truth.<br>**2.** The trait of spending extravagantly. | *"Henry’s address, short as it had been, had more thoroughly opened her eyes to the extravagance of her late fancies than all their several disappointments had done."* — Jane Austen, *Northanger Abbey* |
| [[extravagancy]] | noun | **1.** The quality of exceeding the appropriate limits of decorum or probability or truth. | *"No, sooth, sir; my determinate voyage is mere extravagancy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extravagant]] | adjective | **1.** Unrestrained, especially with regard to feelings.<br>**2.** Recklessly wasteful. | *"I have heard The cock, that is the trumpet to the morn, Doth with his lofty and shrill-sounding throat Awake the god of day; and at his warning, Whether in sea or fire, in earth or air, Th’extravagant and erring spirit hies To his confine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extravagantly]] | adverb | **1.** In an abundant manner.<br>**2.** In a wasteful manner. | *"It is often declared extravagantly that our country could support easily the total population of China, or as great a population per square mile as that of Italy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[extravaganza]] | noun | **1.** Any lavishly staged or spectacular entertainment. | *"Grandpa had launched into his traditional and celebrated French Toast Extravaganza that began early each Thanksgiving Day morning. *** Thanksgiving is past."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[invaginate]] | verb | **1.** Sheathe.<br>**2.** Fold inwards. | *"Classical and authoritative lexicons catalog invaginate as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invagination]] | noun | **1.** The condition of being folded inward or sheathed.<br>**2.** The folding in of an outer layer so as to form a pocket in the surface. | *"In academic literature, invagination designates the condition of being folded inward or sheathed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vagabond]] | noun | **1.** Anything that resembles a vagabond in having no fixed place.<br>**2.** A wanderer who has no established residence or visible means of support. | *"Go to, sir; you were beaten in Italy for picking a kernel out of a pomegranate; you are a vagabond, and no true traveller."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vagabondage]] | noun | **1.** Travelling about without any clear destination. | *"Everybody knows where to find Durdles, when he’s wanted.” Which, if not strictly true, is approximately so, if taken to express that Durdles may always be found in a state of vagabondage somewhere."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[vagal]] | adjective | **1.** Of or relating to the vagus nerve. | *"In academic literature, vagal designates of or relating to the vagus nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vagary]] | noun | **1.** An unexpected and inexplicable change in something (in a situation or a person's behavior, etc.). | *"They may return and settle again to execute their preordained faculties, but they are now in a most extravagant vagary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vagile]] | adjective | **1.** Having freedom to move about. | *"In academic literature, vagile designates having freedom to move about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vagina]] | noun | **1.** The lower part of the female reproductive tract; a moist canal in female mammals extending from the labia minora to the uterus. | *"And the related image of the female with a sexual organ capable of absorbing a man plays a variation on the vagina dentata theme (e.g., pt. 2, pp. 19, 24)."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[vaginal]] | adjective | **1.** Of or relating to the vagina. | *"In academic literature, vaginal designates of or relating to the vagina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaginismus]] | noun | **1.** Muscular contraction that causes the vagina to close; usually an anxiety reaction before coitus or pelvic examination. | *"In academic literature, vaginismus designates muscular contraction that causes the vagina to close; usually an anxiety reaction before coitus or pelvic examination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaginitis]] | noun | **1.** Inflammation of the vagina (usually associated with candidiasis). | *"In academic literature, vaginitis designates inflammation of the vagina (usually associated with candidiasis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaginocele]] | noun | **1.** Hernia projecting into the vagina. | *"In academic literature, vaginocele designates hernia projecting into the vagina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vagrancy]] | noun | **1.** The state of wandering from place to place; having no permanent home or means of livelihood. | *"‘Yes, master, and I’ve never been in it much.’ (I had come out of Kingston Jail last on a vagrancy committal."* — Charles Dickens, *Great Expectations* |
| [[vagrant]] | noun | **1.** A wanderer who has no established residence or visible means of support.<br>**2.** Continually changing especially as from one abode or occupation to another. | *"On the day of the missionary's visit, he was in a prison cell, committed as a vagrant and common drunkard."* — Classic Author, *The wonders of prayer* |
| [[vague]] | adjective | **1.** Not clearly understood or expressed; ; -anatole broyard; - p.a.sorokin; - john locke.<br>**2.** Not precisely limited, determined, or distinguished. | *"As not one of them wanted to admit the hasty retreat before the ghost had even been properly inspected, they only dropped vague and terrifying words about the matter."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vaguely]] | adverb | **1.** In a vague way. | *"And not the least amazing circumstance connected with her being vaguely the town talk is that people hovering on the confines of Mr."* — Charles Dickens, *Bleak House* |
| [[vagueness]] | noun | **1.** Unclearness by virtue of being poorly expressed or not coherent in meaning.<br>**2.** Indistinctness of shape or character. | *"Jobling with some vagueness of expression and perhaps of meaning too."* — Charles Dickens, *Bleak House* |
| [[vagus]] | noun | **1.** A mixed nerve that supplies the pharynx and larynx and lungs and heart and esophagus and stomach and most of the abdominal viscera. | *"In academic literature, vagus designates a mixed nerve that supplies the pharynx and larynx and lungs and heart and esophagus and stomach and most of the abdominal viscera."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VAG
  </div>
</div>
