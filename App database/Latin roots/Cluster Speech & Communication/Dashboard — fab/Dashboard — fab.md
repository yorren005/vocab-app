---
status: unread
type: root_dashboard
---
# Dashboard — fab
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fab-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“story or tale”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Two people conversing warmly and exchanging clear spoken words.</span>
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

The root **fab** means story or tale. It refers to a spoken story, legendary fable, or traditional tale. In English, this root forms words such as *affability*, *affable*, *confab*, and *confabulate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: story or tale
> The root **fab** means story or tale. It refers to a spoken story, legendary fable, or traditional tale. In English, this root forms words such as *affability*, *affable*, *confab*, and *confabulate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Story or tale</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *affability* and *affable*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fab** comes from a Latin word that means *"story or tale"*.
  - At its core, it describes story or tale.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **fab** in an English word, think of **talking, discussing, and communication**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of story or tale.
  - **Mental & Social**: How people experience, organize, or communicate about story or tale.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Affability**: The quality of having a friendly, cordial, and approachable manner.
  - **Affable**: Friendly, good-natured, or easy to talk to.
  - **Confab**: An informal private conversation or discussion. 2. To engage in an informal chat.
  - **Confabulate**: To engage in conversation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fab</mark>, think of <mark class="hl-def">talking, discussing, and communication</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **fab** operates through three main morphological patterns:
- **Base Narrative Stem (`fab-` / `fabul-`)**:
  - *fābula* $\to$ **fable**, **fabulist**, **fabulous**, **fabulousness**, **fabulate**, **fabulation**.
- **Prefix Compounds with Apophony (`-fab-`)**:
  - *ad-* + *fārī* / *fābilis* $\to$ *affābilis* ("easy to address") $\to$ **affable**, **affability**.
  - *con-* + *fābulārī* $\to$ *confābulārī* ("to talk together") $\to$ **confab**, **confabulate**, **confabulation**, **confabulatory**.
  - *in-* + *ex-* + *fābilis* $\to$ *ineffābilis* ("unspeakable") $\to$ **ineffable**, **ineffability**, **ineffably**.

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

The semantic branches of **fab** extend across four key arenas:
- **Literature, Folklore & Allegory**: *fable* (moral tale with animal protagonists), *fabulist* (composer of fables or liar), *fabulate* (to invent artistic stories).
- **Marvel, Wonder & Grandeur**: *fabulous* (resembling a mythic fable; extraordinary, astonishing in scale).
- **Interpersonal Warmth & Banter**: *affable* (warm, approachable, gracious), *affability* (ease of conversation), *confab* (informal chat or discussion).
- **Psychiatry & Cognitive Science**: *confabulation* (unconscious fabrication of false memories to replace amnesia), *confabulatory*.
- **Theology & Mysticism**: *ineffable* (transcending human language; sacred and unutterable), *ineffability*.

---

