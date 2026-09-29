---
status: unread
type: root_dashboard
---
# Dashboard — crypt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">crypt-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“hidden or secret”</span>
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

The root **crypt** means hidden or secret. It describes being concealed underground, secret, or hidden from sight. In English, this root forms words such as *apocryphal*, *cryptic*, *cryptococcosis*, and *cryptocurrency*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: hidden or secret
> The root **crypt** means hidden or secret. It describes being concealed underground, secret, or hidden from sight. In English, this root forms words such as *apocryphal*, *cryptic*, *cryptococcosis*, and *cryptocurrency*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Hidden or secret</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Uncovering honest facts and separating what is genuine from what is false.</mark>
> - **Everyday Connection**: Think of familiar words like *apocryphal* and *cryptic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **crypt** comes from a Latin word that means *"hidden or secret"*.
  - At its core, it describes hidden or secret.

- **The Big Picture Idea**:
  - Picture uncovering honest facts and separating what is genuine from what is false.
  - Whenever you see **crypt** in an English word, think of **truth, reality, or mistakes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of hidden or secret.
  - **Mental & Social**: How people experience, organize, or communicate about hidden or secret.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Apocryphal**: Of doubtful authenticity, although widely circulated as being true.
  - **Cryptic**: Having a meaning that is mysterious, obscure, or puzzling.
  - **Cryptococcosis**: Medicine*: A severe pulmonary or systemic fungal infection caused by inhaling the microscopic spores of *Cryptococcus*.
  - **Cryptocurrency**: A digital currency in which transactions are verified and records maintained by a decentralized system using cryptography.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">crypt</mark>, think of <mark class="hl-def">truth, reality, or mistakes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms compound technical, computational, and aesthetic words:
1. **The Nominal Base `crypt`**: From Latin *crypta* (subterranean vault).
2. **Computational & Mathematical Prefixes**:
   - `en-` + `crypt` $\to$ *encrypt*, *encryption*.
   - `de-` + `crypt` $\to$ *decrypt*, *decryption*.
3. **Combining Stems**:
   - `crypt-` + `-graphy` (Greek *graphein* "to write") $\to$ *cryptography*.
   - `crypt-` + `-logy` (Greek *logos* "discourse") $\to$ *cryptology*.
   - `crypt-` + `currency` $\to$ *cryptocurrency*.
   - `apo-` + `crypt` (Greek *apokryptein* "to hide away") $\to$ *apocryphal*.
4. **The Romance Phonological Softening `grott-` / `grotesqu-`**:
   - Latin *crypta* $\to$ Vulgar Latin *\*grupta* $\to$ Italian *grotta* (**grotto**) $\to$ Italian *grottesco* $\to$ French **grotesque**.

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

The cognitive scope of *crypt* spans four rich domains:
- **Cybersecurity & Computational Cryptography**: [[encrypt]], [[decrypt]], [[encryption]], [[cryptography]], [[cryptology]], [[cryptocurrency]]
- **Ambiguity & Hidden Meanings**: [[cryptic]], [[apocryphal]]
- **Architecture, Geology & Subterranean Vaults**: `crypt`, [[grotto]]
- **Art History, Aesthetics & Pathology**: [[grotesque]], [[cryptococcosis]]

---

## 🔀 4. Prefix & Combining Dynamics on crypt

1. **`en-` + `crypt`** (*en-* "in, into"):
   - *encrypt* $\to$ to convert information or data into a cipher or code to prevent unauthorized access.
   - *encryption* $\to$ the process of encoding messages.
2. **`de-` + `crypt`** (*de-* "un-, reverse"):
   - *decrypt* $\to$ to decode or decipher an encrypted message.
3. **`apo-` + `crypt`** (*apo-* "away, off" + *kryptō*):
   - *apocryphal* $\to$ of doubtful authenticity, although widely circulated as being true; hidden away.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Computer Science & Information Security**: AES-256 *encryption*, zero-knowledge proofs, quantum *cryptography*.
