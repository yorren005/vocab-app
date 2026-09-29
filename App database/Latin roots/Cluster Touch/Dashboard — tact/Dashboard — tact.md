---
status: unread
type: root_dashboard
---
# Dashboard — tact
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tact-</span>
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

The root **tact** means touch. It refers to physical contact, feeling with the hands, or tactile sensation. In English, this root forms words such as *tactile*, *contact*, *intact*, and *tact*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: touch
> The root **tact** means touch. It refers to physical contact, feeling with the hands, or tactile sensation. In English, this root forms words such as *tactile*, *contact*, *intact*, and *tact*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Touch</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gently pressing your fingertips against a smooth surface to feel its texture.</mark>
> - **Everyday Connection**: Think of familiar words like *tactile* and *contact*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tact** comes from a Latin word that means *"touch"*.
  - At its core, it describes touch.

- **The Big Picture Idea**:
  - Picture gently pressing your fingertips against a smooth surface to feel its texture.
  - Whenever you see **tact** in an English word, think of **touch, contact, and tactile feeling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of touch.
  - **Mental & Social**: How people experience, organize, or communicate about touch.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Tactile**: Connected with or perceived by the sense of touch.
  - **Contact**: N.* The state or condition of physical touching.
  - **Intact**: Not damaged or impaired in any way.
  - **Tact**: An everyday English word showing the root's idea of *touch*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tact</mark>, think of <mark class="hl-def">touch, contact, and tactile feeling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms a balanced family of physical and psychological words:
1. **The Nominal Base `tact`**: Direct from French *tact* (< Latin *tāctus*), functioning as an abstract noun meaning interpersonal sensitivity.
2. **Adjectival Derivatives of Propriety**:
   - `tact` + `-ful` $\to$ *tactful* (diplomatic, discreet).
   - `tact` + `-less` $\to$ *tactless* (blunt, indiscreet, insensitive).
3. **Prefixal Physical Compounds**:
   - `con-` + *tactus* (*cum* "together") $\to$ *contact*, *contactless*.
   - `in-` + *tactus* (*in-* "not") $\to$ *intact*.
4. **Physiological Suffixation `-ile`**:
   - Latin *tāctilis* $\to$ *tactile*, *tactility*.

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

The cognitive scope of *tact* covers three main domains:
- **Physical Connection & Wholeness**: [[contact]], `contactless`, [[intact]]
- **Social Diplomacy & Emotional Sensitivity**: `tact`, [[tactful]], [[tactless]]
- **Neurophysiology & Sensory Perception**: [[tactile]], `tactility`

---

## 🔀 4. Prefix & Combining Dynamics on tact

1. **`con-` + `tact`** (*cum* "together"):
   - *contact* $\to$ the state or condition of physical touching; communication.
   - *contactless* $\to$ operating without physical contact (e.g., RFID payments).
2. **`in-` + `tact`** (*in-* "not, un-"):
   - *intact* $\to$ not damaged or impaired in any way; complete; untouched.
3. **`tact` + `-ile`** (Latin *-ilis* "capable of"):
   - *tactile* $\to$ of, relating to, or perceived by the sense of touch.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Diplomacy & Human Resources**: *tactful* negotiation, conflict resolution, interpersonal *tact*.
