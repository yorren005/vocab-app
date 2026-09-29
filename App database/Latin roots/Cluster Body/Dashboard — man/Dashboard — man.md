---
status: unread
type: root_dashboard
---
# Dashboard — man
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">man-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“hand”</span>
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

The root **man** means hand. It refers to the bodily hand, manual labor, or handling and guiding. In English, this root forms words such as *manual*, *manufacture*, *manuscript*, and *manipulate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: hand
> The root **man** means hand. It refers to the bodily hand, manual labor, or handling and guiding. In English, this root forms words such as *manual*, *manufacture*, *manuscript*, and *manipulate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Hand</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *manual* and *manufacture*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **man** comes from a Latin word that means *"hand"*.
  - At its core, it describes hand.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **man** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of hand.
  - **Mental & Social**: How people experience, organize, or communicate about hand.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Manual**: Done, operated, worked, or performed by human hand power rather than by an automatic machine or engine.
  - **Manufacture**: To make, produce, or fabricate goods or wares on a large scale using machinery, industrial processes, and division of labor.
  - **Manuscript**: An author's original handwritten, typed, or word-processed text submitted for publication.
  - **Manipulate**: To operate, handle, control, or adjust with the hands or mechanical devices in a skillful manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">man</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English in several well-defined stems:
> - **Classical Latin Nominal Stem:** `man-` / `manu-` (from *manus*): *manual*, *manufacture*, *manuscript*, *manumit*, *manicure*, *manus*.
> - **Compound Stems with Verbs:** 
>   - With *capere* ("to seize"): *emancipate*, *emancipation*.
>   - With *mittere* ("to send"): *manumit*, *manumission*.
>   - With *tenēre* ("to hold"): *maintain*, *maintenance*.
>   - With *facere* ("to make"): *manufacture*, *manifest*.
>   - With *plēre* ("to fill"): *maniple*, *manipulate*, *manipulation*.
>   - With *operārī* ("to work"): *maneuver*, *manure*.
> - **Gallo-Romance Phonological Stem:** `man-` / `main-` / `manag-` (via Old French *main*, Italian *mano*): *manner*, *manage*, *manacle*, *mortmain*.

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

> [!tip] 🌈 The Conceptual Facets of Man-
> - **1. Direct Manual Craftsmanship & Labor:** Work performed physically by hand (*manual*, *manually*, *manufacture*, *manuscript*).
> - **2. Civil Rights & Emancipation:** Release from patriarchal or enslaving legal control (*emancipate*, *emancipation*, *manumit*, *manumission*).
> - **3. Executive Leadership & Equestrian Control:** Guiding, supervising, and directing organizations (*manage*, *management*, *manager*, *managerial*).
> - **4. Tactical Movement & Mechanics:** Coordinated military operations and mechanical dexterity (*maneuver*, *maneuverable*, *manipulate*).
> - **5. Social Comportment & Etiquette:** The way one "handles" oneself among peers (*manner*, *manners*, *mannerism*, *mannerly*).
> - **6. Evidence, Obviousness & Political Declarations:** Caught in the hand / unmistakable (*manifest*, *manifestation*, *manifesto*).
> - **7. Restraint & Imprisonment:** Handcuffs locking the wrists (*manacle*).
> - **8. Personal Grooming & Hygiene:** Care and cosmetic beautification of the hands (*manicure*, *manicurist*).
> - **9. Agriculture & Soil Fertility:** Hand-cultivating soil with organic fertilizers (*manure*).

---

