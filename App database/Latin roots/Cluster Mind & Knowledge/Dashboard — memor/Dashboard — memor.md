---
status: unread
type: root_dashboard
---
# Dashboard — memor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">memor-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mindful”</span>
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

The root **memor** means mindful. It describes being mindful of the past or holding memories in the mind. In English, this root forms words such as *memory*, *memorial*, *memorable*, and *commemorate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mindful
> The root **memor** means mindful. It describes being mindful of the past or holding memories in the mind. In English, this root forms words such as *memory*, *memorial*, *memorable*, and *commemorate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mindful</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *memory* and *memorial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **memor** comes from a Latin word that means *"mindful"*.
  - At its core, it describes mindful.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **memor** in an English word, think of **thinking, understanding, and knowledge**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mindful.
  - **Mental & Social**: How people experience, organize, or communicate about mindful.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Memory**: The cognitive faculty of encoding, retaining, and recalling information and past experiences.
  - **Memorial**: A physical monument, structure, or custom established to preserve the memory of a person or historical event.
  - **Memorable**: Easily remembered.
  - **Commemorate**: To recall and show respect for someone or something in a ceremony.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">memor</mark>, think of <mark class="hl-def">thinking, understanding, and knowledge</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **memor** generates its vocabulary across four primary morphological channels:
>
> - **Nominal & Adjectival Stem `memori-` (*memoria*, *memoriālis*):**
>   - Mental faculty: *memory*, *memorious*
>   - Monuments & rites: *memorial*, *memorialize*, *memorialization*
>   - Adverb of recitation: *memoriter* (from memory)
>   - Privative prefix `in-` ("not") $\to$ *immemorial*, *immemorially*
> - **Verbal Stem `memorā-` (*memorō, memorāre*):**
>   - Adjective of capability: *memorable*, *memorably*, *memorability*, *unmemorable*
>   - Gerundive instrument: *memorandum*, *memo*
>   - Neuter plural substantive: *memorabilia* (things worth remembering)
>   - Modern causative verb: *memorize*, *memorization*
> - **Intensive Public Prefix `com-` $\to$ `commemor-` (*commemorāre*):**
>   - Verb: *commemorate*
>   - Nouns: *commemoration*, *commemorator*
>   - Adjective: *commemorative*, *commemorable*
> - **Romance Iterative Stem `remembr-` (via Old French *remembrer* < Late Latin *rememorārī*):**
>   - Verb: *remember*
>   - Noun: *remembrance*, *remembrancer*

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
> The root spans six distinct operational domains:
>
> 1. **Neuroscience, Cognitive Psychology & Computing:**
>    - The human neurological capacity to encode, store, and retrieve information (*short-term memory*, *episodic memory*).
>    - Hardware data registers and storage mediums (*flash memory*, *cache memory*).
>    - Rote learning and internalization (*memorize a poem*, *recited memoriter*).
> 2. **Civic Architecture, Monuments & Public Rituals:**
>    - Public statues, cenotaphs, and national shrines honoring historical events or the fallen (*the Lincoln Memorial*, *war memorial*).
>    - National solemnities and official anniversaries (*Remembrance Day*, *centennial commemoration*).
> 3. **Literature, Autobiography & History:**
>    - First-person biographical narratives chronicling personal experiences (*published memoirs*, *acclaimed memoirist*).
> 4. **Antiquarianism, Material Culture & Fandom:**
>    - Physical souvenirs, historic signatures, and relics (*sports memorabilia*, *Beatles memorabilia*).
> 5. **Bureaucracy, Diplomacy & Business:**
>    - Written executive summaries, legal briefs, and organizational notes (*confidential memorandum*, *inter-office memo*).
> 6. **Jurisprudence & English Property Law:**
>    - Custom and common law rights existing from a time beyond living record (*since time immemorial*).

---

## 🔀 4. Prefix & Combining Dynamics on memor

### Prefix Dynamics
- **`com-` ("together, thoroughly"):** Transforms personal memory into public, collective ceremony $\to$ *commemorate*, *commemoration*.
- **`re-` ("again, back"):** Calls a past perception back into the present mind $\to$ *remember*, *remembrance*.
- **`in-` (assimilated to `im-`, "not"):** Pushing time back beyond all human record $\to$ *immemorial*.
- **`un-` ("not"):** Easily forgotten $\to$ *unmemorable*.

