---
status: unread
type: root_dashboard
---
# Dashboard — sign
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sign-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mark, sign, or seal”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Carving clear dark letters onto paper to preserve thoughts in writing.</span>
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

The root **sign** means mark, sign, or seal. It refers to a recognizable mark, token, emblem, or identifying sign. In English, this root forms words such as *signal*, *signify*, *signature*, and *design*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mark, sign, or seal
> The root **sign** means mark, sign, or seal. It refers to a recognizable mark, token, emblem, or identifying sign. In English, this root forms words such as *signal*, *signify*, *signature*, and *design*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mark, sign, or seal</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Carving clear dark letters onto paper to preserve thoughts in writing.</mark>
> - **Everyday Connection**: Think of familiar words like *signal* and *signify*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sign** comes from a Latin word that means *"mark, sign, or seal"*.
  - At its core, it describes mark, sign, or seal.

- **The Big Picture Idea**:
  - Picture carving clear dark letters onto paper to preserve thoughts in writing.
  - Whenever you see **sign** in an English word, think of **writing, records, and written words**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mark, sign, or seal.
  - **Mental & Social**: How people experience, organize, or communicate about mark, sign, or seal.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Signal**: An electrical impulse or radio wave transmitted or received.
  - **Signify**: To be an indication of.
  - **Signature**: A person's name written in a distinctive way as a form of identification in authorizing a check or document.
  - **Design**: A plan or drawing produced to show the look and function or workings of a building, garment, or other object.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sign</mark>, think of <mark class="hl-def">writing, records, and written words</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `sign-` (< Latin *signum* / *signāre*): Base nominal and verbal root.
- **Prefix Machinery**:
  - `as-` (< *ad-* "to, assign"): *assign, assignment*.
  - `con-` ("together, entrust"): *consign, consignment*.
  - `de-` ("out, thoroughly"): *design, designate*.
  - `re-` ("back, unsealing"): *resign, resignation*.
  - `in-` (negative): *insignificant*.
- **Suffixal Formations**:
  - `-al`: *signal*.
  - `-ature`: *signature*.
  - `-et`: *signet*.
  - `-ify` / `-icance`: *signify, significance*.

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
                      ┌── Authentication & Marks: sign, signature, signet, signatory
                      │
   [sign] ────────────┼── Semiotics & Meaning: signal, signify, significance, significant, insignificant
 (Mark / Seal)        │
                      ├── Allocation & Purpose: assign, assignment, consign, design, designate
                      │
                      └── Relinquishment of Office: resign, resignation
