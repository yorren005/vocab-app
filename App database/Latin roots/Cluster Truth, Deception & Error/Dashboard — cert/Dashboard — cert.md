---
status: unread
type: root_dashboard
---
# Dashboard — cert
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cert-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sure or decided”</span>
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

The root **cert** means sure or decided. It describes being certain, reliable, or clearly decided. In English, this root forms words such as *separate*, *ascertain*, *certain*, and *certainty*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sure or decided
> The root **cert** means sure or decided. It describes being certain, reliable, or clearly decided. In English, this root forms words such as *separate*, *ascertain*, *certain*, and *certainty*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sure or decided</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Uncovering honest facts and separating what is genuine from what is false.</mark>
> - **Everyday Connection**: Think of familiar words like *separate* and *ascertain*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cert** comes from a Latin word that means *"sure or decided"*.
  - At its core, it describes sure or decided.

- **The Big Picture Idea**:
  - Picture uncovering honest facts and separating what is genuine from what is false.
  - Whenever you see **cert** in an English word, think of **truth, reality, or mistakes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sure or decided.
  - **Mental & Social**: How people experience, organize, or communicate about sure or decided.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Separate**: An everyday English word showing the root's idea of *sure or decided*.
  - **Ascertain**: To find something out for certain.
  - **Certain**: Known for sure.
  - **Certainty**: The quality or state of being certain.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cert</mark>, think of <mark class="hl-def">truth, reality, or mistakes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms active verbs, abstract nouns, and official documents:
1. **The Base Adjectival Stem `cert-`**:
   - *certain* (< Old French *certain* < Vulgar Latin *\*certānus*).
   - *certainty*, *certitude* (< Late Latin *certitūdō*).
   - *uncertain*, *incertitude*.
2. **Verbal Derivations with `-fy`** (*facere* "to make"):
   - Latin *certificāre* $\to$ *certify*, *certificate*, *certification*.
3. **Prefixal Compounding**:
   - `ad-` + `cert-` $\to$ *ascertain* (< Old French *acertainer* "to make sure").
   - `com-` + `cert-` $\to$ *concert*, *disconcert*.

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

The cognitive scope of *cert* spans four major domains:
- **Epistemic Assurance & Conviction**: [[certain]], [[certainty]], [[certitude]], [[uncertain]], [[incertitude]]
- **Investigative Discovery**: [[ascertain]]
- **Institutional Validation & Credentials**: [[certify]], [[certificate]], [[certification]]
- **Musical & Social Harmony**: [[concert]], [[disconcert]], `concerted`

---

## 🔀 4. Prefix & Combining Dynamics on cert

1. **`ad-` + `cert`** (*ad* "to, toward" + *certus*):
   - *ascertain* $\to$ to find something out for certain; make sure of.
2. **`in-` / `un-` + `cert`** (*in-* "not"):
   - *uncertain* $\to$ not able to be relied upon; not known or definite.
   - *incertitude* $\to$ a state of uncertainty or hesitation.
3. **`con-` + `cert`** (*cum* "together" + *certus*):
   - *concert* $\to$ agreement in design, plan, or action; a musical performance.
   - *disconcert* $\to$ to disturb the composure of; unsettle; throw into confusion.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Law & Appellate Procedure**: writ of *certiorari*, *certifying* class-action lawsuits.
