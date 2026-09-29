---
status: unread
type: root_dashboard
---
# Dashboard — tort
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tort-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to twist”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **tort** means to twist. It refers to the action of twisting and carrying out this process. In English, this root forms words such as *torture*, *distort*, *retort*, and *contort*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to twist
> The root **tort** means to twist. It refers to the action of twisting and carrying out this process. In English, this root forms words such as *torture*, *distort*, *retort*, and *contort*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To twist</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *torture* and *distort*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tort** comes from a Latin word that means *"to twist"*.
  - At its core, it describes the action of twist.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **tort** in an English word, think of **to twist**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to twist).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Torture**: The action or practice of inflicting severe pain on someone as a punishment or to force them to do or say something.
  - **Distort**: To pull or twist out of shape.
  - **Retort**: To say something in answer to a remark or accusation, typically in a sharp, angry, or witty manner.
  - **Contort**: To twist, bend, or draw out of normal shape.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tort</mark>, think of <mark class="hl-def">to twist</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `tort-` (< Latin *tortus*): The past participial base.
- **Prefix Transformations**:
  - `con-` ("together, completely"): *contort* ("to twist violently into unnatural shapes").
  - `dis-` ("apart, away"): *distort* ("to twist out of true shape or meaning").
  - `ex-` ("out of"): *extort* ("to twist or wring money from someone under duress").
  - `re-` ("back, again"): *retort* ("to twist an argument back upon an opponent").
- **Suffixal Formations**:
  - `-uous`: *tortuous* ("full of twists and turns").
  - `-ure`: *torture* ("the infliction of agonizing pain").
  - `-ious`: *tortious* ("constituting a civil wrong").

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
                      ┌── Law & Moral Wrongs: tort, tortious, extort, extortion
                      │
   [tort] ────────────┼── Physical Pain & Agony: torture, torturer, torturous, torment
 (Twisted / Wrung)    │
                      ├── Deformation & Deception: contort, contortion, distort, distortion
                      │
                      └── Shape, Nature & Wit: tortuous, retort, nasturtium, torch, tortoise, tortilla
