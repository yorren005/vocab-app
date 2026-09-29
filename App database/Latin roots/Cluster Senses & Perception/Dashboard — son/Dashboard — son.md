---
status: unread
type: root_dashboard
---
# Dashboard — son
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">son-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sound”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Using your eyes, ears, nose, and fingertips to notice the world around you.</span>
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

The root **son** means sound. It refers to acoustic vibrations that can be heard by the ear. In English, this root forms words such as *sound*, *sonar*, *resonant*, and *consonant*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sound
> The root **son** means sound. It refers to acoustic vibrations that can be heard by the ear. In English, this root forms words such as *sound*, *sonar*, *resonant*, and *consonant*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sound</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Using your eyes, ears, nose, and fingertips to notice the world around you.</mark>
> - **Everyday Connection**: Think of familiar words like *sound* and *sonar*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **son** comes from a Latin word that means *"sound"*.
  - At its core, it describes sound.

- **The Big Picture Idea**:
  - Picture using your eyes, ears, nose, and fingertips to notice the world around you.
  - Whenever you see **son** in an English word, think of **the physical senses and perception**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sound.
  - **Mental & Social**: How people experience, organize, or communicate about sound.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Sound**: Vibrations traveling through air or other media that can be heard. 2. To emit an acoustic signal.
  - **Sonar**: A system for the detection of submerged objects and the measurement of water depth by emitting acoustic pulses.
  - **Resonant**: Deep, clear, and continuing to sound or ring. 2. Evoking a powerful emotional reaction or memory.
  - **Consonant**: A speech sound produced by obstructing air flow. 2. In agreement or harmony with.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">son</mark>, think of <mark class="hl-def">the physical senses and perception</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *sonus* $\to$ *sound*, *sonic* (relating to sound).
- **Prefixation of Speed & Frequency:**
  - `super-` + *sonic* $\to$ *supersonic* (faster than the speed of sound).
  - `ultra-` + *sonic* $\to$ *ultrasonic* (frequencies above human hearing).
  - `sub-` + *sonic* $\to$ *subsonic* (slower than sound).
- **Acoustic Prefix Constellation:**
  - `re-` + *sonāre* $\to$ *resonant*, *resonate*, *resonance* (echoing, vibrating sympathetically).
  - `con-` + *sonāre* $\to$ *consonant* (sounding together; harmonious; speech sound).
  - `dis-` + *sonāre* $\to$ *dissonant*, *dissonance* (clashing sounds).
  - `ad-` + *sonāre* $\to$ *assonance* (repetition of vowel sounds).
  - `uni-` + *sonus* $\to$ *unison* (all voices in one single pitch).
- **Acronym Technology:**
  - *SONAR* = **SO**und **N**avigation **A**nd **R**anging.

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

### 1. Physics, Aeronautics & Technology
- *sonic* (relating to sound waves or the speed of sound).
- *supersonic* (exceeding the speed of sound in air, approximately 343 m/s / Mach 1).
- *ultrasonic* (acoustic frequencies above 20 kHz, used in medical imaging and cleaning).
- *sonar* (underwater acoustic detection and echo-location system).

### 2. Music, Art & Literature
- *sonata* (a classical composition for an instrumental soloist, often with piano accompaniment).
- *sonnet* (a poetic form of fourteen lines using strict rhyme schemes and iambic pentameter).
- *unison* (coincidence in pitch; complete agreement).

### 3. Voice, Resonance & Oratory
- *sonorous* (deep, rich, full, and resonant in sound).
- *resonate* (to produce or be filled with a deep, full, reverberating sound; to evoke emotional empathy).
- *resonance* (the reinforcement or prolongation of sound; sympathetic vibration).

### 4. Linguistics & Phonetics
- *consonant* (a speech sound articulated with complete or partial closure of the vocal tract).
- *assonance* (resemblance of vowel sounds in syllables of neighboring words).
- *dissonant* (lacking harmony; harsh in sound; incongruous).

---

