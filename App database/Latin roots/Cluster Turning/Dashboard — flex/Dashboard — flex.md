---
status: unread
type: root_dashboard
---
# Dashboard — flex
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">flex-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to bend”</span>
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

The root **flex** means to bend. It refers to the action of bending and carrying out this process. In English, this root forms words such as *flexible*, *flexibility*, *reflex*, and *circumflex*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to bend
> The root **flex** means to bend. It refers to the action of bending and carrying out this process. In English, this root forms words such as *flexible*, *flexibility*, *reflex*, and *circumflex*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To bend</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *flexible* and *flexibility*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **flex** comes from a Latin word that means *"to bend"*.
  - At its core, it describes the action of bend.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **flex** in an English word, think of **to bend**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to bend).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Flexible**: Capable of bending easily without breaking.
  - **Flexibility**: The quality of bending easily without breaking.
  - **Reflex**: An involuntary, automatic neural and muscular response to a sensory stimulus.
  - **Circumflex**: A diacritical accent mark placed over vowels in various languages.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">flex</mark>, think of <mark class="hl-def">to bend</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `flex-`: Participial stem of *flectere*.
- **Suffixal Engines**:
  - `-ible` (capacity): *flexible* ("capable of being bent").
  - `-ibility` (state of capacity): *flexibility*.
  - `-ion` (action/state): *flexion*, *deflexion*.
  - `-or` (anatomical agent): *flexor*.
  - `-uous` (full of, meandering): *flexuous* ("full of bends and windings").
  - `-ive` (tendency): *reflexive*.

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
                      ┌── Material Pliability: flexible, flexibility, inflexible, inflexibility
                      │
   [flex] ────────────┼── Biomechanics & Anatomy: flexion, flexor, retroflex
 (Bent / Pliable)     │
                      ├── Neuroscience & Grammar: reflex, reflexive, reflexivity
                      │
                      └── Geometry & Topography: flexuous, deflexion, circumflex
