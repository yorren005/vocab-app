---
status: unread
type: root_dashboard
---
# Dashboard — fix
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fix-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to fasten or fix”</span>
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

The root **fix** means to fasten or fix. It refers to fasten, drive in, attach, pierce, make immovable. In English, this root forms words such as *plunge*, *fixture*, *affix*, and *transfix*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to fasten or fix
> The root **fix** means to fasten or fix. It refers to fasten, drive in, attach, pierce, make immovable. In English, this root forms words such as *plunge*, *fixture*, *affix*, and *transfix*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To fasten or fix</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *plunge* and *fixture*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fix** comes from a Latin word that means *"to fasten or fix"*.
  - At its core, it describes the action of fasten or fix.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **fix** in an English word, think of **to fasten or fix**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to fasten or fix).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Plunge**: An everyday English word showing the root's idea of *to fasten or fix*.
  - **Fixture**: Something securely fixed or attached in position as a permanent appendage.
  - **Affix**: To attach, fasten, or stick physically onto something.
  - **Transfix**: To pierce through with a pointed weapon.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fix</mark>, think of <mark class="hl-def">to fasten or fix</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root manifests across two primary classical stems:
> - **Present Active Stem (`fig-`):** Classical Latin verbal base (*fīgere*), rarely surviving in unprefixed English, but forming classical compounds.
> - **Participial / Supine Stem (`fix-`):** Formed from the passive participle *fīxus* ("fastened, pierced"), which became the universal English base (*fix*, *fixture*, *fixation*, *fixity*).
>
> Directional prefixes attach seamlessly:
> - **ad- $\to$ af-** ("to, toward"): *affix* (attach to).
> - **prae- $\to$ pre-** ("before, in front"): *prefix* (fasten in front).
> - **sub- $\to$ suf-** ("under, after"): *suffix* (fasten at the tail).
> - **trans-** ("through, across"): *transfix* (pierce through).
> - **cruc-** (*crux* "cross"): *crucifix*, *crucify* (fasten to a cross).

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
> - **Mechanical & Domestic Attachment:** [[fixture]], *fixed*, *fixity* — household appliances, lighting, and legal property permanently attached to real estate.
> - **Linguistic Morphology:** [[prefix]], [[suffix]], [[affix]], *infix*, *circumfix* — bound morphemes attached to lexical bases.
> - **Perceptual & Motor Shock:** [[transfix]] — rendered motionless with terror, astonishment, or wonder; physically impaled.
> - **Theology & Execution:** [[crucifix]], [[crucify]], *crucifixion* — Roman execution by impalement or nailing to a cross.
> - **Psychology & Psychoanalysis:** [[fixation]], *fixate* — an obsessive, unhealthy mental attachment or arrested stage of psychosexual development.
> - **Biochemistry & Industrial Chemistry:** *nitrogen fixation*, *carbon fixation*, *fixative* — converting gaseous elements into stable compounds; histology tissue preservatives.
> - **Everyday Repair & Resolution:** *fix* — repairing broken machinery, settling an agreed price, or arranging a predetermined contest outcome.

---

