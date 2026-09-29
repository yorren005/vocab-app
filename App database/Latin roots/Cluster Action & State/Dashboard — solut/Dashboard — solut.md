---
status: unread
type: root_dashboard
---
# Dashboard — solut
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">solut-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“loosened, untied, or dissolved”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **solut** means loosened, untied, or dissolved. It refers to loosened, unbound, dissolved, released, resolved. In English, this root forms words such as *solution*, *solute*, *soluble*, and *solubility*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: loosened, untied, or dissolved
> The root **solut** means loosened, untied, or dissolved. It refers to loosened, unbound, dissolved, released, resolved. In English, this root forms words such as *solution*, *solute*, *soluble*, and *solubility*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Loosened, untied, or dissolved</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *solution* and *solute*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **solut** comes from a Latin word that means *"loosened, untied, or dissolved"*.
  - At its core, it describes loosened, untied, or dissolved.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **solut** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of loosened, untied, or dissolved.
  - **Mental & Social**: How people experience, organize, or communicate about loosened, untied, or dissolved.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Solution**: A means of solving a problem or dealing with a difficult situation.
  - **Solute**: The minor component in a solution, dissolved in the solvent.
  - **Soluble**: Able to be dissolved, especially in water.
  - **Solubility**: The chemical property of a solute to dissolve in a given solvent at a specified temperature and pressure.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">solut</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The participial stem **solut-** attaches to classical Latin prefixes to yield four major semantic systems:
> - **`ab-` (from, away) + `solut-` → `absolut-`:**
>   - *absolūtus* ("freed from constraint") → *absolute*, *absolutely*, *absolutism*, *absolutist*.
>   - *absolūtiō* ("acquittal, forgiveness") → *absolution*.
> - **`dis-` (apart, in pieces) + `solut-` → `dissolut-`:**
>   - *dissolūtus* ("lax, unbuttoned") → *dissolute*, *dissolutely*, *dissoluteness*.
>   - *dissolūtiō* ("disintegration, ending") → *dissolution*.
> - **`re-` (again, intensive) + `solut-` → `resolut-`:**
>   - *resolūtus* ("untied; determined") → *resolute*, *resolutely*, *resolution*.
>   - `ir-` (*in-*, not) + *resolute* → *irresolute*, *irresolution*.
> - **Direct Base Forms (`solut-`):**
>   - *solūtiō* → *solution*.
>   - *solute* (dissolved substance).
>   - *solūbilis* → *soluble*, *solubility*, *insoluble*, *insolubility*.

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
> The prefix directs the nature of the unbinding:
> - **Chemical & Physical Sense:** In [[solution]], [[solute]], and [[soluble]], it denotes the dispersion of molecules within a liquid solvent.
> - **Intellectual & Problem-Solving Sense:** In [[solution]] and [[resolution]], it marks the unraveling of a perplexing mystery, mathematical puzzle, or conflict.
> - **Moral & Ethical Sense:** In [[dissolute]], it denotes lack of moral restraint; in [[absolution]], it denotes spiritual release from the penalty of sin.
> - **Character & Willpower Sense:** In [[resolute]] and [[irresolute]], it describes the firmness of human purpose and decision.
> - **Political & Sovereign Sense:** In [[absolute]] and [[absolutism]], it denotes sovereign power free from constitutional checks or limitations.
> - **Institutional Termination Sense:** In [[dissolution]], it denotes the formal ending of a parliament, marriage, or corporate partnership.

---

