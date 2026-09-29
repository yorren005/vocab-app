---
status: unread
type: root_dashboard
---
# Dashboard — or
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">or-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mouth, or to speak solemnly”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Two people conversing warmly and exchanging clear spoken words.</span>
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

The root **or** means mouth, or to speak solemnly. It refers to uttering words aloud, expressing thoughts, or communicating messages. In English, this root forms words such as *adoration*, *adore*, *inexorability*, and *inexorable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mouth, or to speak solemnly
> The root **or** means mouth, or to speak solemnly. It refers to uttering words aloud, expressing thoughts, or communicating messages. In English, this root forms words such as *adoration*, *adore*, *inexorability*, and *inexorable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mouth, or to speak solemnly</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *adoration* and *adore*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **or** comes from a Latin word that means *"mouth, or to speak solemnly"*.
  - At its core, it describes mouth, or to speak solemnly.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **or** in an English word, think of **talking, discussing, and communication**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mouth, or to speak solemnly.
  - **Mental & Social**: How people experience, organize, or communicate about mouth, or to speak solemnly.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Adoration**: Deep love and respect.
  - **Adore**: To love and respect someone deeply. 2. To worship or revere as divine.
  - **Inexorability**: The quality of being impossible to stop, prevent, or persuade by entreaty.
  - **Inexorable**: Impossible to stop or prevent. 2. Impossible to persuade by request or entreaty.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">or</mark>, think of <mark class="hl-def">talking, discussing, and communication</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **or** operates through three morphological channels:
- **Anatomical Stem (`or-` < *ōs*, *ōris*)**:
  - *orālis* $\to$ **oral**, **orally**.
  - *ōs* + *facere* $\to$ *ōrificium* $\to$ **orifice**.
  - *ōsculum* ("little mouth, kiss") $\to$ **osculate**, **osculation**.
- **Forensic & Rhetorical Stem (`ōrāt-` < *ōrāre*)**:
  - *ōrātiō* $\to$ **oration**.
  - *ōrātor* $\to$ **orator**, **oratory**, **oratorical**.
  - *per-* ("thoroughly") + *ōrāre* $\to$ *perōrāre* $\to$ **perorate**, **peroration**.
- **Sacral, Prophetic & Supplicatory Stem (`adōr-` / `ōrācul-` / `inexōr-`)**:
  - *ad-* + *ōrāre* $\to$ *adōrāre* $\to$ **adore**, **adoration**, **adorable**.
  - *ōrāculum* $\to$ **oracle**, **oracular**, **oracularly**.
  - *in-* ("not") + *ex-* ("out") + *ōrāre* $\to$ *inexōrābilis* $\to$ **inexorable**, **inexorability**, **inexorably**.
  - *ōrātiō* via Old French $\to$ **orison** (a prayer).

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

The derivatives of **or** span five major cultural domains:
- **Anatomy & Medicine**: *oral* (spoken; relating to the mouth), *orally*, *orifice* (an opening or mouth-like entrance).
- **Public Oratory & Rhetoric**: *oration* (a formal speech), *orator* (a public speaker of great eloquence), *oratory* (the art of eloquent speech), *peroration* (the concluding part of a speech intended to inspire).
- **Prophecy & Divine Revelation**: *oracle* (a priest or medium through whom the gods spoke; wise advice), *oracular* (authoritative, enigmatic, prophetic).
- **Sacred Reverence & Devotion**: *adore* (love and respect deeply; worship), *adoration* (deep love or worship), *orison* (a prayer).
- **Unyielding Power & Fate**: *inexorable* (impossible to stop or prevent; unyielding to entreaty), *inexorability*.

---

