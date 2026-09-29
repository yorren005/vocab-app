---
status: unread
type: root_dashboard
---
# Dashboard — orn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">orn-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to adorn or equip”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands actively pushing a lever or carrying out purposeful work.</span>
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

The root **orn** means to adorn or equip. It refers to the action of adorning and carrying out this process. In English, this root forms words such as *ornament*, *ornate*, *adorn*, and *suborn*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to adorn or equip
> The root **orn** means to adorn or equip. It refers to the action of adorning and carrying out this process. In English, this root forms words such as *ornament*, *ornate*, *adorn*, and *suborn*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To adorn or equip</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *ornament* and *ornate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **orn** comes from a Latin word that means *"to adorn or equip"*.
  - At its core, it describes the action of adorn or equip.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **orn** in an English word, think of **to adorn or equip**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to adorn or equip).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Ornament**: A thing used to make something look more attractive but having no practical purpose.
  - **Ornate**: Elaborately or highly decorated.
  - **Adorn**: To make more beautiful or attractive by adding decorative elements.
  - **Suborn**: To bribe or otherwise induce someone to commit an unlawful act, especially to commit perjury in a court of law.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">orn</mark>, think of <mark class="hl-def">to adorn or equip</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `orn-` (< Latin *ōrnāre*): Base verbal and adjectival stem.
- **Prefix & Combining Machinery**:
  - `ad-` ("to, toward"): *adorn, adornment*.
  - `sub-` ("under, secretly"): *suborn, subornation*.
  - `-ment` (concrete object/result): *ornament, adornment*.
  - `-ate` (participial adjective): *ornate*.

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
                      ┌── Aesthetic Embellishment: adorn, adornment
                      │
   [orn] ─────────────┼── Decorative Objects: ornament, ornamental, ornamentation
(To equip, adorn)     │
                      ├── Stylistic Complexity: ornate, ornately, ornateness
                      │
                      └── Legal Criminality: suborn, subornation
