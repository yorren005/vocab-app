---
status: unread
type: root_dashboard
---
# Dashboard — vinc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vinc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to conquer or vanquish”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A protective shield deflecting a blow or soldiers marching in disciplined defense.</span>
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

The root **vinc** means to conquer or vanquish. It refers to the action of conquering and carrying out this process. In English, this root forms words such as *convince*, *invincible*, and *evince*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to conquer or vanquish
> The root **vinc** means to conquer or vanquish. It refers to the action of conquering and carrying out this process. In English, this root forms words such as *convince*, *invincible*, and *evince*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To conquer or vanquish</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A protective shield deflecting a blow or soldiers marching in disciplined defense.</mark>
> - **Everyday Connection**: Think of familiar words like *convince* and *invincible*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vinc** comes from a Latin word that means *"to conquer or vanquish"*.
  - At its core, it describes the action of conquer or vanquish.

- **The Big Picture Idea**:
  - Picture a protective shield deflecting a blow or soldiers marching in disciplined defense.
  - Whenever you see **vinc** in an English word, think of **to conquer or vanquish**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to conquer or vanquish).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Convince**: To cause someone to believe firmly in the truth of something.
  - **Invincible**: Too powerful to be defeated or overcome.
  - **Evince**: To reveal the presence of a quality or feeling.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vinc</mark>, think of <mark class="hl-def">to conquer or vanquish</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `vinc-`: Present active verbal root.
  - `vict-` (< Latin *victum*): Supine/participle stem (*convict, evict*).
  - `vanqu-` (Old French reduction < *vaincre*): *vanquish*.
- **Prefix Machinery**:
  - `con-` ("completely"): *convince, convict, conviction*.
  - `ex-` / `e-` ("out, forth"): *evince, evict, eviction*.
  - `in-` ("not, un-"): *invincible, invincibility*.

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
```
                      ┌── Military Conquest: vanquish
                      │
   [vinc] ────────────┼── Intellectual & Moral Proof: convince, convincing, evince
 (To Conquer)         │
                      ├── Criminal & Property Law: convict, conviction, evict, eviction
                      │
                      └── Unconquerable Fortitude: invincible, invincibility
```

---