```

---

## 🔀 4. Prefix & Combining Dynamics on flex
- **`in-` (negative) + `flex`**: *inflexible* — rigid, unyielding, incapable of compromise.
- **`re-` + `flex`**: *reflex* — an involuntary motor response bent back by neural circuitry.
- **`circum-` + `flex`**: *circumflex* — curved around; a diacritical accent (`^`).
- **`retro-` + `flex`**: *retroflex* — bent backward; a phonetic sound articulated with tongue curled back.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Anatomy & Kinesiology**: *Flexion* vs. extension; *flexor carpi radialis*; joint mobility.
- **Neuroscience & Physiology**: Deep tendon *reflexes* (patellar reflex); conditioned reflexes.
- **Materials Engineering**: *Flexural* strength; bend testing; polymers and silicone *flexibility*.
- **Linguistics & Grammar**: *Reflexive* pronouns (*myself, themselves*); *retroflex* consonants.
- **Organizational Management**: *Flexitime* (flexible working hours); organizational agility.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circumflex]] | noun | **1.** A diacritical mark (^) placed above a vowel in some languages to indicate a special phonetic quality. | *"In academic literature, circumflex designates a diacritical mark (^) placed above a vowel in some languages to indicate a special phonetic quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deflexion]] | noun | **1.** The amount by which a propagating wave is bent.<br>**2.** The movement of the pointer or pen of a measuring instrument from its zero position. | *"In academic literature, deflexion designates the amount by which a propagating wave is bent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flex]] | noun | **1.** The act of flexing.<br>**2.** Contract. | *"Leviathans off-loaded to barges as other ships in a multitude of shapes and sizes grappled with cargo from flex-conveyers that snaked from the Depot's gaping portals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[flexeril]] | noun | **1.** Muscle relaxant (trade name flexeril) used for muscle spasms or acute injury. | *"In academic literature, flexeril designates muscle relaxant (trade name flexeril) used for muscle spasms or acute injury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flexibility]] | noun | **1.** The property of being flexible; easily bent or shaped.<br>**2.** The quality of being adaptable or variable. | *"The old girl said it wouldn’t do; intention good, but want of flexibility; try the bassoon."* — Charles Dickens, *Bleak House* |
| [[flexible]] | adjective | **1.** Capable of being changed.<br>**2.** Able to flex; able to bend easily. | *"Women are soft, mild, pitiful, and flexible; Thou stern, obdurate, flinty, rough, remorseless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flexibleness]] | noun | **1.** The property of being flexible; easily bent or shaped.<br>**2.** The quality of being adaptable or variable. | *"In academic literature, flexibleness designates the property of being flexible; easily bent or shaped."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flexibly]] | adverb | **1.** With flexibility. | *"He carried close to his leg a narrow unsheathed sword (small, curved, and not like a real weapon) and looked now at the superior officers and now back at the men without losing step, his whole powerful body turning flexibly."* — graf Leo Tolstoy, *War and Peace* |
| [[flexile]] | adjective | **1.** Able to flex; able to bend easily. | *"In academic literature, flexile designates able to flex; able to bend easily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flexion]] | noun | **1.** The state of being flexed (as of a joint).<br>**2.** Deviation from a straight or normal course. | *"Nor does this—its amazing strength, at all tend to cripple the graceful flexion of its motions; where infantileness of ease undulates through a Titanism of power."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[flexor]] | noun | **1.** A skeletal muscle whose contraction bends a joint. | *"In academic literature, flexor designates a skeletal muscle whose contraction bends a joint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flexuous]] | adjective | **1.** Having turns or windings. | *"They consisted in about equal proportions of gnarled and flexuous forms, the former being the men, the latter the women, who wore tilt bonnets covered with nankeen, which hung in a curtain upon their shoulders."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[flexure]] | noun | **1.** The state of being flexed (as of a joint).<br>**2.** An angular or rounded shape made by folding. | *"Will it give place to flexure and low bending?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inflexibility]] | noun | **1.** A lack of physical flexibility.<br>**2.** The quality of being rigid and rigorously severe. | *"Our spoilt little woman,” said my guardian, “shall have her own way even in her inflexibility, though at the price, I know, of tears downstairs."* — Charles Dickens, *Bleak House* |
| [[inflexible]] | adjective | **1.** Incapable of change.<br>**2.** Not making concessions. | *"It may be that her beauty and all the state and brilliancy surrounding her only gives him the greater zest for what he is set upon and makes him the more inflexible in it."* — Charles Dickens, *Bleak House* |
| [[inflexibleness]] | noun | **1.** A lack of physical flexibility. | *"In academic literature, inflexibleness designates a lack of physical flexibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inflexibly]] | adverb | **1.** In an inflexible manner. | *"Her figure was elegant, and she walked well; but Darcy, at whom it was all aimed, was still inflexibly studious."* — Jane Austen, *Pride and Prejudice* |
| [[inflexion]] | noun | **1.** A change in the form of a word (usually by adding a suffix) to indicate a change in its grammatical function. | *"Give up--a--?” asked Lord Warburton, meeting her harsh inflexion with a very mellow one."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[reflex]] | noun | **1.** An automatic instinctive unlearned reaction to a stimulus.<br>**2.** Without volition or conscious control. | *"I’ll say yon grey is not the morning’s eye, ’Tis but the pale reflex of Cynthia’s brow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reflexed]] | adjective | **1.** (of leaves) bent downward and outward more than 90 degrees. | *"In academic literature, reflexed designates (of leaves) bent downward and outward more than 90 degrees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflexion]] | noun | **1.** The phenomenon of a propagating wave (light or sound) being thrown back from a surface.<br>**2.** Expression without words. | *"This is all he is entitled to; he is entitled to nothing, he is bound to admit, that can come to him, from the reader, as a result on the latter’s part of any act of reflexion or discrimination."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[reflexive]] | noun | **1.** A personal pronoun compounded with -self to show the agent's action affects the agent.<br>**2.** Without volition or conscious control. | *"Why, it is just like being the past tense of the compound reflexive adverbial incandescent hypodermic irregular accusative Noun of Multitude; which is father to the expression which the grammarians call Verb."* — Mark Twain, *What Is Man? and Other Essays* |
| [[reflexiveness]] | noun | **1.** The coreferential relation between a reflexive pronoun and its antecedent.<br>**2.** (logic and mathematics) a relation such that it holds between an element and itself. | *"In academic literature, reflexiveness designates the coreferential relation between a reflexive pronoun and its antecedent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflexivity]] | noun | **1.** The coreferential relation between a reflexive pronoun and its antecedent.<br>**2.** (logic and mathematics) a relation such that it holds between an element and itself. | *"In academic literature, reflexivity designates the coreferential relation between a reflexive pronoun and its antecedent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflexly]] | adverb | **1.** In a reflex manner. | *"In academic literature, reflexly designates in a reflex manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflexology]] | noun | **1.** The study of reflex action as it relates to the behavior of organisms.<br>**2.** Massage to relieve tension by finger pressure; based on the belief that there are reflex points on the feet, hands, and head that are connected to every part of the body. | *"In academic literature, reflexology designates the study of reflex action as it relates to the behavior of organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retroflex]] | verb | **1.** Bend or turn backward.<br>**2.** Articulate (a consonant) with the tongue curled back against the palate. | *"In academic literature, retroflex designates bend or turn backward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retroflexed]] | verb | **1.** Bend or turn backward.<br>**2.** Articulate (a consonant) with the tongue curled back against the palate. | *"In academic literature, retroflexed designates bend or turn backward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retroflexion]] | noun | **1.** A turning or tilting backward of an organ or body part.<br>**2.** An articulatory gesture made by turning the tip of the tongue back against the roof of the mouth. | *"In academic literature, retroflexion designates a turning or tilting backward of an organ or body part."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · FLEX
  </div>
</div>
