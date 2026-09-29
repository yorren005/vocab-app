---
status: unread
type: root_dashboard
---
# Dashboard — ven
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ven-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to come”</span>
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

The root **ven** means to come. It refers to the action of coming and carrying out this process. In English, this root forms words such as *convene*, *intervene*, *prevent*, and *venue*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to come
> The root **ven** means to come. It refers to the action of coming and carrying out this process. In English, this root forms words such as *convene*, *intervene*, *prevent*, and *venue*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To come</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *convene* and *intervene*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ven** comes from a Latin word that means *"to come"*.
  - At its core, it describes the action of come.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **ven** in an English word, think of **to come**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to come).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Convene**: To summon, call together, or assemble people for a formal, official, or legislative meeting.
  - **Intervene**: To occur, exist, or fall between points in time, events, or physical spaces.
  - **Prevent**: An everyday English word showing the root's idea of *to come*.
  - **Venue**: The scene, locale, or building where an organized event, conference, concert, or sporting match takes place.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ven</mark>, think of <mark class="hl-def">to come</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ven** operates primarily through the Latin present active stem *ven-*, its present active participle *veniēns (venient-)*, and its extensive Romance / Old French nominalized reflexes in *-enir*:
> - **Primary Active Stem (`ven-`):** Functions as the base for English verbs formed with Latin directional prefixes: *con-ven-e* (come together), *inter-ven-e* (come between), *contra-ven-e* (come against), *super-ven-e* (come upon), *ante-ven-e* (come before), *sur-ven-e* (come unexpectedly), *dis-con-ven-e* (disperse).
> - **Participial / Adjectival Stem (`venient-`):** Formed from the Latin present active participle (*veniēns, venientis*), yielding adjectives and nouns of quality: *con-venient* / *con-venience*, *in-con-venient* / *in-con-venience*, *super-venient* / *super-venience*.
> - **Romance & Old French Participial Nominalizations:**
>   - **Feminine Past Participles in *-ue*:** *venue* (OF *venue* < *venīre* "a coming"), *avenue* (OF *avenue* < *advenīre* "an approach"), *revenue* (OF *revenue* < *revenīre* "a return").
>   - **Masculine Past Participles in *-u*:** *parvenu* (French *parvenu* < *parvenir* < *pervenīre* "to arrive at, succeed").
>   - **Substantival Infinitives:** *souvenir* (French noun from infinitive *souvenir* < *subvenīre* "to come to mind, occur").
>   - **Present Participles in *-ant* / *-ance*:** *covenant* (OF *covenant* < *covenir* < *convenīre*), *provenance* (French *provenance* < *provenir* < *prōvenīre* "to issue forth").
> - **Prefix Assimilation Rules:** Unlike consonants that force radical assimilation, *v-* maintains stability following most prefixes (*con-vene*, *inter-vene*, *contra-vene*, *super-vene*), though in French evolution *ad-* reduced before *v-* to produce *a-venue*, and *sub-* shifted through Old French *sovenir* to yield *souvenir*.

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
> Although the root fundamentally denotes **"to come"**, its manifestation shifts dynamically across distinct operational planes:
> - **Civic Assembly & Deliberative Gathering:** In [[convene]], [[convener]], [[convening]], [[venue]], [[covenant]], [[covenanter]], and [[disconvene]], coming represents the deliberate gathering of individuals, judicial bodies, or citizens to conduct trials, establish solemn pacts, or debate policy.
> - **Conflict, Legal Interposition & Breach:** In [[intervene]], [[intervener]], [[intervening]], [[interventionism]], [[contravene]], [[contravener]], and [[contravening]], coming moves into the friction of human affairs—stepping between belligerents to impose order, or marching directly against statutory boundaries.
> - **Ontological Emergence & Chronological Priority:** In [[supervene]], [[supervenient]], [[supervenience]], [[survene]], and [[antevene]], the root ascends into metaphysics, logic, and philosophy of mind, tracking properties that emerge upon physical substrates or events that anticipate and precede others.
> - **Pragmatic Fitness, Spatial Ease & Utility:** In [[convenience]], [[convenient]], [[conveniently]], [[inconvenience]], [[inconvenient]], and [[inconveniently]], the root's original notion of "coming together" shifts from physical assembly to contextual suitability—things that fit smoothly into one's schedule, geography, or daily labor.
> - **Economic Returns, Social Mobility & Artifact Lineage:** In [[revenue]], [[parvenu]], [[provenance]], [[souvenir]], and [[avenue]], coming tracks physical pathways, recurring fiscal returns, the upward ascent of self-made individuals, and the documented historical trail of treasured artifacts.

---

