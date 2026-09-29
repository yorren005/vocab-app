---
status: unread
type: root_dashboard
---
# Dashboard — vol
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vol-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to wish or will”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A lightbulb turning on in your mind when an idea suddenly makes sense.</span>
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

The root **vol** means to wish or will. It refers to the sovereign faculty of will, conscious choice, and deliberate intent. In English, this root forms words such as *volunteer*, *voluntary*, *benevolent*, and *malevolent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to wish or will
> The root **vol** means to wish or will. It refers to the sovereign faculty of will, conscious choice, and deliberate intent. In English, this root forms words such as *volunteer*, *voluntary*, *benevolent*, and *malevolent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To wish or will</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *volunteer* and *voluntary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vol** comes from a Latin word that means *"to wish or will"*.
  - At its core, it describes the action of wish or will.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **vol** in an English word, think of **to wish or will**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to wish or will).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Volunteer**: A person who freely offers to perform a service, task, or military duty without pay or conscription.
  - **Voluntary**: Done, made, or given of one's own free choice without compulsion or legal obligation.
  - **Benevolent**: Characterized by or expressing goodwill, charitable kindness, and a desire to promote human happiness.
  - **Malevolent**: Having, exhibiting, or arising from intense ill will, spite, or a desire to inflict suffering upon others.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vol</mark>, think of <mark class="hl-def">to wish or will</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vol** functions through multiple classical and medieval morphological stems:
> - **Base Verbal Stem:** `vol-` / `vel-` (from *volō*, *velle*)
> - **Present Participial Stem:** `volent-` / `volen-` (*bene-volen-t*, *male-volen-t*, *nolens volens*)
> - **Nominal Abstract Stem:** `voluntāt-` $\to$ `voluntar-` (from *voluntās, voluntātis* $\to$ *voluntar-y*, *in-voluntar-y*, *voluntar-ism*)
> - **Scholastic Participial / Nominal Stem:** `volit-` (from Medieval Latin *volitiō* $\to$ *volit-ion*, *volit-ional*, *volit-ive*)
> - **Syncopated Pleasure Stem:** `volupt-` (from *voluptās* $\to$ *volupt-uous*, *volupt-uary*)
> - **French Agentive Shift:** Old French *volontaire* entered English as the military and civic agent **volunteer**.

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
> Across English, `vol` organizes into five fundamental operational categories:
> - **The Faculty of Choice & Philosophy of Action:** [[volition]], [[volitional]], [[volitionally]], [[volitive]], [[voluntarism]] examine the metaphysical and cognitive reality of conscious agency and intentionality.
> - **Free Will vs. Physiological Autonomy:** [[voluntary]], [[voluntarily]], [[involuntary]], [[involuntarily]] delineate the critical boundary between actions initiated by conscious intent and autonomic muscular reflexes (e.g., cardiac pacing, blinking).
> - **Civic & Altruistic Service:** [[volunteer]], [[volunteering]], [[voluntariness]] describe unforced contribution to community, military defense, or philanthropic institutions.
> - **Moral Orientation Toward Others:** [[benevolent]], [[benevolence]], [[benevolently]], [[malevolent]], [[malevolence]], [[malevolently]] evaluate whether the human will is disposed toward compassionate charity or vindictive malice.
> - **Sensory Gratification & Hedonism:** [[voluptuous]], [[voluptuary]], [[voluptuousness]], [[voluptuously]] trace the satisfaction of sensual, physical, and aesthetic desires (*voluptas*).
> - **Unavoidable Compulsion:** [[nolens volens]] preserves the Latin idiom for action undertaken whether one is willing or unwilling.

---

## 🔀 4. Prefix & Combining Dynamics on vol

### Prefix & Compounding Element Synthesis

| Prefix / Element | Element Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **bene-** (Latin) | well, good | [[benevolent]] / [[benevolence]] | *bene* + *volēns* $\to$ actively wishing well to others; charitable, altruistic. |
| **male-** (Latin) | ill, badly, evil | [[malevolent]] / [[malevolence]] | *male* + *volēns* $\to$ actively wishing evil or harm to others; spiteful, malicious. |
| **in- (privative)** | not, un- | [[involuntary]] / [[involuntarily]] | *in-* + *voluntārius* $\to$ not originating from conscious will; automatic, reflex. |
| **nōlēns** (*ne-volēns*) | unwilling | [[nolens volens]] | *nōlēns volēns* $\to$ "unwilling or willing"; willy-nilly, by inescapable necessity. |

