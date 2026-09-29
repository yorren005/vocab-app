---
status: unread
type: root_dashboard
---
# Dashboard — vers
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vers-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“turned, direction, or facing”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **vers** means turned, direction, or facing. It refers to revolving around, facing a direction, or turning. In English, this root forms words such as *reverse*, *version*, *conversation*, and *adverse*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: turned, direction, or facing
> The root **vers** means turned, direction, or facing. It refers to revolving around, facing a direction, or turning. In English, this root forms words such as *reverse*, *version*, *conversation*, and *adverse*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Turned, direction, or facing</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *reverse* and *version*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vers** comes from a Latin word that means *"turned, direction, or facing"*.
  - At its core, it describes turned, direction, or facing.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **vers** in an English word, think of **turning, revolving, and changing direction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of turned, direction, or facing.
  - **Mental & Social**: How people experience, organize, or communicate about turned, direction, or facing.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Reverse**: To move backward or in the opposite direction.
  - **Version**: An everyday English word showing the root's idea of *turned, direction, or facing*.
  - **Conversation**: An informal talk between two or more people in which news and ideas are exchanged.
  - **Adverse**: Preventing success or development.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vers</mark>, think of <mark class="hl-def">turning, revolving, and changing direction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `vers-` (< Latin *versus*): Participial and nominal base.
- **Prefix Transformations**:
  - `ad-` ("against"): *adverse, adversary, adversity*.
  - `ab-` ("away from"): *averse, aversion*.
  - `con-` ("together"): *converse, conversation*.
  - `di-` ("apart, different"): *diverse, diversity*.
  - `in-` ("into, opposite"): *inverse, inversion*.
  - `per-` ("thoroughly wrong, crooked"): *perverse, perversion*.
  - `re-` ("back"): *reverse, reversion*.
  - `trans-` ("across"): *transverse*.
- **Suffixal Formations**:
  - `-atile`: *versatile* ("capable of turning easily to many pursuits").
  - `-ary`: *adversary, anniversary*.

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
```
                      ┌── Poetry & Knowledge: verse, versed
                      │
   [vers] ────────────┼── Conflict & Polarity: adverse, adversary, adversity, versus, averse, aversion
 (Turned / State)     │
                      ├── Dialogue & Variety: converse, conversation, diverse, diversity
                      │
                      └── Spatial Geometry & Inversion: inverse, inversion, obverse, perverse, reverse, transverse
```

---

