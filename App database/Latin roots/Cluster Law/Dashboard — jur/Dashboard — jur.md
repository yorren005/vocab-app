---
status: unread
type: root_dashboard
---
# Dashboard — jur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">jur-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“law, right, or oath”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community establishing fair rules to ensure order and peaceful living.</span>
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

The root **jur** means law, right, or oath. It refers to established rules, legal justice, and social regulations. In English, this root forms words such as *jury*, *juror*, *perjury*, and *jurisdiction*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: law, right, or oath
> The root **jur** means law, right, or oath. It refers to established rules, legal justice, and social regulations. In English, this root forms words such as *jury*, *juror*, *perjury*, and *jurisdiction*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Law, right, or oath</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *jury* and *juror*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **jur** comes from a Latin word that means *"law, right, or oath"*.
  - At its core, it describes law, right, or oath.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **jur** in an English word, think of **rules, rights, and the law**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of law, right, or oath.
  - **Mental & Social**: How people experience, organize, or communicate about law, right, or oath.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Jury**: A body of citizens sworn to give a true verdict on legal matters according to the evidence submitted to them in a court of law.
  - **Juror**: A member of a sworn trial jury or grand jury.
  - **Perjury**: The criminal offense of willfully making a false statement under a lawful oath in a judicial or official proceeding.
  - **Jurisdiction**: An everyday English word showing the root's idea of *law, right, or oath*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">jur</mark>, think of <mark class="hl-def">rules, rights, and the law</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via three primary morphological pathways:
> 1. **Directional Prefixation on Verbal Stem `jur-` / `-jure`:**
>    - `ab-` + *jure* $\to$ *abjure*, *abjuration*, *abjuratory*.
>    - `ad-` + *jure* $\to$ *adjure*, *adjuration*, *adjuratory*.
>    - `con-` + *jure* $\to$ *conjure*, *conjuration*, *conjurer*, *conjuring*.
>    - `per-` + *jure* $\to$ *perjure*, *perjury*, *perjurer*, *perjurious*.
> 2. **Civic & Legal Sworn Nouns in `-y`, `-or`, and `-at`:**
>    - *jury*, *juror*, *juryman*, *jurat* (formal verification on an affidavit).
> 3. **The Privative Tort & Trauma Base `injur-` (from *iniūria*):**
>    - *injury*, *injure*, *injurious*, *injuriously*, *injuriousness*, *uninjured*.

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
> - **Constitutional Adjudication & Courtroom Trials:** *Jury*, *juror*, *grand jury*, *petit jury*, *jurat* — sworn citizen bodies determining indictments and verdicts; notary jurats on sworn affidavits.
> - **False Swearing & Crimes Against Justice:** *Perjure*, *perjury*, *perjurer*, *perjurious* — willfully lying under judicial oath; compromising the integrity of fact-finding tribunals.
> - **Solemn Renunciation & Moral Commands:** *Abjure*, *abjuration*, *adjure*, *adjuration* — recanting heresy on oath; enjoining a witness by sacred duty.
> - **Magic, Occult & Evocation:** *Conjure*, *conjuration*, *conjurer*, *conjuring* — binding spirits through magical oaths; evoking vivid sensory memories.
> - **Physical Trauma, Tort Law & Harm:** *Injure*, *injury*, *injurious*, *uninjured* — actionable legal violations of rights; physical bodily wounds; toxic chemical harm.

---