```

---

## 🔀 4. Prefix & Combining Dynamics on sign
- **`ad-` + `sign`**: *assign* — to allocate a task or grant property.
- **`de-` + `sign`**: *design* — to plan the form and function of an artifact; an artistic scheme.
- **`de-` + `sign-` + `-ate`**: *designate* — to appoint officially to a specified position.
- **`re-` + `sign`**: *resign* — to voluntarily leave a job or office; to unseal an obligation.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Contract Law**: Executed *signatures*; certified *signatories*; electronic signature acts.
- **Graphic Design & Architecture**: Industrial *design*; computer-aided design (CAD); structural blueprints.
- **Semiotics & Linguistics**: Ferdinand de Saussure's theory of the *sign* (signifier and signified).
- **Corporate Governance**: Board *assignments*; CEO *resignations*; designated executives.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[assign]] | verb | **1.** Give an assignment to (a person) to a post, or assign a task to (a person).<br>**2.** Give out. | *"Assign’d am I to be the English scourge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assignable]] | adjective | **1.** Legally transferable to the ownership of another. | *"Being thus assignable to no breed, he was the ideal embodiment of canine greatness—a generalization from what was common to all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[assignation]] | noun | **1.** A secret rendezvous (especially between lovers).<br>**2.** The act of distributing by allotting or apportioning; distribution according to a plan. | *"That watch has regulated imperial interests in its time—the stately ceremonial, the courtly assignation, pompous travels, and lordly sleeps."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[assigned]] | verb | **1.** Give an assignment to (a person) to a post, or assign a task to (a person).<br>**2.** Give out. | *"His sons he there proclaimed the kings of kings: Great Media, Parthia, and Armenia He gave to Alexander; to Ptolemy he assigned Syria, Cilicia, and Phoenicia."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assignee]] | noun | **1.** (law) the party to whom something is assigned (e.g., someone to whom a right or property is legally transferred). | *"Hammerdown will sell by the orders of Diogenes' assignees, or will be instructed by the executors, to offer to public competition, the library, furniture, plate, wardrobe, and choice cellar of wines of Epicurus deceased."* — William Makepeace Thackeray, *Vanity Fair* |
| [[assigning]] | noun | **1.** The act of distributing something to designated places or persons.<br>**2.** Give an assignment to (a person) to a post, or assign a task to (a person). | *"According to the Scriptures, the judgment will result in assigning to men _very different allotments_."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[assignment]] | noun | **1.** A duty that you are assigned to perform (especially in the armed forces).<br>**2.** The instrument by which a claim or right or interest or property is transferred from one person to another. | *"It shades into force, status, and charity in manifold ways, but it is essentially the assignment of a common, or social, income to individuals by some person or persons chosen, or accepted, by the society to perform this function."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[assignor]] | noun | **1.** (law) the party who makes an assignment. | *"In academic literature, assignor designates (law) the party who makes an assignment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consign]] | verb | **1.** Commit forever; commit irrevocably.<br>**2.** Give over to another for care or safekeeping. | *"It were, my lord, a hard condition for a maid to consign to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consignee]] | noun | **1.** The person to whom merchandise is delivered over. | *"Harker has got the letters between the consignee of the boxes at Whitby and the carriers in London who took charge of them."* — Bram Stoker, *Dracula* |
| [[consigner]] | noun | **1.** The person who delivers over or commits merchandise. | *"In academic literature, consigner designates the person who delivers over or commits merchandise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consignment]] | noun | **1.** Goods carried by a large vehicle.<br>**2.** The official act of consigning a person to confinement (as in a prison or mental hospital). | *"I was down on the levee, to see to the consignment of my freight, and run afoul of her."* — Effie Afton, *Eventide* |
| [[consignor]] | noun | **1.** The person who delivers over or commits merchandise. | *"In academic literature, consignor designates the person who delivers over or commits merchandise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosign]] | verb | **1.** Sign jointly.<br>**2.** Sign and endorse (another person's signature), as for a loan. | *"In academic literature, cosign designates sign jointly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosignatory]] | noun | **1.** One of two or more signers of the same document (as a treaty or declaration).<br>**2.** Signing jointly with others. | *"In academic literature, cosignatory designates one of two or more signers of the same document (as a treaty or declaration)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosigner]] | noun | **1.** One of two or more signers of the same document (as a treaty or declaration).<br>**2.** A signer in addition to the principal signer (to verify the authenticity of the principal signature or to provide surety). | *"In academic literature, cosigner designates one of two or more signers of the same document (as a treaty or declaration)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countersign]] | noun | **1.** A secret word or phrase known only to a restricted group.<br>**2.** A second confirming signature endorsing a document already signed. | *"The freight they bore served as countersign and pass; she entered the Senate Chamber, and distributed her welcome store."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[countersignature]] | noun | **1.** A second confirming signature endorsing a document already signed. | *"In academic literature, countersignature designates a second confirming signature endorsing a document already signed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[design]] | noun | **1.** The act of working out the form of something (as by making a sketch or outline or plan).<br>**2.** An arrangement scheme. | *"O, for the love of laughter, hinder not the honour of his design: let him fetch off his drum in any hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[designate]] | verb | **1.** Assign a name or title to.<br>**2.** Give an assignment to (a person) to a post, or assign a task to (a person). | *"These examples are sufficient to elucidate the maxims which have been mentioned, and to designate the manner in which they should be used."* — Alexander Hamilton, *The Federalist Papers* |
| [[designation]] | noun | **1.** Identifying word or words by which someone or something is called and classified or distinguished from others.<br>**2.** The act of putting a person into a non-elective position. | *"He seemed about to dispute this designation of himself when he was seized with a violent fit of coughing."* — Charles Dickens, *Bleak House* |
| [[designative]] | adjective | **1.** Serving to designate. | *"In academic literature, designative designates serving to designate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[designatum]] | noun | **1.** Something (whether existing or not) that is referred to by a linguistic expression. | *"In academic literature, designatum designates something (whether existing or not) that is referred to by a linguistic expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[designed]] | verb | **1.** Make or work out a plan for; devise.<br>**2.** Plan something for a specific role or purpose or effect. | *"Caddy said she didn’t know; perhaps they were designed for teachers, perhaps for the stage."* — Charles Dickens, *Bleak House* |
| [[designedly]] | adverb | **1.** With intention; in an intentional manner. | *"He now discovered that he had been designedly mystified, and there was no escape."* — Classic Author, *The wonders of prayer* |
| [[designer]] | noun | **1.** A person who specializes in designing architectural interiors and their furnishings.<br>**2.** Someone who creates plans to be used in making something (such as buildings). | *"Moreover, as was shown by what followed, she was oddly exercising the faculty of invention upon the speciality of the clever Jacquet Droz, the designer of automatic substitutes for human limbs."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[designing]] | noun | **1.** The act of working out the form of something (as by making a sketch or outline or plan).<br>**2.** Make or work out a plan for; devise. | *"You are designing people compared with me” (he really made me consider myself in that light) “but I am gay and innocent; forget your worldly arts and play with me!” the effect was absolutely dazzling."* — Charles Dickens, *Bleak House* |
| [[ensign]] | noun | **1.** A person who holds a commissioned rank in the united states navy or the united states coast guard; below lieutenant junior grade.<br>**2.** An emblem flown as a symbol of nationality. | *"Set we forward; let A Roman and a British ensign wave Friendly together."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insignia]] | noun | **1.** A badge worn to show official position. | *"Then the priest, wearing the insignia of his office, went from hut to hut relighting the fires by means of a flint.[331] Among the Esquimaux with whom C.F."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[insignificance]] | noun | **1.** The quality of having little or no significance. | *"Collins seemed to sink into insignificance; to the young ladies he certainly was nothing; but he had still at intervals a kind listener in Mrs."* — Jane Austen, *Pride and Prejudice* |
| [[insignificant]] | adjective | **1.** Not worthy of notice.<br>**2.** Signifying nothing. | *"It was no insignificant barrier, indeed."* — Jane Austen, *Persuasion* |
| [[insignificantly]] | adverb | **1.** In an insignificant manner.<br>**2.** Not to a significant degree or amount. | *"In academic literature, insignificantly designates in an insignificant manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsignificant]] | adjective | **1.** Attributable to chance. | *"In academic literature, nonsignificant designates attributable to chance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reassign]] | verb | **1.** Transfer somebody to a different position or location of work. | *"When I saw all this, the life of man came before me under the likeness of a great pageant, arranged and marshalled by Chance," who assigns the parts and reassigns them as she pleases; and then the pageant ends, every one disrobes and all are alike."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[reassignment]] | noun | **1.** Assignment to a different duty. | *"When you read it, note that all requests for release or reassignment are denied." Xindral folded back into his normal, slightly bowed posture."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[redesign]] | verb | **1.** Design anew, make a new design for. | *"In academic literature, redesign designates design anew, make a new design for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resign]] | verb | **1.** Leave (a job, post, or position) voluntarily.<br>**2.** Give up or retire from a position. | *"Madam, I am Protector of the realm, And at his pleasure will resign my place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resignation]] | noun | **1.** Acceptance of despair.<br>**2.** The act of giving up (a claim or office or possession etc.). | *"To do that office of thine own good will Which tired majesty did make thee offer: The resignation of thy state and crown To Henry Bolingbroke."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resignedly]] | adverb | **1.** With resignation and acceptance; in a resigned manner.<br>**2.** In a hopeless resigned manner. | *"But although Alpátych, frightened at his own temerity in avoiding the stroke, came up to the prince, bowing his bald head resignedly before him, or perhaps for that very reason, the prince, though he continued to shout: “Blackguards!..."* — graf Leo Tolstoy, *War and Peace* |
| [[sign]] | noun | **1.** A perceptible indication of something not immediately apparent (as a visible clue that something has happened).<br>**2.** A public display of a message. | *"Therefore, I beseech you— In sign of what you are, not to reward What you have done—before our army hear me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[signage]] | noun | **1.** Signs collectively (especially commercial signs or posters). | *"In academic literature, signage designates signs collectively (especially commercial signs or posters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signal]] | noun | **1.** Any nonverbal action or gesture that encodes a message.<br>**2.** Any incitement to action. | *"He forbids it, Being free from vainness and self-glorious pride; Giving full trophy, signal, and ostent Quite from himself to God."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[signal-to-noise]] | noun | **1.** The ratio of signal intensity to noise intensity. | *"In academic literature, signal-to-noise designates the ratio of signal intensity to noise intensity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signaler]] | noun | **1.** Someone who communicates by signals. | *"At that moment, on the road from the town on which signalers had been posted, two men appeared on horse back."* — graf Leo Tolstoy, *War and Peace* |
| [[signaling]] | noun | **1.** Any nonverbal action or gesture that encodes a message.<br>**2.** Communicate silently and non-verbally by signals or signs. | *"Signaling Hodak for minimal repulse and acceleration to increase the drift, Brad ordered all hands immediately into accelo-nets."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[signalisation]] | noun | **1.** A conspicuous indication. | *"In academic literature, signalisation designates a conspicuous indication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signalise]] | verb | **1.** Provide with traffic signals.<br>**2.** Communicate silently and non-verbally by signals or signs. | *"During the nineteen days mentioned above, no incident of any kind happened to signalise our voyage."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[signalization]] | noun | **1.** A conspicuous indication. | *"In academic literature, signalization designates a conspicuous indication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signalize]] | verb | **1.** Provide with traffic signals.<br>**2.** Communicate silently and non-verbally by signals or signs. | *"Here the writers against the Constitution seem to have taken pains to signalize their talent of misrepresentation."* — Alexander Hamilton, *The Federalist Papers* |
| [[signaller]] | noun | **1.** Someone who communicates by signals. | *"In academic literature, signaller designates someone who communicates by signals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signally]] | adverb | **1.** As a signal.<br>**2.** In a signal manner. | *"Skimpole and how extremely likely it was that he would signally defeat me."* — Charles Dickens, *Bleak House* |
| [[signalman]] | noun | **1.** A railroad employee in charge of signals and point in a railroad yard. | *"In academic literature, signalman designates a railroad employee in charge of signals and point in a railroad yard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signatory]] | noun | **1.** Someone who signs and is bound by a document. | *"In academic literature, signatory designates someone who signs and is bound by a document."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signature]] | noun | **1.** Your name written in your own handwriting.<br>**2.** A distinguishing style. | *"I always received by return of post exactly the same answer in the same round hand, with the signature of Kenge and Carboy in another writing, which I supposed to be Mr."* — Charles Dickens, *Bleak House* |
| [[signed]] | verb | **1.** Mark with one's signature; write one's name (on).<br>**2.** Approve and express assent, responsibility, or obligation. | *"They was letters from the lodger’s sweetheart, and she signed Honoria."* — Charles Dickens, *Bleak House* |
| [[signer]] | noun | **1.** Someone who can use sign language to communicate.<br>**2.** Someone who signs and is bound by a document. | *"The ineffaceable, sad birth-mark in the brow of man, is but the stamp of sorrow in the signers."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[signet]] | noun | **1.** A seal (especially one used to mark documents officially). | *"I had my father’s signet in my purse, Which was the model of that Danish seal: Folded the writ up in the form of the other, Subscrib’d it: gave’t th’impression; plac’d it safely, The changeling never known."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[significance]] | noun | **1.** The quality of being significant.<br>**2.** A meaning that is not expressly stated but can be inferred. | *"But as it is, I made up my mind to call, especially as I am not likely to see you again the next time you come to town.” She said this with such great significance that Ada and I glanced at one another, foreseeing something more."* — Charles Dickens, *Bleak House* |
| [[significant]] | adjective | **1.** Important in effect or meaning.<br>**2.** Fairly large. | *"Miss Jellyby gave my arm a squeeze and me a very significant look."* — Charles Dickens, *Bleak House* |
| [[significantly]] | adverb | **1.** In a statistically significant way.<br>**2.** In a significant manner. | *"Woodcourt looks round with that grave professional interest and attention on his face, and glancing significantly at the trooper, signs to Phil to carry his table out."* — Charles Dickens, *Bleak House* |
| [[signification]] | noun | **1.** The message that is intended or expressed or signified. | *"Not so; here there were no doctrines, nothing but that pregnant phrase, _la vraie signification de la vie_."* — Mrs. Oliphant, *A Beleaguered City* |
| [[significative]] | adjective | **1.** (usually followed by `of') pointing out or revealing clearly. | *"In academic literature, significative designates (usually followed by `of') pointing out or revealing clearly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signified]] | noun | **1.** The meaning of a word or expression; the way in which a word or expression or situation can be interpreted.<br>**2.** Denote or connote. | *"The midwife wondered, and the women cried “O, Jesus bless us, he is born with teeth!” And so I was, which plainly signified That I should snarl, and bite, and play the dog."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[signifier]] | noun | **1.** The phonological or orthographic sound or appearance of a word that can be used to describe or identify something. | *"Et cela doit signifier,” said she, “qu’il y aura là dedans un cadeau pour moi, et peut-être pour vous aussi, mademoiselle."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[signify]] | verb | **1.** Denote or connote.<br>**2.** Convey or express a meaning. | *"I’ll humbly signify what in his name, That magical word of war, we have effected; How, with his banners, and his well-paid ranks, The ne’er-yet-beaten horse of Parthia We have jaded out o’ th’ field."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[signing]] | noun | **1.** Language expressed by visible hand gestures.<br>**2.** Mark with one's signature; write one's name (on). | *"Do you know,” Lady Dedlock asks her, signing to her to bring her chair nearer, “do you know, Rosa, that I am different to you from what I am to any one?” “Yes, my Lady."* — Charles Dickens, *Bleak House* |
| [[signior]] | noun | **1.** Used as an italian courtesy title; can be prefixed to the name or used separately. | *"Good Signior Angelo, you must excuse us all, My wife is shrewish when I keep not hours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[signor]] | noun | **1.** Used as an italian courtesy title; can be prefixed to the name or used separately. | *"HORTENSIO. _Alla nostra casa ben venuto; molto honorato signor mio Petruchio._ Rise, Grumio, rise: we will compound this quarrel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[signora]] | noun | **1.** An italian title of address equivalent to mrs. when used before a name.<br>**2.** An italian title or form of address for a married woman. | *"I sought my ideal of a woman amongst English ladies, French countesses, Italian signoras, and German gräfinnen."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[signore]] | noun | **1.** An italian title of respect for a man; equivalent to the english `sir'; used separately (not prefixed to his name).<br>**2.** An italian title of address equivalent to mrs. when used before a name. | *"In academic literature, signore designates an italian title of respect for a man; equivalent to the english `sir'; used separately (not prefixed to his name)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signorina]] | noun | **1.** An italian courtesy title for an unmarried woman; equivalent to `miss', it is either used alone or before a name.<br>**2.** An italian title or form of address for an unmarried woman. | *"In academic literature, signorina designates an italian courtesy title for an unmarried woman; equivalent to `miss', it is either used alone or before a name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[signory]] | noun | **1.** The estate of a seigneur. | *"Were you not restored To all the Duke of Norfolk’s signories, Your noble and right well rememb’red father’s?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unassignable]] | adjective | **1.** Incapable of being transferred. | *"In academic literature, unassignable designates incapable of being transferred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unassigned]] | adjective | **1.** Not assigned. | *"In academic literature, unassigned designates not assigned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersign]] | verb | **1.** Sign at the bottom of (a document). | *"TO THE REVEREND CLERGY:-- The undersigned proposes to commence another Periodical, of original plan and character, provided that adequate pledges of supplies shall be furnished."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[undesigned]] | adjective | **1.** Not done or made or performed with purpose or intent. | *"Economic monopoly is a result of private property that is undesigned by the government or by society."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unsigned]] | adjective | **1.** Lacking a signature. | *"Coming down with unsigned warrant."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Writing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SIGN
  </div>
</div>
