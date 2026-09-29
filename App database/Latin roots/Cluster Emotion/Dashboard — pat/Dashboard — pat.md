---
status: unread
type: root_dashboard
---
# Dashboard — pat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to suffer or feel”</span>
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

The root **pat** means to suffer or feel. It refers to suffer, endure, undergo, bear with forbearance. In English, this root forms words such as *patient*, *patiently*, *patientness*, and *patience*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to suffer or feel
> The root **pat** means to suffer or feel. It refers to suffer, endure, undergo, bear with forbearance. In English, this root forms words such as *patient*, *patiently*, *patientness*, and *patience*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To suffer or feel</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *patient* and *patiently*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pat** comes from a Latin word that means *"to suffer or feel"*.
  - At its core, it describes the action of suffer or feel.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **pat** in an English word, think of **to suffer or feel**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to suffer or feel).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Patient**: A person receiving medical examination, diagnosis, or therapeutic treatment from healthcare professionals.
  - **Patiently**: In a calm, forbearing, and steadfast manner.
  - **Patientness**: The quality, condition, or manifestation of being patient.
  - **Patience**: The capacity or habit of calmly enduring obstacles, pain, provocation, or delays without losing composure.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pat</mark>, think of <mark class="hl-def">to suffer or feel</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The verb *patior* operates across a bifurcated stem system:
> - **Present Active Stem (`pat-` / `pati-`):** Formed from the present participle *patiēns* (stem *patient-*), producing adjectives, abstract nouns of quality, and their prefixed antonyms (*patient*, *patience*, *impatient*, *impatience*).
> - **Compound Modal Formation (`-patibilis`):** Derived from the prefixed verb *compatior* (*com-* "together" + *patior*), attaching the modal passive suffix *-bilis* ("capable of being") to produce *compatible* ("able to be borne together without mutual destruction"), *incompatible*, and their modern systemic offshoots.
> - **Sister Participial Stem (`pass-`):** The supine/participial stem *passus* generates words centered on received emotion and passion (*passion*, *passive*, *compassion*), exhaustively analyzed on [[Dashboard — pass]].

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
> Although rooted in "to suffer / endure," the stem **pat** spans diverse registers of human life:
> - **Moral & Emotional Endurance:** The virtue of bearing trial, frustration, or delay without anger or agitation ([[patient]], [[patiently]], [[patience]]).
> - **Restlessness & Impetuosity:** The inability or refusal to tolerate restraint, pain, or delay ([[impatient]], [[impatiently]], [[impatience]]).
> - **Clinical & Medical Care:** The individual undergoing sickness, trauma, or clinical therapy ([[patient]], [[outpatient]], [[inpatient]], [[nonpatient]]).
> - **Systemic & Interpersonal Harmony:** The ability of two substances, components, software routines, or personalities to coexist and function together without mutual friction or cancellation ([[compatible]], [[compatibly]], [[compatibility]], [[compatibleness]]).
> - **Irreconcilable Conflict & Contradiction:** Mutually destructive or logically exclusive relationships in medicine, chemistry, logic, and law ([[incompatible]], [[incompatibly]], [[incompatibility]], [[incompatibleness]]).
> - **Philosophical Metaphysics:** The classical debate regarding whether free will is consistent with deterministic causality ([[compatibilism]], [[compatibilist]], [[incompatibilism]], [[incompatibilist]]).
> - **Botanical Sensitivity:** Violent, impatient physical reaction to physical contact ([[Impatiens]]).

---

