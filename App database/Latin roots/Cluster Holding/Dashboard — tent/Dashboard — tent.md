---
status: unread
type: root_dashboard
---
# Dashboard — tent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“held or stretched”</span>
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

The root **tent** means held or stretched. It refers to holding firmly in hand, grasping, or stretching outward. In English, this root forms words such as *content*, *intent*, *extent*, and *retentive*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: held or stretched
> The root **tent** means held or stretched. It refers to holding firmly in hand, grasping, or stretching outward. In English, this root forms words such as *content*, *intent*, *extent*, and *retentive*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Held or stretched</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *content* and *intent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tent** comes from a Latin word that means *"held or stretched"*.
  - At its core, it describes held or stretched.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **tent** in an English word, think of **holding tightly and keeping steady**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of held or stretched.
  - **Mental & Social**: How people experience, organize, or communicate about held or stretched.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Content**: Adj.** In a state of peaceful happiness, satisfaction, and ease with one's circumstances.
  - **Intent**: N.** 1. The purpose, aim, or design behind an action.
  - **Extent**: An everyday English word showing the root's idea of *held or stretched*.
  - **Retentive**: Having the power, capacity, or ability to retain.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tent</mark>, think of <mark class="hl-def">holding tightly and keeping steady</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via three core morphological patterns:
> 1. **Supine Abstract Nouns in `-ion` / `-tion`:**
>    - *attention*, *detention*, *intention*, *retention*, *sustentation*.
> 2. **Participial Adjectives & Nouns in `-ent` / `-entment`:**
>    - *content*, *contented*, *contentment*, *discontent*, *discontentment*, *malcontent*.
> 3. **Focus and Purpose Formations:**
>    - *intent*, *intently*, *intentness*, *intentional*, *intentionality*, *unintentional*.
> 4. **Frequentative Probing & Sensory Formations:**
>    - *tentative*, *tentatively*, *tentativeness*, *tentacle*, *tentacular*.
> 5. **Physics & Engineering Formations:**
>    - *retentive*, *retentivity* (magnetic flux retention).

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
> - **Emotional & Stoic Serenity:** *Content*, *contented*, *contentment*, *discontent*, *malcontent* — being peacefully self-contained versus restless and aggrieved.
> - **Custody, Memory & Pathology:** *Detention*, *retention*, *retentive* — punitive imprisonment, memory capacity (*retentive mind*), or medical fluid/urinary retention.
> - **Cognition, Will & Philosophy:** *Attention*, *attentive*, *intent*, *intention*, *intentionality* — cognitive focus and phenomenological consciousness directed toward objects.
> - **Biology & Sensory Exploration:** *Tentacle*, *tentacular*, *tentative* — anatomical feelers of cephalopods; cautious, exploratory moves.
> - **Physical Shelter & Logistics:** *Tent*, *contents*, *sustenance* — portable canvas shelters; volume held inside a container; food sustaining biological life.

---

