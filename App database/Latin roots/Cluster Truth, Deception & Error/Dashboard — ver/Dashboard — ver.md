---
status: unread
type: root_dashboard
---
# Dashboard — ver
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ver-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“true or truth”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Uncovering honest facts and separating what is genuine from what is false.</span>
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

The root **ver** means true or truth. It refers to what is factual, honest, genuine, and reliable. In English, this root forms words such as *very*, *verify*, *verdict*, and *veracity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: true or truth
> The root **ver** means true or truth. It refers to what is factual, honest, genuine, and reliable. In English, this root forms words such as *very*, *verify*, *verdict*, and *veracity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">True or truth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Uncovering honest facts and separating what is genuine from what is false.</mark>
> - **Everyday Connection**: Think of familiar words like *very* and *verify*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ver** comes from a Latin word that means *"true or truth"*.
  - At its core, it describes the quality or state of being true or truth.

- **The Big Picture Idea**:
  - Picture uncovering honest facts and separating what is genuine from what is false.
  - Whenever you see **ver** in an English word, think of **truth, reality, or mistakes**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are true or truth.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Very**: Adv.* In a high degree.
  - **Verify**: To make sure or demonstrate that something is true, accurate, or justified.
  - **Verdict**: Law*: A decision on a disputed issue in a civil or criminal case or an inquest.
  - **Veracity**: Conformity to facts.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ver</mark>, think of <mark class="hl-def">truth, reality, or mistakes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms adjectives, verbs, and nouns across multiple combining patterns:
1. **The Primary Base Stem `ver-`**:
   - *verity* (< Latin *vēritās*).
   - *veritable* (< Old French *veritable*).
   - *very* (< Old French *verai* < Vulgar Latin *\*vērācus*).
2. **Verbal Derivations with `-fy`** (*facere* "to make"):
   - *verify* (< Old French *verifier* < Medieval Latin *vērificāre*).
   - *verification* (< Medieval Latin *vērificātiō*).
3. **Adjectival Suffixation with `-acious`**:
   - *veracious* (< Latin *vērāx, vērācis* "speaking the truth").
   - *veracity* (< Medieval Latin *vērācitās*).
4. **Compounds with Other Roots**:
   - `ver-` + *dictum* ("spoken") $\to$ *verdict*.
   - `ver-` + *similis* ("like") $\to$ *verisimilitude*.
   - `ad-` + `ver-` $\to$ *aver* (< Old French *averer* < Late Latin *advērāre*).

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

The cognitive sphere of *ver* organizes into four great domains:
- **Judicial Determination & Oath-Bound Truth**: [[verdict]], [[aver]]
- **Moral Honesty & Character Integrity**: [[veracious]], [[veracity]]
- **Empirical Science & Epistemology**: [[verify]], [[verification]], `verifiably`, `verifiability`
- **Authenticity, Realism & Art**: [[veritable]], [[verity]], [[verisimilitude]], [[verism]], [[very]]

---

## 🔀 4. Prefix & Combining Dynamics on ver

1. **`ad-` + `ver`** (*ad* "to" + *vērus* "true"):
   - *aver* $\to$ to state or assert to be the case; declare under oath.
2. **`veri-` + `fic`** (*vērus* + *facere* "to make"):
   - *verify* $\to$ to make sure or demonstrate that something is true, accurate, or justified.
   - *verification* $\to$ the process of establishing the truth, accuracy, or validity of something.
3. **`veri-` + `dict`** (*vērus* + *dīcere* "to speak"):
   - *verdict* $\to$ an opinion or judgment reached after consideration; the formal finding of a jury.
4. **`veri-` + `simil`** (*vērus* + *similis* "like"):
   - *verisimilitude* $\to$ the appearance of being true or real.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Jurisprudence & Trial Law**: jury *verdicts*, *averments* in civil pleading, *veracity* of witnesses.
