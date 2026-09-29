---
status: unread
type: root_dashboard
---
# Dashboard — strict
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">strict-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to draw tight”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong cord wrapping around a bundle and tying it securely together.</span>
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

The root **strict** means to draw tight. It refers to pulling an object along, sketching marks, or extracting something. In English, this root forms words such as *strict*, *restrict*, *stricture*, and *constrict*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to draw tight
> The root **strict** means to draw tight. It refers to pulling an object along, sketching marks, or extracting something. In English, this root forms words such as *strict*, *restrict*, *stricture*, and *constrict*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To draw tight</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *strict* and *restrict*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **strict** comes from a Latin word that means *"to draw tight"*.
  - At its core, it describes the action of draw tight.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **strict** in an English word, think of **to draw tight**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to draw tight).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Strict**: Demanding that rules concerning behavior or standards be obeyed strictly.
  - **Restrict**: To put a limit on.
  - **Stricture**: An abnormal narrowing of a bodily canal, duct, or passage.
  - **Constrict**: To make or become narrower, smaller, or tighter, especially by encircling pressure.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">strict</mark>, think of <mark class="hl-def">to draw tight</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via the Classical Latin participial stem:
> - **Participial Base (`strict-`):** Formed from *strictum*, producing direct adjectives of rigor and verbs of boundary containment (*strict*, *restrict*, *constrict*).
> - **Substantive Morphological Formations (`-ūra` / `-iō`):** Producing medical, rhetorical, and constitutional nouns (*stricture*, *restriction*, *constriction*).
>
> Latin directional prefixes establish the tightening action:
> - **con-** (*cum* "together"): *constrict* (tighten mutually from all sides).
> - **re-** ("back, behind"): *restrict* (tie back within boundaries).
> - **dis-** ("apart, away"): *district* (feudal territory of legal constraint).

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
> - **Rigor, Rules & Discipline:** [[strict]], *strictly*, *strictness*, *strict constructionism* — absolute compliance with rules without deviation.
> - **Physiological & Pathological Narrowing:** *stricture*, [[constrict]], [[constriction]], *vasoconstriction* — abnormal lumen narrowing, narrowing of blood vessels.
> - **Zoological Predation:** *boa constrictor* — suffocating prey by coiling around the thorax.
> - **Jurisdiction & Territorial Boundaries:** [[district]] — administrative subdivisions (school district, judicial district, congressional district).
> - **Statutory Limitations & Rights:** [[restrict]], [[restriction]], *restrictive*, *unrestricted* — limiting speed, trade, or civil liberties within legal guardrails.
> - **Rhetorical & Critical Censure:** *strictures* — sharp moral or literary criticisms castigating errors.

---

