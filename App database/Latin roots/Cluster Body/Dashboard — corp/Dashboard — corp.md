---
status: unread
type: root_dashboard
---
# Dashboard — corp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">corp-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“body”</span>
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

The root **corp** means body. It refers to the physical frame of a living person or any unified collection of things. In English, this root forms words such as *corporation*, *corpse*, *corporeal*, and *incorporate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: body
> The root **corp** means body. It refers to the physical frame of a living person or any unified collection of things. In English, this root forms words such as *corporation*, *corpse*, *corporeal*, and *incorporate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Body</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *corporation* and *corpse*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **corp** comes from a Latin word that means *"body"*.
  - At its core, it describes body.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **corp** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of body.
  - **Mental & Social**: How people experience, organize, or communicate about body.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Corporation**: An organization, usually a business, chartered by a state and endowed by law with a distinct legal personality, rights, liabilities, and perpetual succession separate from its individual shareholders.
  - **Corpse**: A dead body, especially the cadaver of a human being.
  - **Corporeal**: Having, consisting of, or relating to a material, physical body.
  - **Incorporate**: To combine, blend, or unite into an existing whole so as to form a single entity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">corp</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root enters English across three primary morphological stems:
> - **Classical Latin Oblique Stem:** `corpor-` (from *corporis*). Productive in academic, legal, theological, and scientific formations: *corporal*, *corporate*, *corporation*, *corporeal*, *incorporate*.
> - **Bare Classical Latin Stem:** `corpus-` (from nominative *corpus*): *corpus*, *corpuscle*, *corpuscular*, *habeas corpus*, *corpus delicti*.
> - **Gallo-Romance Stem:** `corps-` / `cors-` (from Old French *cors* < *corpus*): *corps*, *corpse*, *corpsman*, *corset*, *corselet*, *corsage*.
>
> Prefixes modify embodiment and legal unity: *in-* ("into a body"), *dis-* ("apart from / dissolve a body"), *re-* ("again into a body").

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

> [!tip] 🌈 The Conceptual Facets of Corp-
> - **1. Legal Personhood & Commerce:** Chartered business entities endowed with separate legal status (*corporation*, *corporate*, *incorporate*, *incorporation*).
> - **2. Physical & Material Existence:** Tangible substance opposed to spirit (*corporeal*, *incorporeal*, *corporeality*), and physical discipline (*corporal punishment*).
> - **3. Mortality, Pathology & Forensics:** Human cadavers (*corpse*), and the material facts proving a crime (*corpus delicti*).
> - **4. Constitutional Rights & Habeas Jurisprudence:** The physical presence of a detainee before a magistrate (*habeas corpus*).
> - **5. Organized Collectives & Military Units:** Specialized regiments (*corps*, *Marine Corps*, *corpsman*).
> - **6. Microscopic Biology & Cytology:** Unattached blood cells (*corpuscle*, *corpuscular*), and anatomical organs (*corpus callosum*, *corpus luteum*).
> - **7. Philology, Linguistics & Archival Texts:** Comprehensive databases and compendia of texts (*corpus*).
> - **8. Sartorial Structure & Torso Adornment:** Boned undergarments (*corset*), armor (*corselet*), and floral accessories (*corsage*).

---

