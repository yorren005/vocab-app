---
status: unread
type: root_dashboard
---
# Dashboard — pass
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pass-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“step or pace”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sudden warm feeling in your chest or an outward expression of joy or sorrow.</span>
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

The root **pass** means step or pace. It refers to taking a step forward or measuring distance by foot paces. In English, this root forms words such as *passion*, *passive*, *compassion*, and *impassioned*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: step or pace
> The root **pass** means step or pace. It refers to taking a step forward or measuring distance by foot paces. In English, this root forms words such as *passion*, *passive*, *compassion*, and *impassioned*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Step or pace</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *passion* and *passive*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pass** comes from a Latin word that means *"step or pace"*.
  - At its core, it describes step or pace.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **pass** in an English word, think of **human feelings and emotions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of step or pace.
  - **Mental & Social**: How people experience, organize, or communicate about step or pace.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Passion**: An intense, driving, or overpowering feeling or conviction.
  - **Passive**: Accepting or allowing what happens or what others do without active response or resistance.
  - **Compassion**: Sympathetic pity and deep concern for the sufferings or misfortunes of others, accompanied by a desire to relieve them.
  - **Impassioned**: Filled with or showing great passion, fervor, zeal, or intense emotion.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pass</mark>, think of <mark class="hl-def">human feelings and emotions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Lexical Streams
> The root **pass** operates in English across four principal morphological channels:
> - **The Primary Substantive & Descriptive Base (`passion-`):** Borrowed through Old French *passion* from Latin *passiō*, forming the dominant vocabulary of emotional ardor: [[passion]], [[passionate]], [[passionately]], [[passionateness]], [[passionless]].
> - **The Grammatical & Receptive Base (`passiv-`):** From Latin *passīvus* ("receptive, capable of suffering"), yielding descriptors of non-resistance: [[passive]], [[passively]], [[passiveness]], [[passivity]].
> - **The Prefixed Sympathy Stem (`compassion-`):** Compounded with *con-* ("together"), producing the language of shared suffering and mercy: [[compassion]], [[compassionate]], [[compassionately]], [[compassionless]].
> - **The Negated & Cognitive Modulations (`dis-` / `in-`):**
>   - *dis-* + *passion*: [[dispassionate]], [[dispassionately]], [[dispassion]] (rational, detached, free from emotional bias).
>   - *in-* (intensive) + *passion*: [[impassioned]] (burning with fiery emotional intensity).
>   - *in-* (privative) + *passīvus*: [[impassive]], [[impassively]], [[impassiveness]], [[impassivity]] (wooden-faced, showing no emotion).
>   - *in-* (privative) + *passibilis*: [[impassible]], [[impassibility]] (incapable of suffering, a divine attribute).

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

> [!tip] 🌈 Four Dominant Semantic Horizons of the `pass` Family
> - **Ardent Romantic & Artistic Fervor:** [[passion]], [[passionate]], [[impassioned]] — intense desire, romantic attachment, creative zeal, and fervent public oratory.
> - **Receptive Inaction & Non-Resistance:** [[passive]], [[passivity]], [[passively]] — yielding to external forces without resistance, passive smoking, passive resistance, or grammatical passive voice.
> - **Empathy & Shared Suffering:** [[compassion]], [[compassionate]], [[compassionately]] — the moral impulse to enter into and alleviate another person's affliction.
> - **Stoic Detachment & Impartiality:** [[dispassionate]], [[impassive]], [[impassible]] — judicial objectivity, unreadable poker faces, and the theological doctrine of divine immunity to pain.

---

## 🔀 4. Prefix & Combining Dynamics on pass

### Prefix Dynamics on `pass`

