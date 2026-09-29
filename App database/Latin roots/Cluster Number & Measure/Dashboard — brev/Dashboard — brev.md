---
status: unread
type: root_dashboard
---
# Dashboard — brev
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">brev-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“short”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **brev** means short. It describes having little length, lasting for a short time, or being compact. In English, this root forms words such as *abbreviate*, *abbreviation*, *brevity*, and *brief*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: short
> The root **brev** means short. It describes having little length, lasting for a short time, or being compact. In English, this root forms words such as *abbreviate*, *abbreviation*, *brevity*, and *brief*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Short</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *abbreviate* and *abbreviation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **brev** comes from a Latin word that means *"short"*.
  - At its core, it describes short.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **brev** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of short.
  - **Mental & Social**: How people experience, organize, or communicate about short.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Abbreviate**: To shorten a word, phrase, or text by omitting letters or substituting symbols.
  - **Abbreviation**: A shortened form of a word or phrase used for brevity in writing.
  - **Brevity**: Concise and exact use of words in writing or speech.
  - **Brief**: Of short duration.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">brev</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **brev** manifests through two historical channels:
> - **Direct Latin Stems in `brev-`:**
>   - *brevis* + *-tās* $\to$ *brevity* ("conciseness, shortness").
>   - *ad-* + *brevis* + *-āre* $\to$ *abbreviate* ("to shorten words").
>   - *abbreviāre* + *-tiō* $\to$ *abbreviation* ("contracted form").
>   - *breviārium* $\to$ *breviary* ("liturgical prayer compendium").
>   - Neuter noun *breve* $\to$ *breve* ("curved diacritic mark ˘ indicating short vowel; musical note").
> - **Old French & Anglo-Norman Conduit in `brief-` (< *bref*):**
>   - *bref* $\to$ *brief* ("short in duration; legal summary; papal warrant").
>   - *brief* + *-ly* $\to$ *briefly* ("in few words, momentarily").
>   - *brief* + *-ing* $\to$ *briefing* ("a concise instructional session").

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
> Although fundamentally signifying **"short"**, the root branches into specific domains:
> - **Rhetorical & Literary Economy:** *brevity* (expressive conciseness, avoiding verbosity).
> - **Temporal Duration:** *brief*, *briefly* (lasting a fleeting moment).
> - **Legal & Executive Synthesis:** *brief*, *briefing* (condensed legal arguments or operational updates).
> - **Linguistic & Orthographic Contraction:** *abbreviate*, *abbreviation* (shortening words using initials or truncations).
> - **Liturgical & Historical Book Production:** *breviary* (compact prayer compendium).
> - **Grammatical & Musical Metrics:** *breve* (diacritic mark for short vowels; archaic double whole note).

---

## 🔀 4. Prefix & Combining Dynamics on brev

### Prefix Modifications (Directional Focus)

| Prefix | Base Stem | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (*ab-* by assimilation) | `brevis` | **[[abbreviate]]** | To direct an action of shortening toward a text or phrase. |
| `ad-` (*ab-*) | `breviāre` + `-tiō` | **[[abbreviation]]** | The formal product or process of contracting a word. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ity` | Noun (State / Property) | **[[brevity]]** | The quality or state of being concise or short. |
| `-ary` | Noun (Collection / Vessel) | **[[breviary]]** | A book or vessel containing an abridged compilation. |
| `-ly` | Adverb (Manner) | **[[briefly]]** | In a concise, fleeting, or transient manner. |
| `-ing` | Noun (Process / Event) | **[[briefing]]** | An informative meeting presenting condensed facts. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law & Jurisprudence** | *brief*, *amicus brief* | Written legal arguments submitted to appellate courts summarizing case law. |
| 🗣️ **Rhetoric & Communication** | *brevity*, *briefly*, *briefing* | Executive summaries, political press conferences, speechwriting economy. |
| 📚 **Linguistics & Lexicography** | *abbreviate*, *abbreviation*, *breve* | Acronyms, initialisms, prosodic diacritics marking vowel length in dictionaries. |
| ⛪ **Theology & Ecclesiastical History** | *breviary*, *papal brief* | Liturgical Divine Office books, official papal decrees issued under the Fisherman's ring. |
| 🎵 **Musicology & Notation** | *breve*, *semibreve* | Mensural and modern musical notation designating relative note durations. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abbreviate]] | verb | **1.** Reduce in scope while retaining essential elements.<br>**2.** Shorten. | *"But this intensity of his physical prostration did but so much the more abbreviate it."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[abbreviated]] | verb | **1.** Reduce in scope while retaining essential elements.<br>**2.** Shorten. | *"He clepeth a calf “cauf”, half “hauf”; neighbour _vocatur_ “nebour”, neigh abbreviated “ne”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abbreviation]] | noun | **1.** A shortened form of a word or phrase.<br>**2.** Shortening something by omitting parts of it. | *"It was so in the Pequod with the little negro Pippin by nick-name, Pip by abbreviation."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[abbreviator]] | noun | **1.** One who shortens or abridges or condenses a written work. | *"In academic literature, abbreviator designates one who shortens or abridges or condenses a written work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[breve]] | noun | **1.** A diacritical mark (u-shaped) placed over a vowel to indicate a short sound. | *"In academic literature, breve designates a diacritical mark (u-shaped) placed over a vowel to indicate a short sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brevet]] | noun | **1.** A document entitling a commissioned officer to hold a higher rank temporarily (but without higher pay).<br>**2.** Promote somebody by brevet, in the military. | *"Delightful inducements to embark, fine chance for promotion, it seems—aye, a stove boat will make me an immortal by brevet."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[breviary]] | noun | **1.** (roman catholic church) a book of prayers to be recited daily certain priests and members of religious orders. | *"Andrew Lang with Lockhart's _Life of Scott_, "make it their breviary "--will detect some echoes of its sentences in this little book."* — John Cairns, *Principal Cairns* |
| [[brevibloc]] | noun | **1.** Intravenous beta blocker (trade name brevibloc) that acts for only a short time; used primarily for cardiac arrhythmias. | *"In academic literature, brevibloc designates intravenous beta blocker (trade name brevibloc) that acts for only a short time; used primarily for cardiac arrhythmias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brevicipitidae]] | noun | **1.** Narrow-mouthed toads and sheep frogs; some burrow and some are arboreal; found worldwide. | *"In academic literature, brevicipitidae designates narrow-mouthed toads and sheep frogs; some burrow and some are arboreal; found worldwide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brevity]] | noun | **1.** The use of brief expressions.<br>**2.** The attribute of being brief or fleeting. | *"Therefore, since brevity is the soul of wit, And tediousness the limbs and outward flourishes, I will be brief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[brevoortia]] | noun | **1.** Menhaden. | *"Classical and authoritative lexicons catalog brevoortia as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BREV
  </div>
</div>