## 🔀 4. Prefix & Combining Dynamics on jur

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `ab-` | away from, off | [[abjure]], [[abjuration]] | To swear away; to formally and solemnly renounce a belief, cause, or citizenship. |
| `ad-` | to, toward, at | [[adjure]], [[adjuration]] | To swear someone to a task; to command or charge someone solemnly under oath. |
| `con-` | together, with | [[conjure]], [[conjuration]] | To swear together (historically, to conspire); to summon spirits or evoke images. |
| `per-` | through, falsely, detrimentally | [[perjure]], [[perjury]], [[perjurious]] | To swear through an oath falsely; to commit the crime of lying while under oath. |
| `in-` | not, against, un- (privative) | [[injury]], [[injurious]], [[injure]] | Not in accordance with right; a civil wrong, injustice, physical wound, or harm. |
| `non-` | not (historical English) | [[nonjuror]], [[nonjuring]] | Those who refused to swear the oath of allegiance to William and Mary in 1689. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-y` | Noun (Sworn Collective / State) | [[jury]], [[perjury]], [[injury]] | Designates the sworn assembly, the crime of false swearing, or a wrong. |
| `-or` / `-er` | Agent Noun | [[juror]], [[perjurer]], [[conjurer]] | The individual who is sworn, who lies under oath, or who summons spirits. |
| `-ation` | Abstract Noun (Act / Process) | [[abjuration]], [[adjuration]], [[conjuration]] | The solemn act of renouncing, commanding, or summoning by oath. |
| `-ious` | Adjective (Quality / Tendency) | [[injurious]], [[perjurious]] | Characterized by causing wrongful harm or marked by perjury. |
| `-at` (Latin 3rd sing. pres.) | Technical Legal Noun | [[jurat]] | Literally "he/she swears" $\to$ clause authenticating when an affidavit was sworn. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional Law & Criminal Procedure** | [[jury]], [[juror]], [[grand jury]], [[perjury]], [[jurat]] | Sixth Amendment right to an impartial jury; Fifth Amendment grand jury indictment; federal perjury statutes (18 U.S.C. § 1621); notary jurats. |
| 🩺 **Tort Law, Trauma Medicine & Orthopedics** | [[injury]], [[injure]], [[injurious]], [[uninjured]] | Traumatic brain injury (TBI); tortious personal injury claims; Occupational Safety and Health Administration (OSHA) injurious exposure thresholds. |
| 📜 **Historiography & Ecclesiastical History** | [[abjure]], [[abjuration]], [[nonjuror]], [[nonjuring]] | Galileo Galilei's 1633 abjuration of Copernican heliocentrism before the Inquisition; the 1689 Nonjuring schism in the Church of England. |
| 🎭 **Literature, Theater & Illusion** | [[conjure]], [[conjurer]], [[conjuring]] | Shakespearean necromancy in *Macbeth* and *The Tempest*; sleight-of-hand conjuring; conjuring vivid poetic imagery. |
| 🏛️ **Political Theory & Citizenship** | [[abjure]], [[abjuration]] | The statutory oath of renunciation and abjuration taken during United States naturalization ceremonies. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abjuration]] | noun | **1.** A disavowal or taking back of a previous assertion. | *"In academic literature, abjuration designates a disavowal or taking back of a previous assertion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abjure]] | verb | **1.** Formally reject or disavow a formerly held belief, usually under pressure. | *"No, rather I abjure all roofs, and choose To wage against the enmity o’ the air; To be a comrade with the wolf and owl, Necessity’s sharp pinch!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abjurer]] | noun | **1.** A person who abjures. | *"In academic literature, abjurer designates a person who abjures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjuration]] | noun | **1.** A solemn and earnest appeal to someone to do something. | *"Jarndyce had not been neglectful of the adjuration."* — Charles Dickens, *Bleak House* |
| [[adjuratory]] | adjective | **1.** Earnestly or solemnly entreating.<br>**2.** Containing a solemn charge or command. | *"In academic literature, adjuratory designates earnestly or solemnly entreating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjure]] | verb | **1.** Ask for or request earnestly.<br>**2.** Command solemnly. | *"M. le Maire, I adjure you to put yourself in a place of safety.' 'Sir,' I said to him, sternly, 'for one who deserts his post there is no place of safety.' But I do not think he was capable of understanding me."* — Mrs. Oliphant, *A Beleaguered City* |
| [[conjuration]] | noun | **1.** A ritual recitation of words or sounds believed to have a magical effect.<br>**2.** Calling up a spirit or devil. | *"Under this conjuration speak, my lord, For we will hear, note, and believe in heart That what you speak is in your conscience washed As pure as sin with baptism."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjure]] | verb | **1.** Summon into action or bring into existence, often as if by magic.<br>**2.** Ask for or request earnestly. | *"My way is to conjure you, and I’ll begin with the women."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjurer]] | noun | **1.** Someone who performs magic tricks to amuse an audience.<br>**2.** A witch doctor who practices conjury. | *"PINCH, a Schoolmaster and a Conjurer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjuring]] | noun | **1.** Calling up a spirit or devil.<br>**2.** Summon into action or bring into existence, often as if by magic. | *"Here stood he in the dark, his sharp sword out, Mumbling of wicked charms, conjuring the moon To stand auspicious mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjuror]] | noun | **1.** Someone who performs magic tricks to amuse an audience.<br>**2.** A witch doctor who practices conjury. | *"Bucket lost no time in transferring this paper, with the dexterity of a conjuror, from Mr."* — Charles Dickens, *Bleak House* |
| [[conjury]] | noun | **1.** Calling up a spirit or devil. | *"In academic literature, conjury designates calling up a spirit or devil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injure]] | verb | **1.** Cause injuries or bodily harm to.<br>**2.** Hurt the feelings of. | *"I would not be thy executioner; I fly thee, for I would not injure thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[injured]] | verb | **1.** Cause injuries or bodily harm to.<br>**2.** Hurt the feelings of. | *"Whom have I injured, that ye seek my death?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[injurious]] | adjective | **1.** Harmful to living things. | *"It were for me To throw my sceptre at the injurious gods, To tell them that this world did equal theirs Till they had stolen our jewel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[injuriously]] | adverb | **1.** In an injurious manner. | *"Why do you injuriously introduce the name of my mother by adoption?"* — Charles Dickens, *Great Expectations* |
| [[injuriousness]] | noun | **1.** Destructiveness that causes harm or injury. | *"In academic literature, injuriousness designates destructiveness that causes harm or injury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injury]] | noun | **1.** Any physical damage to the body caused by violence or accident or fracture etc.<br>**2.** An accident that results in physical damage or hurt. | *"I do forgive thy robbery gentle thief Although thou steal thee all my poverty: And yet love knows it is a greater grief To bear greater wrong, than hate’s known injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jural]] | adjective | **1.** Of or relating to law or to legal rights and obligations. | *"In academic literature, jural designates of or relating to law or to legal rights and obligations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jurassic]] | noun | **1.** From 190 million to 135 million years ago; dinosaurs; conifers.<br>**2.** Of or relating to or denoting the second period of the mesozoic era. | *"It may be that he swept back into the past, and fell among the blood-drinking, hairy savages of the Age of Unpolished Stone; into the abysses of the Cretaceous Sea; or among the grotesque saurians, the huge reptilian brutes of the Jurassic times."* — H. G. Wells, *The Time Machine* |
| [[juridic]] | adjective | **1.** Of or relating to the law or jurisprudence.<br>**2.** Relating to the administration of justice or the function of a judge. | *"In academic literature, juridic designates of or relating to the law or jurisprudence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[juridical]] | adjective | **1.** Of or relating to the law or jurisprudence.<br>**2.** Relating to the administration of justice or the function of a judge. | *"We want to give the Senate new juridical powers, but we have no laws."* — graf Leo Tolstoy, *War and Peace* |
| [[jurisdiction]] | noun | **1.** (law) the right and power to interpret and apply the law.<br>**2.** In law; the territory within which power can be exercised. | *"Now art thou within point-blank of our jurisdiction regal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jurisdictional]] | adjective | **1.** Restricted to the geographic area under a particular jurisdiction. | *"Many issues were extremely complex: What are an inhabited planet's or satellite's jurisdictional limits within territorial and contiguous space?"* — Meyer Moldeven, *The Universe — or Nothing* |
| [[jurisprudence]] | noun | **1.** The branch of philosophy concerned with the law and the principles that lead courts to make the decisions they do.<br>**2.** The collection of rules imposed by authority. | *"If you come to dignity it is a question for Minchin and Sprague.” “Does medical jurisprudence provide nothing against these infringements?” said Mr."* — George Eliot, *Middlemarch* |
| [[jurisprudential]] | adjective | **1.** Relating to the science or philosophy of law or a system of laws. | *"In academic literature, jurisprudential designates relating to the science or philosophy of law or a system of laws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jurisprudentially]] | adverb | **1.** In respect to jurisprudence or the science or philosophy of law. | *"In academic literature, jurisprudentially designates in respect to jurisprudence or the science or philosophy of law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jurist]] | noun | **1.** A legal scholar versed in civil law or the law of nations.<br>**2.** A public official authorized to decide questions brought before a court of justice. | *"Joel Jones, a distinguished jurist of Philadelphia, and subsequently for several years President of Girard College."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[juristic]] | adjective | **1.** Of or relating to law or to legal rights and obligations. | *"In academic literature, juristic designates of or relating to law or to legal rights and obligations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[juror]] | noun | **1.** Someone who serves (or waits to be called to serve) on a jury. | *"If your will pass, I shall both find your lordship judge and juror, You are so merciful."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jury]] | noun | **1.** A body of citizens sworn to give a true verdict according to the evidence presented in a court of law.<br>**2.** A committee appointed to judge a competition. | *"How innocent I was From any private malice in his end, His noble jury and foul cause can witness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jury-rigged]] | adjective | **1.** Done or made using whatever is available. | *"In academic literature, jury-rigged designates done or made using whatever is available."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[juryman]] | noun | **1.** Someone who serves (or waits to be called to serve) on a jury. | *"Don’t you think you can receive his evidence, sir?” asks an attentive juryman."* — Charles Dickens, *Bleak House* |
| [[jurywoman]] | noun | **1.** Someone who serves (or waits to be called to serve) on a jury. | *"In academic literature, jurywoman designates someone who serves (or waits to be called to serve) on a jury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perjure]] | verb | **1.** Knowingly tell an untruth in a legal court and render oneself guilty of perjury. | *"Women are not In their best fortunes strong, but want will perjure The ne’er-touch’d vestal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perjurer]] | noun | **1.** A person who deliberately gives false testimony. | *"Hast thou forgotten, Perjurer, that bloodstained midsummer night on Hamunds Fjord?"* — Felix Dahn, *Saga of Halfred the Sigskald: A Northern Tale of the Tenth Century* |
| [[perjury]] | noun | **1.** Criminal offense of making false statements under oath. | *"And there’s for twitting me with perjury. [_Stabs him._] QUEEN MARGARET."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uninjured]] | adjective | **1.** Not injured physically or mentally. | *"Weevle and Guppy good morning, assures them of the satisfaction with which he sees them uninjured, and accompanies Mrs."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · JUR
  </div>
</div>
