---
status: unread
type: root_dashboard
---
# Dashboard — cord
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cord-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“heart”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **cord** means heart. It refers to heart / harmony / memory / bravery. In English, this root forms words such as *cordial*, *courage*, *accord*, and *discord*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: heart
> The root **cord** means heart. It refers to heart / harmony / memory / bravery. In English, this root forms words such as *cordial*, *courage*, *accord*, and *discord*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Heart</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *cordial* and *courage*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cord** comes from a Latin word that means *"heart"*.
  - At its core, it describes heart.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **cord** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of heart.
  - **Mental & Social**: How people experience, organize, or communicate about heart.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Cordial**: Warm, hearty, and sincerely affectionate or welcoming.
  - **Courage**: The mental, moral, or physical strength to venture, persevere, and withstand danger, difficulty, fear, or despair.
  - **Accord**: To be in complete agreement, harmony, or conformity with.
  - **Discord**: Disagreement, contention, and lack of harmony between people or factions.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cord</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root operates across three morphological streams:
> - **Classical Latin Oblique Stem:** `cord-` (from *cordis*). Generates learned adjectives, botanical terms, and direct ecclesiastical loans: *cordial*, *cordate*, *cordiform*, *precordial*, *sursum corda*.
> - **Prefixed Latin Verbal Stem:** `-cord-` (from *accordāre*, *concordāre*, *discordāre*, *recordārī*): *accord*, *concord*, *discord*, *record*.
> - **Gallo-Romance Emotional Stem:** `courag-` (from Old French *corage* < Vulgar Latin *\*coraticum*): *courage*, *courageous*, *encourage*, *discourage*.
>
> Directional prefixes modify the relational posture of the heart (*ad-* = towards; *con-* = together; *dis-* = apart; *re-* = back; *en-* = inside; *ob-* = reversed).

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

> [!tip] 🌈 The Conceptual Facets of Cord-
> - **1. Social, Political & Treaty Diplomacy:** Peaceful harmony between states and institutions (*concord*, *concordat*), legal binding agreements (*accord*, *accordance*), and factional strife (*discord*).
> - **2. Epistemology, Memory & Information Storage:** Calling back to heart and committing to permanent media (*record*, *recording*, *recorder*), and indexing conceptual terms (*concordance*).
> - **3. Moral Fortitude & Psychological Spirit:** Inner bravery and resilience (*courage*, *courageous*), moral instillation (*encourage*), and demoralization (*discourage*).
> - **4. Interpersonal Warmth & Gastronomy:** Warm, heartfelt hospitality (*cordial*, *cordiality*), and heart-stimulating liqueurs (*cordial*).
> - **5. Musical Acoustics & Harmonic Theory:** Notes vibrating in agreement (*accord*, *accordion*, *chord*), and clashing dissonance (*discord*, *discordant*).
> - **6. Botany, Morphology & Anatomy:** Heart-shaped leaves (*cordate*, *obcordate*, *cordiform*), and the thoracic region anterior to the heart (*precordial*).
> - **7. Christian Liturgy & Monastic Furniture:** The call to prayer (*sursum corda*), and hinged stalls supporting monks during long vigils (*misericord*).

---

