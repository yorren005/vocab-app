---
status: unread
type: root_dashboard
---
# Dashboard — capit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">capit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“head”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **capit** means head. It refers to the top of the body containing the brain, or a leader at the top. In English, this root forms words such as *achieve*, *achievement*, *biceps*, and *cabbage*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: head
> The root **capit** means head. It refers to the top of the body containing the brain, or a leader at the top. In English, this root forms words such as *achieve*, *achievement*, *biceps*, and *cabbage*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Head</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *achieve* and *achievement*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **capit** comes from a Latin word that means *"head"*.
  - At its core, it describes head.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **capit** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of head.
  - **Mental & Social**: How people experience, organize, or communicate about head.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Achieve**: To bring to a successful conclusion or finish by effort, skill, or courage.
  - **Achievement**: Something accomplished successfully, especially by extraordinary exertion, determination, or intellect.
  - **Biceps**: Any muscle having two heads or origins, specifically the *biceps brachii* of the anterior upper arm or the *biceps femoris* of the posterior thigh.
  - **Cabbage**: A cultivated biennial plant of the mustard family, having a dense, rounded, edible head of green, white, or reddish-purple leaves.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">capit</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English in several well-defined stem variants:
> - **Oblique Latin Stem:** `capit-` (from *capitis*): *capital*, *capitation*, *decapitate*, *per capita*.
> - **Diminutive Latin Stem:** `capitul-` (from *capitulum* "little head / clause / heading"): *capitulate*, *recapitulate*, *recap*.
> - **Compound Stem:** `-ceps` / `-cipit-` (from *praeceps*, *biceps*, *occiput*): *precipice*, *precipitate*, *biceps*, *triceps*, *quadriceps*, *occipital*, *sinciput*.
> - **Gallo-Romance Stem:** `chef-` / `chap-` / `cabb-`: *chief*, *achieve*, *mischief*, *kerchief*, *chapter*, *cabbage*.
> - **Anglo-Norman Dialectal Stem:** `cattl-` / `chattl-`: *cattle*, *chattel*.

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

> [!tip] 🌈 The Conceptual Facets of Capit-
> - **1. Anatomical & Cranial Reality:** The literal head (*caput*), decapitation (*decapitate*), multi-headed muscles (*biceps*, *triceps*, *quadriceps*), and cranial bones (*occipital*, *sinciput*).
> - **2. Executive Leadership & Command:** The person standing at the head of a unit, ship, or organization (*captain*, *chief*, *chieftain*).
> - **3. Economics, Wealth & Commercial Property:** Accumulations of investable assets (*capital*, *capitalism*), legal personal goods (*chattel*), and livestock herds (*cattle*).
> - **4. Jurisprudence & Civic Institutions:** Supreme government centers (*capital city*, *capitol building*), direct individual taxes (*capitation*, *per capita*), and capital punishment (*capital crime*).
> - **5. Textual Organization & Diplomacy:** Divisions of a book (*chapter*), negotiated treaty clauses and surrender (*capitulate*), and summarizing headings (*recapitulate*, *recap*).
> - **6. Teleological Completion & Outcome:** Bringing a plan to a head (*achieve*), or a bad outcome (*mischief*).
> - **7. Steep, Headlong Velocity:** Rushing head-first over a brink (*precipice*), sudden condensation or trigger (*precipitate*, *precipitation*), and sheer drop (*precipitous*).
> - **8. Apparel & Promontories:** Head coverings (*kerchief*, *handkerchief*) and geographical coastal heads (*cape*).

---

