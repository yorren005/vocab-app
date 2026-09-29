---
status: unread
type: root_dashboard
---
# Dashboard — spect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">spect-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“looked at or spectacle”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking through clear glass and observing every fine detail in view.</span>
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

The root **spect** means looked at or spectacle. It refers to viewing with the eyes, watching carefully, or observing sights. In English, this root forms words such as *spectator*, *inspect*, *respect*, and *perspective*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: looked at or spectacle
> The root **spect** means looked at or spectacle. It refers to viewing with the eyes, watching carefully, or observing sights. In English, this root forms words such as *spectator*, *inspect*, *respect*, and *perspective*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Looked at or spectacle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking through clear glass and observing every fine detail in view.</mark>
> - **Everyday Connection**: Think of familiar words like *spectator* and *inspect*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **spect** comes from a Latin word that means *"looked at or spectacle"*.
  - At its core, it describes looked at or spectacle.

- **The Big Picture Idea**:
  - Picture looking through clear glass and observing every fine detail in view.
  - Whenever you see **spect** in an English word, think of **seeing clearly and observing details**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of looked at or spectacle.
  - **Mental & Social**: How people experience, organize, or communicate about looked at or spectacle.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Spectator**: A person who watches at a show, athletic game, match, or ceremony.
  - **Inspect**: To look at someone or something closely, typically in order to detect flaws or assess condition.
  - **Respect**: A feeling of deep admiration for someone. 2. To admire deeply.
  - **Perspective**: An everyday English word showing the root's idea of *looked at or spectacle*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">spect</mark>, think of <mark class="hl-def">seeing clearly and observing details</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Frequentative Verb:** *spectate* $\to$ *spectator*, *spectacle*, *spectacular*.
