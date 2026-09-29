---
status: unread
type: root_dashboard
---
# Dashboard — circ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">circ-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“ring or circle”</span>
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

The root **circ** means ring or circle. It refers to a ring, a circular path, or moving around something. In English, this root forms words such as *circle*, *circular*, *circularity*, and *circulate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: ring or circle
> The root **circ** means ring or circle. It refers to a ring, a circular path, or moving around something. In English, this root forms words such as *circle*, *circular*, *circularity*, and *circulate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Ring or circle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *circle* and *circular*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **circ** comes from a Latin word that means *"ring or circle"*.
  - At its core, it describes ring or circle.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **circ** in an English word, think of **turning, revolving, and changing direction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of ring or circle.
  - **Mental & Social**: How people experience, organize, or communicate about ring or circle.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Circle**: A closed plane curve every point of which is equidistant from a fixed center point.
  - **Circular**: Having the form of a circle.
  - **Circularity**: The state or condition of being round or cyclical.
  - **Circulate**: To move continuously along a closed path or circuit.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">circ</mark>, think of <mark class="hl-def">turning, revolving, and changing direction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `circ-` / `circul-` (< Latin *circus* / *circulus*): The base nominal and diminutive root.
- **Formational Affixes**:
  - `en-` (causative/intensive): *encircle* ("to enclose in a ring").
  - `semi-` ("half"): *semicircle* ("half of a circular perimeter").
  - `re-` ("again, back"): *recirculate* ("to pump through a cycle anew").
  - `-ate` (verbalizer): *circulate* ("to move in a circle").
  - `-ation` (process/noun): *circulation*.
  - `-ary` / `-atory` (adjectival functioning): *circular*, *circulatory*.

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
                      ┌── Geometric Ring: circle, circlet, circular, semicircle
                      │
   [circ] ────────────┼── Hydraulic/Biological Flow: circulate, circulation, circulatory, microcirculation
 (Circle / Ring)      │
                      └── Institutional/Enclosure: circus, encircle, recirculate