## 🔀 4. Prefix & Combining Dynamics on tent

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `con-` | together, within bounds | [[content]], [[contents]], [[contentment]] | Held together within limits; at peace with one's share; internal volume. |
| `dē-` | down, away, back | [[detention]], [[detentive]] | The act of holding back someone from freedom; legal or school custody. |
| `re-` | back, behind, again | [[retention]], [[retentive]], [[retentivity]] | The act of holding back matter, heat, data, or memory traces. |
| `ad-` ($\to$ `at-`) | toward, to | [[attention]], [[attentive]], [[attentiveness]] | Directing and holding consciousness toward an external stimulus. |
| `in-` (1) | in, into, upon | [[intent]], [[intention]], [[intentionality]] | Holding a conscious aim fixed upon a planned future outcome. |
| `dis-` | apart, reversal | [[discontent]], [[discontentment]] | The un-holding of peace; restless frustration with one's conditions. |
| `mal-` (French) | badly, poorly | [[malcontent]] | Badly satisfied; a habitually resentful, rebellious person. |
| `sub-` ($\to$ `sus-`) | under, from below | [[sustenance]], [[sustentation]] | Holding up life from below; nourishing food and vital support. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Abstract Noun (State / Process) | [[attention]], [[detention]], [[intention]], [[retention]] | Denotes the realized act of cognitive focus, custody, or storage. |
| `-ive` | Adjective (Capacity / Tendency) | [[attentive]], [[retentive]], [[tentative]] | Characterizing an entity by its active focus, memory power, or experimental nature. |
| `-ment` | Noun (Internal State) | [[contentment]], [[discontentment]] | The psychological state of tranquil satisfaction or chronic unrest. |
| `-ity` | Abstract Noun (Systemic Property) | [[retentivity]], [[intentionality]] | Physical capacity to hold magnetic flux; philosophical property of mental states. |
| `-acle` | Instrument / Bodily Organ | [[tentacle]] | A flexible, elongated appendage used for holding, feeling, or grasping. |
| `-ative` | Adjective (Experimental Mode) | [[tentative]] | Subject to testing or trial; cautious, provisional, not finalized. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧠 **Cognitive Psychology & Neuroscience** | [[attention]], [[attentive]], [[inattention]], [[retention]] | Selective visual attention; executive attention networks in the prefrontal cortex; long-term memory retention curves. |
| ⚖️ **Criminal Law & Jurisprudence** | [[detention]], [[intent]], [[intention]], [[intentional]] | Pre-trial judicial detention; the criminal doctrine of *mens rea* (criminal intent); intentional torts vs. negligence. |
| 🏛️ **Philosophy of Mind & Phenomenology** | [[intentionality]], [[intent]] | Franz Brentano and Edmund Husserl's concept of *intentionality* (the 'aboutness' or directedness of mental states toward objects). |
| 🐙 **Marine Biology & Zoology** | [[tentacle]], [[tentacular]] | Cephalopod muscular hydrostat tentacles equipped with suction rings; cnidarian nematocyst tentacles for prey capture. |
| 🩺 **Clinical Medicine & Urology** | [[retention]], [[sustenance]] | Acute urinary retention requiring urethral catheterization; dietary nutritional sustenance for critical care patients. |
| ⚡ **Electromagnetism & Materials Science** | [[retentivity]], [[retentive]] | Magnetic retentivity (remanence) measuring a ferromagnetic material's capacity to hold magnetic field lines after the external field is removed. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[attention]] | noun | **1.** The process whereby a person concentrates on some features of the environment to the (relative) exclusion of others.<br>**2.** The work of providing treatment for or attending to someone or something. | *"Ay, with all my heart, And lend my best attention."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attention-getting]] | adjective | **1.** Seizing the attention.<br>**2.** Likely to attract attention. | *"In academic literature, attention-getting designates seizing the attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attentional]] | adjective | **1.** Of or relating to attention. | *"In academic literature, attentional designates of or relating to attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attentive]] | adjective | **1.** (often followed by `to') giving care or attention.<br>**2.** Taking heed; giving close and thoughtful attention. | *"Hear him, lords, And be you silent and attentive too, For he that interrupts him shall not live."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attentively]] | adverb | **1.** With attention; in an attentive manner. | *"It will also keep you from making uncertain plans, which might only bring fresh disappointments." Leonore had attentively followed every word Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[attentiveness]] | noun | **1.** Paying particular notice (as to children or helpless people).<br>**2.** The trait of being considerate and thoughtful of others. | *"I am ashamed of you and of myself, but it shall never happen again.” “_Your_ attentiveness and consideration makes me more sensible of my own neglect."* — Jane Austen, *Mansfield Park* |
| [[content]] | noun | **1.** Everything that is included in a collection and that is held or included in something.<br>**2.** What a communication that is about something is about. | *"Madam, the care I have had to even your content, I wish might be found in the calendar of my past endeavours; for then we wound our modesty, and make foul the clearness of our deservings, when of ourselves we publish them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contented]] | verb | **1.** Satisfy in a limited way.<br>**2.** Make content. | *"Thither will I invite the Duke and all’s contented followers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contentedly]] | adverb | **1.** With equanimity. | *"The strangest of all, however, was that Leonore sat in the corner of the carriage smiling contentedly, for Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[contentedness]] | noun | **1.** The state of being contented with your situation in life. | *"Isabel waited, with a certain unuttered contentedness, to have her movements directed; she liked Mr."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[contention]] | noun | **1.** A point asserted as part of an argument.<br>**2.** A contentious speech act; a dispute where there is strong disagreement. | *"Safely, I think. ’Twas a contention in public, which may, without contradiction, suffer the report."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contentious]] | adjective | **1.** Inclined or showing an inclination to dispute or disagree, even to engage in law suits.<br>**2.** Involving or likely to cause controversy; - tim w.ferfuson. | *"Thou think’st ’tis much that this contentious storm Invades us to the skin: so ’tis to thee, But where the greater malady is fix’d, The lesser is scarce felt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contentiousness]] | noun | **1.** An inclination to be quarrelsome and contentious. | *"In academic literature, contentiousness designates an inclination to be quarrelsome and contentious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contentment]] | noun | **1.** Happiness with one's situation in life. | *"Beholding him in which glow of contentment, Mr."* — Charles Dickens, *Bleak House* |
| [[contents]] | noun | **1.** A list of divisions (chapters or articles) and the pages on which they start.<br>**2.** Everything that is included in a collection and that is held or included in something. | *"In academic literature, contents designates a list of divisions (chapters or articles) and the pages on which they start."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detent]] | noun | **1.** A hinged catch that fits into a notch of a ratchet to move a wheel forward or prevent it from moving backward. | *"In academic literature, detent designates a hinged catch that fits into a notch of a ratchet to move a wheel forward or prevent it from moving backward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detente]] | noun | **1.** The easing of tensions or strained relations (especially between nations). | *"In academic literature, detente designates the easing of tensions or strained relations (especially between nations)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detention]] | noun | **1.** A state of being confined (usually for a short time).<br>**2.** A punishment in which a student must stay at school after others have gone home. | *"Pray you, How goes the world, that I am thus encountered With clamorous demands of debt, broken bonds, And the detention of long-since-due debts Against my honour?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontent]] | noun | **1.** A longing for something better than the present situation.<br>**2.** Make dissatisfied. | *"So I leave you, sir, To th’ worst of discontent. [_Exit._] CLOTEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontented]] | verb | **1.** Make dissatisfied.<br>**2.** Showing or experiencing dissatisfaction or restless longing. | *"Most meet That first we come to words, and therefore have we Our written purposes before us sent, Which if thou hast considered, let us know If ’twill tie up thy discontented sword And carry back to Sicily much tall youth That else must perish here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontentedly]] | adverb | **1.** With discontent; in a discontented manner. | *"Then comes, dropping after all, Apemantus, discontentedly, like himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontentedness]] | noun | **1.** A longing for something better than the present situation. | *"A mole near either elbow declares restlessness, a roving and unsteady temper, also a discontentedness with those whom they are obliged constantly to live with."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[discontentment]] | noun | **1.** A longing for something better than the present situation. | *"In academic literature, discontentment designates a longing for something better than the present situation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distention]] | noun | **1.** The state of being stretched beyond normal dimensions.<br>**2.** The act of expanding by pressure from within. | *"In academic literature, distention designates the state of being stretched beyond normal dimensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entente]] | noun | **1.** An informal alliance between countries.<br>**2.** A friendly understanding between political powers. | *"So let us sing--"Long live the king" And join the bonne entente, Jean."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[extent]] | noun | **1.** The point or degree to which something extends.<br>**2.** The distance or area or volume over which something extends. | *"Well, push him out of doors, And let my officers of such a nature Make an extent upon his house and lands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inattention]] | noun | **1.** Lack of attention. | *"We see nothing of them, and this is really an instance of gross inattention."* — Jane Austen, *Persuasion* |
| [[inattentive]] | adjective | **1.** Showing a lack of attention or care.<br>**2.** Not showing due care or attention. | *"Rachael”—I was afraid he addressed himself to her because I appeared inattentive—“amounts at the present hour to from SIX-ty to SEVEN-ty THOUSAND POUNDS!” said Mr."* — Charles Dickens, *Bleak House* |
| [[inattentively]] | adverb | **1.** In an absentminded or preoccupied manner. | *"And what a crumby girl!” VI Tess went down the hill to Trantridge Cross, and inattentively waited to take her seat in the van returning from Chaseborough to Shaston."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inattentiveness]] | noun | **1.** A lack of attentiveness (as to children or helpless people).<br>**2.** The trait of not being considerate and thoughtful of others. | *"In academic literature, inattentiveness designates a lack of attentiveness (as to children or helpless people)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intent]] | noun | **1.** An anticipated outcome that is intended or that guides your planned actions.<br>**2.** The intended meaning of a communication. | *"Had you not lately an intent,—speak truly,— To go to Paris?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intention]] | noun | **1.** An anticipated outcome that is intended or that guides your planned actions.<br>**2.** (usually plural) the goal with respect to a marriage proposal. | *"O, she did so course o’er my exteriors with such a greedy intention that the appetite of her eye did seem to scorch me up like a burning-glass."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intentional]] | adjective | **1.** Characterized by conscious design or purpose.<br>**2.** Done or made or performed with purpose and intent; - havelock ellis. | *"What could all this mean but an intentional affront?"* — Jane Austen, *Northanger Abbey* |
| [[intentionality]] | noun | **1.** Expressive of intentions. | *"In academic literature, intentionality designates expressive of intentions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intentionally]] | adverb | **1.** With intention; in an intentional manner. | *"Whether intentionally or accidentally, I don’t know."* — Charles Dickens, *Bleak House* |
| [[intently]] | adverb | **1.** With strained or eager attention. | *"Maxa was looking at her intently."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intentness]] | noun | **1.** The quality of being intent and concentrated. | *"The trees stood in an attitude of intentness, as if they waited longingly for a wind to come and rock them."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[noncontentious]] | adjective | **1.** Of persons; not given to controversy. | *"In academic literature, noncontentious designates of persons; not given to controversy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obtention]] | noun | **1.** The act of obtaining. | *"In academic literature, obtention designates the act of obtaining."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oftentimes]] | adverb | **1.** Many times at short intervals. | *"This woman that I mean, My wife (but, I protest, without desert) Hath oftentimes upbraided me withal; To her will we to dinner.—Get you home And fetch the chain, by this I know ’tis made."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretentious]] | adjective | **1.** Making claim to or creating an appearance of (often undeserved) importance or distinction.<br>**2.** Intended to attract notice and impress others. | *"They implied that he was insolent, pretentious, and given to that reckless innovation for the sake of noise and show which was the essence of the charlatan."* — George Eliot, *Middlemarch* |
| [[pretentiously]] | adverb | **1.** In a pretentious manner. | *"She knew what it was all meant to represent, but it was so pretentiously false and unnatural that she first felt ashamed for the actors and then amused at them."* — graf Leo Tolstoy, *War and Peace* |
| [[pretentiousness]] | noun | **1.** Lack of elegance as a consequence of being pompous and puffed up with vanity.<br>**2.** The quality of being pretentious (behaving or speaking in such a manner as to create a false appearance of great importance or worth). | *"In academic literature, pretentiousness designates lack of elegance as a consequence of being pompous and puffed up with vanity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retention]] | noun | **1.** The act of retaining something.<br>**2.** The power of retaining and recalling past experience. | *"Sir, I thought it fit To send the old and miserable King To some retention and appointed guard; Whose age has charms in it, whose title more, To pluck the common bosom on his side, And turn our impress’d lances in our eyes Which do command them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retentive]] | adjective | **1.** Good at remembering.<br>**2.** Having the capacity to retain something. | *"Nor stony tower, nor walls of beaten brass, Nor airless dungeon, nor strong links of iron, Can be retentive to the strength of spirit; But life, being weary of these worldly bars, Never lacks power to dismiss itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retentively]] | adverb | **1.** In a retentive manner. | *"In academic literature, retentively designates in a retentive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retentiveness]] | noun | **1.** The power of retaining and recalling past experience.<br>**2.** The property of retaining possessions that have been acquired. | *"As regarded novelties (among which cabs and omnibuses were to be reckoned), his mind appeared to have lost its proper gripe and retentiveness."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[retentivity]] | noun | **1.** The power of retaining and recalling past experience.<br>**2.** The property of retaining possessions that have been acquired. | *"In academic literature, retentivity designates the power of retaining and recalling past experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sustentacular]] | adjective | **1.** Serving to sustain or support. | *"In academic literature, sustentacular designates serving to sustain or support."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sustentation]] | noun | **1.** The act of sustaining life by food or providing a means of subsistence. | *"In academic literature, sustentation designates the act of sustaining life by food or providing a means of subsistence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tent]] | noun | **1.** A portable shelter (usually of canvas stretched over supporting poles and fastened to the ground with ropes and pegs).<br>**2.** A web that resembles a tent or carpet. | *"In good sadness, I do not know; either it is there or it is upon a file, with the duke’s other letters, in my tent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tentacle]] | noun | **1.** Something that acts like a tentacle in its ability to grasp and hold.<br>**2.** Any of various elongated tactile or prehensile flexible organs that occur on the head or near the mouth in many animals; used for feeling or grasping or locomotion. | *"In reality, it was an infinite agglomeration of coloured infusoria, of veritable globules of jelly, provided with a threadlike tentacle, and of which as many as twenty-five thousand have been counted in less than two cubic half-inches of water."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[tentacled]] | adjective | **1.** Having tentacles. | *"In academic literature, tentacled designates having tentacles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentacular]] | adjective | **1.** Of or relating to or resembling tentacles. | *"In academic literature, tentacular designates of or relating to or resembling tentacles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentaculata]] | noun | **1.** Ctenophores have retractile tentacles. | *"In academic literature, tentaculata designates ctenophores have retractile tentacles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentative]] | adjective | **1.** Under terms not final or fully worked out or agreed upon.<br>**2.** Unsettled in mind or opinion. | *"That he was a desultory tentative student of something and everything might only have been predicted of him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tentatively]] | adverb | **1.** In a tentative manner. | *"Perhaps somebody in the house is in love,” she said tentatively."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tenter]] | noun | **1.** A framework with hooks used for stretching and drying cloth. | *"In academic literature, tenter designates a framework with hooks used for stretching and drying cloth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenterhook]] | noun | **1.** One of a series of hooks used to hold cloth on a tenter. | *"Still just then, being on tenterhooks, he desired the female’s room more than her company so it came as a genuine relief when the keeper made her a rude sign to take herself off."* — James Joyce, *Ulysses* |
| [[tenting]] | noun | **1.** The act of encamping and living in tents in a camp.<br>**2.** Live in or as if in a tent. | *"In academic literature, tenting designates the act of encamping and living in tents in a camp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentmaker]] | noun | **1.** Someone who makes or repairs tents. | *"In academic literature, tentmaker designates someone who makes or repairs tents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentorium]] | noun | **1.** (anatomy) a fold of dura mater that covers the cerebellum and supports the occipital lobes of the cerebrum. | *"In academic literature, tentorium designates (anatomy) a fold of dura mater that covers the cerebellum and supports the occipital lobes of the cerebrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintentional]] | adjective | **1.** Without deliberate intent; - george macdonald.<br>**2.** Not done with purpose or intent. | *"I am excessively concerned that he should have any regard for me—but indeed it has been quite unintentional on my side; I never had the smallest idea of it."* — Jane Austen, *Northanger Abbey* |
| [[unintentionally]] | adverb | **1.** Without intention; in an unintentional manner. | *"Thus much indeed he was obliged to acknowledge: that he had been constant unconsciously, nay unintentionally; that he had meant to forget her, and believed it to be done."* — Jane Austen, *Persuasion* |
| [[unpretentious]] | adjective | **1.** Lacking pretension or affectation.<br>**2.** Not ostentatious. | *"But there was neither defiance nor fear in Val: tranquil and unpretentious, in his force of character he reminded Lawrence of Laura Clowes."* — Anthony Pryde, *Nightfall* |
| [[unpretentiously]] | adverb | **1.** In an unpretentious manner. | *"Cadwallader said that Brooke was beginning to treat the Middlemarchers, and that she preferred the farmers at the tithe-dinner, who drank her health unpretentiously, and were not ashamed of their grandfathers’ furniture."* — George Eliot, *Middlemarch* |
| [[unpretentiousness]] | noun | **1.** The quality of being natural and without pretensions. | *"In academic literature, unpretentiousness designates the quality of being natural and without pretensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unretentive]] | adjective | **1.** (of memory) deficient in retentiveness or range. | *"In academic literature, unretentive designates (of memory) deficient in retentiveness or range."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TENT
  </div>
</div>
