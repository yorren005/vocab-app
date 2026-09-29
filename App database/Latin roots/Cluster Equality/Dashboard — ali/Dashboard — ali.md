---
status: unread
type: root_dashboard
---
# Dashboard — ali
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ali-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“other or another”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A balanced scale holding equal weights steady on both sides.</span>
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

The root **ali** means other or another. It refers to other, another, elsewhere, foreign, not-oneself. In English, this root forms words such as *alias*, *alibi*, *aliter*, and *aliunde*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: other or another
> The root **ali** means other or another. It refers to other, another, elsewhere, foreign, not-oneself. In English, this root forms words such as *alias*, *alibi*, *aliter*, and *aliunde*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Other or another</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A balanced scale holding equal weights steady on both sides.</mark>
> - **Everyday Connection**: Think of familiar words like *alias* and *alibi*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ali** comes from a Latin word that means *"other or another"*.
  - At its core, it describes other or another.

- **The Big Picture Idea**:
  - Picture a balanced scale holding equal weights steady on both sides.
  - Whenever you see **ali** in an English word, think of **balance, fairness, and equality**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of other or another.
  - **Mental & Social**: How people experience, organize, or communicate about other or another.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Alias**: An assumed or additional name used to conceal one's true identity.
  - **Alibi**: Elsewhere.
  - **Aliter**: Otherwise.
  - **Aliunde**: From another source.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ali</mark>, think of <mark class="hl-def">balance, fairness, and equality</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates across two morphological channels:
> - **Pronominal Fossil Stem (`ali-`):** Borrowed directly from Classical Latin adverbs and quantifiers with their original Latin inflectional suffixes intact (*ali-as*, *ali-bi*, *ali-ter*, *ali-unde*, *ali-quot*, *ali-quant*).
> - **Adjectival / Factitive Stem (`alien-` < *aliēnus*):** Generates living English verbs, nouns, and adjectives via standard Romance and Germanic affixation (*alien*, *alien-ate*, *alien-ation*, *alien-able*, *in-alien-able*, *un-alien-able*, *alien-ist*).
> - **Property Law Specializations:** Utilizing Anglo-French feudal conveyancing suffixes *-or* (grantor) and *-ee* (recipient), yielding *alienor* and *alienee*.

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
> The root spans a massive spectrum across governance, logic, science, and psychology:
> - **Concealed or Multiple Identities:** Assumed names, digital handles, and pseudonyms ([[alias]]).
> - **Spatial Absence & Defense of Elsewhere:** Proving physical non-presence at a crime scene ([[alibi]]).
> - **Legal Extrinsic Evidence & Counter-Rulings:** Procedural Latin markers of alternative fact and outside proof ([[aliter]], [[aliunde]], [[inter alia]], [[et al.]]).
> - **Exact Divisors & Laboratory Fractionation:** Mathematical factorization and chemical sample pipetting ([[aliquot]], [[aliquant]]).
> - **Foreign Sovereignty & Extraterrestrial Life:** Non-citizens, foreign species, and space lifeforms ([[alien]], [[alienness]], [[alienly]], [[alienigenous]]).
> - **Property Conveyance & Rights Theory:** Transferring estates and the inviolability of human dignity ([[alienate]], [[alienable]], [[alienability]], [[inalienable]], [[inalienably]], [[inalienability]], [[unalienable]], [[unalienably]], [[alienor]], [[alienee]]).
> - **Psychological Estrangement & Forensic Sanity:** Mental detachment, societal isolation, and psychiatric courtroom testimony ([[alienated]], [[alienating]], [[alienation]], [[alienist]], [[alienism]]).

---