```

---

## 🔀 4. Prefix & Combining Dynamics on circ
- **`en-` + `circ`**: *encircle* — to surround completely on every flank.
- **`semi-` + `circ`**: *semicircle* — a half-circle bounded by a diameter.
- **`re-` + `circ`**: *recirculate* — to reintroduce fluid or air into a continuous cycle.
- **`micro-` + `circ`**: *microcirculation* — capillary-level blood transit within tissue beds.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Cardiovascular Medicine**: Pulmonary and systemic *circulation*; *circulatory* shock; *microcirculation*.
- **Geometry & Topology**: *Circle*, *circularity*, *semicircle*, radius, and chord relationships.
- **Economics & Publishing**: Currency in *circulation*; periodical *circulation* numbers.
- **Historical Roman Architecture**: The Roman *Circus Maximus*; the modern performing *circus*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circadian]] | adjective | **1.** Of or relating to biological processes occurring at 24-hour intervals. | *"In academic literature, circadian designates of or relating to biological processes occurring at 24-hour intervals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circaea]] | noun | **1.** Enchanter's nightshade. | *"In academic literature, circaea designates enchanter's nightshade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circaetus]] | noun | **1.** Harrier eagles. | *"In academic literature, circaetus designates harrier eagles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circassian]] | noun | **1.** A member of the sunni muslim people living in northwestern caucasia.<br>**2.** A mostly sunni muslim community living in northwestern caucasia. | *"Hemp is a dusky, dark fellow, a sort of Indian; but Manilla is as a golden-haired Circassian to behold."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[circe]] | noun | **1.** (greek mythology) a sorceress who detained odysseus on her island and turned his men into swine. | *"I think you all have drunk of Circe’s cup."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circinate]] | adjective | **1.** Shaped like a ring. | *"The peridia are densely crowded together, often arranged in a circinate manner, _i.e._, like a watch-spring, or the young frond of a fern."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[circinus]] | noun | **1.** A small faint constellation in the southern hemisphere near musca and triangulum australe. | *"In academic literature, circinus designates a small faint constellation in the southern hemisphere near musca and triangulum australe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circle]] | noun | **1.** Ellipse in which the two axes are of equal length; a plane curve generated by one point moving at a constant distance from a fixed point.<br>**2.** An unofficial association of people or groups. | *"Next, Cleopatra does confess thy greatness, Submits her to thy might, and of thee craves The circle of the Ptolemies for her heirs, Now hazarded to thy grace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circlet]] | noun | **1.** A small circle.<br>**2.** Decorated metal band worn around the head. | *"This precious vessel was now placed on my knee, and I was cordially invited to eat the circlet of delicate pastry upon it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[circuit]] | noun | **1.** An electrical device that provides a path for electrical current to flow.<br>**2.** A journey or route all the way around a particular place or area. | *"And, father, do but think How sweet a thing it is to wear a crown, Within whose circuit is Elysium And all that poets feign of bliss and joy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circuitous]] | adjective | **1.** Marked by obliqueness or indirection in speech or conduct.<br>**2.** Deviating from a straight course. | *"May I ask what dreadful thing it is that has happened between you and him?” “You may ask; but I may not tell.” In about ten minutes they returned to the house by a circuitous route, entering at the rear."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[circuitry]] | noun | **1.** Electronic equipment consisting of a system of circuits. | *"Out of sight beyond a hillock, Zolan reached into the circuitry behind the instrument panel, manipulated connections, and punched in new coordinates."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[circular]] | noun | **1.** An advertisement (usually printed on a page or in a leaflet) intended for wide distribution.<br>**2.** Having a circular shape. | *"It was in a window of what seemed to be an old-fashioned house with three peaks in the roof in front and a circular sweep leading to the porch."* — Charles Dickens, *Bleak House* |
| [[circular-knit]] | adjective | **1.** Knitted in tubular form. | *"In academic literature, circular-knit designates knitted in tubular form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circularisation]] | noun | **1.** Circulating printed notices as a means of advertising. | *"In academic literature, circularisation designates circulating printed notices as a means of advertising."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circularise]] | verb | **1.** Canvass by distributing letters.<br>**2.** Distribute circulars to. | *"In academic literature, circularise designates canvass by distributing letters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circularity]] | noun | **1.** The roundness of a 2-dimensional figure. | *"In academic literature, circularity designates the roundness of a 2-dimensional figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circularization]] | noun | **1.** Circulating printed notices as a means of advertising. | *"In academic literature, circularization designates circulating printed notices as a means of advertising."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circularize]] | verb | **1.** Canvass by distributing letters.<br>**2.** Canvass by using a questionnaire. | *"In academic literature, circularize designates canvass by distributing letters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circularly]] | adverb | **1.** In a circular manner. | *"But Joe was readier with his definition than I had expected, and completely stopped me by arguing circularly, and answering with a fixed look, “Her.” “And I ain’t a master-mind,” Joe resumed, when he had unfixed his look, and got back to his whisker."* — Charles Dickens, *Great Expectations* |
| [[circulate]] | verb | **1.** Become widely known and passed on.<br>**2.** Cause to become widely known. | *"These substitutes for, or supplements to, money enable each dollar to do more work, to circulate more rapidly."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[circulating]] | verb | **1.** Become widely known and passed on.<br>**2.** Cause to become widely known. | *"The several uses of gold are constantly competing for it: its uses for rings, pens, ornaments, championship cups, photography, dentistry, delicate instruments, and as a circulating medium."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[circulation]] | noun | **1.** The dissemination of copies of periodicals (as newspapers or magazines).<br>**2.** Movement through a circuit; especially the movement of blood through the heart and blood vessels. | *"To be informed what the Galaxy Gallery of British Beauty is about, and means to be about, and what Galaxy marriages are on the tapis, and what Galaxy rumours are in circulation, is to become acquainted with the most glorious destinies of mankind."* — Charles Dickens, *Bleak House* |
| [[circulative]] | adjective | **1.** Of or relating to circulation. | *"In academic literature, circulative designates of or relating to circulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circulatory]] | adjective | **1.** Of or relating to circulation.<br>**2.** Relating to circulatory system or to circulation of the blood. | *"In academic literature, circulatory designates of or relating to circulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circum]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin circ within the domain of Turning.<br>**2.** A technical or specialized form exhibiting the properties of circ in systematic terminology. | *"In academic literature, circum designates pertaining to, derived from, or characteristic of latin circ within the domain of turning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumambulate]] | verb | **1.** Walk around something. | *"For example, among the Beni-Snous the women light a fire in an oven, throw perfumes into it, and circumambulate a tank, which they also incense after a fashion."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[circumboreal]] | adjective | **1.** Comprising or throughout far northern regions. | *"In academic literature, circumboreal designates comprising or throughout far northern regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumcise]] | verb | **1.** Cut the skin over the clitoris.<br>**2.** Cut the foreskin off male babies or teenage boys. | *"To this day a Hottentot priest never uses an iron knife, but always a sharp splint of quartz, in sacrificing an animal or circumcising a lad."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[circumcision]] | noun | **1.** (roman catholic church and anglican church) feast day celebrating the circumcision of jesus; celebrated on january 1st.<br>**2.** The act of circumcising performed on males eight days after birth as a jewish and muslim religious rite. | *"The legend adds that by command of his god he was the first to introduce circumcision to be practised among his descendants."* — Classic Author, *Hawaiian folk tales* |
| [[circumduction]] | noun | **1.** A circular movement of a limb or eye. | *"In academic literature, circumduction designates a circular movement of a limb or eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumference]] | noun | **1.** The size of something as given by the distance around it.<br>**2.** The boundary line encompassing an area or object. | *"But if you fondly pass our proffer’d offer, ’Tis not the roundure of your old-fac’d walls Can hide you from our messengers of war, Though all these English, and their discipline Were harbour’d in their rude circumference."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumferent]] | adjective | **1.** Closely encircling. | *"In academic literature, circumferent designates closely encircling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumferential]] | adjective | **1.** Lying around or just outside the edges or outskirts. | *"In academic literature, circumferential designates lying around or just outside the edges or outskirts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumflex]] | noun | **1.** A diacritical mark (^) placed above a vowel in some languages to indicate a special phonetic quality. | *"In academic literature, circumflex designates a diacritical mark (^) placed above a vowel in some languages to indicate a special phonetic quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumfuse]] | verb | **1.** Spread something around something. | *"Glowing, and circumfused in speechless love, Their full divinity inadequate That feeling to express, or to improve, The gods become as mortals, and man's fate Has moments like their brightest! but the weight Of earth recoils upon us;--let it go!"* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[circumlocution]] | noun | **1.** A style that involves indirect ways of expressing things.<br>**2.** An indirect way of expressing something. | *"She had a good honest glance and used no circumlocution."* — George Eliot, *Middlemarch* |
| [[circumlocutious]] | adjective | **1.** Roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic). | *"In academic literature, circumlocutious designates roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumlocutory]] | adjective | **1.** Roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic). | *"In academic literature, circumlocutory designates roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumnavigate]] | verb | **1.** Travel around, either by plane or ship. | *"So that Monsoons, Pampas, Nor-Westers, Harmattans, Trades; any wind but the Levanter and Simoom, might blow Moby Dick into the devious zig-zag world-circle of the Pequod’s circumnavigating wake."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[circumnavigation]] | noun | **1.** Traveling around something (by ship or plane). | *"Harris Coll._ “Here they saw such huge troops of whales, that they were forced to proceed with a great deal of caution for fear they should run their ship upon them.” _Schouten’s Sixth Circumnavigation._ “We set sail from the Elbe, wind N."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[circumpolar]] | adjective | **1.** (of a celestial body) continually visible above the horizon during the entire 360 degrees of daily travel.<br>**2.** Located or found throughout a polar region. | *"He is mostly found in the circumpolar seas."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[circumscribe]] | verb | **1.** Draw a line around.<br>**2.** Restrict or confine,. | *"The dreariness and desolation of the landscape, the short gloomy days and darksome nights, while they circumscribe our wanderings, shut in our feelings also from rambling abroad, and make us more keenly disposed for the pleasure of the social circle."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[circumscribed]] | verb | **1.** Draw a line around.<br>**2.** Restrict or confine,. | *"The good Andronicus, Patron of virtue, Rome’s best champion, Successful in the battles that he fights, With honour and with fortune is returned From where he circumscribed with his sword And brought to yoke the enemies of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumscription]] | noun | **1.** The act of circumscribing. | *"For know, Iago, But that I love the gentle Desdemona, I would not my unhoused free condition Put into circumscription and confine For the sea’s worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumspect]] | adjective | **1.** Heedful of potential consequences. | *"Let not his smoothing words Bewitch your hearts; be wise and circumspect."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumspection]] | noun | **1.** Knowing how to avoid embarrassment or distress.<br>**2.** The trait of being circumspect and prudent. | *"His outlook upon time was as a transient flash of the eye now and then: that projection of consciousness into days gone by and to come, which makes the past a synonym for the pathetic and the future a word for circumspection, was foreign to Troy."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[circumspectly]] | adverb | **1.** In a cagey manner. | *"The dairyman himself had been lending a hand; but Mr Crick, as well as his wife, seemed latterly to have acquired a suspicion of mutual interest between these two; though they walked so circumspectly that suspicion was but of the faintest."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[circumstance]] | noun | **1.** A condition that accompanies or influences some event or activity.<br>**2.** The set of facts or circumstances that surround a situation or event. | *"Signior Antipholus, I wonder much That you would put me to this shame and trouble, And not without some scandal to yourself, With circumstance and oaths so to deny This chain, which now you wear so openly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstances]] | noun | **1.** Your overall circumstances or condition in life (including everything that happens to you).<br>**2.** A person's financial situation (good or bad). | *"Sir, my circumstances, Being so near the truth as I will make them, Must first induce you to believe; whose strength I will confirm with oath; which I doubt not You’ll give me leave to spare when you shall find You need it not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstantial]] | adjective | **1.** Fully detailed and specific about particulars. | *"This is called the “countercheck quarrelsome”, and so, to the “lie circumstantial”, and the “lie direct”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstantially]] | adverb | **1.** According to circumstances.<br>**2.** Insofar as the circumstances are concerned. | *"Not absolutely proved, perhaps, but it was proved circumstantially."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[circumstantiate]] | verb | **1.** Give circumstantial evidence for. | *"In academic literature, circumstantiate designates give circumstantial evidence for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumvallate]] | verb | **1.** Surround with or as if with a rampart or other fortification. | *"In academic literature, circumvallate designates surround with or as if with a rampart or other fortification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumvent]] | verb | **1.** Surround so as to force to give up.<br>**2.** Beat through cleverness and wit. | *"This might be the pate of a politician which this ass now o’er-offices, one that would circumvent God, might it not?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumvention]] | noun | **1.** The act of evading by going around. | *"What ever have been thought on in this state That could be brought to bodily act ere Rome Had circumvention? ’Tis not four days gone Since I heard thence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumvolute]] | verb | **1.** Wind or turn in volutions, especially in an inward spiral, as of snail. | *"In academic literature, circumvolute designates wind or turn in volutions, especially in an inward spiral, as of snail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumvolution]] | noun | **1.** The act of turning or winding or folding around a central axis. | *"Tell me, then, for you can, in what periphrasis of language, in what circumvolution of phrase, I shall envelope, yet not conceal, the plain story."* — Robert Burns, *The Letters of Robert Burns* |
| [[circumvolve]] | verb | **1.** Cause to turn on an axis or center. | *"In academic literature, circumvolve designates cause to turn on an axis or center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circus]] | noun | **1.** A travelling company of entertainers; including trained animals.<br>**2.** A performance given by a traveling company of acrobats, clowns, and trained animals. | *"At this time—the July preceding the September in which we find at Greenhill Fair—he fell in with a travelling circus which was performing in the outskirts of a northern town."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[encircle]] | verb | **1.** Form a circle around.<br>**2.** Bind with something round or circular. | *"Then let them all encircle him about, And fairy-like, to pinch the unclean knight, And ask him why, that hour of fairy revel, In their so sacred paths he dares to tread In shape profane."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[encircled]] | verb | **1.** Form a circle around.<br>**2.** Bind with something round or circular. | *"When they came, he encircled Ada with one arm in his fatherly way and addressed himself to Richard with a cheerful gravity."* — Charles Dickens, *Bleak House* |
| [[encirclement]] | noun | **1.** A war measure that isolates some area of importance to the enemy. | *"In academic literature, encirclement designates a war measure that isolates some area of importance to the enemy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encircling]] | verb | **1.** Form a circle around.<br>**2.** Bind with something round or circular. | *"Turveydrop, paternally encircling Caddy with his left arm as she sat beside him, and putting his right hand gracefully on his hip."* — Charles Dickens, *Bleak House* |
| [[recirculation]] | noun | **1.** Circulation again. | *"In academic literature, recirculation designates circulation again."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CIRC
  </div>
</div>