## 🔀 4. Prefix & Combining Dynamics on cord

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[accord]] | To bring hearts *toward* mutual agreement; to grant or correspond. |
| `con-` | together, with | [[concord]] | Hearts united *together*; peace, harmony, and amity. |
| `dis-` | apart, away | [[discord]] | Hearts torn *apart*; conflict, dissent, musical harshness. |
| `re-` | back, again | [[record]] | To call *back* to the heart/mind; to register in memory or writing. |
| `en-` / `em-` | in, into | [[encourage]] | To put heart/spirit *into* someone; to embolden. |
| `dis-` | away, privative | [[discourage]] | To take heart/spirit *away from* someone; to dishearten. |
| `prae-` | before, in front | [[precordial]] | Situated *in front of* the heart (anterior chest wall). |
| `ob-` | inversely, against | [[obcordate]] | Inversely heart-shaped (stalk attached at pointed apex). |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-ial` | Adjective (relating to) | [[cordial]] | Originating warmly from the heart; a heart-stimulating tonic. |
| `-ate` | Adjective (shape / form) | [[cordate]] | Heart-shaped in botanical outline (e.g., ivy leaves). |
| `-ance` | Noun (state / process) | [[concordance]] | State of agreement; an exhaustive index matching text contexts. |
| `-at` | Noun (formal treaty) | [[concordat]] | A formal solemn covenant between church and state. |
| `-ion` | Noun (instrument) | [[accordion]] | Handheld instrument named for its rich, harmonious chords. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **International Law & Geopolitics** | [[accord]], [[concordat]], [[discord]] | The Abraham Accords, the 1929 Lateran Concordat, civil discord in failing states. |
| **Cardiology & Clinical Medicine** | [[precordial]], [[cordial]] | Precordial ECG chest leads (V1–V6); precordial catch syndrome; cardiac stimulants. |
| **Musicology & Sound Engineering** | [[chord]], [[discordant]], [[accordion]], [[recording]] | Major/minor harmonic chords, equal-temperament discordance, multi-track audio recording. |
| **Literary Philology & Archival Science** | [[concordance]], [[record]], [[recorder]] | Biblical concordances (Strong's); official public land records; court recorders. |
| **Botany & Plant Morphology** | [[cordate]], [[obcordate]], [[cordiform]] | Leaf-blade base classification in taxonomic floras (e.g., *Tilia cordata*). |
| **Ethics & Positive Psychology** | [[courage]], [[encourage]], [[discourage]] | Moral fortitude under adversity, teacher encouragement, psychological resilience. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accord]] | noun | **1.** Harmony of people's opinions or actions or characters.<br>**2.** Concurrence of opinion. | *"For your father’s remembrance, be at accord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accordance]] | noun | **1.** Concurrence of opinion.<br>**2.** The act of granting rights. | *"Everything is ready for you, Esther,” said Miss Donny, “and the scheme of your pursuits has been arranged in exact accordance with the wishes of your guardian, Mr."* — Charles Dickens, *Bleak House* |
| [[accordant]] | adjective | **1.** Being in agreement or harmony; often followed by `with'; -thomas hardy.<br>**2.** In keeping. | *"Both gentlemen had a glance at Fanny, to see if a word of accordant praise could be extorted from her; yet both feeling that it could not be."* — Jane Austen, *Mansfield Park* |
| [[according]] | verb | **1.** Go together.<br>**2.** Allow to have. | *"I press in here, sir, amongst the rest of the country copulatives, to swear and to forswear according as marriage binds and blood breaks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accordingly]] | adverb | **1.** (sentence connectors) because of the reason given.<br>**2.** In accordance with. | *"I do assure you, my lord, he is very great in knowledge, and accordingly valiant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accordion]] | noun | **1.** A portable box-shaped free-reed instrument; the reeds are made to vibrate by air from the bellows controlled by the player. | *"An accordion began to whine like a tinker."* — Donn Byrne, *The Wind Bloweth* |
| [[accordionist]] | noun | **1.** A musician who plays the accordion. | *"In academic literature, accordionist designates a musician who plays the accordion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concord]] | noun | **1.** Capital of the state of new hampshire; located in south central new hampshire on the merrimack river.<br>**2.** A harmonious state of things in general and of their properties (as of colors and sounds); congruity of parts with one another and with the whole. | *"Nay, had I power, I should Pour the sweet milk of concord into hell, Uproar the universal peace, confound All unity on earth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concordance]] | noun | **1.** A harmonious state of things in general and of their properties (as of colors and sounds); congruity of parts with one another and with the whole.<br>**2.** Agreement of opinions. | *"The weight of the insect was very remarkable, and, taking all things into consideration, I could hardly blame Jupiter for his opinion respecting it; but what to make of Legrand’s concordance with that opinion, I could not, for the life of me, tell."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[concordant]] | adjective | **1.** In keeping.<br>**2.** Being of the same opinion. | *"That it cried, How true a twain Seemeth this concordant one!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concordat]] | noun | **1.** A signed written agreement between two or more parties (nations) to perform some action. | *"In academic literature, concordat designates a signed written agreement between two or more parties (nations) to perform some action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cord]] | noun | **1.** A line made of twisted fibers or threads.<br>**2.** A unit of amount of wood cut for burning; 128 cubic feet. | *"O, the charity of a penny cord!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cordage]] | noun | **1.** The amount of wood in an area as measured in cords.<br>**2.** The ropes in the rigging of a ship. | *"The sea was heaving under a thick white fog; and nothing else was moving but a few early ropemakers, who, with the yarn twisted round their bodies, looked as if, tired of their present state of existence, they were spinning themselves into cordage."* — Charles Dickens, *Bleak House* |
| [[cordaitaceae]] | noun | **1.** Chiefly paleozoic plants; cordaites is the chief and typical genus. | *"In academic literature, cordaitaceae designates chiefly paleozoic plants; cordaites is the chief and typical genus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordaitales]] | noun | **1.** Extinct plants having tall arborescent trunks comparable to or more advanced than cycads; known from the pennsylvanian period; probably extinct since the mesozoic era. | *"In academic literature, cordaitales designates extinct plants having tall arborescent trunks comparable to or more advanced than cycads; known from the pennsylvanian period; probably extinct since the mesozoic era."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordaites]] | noun | **1.** Tall paleozoic trees superficially resembling modern screw pines; structurally intermediate in some ways between cycads and conifers. | *"In academic literature, cordaites designates tall paleozoic trees superficially resembling modern screw pines; structurally intermediate in some ways between cycads and conifers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordarone]] | noun | **1.** An antiarrhythmic drug (trade name cordarone) that has potentially fatal side effects and is used to control serious heart rhythm problems only when safer agents have been ineffective. | *"In academic literature, cordarone designates an antiarrhythmic drug (trade name cordarone) that has potentially fatal side effects and is used to control serious heart rhythm problems only when safer agents have been ineffective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordate]] | adjective | **1.** (of a leaf) shaped like a heart. | *"In academic literature, cordate designates (of a leaf) shaped like a heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corday]] | noun | **1.** French revolutionary heroine (a girondist) who assassinated marat (1768-1793). | *"In academic literature, corday designates french revolutionary heroine (a girondist) who assassinated marat (1768-1793)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corded]] | verb | **1.** Stack in cords.<br>**2.** Bind or tie with a cord. | *"This night he meaneth with a corded ladder To climb celestial Silvia’s chamber window, Myself in counsel, his competitor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cordia]] | noun | **1.** Tropical deciduous or evergreen trees or shrubs of the family boraginaceae. | *"In academic literature, cordia designates tropical deciduous or evergreen trees or shrubs of the family boraginaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordial]] | noun | **1.** Strong highly flavored sweet liquor usually drunk after a meal.<br>**2.** Diffusing warmth and friendliness. | *"I do not know What is more cordial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cordiality]] | noun | **1.** A cordial disposition. | *"Bucket with extreme cordiality."* — Charles Dickens, *Bleak House* |
| [[cordially]] | adverb | **1.** In a hearty manner. | *"Maxa's first impulse was to withdraw with an excuse, but the ladies had jumped up already and most cordially greeted their kind friend, Mr Falcon, whom they called their helper and saviour in all difficulties."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[cordierite]] | noun | **1.** A blue mineral of magnesium and iron and aluminum and silicon and oxygen; often used as a gemstone. | *"In academic literature, cordierite designates a blue mineral of magnesium and iron and aluminum and silicon and oxygen; often used as a gemstone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordiform]] | adjective | **1.** (of a leaf) shaped like a heart. | *"In academic literature, cordiform designates (of a leaf) shaped like a heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordite]] | noun | **1.** Explosive powder (nitroglycerin and guncotton and petrolatum) dissolved in acetone and dried and extruded in brown cords. | *"Ever shoot with a cordite rifle?" Bernard shook his head."* — Anthony Pryde, *Nightfall* |
| [[corditis]] | noun | **1.** Inflammation of the spermatic cord. | *"In academic literature, corditis designates inflammation of the spermatic cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordless]] | adjective | **1.** Not having a cord. | *"In academic literature, cordless designates not having a cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordoba]] | noun | **1.** The basic unit of money in nicaragua; equal to 100 centavos.<br>**2.** Spanish explorer who discovered yucatan (1475-1526). | *"In academic literature, cordoba designates the basic unit of money in nicaragua; equal to 100 centavos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordon]] | noun | **1.** A series of sentinels or of military posts enclosing or guarding some place or thing.<br>**2.** Cord or ribbon worn as an insignia of honor or rank. | *"He turned his back and addressed the head man of the village while his six silken satellites made a cordon between us."* — Jack London, *The Jacket (The Star-Rover)* |
| [[cordova]] | noun | **1.** Spanish explorer who discovered yucatan (1475-1526).<br>**2.** A city in southern spain; center of moorish culture. | *"It is in any case truer than Mommsen's description of Cicero. [Sidenote: Seneca's early life] Seneca was born at Cordova in Spain about the Christian era--certainly not long before it."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[cordovan]] | noun | **1.** A fine leather originally made in cordoba, spain. | *"While the crowd still sways and surges, Ere the applauding shouts have ceas'd, See, the second bull emerges-- 'Tis the famed Cordovan beast,-- By the picador ungoaded, Scathless of the chulo's dart."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[cords]] | noun | **1.** Cotton trousers made of corduroy cloth.<br>**2.** A line made of twisted fibers or threads. | *"Within this hour I was his bondman, sir, But he, I thank him, gnaw’d in two my cords."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corduroy]] | noun | **1.** A cut pile fabric with vertical ribs; usually made of cotton.<br>**2.** A road made of logs laid crosswise. | *"Like all boys of his class, his usual dress was a brown velveteen jacket and waistcoat and corduroy trousers that had once been white."* — John Cairns, *Principal Cairns* |
| [[corduroys]] | noun | **1.** Cotton trousers made of corduroy cloth.<br>**2.** A cut pile fabric with vertical ribs; usually made of cotton. | *"In the same early morning, I discovered a singular affinity between seeds and corduroys."* — Charles Dickens, *Great Expectations* |
| [[cordylidae]] | noun | **1.** Small family of spiny ovoviviparous african lizards. | *"In academic literature, cordylidae designates small family of spiny ovoviviparous african lizards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordyline]] | noun | **1.** Asiatic and pacific trees or shrubs; fragments of the trunk will regrow to form whole plants. | *"In academic literature, cordyline designates asiatic and pacific trees or shrubs; fragments of the trunk will regrow to form whole plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cordylus]] | noun | **1.** Type genus of the cordylidae; spiny lizards somewhat resembling tiny crocodiles. | *"In academic literature, cordylus designates type genus of the cordylidae; spiny lizards somewhat resembling tiny crocodiles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disaccord]] | verb | **1.** Be different from one another. | *"In academic literature, disaccord designates be different from one another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discord]] | noun | **1.** Lack of agreement or harmony.<br>**2.** Disagreement among those expected to cooperate. | *"If he, compact of jars, grow musical, We shall have shortly discord in the spheres."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discordance]] | noun | **1.** A harsh mixture of sounds.<br>**2.** Strife resulting from a lack of agreement. | *"As they sit listening to the solemn swell, the confidence of last night rises in young Edwin Drood’s mind, and he thinks how unlike this music is to that discordance."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[discordant]] | adjective | **1.** Not in agreement or harmony.<br>**2.** Lacking in harmony. | *"Rumour is a pipe Blown by surmises, jealousies, conjectures, And of so easy and so plain a stop That the blunt monster with uncounted heads, The still-discordant wav’ring multitude, Can play upon it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discordantly]] | adverb | **1.** In a discordant manner. | *"The lesson at last came to an end, after proceeding as discordantly as possible; and when the little girl had changed her shoes and had had her white muslin extinguished in shawls, she was taken away."* — Charles Dickens, *Bleak House* |
| [[precordial]] | adjective | **1.** In front of the heart; involving the precordium. | *"In academic literature, precordial designates in front of the heart; involving the precordium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precordium]] | noun | **1.** The external surface of the body overlying the heart and stomach. | *"In academic literature, precordium designates the external surface of the body overlying the heart and stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prerecord]] | verb | **1.** Record before presentation, as of a broadcast. | *"In academic literature, prerecord designates record before presentation, as of a broadcast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prerecorded]] | verb | **1.** Record before presentation, as of a broadcast.<br>**2.** Recorded at one time for transmission later. | *"In academic literature, prerecorded designates record before presentation, as of a broadcast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[record]] | noun | **1.** Anything (such as a document or a phonograph record or a photograph) providing permanent evidence of or information about past events.<br>**2.** Sound recording consisting of a disk with a continuous groove; used to reproduce music by rotating while a phonograph needle tracks in the groove. | *"O that record could with a backward look, Even of five hundred courses of the sun, Show me your image in some antique book, Since mind at first in character was done."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recorded]] | verb | **1.** Make a record of; set down in permanent form.<br>**2.** Register electronically. | *"I will fetch my gold and have our two wagers recorded."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recorder]] | noun | **1.** Equipment for making records.<br>**2.** Someone responsible for keeping records. | *"Indeed he hath played on this prologue like a child on a recorder; a sound, but not in government."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recording]] | noun | **1.** A signal that encodes something (e.g., picture or sound) that has been recorded.<br>**2.** The act of making a record (especially an audio record). | *"Is Richard a monster in all this, or would Chancery be found rich in such precedents too if they could be got for citation from the Recording Angel?"* — Charles Dickens, *Bleak House* |
| [[uncordial]] | adjective | **1.** Lacking warmth or friendliness. | *"In academic literature, uncordial designates lacking warmth or friendliness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrecorded]] | adjective | **1.** Actually being performed at the time of hearing or viewing. | *"For in their succorless empty-handedness, they, in the heathenish sharked waters, and by the beaches of unrecorded, javelin islands, battled with virgin wonders and terrors that Cooke with all his marines and muskets would not willingly have dared."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CORD
  </div>
</div>
