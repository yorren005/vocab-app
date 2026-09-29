---
status: unread
type: root_dashboard
---
# Dashboard — path
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">path-</span>
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

The root **path** means to suffer or feel. It refers to feeling, visceral emotion, suffering, disease. In English, this root forms words such as *patior*, *passus*, *pathos*, and *pathetic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to suffer or feel
> The root **path** means to suffer or feel. It refers to feeling, visceral emotion, suffering, disease. In English, this root forms words such as *patior*, *passus*, *pathos*, and *pathetic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To suffer or feel</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *patior* and *passus*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **path** comes from a Latin word that means *"to suffer or feel"*.
  - At its core, it describes the action of suffer or feel.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **path** in an English word, think of **to suffer or feel**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to suffer or feel).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Patior**: An everyday English word showing the root's idea of *to suffer or feel*.
  - **Passus**: An everyday English word showing the root's idea of *to suffer or feel*.
  - **Pathos**: An element or quality in literature, art, or human experience evoking pity, sympathy, or poignant sorrow.
  - **Pathetic**: Arousing or deserving tender pity, sadness, or compassionate sorrow.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">path</mark>, think of <mark class="hl-def">to suffer or feel</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The Greek root **path** participates in four productive morphological architectures:
> - **Primary Noun & Adjective (`path-` / `pathet-`):** *pathos* (rhetoric/literature), *pathetic* (< Greek *pathētikos* "capable of feeling or suffering").
> - **Prefix + Path Nouns of Interpersonal Affect (`syn-`, `en-`, `a-`, `anti-`):** Built by attaching Greek prefixes denoting spatial or moral orientation to *-patheia* (*sym-pathy* = feeling together; *em-pathy* = feeling into; *a-pathy* = absence of feeling; *anti-pathy* = feeling against).
> - **Prefix Combining Form (`patho-`):** Placed before Greek suffixes and roots to designate the study or causation of disease (*patho-logy*, *patho-gen*, *patho-genesis*, *patho-gnomonic*).
> - **Suffixal Compound Terminal (`-pathy`, `-pathic`, `-path`):** Appended to anatomical sites (*neuro-pathy*, *cardio-myo-pathy*, *nephro-pathy*) or behavioral disorders (*psycho-path*, *socio-path*).

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
> The root **path** bifurcates into two massive intellectual continents:
> - **Rhetoric, Aesthetics & Drama:** Eliciting emotional resonance, poignant pity, or sorrow ([[pathos]], [[pathetic]], [[pathetically]], [[pathetic fallacy]]).
> - **Interpersonal Psychology & Affect:** The architecture of social emotion—solidarity, shared suffering, aversion, or detachment ([[sympathy]], [[sympathetic]], [[empathy]], [[empathetic]], [[antipathy]], [[antipathetic]], [[apathy]], [[apathetic]]).
> - **Severe Personality Disorders:** Pathological deficiencies in social empathy, conscience, and moral culpability ([[psychopath]], [[psychopathic]], [[psychopathy]], [[sociopath]], [[sociopathic]], [[sociopathy]]).
> - **Biomedical Science & Etiology:** The structural analysis and causality of infectious and organic disease ([[pathology]], [[pathological]], [[pathologist]], [[pathogen]], [[pathogenic]], [[pathogenesis]], [[pathognomonic]]).
> - **Organ-Specific Medical Morbidities:** Localized diseases and dysfunctions of organ systems ([[neuropathy]], [[cardiomyopathy]], [[encephalopathy]], [[myopathy]], [[retinopathy]], [[nephropathy]], [[idiopathic]]).
> - **Alternative & Historical Medical Paradigms:** Systematic modalities of treatment ([[homeopathy]], [[osteopathy]], [[allopathy]]).
> - **Parapsychology & Science Fiction:** Extrasensory transmission of mental states ([[telepathy]], [[telepathic]], [[telepathically]]).

---

