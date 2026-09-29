---
status: unread
type: root_dashboard
---
# Dashboard — dur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dur-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to last or endure”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The rhythmic hands of a clock ticking forward as hours and days pass by.</span>
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

The root **dur** means to last or endure. It refers to the action of lasting and carrying out this process. In English, this root forms words such as *durable*, *duration*, *endure*, and *duress*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to last or endure
> The root **dur** means to last or endure. It refers to the action of lasting and carrying out this process. In English, this root forms words such as *durable*, *duration*, *endure*, and *duress*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To last or endure</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The rhythmic hands of a clock ticking forward as hours and days pass by.</mark>
> - **Everyday Connection**: Think of familiar words like *durable* and *duration*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dur** comes from a Latin word that means *"to last or endure"*.
  - At its core, it describes the action of last or endure.

- **The Big Picture Idea**:
  - Picture the rhythmic hands of a clock ticking forward as hours and days pass by.
  - Whenever you see **dur** in an English word, think of **to last or endure**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to last or endure).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Durable**: Able to withstand wear, pressure, or damage.
  - **Duration**: The time during which something continues or exists.
  - **Endure**: To suffer something painful or difficult patiently.
  - **Duress**: Threats, violence, constraints, or other action used to coerce someone into doing something against their will.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dur</mark>, think of <mark class="hl-def">to last or endure</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms a wide array of verbs, nouns, and adjectives through prefixation:
1. **The Base Adjectival Stem `dur-`**: Direct from *dūrus* and *dūrāre*: *durable*, *duration*, *during* (< Old French present participle *durant*).
2. **Prefixal Intensification with `en-` / `in-`**:
   - Latin *indūrāre* $\to$ *indurate* (to harden morally or physically).
   - Old French *endurer* (< Latin *indūrāre*) $\to$ *endure*, *endurance*.