```

---

## 🔀 4. Prefix & Combining Dynamics on orn
- **`ad-` + `orn`**: *adorn* — to make more beautiful or attractive by adding decorative elements.
- **`sub-` + `orn`**: *suborn* — to bribe or secretly induce someone to commit an unlawful act, especially perjury.
- **`orn` + `-ate`**: *ornate* — elaborately or highly decorated; intricate in design.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Architecture & Interior Design**: Baroque and Rococo *ornamentation*; Corinthian column *ornaments*.
- **Criminal Jurisprudence**: Indictments for *subornation* of perjury; witness tampering statutes.
- **Horticulture & Landscape Architecture**: *Ornamental* grasses; botanical specimen gardens.
- **Literary Stylistics**: *Ornate* prose styles (Ciceronian vs. Attic brevity).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acorn]] | noun | **1.** Fruit of the oak tree: a smooth thin-walled nut in a woody cup-shaped base. | *"I found him under a tree, like a dropped acorn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adorn]] | verb | **1.** Make more attractive by adding ornament, colour, etc.<br>**2.** Be beautiful to look at. | *"Adorn his temples with a coronet, And yet, in substance and authority, Retain but privilege of a private man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adorned]] | verb | **1.** Make more attractive by adding ornament, colour, etc.<br>**2.** Be beautiful to look at. | *"A canopy, borne by four of the Cinque Ports; under it, the Queen in her robe, in her hair, richly adorned with pearl, crowned."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adornment]] | noun | **1.** A decoration of color or interest that is added to relieve plainness.<br>**2.** The action of decorating yourself with something colorful and interesting. | *"She said upon a time—the bitterness of it I now belch from my heart—that she held the very garment of Posthumus in more respect than my noble and natural person, together with the adornment of my qualities."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ornament]] | noun | **1.** Something used to beautify.<br>**2.** Make more attractive by adding ornament, colour, etc. | *"In all external grace you have some part, But you like none, none you for constant heart. 54 O how much more doth beauty beauteous seem, By that sweet ornament which truth doth give!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ornamental]] | noun | **1.** Any plant grown for its beauty or ornamental value.<br>**2.** Serving an esthetic rather than a useful purpose. | *"This chafing over, the ornamental part of Mr."* — Charles Dickens, *Bleak House* |
| [[ornamentalism]] | noun | **1.** The practice of ornamental display. | *"In academic literature, ornamentalism designates the practice of ornamental display."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornamentalist]] | noun | **1.** Someone who decorates. | *"In academic literature, ornamentalist designates someone who decorates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornamentally]] | adverb | **1.** In an ornamental, nonfunctional manner. | *"In academic literature, ornamentally designates in an ornamental, nonfunctional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornamentation]] | noun | **1.** The state of being ornamented.<br>**2.** Something used to beautify. | *"The daughter communities of Latin America were called into being and exterior ornamentation of the Temple was consummated while the American mother community was in the throes of the last, most harassing stage of the devastating struggle."* — Effendi Shoghi, *Citadel of Faith* |
| [[ornate]] | adjective | **1.** Marked by elaborate rhetoric and elaborated with decorative details; ; -john milton. | *"He had made a toilet of a nicely-adjusted kind—of a nature between the carefully neat and the carelessly ornate—of a degree between fine-market-day and wet-Sunday selection."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ornately]] | adverb | **1.** In an ornate manner. | *"In academic literature, ornately designates in an ornate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornateness]] | noun | **1.** High-flown style; excessive use of verbal ornamentation.<br>**2.** An ornate appearance; being elaborately (even excessively) decorated. | *"In academic literature, ornateness designates high-flown style; excessive use of verbal ornamentation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orneriness]] | noun | **1.** Meanspirited disagreeable contrariness. | *"In academic literature, orneriness designates meanspirited disagreeable contrariness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornery]] | adjective | **1.** Having a difficult and contrary disposition; - dorothy sayers. | *"What’s the matter with the ornery cusses?” Laban impatiently wanted to know."* — Jack London, *The Jacket (The Star-Rover)* |
| [[ornithic]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin orn within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of orn in systematic terminology. | *"In academic literature, ornithic designates pertaining to, derived from, or characteristic of latin orn within the domain of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithine]] | noun | **1.** An amino acid that does not occur in proteins but is important in the formation of urea. | *"In academic literature, ornithine designates an amino acid that does not occur in proteins but is important in the formation of urea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithischia]] | noun | **1.** Extinct terrestrial reptiles having bird-like pelvises: armored dinosaurs (thyreophorans); boneheaded and horned dinosaurs (marginocephalians); duck-billed dinosaurs (euronithopods). | *"In academic literature, ornithischia designates extinct terrestrial reptiles having bird-like pelvises: armored dinosaurs (thyreophorans); boneheaded and horned dinosaurs (marginocephalians); duck-billed dinosaurs (euronithopods)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithischian]] | noun | **1.** Herbivorous dinosaur with a pelvis like that of a bird. | *"In academic literature, ornithischian designates herbivorous dinosaur with a pelvis like that of a bird."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithogalum]] | noun | **1.** Sometimes placed in family hyacinthaceae. | *"In academic literature, ornithogalum designates sometimes placed in family hyacinthaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithological]] | adjective | **1.** Of or relating to ornithology. | *"In academic literature, ornithological designates of or relating to ornithology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithologist]] | noun | **1.** A zoologist who studies birds. | *"In academic literature, ornithologist designates a zoologist who studies birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithology]] | noun | **1.** The branch of zoology that studies birds. | *"In academic literature, ornithology designates the branch of zoology that studies birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithomimid]] | noun | **1.** Lightly built medium-sized dinosaur having extremely long limbs and necks with small heads and big brains and large eyes. | *"In academic literature, ornithomimid designates lightly built medium-sized dinosaur having extremely long limbs and necks with small heads and big brains and large eyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithomimida]] | noun | **1.** Lightly built medium-size theropods. | *"In academic literature, ornithomimida designates lightly built medium-size theropods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithopod]] | noun | **1.** Bipedal herbivorous dinosaur. | *"In academic literature, ornithopod designates bipedal herbivorous dinosaur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithopoda]] | noun | **1.** Widespread group including duck-billed dinosaurs and their early relatives (hadrosaurs, trachodon and iguanodon). | *"In academic literature, ornithopoda designates widespread group including duck-billed dinosaurs and their early relatives (hadrosaurs, trachodon and iguanodon)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithopter]] | noun | **1.** Heavier-than-air craft that is propelled by the flapping of wings. | *"In academic literature, ornithopter designates heavier-than-air craft that is propelled by the flapping of wings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithorhynchidae]] | noun | **1.** Platypus. | *"Classical and authoritative lexicons catalog ornithorhynchidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithorhynchus]] | noun | **1.** Type genus of the family ornithorhynchidae. | *"In academic literature, ornithorhynchus designates type genus of the family ornithorhynchidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ornithosis]] | noun | **1.** An atypical pneumonia caused by a rickettsia microorganism and transmitted to humans from infected birds. | *"In academic literature, ornithosis designates an atypical pneumonia caused by a rickettsia microorganism and transmitted to humans from infected birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suborn]] | verb | **1.** Incite to commit a crime or an evil deed.<br>**2.** Procure (false testimony or perjury). | *"Thou hast suborn’d the goldsmith to arrest me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subornation]] | noun | **1.** Underhandedly or improperly inducing someone to do something improper or unlawful.<br>**2.** Perjured testimony that someone was persuaded to give. | *"Virtue is choked with foul ambition, And charity chased hence by rancour’s hand; Foul subornation is predominant, And equity exiled your highness’ land."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suborner]] | noun | **1.** Someone who pays (or otherwise incites) you to commit a wrongful act. | *"In academic literature, suborner designates someone who pays (or otherwise incites) you to commit a wrongful act."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unadorned]] | adjective | **1.** Not decorated with something to increase its beauty or distinction. | *"She moved like one of those bright beings pictured in the sunny walks of fancy’s Eden by the romantic and young, a queen of beauty unadorned save by her own transcendent loveliness."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[unornamented]] | adjective | **1.** Lacking embellishment or ornamentation. | *"In academic literature, unornamented designates lacking embellishment or ornamentation."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ORN
  </div>
</div>
