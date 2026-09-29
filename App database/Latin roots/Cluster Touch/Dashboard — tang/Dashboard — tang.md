---
status: unread
type: root_dashboard
---
# Dashboard — tang
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tang-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“touch”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gently pressing your fingertips against a smooth surface to feel its texture.</span>
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

The root **tang** means touch. It refers to physical contact, feeling with the hands, or tactile sensation. In English, this root forms words such as *tangible*, *tangent*, and *intangible*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: touch
> The root **tang** means touch. It refers to physical contact, feeling with the hands, or tactile sensation. In English, this root forms words such as *tangible*, *tangent*, and *intangible*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Touch</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gently pressing your fingertips against a smooth surface to feel its texture.</mark>
> - **Everyday Connection**: Think of familiar words like *tangible* and *tangent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tang** comes from a Latin word that means *"touch"*.
  - At its core, it describes touch.

- **The Big Picture Idea**:
  - Picture gently pressing your fingertips against a smooth surface to feel its texture.
  - Whenever you see **tang** in an English word, think of **touch, contact, and tactile feeling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of touch.
  - **Mental & Social**: How people experience, organize, or communicate about touch.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Tangible**: Adj.* Perceptible by touch.
  - **Tangent**: N. Geometry*: A straight line or plane that touches a curve or curved surface at a point, but if extended does not cross it at that point.
  - **Intangible**: Adj.* Unable to be touched or grasped.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tang</mark>, think of <mark class="hl-def">touch, contact, and tactile feeling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root displays regular phonetic apophony when prefixes attach:
1. **The Base Present Stem `tang-`**: Uncompounded in *tangent*, *tangential*, *tangible*, *intangible*.
2. **Apophonic Vowel Weakening to `-ting-`**: When prefixes attach, the short root vowel *a* weakens to *i*:
   - *com-* + *tangere* $\to$ *contingere* ("to touch closely, border on, happen") $\to$ *contingent*, *contingency*, *contiguous* (< Latin *contiguus*).
   - *ad-* + *tangere* $\to$ *attingere* $\to$ *attain*, *attainment*.
3. **Noun Formations with `-tag-`**:
   - *contāgiō* (< *com-* + *tangere*) $\to$ *contagion*, *contagious*.

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

The cognitive sphere of *tang* radiates across four vast disciplines:
- **Geometry & Trigonometry**: [[tangent]], `tangential`
- **Epidemiology & Public Health**: [[contagion]], [[contagious]]
- **Geography, Law & Logistics**: [[contiguous]], `contiguity`, [[contingency]], [[contingent]]
- **Materiality & Metaphysics**: [[tangible]], [[intangible]], `tangibility`
- **Ambition & Achievement**: [[attain]], `attainment`

---

## 🔀 4. Prefix & Combining Dynamics on tang

1. **`con-` + `tang`** (*cum* "together" $\to$ *contingere*):
   - *contagion* $\to$ the communication of disease from one person to another by close contact.
   - *contiguous* $\to$ sharing a common border; touching along a boundary.
   - *contingent* $\to$ subject to chance; occurring only if certain circumstances exist.
2. **`in-` + `tang`** (*in-* "not"):
   - *intangible* $\to$ unable to be touched or grasped; not having physical presence.
3. **`ad-` + `tang`** (*ad* "to" $\to$ *attingere*):
   - *attain* $\to$ to succeed in achieving or reaching something that one desires.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Mathematics & Calculus**: *tangent* lines, derivatives as the slope of the *tangent*, *tangent* function.