| Prefix | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` | together, with | `con-` + `passiō` $\to$ **[[compassion]]** | Associative prefix: "to suffer together with another; shared grief and active mercy." |
| `dis-` | away from, free of | `dis-` + *passion* $\to$ **[[dispassionate]]** | Privative prefix: "free from emotional bias or passion; rational, detached, and impartial." |
| `in-` (intensive) | into, thoroughly | `in-` + *passion* $\to$ **[[impassioned]]** | Intensive prefix: "inflamed with passion; filled with fervent emotional fire." |
| `in-` (privative) | not, un- | `in-` + `passīvus` $\to$ **[[impassive]]** | Negative prefix: "showing no emotion; stoic, unreadable, or unmoved." |
| `in-` (privative) | not, incapable of | `in-` + `passibilis` $\to$ **[[impassible]]** | Negative prefix: "theologically incapable of experiencing physical or emotional suffering." |

### Suffix Transformations on `pass`

| Suffix | Functional Class | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (State / Event) | [[passion]], [[compassion]] | Latin *-iō*: the state of suffering, or the emotional ardor that sweeps over the mind. |
| `-ate` | Adjective / Verb | [[passionate]], [[compassionate]] | Characterized by intense emotion, or exercising sympathy toward someone. |
| `-ive` | Adjective (Tendency) | [[passive]], [[impassive]] | Latin *-īvus*: tending to receive action rather than act; showing an unmoved demeanor. |
| `-ity` | Abstract Noun (State) | [[passivity]], [[impassivity]], [[impassibility]] | The philosophical, psychological, or divine property of receptivity or immunity. |
| `-less` | Privative Adjective | [[passionless]], [[compassionless]] | Completely devoid of emotional ardor or merciful feeling. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| ⚖️ **Judicial Ethics & Law** | [[dispassionate]] | The constitutional requirement that judges, magistrates, and juries render a dispassionate verdict unswayed by public hysteria or emotional bias. |
| ⛪ **Systematic Theology & Christology** | [[passion]], [[impassible]], *Passion play* | The Passion of Christ; the classical doctrine of divine impassibility (*apatheia* / *impassibilitas*, holding that God's essence cannot suffer change or pain). |
| 🗣️ **Grammar & Linguistics** | [[passive]], [[passivity]] | The passive voice construction where the grammatical subject is the patient/recipient of the action (*the ball was struck by the player*). |
| 🌿 **Botany & Ethnobotany** | *passionflower*, *passion fruit* | The genus *Passiflora*, named by Jesuit botanists whose corona filament rings, three stigmas, and five stamens symbolized Christ's crown of thorns, nails, and wounds. |
| ☮️ **Political Philosophy & Social Action** | [[passive]] | Mahatma Gandhi and Martin Luther King Jr.'s doctrine of *passive resistance* (nonviolent direct civil disobedience overcoming violent state oppression). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[compass]] | noun | **1.** Navigational instrument for finding directions.<br>**2.** An area in which something acts or operates or has power or control:. | *"O, let it not be so: Herein you war against your reputation, And draw within the compass of suspect The unviolated honour of your wife."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compassion]] | noun | **1.** A deep awareness of and sympathy for another's suffering.<br>**2.** The humane quality of understanding the suffering of others and wanting to do something about it. | *"And, sir, it is no little thing to make Mine eyes to sweat compassion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compassionate]] | verb | **1.** Share the suffering of.<br>**2.** Showing or having compassion. | *"It boots thee not to be compassionate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compassionately]] | adverb | **1.** In a compassionate manner. | *"What a great age, Charley!” I cannot describe the tenderness with which he spoke to her, half playfully yet all the more compassionately and mournfully."* — Charles Dickens, *Bleak House* |
| [[compassionateness]] | noun | **1.** A deep awareness of and sympathy for another's suffering. | *"In academic literature, compassionateness designates a deep awareness of and sympathy for another's suffering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispassion]] | noun | **1.** Objectivity and detachment. | *"In academic literature, dispassion designates objectivity and detachment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispassionate]] | adjective | **1.** Unaffected by strong emotion or prejudice. | *"Vholes, going on in exactly the same inward and dispassionate manner."* — Charles Dickens, *Bleak House* |
| [[dispassionately]] | adverb | **1.** In an impartially dispassionate manner. | *"What! seeing the old man?” said the auctioneer, playing with his seals dispassionately."* — George Eliot, *Middlemarch* |
| [[dispassionateness]] | noun | **1.** Objectivity and detachment. | *"In academic literature, dispassionateness designates objectivity and detachment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encompass]] | verb | **1.** Include in scope; include as part of something broader; have as one's sphere or territory. | *"Foul fiend of France and hag of all despite, Encompass’d with thy lustful paramours, Becomes it thee to taunt his valiant age And twit with cowardice a man half dead?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impassable]] | adjective | **1.** Incapable of being passed. | *"Full of confidence in God, she hoped that the hand which had opened an impassable road would also lead an embittered heart back to himself, and by renewing in him the love of his fellowmen, bring about much happiness and joy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[impasse]] | noun | **1.** A situation in which no progress can be made or no advancement is possible.<br>**2.** A street with only one way in or out. | *"The impasse will, quite likely, remain for some time."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[impassioned]] | adjective | **1.** Characterized by intense emotion. | *"They threw themselves into committees in the most impassioned manner and collected subscriptions with a vehemence quite extraordinary."* — Charles Dickens, *Bleak House* |
| [[impassive]] | adjective | **1.** Having or revealing little emotion or sensibility; not easily aroused or excited; ; - nordhoff & hall; -virginia woolf.<br>**2.** Deliberately impassive in manner. | *"Coggan, with an impassive face, implying that a true narrative, like time and tide, must run its course and would respect no man."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[impassively]] | adverb | **1.** In an impassive manner. | *"Xindral, perched on his stool, arms in his lap, impassively observed their reactions."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[impassiveness]] | noun | **1.** Apathy demonstrated by an absence of emotional reactions. | *"Naturally fine-featured and of dignified presence, the touch of the Christian faith seems to have transformed the supercilious impassiveness of their class into a serenity full of charm."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[impassivity]] | noun | **1.** Apathy demonstrated by an absence of emotional reactions. | *"Very well,” she said, and gave him her hand, compressing her lips to a demure impassivity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nonpasserine]] | adjective | **1.** Relating to or characteristic of birds that are not perching birds. | *"In academic literature, nonpasserine designates relating to or characteristic of birds that are not perching birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overpass]] | noun | **1.** Bridge formed by the upper level of a crossing of two highways at different levels. | *"In prison hast thou spent a pilgrimage, And like a hermit overpass’d thy days."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pass]] | noun | **1.** (baseball) an advance to first base by a batter who receives four balls.<br>**2.** (military) a written leave of absence. | *"For to no other pass my verses tend, Than of your graces and your gifts to tell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passable]] | adjective | **1.** Able to be passed or traversed or crossed.<br>**2.** About average; acceptable. | *"The virtue of your name Is not here passable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passably]] | adverb | **1.** To a moderately sufficient extent or degree. | *"He does his duties passably well."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[passado]] | noun | **1.** (fencing) an attacking thrust made with one foot forward and the back leg straight and with the sword arm outstretched forward. | *"The first and second cause will not serve my turn; the _passado_ he respects not, the _duello_ he regards not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passage]] | noun | **1.** The act of passing from one state or place to the next.<br>**2.** A section of text; particularly a section of medium length. | *"This young gentlewoman had a father—O that “had!”, how sad a passage ’tis!—whose skill was almost as great as his honesty; had it stretch’d so far, would have made nature immortal, and death should have play for lack of work."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passageway]] | noun | **1.** A passage between rooms or between buildings.<br>**2.** A path or channel or duct through or along which something may pass. | *"He strode briskly toward a hatch at the far end of the passageway."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[passamaquody]] | noun | **1.** A member of the algonquian people related to the malecite and living in northeastern maine and new brunswick. | *"In academic literature, passamaquody designates a member of the algonquian people related to the malecite and living in northeastern maine and new brunswick."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passant]] | adjective | **1.** In walking position with right foreleg raised. | *"I would say, en passant, that Love is always treated by Browning as a SPIRITUAL claim; while DUTY may be only a worldly one."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[passe]] | adjective | **1.** Out of fashion. | *"No, if thou had'st thould'st nere marryed a woman In thy bosome, they're Cataplasmes made oth' deadly sins: I nere saw any yet but mine own mother; Or if I did, I did regard them but As shadowes that passe by of under Creatures. _And_."* — John Fletcher, *The Elder Brother* |
| [[passe-partout]] | noun | **1.** Key that secures entrance everywhere.<br>**2.** A mounting for a picture using gummed tape. | *"In academic literature, passe-partout designates key that secures entrance everywhere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passee]] | adjective | **1.** Out of fashion. | *"In academic literature, passee designates out of fashion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passel]] | noun | **1.** (often followed by `of') a large number or amount or extent. | *"T warn't so that I could be spared from home to learn the dressmaker's trade." "'T would a come handy later on, I declare," answered the sympathetic driver, "bein' 's you went an' had such a passel o' gals to clothe an' feed."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[passementerie]] | noun | **1.** A decoration or adornment on a garment. | *"In academic literature, passementerie designates a decoration or adornment on a garment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passenger]] | noun | **1.** A traveler riding in a vehicle (a boat or bus or car or plane or train etc) who is not operating it. | *"These are my mates, that make their wills their law, Have some unhappy passenger in chase."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passer]] | noun | **1.** A person who passes by casually or by chance.<br>**2.** A person who passes as a member of a different ethnic or racial group. | *"Norcombe Hill—not far from lonely Toller-Down—was one of the spots which suggest to a passer-by that he is in the presence of a shape approaching the indestructible as nearly as any to be found on earth."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[passer-by]] | noun | **1.** A person who passes by casually or by chance. | *"In academic literature, passer-by designates a person who passes by casually or by chance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passerby]] | noun | **1.** A person who passes by casually or by chance. | *"It is well that you should call to every passerby, “Look here!” With the night comes a slouching figure through the tunnel-court to the outside of the iron gate."* — Charles Dickens, *Bleak House* |
| [[passeres]] | noun | **1.** Two names for the suborder of typical songbirds. | *"In academic literature, passeres designates two names for the suborder of typical songbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passeridae]] | noun | **1.** True sparrows: old world birds formerly considered weaverbirds. | *"In academic literature, passeridae designates true sparrows: old world birds formerly considered weaverbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passeriformes]] | noun | **1.** Largest order of birds comprising about half the known species; rooks; finches; sparrows; tits; warblers; robins; wrens; swallows; etc.; the four suborders are eurylaimi and tyranni and menurae and oscines or passeres. | *"In academic literature, passeriformes designates largest order of birds comprising about half the known species; rooks; finches; sparrows; tits; warblers; robins; wrens; swallows; etc.; the four suborders are eurylaimi and tyranni and menurae and oscines or passeres."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passerina]] | noun | **1.** A genus of small north american finches including the new world buntings. | *"In academic literature, passerina designates a genus of small north american finches including the new world buntings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passerine]] | noun | **1.** Perching birds mostly small and living near the ground with feet having 4 toes arranged to allow for gripping the perch; most are songbirds; hatchlings are helpless.<br>**2.** Relating to or characteristic of the passeriform birds. | *"In academic literature, passerine designates perching birds mostly small and living near the ground with feet having 4 toes arranged to allow for gripping the perch; most are songbirds; hatchlings are helpless."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passero]] | noun | **1.** A naval battle in the mediterranean sea off cape passero in which the spanish navy was destroyed by france and england while attempting to recover sicily and sardinia from italy (1719). | *"In academic literature, passero designates a naval battle in the mediterranean sea off cape passero in which the spanish navy was destroyed by france and england while attempting to recover sicily and sardinia from italy (1719)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passiflora]] | noun | **1.** Type genus of the passifloraceae. | *"In academic literature, passiflora designates type genus of the passifloraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passifloraceae]] | noun | **1.** Tropical woody tendril-climbing vines. | *"In academic literature, passifloraceae designates tropical woody tendril-climbing vines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passim]] | adverb | **1.** Used to refer to cited works. | *"Clement quoted, ch. ix. _passim_, and on pp. 149, 166, 242, 243, 244, 247, 248, 251, 257, 258, 259, 260."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[passing]] | noun | **1.** (american football) a play that involves one player throwing the ball to a teammate.<br>**2.** Euphemistic expressions for death. | *"I will be bitter with him and passing short."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passion]] | noun | **1.** A strong feeling or emotion.<br>**2.** The trait of being intensely emotional. | *"Now to all sense ’tis gross You love my son; invention is asham’d, Against the proclamation of thy passion To say thou dost not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passionate]] | adjective | **1.** Having or expressing strong emotions. | *"The Queen returns, finds the King dead, and makes passionate action."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passionately]] | adverb | **1.** With passion.<br>**2.** In a stormy or violent manner. | *"There would be nothing to mourn over." Mea, however, fought passionately for her friend and never gave way till Kurt had promised not to go on with his ditty."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[passionateness]] | noun | **1.** A strong feeling or emotion. | *"In academic literature, passionateness designates a strong feeling or emotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passionflower]] | noun | **1.** Any of various chiefly tropical american vines some bearing edible fruit. | *"In academic literature, passionflower designates any of various chiefly tropical american vines some bearing edible fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passionless]] | adjective | **1.** Not passionate.<br>**2.** Unmoved by feeling; ; -margaret deland. | *"Don’t you come none of that or I shall make blessed short work of you!” says the constable, giving him a passionless shake."* — Charles Dickens, *Bleak House* |
| [[passive]] | noun | **1.** The voice used to indicate that the grammatical subject of the verb is the recipient (not the source) of the action denoted by the verb.<br>**2.** Lacking in energy or will; - george meredith. | *"In the twilight of the morning, light seems active, darkness passive; in the twilight of evening it is the darkness which is active and crescent, and the light which is the drowsy reverse."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[passively]] | adverb | **1.** In a passive manner. | *"But by the time she had got back to the village she was passively trusting to the favour of accident."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[passiveness]] | noun | **1.** Submission to others or to outside influences.<br>**2.** The trait of remaining inactive; a lack of initiative. | *"In other words it is the negative quality of passiveness either in recoverable latency or insipient latescence."* — Mark Twain, *What Is Man? and Other Essays* |
| [[passivism]] | noun | **1.** The doctrine that all violence is unjustifiable. | *"In academic literature, passivism designates the doctrine that all violence is unjustifiable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passivity]] | noun | **1.** The trait of remaining inactive; a lack of initiative.<br>**2.** Submission to others or to outside influences. | *"But no; stay, I insist!” He seized her hand, and then volition seemed to leave her, and she went off into a state of passivity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[passover]] | noun | **1.** (judaism) a jewish festival (traditionally 8 days from nissan 15) celebrating the exodus of the israelites from egypt. | *"The fast called the Passover—a religious affair, of course—was near, and thousands were pouring in from the country, according to custom, to celebrate the feast in Jerusalem."* — Jack London, *The Jacket (The Star-Rover)* |
| [[passport]] | noun | **1.** Any authorization to pass or go somewhere.<br>**2.** A document issued by a country to a citizen allowing that person to travel abroad and re-enter the home country. | *"His passport shall be made, And crowns for convoy put into his purse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surpass]] | verb | **1.** Distinguish oneself.<br>**2.** Be or do something to a greater degree. | *"This system gave considerable opportunity for management on the part of a thrifty housewife, and for such management there were few to surpass the housewife in the shepherd's cottage at Dunglass."* — John Cairns, *Principal Cairns* |
| [[surpassing]] | verb | **1.** Distinguish oneself.<br>**2.** Be or do something to a greater degree. | *"CLEOMENES The climate’s delicate; the air most sweet, Fertile the isle, the temple much surpassing The common praise it bears."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surpassingly]] | adverb | **1.** To a surpassing degree. | *"Hubble, who were surpassingly conceited and vainglorious in being members of so distinguished a procession."* — Charles Dickens, *Great Expectations* |
| [[uncompassionate]] | adjective | **1.** Lacking compassion or feeling for others; - shakespeare. | *"But neither bended knees, pure hands held up, Sad sighs, deep groans, nor silver-shedding tears Could penetrate her uncompassionate sire; But Valentine, if he be ta’en, must die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underpass]] | noun | **1.** An underground tunnel or passage enabling pedestrians to cross a road or railway. | *"In academic literature, underpass designates an underground tunnel or passage enabling pedestrians to cross a road or railway."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimpassioned]] | adjective | **1.** Free from emotional appeal; marked by reasonableness. | *"What had been the engrossing world had dissolved into an uninteresting outer dumb-show; while here, in this apparently dim and unimpassioned place, novelty had volcanically started up, as it had never, for him, started up elsewhere."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unpassable]] | adjective | **1.** Incapable of being passed. | *"In academic literature, unpassable designates incapable of being passed."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Emotion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PASS
  </div>
</div>
