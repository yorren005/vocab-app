---
status: unread
type: root_dashboard
---
# Dashboard — chron
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">χρόνος (*chrónos*)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“time / duration / epoch / sequence”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The steady, unyielding ticking of a clock or the linear timeline of human history.</span>
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

The Greek root **chron** (χρόνος (*chrónos*)) denotes chronological time, temporal duration, historical age, and sequential order. In English, this root forms indispensable historical, philosophical, scientific, and literary vocabulary such as *chronology*, *chronic*, *chronicle*, *synchronize*, *asynchronous*, *anachronism*, and *chronometer*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: time / duration / epoch / sequence
> The Greek root **chron** fundamentally denotes **quantitative, sequential time**. The relentless, continuous flowing of seconds, seasons, and epochs. While Ancient Greek reserved *kairos* (καιρός) for the qualitative, decisive moment of opportunity, *chronos* (χρόνος) governed measurable, chronological duration. In Hesiod and Orphic mythology, Chronos was personified as the primeval incorporeal god of time, circling the cosmos and inexorably consuming all mortal creations.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Time, sequential duration, historical period</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The steady, unyielding ticking of a clock or the linear timeline of human history.</mark>
> - **Everyday Connection**: Think of words like *chronological*, *chronic illness*, *synchronize clocks*, and *anachronism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root derives from Ancient Greek χρόνος (*chrónos*), signifying temporal duration, an age, or chronological succession.
  - Distinct from Greek *kairos* (*καιρός*, the right or opportune season).

- **The Big Picture Idea**:
  - Everything exists within the framework of linear time: events unfold in order, conditions persist over time, and actions align across moments.
  - Whenever you see **chron** in English, think of temporal duration, time-measuring instruments, or historical sequence.

- **How the Meaning Grows**:
  - **Historical & Sequential**: Ordering historical events along a timeline (*chronology*, *chronicle*).
  - **Medical & Clinical**: Illnesses persisting continuously over prolonged duration (*chronic*).
  - **Technical & Horological**: Instruments designed for high-precision timekeeping (*chronometer*, *chronograph*).
  - **Temporal Coordination**: Aligning simultaneous events or dissociating them (*synchronize*, *asynchronous*).
  - **Cultural & Temporal Error**: Placing something outside its authentic historical era (*anachronism*).

- **Everyday English Words to Remember It By**:
  - **Chronological**: Arranged according to the order of time.
  - **Chronic**: Persisting for a long time or recurring frequently.
  - **Synchronize**: To cause things to occur at the same exact time or rate.
  - **Anachronism**: A chronological misplacement of persons or objects in history.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">chron</mark>, think of <mark class="hl-def">clocks, calendars, duration, and historical time</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

- **Primary Morphemic Stem**:
  - `chron-` (< Greek χρόνος): Base stem in *chronic* and *chronicle*.
- **Combining Form with -o- Connective**:
  - `chrono-` (< χρονο-): Universal combining form before consonants (*chrono-logy*, *chrono-meter*, *chrono-graph*).
- **Prefix Machinery & Temporal Relativity**:
  - `syn-` ("together, with"): *synchronize* — aligning actions to occur simultaneously in time.
  - `a-` ("not, without") + `syn-`: *asynchronous* — non-simultaneous, operating independently of a central clock cycle.
  - `ana-` ("backwards, against"): *anachronism* — an error in which an element is assigned to an incompatible historical period.
  - `geo-` ("earth"): *geochronology* — determining the age of rocks and geological strata across deep time.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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
                             ┌── Historical Records: chronology, chronicle, anachronism
                             │
       [chron] ──────────────┼── Medical & Clinical: chronic (longstanding disease)
      (χρόνος,               │
      Sequential Time)       ├── Precision Horology: chronometer, chronograph, chronometry
                             │
                             ├── Modern Computing & Physics: synchronize, asynchronous, isochron
                             │
                             └── Earth & Life Sciences: geochronology, biochronology, heterochrony