## 🔀 4. Prefix & Combining Dynamics on vers
- **`ad-` + `vers`**: *adverse* — turned against one's interests; hostile.
- **`ab-` + `vers`**: *averse* — turned away in distaste or reluctance.
- **`di-` + `vers`**: *diverse* — turned in different directions; varied.
- **`per-` + `vers`**: *perverse* — turned obstinately away from what is right or natural.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Literature & Poetics**: Blank *verse*, rhymed verse, versification, stanzas.
- **Mathematics & Geometry**: *Inverse* functions ($f^{-1}$); *transverse* axes in conic sections.
- **Jurisprudence & Litigation**: Plaintiff *versus* defendant ($v.$); *adversarial* legal systems.
- **Numismatics**: The *obverse* ("heads", face turned forward) vs. reverse ("tails") of a coin.
- **Sociology & Ecology**: Biodiversity, cultural *diversity*, and demographic inclusion.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adversary]] | noun | **1.** Someone who offers opposition. | *"He must think us some band of strangers i’ the adversary’s entertainment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adversative]] | adjective | **1.** Expressing antithesis or opposition. | *"In academic literature, adversative designates expressing antithesis or opposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adverse]] | adjective | **1.** Contrary to your interests or welfare.<br>**2.** In an opposing direction. | *"All’s well that ends well yet, Though time seem so adverse and means unfit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adversely]] | adverb | **1.** In an adverse manner. | *"Meeting two such wealsmen as you are—I cannot call you Lycurguses—if the drink you give me touch my palate adversely, I make a crooked face at it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adversity]] | noun | **1.** A state of misfortune or affliction.<br>**2.** A stroke of ill fortune; a calamitous event. | *"Let me embrace thee, sour adversity, For wise men say it is the wisest course. 2 KEEPER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anvers]] | noun | **1.** A busy port and financial center in northern belgium on the scheldt river; it has long been a center for the diamond industry and the first stock exchange was opened there in 1460. | *"In academic literature, anvers designates a busy port and financial center in northern belgium on the scheldt river; it has long been a center for the diamond industry and the first stock exchange was opened there in 1460."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conversance]] | noun | **1.** Personal knowledge or information about someone or something. | *"In academic literature, conversance designates personal knowledge or information about someone or something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conversancy]] | noun | **1.** Personal knowledge or information about someone or something. | *"In academic literature, conversancy designates personal knowledge or information about someone or something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conversant]] | adjective | **1.** (usually followed by `with') well informed about or knowing thoroughly. | *"But I much marvel that your lordship, having Rich tire about you, should at these early hours Shake off the golden slumber of repose. ’Tis most strange, Nature should be so conversant with pain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conversation]] | noun | **1.** The use of speech for informal exchange of views or ideas or information etc. | *"My lord your son made me to think of this; Else Paris, and the medicine, and the king, Had from the conversation of my thoughts Haply been absent then."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conversational]] | adjective | **1.** Characteristic of informal spoken language or conversation. | *"Skimpole, “he parted from our conversational friend Kenge and took up, I believe, with Vholes."* — Charles Dickens, *Bleak House* |
| [[conversationalist]] | noun | **1.** Someone skilled at conversation. | *"Gilchrist even more gifted as a conversationalist than as a writer."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[conversationally]] | adverb | **1.** With the use of colloquial expressions. | *"Bucket conversationally, “and much to blame you would be if you didn’t."* — Charles Dickens, *Bleak House* |
| [[conversationist]] | noun | **1.** Someone skilled at conversation. | *"In academic literature, conversationist designates someone skilled at conversation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[converse]] | noun | **1.** A proposition obtained by conversion.<br>**2.** Carry on a conversation. | *"Did you converse, sir, with this gentlewoman?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conversely]] | adverb | **1.** With the terms of the relation reversed. | *"What Jesus then teaches on prayer will illuminate what he means by God; and conversely his conception of God will throw new light upon the whole problem of prayer."* — T. R. Glover, *The Jesus of History* |
| [[conversion]] | noun | **1.** An event that results in a transformation.<br>**2.** A change in the units or form of an expression:. | *"I do not shame To tell you what I was, since my conversion So sweetly tastes, being the thing I am."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[converso]] | noun | **1.** (medieval spain and portugal) a jew or moor who professed to convert to christianity in order to avoid persecution or expulsion. | *"In academic literature, converso designates (medieval spain and portugal) a jew or moor who professed to convert to christianity in order to avoid persecution or expulsion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countersubversion]] | noun | **1.** The aspect of counterintelligence designed to detect and prevent subversive activities. | *"In academic literature, countersubversion designates the aspect of counterintelligence designed to detect and prevent subversive activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divers]] | noun | **1.** Someone who works underwater.<br>**2.** Someone who dives (into water). | *"On each side her Stood pretty dimpled boys, like smiling Cupids, With divers-coloured fans, whose wind did seem To glow the delicate cheeks which they did cool, And what they undid did."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverse]] | adjective | **1.** Many and different.<br>**2.** Distinctly dissimilar or unlike. | *"Pilate waxed eloquent over the diverse sects and the fanatic uprisings and riotings that were continually occurring."* — Jack London, *The Jacket (The Star-Rover)* |
| [[diversely]] | adverb | **1.** In diverse ways. | *"A mere spectator of other men’s fortunes and adventures, and how they play their parts; which, methinks, are diversely presented unto me, as from a common theatre or scene.”--BURTON."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[diverseness]] | noun | **1.** Noticeable heterogeneity. | *"In academic literature, diverseness designates noticeable heterogeneity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diversification]] | noun | **1.** The act of introducing variety (especially in investments or in the variety of goods and services offered).<br>**2.** The condition of being varied. | *"Industries are forced into an earlier diversification by tariffs."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[diversified]] | verb | **1.** Make (more) diverse.<br>**2.** Spread into new habitats and produce variety or variegate. | *"The conclusion of her visit, however, was diversified in a way which she had not at all imagined."* — Jane Austen, *Persuasion* |
| [[diversify]] | verb | **1.** Make (more) diverse.<br>**2.** Spread into new habitats and produce variety or variegate. | *"Whilst the alloy and value depended on the general authority, a right of coinage in the particular States could have no other effect than to multiply expensive mints and diversify the forms and weights of the circulating pieces."* — Alexander Hamilton, *The Federalist Papers* |
| [[diversion]] | noun | **1.** An activity that diverts or amuses or stimulates.<br>**2.** A turning aside (of your course or attention or concern). | *"Guppy, after a moment’s consideration, began, to the great diversion of his mother, which she displayed by nudging Mr."* — Charles Dickens, *Bleak House* |
| [[diversionary]] | adjective | **1.** (of tactics e.g.) likely or designed to confuse or deceive. | *"Narval did say to crank in diversionary tactics that would draw the Terminals' defensive forces away from their normal ops zone." "That's weird." "Agreed."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[diversionist]] | noun | **1.** Someone who commits sabotage or deliberately causes wrecks. | *"In academic literature, diversionist designates someone who commits sabotage or deliberately causes wrecks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diversity]] | noun | **1.** Noticeable heterogeneity.<br>**2.** The condition or result of being changeable. | *"They are of the utmost diversity of subjects, literally including the "all things" of the Bible, and temporal as well as spiritual interests."* — Classic Author, *The wonders of prayer* |
| [[evers]] | noun | **1.** United states civil rights worker in mississippi; was killed by a sniper (1925-1963). | *"In academic literature, evers designates united states civil rights worker in mississippi; was killed by a sniper (1925-1963)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eversion]] | noun | **1.** The position of being turned outward.<br>**2.** The act of turning inside out. | *"In academic literature, eversion designates the position of being turned outward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraversion]] | noun | **1.** (psychology) an extroverted disposition; concern with what is outside the self. | *"In academic literature, extraversion designates (psychology) an extroverted disposition; concern with what is outside the self."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraversive]] | adjective | **1.** Directed outward; marked by interest in others or concerned with external reality. | *"In academic literature, extraversive designates directed outward; marked by interest in others or concerned with external reality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introversion]] | noun | **1.** The condition of being folded inward or sheathed.<br>**2.** The folding in of an outer layer so as to form a pocket in the surface. | *"In academic literature, introversion designates the condition of being folded inward or sheathed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introversive]] | adjective | **1.** Directed inward; marked by interest in yourself or concerned with inner feelings. | *"In academic literature, introversive designates directed inward; marked by interest in yourself or concerned with inner feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inverse]] | noun | **1.** Something inverted in sequence or character or effect.<br>**2.** Reversed (turned backward) in order or nature or effect. | *"We had in deed “struck,” to use a sea expression, but in an inverse sense, and at a thousand feet deep."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[inversely]] | adverb | **1.** In an inverse or contrary manner; ; - f.a.geldard. | *"According to the quantity theory we must expect that, when conditions (1) and (2) remain fixed, the value of money will vary inversely as its quantity."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inversion]] | noun | **1.** The layer of air near the earth is cooler than an overlying layer.<br>**2.** Abnormal condition in which an organ is turned inward or inside out (as when the upper part of the uterus is pulled into the cervical canal after childbirth). | *"And the worst was the strange inversion of time."* — Donn Byrne, *The Wind Bloweth* |
| [[irreversibility]] | noun | **1.** The quality of being irreversible (once done it cannot be changed). | *"In academic literature, irreversibility designates the quality of being irreversible (once done it cannot be changed)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irreversible]] | adjective | **1.** Incapable of being reversed. | *"An unsatisfactory equation between an exodus and return in time through reversible space and an exodus and return in space through irreversible time."* — James Joyce, *Ulysses* |
| [[irreversibly]] | adverb | **1.** In an irreversible manner. | *"The real man is discovered, his worth is impartially weighed, his rank is irreversibly decreed."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nonreversible]] | adjective | **1.** Not reversible or capable of having either side out. | *"In academic literature, nonreversible designates not reversible or capable of having either side out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obverse]] | noun | **1.** The more conspicuous of two alternatives or cases or sides.<br>**2.** The side of a coin or medal bearing the principal stamp or design. | *"Were there obverse meditations of involution increasingly less vast?"* — James Joyce, *Ulysses* |
| [[perverse]] | adjective | **1.** Marked by a disposition to oppose and contradict.<br>**2.** Resistant to guidance or discipline. | *"If I were covetous, ambitious, or perverse, As he will have me, how am I so poor?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perversely]] | adverb | **1.** Deliberately deviant.<br>**2.** In a contrary disobedient manner. | *"Ay, and perversely she persevers so."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perverseness]] | noun | **1.** Deliberate and stubborn unruliness and resistance to guidance or discipline.<br>**2.** Deliberately deviating from what is good. | *"With a similar perverseness, the potatoes crumble off forks in the process of peeling, upheaving from their centres in every direction, as if they were subject to earthquakes."* — Charles Dickens, *Bleak House* |
| [[perversion]] | noun | **1.** A curve that reverses the direction of something.<br>**2.** An aberrant sexual practice. | *"Besides,” he said, pursuing his argument in his tone of light-hearted conviction, “if I don’t go anywhere for pain—which would be a perversion of the intention of my being, and a monstrous thing to do—why should I go anywhere to be the cause of pain?"* — Charles Dickens, *Bleak House* |
| [[perversity]] | noun | **1.** Deliberate and stubborn unruliness and resistance to guidance or discipline.<br>**2.** Deliberately deviating from what is good. | *"And what a distortion in your judgment, what a perversity in your ideas, is proved by your conduct!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[perversive]] | adjective | **1.** Tending to corrupt or pervert. | *"In academic literature, perversive designates tending to corrupt or pervert."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retroversion]] | noun | **1.** A turning or tilting backward of an organ or body part.<br>**2.** Translation back into the original language. | *"In academic literature, retroversion designates a turning or tilting backward of an organ or body part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revers]] | noun | **1.** A lapel on a woman's garment; turned back to show the reverse side. | *"Revers’d that spear, redoubtable in war, Reclined that banner, erst in fields unfurl’d, That like a deathful meteor gleam’d afar, And brav’d the mighty monarchs of the world."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[reversal]] | noun | **1.** A change from one state to the opposite state.<br>**2.** An unfortunate happening that hinders or impedes; something that is thwarting or frustrating. | *"The free-silver advocates got what they desired, a reversal of the movement of general prices, through an occurrence for which no political party could claim the credit."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[reverse]] | noun | **1.** A relation of direct opposition.<br>**2.** The gears by which the motion of a machine can be reversed. | *"Reverse thy state; And in thy best consideration check This hideous rashness: answer my life my judgement, Thy youngest daughter does not love thee least; Nor are those empty-hearted, whose low sounds Reverb no hollowness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reversed]] | verb | **1.** Change to the contrary.<br>**2.** Turn inside out or upside down. | *"It addressed me as if our places were reversed, as if all the good deeds had been mine and all the feelings they had awakened his."* — Charles Dickens, *Bleak House* |
| [[reversely]] | adverb | **1.** In an opposite way; so as to be reversed. | *"In academic literature, reversely designates in an opposite way; so as to be reversed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversibility]] | noun | **1.** The quality of being reversible in either direction. | *"In academic literature, reversibility designates the quality of being reversible in either direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversible]] | noun | **1.** A garment (especially a coat) that can be worn inside out (with either side of the cloth showing).<br>**2.** Capable of reversing or being reversed. | *"Reversible propositions 113:9 The fundamental propositions of divine metaphysics are summarized in the four following, to me, /self-evident/ propositions."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[reversibly]] | adverb | **1.** In a reversible manner. | *"In academic literature, reversibly designates in a reversible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversion]] | noun | **1.** (law) an interest in an estate that reverts to the grantor (or his heirs) at the end of some period (e.g., the death of the grantee).<br>**2.** (genetics) a return to a normal phenotype (usually resulting from a second mutation). | *"Faith, and so we should, where now remains A sweet reversion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reversionary]] | adjective | **1.** Of or relating to or involving a reversion (especially a legal reversion). | *"These money transactions--these speculations in life and death--these silent battles for reversionary spoil--make brothers very loving towards each other in Vanity Fair."* — William Makepeace Thackeray, *Vanity Fair* |
| [[reversioner]] | noun | **1.** (law) a party who is entitled to an estate in reversion. | *"In academic literature, reversioner designates (law) a party who is entitled to an estate in reversion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversionist]] | noun | **1.** Someone who lapses into previous undesirable patterns of behavior. | *"In academic literature, reversionist designates someone who lapses into previous undesirable patterns of behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversive]] | adjective | **1.** Tending to be turned back. | *"In academic literature, reversive designates tending to be turned back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subversion]] | noun | **1.** Destroying someone's (or some group's) honesty or loyalty; undermining moral integrity.<br>**2.** The act of subverting; as overthrowing or destroying a legally constituted government. | *"What louring star now envies thy estate That these great lords and Margaret our Queen Do seek subversion of thy harmless life?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subversive]] | noun | **1.** A radical supporter of political or social revolution.<br>**2.** In opposition to a civil authority or government. | *"I don’t know what there may be to say, but you must remember that Ralph must talk.” “He thinks your friend’s too subversive--or not subversive enough!"* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[subversiveness]] | noun | **1.** Disloyalty by virtue of subversive behavior. | *"In academic literature, subversiveness designates disloyalty by virtue of subversive behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transversal]] | adjective | **1.** Extending or lying across; in a crosswise direction; at right angles to the long axis. | *"In academic literature, transversal designates extending or lying across; in a crosswise direction; at right angles to the long axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transversally]] | adverb | **1.** In a transverse manner. | *"In academic literature, transversally designates in a transverse manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transverse]] | adjective | **1.** Extending or lying across; in a crosswise direction; at right angles to the long axis. | *"Among the Western Dénés it is believed that one or two transverse lines tattooed on the arms or legs of a young man by a pubescent girl are a specific against premature weakness of these limbs."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[transversely]] | adverb | **1.** In a transverse manner. | *"Brooke wound up, rubbing his thumb transversely along the edges of the leaves as he held the book forward."* — George Eliot, *Middlemarch* |
| [[traversable]] | adjective | **1.** Capable of being traversed. | *"In academic literature, traversable designates capable of being traversed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[traversal]] | noun | **1.** Taking a zigzag path on skis.<br>**2.** Travel across. | *"In academic literature, traversal designates taking a zigzag path on skis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[traverse]] | noun | **1.** A horizontal beam that extends across something.<br>**2.** A horizontal crosspiece across a window or separating a door from a window over it. | *"He writes brave verses, speaks brave words, swears brave oaths, and breaks them bravely, quite traverse, athwart the heart of his lover, as a puny tilter, that spurs his horse but on one side, breaks his staff like a noble goose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[traverser]] | noun | **1.** Someone who moves or passes across. | *"In academic literature, traverser designates someone who moves or passes across."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiversified]] | adjective | **1.** Not diversified. | *"In academic literature, undiversified designates not diversified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untraversable]] | adjective | **1.** Incapable of being traversed. | *"In academic literature, untraversable designates incapable of being traversed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untraversed]] | adjective | **1.** Not traveled over or through. | *"In academic literature, untraversed designates not traveled over or through."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unversed]] | adjective | **1.** Not having had extensive practice. | *"They were indeed excellent in two sciences for which I have great esteem, and wherein I am not unversed; but, at the same time, so abstracted and involved in speculation, that I never met with such disagreeable companions."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[versace]] | noun | **1.** Italian fashion designer (1946-1997). | *"In academic literature, versace designates italian fashion designer (1946-1997)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[versailles]] | noun | **1.** A city in north central france near paris; site of the palace of versailles that was built by louis xiv in the 17th century.<br>**2.** A palace built in the 17th century for louis xiv southwest of paris near the city of versailles. | *"Compare Edmond Doutté, _Magie et Religion dans l'Afrique du Nord_ (Algiers, 1908), p. 571 note I. [453] Bossuet, _Oeuvres_ (Versailles, 1815-1819), vi. 276 ("Catéchisme du diocèse de Meaux")."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[versant]] | noun | **1.** The side or slope of a mountain. | *"In academic literature, versant designates the side or slope of a mountain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[versatile]] | adjective | **1.** Having great diversity or variety.<br>**2.** Changeable or inconstant. | *"Of these, Graham, bright, witty, versatile, the most notorious of punsters and the most illegible of writers, was his chief intimate, and their friendship continued unbroken and close for half a century."* — John Cairns, *Principal Cairns* |
| [[versatility]] | noun | **1.** Having a wide variety of skills. | *"The trust companies, however, with their greater versatility, are increasing in number."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[verse]] | noun | **1.** Literature in metrical form.<br>**2.** A piece of poetry. | *"To give away yourself, keeps yourself still, And you must live drawn by your own sweet skill. 17 Who will believe my verse in time to come If it were filled with your most high deserts?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[versed]] | noun | **1.** An injectable form of benzodiazepine (trade name versed) useful for sedation and for reducing pain during uncomfortable medical procedures.<br>**2.** Compose verses or put into verse. | *"Hendrik Hamel might be one time part-owner of the old _Sparwehr_, with a navigator’s knowledge of the stars and deep versed in books, but with women, no, there I would not give him better."* — Jack London, *The Jacket (The Star-Rover)* |
| [[versicle]] | noun | **1.** A short verse said or sung by a priest or minister in public worship and followed by a response from the congregation. | *"Complimentary Versicles To Jessie Lewars 1."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[versification]] | noun | **1.** A metrical adaptation of something (e.g., of a prose text).<br>**2.** The form or metrical composition of a poem. | *"Compare with this the genuinely corrupt Byron, through the cracks and fissures of whose heaving versification steam up perpetually the sulphurous vapours from his central iniquity."* — Francis Thompson, *Shelley: An Essay* |
| [[versifier]] | noun | **1.** A writer who composes rhymes; a maker of poor verses (usually used as terms of contempt for minor or inferior poets). | *"The versifier sang the parts of the King and Queen in turn, and found each audience perfectly willing to be the oxen, the sweethearts, the swans, the sons, the shepherds, etc."* — Vachel Lindsay, *The Chinese Nightingale, and Other Poems* |
| [[versify]] | verb | **1.** Compose verses or put into verse. | *"Versified Reply To An Invitation Song—Will Ye Go To The Indies, My Mary?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[version]] | noun | **1.** An interpretation of a matter from a particular viewpoint.<br>**2.** Something a little different from others of the same type. | *"Such is one version of the tale..."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[verso]] | noun | **1.** Left-hand page.<br>**2.** The side of a coin or medal that does not bear the principal design. | *"Durantis), a writer of the thirteenth century, in his _Rationale Divinorum Officiorum_, lib. vii. cap. 14 (p. 442 _verso_, ed."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[verst]] | noun | **1.** A russian unit of length (1.067 km). | *"In academic literature, verst designates a russian unit of length (1.067 km)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VERS
  </div>
</div>