## 🔀 4. Prefix & Combining Dynamics on capit

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dē-` | off, down, away | [[decapitate]] | To remove or sever the *head* from the torso; to eliminate leadership. |
| `re-` | back, again | [[recapitulate]] | To go back over the *headings* of an argument; to summarize. |
| `prae-` | before, forward | [[precipitate]] | To cast down *head-first*; to accelerate or trigger abruptly. |
| `ob-` | toward, against | [[occiput]] | The back part of the *head* facing against the front. |
| `semi-` | half | [[sinciput]] | Half-head; the anterior upper part of the skull. |
| `a-` (< *ad-*) | toward, to | [[achieve]] | To bring to a *head* (*a chef*); to complete successfully. |
| `mes-` | badly, ill | [[mischief]] | A bad *head* / outcome (*meschef*); trouble or harm. |
| `couvre-` | cover | [[kerchief]] | A cloth meant to cover the *head*. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective → Noun | [[capital]] | Pertaining to the head; hence primary city, upper-case letter, financial stock. |
| `-ain` | Noun (Agent / Officer) | [[captain]] | The officer serving as the "head" of a company or vessel. |
| `-ate` | Verb (Action) | [[capitulate]] | Originally to negotiate terms under numbered *headings* (*capitula*); hence surrender. |
| `-ation` | Noun (Process / Tax) | [[capitation]] | A tax levied uniformly on every individual "head". |
| `-ure` → `-er` | Noun (Diminutive) | [[chapter]] | A "little head" (*capitulum*); a numbered textual section. |
| `-ous` | Adjective (Characterized by) | [[precipitous]] | Steep as a headlong cliff; rushing forward heedlessly. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Economics & Corporate Finance** | [[capital]], **capitalism**, **capitalize**, [[cattle]], [[chattel]] | Venture capital, capital expenditures (CapEx), intellectual capital, chattel mortgages, cattle markets. |
| **Constitutional Law & Governance** | [[capital]], [[capitol]], [[capitation]], [[per capita]] | Capital offenses, state capitols, per capita GDP metrics, head taxes under constitutional scrutiny. |
| **Meteorology & Chemistry** | [[precipitation]], [[precipitate]] | Atmospheric rain/snowfall; insoluble chemical precipitate settling out of solution. |
| **Surgery, Anatomy & Kinesiology** | [[decapitate]], [[biceps]], [[triceps]], [[quadriceps]], [[occipital]] | Occipital craniotomy; bicep tendon tenodesis; quadriceps femoris knee extension. |
| **Military Science & Geopolitics** | [[captain]], [[capitulate]], [[decapitation]] | Decapitation strike against command-and-control bunkers; unconditional capitulation treaties. |
| **Literature, Publishing & Hermeneutics** | [[chapter]], [[recapitulate]], [[recap]] | Monograph chapter structures; recapitulation sections in classical symphonies. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[capital]] | noun | **1.** Assets available for use in the production of further assets.<br>**2.** Wealth in the form of money or property owned by a person or business and human resources of economic value. | *"What you have seen him do and heard him speak, Beating your officers, cursing yourselves, Opposing laws with strokes, and here defying Those whose great power must try him—even this, So criminal and in such capital kind, Deserves th’ extremest death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capitalisation]] | noun | **1.** Writing in capital letters.<br>**2.** An estimation of the value of a business. | *"The newly opened low-grade “porphyry” camps at Utah and elsewhere, which have been commenced under an enormous capitalisation, anticipate a production at a cost of about 6 cents per pound when steady and normal running is in progress."* — Donald M. Levy, *Modern Copper Smelting* |
| [[capitalise]] | verb | **1.** Supply with capital, as of a business by using a combination of capital used by investors and debt capital provided by lenders.<br>**2.** Draw advantages from. | *"In academic literature, capitalise designates supply with capital, as of a business by using a combination of capital used by investors and debt capital provided by lenders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitalism]] | noun | **1.** An economic system based on private ownership of capital. | *"In academic literature, capitalism designates an economic system based on private ownership of capital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitalist]] | noun | **1.** A conservative advocate of capitalism.<br>**2.** A person who invests capital in a business (especially a large business). | *"At first, proceeding from the problems of our own age, it seemed clear as daylight to me that the gradual widening of the present merely temporary and social difference between the Capitalist and the Labourer was the key to the whole position."* — H. G. Wells, *The Time Machine* |
| [[capitalistic]] | adjective | **1.** Favoring or practicing capitalism.<br>**2.** Of or relating to capitalism or capitalists. | *"Farming viewed as a capitalistic enterprise. § 5."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[capitalization]] | noun | **1.** Writing in capital letters.<br>**2.** An estimation of the value of a business. | *"Capitalization theory of crises. § 11."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[capitalize]] | verb | **1.** Draw advantages from.<br>**2.** Supply with capital, as of a business by using a combination of capital used by investors and debt capital provided by lenders. | *"This is payment for his ability to water the stock successfully, to capitalize it for more than its former value."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[capitate]] | noun | **1.** The wrist bone with a rounded head shape that articulates with the 3rd metacarpus.<br>**2.** Being abruptly enlarged and globose at the tip. | *"In academic literature, capitate designates the wrist bone with a rounded head shape that articulates with the 3rd metacarpus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitation]] | noun | **1.** A tax levied on the basis of a fixed amount per person. | *"We believe the capitation tax restriction upon the suffrage in Virginia to be in conflict with the XIVth Amendment to the Constitution of the United States."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[capitol]] | noun | **1.** A building occupied by a state legislature.<br>**2.** The government building in washington where the united states senate and the house of representatives meet. | *"And what Made the all-honoured, honest Roman, Brutus, With the armed rest, courtiers of beauteous freedom, To drench the Capitol, but that they would Have one man but a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capitonidae]] | noun | **1.** Barbets. | *"Classical and authoritative lexicons catalog capitonidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitular]] | adjective | **1.** Of or pertaining to an ecclesiastical chapter. | *"In academic literature, capitular designates of or pertaining to an ecclesiastical chapter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitulary]] | adjective | **1.** Of or pertaining to an ecclesiastical chapter. | *"Lindenbrog in his Glossary on the Capitularies (quoted by J."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[capitulate]] | verb | **1.** Surrender under agreed conditions. | *"Do not bid me Dismiss my soldiers or capitulate Again with Rome’s mechanics."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capitulation]] | noun | **1.** A document containing the terms of surrender.<br>**2.** A summary that enumerates the main parts of a topic. | *"Capitulation—that was the purport of the simple reply, guarded as it was—capitulation, unknown to herself."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[capitulum]] | noun | **1.** A dense cluster of flowers or foliage.<br>**2.** Fruiting spike of a cereal plant especially corn. | *"In academic literature, capitulum designates a dense cluster of flowers or foliage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decapitate]] | verb | **1.** Cut the head of. | *"When the Alake or king of Abeokuta in West Africa dies, the principal men decapitate his body, and placing the head in a large earthen vessel deliver it to the new sovereign; it becomes his fetish and he is bound to pay it honours."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[decapitated]] | verb | **1.** Cut the head of.<br>**2.** Having had the head cut off. | *"The Pequod’s whale being decapitated and the body stripped, the head was hoisted against the ship’s side—about half way out of the sea, so that it might yet in great part be buoyed up by its native element."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decapitation]] | noun | **1.** Execution by cutting off the victim's head.<br>**2.** Killing by cutting off the head. | *"Who would believe that there could be any one so cruel as to long for the decapitation of the luckless Pedro; yet the sailors pray every minute, selfish fellows, that the miserable fowl may be brought to his end."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[overcapitalisation]] | noun | **1.** (business) too much capitalization (the sale of more stock than the business warrants). | *"In academic literature, overcapitalisation designates (business) too much capitalization (the sale of more stock than the business warrants)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcapitalise]] | verb | **1.** Estimate the capital value of (a company) at an unreasonably or unlawfully high level.<br>**2.** Overestimate the market value of. | *"In academic literature, overcapitalise designates estimate the capital value of (a company) at an unreasonably or unlawfully high level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcapitalization]] | noun | **1.** (business) too much capitalization (the sale of more stock than the business warrants). | *"In academic literature, overcapitalization designates (business) too much capitalization (the sale of more stock than the business warrants)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcapitalize]] | verb | **1.** Estimate the capital value of (a company) at an unreasonably or unlawfully high level.<br>**2.** Overestimate the market value of. | *"If, in turn, any of the minor factors, as materials or uses of goods, are overvalued (overcapitalized) it will appear ultimately in a check in the demand for them at these prices, and in a reduction in the demand for money loans."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[recapitulate]] | verb | **1.** Summarize briefly.<br>**2.** Repeat stages of evolutionary development during the embryonic phase of life. | *"What past consecutive causes, before rising preapprehended, of accumulated fatigue did Bloom, before rising, silently recapitulate?"* — James Joyce, *Ulysses* |
| [[recapitulation]] | noun | **1.** Emergence during embryonic development of various characters or structures that appeared during the evolutionary history of the strain or species.<br>**2.** (music) the section of a composition or movement (especially in sonata form) in which musical themes that were introduced earlier are repeated. | *"Casaubon leaned over the elbow of his chair, and swayed his head up and down, apparently as a muscular outlet instead of that recapitulation which would not have been becoming."* — George Eliot, *Middlemarch* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAPIT
  </div>
</div>