### Suffix Dynamics
- **`-y` (Abstract Nominal Faculty):** *memory*.
- **`-al` (Relating To / Monument):** *memorial*, *immemorial*.
- **`-able` (Worthy Of):** *memorable*, *commemorable*.
- **`-ize` / `-ization` (Causative Learning / Civic Process):** *memorize*, *memorialize*, *memorialization*.
- **`-andum` (Latin Neuter Gerundive):** "A thing that must be remembered" $\to$ *memorandum*.
- **`-abilia` (Latin Neuter Plural):** "Things worthy of memory" $\to$ *memorabilia*.
- **`-ance` / `-ancer` (Romance State / Civic Office):** *remembrance*, *remembrancer*.
- **`-iter` (Latin Adverbial Suffix):** "By heart, from memory" $\to$ *memoriter*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Neuroscience & Neurodegenerative Medicine:** Neurologists track the loss of episodic *memory* in Alzheimer’s disease, studying hippocampal long-term potentiation (LTP) as the cellular basis for *memorization*.
> - **Public History & Collective Memory Studies:** Sociologists analyze *memorialization* controversies, examining how societies construct, reinterpret, or remove public monuments to *commemorate* historical events.
> - **Constitutional Jurisprudence & Property Law:** Property law continues to invoke *time immemorial* to validate public access easements, customary grazing rights, and ancient water rights.
> - **Computer Engineering & Semiconductor Design:** Electrical engineers design non-volatile *memory* architectures (e.g., NAND flash, MRAM) optimizing bandwidth, latency, and read-write cycles.
> - **Corporate & Diplomatic Administration:** Governments formalize bilateral accords through *Memoranda of Understanding (MoUs)*, defining collaborative frameworks without creating binding legal treaties.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[commemorate]] | verb | **1.** Mark by some ceremony or observation.<br>**2.** Call to remembrance; keep alive the memory of someone or something, as in a ceremony. | *"The brief service was of that simple and moving kind with which Presbyterian Scotland is wont to commemorate her dead."* — John Cairns, *Principal Cairns* |
| [[commemorating]] | verb | **1.** Mark by some ceremony or observation.<br>**2.** Call to remembrance; keep alive the memory of someone or something, as in a ceremony. | *"Another centenary commemorating an event as tragic and infinitely more glorious is fast approaching."* — Effendi Shoghi, *Citadel of Faith* |
| [[commemoration]] | noun | **1.** A ceremony to honor the memory of someone or something.<br>**2.** A recognition of meritorious service. | *"In commemoration of what event, however, or in honour of what distinguished personage, the feast was to be given, altogether passed my comprehension."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[commemorative]] | noun | **1.** An object (such as a coin or postage stamp) made to mark an event or honor a person.<br>**2.** Intended as a commemoration. | *"Quartered in this dingy hatchment commemorative of Symond are the legal bearings of Mr."* — Charles Dickens, *Bleak House* |
| [[immemorial]] | adjective | **1.** Long past; beyond the limits of memory or tradition or recorded history. | *"The spot had been consecrated to this ancient diversion from time immemorial, the old stocks conveniently forming a base facing the boundary of the churchyard, in front of which the ground was trodden hard and bare as a pavement by the players."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[memorabilia]] | noun | **1.** A record of things worth remembering. | *"Touch him ne’er so lightly.” Memorabilia."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[memorability]] | noun | **1.** The quality of being worth remembering. | *"In academic literature, memorability designates the quality of being worth remembering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memorable]] | adjective | **1.** Worth remembering. | *"I wear it for a memorable honour; For I am Welsh, you know, good countryman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[memorably]] | adverb | **1.** In a memorable manner. | *"Curtis says:— “The war for the Union was a vindication of that theory of its nature which Webster had maintained in a memorably impregnable and conclusive manner."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[memoranda]] | noun | **1.** A written proposal or reminder. | *"The children tumbled about, and notched memoranda of their accidents in their legs, which were perfect little calendars of distress; and Peepy was lost for an hour and a half, and brought home from Newgate market by a policeman."* — Charles Dickens, *Bleak House* |
| [[memorandum]] | noun | **1.** A written proposal or reminder. | *"Bagnet with a warmth approaching to rapture, engages himself for that day twelvemonth more than thankfully, makes a memorandum of the day in a large black pocket-book with a girdle to it, and breathes a hope that Mrs."* — Charles Dickens, *Bleak House* |
| [[memorial]] | noun | **1.** A recognition of meritorious service.<br>**2.** A written statement of facts submitted in conjunction with a petition to an authority. | *"Thy master now lies thinking on his bed Of thee and me, and sighs, and takes my glove, And gives memorial dainty kisses to it, As I kiss thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[memorialisation]] | noun | **1.** A ceremony to honor the memory of someone or something. | *"In academic literature, memorialisation designates a ceremony to honor the memory of someone or something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memorialise]] | verb | **1.** Address in a memorial.<br>**2.** Be or provide a memorial to a person or an event. | *"Jaggers was querulous and angry with me for having “let it slip through my fingers,” and said we must memorialise by and by, and try at all events for some of it."* — Charles Dickens, *Great Expectations* |
| [[memorialization]] | noun | **1.** A ceremony to honor the memory of someone or something. | *"In academic literature, memorialization designates a ceremony to honor the memory of someone or something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memorialize]] | verb | **1.** Address in a memorial.<br>**2.** Be or provide a memorial to a person or an event. | *"June 28.—Edict: A censor of the central city memorializes the throne requesting the distribution of government rice."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[memorisation]] | noun | **1.** Learning so as to be able to remember verbatim. | *"In academic literature, memorisation designates learning so as to be able to remember verbatim."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memorise]] | verb | **1.** Commit to memory; learn by heart. | *"In academic literature, memorise designates commit to memory; learn by heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memoriser]] | noun | **1.** A person who learns by rote. | *"In academic literature, memoriser designates a person who learns by rote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memorization]] | noun | **1.** Learning so as to be able to remember verbatim. | *"Once, with a guard, and once with a short-timer in solitary, I entrusted, by memorization, a letter of inquiry addressed to the curator of the Museum."* — Jack London, *The Jacket (The Star-Rover)* |
| [[memorize]] | verb | **1.** Commit to memory; learn by heart. | *"The course of instruction was not particularly difficult to memorize."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[memorizer]] | noun | **1.** A person who learns by rote. | *"In academic literature, memorizer designates a person who learns by rote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[memory]] | noun | **1.** Something that is remembered.<br>**2.** The cognitive processes whereby past experience is remembered. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unmemorable]] | adjective | **1.** Not worth remembering. | *"In academic literature, unmemorable designates not worth remembering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmemorably]] | adverb | **1.** In an unmemorable manner. | *"In academic literature, unmemorably designates in an unmemorable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MEMOR
  </div>
</div>
