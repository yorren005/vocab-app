---
status: unread
type: root_dashboard
---
# Dashboard — sever
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sever-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“strict or serious”</span>
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

The root **sever** means strict or serious. It describes strict, stern, serious, grave, austere. In English, this root forms words such as *severe*, *severely*, *severity*, and *severeness*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: strict or serious
> The root **sever** means strict or serious. It describes strict, stern, serious, grave, austere. In English, this root forms words such as *severe*, *severely*, *severity*, and *severeness*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Strict or serious</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *severe* and *severely*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sever** comes from a Latin word that means *"strict or serious"*.
  - At its core, it describes strict or serious.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **sever** in an English word, think of **human feelings and emotions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of strict or serious.
  - **Mental & Social**: How people experience, organize, or communicate about strict or serious.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Severe**: Very great, intense, or extreme in degree.
  - **Severely**: In a strict, stern, or rigorous manner.
  - **Severity**: The quality or condition of being severe.
  - **Severeness**: The quality, state, or manifestation of being severe.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sever</mark>, think of <mark class="hl-def">human feelings and emotions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sever** forms derivatives through three primary structural channels:
> - **Primary Adjectival Stem (`sever-`):** Inherited directly from *sevērus*, generating English adjectives, adverbs, and nouns of quality (*severe*, *severely*, *severity*, *severeness*).
> - **Solemn Affirmative Stem (`assever-`):** Prefixed with *ad-* (assimilated to *as-* before *s*), generating verbs, nouns, and participial adjectives of solemn declaration (*assever-ate*, *assever-ation*, *assever-ative*).
> - **Steadfast Continuative Stem (`persever-`):** Prefixed with *per-* ("thoroughly"), yielding the moral vocabulary of endurance (*persever-e*, *persever-ance*, *persever-ing*) and the clinical psychiatric vocabulary of cognitive fixation (*persever-ate*, *persever-ation*, *persever-ative*).

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
> The root spans a broad semantic range from personal virtue to meteorology and neurobiology:
> - **Harsh Intensity & Gravity:** Critical medical crises, extreme weather, economic austerity, or punitive sentencing ([[severe]], [[severely]], [[severity]], [[severeness]]).
> - **Solemn Oath & Formal Affirmation:** High-stakes sworn testimony, earnest declarations, and philosophical certitude ([[asseverate]], [[asseveration]], [[asseverator]], [[asseverative]], [[asseveratory]]).
> - **Moral Grit & Heroic Endurance:** Tenacious continuation in the face of daunting adversity and obstacle ([[persevere]], [[perseverance]], [[perseverant]], [[perseverantly]], [[persevering]], [[perseveringly]]).
> - **Clinical Neuropsychiatry & Cognitive Dysfunction:** Involuntary, obsessive repetition of behavioral or verbal outputs due to neurological impairment ([[perseverate]], [[perseveration]], [[perseverative]]).

---