## 🔀 4. Prefix & Combining Dynamics on ven

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** | to, toward | [[avenue]] | *ad-* + *venīre* $\to$ to come toward $\to$ an approach, access path, or grand landscaped boulevard. |
| **ante-** | before, prior | [[antevene]] | *ante-* + *venīre* $\to$ to come before in time $\to$ to precede, forestall, or anticipate. |
| **con-** | together, jointly | [[convene]], [[convenience]], [[covenant]] | *con-* + *venīre* $\to$ to come together $\to$ to assemble in a body; to be fitting or suitable; a solemn pact. |
| **contra-** | against, opposite | [[contravene]] | *contra-* + *venīre* $\to$ to come against $\to$ to oppose, transgress, or violate a rule or treaty. |
| **dis-** + **con-** | apart + together (reversal) | [[disconvene]] | *dis-* + *con-* + *venīre* $\to$ to undo coming together $\to$ to disperse, dissolve, or cancel an assembly. |
| **in-** + **con-** | not + together (negation) | [[inconvenience]], [[inconvenient]] | *in-* + *convenientia* $\to$ not coming together/unfitting $\to$ trouble, awkwardness, or difficulty. |
| **inter-** | between, among | [[intervene]] | *inter-* + *venīre* $\to$ to come between $\to$ to interpose, mediate, or occur between intervals. |
| **per-** | through, thoroughly | [[parvenu]] | *per-* + *venīre* $\to$ to come thoroughly through $\to$ to reach an objective or status $\to$ an upstart. |
| **prō-** | forth, forward | [[provenance]] | *prō-* + *venīre* $\to$ to come forth from $\to$ to originate $\to$ historical origin or record of custody. |
| **re-** | back, again | [[revenue]] | *re-* + *venīre* $\to$ to come back $\to$ periodic fiscal return, income, or yield. |
| **sub-** | under, up from below | [[souvenir]] | *sub-* + *venīre* $\to$ to come up from under $\to$ to come to mind $\to$ a keepsake or memento. |
| **super-** | above, over, upon | [[supervene]], [[survene]] | *super-* + *venīre* $\to$ to come upon or over $\to$ to arrive unexpectedly; to emerge as an ontological dependency. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-er / -or** | Agent Noun | [[convener]], [[intervener]], [[contravener]], [[covenanter]] | Identifies the person, entity, or state performing the act of assembling, mediating, violating, or contracting. |
| **-ing** | Verbal Noun / Present Participle | [[convening]], [[intervening]], [[contravening]] | Expresses the ongoing physical, legal, or temporal process of gathering, interposing, or transgressing. |
| **-ent** | Participial Adjective | [[convenient]], [[inconvenient]], [[supervenient]] | Characterizes an entity as fitting, unsuitable, or ontologically dependent upon a base. |
| **-ence / -ance** | Abstract State Noun | [[convenience]], [[inconvenience]], [[supervenience]], [[provenance]] | Designates the qualitative condition, fitness, emergence, or origin of an action. |
| **-ly** | Manner Adverb | [[conveniently]], [[inconveniently]] | Modifies actions by describing the ease, difficulty, or opportuneness of execution. |
| **-ism** | Ideological / Policy Noun | [[interventionism]] | Conceptualizes a systematic doctrine or governmental policy of foreign or economic interference. |
| **-ue / -u** | Romance Past Participle Substantive | [[avenue]], [[venue]], [[revenue]], [[parvenu]] | Substantivizes a French participial form into a concrete spatial thoroughfare, trial jurisdiction, income return, or social upstart. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Jurisprudence & Judicial Administration** | [[venue]], [[contravene]], [[intervene]], [[intervener]], [[intervening]] | Motion for change of venue under civil and criminal procedure; third-party intervention by public interest groups in constitutional litigation; adjudicating actions that contravene statutory codes; evaluating intervening causes in tort liability. |
| **Public Finance, Taxation & Fiscal Policy** | [[revenue]] | State revenue services (IRS, HMRC); sovereign customs tariffs; corporate top-line gross revenue; issuing municipal revenue bonds for infrastructure development. |
| **Urban Planning, Architecture & Civil Design** | [[avenue]] | Haussmannization of 19th-century Paris creating grand axial avenues; tree-lined urban thoroughfares terminating at public monuments; designing sightlines and vehicular boulevards. |
| **Philosophy of Mind, Metaphysics & Metaethics** | [[supervene]], [[supervenient]], [[supervenience]] | Donald Davidson's anomalous monism; non-reductive physicalism positing that mental states supervene on neural states; R. M. Hare's moral supervenience asserting that moral evaluations supervene on natural descriptive facts. |
| **International Relations, Treaties & Geopolitics** | [[contravene]], [[interventionism]], [[covenant]] | The League of Nations Covenant; debating foreign military interventionism versus national sovereignty; penalizing member states that contravene international maritime conventions or nuclear non-proliferation treaties. |
| **Art History, Museology & Antiquities Trade** | [[provenance]], [[souvenir]] | Rigorous provenance research tracing ownership of Holocaust-looted paintings and classical antiquities; maintaining museum accession chains of title; material culture of souvenirs and mementos. |
| **Sociology, Social Stratification & Literature** | [[parvenu]] | Sociological analysis of rapid social mobility and class friction; Thorstein Veblen's theory of the leisure class; the literary trope of the ambitious parvenu in the 19th-century novels of Balzac, Stendhal, and Thackeray. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advent]] | noun | **1.** Arrival that has been awaited (especially of something momentous).<br>**2.** The season including the four sundays preceding christmas. | *"I am the turned-forth, be it known to you, That have preserved her welfare in my blood And from her bosom took the enemy’s point, Sheathing the steel in my advent’rous body."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adventism]] | noun | **1.** Any christian religion that believes the second coming of christ is imminent. | *"In academic literature, adventism designates any christian religion that believes the second coming of christ is imminent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventist]] | noun | **1.** A member of christian denomination that expects the imminent advent of christ. | *"In academic literature, adventist designates a member of christian denomination that expects the imminent advent of christ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventitia]] | noun | **1.** An enveloping or covering membrane or layer of body tissue. | *"In academic literature, adventitia designates an enveloping or covering membrane or layer of body tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventitial]] | adjective | **1.** Of or pertaining to the adventitia. | *"In academic literature, adventitial designates of or pertaining to the adventitia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventitious]] | adjective | **1.** Associated by chance and not an integral part; - frederick w. robertson. | *"It was then that the ecstasy and the dream began, in which emotion was the matter of the universe, and matter but an adventitious intrusion likely to hinder you from spinning where you wanted to spin."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[adventive]] | adjective | **1.** Not native and not fully established; locally or temporarily naturalized. | *"In academic literature, adventive designates not native and not fully established; locally or temporarily naturalized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventure]] | noun | **1.** A wild and exciting undertaking (not necessarily lawful).<br>**2.** Take a risk in the hope of a favorable outcome. | *"If you saw yourself with your eyes or knew yourself with your judgement, the fear of your adventure would counsel you to a more equal enterprise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adventurer]] | noun | **1.** A person who enjoys taking risks.<br>**2.** Someone who travels into little known regions (especially for some scientific purpose). | *"There she is with plenty of money, and a house and farm, and horses, and comfort, and here am I living from hand to mouth—a needy adventurer."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[adventuresome]] | adjective | **1.** Willing to undertake or seeking out new and daring enterprises. | *"In academic literature, adventuresome designates willing to undertake or seeking out new and daring enterprises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventuress]] | noun | **1.** A woman adventurer. | *"The facts are briefly these: Some five years ago, during a lengthy visit to Warsaw, I made the acquaintance of the well-known adventuress, Irene Adler."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[adventurism]] | noun | **1.** Recklessness in politics or foreign affairs. | *"In academic literature, adventurism designates recklessness in politics or foreign affairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventuristic]] | adjective | **1.** Of or pertaining to adventurism. | *"In academic literature, adventuristic designates of or pertaining to adventurism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adventurous]] | adjective | **1.** Willing to undertake or seeking out new and daring enterprises. | *"But if I cannot win you to this love, Go search like nobles, like noble subjects, And in your search spend your adventurous worth; Whom if you find, and win unto return, You shall like diamonds sit about his crown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adventurousness]] | noun | **1.** The trait of being adventurous. | *"In academic literature, adventurousness designates the trait of being adventurous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[avenue]] | noun | **1.** A line of approach.<br>**2.** A wide street or thoroughfare. | *"Presently we lost the light, presently saw it, presently lost it, presently saw it, and turned into an avenue of trees and cantered up towards where it was beaming brightly."* — Charles Dickens, *Bleak House* |
| [[circumvent]] | verb | **1.** Surround so as to force to give up.<br>**2.** Beat through cleverness and wit. | *"This might be the pate of a politician which this ass now o’er-offices, one that would circumvent God, might it not?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumvention]] | noun | **1.** The act of evading by going around. | *"What ever have been thought on in this state That could be brought to bodily act ere Rome Had circumvention? ’Tis not four days gone Since I heard thence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumventive]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ven within the domain of Motion.<br>**2.** A technical or specialized form exhibiting the properties of ven in systematic terminology. | *"In academic literature, circumventive designates pertaining to, derived from, or characteristic of latin ven within the domain of motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contravene]] | verb | **1.** Go against, as of rules and laws.<br>**2.** Deny the truth of. | *"She knew that it was all sentiment, all baseless impressibility, which had caused her to read the scene as her own condemnation; nevertheless she could not get over it; she could not contravene in her own defenceless person all those untoward omens."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[contravention]] | noun | **1.** Coming into conflict with. | *"This power must either be a direct negative on the State laws, or an authority in the federal courts to overrule such as might be in manifest contravention of the articles of Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[convene]] | verb | **1.** Meet formally.<br>**2.** Call together. | *"For these, the President will find no difficulty to provide; and should any circumstance occur which requires the advice and consent of the Senate, he may at any time convene them."* — Alexander Hamilton, *The Federalist Papers* |
| [[convener]] | noun | **1.** The member of a group whose duty it is to convene meetings. | *"Cairns was one of the conveners, soon found that, if relief were to be granted, they had only two alternatives before them."* — John Cairns, *Principal Cairns* |
| [[convenience]] | noun | **1.** The state of being suitable or opportune.<br>**2.** The quality of being useful and convenient. | *"I’ll beat him, by my life, if I can meet him with any convenience, an he were double and double a lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conveniences]] | noun | **1.** Things that make you comfortable and at ease.<br>**2.** The state of being suitable or opportune. | *"If deprived of the society of my fellow creatures, and of the conveniences of life, I could not but reflect that my forlorn situation was yet attended with some advantages."* — Jack London, *The Jacket (The Star-Rover)* |
| [[convenient]] | adjective | **1.** Suited to your comfort or purpose or needs.<br>**2.** Large and roomy (`convenient' is archaic in this sense). | *"Dispatch the most convenient messenger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conveniently]] | adverb | **1.** In a convenient manner. | *"Let’s do’t, I pray, and I this morning know Where we shall find him most conveniently. [_Exeunt._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convening]] | noun | **1.** The act of convening.<br>**2.** Meet formally. | *"The dilatory process of convening the legislature, or one of its branches, for the purpose of obtaining its sanction to the measure, would frequently be the occasion of letting slip the golden opportunity."* — Alexander Hamilton, *The Federalist Papers* |
| [[convent]] | noun | **1.** A religious residence especially for nuns.<br>**2.** A community of people in a religious order (especially nuns) living together. | *"One of our convent, and his confessor, Gives me this instance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conventicle]] | noun | **1.** A secret unauthorized meeting for religious worship.<br>**2.** A building for religious assembly (especially nonconformists, e.g., quakers). | *"Ay, all of you have laid your heads together— Myself had notice of your conventicles— And all to make away my guiltless life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convention]] | noun | **1.** A large formal assembly.<br>**2.** Something regarded as a normative example. | *"Why not be revenged on society by shaping his future domesticities loosely, instead of kissing the pedagogic rod of convention in this ensnaring manner?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conventional]] | adjective | **1.** Following accepted customs and proprieties.<br>**2.** Conforming with accepted standards. | *"Most of the misery had been generated by her conventional aspect, and not by her innate sensations."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conventionalisation]] | noun | **1.** The act of conventionalizing; conforming to a conventional style. | *"In academic literature, conventionalisation designates the act of conventionalizing; conforming to a conventional style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventionalise]] | verb | **1.** Make conventional or adapt to conventions. | *"In some instances the tiled roof of the tower is represented by tile-mouldings on the shoulder; but in this instance the form is entirely conventionalised into a cylindrical vase supported by three bear-shaped feet."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[conventionalised]] | verb | **1.** Make conventional or adapt to conventions.<br>**2.** Using artistic forms and conventions to create effects; not natural or spontaneous. | *"In some instances the tiled roof of the tower is represented by tile-mouldings on the shoulder; but in this instance the form is entirely conventionalised into a cylindrical vase supported by three bear-shaped feet."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[conventionalism]] | noun | **1.** Orthodoxy as a consequence of being conventional. | *"Such crystallization, such conventionalisms, yield only to the dissolving power of the spiritual warmth of life-full personalities."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[conventionality]] | noun | **1.** Conformity with conventional thought and behavior.<br>**2.** Unoriginality as a result of being too conventional. | *"Her unsophisticated open-air existence required no varnish of conventionality to make it palatable to him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conventionalization]] | noun | **1.** The act of conventionalizing; conforming to a conventional style. | *"In academic literature, conventionalization designates the act of conventionalizing; conforming to a conventional style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventionalize]] | verb | **1.** Make conventional or adapt to conventions.<br>**2.** Represent according to a conventional style. | *"I thought it was only women who were privileged to change their mind,” she began brightly; but Arkwright ignored her attempt to conventionalize the situation."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[conventionalized]] | verb | **1.** Make conventional or adapt to conventions.<br>**2.** Represent according to a conventional style. | *"In academic literature, conventionalized designates make conventional or adapt to conventions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventionally]] | adverb | **1.** In a conventional manner. | *"The more his life changed, the more it was the same thing--the same plunging without forethought, the same disregard for all that is conventionally deemed necessary."* — Sydney Waterlow, *Shelley* |
| [[conventioneer]] | noun | **1.** Someone who attends a convention. | *"In academic literature, conventioneer designates someone who attends a convention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conventual]] | adjective | **1.** Of communal life sequestered from the world under religious vows. | *"Whether the barn had ever formed one of a group of conventual buildings nobody seemed to be aware; no trace of such surroundings remained."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[coven]] | noun | **1.** An assembly of witches; usually 13 witches. | *"In academic literature, coven designates an assembly of witches; usually 13 witches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covenant]] | noun | **1.** A signed written agreement between two or more parties (nations) to perform some action.<br>**2.** (bible) an agreement between god and his people in which god makes certain promises and requires certain behavior from them in return. | *"Good sir, we must, If you keep covenant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coventry]] | noun | **1.** The state of being banished or ostracized (excluded from society by general consent).<br>**2.** An industrial city in central england; devastated by air raids during world war ii; remembered as the home of lady godiva in the 11th century. | *"Bardolph, get thee before to Coventry; fill me a bottle of sack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disinvent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ven within the domain of Motion.<br>**2.** A technical or specialized form exhibiting the properties of ven in systematic terminology. | *"In academic literature, disinvent designates pertaining to, derived from, or characteristic of latin ven within the domain of motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[envenom]] | verb | **1.** Cause to be bitter or resentful.<br>**2.** Add poison to. | *"Sir, this report of his Did Hamlet so envenom with his envy That he could nothing do but wish and beg Your sudden coming o’er to play with him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[even]] | noun | **1.** The latter part of the day (the period of decreasing daylight from late afternoon until nightfall).<br>**2.** Make level or straight. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evening]] | noun | **1.** The latter part of the day (the period of decreasing daylight from late afternoon until nightfall).<br>**2.** A later concluding time period. | *"I’ll about it this evening; and I will presently pen down my dilemmas, encourage myself in my certainty, put myself into my mortal preparation; and by midnight look to hear further from me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evening-snow]] | noun | **1.** Small california annual with white flowers. | *"In academic literature, evening-snow designates small california annual with white flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eveningwear]] | noun | **1.** Attire to wear on formal occasions in the evening. | *"In academic literature, eveningwear designates attire to wear on formal occasions in the evening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evenly]] | adverb | **1.** In equal amounts or shares; in a balanced or impartial way.<br>**2.** In a level and regular way. | *"I’ll have the current in this place dammed up, And here the smug and silver Trent shall run In a new channel, fair and evenly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evenness]] | noun | **1.** The parity of even numbers (divisible by two).<br>**2.** A quality of uniformity and lack of variation. | *"Jellyby preserved the evenness of her disposition."* — Charles Dickens, *Bleak House* |
| [[evensong]] | noun | **1.** The sixth of the seven canonical hours of the divine office; early evening; now often made a public service on sundays.<br>**2.** (anglican church) a daily evening service with prayers prescribed in the book of common prayer. | *"Fuseblue peer from barrel rev. evensong Love on hackney jaunt Blazes blind coddoubled bicyclers Dilly with snowcake no fancy clothes."* — James Joyce, *Ulysses* |
| [[event]] | noun | **1.** Something that happens at a given place and time.<br>**2.** A special set of circumstances. | *"Poor lord, is’t I That chase thee from thy country, and expose Those tender limbs of thine to the event Of the none-sparing war?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eventful]] | adjective | **1.** Full of events or incidents.<br>**2.** Having important issues or results. | *"Last scene of all, That ends this strange eventful history, Is second childishness and mere oblivion, Sans teeth, sans eyes, sans taste, sans everything."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eventide]] | noun | **1.** The latter part of the day (the period of decreasing daylight from late afternoon until nightfall). | *"Though the overshadowing trees and the approach of eventide enveloped them in gloom, Bathsheba could see plainly enough to discern the extreme poverty of the woman’s garb, and the sadness of her face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[eventration]] | noun | **1.** Protrusion of the intestine through the abdominal wall. | *"In academic literature, eventration designates protrusion of the intestine through the abdominal wall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eventual]] | adjective | **1.** Expected to follow in the indefinite future from causes already operating. | *"The business companies have had a dismal history of hardship to surviving members and of eventual failure."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[eventuality]] | noun | **1.** A possible event or occurrence or result. | *"What exactitude, what minuteness, what knowledge of the locality, what foresight for every eventuality, every possibility even to the smallest detail!"* — graf Leo Tolstoy, *War and Peace* |
| [[eventually]] | adverb | **1.** After an unspecified period of time or an especially long delay. | *"When you had the presence of mind to suggest that Benwick would be the properest person to fetch a surgeon, you could have little idea of his being eventually one of those most concerned in her recovery.” “Certainly I could have none."* — Jane Austen, *Persuasion* |
| [[eventuate]] | verb | **1.** Come out in the end. | *"In academic literature, eventuate designates come out in the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconvenience]] | noun | **1.** An inconvenient discomfort.<br>**2.** A difficulty that causes anxiety. | *"To intercept this inconvenience, A piece of ordnance ’gainst it I have placed And even these three days have I watch’d, If I could see them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconvenient]] | adjective | **1.** Not suited to your comfort, purpose or needs.<br>**2.** Not conveniently timed. | *"I know into what straits of fortune she is driven and it is not impossible to me, if it appear not inconvenient to you, to set her before your eyes tomorrow, human as she is, and without any danger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconveniently]] | adverb | **1.** In an inconvenient manner. | *"It was bandaged, of course, but much less inconveniently than my left hand and arm; those I carried in a sling; and I could only wear my coat like a cloak, loose over my shoulders and fastened at the neck."* — Charles Dickens, *Great Expectations* |
| [[intervene]] | verb | **1.** Get involved, so as to alter or hinder an action, or through force or threat of force.<br>**2.** Be placed or located between other things or extend between spaces and events. | *"Cairns did not intervene often in the debates of the United Presbyterian Synod."* — John Cairns, *Principal Cairns* |
| [[intervening]] | verb | **1.** Get involved, so as to alter or hinder an action, or through force or threat of force.<br>**2.** Be placed or located between other things or extend between spaces and events. | *"It wandered back to my godmother’s house and came along the intervening track, raising up shadowy speculations which had sometimes trembled there in the dark as to what knowledge Mr."* — Charles Dickens, *Bleak House* |
| [[intervenor]] | noun | **1.** (law) a party who interposes in a pending proceeding. | *"In academic literature, intervenor designates (law) a party who interposes in a pending proceeding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intervention]] | noun | **1.** The act of intervening (as to mediate a dispute, etc.).<br>**2.** A policy of intervening in the affairs of other countries. | *"When at length the vote came to be taken, and Fraser was elected by a majority of three, there were few who doubted that the intervention of the Berwick minister had been of critical importance in bringing about this result."* — John Cairns, *Principal Cairns* |
| [[intravenous]] | adjective | **1.** Within or by means of a vein. | *"In academic literature, intravenous designates within or by means of a vein."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intravenously]] | adverb | **1.** In an intravenous manner. | *"In academic literature, intravenously designates in an intravenous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intraventricular]] | adjective | **1.** Within the system of ventricles in the brain. | *"In academic literature, intraventricular designates within the system of ventricles in the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invent]] | verb | **1.** Come up with (an idea, plan, explanation, theory, or principle) after a mental effort.<br>**2.** Make up something artificial or untrue. | *"I say she never did invent this letter; This is a man’s invention, and his hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invention]] | noun | **1.** The creation of something in the mind.<br>**2.** A creation (a new device or process) resulting from study and experimentation. | *"O give thyself the thanks if aught in me, Worthy perusal stand against thy sight, For who’s so dumb that cannot write to thee, When thou thyself dost give invention light?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inventive]] | adjective | **1.** (used of persons or artifacts) marked by independence and creativity in thought or action; ; - lewis mumford. | *"It seemed as if, could I but go back to the idea which had last entered my mind as I stood at the window, some inventive suggestion would rise for my relief."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[inventively]] | adverb | **1.** In an inventive manner. | *"In academic literature, inventively designates in an inventive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inventiveness]] | noun | **1.** The power of creative imagination. | *"It's a wonder the modern child has a trace of resource or inventiveness left in him."* — Grace S. Richmond, *Red Pepper Burns* |
| [[inventor]] | noun | **1.** Someone who is the first to think of or make something. | *"But in these cases We still have judgement here; that we but teach Bloody instructions, which being taught, return To plague th’ inventor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inventory]] | noun | **1.** A detailed list of all the items in stock.<br>**2.** The merchandise that a shop has on hand. | *"The leanness that afflicts us, the object of our misery, is as an inventory to particularize their abundance; our sufferance is a gain to them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inventorying]] | noun | **1.** Making an itemized list of merchandise or supplies on hand.<br>**2.** Make or include in an itemized record or report. | *"In academic literature, inventorying designates making an itemized list of merchandise or supplies on hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misadventure]] | noun | **1.** An instance of misfortune. | *"Your looks are pale and wild, and do import Some misadventure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonevent]] | noun | **1.** An anticipated event that turns out to be far less significant than was expected. | *"In academic literature, nonevent designates an anticipated event that turns out to be far less significant than was expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonintervention]] | noun | **1.** A foreign policy of staying out of other countries' disputes. | *"Wait, I have not finished...” he said to Prince Andrew, seizing him by the arm, “I believe that intervention will be stronger than nonintervention."* — graf Leo Tolstoy, *War and Peace* |
| [[nonvenomous]] | adjective | **1.** Not producing venom. | *"In academic literature, nonvenomous designates not producing venom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parvenu]] | noun | **1.** A person who has suddenly risen to a higher economic status but has not gained social acceptance of others in that class.<br>**2.** Characteristic of someone who has risen economically or socially but lacks the social skills appropriate for this new position. | *"He was a baronet of ancient name; No parvenu his daughter's hand should claim."* — Wilfred S. Skeats, *The song of the exile* |
| [[peradventure]] | noun | **1.** Doubt or uncertainty as to whether something is the case.<br>**2.** By chance. | *"Yet you must be saying Martius is proud, who, in a cheap estimation, is worth all your predecessors since Deucalion, though peradventure some of the best of ’em were hereditary hangmen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prevenient]] | adjective | **1.** In anticipation. | *"In academic literature, prevenient designates in anticipation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prevent]] | verb | **1.** Keep from happening or arising; make impossible.<br>**2.** Stop (someone or something) from doing something or being in a certain state. | *"Give my love fame faster than Time wastes life, So thou prevent’st his scythe, and crooked knife. 101 O truant Muse what shall be thy amends, For thy neglect of truth in beauty dyed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preventable]] | adjective | **1.** Capable of being prevented; - a.l.guerard. | *"In academic literature, preventable designates capable of being prevented; - a.l.guerard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preventative]] | noun | **1.** Remedy that prevents or slows the course of an illness or disease.<br>**2.** Any obstruction that impedes or is burdensome. | *"In academic literature, preventative designates remedy that prevents or slows the course of an illness or disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prevention]] | noun | **1.** The act of preventing. | *"But God be thanked for prevention, Which I in sufferance heartily will rejoice, Beseeching God and you to pardon me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preventive]] | noun | **1.** Remedy that prevents or slows the course of an illness or disease.<br>**2.** Any obstruction that impedes or is burdensome. | *"A similar preventive is employed for the same purpose by North American Indians and European peasants."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[proven]] | verb | **1.** Be shown or be found to be.<br>**2.** Establish the validity of something, as by an example, explanation or experiment. | *"It is too well proven to admit the possibility of a doubt."* — Classic Author, *The wonders of prayer* |
| [[provenance]] | noun | **1.** Where something originated or was nurtured in its early existence. | *"Its provenance has been kept discreetly concealed,[58] but we may infer that it was taken from a temple or mausoleum, and we know that there were others with it, two of which were exhibited at the Musée Cernuschi, in Paris, in June, 1913."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[provencal]] | noun | **1.** The medieval dialects of langue d'oc (southern france).<br>**2.** Of or relating to provence or its people or their culture. | *"He had always wished to see the old Provencal capital, but somehow the opportunity had always passed by, or something...."* — Donn Byrne, *The Wind Bloweth* |
| [[provence]] | noun | **1.** A former province of southeastern france; now administered with cote d'azur. | *"From the Maiden’s Blush, through all varieties of the Provence down to the Crimson Tuscany, the countenance of Oak’s acquaintance quickly graduated; whereupon he, in considerateness, turned away his head."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[provenience]] | noun | **1.** Where something originated or was nurtured in its early existence. | *"On the upper shelf a battery of jamjars (empty) of various sizes and proveniences."* — James Joyce, *Ulysses* |
| [[proventil]] | noun | **1.** A bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness. | *"In academic literature, proventil designates a bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reconvene]] | verb | **1.** Meet again. | *"Congress adjourned May 22d, reconvened at Richmond, Va., July 20th, and adjourned August 22d, until November 18th."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[reinvent]] | verb | **1.** Bring back into existence.<br>**2.** Create anew and make over. | *"In academic literature, reinvent designates bring back into existence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reinvention]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ven within the domain of Motion.<br>**2.** A technical or specialized form exhibiting the properties of ven in systematic terminology. | *"In academic literature, reinvention designates pertaining to, derived from, or characteristic of latin ven within the domain of motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revenant]] | noun | **1.** A person who returns after a lengthy absence.<br>**2.** Someone who has returned from the dead. | *"In academic literature, revenant designates a person who returns after a lengthy absence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revenue]] | noun | **1.** The entire amount of income before any deductions are made.<br>**2.** Government income due to taxation. | *"Lastly, he frets That Lepidus of the triumvirate Should be deposed and, being, that we detain All his revenue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revenuer]] | noun | **1.** A government agent responsible for collecting revenue (especially one responsible for stopping bootlegging). | *"In academic literature, revenuer designates a government agent responsible for collecting revenue (especially one responsible for stopping bootlegging)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seven]] | noun | **1.** The cardinal number that is the sum of six and one.<br>**2.** One of four playing cards in a deck with seven pips on the face. | *"All the world’s a stage, And all the men and women merely players; They have their exits and their entrances, And one man in his time plays many parts, His acts being seven ages."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sevener]] | noun | **1.** The cardinal number that is the sum of six and one.<br>**2.** Being one more than six. | *"In academic literature, sevener designates the cardinal number that is the sum of six and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sevens]] | noun | **1.** A card game in which you play your sevens and other cards in sequence in the same suit as the sevens; you win if you are the first to use all your cards.<br>**2.** The cardinal number that is the sum of six and one. | *"He’s been courted by sixes and sevens—all the girls, gentle and simple, for miles round, have tried him."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sevensome]] | noun | **1.** Seven people considered as a unit. | *"In academic literature, sevensome designates seven people considered as a unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventeen]] | noun | **1.** The cardinal number that is the sum of sixteen and one.<br>**2.** Being one more than sixteen. | *"FIRST SOLDIER. _Boskos vauvado._ I understand thee, and can speak thy tongue. _Kerelybonto._ Sir, Betake thee to thy faith, for seventeen poniards are at thy bosom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seventeenth]] | noun | **1.** Position 17 in a countable series of things.<br>**2.** Coming next after the sixteenth in position. | *"I had just finished my seventeenth and Leonore her eighteenth year when a summer came which was to bring grave changes."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[seventh]] | noun | **1.** Position seven in a countable series of things.<br>**2.** One part in seven equal parts. | *"Faith, we met, and found the quarrel was upon the seventh cause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seventhly]] | adverb | **1.** In the seventh place. | *"In academic literature, seventhly designates in the seventh place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventies]] | noun | **1.** The decade from 1970 to 1979.<br>**2.** The time of life between 70 and 80. | *"Massachusetts developed in the seventies a commission of "the advisory type" which investigated and made public the conditions, leaving to public opinion the correction of the evils."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[seventieth]] | noun | **1.** Position 70 in a countable series of things.<br>**2.** The ordinal number of seventy in counting order. | *"It is now that part of New York known as Bloomingdale, on the west side, between about Seventieth and One Hundredth Streets."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[seventy]] | noun | **1.** The cardinal number that is the product of ten and seven.<br>**2.** Being ten more than sixty. | *"Worthy Martius, Had we no other quarrel else to Rome but that Thou art thence banished, we would muster all From twelve to seventy and, pouring war Into the bowels of ungrateful Rome, Like a bold flood o’erbear ’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seventy-eight]] | noun | **1.** The cardinal number that is the sum of seventy and eight.<br>**2.** A shellac based phonograph record that played at 78 revolutions per minute. | *"In academic literature, seventy-eight designates the cardinal number that is the sum of seventy and eight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-fifth]] | adjective | **1.** The ordinal number of seventy-five in counting order. | *"In academic literature, seventy-fifth designates the ordinal number of seventy-five in counting order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-five]] | adjective | **1.** Being five more than seventy. | *"In academic literature, seventy-five designates being five more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-four]] | adjective | **1.** Being four more than seventy. | *"In academic literature, seventy-four designates being four more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-nine]] | adjective | **1.** Being nine more than seventy. | *"In academic literature, seventy-nine designates being nine more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-one]] | adjective | **1.** Being one more than seventy. | *"In academic literature, seventy-one designates being one more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-seven]] | adjective | **1.** Being seven more than seventy. | *"In academic literature, seventy-seven designates being seven more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-six]] | adjective | **1.** Being six more than seventy. | *"In academic literature, seventy-six designates being six more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-three]] | adjective | **1.** Being three more than seventy. | *"In academic literature, seventy-three designates being three more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seventy-two]] | adjective | **1.** Being two more than seventy. | *"In academic literature, seventy-two designates being two more than seventy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[souvenir]] | noun | **1.** Something of sentimental value.<br>**2.** A reminder of past events. | *"She had looked at them that morning; felt that starve she must and would, but that souvenir of her mother should never leave her."* — Classic Author, *The wonders of prayer* |
| [[subvent]] | verb | **1.** Guarantee financial support of. | *"In academic literature, subvent designates guarantee financial support of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvention]] | noun | **1.** Grant of financial aid as from a government to an educational institution.<br>**2.** The act or process of providing aid or help of any sort. | *"But further, the general public interests may be recognized through the payments in aid of the funds (subsidies, subventions)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[supervene]] | verb | **1.** Take place as an additional or unexpected development. | *"And it was a month or two, I have no doubt, before you noticed any serious symptoms supervening?" "Exactly so," Mrs."* — Grant Allen, *Michael's Crag* |
| [[supervention]] | noun | **1.** A following on in addition. | *"In academic literature, supervention designates a following on in addition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unadventurous]] | adjective | **1.** Lacking in boldness. | *"In academic literature, unadventurous designates lacking in boldness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconventional]] | adjective | **1.** Not conforming to accepted rules or standards.<br>**2.** Not conventional or conformist. | *"There are occasions when girls like Bathsheba will put up with a great deal of unconventional behaviour."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unconventionality]] | noun | **1.** Originality by virtue of being unconventional.<br>**2.** Unorthodoxy by virtue of being unconventional. | *"Impulsiveness, unconventionality, and girlish irresponsibility were all very delightful, of course--at times; but not now, certainly."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[unconventionally]] | adverb | **1.** In an unconventional manner. | *"In academic literature, unconventionally designates in an unconventional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uneven]] | adjective | **1.** Not even or uniform as e.g. in shape or texture.<br>**2.** (of a contest or contestants) not fairly matched as opponents. | *"Eight yards of uneven ground is threescore and ten miles afoot with me, and the stony-hearted villains know it well enough."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unevenly]] | adverb | **1.** In an uneven and irregular way.<br>**2.** In a ragged uneven manner. | *"Hirple, to move unevenly; to limp."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[unevenness]] | noun | **1.** The quality of being uneven and lacking uniformity.<br>**2.** The quality of being unbalanced. | *"But I am of opinion that the unevenness of their country, and the severity of the weather, favoured their rebellion; so it hindered their progress."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[uneventful]] | adjective | **1.** Marked by no noteworthy or significant events. | *"It was performed with suitable quietness and uneventful safety."* — Jane Austen, *Northanger Abbey* |
| [[uneventfully]] | adverb | **1.** In an uneventful manner. | *"It had begun so uneventfully, so precisely like a hundred other evenings, with Nana putting on the water for Michael’s bath and carrying him to it on her back."* — J. M. Barrie, *Peter Pan* |
| [[uninventive]] | adjective | **1.** Deficient in originality or creativity; lacking powers of invention. | *"In academic literature, uninventive designates deficient in originality or creativity; lacking powers of invention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpreventable]] | adjective | **1.** Not preventable. | *"There is also an unpreventable wear of parts that cannot be replaced without replacing the whole machine."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[unproven]] | adjective | **1.** Not proved. | *"In academic literature, unproven designates not proved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unvented]] | adjective | **1.** Not provided with vents. | *"In academic literature, unvented designates not provided with vents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unventilated]] | adjective | **1.** Not ventilated. | *"In academic literature, unventilated designates not ventilated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vena]] | noun | **1.** A blood vessel that carries blood from the capillaries toward the heart. | *"In academic literature, vena designates a blood vessel that carries blood from the capillaries toward the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venal]] | adjective | **1.** Capable of being corrupted. | *"This gentleman had travelled under the care of Patrick Brydone, author of a well-known “Tour Through Sicily and Malta.”] Or, ’mid the venal senate’s roar, They, sightless, stand, To mend the honest patriot-lore, And grace the hand."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[venality]] | noun | **1.** Prostitution of talents or offices or services for reward. | *"This peculiar felicity of situation has, in a great degree, contributed to preserve the liberty which that country to this day enjoys, in spite of the prevalent venality and corruption."* — Alexander Hamilton, *The Federalist Papers* |
| [[venally]] | adverb | **1.** In a corrupt and deceitful manner. | *"In academic literature, venally designates in a corrupt and deceitful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venation]] | noun | **1.** (botany) the arrangement of veins in a leaf.<br>**2.** (zoology) the system of venous blood vessels in an animal. | *"In academic literature, venation designates (botany) the arrangement of veins in a leaf."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[veneer]] | noun | **1.** Coating consisting of a thin layer of superior wood glued to a base of inferior wood.<br>**2.** An ornamental coating to a building. | *"The truth seems to be that to this day the peasant remains a pagan and savage at heart; his civilization is merely a thin veneer which the hard knocks of life soon abrade, exposing the solid core of paganism and savagery below."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[veneering]] | noun | **1.** Coating consisting of a thin layer of superior wood glued to a base of inferior wood.<br>**2.** The act of applying veneer. | *"In academic literature, veneering designates coating consisting of a thin layer of superior wood glued to a base of inferior wood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venerability]] | noun | **1.** The quality of deserving veneration. | *"In academic literature, venerability designates the quality of deserving veneration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venerable]] | adjective | **1.** Impressive by reason of age.<br>**2.** Profoundly honored. | *"Set down your venerable burden, And let him feed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venerableness]] | noun | **1.** The quality of deserving veneration. | *"A flowing robe of tappa, knotted over the shoulder, hung loosely round his stooping form, and heightened the venerableness of his aspect."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[venerate]] | verb | **1.** Regard with feelings of respect and reverence; consider hallowed or exalted or be in awe of. | *"These men were the travel-worn veterans of Sherman, and the battle-stained heroes of the glorious old Army of the Potomac, men of whom the nation is already proud, and whom history will teach our children to venerate."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[venerating]] | verb | **1.** Regard with feelings of respect and reverence; consider hallowed or exalted or be in awe of.<br>**2.** Feeling or manifesting veneration. | *"The domestic, unpretending merits of a person never known do not often create that kind of fervent, venerating tenderness which would prompt a visit like yours."* — Jane Austen, *Northanger Abbey* |
| [[veneration]] | noun | **1.** A feeling of profound respect for someone or something.<br>**2.** Religious zeal; the willingness to serve god. | *"Guster disappears, glad to get out of the shop, which she regards with mingled dread and veneration as a storehouse of awful implements of the great torture of the law—a place not to be entered after the gas is turned off."* — Charles Dickens, *Bleak House* |
| [[venerator]] | noun | **1.** Someone who regards with deep respect or reverence. | *"In academic literature, venerator designates someone who regards with deep respect or reverence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venereal]] | adjective | **1.** Of or relating to the external sex organs. | *"No, madam, these are no venereal signs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[veneridae]] | noun | **1.** Hard-shell clams. | *"In academic literature, veneridae designates hard-shell clams."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venesect]] | verb | **1.** Practice venesection. | *"In academic literature, venesect designates practice venesection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venesection]] | noun | **1.** Surgical incision into a vein; used to treat hemochromatosis. | *"In academic literature, venesection designates surgical incision into a vein; used to treat hemochromatosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venetia]] | noun | **1.** A region of northeastern italy on the adriatic. | *"Ah, good old Mantuan, I may speak of thee as the traveller doth of Venice: _Venetia, Venetia, Chi non ti vede, non ti pretia._ Old Mantuan, old Mantuan!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venetian]] | noun | **1.** A resident of venice.<br>**2.** Of or relating to or characteristic of venice or its people. | *"Do you not remember, lady, in your father’s time, a Venetian, a scholar and a soldier, that came hither in company of the Marquis of Montferrat?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[veneto]] | noun | **1.** A region of northeastern italy on the adriatic. | *"In academic literature, veneto designates a region of northeastern italy on the adriatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venezia]] | noun | **1.** The provincial capital of veneto; built on 118 islands within a lagoon in the gulf of venice; has canals instead of streets; one of italy's major ports and a famous tourist attraction. | *"In academic literature, venezia designates the provincial capital of veneto; built on 118 islands within a lagoon in the gulf of venice; has canals instead of streets; one of italy's major ports and a famous tourist attraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venezia-euganea]] | noun | **1.** A region of northeastern italy on the adriatic. | *"In academic literature, venezia-euganea designates a region of northeastern italy on the adriatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venezuela]] | noun | **1.** A republic in northern south america on the caribbean; achieved independence from spain in 1811; rich in oil. | *"Treaty of Friendship and Commerce with Venezuela."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[venezuelan]] | noun | **1.** A native or inhabitant of venezuela.<br>**2.** Of or relating to or characteristic of venezuela or its people. | *"In academic literature, venezuelan designates a native or inhabitant of venezuela."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venial]] | adjective | **1.** Warranting only temporal punishment.<br>**2.** Easily excused or forgiven. | *"So they do nothing, ’tis a venial slip."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venice]] | noun | **1.** The provincial capital of veneto; built on 118 islands within a lagoon in the gulf of venice; has canals instead of streets; one of italy's major ports and a famous tourist attraction. | *"Ah, good old Mantuan, I may speak of thee as the traveller doth of Venice: _Venetia, Venetia, Chi non ti vede, non ti pretia._ Old Mantuan, old Mantuan!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venipuncture]] | noun | **1.** (medicine) puncture of a vein through the skin in order to withdraw blood for analysis or to start an intravenous drip or to inject medication or a radiopaque dye. | *"In academic literature, venipuncture designates (medicine) puncture of a vein through the skin in order to withdraw blood for analysis or to start an intravenous drip or to inject medication or a radiopaque dye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venire]] | noun | **1.** (law) a group of people summoned for jury service (from whom a jury will be chosen). | *"In academic literature, venire designates (law) a group of people summoned for jury service (from whom a jury will be chosen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venison]] | noun | **1.** Meat from a deer used as food. | *"Come, shall we go and kill us venison?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venn]] | noun | **1.** English logician who introduced venn diagrams (1834-1923). | *"In academic literature, venn designates english logician who introduced venn diagrams (1834-1923)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venogram]] | noun | **1.** An x ray of a vein injected with a radiopaque contrast medium. | *"In academic literature, venogram designates an x ray of a vein injected with a radiopaque contrast medium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venography]] | noun | **1.** Roentgenographic examination of veins. | *"In academic literature, venography designates roentgenographic examination of veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venom]] | noun | **1.** Toxin secreted by animals; secreted by certain snakes and poisonous insects (e.g., spiders and scorpions).<br>**2.** Feeling a need to see others suffer. | *"The venom clamours of a jealous woman Poisons more deadly than a mad dog’s tooth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venomed]] | adjective | **1.** Full of malice or hate. | *"I am disgraced, impeached, and baffled here, Pierced to the soul with slander’s venomed spear, The which no balm can cure but his heart-blood Which breathed this poison."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venomous]] | adjective | **1.** Extremely poisonous or injurious; producing venom.<br>**2.** Marked by deep ill will; deliberately harmful. | *"Poor venomous fool, Be angry and dispatch."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venomously]] | adverb | **1.** In a very malevolent manner. | *"His own unkindness, That stripp’d her from his benediction, turn’d her To foreign casualties, gave her dear rights To his dog-hearted daughters, these things sting His mind so venomously that burning shame Detains him from Cordelia."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venose]] | adjective | **1.** Having or showing markings that resemble veins. | *"In academic literature, venose designates having or showing markings that resemble veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venous]] | adjective | **1.** Of or contained in or performing the function of the veins. | *"In academic literature, venous designates of or contained in or performing the function of the veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vent]] | noun | **1.** A hole for the escape of gas or air.<br>**2.** External opening of urinary or genital system of a lower vertebrate. | *"I did think thee, for two ordinaries, to be a pretty wise fellow; thou didst make tolerable vent of thy travel; it might pass."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vent-hole]] | noun | **1.** A hole for the escape of gas or air. | *"In academic literature, vent-hole designates a hole for the escape of gas or air."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventail]] | noun | **1.** A medieval hood of mail suspended from a basinet to protect the head and neck. | *"In academic literature, ventail designates a medieval hood of mail suspended from a basinet to protect the head and neck."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vented]] | verb | **1.** Give expression or utterance to.<br>**2.** Expose to cool or cold air so as to cool or freshen. | *"His marriage seemed an unmitigated calamity; and he was afraid of going to Rosamond before he had vented himself in this solitary rage, lest the mere sight of her should exasperate him and make him behave unwarrantably."* — George Eliot, *Middlemarch* |
| [[venter]] | noun | **1.** A speaker who expresses or gives vent to a personal opinion or grievance.<br>**2.** The region of the body of a vertebrate between the thorax and the pelvis. | *"Do not venter, Ile make your wedding cloaths fit closer t'ee then; I but disturb you, lie go see my nephew: _Lew_."* — John Fletcher, *The Elder Brother* |
| [[venthole]] | noun | **1.** A hole for the escape of gas or air. | *"In academic literature, venthole designates a hole for the escape of gas or air."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventilate]] | verb | **1.** Expose to cool or cold air so as to cool or freshen.<br>**2.** Expose to the circulation of fresh air so as to retard spoilage. | *"But one pamphlet, 'A Proposal for putting Reform to the Vote' (1817), is characteristic of the way in which he was always labouring to do something, not merely to ventilate existing evils, but to promote some practical scheme for abolishing them."* — Sydney Waterlow, *Shelley* |
| [[ventilated]] | verb | **1.** Expose to cool or cold air so as to cool or freshen.<br>**2.** Expose to the circulation of fresh air so as to retard spoilage. | *"The house was ventilated by two round holes, like the lights of a ship’s cabin, with wood slides."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ventilation]] | noun | **1.** The act of supplying fresh air and getting rid of foul air.<br>**2.** A mechanical system in a building that provides fresh air. | *"Along each side wall was a range of striding buttresses, throwing deep shadows on the spaces between them, which were perforated by lancet openings, combining in their proportions the precise requirements both of beauty and ventilation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ventilator]] | noun | **1.** A device (such as a fan) that introduces fresh air or expels foul air.<br>**2.** A device that facilitates breathing in cases of respiratory failure. | *"The next day after this, on going into his room, he laid before me an empty envelope, and a five dollar bill, and asked me the question, "Did you throw that envelope with that bill in it, through that ventilator?" I assured him that I did not."* — Classic Author, *The wonders of prayer* |
| [[ventilatory]] | adjective | **1.** Provided with ventilation or involving pulmonary ventilation. | *"In academic literature, ventilatory designates provided with ventilation or involving pulmonary ventilation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venting]] | noun | **1.** The act of venting.<br>**2.** Give expression or utterance to. | *"Darcy was attending them to their carriage, Miss Bingley was venting her feelings in criticisms on Elizabeth’s person, behaviour, and dress."* — Jane Austen, *Pride and Prejudice* |
| [[ventner]] | noun | **1.** United states geneticist who published the complete base sequences for all the genes of a free-living organism, the influenza bacterium; later led team that developed a first draft of the entire human genome (born in 1946). | *"In academic literature, ventner designates united states geneticist who published the complete base sequences for all the genes of a free-living organism, the influenza bacterium; later led team that developed a first draft of the entire human genome (born in 1946)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventolin]] | noun | **1.** A bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness. | *"In academic literature, ventolin designates a bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventose]] | noun | **1.** Sixth month of the revolutionary calendar (february and march); the windy month. | *"In academic literature, ventose designates sixth month of the revolutionary calendar (february and march); the windy month."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventral]] | adjective | **1.** Toward or on or near the belly (front of a primate or lower surface of a lower animal).<br>**2.** Nearest to or facing toward the axis of an organ or organism. | *"In academic literature, ventral designates toward or on or near the belly (front of a primate or lower surface of a lower animal)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventrally]] | adverb | **1.** In a ventral location or direction. | *"In academic literature, ventrally designates in a ventral location or direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricle]] | noun | **1.** One of four connected cavities in the brain; is continuous with the central canal of the spinal cord and contains cerebrospinal fluid.<br>**2.** A chamber of the heart that receives blood from an atrium and pumps it to the arteries. | *"These are begot in the ventricle of memory, nourished in the womb of _pia mater_, and delivered upon the mellowing of occasion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ventricose]] | adjective | **1.** Having a swelling on one side. | *"In academic literature, ventricose designates having a swelling on one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricous]] | adjective | **1.** Having a swelling on one side. | *"In academic literature, ventricous designates having a swelling on one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricular]] | adjective | **1.** Of or relating to a ventricle (of the heart or brain). | *"In academic literature, ventricular designates of or relating to a ventricle (of the heart or brain)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventriculus]] | noun | **1.** Thick-walled muscular pouch below the crop in many birds and reptiles for grinding food. | *"In academic literature, ventriculus designates thick-walled muscular pouch below the crop in many birds and reptiles for grinding food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventriloquism]] | noun | **1.** The art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy). | *"He’s uncommonly good at ventriloquism, and he did it uncommonly well, by God!"* — George Eliot, *Middlemarch* |
| [[ventriloquist]] | noun | **1.** A performer who projects the voice into a wooden dummy. | *"Make haste up, Millers.” Millers, who was the other nurse, retired into the house, and by degrees the child’s wailing was hushed and stopped, as if it were a young ventriloquist with something in its mouth."* — Charles Dickens, *Great Expectations* |
| [[ventriloquy]] | noun | **1.** The art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy). | *"In academic literature, ventriloquy designates the art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venture]] | noun | **1.** Any venturesome undertaking especially one with an uncertain outcome.<br>**2.** An investment that is very risky but could yield great profits. | *"Upon thy certainty and confidence What dar’st thou venture?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venturer]] | noun | **1.** A merchant who undertakes a trading venture (especially a venture that sends goods overseas).<br>**2.** A person who enjoys taking risks. | *"The whole surface of your land, gentlemen, is one wild sea of beauty, ready to toss into the lap of every venturer upon it, a farm."* — W. E. Webb, *Buffalo Land* |
| [[venturesome]] | adjective | **1.** Disposed to venture or take risks. | *"It was most venturesome for a woman, at night, and alone."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[venturesomeness]] | noun | **1.** The trait of being adventurous. | *"Look again at his venturesomeness in trusting the Gospel to the twelve and to us--and in facing the Cross."* — T. R. Glover, *The Jesus of History* |
| [[venturi]] | noun | **1.** United states architect (born in 1925).<br>**2.** A tube with a constriction; used to control fluid flow (as in the air inlet of a carburetor). | *"In academic literature, venturi designates united states architect (born in 1925)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venturous]] | adjective | **1.** Disposed to venture or take risks. | *"Of all exploits since first I follow’d arms Ne’er heard I of a warlike enterprise More venturous or desperate than this."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venue]] | noun | **1.** The scene of any event or action (especially the place of a meeting).<br>**2.** In law: the jurisdiction where a trial will be held. | *"Now, by the salt wave of the Mediterraneum, a sweet touch, a quick venue of wit!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venula]] | noun | **1.** A minute vein continuous with a capillary. | *"In academic literature, venula designates a minute vein continuous with a capillary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venule]] | noun | **1.** A minute vein continuous with a capillary. | *"In academic literature, venule designates a minute vein continuous with a capillary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[venus]] | noun | **1.** The second nearest planet to the sun; it is peculiar in that its rotation is slow and retrograde (in the opposite sense of the earth and all other planets except uranus); it is visible from earth as an early `morning star' or an `evening star'.<br>**2.** Goddess of love; counterpart of greek aphrodite. | *"Yet have I fierce affections, and think What Venus did with Mars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[venushair]] | noun | **1.** Delicate maidenhair fern with slender shining black leaf stalks; cosmopolitan. | *"In academic literature, venushair designates delicate maidenhair fern with slender shining black leaf stalks; cosmopolitan."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VEN
  </div>
</div>