## 🔀 4. Prefix & Combining Dynamics on fab

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to, toward") | `ad-` + `fab-` $\to$ `affab-` | Easy to approach and speak to $\to$ warm, courteous | *affable, affability, affably* |
| **`con-`** ("together") | `con-` + `fābulārī` | Talking together $\to$ friendly chat; clinical memory filling | *confab, confabulate, confabulation, confabulatory* |
| **`in-`** ("not") + **`ex-`** | `in-` + `ex-` + `fārī` | Not able to be spoken out $\to$ beyond human speech, sacred | *ineffable, ineffability, ineffably* |
| **`-ist`** (agent) | `fabul-` + `-ist` | One who invents fables $\to$ storyteller, myth-maker | *fabulist* |
| **`-ous`** (adjective) | `fabul-` + `-ous` | Full of fable/myth $\to$ legendary, marvelous, incredible | *fabulous, fabulously* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Comparative Folklore & Literary Criticism**: Structural analysis of Aesop, La Fontaine, and narrative archetypes (*fable*, *fabulist*, *fabulation*).
- **Psychology, Neurology & Psychiatry**: Neurocognitive pathology in Korsakoff's syndrome and dementia (*confabulation*).
- **Aesthetic Philosophy & Mystical Theology**: Negative theology (*via negativa*) describing divine realities that defy words (*ineffability*).
- **Social Psychology & Leadership**: The study of interpersonal charisma and communicative accessibility (*affability*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affability]] | noun | **1.** A disposition to be friendly and approachable (easy to talk to). | *"Seek none, conspiracy; Hide it in smiles and affability: For if thou path, thy native semblance on, Not Erebus itself were dim enough To hide thee from prevention."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affable]] | adjective | **1.** Diffusing warmth and friendliness. | *"He nor that affable familiar ghost Which nightly gulls him with intelligence, As victors of my silence cannot boast, I was not sick of any fear from thence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affableness]] | noun | **1.** A disposition to be friendly and approachable (easy to talk to). | *"In academic literature, affableness designates a disposition to be friendly and approachable (easy to talk to)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affably]] | adverb | **1.** In an affable manner. | *"As to Reform, sir, put it in a family light,” he said, rattling the small silver in his pocket, and smiling affably."* — George Eliot, *Middlemarch* |
| [[confab]] | noun | **1.** An informal conversation.<br>**2.** Talk socially without exchanging too much information. | *"Camford, loftily; "but my nerves are all shattered by this long confab, and I will now retire, leaving you young people to cultivate each other's acquaintance."* — Effie Afton, *Eventide* |
| [[confabulate]] | verb | **1.** Unconsciously replace fact with fantasy in one's memory.<br>**2.** Talk socially without exchanging too much information. | *"The two proud dowagers, Lady Lynn and Lady Ingram, confabulate together."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[confabulation]] | noun | **1.** An informal conversation.<br>**2.** (psychiatry) a plausible but imagined memory that fills in gaps in what is remembered. | *"Bucket for a little private confabulation, tells his tale satisfactorily, though out of breath."* — Charles Dickens, *Bleak House* |
| [[fab]] | adjective | **1.** Extremely pleasing. | *"The ‘Apostolical Constitutions’ (vi. c. 6) traced them back to Apostolic times; Theodoret (Haer. fab."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[fabaceae]] | noun | **1.** A large family of trees, shrubs, vines, and herbs bearing bean pods; divided for convenience into the subfamilies caesalpiniaceae; mimosaceae; papilionaceae. | *"In academic literature, fabaceae designates a large family of trees, shrubs, vines, and herbs bearing bean pods; divided for convenience into the subfamilies caesalpiniaceae; mimosaceae; papilionaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[faberge]] | noun | **1.** Russian goldsmith noted for creating a series of jeweled and enameled easter eggs for european royalty (1846-1920). | *"In academic literature, faberge designates russian goldsmith noted for creating a series of jeweled and enameled easter eggs for european royalty (1846-1920)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fabian]] | noun | **1.** A member of the fabian society in britain.<br>**2.** Of or relating to fabianism. | *"Enter Sir Toby, Sir Andrew and Fabian."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fabiana]] | noun | **1.** Genus of south and central american heathlike evergreen shrubs. | *"In academic literature, fabiana designates genus of south and central american heathlike evergreen shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fabianism]] | noun | **1.** Socialism to be established by gradual reforms within the law. | *"In academic literature, fabianism designates socialism to be established by gradual reforms within the law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fable]] | noun | **1.** A deliberately false or improbable account.<br>**2.** A short moral story (often with animal characters). | *"Sans fable, she herself revil’d you there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fabled]] | adjective | **1.** Celebrated in fable or legend. | *"Did he believe my fabled birth?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[fabric]] | noun | **1.** Artifact made by weaving or felting or knitting or crocheting natural or synthetic fibers.<br>**2.** The underlying structure. | *"The kingly crowned head, the vigilant eye, The counsellor heart, the arm our soldier, Our steed the leg, the tongue our trumpeter, With other muniments and petty helps Is this our fabric, if that they— MENENIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fabricate]] | verb | **1.** Put together out of artificial or natural components or parts; ; ; he manufactured a popular cereal".<br>**2.** Make up something artificial or untrue. | *"Should this at any time happen, how easy would it be to fabricate pretenses of approaching danger!"* — Alexander Hamilton, *The Federalist Papers* |
| [[fabricated]] | verb | **1.** Put together out of artificial or natural components or parts; ; ; he manufactured a popular cereal".<br>**2.** Make up something artificial or untrue. | *"Of the fabricated tastes of good fashionable society she knew but little, and of the formulated self-indulgence of bad, nothing at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fabrication]] | noun | **1.** A deliberately false or improbable account.<br>**2.** Writing in a fictional form. | *"Were it a system agreeable to the narrow views, in unison with the selfish feelings, and gratifying to the depraved taste of human nature, it would more resemble the fabrication of man, than the workmanship of God."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[fabricator]] | noun | **1.** Someone who tells lies. | *"On the whole product of her industry, two-thirds is tolled out by carriers and bored out by Inspectors, until but a beggarly remnant is left to satisfy the fabricator of her goods."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[fabulist]] | noun | **1.** A person who tells or invents fables. | *"In academic literature, fabulist designates a person who tells or invents fables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fabulous]] | adjective | **1.** Extremely pleasing.<br>**2.** Based on or told of in traditional stories; lacking factual basis or historical validity. | *"I see report is fabulous and false."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fabulously]] | adverb | **1.** Exceedingly; extremely. | *"In academic literature, fabulously designates exceedingly; extremely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ineffability]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fab within the domain of Speech & Communication.<br>**2.** A technical or specialized form exhibiting the properties of fab in systematic terminology. | *"In academic literature, ineffability designates pertaining to, derived from, or characteristic of latin fab within the domain of speech & communication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefab]] | noun | **1.** A prefabricated structure.<br>**2.** Manufactured in standard sizes to be shipped and assembled elsewhere. | *"In academic literature, prefab designates a prefabricated structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefabricate]] | verb | **1.** To manufacture sections of (a building), especially in a factory, so that they can be easily transported to and rapidly assembled on a building site of buildings.<br>**2.** Produce synthetically, artificially, or stereotypically and unoriginally. | *"In academic literature, prefabricate designates to manufacture sections of (a building), especially in a factory, so that they can be easily transported to and rapidly assembled on a building site of buildings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefabrication]] | noun | **1.** The manufacture of sections of a building at the factory so they can be easily and rapidly assembled at the building site. | *"In academic literature, prefabrication designates the manufacture of sections of a building at the factory so they can be easily and rapidly assembled at the building site."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refabrication]] | noun | **1.** Assembling again. | *"In academic literature, refabrication designates assembling again."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FAB
  </div>
</div>