## 🔀 4. Prefix & Combining Dynamics on ali

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | — | [[alias]], [[alibi]], [[alien]] | Pointers to another name, another place, or another nation. |
| **in-** | "not, un-" (privative) | [[inalienable]], [[inalienability]] | Incapable of being transferred, surrendered, or made another's. |
| **un-** | "not" (Germanic privative) | [[unalienable]], [[unalienably]] | The historic American variant of inalienable rights. |
| **inter-** | "between, among" | [[inter alia]] | Among other things; indicating an illustrative, non-exhaustive list. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-as** (Latin adverbial) | Manner / Temporal Adverb | [[alias]] | At another time; otherwise known as. |
| **-bi** (Latin locative) | Locative Adverb | [[alibi]] | In another place; elsewhere. |
| **-ter** (Latin manner) | Modal Adverb | [[aliter]] | In another manner; otherwise. |
| **-unde** (Latin ablative) | Source Adverb | [[aliunde]] | From another place or external source. |
| **-quot** (Latin quantifier) | Exact Fractional Part | [[aliquot]] | An exact divisor or pipetted sample. |
| **-quant** (Latin quantifier) | Non-exact Fractional Part | [[aliquant]] | A divisor leaving an unequal remainder. |
| **-ate** (*-āre*) | Factitive Verb | [[alienate]] | To cause estrangement or transfer title to another. |
| **-tion** (*-tiō*) | Noun of Process / State | [[alienation]] | The state of isolation or the act of property conveyance. |
| **-ist** (*-iste*) | Medical / Professional Agent | [[alienist]] | A psychiatric expert evaluating mental estrangement. |
| **-or** / **-ee** | Legal Conveyancing Relational | [[alienor]], [[alienee]] | The transferor and the transferee of real estate title. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Constitutional Law & Human Rights** | [[inalienable]], [[unalienable]], [[alienability]] | Universal Declaration of Human Rights, natural law theories, non-delegable sovereignty, and property alienability doctrines. |
| **Criminal Defense & Procedural Law** | [[alibi]], [[alias]], [[aliunde]], [[aliter]] | Establishing timeline alibis via surveillance metadata, alias records in law enforcement databases, and the parol evidence rule (*evidence aliunde*). |
| **Analytical Chemistry & Laboratory Medicine** | [[aliquot]] | Robotic pipetting systems, cryogenic biobanking, serum aliquot testing, and serial sample dilutions. |
| **Sociology & Political Philosophy** | [[alienation]], [[alienated]] | Industrial division of labor, modern urban atomization, and social contract theory. |
| **Forensic Psychiatry & Criminal Insanity** | [[alienist]], [[alienism]] | Legal insanity evaluations (M'Naghten rule), competence to stand trial, and historical 19th-century asylum medicine. |
| **Property Law & Real Estate** | [[alienor]], [[alienee]], [[alienate]] | Deeds of conveyance, fee simple absolute estates, and restraints on alienation. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adalia]] | noun | **1.** A port city in southwestern turkey on the gulf of antalya.<br>**2.** Genus of ladybugs. | *"In academic literature, adalia designates a port city in southwestern turkey on the gulf of antalya."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agalinis]] | noun | **1.** Semiparasitic herb with purple or white or pink flowers; grows in the united states and west indies. | *"In academic literature, agalinis designates semiparasitic herb with purple or white or pink flowers; grows in the united states and west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alalia]] | noun | **1.** Paralysis of the vocal cords resulting in an inability to speak. | *"In academic literature, alalia designates paralysis of the vocal cords resulting in an inability to speak."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ali]] | noun | **1.** United states prizefighter who won the world heavyweight championship three times (born in 1942).<br>**2.** The fourth caliph of islam who is considered to be the first caliph by shiites; he was a cousin and son-in-law of muhammad; after his assassination islam was divided into shiite and sunnite sects. | *"It is Ahmet Ali, with his attendants and a lot of people following him." "And who is Ahmet Ali?" "Ahmet Ali! don't you know, Zanim?"* — Donn Byrne, *The Wind Bloweth* |
| [[alias]] | noun | **1.** A name that has been assumed temporarily.<br>**2.** As known or named at another time or place. | *"The black prince, sir; alias the prince of darkness; alias the devil."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alibi]] | noun | **1.** (law) a defense by an accused person purporting to show that he or she could not have committed the crime in question.<br>**2.** A defense of some offensive behavior or some failure to keep a promise etc. | *"He would be far away, as usual, with an alibi obviously provided on purpose."* — S. R. Crockett, *Deep Moat Grange* |
| [[alien]] | noun | **1.** A person who comes from a foreign country; someone who does not owe allegiance to your country.<br>**2.** Anyone who does not belong in the environment in which they are found. | *"These offices, so oft as thou wilt look, Shall profit thee, and much enrich thy book. 78 So oft have I invoked thee for my muse, And found such fair assistance in my verse, As every alien pen hath got my use, And under thee their poesy disperse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alienable]] | adjective | **1.** Transferable to another owner. | *"There was only a small part of his estate that Sir Walter could dispose of; but had every acre been alienable, it would have made no difference."* — Jane Austen, *Persuasion* |
| [[alienage]] | noun | **1.** The quality of being alien. | *"No alien who has voted in county, State or Territory shall, because of alienage, be exempt from draft."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[alienate]] | verb | **1.** Arouse hostility or indifference in where there had formerly been love, affection, or friendliness.<br>**2.** Transfer property or ownership. | *"He sees how quarrels injure life, and alienate a man from God."* — T. R. Glover, *The Jesus of History* |
| [[alienated]] | verb | **1.** Arouse hostility or indifference in where there had formerly been love, affection, or friendliness.<br>**2.** Transfer property or ownership. | *"He is no more "alienated from the life of God" (Eph. 4:18; Col. 1:21), "without God in the world" (Eph. 2:12), an "enemy of God" (Rom. 5:10); he was lost and is found, and the Father himself, Jesus says, cries: "Let us be merry" ("Euphranthomen")."* — T. R. Glover, *The Jesus of History* |
| [[alienating]] | verb | **1.** Arouse hostility or indifference in where there had formerly been love, affection, or friendliness.<br>**2.** Transfer property or ownership. | *"That is what you have gained by alienating me!” And he walked silently several times up and down the room, his fat shoulders twitching."* — graf Leo Tolstoy, *War and Peace* |
| [[alienation]] | noun | **1.** The feeling of being alienated from other people.<br>**2.** Separation resulting from hostility. | *"Sympathies, I believe, exist (for instance, between far-distant, long-absent, wholly estranged relatives asserting, notwithstanding their alienation, the unity of the source to which each traces his origin) whose workings baffle mortal comprehension."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[alienator]] | noun | **1.** An unpleasant person who causes friendly people to become indifferent or unfriendly or hostile. | *"In academic literature, alienator designates an unpleasant person who causes friendly people to become indifferent or unfriendly or hostile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alienee]] | noun | **1.** Someone to whom the title of property is transferred. | *"In academic literature, alienee designates someone to whom the title of property is transferred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alienism]] | noun | **1.** An obsolete term for the study and treatment of mental illness.<br>**2.** The quality of being alien. | *"In academic literature, alienism designates an obsolete term for the study and treatment of mental illness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alienist]] | noun | **1.** A psychiatrist and specialist in the legal aspects of mental illness. | *"Don't talk to me as if you were an alienist trying to examine an abstruse case, Evelina," he growled, with extreme temper."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[alienor]] | noun | **1.** Someone from whom the title of property is transferred. | *"In academic literature, alienor designates someone from whom the title of property is transferred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliment]] | noun | **1.** A source of materials to nourish the body.<br>**2.** Give nourishment to. | *"In the Propontis, as far as I can learn, none of that peculiar substance called _brit_ is to be found, the aliment of the right whale."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[alimental]] | adjective | **1.** Of or providing nourishment. | *"The sun that light imparts to all, receives From all his alimental recompence In humid exhalations, and at even Sups with the ocean."* — John Milton, *Paradise Lost* |
| [[alimentary]] | adjective | **1.** Of or providing nourishment. | *"One thing is certain, that in the year 615 before Jesus Christ, Necos undertook the works of an alimentary canal to the waters of the Nile across the plain of Egypt, looking towards Arabia."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[alimentation]] | noun | **1.** A source of materials to nourish the body.<br>**2.** The act of supplying food and nourishment. | *"In academic literature, alimentation designates a source of materials to nourish the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alimentative]] | adjective | **1.** Related to the supply of aliment. | *"In academic literature, alimentative designates related to the supply of aliment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alimony]] | noun | **1.** Court-ordered support paid by one spouse to another after they are separated. | *"And would a jury give me five shillings alimony tomorrow, eh?"* — James Joyce, *Ulysses* |
| [[aline]] | verb | **1.** Place in a line or arrange so as to be parallel or straight. | *"Aline,” he said to his wife, “go and see what they are about.” The princess went up to the door, passed by it with a dignified and indifferent air, and glanced into the little drawing room."* — graf Leo Tolstoy, *War and Peace* |
| [[alinement]] | noun | **1.** An organization of people (or countries) involved in a pact or treaty. | *"In academic literature, alinement designates an organization of people (or countries) involved in a pact or treaty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliquot]] | noun | **1.** An integer that is an exact divisor of some quantity.<br>**2.** Signifying an exact divisor or factor of a quantity. | *"In academic literature, aliquot designates an integer that is an exact divisor of some quantity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alir]] | noun | **1.** A terrorist organization that seeks to overthrow the government dominated by tutsi and to institute hutu control again. | *"In academic literature, alir designates a terrorist organization that seeks to overthrow the government dominated by tutsi and to institute hutu control again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alisma]] | noun | **1.** Small genus of aquatic or semiaquatic plants. | *"In academic literature, alisma designates small genus of aquatic or semiaquatic plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alismales]] | noun | **1.** An order of aquatic monocotyledonous herbaceous plants. | *"In academic literature, alismales designates an order of aquatic monocotyledonous herbaceous plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alismataceae]] | noun | **1.** Perennial or annual aquatic or marsh plants. | *"In academic literature, alismataceae designates perennial or annual aquatic or marsh plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alismatidae]] | noun | **1.** One of four subclasses or superorders of monocotyledones; comprises about 500 species in 14 families of aquatic and semiaquatic herbs. | *"In academic literature, alismatidae designates one of four subclasses or superorders of monocotyledones; comprises about 500 species in 14 families of aquatic and semiaquatic herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliter]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ali within the domain of Equality.<br>**2.** A technical or specialized form exhibiting the properties of ali in systematic terminology. | *"In academic literature, aliter designates pertaining to, derived from, or characteristic of latin ali within the domain of equality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliterate]] | noun | **1.** A person who can read but is disinclined to derive information from literary sources. | *"In academic literature, aliterate designates a person who can read but is disinclined to derive information from literary sources."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliunde]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ali within the domain of Equality.<br>**2.** A technical or specialized form exhibiting the properties of ali in systematic terminology. | *"In academic literature, aliunde designates pertaining to, derived from, or characteristic of latin ali within the domain of equality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliyah]] | noun | **1.** (judaism) the honor of being called up to the reading desk in the synagogue to read from the torah.<br>**2.** (judaism) immigration of jews to israel. | *"In academic literature, aliyah designates (judaism) the honor of being called up to the reading desk in the synagogue to read from the torah."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aralia]] | noun | **1.** Any of various plants of the genus aralia; often aromatic plants having compound leaves and small umbellate flowers. | *"In academic literature, aralia designates any of various plants of the genus aralia; often aromatic plants having compound leaves and small umbellate flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[araliaceae]] | noun | **1.** Mostly tropical trees and shrubs and lianas: genera panax and hedera. | *"In academic literature, araliaceae designates mostly tropical trees and shrubs and lianas: genera panax and hedera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coalition]] | noun | **1.** An organization of people (or countries) involved in a pact or treaty.<br>**2.** The state of being combined into one body. | *"Could he some commutation broach, I’ll pledge my aith in guid braid Scotch, He needna fear their foul reproach Nor erudition, Yon mixtie-maxtie, queer hotch-potch, The Coalition."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[dealing]] | noun | **1.** Method or manner of conduct in relation to others.<br>**2.** The act of transacting within or between groups (as carrying on commercial activities). | *"There is no honesty in such dealing, unless a woman should be made an ass and a beast, to bear every knave’s wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dealings]] | noun | **1.** Social or verbal interchange (usually followed by `with').<br>**2.** Mutual dealings or connections or communications among persons or groups. | *"O father Abram, what these Christians are, Whose own hard dealings teaches them suspect The thoughts of others."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inalienable]] | adjective | **1.** Incapable of being repudiated or transferred to another.<br>**2.** Not subject to forfeiture. | *"She was aggrieved and wounded that the possession of hopeless love from Gabriel, which she had grown to regard as her inalienable right for life, should have been withdrawn just at his own pleasure in this way."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[inalienably]] | adverb | **1.** In an inalienable manner. | *"And, besides,” he continued, with a fastidious sensibility, inalienably characteristic of the man, “it would not be fit nor beautiful to go!"* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[irreality]] | noun | **1.** The state of being insubstantial or imaginary; not existing objectively or in fact. | *"In academic literature, irreality designates the state of being insubstantial or imaginary; not existing objectively or in fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonalinement]] | noun | **1.** People (or countries) who are not aligned with other people (or countries) in a pact or treaty. | *"In academic literature, nonalinement designates people (or countries) who are not aligned with other people (or countries) in a pact or treaty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opaline]] | adjective | **1.** Having a play of lustrous rainbow colors. | *"In academic literature, opaline designates having a play of lustrous rainbow colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opalise]] | verb | **1.** Make opalescent.<br>**2.** Replace or convert into opal. | *"In academic literature, opalise designates make opalescent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opalize]] | verb | **1.** Make opalescent.<br>**2.** Replace or convert into opal. | *"In academic literature, opalize designates make opalescent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[realine]] | verb | **1.** Align anew or better. | *"In academic literature, realine designates align anew or better."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[realisation]] | noun | **1.** A musical composition that has been completed or enriched by someone other than the composer.<br>**2.** Coming to understand something clearly and distinctly. | *"Sometimes, for a fleeting moment, I thought I caught a glance, heard a tone, beheld a form, which announced the realisation of my dream: but I was presently undeceived."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[realise]] | verb | **1.** Earn on some commercial or business transaction; earn as salary or wages.<br>**2.** Convert into cash; of goods and property. | *"It was only as I walked away, hearing my own steps and those of Lecamus ringing upon the pavement, that I began to realise what had happened."* — Mrs. Oliphant, *A Beleaguered City* |
| [[realised]] | verb | **1.** Earn on some commercial or business transaction; earn as salary or wages.<br>**2.** Convert into cash; of goods and property. | *"She gazed upon their silent throes amid the shades of space, but realised none at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[realism]] | noun | **1.** The attribute of accepting the facts of life and favoring practicality and literal truth.<br>**2.** The state of being actual or real. | *"It is the mixture of sheer realism with absurdity that makes the irony and gives it its force."* — T. R. Glover, *The Jesus of History* |
| [[realist]] | noun | **1.** A philosopher who believes that universals are real and exist independently of anyone thinking of them.<br>**2.** A person who accepts the world as it literally is and deals with it accordingly. | *"On the other hand, we are realists."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[realistic]] | adjective | **1.** Aware or expressing awareness of things as they really are.<br>**2.** Representing what is real; not abstract or ideal. | *"We have in our police reports realism pushed to its extreme limits, and yet the result is, it must be confessed, neither fascinating nor artistic.” “A certain selection and discretion must be used in producing a realistic effect,” remarked Holmes."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[realistically]] | adverb | **1.** In a realistic manner. | *"In academic literature, realistically designates in a realistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reality]] | noun | **1.** All of your experiences that determine how things appear to you.<br>**2.** The state of being actual or real. | *"He is presently reassured on these subjects by the unchallengeable reality of Mrs."* — Charles Dickens, *Bleak House* |
| [[realization]] | noun | **1.** Coming to understand something clearly and distinctly.<br>**2.** Making real or giving the appearance of reality. | *"Now came the realization that things might be different."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[realize]] | verb | **1.** Be fully aware or cognizant of.<br>**2.** Perceive (an idea or situation) mentally. | *"You realize well enough that all the talk has no foundation whatever." Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sealing]] | noun | **1.** The act of treating something to make it repel water.<br>**2.** Make tight; secure against leakage. | *"With the round top of an inkstand and two broken bits of sealing-wax he is silently and slowly working out whatever train of indecision is in his mind."* — Charles Dickens, *Bleak House* |
| [[sedalia]] | noun | **1.** A town in east central missouri. | *"In academic literature, sedalia designates a town in east central missouri."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surrealism]] | noun | **1.** A 20th century movement of artists and writers (developing out of dadaism) who used fantastic images and incongruous juxtapositions in order to represent unconscious thoughts and dreams. | *"In academic literature, surrealism designates a 20th century movement of artists and writers (developing out of dadaism) who used fantastic images and incongruous juxtapositions in order to represent unconscious thoughts and dreams."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surrealist]] | noun | **1.** An artist who is a member of the movement called surrealism. | *"In academic literature, surrealist designates an artist who is a member of the movement called surrealism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surrealistic]] | adjective | **1.** Characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys. | *"In academic literature, surrealistic designates characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unalienable]] | adjective | **1.** Incapable of being repudiated or transferred to another. | *"I say the right of a state to annul a law of Congress cannot be maintained but on the ground of the unalienable right of man to resist oppression; that is to say, upon the ground of revolution."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[unrealised]] | adjective | **1.** Of persons; marked by failure to realize full potentialities. | *"It loves the vaguely beheld and unrealised ideal."* — George MacDonald, *The Portent and Other Stories* |
| [[unrealism]] | noun | **1.** A representation having no reference to concrete objects or specific examples. | *"In academic literature, unrealism designates a representation having no reference to concrete objects or specific examples."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrealistic]] | adjective | **1.** Not realistic. | *"It's downright unrealistic to keep our self-defense forces in the Special Zone so far below what's needed to protect our vital interests." "What do you suggest, Jim," the President shrugged, "break our treaties with the Outer Region?"* — Meyer Moldeven, *The Universe — or Nothing* |
| [[unrealistically]] | adverb | **1.** In an unrealistic manner. | *"In academic literature, unrealistically designates in an unrealistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreality]] | noun | **1.** The quality possessed by something that is unreal.<br>**2.** The state of being insubstantial or imaginary; not existing objectively or in fact. | *"The forms in which he gave it expression are predominantly melancholy, because this kind of idealism, with its insistence on the unreality of evil, is the recoil from life of an unsatisfied and disappointed soul."* — Sydney Waterlow, *Shelley* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Equality]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ALI
  </div>
</div>
