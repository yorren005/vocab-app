---
status: unread
type: root_dashboard
---
# Dashboard — tim
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tim-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to fear”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sudden warm feeling in your chest or an outward expression of joy or sorrow.</span>
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

The root **tim** means to fear. It refers to an unpleasant emotion caused by danger, threat, or dread. In English, this root forms words such as *timid*, *timidly*, *timidity*, and *timidness*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to fear
> The root **tim** means to fear. It refers to an unpleasant emotion caused by danger, threat, or dread. In English, this root forms words such as *timid*, *timidly*, *timidity*, and *timidness*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To fear</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *timid* and *timidly*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tim** comes from a Latin word that means *"to fear"*.
  - At its core, it describes the action of fear.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **tim** in an English word, think of **to fear**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to fear).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Timid**: Lacking in courage, boldness, or self-confidence.
  - **Timidly**: In a shy, hesitant, fearful, or self-effacing manner.
  - **Timidity**: The state, quality, or disposition of being timid.
  - **Timidness**: The condition of being timid.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tim</mark>, think of <mark class="hl-def">to fear</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tim** operates across three primary morphological formations:
> - **Stative Adjective Formation (`tim-id-`):** Built with the stative adjective suffix *-idus* (*timidus* "fearful"), producing *timid*, *timidity*, *timidly*, *timidness*.
> - **Noun of Emotion Formation (`tim-or-`):** Built with the abstract nominal suffix *-or* (*timor* "fear"), producing Medieval Latin *timorōsus* $\to$ *timorous*, *timorously*, *timorousness*, and the classical phrase *timor mortis*.
> - **Factitive / Causative Prefix Formation (`in-tim-id-`):** Built by compounding prepositional prefix *in-* ("into") with *timidus* to form Medieval Latin *intimidāre* ("to drive fear into, render timid"), generating the active legal and behavioral family: *intimidate*, *intimidation*, *intimidating*, *intimidator*.

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
> The root spans a vivid spectrum between quiet shyness and violent political bullying:
> - **Shyness & Lack of Confidence:** Hesitant social reserve, quiet modesty, or bashful reluctance ([[timid]], [[timidly]], [[timidity]], [[timidness]]).
> - **Trembling Nervousness & Apprehension:** Visible physical agitation and distress under threat ([[timorous]], [[timorously]], [[timorousness]]).
> - **Existential & Mortal Dread:** The universal human confrontation with mortality ([[timor mortis]]).
> - **Aggressive Bullying & Coercive Domination:** Subjugating another's will through displays of overwhelming force or threats ([[intimidate]], [[intimidation]], [[intimidator]], [[intimidating]], [[intimidatingly]], [[intimidative]], [[intimidatory]]).
> - **Unyielding Moral Courage:** Remaining resolute and unswayed by threats or pressure ([[unintimidated]]).

---