## 🔀 4. Prefix & Combining Dynamics on path

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | — | [[pathos]], [[pathetic]] | Pure evocative emotion, poignant sorrow, or pitiful vulnerability. |
| **syn-** / **sym-** | "together, with" | [[sympathy]], [[sympathetic]] | Experiencing sorrow, compassion, or harmonic feelings alongside another. |
| **en-** / **em-** | "in, into" | [[empathy]], [[empathetic]] | Imaginatively entering into and projecting oneself into another's feelings. |
| **a-** / **an-** | "without, not" (privative) | [[apathy]], [[apathetic]] | Total suppression, absence, or blunting of emotion, concern, or enthusiasm. |
| **anti-** | "against, opposed" | [[antipathy]], [[antipathetic]] | Deep-seated instinctive aversion, visceral hostility, or repugnance. |
| **tēle-** | "at a distance, far off" | [[telepathy]], [[telepathic]] | Transmitting thoughts, impressions, or feelings across distance without sensory organs. |
| **homoio-** | "similar, like" | [[homeopathy]], [[homeopathic]] | Therapeutic doctrine treating disease with remedies producing similar symptoms. |
| **allo-** | "other, different" | [[allopathy]], [[allopathic]] | Mainstream medical treatment producing effects opposite/different from symptoms. |
| **osteo-** | "bone" | [[osteopathy]], [[osteopathic]] | Therapy emphasizing musculoskeletal manipulation and anatomical alignment. |
| **psycho-** | "mind, soul" | [[psychopath]], [[psychopathy]] | Severe personality disorder marked by callous unconcern and lack of empathy. |
| **socio-** | "society, associate" (Latin) | [[sociopath]], [[sociopathy]] | Antisocial behavioral pattern hostile to communal norms and social conscience. |
| **idio-** | "private, one's own" | [[idiopathic]], [[idiopathy]] | A disease arising spontaneously from unknown, self-contained causes. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-os** (*-ος*) | Greek Neuter Noun | [[pathos]] | Direct philosophical and rhetorical noun naming emotion/suffering. |
| **-ic** (*-ikos*) | Qualitative Adjective | [[pathetic]], [[pathogenic]] | Pertaining to, evoking, or capable of producing suffering or disease. |
| **-y** (*-ia*) | Abstract Quality / Condition | [[sympathy]], [[apathy]], [[pathology]] | Encapsulates the general state of feeling or the formal discipline of disease. |
| **-ist** (*-istēs*) | Specialist / Practitioner | [[pathologist]], [[osteopath]], [[homeopath]] | A professional scientist, physician, or practitioner of a medical discipline. |
| **-logy** (*-logia*) | Scientific Discourse | [[pathology]] | The systematic scientific study of diseased organs and tissues. |
| **-genesis** (*-genesis*) | Generation / Origin | [[pathogenesis]] | The specific chain of cellular events culminating in clinical disease. |
| **-ize** (*-izein*) | Factitive / Inchoate Verb | [[sympathize]], [[empathize]] | To actively share, enter into, or express vicarious emotional states. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Rhetoric & Literary Studies** | [[pathos]], [[pathetic]], [[pathetic fallacy]] | Aristotelian rhetorical appeals, tragic drama catharsis, and Victorian poetic analysis of natural imagery. |
| **Clinical Medicine & Pathology** | [[pathology]], [[pathologist]], [[pathogen]], [[pathogenesis]], [[pathognomonic]] | Histopathological tissue biopsy, identifying microbiological viral agents, and isolating definitive clinical symptoms. |
| **Psychology & Psychiatry** | [[empathy]], [[sympathy]], [[apathy]], [[psychopath]], [[sociopath]] | Assessment of emotional intelligence, autistic and alexithymic states, and antisocial personality inventory diagnostics. |
| **Neurology & Organ Specialists** | [[neuropathy]], [[cardiomyopathy]], [[encephalopathy]], [[retinopathy]] | Diabetic peripheral nerve damage, congestive heart failure etiology, and hypertensive microvascular screening. |
| **History & Medical Philosophy** | [[homeopathy]], [[allopathy]], [[osteopathy]] | 19th-century medical debates between Hahnemannian vitalism, heroic allopathy, and somatic manual therapies. |
| **Science Fiction & Parapsychology** | [[telepathy]], [[telepathic]] | Speculative literature exploring psionic mind-reading, collective consciousness, and hive minds. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antipathetic]] | adjective | **1.** (usually followed by `to') strongly opposed.<br>**2.** Characterized by antagonism or antipathy. | *"Judaism antipathetic Judaism was the antithesis of Christianity, because Judaism engendered the limited form of a national or 133:21 tribal religion."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[antipathetical]] | adjective | **1.** (usually followed by `to') strongly opposed.<br>**2.** Characterized by antagonism or antipathy. | *"In academic literature, antipathetical designates (usually followed by `to') strongly opposed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antipathy]] | noun | **1.** A feeling of intense dislike.<br>**2.** The object of a feeling of intense aversion; something to be avoided. | *"No contraries hold more antipathy Than I and such a knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[apathetic]] | adjective | **1.** Showing little or no emotion or animation.<br>**2.** Marked by a lack of interest. | *"While they uncovered the sheaves he stood apathetic beside his portable repository of force, round whose hot blackness the morning air quivered."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[apathy]] | noun | **1.** An absence of emotion or enthusiasm.<br>**2.** The trait of lacking enthusiasm for or interest in things generally. | *"A phrase like that of Clement of Alexandria, "deifying into apathy we become monadic," is seas away from anything we find in the speech of Jesus."* — T. R. Glover, *The Jesus of History* |
| [[empathetic]] | adjective | **1.** Showing empathy or ready comprehension of others' states. | *"In academic literature, empathetic designates showing empathy or ready comprehension of others' states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathetically]] | adverb | **1.** In a sympathetic manner. | *"In academic literature, empathetically designates in a sympathetic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathic]] | adjective | **1.** Showing empathy or ready comprehension of others' states. | *"Whatever the past might have been, his advanced years called for him to be nonjudgmental, empathic, and healing."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[empathise]] | verb | **1.** Be understanding of. | *"In academic literature, empathise designates be understanding of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathize]] | verb | **1.** Be understanding of. | *"In academic literature, empathize designates be understanding of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathy]] | noun | **1.** Understanding and entering into another's feelings. | *"In academic literature, empathy designates understanding and entering into another's feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeopath]] | noun | **1.** A practitioner of homeopathy. | *"In academic literature, homeopath designates a practitioner of homeopathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeopathic]] | adjective | **1.** Of or relating to the practice of homeopathy. | *"Homeopathic Magic of a Flesh Diet THE PRACTICE of killing a god has now been traced amongst peoples who have reached the agricultural stage of society."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[neuropathy]] | noun | **1.** Any pathology of the peripheral nerves. | *"In academic literature, neuropathy designates any pathology of the peripheral nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopath]] | noun | **1.** A therapist who manipulates the skeleton and muscles. | *"In academic literature, osteopath designates a therapist who manipulates the skeleton and muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopathist]] | noun | **1.** A therapist who manipulates the skeleton and muscles. | *"In academic literature, osteopathist designates a therapist who manipulates the skeleton and muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopathy]] | noun | **1.** Therapy based on the assumption that restoring health is best accomplished by manipulating the skeleton and muscles. | *"I had been treated by doctors and specialists; had taken magnetic treatments and osteopathy; had tried change of climate; had an operation in a hospital, and when I came out was worse than before."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[path]] | noun | **1.** A course of conduct.<br>**2.** A way especially designed for a particular use. | *"Here is a path to’t; ’tis some savage hold."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pathan]] | noun | **1.** A member of the mountain people living in the eastern regions of afghanistan.<br>**2.** An ethnic minority speaking pashto and living in northwestern pakistan and southeastern afghanistan. | *"In academic literature, pathan designates a member of the mountain people living in the eastern regions of afghanistan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathetic]] | adjective | **1.** Deserving or inciting pity; ; ; - galsworthy.<br>**2.** Inspiring mixed contempt and pity. | *"Skimpole was left alone all this time and entertained himself by playing snatches of pathetic airs and sometimes singing to them (as we heard at a distance) with great expression and feeling."* — Charles Dickens, *Bleak House* |
| [[pathetically]] | adverb | **1.** In a manner arousing sympathy and compassion.<br>**2.** Arousing scornful pity. | *"Biddy,” said I, when I gave her my hand at parting, “I am not angry, but I am hurt.” “No, don’t be hurt,” she pleaded quite pathetically; “let only me be hurt, if I have been ungenerous.” Once more, the mists were rising as I walked away."* — Charles Dickens, *Great Expectations* |
| [[pathless]] | adjective | **1.** Lacking pathways. | *"But wide as pathless was the space That lay our lives between, And dangerous as the foamy race Of ocean-surges green."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[pathogen]] | noun | **1.** Any disease-producing agent (especially a virus or bacterium or other microorganism). | *"In academic literature, pathogen designates any disease-producing agent (especially a virus or bacterium or other microorganism)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogenesis]] | noun | **1.** The origination and development of a disease. | *"In academic literature, pathogenesis designates the origination and development of a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogenic]] | adjective | **1.** Able to cause disease. | *"In academic literature, pathogenic designates able to cause disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogenically]] | adverb | **1.** In a pathogenic manner. | *"In academic literature, pathogenically designates in a pathogenic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathologic]] | adjective | **1.** Caused by or altered by or manifesting disease or pathology.<br>**2.** Of or relating to the practice of pathology. | *"In academic literature, pathologic designates caused by or altered by or manifesting disease or pathology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathological]] | adjective | **1.** Of or relating to the practice of pathology.<br>**2.** Caused by or evidencing a mentally disturbed condition. | *"Many industries and branches of industry in America are thus parasitical A condition essentially pathological has come to be looked upon as normal."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[pathologically]] | adverb | **1.** With respect to pathology. | *"In academic literature, pathologically designates with respect to pathology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathologist]] | noun | **1.** A doctor who specializes in medical diagnosis. | *"In academic literature, pathologist designates a doctor who specializes in medical diagnosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathology]] | noun | **1.** The branch of medical science that studies the causes and nature and effects of diseases.<br>**2.** Any deviation from a healthy or normal condition. | *"A model clergyman, like a model doctor, ought to think his own profession the finest in the world, and take all knowledge as mere nourishment to his moral pathology and therapeutics."* — George Eliot, *Middlemarch* |
| [[pathos]] | noun | **1.** A quality that arouses emotions (especially pity or sorrow).<br>**2.** A feeling of sympathy and sorrow for the misfortunes of others. | *"I shall do one thing in this life—one thing certain—that is, love you, and long for you, and _keep wanting you_ till I die.” His voice had a genuine pathos now, and his large brown hands perceptibly trembled."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sympathetic]] | adjective | **1.** Of or relating to the sympathetic nervous system.<br>**2.** Expressing or feeling or resulting from sympathy or compassion or friendly fellow feelings; disposed toward. | *"I am so curious," said Loneli, taking leave, and Mea promised to give the sympathetic Loneli a full report of everything."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sympathise]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** To feel or express sympathy or compassion. | *"While something in me,” he went on, “is acutely sensible to her charms, something else is as deeply impressed with her defects: they are such that she could sympathise in nothing I aspired to—co-operate in nothing I undertook."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sympathiser]] | noun | **1.** Commiserates with someone who has had misfortune.<br>**2.** Someone who shares your feelings or opinions and hopes that you will be successful. | *"I have satisfaction," Charles tells his unfailing sympathiser Coleridge, "in being able to bid you rejoice with me in my sister's continued reason and composedness of mind."* — Anne Gilchrist, *Mary Lamb* |
| [[sympathize]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** Be understanding of. | *"Then with the losers let it sympathize, For nothing can seem foul to those that win. [_The trumpet sounds_.] Enter Worcester and Vernon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sympathizer]] | noun | **1.** Commiserates with someone who has had misfortune.<br>**2.** Someone who shares your feelings or opinions and hopes that you will be successful. | *"So I supposed; but you can't depend upon your horse to tell you whether you are talking to a Yankee sympathizer or an honest Confederate, can you?"* — Harry Castlemon, *Rodney, the Partisan* |
| [[sympathy]] | noun | **1.** An inclination to support or be loyal to or to agree with an opinion.<br>**2.** Sharing the feelings of others (especially feelings of sorrow or anguish). | *"Be what it is, The action of my life is like it, which I’ll keep, if but for sympathy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsympathetic]] | adjective | **1.** Not sympathetic or disposed toward.<br>**2.** (of characters in literature or drama) tending to evoke antipathetic feelings. | *"This consciousness upon which he had intruded was the single opportunity of existence ever vouchsafed to Tess by an unsympathetic First Cause—her all; her every and only chance."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

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
    ROOT DASHBOARD · PATH
  </div>
</div>