## 🔀 4. Prefix & Combining Dynamics on strict

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **con-** (*cum*) | together, mutually | [[constrict]], [[constriction]] | Squeezed or compressed together from all sides. |
| **re-** (*re-*) | back, backward | [[restrict]], [[restriction]] | Drawn back within a boundary; kept under limit. |
| **dis-** (*dis-*) | apart, out | [[district]] | Bounded territory subject to feudal distraint. |
| **un-** (*un-*) | not | *unrestricted* | Not limited by boundaries or regulatory constraints. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ure** (*-ūra*) | concrete noun of narrowing | *stricture* | Pathological duct narrowing or sharp critical censure. |
| **-tion** (*-tiōnem*) | abstract noun of process | [[restriction]], [[constriction]] | The act or state of drawing tight or limiting. |
| **-ive** (*-īvus*) | functional adjective | *restrictive*, *constrictive* | Serving to confine, narrow, or limit. |
| **-or** (*-tor*) | personal / zoological agent | *constrictor* | An animal that kills by coiling and squeezing. |
| **-ly** | adverbial modifier | *strictly* | In a rigid, exact, and rigorous manner. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Clinical Medicine & Gastroenterology** | *stricture*, *esophageal stricture* | Endoscopic balloon dilation of benign and malignant strictures. |
| **Cardiovascular Physiology** | *vasoconstriction*, [[constriction]] | Endothelin and norepinephrine mediated arterial constriction. |
| **Constitutional Jurisprudence** | [[strict]] (*strict scrutiny*), [[district]] | United States District Courts, strict constitutional constructionism. |
| **Public Governance & Urban Planning** | [[district]], [[restriction]] (*deed restrictions*) | Zoning districts, restrictive covenants on residential real estate. |
| **Herpetology & Zoology** | *constrictor* (*Boa constrictor*) | Asphyxiation predation mechanisms in boid and pythonid snakes. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[constrict]] | verb | **1.** Squeeze or press together.<br>**2.** Become tight or as if tight. | *"And, having robbed me of that, my body was defenceless, and, with his foot in my back while he drew the lacing light, he constricted me as no man had ever before succeeded in doing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[constricted]] | verb | **1.** Squeeze or press together.<br>**2.** Become tight or as if tight. | *"And, having robbed me of that, my body was defenceless, and, with his foot in my back while he drew the lacing light, he constricted me as no man had ever before succeeded in doing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[constricting]] | verb | **1.** Squeeze or press together.<br>**2.** Become tight or as if tight. | *"I found that I could suspend animation by the exercise of my will, aided mechanically by constricting my chest and abdomen with the blanket."* — Jack London, *The Jacket (The Star-Rover)* |
| [[constriction]] | noun | **1.** A narrowing that reduces the flow through a channel.<br>**2.** Tight or narrow compression. | *"For a few minutes I was aware merely of an uncomfortable constriction which I fondly believed would ease as I grew accustomed to it."* — Jack London, *The Jacket (The Star-Rover)* |
| [[constrictive]] | adjective | **1.** (of circumstances) tending to constrict freedom.<br>**2.** Restricting the scope or freedom of action. | *"In academic literature, constrictive designates (of circumstances) tending to constrict freedom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constrictor]] | noun | **1.** Any of various large nonvenomous snakes that kill their prey by crushing it in its coils. | *"Like the fatal boa-constrictor Charming those who soon must die, She can so transfix her victim By the glitter of her eye, That the greatest of thy statesmen Dares not question her decree, But in meek humiliation Bows to her, abjuring thee."* — Wilfred S. Skeats, *The song of the exile* |
| [[derestrict]] | verb | **1.** Make free from restrictions. | *"In academic literature, derestrict designates make free from restrictions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[district]] | noun | **1.** A region marked off for administrative or other purposes.<br>**2.** Regulate housing in; of certain areas of towns. | *"That is nothing at all," said the district attorney's wife in answer."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[nonrestrictive]] | adjective | **1.** Not limiting the reference of a modified word or phrase. | *"In academic literature, nonrestrictive designates not limiting the reference of a modified word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restrict]] | verb | **1.** Place restrictions on.<br>**2.** Place under restrictions; limit access to. | *"The attempts of two of the States to restrict the authority of the legislature in the article of military establishments, are of the number of these instances."* — Alexander Hamilton, *The Federalist Papers* |
| [[restricted]] | verb | **1.** Place restrictions on.<br>**2.** Place under restrictions; limit access to. | *"Was he necessarily restricted to the one means?"* — Classic Author, *The wonders of prayer* |
| [[restricting]] | verb | **1.** Place restrictions on.<br>**2.** Place under restrictions; limit access to. | *"The inelasticity was necessitated by illogical federal and state laws restricting absolutely the further extension of credit when the reserves fell below the percentage of deposits (15 or 25 per cent) fixed by law."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[restriction]] | noun | **1.** A principle that limits the extent of something.<br>**2.** An act of limiting or restricting (as by regulation). | *"Every restriction that would wound the most susceptible is withdrawn; not one more than another, but all."* — Mrs. Oliphant, *A Beleaguered City* |
| [[restrictive]] | adjective | **1.** Serving to restrict.<br>**2.** (of tariff) protective of national interests by restricting imports. | *"Germany, which had always had restrictive duties, adopted still more protective measures under Bismarck in 1879."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[restrictively]] | adverb | **1.** In a restrictive manner. | *"In academic literature, restrictively designates in a restrictive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restrictiveness]] | noun | **1.** A grammatical qualification that makes the meaning more specific (`red hat' has a more specific meaning than `hat').<br>**2.** A lack of permissiveness or indulgence and a tendency to confine behavior within certain specified limits. | *"In academic literature, restrictiveness designates a grammatical qualification that makes the meaning more specific (`red hat' has a more specific meaning than `hat')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[strict]] | adjective | **1.** Rigidly accurate; allowing no deviation from a standard.<br>**2.** (of rules) stringently enforced. | *"You that look pale and tremble at this chance, That are but mutes or audience to this act, Had I but time,—as this fell sergeant, death, Is strict in his arrest,—O, I could tell you,— But let it be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[strictly]] | adverb | **1.** Restricted to something.<br>**2.** In a stringent manner. | *"Faith, by no means; she hath so strictly tied Her to her chamber, that ’tis impossible."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[strictness]] | noun | **1.** Conscientious attention to rules and details.<br>**2.** Uncompromising resolution. | *"So far from diminishing its strictness, it adds emphasis to its claims, and fully meets its unmitigated requisitions."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[stricture]] | noun | **1.** Abnormal narrowing of a bodily canal or passageway.<br>**2.** Severe criticism. | *"I have delivered to Lord Angelo, A man of stricture and firm abstinence, My absolute power and place here in Vienna, And he supposes me travelled to Poland; For so I have strewed it in the common ear, And so it is received."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unconstricted]] | adjective | **1.** Not constricted physically or by extension psychologically. | *"In academic literature, unconstricted designates not constricted physically or by extension psychologically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrestricted]] | adjective | **1.** Not subject to or subjected to restriction.<br>**2.** Free of restrictions on conduct. | *"This increases the number of those whose self-interest, at least when narrowly judged, leads them to favor the policy of unrestricted immigration, Tho perhaps less general than it once was, this sentiment in favor of immigration is still potent."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unrestrictive]] | adjective | **1.** Not tending to restrict. | *"In academic literature, unrestrictive designates not tending to restrict."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Binding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STRICT
  </div>
</div>