### Suffix Transformations

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ary** (Lat. *-ārius*) | Adjective / Noun formant | [[voluntary]], [[voluptuary]] | Pertaining to the exercise of will; or a person devoted to sensual pleasures. |
| **-ition** (Lat. *-itiō*) | Abstract noun of action | [[volition]] | The cognitive act or inherent faculty of exercising the will. |
| **-ism** / **-ist** | Doctrine / Adherent | [[voluntarism]], [[voluntarist]] | The philosophical stance emphasizing the supremacy of will; a subscriber thereto. |
| **-eer** (Fr. *-aire*) | Agent noun | [[volunteer]] | A person who offers services of their own free choice without coercion. |
| **-uous** (Lat. *-uōsus*) | Abounding in | [[voluptuous]] | Characterized by or dedicated to sensual delights and bodily pleasure. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Jurisprudence & Criminal Law** | [[voluntary]], [[involuntary]], [[volition]] | Voluntary manslaughter versus involuntary manslaughter, informed consent, coerced confessions. |
| **Neuroscience & Medicine** | [[voluntary]], [[involuntary]], [[volitional]] | Voluntary motor cortex control versus autonomic involuntary reflexes (peristalsis, pupillary constriction). |
| **Philosophy & Ethics** | [[volition]], [[voluntarism]], [[benevolence]], [[malevolence]] | The problem of free will versus determinism, Kantian good will, Utilitarian benevolence. |
| **Civic Society & Non-Profit Sector** | [[volunteer]], [[volunteering]], [[voluntary]], [[voluntariness]] | Non-governmental organizations (NGOs), volunteer disaster relief, blood donation drives. |
| **Literature, Art & Aesthetics** | [[voluptuous]], [[voluptuary]], [[malevolent]] | Depicting opulent Baroque drapery and Rubensian figures; characterizing sinister literary antagonists. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abvolt]] | noun | **1.** A unit of potential equal to one-hundred-millionth of a volt. | *"In academic literature, abvolt designates a unit of potential equal to one-hundred-millionth of a volt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[benevolence]] | noun | **1.** Disposition to do good.<br>**2.** An inclination to do kind or charitable acts. | *"If Sir John Falstaff have committed disparagements unto you, I am of the Church, and will be glad to do my benevolence to make atonements and compremises between you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[benevolent]] | adjective | **1.** Intending or showing kindness.<br>**2.** Showing or motivated by sympathy and understanding and generosity. | *"My dear, how you are trembling!” I could not help it; I tried very hard, but being alone with that benevolent presence, and meeting his kind eyes, and feeling so happy and so honoured there, and my heart so full—I kissed his hand."* — Charles Dickens, *Bleak House* |
| [[benevolently]] | adverb | **1.** In a benevolent manner. | *"Lydgate’s conceit was of the arrogant sort, never simpering, never impertinent, but massive in its claims and benevolently contemptuous."* — George Eliot, *Middlemarch* |
| [[circumvolute]] | verb | **1.** Wind or turn in volutions, especially in an inward spiral, as of snail. | *"In academic literature, circumvolute designates wind or turn in volutions, especially in an inward spiral, as of snail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumvolution]] | noun | **1.** The act of turning or winding or folding around a central axis. | *"Tell me, then, for you can, in what periphrasis of language, in what circumvolution of phrase, I shall envelope, yet not conceal, the plain story."* — Robert Burns, *The Letters of Robert Burns* |
| [[circumvolve]] | verb | **1.** Cause to turn on an axis or center. | *"In academic literature, circumvolve designates cause to turn on an axis or center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convolute]] | verb | **1.** Curl, wind, or twist together.<br>**2.** Practice sophistry; change the meaning of or be vague about in order to mislead or deceive. | *"It could be straight or as convoluted as a randomly configured corkscrew."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[convoluted]] | verb | **1.** Curl, wind, or twist together.<br>**2.** Practice sophistry; change the meaning of or be vague about in order to mislead or deceive. | *"It could be straight or as convoluted as a randomly configured corkscrew."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[convolution]] | noun | **1.** The shape of something rotating rapidly.<br>**2.** A convex fold or elevation in the surface of the brain. | *"Lying in strange folds, courses, and convolutions, to their apprehensions, it seems more in keeping with the idea of his general might to regard that mystic part of him as the seat of his intelligence."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[convolve]] | verb | **1.** Curl, wind, or twist together. | *"In academic literature, convolve designates curl, wind, or twist together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterrevolution]] | noun | **1.** A revolution whose aim is to reverse the changes introduced by a previous revolution. | *"In academic literature, counterrevolution designates a revolution whose aim is to reverse the changes introduced by a previous revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterrevolutionary]] | noun | **1.** A revolutionary whose aim is to reverse the changes introduced by an earlier revolution.<br>**2.** Relating to or being a counterrevolution. | *"In academic literature, counterrevolutionary designates a revolutionary whose aim is to reverse the changes introduced by an earlier revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterrevolutionist]] | noun | **1.** A revolutionary whose aim is to reverse the changes introduced by an earlier revolution. | *"In academic literature, counterrevolutionist designates a revolutionary whose aim is to reverse the changes introduced by an earlier revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devolution]] | noun | **1.** The process of declining from a higher to a lower level of effective power or vitality or essential quality.<br>**2.** The delegation of authority (especially from a central to a regional government). | *"Felix, though an offshoot from a far more recent point in the devolution of theology than his father, was less self-sacrificing and disinterested."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[devolve]] | verb | **1.** Pass on or delegate to another.<br>**2.** Be inherited by. | *"The Allens, he believed, had lived near them too long, and he knew the young man on whom the Fullerton estate must devolve."* — Jane Austen, *Northanger Abbey* |
| [[devolvement]] | noun | **1.** The delegation of authority (especially from a central to a regional government). | *"In academic literature, devolvement designates the delegation of authority (especially from a central to a regional government)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinvolve]] | verb | **1.** Free from involvement or entanglement. | *"In academic literature, disinvolve designates free from involvement or entanglement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evolution]] | noun | **1.** A process in which something passes by degrees to a different stage (especially a more advanced or mature stage).<br>**2.** (biology) the sequence of events involved in the evolutionary development of a species or taxonomic group of organisms. | *"But it’s well I never made that evolution of matrimony."* — Charles Dickens, *Bleak House* |
| [[evolutionarily]] | adverb | **1.** In an evolutionary way; from an evolutionary point of view. | *"In academic literature, evolutionarily designates in an evolutionary way; from an evolutionary point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evolutionary]] | adjective | **1.** Of or relating to or produced by evolution. | *"Cumulative genetic and accelerated evolutionary alterations to the human body along with the effects of unique, often hostile, environments plus sheer distance from the familiar transformed humans-in-space into something else."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[evolutionism]] | noun | **1.** (biology) a scientific theory of the origin of species of plants and animals. | *"In academic literature, evolutionism designates (biology) a scientific theory of the origin of species of plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evolutionist]] | noun | **1.** A person who believes in organic evolution. | *"In academic literature, evolutionist designates a person who believes in organic evolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evolve]] | verb | **1.** Work out.<br>**2.** Undergo development or evolution. | *"The superadded circumstance which would evolve the genius had not yet come; the universe had not yet beckoned."* — George Eliot, *Middlemarch* |
| [[involucrate]] | adjective | **1.** Having an involucre. | *"In academic literature, involucrate designates having an involucre."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[involucre]] | noun | **1.** A highly conspicuous bract or bract pair or ring of bracts at the base of an inflorescence. | *"If, by any means, the lobes of the involucre are any of them separated, the enclosed dust escapes, blackening the fingers and clothing of the collector, as if it were soot (Plate V. fig. 92)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[involuntarily]] | adverb | **1.** Against your will. | *"We think and know that she is the friendliest and most obliging child in school." "Long live Loneli!" Lux suddenly cheered so that the whole band involuntarily joined him."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[involuntariness]] | noun | **1.** The trait of being unwilling. | *"In academic literature, involuntariness designates the trait of being unwilling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[involuntary]] | adjective | **1.** Not subject to the control of the will; ; ; ; - john f.kennedy.<br>**2.** Controlled by the autonomic nervous system; without conscious control. | *"Do not dismiss me so soon, mademoiselle!” she said with an involuntary contraction of her fine black eyebrows."* — Charles Dickens, *Bleak House* |
| [[involute]] | adjective | **1.** Especially of petals or leaves in bud; having margins rolled inward.<br>**2.** (of some shells) closely coiled so that the axis is obscured. | *"In academic literature, involute designates especially of petals or leaves in bud; having margins rolled inward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[involution]] | noun | **1.** Reduction in size of an organ or part (as in the return of the uterus to normal size after childbirth).<br>**2.** A long and intricate and complicated grammatical construction. | *"Let there be no involution of thought and mind about it."* — Donn Byrne, *The Wind Bloweth* |
| [[involve]] | verb | **1.** Connect closely and often incriminatingly.<br>**2.** Engage as a participant. | *"These household cares involve much pattening and counter-pattening in the backyard and considerable use of a pail, which is finally so happy as to assist in the ablutions of Mrs."* — Charles Dickens, *Bleak House* |
| [[involved]] | verb | **1.** Connect closely and often incriminatingly.<br>**2.** Engage as a participant. | *"All this involved, no doubt, sufficient active exercise of pen and ink to make her daughter’s part in the proceedings anything but a holiday."* — Charles Dickens, *Bleak House* |
| [[involvement]] | noun | **1.** The act of sharing in the activities of a group.<br>**2.** A connection of inclusion or containment. | *"Drummer would not have knowingly accepted Scarf's involvement in the proceedings."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[malevolence]] | noun | **1.** Wishing evil to others.<br>**2.** The quality of threatening evil. | *"The son of Duncan, From whom this tyrant holds the due of birth, Lives in the English court and is receiv’d Of the most pious Edward with such grace That the malevolence of fortune nothing Takes from his high respect."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malevolency]] | noun | **1.** The quality of threatening evil. | *"In academic literature, malevolency designates the quality of threatening evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malevolent]] | adjective | **1.** Wishing or appearing to wish evil to others; arising from intense ill will or hatred.<br>**2.** Having or exerting a malignant influence. | *"This is his uncle’s teaching, this is Worcester, Malevolent to you in all aspects, Which makes him prune himself, and bristle up The crest of youth against your dignity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malevolently]] | adverb | **1.** In a malevolent manner. | *"Count Rostopchín writes that he will stake his life on it that the enemy will not enter Moscow.” “Oh, that count of yours!” said the princess malevolently."* — graf Leo Tolstoy, *War and Peace* |
| [[nonvolatile]] | adjective | **1.** Not volatilizing readily. | *"In academic literature, nonvolatile designates not volatilizing readily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonvolatilisable]] | adjective | **1.** Not volatilizing readily. | *"In academic literature, nonvolatilisable designates not volatilizing readily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonvolatilizable]] | adjective | **1.** Not volatilizing readily. | *"In academic literature, nonvolatilizable designates not volatilizing readily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonvoluntary]] | adjective | **1.** Not subject to the control of the will; ; ; ; - john f.kennedy. | *"In academic literature, nonvoluntary designates not subject to the control of the will; ; ; ; - john f.kennedy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revolt]] | noun | **1.** Organized opposition to authority; a conflict in which one faction tries to wrest control from another.<br>**2.** Make revolution. | *"Thou canst not vex me with inconstant mind, Since that my life on thy revolt doth lie, O what a happy title do I find, Happy to have thy love, happy to die!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revolting]] | verb | **1.** Make revolution.<br>**2.** Fill with distaste. | *"Comets, importing change of times and states, Brandish your crystal tresses in the sky, And with them scourge the bad revolting stars That have consented unto Henry’s death: King Henry the Fifth, too famous to live long!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revoltingly]] | adverb | **1.** In a disgusting manner or to a disgusting degree. | *"Here at present I felt afresh—for I had felt it again and again—how my equilibrium depended on the success of my rigid will, the will to shut my eyes as tight as possible to the truth that what I had to deal with was, revoltingly, against nature."* — Henry James, *The Turn of the Screw* |
| [[revolution]] | noun | **1.** A drastic and far-reaching change in ways of thinking and behaving.<br>**2.** The overthrow of a government by those who are governed. | *"That I might see what the old world could say, To this composed wonder of your frame, Whether we are mended, or whether better they, Or whether revolution be the same."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revolutionary]] | noun | **1.** A radical supporter of political or social revolution.<br>**2.** Markedly new or introducing radical change. | *"He entertains religious convictions of a curious kind; but, as the man is quite free from revolutionary sentiments, I have never considered it to be my duty to interfere with him, or to investigate his creed."* — Mrs. Oliphant, *A Beleaguered City* |
| [[revolutionise]] | verb | **1.** Fill with revolutionary ideas.<br>**2.** Change radically. | *"When an individual has revolutionised therapeutics by his discovery of the continuous evolution of brain-matter, conventional forms are unfitting, since they would seem to limit him to one of a class."* — Bram Stoker, *Dracula* |
| [[revolutionism]] | noun | **1.** A belief in the spread of revolutionary principles. | *"In academic literature, revolutionism designates a belief in the spread of revolutionary principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revolutionist]] | noun | **1.** A radical supporter of political or social revolution. | *"It is not what he plans; it is the effect, if his plans are achieved, that makes him a revolutionist."* — Jack London, *The Jacket (The Star-Rover)* |
| [[revolutionize]] | verb | **1.** Change radically.<br>**2.** Overthrow by a revolution, of governments. | *"On that occasion, Cook’s Court was in a manner revolutionized by the new inscription in fresh paint, PEFFER AND SNAGSBY, displacing the time-honoured and not easily to be deciphered legend PEFFER only."* — Charles Dickens, *Bleak House* |
| [[revolve]] | verb | **1.** Turn on or around an axis or a center.<br>**2.** Move in an orbit. | *"Consider, When you above perceive me like a crow, That it is place which lessens and sets off; And you may then revolve what tales I have told you Of courts, of princes, of the tricks in war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revolved]] | verb | **1.** Turn on or around an axis or a center.<br>**2.** Move in an orbit. | *"Clark, who, twenty years younger than Jan Coggan, revolved in the same orbit."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[revolver]] | noun | **1.** A pistol with a revolving cylinder (usually having six chambers for bullets).<br>**2.** A door consisting of four orthogonal partitions that rotate about a central pivot; a door designed to equalize the air pressure in tall buildings. | *"That was why Bernard offered him the agency--he was delighted to lend a helping hand to one of his old brother officers." "Wounded?" "Yes, he had his right arm smashed by a revolver bullet."* — Anthony Pryde, *Nightfall* |
| [[uninvolved]] | adjective | **1.** Not involved.<br>**2.** Showing lack of emotional involvement; - j.s.perelman. | *"In academic literature, uninvolved designates not involved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unvoluntary]] | adjective | **1.** Not subject to the control of the will; ; ; ; - john f.kennedy. | *"In academic literature, unvoluntary designates not subject to the control of the will; ; ; ; - john f.kennedy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volaille]] | noun | **1.** The flesh of a chicken used for food. | *"In academic literature, volaille designates the flesh of a chicken used for food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volans]] | noun | **1.** A small constellation in the polar region of the southern hemisphere near dorado and carina. | *"In academic literature, volans designates a small constellation in the polar region of the southern hemisphere near dorado and carina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volant]] | adjective | **1.** With wings extended in a flying position. | *"He bounds from the earth, as if his entrails were hairs; _le cheval volant_, the Pegasus, _qui a les narines de feu!_ When I bestride him, I soar, I am a hawk."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volapuk]] | noun | **1.** One of the first artificial language constructed for use as an auxiliary international language; based largely on english but with some german and french and latin roots. | *"In academic literature, volapuk designates one of the first artificial language constructed for use as an auxiliary international language; based largely on english but with some german and french and latin roots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volar]] | adjective | **1.** Relating to the palm of the hand or the sole of the foot. | *"In academic literature, volar designates relating to the palm of the hand or the sole of the foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volary]] | noun | **1.** A building where birds are kept. | *"In academic literature, volary designates a building where birds are kept."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatile]] | noun | **1.** A volatile substance; a substance that changes readily from solid or liquid to a vapor.<br>**2.** Evaporating readily at normal temperatures and pressures. | *"Yes, sir.” “Have you any salts—volatile salts?” “Yes.” “Go back and fetch both.” I returned, sought the sponge on the washstand, the salts in my drawer, and once more retraced my steps."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[volatilisable]] | adjective | **1.** (used of substances) capable of being volatilized. | *"In academic literature, volatilisable designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatilise]] | verb | **1.** Make volatile; cause to pass off in a vapor. | *"In addition, values in the form of volatilised metallic products are also conveyed by the gases, particularly when lead, zinc, arsenic, etc., are present in the furnace charge, and these are carried forward in the form of _fume_."* — Donald M. Levy, *Modern Copper Smelting* |
| [[volatilised]] | verb | **1.** Make volatile; cause to pass off in a vapor.<br>**2.** Converted into a gas or vapor. | *"In addition, values in the form of volatilised metallic products are also conveyed by the gases, particularly when lead, zinc, arsenic, etc., are present in the furnace charge, and these are carried forward in the form of _fume_."* — Donald M. Levy, *Modern Copper Smelting* |
| [[volatility]] | noun | **1.** The property of changing readily from a solid or liquid to a vapor.<br>**2.** The trait of being unpredictably irresolute. | *"Our importance, our respectability in the world, must be affected by the wild volatility, the assurance and disdain of all restraint which mark Lydia’s character."* — Jane Austen, *Pride and Prejudice* |
| [[volatilizable]] | adjective | **1.** (used of substances) capable of being volatilized. | *"In academic literature, volatilizable designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatilize]] | verb | **1.** Make volatile; cause to pass off in a vapor. | *"In academic literature, volatilize designates make volatile; cause to pass off in a vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatilized]] | verb | **1.** Make volatile; cause to pass off in a vapor.<br>**2.** Converted into a gas or vapor. | *"In academic literature, volatilized designates make volatile; cause to pass off in a vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volcanic]] | adjective | **1.** Relating to or produced by or consisting of volcanoes.<br>**2.** Explosively unstable. | *"The moon has eyed Tom with a dull cold stare, as admitting some puny emulation of herself in his desert region unfit for life and blasted by volcanic fires; but she has passed on and is gone."* — Charles Dickens, *Bleak House* |
| [[volcanically]] | adverb | **1.** By or like volcanoes. | *"What had been the engrossing world had dissolved into an uninteresting outer dumb-show; while here, in this apparently dim and unimpassioned place, novelty had volcanically started up, as it had never, for him, started up elsewhere."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[volcanism]] | noun | **1.** The phenomena associated with volcanic activity. | *"In academic literature, volcanism designates the phenomena associated with volcanic activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volcano]] | noun | **1.** A fissure in the earth's crust (or in the surface of some other planet) through which molten lava and gases erupt.<br>**2.** A mountain formed by volcanic material. | *"Smallweed, and bolts along the passage as if he had an acceptable commission to carry the old gentleman to the nearest volcano."* — Charles Dickens, *Bleak House* |
| [[volcanology]] | noun | **1.** The branch of geology that studies volcanoes. | *"In academic literature, volcanology designates the branch of geology that studies volcanoes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vole]] | noun | **1.** Any of various small mouselike rodents of the family cricetidae (especially of genus microtus) having a stout short-tailed body and inconspicuous ears and inhabiting fields or meadows. | *"Ah, Monsieur!" he would add--"ils m'ont affreusement vole." It was melancholy to hear his accents as he spoke of that catastrophe."* — William Makepeace Thackeray, *Vanity Fair* |
| [[volition]] | noun | **1.** The capability of conscious choice and decision and intention; - george meredith.<br>**2.** The act of making a choice. | *"But no; stay, I insist!” He seized her hand, and then volition seemed to leave her, and she went off into a state of passivity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[volitional]] | adjective | **1.** With deliberate intention. | *"So, according as the family income is from rents or from wages, the motives of the parents differ. [Sidenote: Motives in volitional control] Postponement of marriage must be classed as a mode of volitional control of population."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[volitionally]] | adverb | **1.** In a willing manner. | *"In academic literature, volitionally designates in a willing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volley]] | noun | **1.** Rapid simultaneous discharge of firearms.<br>**2.** A tennis return made by hitting the ball before it bounces. | *"The holding every man shall beat as loud As his strong sides can volley."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volleyball]] | noun | **1.** A game in which two teams hit an inflated ball over a high net using their hands.<br>**2.** An inflated ball used in playing volleyball. | *"In academic literature, volleyball designates a game in which two teams hit an inflated ball over a high net using their hands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volt]] | noun | **1.** A unit of potential equal to the potential difference between two points on a conductor carrying a current of 1 ampere when the power dissipated between the two points is 1 watt; equivalent to the potential difference across a resistance of 1 ohm when 1 ampere of current flows through it. | *"The hounds had scarcely been loosed before Nicholas heard one he knew, Voltórn, giving tongue at intervals; other hounds joined in, now pausing and now again giving tongue."* — graf Leo Tolstoy, *War and Peace* |
| [[volt-ampere]] | noun | **1.** A unit of electrical power in an ac circuit equal to the power dissipated when 1 volt produces a current of 1 ampere. | *"In academic literature, volt-ampere designates a unit of electrical power in an ac circuit equal to the power dissipated when 1 volt produces a current of 1 ampere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volta]] | noun | **1.** Italian physicist after whom the volt is named; studied electric currents and invented the voltaic pile (1745-1827).<br>**2.** A river in ghana that flows south to the bight of benin. | *"Then comes the "Electrophorus," an electrical instrument suggested by Volta, which was thought at the time a grand invention for the purpose of getting light (Fig. 6 A)."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[voltage]] | noun | **1.** The rate at which energy is drawn from a source that produces a flow of electricity in a circuit; expressed in volts.<br>**2.** The difference in electrical charge between two points in a circuit expressed in volts. | *"In this case what is wanted is to test the resistance of a circuit, and it is done by applying a battery, the voltage of which is known, and seeing how much current flows."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[voltaic]] | noun | **1.** A group of niger-congo languages spoken primarily in southeastern mali and northern ghana.<br>**2.** Pertaining to or producing electric current by chemical action. | *"ELECTROTYPING In 1799, Allesandro Volta, of Pavia, in Italy, constructed the first electric battery, which came to be called the Voltaic pile."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[voltaire]] | noun | **1.** French writer who was the embodiment of 18th century enlightenment (1694-1778). | *"He added later a very complete set of the writings of the English Deists, and the works of Voltaire, Rousseau, and Renan."* — John Cairns, *Principal Cairns* |
| [[voltarean]] | adjective | **1.** In the manner of voltaire. | *"In academic literature, voltarean designates in the manner of voltaire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voltaren]] | noun | **1.** A nonsteroidal anti-inflammatory drug (trade name voltaren) that is administered only orally. | *"In academic literature, voltaren designates a nonsteroidal anti-inflammatory drug (trade name voltaren) that is administered only orally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voltarian]] | adjective | **1.** In the manner of voltaire. | *"In academic literature, voltarian designates in the manner of voltaire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volte-face]] | noun | **1.** A major change in attitude or principle or point of view. | *"In academic literature, volte-face designates a major change in attitude or principle or point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voltmeter]] | noun | **1.** Meter that measures the potential difference between two points. | *"Construction of a Voltmeter 64 5."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[volubility]] | noun | **1.** The quality of being facile in speech and writing. | *"Pardiggle with great volubility after the first salutations, “are my five boys."* — Charles Dickens, *Bleak House* |
| [[voluble]] | adjective | **1.** Marked by a ready flow of speech. | *"If voluble and sharp discourse be marr’d, Unkindness blunts it more than marble hard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volubly]] | adverb | **1.** In a chatty manner. | *"What do you think of that for a fine bit of antithesis?” said the German, searching in his friend’s face for responding admiration, but going on volubly without waiting for any other answer."* — George Eliot, *Middlemarch* |
| [[volume]] | noun | **1.** The amount of 3-dimensional space occupied by an object.<br>**2.** The property of something that is great in magnitude. | *"Ay, as an ostler, that for th’ poorest piece Will bear the knave by th’ volume.—Th’ honoured gods Keep Rome in safety and the chairs of justice Supplied with worthy men!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volumed]] | adjective | **1.** (often used in combination) consisting of or having a given number or kind of volumes.<br>**2.** Formed or rising in rounded masses. | *"Theresa’s passionate, ideal nature demanded an epic life: what were many-volumed romances of chivalry and the social conquests of a brilliant girl to her?"* — George Eliot, *Middlemarch* |
| [[volumeter]] | noun | **1.** A meter to measure the volume of gases, liquids, or solids (either directly or by displacement). | *"In academic literature, volumeter designates a meter to measure the volume of gases, liquids, or solids (either directly or by displacement)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volumetric]] | adjective | **1.** Of or relating to measurement by volume. | *"In academic literature, volumetric designates of or relating to measurement by volume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volumetrical]] | adjective | **1.** Of or relating to measurement by volume. | *"In academic literature, volumetrical designates of or relating to measurement by volume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volumetrically]] | adverb | **1.** With respect to volume. | *"In academic literature, volumetrically designates with respect to volume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voluminosity]] | noun | **1.** Greatness of volume. | *"In academic literature, voluminosity designates greatness of volume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voluminous]] | adjective | **1.** Large in volume or bulk.<br>**2.** Marked by repeated turns and bends. | *"Opposite the spot to which he had brought her was such a general confluence, and the river was proportionately voluminous and deep."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[voluminousness]] | noun | **1.** Greatness of volume. | *"In academic literature, voluminousness designates greatness of volume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volund]] | noun | **1.** (norse mythology) a wonderful smith; identified with anglo-saxon wayland and teutonic wieland. | *"In academic literature, volund designates (norse mythology) a wonderful smith; identified with anglo-saxon wayland and teutonic wieland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voluntarily]] | adverb | **1.** Out of your own free will. | *"I should not be surprised if they all voluntarily abandoned the girl—yes, lover and all—instead of her abandoning them, supposing she remained at Chesney Wold under such circumstances.” “Well!” says Sir Leicester tremulously."* — Charles Dickens, *Bleak House* |
| [[voluntary]] | noun | **1.** (military) a person who freely enlists for service.<br>**2.** Composition (often improvised) for a solo instrument (especially solo organ) and not a regular part of a religious service or musical performance. | *"That is, the old Duke is banished by his younger brother the new Duke, and three or four loving lords have put themselves into voluntary exile with him, whose lands and revenues enrich the new Duke; therefore he gives them good leave to wander."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volunteer]] | noun | **1.** (military) a person who freely enlists for service.<br>**2.** A person who performs voluntary work. | *"End of "On the Improvement of the Understanding." Notes by Volunteer. 1."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[voluptuary]] | noun | **1.** A person addicted to luxury and pleasures of the senses.<br>**2.** Displaying luxury and furnishing gratification to the senses. | *"Bid the slave-merchant enter," says the Turkish voluptuary with a wave of his hand."* — William Makepeace Thackeray, *Vanity Fair* |
| [[voluptuous]] | adjective | **1.** Having strong sexual appeal.<br>**2.** (of a woman's body) having a large bosom and pleasing curves. | *"The voluptuous Tahitians are the only people who at all deserve to be compared with them; while the dark-haired Hawaiians and the woolly-headed Feejees are immeasurably inferior to them."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[voluptuously]] | adverb | **1.** In a shapely and voluptuous manner.<br>**2.** In an indulgently voluptuous manner. | *"Hear me profess sincerely: had I a dozen sons, each in my love alike and none less dear than thine and my good Martius, I had rather had eleven die nobly for their country than one voluptuously surfeit out of action."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[voluptuousness]] | noun | **1.** The quality of being attractive and exciting (especially sexually exciting).<br>**2.** The property of being lush and abundant and a pleasure to the senses. | *"If he filled His vacancy with his voluptuousness, Full surfeits and the dryness of his bones Call on him for’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volute]] | noun | **1.** Ornament consisting of a curve on a plane that winds around a center with an increasing distance from the center.<br>**2.** A structure consisting of something wound in a continuous series of loops. | *"The electric light flooded everything; it was shed from four unpolished globes half sunk in the volutes of the ceiling."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[voluted]] | adjective | **1.** In the shape of a coil. | *"In academic literature, voluted designates in the shape of a coil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volution]] | noun | **1.** A rolling or revolving motion. | *"In academic literature, volution designates a rolling or revolving motion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Mind & Knowledge]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VOL
  </div>
</div>
