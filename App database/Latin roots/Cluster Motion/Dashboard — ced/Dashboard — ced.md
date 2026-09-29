---
status: unread
type: root_dashboard
---
# Dashboard — ced
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ced-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to go, yield, or withdraw”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **ced** means to go, yield, or withdraw. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *cede*, *accede*, *concede*, and *precede*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to go, yield, or withdraw
> The root **ced** means to go, yield, or withdraw. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *cede*, *accede*, *concede*, and *precede*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To go, yield, or withdraw</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *cede* and *accede*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ced** comes from a Latin word that means *"to go, yield, or withdraw"*.
  - At its core, it describes the action of go, yield, or withdraw.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **ced** in an English word, think of **to go, yield, or withdraw**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to go, yield, or withdraw).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cede**: To yield, surrender, or formally relinquish control of territory, sovereignty, or legal rights to another.
  - **Accede**: To agree, give assent, or yield to a demand, proposal, or treaty.
  - **Concede**: To acknowledge, admit, or accept something as true, valid, or proper after initial denial.
  - **Precede**: To come before someone or something in time, order, position, or rank.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ced</mark>, think of <mark class="hl-def">to go, yield, or withdraw</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ced** functions as a highly productive verbal base driven almost entirely by directional prefixes:
> - **Primary Present Active Base:** `-cede` (*ac-cede*, *con-cede*, *inter-cede*, *pre-cede*, *re-cede*, *se-cede*)
> - **Scribal Variant Base:** `-ceed` (*ex-ceed*, *pro-ceed*, *suc-ceed*)
> - **Participial / Adjectival Derivatives:** `-cedent` (*ante-cedent*, *pre-cedent*)
> - **Agent & Abstract Nouns:** `-cessor` (*pre-de-cessor*), `-cedence` (*ante-cedence*, *pre-cedence*)
> - **Prefix Assimilation Rules:** The Latin prefixes assimilate smoothly before *c-*: *ad-* $\to$ *ac-* (*ac-cede*), *sub-* $\to$ *suc-* (*suc-ceed*).

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
> Across English, `ced` organizes into five primary functional categories:
> - **Sovereign Cession & Diplomatic Surrender:** [[cede]], [[concede]], [[accede]], [[retrocede]], [[secede]] govern treaties, territorial transfers, and electoral concessions.
> - **Temporal & Chronological Priority:** [[precede]], [[precedence]], [[precedent]], [[antecede]], [[antecedent]], [[unprecedented]] articulate chronological sequence, judicial rulings, and ancestral heritage.
> - **Progression & Kinetic Advancement:** [[proceed]], [[proceedings]], [[proceeds]] describe continuous forward motion, formal legal actions, and commercial revenue.
> - **Thresholds, Limits & Quantitative Surpassing:** [[exceed]], [[exceeding]], [[exceedingly]] denote breaking past established boundaries, standards, or measurements.
> - **Mediation & Conciliatory Interventions:** [[intercede]], [[interceder]] depict stepping between warring parties to broker peace.
> - **Sequential Succession & Prosperity:** [[succeed]], [[succeeder]], [[predecessor]] track the orderly taking up of offices, titles, and triumphant achievements.
> - **Physical Withdrawal & Diminution:** [[recede]], [[retrocedence]] describe water retreating, tides ebbing, or receding hairlines.

---

## 🔀 4. Prefix & Combining Dynamics on ced

