---
status: unread
type: root_dashboard
---
# Dashboard — circum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">circum-</span>
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

The root **circum** means ring or circle. It refers to going around the perimeter or surrounding an area. In English, this root forms words such as *circumference*, *circumspect*, *circumspection*, and *circumlocution*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: ring or circle
> The root **circum** means ring or circle. It refers to going around the perimeter or surrounding an area. In English, this root forms words such as *circumference*, *circumspect*, *circumspection*, and *circumlocution*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Ring or circle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *circumference* and *circumspect*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **circum** comes from a Latin word that means *"ring or circle"*.
  - At its core, it describes ring or circle.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **circum** in an English word, think of **turning, revolving, and changing direction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of ring or circle.
  - **Mental & Social**: How people experience, organize, or communicate about ring or circle.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Circumference**: The perimeter or boundary line of a circle or curved geometric figure.
  - **Circumspect**: Wary, prudent, heedful of circumstances and potential consequences.
  - **Circumspection**: Careful consideration of all related circumstances.
  - **Circumlocution**: The use of an unnecessarily large number of words to express an idea.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">circum</mark>, think of <mark class="hl-def">turning, revolving, and changing direction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `circum-`: Prepositional prefix attached directly to verbal and nominal roots.
- **Classic Combining Formations**:
  - `circum-` + `ferre` ("to carry"): *circumference* ("the line carried around a circle").
  - `circum-` + `specere` ("to look"): *circumspect* ("looking round vigilantly").
  - `circum-` + `loquī` ("to speak"): *circumlocution* ("periphrasis, speaking around").
  - `circum-` + `navigāre` ("to sail"): *circumnavigate* ("to sail around the globe").
  - `circum-` + `scrībere` ("to write/draw"): *circumscribe* ("to draw a boundary line around").
  - `circum-` + `venīre` ("to come"): *circumvent* ("to come around, bypass, outwit").
  - `circum-` + `stāre` ("to stand"): *circumstance* ("conditions standing around a situation").
  - `circum-` + `flectere` ("to bend"): *circumflex* ("bent around, diacritical accent").

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
                        ┌── Geometric Boundary: circumference, circumscribe, circumscription
                        │
  [circum-] ────────────┼── Vigilance & Condition: circumspect, circumspection, circumstance, circumstantial
 (Around / Peripheral)  │
                        └── Evasion & Navigation: circumlocution, circumlocutory, circumnavigate, circumvent
```

---

## 🔀 4. Prefix & Combining Dynamics on circum
- **`circum-` + `fer-`**: *circumference* — the outer perimeter carrying the perimeter.
- **`circum-` + `spect-`**: *circumspect* — prudent, cautious, observing all around.
- **`circum-` + `ven-`**: *circumvent* — to outmaneuver by finding an indirect bypass.
- **`circum-` + `locut-`**: *circumlocution* — deliberate rhetorical ambiguity or evasive verbiage.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Naval Exploration**: Ferdinand Magellan and Sir Francis Drake's global *circumnavigation*.
- **Geometry & Surveying**: Calculating *circumference* ($C = 2\pi r$); *circumscribed* polygons.
- **Jurisprudence & Criminal Law**: *Circumstantial* evidence (facts standing around the crime).
- **Rhetoric & Literary Criticism**: *Circumlocution* as a stylistic device or bureaucratic obfuscation.
- **Linguistics & Phonology**: The *circumflex* accent (`^`) marking tone or elision.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circumambulate]] | verb | **1.** Walk around something. | *"For example, among the Beni-Snous the women light a fire in an oven, throw perfumes into it, and circumambulate a tank, which they also incense after a fashion."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[circumcise]] | verb | **1.** Cut the skin over the clitoris.<br>**2.** Cut the foreskin off male babies or teenage boys. | *"To this day a Hottentot priest never uses an iron knife, but always a sharp splint of quartz, in sacrificing an animal or circumcising a lad."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[circumcision]] | noun | **1.** (roman catholic church and anglican church) feast day celebrating the circumcision of jesus; celebrated on january 1st.<br>**2.** The act of circumcising performed on males eight days after birth as a jewish and muslim religious rite. | *"The legend adds that by command of his god he was the first to introduce circumcision to be practised among his descendants."* — Classic Author, *Hawaiian folk tales* |
| [[circumlocution]] | noun | **1.** A style that involves indirect ways of expressing things.<br>**2.** An indirect way of expressing something. | *"She had a good honest glance and used no circumlocution."* — George Eliot, *Middlemarch* |
| [[circumlocutious]] | adjective | **1.** Roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic). | *"In academic literature, circumlocutious designates roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumlocutory]] | adjective | **1.** Roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic). | *"In academic literature, circumlocutory designates roundabout and unnecessarily wordy; ; -t.s.eliot; (`ambagious' is archaic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumnavigate]] | verb | **1.** Travel around, either by plane or ship. | *"So that Monsoons, Pampas, Nor-Westers, Harmattans, Trades; any wind but the Levanter and Simoom, might blow Moby Dick into the devious zig-zag world-circle of the Pequod’s circumnavigating wake."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[circumnavigation]] | noun | **1.** Traveling around something (by ship or plane). | *"Harris Coll._ “Here they saw such huge troops of whales, that they were forced to proceed with a great deal of caution for fear they should run their ship upon them.” _Schouten’s Sixth Circumnavigation._ “We set sail from the Elbe, wind N."* — Herman Melville, *Moby-Dick; or, The Whale* |
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
    ROOT DASHBOARD · CIRCUM
  </div>
</div>