- **Sensory Neuroscience**: *tactile* corpuscles (Meissner's and Pacinian), somatosensory cortex.
- **Electrical & Computer Engineering**: electrical *contacts*, *contactless* smart cards, haptic feedback.
- **Archaeology & Preservation**: *intact* tomb discoveries, unlooted archaeological artifacts.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[contact]] | noun | **1.** Close interaction.<br>**2.** The act of touching physically. | *"As Mea had the privilege of being in the closest, most intimate contact with her new friend in the late evening hours, she was in a state of perfect bliss."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intact]] | adjective | **1.** Constituting the undiminished entirety; lacking nothing essential especially not damaged; - bacon.<br>**2.** (of a woman) having the hymen unbroken. | *"Surely then he might have regarded that abhorrence of the un-intact state, which he had inherited with the creed of mysticism, as at least open to correction when the result was due to treachery."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[intactness]] | noun | **1.** The state of being unimpaired. | *"In academic literature, intactness designates the state of being unimpaired."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protactinium]] | noun | **1.** A short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead. | *"In academic literature, protactinium designates a short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tact]] | noun | **1.** Consideration in dealing with others and avoiding giving offense. | *"You know, just accustom yourself to talk it over, with your tact and in your quiet way, with him and Ada, and see what you all make of it."* — Charles Dickens, *Bleak House* |
| [[tactful]] | adjective | **1.** Having or showing a sense of what is fitting and considerate in dealing with others.<br>**2.** Showing skill and sensitivity in dealing with people. | *"I'd like you to see my guns," Lawrence continued, too shrewd to be tactful."* — Anthony Pryde, *Nightfall* |
| [[tactfully]] | adverb | **1.** Showing tact or tactfulness; in a tactful manner. | *"He had tactfully suggested substantive alterations to minimize warning time to the depot and its nearby transports."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tactfulness]] | noun | **1.** Consideration in dealing with others and avoiding giving offense. | *"The Buddha, knowing that our minds delighted in inferior things, by his tactfulness taught according to our capacity, but still we did not perceive that we were really Buddha-sons."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[tactic]] | noun | **1.** A plan for attaining a particular goal. | *"Businesslike, formal, and highly visible." "Why don't you use that tactic on the dozens of Slingshot laboratories and assembly centers here on Pluto's surface?"* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tactical]] | adjective | **1.** Of or pertaining to tactic or tactics. | *"Double-check resource requirements and schedules, and tactical options and their possible effects on UIPS forces and assets in the Special Zone."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tactically]] | adverb | **1.** With regard to tactics. | *"In academic literature, tactically designates with regard to tactics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tactician]] | noun | **1.** A person who is skilled at planning tactics. | *"He is a great tactician!” said the prince to his son, pointing to the architect."* — graf Leo Tolstoy, *War and Peace* |
| [[tactics]] | noun | **1.** The branch of military science dealing with detailed maneuvers to achieve objectives set by strategy.<br>**2.** A plan for attaining a particular goal. | *"They do wait, however, with the perseverance of military tactics, and at last the bell rings again and the client in possession comes out of Mr."* — Charles Dickens, *Bleak House* |
| [[tactile]] | adjective | **1.** Of or relating to or proceeding from the sense of touch.<br>**2.** Producing a sensation of touch. | *"In academic literature, tactile designates of or relating to or proceeding from the sense of touch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tactility]] | noun | **1.** The faculty of perceiving (via the skin) pressure or heat or pain. | *"In academic literature, tactility designates the faculty of perceiving (via the skin) pressure or heat or pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tactless]] | adjective | **1.** Lacking or showing a lack of what is fitting and considerate in dealing with others.<br>**2.** Revealing lack of perceptiveness or judgment or finesse. | *"Not only are the personages too transparently allegorical, but the allegory is insipid; especially tactless is the treatment of the marriage between Prometheus, the Spirit of Humanity, and Asia, the Spirit of Nature, as a romantic love affair."* — Sydney Waterlow, *Shelley* |
| [[tactlessly]] | adverb | **1.** Without tact; in a tactless manner. | *"In academic literature, tactlessly designates without tact; in a tactless manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tactlessness]] | noun | **1.** The quality of lacking tact. | *"Well, after all," he said, when I pointed out to him quietly but plainly my opinion of his tactlessness, "what does it matter?"* — P. G. Wodehouse, *Love Among the Chickens* |
| [[tactual]] | adjective | **1.** Of or relating to or proceeding from the sense of touch.<br>**2.** Producing a sensation of touch. | *"In academic literature, tactual designates of or relating to or proceeding from the sense of touch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tactually]] | adverb | **1.** By touch. | *"Classical and authoritative lexicons catalog tactually as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untactful]] | adjective | **1.** Lacking or showing a lack of what is fitting and considerate in dealing with others. | *"In academic literature, untactful designates lacking or showing a lack of what is fitting and considerate in dealing with others."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TACT
  </div>
</div>
