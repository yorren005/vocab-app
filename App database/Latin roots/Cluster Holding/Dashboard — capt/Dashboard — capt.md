---
status: unread
type: root_dashboard
---
# Dashboard — capt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">capt-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“taken or seized”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **capt** means taken or seized. It refers to taken, seized, held in confinement, and mentally caught. In English, this root forms words such as *capture*, *captured*, *capturer*, and *recapture*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: taken or seized
> The root **capt** means taken or seized. It refers to taken, seized, held in confinement, and mentally caught. In English, this root forms words such as *capture*, *captured*, *capturer*, and *recapture*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Taken or seized</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *capture* and *captured*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **capt** comes from a Latin word that means *"taken or seized"*.
  - At its core, it describes taken or seized.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **capt** in an English word, think of **holding tightly and keeping steady**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of taken or seized.
  - **Mental & Social**: How people experience, organize, or communicate about taken or seized.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Capture**: V.** 1. To take into possession or control by force, skill, or stratagem.
  - **Captured**: Taken prisoner, seized by force, or successfully recorded by technology.
  - **Capturer**: A person, force, or device that captures someone or something.
  - **Recapture**: V.** 1. To capture again something that has escaped or been lost.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">capt</mark>, think of <mark class="hl-def">holding tightly and keeping steady</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The stem **capt-** functions as a primary nominal, adjectival, and verbal root in English:
> - **1. Direct Participial Nouns & Adjectives:**
>   - `capt-` + `-īvus` → *captivus* → *captive*, *captivity*.
>   - `capt-` + `-or` → *captor*.
>   - `capt-` + `-ūra` → *captūra* → *capture*.
>   - `capt-` + `-iō` → *captiō* → *caption*.
> - **2. The Frequentative Verbal Branch:**
>   - Latin *captāre* ("to seize repeatedly, strive to catch") + `-iv-` + `-ate` → *captivate*, *captivating*, *captivation*.
> - **3. The Quibbling / Legal Branch:**
>   - Latin *captiōsus* ("ensnaring, deceitful") → *captious*, *captiousness*, *captiously*.
>   - Latin *captātiō* ("legacy-hunting") → *captation*, *captator*.
> - **4. The Norman French Sound Shift:**
>   - Vulgar Latin *captīvus* softened into Old Northern French *caitif*, yielding Middle English **caitiff** (a base, cowardly wretch).
> - **5. Modern Technological Compounds:**
>   - *recapture*, *uncaptured*, *closed-captioned*, *carbon capture*.

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
> The manifestations of **capt** divide into five distinct spheres:
> - **1. Physical Incarceration & Warfare:** In [[captive]], [[captivity]], [[captor]], and [[capture]], the root preserves its primordial martial sense: confining prisoners of war, netting wild beasts, or taking military strongpoints.
> - **2. Aesthetic Enchantment & Charisma:** In [[captivate]], [[captivating]], and [[captivation]], physical chains are replaced by emotional and artistic fascination that leaves an audience spellbound.
> - **3. Rhetoric, Legal Traps & Nitpicking:** In [[captious]] and [[captiousness]], the root describes intellectual deceit—catching at minor verbal flaws, quibbling over technicalities, or laying conversational traps.
> - **4. Orthography, Publishing & Media Accessibility:** In [[caption]], [[captioning]], and [[closed-captioned]], the root travels from legal headings to photo descriptions and real-time televised subtitles.
> - **5. Advanced Physics, Energy & Data Systems:** In [[capture]] (nuclear electron capture, carbon sequestration, and digital motion capture), the root describes isolating and recording particles, carbon dioxide molecules, or human skeletal kinematic movements.

---