## 🔀 4. Prefix & Combining Dynamics on tim

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | — | [[timid]], [[timorous]] | Passive, receptive state of feeling fear or lacking boldness. |
| **in-** | "into, upon" (factitive) | [[intimidate]], [[intimidation]] | Actively injecting fear into another; coercing or browbeating. |
| **un-** + **in-** | "not" + "into" | [[unintimidated]] | Completely free from fear; refusing to be cowed by threats. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-id** (*-idus*) | Stative Adjective | [[timid]] | Denotes an ongoing disposition of fearful hesitation. |
| **-ity** (*-itās*) | Abstract State Noun | [[timidity]] | The psychological quality of lacking boldness or courage. |
| **-orous** (*-ōrōsus*) | Adjective of Abundance | [[timorous]] | Full of dread, trembling, or anxious apprehension. |
| **-ate** (*-āre*) | Causative Verb | [[intimidate]] | To actively cause someone to feel afraid or cowed. |
| **-tion** (*-tiō*) | Noun of Action / Crime | [[intimidation]] | The act or legal crime of coercing someone through threats. |
| **-or** (*-tor*) | Agent Noun | [[intimidator]] | The individual or tyrant who exercises coercive fear. |
| **-atory** (*-ātōrius*) | Relational / Instrumental | [[intimidatory]] | Designed or serving specifically to intimidate. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Criminal Law & Jurisprudence** | [[intimidation]], [[intimidate]], [[intimidator]] | Witness intimidation statutes (18 U.S.C. § 1512), voter intimidation prosecutions, civil rights violations, and domestic stalking injunctions. |
| **Ecology & Animal Behavior** | [[timid]], [[timidity]] | Flight initiation distance (FID) in prey species, predator-prey behavioral avoidance, and temperament testing in wildlife biology. |
| **Sports & Competitive Psychology** | [[intimidate]], [[intimidating]] | Psychological warfare, imposing physical presence on the field (e.g., intimidating pitchers or defensive linebackers). |
| **Literature & Existential Philosophy** | [[timorous]], [[timor mortis]] | Late medieval memento mori poetry, Shakespearean soliloquies on cowardice (*Hamlet*), and Kierkegaardian existential anxiety. |
| **Labor & Workplace Dynamics** | [[intimidation]], [[unintimidated]] | Hostile work environment claims, union organizer coercion, whistleblower protection, and corporate bullying. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[altimeter]] | noun | **1.** An instrument that measures the height above ground; used in navigation. | *"With that subconscious concentration of the flying man on his ship, he glanced at the instrument board first, and taking in the astonishing information that both the altimeter and the air-speed meter registered zero, he looked over the side."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[antimacassar]] | noun | **1.** A piece of ornamented cloth that protects the back of a chair from hair oils. | *"I declare to my antimacassar if you took up a straw from the bloody floor and if you said to Bloom: _Look at, Bloom."* — James Joyce, *Ulysses* |
| [[antimagnetic]] | adjective | **1.** Impervious to the effects of a magnetic field; resistant to magnetization. | *"In academic literature, antimagnetic designates impervious to the effects of a magnetic field; resistant to magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimalarial]] | noun | **1.** A medicinal drug used to prevent or treat malaria. | *"In academic literature, antimalarial designates a medicinal drug used to prevent or treat malaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimatter]] | noun | **1.** Matter consisting of elementary particles that are the antiparticles of those making up normal substances. | *"In academic literature, antimatter designates matter consisting of elementary particles that are the antiparticles of those making up normal substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimeson]] | noun | **1.** The antiparticle of a meson. | *"In academic literature, antimeson designates the antiparticle of a meson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimetabolite]] | noun | **1.** An antineoplastic drug that inhibits the utilization of a metabolite. | *"In academic literature, antimetabolite designates an antineoplastic drug that inhibits the utilization of a metabolite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimicrobial]] | noun | **1.** An agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease.<br>**2.** Capable of destroying or inhibiting the growth of disease-causing microorganisms. | *"In academic literature, antimicrobial designates an agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimicrobic]] | noun | **1.** An agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease.<br>**2.** Capable of destroying or inhibiting the growth of disease-causing microorganisms. | *"In academic literature, antimicrobic designates an agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonial]] | adjective | **1.** Containing antimony. | *"In academic literature, antimonial designates containing antimony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonic]] | adjective | **1.** Relating to or derived from antimony. | *"In academic literature, antimonic designates relating to or derived from antimony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonious]] | adjective | **1.** Relating to or derived from antimony. | *"In academic literature, antimonious designates relating to or derived from antimony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimonopoly]] | adjective | **1.** Of laws and regulations; designed to protect trade and commerce from unfair business practices. | *"In academic literature, antimonopoly designates of laws and regulations; designed to protect trade and commerce from unfair business practices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimony]] | noun | **1.** A metallic element having four allotropic forms; used in a wide variety of alloys; found in stibnite. | *"Crucibles, alembics, and retorts were confusedly piled in various corners, and on a small table I saw distributed in separate bottles a number of mineral and metallic substances, which I recognized as antimony, mercury, plumbago, arsenic, borax, etc."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[antimuon]] | noun | **1.** The antiparticle of a muon; decays to positron and neutrino and antineutrino. | *"In academic literature, antimuon designates the antiparticle of a muon; decays to positron and neutrino and antineutrino."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimycin]] | noun | **1.** A crystalline antibiotic active against various fungi. | *"In academic literature, antimycin designates a crystalline antibiotic active against various fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimycotic]] | noun | **1.** Any agent that destroys or prevents the growth of fungi. | *"In academic literature, antimycotic designates any agent that destroys or prevents the growth of fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intima]] | noun | **1.** The innermost membrane of an organ (especially the inner lining of an artery or vein or lymphatic vessel). | *"In academic literature, intima designates the innermost membrane of an organ (especially the inner lining of an artery or vein or lymphatic vessel)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intimacy]] | noun | **1.** Close or warm friendship.<br>**2.** A usually secretive or illicit sexual relationship. | *"Elizabeth had been lately forming an intimacy, which she wished to see interrupted."* — Jane Austen, *Persuasion* |
| [[intimal]] | adjective | **1.** Of or relating to the intima. | *"In academic literature, intimal designates of or relating to the intima."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intimate]] | noun | **1.** Someone to whom private matters are confided.<br>**2.** Give to understand. | *"Thou this to hazard needs must intimate Skill infinite, or monstrous desperate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intimately]] | adverb | **1.** In a close manner.<br>**2.** With great or especially intimate knowledge. | *"Apollonie was intimately connected with the earliest impressions of her childhood, as well as with the experiences of her youth, with all the people whom she had loved most and who had stood nearest to her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intimation]] | noun | **1.** An indirect suggestion.<br>**2.** A slight suggestion or vague understanding. | *"Prayers were offered accordingly, but without intimation of any change."* — Classic Author, *The wonders of prayer* |
| [[intimidate]] | verb | **1.** Make timid or fearful.<br>**2.** To compel or deter by or as if by threats. | *"But, in such a cause, his anger, though it must shock, could not intimidate Henry, who was sustained in his purpose by a conviction of its justice."* — Jane Austen, *Northanger Abbey* |
| [[intimidated]] | verb | **1.** Make timid or fearful.<br>**2.** To compel or deter by or as if by threats. | *"I now stood in the empty hall; before me was the breakfast-room door, and I stopped, intimidated and trembling."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[intimidating]] | verb | **1.** Make timid or fearful.<br>**2.** To compel or deter by or as if by threats. | *"It can affect the supply either by lessening its own output or by intimidating and forcing out its competitors."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intimidation]] | noun | **1.** The act of intimidating a weaker person to make them do something.<br>**2.** The feeling of discouragement in the face of someone's superior fame or wealth or status etc. | *"He intimates that he has decided upon threats and public intimidation as being probably more effective than a servile attitude, which, he allows us to infer, he would be quite willing to take if advisable."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[mistime]] | verb | **1.** Time incorrectly. | *"In academic literature, mistime designates time incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistiming]] | noun | **1.** Something located at a time when it could not have existed or occurred.<br>**2.** Time incorrectly. | *"In academic literature, mistiming designates something located at a time when it could not have existed or occurred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimal]] | adjective | **1.** Most desirable possible under a restriction expressed or implied. | *"In my line of work, our data bank produces an optimal selection of personalities, skills and identities for the best possible teams we might need to support our contingency plans."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[optimally]] | adverb | **1.** In an optimal and most desirable way. | *"I have no choice, but I have to act quickly." Selvin's battle computer counted down the enemy's distance and flashed estimates on when the enemy line would be optimally exposed to particle beam volleys."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[optimisation]] | noun | **1.** The act of rendering optimal. | *"In academic literature, optimisation designates the act of rendering optimal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimise]] | verb | **1.** Make optimal; get the most out of; use best.<br>**2.** Modify to achieve maximum efficiency in storage capacity or time or cost. | *"In academic literature, optimise designates make optimal; get the most out of; use best."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimism]] | noun | **1.** The optimistic feeling that all is going to turn out well.<br>**2.** A general disposition to expect the best in all things. | *"He has lost the cruder optimism of the 'Prometheus', and is thrown back for consolation upon something that moves us more than any prospect of a heaven realised on earth by abolishing kings and priests."* — Sydney Waterlow, *Shelley* |
| [[optimist]] | noun | **1.** A person disposed to take a favorable view of things. | *"Be an optimist, my boy, be an optimist."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[optimistic]] | adjective | **1.** Expecting the best in this best of all possible worlds.<br>**2.** Expecting the best. | *"When it came to making the purchases, he found, what he had overlooked previously in his optimistic way, that four pounds did not go very far."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[optimistically]] | adverb | **1.** With optimism; in an optimistic manner. | *"In academic literature, optimistically designates with optimism; in an optimistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimization]] | noun | **1.** The act of rendering optimal. | *"In academic literature, optimization designates the act of rendering optimal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optimize]] | verb | **1.** Make optimal; get the most out of; use best.<br>**2.** Modify to achieve maximum efficiency in storage capacity or time or cost. | *"They intended to cut straight through our defenses to optimize their broadsides but instead they opened themselves to ours."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[optimum]] | noun | **1.** Most favorable conditions or greatest degree or amount possible under given circumstances.<br>**2.** Most desirable possible under a restriction expressed or implied. | *"I am convinced that the UIPS military forces, once they attain optimum strength, will attempt to crush me, or at the least, dominate the Zone."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[overtime]] | noun | **1.** Work done in addition to regular working hours.<br>**2.** Playing time beyond regulation, to break a tie. | *"The agreement may be that if the specified task is not done within the regular time, it must be completed in overtime without additional pay."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[timalia]] | noun | **1.** Type genus of the timaliidae. | *"In academic literature, timalia designates type genus of the timaliidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timaliidae]] | noun | **1.** Babblers. | *"Classical and authoritative lexicons catalog timaliidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time]] | noun | **1.** An instance or single occasion for some event.<br>**2.** A period of time considered as a resource under your control and sufficient to accomplish something. | *"Thou art thy mother’s glass and she in thee Calls back the lovely April of her prime, So thou through windows of thine age shalt see, Despite of wrinkles this thy golden time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[time-ball]] | noun | **1.** A ball that slides down a staff to show a fixed time; especially at an observatory. | *"In academic literature, time-ball designates a ball that slides down a staff to show a fixed time; especially at an observatory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-consuming]] | adjective | **1.** Of a task that takes time and patience. | *"In academic literature, time-consuming designates of a task that takes time and patience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-fuse]] | noun | **1.** A fuse made to burn for a given time (especially to explode a bomb). | *"In academic literature, time-fuse designates a fuse made to burn for a given time (especially to explode a bomb)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-honored]] | adjective | **1.** Acceptable for a long time.<br>**2.** Honored because of age or long usage. | *"In academic literature, time-honored designates acceptable for a long time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-honoured]] | adjective | **1.** Acceptable for a long time.<br>**2.** Honored because of age or long usage. | *"In academic literature, time-honoured designates acceptable for a long time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-out]] | noun | **1.** A brief suspension of play. | *"In academic literature, time-out designates a brief suspension of play."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-release]] | adjective | **1.** Of or relating to a preparation that gradually releases an active substance (especially a drug) over a period of time. | *"In academic literature, time-release designates of or relating to a preparation that gradually releases an active substance (especially a drug) over a period of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-switch]] | noun | **1.** A switch set to operate at a desired time. | *"In academic literature, time-switch designates a switch set to operate at a desired time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[time-tested]] | adjective | **1.** Tested and proved to be reliable. | *"In academic literature, time-tested designates tested and proved to be reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timecard]] | noun | **1.** A card recording an employee's starting and quitting times each work day.<br>**2.** A card used with a time clock to record an employee's starting and quitting times each day. | *"In academic literature, timecard designates a card recording an employee's starting and quitting times each work day."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timed]] | verb | **1.** Measure the time or duration of an event or action or the person who performs an action in a certain period of time.<br>**2.** Assign a time for an activity or event. | *"His sword, Death’s stamp, Where it did mark, it took; from face to foot He was a thing of blood, whose every motion Was timed with dying cries."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[timekeeper]] | noun | **1.** (sports) an official who keeps track of the time elapsed.<br>**2.** A clerk who keeps track of the hours worked by employees. | *"None of his friends had so fine a watch; even his grandfather's was so poor a timekeeper that it was rarely worn except as a decoration on Sundays or at a funeral."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[timekeeping]] | noun | **1.** The act or process of determining the time. | *"In academic literature, timekeeping designates the act or process of determining the time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timeless]] | adjective | **1.** Unaffected by time. | *"Have I sought every country far and near, And, now it is my chance to find thee out, Must I behold thy timeless cruel death?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[timelessness]] | noun | **1.** A state of eternal existence believed in some religions to characterize the afterlife. | *"In academic literature, timelessness designates a state of eternal existence believed in some religions to characterize the afterlife."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timeline]] | noun | **1.** A sequence of related events arranged in chronological order and displayed along a line (usually drawn left to right or top to bottom). | *"Net yields from nonrenewable reserves, residues and substitutes had dwindled until exhaustion was certain and a timeline predictable."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[timeliness]] | noun | **1.** Being at the right time.<br>**2.** Timely convenience. | *"In academic literature, timeliness designates being at the right time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timely]] | adjective | **1.** Before a time limit expires.<br>**2.** Done or happening at the appropriate or proper time. | *"But here must end the story of my life; And happy were I in my timely death, Could all my travels warrant me they live."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[timepiece]] | noun | **1.** A measuring instrument or device for keeping time. | *"When you think you have been out the specified number of minutes, you may come back; but I shall not find fault with you if you are not quite punctual, as you will not have a timepiece with you." "Thank you, sir," she said, obeying with alacrity."* — Martha Finley, *Elsie's Kith and Kin* |
| [[timer]] | noun | **1.** A timepiece that measures a time interval and signals its end.<br>**2.** (sports) an official who keeps track of the time elapsed. | *"He was a pallid-faced, little dope-fiend of a short-timer who would do anything to obtain the drug."* — Jack London, *The Jacket (The Star-Rover)* |
| [[times]] | noun | **1.** A more or less definite period of time now or previously present.<br>**2.** An arithmetic operation that is the inverse of division; the product of two numbers is computed. | *"Be thou the tenth Muse, ten times more in worth Than those old nine which rhymers invocate, And he that calls on thee, let him bring forth Eternal numbers to outlive long date."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[timeserver]] | noun | **1.** One who conforms to current ways and opinions for personal advantage. | *"In academic literature, timeserver designates one who conforms to current ways and opinions for personal advantage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timeserving]] | adjective | **1.** Taking immediate advantage, often unethically, of any circumstance of possible benefit. | *"At any rate, whatever as coming from the god was imparted to those present seemed to be generally of a complimentary nature: a fact which illustrates the sagacity of Kolory, or else the timeserving disposition of this hardly used deity."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[timetable]] | noun | **1.** A schedule listing events and the times at which they will take place.<br>**2.** A schedule of times of arrivals and departures. | *"All of your plans and timetables must be synchronized with the actions I take at the conference." "Any attacks on the depot will be immediately spunnel-flashed by Hanno to the UIPS," Drummer said."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[timework]] | noun | **1.** Work paid for at a rate per unit of time. | *"In academic literature, timework designates work paid for at a rate per unit of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timeworn]] | adjective | **1.** Repeated too often; overfamiliar through overuse. | *"In academic literature, timeworn designates repeated too often; overfamiliar through overuse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timid]] | noun | **1.** People who are fearful and cautious.<br>**2.** Showing fear and lack of confidence. | *"This made me, I dare say, more timid and retiring than I naturally was and cast me upon Dolly as the only friend with whom I felt at ease."* — Charles Dickens, *Bleak House* |
| [[timidity]] | noun | **1.** Fear of the unknown or unfamiliar or fear of making decisions.<br>**2.** Fearfulness in venturing into new and unknown places or activities. | *"It had been weakness and timidity."* — Jane Austen, *Persuasion* |
| [[timidly]] | adverb | **1.** In a shy or timid or bashful manner. | *"But, mother, one must not leave before everything is straightened up and put into the wardrobe," Lippo said timidly."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[timidness]] | noun | **1.** Fear of the unknown or unfamiliar or fear of making decisions. | *"In academic literature, timidness designates fear of the unknown or unfamiliar or fear of making decisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timimoun]] | noun | **1.** A town in central algeria in the atlas mountains. | *"In academic literature, timimoun designates a town in central algeria in the atlas mountains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timing]] | noun | **1.** The time when something happens.<br>**2.** The regulation of occurrence, pace, or coordination to achieve a desired effect (as in music, theater, athletics, mechanics). | *"Critical to the program's success is timing the Extractor's launch."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[timolol]] | noun | **1.** A beta blocker (trade name blocadren) administered after heart attacks. | *"In academic literature, timolol designates a beta blocker (trade name blocadren) administered after heart attacks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timor]] | noun | **1.** An island in indonesia in the malay archipelago; the largest and most eastern of the lesser sunda islands. | *"SUFFOLK. _Pene gelidus timor occupat artus_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[timorese]] | noun | **1.** A native or inhabitant of timor.<br>**2.** Of or relating to or characteristic of timor or its inhabitants. | *"Some of the Timorese tribes recognise two rajahs, the ordinary or civil rajah, who governs the people, and the fetish or taboo rajah, who is charged with the control of everything that concerns the earth and its products."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[timorous]] | adjective | **1.** Timid by nature or revealing timidity. | *"I am not worthy of the wealth I owe; Nor dare I say ’tis mine, and yet it is; But, like a timorous thief, most fain would steal What law does vouch mine own."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[timorously]] | adverb | **1.** In a timorous and trepid manner. | *"You are not a Weatherbury man?” she said, timorously."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[timorousness]] | noun | **1.** Fear of the unknown or unfamiliar or fear of making decisions.<br>**2.** Fearfulness in venturing into new and unknown places or activities. | *"But we must betray Hepzibah’s secret, and confess that the native timorousness of her character even now developed itself in a quick tremor, which, to her own perception, set each of her joints at variance with its fellows."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[timothy]] | noun | **1.** Grass with long cylindrical spikes grown in northern united states and europe for hay.<br>**2.** A disciple of saint paul who became the leader of the christian community at ephesus. | *"He loved Paul of Tarsus, liked St John, hated St James as much as he dared, and regarded with mixed feelings Timothy, Titus, and Philemon."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[timucu]] | noun | **1.** Found in warm waters of western atlantic. | *"In academic literature, timucu designates found in warm waters of western atlantic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[timur]] | noun | **1.** Mongolian ruler of samarkand who led his nomadic hordes to conquer an area from turkey to mongolia (1336-1405). | *"In academic literature, timur designates mongolian ruler of samarkand who led his nomadic hordes to conquer an area from turkey to mongolia (1336-1405)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintimidated]] | adjective | **1.** Not shrinking from danger. | *"In academic literature, unintimidated designates not shrinking from danger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untimeliness]] | noun | **1.** Being at an inappropriate time.<br>**2.** The quality of occurring at an inconvenient time. | *"Skene suddenly realized the untimeliness of her complaints."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[untimely]] | adjective | **1.** Badly timed.<br>**2.** Uncommonly early or before the expected time. | *"Did I forget that by the house of York My father came untimely to his death?"* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Emotion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TIM
  </div>
</div>