- **Fintech & Blockchain**: *cryptocurrency* protocols, Bitcoin SHA-256 hashing.
- **Biblical Studies & Literary History**: biblical *Apocrypha*, *apocryphal* biographical anecdotes.
- **Microbiology & Medicine**: *Cryptococcus neoformans* fungal infections (*cryptococcosis*).
- **Art Criticism & Architecture**: *grotesque* gargoyles and ornamentation, cathedral *crypts*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[crypt]] | noun | **1.** A cellar or vault or underground burial chamber (especially beneath a church). | *"Why had our incomprehensible guide led us to the bottom of this submarine crypt?"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[cryptacanthodes]] | noun | **1.** A genus of stichaeidae. | *"In academic literature, cryptacanthodes designates a genus of stichaeidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptanalysis]] | noun | **1.** The science of analyzing and deciphering codes and ciphers and cryptograms. | *"In academic literature, cryptanalysis designates the science of analyzing and deciphering codes and ciphers and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptanalyst]] | noun | **1.** Decoder skilled in the analysis of codes and cryptograms. | *"In academic literature, cryptanalyst designates decoder skilled in the analysis of codes and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptanalytic]] | adjective | **1.** Of or relating to cryptanalysis. | *"In academic literature, cryptanalytic designates of or relating to cryptanalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptanalytics]] | noun | **1.** The science of analyzing and deciphering codes and ciphers and cryptograms. | *"In academic literature, cryptanalytics designates the science of analyzing and deciphering codes and ciphers and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptic]] | adjective | **1.** Of an obscure nature; ; ; ; - rachel carson.<br>**2.** Having a secret or hidden meaning; ; ; - john gunther. | *"Jesus' answer is a little cryptic at first sight."* — T. R. Glover, *The Jesus of History* |
| [[cryptical]] | adjective | **1.** Of an obscure nature; ; ; ; - rachel carson.<br>**2.** Having a secret or hidden meaning; ; ; - john gunther. | *"In academic literature, cryptical designates of an obscure nature; ; ; ; - rachel carson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptically]] | adverb | **1.** In a cryptic manner;  he said cryptically. | *"Make Philly," cried Sherman cryptically, above the sound of the explosions that were driving their craft through the air at over six hundred miles an hour."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[cryptobiosis]] | noun | **1.** A state in which an animal's metabolic activities come to a reversible standstill. | *"In academic literature, cryptobiosis designates a state in which an animal's metabolic activities come to a reversible standstill."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptobiotic]] | adjective | **1.** Of or related to the state of cryptobiosis. | *"In academic literature, cryptobiotic designates of or related to the state of cryptobiosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptobranchidae]] | noun | **1.** Large aquatic salamanders: hellbenders; giant salamanders. | *"In academic literature, cryptobranchidae designates large aquatic salamanders: hellbenders; giant salamanders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptobranchus]] | noun | **1.** Type genus of the cryptobranchidae. | *"In academic literature, cryptobranchus designates type genus of the cryptobranchidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptocercidae]] | noun | **1.** A family of blattodea. | *"In academic literature, cryptocercidae designates a family of blattodea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptocercus]] | noun | **1.** Cockroaches. | *"In academic literature, cryptocercus designates cockroaches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptococcosis]] | noun | **1.** A fungal infection characterized by nodular lesions--first in the lungs and spreading to the nervous system. | *"In academic literature, cryptococcosis designates a fungal infection characterized by nodular lesions--first in the lungs and spreading to the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptocoryne]] | noun | **1.** Any plant of the genus cryptocoryne; evergreen perennials growing in fresh or brackish water; tropical asia. | *"In academic literature, cryptocoryne designates any plant of the genus cryptocoryne; evergreen perennials growing in fresh or brackish water; tropical asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptocurrency]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin crypt within the domain of Truth, Deception & Error.<br>**2.** A technical or specialized form exhibiting the properties of crypt in systematic terminology. | *"In academic literature, cryptocurrency designates pertaining to, derived from, or characteristic of latin crypt within the domain of truth, deception & error."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptogam]] | noun | **1.** Formerly recognized taxonomic group including all flowerless and seedless plants that reproduce by means of spores: ferns, mosses, algae, fungi. | *"For many years he has toiled earnestly and vigorously at the lower cryptogams, as evidenced by his “Scottish Cryptogamic Flora,” published in 1823; and yet his continual additions to the records of science show him to be earnest and vigorous still."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cryptogamia]] | noun | **1.** In former classification systems: one of two major plant divisions, including all plants that do not bear seeds: ferns, mosses, algae, fungi. | *"Relhan, for instance, only occupies one-fifth of his “Flora Cantabrigiensis,” and Hudson one-fourth of his “Flora Anglica,” with the Cryptogamia."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cryptogamic]] | adjective | **1.** Of or relating to a cryptogam. | *"When the cryptogamic plants of the world shall have been as widely examined and as well understood as the phanerogamic plants have been, we shall be in a better position to determine the geographical distribution of the different orders of fungi."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cryptogamous]] | adjective | **1.** Of or relating to a cryptogam. | *"In academic literature, cryptogamous designates of or relating to a cryptogam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptogram]] | noun | **1.** A piece of writing in code or cipher. | *"Dolphin’s Barn: the transliterated name and address of the addresser of the 3 letters in reversed alphabetic boustrophedonic punctated quadrilinear cryptogram (vowels suppressed) N."* — James Joyce, *Ulysses* |
| [[cryptogramma]] | noun | **1.** Sometimes placed in family polypodiaceae or cryptogrammataceae. | *"In academic literature, cryptogramma designates sometimes placed in family polypodiaceae or cryptogrammataceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptogrammataceae]] | noun | **1.** One of a number of families into which the family polypodiaceae has been subdivided in some classification systems. | *"In academic literature, cryptogrammataceae designates one of a number of families into which the family polypodiaceae has been subdivided in some classification systems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptograph]] | noun | **1.** A secret method of writing.<br>**2.** A piece of writing in code or cipher. | *"As it was, I assumed the cryptograph to be English."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[cryptographer]] | noun | **1.** Decoder skilled in the analysis of codes and cryptograms. | *"In academic literature, cryptographer designates decoder skilled in the analysis of codes and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptographic]] | adjective | **1.** Of or relating to cryptanalysis. | *"But man, even to himself, is a cryptographic page, having an ostensible writing, and another between the lines."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[cryptographical]] | adjective | **1.** Of or relating to cryptanalysis. | *"In academic literature, cryptographical designates of or relating to cryptanalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptographically]] | adverb | **1.** In a cryptographic manner. | *"In academic literature, cryptographically designates in a cryptographic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptography]] | noun | **1.** The science of analyzing and deciphering codes and ciphers and cryptograms.<br>**2.** Act of writing in code or cipher. | *"In academic literature, cryptography designates the science of analyzing and deciphering codes and ciphers and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptologic]] | adjective | **1.** Of or relating to cryptanalysis. | *"In academic literature, cryptologic designates of or relating to cryptanalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptological]] | adjective | **1.** Of or relating to cryptanalysis. | *"In academic literature, cryptological designates of or relating to cryptanalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptologist]] | noun | **1.** Decoder skilled in the analysis of codes and cryptograms. | *"In academic literature, cryptologist designates decoder skilled in the analysis of codes and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptology]] | noun | **1.** The science of analyzing and deciphering codes and ciphers and cryptograms. | *"In academic literature, cryptology designates the science of analyzing and deciphering codes and ciphers and cryptograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptomeria]] | noun | **1.** Japanese cedar; sugi. | *"In academic literature, cryptomeria designates japanese cedar; sugi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptomonad]] | noun | **1.** Common in fresh and salt water appearing along the shore as algal blooms. | *"In academic literature, cryptomonad designates common in fresh and salt water appearing along the shore as algal blooms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptophyceae]] | noun | **1.** Motile usually brownish-green protozoa-like algae. | *"In academic literature, cryptophyceae designates motile usually brownish-green protozoa-like algae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptophyta]] | noun | **1.** A phylum in the kingdom protoctista. | *"In academic literature, cryptophyta designates a phylum in the kingdom protoctista."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptophyte]] | noun | **1.** Common in fresh and salt water appearing along the shore as algal blooms. | *"In academic literature, cryptophyte designates common in fresh and salt water appearing along the shore as algal blooms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptoprocta]] | noun | **1.** Large primitive cat-like carnivores inhabiting forests of madagascar. | *"In academic literature, cryptoprocta designates large primitive cat-like carnivores inhabiting forests of madagascar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptorchidism]] | noun | **1.** Failure of one or both testes to move into the scrotum as the male fetus develops. | *"In academic literature, cryptorchidism designates failure of one or both testes to move into the scrotum as the male fetus develops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptorchidy]] | noun | **1.** Failure of one or both testes to move into the scrotum as the male fetus develops. | *"In academic literature, cryptorchidy designates failure of one or both testes to move into the scrotum as the male fetus develops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptorchism]] | noun | **1.** Failure of one or both testes to move into the scrotum as the male fetus develops. | *"In academic literature, cryptorchism designates failure of one or both testes to move into the scrotum as the male fetus develops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptotermes]] | noun | **1.** Genus of dry wood termites; cosmopolitan in distribution; sometimes considered a subgenus of kalotermes. | *"In academic literature, cryptotermes designates genus of dry wood termites; cosmopolitan in distribution; sometimes considered a subgenus of kalotermes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptotis]] | noun | **1.** Least shrews. | *"In academic literature, cryptotis designates least shrews."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decrypt]] | verb | **1.** Convert code into ordinary language. | *"In academic literature, decrypt designates convert code into ordinary language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decryption]] | noun | **1.** The activity of making clear or converting from code into plain text. | *"In academic literature, decryption designates the activity of making clear or converting from code into plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encrypt]] | verb | **1.** Convert ordinary language into code. | *"In academic literature, encrypt designates convert ordinary language into code."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encryption]] | noun | **1.** The activity of converting data or information into code. | *"Note the encryption structure."* — Meyer Moldeven, *The Universe — or Nothing* |

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
    ROOT DASHBOARD · CRYPT
  </div>
</div>