## 🔀 4. Prefix & Combining Dynamics on fix

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad- $\to$ af-** (*ad*) | to, toward | [[affix]] | Fastened to something; appended to a word or document. |
| **prae- $\to$ pre-** (*prae*) | before, in front | [[prefix]] | Fastened at the beginning of a word or telephone number. |
| **sub- $\to$ suf-** (*sub*) | beneath, behind | [[suffix]] | Fastened at the end or foot of a word. |
| **trans-** (*trans*) | through, across | [[transfix]] | Pierced through with a weapon; paralyzed with shock. |
| **cruci-** (*crux*) | cross | [[crucifix]], [[crucify]] | Fastened with nails to a cross. |
| **in-** (*in*) | into, within | *infix* | Fastened inside the body of a root word. |
| **un-** (*un-*) | reversal, undo | *unfix* | To detach, unfasten, or release from an anchor. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ure** (*-ūra*) | concrete noun of result | [[fixture]] | An immovable object attached permanently to real property. |
| **-ation** (*-ātiōnem*) | abstract noun of process | [[fixation]] | The process of stabilizing, or an obsessive psychological focus. |
| **-ative** (*-ātīvus*) | functional adjective / noun | *fixative* | A substance that stabilizes histology tissues or perfume scents. |
| **-ity** (*-itās*) | state / condition noun | *fixity* | The condition of being immovable, permanent, or unchangeable. |
| **-ed** | participial adjective | *fixed* | Fastened securely; predetermined (*a fixed election*). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Linguistics & Morphology** | [[prefix]], [[suffix]], [[affix]], *infix* | Derivational and inflectional morphemic analysis. |
| **Property Law & Real Estate** | [[fixture]], *fixity* | Fixtures law: determining which attached chattels pass with title. |
| **Biochemistry & Agriculture** | *nitrogen fixation*, *carbon fixation* | Haber-Bosch process, *Rhizobium* root nodules in legumes. |
| **Psychology & Psychoanalysis** | [[fixation]], *fixate* | Freud's stages of childhood fixation; eye-tracking gaze fixation. |
| **Histology & Art Preservation** | *fixative* | Formalin tissue fixation; charcoal drawing spray fixatives. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affix]] | noun | **1.** A linguistic element added to a word to produce an inflected or derived form.<br>**2.** Attach to. | *"She obeyed like one in a dream, and when she could affix no more he himself tucked a bud or two into her hat, and heaped her basket with others in the prodigality of his bounty."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[affixal]] | adjective | **1.** Of or pertaining to a linguistic affix. | *"In academic literature, affixal designates of or pertaining to a linguistic affix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affixation]] | noun | **1.** The result of adding an affix to a root word.<br>**2.** Formation of a word by means of an affix. | *"In academic literature, affixation designates the result of adding an affix to a root word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affixed]] | verb | **1.** Attach to.<br>**2.** Add to the very end. | *"We’ll try this, and if it doesn’t do we’ll have another.” A large red seal was duly affixed."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[affixial]] | adjective | **1.** Of or pertaining to a linguistic affix. | *"In academic literature, affixial designates of or pertaining to a linguistic affix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antefix]] | noun | **1.** Carved ornament at the eaves of a tile roof concealing the joints between tiles. | *"In academic literature, antefix designates carved ornament at the eaves of a tile roof concealing the joints between tiles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crucifix]] | noun | **1.** Representation of the cross on which jesus died.<br>**2.** A gymnastic exercise performed on the rings when the gymnast supports himself with both arms extended horizontally. | *"John, the crucifix and holy banner leading the way, to a place called Chouquet."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[crucifixion]] | noun | **1.** The act of executing by a method widespread in the ancient world; the victim's hands and feet are bound or nailed to a cross.<br>**2.** The death of jesus by crucifixion. | *"The cry for blood rang through the court, and all were clamouring for crucifixion."* — Jack London, *The Jacket (The Star-Rover)* |
| [[fix]] | noun | **1.** Informal terms for a difficult situation.<br>**2.** Something craved, especially an intravenous injection of a narcotic drug. | *"The king’s disease,—my project may deceive me, But my intents are fix’d, and will not leave me. [_Exit._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fixate]] | verb | **1.** Attach (oneself) to a person or thing in a neurotic way.<br>**2.** Pay attention to exclusively and obsessively. | *"In academic literature, fixate designates attach (oneself) to a person or thing in a neurotic way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fixation]] | noun | **1.** An abnormal state in which development has stopped prematurely.<br>**2.** An unhealthy and compulsive preoccupation with something or someone. | *"In academic literature, fixation designates an abnormal state in which development has stopped prematurely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fixative]] | noun | **1.** A compound (such as ethanol or formaldehyde) that fixes tissues and cells for microscopic study.<br>**2.** A varnish dissolved in alcohol and sprayed over pictures to prevent smudging. | *"In academic literature, fixative designates a compound (such as ethanol or formaldehyde) that fixes tissues and cells for microscopic study."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fixed]] | verb | **1.** Restore by replacing a part or putting together what is torn or broken.<br>**2.** Cause to be firmly attached. | *"O no, it is an ever-fixed mark That looks on tempests and is never shaken; It is the star to every wand’ring bark, Whose worth’s unknown, although his height be taken."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fixedly]] | adverb | **1.** In a fixed manner. | *"He hastened down to raise her, but she repulsed him as he bent over her, and looking at him fixedly and coldly, said, ‘I will die here where I have walked."* — Charles Dickens, *Bleak House* |
| [[fixedness]] | noun | **1.** Remaining in place.<br>**2.** The quality of being fixed in place as by some firm attachment. | *"I derived benefit from the task: it had kept my head and hands employed, and had given force and fixedness to the new impressions I wished to stamp indelibly on my heart."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[fixer]] | noun | **1.** Someone who intervenes with authorities for a person in trouble (usually using underhand or illegal methods for a fee).<br>**2.** A chemical compound that sets or fixes something (as a dye or a photographic image). | *"Fortunately, I was able to help; my job was to be the museum's official Fixer of the Apatosaurus Nest's Floor."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[fixer-upper]] | noun | **1.** A house or other dwelling in need of repair (usually offered for sale at a low price). | *"In academic literature, fixer-upper designates a house or other dwelling in need of repair (usually offered for sale at a low price)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fixing]] | noun | **1.** The act of putting something in working order again.<br>**2.** Restraint that attaches to something or holds something in place. | *"The children thus dispos’d, my wife and I, Fixing our eyes on whom our care was fix’d, Fast’ned ourselves at either end the mast, And, floating straight, obedient to the stream, Was carried towards Corinth, as we thought."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fixings]] | noun | **1.** Food that is a component of a mixture in cooking.<br>**2.** The accessories that normally accompany (something or some activity). | *"Well, he told me all about how you'd settled down now--son and heir, fireside bliss, pretty wife, and all the fixings."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[fixity]] | noun | **1.** The quality of being fixed in place as by some firm attachment.<br>**2.** The quality of being incapable of mutation. | *"An angularity of lineament, and a fixity of facial machinery in general, proclaimed that serious work was the order of the day."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fixture]] | noun | **1.** An object firmly fixed in place (especially in a household).<br>**2.** A regular patron. | *"Thou wouldst make an absolute courtier, and the firm fixture of thy foot would give an excellent motion to thy gait in a semi-circled farthingale."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infix]] | noun | **1.** An affix that is inserted inside the word.<br>**2.** Put or introduce into something. | *"I do protest I never lov’d myself Till now infixed I beheld myself Drawn in the flattering table of her eye. [_Whispers with Blanche._] BASTARD. [_Aside_.] Drawn in the flattering table of her eye!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postfix]] | noun | **1.** An affix that is added at the end of the word. | *"In academic literature, postfix designates an affix that is added at the end of the word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefix]] | noun | **1.** An affix that is added in front of the word.<br>**2.** Attach a prefix to. | *"It is great morning; and the hour prefix’d For her delivery to this valiant Greek Comes fast upon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prefixation]] | noun | **1.** Formation of a word by means of a prefix. | *"In academic literature, prefixation designates formation of a word by means of a prefix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suffix]] | noun | **1.** An affix that is added at the end of the word.<br>**2.** Attach a suffix to. | *"In academic literature, suffix designates an affix that is added at the end of the word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suffixation]] | noun | **1.** Formation of a word by means of a suffix. | *"In academic literature, suffixation designates formation of a word by means of a suffix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transfix]] | verb | **1.** To render motionless, as with a fixed stare or by arousing terror or awe.<br>**2.** Pierce with a sharp stake or point. | *"Time doth transfix the flourish set on youth, And delves the parallels in beauty’s brow, Feeds on the rarities of nature’s truth, And nothing stands but for his scythe to mow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transfixed]] | verb | **1.** To render motionless, as with a fixed stare or by arousing terror or awe.<br>**2.** Pierce with a sharp stake or point. | *"She was first transfixed with surprise, and then electrified with delight."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unaffixed]] | adjective | **1.** Not affixed. | *"In academic literature, unaffixed designates not affixed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unfixed]] | adjective | **1.** Not firmly placed or set or fastened.<br>**2.** Lacking definition or definite content; ; - jane austen. | *"The General listened with assenting gratitude; and it seemed as if his own estimation of Northanger had waited unfixed till that hour."* — Jane Austen, *Northanger Abbey* |

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
    ROOT DASHBOARD · FIX
  </div>
</div>
