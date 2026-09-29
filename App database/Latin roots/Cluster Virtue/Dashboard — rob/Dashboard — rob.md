---
status: unread
type: root_dashboard
---
# Dashboard — rob
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rob-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“oak or strength”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing up courageously for what is fair, moral, and honorable.</span>
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

The root **rob** means oak or strength. It refers to hard oak wood or firm, durable strength. In English, this root forms words such as *robust*, *robustness*, *robustly*, and *robustious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: oak or strength
> The root **rob** means oak or strength. It refers to hard oak wood or firm, durable strength. In English, this root forms words such as *robust*, *robustness*, *robustly*, and *robustious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Oak or strength</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing up courageously for what is fair, moral, and honorable.</mark>
> - **Everyday Connection**: Think of familiar words like *robust* and *robustness*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rob** comes from a Latin word that means *"oak or strength"*.
  - At its core, it describes oak or strength.

- **The Big Picture Idea**:
  - Picture standing up courageously for what is fair, moral, and honorable.
  - Whenever you see **rob** in an English word, think of **virtue, integrity, and good character**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of oak or strength.
  - **Mental & Social**: How people experience, organize, or communicate about oak or strength.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Robust**: Strong and healthy.
  - **Robustness**: The quality or condition of being strong and in good condition.
  - **Robustly**: In a sturdy, vigorous, or strongly determined manner.
  - **Robustious**: Boisterous, vigorous, sturdy, or rough in behavior or manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rob</mark>, think of <mark class="hl-def">virtue, integrity, and good character</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `rob-` / `robor-` (< Latin *rōbur* / *rōboris*): Base nominal root.
  - `robust-` (< Latin *rōbustus* "made of oak, strong"): Adjectival base.
- **Prefix Machinery**:
  - `con-` ("together, thoroughly"): *corroborate, corroboration, corroborative*.
- **Suffixal Formations**:
  - `-ant`: *roborant* ("invigorating, a tonic").
  - `-ious`: *robustious* ("boisterous, vigorously sturdy").
  - `-ness`: *robustness*.

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
                      ┌── Physical & Systemic Vigor: robust, robustness, robustly, robustious
                      │
   [rob] ─────────────┼── Evidence & Verification: corroborate, corroboration, corroborative, corroborator
 (Oak / Strength)     │
                      └── Pharmacological Tonic: roborant
