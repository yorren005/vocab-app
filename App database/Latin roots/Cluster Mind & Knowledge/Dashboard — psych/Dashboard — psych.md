---
status: unread
type: root_dashboard
---
# Dashboard — psych
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">psych-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mind or soul”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A lightbulb turning on in your mind when an idea suddenly makes sense.</span>
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

The root **psych** means mind or soul. It refers to the faculty of thinking, reasoning, remembering, and feeling. In English, this root forms words such as *psyche*, *psychic*, *psychical*, and *psychically*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mind or soul
> The root **psych** means mind or soul. It refers to the faculty of thinking, reasoning, remembering, and feeling. In English, this root forms words such as *psyche*, *psychic*, *psychical*, and *psychically*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mind or soul</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *psyche* and *psychic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **psych** comes from a Latin word that means *"mind or soul"*.
  - At its core, it describes mind or soul.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **psych** in an English word, think of **thinking, understanding, and knowledge**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mind or soul.
  - **Mental & Social**: How people experience, organize, or communicate about mind or soul.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Psyche**: The human soul, mind, or core emotional and psychological constitution.
  - **Psychic**: Relating to the mind or psyche as distinct from the physical body.
  - **Psychical**: Pertaining to the mind, spirit, or soul.
  - **Psychically**: In a manner pertaining to the mind or psychological functions.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">psych</mark>, think of <mark class="hl-def">thinking, understanding, and knowledge</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **psych-** behaves primarily as a Greek-derived combining form (*combining base*) in English, attaching to prefixes, combining elements, and Greek/Latin suffixes:
> - **Primary Nominal & Adjectival Base:** `psych-` / `psycho-` (connecting vowel *-o-* before consonants: *psycho-logy*, *psycho-path*, *psycho-somatic*)
> - **Direct Vocalic Combining Base:** `psych-` before vowels (*psych-iatry*, *psych-osis*, *psych-ic*)
> - **Verbal / Modern Colloquial Stem:** `psych` (*to psych out*, *psyched up*)
> - **Prefixal Modifications:** Combines with classical prefixes like *meta-* + *en-* (*met-em-psych-osis*) and *pan-* (*pan-psych-ism*).

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
> Although anchored in "soul and mind," `psych` radiates across distinct operational planes:
> - **Metaphysical & Mythological Interiority:** [[psyche]], [[panpsychism]], [[metempsychosis]] contemplate the cosmic soul, reincarnation, and universal consciousness.
> - **Paranormal & Intuitive Faculties:** [[psychic]], [[psychical]], [[psychometry]] encompass extrasensory perception, mediumship, and non-physical intuition.
> - **Empirical & Theoretical Science:** [[psychology]], [[psychologist]], [[psychological]], [[psychometrics]] represent the rigorous observation, measurement, and modeling of behavior and cognitive mechanisms.
> - **Clinical Medicine & Healing:** [[psychiatry]], [[psychiatrist]], [[psychotherapy]], [[psychotherapeutic]], [[psychotropic]] designate the diagnosis, pharmacotherapy, and behavioral remediation of mental pathology.
> - **Structural Pathology & Personality Disorders:** [[psychosis]], [[psychotic]], [[psychopath]], [[psychopathy]], [[psychopathology]] diagnose profound breakdowns in reality testing or severe moral and empathetic deficits.
> - **Mind-Body Intersection:** [[psychosomatic]], [[psychogenic]], [[psychomotor]], [[psychodynamics]] delineate the bidirectional feedback between mental states and somatic physiology.
> - **Altered Perception & Informal Slang:** [[psychedelic]], [[psych]], [[psyched]] trace mind-expansion via chemistry and modern conversational idioms of mental intimidation or heightened excitement.

---

## 🔀 4. Prefix & Combining Dynamics on psych

### Prefix & Combining Stem Synthesis