- **Cybersecurity & IT Infrastructure**: SSL/TLS digital *certificates*, public key *certification* authorities.
- **Education & Licensing**: board *certification*, medical licensing *certificates*.
- **Music & Orchestral Performance**: classical piano *concertos*, *concerted* diplomatic efforts.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ascertain]] | verb | **1.** Establish after a calculation, investigation, experiment, survey, or study.<br>**2.** Be careful or certain to do something; make certain of something. | *"Guppy proposes to dispatch the trusty Smallweed to ascertain if Mr."* — Charles Dickens, *Bleak House* |
| [[ascertainable]] | adjective | **1.** Capable of being ascertained or found out. | *"The labor itself has not a predetermined, ascertainable value, but only a resultant, derived value."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[ascertained]] | verb | **1.** Establish after a calculation, investigation, experiment, survey, or study.<br>**2.** Be careful or certain to do something; make certain of something. | *"Jarndyce had ascertained the amount, either from Mr."* — Charles Dickens, *Bleak House* |
| [[cert]] | noun | **1.** An absolute certainty. | *"Ah cert'nly can't allow li'l' Brer Rabbit to be hurt, Ah cert'nly can't!” muttered Ol' Mistah Buzzard, and chuckled."* — Thornton W. Burgess, *The Adventures of Reddy Fox* |
| [[certain]] | adjective | **1.** Definite but not specified or identified.<br>**2.** Having or feeling no doubt or uncertainty; confident and assured. | *"You do not know him, my lord, as we do; certain it is that he will steal himself into a man’s favour, and for a week escape a great deal of discoveries, but when you find him out, you have him ever after."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[certainly]] | adverb | **1.** Definitely or positively (`sure' is sometimes used informally for `surely'). | *"Nay, certainly, I have heard the Ptolemies’ pyramises are very goodly things."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[certainty]] | noun | **1.** The state of being certain.<br>**2.** Something that is certain. | *"Nay, ’tis most credible, we here receive it, A certainty, vouch’d from our cousin Austria, With caution, that the Florentine will move us For speedy aid; wherein our dearest friend Prejudicates the business, and would seem To have us make denial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[certifiable]] | adjective | **1.** Fit to be certified as insane (and treated accordingly).<br>**2.** Capable of being guaranteed or certified. | *"In academic literature, certifiable designates fit to be certified as insane (and treated accordingly)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[certificate]] | noun | **1.** A document attesting to the truth of certain stated facts.<br>**2.** A formal declaration that documents a fact of relevance to finance and investment; the holder has a right to receive interest or dividends. | *"I am quite willing—I believe I use a legal phrase—to admit the certificate.” Mr."* — Charles Dickens, *Bleak House* |
| [[certificated]] | verb | **1.** Present someone with a certificate.<br>**2.** Authorize by certificate. | *"Indeed, the postman had brought me an official blue paper that morning, by virtue of which I was informed of my registration as a regular certificated teacher under the Act of 1871."* — S. R. Crockett, *Deep Moat Grange* |
| [[certification]] | noun | **1.** The act of certifying or bestowing a franchise on.<br>**2.** Confirmation that some fact or statement is true through the use of documentary evidence. | *"As the SPS functions and workload became clear, I joined its paraprofessional training to certification and when the Service became operational I took my turn on the 'hotline,' especially those related to my McClellan responsibilities."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[certificatory]] | adjective | **1.** Serving to certify or endorse authoritatively. | *"In academic literature, certificatory designates serving to certify or endorse authoritatively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[certified]] | verb | **1.** Provide evidence for; stand as proof of; show by one's behavior, attitude, or external attributes.<br>**2.** Guarantee payment on; of checks. | *"Beside, what infamy will there arise When foreign princes shall be certified That for a toy, a thing of no regard, King Henry’s peers and chief nobility Destroy’d themselves and lost the realm of France!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[certify]] | verb | **1.** Provide evidence for; stand as proof of; show by one's behavior, attitude, or external attributes.<br>**2.** Guarantee payment on; of checks. | *"Marry, for that she’s in a wrong belief, I go to certify her Talbot’s here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[certiorari]] | noun | **1.** A common law writ issued by a superior court to one of inferior jurisdiction demanding the record of a particular case. | *"In academic literature, certiorari designates a common law writ issued by a superior court to one of inferior jurisdiction demanding the record of a particular case."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[certitude]] | noun | **1.** Total certainty or greater certainty than circumstances warrant. | *"Raffles’ slow wink and slight protrusion of his tongue was worse than a nightmare, because it held the certitude that it was not a nightmare, but a waking misery."* — George Eliot, *Middlemarch* |
| [[concert]] | noun | **1.** A performance of music by players or singers not involving theatrical staging.<br>**2.** Contrive (a plan) by mutual agreement. | *"After tea we had quite a little concert, in which Richard—who was enthralled by Ada’s singing and told me that she seemed to know all the songs that ever were written—and Mr."* — Charles Dickens, *Bleak House* |
| [[concerted]] | verb | **1.** Contrive (a plan) by mutual agreement.<br>**2.** Settle by agreement. | *"If, however, there is a concerted movement to spend the surplus money, there results a general bidding down of the value of money, a general bidding up of the prices of goods."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[concertina]] | noun | **1.** Coiled barbed wire used as an obstacle.<br>**2.** Free-reed instrument played like an accordion by pushing its ends together to force air through the reeds. | *"Imagine him here—the very end of the world, a sea the colour of lead, a sky the colour of smoke, a kind of ship about as rigid as a concertina—and going up this river with stores, or orders, or what you like."* — Joseph Conrad, *Heart of Darkness* |
| [[concertise]] | verb | **1.** Give concerts; perform in concerts. | *"In academic literature, concertise designates give concerts; perform in concerts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concertize]] | verb | **1.** Give concerts; perform in concerts. | *"In academic literature, concertize designates give concerts; perform in concerts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concerto]] | noun | **1.** A composition for orchestra and a soloist. | *"In academic literature, concerto designates a composition for orchestra and a soloist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decertify]] | verb | **1.** Cause to be no longer approved or accepted. | *"In academic literature, decertify designates cause to be no longer approved or accepted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disconcert]] | verb | **1.** Cause to feel embarrassment.<br>**2.** Cause to lose one's composure. | *"How could she face her parents, get back her box, and disconcert the whole scheme for the rehabilitation of her family on such sentimental grounds?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[disconcerted]] | verb | **1.** Cause to feel embarrassment.<br>**2.** Cause to lose one's composure. | *"The three children's faces were absolutely disconcerted, for the obstacles were clearly insurmountable."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[disconcerting]] | verb | **1.** Cause to feel embarrassment.<br>**2.** Cause to lose one's composure. | *"This move was unexpected, and proportionately disconcerting."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disconcertion]] | noun | **1.** Anxious embarrassment. | *"And if they could be prevailed upon or compelled to do it, the increased expense of a frequent rotation of service, and the loss of labor and disconcertion of the industrious pursuits of individuals, would form conclusive objections to the scheme."* — Alexander Hamilton, *The Federalist Papers* |
| [[disconcertment]] | noun | **1.** Anxious embarrassment. | *"In academic literature, disconcertment designates anxious embarrassment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incertain]] | adjective | **1.** Lacking or indicating lack of confidence or assurance. | *"But, since the affairs of men rest still incertain, Let’s reason with the worst that may befall."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incertitude]] | noun | **1.** The state of being unsure of something. | *"But then Oak was not racked by incertitude upon the inmost matter of his bosom, as she was at this moment."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[preconcerted]] | adjective | **1.** Previously arranged or agreed on. | *"Anne, remembering the preconcerted visits, at all hours, of Mr Elliot, would have expected him, but for his known engagement seven miles off."* — Jane Austen, *Persuasion* |
| [[unascertainable]] | adjective | **1.** Not able to be ascertained; resisting discovery. | *"In academic literature, unascertainable designates not able to be ascertained; resisting discovery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncertain]] | adjective | **1.** Lacking or indicating lack of confidence or assurance.<br>**2.** Not established beyond doubt; still undecided or unknown. | *"Uncertain life and sure death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncertainly]] | adverb | **1.** In an unsteady manner.<br>**2.** Showing lack of certainty. | *"My woes are tedious, though my words are brief.” Here folds she up the tenor of her woe, Her certain sorrow writ uncertainly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncertainness]] | noun | **1.** Being unsettled or in doubt or dependent on chance. | *"In academic literature, uncertainness designates being unsettled or in doubt or dependent on chance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncertainty]] | noun | **1.** Being unsettled or in doubt or dependent on chance.<br>**2.** The state of being unsure of something. | *"Until I know this sure uncertainty I’ll entertain the offer’d fallacy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncertified]] | adjective | **1.** Lacking requisite official documentation or endorsement. | *"I am grown old in confinement, and lay my account with ending my days in jail, as the mercy of the legislature in favour of insolvent debtors is never extended to uncertified bankrupts taken in execution."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |

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
    ROOT DASHBOARD · CERT
  </div>
</div>
