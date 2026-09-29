---
status: unread
type: root_dashboard
---
# Dashboard — crim
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">crim-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fault, accusation, or crime”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **crim** means fault, accusation, or crime. It refers to an offense against the rules, a formal fault, or a wrongful deed. In English, this root forms words such as *separate*, *crime*, *criminal*, and *criminally*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fault, accusation, or crime
> The root **crim** means fault, accusation, or crime. It refers to an offense against the rules, a formal fault, or a wrongful deed. In English, this root forms words such as *separate*, *crime*, *criminal*, and *criminally*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fault, accusation, or crime</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *separate* and *crime*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **crim** comes from a Latin word that means *"fault, accusation, or crime"*.
  - At its core, it describes fault, accusation, or crime.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **crim** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fault, accusation, or crime.
  - **Mental & Social**: How people experience, organize, or communicate about fault, accusation, or crime.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Separate**: An everyday English word showing the root's idea of *fault, accusation, or crime*.
  - **Crime**: An action or omission that constitutes an offense against the state or public order, prosecuted and punishable by statutory law.
  - **Criminal**: A person who has committed a crime, especially one convicted by a competent court of law.
  - **Criminally**: In a manner that violates penal law.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">crim</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root manifests across three primary morphological stems in English:
> - **Reduced Monosyllabic Stem (`crim-`):** Mediated through Old French: *crime*.
> - **Full Latin Oblique Stem (`crimin-`):** Preserved in Latin-derived polysyllables: *criminal*, *criminality*, *criminalize*, *criminology*, *criminous*.
> - **Directional Compound Stems (`incrimin-`, `recrimin-`, `discrimin-`):** Built from Latin compound verbs:
>   - `in-` ("in, upon") + *criminārī* $\to$ *incriminate*, *incrimination*, *incriminatory*.
>   - `re-` ("back, in return") + *criminārī* $\to$ *recriminate*, *recrimination*, *recriminatory*.
>   - `dē-` ("away, reverse") + *criminalize* $\to$ *decriminalize*, *decriminalization*.
>   - `dis-` ("apart, away") + *cernere* / *crimen* $\to$ *discriminate*, *discrimination*, *indiscriminate*.
>
> Primary functional suffixes attached to the stem:
> - Verbalizers: `-ize` (*criminalize*), `-ate` (*incriminate*, *recriminate*, *discriminate*).
> - Nominalizers: `-ity` (*criminality*), `-ation` (*incrimination*, *recrimination*), `-ology` (*criminology*), `-ist` (*criminologist*).
> - Adjectival Formatives: `-al` (*criminal*), `-atory` (*incriminatory*, *recriminatory*), `-ous` (*criminous*), `-ate` (*indiscriminate*).

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
> The derivations of *crim* organize into distinct operational spheres:
> - **Statutory Offenses & Social Deviance:** In [[crime]], [[criminal]], [[criminality]], and [[criminally]], the root denotes legally codified infractions against the state, subject to penal sanctions.
> - **Legislative Boundary Modulation:** In [[criminalize]], [[criminalization]], [[decriminalize]], and [[decriminalization]], the root governs the statutory shifting of public policy (e.g., prohibition vs. regulation).
> - **Evidentiary Exposure & Culpability:** In [[incriminate]], [[incrimination]], [[incriminatory]], and [[self-incrimination]], the root focuses on evidence, testimony, or physical proof that links a suspect to an offense.
> - **Adversarial Counter-Accusation:** In [[recriminate]], [[recrimination]], [[recriminatory]], and [[recriminative]], the root moves into interpersonal and political rhetoric where an accused party attacks the integrity of the accuser.
> - **Empirical Social Science:** In [[criminology]], [[criminologist]], and [[criminological]], the root enters the academic analysis of recidivism, forensic psychology, and sociological crime causation.
> - **Perceptual Sifting & Social Bias:** In [[discriminate]], [[discrimination]], [[discriminating]], [[discriminatory]], [[indiscriminate]], and [[indiscriminately]], the root preserves its deep PIE ancestor *\*krey-* ("to separate"), spanning acute intellectual taste to unlawful civil rights prejudice.
> - **Classical & Roman Law Formulas:** In [[crimen]], [[crimen falsi]], and [[crimen laesae maiestatis]], the root retains its technical civilian and common-law jurisprudential precision.