- **Directional Prefix Constellation:**
  - `ad-` + *spectus* $\to$ *aspect* (a particular part or feature; visual look).
  - `circum-` + *spectus* $\to$ *circumspect* (cautious), *circumspection*.
  - `ex-` + *spectāre* $\to$ *expect* (anticipate), *expectant*, *expectation*.
  - `in-` + *spectāre* $\to$ *inspect* (examine closely), *inspection*, *inspector*.
  - `intro-` + *spectāre* $\to$ *introspect* (examine one's thoughts), *introspection*, *introspective*.
  - `pro-` + *spectus* $\to$ *prospect* (outlook), *prospective*, *prospector*, *prospectus*.
  - `re-` + *spectus* $\to$ *respect* (esteem, look back), *respectable*, *respectful*, *disrespect*.
  - `retro-` + *spectus* $\to$ *retrospect* (looking back), *retrospective*, *retrospection*.
  - `sub-` + *spectus* $\to$ *suspect* (look at from underneath with mistrust).
- **Physical Optical Base:**
  - *spectrum* $\to$ *spectral*, *spectroscopy*, *spectrometer*.

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

### 1. Public Viewing, Theatre & Entertainment
- *spectator* (a person who watches at a show, game, or other event).
- *spectacle* (a visually striking performance or display).
- *spectacular* (dramatically thrilling or eye-catching).
- *spectate* (to be a spectator).

### 2. Directional Temporal & Mental Perspectives
- *aspect* (a particular part, feature, or phase of something; facial expression).
- *circumspect* (wary and unwilling to take risks; looking around carefully).
- *expect* (to regard something as likely to happen; await).
- *inspect* (to look at someone or something closely, typically to detect flaws).
- *introspect* (to examine one's own thoughts or feelings).
- *prospect* (the possibility or likelihood of some future event occurring; mental outlook).
- *retrospect* (a survey or review of a past course of events or period of time).

### 3. Social Deference & Ethics
- *respect* (a feeling of deep admiration for someone elicited by their abilities or qualities).
- *suspect* (to have an idea or impression of the existence, presence, or truth of something without certain proof).

### 4. Physics & Optics
- *spectrum* (a band of colors produced by separation of the components of light by their different degrees of refraction; a wide range).

---

## 🔀 4. Prefix & Combining Dynamics on spect

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `in-` + `spect` | Inward probing | Examining deeply for flaws, contraband, or errors | *inspect, inspection, inspector* |
| `circum-` + `spect` | 360-degree caution | Guarded looking around to avoid traps or indiscretions | *circumspect, circumspection* |
| `retro-` + `spect` | Backward temporal view | Surveying past history, memory, or previous events | *retrospect, retrospective* |
| `pro-` + `spect` | Forward temporal view | Scanning the horizon for future opportunities or gold | *prospect, prospective, prospector* |
| `re-` + `spect` | Reverent re-looking | Looking back again with deep deference and honor | *respect, respectable, respectful* |
| `intro-` + `spect` | Internal psychological gaze | Examining the interior architecture of one's own mind | *introspect, introspection* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Physics & Astronomy:** The electromagnetic spectrum, stellar emission spectra, absorption spectroscopy.
- **Safety Engineering & Quality Control:** Nuclear plant inspection, FAA aircraft airworthiness inspection.
- **Cognitive Psychology:** Introspectionism (Wundt), cognitive appraisal of prospective risk.
- **Sports & Entertainment:** Spectator economics, stadium capacity, spectacular halftime choreography.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aspect]] | noun | **1.** A distinct feature or element in a problem.<br>**2.** A characteristic to be considered. | *"And great Pompey Would stand and make his eyes grow in my brow; There would he anchor his aspect, and die With looking on his life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aspectual]] | adjective | **1.** Of or belonging to an aspect (as an aspect of the verb). | *"In academic literature, aspectual designates of or belonging to an aspect (as an aspect of the verb)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumspect]] | adjective | **1.** Heedful of potential consequences. | *"Let not his smoothing words Bewitch your hearts; be wise and circumspect."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumspection]] | noun | **1.** Knowing how to avoid embarrassment or distress.<br>**2.** The trait of being circumspect and prudent. | *"His outlook upon time was as a transient flash of the eye now and then: that projection of consciousness into days gone by and to come, which makes the past a synonym for the pathetic and the future a word for circumspection, was foreign to Troy."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[circumspectly]] | adverb | **1.** In a cagey manner. | *"The dairyman himself had been lending a hand; but Mr Crick, as well as his wife, seemed latterly to have acquired a suspicion of mutual interest between these two; though they walked so circumspectly that suspicion was but of the faintest."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conspectus]] | noun | **1.** An overall summary. | *"In academic literature, conspectus designates an overall summary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disrespect]] | noun | **1.** An expression of lack of respect.<br>**2.** A disrespectful mental attitude. | *"I do not wish to speak with disrespect, M. le Maire.' 'What is it, Jacques, that is said?' I had called him 'thou' not out of contempt, but because, for the moment, he seemed to me as a brother, as one of my friends."* — Mrs. Oliphant, *A Beleaguered City* |
| [[inspect]] | verb | **1.** Look over carefully.<br>**2.** Come to see in an official or professional capacity. | *"Early this morning they had climbed over the castle hedge to inspect the apples on the other side of the hedge."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[inspection]] | noun | **1.** A formal or official examination. | *"So they go out in a loose procession, something after the manner of a straggling funeral, and make their inspection in Mr."* — Charles Dickens, *Bleak House* |
| [[inspector]] | noun | **1.** A high ranking police officer.<br>**2.** An investigator who observes carefully. | *"Bucket, “you’ll excuse anything that may appear to be disagreeable in this, for my name’s Inspector Bucket of the Detective, and I have a duty to perform."* — Charles Dickens, *Bleak House* |
| [[inspectorate]] | noun | **1.** A body of inspectors. | *"In academic literature, inspectorate designates a body of inspectors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inspectorship]] | noun | **1.** The office of inspector. | *"In academic literature, inspectorship designates the office of inspector."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introspect]] | verb | **1.** Reflect on one's own thoughts and feelings. | *"It is introspective, and I want to introspect."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[introspection]] | noun | **1.** The contemplation of your own thoughts and desires and conduct. | *"The fact that this introspection is an inevitable symptom in many mental derangements, hypochondria, melancholia and others, indicates a not very remote relation of Weltschmerz to insanity."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[introspective]] | adjective | **1.** Given to examining own sensory and perceptual experiences. | *"Inward melancholy it was impossible for a man like Oak, introspective far beyond his neighbours, to banish quite, whilst conning the present untoward page of his history."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[introspectiveness]] | noun | **1.** Thoughtfulness about your own situation and feelings. | *"In academic literature, introspectiveness designates thoughtfulness about your own situation and feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irrespective]] | adverb | **1.** In spite of everything; without regard to drawbacks. | *"My denying myself the pleasure of the present agreeable conversation may not be wholly irrespective of your own interests, Mr."* — Charles Dickens, *Bleak House* |
| [[perspective]] | noun | **1.** A way of regarding situations or topics etc.<br>**2.** The appearance of things relative to one another as determined by their distance from the viewer. | *"A natural perspective, that is, and is not!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prospect]] | noun | **1.** The possibility of future success.<br>**2.** Belief about (or mental picture of) the future. | *"Their chiefest prospect murdering basilisks; Their softest touch as smart as lizards’ stings!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prospective]] | adjective | **1.** Of or concerned with or related to the future. | *"It is in some respects more searching than a tax on actual rents, for it reaches the prospective, or speculative, rental. (d) Taxes may be on _expenditure_ (sometimes called taxes on consumption)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prospector]] | noun | **1.** Someone who explores an area for mineral deposits. | *"Morgan, a prospector, who was roaming over the country in search of minerals, happened to be travelling through a small selection of 640 acres owned by a workingman, who just managed to eke out a living on it, the land being very poor."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[prospectus]] | noun | **1.** A formal written offer to sell securities (filed with the sec) that sets forth a plan for a (proposed) business enterprise.<br>**2.** A catalog listing the courses offered by a college or university. | *"The addition of Karlshaven IV to the list of planets under colonization would be made, and Holliday's asking prices for land would be posted with Emigration, together with a prospectus abstracted from the General Galactic Survey."* — Algis Budrys, *Citadel* |
| [[respect]] | noun | **1.** (usually preceded by `in') a detail or point.<br>**2.** The condition of being honored (esteemed or respected or well regarded). | *"In our two loves there is but one respect, Though in our lives a separable spite, Which though it alter not love’s sole effect, Yet doth it steal sweet hours from love’s delight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respectability]] | noun | **1.** Honorableness by virtue of being respectable and having a good reputation. | *"Now, my dear Miss Summerson, if you want common sense, responsibility, and respectability, all united—if you want an exemplary man—Vholes is THE man.” We had not known, we said, that Richard was assisted by any gentleman of that name."* — Charles Dickens, *Bleak House* |
| [[respectable]] | adjective | **1.** Characterized by socially or conventionally acceptable morals.<br>**2.** Deserving of esteem and respect. | *"His family is as old as the hills, and infinitely more respectable."* — Charles Dickens, *Bleak House* |
| [[respectably]] | adverb | **1.** To a tolerably worthy extent.<br>**2.** In a decent and morally reputable manner. | *"Hughes, satisfied with having so respectably settled her young charge, returned to her party."* — Jane Austen, *Northanger Abbey* |
| [[respected]] | verb | **1.** Regard highly; think much of.<br>**2.** Show respect towards. | *"The service of the foot, Being once gangrened, is not then respected For what before it was."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respecter]] | noun | **1.** A person who respects someone or something; usually used in the negative. | *"He was no respecter of persons; he contradicted the richest burghers without hesitation; he took possession of the sacred elbow chair, which time out of mind had been the seat of sovereignty of the illustrious Ramm Rapelye."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[respective]] | adjective | **1.** Considered individually. | *"Good den, Sir Richard!” “God-a-mercy, fellow!” And if his name be George, I’ll call him Peter; For new-made honour doth forget men’s names: ’Tis too respective and too sociable For your conversion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respectively]] | adverb | **1.** In the order given. | *"I dreamt of a silver basin and ewer tonight.—Flaminius, honest Flaminius, you are very respectively welcome, sir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[respects]] | noun | **1.** (often used with `pay') a formal expression of esteem.<br>**2.** (usually preceded by `in') a detail or point. | *"If he shall think it fit A saucy stranger in his court to mart As in a Romish stew, and to expound His beastly mind to us, he hath a court He little cares for, and a daughter who He not respects at all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retrospect]] | noun | **1.** Contemplation of things past.<br>**2.** Look back upon (a period of time, sequence of events); remember. | *"She would have fixed him; she would have made him happy for ever.’ My dearest Fanny, I am giving you, I hope, more pleasure than pain by this retrospect of what might have been—but what never can be now."* — Jane Austen, *Mansfield Park* |
| [[retrospection]] | noun | **1.** Reference to things past.<br>**2.** Memory for experiences that are past. | *"He was roused from the reverie of retrospection and regret produced by it, by some inquiry from Edmund as to his plans for the next day’s hunting; and he found it was as well to be a man of fortune at once with horses and grooms at his command."* — Jane Austen, *Mansfield Park* |
| [[retrospective]] | noun | **1.** An exhibition of a representative selection of an artist's life work.<br>**2.** Concerned with or related to the past. | *"Plymdale’s maternal view was, that Rosamond might possibly now have retrospective glimpses of her own folly; and feeling the advantages to be at present all on the side of her son, was too kind a woman not to behave graciously."* — George Eliot, *Middlemarch* |
| [[retrospectively]] | adverb | **1.** In a manner contemplative of past events. | *"Jaggers nodded his head retrospectively two or three times, and actually drew a sigh."* — Charles Dickens, *Great Expectations* |
| [[spectacle]] | noun | **1.** Something or someone seen (especially a notable or unusual sight).<br>**2.** An elaborate and remarkable display on a lavish scale. | *"Did he not moralize this spectacle?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spectacled]] | adjective | **1.** Wearing, or having the face adorned with, eyeglasses or an eyeglass. | *"All tongues speak of him, and the bleared sights Are spectacled to see him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spectacles]] | noun | **1.** Optical instrument consisting of a frame that holds a pair of lenses for correcting defective vision.<br>**2.** Something or someone seen (especially a notable or unusual sight). | *"I’ll do well yet.—Thou old and true Menenius, Thy tears are salter than a younger man’s And venomous to thine eyes.—My sometime general, I have seen thee stern, and thou hast oft beheld Heart-hard’ning spectacles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spectacular]] | noun | **1.** A lavishly produced performance.<br>**2.** Sensational in appearance or thrilling in effect. | *"I am trying to--" "Polk said last night that he thought it would be much more spectacular for all the good looking women in town to go when we are invited to Mrs."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[spectacularly]] | adverb | **1.** In a spectacular manner. | *"Then only was he permitted to be seen, spectacularly poring over large books, and casting his breeches and gaiters into the general weight of the establishment."* — Charles Dickens, *A Tale of Two Cities* |
| [[spectate]] | verb | **1.** Be a spectator in a sports event. | *"In academic literature, spectate designates be a spectator in a sports event."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectator]] | noun | **1.** A close observer; someone who looks at something (such as an exhibition of some kind).<br>**2.** A woman's pump with medium heel; usually in contrasting colors for toe and heel. | *"Oak suddenly ceased from being a mere spectator by discovering the case to be more serious than he had at first imagined."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[specter]] | noun | **1.** A mental representation of some haunting experience.<br>**2.** A ghostly appearing figure. | *"Was It—the dark form with the chain—a creature of this world, or a specter?"* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[spectinomycin]] | noun | **1.** An antibiotic used to treat gonorrhea. | *"In academic literature, spectinomycin designates an antibiotic used to treat gonorrhea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectral]] | adjective | **1.** Of or relating to a spectrum.<br>**2.** Resembling or characteristic of a phantom. | *"He has a yellow look in the spectral darkness of a candle that has guttered down until the whole length of its wick (still burning) has doubled over and left a tower of winding-sheet above it."* — Charles Dickens, *Bleak House* |
| [[spectre]] | noun | **1.** A ghostly appearing figure.<br>**2.** A mental representation of some haunting experience. | *"The purblind day was feebly struggling with the fog when I opened my eyes to encounter those of a dirty-faced little spectre fixed upon me."* — Charles Dickens, *Bleak House* |
| [[spectrogram]] | noun | **1.** A photographic record of a spectrum. | *"In academic literature, spectrogram designates a photographic record of a spectrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrograph]] | noun | **1.** A spectroscope by which spectra can be photographed.<br>**2.** A photographic record of a spectrum. | *"In academic literature, spectrograph designates a spectroscope by which spectra can be photographed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrographic]] | adjective | **1.** Relating to or employing a spectrograph. | *"In academic literature, spectrographic designates relating to or employing a spectrograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrographically]] | adverb | **1.** By spectrographic means. | *"In academic literature, spectrographically designates by spectrographic means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrometer]] | noun | **1.** Spectroscope for obtaining a mass spectrum by deflecting ions into a thin slit and measuring the ion current with an electrometer. | *"In academic literature, spectrometer designates spectroscope for obtaining a mass spectrum by deflecting ions into a thin slit and measuring the ion current with an electrometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrometric]] | adjective | **1.** Of or relating to or involving spectrometry. | *"In academic literature, spectrometric designates of or relating to or involving spectrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrometry]] | noun | **1.** The use of spectroscopes to analyze spectra. | *"In academic literature, spectrometry designates the use of spectroscopes to analyze spectra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrophotometer]] | noun | **1.** A photometer for comparing two light radiations wavelength by wavelength. | *"In academic literature, spectrophotometer designates a photometer for comparing two light radiations wavelength by wavelength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectroscope]] | noun | **1.** An optical instrument for spectrographic analysis. | *"SPECTROSCOPE (THE), AND ITS WORK."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[spectroscopic]] | adjective | **1.** Of or relating to or involving spectroscopy. | *"In academic literature, spectroscopic designates of or relating to or involving spectroscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectroscopical]] | adjective | **1.** Of or relating to or involving spectroscopy. | *"In academic literature, spectroscopical designates of or relating to or involving spectroscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectroscopy]] | noun | **1.** The use of spectroscopes to analyze spectra. | *"In academic literature, spectroscopy designates the use of spectroscopes to analyze spectra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spectrum]] | noun | **1.** An ordered array of the components of an emission or wave.<br>**2.** A broad range of related objects or values or qualities or ideas or activities. | *"In the solar spectrum, beyond the extreme red and extreme violet rays, are whole series of colours, demonstrable, but imperceptible to gross human vision."* — Francis Thompson, *Shelley: An Essay* |
| [[unrespectability]] | noun | **1.** Dishonorableness by virtue of lacking respectability or a good reputation. | *"In academic literature, unrespectability designates dishonorableness by virtue of lacking respectability or a good reputation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrespectable]] | adjective | **1.** Unworthy of respect. | *"In academic literature, unrespectable designates unworthy of respect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unspectacular]] | adjective | **1.** Not spectacular. | *"Aside from its effects upon the wage-bargain, unionism finds its greatest justification is in its unspectacular fraternal, mutual-benefit, and educational functions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SPECT
  </div>
</div>