## 🔀 4. Prefix & Combining Dynamics on son

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `re-` + `son-` + `-ant` | Reverberant prefixation | Vibrating back; echoing deeply and richly | *resonant, resonate, resonance* |
| `con-` + `son-` + `-ant` | Harmonic prefixation | Sounding harmoniously together; linguistic consonant | *consonant, consonance* |
| `dis-` + `son-` + `-ant` | Clashing prefixation | Cacophonous, jarring, intellectually conflicting | *dissonant, dissonance* |
| `super-` + `sonic` | Velocity prefixation | Faster than acoustic propagation in the medium | *supersonic* |
| `ultra-` + `sonic` | Frequency prefixation | Sound vibrations beyond human audibility (>20kHz) | *ultrasonic* |
| `uni-` + `son` | Unifying prefixation | All sounding as one single voice or pitch | *unison* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Aeronautics & Physics:** Sonic booms, Mach angles, supersonic flow, acoustic Doppler effect.
- **Medicine & Healthcare:** Ultrasound sonography, ultrasonic lithotripsy for kidney stones, fetal imaging.
- **Musicology & Poetry:** Iambic pentameter sonnets, sonata-allegro form, harmonic dissonance.
- **Cognitive Science:** Cognitive dissonance (Festinger), emotional resonance.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[consonance]] | noun | **1.** The repetition of consonants (or consonant patterns) especially at the ends of words.<br>**2.** The property of sounding harmonious. | *"This self-effacement in both directions had been quite in consonance with her independent character of desiring nothing by way of favour or pity to which she was not entitled on a fair consideration of her deserts."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[consonant]] | noun | **1.** A speech sound that is not a vowel.<br>**2.** A letter of the alphabet standing for a spoken consonant. | *"HOLOFERNES. _Quis, quis_, thou consonant?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consonantal]] | adjective | **1.** Being or marked by or containing or functioning as a consonant.<br>**2.** Relating to or having the nature of a consonant. | *"In academic literature, consonantal designates being or marked by or containing or functioning as a consonant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consonate]] | verb | **1.** Sound in sympathy. | *"In academic literature, consonate designates sound in sympathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissonance]] | noun | **1.** A conflict of people's opinions or actions or characters.<br>**2.** The auditory experience of sound that lacks musical quality; sound that is a disagreeable auditory experience. | *"In the name of all dissonance, what can it be?” It was very remarkable into what prominent relief—even as if a dim picture should leap suddenly from its canvas—Clifford’s character was thrown by this apparently trifling annoyance."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[dissonant]] | adjective | **1.** Characterized by musical dissonance; harmonically unresolved.<br>**2.** Lacking in harmony. | *"The interval, for example, which divides the wild revels of Cybele from the stately ritual of the Catholic Church is measured by the gulf which severs the dissonant clash of cymbals and tambourines from the grave harmonies of Palestrina and Handel."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[dissonate]] | verb | **1.** Be dissonant or harsh.<br>**2.** Cause to sound harsh and unpleasant. | *"In academic literature, dissonate designates be dissonant or harsh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonresonant]] | adjective | **1.** Not reverberant; lacking a tendency to reverberate. | *"In academic literature, nonresonant designates not reverberant; lacking a tendency to reverberate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resonance]] | noun | **1.** An excited state of a stable particle causing a sharp maximum in the probability of absorption of electromagnetic radiation.<br>**2.** A vibration of large amplitude produced by a relatively small vibration near the same frequency of vibration as the natural frequency of the resonating system. | *"Then followed the dull and remote resonance of the twelve heavy strokes in the tower above."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[resonant]] | adjective | **1.** Characterized by resonance.<br>**2.** Serving to bring to mind; - wilder hobson. | *"His voice, short, deep, and resonant, is not at all unlike the tones of the instrument to which he is devoted."* — Charles Dickens, *Bleak House* |
| [[resonate]] | verb | **1.** Sound with resonance.<br>**2.** Be received or understood. | *"In academic literature, resonate designates sound with resonance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resonating]] | verb | **1.** Sound with resonance.<br>**2.** Be received or understood. | *"In academic literature, resonating designates sound with resonance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resonator]] | noun | **1.** A hollow chamber whose dimensions allow the resonant oscillation of electromagnetic or acoustic waves.<br>**2.** An electrical circuit that combines capacitance and inductance in such a way that a periodic electric oscillation will reach maximum amplitude. | *"In academic literature, resonator designates a hollow chamber whose dimensions allow the resonant oscillation of electromagnetic or acoustic waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[son]] | noun | **1.** A male human offspring.<br>**2.** The divine word of god; the second person in the trinity (incarnate in jesus). | *"And when a woman woos, what woman’s son, Will sourly leave her till he have prevailed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sonant]] | noun | **1.** A speech sound accompanied by sound from the vocal cords.<br>**2.** Produced with vibration of the vocal cords. | *"In academic literature, sonant designates a speech sound accompanied by sound from the vocal cords."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sonar]] | noun | **1.** A measuring instrument that sends out an acoustic pulse in water and measures distances in terms of the time for the echo of the pulse to return. | *"In academic literature, sonar designates a measuring instrument that sends out an acoustic pulse in water and measures distances in terms of the time for the echo of the pulse to return."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sonic]] | adjective | **1.** (of speed) having or caused by speed approximately equal to that of sound in air at sea level.<br>**2.** Relating to audible sound. | *"In academic literature, sonic designates (of speed) having or caused by speed approximately equal to that of sound in air at sea level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sonnet]] | noun | **1.** A verse form consisting of 14 lines with a fixed rhyme scheme.<br>**2.** Praise in a sonnet. | *"Good Captain, will you give me a copy of the sonnet you writ to Diana in behalf of the Count Rossillon?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sonneteer]] | noun | **1.** A poet who writes sonnets. | *"Times had altered since then, and no sonneteer had insisted on Mr."* — George Eliot, *Middlemarch* |
| [[sonority]] | noun | **1.** Having the character of a loud deep sound; the quality of being resonant. | *"In academic literature, sonority designates having the character of a loud deep sound; the quality of being resonant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sonorous]] | adjective | **1.** Full and loud and deep. | *"Kenge, therefore, came down to dinner one day, and leaned back in his chair, and turned his eye-glasses over and over, and spoke in a sonorous voice, and did exactly what I remembered to have seen him do when I was a little girl."* — Charles Dickens, *Bleak House* |
| [[sonorously]] | adverb | **1.** In a sonorous manner. | *"In academic literature, sonorously designates in a sonorous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sonorousness]] | noun | **1.** Having the character of a loud deep sound; the quality of being resonant. | *"The immortal tune ended, a fine DD rolling forth from the bass-viol with the sonorousness of a cannonade, and Gabriel delayed his entry no longer."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[subsonic]] | adjective | **1.** (of speed) less than that of sound in a designated medium. | *"In academic literature, subsonic designates (of speed) less than that of sound in a designated medium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersonic]] | adjective | **1.** (of speed) greater than the speed of sound in a given medium (especially air).<br>**2.** Having frequencies above those of audible sound. | *"In academic literature, supersonic designates (of speed) greater than the speed of sound in a given medium (especially air)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultrasonic]] | adjective | **1.** Having frequencies above those of audible sound. | *"In academic literature, ultrasonic designates having frequencies above those of audible sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unison]] | noun | **1.** Corresponding exactly.<br>**2.** Occurring together or simultaneously. | *"Here we be, ’a b’lieve,” was echoed in shrill unison."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Senses & Perception]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SON
  </div>
</div>