## 🔀 4. Prefix & Combining Dynamics on sever

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | — | [[severe]], [[severity]] | Strict, harsh, austere, intense, or unadorned. |
| **ad-** (*as-*) | "to, toward, intensive" | [[asseverate]], [[asseveration]] | Declaring with solemn earnestness directed toward an audience. |
| **per-** | "thoroughly, through to the end" | [[persevere]], [[perseverance]] | Remaining strictly steadfast through all obstacles to the end. |
| **per-** (clinical) | "excessively, fixatedly" | [[perseverate]], [[perseveration]] | Neurological inability to disengage from a repeated response. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ity** (*-itās*) | Abstract State Noun | [[severity]] | The state, quality, or measure of being severe. |
| **-ate** (*-āre*) | Factitive Verb | [[asseverate]], [[perseverate]] | To actively make a solemn assertion or repeatedly fixate. |
| **-tion** (*-tiō*) | Noun of Action / Condition | [[asseveration]], [[perseveration]] | The act of affirming earnestly or the state of neurological fixation. |
| **-ance** (*-antia*) | Continuous Quality Noun | [[perseverance]] | The sustained character of remaining steadfast under duress. |
| **-ative** (*-ātīvus*) | Dispositional Adjective | [[asseverative]], [[perseverative]] | Pertaining to solemn assertion or repetitive cognitive behavior. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Medicine, Triage & Pathology** | [[severe]], [[severity]] | Disease severity scoring (e.g., Glasgow Coma Scale, Apache II), severe acute respiratory syndromes, and pain indexing. |
| **Neuropsychiatry & Psychology** | [[perseverate]], [[perseveration]], [[perseverative]] | Frontal lobe executive dysfunction, Wisconsin Card Sorting Test errors, autism spectrum behavioral repetition, and dementia. |
| **Law, Courts & Jurisprudence** | [[asseverate]], [[asseveration]], [[severity]] | Sworn witness depositions, severity of criminal sentencing, and mitigating vs. aggravating statutory provisions. |
| **History, Ethics & Space Exploration** | [[persevere]], [[perseverance]] | NASA's Mars *Perseverance* rover, historical accounts of monastic asceticism, and moral fortitude through persecution. |
| **Meteorology & Climate Science** | [[severe]], [[severity]] | Severe thunderstorm watches, severe blizzard warnings, and hurricane category impact assessments. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[asseverate]] | verb | **1.** State categorically. | *"I should not for instance have been able to asseverate to my friend that I was certain—which was so much to the good—that _I_ at least had not betrayed myself."* — Henry James, *The Turn of the Screw* |
| [[asseveration]] | noun | **1.** A declaration that is made emphatically (as if no supporting evidence were necessary). | *"Dollop became more and more convinced by her own asseveration, that Dr."* — George Eliot, *Middlemarch* |
| [[asseverator]] | noun | **1.** Someone who claims to speak the truth. | *"In academic literature, asseverator designates someone who claims to speak the truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissever]] | verb | **1.** Separate into parts or portions. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perseverance]] | noun | **1.** Persistent determination.<br>**2.** The act of persisting or persevering; continuing or repeating behavior. | *"Perseverance, dear my lord, Keeps honour bright."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perseverate]] | verb | **1.** Psychology: repeat a response after the cessation of the original stimulus. | *"In academic literature, perseverate designates psychology: repeat a response after the cessation of the original stimulus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perseveration]] | noun | **1.** The tendency for a memory or idea to persist or recur without any apparent stimulus for it.<br>**2.** The act of persisting or persevering; continuing or repeating behavior. | *"In academic literature, perseveration designates the tendency for a memory or idea to persist or recur without any apparent stimulus for it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[persevere]] | verb | **1.** Be persistent, refuse to stop. | *"Tess still stood hesitating like a bather about to make his plunge, hardly knowing whether to retreat or to persevere, when a figure came forth from the dark triangular door of the tent."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[persevering]] | verb | **1.** Be persistent, refuse to stop.<br>**2.** Quietly and steadily persevering especially in detail or exactness. | *"But the doomed young rebel (otherwise a mild youth, and very persevering), showing no sign of grace as he got older but, on the contrary, constructing a model of a power-loom, she was fain, with many tears, to mention his backslidings to the baronet."* — Charles Dickens, *Bleak House* |
| [[perseveringly]] | adverb | **1.** With perseverance. | *"She was by that time perseveringly dictating to Caddy, and Caddy was fast relapsing into the inky condition in which we had found her."* — Charles Dickens, *Bleak House* |
| [[sever]] | verb | **1.** Set or keep apart.<br>**2.** Cut off from a whole. | *"Thus have you heard me sever’d from my bliss, That by misfortunes was my life prolong’d To tell sad stories of my own mishaps."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severable]] | adjective | **1.** Capable of being divided or dissociated. | *"In academic literature, severable designates capable of being divided or dissociated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[several]] | adjective | **1.** (used with count nouns) of an indefinite number more than 2 or 3 but not many.<br>**2.** Considered individually. | *"Why should my heart think that a several plot, Which my heart knows the wide world’s common place?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[several-seeded]] | adjective | **1.** Having many seeds. | *"In academic literature, several-seeded designates having many seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severalise]] | verb | **1.** Distinguish or separate.<br>**2.** Mark as different. | *"In academic literature, severalise designates distinguish or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severalize]] | verb | **1.** Distinguish or separate.<br>**2.** Mark as different. | *"In academic literature, severalize designates distinguish or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severally]] | adverb | **1.** Apart from others. | *"Haste you again. [_Exeunt severally._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severalty]] | noun | **1.** The state of being several and distinct.<br>**2.** Exclusive individual ownership. | *"In academic literature, severalty designates the state of being several and distinct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severance]] | noun | **1.** A personal or social separation (as between opposing factions).<br>**2.** The act of severing. | *"She had sighed for her self-completeness then, and now she cried aloud against the severance of the union she had deplored."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[severe]] | adjective | **1.** Intensely or extremely bad or unpleasant in degree or quality.<br>**2.** Very strong or vigorous. | *"And then the justice, In fair round belly with good capon lined, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severed]] | verb | **1.** Set or keep apart.<br>**2.** Cut off from a whole. | *"Our force by land Hath nobly held; our severed navy too Have knit again, and fleet, threat’ning most sea-like."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severely]] | adverb | **1.** To a severe or serious degree.<br>**2.** With sternness; in a severe manner. | *"The King is not himself, but basely led By flatterers; and what they will inform, Merely in hate ’gainst any of us all, That will the King severely prosecute ’Gainst us, our lives, our children, and our heirs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severeness]] | noun | **1.** Used of the degree of something undesirable e.g. pain or weather.<br>**2.** Something hard to endure. | *"In academic literature, severeness designates used of the degree of something undesirable e.g. pain or weather."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severing]] | noun | **1.** The act of severing.<br>**2.** Set or keep apart. | *"Much better She ne’er had known pomp; though’t be temporal, Yet if that quarrel, Fortune, do divorce It from the bearer, ’tis a sufferance panging As soul and body’s severing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severity]] | noun | **1.** Used of the degree of something undesirable e.g. pain or weather.<br>**2.** Something hard to endure. | *"He hath resisted law, And therefore law shall scorn him further trial Than the severity of the public power Which he so sets at naught."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severn]] | noun | **1.** A river in ontario that flows northeast into hudson bay.<br>**2.** A river in england and wales flowing into the bristol channel; the longest river in great britain. | *"Leave not the worthy Lucius, good my lords, Till he have cross’d the Severn."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · SEVER
  </div>
</div>