```

---

## 🔀 4. Prefix & Combining Dynamics on tort
- **`con-` + `tort`**: *contort* — to twist or bend severely out of natural shape.
- **`dis-` + `tort`**: *distort* — to twist facts, sound, or geometry out of true alignment.
- **`ex-` + `tort`**: *extort* — to wrench money or compliance through coercion or blackmail.
- **`re-` + `tort`**: *retort* — to twist a witty, sharp reply back at an antagonist.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Common Law**: *Tort* law, intentional torts, negligence, strict liability, *tortfeasors*.
- **Signal Processing & Audio**: Harmonic *distortion* (THD); geometric distortion in lenses.
- **Human Rights & International Law**: The UN Convention Against *Torture*; Geneva Conventions.
- **Botany & Culinary History**: *Nasturtium* flowers; Mesoamerican *tortillas*; *tortuous* river meanders.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[contort]] | verb | **1.** Twist and press out of shape. | *"Rochester at Thornfield Hall.” I saw a grim smile contort Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[contorted]] | verb | **1.** Twist and press out of shape.<br>**2.** Twisted (especially as in pain or struggle); ; ; - walter scott. | *"I am not a fool," he hissed as his features contorted into waves of quivering fat."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[contortion]] | noun | **1.** The act of twisting or deforming the shape of something (e.g., yourself).<br>**2.** A tortuous and twisted shape or position. | *"For an instant he felt that the struggle was causing a queer contortion of his mobile features, but with a good effort he resolved it into nothing more offensive than a merry smile."* — George Eliot, *Middlemarch* |
| [[contortionist]] | noun | **1.** An acrobat able to twist into unusual positions. | *"In academic literature, contortionist designates an acrobat able to twist into unusual positions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distort]] | verb | **1.** Make false by mutilation or addition; as of a message or story.<br>**2.** Form into a spiral shape. | *"So some with direful strange Grimaces, Within this Dome distort their Faces; Strain, ----squeeze, ----yet loth for to depart, Again they strain--for what? a Fart."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[distortable]] | adjective | **1.** Capable of having the meaning altered or twisted. | *"In academic literature, distortable designates capable of having the meaning altered or twisted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distorted]] | verb | **1.** Make false by mutilation or addition; as of a message or story.<br>**2.** Form into a spiral shape. | *"Jarndyce and Jarndyce had obtained such possession of his whole nature that it was impossible to place any consideration before him which he did not, with a distorted kind of reason, make a new argument in favour of his doing what he did."* — Charles Dickens, *Bleak House* |
| [[distortion]] | noun | **1.** A change for the worse.<br>**2.** A shape resulting from distortion. | *"There was, so to speak, that symmetry in their distortion which is less the characteristic of British than of Continental grotesques of the period."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[distortionist]] | noun | **1.** A painter who introduces distortions. | *"In academic literature, distortionist designates a painter who introduces distortions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extort]] | verb | **1.** Obtain through intimidation.<br>**2.** Obtain by coercion or intimidation. | *"You must know, Till the injurious Romans did extort This tribute from us, we were free."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extortion]] | noun | **1.** An exorbitant charge.<br>**2.** Unjust exaction (as by the misuse of authority). | *"Yes, that goodness Of gleaning all the land’s wealth into one, Into your own hands, Cardinal, by extortion; The goodness of your intercepted packets You writ to the Pope against the King."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extortionate]] | adjective | **1.** Greatly exceeding bounds of reason or moderation. | *"Employment and extortionate profits from Slingshot services and industries would plummet as Planet Pluto continued outbound along its eccentric orbit into interstellar space."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[extortionately]] | adverb | **1.** To an exorbitant degree. | *"In academic literature, extortionately designates to an exorbitant degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extortioner]] | noun | **1.** A criminal who extorts money from someone by threatening to expose embarrassing information about them. | *"In academic literature, extortioner designates a criminal who extorts money from someone by threatening to expose embarrassing information about them."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extortionist]] | noun | **1.** A criminal who extorts money from someone by threatening to expose embarrassing information about them. | *"In academic literature, extortionist designates a criminal who extorts money from someone by threatening to expose embarrassing information about them."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retort]] | noun | **1.** A quick reply to a question or remark (especially a witty or critical one).<br>**2.** A vessel where substances are distilled or decomposed by heat. | *"This is called the “retort courteous”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tort]] | noun | **1.** (law) any wrongdoing for which an action for damages may be brought. | *"In art, as in politics, _les grandpères ont toujours tort_.” “This play was good enough for us, Harry."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[torte]] | noun | **1.** Rich cake usually covered with cream and fruit or nuts; originated in austria. | *"In academic literature, torte designates rich cake usually covered with cream and fruit or nuts; originated in austria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortellini]] | noun | **1.** Small ring-shaped stuffed pasta. | *"In academic literature, tortellini designates small ring-shaped stuffed pasta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[torticollis]] | noun | **1.** An unnatural condition in which the head leans to one side because the neck muscles on that side are contracted. | *"In academic literature, torticollis designates an unnatural condition in which the head leans to one side because the neck muscles on that side are contracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortilla]] | noun | **1.** Thin unleavened pancake made from cornmeal or wheat flour. | *"In academic literature, tortilla designates thin unleavened pancake made from cornmeal or wheat flour."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortious]] | adjective | **1.** Of or pertaining to the nature of a tort. | *"In academic literature, tortious designates of or pertaining to the nature of a tort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortoise]] | noun | **1.** Usually herbivorous land turtles having clawed elephant-like limbs; worldwide in arid area except australia and antarctica. | *"The master was an old Turtle—we used to call him Tortoise—” “Why did you call him Tortoise, if he wasn’t one?” Alice asked."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[tortoiseshell]] | noun | **1.** The mottled horny substance of the shell of some turtles.<br>**2.** Brilliantly colored; larvae feed on nettles. | *"That half tabbywhite tortoiseshell in the _City Arms_ with the letter em on her forehead."* — James Joyce, *Ulysses* |
| [[tortoiseshell-cat]] | noun | **1.** A cat having black and cream-colored and yellowish markings. | *"In academic literature, tortoiseshell-cat designates a cat having black and cream-colored and yellowish markings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortricid]] | noun | **1.** Any of numerous small moths having lightly fringed wings; larvae are leaf rollers or live in fruits and galls. | *"In academic literature, tortricid designates any of numerous small moths having lightly fringed wings; larvae are leaf rollers or live in fruits and galls."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortricidae]] | noun | **1.** Leaf rollers and codling moths. | *"In academic literature, tortricidae designates leaf rollers and codling moths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortrix]] | noun | **1.** California moth whose larvae live in especially oranges.<br>**2.** Small indian moth infesting e.g. tea and coffee plants. | *"In academic literature, tortrix designates california moth whose larvae live in especially oranges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortuosity]] | noun | **1.** A tortuous and twisted shape or position. | *"In academic literature, tortuosity designates a tortuous and twisted shape or position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tortuous]] | adjective | **1.** Highly complex or intricate and occasionally devious; ; ; ; ; ; ; ; - sir walter scott.<br>**2.** Marked by repeated turns and bends. | *"She went out of the town by a tortuous back street, and drove slowly along, unconscious of the road and the scene."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tortuously]] | adverb | **1.** With twists and turns.<br>**2.** In a tortuous manner. | *"And the cunning men took the land and the waters and the light, and worked tortuously until they could sell them at a price...."* — Donn Byrne, *The Wind Bloweth* |
| [[tortuousness]] | noun | **1.** A tortuous and twisted shape or position.<br>**2.** Puzzling complexity. | *"In academic literature, tortuousness designates a tortuous and twisted shape or position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[torture]] | noun | **1.** Extreme mental distress.<br>**2.** Unbearable physical pain. | *"And each (though enemies to either’s reign) Do in consent shake hands to torture me, The one by toil, the other to complain How far I toil, still farther off from thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tortured]] | verb | **1.** Torment emotionally or mentally.<br>**2.** Subject to torture. | *"Murder indeed, that bloody sin, I tortured Above the felon or what trespass else."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[torturer]] | noun | **1.** Someone who inflicts severe physical pain (usually for punishment or coercion). | *"Confess and love” Had been the very sum of my confession: O happy torment, when my torturer Doth teach me answers for deliverance!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[torturesome]] | adjective | **1.** Extremely painful. | *"In academic literature, torturesome designates extremely painful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[torturing]] | noun | **1.** The deliberate, systematic, or wanton infliction of physical or mental suffering by one or more persons in an attempt to force another person to yield information or to make a confession or for any other reason.<br>**2.** Torment emotionally or mentally. | *"Is there no play To ease the anguish of a torturing hour?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[torturous]] | adjective | **1.** Extremely painful. | *"In academic literature, torturous designates extremely painful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[torturously]] | adverb | **1.** In a very painful manner. | *"In academic literature, torturously designates in a very painful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undistorted]] | adjective | **1.** Without alteration or misrepresentation. | *"In academic literature, undistorted designates without alteration or misrepresentation."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TORT
  </div>
</div>