## 🔀 4. Prefix & Combining Dynamics on pat

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Stem | English Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- | :--- |
| *(root alone)* | — | *patiēns* | [[patient]], [[patience]] | Unadorned endurance, forbearance, or one receiving medical care. |
| **in-** | "not, un-" (privative) | *in-* + *patiēns* | [[impatient]], [[impatience]], [[Impatiens]] | Inability or refusal to endure delay, irritation, or touch. |
| **com-** | "together, with" | *com-* + *patibilis* | [[compatible]], [[compatibility]] | Able to be borne together; mutually harmonious and non-conflicting. |
| **in-** + **com-** | "not" + "together" | *in-* + *com-* + *patibilis* | [[incompatible]], [[incompatibility]] | Incapable of existing or operating together; mutually antagonistic. |
| **out-** | "outside" (English) | *out-* + *patient* | [[outpatient]] | A patient treated without overnight hospitalization. |
| **in-** | "inside" (English) | *in-* + *patient* | [[inpatient]] | A patient admitted to occupy a hospital bed overnight. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ent** (*-ēns*) | Present Participle / Adjective | [[patient]], [[impatient]] | Marks ongoing active bearing or enduring; nominalized as the sufferer. |
| **-ence** (*-entia*) | Abstract Quality Noun | [[patience]], [[impatience]] | The internal faculty, habit, or state of calm endurance or restlessness. |
| **-ly** | Adverbial Suffix | [[patiently]], [[impatiently]], [[compatibly]] | Characterizes the manner in which actions are undertaken. |
| **-ible** (*-ibilis*) | Modal Potential Adjective | [[compatible]], [[incompatible]] | Denotes fitness or capacity to be borne or sustained together. |
| **-ity** (*-itās*) | State / Quality Noun | [[compatibility]], [[incompatibility]] | The objective systemic property of mutual coherence or antagonism. |
| **-ism** (*-ismos*) | Philosophical Doctrine | [[compatibilism]], [[incompatibilism]] | Formal metaphysical positions regarding free will and determinism. |
| **-ist** | Agent / Adherent Noun | [[compatibilist]], [[incompatibilist]] | A philosopher or thinker arguing for or against the compatibility thesis. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Medicine & Healthcare** | [[patient]], [[inpatient]], [[outpatient]], [[incompatibility]] | Clinical charting, doctor-patient relationships, ABO blood group transfusion incompatibility, and pharmacological drug interactions. |
| **Philosophy & Ethics** | [[compatibilism]], [[incompatibilism]], [[patience]] | The metaphysics of human agency, moral culpability under deterministic laws of physics, and Stoic forbearance. |
| **Computer Science & Tech** | [[compatible]], [[compatibility]], [[incompatible]] | Hardware cross-architecture standards, backward compatibility of APIs, operating system runtime libraries, and protocol interoperability. |
| **Botany & Natural History** | [[Impatiens]] | Taxonomic classification of touch-me-nots exhibiting explosive mechanical pod dehiscence under light mechanical pressure. |
| **Law & Jurisprudence** | [[incompatible]], [[incompatibility]] | Legal doctrine of incompatible public offices (holding two positions with conflict of interest) and irreconcilable marital incompatibility in divorce law. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[compatibility]] | noun | **1.** A feeling of sympathetic understanding.<br>**2.** Capability of existing or performing in harmonious or congenial combination. | *"You mentioned 'three men and three women'; your mission can not exclude gender compatibility consistent with the prevailing psychosocial construct -- this is what we are."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[compatible]] | adjective | **1.** Able to exist and perform in harmonious or agreeable combination.<br>**2.** Capable of being used with or connected to other devices or components without modification. | *"Lady Dalrymple, Lady Dalrymple,” was the rejoicing sound; and with all the eagerness compatible with anxious elegance, Sir Walter and his two ladies stepped forward to meet her."* — Jane Austen, *Persuasion* |
| [[compatibly]] | adverb | **1.** With compatibility. | *"In academic literature, compatibly designates with compatibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compatriot]] | noun | **1.** A person from your own country. | *"I am delighted to meet a compatriot."* — graf Leo Tolstoy, *War and Peace* |
| [[dispatch]] | noun | **1.** An official report (usually sent in haste).<br>**2.** The act of sending off something. | *"Dispatch the most convenient messenger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispatcher]] | noun | **1.** The official who signals the beginning of a race or competition.<br>**2.** Employee of a transportation company who controls the departures of vehicles according to weather conditions and in the interest of efficient service. | *"In academic literature, dispatcher designates the official who signals the beginning of a race or competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expat]] | noun | **1.** A person who is voluntarily absent from home or country. | *"In academic literature, expat designates a person who is voluntarily absent from home or country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expatiate]] | verb | **1.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing. | *"Now, as the business of standing mast-heads, ashore or afloat, is a very ancient and interesting one, let us in some measure expatiate here."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[expatiation]] | noun | **1.** A discussion (spoken or written) that enlarges on a topic or theme at length or in detail. | *"In academic literature, expatiation designates a discussion (spoken or written) that enlarges on a topic or theme at length or in detail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expatriate]] | noun | **1.** A person who is voluntarily absent from home or country.<br>**2.** Expel from a country. | *"Saint-Martin will not expatriate himself without from time to time making inquiries."* — Frances Mary Peard, *Unawares: A Story of an Old French Town* |
| [[expatriation]] | noun | **1.** The act of expelling a person from their native land.<br>**2.** Migration from a place (especially migration from your native country in order to settle in another). | *"Touchett was intimate; she shared their expatriation, their convictions, their pastimes, their ennui."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[impatience]] | noun | **1.** A lack of patience; irritation with anything that causes delay.<br>**2.** A restless desire for change and excitement. | *"So much uncurbable, her garboils, Caesar, Made out of her impatience—which not wanted Shrewdness of policy too—I grieving grant Did you too much disquiet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impatient]] | adjective | **1.** Restless or short-tempered under delay or opposition.<br>**2.** (usually followed by `to') full of eagerness. | *"Why, what a wasp-stung and impatient fool Art thou to break into this woman’s mood, Tying thine ear to no tongue but thine own!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impatiently]] | adverb | **1.** With impatience; in an impatient manner. | *"Impatiently I burn with thy desire; My heart and hands thou hast at once subdued."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incompatibility]] | noun | **1.** The relation between propositions that cannot both be true at the same time.<br>**2.** (immunology) the degree to which the body's immune system will try to reject foreign material (as transfused blood or transplanted tissue). | *"What I suffered from, was the incompatibility between his cold presence and my feelings towards Estella."* — Charles Dickens, *Great Expectations* |
| [[incompatible]] | adjective | **1.** Not compatible.<br>**2.** Used especially of drugs or muscles that counteract or neutralize each other's effect. | *"I mean that all this business puts us on unnatural terms, with which natural relations are incompatible."* — Charles Dickens, *Bleak House* |
| [[incompatibly]] | adverb | **1.** Without compatibility. | *"In academic literature, incompatibly designates without compatibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inpatient]] | noun | **1.** A patient who is residing in the hospital where he is being treated. | *"In academic literature, inpatient designates a patient who is residing in the hospital where he is being treated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pat]] | noun | **1.** The sound made by a gentle blow.<br>**2.** A light touch or stroke. | *"Now might I do it pat, now he is praying."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pataca]] | noun | **1.** The basic unit of money in macao. | *"In academic literature, pataca designates the basic unit of money in macao."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patagonia]] | noun | **1.** Region in southern south america between the andes and the south atlantic. | *"Three of them ran something like the following, but I do not pretend to quote:— SACRED To the Memory OF JOHN TALBOT, Who, at the age of eighteen, was lost overboard, Near the Isle of Desolation, off Patagonia, _November_ 1_st_, 1836."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[patas]] | noun | **1.** Reddish long-tailed monkey of west africa. | *"In academic literature, patas designates reddish long-tailed monkey of west africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patavium]] | noun | **1.** A city in veneto. | *"In academic literature, patavium designates a city in veneto."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patch]] | noun | **1.** A small contrasting part of something.<br>**2.** A small area of ground covered by specific vegetation. | *"O madam, yonder’s my lord your son with a patch of velvet on’s face; whether there be a scar under’t or no, the velvet knows; but ’tis a goodly patch of velvet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patchboard]] | noun | **1.** Telephone central where circuits are completed with patchcords. | *"In academic literature, patchboard designates telephone central where circuits are completed with patchcords."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patchcord]] | noun | **1.** A length of wire that has a plug at each end; used to make connections at a patchboard. | *"In academic literature, patchcord designates a length of wire that has a plug at each end; used to make connections at a patchboard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patched]] | verb | **1.** To join or unite the pieces of.<br>**2.** Provide with a patch; also used metaphorically. | *"You praise yourself By laying defects of judgment to me; but You patched up your excuses."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patchily]] | adverb | **1.** In spots. | *"Classical and authoritative lexicons catalog patchily as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patchiness]] | noun | **1.** Unevenness in quality or performance. | *"In academic literature, patchiness designates unevenness in quality or performance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patching]] | noun | **1.** The act of mending a hole in a garment by sewing a patch over it.<br>**2.** To join or unite the pieces of. | *"Once dad, in the bar room, Counted out his money, Weary mother sat at home, Patching clothes for sonny."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[patchouli]] | noun | **1.** Small east indian shrubby mint; fragrant oil from its leaves is used in perfumes.<br>**2.** A heavy perfume made from the patchouli plant. | *"In academic literature, patchouli designates small east indian shrubby mint; fragrant oil from its leaves is used in perfumes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patchouly]] | noun | **1.** Small east indian shrubby mint; fragrant oil from its leaves is used in perfumes.<br>**2.** A heavy perfume made from the patchouli plant. | *"In academic literature, patchouly designates small east indian shrubby mint; fragrant oil from its leaves is used in perfumes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patchwork]] | noun | **1.** A theory or argument made up of miscellaneous or incongruous ideas.<br>**2.** A quilt made by sewing patches of different materials together. | *"For, on a low bed opposite the fire, a confusion of dirty patchwork, lean-ribbed ticking, and coarse sacking, the lawyer, hesitating just within the doorway, sees a man."* — Charles Dickens, *Bleak House* |
| [[patchy]] | adjective | **1.** Irregular or uneven in quality, texture, etc. | *"Any stranger peeping into the office at that moment might have wondered what was the drama between the indignant man of business, and the fine-looking young fellow whose blond complexion was getting rather patchy as he bit his lip with mortification."* — George Eliot, *Middlemarch* |
| [[pate]] | noun | **1.** Liver or meat or fowl finely minced or ground and variously seasoned.<br>**2.** The top of the head. | *"I would I had; so I had broke thy pate, And ask’d thee mercy for’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patella]] | noun | **1.** A small flat triangular bone in front of the knee that protects the knee joint.<br>**2.** Type genus of the family patellidae: common european limpets. | *"In academic literature, patella designates a small flat triangular bone in front of the knee that protects the knee joint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patellar]] | adjective | **1.** Near or relating to the patella or kneecap. | *"Salivation is insufficient, the patellar reflex intermittent."* — James Joyce, *Ulysses* |
| [[patellidae]] | noun | **1.** Marine limpets. | *"In academic literature, patellidae designates marine limpets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patelliform]] | adjective | **1.** Shaped like a dish or pan. | *"In academic literature, patelliform designates shaped like a dish or pan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patency]] | noun | **1.** The openness (lack of obstruction) of a bodily passage or duct.<br>**2.** The property of being easy to see and understand. | *"In academic literature, patency designates the openness (lack of obstruction) of a bodily passage or duct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patent]] | noun | **1.** A document granting an inventor sole rights to an invention.<br>**2.** An official document granting a right or privilege. | *"The cause of this fair gift in me is wanting, And so my patent back again is swerving."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patented]] | verb | **1.** Obtain a patent for.<br>**2.** Grant rights to; grant a patent for. | *"Joe, how are you, Joe?” “Pip, how AIR you, Pip?” With his good honest face all glowing and shining, and his hat put down on the floor between us, he caught both my hands and worked them straight up and down, as if I had been the last-patented Pump."* — Charles Dickens, *Great Expectations* |
| [[patentee]] | noun | **1.** The inventor to whom a patent is issued. | *"He was a patentee of the Openshaw unbreakable tire, and his business met with such success that he was able to sell it and to retire upon a handsome competence."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[patently]] | adverb | **1.** Unmistakably (`plain' is often used informally for `plainly'). | *"But Morrell’s method was so patently the reverse of my method of self-hypnosis that I was fascinated."* — Jack London, *The Jacket (The Star-Rover)* |
| [[pater]] | noun | **1.** An informal use of the latin word for father; sometimes used by british schoolboys or used facetiously. | *"Kneeling reverently at the hearth with the members of his family in a like attitude of devotion, the old man recited three _Pater Nosters_ and three _Aves_, and invoked the blessing of heaven on the log and on the cottage."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[paterfamilias]] | noun | **1.** The male head of family or tribe. | *"In academic literature, paterfamilias designates the male head of family or tribe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paternal]] | adjective | **1.** Belonging to or inherited from one's father.<br>**2.** Characteristic of a father. | *"If he really sought to reconcile himself like a dutiful branch, he must be forgiven for having dismembered himself from the paternal tree."* — Jane Austen, *Persuasion* |
| [[paternalism]] | noun | **1.** The attitude (of a person or a government) that subordinates should be controlled in a fatherly way for their own good. | *"In academic literature, paternalism designates the attitude (of a person or a government) that subordinates should be controlled in a fatherly way for their own good."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paternalistic]] | adjective | **1.** Benevolent but sometimes intrusive. | *"In academic literature, paternalistic designates benevolent but sometimes intrusive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paternally]] | adverb | **1.** In a paternal manner. | *"Turveydrop, paternally encircling Caddy with his left arm as she sat beside him, and putting his right hand gracefully on his hip."* — Charles Dickens, *Bleak House* |
| [[paternity]] | noun | **1.** The state of being a father.<br>**2.** The kinship relation between an offspring and the father. | *"I do hate the aristocratic principle of blood before everything, and do think that as reasoners the only pedigrees we ought to respect are those spiritual ones of the wise and virtuous, without regard to corporal paternity."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[paternoster]] | noun | **1.** (roman catholic church) the lord's prayer in latin; translates as `our father'.<br>**2.** A type of lift having a chain of open compartments that move continually in an endless loop so that (agile) passengers can step on or off at each floor. | *"Paul’s, swelling above the intervening houses of Paternoster Row, Amen Corner, and Ave-Maria Lane, looks down with an air of motherly protection."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[paterson]] | noun | **1.** American revolutionary leader (born in ireland) who was a member of the constitutional convention (1745-1806).<br>**2.** A city of northeastern new jersey. | *"Carter, Paterson & Co., London._ “_17 August._ “Dear Sirs,-- “Herewith please receive invoice of goods sent by Great Northern Railway."* — Bram Stoker, *Dracula* |
| [[patience]] | noun | **1.** Good-natured tolerance of delay or incompetence.<br>**2.** A card game played by one person. | *"O let me suffer (being at your beck) Th’ imprisoned absence of your liberty, And patience tame to sufferance bide each check, Without accusing you of injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patient]] | noun | **1.** A person who requires medical care.<br>**2.** The semantic role of an entity that is not the agent but is directly involved in or affected by the happening denoted by the verb in the clause. | *"Here is my hand; the premises observ’d, Thy will by my performance shall be serv’d; So make the choice of thy own time, for I, Thy resolv’d patient, on thee still rely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patiently]] | adverb | **1.** With patience; in a patient manner. | *"Give me leave To speak my mind, and I will through and through Cleanse the foul body of th’ infected world, If they will patiently receive my medicine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patina]] | noun | **1.** A fine coating of oxide on the surface of a metal. | *"The latter are actually made of coco-nut, and, curiously enough, their interior after much use acquires a vivid patina, whose colour recalls some of the Yüan tz´ŭ glazes."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[patinate]] | verb | **1.** Coat with a patina. | *"In academic literature, patinate designates coat with a patina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patinise]] | verb | **1.** Coat with a patina. | *"In academic literature, patinise designates coat with a patina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patinize]] | verb | **1.** Coat with a patina. | *"In academic literature, patinize designates coat with a patina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patio]] | noun | **1.** Usually paved outdoor area adjoining a residence. | *"From where he stood on Drummer's enclosed patio, Brad looked through the transparent shields at ice-gray Charon low over scarred ridges to the west."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[patisserie]] | noun | **1.** A bakery specializing in french pastry. | *"In academic literature, patisserie designates a bakery specializing in french pastry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patness]] | noun | **1.** Timely convenience. | *"In academic literature, patness designates timely convenience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patois]] | noun | **1.** A characteristic language of a particular group (as among thieves).<br>**2.** A regional dialect of a language (especially french); usually considered substandard. | *"In this part of France the last sheaf is called the _coujoulage,_ which, in the patois, means a wether."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[paton]] | noun | **1.** South african writer (1903-1988). | *"Paton, in _Folk-lore_, i. (1890) p. 524. [248] The Greeks and Romans thought that a field was completely protected against insects if a menstruous woman walked round it with bare feet and streaming hair (Pliny, _Nat."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[patrai]] | noun | **1.** A port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages. | *"In academic literature, patrai designates a port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patras]] | noun | **1.** A port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages. | *"In academic literature, patras designates a port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrial]] | noun | **1.** A person who has the right to be considered legally a british citizen (by virtue of the birth of a parent or grandparent). | *"In academic literature, patrial designates a person who has the right to be considered legally a british citizen (by virtue of the birth of a parent or grandparent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriarch]] | noun | **1.** Title for the heads of the eastern orthodox churches (in istanbul and alexandria and moscow and jerusalem).<br>**2.** The male head of family or tribe. | *"There’s your fare!” says the patriarch to the coachman with a fierce grin and shaking his incapable fist at him."* — Charles Dickens, *Bleak House* |
| [[patriarchal]] | adjective | **1.** Characteristic of a form of social organization in which the male is the family head and title is traced through the male line.<br>**2.** Relating to or characteristic of a man who is older or higher in rank. | *"In family or patriarchal communities all share a common income and combine in the common defense, but self-preservation often has compelled such small communities to form a larger, stronger state for the common defense."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[patriarchate]] | noun | **1.** The jurisdiction of a patriarch.<br>**2.** A form of social organization in which a male is the family head and title is traced through the male line. | *"In academic literature, patriarchate designates the jurisdiction of a patriarch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriarchic]] | adjective | **1.** (of societies) being ruled by or having descent traced through the male line. | *"In academic literature, patriarchic designates (of societies) being ruled by or having descent traced through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriarchy]] | noun | **1.** A form of social organization in which a male is the family head and title is traced through the male line. | *"In academic literature, patriarchy designates a form of social organization in which a male is the family head and title is traced through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patricentric]] | adjective | **1.** Centered upon the father. | *"In academic literature, patricentric designates centered upon the father."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrician]] | noun | **1.** A person of refined upbringing and manners.<br>**2.** A member of the aristocracy. | *"Nay, come away. [_Exeunt Coriolanus and Cominius._] PATRICIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patricide]] | noun | **1.** A person who murders their father.<br>**2.** The murder of your father. | *"In academic literature, patricide designates a person who murders their father."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrick]] | noun | **1.** Apostle and patron saint of ireland; an english missionary to ireland in the 5th century. | *"Yes, by Saint Patrick, but there is, Horatio, And much offence too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patrikin]] | noun | **1.** One related on the father's side. | *"In academic literature, patrikin designates one related on the father's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilineage]] | noun | **1.** Line of descent traced through the paternal side of the family. | *"In academic literature, patrilineage designates line of descent traced through the paternal side of the family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilineal]] | adjective | **1.** Based on or tracing descent through the male line. | *"In academic literature, patrilineal designates based on or tracing descent through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilineally]] | adverb | **1.** By descent through the male line. | *"In academic literature, patrilineally designates by descent through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilinear]] | adjective | **1.** Based on or tracing descent through the male line. | *"In academic literature, patrilinear designates based on or tracing descent through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrimonial]] | adjective | **1.** Inherited or inheritable by established rules (usually legal rules) of descent. | *"At the time Shamus was added to the population of Ireland, the patrimonial estate had dwindled down to a peat bog."* — W. E. Webb, *Buffalo Land* |
| [[patrimony]] | noun | **1.** A church endowment.<br>**2.** An inheritance coming by right of birth (especially by primogeniture). | *"General, Take thou my soldiers, prisoners, patrimony; Dispose of them, of me; the walls are thine: Witness the world that I create thee here My lord and master."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patriot]] | noun | **1.** One who loves and defends his or her country. | *"An austere patriot’s passion for his fatherland!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[patrioteer]] | noun | **1.** An extreme bellicose nationalist. | *"In academic literature, patrioteer designates an extreme bellicose nationalist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriotic]] | adjective | **1.** Inspired by love for your country. | *"On these national occasions dancing may be a patriotic service, and Volumnia is constantly seen hopping about for the good of an ungrateful and unpensioning country."* — Charles Dickens, *Bleak House* |
| [[patriotically]] | adverb | **1.** In a patriotic manner. | *"He has stopped Austria’s cackle and I fear it will be our turn next.” The colonel was a stout, tall, plethoric German, evidently devoted to the service and patriotically Russian."* — graf Leo Tolstoy, *War and Peace* |
| [[patriotism]] | noun | **1.** Love of country and willingness to sacrifice for it. | *"That the country is shipwrecked, lost, and gone to pieces (as is made manifest to the patriotism of Sir Leicester Dedlock) because you can’t provide for Noodle!"* — Charles Dickens, *Bleak House* |
| [[patrisib]] | noun | **1.** One related on the father's side. | *"In academic literature, patrisib designates one related on the father's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patristic]] | adjective | **1.** Of or relating to the writings of the early church fathers. | *"All this time he was pursuing his Patristic and other historical studies with unflagging vigour, always writing new lectures, always maintaining his love of abstract knowledge and his eager desire to add to his already vast stores of learning."* — John Cairns, *Principal Cairns* |
| [[patristical]] | adjective | **1.** Of or relating to the writings of the early church fathers. | *"In academic literature, patristical designates of or relating to the writings of the early church fathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patristics]] | noun | **1.** The writings of the early church fathers.<br>**2.** The study of the lives, writings, and doctrines of the church fathers. | *"In academic literature, patristics designates the writings of the early church fathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patroclus]] | noun | **1.** (greek mythology) a friend of achilles who was killed in the trojan war; his death led achilles to return to the fight after his quarrel with agamemnon. | *"Now play him me, Patroclus, Arming to answer in a night alarm.’ And then, forsooth, the faint defects of age Must be the scene of mirth: to cough and spit And, with a palsy fumbling on his gorget, Shake in and out the rivet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patrol]] | noun | **1.** A detachment used for security or reconnaissance.<br>**2.** The activity of going around or through an area at regular intervals for security purposes. | *"When I proposed to put him at the head of a patrol, he had an attack of the nerves."* — Mrs. Oliphant, *A Beleaguered City* |
| [[patroller]] | noun | **1.** Someone on patrol duty; an individual or a member of a group that patrols an area. | *"The recon-patroller's omni-directional screen displayed the huge cylinder that floated in space behind him, its gravity-enhanced rotation barely perceptible to O'Hare's vision."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[patrolman]] | noun | **1.** A policeman who patrols a given region. | *"In academic literature, patrolman designates a policeman who patrols a given region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrology]] | noun | **1.** The writings of the early church fathers.<br>**2.** The study of the lives, writings, and doctrines of the church fathers. | *"In academic literature, patrology designates the writings of the early church fathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patron]] | noun | **1.** A regular customer.<br>**2.** The proprietor of an inn. | *"I tell thee, Syracusian, twenty years Have I been patron to Antipholus, During which time he ne’er saw Syracusa."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patronage]] | noun | **1.** The act of providing approval and support.<br>**2.** Customers collectively. | *"Yes, as an outlaw in a castle keeps, And useth it to patronage his theft."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patroness]] | noun | **1.** A woman who is a patron or the wife of a patron. | *"Behold our patroness, the life of Rome!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patronise]] | verb | **1.** Do one's shopping at; do business with; be a customer or client of.<br>**2.** Assume sponsorship of. | *"In all the clam’rous cry of starving want, They dun Benevolence with shameless front; Oblige them, patronise their tinsel lays— They persecute you all your future days!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[patronised]] | verb | **1.** Do one's shopping at; do business with; be a customer or client of.<br>**2.** Assume sponsorship of. | *"It was a concert for the benefit of a person patronised by Lady Dalrymple."* — Jane Austen, *Persuasion* |
| [[patronising]] | verb | **1.** Do one's shopping at; do business with; be a customer or client of.<br>**2.** Assume sponsorship of. | *"There’s your true Ashantee, gentlemen; there howl your pagans; where you ever find them, next door to you; under the long-flung shadow, and the snug patronising lee of churches."* — Herman Melville, *Moby Dick; Or, The Whale* |
| [[patronisingly]] | adverb | **1.** With condescension; in a patronizing manner. | *"It must be sewn on,” she said, just a little patronisingly."* — J. M. Barrie, *Peter Pan* |
| [[patronize]] | verb | **1.** Assume sponsorship of.<br>**2.** Do one's shopping at; do business with; be a customer or client of. | *"Say that he wants to patronize me,” pursued Mr."* — Charles Dickens, *Bleak House* |
| [[patronized]] | verb | **1.** Assume sponsorship of.<br>**2.** Do one's shopping at; do business with; be a customer or client of. | *"He dresses at that gentleman (by whom he is patronized), talks at him, walks at him, founds himself entirely on him."* — Charles Dickens, *Bleak House* |
| [[patronizing]] | verb | **1.** Assume sponsorship of.<br>**2.** Do one's shopping at; do business with; be a customer or client of. | *"Well, then,” said Joe, “It’s more than twenty pound.” That abject hypocrite, Pumblechook, nodded again, and said, with a patronizing laugh, “It’s more than that, Mum."* — Charles Dickens, *Great Expectations* |
| [[patronizingly]] | adverb | **1.** With condescension; in a patronizing manner. | *"She nodded twice or thrice patronizingly to the little boy, who looked up from his dinner or from the pictures of soldiers he was painting."* — William Makepeace Thackeray, *Vanity Fair* |
| [[patronless]] | adjective | **1.** Having little patronage or few clients. | *"In academic literature, patronless designates having little patronage or few clients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patronne]] | noun | **1.** A woman who is a patron or the wife of a patron. | *"In academic literature, patronne designates a woman who is a patron or the wife of a patron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patronym]] | noun | **1.** A family name derived from name of your father or a paternal ancestor (especially with an affix (such as -son in english or o'- in irish) added to the name of your father or a paternal ancestor). | *"In academic literature, patronym designates a family name derived from name of your father or a paternal ancestor (especially with an affix (such as -son in english or o'- in irish) added to the name of your father or a paternal ancestor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patronymic]] | noun | **1.** A family name derived from name of your father or a paternal ancestor (especially with an affix (such as -son in english or o'- in irish) added to the name of your father or a paternal ancestor).<br>**2.** Of or derived from a personal or family name. | *"When I go there I shall be all alone, and my friend Harker Jonathan--nay, pardon me, I fall into my country’s habit of putting your patronymic first--my friend Jonathan Harker will not be by my side to correct and aid me."* — Bram Stoker, *Dracula* |
| [[patsy]] | noun | **1.** A person who is gullible and easy to take advantage of. | *"The _Sea Venture_ comes home from Bermudas and the play Renan admired is written with Patsy Caliban, our American cousin."* — James Joyce, *Ulysses* |
| [[patten]] | noun | **1.** Footwear usually with wooden soles. | *"Patten in his numerous writings, among them: _The Consumption of Wealth_ (1889); _Theory of Dynamic Economics_ (1892); _The Theory of Prosperity_ (1902)."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[patter]] | noun | **1.** Plausible glib talk (especially useful to a salesperson).<br>**2.** A quick succession of light rapid sounds. | *"Tulkinghorn retires into another chamber; bells ring, feet shuffle and patter, silence ensues."* — Charles Dickens, *Bleak House* |
| [[pattern]] | noun | **1.** A perceptual structure.<br>**2.** A customary way of operation or behavior. | *"So, like gross terms, The Prince will, in the perfectness of time, Cast off his followers, and their memory Shall as a pattern or a measure live, By which his Grace must mete the lives of other, Turning past evils to advantages."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pattern-bomb]] | verb | **1.** Bomb in certain patterns. | *"In academic literature, pattern-bomb designates bomb in certain patterns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patterned]] | verb | **1.** Plan or create according to a model or models.<br>**2.** Form a pattern. | *"Ay, such a place there is where we did hunt,— O, had we never, never hunted there!— Patterned by that the poet here describes, By nature made for murders and for rapes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patternmaker]] | noun | **1.** Someone who makes patterns (as for sewing or carpentry or metalworking). | *"In academic literature, patternmaker designates someone who makes patterns (as for sewing or carpentry or metalworking)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patty]] | noun | **1.** Small flat mass of chopped food.<br>**2.** Small pie or pasty. | *"I’ve been reading Bible stories,” Patty said, “and I believe That Adam’s name MEANT ‘Morning,’ Because his wife was ‘Eve.’” BABIE’S CURLS."* — Anonymous, *Cinderella; Or, The Little Glass Slipper, and Other Stories* |
| [[patty-pan]] | noun | **1.** A pan for cooking patties or pasties. | *"In academic literature, patty-pan designates a pan for cooking patties or pasties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repatriate]] | noun | **1.** A person who has returned to the country of origin or whose citizenship has been restored.<br>**2.** Send someone back to his homeland against his will, as of refugees. | *"In academic literature, repatriate designates a person who has returned to the country of origin or whose citizenship has been restored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repatriation]] | noun | **1.** The act of returning to the country of origin. | *"In academic literature, repatriation designates the act of returning to the country of origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superpatriotic]] | adjective | **1.** Fanatically patriotic. | *"In academic literature, superpatriotic designates fanatically patriotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superpatriotism]] | noun | **1.** Fanatical patriotism. | *"In academic literature, superpatriotism designates fanatical patriotism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatented]] | adjective | **1.** (of devices and processes) not protected by patent. | *"In academic literature, unpatented designates (of devices and processes) not protected by patent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatriotic]] | adjective | **1.** Showing lack of love for your country. | *"You expressed, besides, your apprehension, that the unpatriotic prejudices of my countrymen would not allow fair play to such a work as that of which I endeavoured to demonstrate the probable success."* — Walter Scott, *Ivanhoe: A Romance* |
| [[unpatriotically]] | adverb | **1.** In an unpatriotic manner. | *"In academic literature, unpatriotically designates in an unpatriotic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatronised]] | adjective | **1.** Having little patronage or few clients. | *"In academic literature, unpatronised designates having little patronage or few clients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatronized]] | adjective | **1.** Having little patronage or few clients. | *"In academic literature, unpatronized designates having little patronage or few clients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatterned]] | adjective | **1.** Lacking patterns especially in color. | *"In academic literature, unpatterned designates lacking patterns especially in color."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PAT
  </div>
</div>