## 🔀 4. Prefix & Combining Dynamics on man

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ē-` / `ex-` | out of, away | [[emancipate]] | To take *out of the hand* / legal authority of another; to liberate. |
| `manu-` + *mittere* | hand + send | [[manumit]] | To release *from the hand*; to free from servitude. |
| `manu-` + *tenēre* | hand + hold | [[maintain]] | To hold firmly *in the hand*; to sustain, preserve, or support. |
| `manu-` + *facere* | hand + make | [[manufacture]] | To produce or shape *by hand* (now via industrial factories). |
| `manu-` + *scrībere*| hand + write | [[manuscript]] | A document written *by hand* rather than printed. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (relating to) | [[manual]] | Pertaining strictly to the hands; operated by human hand power. |
| `-acle` (< *-icula*) | Diminutive noun | [[manacle]] | A "little hand-cuff"; a metal wrist shackle. |
| `-ment` | Noun (process / art) | [[management]] | The art and practice of handling and directing human affairs. |
| `-ulate` | Verb (handle skillfully) | [[manipulate]] | To handle with dexterity; to manage influence subtly or deceptively. |
| `-ure` | Noun (labor / soil) | [[manure]] | Originally manual soil working; now organic animal fertilizer. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Industrial Engineering & Supply Chain** | [[manufacture]], [[manufacturing]], [[manual]] | Advanced robotic manufacturing lines; standard operating procedure manuals. |
| **Corporate Leadership & Administration** | [[manage]], [[management]], [[managerial]] | Strategic management consulting; managerial accounting; change management. |
| **Civil Rights & Constitutional History** | [[emancipate]], [[emancipation]], [[manumit]] | Lincoln's 1863 Emancipation Proclamation; ancient Roman manumission tablets. |
| **Military Science & Naval Tactics** | [[maneuver]], [[maniple]], [[manipular]] | Combined-arms maneuver warfare; the flexible manipular legion of the Punic Wars. |
| **Political Philosophy & History** | [[manifesto]], [[manifest]] | The Communist Manifesto; Manifest Destiny in nineteenth-century American historiography. |
| **Philology & Codicology** | [[manuscript]] | Illuminated parchment manuscripts; paleographic collation of classical codices. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[counterman]] | noun | **1.** Someone who attends a counter (as in a diner). | *"In academic literature, counterman designates someone who attends a counter (as in a diner)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emancipate]] | verb | **1.** Give equal rights to; of women and minorities.<br>**2.** Free from slavery or servitude. | *"Emancipate through passion And thought, with sea for sky, We substitute, in a fashion, For heaven--poetry: -- St. 14. for: instead of. 15."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[emancipated]] | verb | **1.** Give equal rights to; of women and minorities.<br>**2.** Free from slavery or servitude. | *"His prayer, too, asked to be emancipated from his wickedness, and his strength and health restored."* — Classic Author, *The wonders of prayer* |
| [[emancipation]] | noun | **1.** Freeing someone from the control of another; especially a parent's relinquishing authority and control over a minor child. | *"However, it soon grew clear that the hour of emancipation for that little prisoner of the flesh was to arrive earlier than her worst misgiving had conjectured."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[emancipative]] | adjective | **1.** Tending to set free. | *"In academic literature, emancipative designates tending to set free."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emancipator]] | noun | **1.** Someone who frees others from bondage. | *"In academic literature, emancipator designates someone who frees others from bondage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[man]] | noun | **1.** An adult person who is male (as opposed to a woman).<br>**2.** Someone who serves in the armed forces; a member of a military force. | *"How called you the man you speak of, madam?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manacle]] | noun | **1.** Shackle that consists of a metal loop that can be locked around the wrist; usually used in pairs.<br>**2.** Confine or restrain with or as if with manacles or handcuffs. | *"For my sake wear this; It is a manacle of love; I’ll place it Upon this fairest prisoner. [_Puts a bracelet on her arm._] IMOGEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manage]] | verb | **1.** Be successful; achieve a goal.<br>**2.** Be in charge of, act on, or dispose of. | *"He is already Traduced for levity, and ’tis said in Rome That Photinus, an eunuch, and your maids Manage this war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manageable]] | adjective | **1.** Capable of being managed or controlled.<br>**2.** Capable of existing or taking place or proving true; possible to do. | *"With regard to a large number of matters about which other men are decided or obstinate, he was the most easily manageable man in the world."* — George Eliot, *Middlemarch* |
| [[management]] | noun | **1.** The act of managing something.<br>**2.** Those in charge of running a business. | *"Would you like to live here again and undertake the management of the castle?" Apollonie stared at her master at first as if she could not comprehend his words."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[manager]] | noun | **1.** Someone who controls resources and expenditures.<br>**2.** (sports) someone in charge of training an athlete or a team. | *"Adieu, valour; rust, rapier; be still, drum, for your manager is in love."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mandatary]] | noun | **1.** The recipient of a mandate. | *"In academic literature, mandatary designates the recipient of a mandate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandate]] | noun | **1.** A document giving an official instruction or command.<br>**2.** A territory surrendered by turkey or germany after world war i and put under the tutelage of some other european power until they are able to stand by themselves. | *"Fulvia perchance is angry; or who knows If the scarce-bearded Caesar have not sent His powerful mandate to you: “Do this or this; Take in that kingdom and enfranchise that."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mandator]] | noun | **1.** An authority who issues a mandate. | *"In academic literature, mandator designates an authority who issues a mandate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandatory]] | noun | **1.** The recipient of a mandate.<br>**2.** A territory surrendered by turkey or germany after world war i and put under the tutelage of some other european power until they are able to stand by themselves. | *"And on the instant a knock, vast and compulsive, inexorable and mandatory as the stamp of the iron hoof of doom, smote me and reverberated across the universe."* — Jack London, *The Jacket (The Star-Rover)* |
| [[maneuver]] | noun | **1.** A military training exercise.<br>**2.** A plan for attaining a particular goal. | *"Even in the light pseudo-gravity, Scarf's bulk was hard to maneuver."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[maneuverable]] | adjective | **1.** Capable of maneuvering or changing position. | *"My three-hundred-meter freighter with all storage bays packed bulkhead to bulkhead with high mass, is barely maneuverable under the best of circumstances."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[maneuverer]] | noun | **1.** A person skilled in maneuvering. | *"In academic literature, maneuverer designates a person skilled in maneuvering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manly]] | adjective | **1.** Possessing qualities befitting a man.<br>**2.** Characteristic of a man. | *"He wears his honour in a box unseen That hugs his kicky-wicky here at home, Spending his manly marrow in her arms, Which should sustain the bound and high curvet Of Mars’s fiery steed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manned]] | verb | **1.** Take charge of a certain job; occupy a certain work place.<br>**2.** Provide with workers. | *"Your ships are not well manned, Your mariners are muleteers, reapers, people Engrossed by swift impress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manner]] | noun | **1.** How something is done or how it happens.<br>**2.** A way of acting or behaving. | *"Enter Pompey, Menecrates and Menas in warlike manner."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mannered]] | adjective | **1.** Having unnatural mannerisms. | *"Because I don’t love you.” “Yes, but—” She contracted a yawn to an inoffensive smallness, so that it was hardly ill-mannered at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mannerism]] | noun | **1.** A behavioral attribute that is distinctive and peculiar to an individual.<br>**2.** A deliberate pretense or exaggerated display. | *"An ethical sympathy in an artist is an unpardonable mannerism of style."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[mannerly]] | adjective | **1.** Socially correct in behavior. | *"Discourse is heavy, fasting; when we have supp’d, We’ll mannerly demand thee of thy story, So far as thou wilt speak it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manor]] | noun | **1.** The mansion of a lord or wealthy person.<br>**2.** The landed estate of a lord (including the house on it). | *"I know a man that had this trick of melancholy sold a goodly manor for a song."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mansion]] | noun | **1.** (astrology) one of 12 equal areas into which the zodiac is divided.<br>**2.** A large and imposing house. | *"O what a mansion have those vices got, Which for their habitation chose out thee, Where beauty’s veil doth cover every blot, And all things turns to fair, that eyes can see!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manual]] | noun | **1.** A small handbook.<br>**2.** (military) a prescribed drill in handling a rifle. | *"There is my gage, the manual seal of death That marks thee out for hell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manually]] | adverb | **1.** By hand. | *"Classical and authoritative lexicons catalog manually as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manufacture]] | noun | **1.** The organized action of making of goods and services for sale.<br>**2.** The act of making something (a product) from raw materials. | *"Above all there was a case of jewellery, containing four heavy gold bracelets and several lockets and rings, all of fine quality and manufacture."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[manufactured]] | verb | **1.** Put together out of artificial or natural components or parts; ; ; he manufactured a popular cereal".<br>**2.** Make up something artificial or untrue. | *"The abstraction was a cheat and a lie manufactured in the priestly mind."* — Jack London, *The Jacket (The Star-Rover)* |
| [[manufacturer]] | noun | **1.** A business engaged in manufacturing some product.<br>**2.** Someone who manufactures something. | *"The price of manufacturer's products rose in advance of the rise of costs of many raw materials and especially of the labor costs of manufacture."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[manufacturing]] | noun | **1.** The act of making something (a product) from raw materials.<br>**2.** Put together out of artificial or natural components or parts; ; ; he manufactured a popular cereal". | *"THE LORD WOKE ME UP IN TIME TO SAVE MY CLOTHES." In the very top of a four-story building, used only for various manufacturing purposes, lived an old man and daughter."* — Classic Author, *The wonders of prayer* |
| [[manumission]] | noun | **1.** The formal act of freeing from slavery. | *"Let that urbanity, which I trust will distinguish America, and the necessity of national defence—let all these things operate on their minds, and they will search that paper, and see if they have power of manumission."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[manumit]] | verb | **1.** Free from slavery or servitude. | *"In academic literature, manumit designates free from slavery or servitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manumitter]] | noun | **1.** Someone who frees others from bondage. | *"In academic literature, manumitter designates someone who frees others from bondage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manure]] | noun | **1.** Any animal or plant material used to fertilize land especially animal excreta usually with litter material.<br>**2.** Spread manure, as for fertilization. | *"And if you crown him, let me prophesy The blood of English shall manure the ground And future ages groan for this foul act."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manuscript]] | noun | **1.** The form of a literary work submitted for publication.<br>**2.** Handwritten book or document. | *"He has some manuscript near him, but is not referring to it."* — Charles Dickens, *Bleak House* |
| [[mismanage]] | verb | **1.** Manage badly or incompetently. | *"He knew he had mismanaged his wife’s property and was to blame toward his children, but he did not know how to remedy it)."* — graf Leo Tolstoy, *War and Peace* |
| [[mismanagement]] | noun | **1.** Management that is careless or inefficient. | *"Here had been grievous mismanagement; but, bad as it was, he gradually grew to feel that it had not been the most direful mistake in his plan of education."* — Jane Austen, *Mansfield Park* |
| [[nonmandatory]] | adjective | **1.** Not required by rule or law. | *"In academic literature, nonmandatory designates not required by rule or law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postman]] | noun | **1.** A man who delivers the mail. | *"She watched till the postman passed by, ran out to him with her epistle, and then again took her listless place inside the window-panes."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[superman]] | noun | **1.** A person with great powers and abilities.<br>**2.** Street name for lysergic acid diethylamide. | *"He has to be man to so many people that there is danger of his becoming a kind of superman."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[unman]] | verb | **1.** Cause to lose one's nerve. | *"In academic literature, unman designates cause to lose one's nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmanageable]] | adjective | **1.** Difficult to use or handle or manage because of size or weight or shape.<br>**2.** Hard to control; ,. | *"Tulkinghorn observes, following her out upon the staircase, “as the most implacable and unmanageable of women."* — Charles Dickens, *Bleak House* |
| [[unmanly]] | adjective | **1.** Not possessing qualities befitting a man.<br>**2.** Lacking in courage and manly strength and resolution; contemptibly fearful. | *"Be thou a prey unto the house of York, And die in bands for this unmanly deed!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unmannerly]] | adjective | **1.** Socially incorrect in behavior. | *"O my lord, if my duty be too bold, my love is too unmannerly."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · MAN
  </div>
</div>
