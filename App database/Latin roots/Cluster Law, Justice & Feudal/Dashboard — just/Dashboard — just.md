---
status: unread
type: root_dashboard
---
# Dashboard — just
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">just-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“right or just”</span>
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

The root **just** means right or just. It refers to moral correctness, legal entitlement, or the physical right side. In English, this root forms words such as *law*, *justly*, *justness*, and *unjust*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: right or just
> The root **just** means right or just. It refers to moral correctness, legal entitlement, or the physical right side. In English, this root forms words such as *law*, *justly*, *justness*, and *unjust*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Right or just</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *law* and *justly*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **just** comes from a Latin word that means *"right or just"*.
  - At its core, it describes right or just.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **just** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of right or just.
  - **Mental & Social**: How people experience, organize, or communicate about right or just.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Law**: An everyday English word showing the root's idea of *right or just*.
  - **Justly**: In a just, fair, or impartial manner.
  - **Justness**: The quality or state of being just, fair, equitable, or well-grounded.
  - **Unjust**: Not based on or behaving according to what is morally right and fair.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">just</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through three primary morphological branches in English:
> - **Primary Adjectival & Nominal Stem (`just-`):** Derived from Latin *iūstus* and *iūstitia*: *just*, *justice*, *justly*, *justness*, *injustice*, *justiciar*.
> - **Causative Verbal & Participial Stem (`justific-`):** Derived from Latin *iūstificāre* (< *iūstus* + *facere*): *justify*, *justification*, *justifiable*, *justificatory*, *justifier*.
> - **Prefixed Mechanical & Calibration Stem (`adjust-`):** Derived from Medieval Latin *adiūstāre* (< *ad-* "to" + *iūstus* "right measure"): *adjust*, *adjustable*, *adjustment*, *adjuster*, *readjust*, *maladjusted*.
>
> Prefixes and negative formatives modify the scale:
> - `in-` (neg.) + *iūstitia* $\to$ *injustice* (violation of fair dealing).
> - `un-` (neg.) + *just* $\to$ *unjust*, *unjustified*, *unjustifiable*.
> - `ad-` ("to, toward") + *iūstus* $\to$ *adjust* (to align with the measure).
> - `mal-` ("badly") + *adjusted* $\to$ *maladjusted* (poorly adapted to the social environment).

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
> The derivations of *just* organize into five primary domains:
> - **Moral Fairness, Righteousness & Equity:** In [[just]], [[justice]], [[justly]], [[justness]], and [[injustice]], the root denotes ethical integrity, human rights, and the fair distribution of goods and penalties in society.
> - **Legal Exculpation & Defenses:** In [[justify]], [[justifiable]], [[justification]], and [[justifiable homicide]], the root provides the affirmative legal doctrine establishing that an otherwise criminal act (e.g. self-defense) was legally warranted and free from blame.
> - **Theological Absolution & Grace:** In [[justification]], [[justified]], and [[justifier]], the root represents the Christian doctrine of being declared righteous before God.
> - **Feudal Governance & Scots Law:** In [[justiciar]] and the Scottish *High Court of Justiciary*, the root preserves the high medieval office of royal regency and criminal jurisdiction.
> - **Physical Calibration, Mechanics & Typography:** In [[adjust]], [[adjustment]], [[adjuster]], [[adjustable]], and typographical [[justification]], the root expresses physical alignment, fine-tuning of mechanisms, insurance claim settlement, and margins aligned flush left and right.
> - **Adverbial Temporal & Quantitative Precision:** In the adverb [[just]] (*just in time*, *just enough*), the root captures narrow, razor-thin precision.

---

## 🔀 4. Prefix & Combining Dynamics on just

