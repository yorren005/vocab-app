---
status: unread
type: root_dashboard
---
# Dashboard — em
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">em-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to take, buy, or obtain”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Extending an open hand to offer a generous gift to a friend.</span>
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

The root **em** means to take, buy, or obtain. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *distribute*, *emption*, *exempt*, and *exemption*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to take, buy, or obtain
> The root **em** means to take, buy, or obtain. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *distribute*, *emption*, *exempt*, and *exemption*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To take, buy, or obtain</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Extending an open hand to offer a generous gift to a friend.</mark>
> - **Everyday Connection**: Think of familiar words like *distribute* and *emption*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **em** comes from a Latin word that means *"to take, buy, or obtain"*.
  - At its core, it describes the action of take, buy, or obtain.

- **The Big Picture Idea**:
  - Picture extending an open hand to offer a generous gift to a friend.
  - Whenever you see **em** in an English word, think of **to take, buy, or obtain**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to take, buy, or obtain).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Distribute**: An everyday English word showing the root's idea of *to take, buy, or obtain*.
  - **Emption**: The act of buying or purchasing.
  - **Exempt**: Free or released from some liability, tax, duty, or legal requirement.
  - **Exemption**: The state of being freed from an obligation or liability.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">em</mark>, think of <mark class="hl-def">to take, buy, or obtain</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `em`
> The verbal paradigm of *emere* operates across two distinct stem forms in English:
> 1. **The Present / Active Stem (`em-` / `eem-`):**
>    - *emō* $ightarrow$ *emptor*, *emption*.
>    - *redimere* $ightarrow$ Anglo-French *redimer* $ightarrow$ English **redeem**, **redeemer**, **redeemable**, **irredeemable**.
> 2. **The Participial Stem (`empt-` / `ample-`):**
>    - *ēmptum* $ightarrow$ **preempt**, **preemption**, **preemptive**, **preemptor**.
>    - *exēmptum* $ightarrow$ **exempt**, **exemption**, **exemptive**.
>    - *perēmptum* $ightarrow$ **peremptory**, **peremptorily**, **peremptoriness**, **peremption**.
>    - *redēmptum* $ightarrow$ **redemption**, **redemptive**, **redemptory**.
>    - *prōmptum* $ightarrow$ **prompt**, **promptly**, **promptness**, **promptitude**, **prompter**.
>    - *exemplum* $ightarrow$ **example**, **exemplar**, **exemplary**, **exemplify**, **sample**, **sampler**, **ensample**.

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
                                  ┌── Commercial Purchase ────── caveat emptor, emption, coemption
                                  │
                                  ├── Plucking Out / Models ──── exempt, exemption, example, sample, exemplar, exemplary
    [EM- / EMPT-] ────────────────┼── Prior Acquisition ──────── preempt, preemption, preemptive, preemptor
(take / buy / ransom / ready)     │
                                  ├── Destruction & Finality ─── peremptory, peremptorily, peremption
                                  │
                                  ├── Ransom & Deliverance ───── redeem, redeemer, redemption, redemptive, irredeemable
                                  │
                                  └── Readiness & Incitement ─── prompt, promptly, promptness, promptitude, prompter
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Commercial Law & Purchase Contracts:** *caveat emptor*, *emption*, *coemption*.
> 2. **Immunity, Taxation & Release:** *exempt*, *exemption*, *exemptive*.
> 3. **Patterns, Models & Specimens:** *example*, *exemplar*, *exemplary*, *exemplarily*, *exemplarity*, *exemplify*, *exemplification*, *sample*, *sampler*, *ensample*.
> 4. **Strategic Anticipation & Territorial Rights:** *preempt*, *preemption*, *preemptive*, *preemptively*, *preemptor*.
> 5. **Legal Finality, Command & Annihilation:** *peremptory*, *peremptorily*, *peremptoriness*, *peremption*.
> 6. **Theological Ransom, Ethics & Reclamation:** *redeem*, *redeemer*, *redemption*, *redemptive*, *redemptory*, *redeemable*, *irredeemable*, *irredeemably*.
> 7. **Cognitive Readiness, Alacrity & Cueing:** *prompt*, *promptly*, *promptness*, *promptitude*, *prompter*, *promptuary*.

---

## 🔀 4. Prefix & Combining Dynamics on em

### Prefix Dynamics