| Prefix / Element | Element Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **pan-** | all, universal | [[panpsychism]] | *pan-* + *psychē* + *-ism* $\to$ doctrine that mind is a universal, primordial feature of all physical matter. |
| **meta-** + **en-** | across/change + into | [[metempsychosis]] | *meta-* + *en-* + *psychē* + *-ōsis* $\to$ transmigration or passage of the soul from one body into another after death. |
| **-iatry** (Gk *iatreia*) | healing, physician | [[psychiatry]] | *psychē* + *iatros* $\to$ the specialized branch of medicine dedicated to healing mental disorders. |
| **-delic** (Gk *dēlos*) | manifest, visible | [[psychedelic]] | *psychē* + *dēloun* ("to make manifest") $\to$ generating altered perception that reveals hidden depths of the mind. |
| **-somatic** (Gk *sōma*) | physical body | [[psychosomatic]] | *psychē* + *sōmatikos* $\to$ physical ailments originating from or exacerbated by psychological and emotional stress. |
| **-tropic** (Gk *tropos*) | turning, affecting | [[psychotropic]] | *psychē* + *tropos* $\to$ capable of turning, altering, or chemically influencing cognitive and affective functions. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ic** | Adjective formant | [[psychic]], [[psychopathic]] | Characterizing or pertaining to the mind or psychological conditions. |
| **-logy** / **-ist** | Science / Practitioner | [[psychology]], [[psychologist]] | The empirical discipline of the mind; one who conducts psychological inquiry. |
| **-osis** | Pathological state | [[psychosis]] | A severe, pervasive mental disorder involving detachment from reality. |
| **-path** / **-pathy** | Suffering / Disorder | [[psychopath]], [[psychopathy]] | An individual suffering from severe moral callousness; the clinical condition itself. |
| **-analysis** | Detailed dissection | [[psychoanalysis]] | The clinical investigation of unconscious drives and defenses pioneered by Freud. |
| **-therapy** | Treatment / Care | [[psychotherapy]] | Non-pharmacological, communicative remediation of emotional and behavioral problems. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Philosophy & Metaphysics** | [[psyche]], [[panpsychism]], [[metempsychosis]] | Exploring consciousness as a cosmic primitive, Platonic soul division, and the mind-body problem. |
| **Clinical Medicine & Psychiatry** | [[psychiatry]], [[psychiatrist]], [[psychotropic]], [[psychosomatic]] | Managing neurochemical imbalances, prescribing psychotropic medications, and treating psychosomatic illnesses. |
| **Cognitive Science & Research** | [[psychology]], [[psychological]], [[psychometrics]], [[psychomotor]] | Designing psychometric evaluations, analyzing cognitive processing speeds, and profiling human behavior. |
| **Psychoanalysis & Psychotherapy** | [[psychoanalysis]], [[psychoanalyst]], [[psychotherapy]], [[psychodynamics]] | Investigating unconscious repression, dream symbolism, therapeutic transference, and emotional repair. |
| **Criminology & Forensic Science** | [[psychopath]], [[psychopathy]], [[psychopathic]], [[psychopathology]] | Profiling violent offenders, evaluating legal culpability, and administering standardized psychopathy checklists. |
| **Culture, Arts & Colloquial Life** | [[psychedelic]], [[psyched]], [[psych]] | Countercultural psychedelic art, athletic psychological readiness, and colloquial mind-games. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antipsychotic]] | noun | **1.** Tranquilizer used to treat psychotic conditions when a calming effect is desired. | *"In academic literature, antipsychotic designates tranquilizer used to treat psychotic conditions when a calming effect is desired."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metempsychosis]] | noun | **1.** After death the soul begins a new cycle of existence in another human body. | *"Many of their works, also, undergo a kind of metempsychosis, and spring up under new forms."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[nonpsychoactive]] | adjective | **1.** Not affecting the mind or mental processes. | *"In academic literature, nonpsychoactive designates not affecting the mind or mental processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psyche]] | noun | **1.** That which is responsible for one's thoughts and feelings; the seat of the faculty of reason.<br>**2.** The immaterial part of a person; the actuating cause of an individual life. | *"Some of them represent the fable of Cupid and Psyche, which is probably the romantic invention of a literary period, and cannot, I think, be reckoned as a genuine mythical product."* — George Eliot, *Middlemarch* |
| [[psyched]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin psych within the domain of Mind & Knowledge.<br>**2.** A technical or specialized form exhibiting the properties of psych in systematic terminology. | *"In academic literature, psyched designates pertaining to, derived from, or characteristic of latin psych within the domain of mind & knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychedelia]] | noun | **1.** The subculture of users of psychedelic drugs. | *"In academic literature, psychedelia designates the subculture of users of psychedelic drugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychedelic]] | adjective | **1.** Producing distorted sensory perceptions and feelings or altered states of awareness or sometimes states resembling psychosis.<br>**2.** Having the vivid colors and bizarre patterns associated with psychedelic states. | *"In academic literature, psychedelic designates producing distorted sensory perceptions and feelings or altered states of awareness or sometimes states resembling psychosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychiatric]] | adjective | **1.** Relating to or used in or engaged in the practice of psychiatry. | *"In academic literature, psychiatric designates relating to or used in or engaged in the practice of psychiatry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychiatrical]] | adjective | **1.** Relating to or used in or engaged in the practice of psychiatry. | *"In academic literature, psychiatrical designates relating to or used in or engaged in the practice of psychiatry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychiatrist]] | noun | **1.** A physician who specializes in psychiatry. | *"I wonder what a psychiatrist would have said about him."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[psychiatry]] | noun | **1.** The branch of medicine dealing with the diagnosis and treatment of mental disorders. | *"In academic literature, psychiatry designates the branch of medicine dealing with the diagnosis and treatment of mental disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychic]] | noun | **1.** A person apparently sensitive to things beyond the natural range of perception.<br>**2.** Affecting or influenced by the human mind. | *"This history is written in our tissues and our bones, in our functions and our organs, in our brain cells and in our spirits, and in all sorts of physical and psychic atavistic urgencies and compulsions."* — Jack London, *The Jacket (The Star-Rover)* |
| [[psychical]] | adjective | **1.** Affecting or influenced by the human mind.<br>**2.** Outside the sphere of physical science. | *"Nevertheless the word corresponds to a fairly definite range of psychical reactions which are of great interest in modern poetry, especially German poetry."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[psychically]] | adverb | **1.** From a psychic point of view. | *"In academic literature, psychically designates from a psychic point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycho]] | noun | **1.** A person afflicted with psychosis. | *"In academic literature, psycho designates a person afflicted with psychosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoactive]] | adjective | **1.** Affecting the mind or mood or other mental processes. | *"In academic literature, psychoactive designates affecting the mind or mood or other mental processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalyse]] | verb | **1.** Subject to psychoanalytic treatment. | *"In academic literature, psychoanalyse designates subject to psychoanalytic treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalysis]] | noun | **1.** A set of techniques for exploring underlying motives and a method of treating various mental disorders; based on the theories of sigmund freud. | *"In academic literature, psychoanalysis designates a set of techniques for exploring underlying motives and a method of treating various mental disorders; based on the theories of sigmund freud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalyst]] | noun | **1.** A licensed practitioner of psychoanalysis. | *"In academic literature, psychoanalyst designates a licensed practitioner of psychoanalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalytic]] | adjective | **1.** Of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud. | *"In academic literature, psychoanalytic designates of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalytical]] | adjective | **1.** Of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud. | *"In academic literature, psychoanalytical designates of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalyze]] | verb | **1.** Subject to psychoanalytic treatment. | *"In academic literature, psychoanalyze designates subject to psychoanalytic treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychobabble]] | noun | **1.** Using language loaded with psychological terminology. | *"In academic literature, psychobabble designates using language loaded with psychological terminology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychodid]] | noun | **1.** A fly of the family psychodidae. | *"In academic literature, psychodid designates a fly of the family psychodidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychodidae]] | noun | **1.** Very small two-winged flies with hairy wings that develop in moss and damp vegetable matter: sand flies. | *"In academic literature, psychodidae designates very small two-winged flies with hairy wings that develop in moss and damp vegetable matter: sand flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychodynamics]] | noun | **1.** The interrelation of conscious and unconscious processes and emotions that determine personality and motivation.<br>**2.** The branch of social psychology that deals with the processes and emotions that determine psychology and motivation. | *"In academic literature, psychodynamics designates the interrelation of conscious and unconscious processes and emotions that determine personality and motivation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychogenesis]] | noun | **1.** The development in the life of an individual of some disorder that is caused by psychological rather than physiological factors.<br>**2.** A general term for the origin and development of almost any aspect of the mind. | *"In academic literature, psychogenesis designates the development in the life of an individual of some disorder that is caused by psychological rather than physiological factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychogenetic]] | adjective | **1.** Of or relating to the psychological cause of a disorder.<br>**2.** Of or relating to the origin and development of the mind. | *"In academic literature, psychogenetic designates of or relating to the psychological cause of a disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychogenic]] | adjective | **1.** Of or relating to the psychological cause of a disorder.<br>**2.** Mental or emotional rather than physiological in origin. | *"In academic literature, psychogenic designates of or relating to the psychological cause of a disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychokinesis]] | noun | **1.** The power to move something by thinking about it without the application of physical force. | *"In academic literature, psychokinesis designates the power to move something by thinking about it without the application of physical force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychokinetic]] | adjective | **1.** Moving an object without apparent use of physical means. | *"In academic literature, psychokinetic designates moving an object without apparent use of physical means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycholinguist]] | noun | **1.** A person (usually a psychologist but sometimes a linguist) who studies the psychological basis of human language. | *"In academic literature, psycholinguist designates a person (usually a psychologist but sometimes a linguist) who studies the psychological basis of human language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycholinguistic]] | adjective | **1.** Of or relating to the psychology of language. | *"In academic literature, psycholinguistic designates of or relating to the psychology of language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycholinguistics]] | noun | **1.** The branch of cognitive psychology that studies the psychological basis of linguistic competence and performance. | *"In academic literature, psycholinguistics designates the branch of cognitive psychology that studies the psychological basis of linguistic competence and performance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychological]] | adjective | **1.** Mental or emotional as opposed to physical in nature.<br>**2.** Of or relating to or determined by psychology. | *"Rather they became a part of it; for the world is only a psychological phenomenon, and what they seemed they were."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[psychologically]] | adverb | **1.** With regard to psychology.<br>**2.** In terms of psychology. | *"But, as has been indicated in another connection above, it is far from being a matter of indifference, psychologically, where the first, immediate burden of premium payment falls."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[psychologist]] | noun | **1.** A scientist trained in psychology. | *"Mill's achievements as an economist, logician, psychologist, and politician are known more or less vaguely to all educated men; but his capacity and his actual work as a critic are comparatively little regarded."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[psychology]] | noun | **1.** The science of mental life. | *"An incorrigible is a terrible human being—at least such is the connotation of “incorrigible” in prison psychology."* — Jack London, *The Jacket (The Star-Rover)* |
| [[psychometric]] | adjective | **1.** Of or relating to psychometrics. | *"In academic literature, psychometric designates of or relating to psychometrics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychometrics]] | noun | **1.** Any branch of psychology concerned with psychological measurements. | *"In academic literature, psychometrics designates any branch of psychology concerned with psychological measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychometrika]] | noun | **1.** Any branch of psychology concerned with psychological measurements. | *"In academic literature, psychometrika designates any branch of psychology concerned with psychological measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychometry]] | noun | **1.** Any branch of psychology concerned with psychological measurements. | *"In academic literature, psychometry designates any branch of psychology concerned with psychological measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychomotor]] | adjective | **1.** Of or relating to or characterizing mental events that have motor consequences or vice versa. | *"In academic literature, psychomotor designates of or relating to or characterizing mental events that have motor consequences or vice versa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoneurosis]] | noun | **1.** A mental or personality disturbance not attributable to any known neurological or organic dysfunction. | *"In academic literature, psychoneurosis designates a mental or personality disturbance not attributable to any known neurological or organic dysfunction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoneurotic]] | noun | **1.** A person suffering from neurosis.<br>**2.** Affected with emotional disorder. | *"In academic literature, psychoneurotic designates a person suffering from neurosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychonomics]] | noun | **1.** The branch of psychology that uses experimental methods to study psychological issues. | *"In academic literature, psychonomics designates the branch of psychology that uses experimental methods to study psychological issues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopath]] | noun | **1.** Someone with a sociopathic personality; a person with an antisocial personality disorder (`psychopath' was once widely used but has now been superseded by `sociopath'). | *"In academic literature, psychopath designates someone with a sociopathic personality; a person with an antisocial personality disorder (`psychopath' was once widely used but has now been superseded by `sociopath')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathic]] | adjective | **1.** Suffering from an undiagnosed mental disorder. | *"There is nothing in the least "psychopathic" about him, nothing abnormal--no mystical vision of God, no mystical absorption in God, no mystical union with God, no abstraction, nothing that is the mark of the professed mystic."* — T. R. Glover, *The Jesus of History* |
| [[psychopathologic]] | adjective | **1.** Suffering from an undiagnosed mental disorder. | *"In academic literature, psychopathologic designates suffering from an undiagnosed mental disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathological]] | adjective | **1.** Suffering from an undiagnosed mental disorder. | *"In academic literature, psychopathological designates suffering from an undiagnosed mental disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathology]] | noun | **1.** The branch of psychology concerned with abnormal behavior.<br>**2.** The branch of medicine dealing with the diagnosis and treatment of mental disorders. | *"In academic literature, psychopathology designates the branch of psychology concerned with abnormal behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathy]] | noun | **1.** Any disease of the mind; the psychological state of someone who has emotional or behavioral problems serious enough to require psychiatric intervention. | *"In academic literature, psychopathy designates any disease of the mind; the psychological state of someone who has emotional or behavioral problems serious enough to require psychiatric intervention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopharmacological]] | adjective | **1.** Of or relating to psychopharmacology. | *"In academic literature, psychopharmacological designates of or relating to psychopharmacology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopharmacology]] | noun | **1.** The study of drugs that affect the mind. | *"In academic literature, psychopharmacology designates the study of drugs that affect the mind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychophysicist]] | noun | **1.** A psychologist trained in psychophysics. | *"In academic literature, psychophysicist designates a psychologist trained in psychophysics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychophysics]] | noun | **1.** The branch of psychology concerned with quantitative relations between physical stimuli and their psychological effects. | *"In academic literature, psychophysics designates the branch of psychology concerned with quantitative relations between physical stimuli and their psychological effects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychophysiology]] | noun | **1.** The branch of psychology that is concerned with the physiological bases of psychological processes. | *"In academic literature, psychophysiology designates the branch of psychology that is concerned with the physiological bases of psychological processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopomp]] | noun | **1.** A conductor of souls to the afterworld. | *"In academic literature, psychopomp designates a conductor of souls to the afterworld."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopsis]] | noun | **1.** Epiphytic orchids of central and south america formerly included in genus oncidium. | *"In academic literature, psychopsis designates epiphytic orchids of central and south america formerly included in genus oncidium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosexual]] | adjective | **1.** Of or relating to the mental or emotional attitudes about sexuality. | *"In academic literature, psychosexual designates of or relating to the mental or emotional attitudes about sexuality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosexuality]] | noun | **1.** The mental representation of sexual activities. | *"In academic literature, psychosexuality designates the mental representation of sexual activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosis]] | noun | **1.** Any severe mental disorder in which contact with reality is lost or highly distorted. | *"In academic literature, psychosis designates any severe mental disorder in which contact with reality is lost or highly distorted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosomatic]] | adjective | **1.** Used of illness or symptoms resulting from neurosis. | *"In academic literature, psychosomatic designates used of illness or symptoms resulting from neurosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosurgery]] | noun | **1.** Brain surgery on human patients intended to relieve severe and otherwise intractable mental or behavioral problems. | *"In academic literature, psychosurgery designates brain surgery on human patients intended to relieve severe and otherwise intractable mental or behavioral problems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapeutic]] | adjective | **1.** Of or relating to or practicing psychotherapy.<br>**2.** Emotionally purging. | *"In academic literature, psychotherapeutic designates of or relating to or practicing psychotherapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapeutics]] | noun | **1.** The branch of psychiatry concerned with psychological methods. | *"In academic literature, psychotherapeutics designates the branch of psychiatry concerned with psychological methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapist]] | noun | **1.** A therapist who deals with mental and emotional disorders. | *"In academic literature, psychotherapist designates a therapist who deals with mental and emotional disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapy]] | noun | **1.** The branch of psychiatry concerned with psychological methods.<br>**2.** The treatment of mental or emotional problems by psychological means. | *"In academic literature, psychotherapy designates the branch of psychiatry concerned with psychological methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotic]] | noun | **1.** A person afflicted with psychosis.<br>**2.** Characteristic of or suffering from psychosis. | *"In academic literature, psychotic designates a person afflicted with psychosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotria]] | noun | **1.** Tropical chiefly south american shrubs and trees. | *"In academic literature, psychotria designates tropical chiefly south american shrubs and trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotropic]] | adjective | **1.** Affecting the mind or mood or other mental processes. | *"In academic literature, psychotropic designates affecting the mind or mood or other mental processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychrometer]] | noun | **1.** A hygrometer consisting of a dry-bulb thermometer and a wet-bulb thermometer; their difference indicates the dryness of the surrounding air. | *"In academic literature, psychrometer designates a hygrometer consisting of a dry-bulb thermometer and a wet-bulb thermometer; their difference indicates the dryness of the surrounding air."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Mind & Knowledge]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PSYCH
  </div>
</div>