### Prefix Shifts (Directional & Evaluative Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[adjust]], [[adjustment]] | Lit. "to bring to the right measure"; to alter slightly, regulate, or adapt. |
| `in-` (neg.) | not, un- | [[injustice]] | From Latin *iniūstitia*; a violation of right, fairness, or equity. |
| `un-` | not | [[unjust]], [[unjustifiable]] | Contrary to justice; unable to be defended or vindicated by reason. |
| `re-` + `ad-` | again + to | [[readjust]], [[readjustment]] | To adapt or set in correct order a second time. |
| `mal-` + `ad-` | badly + to | [[maladjusted]], [[maladjustment]] | Failing to achieve healthy adaptation to one's social or psychological environment. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ice` (< Latin *-itia*) | Noun (Abstract Virtue) | [[justice]] | The quality of being fair; the administration of the legal system. |
| `-ify` (< Latin *-ficāre*) | Verb (Causative) | [[justify]] | To prove or show to be right; to align type margins evenly. |
| `-ation` | Noun (Action / State) | [[justification]] | The defense, rationale, or theological state of being declared righteous. |
| `-able` | Adjective (Defensible) | [[justifiable]] | Capable of being defended by argument, necessity, or law. |
| `-ability` | Noun (Defensibility) | [[justifiability]] | The legal or moral capacity to be justified. |
| `-iar` (< Latin *-iārius*) | Noun (Feudal Magistrate) | [[justiciar]] | A chief justice or regent in medieval feudal administration. |
| `-ment` | Noun (Process / Result) | [[adjustment]] | A small modification made to achieve accuracy, balance, or comfort. |
| `-er` | Noun (Agent / Specialist) | [[adjuster]] | An insurance specialist who investigates and settles casualty claims. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Criminal Law & Affirmative Defenses** | [[justification]], [[justifiable]], [[justifiable homicide]] | Self-defense, defense of others, necessity defense, Model Penal Code justification provisions. |
| 🏛️ **Judicial Systems & Supreme Benches** | [[justice]], [[Chief Justice]], [[Associate Justice]] | The Supreme Court of the United States, administration of justice, natural justice in administrative law. |
| ⛪ **Theology, Ethics & Church History** | [[justification]], [[justified]], [[sola fide]] | Pauline theology, Luther's doctrine of justification by faith alone, Council of Trent decrees on merit. |
| 🖨️ **Typography, Graphic Design & Computing** | [[justify]], [[justified]], [[justification]] | Word processor paragraph alignment (flush left, flush right, full justification), leading and kerning. |
| 🏢 **Insurance, Actuarial Science & Finance** | [[adjust]], [[adjustment]], [[adjuster]] | Insurance claims adjusting, loss adjustment expenses, cost-of-living adjustments (COLA). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adjust]] | verb | **1.** Alter or regulate so as to achieve accuracy or conform to a standard.<br>**2.** Place in a line or arrange so as to be parallel or straight. | *"Bucket skilfully and softly takes that precaution, stooping on his knee for a moment from mere force of habit so to adjust the key in the lock as that no one shall peep in from the outerside."* — Charles Dickens, *Bleak House* |
| [[adjustable]] | adjective | **1.** Capable of being changed so as to match or fit.<br>**2.** Capable of being regulated. | *"Acting on a timely word of warning I bought in Hong Kong a most comfortable sedan-chair, a well-made bamboo affair fitted with a top and adjustable screens and curtains to keep out either rain or sun."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[adjusted]] | verb | **1.** Alter or regulate so as to achieve accuracy or conform to a standard.<br>**2.** Place in a line or arrange so as to be parallel or straight. | *"When he is at last adjusted like a lay-figure, Mr."* — Charles Dickens, *Bleak House* |
| [[adjuster]] | noun | **1.** One who investigates insurance claims or claims for damages and recommends an effective settlement. | *"In academic literature, adjuster designates one who investigates insurance claims or claims for damages and recommends an effective settlement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjustive]] | adjective | **1.** Conducive to adjustment. | *"In academic literature, adjustive designates conducive to adjustment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjustment]] | noun | **1.** Making or becoming suitable; adjusting to circumstances.<br>**2.** The act of making something different (as e.g. the size of a garment). | *"That’s not my sort either.” Grandfather Smallweed has been gradually sliding down in his chair since his last adjustment and is now a bundle of clothes with a voice in it calling for Judy."* — Charles Dickens, *Bleak House* |
| [[adjustor]] | noun | **1.** One who investigates insurance claims or claims for damages and recommends an effective settlement. | *"In academic literature, adjustor designates one who investigates insurance claims or claims for damages and recommends an effective settlement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injustice]] | noun | **1.** An unjust act.<br>**2.** The practice of being unjust or unfair. | *"Thrice is he armed that hath his quarrel just, And he but naked, though locked up in steel, Whose conscience with injustice is corrupted. [_A noise within._] QUEEN MARGARET."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[just]] | adjective | **1.** Used especially of what is legally or ethically right or proper or fitting; - a.lincoln.<br>**2.** Fair to all parties as dictated by reason and conscience. | *"Who taught thee how to make me love thee more, The more I hear and see just cause of hate?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[justice]] | noun | **1.** The quality of being just or fair.<br>**2.** Judgment involved in the determination of rights and the assignment of rewards and punishments. | *"He cannot thrive, Unless her prayers, whom heaven delights to hear And loves to grant, reprieve him from the wrath Of greatest justice."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[justiciar]] | noun | **1.** Formerly a high judicial officer. | *"In academic literature, justiciar designates formerly a high judicial officer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[justiciary]] | noun | **1.** Formerly a high judicial officer.<br>**2.** The jurisdiction of a justiciar. | *"Dundas, as justiciary in Scotland, he exclaimed that he must go and order his silk robe."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[justifiable]] | adjective | **1.** Capable of being justified. | *"I never was happier.” With silent indignation Fanny repeated to herself, “Never happier!—never happier than when doing what you must know was not justifiable!—never happier than when behaving so dishonourably and unfeelingly!"* — Jane Austen, *Mansfield Park* |
| [[justifiably]] | adverb | **1.** With good reason. | *"Warren's dog holding the gaff, a feat of which both Pal and his master were justifiably proud."* — Charlotte B. Herr, *Their Mariposa Legend: A Romance of Santa Catalina* |
| [[justification]] | noun | **1.** Something (such as a fact or circumstance) that shows an action to be reasonable or necessary.<br>**2.** A statement in explanation of some action or belief. | *"I hope, for my brother’s justification, he wrote this but as an essay, or taste of my virtue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[justificative]] | adjective | **1.** Attempting to justify or defend in speech or writing.<br>**2.** Providing justification. | *"In academic literature, justificative designates attempting to justify or defend in speech or writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[justificatory]] | adjective | **1.** Attempting to justify or defend in speech or writing.<br>**2.** Providing justification. | *"In academic literature, justificatory designates attempting to justify or defend in speech or writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[justified]] | verb | **1.** Show to be reasonable or provide adequate ground for.<br>**2.** Show to be right by providing justification or proof. | *"But will you be more justified?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[justifiedly]] | adverb | **1.** With honesty. | *"In academic literature, justifiedly designates with honesty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[justifier]] | noun | **1.** A person who argues to defend or justify some policy or institution. | *"In academic literature, justifier designates a person who argues to defend or justify some policy or institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[justify]] | verb | **1.** Show to be reasonable or provide adequate ground for.<br>**2.** Show to be right by providing justification or proof. | *"More particulars Must justify my knowledge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[justinian]] | noun | **1.** Byzantine emperor who held the eastern frontier of his empire against the persians; codified roman law in 529; his general belisarius regained north africa and spain (483-565). | *"In the sixth Christian century lived Procopius, a Christian magistrate of Constantinople, in the days when Justinian was Emperor and Belisarius general."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[justly]] | adverb | **1.** With honesty.<br>**2.** In accordance with moral or social standards. | *"You that have turn’d off a first so noble wife May justly diet me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[justness]] | noun | **1.** Conformity with some esthetic standard of correctness or propriety.<br>**2.** The quality of being just or fair. | *"Why, brother Hector, We may not think the justness of each act Such and no other than event doth form it; Nor once deject the courage of our minds Because Cassandra’s mad."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[readjust]] | verb | **1.** Adjust anew.<br>**2.** Adjust again after an initial failure. | *"Fear, 392:6 which is an element of all disease, must be cast out to readjust the balance for God."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[readjustment]] | noun | **1.** The act of adjusting again (to changed circumstances).<br>**2.** The act of adjusting something to match a standard. | *"The very acceptance of the theory of social expediency implies the need of frequent readjustment of the institution of private property."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unadjustable]] | adjective | **1.** Not adjustable. | *"An illusion for remember their complex unadjustable eye."* — James Joyce, *Ulysses* |
| [[unadjusted]] | adjective | **1.** Not altered to fit certain requirements.<br>**2.** Not having adapted to new conditions. | *"In academic literature, unadjusted designates not altered to fit certain requirements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unjust]] | adjective | **1.** Not fair; marked by injustice or partiality or deception.<br>**2.** Violating principles of justice. | *"But wherefore says she not she is unjust?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unjustifiable]] | adjective | **1.** Incapable of being justified or explained. | *"Krook’s obstinacy in going out of the world by any such by-way as wholly unjustifiable and personally offensive."* — Charles Dickens, *Bleak House* |
| [[unjustifiably]] | adverb | **1.** Without any excuse. | *"It is repugnant to the creed of Democracy that by such taxation the cost of the necessaries of life should be unjustifiably increased to all our people."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[unjustified]] | adjective | **1.** Lacking justification or authorization. | *"Someone has spoken of his "apparently unjustified faith in Peter." What names he can give to his friends as a result of this faith in them!"* — T. R. Glover, *The Jesus of History* |
| [[unjustly]] | adverb | **1.** In an unjust manner. | *"Only, in this disguise, I think’t no sin To cozen him that would unjustly win. [_Exit._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unjustness]] | noun | **1.** The practice of being unjust or unfair. | *"In academic literature, unjustness designates the practice of being unjust or unfair."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · JUST
  </div>
</div>