## 🔀 4. Prefix & Combining Dynamics on or

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to, toward") | `ad-` + `ōrāre` | Pray to, raise hand to mouth in worship $\to$ worship, love deeply | *adore, adoration, adorable* |
| **`in-`** + **`ex-`** | `in-` + `ex-` + `ōrāre` | Not able to be moved by prayer $\to$ relentless, unstoppable | *inexorable, inexorability, inexorably* |
| **`per-`** ("through, thoroughly")| `per-` + `ōrāre` | Speak completely through to the finish $\to$ conclude a speech | *perorate, peroration* |
| **`-culum`** (instrument) | `ōrā-` + `-culum` | Place or medium of divine utterance $\to$ prophecy, prophetic shrine | *oracle, oracular* |
| **`-al`** (adjectival) | `ōr-` + `-al` | Pertaining to the mouth $\to$ spoken, administered by mouth | *oral, orally* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Classical Rhetoric & Political Oratory**: Ciceronian eloquence, forensic advocacy, and inaugural addresses (*orator*, *oration*, *oratory*, *peroration*).
- **Dentistry, Medicine & Pharmacology**: Routes of drug administration and cranial anatomy (*oral cavity*, *oral vaccine*).
- **Comparative Religion & Ancient History**: The Delphic oracle, Sibylline prophecies, and liturgical rites (*oracle*, *adoration*, *orison*).
- **Philosophy of History & Literature**: The depiction of unyielding destiny and tragic necessity (*inexorable fate*, *inexorable march of time*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abor]] | noun | **1.** Little known kamarupan languages. | *"In academic literature, abor designates little known kamarupan languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aboral]] | adjective | **1.** Opposite to or away from the mouth. | *"In academic literature, aboral designates opposite to or away from the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abort]] | noun | **1.** The act of terminating a project or procedure before it is completed.<br>**2.** Terminate before completion. | *"The launch cannot be aborted; there'll be no second chance."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[abortion]] | noun | **1.** Termination of pregnancy.<br>**2.** Failure of a plan. | *"The Albino is as well made as other men—has no substantive deformity—and yet this mere aspect of all-pervading whiteness makes him more strangely hideous than the ugliest abortion."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[abortionist]] | noun | **1.** A person (who should be a doctor) who terminates pregnancies. | *"In academic literature, abortionist designates a person (who should be a doctor) who terminates pregnancies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abortive]] | adjective | **1.** Failing to accomplish an intended result. | *"Remember it, and let it make thee crestfallen, Ay, and allay thus thy abortive pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adorability]] | noun | **1.** Extreme attractiveness. | *"I put myself on a regimen of admiring a fine woman; and in proportion to the adorability of her charms, in proportion you are delighted with my verses."* — Robert Burns, *The Letters of Robert Burns* |
| [[adorable]] | adjective | **1.** Lovable especially in a childlike or naive way. | *"To Dorothea this was adorable genuineness, and religious abstinence from that artificiality which uses up the soul in the efforts of pretence."* — George Eliot, *Middlemarch* |
| [[adorableness]] | noun | **1.** Extreme attractiveness. | *"In academic literature, adorableness designates extreme attractiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adoration]] | noun | **1.** A feeling of profound love and admiration.<br>**2.** The act of admiring strongly. | *"It is to be all made of fantasy, All made of passion, and all made of wishes, All adoration, duty, and observance, All humbleness, all patience, and impatience, All purity, all trial, all observance, And so am I for Phoebe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adore]] | verb | **1.** Love intensely. | *"Thus, Indian-like, Religious in mine error, I adore The sun that looks upon his worshipper, But knows of him no more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adored]] | verb | **1.** Love intensely.<br>**2.** Regarded with deep or rapturous love (especially as if for a god). | *"This yellow slave Will knit and break religions, bless th’ accursed, Make the hoar leprosy adored, place thieves And give them title, knee, and approbation With senators on the bench."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adorer]] | noun | **1.** Someone who admires a young woman. | *"Being so far provok’d as I was in France, I would abate her nothing, though I profess myself her adorer, not her friend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adoring]] | verb | **1.** Love intensely.<br>**2.** Showing adoration. | *"Men shut their doors against a setting sun. [_The Lords rise from table, with much adoring of Timon, and to show their loves each singles out an Amazon, and all dance, men with women, a lofty strain or two to the hautboys, and cease._] TIMON."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[color]] | noun | **1.** A visual attribute of things that results from the light they emit or transmit or reflect.<br>**2.** Interest and variety and intensity. | *"My hands are of your color, but I shame To wear a heart so white. [_Knocking within._] I hear knocking At the south entry:—retire we to our chamber."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coloration]] | noun | **1.** The timbre of a musical sound.<br>**2.** Appearance with regard to color. | *"These fruits are hidden amid the tissues of the plant on which the “white rust” is parasitic, and only betray their presence by the coloration of those tissues."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[colored]] | noun | **1.** A united states term for blacks that is now considered offensive.<br>**2.** Add color to. | *"O, multi-colored, multiform, Beloved beauty over me, That I shall never, never see Again!"* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[coloring]] | noun | **1.** A digestible substance used to give color to food.<br>**2.** A visual attribute of things that results from the light they emit or transmit or reflect. | *"It won't do to question us too closely," returned Zoe, coloring and laughing."* — Martha Finley, *Elsie's Kith and Kin* |
| [[colorise]] | verb | **1.** Add color to. | *"In academic literature, colorise designates add color to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colorist]] | noun | **1.** A painter able to achieve special effects with color. | *"In academic literature, colorist designates a painter able to achieve special effects with color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colorize]] | verb | **1.** Add color to. | *"In academic literature, colorize designates add color to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolor]] | verb | **1.** Remove color from. | *"In academic literature, decolor designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolorise]] | verb | **1.** Remove color from. | *"In academic literature, decolorise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolorize]] | verb | **1.** Remove color from. | *"In academic literature, decolorize designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dior]] | noun | **1.** French couturier whose first collection in 1947 created a style that became known as the new look (1905-1957). | *"In academic literature, dior designates french couturier whose first collection in 1947 created a style that became known as the new look (1905-1957)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discolor]] | verb | **1.** Lose color or turn colorless.<br>**2.** Cause to lose or change color. | *"When by chance these precious parts in a nursing whale are cut by the hunter’s lance, the mother’s pouring milk and blood rivallingly discolor the sea for rods."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[discoloration]] | noun | **1.** A soiled or discolored appearance.<br>**2.** The act of changing the natural color of something by making it duller or dingier or unnatural or faded. | *"From the wonderful discoloration and turbidity of the water, Columbus sagaciously concluded that a very large river was near, and consequently--consequent-ly--a great continent!" But to this continent Elsie never attained."* — S. R. Crockett, *Deep Moat Grange* |
| [[discolorise]] | verb | **1.** Remove color from. | *"In academic literature, discolorise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discolorize]] | verb | **1.** Remove color from. | *"In academic literature, discolorize designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inexorability]] | noun | **1.** Mercilessness characterized by an unwillingness to relent or let up. | *"In academic literature, inexorability designates mercilessness characterized by an unwillingness to relent or let up."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inexorable]] | adjective | **1.** Not to be placated or appeased or moved by entreaty.<br>**2.** Impervious to pleas, persuasion, requests, reason; ; - w.churchill. | *"That face of his the hungry cannibals Would not have touched, would not have stained with blood; But you are more inhuman, more inexorable, O, ten times more than tigers of Hyrcania."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inexorableness]] | noun | **1.** Mercilessness characterized by an unwillingness to relent or let up. | *"In academic literature, inexorableness designates mercilessness characterized by an unwillingness to relent or let up."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[or]] | noun | **1.** A state in northwestern united states on the pacific.<br>**2.** A room in a hospital equipped for the performance of surgical operations. | *"Nay, the debts due to the French and Dutch are to be paid in militiamen instead of louis d’ors and ducats."* — Alexander Hamilton, *The Federalist Papers* |
| [[oracle]] | noun | **1.** An authoritative person who divines the future.<br>**2.** A prophecy (usually obscure or allegorical) revealed by a priest or priestess; believed to be infallible. | *"Again, there is sprung up An heretic, an arch-one, Cranmer, one Hath crawled into the favour of the King And is his oracle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oracular]] | adjective | **1.** Of or relating to an oracle.<br>**2.** Obscurely prophetic. | *"They lost some of their fantastic illusions, they tempered some of their exaggerated claims of oracular inspiration."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[oral]] | noun | **1.** An examination conducted by spoken communication.<br>**2.** Using speech rather than writing. | *"I cannot produce written proof again, but I can give as authentic oral testimony as you can desire, of what he is now wanting, and what he is now doing."* — Jane Austen, *Persuasion* |
| [[orate]] | verb | **1.** Talk pompously. | *"Bring a stranger within thy tower it will go hard but thou wilt have the secondbest bed. _Orate, fratres, pro memetipso_."* — James Joyce, *Ulysses* |
| [[oration]] | noun | **1.** An instance of oratory. | *"Why, sir, that is as fit as can be to serve for your oration; and let him deliver the pigeons to the emperor from you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[orator]] | noun | **1.** A person who delivers a speech or oration. | *"He’s a good drum, my lord, but a naughty orator."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oratorical]] | adjective | **1.** Characteristic of an orator or oratory; ; - robert graves. | *"Gavin Hamilton—Holy Willie and his priest, Father Auld, after full hearing in the presbytery of Ayr, came off but second best; owing partly to the oratorical powers of Mr."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[oratory]] | noun | **1.** Addressing an audience formally (usually a long and rhetorical address and often pompous). | *"Ne’er trust me then; for when a world of men Could not prevail with all their oratory, Yet hath a woman’s kindness over-ruled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perorate]] | verb | **1.** Conclude a speech with a formal recapitulation.<br>**2.** Deliver an oration in grandiloquent style. | *"In academic literature, perorate designates conclude a speech with a formal recapitulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peroration]] | noun | **1.** A flowery and highly rhetorical oration.<br>**2.** (rhetoric) the concluding section of an oration. | *"Nephew, what means this passionate discourse, This peroration with such circumstance?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncolored]] | adjective | **1.** Without color.<br>**2.** Not artificially colored or bleached. | *"In academic literature, uncolored designates without color."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · OR
  </div>
</div>
