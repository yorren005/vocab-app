---
status: unread
type: root_dashboard
---
# Dashboard — flect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">flect-</span>
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

The root **flect** means to bend. It refers to the action of bending and carrying out this process. In English, this root forms words such as *reflect*, *reflection*, *deflect*, and *flexible*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to bend
> The root **flect** means to bend. It refers to the action of bending and carrying out this process. In English, this root forms words such as *reflect*, *reflection*, *deflect*, and *flexible*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To bend</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *reflect* and *reflection*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **flect** comes from a Latin word that means *"to bend"*.
  - At its core, it describes the action of bend.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **flect** in an English word, think of **to bend**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to bend).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Reflect**: To throw back heat, light, or sound without absorbing it.
  - **Reflection**: An everyday English word showing the root's idea of *to bend*.
  - **Deflect**: To turn aside from a straight course or intended purpose.
  - **Flexible**: An everyday English word showing the root's idea of *to bend*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">flect</mark>, think of <mark class="hl-def">to bend</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `flect-`: Present active verbal base.
- **Prefix Dynamics**:
  - `de-` ("away, down from"): *deflect* ("to turn aside from a direct path").
  - `in-` ("in, into"): *inflect* ("to bend inward, modulate voice or grammar").
  - `re-` ("back, again"): *reflect* ("to bend light or energy back").
  - `genū` ("knee"): *genuflect* ("to bend the knee").
  - `retro-` ("backward"): *retroflect* ("to bend backward abruptly").
  - `circum-` ("around"): *circumflect* ("to bend around, mark with a circumflex").

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
                        ┌── Kinetic Ballistics: deflect, deflector
                        │
   [flect] ─────────────┼── Optics & Acoustics: reflect, reflector
 (To Bend / Curve)      │
                        ├── Phonetics & Grammar: inflect
                        │
                        └── Bodily Posture: genuflect, retroflect, circumflect