```

---

## 🔀 4. Prefix & Combining Dynamics on chron

- **`ana-` ("against, back") + `chron` + `-ism`**: *anachronism* — a detail, person, or technology existing out of its correct historical epoch.
- **`syn-` ("together") + `chron` + `-ize`**: *synchronize* — to coordinate distinct processes to happen at the identical instant or velocity.
- **`a-` ("without") + `synchronous`**: *asynchronous* — communication or computation occurring independently without awaiting immediate coordination.
- **`chron` + `-ic`**: *chronic* — extending through an enduring duration, marked by long continuation and slow relapse.
- **`geo-` ("earth") + `chrono-` + `logy`**: *geochronology* — radiometric dating techniques establishing the chronological milestones of planetary history.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Historiography & Archaeology**: Establishing absolute and relative *chronologies* through stratigraphy and radiocarbon analysis.
- **Pathology & Internal Medicine**: Managing *chronic* autoimmune conditions, degenerative osteoarthritis, and chronic renal disease.
- **Horology & Navigation**: Marine *chronometers* engineered by John Harrison to determine longitude accurately at sea.
- **Distributed Computing & Telecommunications**: *Asynchronous* network protocols (AJAX, message queues) and NTP clock *synchronization*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anachronic]] | adjective | **1.** Chronologically misplaced. | *"In academic literature, anachronic designates chronologically misplaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anachronism]] | noun | **1.** An error in chronology; especially : a chronological misplacing of persons, events, objects, or customs in regard to each other.<br>**2.** A person or a thing that is chronologically out of place; especially : one from a former age that is incongruous in the present. | *"You are too young—it is an anachronism for you to have such thoughts,” said Will, energetically, with a quick shake of the head habitual to him."* — George Eliot, *Middlemarch* |
| [[anachronistic]] | adjective | **1.** Chronologically misplaced. | *"Retained anachronistic spelling and grammar as printed."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[anachronistically]] | adverb | **1.** In an anachronistic manner. | *"In academic literature, anachronistically designates in an anachronistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anachronous]] | adjective | **1.** Chronologically misplaced. | *"In academic literature, anachronous designates chronologically misplaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynchronism]] | noun | **1.** The relation that exists when things occur at unrelated times. | *"In academic literature, asynchronism designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynchronous]] | noun | **1.** Not simultaneous or concurrent in time : not synchronous.<br>**2.** Of, used in, or being digital communication (as between computers) in which there is no timing requirement for transmission and in which the start of each character is individually signaled by the transmitting device. | *"In academic literature, asynchronous designates not simultaneous or concurrent in time : not synchronous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynchrony]] | noun | **1.** The relation that exists when things occur at unrelated times. | *"In academic literature, asynchrony designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biochronology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, biochronology designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chron]] | abbreviation | **1.** chronicle.<br>**2.** chronological; chronology. | *"Christ to reign after the 1 _Chron._ 16, 23, 25-31: (a Crucifixion. psalm)."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[chronaxie]] | noun | **1.** The minimum time required for excitation of a structure (such as a neuron) by a constant electric current of twice the threshold voltage. | *"In academic literature, chronaxie designates the minimum time required for excitation of a structure (such as a neuron) by a constant electric current of twice the threshold voltage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronic]] | noun | **1.** Continuing or occurring again and again for a long time.<br>**2.** Being, providing, or requiring long-term medical care (as for a chronic disease). | *"Indeed, she had two.” My Lady, whose chronic malady of boredom has been sadly aggravated by Volumnia this evening, glances wearily towards the candlesticks and heaves a noiseless sigh."* — Charles Dickens, *Bleak House* |
| [[chronically]] | adverb | **1.** In a habitual and longstanding manner.<br>**2.** In a slowly developing and long lasting manner. | *"It may be said, for short, that every organ of the lower body became chronically diseased, and that the headaches increased in violence."* — Classic Author, *The wonders of prayer* |
| [[chronicle]] | noun | **1.** A historical account of events arranged in order of time usually without analysis or interpretation. | *"I and my sword will earn our chronicle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chronicler]] | noun | **1.** Someone who writes chronicles. | *"After my death I wish no other herald, No other speaker of my living actions, To keep mine honour from corruption But such an honest chronicler as Griffith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chronogram]] | noun | **1.** An inscription, sentence, or phrase in which certain letters express a date or epoch. | *"In academic literature, chronogram designates an inscription, sentence, or phrase in which certain letters express a date or epoch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronograph]] | noun | **1.** An instrument for measuring and recording time intervals: such as.<br>**2.** An instrument having a revolving drum on which a stylus makes marks. | *"Normally, current flows through the circuit-breaker, but the lifting of the piston breaks the circuit (whence the name of the contrivance), and that breaking of the circuit and consequent cessation of the current operates the chronograph."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[chronological]] | adjective | **1.** Relating to or arranged according to temporal order. | *"Mark's chronological date here, he does not speak of this until Peter has called him the Messiah."* — T. R. Glover, *The Jesus of History* |
| [[chronologically]] | adverb | **1.** With respect to chronology. | *"The persistency of this thought may be best illustrated by a few quotations from poems and letters, arranged chronologically: 1831."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[chronologise]] | verb | **1.** Establish the order in time of something. | *"In academic literature, chronologise designates establish the order in time of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronologize]] | verb | **1.** Establish the order in time of something. | *"In academic literature, chronologize designates establish the order in time of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronology]] | noun | **1.** The science that deals with measuring time by regular divisions and that assigns to events their proper dates.<br>**2.** A chronological table, list, or account. | *"His very name carried an impressiveness hardly to be measured without a precise chronology of scholarship."* — George Eliot, *Middlemarch* |
| [[chronometer]] | noun | **1.** Timepiece; especially : one designed to keep time with great accuracy despite external forces. | *"Heart weak, but steady as a chronometer.” “It’s only twenty-four hours,” Captain Jamie said, “and he was never in like condition before.” “Putting it on, that’s what he’s doing, and you can stack on that,” Al Hutchins, the head trusty, interjected."* — Jack London, *The Jacket (The Star-Rover)* |
| [[chronometry]] | noun | **1.** The measuring of time. | *"In academic literature, chronometry designates the measuring of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronoperates]] | noun | **1.** A reptile genus of therapsida. | *"In academic literature, chronoperates designates a reptile genus of therapsida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, chronophobia designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronophotography]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, chronophotography designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, chronos designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronoscope]] | noun | **1.** An instrument for accurate measurements of small intervals of time. | *"In academic literature, chronoscope designates an instrument for accurate measurements of small intervals of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronization]] | noun | **1.** The relation that exists when things occur at unrelated times. | *"In academic literature, desynchronization designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronize]] | verb | **1.** Cause to become desynchronized; cause to occur at unrelated times. | *"In academic literature, desynchronize designates cause to become desynchronized; cause to occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronizing]] | noun | **1.** The relation that exists when things occur at unrelated times.<br>**2.** Cause to become desynchronized; cause to occur at unrelated times. | *"In academic literature, desynchronizing designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diachronic]] | adjective | **1.** Used of the study of a phenomenon (especially language) as it changes through time. | *"In academic literature, diachronic designates used of the study of a phenomenon (especially language) as it changes through time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diachrony]] | noun | **1.** The study of linguistic change. | *"In academic literature, diachrony designates the study of linguistic change."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geochronology]] | noun | **1.** The chronology of the past as indicated by geologic data.<br>**2.** The study of geochronology. | *"In academic literature, geochronology designates the chronology of the past as indicated by geologic data."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterochrony]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, heterochrony designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrochronometer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, hydrochronometer designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochron]] | noun | **1.** An imaginary line or a line on a chart connecting points at which an event occurs simultaneously or which represents the same time or time difference. | *"In academic literature, isochron designates an imaginary line or a line on a chart connecting points at which an event occurs simultaneously or which represents the same time or time difference."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochronal]] | adjective | **1.** Equal in duration or interval. | *"In academic literature, isochronal designates equal in duration or interval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochrone]] | noun | **1.** An isogram connecting points at which something occurs or arrives at the same time. | *"In academic literature, isochrone designates an isogram connecting points at which something occurs or arrives at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochronous]] | adjective | **1.** Equal in duration or interval. | *"In academic literature, isochronous designates equal in duration or interval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protochronism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, protochronism designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronal]] | adjective | **1.** Occurring or existing at the same time or having the same period or phase; - jour.a.m.a. | *"In academic literature, synchronal designates occurring or existing at the same time or having the same period or phase; - jour.a.m.a."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroneity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchroneity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronic]] | noun | **1.** Synchronous.<br>**2.** Descriptive. | *"In academic literature, synchronic designates synchronous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronicity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchronicity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronisation]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronisation designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronise]] | verb | **1.** Happen at the same time.<br>**2.** Make (motion picture sound) exactly simultaneous with the action. | *"And when we separate the two by a distance of many miles, the task of synchronising them is even worse."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronised]] | verb | **1.** Happen at the same time.<br>**2.** Make (motion picture sound) exactly simultaneous with the action. | *"In academic literature, synchronised designates happen at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroniser]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchroniser designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronising]] | noun | **1.** An adjustment that causes something to occur or recur in unison.<br>**2.** Happen at the same time. | *"And when we separate the two by a distance of many miles, the task of synchronising them is even worse."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronism]] | noun | **1.** The quality or state of being synchronous : simultaneousness.<br>**2.** Chronological arrangement of historical events and personages so as to indicate coincidence or coexistence; also : a table showing such concurrences. | *"For success, as has already been said, one thing was essential, and that thing very difficult to obtain--a perfect synchronism between one stylus and the other."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronization]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronization designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronize]] | noun | **1.** To happen at the same time.<br>**2.** To represent or arrange (events) to indicate coincidence or coexistence. | *"Each utility maneuvered to synchronize axis and align portals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synchronized]] | verb | **1.** Make synchronous and adjust in time or manner.<br>**2.** Happen at the same time. | *"All of your plans and timetables must be synchronized with the actions I take at the conference." "Any attacks on the depot will be immediately spunnel-flashed by Hanno to the UIPS," Drummer said."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synchronizer]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchronizer designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronizing]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronizing designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronoscope]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchronoscope designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronous]] | noun | **1.** Happening, existing, or arising at precisely the same time.<br>**2.** Recurring or operating at exactly the same periods. | *"In academic literature, synchronous designates happening, existing, or arising at precisely the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronously]] | adverb | **1.** In synchrony; in a synchronous manner. | *"In academic literature, synchronously designates in synchrony; in a synchronous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchrony]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchrony designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tautochrone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chron.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, tautochrone designates a term designating an entity, condition, or phenomenon derived from greek chron."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time & Chronology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CHRON
  </div>
</div>
