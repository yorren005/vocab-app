---
status: unread
type: root_dashboard
---
# Dashboard — prob
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">prob-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to test, prove, or good”</span>
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

The root **prob** means to test, prove, or good. It refers to the action of test,ing and carrying out this process. In English, this root forms words such as *probable*, *prove*, *approve*, and *probe*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to test, prove, or good
> The root **prob** means to test, prove, or good. It refers to the action of test,ing and carrying out this process. In English, this root forms words such as *probable*, *prove*, *approve*, and *probe*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To test, prove, or good</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Uncovering honest facts and separating what is genuine from what is false.</mark>
> - **Everyday Connection**: Think of familiar words like *probable* and *prove*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **prob** comes from a Latin word that means *"to test, prove, or good"*.
  - At its core, it describes the action of test, prove, or good.

- **The Big Picture Idea**:
  - Picture uncovering honest facts and separating what is genuine from what is false.
  - Whenever you see **prob** in an English word, think of **to test, prove, or good**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to test, prove, or good).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Probable**: Likely to happen or be the case.
  - **Prove**: To demonstrate the truth or existence of something by evidence or argument.
  - **Approve**: To officially agree to or accept as satisfactory.
  - **Probe**: N.* A blunt-ended surgical instrument used for exploring a wound or body cavity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">prob</mark>, think of <mark class="hl-def">to test, prove, or good</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root displays systematic prefixation and vowel shifts across Anglo-Norman transmission:
1. **The Base Latin Stem `prob-`**:
   - *probity* (< Latin *probitās* "uprightness").
   - *probe* (< Latin *probāre* $\to$ surgical sound instrument).
   - *probable*, *probability*, *improbable*.
   - *probation*, *probative*.
2. **The Anglo-Norman Vowel Shift to `prov-` / `proof-`**:
   - Latin *probāre* entered Old French as *prover*, becoming English **prove**, **proof** (< Old French *preuve*), **approve**, **disprove**, **reprove**.
3. **Compound Formations**:
   - `ad-` + `prob-` $\to$ *approbation*, *approval*, *approve*.
   - `dis-` + `prob-` $\to$ *disprove*, *disproof*.
   - `ob-` + `probrum` (Latin *probrum* "disgrace") $\to$ *opprobrium*.
   - `re-` + `prob-` $\to$ *reprobate*, *reprove*.
   - `in-` + `probus` (via Anglo-French *emprower*) $\to$ *improve*.

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

The cognitive scope of *prob* encompasses five grand domains:
- **Judicial & Mathematical Verification**: [[prove]], [[proof]], [[disprove]], `disproof`
- **Statistical Likelihood & Epistemology**: [[probable]], [[probability]], [[improbable]]
- **Moral Character & Rectitude**: [[probity]], [[reprobate]], [[opprobrium]]
- **Official Endorsement & Sanction**: [[approve]], [[approval]], [[approbation]]
- **Physical Exploration & Rehabilitation**: [[probe]], [[probation]], [[improve]], [[reprove]]

---

## 🔀 4. Prefix & Combining Dynamics on prob

1. **`ad-` + `prob`** (*ad* "to, favorable toward"):
   - *approve* $\to$ to regard favorably; accept as satisfactory.
   - *approbation* $\to$ formal approval or commendation.
2. **`dis-` + `prob`** (*dis-* "un-, opposite"):
   - *disprove* $\to$ to prove that something is false.
3. **`ob-` + `probrum`** (*ob* "against" + *probrum* "reproach"):
   - *opprobrium* $\to$ harsh criticism or censure; public disgrace arising from shameful conduct.
4. **`re-` + `prob`** (*re-* "back, against"):
   - *reprobate* $\to$ an unprincipled person; rejected by God.
   - *reprove* $\to$ to reprimand or censure someone gently.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Mathematics & Formal Logic**: mathematical *proofs*, non-constructive *proofs*, Gödel's incompleteness theorems.