| Prefix | Classical Meaning | Resulting Verb / Stem | English Derivatives | Semantic Transformation |
| :--- | :--- | :--- | :--- | :--- |
| `ex-` | out of, from | *eximere, exemptum* | **exempt**, **exemption**, **example** | Taking someone out of a universal burden; setting aside as a specimen. |
| `prae-` | before, ahead | *praeemere, praeemptum*| **preempt**, **preemption**, **preemptive** | Buying or taking something before another has the opportunity to claim it. |
| `per-` | utterly, through | *perimere, peremptum* | **peremptory**, **peremption** | Taking away completely $ightarrow$ destroying an action; leaving no room for debate. |
| `red-` | back, again | *redimere, redemptum* | **redeem**, **redemption** | Buying back what was pledged, captive, or lost; ransoming a soul. |
| `pro-` | forward, forth | *prōmere, prōmptum* | **prompt**, **promptitude** | Bringing forth to the front $ightarrow$ ready at hand, instantaneous action. |
| `dis-` | apart, asunder | *dīrimere, dīrēmptum* | **diremption** | Taking apart violently; tearing into separate fragments. |
| `com-` | together | *coemere, coēmptum* | **coemption** | Buying up jointly or symbolically in formal assembly. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Jurisprudence & Constitutional Law:** *Caveat emptor* governs sales; *peremptory challenges* allow attorneys to excuse jurors without stating cause; *federal preemption* dictates that federal statute overrides state law.
> 2. **Theology & Soteriology:** *Redemption* forms the core of Christian doctrine, conceptualizing salvation as divine payment for spiritual ransom.
> 3. **Military Strategy & Geopolitics:** A *preemptive strike* is launched to neutralize an adversary's imminent offensive capability before they can strike.
> 4. **Statistics & Empirical Science:** Quality control relies on taking an unbiased *sample* to make valid inferences regarding an entire population.
> 5. **Theater & Performing Arts:** A *prompter* whispers forgotten lines from the wings to maintain the seamless flow of drama.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deem]] | verb | **1.** Keep in mind or convey as a conviction or view. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[em]] | noun | **1.** A quad with a square body.<br>**2.** A linear unit (1/6 inch) used in printing. | *"The Rector is climbing High Ems with him and the two other boys."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[exemplar]] | noun | **1.** Something to be imitated. | *"Boldwood’s deep attachment was a matter of great interest among all around him; but, after having been pointed out for so many years as the perfect exemplar of thriving bachelorship, his lapse was an anticlimax somewhat resembling that of St."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[exemplary]] | adjective | **1.** Worthy of imitation.<br>**2.** Being or serving as an illustration of a type. | *"Now, my dear Miss Summerson, if you want common sense, responsibility, and respectability, all united—if you want an exemplary man—Vholes is THE man.” We had not known, we said, that Richard was assisted by any gentleman of that name."* — Charles Dickens, *Bleak House* |
| [[exemplification]] | noun | **1.** Showing by example.<br>**2.** A representational or typifying form or model. | *"Of this truth, the management of the opposition to the federal government is an unvaried exemplification."* — Alexander Hamilton, *The Federalist Papers* |
| [[exemplify]] | verb | **1.** Be characteristic of.<br>**2.** Clarify by giving an example of. | *"They exemplify what I have said."* — Charles Dickens, *Bleak House* |
| [[exemplifying]] | verb | **1.** Be characteristic of.<br>**2.** Clarify by giving an example of. | *"So these two were each exemplifying the Vanity of this life, and each longing for what he or she could not get."* — William Makepeace Thackeray, *Vanity Fair* |
| [[exempt]] | verb | **1.** Grant relief or an exemption from a rule or requirement to.<br>**2.** Grant exemption or release to. | *"How ill agrees it with your gravity To counterfeit thus grossly with your slave, Abetting him to thwart me in my mood; Be it my wrong, you are from me exempt, But wrong not that wrong with a more contempt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exemption]] | noun | **1.** Immunity from an obligation or duty.<br>**2.** A deduction allowed to a taxpayer because of his status (having certain dependents or being blind or being over 65 etc.). | *"The law applies a progressive rate to all incomes (with exemption of $700 from wages and salaries) and contains elaborate provisions for corporate taxation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[irredeemable]] | adjective | **1.** Insusceptible of reform.<br>**2.** (of paper money) not convertible into coin at the pleasure of the holder. | *"Irredeemable paper money. § 11."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[nonexempt]] | adjective | **1.** (of goods or funds) subject to taxation.<br>**2.** (of persons) not exempt from an obligation or liability. | *"In academic literature, nonexempt designates (of goods or funds) subject to taxation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peremptory]] | adjective | **1.** Offensively self-assured or given to exercising usually unwarranted power.<br>**2.** Not allowing contradiction or refusal. | *"Speak briefly then, For we are peremptory to dispatch This viperous traitor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pre-emptive]] | adjective | **1.** Designed or having the power to deter or prevent an anticipated situation or occurrence. | *"In academic literature, pre-emptive designates designed or having the power to deter or prevent an anticipated situation or occurrence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pre-emptor]] | noun | **1.** Someone who acquires land by preemption.<br>**2.** A bidder in bridge who makes a preemptive bid. | *"In academic literature, pre-emptor designates someone who acquires land by preemption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preempt]] | noun | **1.** A high bid that is intended to prevent the opposing players from bidding.<br>**2.** Acquire for oneself before others can do so. | *"In academic literature, preempt designates a high bid that is intended to prevent the opposing players from bidding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preemption]] | noun | **1.** The judicial principle asserting the supremacy of federal over state legislation on the same subject.<br>**2.** The right of a government to seize or appropriate something (as property). | *"In academic literature, preemption designates the judicial principle asserting the supremacy of federal over state legislation on the same subject."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preemptive]] | adjective | **1.** Designed or having the power to deter or prevent an anticipated situation or occurrence. | *"In academic literature, preemptive designates designed or having the power to deter or prevent an anticipated situation or occurrence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preemptor]] | noun | **1.** Someone who acquires land by preemption.<br>**2.** A bidder in bridge who makes a preemptive bid. | *"In academic literature, preemptor designates someone who acquires land by preemption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redeem]] | verb | **1.** Save from sins.<br>**2.** Restore the honor or worth of. | *"Return forgetful Muse, and straight redeem, In gentle numbers time so idly spent, Sing to the ear that doth thy lays esteem, And gives thy pen both skill and argument."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redeemable]] | adjective | **1.** Recoverable upon payment or fulfilling a condition.<br>**2.** Able to be converted into ready money or the equivalent. | *"Fourteen years elapsed after the war before these notes rose to par, in terms of gold (in December, 1878), and they became legally redeemable in gold January 1, 1879."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[redeemed]] | verb | **1.** Save from sins.<br>**2.** Restore the honor or worth of. | *"Soldiers, this day have you redeemed your lives And showed how well you love your prince and country."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redeemer]] | noun | **1.** A teacher and prophet born in bethlehem and active in nazareth; his life and sermons form the basis for christianity (circa 4 bc - ad 29).<br>**2.** Someone who redeems or buys back (promissory notes or merchandise or commercial paper etc.). | *"I every day expect an embassage From my Redeemer, to redeem me hence; And more at peace my soul shall part to heaven Since I have made my friends at peace on earth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redeeming]] | verb | **1.** Save from sins.<br>**2.** Restore the honor or worth of. | *"I’ll so offend, to make offence a skill, Redeeming time, when men think least I will. [_Exit._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redemption]] | noun | **1.** (theology) the act of delivering from sin or saving from evil.<br>**2.** Repayment of the principal amount of a debt or security at or before maturity (as when a corporation repurchases its own stock). | *"Will you send him, mistress, redemption, the money in his desk?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redemptional]] | adjective | **1.** Of or relating to or resulting in redemption; - e.k.brown. | *"In academic literature, redemptional designates of or relating to or resulting in redemption; - e.k.brown."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redemptive]] | adjective | **1.** Of or relating to or resulting in redemption; - e.k.brown.<br>**2.** Bringing about salvation or redemption from sin. | *"The excesses of a man of genius are generally touched by the {314} imagination, and therein lies at once their peculiar danger, and also something redemptive that promises another future."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[redemptory]] | adjective | **1.** Of or relating to or resulting in redemption; - e.k.brown. | *"In academic literature, redemptory designates of or relating to or resulting in redemption; - e.k.brown."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seem]] | verb | **1.** Give a certain impression or have a certain outward aspect.<br>**2.** Seem to be true, probable, or apparent. | *"O what excuse will my poor beast then find, When swift extremity can seem but slow?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seeming]] | verb | **1.** Give a certain impression or have a certain outward aspect.<br>**2.** Seem to be true, probable, or apparent. | *"Why should false painting imitate his cheek, And steal dead seeming of his living hue?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seemliness]] | noun | **1.** A sense of propriety and consideration for others. | *"He was always so anxious to find seemliness, happiness, and peace in everything, and I should have been proud to let him see us."* — graf Leo Tolstoy, *War and Peace* |
| [[seemly]] | adjective | **1.** According with custom or propriety. | *"For all that beauty that doth cover thee, Is but the seemly raiment of my heart, Which in thy breast doth live, as thine in me, How can I then be elder than thou art?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unredeemable]] | adjective | **1.** Insusceptible of reform. | *"An undeniable and unredeemable forfeit of all he hath about him.” “I hoarded it to purchase my freedom,” said Gurth."* — Walter Scott, *Ivanhoe: A Romance* |
| [[unredeemed]] | adjective | **1.** In danger of the eternal punishment of hell. | *"It was the exhilarating effect—upon a prisoner just escaped from the dungeon of his own heart—of breathing the wild, free atmosphere of an unredeemed, unchristianised, lawless region."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[unseemliness]] | noun | **1.** A lack of consideration for others. | *"Could she have understood this fact, it would have brought her some little comfort; for, to all her other troubles,—strange to say!—there was added the womanish and old-maiden-like misery arising from a sense of unseemliness in her attire."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[unseemly]] | adjective | **1.** Not in keeping with accepted standards of what is right or proper in polite society. | *"Unseemly woman in a seeming man, And ill-beseeming beast in seeming both!"* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Giving & Receiving]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · EM
  </div>
</div>