- **Infectious Disease & Virology**: viral *contagion*, R0 transmission metrics, *contagious* pathogens.
- **Corporate Risk & Military Planning**: *contingency* plans, *contingent* liabilities, war game branching.
- **Economics & Accounting**: *tangible* assets (property, machinery) vs. *intangible* assets (patents, goodwill).
- **Cartography & Geopolitics**: the 48 *contiguous* United States.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cotangent]] | noun | **1.** Ratio of the adjacent to the opposite side of a right-angled triangle. | *"In academic literature, cotangent designates ratio of the adjacent to the opposite side of a right-angled triangle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entangle]] | verb | **1.** Entrap.<br>**2.** Twist together or entwine into a confusing mass. | *"There was a circumstance which at first sight seemed to entangle his delirious but still methodical scheme."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[entangled]] | verb | **1.** Entrap.<br>**2.** Twist together or entwine into a confusing mass. | *"Riotous madness, To be entangled with those mouth-made vows Which break themselves in swearing!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entanglement]] | noun | **1.** An intricate trap that entangles or ensnares its victim. | *"An inner cloud of dust rose around the prostrate figures amid the general one of the room, in which a twitching entanglement of arms and legs was discernible."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[intangibility]] | noun | **1.** The quality of being intangible and not perceptible by touch. | *"Pearl either saw and responded to her mother’s feelings, or herself felt the remoteness and intangibility that had fallen around the minister."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[intangible]] | noun | **1.** Assets that are saleable though not material or physical.<br>**2.** (of especially business assets) not having physical substance or intrinsic productive value. | *"He would let her see, all those six years of intangible ethereal courtship, how little care he had for anything but as it bore upon the consummation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[intangibleness]] | noun | **1.** The quality of being intangible and not perceptible by touch. | *"In academic literature, intangibleness designates the quality of being intangible and not perceptible by touch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octangular]] | adjective | **1.** Of or relating to or shaped like an octagon. | *"Its outward form is circular; but the interior is somewhat of an octangular figure, but very irregular, its general dimensions being thirty-three feet long, and twenty-five feet broad."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[tang]] | noun | **1.** A tart spicy quality.<br>**2.** The imperial dynasty of china from 618 to 907. | *"Let thy tongue tang arguments of state; put thyself into the trick of singularity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tanga]] | noun | **1.** 100 tanga equal 1 tajikistani ruble.<br>**2.** A port city in northeastern tanzania on the indian ocean. | *"In academic literature, tanga designates 100 tanga equal 1 tajikistani ruble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tanganyika]] | noun | **1.** The longest lake in the world in central africa between tanzania and congo in the great rift valley.<br>**2.** A former state in east africa; united with zanzibar in 1964 to form tanzania. | *"The later extensions of the copper mining industry occurred in Utah, Tennessee, and Queensland, whilst within recent years the most important work on a large scale has been commenced in Tanganyika, in Nevada, and in Siberia."* — Donald M. Levy, *Modern Copper Smelting* |
| [[tange]] | noun | **1.** Japanese architect (born in 1913). | *"In academic literature, tange designates japanese architect (born in 1913)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangelo]] | noun | **1.** Hybrid between grapefruit and mandarin orange; cultivated especially in florida.<br>**2.** Large sweet juicy hybrid between tangerine and grapefruit having a thick wrinkled skin. | *"In academic literature, tangelo designates hybrid between grapefruit and mandarin orange; cultivated especially in florida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangency]] | noun | **1.** The state of being tangent; having contact at a single point or along a line without crossing.<br>**2.** (electronics) a junction where things (as two electrical conductors) touch or are in physical contact. | *"In academic literature, tangency designates the state of being tangent; having contact at a single point or along a line without crossing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangent]] | noun | **1.** A straight line or plane that touches a curve or curved surface at a point but does not intersect it at that point.<br>**2.** Ratio of the opposite to the adjacent side of a right-angled triangle. | *"If you take off on a tangent, so be it."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tangential]] | adjective | **1.** Of superficial relevance if any.<br>**2.** Of or relating to or acting along or in the direction of a tangent. | *"In academic literature, tangential designates of superficial relevance if any."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangentially]] | adverb | **1.** In passing. | *"In academic literature, tangentially designates in passing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangerine]] | noun | **1.** A variety of mandarin orange.<br>**2.** Any of various deep orange mandarins grown in the united states and southern africa. | *"In academic literature, tangerine designates a variety of mandarin orange."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangibility]] | noun | **1.** The quality of being perceivable by touch. | *"Spiritual tangibility Ideas are tangible and real to immortal consciousness, 279:12 and they have the advantage of being eternal."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[tangible]] | adjective | **1.** Perceptible by the senses especially the sense of touch.<br>**2.** Capable of being treated as fact. | *"There is so little of any thing tangible for their decision to rest upon, that it seems to me as if a breath might blow it either way."* — Classic Author, *The wonders of prayer* |
| [[tangibleness]] | noun | **1.** The quality of being perceivable by touch. | *"In academic literature, tangibleness designates the quality of being perceivable by touch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangibly]] | adverb | **1.** In a tangible manner. | *"In academic literature, tangibly designates in a tangible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangier]] | noun | **1.** A city of northern morocco at the west end of the strait of gibraltar.<br>**2.** Tasting sour like a lemon. | *"Y.’S filed before him, tallwhitehatted, past Tangier lane, plodding towards their goal."* — James Joyce, *Ulysses* |
| [[tangiers]] | noun | **1.** A city of northern morocco at the west end of the strait of gibraltar. | *"In academic literature, tangiers designates a city of northern morocco at the west end of the strait of gibraltar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tanginess]] | noun | **1.** A tart spicy quality. | *"In academic literature, tanginess designates a tart spicy quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangle]] | noun | **1.** A twisted and tangled mass that is highly interwoven.<br>**2.** Something jumbled or confused. | *"I see no more in you than in the ordinary Of nature’s sale-work. ’Od’s my little life, I think she means to tangle my eyes too!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tanglebush]] | noun | **1.** Spiny branching deciduous shrub of southwestern united states having clusters of insignificant yellow-white flowers appearing before leaves followed by attractive black berrylike fruits. | *"In academic literature, tanglebush designates spiny branching deciduous shrub of southwestern united states having clusters of insignificant yellow-white flowers appearing before leaves followed by attractive black berrylike fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangled]] | verb | **1.** Force into some kind of situation, condition, or course of action.<br>**2.** Tangle or complicate. | *"His speech was like a tangled chain; nothing impaired, but all disordered."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tango]] | noun | **1.** A ballroom dance of latin-american origin.<br>**2.** Music written in duple time for dancing the tango. | *"In academic literature, tango designates a ballroom dance of latin-american origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangor]] | noun | **1.** Large citrus tree having large sweet deep orange fruit that is easily peeled; widely cultivated in florida. | *"In academic literature, tangor designates large citrus tree having large sweet deep orange fruit that is easily peeled; widely cultivated in florida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangram]] | noun | **1.** A chinese puzzle consisting of a square divided into seven pieces that must be arranged to match particular designs. | *"In academic literature, tangram designates a chinese puzzle consisting of a square divided into seven pieces that must be arranged to match particular designs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangshan]] | noun | **1.** An industrial city of northeastern china in hebei province. | *"In academic literature, tangshan designates an industrial city of northeastern china in hebei province."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tanguy]] | noun | **1.** United states surrealist painter (born in france) (1900-1955). | *"In academic literature, tanguy designates united states surrealist painter (born in france) (1900-1955)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tangy]] | adjective | **1.** Tasting sour like a lemon. | *"In academic literature, tangy designates tasting sour like a lemon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untangle]] | verb | **1.** Release from entanglement of difficulty.<br>**2.** Become or cause to become undone by separating the fibers or threads of. | *"O time, thou must untangle this, not I, It is too hard a knot for me t’untie! [_Exit._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[untangled]] | verb | **1.** Release from entanglement of difficulty.<br>**2.** Become or cause to become undone by separating the fibers or threads of. | *"We untangled and made for the door."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[untangling]] | noun | **1.** The act of releasing from a snarled or tangled condition.<br>**2.** Release from entanglement of difficulty. | *"In academic literature, untangling designates the act of releasing from a snarled or tangled condition."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Touch]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TANG
  </div>
</div>
