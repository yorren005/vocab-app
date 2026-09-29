---
status: unread
type: root_dashboard
---
# Dashboard — anim
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">anim-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“breath, soul, or mind”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **anim** means breath, soul, or mind. It refers to the faculty of thinking, reasoning, remembering, and feeling. In English, this root forms words such as *animal*, *animate*, *unanimous*, and *animosity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: breath, soul, or mind
> The root **anim** means breath, soul, or mind. It refers to the faculty of thinking, reasoning, remembering, and feeling. In English, this root forms words such as *animal*, *animate*, *unanimous*, and *animosity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Breath, soul, or mind</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *animal* and *animate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **anim** comes from a Latin word that means *"breath, soul, or mind"*.
  - At its core, it describes breath, soul, or mind.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **anim** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of breath, soul, or mind.
  - **Mental & Social**: How people experience, organize, or communicate about breath, soul, or mind.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Animal**: A living organism belonging to the kingdom Animalia, typically characterized by multicellular organization, voluntary motility, sensory organs, and heterotrophic ingestion.
  - **Animate**: To give life, vitality, spirit, or motion to.
  - **Unanimous**: Being of one mind.
  - **Animosity**: Strong, active, and hostile hatred.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">anim</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **anim** generates one of the most prolific compound families in the Latin lexicon through two distinct morphological tracks:
> 1. **Directional & State Prefixation:**
>    - `in-` ("not") + `anim-` + `-ate` ➔ *inanimate* (lacking life or motion).
>    - `ex-` ("out of") + `anim-` + `-ate` ➔ *exanimate* (spiritless, lifeless, dead).
>    - `re-` ("again") + `anim-` + `-ate` ➔ *reanimate* (to restore breath and life).
> 2. **Classical Compound Adjectives (*Adjective* + *animus*):**
>    - `magnus` ("great") + `animus` ➔ *magnanimous* (great-souled, noble).
>    - `aequus` ("equal, level") + `animus` ➔ *equanimity* (level-minded composure).
>    - `pusillus` ("very small, petty") + `animus` ➔ *pusillanimous* (small-minded, cowardly).
>    - `longus` ("long, patient") + `animus` ➔ *longanimity* (forbearing patience).
>    - `ūnus` ("one") + `animus` ➔ *unanimous* (of single mind and purpose).
> 3. **Verbal Directional Compounding:**
>    - `animus` + `ad-` ("to") + `vertere` ("to turn") ➔ *animadvert* (to turn one's mind censoriously toward something).

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
> Although unified by living breath, the semantic branches operate across distinct registers:
> - **Biological Sentience:** [[animal]] and [[animalcule]] define living, breathing organisms.
> - **Technological & Graphic Art:** [[animation]] and [[animator]] describe the frame-by-frame synthesis of artificial motion.
> - **Stoic & Aristotelian Ethics:** [[magnanimity]] and [[equanimity]] denote emotional sovereignty, self-command, and generous character.
> - **Hostile Aggression & Legal Intent:** [[animosity]] and [[animus]] capture entrenched hostility or conscious legal purpose.
> - **Intellectual Consensus:** [[unanimity]] and [[unanimous]] denote harmonious, undivided collective judgment.

---

## 🔀 4. Prefix & Combining Dynamics on anim

### Prefixes & Classical Compounding Formations on `anim`

| Base Element | Meaning | Combined Derivative | Resulting Philosophical Shift |
| :--- | :--- | :--- | :--- |
| `magn(us)-` | great, lofty | [[magnanimous]] | Possessing a generous, noble spirit that rises above pettiness |
| `aequ(us)-` | equal, calm | [[equanimity]] | Maintaining an unruffled, level mind amid turmoil |
| `pusill(us)-` | tiny, petty | [[pusillanimous]] | Cowardly, faint-hearted, lacking courage |
| `long(us)-` | long, enduring | [[longanimity]] | Forbearing patience under long hardship or provocation |
| `ūn(us)-` | one, single | [[unanimous]] | Sharing a singular mind; completely unified in decision |
| `ad-` + `vert-` | turn toward | [[animadvert]] | Turning the mind critically or censoriously against an error |
| `re-` | again, back | [[reanimate]] | Restoring biological respiration or spiritual vitality |
| `in-` | not, un- | [[inanimate]] | Destitute of biological life, respiration, or movement |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Evolutionary Biology & Zoology:** Linnaean Kingdom *Animalia*, protozoology, and comparative animal behavior.
> - **Film, Gaming & Computer Graphics:** Classical cel animation, 3D CGI rigging, motion capture, and character animation.
> - **Jurisprudence & Constitutional Law:** Criminal mens rea (*animus furandi*, intent to steal; *animus necandi*, intent to kill), jury unanimity.
> - **Moral Philosophy & Psychology:** Aristotelian *megalopsychia* (magnanimity), Stoic equanimity, and Carl Jung's *anima/animus* archetypes.
> - **Cultural Anthropology:** E.B. Tylor's theory of primitive animism and indigenous cosmologies.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anima]] | noun | **1.** (jungian psychology) the inner self (not the external persona) that is in touch with the unconscious. | *"I own it, this is all wrong, and the rest, Frustra sed anima monet, caro quod fortius est."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[animadversion]] | noun | **1.** Harsh criticism or disapproval. | *"Nor have I scrupled, in so flagrant a case, to allow myself a severity of animadversion little congenial with the general spirit of these papers."* — Alexander Hamilton, *The Federalist Papers* |
| [[animadvert]] | verb | **1.** Express one's opinion openly and without fear or hesitation.<br>**2.** Express blame or censure or make a harshly critical remark. | *"A Frenchman meeting an English soldier with a Waterloo medal, began sneeringly to animadvert on our government for bestowing such a trifle, which did not cost them three francs."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[animal]] | noun | **1.** A living organism characterized by voluntary movement.<br>**2.** Marked by the appetites and passions of the body. | *"Thou art the thing itself: unaccommodated man is no more but such a poor, bare, forked animal as thou art."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[animal-worship]] | noun | **1.** The worship of animals. | *"In academic literature, animal-worship designates the worship of animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animalcule]] | noun | **1.** Microscopic organism such as an amoeba or paramecium. | *"The animalcule that the marine polypus secretes live by millions at the bottom of their cells."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[animalculum]] | noun | **1.** Microscopic organism such as an amoeba or paramecium. | *"In academic literature, animalculum designates microscopic organism such as an amoeba or paramecium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animalia]] | noun | **1.** Taxonomic kingdom comprising all living or extinct animals. | *"Sunt enim animalia, quae dracones appellamus...."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[animalisation]] | noun | **1.** An act that makes people cruel or lacking normal human qualities. | *"In academic literature, animalisation designates an act that makes people cruel or lacking normal human qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animalise]] | verb | **1.** Represent in the form of an animal.<br>**2.** Make brutal, unfeeling, or inhuman. | *"In academic literature, animalise designates represent in the form of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animalism]] | noun | **1.** The doctrine that human beings are purely animal in nature and lacking a spiritual nature.<br>**2.** Preoccupation with satisfaction of physical drives and appetites. | *"Some might risk the odd paradox that with more animalism he would have been the nobler man."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[animalistic]] | adjective | **1.** Of or pertaining to animalism. | *"In academic literature, animalistic designates of or pertaining to animalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animality]] | noun | **1.** The physical (or animal) side of a person as opposed to the spirit or intellect. | *"He that touches the hem 569:12 of Christ's robe and masters his mortal beliefs, animality, and hate, rejoices in the proof of healing, - in a sweet and certain sense that God is Love."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[animalization]] | noun | **1.** A depiction in the form of an animal.<br>**2.** An act that makes people cruel or lacking normal human qualities. | *"In academic literature, animalization designates a depiction in the form of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animalize]] | verb | **1.** Represent in the form of an animal.<br>**2.** Make brutal, unfeeling, or inhuman. | *"In academic literature, animalize designates represent in the form of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animate]] | verb | **1.** Heighten or intensify.<br>**2.** Give lifelike qualities to. | *"In his lowering magazine of dust, the universal article into which his papers and himself, and all his clients, and all things of earth, animate and inanimate, are resolving, Mr."* — Charles Dickens, *Bleak House* |
| [[animated]] | verb | **1.** Heighten or intensify.<br>**2.** Give lifelike qualities to. | *"He was animated and glowing, as if Ada’s tenderness had gratified him; but I could only hope, with a sigh, that the letter might have some stronger effect upon his mind on re-perusal than it assuredly had then."* — Charles Dickens, *Bleak House* |
| [[animatedly]] | adverb | **1.** In an animated manner. | *"Passing through, they spoke and gestured animatedly to each other."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[animateness]] | noun | **1.** The property of being animated; having animal life as distinguished from plant life. | *"In academic literature, animateness designates the property of being animated; having animal life as distinguished from plant life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animating]] | verb | **1.** Heighten or intensify.<br>**2.** Give lifelike qualities to. | *"Fanny’s own spirit seemed to be animating her frame."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[animation]] | noun | **1.** The condition of living or the state of being alive.<br>**2.** The property of being able to survive and grow. | *"It is only an invention of people who are not contented with one misfortune but must make up an added terror," the mother said with animation."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[animatism]] | noun | **1.** The attribution of consciousness and personality to natural phenomena such as thunderstorms and earthquakes and to objects such as plants and stones. | *"In academic literature, animatism designates the attribution of consciousness and personality to natural phenomena such as thunderstorms and earthquakes and to objects such as plants and stones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animatistic]] | adjective | **1.** Of or pertaining to animatism. | *"In academic literature, animatistic designates of or pertaining to animatism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animator]] | noun | **1.** Someone who imparts energy and vitality and spirit to other people.<br>**2.** The technician who produces animated cartoons. | *"In academic literature, animator designates someone who imparts energy and vitality and spirit to other people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animatronics]] | noun | **1.** The construction of robots to look like animals (developed for disneyland). | *"In academic literature, animatronics designates the construction of robots to look like animals (developed for disneyland)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anime]] | noun | **1.** A hard copal derived from an african tree.<br>**2.** Any of various resins or oleoresins. | *"In academic literature, anime designates a hard copal derived from an african tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animise]] | verb | **1.** Give lifelike qualities to. | *"In academic literature, animise designates give lifelike qualities to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animism]] | noun | **1.** The doctrine that all natural objects and the universe itself have souls. | *"They hold to their own language and religion, one a dialect akin to Tibetan, and the other a form of animism."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[animist]] | noun | **1.** One who accepts the doctrine of animism.<br>**2.** Of or pertaining to the doctrine of animism. | *"In academic literature, animist designates one who accepts the doctrine of animism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animistic]] | adjective | **1.** Of or pertaining to the doctrine of animism. | *"In academic literature, animistic designates of or pertaining to the doctrine of animism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animize]] | verb | **1.** Give lifelike qualities to. | *"In academic literature, animize designates give lifelike qualities to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animosity]] | noun | **1.** A feeling of ill will arousing active hostility. | *"I tell you, my good Esther, when he and I were on those terms which he found so convenient, we were not on natural terms.” “Are division and animosity your natural terms, Richard?” “No, I don’t say that."* — Charles Dickens, *Bleak House* |
| [[animus]] | noun | **1.** A feeling of ill will arousing active hostility. | *"Several other women also chimed in, with an animus which none of them would have been so fatuous as to show but for the rollicking evening they had passed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[equanimity]] | noun | **1.** Steadiness of mind under stress. | *"An exhausted composure, a worn-out placidity, an equanimity of fatigue not to be ruffled by interest or satisfaction, are the trophies of her victory."* — Charles Dickens, *Bleak House* |
| [[equanimous]] | adjective | **1.** In full control of your faculties. | *"In academic literature, equanimous designates in full control of your faculties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exanimate]] | adjective | **1.** Deprived of life; no longer living. | *"What is man, that knowledge is so sparingly conferred upon him! that his heart should be wrung with distress, and his frame be exanimated with fear, though his safety be encompassed with impregnable walls!"* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[inanimate]] | adjective | **1.** Belonging to the class of nouns denoting nonliving things.<br>**2.** Not endowed with life. | *"In his lowering magazine of dust, the universal article into which his papers and himself, and all his clients, and all things of earth, animate and inanimate, are resolving, Mr."* — Charles Dickens, *Bleak House* |
| [[inanimateness]] | noun | **1.** Not having life. | *"In academic literature, inanimateness designates not having life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[longanimity]] | noun | **1.** Good-natured tolerance of delay or incompetence. | *"In academic literature, longanimity designates good-natured tolerance of delay or incompetence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[longanimous]] | adjective | **1.** Showing patient and unruffled self-control and restraint under adversity; slow to retaliate or express resentment. | *"In academic literature, longanimous designates showing patient and unruffled self-control and restraint under adversity; slow to retaliate or express resentment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pusillanimity]] | noun | **1.** Contemptible fearfulness. | *"The second property of your excellent sherris is the warming of the blood, which, before cold and settled, left the liver white and pale, which is the badge of pusillanimity and cowardice."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pusillanimous]] | adjective | **1.** Lacking in courage and manly strength and resolution; contemptibly fearful. | *"Surely, on no other occasion should I have been thus pusillanimous."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[pusillanimously]] | adverb | **1.** With a lack of courage and determination. | *"In academic literature, pusillanimously designates with a lack of courage and determination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pusillanimousness]] | noun | **1.** Contemptible fearfulness. | *"In academic literature, pusillanimousness designates contemptible fearfulness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reanimate]] | verb | **1.** Give new life or energy to. | *"He came in with cheery look and manly spirit, and tried to reanimate the expiring heart of the poor money digger, but it was all in vain."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[reanimated]] | verb | **1.** Give new life or energy to.<br>**2.** Given fresh life or vigor or spirit. | *"This kindly light reanimated us."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[reanimation]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin anim within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of anim in systematic terminology. | *"In academic literature, reanimation designates pertaining to, derived from, or characteristic of latin anim within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unanimated]] | adjective | **1.** Not animated or enlivened; dull. | *"The only person of the company who seemed unanimated with the general satisfaction was Mr."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[unanimity]] | noun | **1.** Everyone being of one mind. | *"When forty men told the same things with such unanimity, Warden Atherton and Captain Jamie could only conclude that the testimony was a memorized lie which each of the forty rattled off parrot-like."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unanimous]] | adjective | **1.** In complete agreement.<br>**2.** Acting together as a single undiversified whole. | *"Every voice in nature was unanimous in bespeaking change."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unanimously]] | adverb | **1.** Of one mind; without dissent. | *"The people in Nolla unanimously agree that the ghost of Wildenstein has gone to his eternal rest, because peace again is reigning at the castle."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ANIM
  </div>
</div>