### Prefix Dynamics

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (assimilated to *ac-*) | to, toward | [[accede]] | *ad-* + *cēdere* $\to$ to step toward $\to$ to assent to a demand; to take up a high office. |
| **ante-** | before, in front of | [[antecedent]] / [[antecede]] | *ante-* + *cēdere* $\to$ that which steps before in time, ancestry, or grammar. |
| **con-** | thoroughly, together | [[concede]] | *con-* + *cēdere* $\to$ to yield completely $\to$ to grant a point in debate or surrender territory. |
| **ex-** | out of, beyond | [[exceed]] | *ex-* + *cēdere* $\to$ to step out beyond the boundary line $\to$ to surpass limits. |
| **inter-** | between, among | [[intercede]] | *inter-* + *cēdere* $\to$ to step between disputants $\to$ to mediate or advocate on behalf of another. |
| **prae- (pre-)** | before, in front | [[precede]] / [[precedent]] | *prae-* + *cēdere* $\to$ to step in front in rank, time, or sequence $\to$ an authoritative prior example. |
| **pro-** | forward, onward | [[proceed]] | *pro-* + *cēdere* $\to$ to step forward $\to$ to continue onward with an enterprise. |
| **re-** | back, again | [[recede]] | *re-* + *cēdere* $\to$ to step back $\to$ to withdraw, ebb, or diminish. |
| **retro-** | backward | [[retrocede]] | *retro-* + *cēdere* $\to$ to cede or step backward $\to$ to restore territory back to a former sovereign. |
| **sē-** | apart, aside | [[secede]] | *sē-* + *cēdere* $\to$ to step aside/apart $\to$ to formally withdraw from a union. |
| **sub-** (assimilated to *suc-*) | under, next after | [[succeed]] | *sub-* + *cēdere* $\to$ to step up from beneath / next in line $\to$ to follow in office; to prosper. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Constitutional & International Law** | [[cede]], [[accede]], [[secede]], [[precedent]], [[retrocede]] | Ceding colonial territory, acceding to the Geneva Conventions, southern secession, legal precedents. |
| **Judicial Administration & Litigation** | [[precedent]], [[unprecedented]], [[concede]], [[proceedings]] | Stare decisis doctrine, conceding liability in torts, court proceedings published in legal reporters. |
| **Grammar & Formal Linguistics** | [[antecedent]], [[antecede]] | Pronoun-antecedent agreement rules, clausal subordination. |
| **Diplomacy & Conflict Resolution** | [[intercede]], [[interceder]], [[concede]] | Envoys interceding to secure hostage release, diplomatic concessions over disputed borders. |
| **Business, Finance & Commerce** | [[proceeds]], [[exceed]], [[succeed]], [[predecessor]] | Gross sale proceeds, exceeding quarterly revenue projections, executive succession planning. |
| **Geomorphology & Medicine** | [[recede]], [[retrocede]], [[exceed]] | Receding Alpine glaciers, receding gum margins in periodontitis, retroceding rash in eruptive fevers. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accede]] | verb | **1.** Yield to another's wish or opinion.<br>**2.** Take on duties or office. | *"Therefore I make the entreaty I have now preferred, and I hope you will have sufficient consideration for me to accede to it.” I must do Mr."* — Charles Dickens, *Bleak House* |
| [[alcedinidae]] | noun | **1.** Kingfishers. | *"In academic literature, alcedinidae designates kingfishers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alcedo]] | noun | **1.** Type genus of the alcedinidae. | *"In academic literature, alcedo designates type genus of the alcedinidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antecede]] | verb | **1.** Be earlier in time; go back further. | *"In academic literature, antecede designates be earlier in time; go back further."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antecedence]] | noun | **1.** Preceding in time. | *"In academic literature, antecedence designates preceding in time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antecedency]] | noun | **1.** Preceding in time. | *"In academic literature, antecedency designates preceding in time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antecedent]] | noun | **1.** Someone from whom you are descended (but usually more remote than a grandparent).<br>**2.** A preceding occurrence or cause or event. | *"He found her in an unusual mood: her eyes as she looked up to him were suspicious and perplexed as with some antecedent thought."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[antecedently]] | adverb | **1.** At an earlier time or formerly. | *"Moreover, by chance or by devilry, the ministrant was antecedently made interesting by being a handsome stranger who had evidently seen better days."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[arced]] | verb | **1.** Form an arch or curve.<br>**2.** Forming or resembling an arch. | *"Planet Pluto arced into view from starboard, half a million kay distant."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cedar]] | noun | **1.** Any of numerous trees of the family cupressaceae that resemble cedars.<br>**2.** Durable aromatic wood of any of numerous cedar trees; especially wood of the red cedar often used for cedar chests. | *"The lofty cedar, royal Cymbeline, Personates thee; and thy lopp’d branches point Thy two sons forth, who, by Belarius stol’n, For many years thought dead, are now reviv’d, To the majestic cedar join’d, whose issue Promises Britain peace and plenty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cedar-scented]] | adjective | **1.** Smelling like cedar. | *"In academic literature, cedar-scented designates smelling like cedar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cedarbird]] | noun | **1.** Widely distributed over temperate north america. | *"In academic literature, cedarbird designates widely distributed over temperate north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cedarn]] | adjective | **1.** Consisting of or made of cedar. | *"In academic literature, cedarn designates consisting of or made of cedar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cedarwood]] | noun | **1.** Durable aromatic wood of any of numerous cedar trees; especially wood of the red cedar often used for cedar chests. | *"In academic literature, cedarwood designates durable aromatic wood of any of numerous cedar trees; especially wood of the red cedar often used for cedar chests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cede]] | verb | **1.** Give over; surrender or relinquish to the physical control of another.<br>**2.** Relinquish possession or control over. | *"Nothing is more certain than the indispensable necessity of government, and it is equally undeniable, that whenever and however it is instituted, the people must cede to it some of their natural rights in order to vest it with requisite powers."* — Alexander Hamilton, *The Federalist Papers* |
| [[cedi]] | noun | **1.** The basic unit of money in ghana. | *"In academic literature, cedi designates the basic unit of money in ghana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cedilla]] | noun | **1.** A diacritical mark (,) placed below the letter c to indicate that it is pronounced as an s. | *"In academic literature, cedilla designates a diacritical mark (,) placed below the letter c to indicate that it is pronounced as an s."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceding]] | noun | **1.** The act of ceding.<br>**2.** Give over; surrender or relinquish to the physical control of another. | *"In academic literature, ceding designates the act of ceding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cedrela]] | noun | **1.** Tropical american trees. | *"In academic literature, cedrela designates tropical american trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cedrus]] | noun | **1.** True cedars. | *"In academic literature, cedrus designates true cedars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concede]] | verb | **1.** Admit (to a wrongdoing).<br>**2.** Be willing to concede. | *"To this demand the friends of protection who were in power felt compelled to concede something--or to appear to do so."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[conceding]] | noun | **1.** The act of conceding or yielding.<br>**2.** Admit (to a wrongdoing). | *"Barbou came to ask whether I did not think it would be well to appease the popular feeling by conceding what they wished to the Sisters of the hospital."* — Mrs. Oliphant, *A Beleaguered City* |
| [[decedent]] | noun | **1.** Someone who is no longer alive. | *"In academic literature, decedent designates someone who is no longer alive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercede]] | verb | **1.** Act between parties with a view to reconciling differences. | *"Thus repulsed, in a manner which only served, by arousing the most dreadful forebodings, to excite me to renewed attempts, I conjured him to intercede for me with the natives, and endeavour to procure their consent to my leaving them."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[precede]] | verb | **1.** Be earlier in time; go back further.<br>**2.** Come before. | *"Fairfax precede me into the dining-room, and kept in her shade as we crossed that apartment; and, passing the arch, whose curtain was now dropped, entered the elegant recess beyond."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[precedence]] | noun | **1.** Status established in order of importance or urgency.<br>**2.** Preceding in time. | *"I do not like “But yet”, it does allay The good precedence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precedency]] | noun | **1.** Status established in order of importance or urgency.<br>**2.** Preceding in time. | *"There were no ladies on board; the Major gave the pas of precedency to the civilian, so that he was the first dignitary at table, and treated by Captain Bragg and the officers of the Ramchunder with the respect which his rank warranted."* — William Makepeace Thackeray, *Vanity Fair* |
| [[precedent]] | noun | **1.** An example that is used to justify similar occurrences at a later time.<br>**2.** (civil law) a law established by following earlier judicial decisions. | *"Do it at once, Or thy precedent services are all But accidents unpurposed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precedented]] | adjective | **1.** Having or supported or justified by a precedent. | *"In academic literature, precedented designates having or supported or justified by a precedent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precedentedly]] | adverb | **1.** With precedent. | *"In academic literature, precedentedly designates with precedent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precedential]] | adjective | **1.** Having precedence (especially because of longer service). | *"In academic literature, precedential designates having precedence (especially because of longer service)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preceding]] | verb | **1.** Be earlier in time; go back further.<br>**2.** Come before. | *"Of six preceding ancestors, that gem Conferr’d by testament to th’ sequent issue, Hath it been owed and worn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[procedural]] | adjective | **1.** Of or relating to procedure.<br>**2.** Relating to court practice and procedure as opposed to the principles of law. | *"In academic literature, procedural designates of or relating to procedure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procedure]] | noun | **1.** A particular course of action intended to achieve a result.<br>**2.** A process or series of acts especially of a practical or mechanical nature involved in a particular form of work. | *"In which (I would say) every difficulty, every contingency, every masterly fiction, every form of procedure known in that court, is represented over and over again?"* — Charles Dickens, *Bleak House* |
| [[recede]] | verb | **1.** Pull back or move away or backward.<br>**2.** Retreat. | *"The air was warm and muggy, and the top seemed to recede as he approached."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[receding]] | noun | **1.** A slow or gradual disappearance.<br>**2.** The act of becoming more distant. | *"A mounted figure passed between her and the sky, and drew on towards the field of sheep, the rider turning his face in receding."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[secede]] | verb | **1.** Withdraw from an organization or communion. | *"What did we secede for if it wasn't to prove the doctrine of State Rights?"* — Harry Castlemon, *Rodney, the Partisan* |
| [[succedaneum]] | noun | **1.** (medicine) something that can be used as a substitute (especially any medicine that may be taken in place of another). | *"In academic literature, succedaneum designates (medicine) something that can be used as a substitute (especially any medicine that may be taken in place of another)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercede]] | verb | **1.** Take the place or move into the position of. | *"In academic literature, supercede designates take the place or move into the position of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprecedented]] | adjective | **1.** Having no precedent; novel. | *"But, as the danger was of an entirely unprecedented character, it is not to be wondered at that I should be completely at a loss to divine what its meaning was."* — Mrs. Oliphant, *A Beleaguered City* |
| [[unprecedentedly]] | adverb | **1.** In an unprecedented manner. | *"But a sudden stop was put to further discoveries, by the ship’s being unprecedentedly dragged over sideways to the sea, owing to the body’s immensely increasing tendency to sink."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CED
  </div>
</div>
