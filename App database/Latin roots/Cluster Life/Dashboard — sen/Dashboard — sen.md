---
status: unread
type: root_dashboard
---
# Dashboard — sen
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sen-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“old or aged”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **sen** means old or aged. It refers to having existed for a long time, time-honored, or aged. In English, this root forms words such as *senile*, *senility*, *senilism*, and *senescence*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: old or aged
> The root **sen** means old or aged. It refers to having existed for a long time, time-honored, or aged. In English, this root forms words such as *senile*, *senility*, *senilism*, and *senescence*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Old or aged</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *senile* and *senility*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sen** comes from a Latin word that means *"old or aged"*.
  - At its core, it describes old or aged.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **sen** in an English word, think of **living energy and vital life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of old or aged.
  - **Mental & Social**: How people experience, organize, or communicate about old or aged.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Senile**: Characteristic of or caused by old age.
  - **Senility**: The physical and mental infirmity of old age.
  - **Senilism**: The premature development of physical, hormonal, or mental characteristics of old age.
  - **Senescence**: The condition or process of biological deterioration with age.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sen</mark>, think of <mark class="hl-def">living energy and vital life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sen** operates via several classical morphological stems:
> - **Base Stem `sen-` / `seni-` (*senex*, genitive *senis*, *senīlis*):**
>   - *senile*, *senility*, *senilism*, *senicide*, *senectitude*
> - **Inchoative Verb Stem `senesc-` (*senēscō, senēscere* "to grow old"):**
>   - *senescence*, *senescent*, *cellular senescence*, *senolytic*, *senomorphic*
> - **Comparative Stem `senior-` (*senior* "older, elder"):**
>   - *senior*, *seniority*
> - **Institutional Stem `senat-` (*senātus* "council of elders"):**
>   - *senate*, *senator*, *senatorial*, *senate-house*, *senatus consultum* (see [[Dashboard — senat]] for deep legal analysis)
> - **Feudal & Romance Vernacular Offshoots (`seign-`, `sir-`, `señ-`):**
>   - *sire*, *sir*, *surly*, *seigneur*, *seneschal*, *monsignor*, *signor*, *señor*

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
> The root spans four major conceptual domains:
> - **Cytology, Molecular Biology & Biogerontology:** Irreversible cessation of cell division (*senescence*, *senescent*), and cutting-edge anti-aging pharmacology targeting zombie cells (*senolytic*, *senomorphic*).
> - **Geriatric Medicine & Neuropsychiatry:** Cognitive impairment and physical frailty associated with advanced age (*senile*, *senility*, *senile dementia*, *senilism*).
> - **Societal Precedence & Corporate Hierarchy:** Priority based on years of tenure or life experience (*senior*, *seniority*).
> - **Constitutional Governance & Feudal Dignity:** Deliberative upper legislative chambers (*senate*, *senator*) and titles of monarchical or feudal respect (*sire*, *sir*, *seigneur*, *seneschal*).

---

## 🔀 4. Prefix & Combining Dynamics on sen