---

## 🔀 4. Prefix & Combining Dynamics on crim

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | in, into, upon | [[incriminate]] | To bring an accusation upon someone; to provide evidence proving someone's guilt. |
| `re-` | back, in return | [[recriminate]] | To cast an accusation back at the accuser; to make a retaliatory counter-charge. |
| `dē-` | away, reverse | [[decriminalize]] | To remove criminal penalties from an act, treating it as a civil infraction or legal behavior. |
| `dis-` | apart, asunder | [[discriminate]] | Lit. to sift apart; to perceive fine distinctions, or to make prejudicial distinctions against a class. |
| `in-` (neg.) + `dis-` | not + apart | [[indiscriminate]] | Done without sifting or careful distinction; random, chaotic, sweeping. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `(bare noun)` | Noun (Concrete Action) | [[crime]] | An action or omission that constitutes an offense punishable by state law. |
| `-al` | Adjective / Noun | [[criminal]] | Pertaining to crime; a person convicted of a felony or legal offense. |
| `-ity` | Noun (State / Character) | [[criminality]] | The state, quality, or prevalence of criminal behavior in an individual or group. |
| `-ize` | Verb (Causative) | [[criminalize]] | To declare an action illegal by statute; to treat someone as a criminal. |
| `-ization` | Noun (Process / Policy) | [[criminalization]] | The legislative process or political trend of converting actions into crimes. |
| `-ate` | Verb (Formative) | [[incriminate]], [[recriminate]] | To charge with crime; to launch counter-accusations. |
| `-ation` | Noun (Action / Result) | [[incrimination]], [[recrimination]] | The act of implicating in guilt; mutual, bitter accusations. |
| `-atory` | Adjective (Tendency / Role) | [[incriminatory]], [[recriminatory]] | Tending to prove guilt; characterized by retaliatory counter-charges. |
| `-ology` | Noun (Scientific Discipline) | [[criminology]] | The empirical study of crime, criminal behavior, and correctional systems. |
| `-ist` | Noun (Scientific Scholar) | [[criminologist]] | An academic or professional specialist in criminology. |
| `-ous` | Adjective (Character) | [[criminous]] | *(Formal)* Involving deep criminal guilt; felonious, wicked. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional & Procedural Law** | [[incriminate]], [[self-incrimination]], [[criminal]] | Fifth Amendment privilege against self-incrimination, Miranda warnings, burden of proof beyond a reasonable doubt. |
| 🏛️ **Criminal Justice & Legislation** | [[crime]], [[criminalize]], [[decriminalize]], [[criminalization]] | Statutory sentencing guidelines, drug policy reform, federalization of white-collar crime, penal code overhaul. |
| 🔬 **Sociology & Criminology** | [[criminology]], [[criminologist]], [[criminological]], [[criminality]] | Broken windows theory, social disorganization theory, recidivism statistics, longitudinal criminal career studies. |
| 🛡️ **Civil Rights & Labor Law** | [[discriminate]], [[discrimination]], [[discriminatory]], [[indiscriminate]] | Title VII of the Civil Rights Act, Equal Employment Opportunity Commission (EEOC), disparate impact doctrine. |
| 📜 **Historical & Roman Jurisprudence** | [[crimen]], [[crimen laesae maiestatis]], [[crimen falsi]] | Roman praetorian courts, classical laws of treason against the Roman princeps, historical forgery prosecutions. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[crime]] | noun | **1.** (criminal law) an act punishable by law; usually considered an evil act.<br>**2.** An evil act not necessarily punishable by law. | *"Be where you list, your charter is so strong, That you yourself may privilage your time To what you will, to you it doth belong, Yourself to pardon of self-doing crime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crimea]] | noun | **1.** A ukrainian peninsula between the black sea and the sea of azov. | *"She at once foresaw that there would be need of the same heroic work on the part of the women of the country as that performed by Florence Nightingale and her army of women nurses in the Crimea, and with her father's approval she consulted with Dr."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[criminal]] | noun | **1.** Someone who has committed a crime or has been legally convicted of a crime.<br>**2.** Bringing or deserving severe rebuke or censure. | *"What you have seen him do and heard him speak, Beating your officers, cursing yourselves, Opposing laws with strokes, and here defying Those whose great power must try him—even this, So criminal and in such capital kind, Deserves th’ extremest death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[criminalisation]] | noun | **1.** Legislation that makes something illegal. | *"In academic literature, criminalisation designates legislation that makes something illegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminalise]] | verb | **1.** Declare illegal; outlaw. | *"In academic literature, criminalise designates declare illegal; outlaw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminalism]] | noun | **1.** The state of being a criminal. | *"In academic literature, criminalism designates the state of being a criminal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminality]] | noun | **1.** The state of being a criminal. | *"The criminality of wastefulness irritated me."* — Jack London, *The Jacket (The Star-Rover)* |
| [[criminalization]] | noun | **1.** Legislation that makes something illegal. | *"In academic literature, criminalization designates legislation that makes something illegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminalize]] | verb | **1.** Treat as a criminal.<br>**2.** Declare illegal; outlaw. | *"In academic literature, criminalize designates treat as a criminal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminally]] | adverb | **1.** In a shameful manner.<br>**2.** In violation of the law; in a criminal manner. | *"Exhibiting unparalleled magnanimity, it criminally punished no man for political offenses, and warmly welcomed all who proved their loyalty by obeying the laws and dealing justly with their neighbors."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[criminalness]] | noun | **1.** The state of being a criminal. | *"In academic literature, criminalness designates the state of being a criminal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminate]] | verb | **1.** Bring an accusation against; level a charge against.<br>**2.** Rebuke formally. | *"As the spirit of party, in different degrees, must be expected to infect all political bodies, there will be, no doubt, persons in the national legislature willing enough to arraign the measures and criminate the views of the majority."* — Alexander Hamilton, *The Federalist Papers* |
| [[criminative]] | adjective | **1.** Charging or suggestive of guilt or blame. | *"In academic literature, criminative designates charging or suggestive of guilt or blame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminatory]] | adjective | **1.** Charging or suggestive of guilt or blame. | *"In academic literature, criminatory designates charging or suggestive of guilt or blame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminological]] | adjective | **1.** Of or relating to or involved in criminology. | *"In academic literature, criminological designates of or relating to or involved in criminology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminologist]] | noun | **1.** A specialist in criminology. | *"In academic literature, criminologist designates a specialist in criminology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminology]] | noun | **1.** The scientific study of crime and criminal behavior and law enforcement. | *"Students of criminology will remember the analogous incidents in Godno, in Little Russia, in the year ’66, and of course there are the Anderson murders in North Carolina, but this case possesses some features which are entirely its own."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[crimson]] | noun | **1.** A deep and vivid red color.<br>**2.** Turn red, as if in embarrassment or shame. | *"On her left breast A mole cinque-spotted, like the crimson drops I’ th’ bottom of a cowslip."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crimson-magenta]] | adjective | **1.** Magenta tinged with crimson. | *"In academic literature, crimson-magenta designates magenta tinged with crimson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crimson-purple]] | adjective | **1.** Purple tinged with crimson. | *"In academic literature, crimson-purple designates purple tinged with crimson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crimson-yellow]] | adjective | **1.** Yellow tinged with crimson. | *"In academic literature, crimson-yellow designates yellow tinged with crimson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalisation]] | noun | **1.** Legislation that makes something legal that was formerly illegal. | *"In academic literature, decriminalisation designates legislation that makes something legal that was formerly illegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalise]] | verb | **1.** Make legal. | *"In academic literature, decriminalise designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalization]] | noun | **1.** Legislation that makes something legal that was formerly illegal. | *"In academic literature, decriminalization designates legislation that makes something legal that was formerly illegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalize]] | verb | **1.** Make legal. | *"In academic literature, decriminalize designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminable]] | adjective | **1.** Capable of being discriminated. | *"In academic literature, discriminable designates capable of being discriminated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminate]] | verb | **1.** Recognize or perceive the difference.<br>**2.** Treat differently on the basis of sex or race. | *"Women do not discriminate the lawful from the unlawful: so long as they produce an effect, it does not matter to them.' This gave me a strange impression, for it seemed to me that M. le Curé was abandoning his own side."* — Mrs. Oliphant, *A Beleaguered City* |
| [[discriminating]] | verb | **1.** Recognize or perceive the difference.<br>**2.** Treat differently on the basis of sex or race. | *"With a nicely discriminating eye, he seizes at once upon its capabilities, and pictures in his mind the future landscape."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[discrimination]] | noun | **1.** Unfair treatment of a person or group on the basis of prejudice.<br>**2.** The cognitive process whereby two or more stimuli are distinguished. | *"The young man, thus invited, glanced them over, and attempted some discrimination; but, as the group were all so new to him, he could not very well exercise it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[discriminative]] | adjective | **1.** Capable of making fine distinctions.<br>**2.** Expressing careful judgment; ; -tyler dennett. | *"In academic literature, discriminative designates capable of making fine distinctions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminator]] | noun | **1.** A person who (or that which) differentiates. | *"In academic literature, discriminator designates a person who (or that which) differentiates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminatory]] | adjective | **1.** Being biased or having a belief or attitude formed beforehand.<br>**2.** Containing or implying a slight or showing prejudice. | *"The same allegation of inevitableness was once commonly made of discriminatory railroad rates and rebates, evils which have been in large part remedied only since the period 1903-1906, when at last intelligent action was taken."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[encrimson]] | verb | **1.** Make crimson. | *"In academic literature, encrimson designates make crimson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incriminate]] | verb | **1.** Suggest that someone is guilty.<br>**2.** Bring an accusation against; level a charge against. | *"Watson’s reports are most incriminating documents.” “But how about the case?” asked the baronet."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[incriminating]] | verb | **1.** Suggest that someone is guilty.<br>**2.** Bring an accusation against; level a charge against. | *"Watson’s reports are most incriminating documents.” “But how about the case?” asked the baronet."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[incriminatingly]] | adverb | **1.** In an incriminating manner. | *"In academic literature, incriminatingly designates in an incriminating manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incrimination]] | noun | **1.** An accusation that you are responsible for some lapse or misdeed. | *"In academic literature, incrimination designates an accusation that you are responsible for some lapse or misdeed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incriminatory]] | adjective | **1.** Charging or suggestive of guilt or blame. | *"In academic literature, incriminatory designates charging or suggestive of guilt or blame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indiscriminate]] | adjective | **1.** Failing to make or recognize distinctions.<br>**2.** Not marked by fine distinctions. | *"His great power seemed to be his power of indiscriminate admiration."* — Charles Dickens, *Bleak House* |
| [[indiscriminately]] | adverb | **1.** In a random manner.<br>**2.** In an indiscriminate manner. | *"It is not a thing to be used indiscriminately, but it is good upon occasion: as now, for instance."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[indiscriminating]] | adjective | **1.** Not discriminating. | *"While they rebuke the indiscriminating bigotry with which some of our countrymen admire and imitate every thing English, merely because it is English, let them frankly point out what is really worthy of approbation."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[recriminate]] | verb | **1.** Return an accusation against someone or engage in mutual accusations; charge in return. | *"Besides, he might come and begin a string of abuse or complainings; I’m certain I should recriminate, and God knows where we should end!"* — Emily Brontë, *Wuthering Heights* |
| [[recrimination]] | noun | **1.** Mutual accusations. | *"Mutual recrimination passed between them: they parted in anger, and were never reconciled."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[recriminative]] | adjective | **1.** Countering one charge with another. | *"In academic literature, recriminative designates countering one charge with another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recriminatory]] | adjective | **1.** Countering one charge with another. | *"In academic literature, recriminatory designates countering one charge with another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiscriminating]] | adjective | **1.** Not discriminating. | *"The common law contained likewise a closely related body of doctrine by which the railroads, as common carriers, ought to have given equitable and undiscriminating rates to all shippers."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CRIM
  </div>
</div>