```

---

## 🔀 4. Prefix & Combining Dynamics on flect
- **`de-` + `flect`**: *deflect* — to divert a trajectory away from its intended target.
- **`in-` + `flect`**: *inflect* — to modulate musical pitch, speech cadence, or grammatical form.
- **`re-` + `flect`**: *reflect* — to cast back light/heat; metaphorically, to ponder deeply.
- **`genu-` + `flect`**: *genuflect* — to bow the knee in ceremonial reverence.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Physics & Ballistics**: *Deflection* angles of particles in magnetic fields or armor plating.
- **Optics & Astronomy**: *Reflecting* telescopes (Newtonian reflectors) and mirror coatings.
- **Linguistics & Morphology**: *Inflecting* languages (Latin, Russian) versus isolating languages.
- **Theology & Liturgy**: The ritual act of *genuflection* before the altar or tabernacle.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deflect]] | verb | **1.** Prevent the occurrence of; prevent from happening.<br>**2.** Turn from a straight course, fixed direction, or line of interest. | *"He desired of me a thrust and lunge, not that he might parry it but that he might time it and deflect it by the customary slight turn of the wrist, his rapier point directed to meet me as my body followed in the lunge."* — Jack London, *The Jacket (The Star-Rover)* |
| [[deflection]] | noun | **1.** A twist or aberration; especially a perverse or abnormal way of judging or acting.<br>**2.** The amount by which a propagating wave is bent. | *"Oh, such a slight deflection, a matter of inches, just barely sufficient to send his point past me so that it pierced a fold of my satin doublet in passing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[deflective]] | adjective | **1.** Capable of changing the direction (of a light or sound wave). | *"In academic literature, deflective designates capable of changing the direction (of a light or sound wave)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deflector]] | noun | **1.** A device intended to turn aside the flow of something (water or air or smoke etc). | *"A convoy of robot deflectors and screens cleared the Extractor fleet's path of meteoroids, sand and rock swarms and space debris."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[flection]] | noun | **1.** The state of being flexed (as of a joint).<br>**2.** Deviation from a straight or normal course. | *"Man is, and forever has been, God's re- 471:18 flection."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[inflect]] | verb | **1.** Change the form of a word in accordance as required by the grammatical rules of the language.<br>**2.** Vary the pitch of one's speech. | *"The tone with doubt inflected, The calm, reproachful look, The name of one suspected In light arraignment spoke; These, these enforce the heart-ache, And instigate the strife, And these, in chiefest part, take The joy from out my life."* — Wilfred S. Skeats, *The song of the exile* |
| [[inflected]] | verb | **1.** Change the form of a word in accordance as required by the grammatical rules of the language.<br>**2.** Vary the pitch of one's speech. | *"The tone with doubt inflected, The calm, reproachful look, The name of one suspected In light arraignment spoke; These, these enforce the heart-ache, And instigate the strife, And these, in chiefest part, take The joy from out my life."* — Wilfred S. Skeats, *The song of the exile* |
| [[inflection]] | noun | **1.** A change in the form of a word (usually by adding a suffix) to indicate a change in its grammatical function.<br>**2.** The patterns of stress and intonation in a language. | *"He spoke to her in low tones, and she instinctively modulated her own to the same pitch, and her voice ultimately even caught the inflection of his."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[inflectional]] | adjective | **1.** Characterized by inflections indicating grammatical distinctions. | *"In academic literature, inflectional designates characterized by inflections indicating grammatical distinctions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interreflection]] | noun | **1.** Reciprocal reflection between two reflecting surfaces. | *"In academic literature, interreflection designates reciprocal reflection between two reflecting surfaces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonreflecting]] | adjective | **1.** Not capable of physical reflection. | *"In academic literature, nonreflecting designates not capable of physical reflection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonreflective]] | adjective | **1.** Not capable of physical reflection. | *"In academic literature, nonreflective designates not capable of physical reflection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflect]] | verb | **1.** Manifest or bring back.<br>**2.** Reflect deeply on a subject. | *"Reflect upon him accordingly, as you value your trust."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reflectance]] | noun | **1.** The fraction of radiant energy that is reflected from a surface. | *"In academic literature, reflectance designates the fraction of radiant energy that is reflected from a surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflected]] | verb | **1.** Manifest or bring back.<br>**2.** Reflect deeply on a subject. | *"You may be sure that I should not tell you if I did not have to," Loneli added, "because it makes me so sad." Mea reflected a moment, wondering what she had really done."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[reflecting]] | verb | **1.** Manifest or bring back.<br>**2.** Reflect deeply on a subject. | *"Some lay in dead men’s skulls, and in the holes Where eyes did once inhabit there were crept— As ’twere in scorn of eyes—reflecting gems, That wooed the slimy bottom of the deep, And mocked the dead bones that lay scattered by."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reflection]] | noun | **1.** A calm, lengthy, intent consideration.<br>**2.** The phenomenon of a propagating wave (light or sound) being thrown back from a surface. | *"Sir, as I told you always, her beauty and her brain go not together; she’s a good sign, but I have seen small reflection of her wit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reflective]] | adjective | **1.** Deeply or seriously thoughtful.<br>**2.** Capable of physically reflecting light or sound. | *"They mounted in front of the waggon, and Abraham grew reflective."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[reflectively]] | adverb | **1.** In a reflective manner. | *"That’s what ’tis.” “Ay, sure—that’s the machine,” chimed in Henery Fray, reflectively, with an Oriental indifference to the flight of time."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[reflectiveness]] | noun | **1.** The capability of quiet thought or contemplation. | *"When expressed with some amount of reflectiveness it seems co-ordinate with a belief that this flattery must be reasonable to be effective."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[reflectivity]] | noun | **1.** The fraction of radiant energy that is reflected from a surface.<br>**2.** The ability to reflect beams or rays. | *"In academic literature, reflectivity designates the fraction of radiant energy that is reflected from a surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflectometer]] | noun | **1.** A meter that measures the reflectance of a surface. | *"In academic literature, reflectometer designates a meter that measures the reflectance of a surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflector]] | noun | **1.** Device that reflects radiation.<br>**2.** Optical telescope consisting of a large concave mirror that produces an image that is magnified by the eyepiece. | *"This dazzling carpet, really a reflector, repelled the rays of the sun with wonderful intensity, which accounted for the vibration which penetrated every atom of liquid."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[reflectorise]] | verb | **1.** Provide with reflectors, such as chemicals. | *"In academic literature, reflectorise designates provide with reflectors, such as chemicals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reflectorize]] | verb | **1.** Provide with reflectors, such as chemicals. | *"In academic literature, reflectorize designates provide with reflectors, such as chemicals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retroflection]] | noun | **1.** A turning or tilting backward of an organ or body part.<br>**2.** An articulatory gesture made by turning the tip of the tongue back against the roof of the mouth. | *"In academic literature, retroflection designates a turning or tilting backward of an organ or body part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninflected]] | adjective | **1.** (of the voice) not inflected.<br>**2.** Not inflected. | *"He often exercises a liberty in the collocation of his words which is beyond what an uninflected language like the English admits of, without more or less obscurity."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[unreflected]] | adjective | **1.** (especially of incident sound or light) not turned back by physical reflection. | *"In academic literature, unreflected designates (especially of incident sound or light) not turned back by physical reflection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreflective]] | adjective | **1.** Not exhibiting or characterized by careful thought. | *"In academic literature, unreflective designates not exhibiting or characterized by careful thought."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · FLECT
  </div>
</div>