```

---

## 🔀 4. Prefix & Combining Dynamics on rob
- **`con-` + `robor-` + `-ate`**: *corroborate* — to confirm or give support to a statement or theory with new evidence.
- **`robust-` + `-ness`**: *robustness* — the capacity to withstand stress, strain, or environmental variance.
- **`robor-` + `-ant`**: *roborant* — strengthening or invigorating; a medicinal tonic.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Law of Evidence & Criminal Forensics**: *Corroborating* evidence; independent witness testimony.
- **Statistics & Data Science**: *Robust* statistics (estimators unaffected by outliers, such as the median).
- **Software Engineering & Cybersecurity**: *Robustness* testing; fault-tolerant distributed architectures.
- **Macroeconomics & Financial Risk**: Stress-testing banking systems for institutional *robustness*.
- **Botany & Forestry**: *Quercus robur* (the English oak).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acrobat]] | noun | **1.** An athlete who performs acts requiring skill and agility and coordination. | *"Light as a lightweight acrobat Ahmet Ali had rolled aside, put palm to ground, sprung to his feet."* — Donn Byrne, *The Wind Bloweth* |
| [[acrobates]] | noun | **1.** A genus of phalangeridae. | *"In academic literature, acrobates designates a genus of phalangeridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrobatic]] | adjective | **1.** Vigorously active. | *"That is an acrobatic feat that I never believed you capable of, honey.” “We-ell!"* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[acrobatics]] | noun | **1.** The gymnastic moves of an acrobat.<br>**2.** The performance of stunts while in flight in an aircraft. | *"In academic literature, acrobatics designates the gymnastic moves of an acrobat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agrobacterium]] | noun | **1.** Small motile bacterial rods that can reduce nitrates and cause galls on plant stems. | *"In academic literature, agrobacterium designates small motile bacterial rods that can reduce nitrates and cause galls on plant stems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agrobiologic]] | adjective | **1.** Of or pertaining to agrobiology. | *"In academic literature, agrobiologic designates of or pertaining to agrobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agrobiological]] | adjective | **1.** Of or pertaining to agrobiology. | *"In academic literature, agrobiological designates of or pertaining to agrobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agrobiology]] | noun | **1.** The study of plant nutrition and growth especially as a way to increase crop yield. | *"In academic literature, agrobiology designates the study of plant nutrition and growth especially as a way to increase crop yield."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arroba]] | noun | **1.** A unit of weight used in some spanish speaking countries.<br>**2.** A liquid measure (with different values) used in some spanish speaking countries. | *"In academic literature, arroba designates a unit of weight used in some spanish speaking countries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corroborant]] | adjective | **1.** Used of a medicine that is strengthening. | *"In academic literature, corroborant designates used of a medicine that is strengthening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corroborate]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** Give evidence for. | *"His heart is fracted and corroborate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corroboration]] | noun | **1.** Confirmation that some fact or statement is true through the use of documentary evidence. | *"If your ladyship would wish to have the boy produced in corroboration of this statement, I can lay my hand upon him at any time.” The wretched boy is nothing to my Lady, and she does NOT wish to have him produced."* — Charles Dickens, *Bleak House* |
| [[corroborative]] | adjective | **1.** Serving to support or corroborate. | *"If you want any corroborative evidence on the subject, you can ask him.” Lord Henry shrugged his shoulders."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[corroboratory]] | adjective | **1.** Serving to support or corroborate. | *"In academic literature, corroboratory designates serving to support or corroborate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disrobe]] | verb | **1.** Get undressed. | *"I’ll disrobe me Of these Italian weeds, and suit myself As does a Britain peasant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enrobe]] | verb | **1.** Provide with a coating.<br>**2.** Adorn with a robe. | *"It is a garment wherein they will enrobe forty bodies." We began upon the work, digging earth from the ditch which was being opened in the court of the church."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[rob]] | verb | **1.** Take something away by force or without the consent of the owner.<br>**2.** Rip off; ask an unreasonable price. | *"Besides, if things go well, Opinion that so sticks on Martius shall Of his demerits rob Cominius."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robalo]] | noun | **1.** A kind of percoid fish. | *"In academic literature, robalo designates a kind of percoid fish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robaxin]] | noun | **1.** Muscle relaxant for skeletal muscles (trade name robaxin) used to treat spasms. | *"In academic literature, robaxin designates muscle relaxant for skeletal muscles (trade name robaxin) used to treat spasms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robber]] | noun | **1.** A thief who steals from someone by threatening violence. | *"Thou art a robber, A law-breaker, a villain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robbery]] | noun | **1.** Larceny by threat of violence.<br>**2.** Plundering during riots or in wartime. | *"I do forgive thy robbery gentle thief Although thou steal thee all my poverty: And yet love knows it is a greater grief To bear greater wrong, than hate’s known injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robe]] | noun | **1.** Any loose flowing garment.<br>**2.** Outerwear consisting of a long flowing garment used for official or ceremonial occasions. | *"So is the time that keeps you as my chest Or as the wardrobe which the robe doth hide, To make some special instant special-blest, By new unfolding his imprisoned pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robe-de-chambre]] | noun | **1.** A robe worn before dressing or while lounging. | *"In academic literature, robe-de-chambre designates a robe worn before dressing or while lounging."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robed]] | verb | **1.** Clothe formally; especially in ecclesiastical robes.<br>**2.** Cover as if with clothing. | *"Bring in their evidence. [_To Edgar._] Thou, robed man of justice, take thy place. [_To the Fool._] And thou, his yokefellow of equity, Bench by his side. [_To Kent._] You are o’ the commission, Sit you too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robert]] | noun | **1.** United states parliamentary authority and author (in 1876) of robert's rules of order (1837-1923). | *"I am Robert Shallow, sir, a poor esquire of this county, and one of the King’s justices of the peace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[roberts]] | noun | **1.** United states biochemist (born in england) honored for his discovery that some genes contain introns (born in 1943).<br>**2.** United states evangelist (born 1918). | *"For’ard, I could see John Roberts straining at the bow oar."* — Jack London, *The Jacket (The Star-Rover)* |
| [[robertson]] | noun | **1.** United states basketball guard (born in 1938). | *"Robertson, Alexander MacEwen, Joseph Leckie, and William Graham."* — John Cairns, *Principal Cairns* |
| [[robeson]] | noun | **1.** United states bass singer and an outspoken critic of racism and proponent of socialism (1898-1976). | *"Robeson, New Jersey, June 25th, 1869. _Secretary of Interior_, Jacob D."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[robespierre]] | noun | **1.** French revolutionary; leader of the jacobins and architect of the reign of terror; was himself executed in a coup d'etat (1758-1794). | *"Then Robespierre was beheaded for being a despot."* — graf Leo Tolstoy, *War and Peace* |
| [[robin]] | noun | **1.** Small old world songbird with a reddish breast.<br>**2.** Large american thrush having a rust-red breast and abdomen. | *"They say he is already in the Forest of Arden, and a many merry men with him; and there they live like the old Robin Hood of England."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robinia]] | noun | **1.** Deciduous flowering trees and shrubs. | *"In academic literature, robinia designates deciduous flowering trees and shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robinson]] | noun | **1.** English chemist noted for his studies of molecular structures in plants (1886-1975).<br>**2.** United states prizefighter who won the world middleweight championship five times and the world welterweight championship once (1921-1989). | *"Jarndyce said he doubted if Robinson Crusoe could have read it, though he had had no other on his desolate island."* — Charles Dickens, *Bleak House* |
| [[robitussin]] | noun | **1.** Trade name of an expectorant that loosens phlegm and makes it easier to cough up. | *"In academic literature, robitussin designates trade name of an expectorant that loosens phlegm and makes it easier to cough up."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[roble]] | noun | **1.** Large tree of trinidad and guyana having odd-pinnate leaves and violet-scented axillary racemes of yellow flowers and long smooth pods; grown as a specimen in parks and large gardens.<br>**2.** Tall graceful deciduous california oak having leathery leaves and slender pointed acorns. | *"In academic literature, roble designates large tree of trinidad and guyana having odd-pinnate leaves and violet-scented axillary racemes of yellow flowers and long smooth pods; grown as a specimen in parks and large gardens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[roborant]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin rob within the domain of Virtue.<br>**2.** A technical or specialized form exhibiting the properties of rob in systematic terminology. | *"In academic literature, roborant designates pertaining to, derived from, or characteristic of latin rob within the domain of virtue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robot]] | noun | **1.** A mechanism that can move automatically. | *"Joining the laughing, chattering throng, they squeezed their way to the desk robot, and registered as a group."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[robotic]] | adjective | **1.** Of or relating to mechanical robots.<br>**2.** Resembling the unthinking functioning of a machine. | *"Men, women and children in all shapes and sizes: tall, short, stocky, slender, organic, bionic, robotic, and combinations thereof."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[robotics]] | noun | **1.** The area of ai concerned with the practical use of robots. | *"The problem is that although much of the gear is self-repairing through built-in robotics, when the robies themselves need fixing, no one knows how."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[robotlike]] | adjective | **1.** Resembling the unthinking functioning of a machine. | *"In academic literature, robotlike designates resembling the unthinking functioning of a machine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robust]] | adjective | **1.** Sturdy and strong in form, constitution, or construction.<br>**2.** Marked by richness and fullness of flavor. | *"Salo had not recovered as quickly as she had hoped, and Leonore, instead of getting more robust in our vigorous mountain-air, only became thinner and frailer."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[robustious]] | adjective | **1.** Noisy and lacking in restraint or discipline. | *"O, it offends me to the soul to hear a robustious periwig-pated fellow tear a passion to tatters, to very rags, to split the ears of the groundlings, who, for the most part, are capable of nothing but inexplicable dumb shows and noise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[robustly]] | adverb | **1.** In a robust manner. | *"In academic literature, robustly designates in a robust manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[robustness]] | noun | **1.** The property of being strong and healthy in constitution.<br>**2.** The characteristic of being strong enough to withstand intellectual challenge. | *"He looked like a man cut away from the stake, when the fire has overrunningly wasted all the limbs without consuming them, or taking away one particle from their compacted aged robustness."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Virtue]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ROB
  </div>
</div>