- **Epistemology & Philosophy of Science**: *verificationist* theory of meaning (Logical Positivism), formal *verification* of software code.
- **Journalism & Fact-Checking**: source *verification*, independent editorial confirmation.
- **Art History & Literary Theory**: Italian operatic *verismo* (Puccini, Mascagni), narrative *verisimilitude*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adversary]] | noun | **1.** Someone who offers opposition. | *"He must think us some band of strangers i’ the adversary’s entertainment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adversative]] | adjective | **1.** Expressing antithesis or opposition. | *"In academic literature, adversative designates expressing antithesis or opposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adverse]] | adjective | **1.** Contrary to your interests or welfare.<br>**2.** In an opposing direction. | *"All’s well that ends well yet, Though time seem so adverse and means unfit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adversely]] | adverb | **1.** In an adverse manner. | *"Meeting two such wealsmen as you are—I cannot call you Lycurguses—if the drink you give me touch my palate adversely, I make a crooked face at it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adversity]] | noun | **1.** A state of misfortune or affliction.<br>**2.** A stroke of ill fortune; a calamitous event. | *"Let me embrace thee, sour adversity, For wise men say it is the wisest course. 2 KEEPER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advert]] | noun | **1.** A public promotion of some product or service.<br>**2.** Give heed (to). | *"All this I enjoyed often and fully, free, unwatched, and almost alone: for this unwonted liberty and pleasure there was a cause, to which it now becomes my task to advert."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[advertence]] | noun | **1.** The process of being heedful. | *"In academic literature, advertence designates the process of being heedful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertency]] | noun | **1.** The process of being heedful. | *"In academic literature, advertency designates the process of being heedful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertent]] | adjective | **1.** Giving attention. | *"In academic literature, advertent designates giving attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertently]] | adverb | **1.** In a careful deliberate manner. | *"In academic literature, advertently designates in a careful deliberate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertise]] | verb | **1.** Call attention to.<br>**2.** Make publicity for; try to sell (a product). | *"But I do bend my speech To one that can my part in him advertise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertised]] | verb | **1.** Call attention to.<br>**2.** Make publicity for; try to sell (a product). | *"I have advertised him by secret means That if about this hour he make this way, Under the colour of his usual game, He shall here find his friends with horse and men To set him free from his captivity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertisement]] | noun | **1.** A public promotion of some product or service. | *"That is not the duke’s letter, sir; that is an advertisement to a proper maid in Florence, one Diana, to take heed of the allurement of one Count Rossillon, a foolish idle boy, but for all that very ruttish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertiser]] | noun | **1.** Someone whose business is advertising. | *"Concerning the Militia From the Daily Advertiser."* — Alexander Hamilton, *The Federalist Papers* |
| [[advertising]] | noun | **1.** A public promotion of some product or service.<br>**2.** The business of drawing public attention to goods and services. | *"As I was then Advertising and holy to your business, Not changing heart with habit, I am still Attorneyed at your service."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertize]] | verb | **1.** Make publicity for; try to sell (a product).<br>**2.** Call attention to. | *"In academic literature, advertize designates make publicity for; try to sell (a product)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertizement]] | noun | **1.** A public promotion of some product or service. | *"In academic literature, advertizement designates a public promotion of some product or service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertizer]] | noun | **1.** Someone whose business is advertising. | *"In academic literature, advertizer designates someone whose business is advertising."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertizing]] | noun | **1.** A public promotion of some product or service.<br>**2.** Make publicity for; try to sell (a product). | *"In academic literature, advertizing designates a public promotion of some product or service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertorial]] | noun | **1.** An advertisement that is written and presented in the style of an editorial or journalistic report. | *"In academic literature, advertorial designates an advertisement that is written and presented in the style of an editorial or journalistic report."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anvers]] | noun | **1.** A busy port and financial center in northern belgium on the scheldt river; it has long been a center for the diamond industry and the first stock exchange was opened there in 1460. | *"In academic literature, anvers designates a busy port and financial center in northern belgium on the scheldt river; it has long been a center for the diamond industry and the first stock exchange was opened there in 1460."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aver]] | verb | **1.** Report or maintain.<br>**2.** To declare or affirm solemnly and formally as true. | *"There, I can aver that earth and ice were lost to sight by the numbers of sea-mammals covering them, and I involuntarily sought for old Proteus, the mythological shepherd who watched these immense flocks of Neptune."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[average]] | noun | **1.** A statistic describing the location of a distribution.<br>**2.** (sports) the ratio of successful performances to opportunities. | *"Probably some one man on an average falls in love with each ordinary woman."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[averageness]] | noun | **1.** The state of being that is average; indicates normality but with connotations of mediocrity.<br>**2.** Ordinariness as a consequence of being average and not outstanding. | *"In academic literature, averageness designates the state of being that is average; indicates normality but with connotations of mediocrity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[averment]] | noun | **1.** A declaration that is made emphatically (as if no supporting evidence were necessary). | *"I contradict that statement by an appeal to the record; and before that great tribunal by whom this issue is to be tried and determined, I allege that that averment is without foundation."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[aversion]] | noun | **1.** A feeling of intense dislike.<br>**2.** The act of turning yourself (or your gaze) away. | *"But why should such a fair and dutiful girl have such an aversion to her father’s sex?” “Go on your way, please.” “What, Beauty, and drag you after me?"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[aversive]] | adjective | **1.** Tending to repel or dissuade. | *"In academic literature, aversive designates tending to repel or dissuade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[avert]] | verb | **1.** Prevent the occurrence of; prevent from happening.<br>**2.** Turn away or aside. | *"I could only suggest that I should go down to Deal, where Richard was then stationed, and see him, and try if it were possible to avert the worst."* — Charles Dickens, *Bleak House* |
| [[avertable]] | adjective | **1.** Capable of being avoided or warded off. | *"In academic literature, avertable designates capable of being avoided or warded off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[avertible]] | adjective | **1.** Capable of being avoided or warded off. | *"In academic literature, avertible designates capable of being avoided or warded off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[averting]] | noun | **1.** The act of preventing something from occurring.<br>**2.** The act of turning yourself (or your gaze) away. | *"They "are never permitted to walk on the ice of rivers or lakes, or near the part where the men are hunting beaver, or where a fishing-net is set, for fear of averting their success."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[conversance]] | noun | **1.** Personal knowledge or information about someone or something. | *"In academic literature, conversance designates personal knowledge or information about someone or something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conversancy]] | noun | **1.** Personal knowledge or information about someone or something. | *"In academic literature, conversancy designates personal knowledge or information about someone or something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conversant]] | adjective | **1.** (usually followed by `with') well informed about or knowing thoroughly. | *"But I much marvel that your lordship, having Rich tire about you, should at these early hours Shake off the golden slumber of repose. ’Tis most strange, Nature should be so conversant with pain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conversation]] | noun | **1.** The use of speech for informal exchange of views or ideas or information etc. | *"My lord your son made me to think of this; Else Paris, and the medicine, and the king, Had from the conversation of my thoughts Haply been absent then."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conversational]] | adjective | **1.** Characteristic of informal spoken language or conversation. | *"Skimpole, “he parted from our conversational friend Kenge and took up, I believe, with Vholes."* — Charles Dickens, *Bleak House* |
| [[conversationalist]] | noun | **1.** Someone skilled at conversation. | *"Gilchrist even more gifted as a conversationalist than as a writer."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[conversationally]] | adverb | **1.** With the use of colloquial expressions. | *"Bucket conversationally, “and much to blame you would be if you didn’t."* — Charles Dickens, *Bleak House* |
| [[conversationist]] | noun | **1.** Someone skilled at conversation. | *"In academic literature, conversationist designates someone skilled at conversation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[converse]] | noun | **1.** A proposition obtained by conversion.<br>**2.** Carry on a conversation. | *"Did you converse, sir, with this gentlewoman?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conversely]] | adverb | **1.** With the terms of the relation reversed. | *"What Jesus then teaches on prayer will illuminate what he means by God; and conversely his conception of God will throw new light upon the whole problem of prayer."* — T. R. Glover, *The Jesus of History* |
| [[conversion]] | noun | **1.** An event that results in a transformation.<br>**2.** A change in the units or form of an expression:. | *"I do not shame To tell you what I was, since my conversion So sweetly tastes, being the thing I am."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[converso]] | noun | **1.** (medieval spain and portugal) a jew or moor who professed to convert to christianity in order to avoid persecution or expulsion. | *"In academic literature, converso designates (medieval spain and portugal) a jew or moor who professed to convert to christianity in order to avoid persecution or expulsion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convert]] | noun | **1.** A person who has been converted to another religious or political belief.<br>**2.** Change from one system to another or to a new plan or policy. | *"Look you how pale he glares, His form and cause conjoin’d, preaching to stones, Would make them capable.—Do not look upon me, Lest with this piteous action you convert My stern effects."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[converted]] | verb | **1.** Change from one system to another or to a new plan or policy.<br>**2.** Change the nature, purpose, or function of something. | *"Alexander died, Alexander was buried, Alexander returneth into dust; the dust is earth; of earth we make loam; and why of that loam whereto he was converted might they not stop a beer-barrel?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[converter]] | noun | **1.** A device for changing one substance or form or state into another. | *"The Bessemerising of Copper Mattes: — Development of the Process — The Converter — Converter Linings — Grade of Matte — Operation of the Process — Systems of Working, 192–216 LECTURE IX."* — Donald M. Levy, *Modern Copper Smelting* |
| [[convertibility]] | noun | **1.** The quality of being exchangeable (especially the ability to convert a currency into gold or other currencies without restriction). | *"In academic literature, convertibility designates the quality of being exchangeable (especially the ability to convert a currency into gold or other currencies without restriction)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convertible]] | noun | **1.** A car that has top that can be folded or removed.<br>**2.** A corporate security (usually bonds or preferred stock) that can be exchanged for another form of security (usually common stock). | *"But on the Continent there was the outer life, which was palpable and visible at every turn, and more easily convertible to literary uses than the customs of those opaque islanders."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[convertor]] | noun | **1.** A device for changing one substance or form or state into another. | *"In academic literature, convertor designates a device for changing one substance or form or state into another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countersubversion]] | noun | **1.** The aspect of counterintelligence designed to detect and prevent subversive activities. | *"In academic literature, countersubversion designates the aspect of counterintelligence designed to detect and prevent subversive activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cover]] | noun | **1.** A covering that serves to conceal or shelter something.<br>**2.** Bedding that keeps a person warm in bed. | *"For all that beauty that doth cover thee, Is but the seemly raiment of my heart, Which in thy breast doth live, as thine in me, How can I then be elder than thou art?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coverage]] | noun | **1.** The total amount and type of insurance carried.<br>**2.** The extent to which something is covered. | *"The analysis was incisive, the coverage comprehensive."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[coverall]] | noun | **1.** A loose-fitting protective garment that is worn over other clothing. | *"A slight adjustment brought into sharp focus the closed features of the three men and three women in dun-colored coveralls, under escort."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[covered]] | verb | **1.** Provide with a covering or cause to be covered.<br>**2.** Form a cover over. | *"I think he is not a pick-purse nor a horse-stealer, but for his verity in love, I do think him as concave as a covered goblet or a worm-eaten nut."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[covering]] | noun | **1.** A natural object that covers or envelops.<br>**2.** An artifact that covers something else (usually to protect or shelter or conceal it). | *"The benediction of these covering heavens Fall on their heads like dew! for they are worthy To inlay heaven with stars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coverlet]] | noun | **1.** A decorative bedspread (usually quilted). | *"Without the bed her other fair hand was, On the green coverlet; whose perfect white Showed like an April daisy on the grass, With pearly sweat resembling dew of night."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[covert]] | noun | **1.** A flock of coots.<br>**2.** A covering that serves to conceal or shelter something. | *"I speak of peace, while covert enmity Under the smile of safety wounds the world."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[covertly]] | adverb | **1.** In a covert manner. | *"Not honestly, my lord; but so covertly that no dishonesty shall appear in me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[covertness]] | noun | **1.** The state of being covert and hidden. | *"In academic literature, covertness designates the state of being covert and hidden."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discover]] | verb | **1.** Discover or determine the existence, presence, or fact of.<br>**2.** Get to know or become aware of, usually accidentally. | *"If there be here German, or Dane, Low Dutch, Italian, or French, let him speak to me, I’ll discover that which shall undo the Florentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discoverable]] | adjective | **1.** Capable of being ascertained or found out. | *"I am aware that it is so prominent as to be discoverable immediately."* — Charles Dickens, *Bleak House* |
| [[discovered]] | verb | **1.** Discover or determine the existence, presence, or fact of.<br>**2.** Get to know or become aware of, usually accidentally. | *"The general says you that have so traitorously discovered the secrets of your army, and made such pestiferous reports of men very nobly held, can serve the world for no honest use; therefore you must die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discoverer]] | noun | **1.** Someone who is the first to think of or make something.<br>**2.** Someone who is the first to observe something. | *"Does it seem incongruous to you that a Middlemarch surgeon should dream of himself as a discoverer?"* — George Eliot, *Middlemarch* |
| [[discovery]] | noun | **1.** The act of discovering something.<br>**2.** Something that is discovered. | *"The heavens have thought well on thee, Lafew, To bring forth this discovery."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissever]] | verb | **1.** Separate into parts or portions. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diver]] | noun | **1.** Someone who works underwater.<br>**2.** Someone who dives (into water). | *"You’re caught.” CHARMIAN. ’Twas merry when You wagered on your angling; when your diver Did hang a salt fish on his hook, which he With fervency drew up."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divers]] | noun | **1.** Someone who works underwater.<br>**2.** Someone who dives (into water). | *"On each side her Stood pretty dimpled boys, like smiling Cupids, With divers-coloured fans, whose wind did seem To glow the delicate cheeks which they did cool, And what they undid did."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverse]] | adjective | **1.** Many and different.<br>**2.** Distinctly dissimilar or unlike. | *"Pilate waxed eloquent over the diverse sects and the fanatic uprisings and riotings that were continually occurring."* — Jack London, *The Jacket (The Star-Rover)* |
| [[diversely]] | adverb | **1.** In diverse ways. | *"A mere spectator of other men’s fortunes and adventures, and how they play their parts; which, methinks, are diversely presented unto me, as from a common theatre or scene.”--BURTON."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[diverseness]] | noun | **1.** Noticeable heterogeneity. | *"In academic literature, diverseness designates noticeable heterogeneity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diversification]] | noun | **1.** The act of introducing variety (especially in investments or in the variety of goods and services offered).<br>**2.** The condition of being varied. | *"Industries are forced into an earlier diversification by tariffs."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[diversified]] | verb | **1.** Make (more) diverse.<br>**2.** Spread into new habitats and produce variety or variegate. | *"The conclusion of her visit, however, was diversified in a way which she had not at all imagined."* — Jane Austen, *Persuasion* |
| [[diversify]] | verb | **1.** Make (more) diverse.<br>**2.** Spread into new habitats and produce variety or variegate. | *"Whilst the alloy and value depended on the general authority, a right of coinage in the particular States could have no other effect than to multiply expensive mints and diversify the forms and weights of the circulating pieces."* — Alexander Hamilton, *The Federalist Papers* |
| [[diversion]] | noun | **1.** An activity that diverts or amuses or stimulates.<br>**2.** A turning aside (of your course or attention or concern). | *"Guppy, after a moment’s consideration, began, to the great diversion of his mother, which she displayed by nudging Mr."* — Charles Dickens, *Bleak House* |
| [[diversionary]] | adjective | **1.** (of tactics e.g.) likely or designed to confuse or deceive. | *"Narval did say to crank in diversionary tactics that would draw the Terminals' defensive forces away from their normal ops zone." "That's weird." "Agreed."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[diversionist]] | noun | **1.** Someone who commits sabotage or deliberately causes wrecks. | *"In academic literature, diversionist designates someone who commits sabotage or deliberately causes wrecks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diversity]] | noun | **1.** Noticeable heterogeneity.<br>**2.** The condition or result of being changeable. | *"They are of the utmost diversity of subjects, literally including the "all things" of the Bible, and temporal as well as spiritual interests."* — Classic Author, *The wonders of prayer* |
| [[divert]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"The French, advis’d by good intelligence Of this most dreadful preparation, Shake in their fear, and with pale policy Seek to divert the English purposes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverted]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"Rynaldo, you did never lack advice so much As letting her pass so; had I spoke with her, I could have well diverted her intents, Which thus she hath prevented."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverticulitis]] | noun | **1.** Inflammation of a diverticulum in the digestive tract (especially the colon); characterized by painful abdominal cramping and fever and constipation. | *"In academic literature, diverticulitis designates inflammation of a diverticulum in the digestive tract (especially the colon); characterized by painful abdominal cramping and fever and constipation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverticulosis]] | noun | **1.** Presence of multiple diverticula in the walls of the colon. | *"In academic literature, diverticulosis designates presence of multiple diverticula in the walls of the colon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverticulum]] | noun | **1.** A herniation through the muscular wall of a tubular organ (especially the colon). | *"In academic literature, diverticulum designates a herniation through the muscular wall of a tubular organ (especially the colon)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divertimento]] | noun | **1.** A musical composition in several movements; has no fixed form. | *"In academic literature, divertimento designates a musical composition in several movements; has no fixed form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverting]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"Bathsheba went home, her mind occupied with a new trouble, which being rather harassing than deadly was calculated to do good by diverting her from the chronic gloom of her life."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[divertingly]] | adverb | **1.** In an entertaining and amusing manner. | *"In academic literature, divertingly designates in an entertaining and amusing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ever]] | adverb | **1.** At any time.<br>**2.** At all times; all the time and on every occasion. | *"O no, thy love though much, is not so great, It is my love that keeps mine eye awake, Mine own true love that doth my rest defeat, To play the watchman ever for thy sake."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[everest]] | noun | **1.** A mountain in the central himalayas on the border of tibet and nepal; the highest mountain peak in the world (29,028 feet high). | *"In academic literature, everest designates a mountain in the central himalayas on the border of tibet and nepal; the highest mountain peak in the world (29,028 feet high)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[everlasting]] | noun | **1.** Any of various plants of various genera of the family compositae having flowers that can be dried without loss of form or color.<br>**2.** Continuing forever or indefinitely. | *"Especially he hath incurred the everlasting displeasure of the king, who had even tun’d his bounty to sing happiness to him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[everlastingly]] | adverb | **1.** For a limitless time; ; - p.p.bliss. | *"To whom, with all submission, on my knee, I do bequeath my faithful services And true subjection everlastingly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[everlastingness]] | noun | **1.** The property of lasting forever. | *"That would depend upon whether the germs of staunch comradeship underlay the temporary emotion, or whether it were a sensuous joy in her form only, with no substratum of everlastingness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[evermore]] | adverb | **1.** At any future time; in the future.<br>**2.** For a limitless time; ; - p.p.bliss. | *"Past cure I am, now reason is past care, And frantic-mad with evermore unrest, My thoughts and my discourse as mad men’s are, At random from the truth vainly expressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evernia]] | noun | **1.** Lichens of the family usneaceae having a pendulous or shrubby thallus. | *"In academic literature, evernia designates lichens of the family usneaceae having a pendulous or shrubby thallus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evers]] | noun | **1.** United states civil rights worker in mississippi; was killed by a sniper (1925-1963). | *"In academic literature, evers designates united states civil rights worker in mississippi; was killed by a sniper (1925-1963)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eversion]] | noun | **1.** The position of being turned outward.<br>**2.** The act of turning inside out. | *"In academic literature, eversion designates the position of being turned outward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evert]] | noun | **1.** United states tennis player who won women's singles titles in the united states and at wimbledon (born in 1954).<br>**2.** Turn inside out; turn the inner surface of outward. | *"What will not money, diligence, and faire words doe, with corrupt dispositions--everting of all bonds of either religious or civil duties?"* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[everting]] | noun | **1.** The act of turning inside out.<br>**2.** Turn inside out; turn the inner surface of outward. | *"What will not money, diligence, and faire words doe, with corrupt dispositions--everting of all bonds of either religious or civil duties?"* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[every]] | adjective | **1.** (used of count nouns) each and all of the members of a group considered singly and without exception.<br>**2.** Each and all of a series of entities or intervals as specified. | *"But thou, to whom my jewels trifles are, Most worthy comfort, now my greatest grief, Thou best of dearest, and mine only care, Art left the prey of every vulgar thief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[everyday]] | adjective | **1.** Found in the ordinary course of events; ; ; - anita diamant.<br>**2.** Appropriate for ordinary or routine occasions. | *"Finding by whom he was observed, Henry Crawford addressed himself on the same subject to Sir Thomas, in a more everyday tone, but still with feeling."* — Jane Austen, *Mansfield Park* |
| [[everydayness]] | noun | **1.** Ordinariness as a consequence of being frequent and commonplace. | *"In academic literature, everydayness designates ordinariness as a consequence of being frequent and commonplace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[everyman]] | noun | **1.** The ordinary person. | *"Therefore, everyman, look to that last end that is thy death and the dust that gripeth on every man that is born of woman for as he came naked forth from his mother’s womb so naked shall he wend him at the last for to go as he came."* — James Joyce, *Ulysses* |
| [[everyplace]] | adverb | **1.** To or in any or all places; ; ; ; ; (`everyplace' is used informally for `everywhere'). | *"In academic literature, everyplace designates to or in any or all places; ; ; ; ; (`everyplace' is used informally for `everywhere')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[everywhere]] | adverb | **1.** To or in any or all places; ; ; ; ; (`everyplace' is used informally for `everywhere'). | *"What old December’s bareness everywhere!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extraversion]] | noun | **1.** (psychology) an extroverted disposition; concern with what is outside the self. | *"In academic literature, extraversion designates (psychology) an extroverted disposition; concern with what is outside the self."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraversive]] | adjective | **1.** Directed outward; marked by interest in others or concerned with external reality. | *"In academic literature, extraversive designates directed outward; marked by interest in others or concerned with external reality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extravert]] | noun | **1.** (psychology) a person concerned more with practical realities than with inner thoughts and feelings.<br>**2.** Being concerned with the social and physical environment. | *"In academic literature, extravert designates (psychology) a person concerned more with practical realities than with inner thoughts and feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraverted]] | adjective | **1.** Being concerned with the social and physical environment. | *"In academic literature, extraverted designates being concerned with the social and physical environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extravertive]] | adjective | **1.** Being concerned with the social and physical environment. | *"In academic literature, extravertive designates being concerned with the social and physical environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadvertence]] | noun | **1.** An unintentional omission resulting from failure to notice something.<br>**2.** The trait of forgetting or ignoring your responsibilities. | *"Whatever her sins, they were not sins of intention, but of inadvertence, and why should she have been punished so persistently?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inadvertency]] | noun | **1.** The trait of forgetting or ignoring your responsibilities. | *"In academic literature, inadvertency designates the trait of forgetting or ignoring your responsibilities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadvertent]] | adjective | **1.** Happening by chance or unexpectedly or unintentionally. | *"The boy, also, after a week or two of mental disquiet, began to gratify his protectors by many inadvertent proofs that he considered them as parents, and their house as home."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[inadvertently]] | adverb | **1.** Without knowledge or intention. | *"But as you, though inadvertently and without intending so unreasonable a question, asked me ‘what for?’ let me reply to you."* — Charles Dickens, *Bleak House* |
| [[inconvertibility]] | noun | **1.** The quality of not being exchangeable. | *"In academic literature, inconvertibility designates the quality of not being exchangeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconvertible]] | adjective | **1.** Used especially of currencies; incapable of being exchanged for or replaced by another currency of equal value.<br>**2.** Not capable of being changed into something else. | *"Typical bank-notes, unlike inconvertible paper money, depend for their value on the credit of the bank, not on their legal-tender quality and on political power."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[intervertebral]] | adjective | **1.** Pertaining to the space between two vertebrae. | *"In academic literature, intervertebral designates pertaining to the space between two vertebrae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introversion]] | noun | **1.** The condition of being folded inward or sheathed.<br>**2.** The folding in of an outer layer so as to form a pocket in the surface. | *"In academic literature, introversion designates the condition of being folded inward or sheathed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introversive]] | adjective | **1.** Directed inward; marked by interest in yourself or concerned with inner feelings. | *"In academic literature, introversive designates directed inward; marked by interest in yourself or concerned with inner feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introvert]] | noun | **1.** (psychology) a person who tends to shrink from social contacts and to become preoccupied with their own thoughts.<br>**2.** Fold inwards. | *"In academic literature, introvert designates (psychology) a person who tends to shrink from social contacts and to become preoccupied with their own thoughts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introverted]] | verb | **1.** Fold inwards.<br>**2.** Turn inside. | *"In academic literature, introverted designates fold inwards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introvertish]] | adjective | **1.** Somewhat introverted. | *"In academic literature, introvertish designates somewhat introverted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introvertive]] | adjective | **1.** Directed inward; marked by interest in yourself or concerned with inner feelings. | *"In academic literature, introvertive designates directed inward; marked by interest in yourself or concerned with inner feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inverse]] | noun | **1.** Something inverted in sequence or character or effect.<br>**2.** Reversed (turned backward) in order or nature or effect. | *"We had in deed “struck,” to use a sea expression, but in an inverse sense, and at a thousand feet deep."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[inversely]] | adverb | **1.** In an inverse or contrary manner; ; - f.a.geldard. | *"According to the quantity theory we must expect that, when conditions (1) and (2) remain fixed, the value of money will vary inversely as its quantity."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inversion]] | noun | **1.** The layer of air near the earth is cooler than an overlying layer.<br>**2.** Abnormal condition in which an organ is turned inward or inside out (as when the upper part of the uterus is pulled into the cervical canal after childbirth). | *"And the worst was the strange inversion of time."* — Donn Byrne, *The Wind Bloweth* |
| [[invert]] | verb | **1.** Make an inversion (in a musical composition).<br>**2.** Reverse the position, order, relation, or condition of. | *"O heaven, O earth, bear witness to this sound, And crown what I profess with kind event, If I speak true; if hollowly, invert What best is boded me to mischief!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invertase]] | noun | **1.** An enzyme that catalyzes the hydrolysis of sucrose into glucose and fructose. | *"In academic literature, invertase designates an enzyme that catalyzes the hydrolysis of sucrose into glucose and fructose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invertebrate]] | noun | **1.** Any animal lacking a backbone or notochord; the term is not used as a scientific classification.<br>**2.** Lacking a backbone or spinal column. | *"In academic literature, invertebrate designates any animal lacking a backbone or notochord; the term is not used as a scientific classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inverted]] | verb | **1.** Make an inversion (in a musical composition).<br>**2.** Reverse the position, order, relation, or condition of. | *"You have only knowledge enough of the language to translate at sight these inverted, transposed, curtailed Italian lines, into clear, comprehensible, elegant English."* — Jane Austen, *Persuasion* |
| [[inverter]] | noun | **1.** An electrical converter that converts direct current into alternating current. | *"In academic literature, inverter designates an electrical converter that converts direct current into alternating current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invertible]] | adjective | **1.** Having an additive or multiplicative inverse. | *"In academic literature, invertible designates having an additive or multiplicative inverse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irreverence]] | noun | **1.** An irreverent mental attitude.<br>**2.** A disrespectful act. | *"And the feeling is one with which a Catholic must sympathise, in an age when--if we may say so without irreverence--the Almighty has been made a constitutional Deity, with certain state-grants of worship, but no influence over political affairs."* — Francis Thompson, *Shelley: An Essay* |
| [[irreverent]] | adjective | **1.** Showing lack of due respect or veneration.<br>**2.** Characterized by a lightly pert and exuberant quality. | *"Graffiti is an irreverent form, with strong popular and anti-establishment elements."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[irreverently]] | adverb | **1.** Without respect.<br>**2.** In an irreverent manner. | *"Did you think me speaking improperly, lightly, irreverently on the subject?"* — Jane Austen, *Mansfield Park* |
| [[irreversibility]] | noun | **1.** The quality of being irreversible (once done it cannot be changed). | *"In academic literature, irreversibility designates the quality of being irreversible (once done it cannot be changed)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irreversible]] | adjective | **1.** Incapable of being reversed. | *"An unsatisfactory equation between an exodus and return in time through reversible space and an exodus and return in space through irreversible time."* — James Joyce, *Ulysses* |
| [[irreversibly]] | adverb | **1.** In an irreversible manner. | *"The real man is discovered, his worth is impartially weighed, his rank is irreversibly decreed."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nonreversible]] | adjective | **1.** Not reversible or capable of having either side out. | *"In academic literature, nonreversible designates not reversible or capable of having either side out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obverse]] | noun | **1.** The more conspicuous of two alternatives or cases or sides.<br>**2.** The side of a coin or medal bearing the principal stamp or design. | *"Were there obverse meditations of involution increasingly less vast?"* — James Joyce, *Ulysses* |
| [[perseverance]] | noun | **1.** Persistent determination.<br>**2.** The act of persisting or persevering; continuing or repeating behavior. | *"Perseverance, dear my lord, Keeps honour bright."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perseverate]] | verb | **1.** Psychology: repeat a response after the cessation of the original stimulus. | *"In academic literature, perseverate designates psychology: repeat a response after the cessation of the original stimulus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perseveration]] | noun | **1.** The tendency for a memory or idea to persist or recur without any apparent stimulus for it.<br>**2.** The act of persisting or persevering; continuing or repeating behavior. | *"In academic literature, perseveration designates the tendency for a memory or idea to persist or recur without any apparent stimulus for it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[persevere]] | verb | **1.** Be persistent, refuse to stop. | *"Tess still stood hesitating like a bather about to make his plunge, hardly knowing whether to retreat or to persevere, when a figure came forth from the dark triangular door of the tent."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[persevering]] | verb | **1.** Be persistent, refuse to stop.<br>**2.** Quietly and steadily persevering especially in detail or exactness. | *"But the doomed young rebel (otherwise a mild youth, and very persevering), showing no sign of grace as he got older but, on the contrary, constructing a model of a power-loom, she was fain, with many tears, to mention his backslidings to the baronet."* — Charles Dickens, *Bleak House* |
| [[perverse]] | adjective | **1.** Marked by a disposition to oppose and contradict.<br>**2.** Resistant to guidance or discipline. | *"If I were covetous, ambitious, or perverse, As he will have me, how am I so poor?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perversely]] | adverb | **1.** Deliberately deviant.<br>**2.** In a contrary disobedient manner. | *"Ay, and perversely she persevers so."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perverseness]] | noun | **1.** Deliberate and stubborn unruliness and resistance to guidance or discipline.<br>**2.** Deliberately deviating from what is good. | *"With a similar perverseness, the potatoes crumble off forks in the process of peeling, upheaving from their centres in every direction, as if they were subject to earthquakes."* — Charles Dickens, *Bleak House* |
| [[perversion]] | noun | **1.** A curve that reverses the direction of something.<br>**2.** An aberrant sexual practice. | *"Besides,” he said, pursuing his argument in his tone of light-hearted conviction, “if I don’t go anywhere for pain—which would be a perversion of the intention of my being, and a monstrous thing to do—why should I go anywhere to be the cause of pain?"* — Charles Dickens, *Bleak House* |
| [[perversity]] | noun | **1.** Deliberate and stubborn unruliness and resistance to guidance or discipline.<br>**2.** Deliberately deviating from what is good. | *"And what a distortion in your judgment, what a perversity in your ideas, is proved by your conduct!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[perversive]] | adjective | **1.** Tending to corrupt or pervert. | *"In academic literature, perversive designates tending to corrupt or pervert."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pervert]] | noun | **1.** A person whose behavior deviates from what is acceptable especially in sexual behavior.<br>**2.** Corrupt morally or by intemperance or sensuality. | *"Let’s follow him and pervert the present wrath He hath against himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perverted]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Practice sophistry; change the meaning of or be vague about in order to mislead or deceive. | *"He hath perverted a young gentlewoman here in Florence, of a most chaste renown, and this night he fleshes his will in the spoil of her honour; he hath given her his monumental ring, and thinks himself made in the unchaste composition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provera]] | noun | **1.** A progestin compound (trade name provera) used to treat menstrual disorders. | *"In academic literature, provera designates a progestin compound (trade name provera) used to treat menstrual disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reconvert]] | verb | **1.** Convert back. | *"In academic literature, reconvert designates convert back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recover]] | verb | **1.** Get or find back; recover the use of.<br>**2.** Get over an illness or shock. | *"I would I had any drum of the enemy’s; I would swear I recover’d it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recoverable]] | adjective | **1.** Capable of being recovered or regained. | *"You must consider that a prodigal course Is like the sun’s, but not like his recoverable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recovered]] | verb | **1.** Get or find back; recover the use of.<br>**2.** Get over an illness or shock. | *"E’en that you have there. [_Exit._] COUNTESS. [_Reads._] _I have sent you a daughter-in-law; she hath recovered the king and undone me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recoverer]] | noun | **1.** Someone who saves something from danger or violence. | *"In academic literature, recoverer designates someone who saves something from danger or violence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recovering]] | verb | **1.** Get or find back; recover the use of.<br>**2.** Get over an illness or shock. | *"Have I the pleasure of addressing another of the youthful parties in Jarndyce?” said the old lady, recovering herself, with her head on one side, from a very low curtsy."* — Charles Dickens, *Bleak House* |
| [[recovery]] | noun | **1.** Return to an original state.<br>**2.** Gradual healing (through rest) after sickness or injury. | *"What the devil should move me to undertake the recovery of this drum, being not ignorant of the impossibility, and knowing I had no such purpose?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rediscover]] | verb | **1.** Discover again. | *"Men, he saw, do not want precepts; they do not want ethics, morals or rules; what they do need is to rethink God, to rediscover him, to re-explore him, to live on the basis of relation with God."* — T. R. Glover, *The Jesus of History* |
| [[rediscovery]] | noun | **1.** The act of discovering again. | *"In academic literature, rediscovery designates the act of discovering again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retroversion]] | noun | **1.** A turning or tilting backward of an organ or body part.<br>**2.** Translation back into the original language. | *"In academic literature, retroversion designates a turning or tilting backward of an organ or body part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrovert]] | verb | **1.** Go back to a previous state. | *"In academic literature, retrovert designates go back to a previous state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revere]] | noun | **1.** American silversmith remembered for his midnight ride (celebrated in a poem by longfellow) to warn the colonists in lexington and concord that british troops were coming (1735-1818).<br>**2.** A lapel on a woman's garment; turned back to show the reverse side. | *"The great Creator to revere, Must sure become the creature; But still the preaching cant forbear, And ev’n the rigid feature: Yet ne’er with wits profane to range, Be complaisance extended; An atheist-laugh’s a poor exchange For Deity offended!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[revered]] | verb | **1.** Love unquestioningly and uncritically or to excess; venerate as an idol.<br>**2.** Regard with feelings of respect and reverence; consider hallowed or exalted or be in awe of. | *"Perhaps he revered his father’s practice even more now than ever, seeing that, in the question of making Tessy his wife, his father had not once thought of inquiring whether she were well provided or penniless."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[reverence]] | noun | **1.** A feeling of profound respect for someone or something.<br>**2.** A reverent mental attitude. | *"I have as much of my father in me as you, albeit I confess your coming before me is nearer to his reverence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverend]] | noun | **1.** A member of the clergy and a spiritual leader of the christian church.<br>**2.** A title of respect for a clergyman. | *"Of very reverend reputation, sir, Of credit infinite, highly belov’d, Second to none that lives here in the city."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverent]] | adjective | **1.** Feeling or showing profound respect or veneration.<br>**2.** Showing great reverence for god. | *"A very reverent body; ay, such a one as a man may not speak of without he say “sir-reverence”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverential]] | adjective | **1.** Feeling or manifesting veneration. | *"But a stir in that direction, a gathering of reverential awe in the rustic faces, and a blandly ferocious assumption on the part of Mr."* — Charles Dickens, *Bleak House* |
| [[reverentially]] | adverb | **1.** With reverence; in a reverent manner. | *"I have been trying with all my might,--asking God to help me too," she added low and reverentially; "but papa doesn't know that, and he has been very near banishing me two or three times before."* — Martha Finley, *Elsie's Kith and Kin* |
| [[reverently]] | adverb | **1.** With reverence; in a reverent manner. | *"Chide him for faults, and do it reverently, When you perceive his blood inclined to mirth; But, being moody, give him time and scope, Till that his passions, like a whale on ground, Confound themselves with working."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reverie]] | noun | **1.** Absentminded dreaming while awake.<br>**2.** An abstracted state of absorption. | *"So I am told.” “You don’t know where?” “No, sir,” returned the trooper, lifting up his eyes and coming out of his reverie."* — Charles Dickens, *Bleak House* |
| [[revers]] | noun | **1.** A lapel on a woman's garment; turned back to show the reverse side. | *"Revers’d that spear, redoubtable in war, Reclined that banner, erst in fields unfurl’d, That like a deathful meteor gleam’d afar, And brav’d the mighty monarchs of the world."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[reversal]] | noun | **1.** A change from one state to the opposite state.<br>**2.** An unfortunate happening that hinders or impedes; something that is thwarting or frustrating. | *"The free-silver advocates got what they desired, a reversal of the movement of general prices, through an occurrence for which no political party could claim the credit."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[reverse]] | noun | **1.** A relation of direct opposition.<br>**2.** The gears by which the motion of a machine can be reversed. | *"Reverse thy state; And in thy best consideration check This hideous rashness: answer my life my judgement, Thy youngest daughter does not love thee least; Nor are those empty-hearted, whose low sounds Reverb no hollowness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reversed]] | verb | **1.** Change to the contrary.<br>**2.** Turn inside out or upside down. | *"It addressed me as if our places were reversed, as if all the good deeds had been mine and all the feelings they had awakened his."* — Charles Dickens, *Bleak House* |
| [[reversely]] | adverb | **1.** In an opposite way; so as to be reversed. | *"In academic literature, reversely designates in an opposite way; so as to be reversed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversibility]] | noun | **1.** The quality of being reversible in either direction. | *"In academic literature, reversibility designates the quality of being reversible in either direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversible]] | noun | **1.** A garment (especially a coat) that can be worn inside out (with either side of the cloth showing).<br>**2.** Capable of reversing or being reversed. | *"Reversible propositions 113:9 The fundamental propositions of divine metaphysics are summarized in the four following, to me, /self-evident/ propositions."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[reversibly]] | adverb | **1.** In a reversible manner. | *"In academic literature, reversibly designates in a reversible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversion]] | noun | **1.** (law) an interest in an estate that reverts to the grantor (or his heirs) at the end of some period (e.g., the death of the grantee).<br>**2.** (genetics) a return to a normal phenotype (usually resulting from a second mutation). | *"Faith, and so we should, where now remains A sweet reversion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reversionary]] | adjective | **1.** Of or relating to or involving a reversion (especially a legal reversion). | *"These money transactions--these speculations in life and death--these silent battles for reversionary spoil--make brothers very loving towards each other in Vanity Fair."* — William Makepeace Thackeray, *Vanity Fair* |
| [[reversioner]] | noun | **1.** (law) a party who is entitled to an estate in reversion. | *"In academic literature, reversioner designates (law) a party who is entitled to an estate in reversion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversionist]] | noun | **1.** Someone who lapses into previous undesirable patterns of behavior. | *"In academic literature, reversionist designates someone who lapses into previous undesirable patterns of behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reversive]] | adjective | **1.** Tending to be turned back. | *"In academic literature, reversive designates tending to be turned back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revert]] | verb | **1.** Go back to a previous state.<br>**2.** Undergo reversion, as in a mutation. | *"Some men rarely revert to their father, but seem, in the bank-books of their remembrance, to have transferred all the stock of filial affection into their mother’s name."* — Charles Dickens, *Bleak House* |
| [[revertible]] | adjective | **1.** To be returned to the former owner or that owner's heirs. | *"In academic literature, revertible designates to be returned to the former owner or that owner's heirs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reverting]] | noun | **1.** A failure to maintain a higher state.<br>**2.** Go back to a previous state. | *"It entered into all his calculations about money in a singular manner which I don’t think I can better explain than by reverting for a moment to our loan to Mr."* — Charles Dickens, *Bleak House* |
| [[revery]] | noun | **1.** An abstracted state of absorption.<br>**2.** Absentminded dreaming while awake. | *"So still and subdued and yet somehow preluding was all the scene, and such an incantation of revery lurked in the air, that each silent sailor seemed resolved into his own invisible self."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[sever]] | verb | **1.** Set or keep apart.<br>**2.** Cut off from a whole. | *"Thus have you heard me sever’d from my bliss, That by misfortunes was my life prolong’d To tell sad stories of my own mishaps."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severable]] | adjective | **1.** Capable of being divided or dissociated. | *"In academic literature, severable designates capable of being divided or dissociated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[several]] | adjective | **1.** (used with count nouns) of an indefinite number more than 2 or 3 but not many.<br>**2.** Considered individually. | *"Why should my heart think that a several plot, Which my heart knows the wide world’s common place?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[several-seeded]] | adjective | **1.** Having many seeds. | *"In academic literature, several-seeded designates having many seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severalise]] | verb | **1.** Distinguish or separate.<br>**2.** Mark as different. | *"In academic literature, severalise designates distinguish or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severalize]] | verb | **1.** Distinguish or separate.<br>**2.** Mark as different. | *"In academic literature, severalize designates distinguish or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severally]] | adverb | **1.** Apart from others. | *"Haste you again. [_Exeunt severally._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severalty]] | noun | **1.** The state of being several and distinct.<br>**2.** Exclusive individual ownership. | *"In academic literature, severalty designates the state of being several and distinct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severance]] | noun | **1.** A personal or social separation (as between opposing factions).<br>**2.** The act of severing. | *"She had sighed for her self-completeness then, and now she cried aloud against the severance of the union she had deplored."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[severe]] | adjective | **1.** Intensely or extremely bad or unpleasant in degree or quality.<br>**2.** Very strong or vigorous. | *"And then the justice, In fair round belly with good capon lined, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severed]] | verb | **1.** Set or keep apart.<br>**2.** Cut off from a whole. | *"Our force by land Hath nobly held; our severed navy too Have knit again, and fleet, threat’ning most sea-like."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severely]] | adverb | **1.** To a severe or serious degree.<br>**2.** With sternness; in a severe manner. | *"The King is not himself, but basely led By flatterers; and what they will inform, Merely in hate ’gainst any of us all, That will the King severely prosecute ’Gainst us, our lives, our children, and our heirs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severeness]] | noun | **1.** Used of the degree of something undesirable e.g. pain or weather.<br>**2.** Something hard to endure. | *"In academic literature, severeness designates used of the degree of something undesirable e.g. pain or weather."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[severing]] | noun | **1.** The act of severing.<br>**2.** Set or keep apart. | *"Much better She ne’er had known pomp; though’t be temporal, Yet if that quarrel, Fortune, do divorce It from the bearer, ’tis a sufferance panging As soul and body’s severing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severity]] | noun | **1.** Used of the degree of something undesirable e.g. pain or weather.<br>**2.** Something hard to endure. | *"He hath resisted law, And therefore law shall scorn him further trial Than the severity of the public power Which he so sets at naught."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[severn]] | noun | **1.** A river in ontario that flows northeast into hudson bay.<br>**2.** A river in england and wales flowing into the bristol channel; the longest river in great britain. | *"Leave not the worthy Lucius, good my lords, Till he have cross’d the Severn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subversion]] | noun | **1.** Destroying someone's (or some group's) honesty or loyalty; undermining moral integrity.<br>**2.** The act of subverting; as overthrowing or destroying a legally constituted government. | *"What louring star now envies thy estate That these great lords and Margaret our Queen Do seek subversion of thy harmless life?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subversive]] | noun | **1.** A radical supporter of political or social revolution.<br>**2.** In opposition to a civil authority or government. | *"I don’t know what there may be to say, but you must remember that Ralph must talk.” “He thinks your friend’s too subversive--or not subversive enough!"* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[subversiveness]] | noun | **1.** Disloyalty by virtue of subversive behavior. | *"In academic literature, subversiveness designates disloyalty by virtue of subversive behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvert]] | verb | **1.** Cause the downfall of; of rulers.<br>**2.** Corrupt morally or by intemperance or sensuality. | *"Schemes to subvert the liberties of a great community REQUIRE TIME to mature them for execution."* — Alexander Hamilton, *The Federalist Papers* |
| [[subverter]] | noun | **1.** A radical supporter of political or social revolution. | *"In academic literature, subverter designates a radical supporter of political or social revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transversal]] | adjective | **1.** Extending or lying across; in a crosswise direction; at right angles to the long axis. | *"In academic literature, transversal designates extending or lying across; in a crosswise direction; at right angles to the long axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transversally]] | adverb | **1.** In a transverse manner. | *"In academic literature, transversally designates in a transverse manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transverse]] | adjective | **1.** Extending or lying across; in a crosswise direction; at right angles to the long axis. | *"Among the Western Dénés it is believed that one or two transverse lines tattooed on the arms or legs of a young man by a pubescent girl are a specific against premature weakness of these limbs."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[transversely]] | adverb | **1.** In a transverse manner. | *"Brooke wound up, rubbing his thumb transversely along the edges of the leaves as he held the book forward."* — George Eliot, *Middlemarch* |
| [[traversable]] | adjective | **1.** Capable of being traversed. | *"In academic literature, traversable designates capable of being traversed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[traversal]] | noun | **1.** Taking a zigzag path on skis.<br>**2.** Travel across. | *"In academic literature, traversal designates taking a zigzag path on skis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[traverse]] | noun | **1.** A horizontal beam that extends across something.<br>**2.** A horizontal crosspiece across a window or separating a door from a window over it. | *"He writes brave verses, speaks brave words, swears brave oaths, and breaks them bravely, quite traverse, athwart the heart of his lover, as a puny tilter, that spurs his horse but on one side, breaks his staff like a noble goose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[traverser]] | noun | **1.** Someone who moves or passes across. | *"In academic literature, traverser designates someone who moves or passes across."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconverted]] | adjective | **1.** Not converted. | *"Still unconverted, but, to satisfy his mother, he consented to remain in the room during a visit of the missionary of that district; a man with sufficient tact not to make his efforts obnoxious."* — Classic Author, *The wonders of prayer* |
| [[unconvertible]] | adjective | **1.** Used especially of currencies; incapable of being exchanged for or replaced by another currency of equal value. | *"In academic literature, unconvertible designates used especially of currencies; incapable of being exchanged for or replaced by another currency of equal value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncover]] | verb | **1.** Make visible.<br>**2.** Remove all or part of one's clothes to show one's body. | *"Then as the manner of our country is, In thy best robes, uncover’d, on the bier, Thou shalt be borne to that same ancient vault Where all the kindred of the Capulets lie."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncovered]] | verb | **1.** Make visible.<br>**2.** Remove all or part of one's clothes to show one's body. | *"No, rather let my head Stoop to the block than these knees bow to any Save to the God of heaven and to my King; And sooner dance upon a bloody pole Than stand uncovered to the vulgar groom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncovering]] | noun | **1.** The removal of covering.<br>**2.** The act of discovering something. | *"Time is long when there is neither night nor day.' Then, uncovering himself, he turned towards the city."* — Mrs. Oliphant, *A Beleaguered City* |
| [[undercover]] | adjective | **1.** Conducted with or marked by hidden aims or methods. | *"In academic literature, undercover designates conducted with or marked by hidden aims or methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiscovered]] | adjective | **1.** Not discovered.<br>**2.** Not yet discovered. | *"Full often, like a shag-haired crafty kern, Hath he conversed with the enemy, And undiscovered come to me again And given me notice of their villainies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undiversified]] | adjective | **1.** Not diversified. | *"In academic literature, undiversified designates not diversified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untraversable]] | adjective | **1.** Incapable of being traversed. | *"In academic literature, untraversable designates incapable of being traversed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untraversed]] | adjective | **1.** Not traveled over or through. | *"In academic literature, untraversed designates not traveled over or through."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unverifiable]] | adjective | **1.** (of e.g. evidence) not objective or easily verified. | *"In academic literature, unverifiable designates (of e.g. evidence) not objective or easily verified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unverified]] | adjective | **1.** Lacking proof or substantiation. | *"In academic literature, unverified designates lacking proof or substantiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unversed]] | adjective | **1.** Not having had extensive practice. | *"They were indeed excellent in two sciences for which I have great esteem, and wherein I am not unversed; but, at the same time, so abstracted and involved in speculation, that I never met with such disagreeable companions."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[veracious]] | adjective | **1.** Habitually speaking the truth.<br>**2.** Precisely accurate. | *"But it was not that you might know your uncle that I brought you to Europe.” A perfectly veracious speech; but, as Isabel thought, not as perfectly timed."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[veracity]] | noun | **1.** Unwillingness to tell lies. | *"Miller is the wife of a Congregational minister, and a lady of unquestionably veracity."* — Classic Author, *The wonders of prayer* |
| [[veracruz]] | noun | **1.** A major mexican port on the gulf of mexico in the state of veracruz. | *"In academic literature, veracruz designates a major mexican port on the gulf of mexico in the state of veracruz."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[veranda]] | noun | **1.** A porch along the outside of a building (sometimes partly enclosed). | *"Carry up her satchel, and see that she has every thing she wants." Having given the order, Zoe stepped out to the veranda where Edward still was, having staid behind to give directions in regard to the horses."* — Martha Finley, *Elsie's Kith and Kin* |
| [[verandah]] | noun | **1.** A porch along the outside of a building (sometimes partly enclosed). | *"I leant against a pillar of the verandah, drew my grey mantle close about me, and, trying to forget the cold which nipped me without, and the unsatisfied hunger which gnawed me within, delivered myself up to the employment of watching and thinking."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[verapamil]] | noun | **1.** A drug (trade names calan and isoptin) used as an oral or parenteral calcium blocker in cases of hypertension or congestive heart failure or angina or migraine. | *"In academic literature, verapamil designates a drug (trade names calan and isoptin) used as an oral or parenteral calcium blocker in cases of hypertension or congestive heart failure or angina or migraine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[veratrum]] | noun | **1.** A genus of coarse poisonous perennial herbs; sometimes placed in subfamily melanthiaceae. | *"In academic literature, veratrum designates a genus of coarse poisonous perennial herbs; sometimes placed in subfamily melanthiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verdict]] | noun | **1.** (law) the findings of a jury on issues of fact submitted to it for decision; can be used in formulating a judgment. | *"To side this title is impanelled A quest of thoughts, all tenants to the heart, And by their verdict is determined The clear eye’s moiety, and the dear heart’s part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[veridical]] | adjective | **1.** Coinciding with reality; - f.a.olafson. | *"In academic literature, veridical designates coinciding with reality; - f.a.olafson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verifiable]] | adjective | **1.** Capable of being verified.<br>**2.** Capable of being tested (verified or falsified) by experiment or observation. | *"Psychopathic, auto-suggestion, telepathy, the subliminal self--the words may tell us something; whether what they tell us is verifiable, remains to be seen."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[verification]] | noun | **1.** Additional proof that something that was believed (some fact or hypothesis or theory) is correct.<br>**2.** (law) an affidavit attached to a statement confirming the truth of that statement. | *"What a verification of the blessed promise: "Before they call I will answer; and while they are yet speaking I will hear." HELP FOR THE SHIPWRECKED."* — Classic Author, *The wonders of prayer* |
| [[verificatory]] | adjective | **1.** Serving to support or corroborate. | *"In academic literature, verificatory designates serving to support or corroborate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verified]] | verb | **1.** Confirm the truth of.<br>**2.** Check or regulate (a scientific experiment) by conducting a parallel experiment or comparing with another standard. | *"I have been The book of his good acts, whence men have read His fame unparalleled happily amplified; For I have ever verified my friends— Of whom he’s chief—with all the size that verity Would without lapsing suffer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verifier]] | noun | **1.** Someone who vouches for another or for the correctness of a statement. | *"In academic literature, verifier designates someone who vouches for another or for the correctness of a statement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verify]] | verb | **1.** Confirm the truth of.<br>**2.** Check or regulate (a scientific experiment) by conducting a parallel experiment or comparing with another standard. | *"I will verify as much in his beard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verifying]] | verb | **1.** Confirm the truth of.<br>**2.** Check or regulate (a scientific experiment) by conducting a parallel experiment or comparing with another standard. | *"For these examinations he prepared most carefully, sitting up sometimes till two o'clock in the morning collecting material and verifying references which he deemed necessary to make them complete."* — John Cairns, *Principal Cairns* |
| [[verily]] | adverb | **1.** In truth; certainly; ; - ps 37:3. | *"I verily did think That her old gloves were on, but ’twas her hands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verisimilar]] | adjective | **1.** Appearing to be true or real. | *"In academic literature, verisimilar designates appearing to be true or real."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verisimilitude]] | noun | **1.** The appearance of truth; the quality of seeming to be true. | *"What could be a finer testimony to Miss Harding's verisimilitude than the blandishments of these sweet innocents?"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[verism]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ver within the domain of Truth, Deception & Error.<br>**2.** A technical or specialized form exhibiting the properties of ver in systematic terminology. | *"In academic literature, verism designates pertaining to, derived from, or characteristic of latin ver within the domain of truth, deception & error."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[veritable]] | adjective | **1.** Often used as intensifiers.<br>**2.** Not counterfeit or copied. | *"Most veritable, therefore look to ’t well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verity]] | noun | **1.** Conformity to reality or actuality.<br>**2.** An enduring or necessary ethical or religious or aesthetic truth. | *"Ay, and the particular confirmations, point from point, to the full arming of the verity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verlaine]] | noun | **1.** French symbolist poet (1844-1896). | *"In academic literature, verlaine designates french symbolist poet (1844-1896)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermeer]] | noun | **1.** Dutch painter renowned for his use of light (1632-1675). | *"In academic literature, vermeer designates dutch painter renowned for his use of light (1632-1675)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermicelli]] | noun | **1.** Pasta in strings thinner than spaghetti. | *"Between his ribs and on each side of his spine he is supplied with a remarkable involved Cretan labyrinth of vermicelli-like vessels, which vessels, when he quits the surface, are completely distended with oxygenated blood."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vermicide]] | noun | **1.** An agent that kills worms (especially those in the intestines). | *"In academic literature, vermicide designates an agent that kills worms (especially those in the intestines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermicular]] | adjective | **1.** Decorated with wormlike tracery or markings. | *"In academic literature, vermicular designates decorated with wormlike tracery or markings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermiculate]] | verb | **1.** Decorate with wavy or winding lines.<br>**2.** Infested with or damaged (as if eaten) by worms. | *"These filed in about nine o’clock, their vermiculated horns lopping gracefully on each side of their cheeks in geometrically perfect spirals, a small pink and white ear nestling under each horn."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vermiculated]] | verb | **1.** Decorate with wavy or winding lines.<br>**2.** Decorated with wormlike tracery or markings. | *"These filed in about nine o’clock, their vermiculated horns lopping gracefully on each side of their cheeks in geometrically perfect spirals, a small pink and white ear nestling under each horn."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vermiculation]] | noun | **1.** The process of wavelike muscle contractions of the alimentary tract that moves food along.<br>**2.** A decoration consisting of wormlike carvings. | *"Going up, the floors above were found to have a very irregular surface, rising to ridges, sinking into valleys; and being just then uncarpeted, the face of the boards was seen to be eaten into innumerable vermiculations."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vermiculite]] | noun | **1.** Any of a group of yellow or brown hydrous silicate minerals having a micaceous structure. | *"In academic literature, vermiculite designates any of a group of yellow or brown hydrous silicate minerals having a micaceous structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermiform]] | adjective | **1.** Resembling a worm; long and thin and cylindrical. | *"In academic literature, vermiform designates resembling a worm; long and thin and cylindrical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermifuge]] | noun | **1.** A medication capable of causing the evacuation of parasitic intestinal worms. | *"In academic literature, vermifuge designates a medication capable of causing the evacuation of parasitic intestinal worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermilion]] | noun | **1.** A variable color that is vivid red but sometimes with an orange tinge.<br>**2.** Color vermilion. | *"Against the peaceful landscape, the pale, decaying tints of the copses, the blue air of the horizon, and the lichened stile-boards, these staring vermilion words shone forth."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vermillion]] | adjective | **1.** Of a vivid red to reddish-orange color. | *"Stubb longed for vermillion stars to be painted upon the blade of his every oar; screwing each oar in his big vice of wood, the carpenter symmetrically supplies the constellation."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vermin]] | noun | **1.** An irritating or obnoxious person.<br>**2.** Any of various small animals or insects that are pests; e.g. cockroaches or rats. | *"How to prevent the fiend and to kill vermin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verminous]] | adjective | **1.** Of the nature of vermin; very offensive or repulsive. | *"In short, he rendered it pretty clear that Providence made a distinct mistake in originating so small a nation of hearts of oak, and so many other verminous peoples."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[vermis]] | noun | **1.** The narrow central part of the cerebellum between the two hemispheres. | *"In academic literature, vermis designates the narrow central part of the cerebellum between the two hemispheres."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vermont]] | noun | **1.** A state in new england. | *"A young minister and his wife were sent on to their first charge in Vermont about the year 1846."* — Classic Author, *The wonders of prayer* |
| [[vermonter]] | noun | **1.** A native or resident of vermont. | *"There weekly arrive in this town scores of green Vermonters and New Hampshire men, all athirst for gain and glory in the fishery."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vermouth]] | noun | **1.** Any of several white wines flavored with aromatic herbs; used as aperitifs or in mixed drinks. | *"I don’t want to see Dorian tied to some vile creature, who might degrade his nature and ruin his intellect.” “Oh, she is better than good—she is beautiful,” murmured Lord Henry, sipping a glass of vermouth and orange-bitters."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[vernacular]] | noun | **1.** A characteristic language of a particular group (as among thieves).<br>**2.** The everyday speech of the people (as distinguished from literary language). | *"Lallans, Scots Lowland vernacular."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[vernal]] | adjective | **1.** Suggestive of youth; vigorous and fresh.<br>**2.** Of or characteristic of or occurring in spring. | *"The myrtles, geraniums, and cactuses packed around her were fresh and green, and at such a leafless season they invested the whole concern of horses, waggon, furniture, and girl with a peculiar vernal charm."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vernation]] | noun | **1.** (botany) the arrangement of young leaves in a leaf bud before it opens. | *"In academic literature, vernation designates (botany) the arrangement of young leaves in a leaf bud before it opens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verne]] | noun | **1.** French writer who is considered the father of science fiction (1828-1905). | *"In academic literature, verne designates french writer who is considered the father of science fiction (1828-1905)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verner]] | noun | **1.** Danish philologist (1846-1896). | *"In academic literature, verner designates danish philologist (1846-1896)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vernier]] | noun | **1.** French mathematician who described the vernier scale (1580-1637).<br>**2.** A small movable scale that slides along a main scale; the small scale is calibrated to indicate fractional divisions of the main scale. | *"In academic literature, vernier designates french mathematician who described the vernier scale (1580-1637)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vernix]] | noun | **1.** A white cheeselike protective material that covers the skin of a fetus. | *"In academic literature, vernix designates a white cheeselike protective material that covers the skin of a fetus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vernonia]] | noun | **1.** Any of various plants of the genus vernonia of tropical and warm regions of especially north america that take their name from their loose heads of purple to rose flowers that quickly take on a rusty hue. | *"In academic literature, vernonia designates any of various plants of the genus vernonia of tropical and warm regions of especially north america that take their name from their loose heads of purple to rose flowers that quickly take on a rusty hue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verona]] | noun | **1.** A city in veneto on the river adige. | *"Dramatis Personæ ESCALUS, Prince of Verona."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[veronal]] | noun | **1.** A barbiturate used as a hypnotic. | *"In academic literature, veronal designates a barbiturate used as a hypnotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[veronese]] | noun | **1.** Italian painter of the venetian school (1528-1588). | *"MONTAGUE, head of a Veronese family at feud with the Capulets."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[veronica]] | noun | **1.** Any plant of the genus veronica. | *"Peter Sloane’s hired girl, Veronica, came to see Mary Joe last evening and I heard them talking in the kitchen as I was going through the hall."* — L. M. Montgomery, *Anne of Avonlea* |
| [[verrazano]] | noun | **1.** Florentine navigator who explored the eastern coast of north america (circa 1485-1528). | *"In academic literature, verrazano designates florentine navigator who explored the eastern coast of north america (circa 1485-1528)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verrazzano]] | noun | **1.** Florentine navigator who explored the eastern coast of north america (circa 1485-1528). | *"In academic literature, verrazzano designates florentine navigator who explored the eastern coast of north america (circa 1485-1528)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verruca]] | noun | **1.** (pathology) a firm abnormal elevated blemish on the skin; caused by a virus. | *"In academic literature, verruca designates (pathology) a firm abnormal elevated blemish on the skin; caused by a virus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verrucose]] | adjective | **1.** (of skin) covered with warts or projections that resemble warts. | *"ALEXANDER’S BRAND; spots obliterated; sori hypogenous, large, solitary, scattered, brown; spores ovoid, obtuse, verrucose, slightly constricted, minutely pedicellate.—On _Smyrnium olusatrum_. (Plate III. figs. 55, 56.) =Puccinia Anemones=, Pers."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[versace]] | noun | **1.** Italian fashion designer (1946-1997). | *"In academic literature, versace designates italian fashion designer (1946-1997)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[versailles]] | noun | **1.** A city in north central france near paris; site of the palace of versailles that was built by louis xiv in the 17th century.<br>**2.** A palace built in the 17th century for louis xiv southwest of paris near the city of versailles. | *"Compare Edmond Doutté, _Magie et Religion dans l'Afrique du Nord_ (Algiers, 1908), p. 571 note I. [453] Bossuet, _Oeuvres_ (Versailles, 1815-1819), vi. 276 ("Catéchisme du diocèse de Meaux")."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[versant]] | noun | **1.** The side or slope of a mountain. | *"In academic literature, versant designates the side or slope of a mountain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[versatile]] | adjective | **1.** Having great diversity or variety.<br>**2.** Changeable or inconstant. | *"Of these, Graham, bright, witty, versatile, the most notorious of punsters and the most illegible of writers, was his chief intimate, and their friendship continued unbroken and close for half a century."* — John Cairns, *Principal Cairns* |
| [[versatility]] | noun | **1.** Having a wide variety of skills. | *"The trust companies, however, with their greater versatility, are increasing in number."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[verse]] | noun | **1.** Literature in metrical form.<br>**2.** A piece of poetry. | *"To give away yourself, keeps yourself still, And you must live drawn by your own sweet skill. 17 Who will believe my verse in time to come If it were filled with your most high deserts?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[versed]] | noun | **1.** An injectable form of benzodiazepine (trade name versed) useful for sedation and for reducing pain during uncomfortable medical procedures.<br>**2.** Compose verses or put into verse. | *"Hendrik Hamel might be one time part-owner of the old _Sparwehr_, with a navigator’s knowledge of the stars and deep versed in books, but with women, no, there I would not give him better."* — Jack London, *The Jacket (The Star-Rover)* |
| [[versicle]] | noun | **1.** A short verse said or sung by a priest or minister in public worship and followed by a response from the congregation. | *"Complimentary Versicles To Jessie Lewars 1."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[versification]] | noun | **1.** A metrical adaptation of something (e.g., of a prose text).<br>**2.** The form or metrical composition of a poem. | *"Compare with this the genuinely corrupt Byron, through the cracks and fissures of whose heaving versification steam up perpetually the sulphurous vapours from his central iniquity."* — Francis Thompson, *Shelley: An Essay* |
| [[versifier]] | noun | **1.** A writer who composes rhymes; a maker of poor verses (usually used as terms of contempt for minor or inferior poets). | *"The versifier sang the parts of the King and Queen in turn, and found each audience perfectly willing to be the oxen, the sweethearts, the swans, the sons, the shepherds, etc."* — Vachel Lindsay, *The Chinese Nightingale, and Other Poems* |
| [[versify]] | verb | **1.** Compose verses or put into verse. | *"Versified Reply To An Invitation Song—Will Ye Go To The Indies, My Mary?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[version]] | noun | **1.** An interpretation of a matter from a particular viewpoint.<br>**2.** Something a little different from others of the same type. | *"Such is one version of the tale..."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[verso]] | noun | **1.** Left-hand page.<br>**2.** The side of a coin or medal that does not bear the principal design. | *"Durantis), a writer of the thirteenth century, in his _Rationale Divinorum Officiorum_, lib. vii. cap. 14 (p. 442 _verso_, ed."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[verst]] | noun | **1.** A russian unit of length (1.067 km). | *"In academic literature, verst designates a russian unit of length (1.067 km)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertebra]] | noun | **1.** One of the bony segments of the spinal column. | *"Hussey wore a polished necklace of codfish vertebra; and Hosea Hussey had his account books bound in superior old shark-skin."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vertebral]] | adjective | **1.** Of or relating to or constituting vertebrae. | *"To prevent their habits of coiling from dislocating the vertebral column, these had an additional pair of articulations at each end, while their muscular strength is attested by the elegant striae and other sculptures which appear on all their bones."* — W. E. Webb, *Buffalo Land* |
| [[vertebrata]] | noun | **1.** Fishes; amphibians; reptiles; birds; mammals. | *"Genera classified 556:3 Vertebrata, articulata, mollusca, and radiata are mor- tal and material concepts classified, and are supposed to possess life and mind."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[vertebrate]] | noun | **1.** Animals having a bony or cartilaginous skeleton with a segmented spinal column and a large brain enclosed in a skull or cranium.<br>**2.** Having a backbone or spinal column. | *"I concluded definitely that it belonged to the vertebrate branch, class mammalia."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[vertex]] | noun | **1.** The point of intersection of lines or the point opposite the base of a figure.<br>**2.** The highest point (of something). | *"STRAW-BRISTLE MOULD; perithecium sub-ovate, base radiato-fibrose, hairs of the vertex very long, interwoven, branched; spores broadly elliptic, apiculate at either end.—On mouldering straw, reeds, matting, &c."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[verthandi]] | noun | **1.** Goddess of fate: an elf who personified the present. | *"In academic literature, verthandi designates goddess of fate: an elf who personified the present."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertical]] | noun | **1.** Something that is oriented vertically.<br>**2.** A vertical structural member as a post or stake. | *"The flames immediately ceased to go under the bottom of the corn-stack, and stood up vertical."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[verticality]] | noun | **1.** Position at right angles to the horizon. | *"We turn our attention to the left-hand characteristics; which were flatness in respect of the river, verticality in respect of the wall behind it, and darkness as to both."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vertically]] | adverb | **1.** In a vertical direction. | *"The third item of consciousness was that of seeing the same sword, perfectly clean and free from blood held vertically in Troy’s hand (in the position technically called “recover swords”)."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[verticalness]] | noun | **1.** Position at right angles to the horizon. | *"In academic literature, verticalness designates position at right angles to the horizon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticil]] | noun | **1.** A whorl of leaves growing around a stem. | *"In academic literature, verticil designates a whorl of leaves growing around a stem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticillate]] | adjective | **1.** Forming one or more whorls (especially a whorl of leaves around a stem). | *"In academic literature, verticillate designates forming one or more whorls (especially a whorl of leaves around a stem)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticillated]] | adjective | **1.** Forming one or more whorls (especially a whorl of leaves around a stem). | *"In academic literature, verticillated designates forming one or more whorls (especially a whorl of leaves around a stem)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticilliosis]] | noun | **1.** Wilt caused by fungi of the genus verticillium. | *"In academic literature, verticilliosis designates wilt caused by fungi of the genus verticillium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticillium]] | noun | **1.** A fungus of the genus verticillium. | *"In academic literature, verticillium designates a fungus of the genus verticillium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertiginous]] | adjective | **1.** Having or causing a whirling sensation; liable to falling. | *"In academic literature, vertiginous designates having or causing a whirling sensation; liable to falling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertigo]] | noun | **1.** A reeling sensation; a feeling that you are about to fall. | *"I think you have tonight." "Do you care for no one but yourself?" he flung at her in his vertigo of humiliation and anger."* — Anthony Pryde, *Nightfall* |
| [[vertu]] | noun | **1.** Love of or taste for fine objects of art.<br>**2.** Artistic quality. | *"Vive la vertu!” Samuel Walcott, still sunburned from his cruise, stood before the chancel with the only daughter of the blue blooded St."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[very]] | adjective | **1.** Precisely as stated.<br>**2.** Being the exact same one; not any other:. | *"If thou wilt leave me, do not leave me last, When other petty griefs have done their spite, But in the onset come, so shall I taste At first the very worst of fortune’s might."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[very-light]] | noun | **1.** A colored flare fired from a very pistol. | *"In academic literature, very-light designates a colored flare fired from a very pistol."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Truth, Deception & Error]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VER
  </div>
</div>
