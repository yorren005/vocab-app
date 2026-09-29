---
status: unread
type: root_dashboard
---
# Dashboard — rot
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rot-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wheel”</span>
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

The root **rot** means wheel. It refers to a circular wheel, spinning disc, or revolving motion. In English, this root forms words such as *rotate*, *rotation*, *rotary*, and *rotor*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wheel
> The root **rot** means wheel. It refers to a circular wheel, spinning disc, or revolving motion. In English, this root forms words such as *rotate*, *rotation*, *rotary*, and *rotor*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Wheel</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *rotate* and *rotation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rot** comes from a Latin word that means *"wheel"*.
  - At its core, it describes wheel.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **rot** in an English word, think of **turning, revolving, and changing direction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of wheel.
  - **Mental & Social**: How people experience, organize, or communicate about wheel.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Rotate**: To turn or cause to turn around an axis or center.
  - **Rotation**: The action of turning around an axis or center.
  - **Rotary**: Operating by means of rotation, especially of a machine part or engine.
  - **Rotor**: The rotating member of an electrical machine, turbine, pump, or helicopter.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rot</mark>, think of <mark class="hl-def">turning, revolving, and changing direction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `rot-` (< Latin *rota*): Nominal base ("wheel").
  - `rotat-` (< Latin *rotātus*, past participle of *rotāre*): Verbal and mechanical base.
  - `rotund-` (< Latin *rotundus*): Adjectival base ("wheel-shaped, round").
- **Suffixal Formations**:
  - `-ary`: *rotary* ("operating by rotation").
  - `-or`: *rotor* ("revolving part of an electric motor or helicopter").
  - `-unda`: *rotunda* ("a large round room or building").
  - `-ette` (French diminutive): *roulette* ("little wheel").
  - `-ifer` ("bearing"): *rotifer* ("wheel-bearing microscopic organism").

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
                      ┌── Mechanical & Kinematic: rotate, rotation, rotary, rotor, rotational
                      │
   [rot] ─────────────┼── Spherical Fullness & Architecture: rotund, rotunda, rotundity
 (Wheel / Spin)       │
                      └── Games, Biology & Everyday Form: roulette, rotifer, round, rounded