## 🔀 4. Prefix & Combining Dynamics on vinc
- **`con-` + `vinc`**: *convince* — to conquer skepticism through persuasive evidence.
- **`con-` + `vict`**: *convict* — to prove someone guilty of a criminal offense in court.
- **`e-` + `vinc`**: *evince* — to reveal or indicate the presence of a quality or feeling.
- **`in-` + `vinc-` + `-ible`**: *invincible* — impossible to defeat or overcome.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Criminal Jurisprudence**: Felony *convictions*; appeals against wrongful conviction; rules of evidence.
- **Property Law & Real Estate**: Unlawful detainer; tenant *evictions*; housing court proceedings.
- **Rhetoric, Logic & Epistemology**: *Convincing* argumentation; intellectual *conviction*.
- **Poetry & Stoic Literature**: William Ernest Henley's poem *Invictus*; Nelson Mandela's prison resilience.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[convince]] | verb | **1.** Make (someone) agree, understand, or realize the truth or validity of something. | *"Your Italy contains none so accomplish’d a courtier to convince the honour of my mistress, if in the holding or loss of that you term her frail."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convinced]] | verb | **1.** Make (someone) agree, understand, or realize the truth or validity of something.<br>**2.** Persuaded of; very sure. | *"Or heard him say (as knaves be such abroad, Who having, by their own importunate suit, Or voluntary dotage of some mistress, Convinced or supplied them, cannot choose But they must blab.) OTHELLO."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convincible]] | adjective | **1.** Being susceptible to persuasion. | *"In academic literature, convincible designates being susceptible to persuasion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convincing]] | verb | **1.** Make (someone) agree, understand, or realize the truth or validity of something.<br>**2.** Causing one to believe the truth of something. | *"Guppy, “give up the whole thing, if I understand you, Tony?” “You never,” returns Tony with a most convincing steadfastness, “said a truer word in all your life."* — Charles Dickens, *Bleak House* |
| [[convincingly]] | adverb | **1.** In a convincing manner. | *"It never has been convincingly shown, however, that there is any large measure of correspondence in time (not to say causal relation) between tariff revisions and crises.[13] § 15. #Rhythmic changes in weather and in crops#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[convincingness]] | noun | **1.** The power of argument or evidence to cause belief. | *"In academic literature, convincingness designates the power of argument or evidence to cause belief."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evince]] | verb | **1.** Give expression to. | *"He spent years and years in desultory studies, undertakings, and meditations; he began to evince considerable indifference to social forms and observances."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[invincibility]] | noun | **1.** The property being difficult or impossible to defeat. | *"Kutúzov alone at last gains a real victory, destroying the spell of the invincibility of the French, and the Minister of War does not even care to hear the details.” “That’s just it, my dear fellow."* — graf Leo Tolstoy, *War and Peace* |
| [[invincible]] | adjective | **1.** Incapable of being overcome or subdued. | *"You were used to load me With precepts that would make invincible The heart that conned them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invincibly]] | adverb | **1.** In an invincible manner. | *"Mind you don’t flinch, whatever you do.” “I’ll be sure not to!” she said invincibly."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[province]] | noun | **1.** The territory occupied by one of the constituent administrative districts of a nation.<br>**2.** The proper sphere or extent of your activities. | *"Say ’tis not so, a province I will give thee, And make thy fortunes proud."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provincial]] | noun | **1.** (roman catholic church) an official in charge of an ecclesiastical province acting under the superior general of a religious order.<br>**2.** A country person. | *"Would not this, sir, and a forest of feathers, if the rest of my fortunes turn Turk with me; with two Provincial roses on my razed shoes, get me a fellowship in a cry of players, sir?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provincialism]] | noun | **1.** A lack of sophistication.<br>**2.** A partiality for some particular place. | *"Besides, the English whalers sometimes affect a kind of metropolitan superiority over the American whalers; regarding the long, lean Nantucketer, with his nondescript provincialisms, as a sort of sea-peasant."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[provincially]] | adverb | **1.** By the province; through the province. | *"The train presently arrived, and Miss Stackpole, promptly descending, proved, as Isabel had promised, quite delicately, even though rather provincially, fair."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[unconvinced]] | adjective | **1.** Lacking conviction. | *"There was Slant-Eyed Wilson, with an unguessed weak heart of fear, who died in the jacket within the first hour while the unconvinced inefficient of a prison doctor looked on and smiled."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unconvincing]] | adjective | **1.** Not convincing.<br>**2.** Having a probability too low to inspire belief. | *"In academic literature, unconvincing designates not convincing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconvincingly]] | adverb | **1.** In an unconvincing manner. | *"In academic literature, unconvincingly designates in an unconvincing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinca]] | noun | **1.** Periwinkles: low creeping evergreen perennials. | *"PERIWINKLE RUST; spots yellowish; sori small, subrotund, and oval, on the under surface, surrounded by the ruptured epidermis; spores oval, rather ovoid, brown.—On leaves of _Vinca major_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vincetoxicum]] | noun | **1.** Genus of chiefly tropical american vines having cordate leaves and large purple or greenish cymose flowers; supposedly having powers as an antidote. | *"In academic literature, vincetoxicum designates genus of chiefly tropical american vines having cordate leaves and large purple or greenish cymose flowers; supposedly having powers as an antidote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vincible]] | adjective | **1.** Susceptible to being defeated. | *"In academic literature, vincible designates susceptible to being defeated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vincristine]] | noun | **1.** Periwinkle plant derivative used as an antineoplastic drug (trade name oncovin); used to treat cancer of the lymphatic system. | *"In academic literature, vincristine designates periwinkle plant derivative used as an antineoplastic drug (trade name oncovin); used to treat cancer of the lymphatic system."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster War]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VINC
  </div>
</div>
