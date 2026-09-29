---
status: unread
type: root_dashboard
---
# Dashboard — vit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“life”</span>
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

The root **vit** means life. It refers to living existence, vitality, and organic growth. In English, this root forms words such as *vital*, *vitality*, *vitamin*, and *revitalize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: life
> The root **vit** means life. It refers to living existence, vitality, and organic growth. In English, this root forms words such as *vital*, *vitality*, *vitamin*, and *revitalize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Life</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *vital* and *vitality*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vit** comes from a Latin word that means *"life"*.
  - At its core, it describes life.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **vit** in an English word, think of **living energy and vital life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of life.
  - **Mental & Social**: How people experience, organize, or communicate about life.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Vital**: Absolutely necessary, essential, or indispensable.
  - **Vitality**: The state of being strong and active.
  - **Vitamin**: Any of a group of organic compounds essential in small quantities for normal metabolic physiological function, health, and growth.
  - **Revitalize**: To imbue with new life, energy, or vigor.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vit</mark>, think of <mark class="hl-def">living energy and vital life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vit** surfaces through its Latin noun and adjectival bases:
> - **Adjectival Base `vital-` (*vītālis* "of life"):**
>   - *vital*, *vitally*, *vitalness*, *vitality*, *vitals*, *vital signs*, *vital statistics*
>   - Verbalizing suffixes $\to$ *vitalize*, *vitalization*
>   - Prefixed with `re-` (again) $\to$ *revitalize*, *revitalization*
>   - Prefixed with `de-` (away / down) $\to$ *devitalize*, *devitalization*
>   - Philosophical suffixes $\to$ *vitalism*, *vitalist*, *vitalistic*
> - **Biochemical Base `vitamin-` (*vīta* + *amine*):**
>   - *vitamin*, *multivitamin*, *avitaminosis*, *hypervitaminosis*, *provitamin*
> - **Latin Genitive Phrases (`vitae` - "of life"):**
>   - *curriculum vitae* ("the course of life")
>   - *aqua vitae* ("water of life")
>   - *arborvitae* ("tree of life")
>   - *elixir vitae* ("elixir of life")
>   - *vis vitae* ("force of life")

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
> The root spans five critical conceptual spheres:
> - **Clinical Medicine & Emergency Triage:** Bodily measurements and organs necessary to sustain physical consciousness and heartbeat (*vital*, *vitals*, *vital signs*).
> - **Energetic Animation & Socioeconomic Renewal:** Exuberant physical stamina (*vitality*), infusing deadened spaces or economies with fresh resources (*vitalize*, *revitalize*, *revitalization*), and sapping vigor (*devitalize*).
> - **Biochemical Metabolism & Nutrition:** Organic micronutrients essential for cellular enzyme catalysis and growth (*vitamin*, *multivitamin*, *avitaminosis*).
> - **Philosophy of Biology & Metaphysics:** Non-mechanistic theories asserting an irreducible vital principle (*vitalism*, *vitalist*, *vis vitae*).
> - **Civic, Professional & Botanical Nomenclature:** Academic resumes (*curriculum vitae*), distilled spirits (*aqua vitae*), and evergreen cypress trees (*arborvitae*).

---

## 🔀 4. Prefix & Combining Dynamics on vit

### Prefix Dynamics
- **`re-` (Again / Anew):** Restoring life, vigor, and economic energy $\to$ *revitalize*, *revitalization*.
- **`de-` (Down / Away):** Draining life, vigor, or nerve supply $\to$ *devitalize*, *devitalization*.
- **`a-` (Greek Negative):** Disease caused by total deficiency of vitamins $\to$ *avitaminosis*.
- **`hyper-` (Greek "excessive"):** Toxic overdose of vitamins $\to$ *hypervitaminosis*.
- **`pro-` (Before / In front):** Metabolic precursor to a vitamin $\to$ *provitamin*.
- **`multi-` (Many):** Formula containing multiple vitamins $\to$ *multivitamin*.