## 🔀 4. Prefix & Combining Dynamics on solut

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ab-` | away from | [[absolute]] | Loosened *away* from all limitations or conditions; complete. |
| `ab-` | away from | [[absolution]] | Formal release *away* from guilt, sin, or legal penalty. |
| `dis-` | apart, in pieces | [[dissolute]] | Morally loosened *apart*; lax, wanton, and dissipated. |
| `dis-` | apart, in pieces | [[dissolution]] | The breaking *apart* or official termination of an institution. |
| `re-` | back, intensive | [[resolute]] | Firmly determined; having untied internal doubt. |
| `in-` | not, un- | [[insoluble]] | *Not* capable of being dissolved in liquid, or not capable of solution. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (Act / Result) | [[solution]] | The act of solving a problem, or a liquid mixture. |
| `-ism` | Noun (Political Doctrine) | [[absolutism]] | The acceptance of total, unconstrained sovereign power. |
| `-uble` | Adjective (Dissolvable) | [[soluble]] | Capable of dissolving in a solvent. |
| `-ute` | Noun / Adjective | [[solute]] | The substance dissolved in a liquid solution. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧪 **General & Analytical Chemistry** | [[solution]], [[solute]], [[soluble]], [[solubility]] | Aqueous molarity, solvent dissolution kinetics, solubility product constants ($K_{sp}$). |
| 🏛️ **Political Science & Statecraft** | [[absolutism]], [[dissolution]], [[resolution]] | European absolute monarchies, parliamentary dissolutions, UN Security Council resolutions. |
| ⛪ **Theology & Canon Law** | [[absolution]], [[dissolute]] | Sacramental penance, remission of sins, moral theology on vice. |
| 💻 **Digital Imaging & Displays** | [[resolution]] | Pixel density (4K/8K displays), optical sensor resolving power, print DPI. |
| 🧠 **Psychology & Character Ethics** | [[resolute]], [[irresolute]], [[dissolute]] | Volitional self-regulation, decisiveness vs. chronic procrastination. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[absolute]] | noun | **1.** Something that is conceived or that exists independently and not in relation to other things; something that does not depend on anything else and is beyond human control; something that is not relative.<br>**2.** Perfect or complete or pure. | *"Lord Alexas, sweet Alexas, most anything Alexas, almost most absolute Alexas, where’s the soothsayer that you praised so to th’ queen?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absolutely]] | adverb | **1.** Completely and without qualification; used informally as intensifiers.<br>**2.** Totally and definitely; without question. | *"Hath the Prince John a full commission, In very ample virtue of his father, To hear and absolutely to determine Of what conditions we shall stand upon?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absoluteness]] | noun | **1.** The quality of being complete or utter or extreme.<br>**2.** The quality of being absolute. | *"The absoluteness of possession pleased them, and they realized it as the first moment of their experience under their own exclusive roof-tree."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[absolution]] | noun | **1.** The condition of being formally forgiven by a priest in the sacrament of penance.<br>**2.** The act of absolving or remitting; formal redemption as pronounced by a priest in the sacrament of penance. | *"Thoughts are but dreams till their effects be tried; The blackest sin is cleared with absolution."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absolutism]] | noun | **1.** Dominance through threat of punishment and violence.<br>**2.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.). | *"The refuge from the constant perils of an unrestrained Democracy was always found in despotism, and when absolutism became intolerable, the tide of passion would surge back to Democracy."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[absolutist]] | noun | **1.** One who advocates absolutism.<br>**2.** Pertaining to the principle of totalitarianism. | *"And Cecil Winwood still lives, while I, of all men concerned, the utterest, absolutist, innocentest, go to the scaffold in a few short weeks."* — Jack London, *The Jacket (The Star-Rover)* |
| [[absolutistic]] | adjective | **1.** Pertaining to the principle of totalitarianism. | *"In academic literature, absolutistic designates pertaining to the principle of totalitarianism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissolute]] | adjective | **1.** Unrestrained by convention or morality. | *"His dissolute disease will scarce obey this medicine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissolutely]] | adverb | **1.** In a dissolute way. | *"That I am freely dissolved, and dissolutely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissoluteness]] | noun | **1.** Indiscipline with regard to sensuous pleasures. | *"In academic literature, dissoluteness designates indiscipline with regard to sensuous pleasures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissolution]] | noun | **1.** Separation into component parts.<br>**2.** The process of going into solution. | *"None, but that there is so great a fever on goodness that the dissolution of it must cure it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[irresolute]] | adjective | **1.** Uncertain how to act or proceed. | *"He saw her too; yet he looked grave, and seemed irresolute, and only by very slow degrees came at last near enough to speak to her."* — Jane Austen, *Persuasion* |
| [[irresolutely]] | adverb | **1.** Lacking determination or decisiveness. | *"When she brought her master his breakfast on Sunday, she stood irresolutely holding the doorknob in her hand."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[irresoluteness]] | noun | **1.** The trait of being irresolute; lacking firmness of purpose. | *"His very melancholy, and the dejection of spirits he had so long been in, produced an irresoluteness and wavering of purpose which kept him from proceeding to extremities."* — Charles Lamb, *Tales from Shakespeare* |
| [[irresolution]] | noun | **1.** Doubt concerning two or more possible alternatives or courses of action.<br>**2.** The trait of being irresolute; lacking firmness of purpose. | *"He had no power to resist, all was wickedness, irresolution, constant yielding."* — Classic Author, *The wonders of prayer* |
| [[resolute]] | adjective | **1.** Firm in purpose or belief; characterized by firmness and determination.<br>**2.** Characterized by quickness and firmness. | *"I had myself notice of my brother’s purpose herein, and have by underhand means laboured to dissuade him from it; but he is resolute."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resolutely]] | adverb | **1.** Showing firm determination or purpose.<br>**2.** With firmness. | *"Thrice-noble Suffolk, ’tis resolutely spoke."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resoluteness]] | noun | **1.** The trait of being resolute. | *"In academic literature, resoluteness designates the trait of being resolute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resolution]] | noun | **1.** A formal expression by a meeting; agreed to by a vote.<br>**2.** The ability of a microscope or telescope to measure the angular separation of images that are close together. | *"My resolution and my hands I’ll trust; None about Caesar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[solute]] | noun | **1.** The dissolved matter in a solution; the component of a solution that changes its state. | *"God had been graciously preparing me during many years for the reception of this final revelation of the ab- 107:6 solute divine Principle of scientific mental healing."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[solution]] | noun | **1.** A homogeneous mixture of two or more substances; frequently (but not necessarily) a liquid solution.<br>**2.** A statement that solves a problem or explains how to solve the problem. | *"She could only offer one solution; it was, perhaps, for Elizabeth’s sake."* — Jane Austen, *Persuasion* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SOLUT
  </div>
</div>