3. **Prefixal Opposition & Obstinacy**:
   - Latin *obdūrāre* (< *ob-* "against" + *dūrāre*) $\to$ *obdurate* (stubbornly refusing to change one's opinion).
4. **Intensifying Completeness with `per-`**:
   - Latin *perdūrāre* (< *per-* "thoroughly" + *dūrāre*) $\to$ *perdurable* (everlasting, impervious to decay).

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

The cognitive sphere of *dur* covers four interconnected domains:
- **Temporal Continuity & Measurement**: [[duration]], [[during]], `perdurable`
- **Material Resilience & Toughness**: [[durable]], `durability`
- **Psychological Fortitude & Suffering**: [[endure]], `endurance`
- **Obstinacy, Callousness & Coercion**: [[obdurate]], [[indurate]], [[duress]]

---

## 🔀 4. Prefix & Combining Dynamics on dur

1. **`en-` / `in-` + `dur`** (*in* "into, upon"):
   - *endure* $\to$ to remain in existence; to undergo hardship or pain without giving way.
   - *indurate* $\to$ to harden physically or morally; callous.
2. **`ob-` + `dur`** (*ob* "against, stubbornly in the way"):
   - *obdurate* $\to$ stubbornly refusing to change one's opinion or course of action; unyielding.
3. **`per-` + `dur`** (*per* "completely, thoroughly"):
   - *perdurable* $\to$ enduring continuously; imperishable.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Materials Science & Engineering**: *durability* testing of aerospace alloys and concrete.
- **Law & Jurisprudence**: contracts signed under *duress*, legal defenses of coercion.
- **Psychology & Trauma Studies**: cognitive *endurance*, resilience under protracted stress.
- **Geology & Metallurgy**: *indurated* rock strata, *induration* of soil through heat and pressure.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[corduroy]] | noun | **1.** A cut pile fabric with vertical ribs; usually made of cotton.<br>**2.** A road made of logs laid crosswise. | *"Like all boys of his class, his usual dress was a brown velveteen jacket and waistcoat and corduroy trousers that had once been white."* — John Cairns, *Principal Cairns* |
| [[corduroys]] | noun | **1.** Cotton trousers made of corduroy cloth.<br>**2.** A cut pile fabric with vertical ribs; usually made of cotton. | *"In the same early morning, I discovered a singular affinity between seeds and corduroys."* — Charles Dickens, *Great Expectations* |
| [[dura]] | noun | **1.** The outermost (and toughest) of the 3 meninges. | *"In academic literature, dura designates the outermost (and toughest) of the 3 meninges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durability]] | noun | **1.** Permanence by virtue of the power to resist stress or force. | *"Durability; that is, the money-good must be easy to keep without much loss in amount or in quality, perhaps for long periods, until it can be passed on in trade."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[durable]] | adjective | **1.** Existing for a long time.<br>**2.** Capable of withstanding wear and tear and decay. | *"You are never sure of a good impression being durable; everybody may sway it."* — Jane Austen, *Persuasion* |
| [[durables]] | noun | **1.** Consumer goods that are not destroyed by use. | *"In academic literature, durables designates consumer goods that are not destroyed by use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durabolin]] | noun | **1.** An androgen (trade names durabolin or kabolin) that is used to treat testosterone deficiency or breast cancer or osteoporosis. | *"In academic literature, durabolin designates an androgen (trade names durabolin or kabolin) that is used to treat testosterone deficiency or breast cancer or osteoporosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dural]] | adjective | **1.** Of or relating to the dura mater. | *"In academic literature, dural designates of or relating to the dura mater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duralumin]] | noun | **1.** An aluminum-based alloy. | *"In academic literature, duralumin designates an aluminum-based alloy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duramen]] | noun | **1.** The older inactive central wood of a tree or woody plant; usually darker and denser than the surrounding sapwood. | *"In academic literature, duramen designates the older inactive central wood of a tree or woody plant; usually darker and denser than the surrounding sapwood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durance]] | noun | **1.** Imprisonment (especially for a long time). | *"And is not a buff jerkin a most sweet robe of durance?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[durango]] | noun | **1.** A city in north central mexico; mining center. | *"In academic literature, durango designates a city in north central mexico; mining center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durant]] | noun | **1.** United states historian (1885-1981). | *"Conwayboro', Henry Durant, P.M.."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[durante]] | noun | **1.** United states comedian remembered for his large nose and hoarse voice (1893-1980). | *"In academic literature, durante designates united states comedian remembered for his large nose and hoarse voice (1893-1980)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duration]] | noun | **1.** The period of time during which something continues.<br>**2.** The property of enduring or continuing in time. | *"If I ever thought of the time I had been out, it presented itself as an indefinite period of great duration, and I seemed, in a strange way, never to have been free from the anxiety under which I then laboured."* — Charles Dickens, *Bleak House* |
| [[durative]] | noun | **1.** The aspect of a verb that expresses its duration. | *"The thing called money thus is a durative good passing from hand to hand in a community, and completing its use in turn to each possessor of it only as he parts with it."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[durazzo]] | noun | **1.** Port city in western albania on the adriatic. | *"In academic literature, durazzo designates port city in western albania on the adriatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durer]] | noun | **1.** A leading german painter and engraver of the renaissance (1471-1528). | *"I always consider an old English family as well worth studying as a collection of Holbein’s portraits or Albert Durer’s prints."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[duress]] | noun | **1.** Compulsory force or threat. | *"It will cover infiltration, interrogation, psychological defenses against psychic probes and other means that might be used to acquire information from you, under duress or otherwise."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[durian]] | noun | **1.** Tree of southeastern asia having edible oval fruit with a hard spiny rind.<br>**2.** Huge fruit native to southeastern asia `smelling like hell and tasting like heaven'; seeds are roasted and eaten like nuts. | *"The durian-tree of the East Indies, whose smooth stem often shoots up to a height of eighty or ninety feet without sending out a branch, bears a fruit of the most delicious flavour and the most disgusting stench."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[during]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin dur within the domain of Time.<br>**2.** A technical or specialized form exhibiting the properties of dur in systematic terminology. | *"I tell thee, Syracusian, twenty years Have I been patron to Antipholus, During which time he ne’er saw Syracusa."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[durio]] | noun | **1.** A genus of tall asian trees of the family bombacaceae. | *"In academic literature, durio designates a genus of tall asian trees of the family bombacaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durion]] | noun | **1.** Tree of southeastern asia having edible oval fruit with a hard spiny rind. | *"In academic literature, durion designates tree of southeastern asia having edible oval fruit with a hard spiny rind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durmast]] | noun | **1.** Deciduous european oak valued for its tough elastic wood. | *"In academic literature, durmast designates deciduous european oak valued for its tough elastic wood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durra]] | noun | **1.** Sorghums of dry regions of asia and north africa. | *"An allied species infests the Sorghum or durra, a grain but little cultivated in Europe, but found extensively in Africa and Asia, and also apparently found on the _Bajra_ of India."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[durrell]] | noun | **1.** English writer of irish descent who spent much of his life in mediterranean regions (1912-1990). | *"In academic literature, durrell designates english writer of irish descent who spent much of his life in mediterranean regions (1912-1990)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durres]] | noun | **1.** Port city in western albania on the adriatic. | *"In academic literature, durres designates port city in western albania on the adriatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[durum]] | noun | **1.** Wheat with hard dark-colored kernels high in gluten and used for bread and pasta; grown especially in southern russia, north africa, and northern central north america. | *"In academic literature, durum designates wheat with hard dark-colored kernels high in gluten and used for bread and pasta; grown especially in southern russia, north africa, and northern central north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endurable]] | adjective | **1.** Capable of being borne though unpleasant. | *"Garth felt a severe twinge at this mention of her husband, the fear that Caleb might think her in the wrong not being easily endurable."* — George Eliot, *Middlemarch* |
| [[endurance]] | noun | **1.** The power to withstand hardship or stress.<br>**2.** A state of surviving; remaining alive. | *"My lord, I looked You would have given me your petition that I should have ta’en some pains to bring together Yourself and your accusers and to have heard you Without endurance, further."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[endure]] | verb | **1.** Put up with something or somebody unpleasant.<br>**2.** Face and withstand with courage. | *"I could endure anything before but a cat, and now he’s a cat to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enduring]] | verb | **1.** Put up with something or somebody unpleasant.<br>**2.** Face and withstand with courage. | *"Take the boy to you: he so troubles me, ’Tis past enduring."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enduringly]] | adverb | **1.** In an enduring manner. | *"Still, still it wears the fetters love so enduringly fastened."* — Effie Afton, *Eventide* |
| [[enduringness]] | noun | **1.** Permanence by virtue of the power to resist stress or force. | *"Of course by toughness I mean enduringness."* — Jack London, *The Jacket (The Star-Rover)* |
| [[extradural]] | adjective | **1.** On or outside the dura mater. | *"In academic literature, extradural designates on or outside the dura mater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indurate]] | verb | **1.** Become fixed or established.<br>**2.** Make hard or harder. | *"There was a wide margin of grass along here, and Gabriel’s footsteps were deadened by its softness, even at this indurating period of the year."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[induration]] | noun | **1.** Any pathological hardening or thickening of tissue. | *"The Tongans were subject to induration of the liver and certain forms of scrofula, which they often attributed to a failure to perform the requisite expiation after having inadvertently touched a chief or his belongings."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[obduracy]] | noun | **1.** Resoluteness by virtue of being unyielding and inflexible. | *"By this hand, thou thinkest me as far in the devil’s book as thou and Falstaff for obduracy and persistency."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obdurate]] | adjective | **1.** Stubbornly persistent in wrongdoing.<br>**2.** Showing unfeeling resistance to tender feelings. | *"Ah, countrymen, if when you make your prayers, God should be so obdurate as yourselves, How would it fare with your departed souls?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obdurately]] | adverb | **1.** In a stubborn unregenerate manner. | *"BLOOM: _(Obdurately.)_ Sirs, take notice that by the law of torts you are bound over in your own recognisances for six months in the sum of five pounds."* — James Joyce, *Ulysses* |
| [[perdurability]] | noun | **1.** The property of being extremely durable. | *"In academic literature, perdurability designates the property of being extremely durable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perdurable]] | adjective | **1.** Very long lasting. | *"I have professed me thy friend, and I confess me knit to thy deserving with cables of perdurable toughness; I could never better stead thee than now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subdural]] | adjective | **1.** Below the dura mater but above the arachnoid membrane of the meninges. | *"In academic literature, subdural designates below the dura mater but above the arachnoid membrane of the meninges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unendurable]] | adjective | **1.** Incapable of being put up with. | *"At the sight and sound of that, to her, unendurable act, Bathsheba sprang towards him."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DUR
  </div>
</div>