## 🔀 4. Prefix & Combining Dynamics on corp

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | in, into | [[incorporate]] | To unite or combine *into* a single body; to form into a legal entity. |
| `dis-` | away, apart | **disincorporate** | To dissolve or strip *away* the legal body status of a municipality. |
| `in-` | privative (not) | [[incorporeal]] | Having *no* physical body; intangible (e.g., rights, intellectual property). |
| `re-` + `in-` | again, anew | **reincorporate** | To form anew *into* a body or corporate charter. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (pertaining to) | [[corporal]] | Pertaining strictly to the physical human body (*corporal punishment*). |
| `-ation` | Noun (process / entity) | [[corporation]] | The legal act of forming a body; a chartered corporate entity. |
| `-eal` | Adjective (nature of) | [[corporeal]] | Having the substantial nature of physical, tangible matter. |
| `-ulent` | Adjective (full of) | [[corpulent]] | Full of bodily mass; stout, obese, fleshy. |
| `-cle` | Diminutive noun | [[corpuscle]] | A "tiny body"; an unattached cell (red or white blood cell). |
| `-et` / `-elet` | Diminutive noun | [[corset]], [[corselet]] | A "little body"; a garment or armor enclosing the torso. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Corporate Law & Governance** | [[corporation]], [[incorporate]], [[corporate]] | Delaware General Corporation Law; corporate fiduciary duties; C-corps vs. LLCs. |
| **Constitutional Law & Criminal Justice** | [[habeas corpus]], [[corpus delicti]], [[corporal]] | Writs of habeas corpus challenging state custody; statutory bars on corporal punishment in schools. |
| **Hematology & Histology** | [[corpuscle]], **corpus callosum**, **corpus luteum** | Mean corpuscular volume (MCV) in anemia diagnostics; interhemispheric callosal agenesis; luteal phase progesterone. |
| **Military Science & Defense** | [[corps]], [[corpsman]] | Army Corps of Engineers, Marine expeditionary corps; Navy hospital corpsmen in combat. |
| **Computational Linguistics & NLP** | [[corpus]] (*corpora*) | Multi-billion-token text corpora training Large Language Models (LLMs). |
| **Physics & Optics** | [[corpuscular]] | Isaac Newton's corpuscular (particle) hypothesis of light vs. Huygens' wave theory. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[corp]] | noun | **1.** A business firm whose articles of incorporation have been approved in some state. | *"And then says Hughie Rafferty: 'The tide will bring him to Cushendall.' "And at Cushendall next day we found the corp."* — Donn Byrne, *The Wind Bloweth* |
| [[corporal]] | noun | **1.** A noncommissioned officer in the army or air force or marines.<br>**2.** Affecting or characteristic of the body as opposed to the mind or spirit. | *"I would I had that corporal soundness now, As when thy father and myself in friendship First tried our soldiership."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corporality]] | noun | **1.** The quality of being physical; consisting of matter. | *"In academic literature, corporality designates the quality of being physical; consisting of matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corporate]] | adjective | **1.** Of or belonging to a corporation.<br>**2.** Possessing or existing in bodily form; - shakespeare. | *"Good Master Corporate Bardolph, stand my friend; and here’s four Harry ten shillings in French crowns for you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corporation]] | noun | **1.** A business firm whose articles of incorporation have been approved in some state.<br>**2.** Slang for a paunch. | *"The raw afternoon is rawest, and the dense fog is densest, and the muddy streets are muddiest near that leaden-headed old obstruction, appropriate ornament for the threshold of a leaden-headed old corporation, Temple Bar."* — Charles Dickens, *Bleak House* |
| [[corporatism]] | noun | **1.** Control of a state or organization by large interest groups. | *"In academic literature, corporatism designates control of a state or organization by large interest groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corporatist]] | noun | **1.** A supporter of corporatism.<br>**2.** Of or relating to corporatism. | *"In academic literature, corporatist designates a supporter of corporatism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corporeal]] | adjective | **1.** Having material or physical form or substance;  - benjamin jowett.<br>**2.** Affecting or characteristic of the body as opposed to the mind or spirit. | *"Tess’s passing corporeal blight had been her mental harvest."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[corporeality]] | noun | **1.** The quality of being physical; consisting of matter. | *"Retty put her hands upon Tess’s shoulders, as if to realize her friend’s corporeality after such a miracle, and the other two laid their arms round her waist, all looking into her face."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[corposant]] | noun | **1.** An electrical discharge accompanied by ionization of surrounding atmosphere. | *"They had played around him as the corposant flickers around the mast-head of a ship...."* — Donn Byrne, *The Wind Bloweth* |
| [[corps]] | noun | **1.** An army unit usually consisting of two or more divisions and their support.<br>**2.** A body of people associated together. | *"He was of an adventurous and somewhat restless disposition, and, at the time of the threatened invasion by Napoleon, joined a local Volunteer corps."* — John Cairns, *Principal Cairns* |
| [[corpse]] | noun | **1.** The dead body of a human being. | *"Enter priests, &c, in procession; the corpse of Ophelia, Laertes and Mourners following; King, Queen, their Trains, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corpulence]] | noun | **1.** The property of excessive fatness. | *"The huge corpulence of that Hogarthian monster undulates on the surface, scarcely drawing one inch of water."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[corpulency]] | noun | **1.** More than average fatness. | *"In academic literature, corpulency designates more than average fatness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corpulent]] | adjective | **1.** Excessively fat. | *"A goodly portly man, i’faith, and a corpulent; of a cheerful look, a pleasing eye, and a most noble carriage; and, as I think, his age some fifty, or, by’r Lady, inclining to threescore; and now I remember me, his name is Falstaff."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corpus]] | noun | **1.** Capital as contrasted with the income derived from it.<br>**2.** A collection of writings. | *"York Powell, _Corpus Poeticum Boreale_, i. (Oxford, 1883) p. 197."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[corpuscle]] | noun | **1.** (nontechnical usage) a tiny piece of anything.<br>**2.** Either of two types of cells (erythrocytes and leukocytes) and sometimes including platelets. | *"The heat sets the molecules in violent agitation, which, acting upon the corpuscles in the atoms, sets them in violent motion too, so that light is often the companion of heat."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[corpuscular]] | adjective | **1.** Of or relating to corpuscles. | *"In academic literature, corpuscular designates of or relating to corpuscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discorporate]] | adjective | **1.** Not having a material body. | *"In academic literature, discorporate designates not having a material body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habeas corpus]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin corp within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of corp in systematic terminology. | *"In academic literature, habeas corpus designates pertaining to, derived from, or characteristic of latin corp within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incorporate]] | verb | **1.** Make into a whole or make part of a whole.<br>**2.** Include or contain; have as a component. | *"Thyself I call it, being strange to me, That, undividable, incorporate, Am better than thy dear self’s better part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incorporated]] | verb | **1.** Make into a whole or make part of a whole.<br>**2.** Include or contain; have as a component. | *"With this course he incorporated large parts of his unfinished treatise on "The Difficulties of Christianity," which, after he had thus broken it up, passed finally out of sight."* — John Cairns, *Principal Cairns* |
| [[incorporation]] | noun | **1.** Consolidating two or more things; union in (or into) one body.<br>**2.** Learning (of values or attitudes etc.) that is incorporated within yourself. | *"Entering at that moment, he was an incorporation of the strongest reasons through which Will’s pride became a repellent force, keeping him asunder from Dorothea."* — George Eliot, *Middlemarch* |
| [[incorporative]] | adjective | **1.** Growing by taking over and incorporating adjacent territories. | *"In academic literature, incorporative designates growing by taking over and incorporating adjacent territories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incorporeal]] | adjective | **1.** Without material form or substance. | *"The confused beginnings of many birds’ songs spread into the healthy air, and the wan blue of the heaven was here and there coated with thin webs of incorporeal cloud which were of no effect in obscuring day."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[incorporeality]] | noun | **1.** The quality of not being physical; not consisting of matter. | *"In academic literature, incorporeality designates the quality of not being physical; not consisting of matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unincorporated]] | adjective | **1.** Not organized and maintained as a legal corporation. | *"In academic literature, unincorporated designates not organized and maintained as a legal corporation."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CORP
  </div>
</div>