### Suffix Dynamics
- **`-escence` / `-escent` (Inchoative Process):** Denoting entrance into the biological state of aging: *senēscere* $\to$ *senescence*, *senescent*.
- **`-ile` / `-ity` (Physical / Mental Condition):** Denoting characteristics of advanced age: *senex* $\to$ *senile*, *senility*.
- **`-ior` (Comparative Degree):** Denoting older or of higher rank: *senex* $\to$ *senior*.
- **`-lytic` (Greek Combining Form "dissolving / destroying"):** Destroying senescent cells $\to$ *senolytic*.
- **`-morphic` (Greek Combining Form "form / modifying"):** Modifying senescent behavior $\to$ *senomorphic*.
- **`-cide` (Killing):** Euthanasia or murder of the aged $\to$ *senicide*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Biogerontology & Cellular Biology:** The Hayflick Limit; telomere attrition; DNA damage response (DDR); the Senescence-Associated Secretory Phenotype (SASP) promoting chronic tissue inflammation and carcinogenesis.
> - **Geriatric Medicine & Neurology:** Differential diagnosis of Alzheimer's disease, vascular dementia, and normal cognitive senescence; palliative care for extreme senile frailty.
> - **Constitutional Government & Legislative Systems:** The bicameral balance of senates across the world (US Senate, French Sénat, Canadian Senate); advice and consent powers.
> - **Labor Law & Corporate Governance:** Seniority-based promotion, collective bargaining agreements, pension vesting periods, and severance rights.
> - **Anthropology & Evolutionary Biology:** The "Grandmother Hypothesis" explaining human post-reproductive longevity; historical documentation of ritualized *senicide*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[absence]] | noun | **1.** The state of being absent.<br>**2.** Failure to be present. | *"Nor dare I chide the world-without-end hour, Whilst I (my sovereign) watch the clock for you, Nor think the bitterness of absence sour, When you have bid your servant once adieu."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absent]] | verb | **1.** Go away or leave.<br>**2.** Not being in a specified place. | *"My lord your son made me to think of this; Else Paris, and the medicine, and the king, Had from the conversation of my thoughts Haply been absent then."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absentee]] | noun | **1.** One that is absent or not in residence. | *"Agricultural land in the hands of absentee landlords yields an income not very clearly due to social service, and this phase of property has been especially assailed during the past century."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[absenteeism]] | noun | **1.** Habitual absence from work. | *"I disapprove of absenteeism; and now the land's mine, why, I must put up with it, I suppose, and live upon it in spite of myself."* — Grant Allen, *Michael's Crag* |
| [[absently]] | adverb | **1.** In an absentminded or preoccupied manner. | *"Her hand often lay immovably on these, while she absently looked in front of her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[absentminded]] | adjective | **1.** Lost in thought; showing preoccupation. | *"I noticed that you have been absentminded till now."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[absentmindedly]] | adverb | **1.** In an absentminded or preoccupied manner. | *"He comforted her, absentmindedly, and dressed in the dark, swearing at the clumsy leggings."* — Poul Anderson, *The Valor of Cappen Varra* |
| [[absentmindedness]] | noun | **1.** Preoccupation so great that the ordinary demands on attention are ignored. | *"In academic literature, absentmindedness designates preoccupation so great that the ordinary demands on attention are ignored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arsenal]] | noun | **1.** All the weapons and equipment that a country has.<br>**2.** A military structure where arms and ammunition and other military equipment are stored and training is given in the use of arms. | *"She was forced to resign from the Service, and offered a choice to either join a penetration team to the Outer Region or work in an arsenal under tight supervision."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[arsenate]] | noun | **1.** A salt or ester of arsenic acid. | *"Also, 2PbO + SO_{3} ➡ PbSO_{4}.PbO (basic sulphate). _Arsenides_ are partly left as the corresponding oxides, whilst some As_{4}O_{6} is evolved, and some basic arsenate generally remains."* — Donald M. Levy, *Modern Copper Smelting* |
| [[arsenic]] | noun | **1.** A white powdered poisonous trioxide of arsenic; used in manufacturing glass and as a pesticide (rat poison) and weed killer.<br>**2.** A very poisonous metallic element that has three allotropic forms; arsenic and arsenic compounds are used as herbicides and insecticides and various alloys; found in arsenopyrite and orpiment and realgar. | *"As to his religious notions—why, as Voltaire said, incantations will destroy a flock of sheep if administered with a certain quantity of arsenic."* — George Eliot, *Middlemarch* |
| [[arsenical]] | noun | **1.** A pesticide or drug containing arsenic.<br>**2.** Relating to or containing arsenic. | *"Rigidity of arsenical copper, 33, 41."* — Donald M. Levy, *Modern Copper Smelting* |
| [[arsenide]] | noun | **1.** A compound of arsenic with a more positive element. | *"Also, 2PbO + SO_{3} ➡ PbSO_{4}.PbO (basic sulphate). _Arsenides_ are partly left as the corresponding oxides, whilst some As_{4}O_{6} is evolved, and some basic arsenate generally remains."* — Donald M. Levy, *Modern Copper Smelting* |
| [[arsenious]] | adjective | **1.** Relating to compounds in which arsenic is trivalent. | *"In academic literature, arsenious designates relating to compounds in which arsenic is trivalent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arsenopyrite]] | noun | **1.** A silver-white or grey ore of arsenic. | *"In academic literature, arsenopyrite designates a silver-white or grey ore of arsenic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assent]] | noun | **1.** Agreement with a statement or proposal to do something.<br>**2.** To agree or express agreement. | *"First, that without the King’s assent or knowledge, You wrought to be a legate, by which power You maimed the jurisdiction of all bishops."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assenter]] | noun | **1.** A person who assents. | *"In academic literature, assenter designates a person who assents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assentient]] | adjective | **1.** Expressing agreement or consent. | *"In academic literature, assentient designates expressing agreement or consent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assenting]] | noun | **1.** Agreeing with or consenting to (often unwillingly).<br>**2.** To agree or express agreement. | *"After breakfast it is time to go to school." The mother, assenting, rose and went to the table to fill their cups."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[consensual]] | adjective | **1.** Existing by consent. | *"In academic literature, consensual designates existing by consent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consensus]] | noun | **1.** Agreement in the judgment or opinion reached by a group as a whole. | *"We must give greater credence to each other's needs and aspirations and arrive at consensus on sharing in the responsibilities for this, our family of planets and satellites."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[consent]] | noun | **1.** Permission to do something.<br>**2.** Give an affirmative reply to; respond favorably to. | *"And each (though enemies to either’s reign) Do in consent shake hands to torture me, The one by toil, the other to complain How far I toil, still farther off from thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consentaneous]] | adjective | **1.** In complete agreement. | *"In academic literature, consentaneous designates in complete agreement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consentient]] | adjective | **1.** In complete agreement. | *"In academic literature, consentient designates in complete agreement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consenting]] | verb | **1.** Give an affirmative reply to; respond favorably to.<br>**2.** Having given consent. | *"FIRST GENTLEMAN. ’Tis but the boldness of his hand haply, which his heart was not consenting to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[desensitisation]] | noun | **1.** The process of reducing sensitivity. | *"In academic literature, desensitisation designates the process of reducing sensitivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitise]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitise designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitising]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitising designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitization]] | noun | **1.** The process of reducing sensitivity. | *"In academic literature, desensitization designates the process of reducing sensitivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitize]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitize designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desensitizing]] | verb | **1.** Cause not to be sensitive.<br>**2.** Make insensitive. | *"In academic literature, desensitizing designates cause not to be sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disenable]] | verb | **1.** Make unable to perform a certain action. | *"In academic literature, disenable designates make unable to perform a certain action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disenchant]] | verb | **1.** Free from enchantment. | *"We never become disenchanted; we grow more and more awe-struck at its infinite wealth."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[disenchanted]] | verb | **1.** Free from enchantment.<br>**2.** Freed from enchantment. | *"We never become disenchanted; we grow more and more awe-struck at its infinite wealth."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[disenchanting]] | verb | **1.** Free from enchantment.<br>**2.** Freeing from illusion or false belief. | *"In academic literature, disenchanting designates free from enchantment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disenchantment]] | noun | **1.** Freeing from false belief or illusions. | *"Not if it would do you any good." Oh irony, oh disenchantment!"* — Anthony Pryde, *Nightfall* |
| [[disencumber]] | verb | **1.** Release from entanglement of difficulty. | *"Seizing that opportunity, Ahab first paid out more line: and then was rapidly hauling and jerking in upon it again—hoping that way to disencumber it of some snarls—when lo!—a sight more savage than the embattled teeth of sharks!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[disentangle]] | verb | **1.** Release from entanglement of difficulty.<br>**2.** Extricate from entanglement. | *"He gave it its present name and lived here shut up, day and night poring over the wicked heaps of papers in the suit and hoping against hope to disentangle it from its mystification and bring it to a close."* — Charles Dickens, *Bleak House* |
| [[disentangled]] | verb | **1.** Release from entanglement of difficulty.<br>**2.** Extricate from entanglement. | *"And all this the artist had disentangled from a rough block of stone--so vivid was his conception of the goddess, and so sure his hand."* — T. R. Glover, *The Jesus of History* |
| [[disentanglement]] | noun | **1.** The act of releasing from a snarled or tangled condition. | *"In academic literature, disentanglement designates the act of releasing from a snarled or tangled condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disentangler]] | noun | **1.** A person who removes tangles; someone who takes something out of a tangled state. | *"In academic literature, disentangler designates a person who removes tangles; someone who takes something out of a tangled state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissension]] | noun | **1.** Disagreement among those expected to cooperate.<br>**2.** A conflict of people's opinions or actions or characters. | *"And for dissension, who preferreth peace More than I do, except I be provoked?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissent]] | noun | **1.** (law) the difference of one judge's opinion from that of the majority.<br>**2.** A difference of opinion. | *"It’s two young men in a gig, ma’am, who want to see the house—yes, and if you please, I told them so!” in quick reply to a gesture of dissent from the housekeeper."* — Charles Dickens, *Bleak House* |
| [[dissenter]] | noun | **1.** A person who dissents from some established policy. | *"The family were of that "strict, not strictest species of Presbyterian Dissenter," and John attended also the Bible-class and Fellowship Meeting."* — John Cairns, *Principal Cairns* |
| [[dissentient]] | adjective | **1.** (of catholics) refusing to attend services of the church of england.<br>**2.** Disagreeing, especially with a majority. | *"South Carolina, to show the strength and unity of her opinions, brings her assembly to a unanimity, within seven votes; Pennsylvania, not to be outdone in this respect more than others, reduces her dissentient fraction to one vote."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[dissenting]] | verb | **1.** Withhold assent.<br>**2.** Express opposition through action or words. | *"No dissenting voice was raised against the marriage."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dissentious]] | adjective | **1.** Dissenting (especially dissenting with the majority opinion). | *"Thanks.—What’s the matter, you dissentious rogues, That, rubbing the poor itch of your opinion, Make yourselves scabs?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extrasensory]] | adjective | **1.** Seemingly outside normal sensory channels. | *"In academic literature, extrasensory designates seemingly outside normal sensory channels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensate]] | adjective | **1.** Devoid of feeling and consciousness and animation.<br>**2.** Without compunction or human feeling. | *"Mine was th’ insensate frenzied part, Ah! why should I such scenes outlive?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[insensately]] | adverb | **1.** In an insensate manner. | *"In academic literature, insensately designates in an insensate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensibility]] | noun | **1.** A lack of sensibility.<br>**2.** Devoid of passion or feeling; hardheartedness. | *"Ada found me thus and had such a delightful confidence in me when I showed her the keys and told her about them that it would have been insensibility and ingratitude not to feel encouraged."* — Charles Dickens, *Bleak House* |
| [[insensible]] | adjective | **1.** Incapable of physical sensation.<br>**2.** Unaware of or indifferent to. | *"Peace is a very apoplexy, lethargy; mulled, deaf, sleepy, insensible; a getter of more bastard children than war’s a destroyer of men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insensibly]] | adverb | **1.** In a numb manner; without feeling. | *"Moreover, when two people are once parted—have abandoned a common domicile and a common environment—new growths insensibly bud upward to fill each vacated place; unforeseen accidents hinder intentions, and old plans are forgotten."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[insensitive]] | adjective | **1.** Not responsive to physical stimuli.<br>**2.** Deficient in human sensibility; not mentally or morally sensitive. | *"It is something like the way Dame Nature gathers round a foreign body an envelope of some insensitive tissue which can protect from evil that which it would otherwise harm by contact."* — Bram Stoker, *Dracula* |
| [[insensitively]] | adverb | **1.** In an insensitive manner. | *"In academic literature, insensitively designates in an insensitive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensitiveness]] | noun | **1.** The inability to respond to affective changes in your interpersonal environment. | *"In academic literature, insensitiveness designates the inability to respond to affective changes in your interpersonal environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insensitivity]] | noun | **1.** The inability to respond to affective changes in your interpersonal environment. | *"In academic literature, insensitivity designates the inability to respond to affective changes in your interpersonal environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insentience]] | noun | **1.** Lacking consciousness or ability to perceive sensations. | *"In academic literature, insentience designates lacking consciousness or ability to perceive sensations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insentient]] | adjective | **1.** Devoid of feeling and consciousness and animation. | *"The cause of a brief sharp unforeseen heard loud lone crack emitted by the insentient material of a strainveined timber table."* — James Joyce, *Ulysses* |
| [[intrasentential]] | adjective | **1.** Of or relating to constituents within a sentence. | *"In academic literature, intrasentential designates of or relating to constituents within a sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misrepresent]] | verb | **1.** Represent falsely.<br>**2.** Tamper, with the purpose of deception. | *"They watch you, misrepresent you, write letters about you (anonymous sometimes), and you are the torment and the occupation of their lives."* — Charles Dickens, *Great Expectations* |
| [[misrepresentation]] | noun | **1.** A misleading falsehood.<br>**2.** A willful perversion of facts. | *"There may be an element of error, even of misrepresentation, in such estimates."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[nonrepresentational]] | adjective | **1.** Of or relating to a style of art in which objects do not resemble those known in physical nature. | *"In academic literature, nonrepresentational designates of or relating to a style of art in which objects do not resemble those known in physical nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonrepresentative]] | adjective | **1.** Not standing for something else. | *"In academic literature, nonrepresentative designates not standing for something else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsense]] | noun | **1.** A message that seems to convey no meaning.<br>**2.** Ornamental objects of no great value. | *"I wonder the very paving-stones opposite our house can have the patience to stay there and be a witness of such inconsistencies and contradictions as all that sounding nonsense, and Ma’s management!” I could not but understand her to refer to Mr."* — Charles Dickens, *Bleak House* |
| [[nonsensical]] | adjective | **1.** Incongruous;inviting ridicule.<br>**2.** Having no intelligible meaning. | *"You are a nonsensical child to have done anything of this kind,” said Mrs."* — Charles Dickens, *Bleak House* |
| [[nonsensicality]] | noun | **1.** A message that seems to convey no meaning. | *"In academic literature, nonsensicality designates a message that seems to convey no meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsensitive]] | adjective | **1.** Never having had security classification. | *"In academic literature, nonsensitive designates never having had security classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oversensitive]] | adjective | **1.** Unduly sensitive or thin-skinned. | *"In academic literature, oversensitive designates unduly sensitive or thin-skinned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oversensitiveness]] | noun | **1.** Sensitivity leading to easy irritation or upset. | *"In academic literature, oversensitiveness designates sensitivity leading to easy irritation or upset."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presence]] | noun | **1.** The state of being present; current existence.<br>**2.** The immediate proximity of someone or something. | *"We will not meddle with him till he come; for his presence must be the whip of the other."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[present]] | noun | **1.** The period of time that is happening now; any continuous stretch of time including the moment of speech.<br>**2.** Something presented as a gift. | *"So either by thy picture or my love, Thyself away, art present still with me, For thou not farther than my thoughts canst move, And I am still with them, and they with thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[present-day]] | adjective | **1.** Belonging to the present time. | *"In academic literature, present-day designates belonging to the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presentable]] | adjective | **1.** Fit to be seen. | *"I wiped my eyes, and put myself into presentable shape as soon as I could, and opened the door."* — Classic Author, *The wonders of prayer* |
| [[presentably]] | adverb | **1.** In a presentable manner. | *"In academic literature, presentably designates in a presentable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presentation]] | noun | **1.** The activity of formally presenting something (as a prize or reward).<br>**2.** A show or display; the act of presenting something to sight or view. | *"He uses his folly like a stalking-horse, and under the presentation of that he shoots his wit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentational]] | adjective | **1.** Of or relating to a presentation (especially in psychology or philosophy). | *"In academic literature, presentational designates of or relating to a presentation (especially in psychology or philosophy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presenter]] | noun | **1.** Someone who presents a message of some sort (as a petition or an address or a check or a memorial etc.).<br>**2.** An advocate who presents a person (as for an award or a degree or an introduction etc.). | *"EPILOGUE Dramatis Personæ RUMOUR, the Presenter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentiment]] | noun | **1.** A feeling of evil to come. | *"The Lord's blessing is enough for me_." The letter was sent and forgotten, but a strange presentiment came over the mind of the writer."* — Classic Author, *The wonders of prayer* |
| [[presentism]] | noun | **1.** The doctrine that the scripture prophecies of the apocalypse (as in the book of revelations) are presently in the course of being fulfilled. | *"In academic literature, presentism designates the doctrine that the scripture prophecies of the apocalypse (as in the book of revelations) are presently in the course of being fulfilled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presentist]] | noun | **1.** A theologian who believes that the scripture prophecies of the apocalypse (the book of revelation) are being fulfilled at the present time. | *"In academic literature, presentist designates a theologian who believes that the scripture prophecies of the apocalypse (the book of revelation) are being fulfilled at the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presently]] | adverb | **1.** In the near future.<br>**2.** At this time or period; now. | *"That, having this obtain’d, you presently Attend his further pleasure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentment]] | noun | **1.** An accusation of crime made by a grand jury on its own initiative.<br>**2.** A document that must be accepted and paid by another person. | *"Look here upon this picture, and on this, The counterfeit presentment of two brothers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentness]] | noun | **1.** The quality of being the present; - r.e.spiller. | *"In academic literature, presentness designates the quality of being the present; - r.e.spiller."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosencephalon]] | noun | **1.** The anterior portion of the brain; the part of the brain that develops from the anterior part of the neural tube. | *"In academic literature, prosencephalon designates the anterior portion of the brain; the part of the brain that develops from the anterior part of the neural tube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[represent]] | verb | **1.** Take the place of or be parallel or equivalent to.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"For well I wot the empress never wags But in her company there is a Moor; And, would you represent our queen aright, It were convenient you had such a devil."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[representable]] | adjective | **1.** Expressible in symbolic form. | *"In academic literature, representable designates expressible in symbolic form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[representation]] | noun | **1.** A presentation to the mind in the form of an idea or image.<br>**2.** A creation that is a visual or tangible rendering of someone or something. | *"I doubt if my guardian were altogether taken by surprise when he received the representation, though it caused him much uneasiness and disappointment."* — Charles Dickens, *Bleak House* |
| [[representational]] | adjective | **1.** (used especially of art) depicting objects, figures,or scenes as seen. | *"In academic literature, representational designates (used especially of art) depicting objects, figures,or scenes as seen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[representative]] | noun | **1.** A person who represents others.<br>**2.** An advocate who represents someone else's policy or purpose. | *"The present representative of the Dedlocks is an excellent master."* — Charles Dickens, *Bleak House* |
| [[represented]] | verb | **1.** Take the place of or be parallel or equivalent to.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"In which (I would say) every difficulty, every contingency, every masterly fiction, every form of procedure known in that court, is represented over and over again?"* — Charles Dickens, *Bleak House* |
| [[resent]] | verb | **1.** Feel bitter or indignant about.<br>**2.** Wish ill or allow unwillingly. | *"He did not resent my conduct, he simply said that some day I should receive the first-fruits of the Spirit—that those who came to scoff sometimes remained to pray."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[resentful]] | adjective | **1.** Full of or marked by resentment or indignant ill will. | *"A close observer might perhaps detect both in her eye and her brother’s, when their venerable grandsire anticipates his being gone, some little impatience to know when he may be going, and some resentful opinion that it is time he went."* — Charles Dickens, *Bleak House* |
| [[resentfully]] | adverb | **1.** With resentment; in a resentful manner. | *"The truth is, he wrote to me under a sort of protest while unable to write to you with any hope of an answer—wrote coldly, haughtily, distantly, resentfully."* — Charles Dickens, *Bleak House* |
| [[resentment]] | noun | **1.** A feeling of deep and bitter anger and ill-will. | *"But what did you think upon the road?” “Wot do you mean?” growled Coavinses with an appearance of strong resentment."* — Charles Dickens, *Bleak House* |
| [[sen]] | noun | **1.** A fractional monetary unit of japan and indonesia and cambodia; equal to one hundredth of a yen or rupiah or riel. | *"From the little we had seen of the land and the people we were not impressed by Cho-Sen."* — Jack London, *The Jacket (The Star-Rover)* |
| [[senate]] | noun | **1.** Assembly possessing high legislative powers.<br>**2.** The upper house of the united states congress. | *"Our business is not unknown to th’ Senate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senator]] | noun | **1.** A member of a senate. | *"FIRST SENATOR. [_To the Citizens_.] Hence to your homes, begone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senatorial]] | adjective | **1.** Of or relating to senators. | *"As a result, union labour possessing an important political significance at the time, the time-serving politicians at Sacramento appointed a senatorial committee of investigation of the state prisons."* — Jack London, *The Jacket (The Star-Rover)* |
| [[senatorship]] | noun | **1.** The office of senator. | *"In academic literature, senatorship designates the office of senator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sene]] | noun | **1.** 100 sene equal 1 tala in western samoa. | *"In academic literature, sene designates 100 sene equal 1 tala in western samoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seneca]] | noun | **1.** Roman statesman and philosopher who was an advisor to nero; his nine extant tragedies are modeled on greek tragedies (circa 4 bc - 65 ad).<br>**2.** A member of the iroquoian people formerly living in new york state south of lake ontario. | *"Seneca cannot be too heavy, nor Plautus too light, for the law of writ and the liberty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senecan]] | adjective | **1.** Of or relating to or like or in the manner of the roman seneca. | *"In academic literature, senecan designates of or relating to or like or in the manner of the roman seneca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senecio]] | noun | **1.** Enormous and diverse cosmopolitan genus of trees and shrubs and vines and herbs including many weeds. | *"Var. _d._ _Jacobæa_, Grev.; pustular, soon becoming agglomerated, numerous, depressed; peridia splitting into short, brittle, yellowish-white teeth.—On leaves of _Senecio Jacobæa_ and _Sonchus arvensis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[senefelder]] | noun | **1.** German printer who invented lithography (1771-1834). | *"In academic literature, senefelder designates german printer who invented lithography (1771-1834)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senega]] | noun | **1.** Dried root of two plants of the genus polygala containing an irritating saponin.<br>**2.** Perennial bushy herb of central and southern united states having white flowers with green centers and often purple crest; similar to seneca snakeroot. | *"In academic literature, senega designates dried root of two plants of the genus polygala containing an irritating saponin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senegal]] | noun | **1.** A republic in northwestern africa on the coast of the atlantic; formerly a french colony but achieved independence in 1960. | *"The Slave’s Lament It was in sweet Senegal that my foes did me enthral, For the lands of Virginia,—ginia, O: Torn from that lovely shore, and must never see it more; And alas!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[senegalese]] | noun | **1.** A native or inhabitant of senegal.<br>**2.** Of or relating to or characteristic of senegal or its people. | *"In academic literature, senegalese designates a native or inhabitant of senegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senesce]] | verb | **1.** Grow old or older. | *"In academic literature, senesce designates grow old or older."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senescence]] | noun | **1.** The organic process of growing older and showing the effects of increasing age.<br>**2.** The property characteristic of old age. | *"What two phenomena of senescence were more frequent?"* — James Joyce, *Ulysses* |
| [[senescent]] | adjective | **1.** Growing old. | *"In academic literature, senescent designates growing old."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seneschal]] | noun | **1.** The chief steward or butler of a great household. | *"The moaning wind went wandering round The weeping prison-wall: Till like a wheel of turning-steel We felt the minutes crawl: O moaning wind! what had we done To have such a seneschal?"* — Oscar Wilde, *The Ballad of Reading Gaol* |
| [[senile]] | adjective | **1.** Mentally or physically infirm with age. | *"He was a universal genius—on that point I agreed with the old chap, who thereupon blew his nose noisily into a large cotton handkerchief and withdrew in senile agitation, bearing off some family letters and memoranda without importance."* — Joseph Conrad, *Heart of Darkness* |
| [[senility]] | noun | **1.** Mental infirmity as a consequence of old age; sometimes shown by foolish infatuations.<br>**2.** The state of being senile. | *"So I, too, affected not to recognize my enemy, and, putting on an idiotic senility, I, too, crawled in the dust toward the litter whining for mercy and charity."* — Jack London, *The Jacket (The Star-Rover)* |
| [[senior]] | noun | **1.** An undergraduate student during the year preceding graduation.<br>**2.** A person who is older than you are. | *"The Forest of Arden Enter Duke Senior, Amiens and two or three Lords, dressed as foresters."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seniority]] | noun | **1.** Higher rank than that of others especially by reason of longer service.<br>**2.** The property of being long-lived. | *"She had something to suffer, perhaps, when they came into contact again, in seeing Anne restored to the rights of seniority, and the mistress of a very pretty landaulette; but she had a future to look forward to, of powerful consolation."* — Jane Austen, *Persuasion* |
| [[seniti]] | noun | **1.** 100 seniti equal 1 pa'anga in tonga. | *"In academic literature, seniti designates 100 seniti equal 1 pa'anga in tonga."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senna]] | noun | **1.** Any of various plants of the genus senna having pinnately compound leaves and showy usually yellow flowers; many are used medicinally. | *"In academic literature, senna designates any of various plants of the genus senna having pinnately compound leaves and showy usually yellow flowers; many are used medicinally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sennacherib]] | noun | **1.** King of assyria who invaded judea twice and defeated babylon and rebuilt nineveh after it had been destroyed by babylonians (died in 681 bc). | *"Here Sennacherib sailed in the great galleys the brown Sidonian shipwrights had made for him."* — Donn Byrne, *The Wind Bloweth* |
| [[sennenhunde]] | noun | **1.** Any of four swiss breeds. | *"In academic literature, sennenhunde designates any of four swiss breeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sennett]] | noun | **1.** United states filmmaker (born in canada) noted for slapstick movies (1880-1960). | *"In academic literature, sennett designates united states filmmaker (born in canada) noted for slapstick movies (1880-1960)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sennit]] | noun | **1.** Flat braided cordage that is used on ships. | *"In academic literature, sennit designates flat braided cordage that is used on ships."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senor]] | noun | **1.** A spanish title or form of address for a man; similar to the english `mr' or `sir'. | *"You must have heard of it.’ “‘Nay, Senor; hereabouts in this dull, warm, most lazy, and hereditary land, we know but little of your vigorous North.’ “‘Aye?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[senora]] | noun | **1.** A spanish title or form of address for a married woman; similar to the english `mrs' or `madam'. | *"In academic literature, senora designates a spanish title or form of address for a married woman; similar to the english `mrs' or `madam'."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senorita]] | noun | **1.** A spanish title or form of address used to or of an unmarried girl or woman; similar to the english `miss'. | *"In academic literature, senorita designates a spanish title or form of address used to or of an unmarried girl or woman; similar to the english `miss'."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sens]] | noun | **1.** Street names for marijuana.<br>**2.** A fractional monetary unit of japan and indonesia and cambodia; equal to one hundredth of a yen or rupiah or riel. | *"Captain Jamie must have sensed this faith that informed me, for he said: “I remember a Swede that went crazy twenty years ago."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sensate]] | adjective | **1.** Having physical sensation. | *"In academic literature, sensate designates having physical sensation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensation]] | noun | **1.** An unelaborated elementary awareness of stimulation.<br>**2.** Someone who is dazzlingly skilled in any field. | *"I am always conscious of an uncomfortable sensation now and then when the wind is blowing in the east.” “Rheumatism, sir?” said Richard."* — Charles Dickens, *Bleak House* |
| [[sensational]] | adjective | **1.** Causing intense interest, curiosity, or emotion.<br>**2.** Commanding attention. | *"The morning following the arrest of Victor Ancona, the newspapers published long sensational articles, denounced him as a fiend, and convicted him."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[sensationalism]] | noun | **1.** Subject matter that is calculated to excite and please vulgar tastes.<br>**2.** The journalistic use of subject matter that appeals to vulgar tastes. | *"If he only amuses them and deals in paltry three-cent sensationalism, away with more of the same sort of stuff which we already have in so many pastors!"* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[sensationalist]] | noun | **1.** Someone who uses exaggerated or lurid material in order to gain public attention. | *"In academic literature, sensationalist designates someone who uses exaggerated or lurid material in order to gain public attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensationalistic]] | adjective | **1.** Typical of tabloids. | *"In academic literature, sensationalistic designates typical of tabloids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensationally]] | adverb | **1.** In a sensational manner. | *"In academic literature, sensationally designates in a sensational manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sense]] | noun | **1.** A general conscious awareness.<br>**2.** The meaning of a word or expression; the way in which a word or expression or situation can be interpreted. | *"You are my all the world, and I must strive, To know my shames and praises from your tongue, None else to me, nor I to none alive, That my steeled sense or changes right or wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensed]] | verb | **1.** Perceive by a physical sensation, e.g., coming from the skin or muscles.<br>**2.** Detect some circumstance or entity automatically. | *"Captain Jamie must have sensed this faith that informed me, for he said: “I remember a Swede that went crazy twenty years ago."* — Jack London, *The Jacket (The Star-Rover)* |
| [[senseless]] | adjective | **1.** Not marked by the use of reason.<br>**2.** Unresponsive to stimulation. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[senselessly]] | adverb | **1.** In a meaningless and purposeless manner.<br>**2.** In an unreasonably senseless manner. | *"It now seemed clear to him that all his experience of life must be senselessly wasted unless he applied it to some kind of work and again played an active part in life."* — graf Leo Tolstoy, *War and Peace* |
| [[senselessness]] | noun | **1.** Total lack of meaning or ideas. | *"Open their bleared lids and look on your own accursed senselessness!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sensibilise]] | verb | **1.** Make sensitive or aware. | *"In academic literature, sensibilise designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensibility]] | noun | **1.** Mental responsiveness and awareness.<br>**2.** Refined sensitivity to pleasurable or painful impressions. | *"Yes, cousin John.” “Why,” he slowly replied, roughening his head more and more, “he is all sentiment, and—and susceptibility, and—and sensibility, and—and imagination."* — Charles Dickens, *Bleak House* |
| [[sensibilize]] | verb | **1.** Make sensitive or aware. | *"In academic literature, sensibilize designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensible]] | adjective | **1.** Showing reason or sound judgment.<br>**2.** Able to feel or perceive. | *"Thou art sensible in nothing but blows, and so is an ass."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensibleness]] | noun | **1.** The quality of showing good sense or practical judgment. | *"In academic literature, sensibleness designates the quality of showing good sense or practical judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensibly]] | adverb | **1.** With good sense or in a reasonable or intelligent manner. | *"O noble fellow, Who sensibly outdares his senseless sword, And when it bows, stand’st up!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensify]] | verb | **1.** Make sensitive or aware. | *"In academic literature, sensify designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensing]] | noun | **1.** The perception that something has occurred or some state exists.<br>**2.** Becoming aware of something via the senses. | *"Hodak, sensing Drummer's scrutiny, glanced sideways at him, winked straight-faced, and returned to observe the crowd."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sensitisation]] | noun | **1.** The state of being sensitive (as to an antigen).<br>**2.** (psychology) the process of becoming highly sensitive to specific events or situations (especially emotional events or situations). | *"In academic literature, sensitisation designates the state of being sensitive (as to an antigen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitise]] | verb | **1.** Cause to sense; make sensitive.<br>**2.** Make sensitive to a drug or allergen. | *"In academic literature, sensitise designates cause to sense; make sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitised]] | verb | **1.** Cause to sense; make sensitive.<br>**2.** Make sensitive to a drug or allergen. | *"In academic literature, sensitised designates cause to sense; make sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitiser]] | noun | **1.** (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction. | *"In academic literature, sensitiser designates (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitising]] | noun | **1.** Rendering an organism sensitive to a serum by a series of injections.<br>**2.** Cause to sense; make sensitive. | *"In academic literature, sensitising designates rendering an organism sensitive to a serum by a series of injections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitive]] | noun | **1.** Someone who serves as an intermediary between the living and the dead.<br>**2.** Responsive to physical stimuli. | *"Beside him is a spare cushion with which he is always provided in order that he may have something to throw at the venerable partner of his respected age whenever she makes an allusion to money—a subject on which he is particularly sensitive."* — Charles Dickens, *Bleak House* |
| [[sensitively]] | adverb | **1.** In a sensitive manner. | *"The feeble mother was most sensitively anxious lest her daughter should pursue some unwarrantable course which should lead to relapse."* — Classic Author, *The wonders of prayer* |
| [[sensitiveness]] | noun | **1.** Sensitivity to emotional feelings (of self and others).<br>**2.** (physiology) responsiveness to external stimuli; the faculty of sensation. | *"Yet the intrinsic quality of the event moved his touchy sensitiveness less than its conjectured effect upon the minds of others."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sensitivity]] | noun | **1.** (physiology) responsiveness to external stimuli; the faculty of sensation.<br>**2.** The ability to respond to physical stimuli or to register small physical amounts or differences. | *"Compassion will not be a burden to her; to the contrary, reaching out strengthens her sensitivity and her developing maturity."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[sensitization]] | noun | **1.** The state of being sensitive (as to an antigen).<br>**2.** (psychology) the process of becoming highly sensitive to specific events or situations (especially emotional events or situations). | *"In academic literature, sensitization designates the state of being sensitive (as to an antigen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitize]] | verb | **1.** Make sensitive or aware.<br>**2.** Cause to sense; make sensitive. | *"In academic literature, sensitize designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitized]] | verb | **1.** Make sensitive or aware.<br>**2.** Cause to sense; make sensitive. | *"In academic literature, sensitized designates make sensitive or aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitizer]] | noun | **1.** (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction. | *"In academic literature, sensitizer designates (chemistry) a substance other than a catalyst that facilitates the start of a catalytic reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitizing]] | noun | **1.** Rendering an organism sensitive to a serum by a series of injections.<br>**2.** Make sensitive or aware. | *"In academic literature, sensitizing designates rendering an organism sensitive to a serum by a series of injections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensitometer]] | noun | **1.** A measuring instrument for measuring the light sensitivity of film over a range of exposures. | *"In academic literature, sensitometer designates a measuring instrument for measuring the light sensitivity of film over a range of exposures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensor]] | noun | **1.** Any device that receives a signal or stimulus (as heat or pressure or light or motion etc.) and responds to it in a distinctive manner. | *"An aberrant indicator caught his eye and he mind-stroked a sensor control."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sensorial]] | adjective | **1.** Involving or derived from the senses. | *"In academic literature, sensorial designates involving or derived from the senses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensorimotor]] | adjective | **1.** Of or relating to the sensory and motor coordination of an organism or to the controlling nerves. | *"In academic literature, sensorimotor designates of or relating to the sensory and motor coordination of an organism or to the controlling nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensorineural]] | adjective | **1.** Of or relating to the neural process of sensation. | *"In academic literature, sensorineural designates of or relating to the neural process of sensation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensorium]] | noun | **1.** The areas of the brain that process and register incoming sensory information and make possible the conscious awareness of the world. | *"In academic literature, sensorium designates the areas of the brain that process and register incoming sensory information and make possible the conscious awareness of the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensory]] | adjective | **1.** Of a nerve fiber or impulse originating outside and passing toward the central nervous system.<br>**2.** Involving or derived from the senses. | *"Millions of people who see poorly, or not at all, or who have other sensory problems, use precision tools all the time."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[sensual]] | adjective | **1.** Marked by the appetites and passions of the body.<br>**2.** Sexually exciting or gratifying. | *"I have begun, And now I give my sensual race the rein."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensualise]] | verb | **1.** Debase through carnal gratification. | *"In academic literature, sensualise designates debase through carnal gratification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensualism]] | noun | **1.** Desire for sensual pleasures.<br>**2.** (philosophy) the ethical doctrine that feeling is the only criterion for what is good. | *"This doctrine may be inconvenient in practice, but it is far removed from vulgar sensualism, of which Shelley had not a trace."* — Sydney Waterlow, *Shelley* |
| [[sensualist]] | noun | **1.** A person who enjoys sensuality. | *"I am not absolutely such a fool and sensualist as to regret the absence of a carpet, a sofa, and silver plate; besides, five weeks ago I had nothing—I was an outcast, a beggar, a vagrant; now I have acquaintance, a home, a business."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sensuality]] | noun | **1.** Desire for sensual pleasures. | *"I will write against it: You seem to me as Dian in her orb, As chaste as is the bud ere it be blown; But you are more intemperate in your blood Than Venus, or those pamper’d animals That rage in savage sensuality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensualize]] | verb | **1.** Represent materialistically, as in a painting or a sculpture.<br>**2.** Ascribe to an origin in sensation. | *"In academic literature, sensualize designates represent materialistically, as in a painting or a sculpture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensually]] | adverb | **1.** In a sultry and sensual manner. | *"As we are men, Thus should we do; being sensually subdued, We lose our human title."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sensualness]] | noun | **1.** Desire for sensual pleasures. | *"In academic literature, sensualness designates desire for sensual pleasures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensuous]] | adjective | **1.** Taking delight in beauty. | *"That would depend upon whether the germs of staunch comradeship underlay the temporary emotion, or whether it were a sensuous joy in her form only, with no substratum of everlastingness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sensuously]] | adverb | **1.** With aesthetic gratification or delight. | *"In academic literature, sensuously designates with aesthetic gratification or delight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sensuousness]] | noun | **1.** A sensuous feeling. | *"The former curves of sensuousness were now modulated to lines of devotional passion."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sent]] | noun | **1.** 100 senti equal 1 kroon in estonia.<br>**2.** Cause to go somewhere. | *"E’en that you have there. [_Exit._] COUNTESS. [_Reads._] _I have sent you a daughter-in-law; she hath recovered the king and undone me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sente]] | noun | **1.** 100 lisente equal 1 loti in lesotho; one sente is worth one-hundredth of a loti. | *"Ogni dolcezza, ogni pensiero umile Nasce nel core a chi parlar la sente; Ond’è beato chi prima la vide."* — George Eliot, *Middlemarch* |
| [[sentence]] | noun | **1.** A string of words satisfying the grammatical rules of a language.<br>**2.** (criminal law) a final judgment of guilty in a criminal case and the punishment that is imposed. | *"With that she sighed as she stood, With that she sighed as she stood, And gave this sentence then: Among nine bad if one be good, Among nine bad if one be good, There’s yet one good in ten._ COUNTESS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sentential]] | adjective | **1.** Of or relating to a sentence. | *"In academic literature, sentential designates of or relating to a sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sententious]] | adjective | **1.** Abounding in or given to pompous or aphoristic moralizing; - kathleen barnes.<br>**2.** Concise and full of meaning; ; - hervey allen. | *"By my faith, he is very swift and sententious."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sententiously]] | adverb | **1.** In a pithy sententious manner. | *"And don’t go thinking about her making a match for me—it is silly.” “Very well said, Tess!” observed her father sententiously."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sentience]] | noun | **1.** State of elementary or undifferentiated consciousness.<br>**2.** The faculty through which the external world is apprehended. | *"In academic literature, sentience designates state of elementary or undifferentiated consciousness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentiency]] | noun | **1.** The faculty through which the external world is apprehended. | *"In academic literature, sentiency designates the faculty through which the external world is apprehended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentient]] | adjective | **1.** Endowed with feeling and unstructured consciousness; - t.e.lawrence.<br>**2.** Consciously perceiving; ; - w.a.white. | *"Human shapes, interferences, troubles, and joys were all as if they were not, and there seemed to be on the shaded hemisphere of the globe no sentient being save himself; he could fancy them all gone round to the sunny side."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sentiment]] | noun | **1.** Tender, romantic, or nostalgic feeling or emotion.<br>**2.** A personal belief or judgment that is not founded on proof or certainty. | *"He was so full of feeling too and had such a delicate sentiment for what was beautiful or tender that he could have won a heart by that alone."* — Charles Dickens, *Bleak House* |
| [[sentimental]] | adjective | **1.** Given to or marked by sentiment or sentimentality.<br>**2.** Effusively or insincerely emotional. | *"Guppy looked at him with a sentimental air, “from boyhood’s hour.” Mr."* — Charles Dickens, *Bleak House* |
| [[sentimentalisation]] | noun | **1.** The act of indulging in sentiment. | *"In academic literature, sentimentalisation designates the act of indulging in sentiment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentimentalise]] | verb | **1.** Make (someone or something) sentimental or imbue with sentimental qualities.<br>**2.** Look at with sentimentality or turn into an object of sentiment. | *"We, of this self-conscious, incredulous generation, sentimentalise our children, analyse our children, think we are endowed with a special capacity to sympathise and identify ourselves with children; we play at being children."* — Francis Thompson, *Shelley: An Essay* |
| [[sentimentalism]] | noun | **1.** The excessive expression of tender feelings, nostalgia, or sadness in any form.<br>**2.** A predilection for sentimentality. | *"The great unappreciated poet last cited {George Meredith} has defined passion as ‘noble strength on fire’; and this is the true passion of great natures and great poets; while sentimentalism is ignoble weakness dallying with fire; . . ."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[sentimentalist]] | noun | **1.** Someone who indulges in excessive sentimentality. | *"Lawrence isn't a sentimentalist like Jack or Val." Here Jack Bendish got as far as an artless "Oh, I say!" but his wife paid no attention."* — Anthony Pryde, *Nightfall* |
| [[sentimentality]] | noun | **1.** Falsely emotional in a maudlin way.<br>**2.** Extravagant or affected feeling or emotion. | *"The leaders of any group of men, whether of wage workers, merchants, manufacturers, or political constituents, find it necessary to show that the interest of their supporters rather than a broader "sentimentality" is uppermost in their thought."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sentimentalization]] | noun | **1.** The act of indulging in sentiment. | *"In academic literature, sentimentalization designates the act of indulging in sentiment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentimentalize]] | verb | **1.** Look at with sentimentality or turn into an object of sentiment.<br>**2.** Make (someone or something) sentimental or imbue with sentimental qualities. | *"Now, I don't see why I should have been sentimentalizing over myself like that."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[sentimentally]] | adverb | **1.** In a sentimental manner. | *"Being even now only a young woman of twenty, one who mentally and sentimentally had not finished growing, it was impossible that any event should have left upon her an impression that was not in time capable of transmutation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sentimentise]] | verb | **1.** Act in a sentimental way or indulge in sentimental thoughts or expression. | *"In academic literature, sentimentise designates act in a sentimental way or indulge in sentimental thoughts or expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentimentize]] | verb | **1.** Act in a sentimental way or indulge in sentimental thoughts or expression. | *"In academic literature, sentimentize designates act in a sentimental way or indulge in sentimental thoughts or expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentinel]] | noun | **1.** A person employed to keep watch for some anticipated event. | *"One aloof stand sentinel. [_Exeunt Fairies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sentry]] | noun | **1.** A person employed to keep watch for some anticipated event. | *"Enter a Sentry and his company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supersensitised]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, supersensitised designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersensitive]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"But with the self-combating proclivity of the supersensitive, an answer thereto arose in Clare’s own mind, and he almost feared it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[supersensitized]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, supersensitized designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpresentable]] | adjective | **1.** Creating an unfavorable or neutral first impression. | *"In academic literature, unpresentable designates creating an unfavorable or neutral first impression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrepresentative]] | adjective | **1.** Not exemplifying a class. | *"In academic literature, unrepresentative designates not exemplifying a class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unresentful]] | adjective | **1.** Not resentful. | *"She wore it till evening, patient, unresentful, regarding it as a deserved punishment."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unsensational]] | adjective | **1.** Not of such character as to arouse intense interest, curiosity, or emotional reaction. | *"In academic literature, unsensational designates not of such character as to arouse intense interest, curiosity, or emotional reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsent]] | adjective | **1.** Not dispatched or transmitted. | *"In academic literature, unsent designates not dispatched or transmitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsentimental]] | adjective | **1.** Facing facts or difficulties realistically and with determination. | *"In academic literature, unsentimental designates facing facts or difficulties realistically and with determination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsentimentally]] | adverb | **1.** In an unsentimental manner. | *"In academic literature, unsentimentally designates in an unsentimental manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SEN
  </div>
</div>