```

---

## 🔀 4. Prefix & Combining Dynamics on rot
- **`rot-` + `-ary`**: *rotary* — turning on an axis (e.g., rotary phone, rotary engine).
- **`rot-` + `-or`**: *rotor* — the primary rotating assembly in machinery.
- **`rot-` + `und-`**: *rotund* — plump, spherical, resonant.
- **`rot-` + `-ifer`**: *rotifer* — microscopic aquatic animal possessing wheel-like ciliated crowns.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Mechanical & Aerospace Engineering**: *Rotary* engines (Wankel), helicopter *rotors*, turbine *rotations*.
- **Classical Architecture**: The Roman Pantheon, Capitol *rotundas*, domed basilicas.
- **Microbiology**: *Rotifera* (ciliated microscopic pseudocoelomates).
- **Oratory & Rhetoric**: *Rotundity* of voice and cadence (*ore rotundo*).
- **Gaming & Probability**: The Monte Carlo *roulette* wheel.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[corot]] | noun | **1.** French painter of italian landscapes (1796-1875). | *"In academic literature, corot designates french painter of italian landscapes (1796-1875)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erotic]] | noun | **1.** An erotic person.<br>**2.** Giving sexual pleasure; sexually arousing. | *"The cabala of this erotic philosophy seemed to consist of the subtlest meanings expressed in misleading ways."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[erotica]] | noun | **1.** Creative activity (writing or pictures or films etc.) of no literary or artistic value other than to stimulate sexual desire. | *"In academic literature, erotica designates creative activity (writing or pictures or films etc.) of no literary or artistic value other than to stimulate sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erotically]] | adverb | **1.** In an erotic manner. | *"In academic literature, erotically designates in an erotic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eroticism]] | noun | **1.** A state of anticipation of sexuality.<br>**2.** The arousal of feelings of sexual desire. | *"This has ever been the fate of energy in security; it takes to art and to eroticism, and then come languor and decay."* — H. G. Wells, *The Time Machine* |
| [[eroticize]] | verb | **1.** Give erotic character to or make more interesting. | *"In academic literature, eroticize designates give erotic character to or make more interesting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erotism]] | noun | **1.** A state of anticipation of sexuality.<br>**2.** The arousal of feelings of sexual desire. | *"In academic literature, erotism designates a state of anticipation of sexuality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rot]] | noun | **1.** A state of decay usually accompanied by an offensive odor.<br>**2.** (biology) the process of decay caused by bacterial or fungal action. | *"This common body, Like to a vagabond flag upon the stream, Goes to and back, lackeying the varying tide, To rot itself with motion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rota]] | noun | **1.** (roman catholic church) the supreme ecclesiastical tribunal for cases appealed to the holy see from diocesan courts.<br>**2.** A roster of names showing the order in which people should perform certain duties. | *"Sed quod etiam rota vertatur hinc esse putant quia in eum circulum tunc Sol descenderit ultra quem progredi nequit, a quo cogitur paulatim descendere_." The substance of the passage is repeated in other words by G."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[rotarian]] | noun | **1.** A member of a rotary club. | *"In academic literature, rotarian designates a member of a rotary club."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotary]] | noun | **1.** A road junction at which traffic streams circularly around a central island.<br>**2.** Electrical converter consisting of a synchronous machine that converts alternating to direct current or vice versa. | *"In the middle of one of the longest sentences, he stopped the rotary motion of the snuffbox, raised his head, and with inimical politeness lurking in the corners of his thin lips interrupted Weyrother, wishing to say something."* — graf Leo Tolstoy, *War and Peace* |
| [[rotatable]] | adjective | **1.** Capable of being rotated. | *"In academic literature, rotatable designates capable of being rotated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotate]] | verb | **1.** Turn on or around an axis or a center.<br>**2.** Exchange on a regular basis. | *"We'll push to rotate the cover counter-clockwise; it'll take both of us to work it loose." "Why not cut out the entire plug?" "Too much time."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[rotated]] | verb | **1.** Turn on or around an axis or a center.<br>**2.** Exchange on a regular basis. | *"Climbing in and closing up, he stepped under a helmet rack, drew it down, rotated mating surfaces, closed and locked the seals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[rotation]] | noun | **1.** The act of rotating as if on an axis.<br>**2.** (mathematics) a transformation in which the coordinate axes are rotated by a fixed angle about the origin. | *"Now with that dam I could grow three crops a year, observing due rotation, and be able to turn under a wealth of green manure. . . ."* — Jack London, *The Jacket (The Star-Rover)* |
| [[rotational]] | adjective | **1.** Of or pertaining to rotation. | *"In academic literature, rotational designates of or pertaining to rotation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotationally]] | adverb | **1.** In a rotational manner. | *"In academic literature, rotationally designates in a rotational manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotatory]] | adjective | **1.** Of or relating to or characteristic or causing an axial or orbital turn. | *"With a shock he became aware of me, and was severely visited as before; but this time his motion was rotatory, and he staggered round and round me with knees more afflicted, and with uplifted hands as if beseeching for mercy."* — Charles Dickens, *Great Expectations* |
| [[rotavirus]] | noun | **1.** The reovirus causing infant enteritis. | *"In academic literature, rotavirus designates the reovirus causing infant enteritis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotc]] | noun | **1.** A training program to prepare college students to be commissioned officers. | *"In academic literature, rotc designates a training program to prepare college students to be commissioned officers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rote]] | noun | **1.** Memorization by repetition. | *"First rehearse your song by rote, To each word a warbling note; Hand in hand, with fairy grace, Will we sing, and bless this place. [_Song and Dance._] OBERON."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rotenone]] | noun | **1.** A white crystalline insecticide that has low toxicity for mammals; is used in home gardens; extracted from the roots of derris and cube. | *"In academic literature, rotenone designates a white crystalline insecticide that has low toxicity for mammals; is used in home gardens; extracted from the roots of derris and cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotifer]] | noun | **1.** Minute aquatic multicellular organisms having a ciliated wheel-like organ for feeding and locomotion; constituents of freshwater plankton. | *"In academic literature, rotifer designates minute aquatic multicellular organisms having a ciliated wheel-like organ for feeding and locomotion; constituents of freshwater plankton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotifera]] | noun | **1.** A phylum including: rotifers. | *"In academic literature, rotifera designates a phylum including: rotifers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotisserie]] | noun | **1.** An oven or broiler equipped with a rotating spit on which meat cooks as it turns.<br>**2.** A restaurant that specializes in roasted and barbecued meats. | *"In academic literature, rotisserie designates an oven or broiler equipped with a rotating spit on which meat cooks as it turns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotl]] | noun | **1.** A unit of weight used in some moslem countries near the mediterranean; varies between one and five pounds. | *"In academic literature, rotl designates a unit of weight used in some moslem countries near the mediterranean; varies between one and five pounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotogravure]] | noun | **1.** Printing by transferring an image from a photogravure plate to a cylinder in a rotary press.<br>**2.** Printed material (text and pictures) produced by an intaglio printing process in a rotary press. | *"In academic literature, rotogravure designates printing by transferring an image from a photogravure plate to a cylinder in a rotary press."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotor]] | noun | **1.** The rotating armature of a motor or generator.<br>**2.** The revolving bar of a distributor. | *"In academic literature, rotor designates the rotating armature of a motor or generator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotted]] | verb | **1.** Break down.<br>**2.** Become physically weaker. | *"The ox hath therefore stretch’d his yoke in vain, The ploughman lost his sweat, and the green corn Hath rotted ere his youth attain’d a beard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rotten]] | adjective | **1.** Very bad.<br>**2.** Damaged by decay; hence unsound and useless. | *"Then if he thrive and I be cast away, The worst was this: my love was my decay. 81 Or I shall live your epitaph to make, Or you survive when I in earth am rotten, From hence your memory death cannot take, Although in me each part will be forgotten."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rottenly]] | adverb | **1.** In a terrible manner. | *"In academic literature, rottenly designates in a terrible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rottenness]] | noun | **1.** In a state of progressive putrefaction.<br>**2.** The quality of rotting and becoming putrid. | *"Thou odoriferous stench, sound rottenness!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rottenstone]] | noun | **1.** A weathered and decomposed siliceous limestone; in powdered form it is used in polishing. | *"In academic literature, rottenstone designates a weathered and decomposed siliceous limestone; in powdered form it is used in polishing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotter]] | noun | **1.** A person who is deemed to be despicable or contemptible. | *"You ought to be ducked in the horsepond, you rotter! _(To the court.)_ Why, look at the man’s private life!"* — James Joyce, *Ulysses* |
| [[rotterdam]] | noun | **1.** The 2nd largest city in the netherlands; located in the western netherlands near the north sea. | *"You go with him?” “No doubt.” “Where?” It had seemed to me, in the many anxious considerations I had given the point, almost indifferent what port we made for,—Hamburg, Rotterdam, Antwerp,—the place signified little, so that he was out of England."* — Charles Dickens, *Great Expectations* |
| [[rotting]] | noun | **1.** (biology) the process of decay caused by bacterial or fungal action.<br>**2.** Break down. | *"Though mean and mighty rotting Together have one dust, yet reverence, That angel of the world, doth make distinction Of place ’tween high and low."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rottweiler]] | noun | **1.** German breed of large vigorous short-haired cattle dogs. | *"In academic literature, rottweiler designates german breed of large vigorous short-haired cattle dogs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotund]] | adjective | **1.** Spherical in shape.<br>**2.** (of sounds) full and rich. | *"Behind the city swept the rotund upland of St Catherine’s Hill; further off, landscape beyond landscape, till the horizon was lost in the radiance of the sun hanging above it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[rotunda]] | noun | **1.** A building having a circular plan and a dome.<br>**2.** A large circular room. | *"White horses with white frontlet plumes came round the Rotunda corner, galloping."* — James Joyce, *Ulysses* |
| [[rotundity]] | noun | **1.** The roundness of a 3-dimensional object.<br>**2.** The fullness of a tone of voice. | *"And thou, all-shaking thunder, Strike flat the thick rotundity o’ the world!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rotundly]] | adverb | **1.** In a sonorous manner. | *"In academic literature, rotundly designates in a sonorous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rotundness]] | noun | **1.** The roundness of a 3-dimensional object. | *"In academic literature, rotundness designates the roundness of a 3-dimensional object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serotine]] | noun | **1.** Common brown bat of europe. | *"In academic literature, serotine designates common brown bat of europe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serotonin]] | noun | **1.** A neurotransmitter involved in e.g. sleep and depression and memory. | *"In academic literature, serotonin designates a neurotransmitter involved in e.g. sleep and depression and memory."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ROT
  </div>
</div>