## 🔀 4. Prefix & Combining Dynamics on capt

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` + `capture` | back, again (*re-*) + take | [[recapture]] | To capture again something that has escaped; to recover past memories. |
| `un-` + `captured` | not (*un-*) + seized | [[uncaptured]] | Not yet caught, taken, or recorded; running free. |
| `un-` + `captivating` | not (*un-*) + charming | [[uncaptivating]] | Lacking charm or interest; dull; failing to engage attention. |
| `closed` + `captioned` | sealed + subtitled | [[closed-captioned]] | Transcribed with visual dialogue subtitles that can be toggled on or off. |
| `carbon` + `capture` | carbon + seizure | [[carbon capture]] | The technological trapping and subterranean storage of carbon emissions. |
| `motion` + `capture` | movement + recording | [[motion capture]] | Digital recording of actors' physical movements to animate CGI characters. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ure` (< *-ūra*) | Noun / Verb (Action / State) | [[capture]] | The act of taking, or to take into possession by force or technology. |
| `-ive` (< *-īvus*) | Noun / Adjective (Patient) | [[captive]] | A person held in confinement; held in bondage or unable to escape. |
| `-ity` | Noun (State of Being) | [[captivity]] | The condition of being imprisoned, confined, or held in an enclosure. |
| `-or` | Noun (Agent) | [[captor]] | The person, institution, or animal that captures and restrains another. |
| `-ate` | Verb (Causative) | [[captivate]] | To hold the interest or attention of; to fascinate or charm. |
| `-ious` | Adjective (Disposed to) | [[captious]] | Disposed to find trivial faults; raising petty, nitpicking objections. |
| `-ion` (< *-tiō*) | Noun (Result / Artifact) | [[caption]] | An explanatory text accompanying an image; dialogue subtitles. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚔️ **Military History & International Law** | [[captive]], [[captivity]], [[captor]], [[capture]] | The Geneva Conventions governing Prisoners of War (POWs), hostage rescue, and wartime contraband seizure. |
| 🎬 **Film, Media & Accessibility Technology** | [[caption]], [[captioning]], [[closed-captioned]], [[motion capture]] | Hollywood visual effects motion capture suits (mo-cap), broadcast television accessibility, and museum exhibit placards. |
| 🌿 **Climatology, Nuclear Physics & Computing** | [[capture]] (*carbon capture*, *electron capture*) | Direct Air Capture (DAC) of atmospheric $CO_2$, radioactive orbital electron capture by a proton, and network packet sniffing. |
| 🎭 **Literature, Theatre & Performing Arts** | [[captivate]], [[captivating]], [[caitiff]] | Stage presence holding an auditorium spellbound, and Shakespearean villains denounced as cowardly caitiffs. |
| 🏛️ **Jurisprudence & Logic** | [[captious]], [[captiousness]], [[caption]] | Cross-examination rhetorical quibbling, procedural court pleading captions, and fallacious syllogistic traps. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alcapton]] | noun | **1.** An acid formed as an intermediate product of the metabolism of tyrosine and phenylalanine. | *"In academic literature, alcapton designates an acid formed as an intermediate product of the metabolism of tyrosine and phenylalanine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alcaptonuria]] | noun | **1.** A rare recessive metabolic anomaly marked by ochronosis and the presence of alkapton in the urine. | *"In academic literature, alcaptonuria designates a rare recessive metabolic anomaly marked by ochronosis and the presence of alkapton in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[captain]] | noun | **1.** An officer holding a rank below a major but above a lieutenant.<br>**2.** The naval officer in command of a military ship. | *"Therefore are feasts so solemn and so rare, Since seldom coming in that long year set, Like stones of worth they thinly placed are, Or captain jewels in the carcanet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captaincy]] | noun | **1.** The post of captain. | *"But he who has naught can dispense the world in largess; and I, who had naught, gave Kim captaincy of the palace guards."* — Jack London, *The Jacket (The Star-Rover)* |
| [[captainship]] | noun | **1.** The post of captain. | *"The itch of his affection should not then Have nicked his captainship, at such a point, When half to half the world opposed, he being The mered question. ’Twas a shame no less Than was his loss, to course your flying flags And leave his navy gazing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caption]] | noun | **1.** Taking exception; especially a quibble based on a captious argument.<br>**2.** Translation of foreign dialogue of a movie or tv program; usually displayed at the bottom of the screen. | *"Emancipation and its attendant agitations brought to the front a new class of political questions, which can best be grouped under the above caption."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[captious]] | adjective | **1.** Tending to find and call attention to faults. | *"I know I love in vain, strive against hope; Yet in this captious and inteemable sieve I still pour in the waters of my love And lack not to lose still."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captiously]] | adverb | **1.** In a captious, carping manner. | *"In academic literature, captiously designates in a captious, carping manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[captivate]] | verb | **1.** Attract; cause to be enamored. | *"But now the substance shall endure the like, And I will chain these legs and arms of thine, That hast by tyranny these many years Wasted our country, slain our citizens, And sent our sons and husbands captivate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captivated]] | verb | **1.** Attract; cause to be enamored.<br>**2.** Strongly attracted. | *"Thou wert immured, restrained, captivated, bound."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captivating]] | verb | **1.** Attract; cause to be enamored.<br>**2.** Capturing interest as if by a spell. | *"In short, she had such a natural, captivating, winning manner that in a few minutes we were sitting in the window-seat, with the light of the fire upon us, talking together as free and happy as could be."* — Charles Dickens, *Bleak House* |
| [[captivatingly]] | adverb | **1.** In a bewitching manner. | *"In academic literature, captivatingly designates in a bewitching manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[captivation]] | noun | **1.** The state of being intensely interested (as by awe or terror).<br>**2.** A feeling of great liking for something wonderful and unusual. | *"In academic literature, captivation designates the state of being intensely interested (as by awe or terror)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[captive]] | noun | **1.** A person who is confined; especially a prisoner of war.<br>**2.** An animal that is confined. | *"He lost a wife Whose beauty did astonish the survey Of richest eyes; whose words all ears took captive; Whose dear perfection hearts that scorn’d to serve Humbly call’d mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captivity]] | noun | **1.** The state of being imprisoned.<br>**2.** The state of being a slave; --shakespeare. | *"Triumphant Death, smear’d with captivity, Young Talbot’s valour makes me smile at thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captopril]] | noun | **1.** A drug (trade name capoten) that blocks the formation of angiotensin in the kidneys resulting in vasodilation; used in the treatment of hypertension and congestive heart failure. | *"In academic literature, captopril designates a drug (trade name capoten) that blocks the formation of angiotensin in the kidneys resulting in vasodilation; used in the treatment of hypertension and congestive heart failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[captor]] | noun | **1.** A person who captures and holds people or animals. | *"Now, punish me!” she said, turning up her eyes to him with the hopeless defiance of the sparrow’s gaze before its captor twists its neck."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[capture]] | noun | **1.** The act of forcibly dispossessing an owner of property.<br>**2.** A process whereby a star or planet holds an object in its gravitational field. | *"If Paul was wrong, how did he capture the Christian Church for his ideas?"* — T. R. Glover, *The Jesus of History* |
| [[capturer]] | noun | **1.** A person who captures and holds people or animals. | *"In academic literature, capturer designates a person who captures and holds people or animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decapterus]] | noun | **1.** Scads especially mackerel scad; cosmopolitan in distribution. | *"In academic literature, decapterus designates scads especially mackerel scad; cosmopolitan in distribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recapture]] | noun | **1.** A legal seizure by the government of profits beyond a fixed amount.<br>**2.** The act of taking something back. | *"The attempt has been made to recapture more of his thoughts by learning the value given to some of the terms he uses as they appear in the literature of the day, and of course it has been helpful."* — T. R. Glover, *The Jesus of History* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAPT
  </div>
</div>