- **Criminal Jurisprudence**: standard of *proof* ("beyond a reasonable doubt"), *probation* officers, *probative* value of evidence.
- **Probability Theory & Actuarial Science**: Bayesian *probability*, *improbable* tail-risk events.
- **Space Exploration & Medicine**: interplanetary deep-space *probes*, surgical biopsy *probes*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[approbate]] | verb | **1.** Approve or sanction officially.<br>**2.** Accept (documents) as valid. | *"In academic literature, approbate designates approve or sanction officially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[approbation]] | noun | **1.** Official approval.<br>**2.** Official recognition or approval. | *"Ay, worthy Menenius, and with most prosperous approbation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[approbative]] | adjective | **1.** Expressing or manifesting praise or approval. | *"In academic literature, approbative designates expressing or manifesting praise or approval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[approbatory]] | adjective | **1.** Expressing or manifesting praise or approval. | *"In academic literature, approbatory designates expressing or manifesting praise or approval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disapprobation]] | noun | **1.** An expression of strong disapproval; pronouncing as wrong or morally culpable. | *"In case I should be taking a liberty in putting your ladyship on your guard when there’s no necessity for it, you will endeavour, I should hope, to outlive my presumption, and I shall endeavour to outlive your disapprobation."* — Charles Dickens, *Bleak House* |
| [[improbability]] | noun | **1.** The quality of being improbable. | *"God held it to answer their prayers." Think of this wonderful improbability according to natural circumstances."* — Classic Author, *The wonders of prayer* |
| [[improbable]] | adjective | **1.** Not likely to be true or to occur or to have occurred.<br>**2.** Having a probability too low to inspire belief. | *"If this were played upon a stage now, I could condemn it as an improbable fiction."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[improbableness]] | noun | **1.** The quality of being improbable. | *"In academic literature, improbableness designates the quality of being improbable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[improbably]] | adverb | **1.** Not easy to believe. | *"No man is allowed to be a judge in his own cause, because his interest would certainly bias his judgment, and, not improbably, corrupt his integrity."* — Alexander Hamilton, *The Federalist Papers* |
| [[opprobrious]] | adjective | **1.** Expressing offensive reproach.<br>**2.** (used of conduct or character) deserving or bringing disgrace or shame; - rachel carson. | *"He will tell you, it is all _pfuscherei_, which is his most opprobrious word!” “Is that true?” said Dorothea, turning her sincere eyes on Naumann, who made a slight grimace and said— “Oh, he does not mean it seriously with painting."* — George Eliot, *Middlemarch* |
| [[opprobrium]] | noun | **1.** State of disgrace resulting from public abuse.<br>**2.** A state of extreme dishonor; - f.d.roosevelt. | *"My head still ached and bled with the blow and fall I had received: no one had reproved John for wantonly striking me; and because I had turned against him to avert farther irrational violence, I was loaded with general opprobrium."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[probabilism]] | noun | **1.** A roman catholic system of casuistry that when expert opinions differ an actor can follow any solidly probable opinion that he wishes even though some different opinion might be more probable.<br>**2.** (philosophy) the doctrine that (since certainty is unattainable) probability is a sufficient basis for belief and action. | *"In academic literature, probabilism designates a roman catholic system of casuistry that when expert opinions differ an actor can follow any solidly probable opinion that he wishes even though some different opinion might be more probable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probabilistic]] | adjective | **1.** Of or relating to the roman catholic philosophy of probabilism.<br>**2.** Of or relating to or based on probability. | *"In academic literature, probabilistic designates of or relating to the roman catholic philosophy of probabilism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probabilistically]] | adverb | **1.** By the use of probability theory. | *"In academic literature, probabilistically designates by the use of probability theory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probability]] | noun | **1.** A measure of how likely it is that some event will occur; a number expressing the ratio of favorable cases to the whole number of cases possible.<br>**2.** The quality of being probable; a probable event or the most probable event. | *"Guppy’s dreams, the probability is not pursued."* — Charles Dickens, *Bleak House* |
| [[probable]] | noun | **1.** An applicant likely to be chosen.<br>**2.** Likely but not certain to be or become true or real. | *"That you will take your instant leave o’ the king, And make this haste as your own good proceeding, Strengthen’d with what apology you think May make it probable need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[probably]] | adverb | **1.** With considerable certainty; without much doubt.<br>**2.** Easy to believe on the basis of available evidence. | *"Most original of all is Mäzli, probably not over six, as she is too young to go to school."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[probate]] | noun | **1.** A judicial certificate saying that a will is genuine and conferring on the executors the power to administer the estate.<br>**2.** The act of proving that an instrument purporting to be a will was signed and executed in accord with legal requirements. | *"That evening a letter from the probate office at Exeter, N."* — Classic Author, *The wonders of prayer* |
| [[probation]] | noun | **1.** A trial period during which your character and abilities are tested to see whether you are suitable for work or for membership.<br>**2.** A trial period during which an offender has time to redeem himself or herself. | *"And of the truth herein This present object made probation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[probationary]] | adjective | **1.** Under terms not final or fully worked out or agreed upon. | *"A practical inference from the whole is,--that the present life must be regarded as probationary."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[probationer]] | noun | **1.** A nurse in training who is undergoing a trial period.<br>**2.** Someone released on probation or on parole. | *"The Hall session of 1844 was Cairns's last, and the next step for him to take in ordinary course was to apply to a Presbytery for license as a probationer."* — John Cairns, *Principal Cairns* |
| [[probative]] | adjective | **1.** Tending to prove a particular proposition or to persuade you of the truth of an allegation. | *"In academic literature, probative designates tending to prove a particular proposition or to persuade you of the truth of an allegation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probatory]] | adjective | **1.** Tending to prove a particular proposition or to persuade you of the truth of an allegation. | *"In academic literature, probatory designates tending to prove a particular proposition or to persuade you of the truth of an allegation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probe]] | noun | **1.** An inquiry into unfamiliar or questionable activities.<br>**2.** A flexible slender surgical instrument with a blunt end that is used to explore wounds or body cavities. | *"From Estella she looked at me, with a searching glance that seemed to pry into my heart and probe its wounds."* — Charles Dickens, *Great Expectations* |
| [[probenecid]] | noun | **1.** A uricosuric drug that reduces the level of uric acid in the blood; used to treat gout. | *"In academic literature, probenecid designates a uricosuric drug that reduces the level of uric acid in the blood; used to treat gout."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probing]] | verb | **1.** Question or examine thoroughly and closely.<br>**2.** Examine physically with or as if with a probe. | *"The Universe, cleft to the core, Lay open to my probing sense That, sick'ning, I would fain pluck thence But could not,--nay!"* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[probiotic]] | noun | **1.** A beneficial bacterium found in the intestinal tract of healthy mammals; often considered to be a plant. | *"In academic literature, probiotic designates a beneficial bacterium found in the intestinal tract of healthy mammals; often considered to be a plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probity]] | noun | **1.** Complete and confirmed integrity; having strong moral principles. | *"Darcy; but he will vouch for the good conduct, the probity and honour, of his friend, and is perfectly convinced that Mr."* — Jane Austen, *Pride and Prejudice* |
| [[problem]] | noun | **1.** A state of difficulty that needs to be resolved.<br>**2.** A question raised for consideration or solution. | *"She told him of the problem she had with Bruno's further education, because the lessons he had been having from the Rector would end in the fall, and of her firm intention of keeping him from living together with his two present comrades."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[problematic]] | adjective | **1.** Open to doubt or debate.<br>**2.** Making great mental demands; hard to comprehend or solve or believe. | *"The whole thing is too problematic; I cannot consent to be the cause of your goodness being wasted."* — George Eliot, *Middlemarch* |
| [[problematical]] | adjective | **1.** Open to doubt or debate.<br>**2.** Making great mental demands; hard to comprehend or solve or believe. | *"The conversation seemed to imply that the issue was problematical, and that a majority for Tyke was not so certain as had been generally supposed."* — George Eliot, *Middlemarch* |
| [[problematically]] | adverb | **1.** In such a way as to pose a problem. | *"In academic literature, problematically designates in such a way as to pose a problem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proboscidea]] | noun | **1.** In some classifications included in the genus martynia and hence the two taxonomic names for some of the unicorn plants.<br>**2.** An order of animals including elephants and mammoths. | *"In academic literature, proboscidea designates in some classifications included in the genus martynia and hence the two taxonomic names for some of the unicorn plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proboscidean]] | noun | **1.** Massive herbivorous mammals having tusks and a long trunk. | *"In academic literature, proboscidean designates massive herbivorous mammals having tusks and a long trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proboscidian]] | noun | **1.** Massive herbivorous mammals having tusks and a long trunk. | *"In academic literature, proboscidian designates massive herbivorous mammals having tusks and a long trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proboscis]] | noun | **1.** The human nose (especially when it is large).<br>**2.** A long flexible snout as of an elephant. | *"Another very common mode of sacrifice in the same district was to fasten the victim to the proboscis of a wooden elephant, which revolved on a stout post, and, as it whirled round, the crowd cut the flesh from the victim while life remained."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[reprobate]] | noun | **1.** A person without moral scruples.<br>**2.** Reject (documents) as invalid. | *"If drawing my sword against the humour of affection would deliver me from the reprobate thought of it, I would take desire prisoner, and ransom him to any French courtier for a new-devised curtsy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reprobation]] | noun | **1.** Rejection by god; the state of being condemned to eternal misery in hell.<br>**2.** Severe disapproval. | *"On a dark, misty, raw morning in January, I had left a hostile roof with a desperate and embittered heart—a sense of outlawry and almost of reprobation—to seek the chilly harbourage of Lowood: that bourne so far away and unexplored."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unproblematic]] | adjective | **1.** Easy and not involved or complicated. | *"In academic literature, unproblematic designates easy and not involved or complicated."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PROB
  </div>
</div>