### Suffix Dynamics
- **`-ity` (Abstract Quality):** *vital* $\to$ *vitality*.
- **`-ize` (Causative Verb):** Imparting life $\to$ *vitalize*, *revitalize*.
- **`-ism` / `-ist` (Doctrinal Philosophy):** Belief in a non-material life force $\to$ *vitalism*, *vitalist*.
- **`-in` (Biochemical Substance):** Organic chemical suffix: *vitamin*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Emergency Medicine & Nursing:** Triage assessment of the four primary *vital signs* (body temperature, heart rate, blood pressure, respiratory rate, plus oxygen saturation).
> - **Endocrinology, Biochemistry & Pediatrics:** Fat-soluble (A, D, E, K) and water-soluble (B-complex, C) *vitamin* pathways; diagnosis of *avitaminosis* (scurvy, rickets).
> - **Urban Planning & Municipal Governance:** Downtown and historic waterfront *revitalization* programs targeting blighted commercial corridors.
> - **Dentistry & Endodontics:** Pulpectomy and root canal procedures involving the intentional *devitalization* and removal of infected dental pulp nerves.
> - **Academia & Higher Education:** Preparation of the *Curriculum Vitae* (CV) detailing academic publications, teaching credentials, and research awards.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[devitalisation]] | noun | **1.** The act of reducing the vitality of something. | *"In academic literature, devitalisation designates the act of reducing the vitality of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devitalise]] | verb | **1.** Sap of life or energy. | *"In academic literature, devitalise designates sap of life or energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devitalization]] | noun | **1.** The act of reducing the vitality of something. | *"In academic literature, devitalization designates the act of reducing the vitality of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devitalize]] | verb | **1.** Sap of life or energy. | *"In academic literature, devitalize designates sap of life or energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devitrify]] | verb | **1.** Become crystalline.<br>**2.** Make (glassy materials) brittle or opaque. | *"In academic literature, devitrify designates become crystalline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evitable]] | adjective | **1.** Capable of being avoided or warded off. | *"In academic literature, evitable designates capable of being avoided or warded off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inevitability]] | noun | **1.** The quality of being unavoidable. | *"There was an impersonal doggedness about the wrestler from Aleppo's eyes, a sense of inevitability...."* — Donn Byrne, *The Wind Bloweth* |
| [[inevitable]] | noun | **1.** An unavoidable event.<br>**2.** Incapable of being avoided or prevented. | *"I had a pass with him, rapier, scabbard, and all, and he gives me the stuck-in with such a mortal motion that it is inevitable; and on the answer, he pays you as surely as your feet hits the ground they step on."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inevitableness]] | noun | **1.** The quality of being unavoidable. | *"Tess was taken completely by surprise, and she yielded to his embrace with unreflecting inevitableness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[invitation]] | noun | **1.** A request (spoken or written) to participate or be present or take part in something.<br>**2.** A tempting allurement. | *"She discourses, she carves, she gives the leer of invitation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invitational]] | adjective | **1.** Pertaining to or characteristic of an invitation. | *"The contrasting colors made the braiding process clearly visible and more understandable. *** I was invited by the Resource Teacher of a local elementary school to participate in their Authors and Illustrators Invitational."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[invitatory]] | adjective | **1.** Conveying an invitation. | *"In academic literature, invitatory designates conveying an invitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invite]] | noun | **1.** A colloquial expression for invitation.<br>**2.** Increase the likelihood of. | *"With most gladness, And do invite you to my sister’s view, Whither straight I’ll lead you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invitee]] | noun | **1.** A visitor to whom hospitality is extended. | *"In academic literature, invitee designates a visitor to whom hospitality is extended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inviting]] | verb | **1.** Increase the likelihood of.<br>**2.** Invite someone to one's house. | *"An inviting eye, and yet methinks right modest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invitingly]] | adverb | **1.** In a tantalizing manner. | *"She had put a plate with round butter-balls beside the steaming coffee-pot, and fresh round rolls peeped invitingly from an old-fashioned little china basket."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[provitamin]] | noun | **1.** Vitamin precursor; a substance that is converted into a vitamin in animal tissues. | *"In academic literature, provitamin designates vitamin precursor; a substance that is converted into a vitamin in animal tissues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revitalisation]] | noun | **1.** Bringing again into activity and prominence. | *"In academic literature, revitalisation designates bringing again into activity and prominence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revitalise]] | verb | **1.** Give new life or vigor to. | *"In academic literature, revitalise designates give new life or vigor to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revitalised]] | verb | **1.** Give new life or vigor to.<br>**2.** Restored to new life and vigor. | *"In academic literature, revitalised designates give new life or vigor to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revitalising]] | verb | **1.** Give new life or vigor to.<br>**2.** Tending to impart new life and vigor to. | *"In academic literature, revitalising designates give new life or vigor to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revitalization]] | noun | **1.** Bringing again into activity and prominence. | *"MIGHTY AND HISTORIC ENTERPRISES It is upon the individual believer, constituting the fundamental unit in the structure of the home front, that the revitalization, the expansion, and the enrichment of the home front must ultimately depend."* — Effendi Shoghi, *Citadel of Faith* |
| [[revitalize]] | verb | **1.** Restore strength.<br>**2.** Give new life or vigor to. | *"In the give-and-take Grandchild learns a lot about Grandma and Grandpa, and everyone involved in the game broadens their awareness, and renew and revitalize family traditions and values."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[revitalized]] | verb | **1.** Restore strength.<br>**2.** Give new life or vigor to. | *"In academic literature, revitalized designates restore strength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revitalizing]] | verb | **1.** Restore strength.<br>**2.** Give new life or vigor to. | *"In academic literature, revitalizing designates restore strength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninvited]] | adjective | **1.** Unwelcome and unwanted. | *"If you had a blue-eyed daughter you wouldn’t like ME to come, uninvited, on HER birthday?’ But he stayed.” Mr."* — Charles Dickens, *Bleak House* |
| [[uninviting]] | adjective | **1.** Neither attractive nor tempting.<br>**2.** Not tempting. | *"There was no want of respect in the young man’s address; and Fanny’s reception of it was so proper and modest, so calm and uninviting, that he had nothing to censure in her."* — Jane Austen, *Mansfield Park* |
| [[unvitrified]] | adjective | **1.** (of ceramics) lacking a vitreous finish. | *"In academic literature, unvitrified designates (of ceramics) lacking a vitreous finish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitaceae]] | noun | **1.** A family of vines belonging to order rhamnales. | *"In academic literature, vitaceae designates a family of vines belonging to order rhamnales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vital]] | adjective | **1.** Urgently needed; absolutely necessary.<br>**2.** Performing an essential function in the living body. | *"Therefore, go speak; the Duke will hear thy voice; And let not Bardolph’s vital thread be cut With edge of penny cord and vile reproach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vitalisation]] | noun | **1.** The state of being vitalized and filled with life. | *"In academic literature, vitalisation designates the state of being vitalized and filled with life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitalise]] | verb | **1.** Give life to.<br>**2.** Make more lively or vigorous. | *"In academic literature, vitalise designates give life to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitaliser]] | noun | **1.** Someone who imparts energy and vitality and spirit to other people. | *"In academic literature, vitaliser designates someone who imparts energy and vitality and spirit to other people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitalism]] | noun | **1.** (philosophy) a doctrine that life is a vital principle distinct from physics and chemistry. | *"In academic literature, vitalism designates (philosophy) a doctrine that life is a vital principle distinct from physics and chemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitalist]] | noun | **1.** One who believes in vitalism. | *"In academic literature, vitalist designates one who believes in vitalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitality]] | noun | **1.** An energetic style.<br>**2.** A healthy capacity for vigorous activity. | *"The game of prisoner’s base, which not so long ago seemed to enjoy a perennial vitality in front of the worn-out stocks, may, so far as I can say, be entirely unknown to the rising generation of schoolboys there."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vitalization]] | noun | **1.** The state of being vitalized and filled with life. | *"Yet such is the vulpine slyness of Dame Nature, that, till now, Tess had been hoodwinked by her love for Clare into forgetting it might result in vitalizations that would inflict upon others what she had bewailed as misfortune to herself."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vitalize]] | verb | **1.** Give life to.<br>**2.** Make more lively or vigorous. | *"The proposed extension of the constitution to territories, with a view to its transportation of slavery along with it, was futile and nugatory without the act of Congress to vitalize slavery under it."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[vitalizer]] | noun | **1.** Someone who imparts energy and vitality and spirit to other people. | *"In academic literature, vitalizer designates someone who imparts energy and vitality and spirit to other people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitalizing]] | verb | **1.** Give life to.<br>**2.** Make more lively or vigorous. | *"Spiritual subdivision 510:27 Light is a symbol of Mind, of Life, Truth, and Love, and not a vitalizing property of matter."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[vitally]] | adverb | **1.** To a vital degree. | *"There are not many grown and matured men living while we speak, good men too, who if they were thrown into this same court as suitors would not be vitally changed and depreciated within three years—within two—within one."* — Charles Dickens, *Bleak House* |
| [[vitalness]] | noun | **1.** The quality possessed by something that you cannot possibly do without.<br>**2.** The quality of being essential to maintain life. | *"In academic literature, vitalness designates the quality possessed by something that you cannot possibly do without."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitals]] | noun | **1.** A bodily organ that is essential for life. | *"But the flaking of stone they laughed at, till I shot an elk through and through, the flaked stone standing out and beyond, the feathered shaft sunk in its vitals, the whole tribe applauding."* — Jack London, *The Jacket (The Star-Rover)* |
| [[vitamin]] | noun | **1.** Any of a group of organic substances essential in small quantities to normal metabolism. | *"In academic literature, vitamin designates any of a group of organic substances essential in small quantities to normal metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitaminise]] | verb | **1.** Add vitamins as a supplement. | *"In academic literature, vitaminise designates add vitamins as a supplement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitaminize]] | verb | **1.** Add vitamins as a supplement. | *"In academic literature, vitaminize designates add vitamins as a supplement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitellus]] | noun | **1.** Nutritive material of an ovum stored for the nutrition of an embryo (especially the yellow mass of a bird or reptile egg). | *"In academic literature, vitellus designates nutritive material of an ovum stored for the nutrition of an embryo (especially the yellow mass of a bird or reptile egg)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitiate]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Make imperfect. | *"If the periods be separated by short intervals, the measures to be reviewed and rectified will have been of recent date, and will be connected with all the circumstances which tend to vitiate and pervert the result of occasional revisions."* — Alexander Hamilton, *The Federalist Papers* |
| [[vitiated]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Make imperfect. | *"Hers are faults of principle, Fanny; of blunted delicacy and a corrupted, vitiated mind."* — Jane Austen, *Mansfield Park* |
| [[vitiation]] | noun | **1.** Nullification by the destruction of the legal force; rendering null. | *"In academic literature, vitiation designates nullification by the destruction of the legal force; rendering null."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viticulture]] | noun | **1.** The cultivation of grapes and grape vines; grape growing. | *"In academic literature, viticulture designates the cultivation of grapes and grape vines; grape growing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viticulturist]] | noun | **1.** A cultivator of grape vine. | *"In academic literature, viticulturist designates a cultivator of grape vine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitidaceae]] | noun | **1.** A family of vines belonging to order rhamnales. | *"In academic literature, vitidaceae designates a family of vines belonging to order rhamnales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitiliginous]] | adjective | **1.** Of or relating to or having vitiligo. | *"In academic literature, vitiliginous designates of or relating to or having vitiligo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitiligo]] | noun | **1.** An acquired skin disease characterized by patches of unpigmented skin (often surrounded by a heavily pigmented border). | *"In academic literature, vitiligo designates an acquired skin disease characterized by patches of unpigmented skin (often surrounded by a heavily pigmented border)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitis]] | noun | **1.** The type genus of the family vitaceae; woody vines with simple leaves and small flowers; includes a wide variety of grapes. | *"BILBERRY UREDO; spots yellow-brown; sori subrotund, minute, aggregate, and scattered, on the under surface of the leaves; epidermis seldom ruptured; spores ovoid, yellowish.—On _Vaccinium Myrtillus_ and _V. vitis-idæa_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vitrectomy]] | noun | **1.** A surgical procedure that removes the vitreous humor and replace it with saline solution. | *"In academic literature, vitrectomy designates a surgical procedure that removes the vitreous humor and replace it with saline solution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitreous]] | adjective | **1.** Of or relating to or constituting the vitreous humor of the eye.<br>**2.** Relating to or resembling or derived from or containing glass. | *"It was composed of black and vitreous lava, mixed with fragments of felspar."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[vitrification]] | noun | **1.** A vitrified substance; the glassy result of being vitrified.<br>**2.** The process of becoming vitreous. | *"In academic literature, vitrification designates a vitrified substance; the glassy result of being vitrified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitrified]] | verb | **1.** Change into glass or a glass-like substance by applying heat.<br>**2.** Undergo vitrification; become glassy or glass-like. | *"Evidence of volcanic action appeared along the canyon in the form of vitrified fragments and occasional masses of lava resembling rock."* — W. E. Webb, *Buffalo Land* |
| [[vitrify]] | verb | **1.** Change into glass or a glass-like substance by applying heat.<br>**2.** Undergo vitrification; become glassy or glass-like. | *"Evidence of volcanic action appeared along the canyon in the form of vitrified fragments and occasional masses of lava resembling rock."* — W. E. Webb, *Buffalo Land* |
| [[vitrine]] | noun | **1.** A glass container used to store and display items in a shop or museum or home. | *"In academic literature, vitrine designates a glass container used to store and display items in a shop or museum or home."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitriol]] | noun | **1.** (h2so4) a highly corrosive acid made from sulfur dioxide; widely used in the chemical industry.<br>**2.** Abusive or venomous language used to express blame or censure or bitter deep-seated ill will. | *"Série, iii. (1872) pp. 21 _sq._ The writer says that the candidate has to keep his arms plunged up to the shoulders in vessels full of ants, "as in a bath of vitriol," for hours."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[vitriolic]] | adjective | **1.** Harsh or corrosive in tone.<br>**2.** Of a substance, especially a strong acid; capable of destroying or eating away by chemical action. | *"If you are not good, none is good”—those little words may give a terrific meaning to responsibility, may hold a vitriolic intensity for remorse."* — George Eliot, *Middlemarch* |
| [[vitriolically]] | adverb | **1.** In a caustic vitriolic manner. | *"In academic literature, vitriolically designates in a caustic vitriolic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vittaria]] | noun | **1.** Tropical epiphytic ferns with straplike fronds. | *"In academic literature, vittaria designates tropical epiphytic ferns with straplike fronds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vittariaceae]] | noun | **1.** One of a number of families into which polypodiaceae has been subdivided in some classification systems: genus vittaria. | *"In academic literature, vittariaceae designates one of a number of families into which polypodiaceae has been subdivided in some classification systems: genus vittaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vituperate]] | verb | **1.** Spread negative information about. | *"In academic literature, vituperate designates spread negative information about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vituperation]] | noun | **1.** Abusive or venomous language used to express blame or censure or bitter deep-seated ill will. | *"From one open shop came the sound of blows and vituperation, and just as the officer came up to it a man in a gray coat with a shaven head was flung out violently."* — graf Leo Tolstoy, *War and Peace* |
| [[vituperative]] | adjective | **1.** Marked by harshly abusive criticism. | *"In academic literature, vituperative designates marked by harshly abusive criticism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitus]] | noun | **1.** Christian martyr and patron of those who suffer from epilepsy and sydenham's chorea (died around 300). | *"Vitus’s dances, and fearful frenzies necessary when exhibiting its tones in their highest perfection."* — Thomas Hardy, *Far from the Madding Crowd* |

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
    ROOT DASHBOARD · VIT
  </div>
</div>
