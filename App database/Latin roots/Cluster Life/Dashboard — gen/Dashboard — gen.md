---
status: unread
type: root_dashboard
---
# Dashboard — gen
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">gen-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“beget, produce, or birth”</span>
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

The root **gen** means beget, produce, or birth. It refers to giving birth, producing offspring, or originating a family kind. In English, this root forms words such as *generate*, *generation*, *general*, and *genius*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: beget, produce, or birth
> The root **gen** means beget, produce, or birth. It refers to giving birth, producing offspring, or originating a family kind. In English, this root forms words such as *generate*, *generation*, *general*, and *genius*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Beget, produce, or birth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *generate* and *generation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gen** comes from a Latin word that means *"beget, produce, or birth"*.
  - At its core, it describes beget, produce, or birth.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **gen** in an English word, think of **living energy and vital life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of beget, produce, or birth.
  - **Mental & Social**: How people experience, organize, or communicate about beget, produce, or birth.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Generate**: To bring into existence.
  - **Generation**: All people born and living at about the same time.
  - **General**: Affecting or concerning all or most people or things.
  - **Genius**: Exceptional intellectual or creative power.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gen</mark>, think of <mark class="hl-def">living energy and vital life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root manifests across several Latin morphological stems and international scientific compounds:
> - **Nominal Consonant Stem `gener-` (*genus*, genitive *generis*):**
>   - *general*, *generality*, *generalize*, *generic*, *generous*, *generosity*, *degenerate*, *degeneration*, *sui generis*
> - **Verbal Stem `generāt-` (*generāre*, *generātus*):**
>   - *generate*, *generation*, *generator*, *generative*, *regenerate*, *regeneration*, *engender*
> - **Suppletive / Reduplicated Root `genit-` (*gignere*, *genitum* "to beget"):**
>   - *congenital*, *progenitor*, *progeny*, *primogeniture*, *genital*, *genitalia*, *genitive*
> - **Inborn / Innate Stem `geni-` (*genius*, *ingenium*):**
>   - *genius*, *genial*, *geniality*, *ingenious*, *ingenuity*, *ingenuous*, *disingenuous*
> - **Clan / Social Stratification Stem `gent-` (*gentilis*, *gens*):**
>   - *gentle*, *gentleman*, *gentry*, *genteel*, *gentile*
> - **Romance Vernacular Reductions (`gendr-`, `genr-`):**
>   - *gender*, *genre*
> - **Greco-Latin International Scientific Combining Form `-gen` / `genō-`:**
>   - *gene*, *genetic*, *genome*, *genealogy*, *genesis*, *genocide*, *antigen*, *pathogen*, *carcinogen*, *hydrogen*, *oxygen*, *homogeneous*, *heterogeneous*, *indigenous*

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
> The root spans five vast conceptual territories:
> - **Heredity, Biological Descent & Reproduction:** Physical offspring (*progeny*), ancestors (*progenitor*), conditions present at birth (*congenital*), reproductive anatomy (*genital*, *genitalia*), and the inheritance rights of the firstborn (*primogeniture*).
> - **Taxonomy, Logic & Broad Categorization:** The biological rank above species (*genus*), broad applications across entire classes (*general*, *generalize*), unbranded or class-wide products (*generic*), unique unclassifiable phenomena (*sui generis*), artistic classifications (*genre*), and grammatical/social categories (*gender*).
> - **Social Nobility, Courtly Courtesy & Ethics:** Magnanimity and readiness to give (*generous*, *generosity*), refined, mild behavior derived from noble blood (*gentle*, *gentleman*, *gentry*, *genteel*), and non-Jewish peoples (*gentile*).
> - **Innate Intellect, Inventiveness & Candor:** Extraordinary creative and intellectual power (*genius*), warmth of character (*genial*), inventive resourcefulness (*ingenious*, *ingenuity*), and frank, guileless innocence (*ingenuous* vs. *disingenuous*).
> - **Physical, Chemical & Technological Production:** Producing energy or output (*generate*, *generator*, *generative*), rebuilding damaged tissue (*regenerate*), producing disease or immune response (*pathogen*, *antigen*), and elementary gas producers (*hydrogen*, *oxygen*).

---

## 🔀 4. Prefix & Combining Dynamics on gen

### Prefix Dynamics (Directional & Evaluative Shifts)
- **`con-` (Together / With):** Born along with an individual from birth $\to$ *congenital*; of the same kind $\to$ *congener*.
- **`de-` (Down / Away from):** Falling away from the noble standard of one's kind $\to$ *degenerate*, *degeneration*.
- **`in-` (In / Within):** Implanting into being $\to$ *engender*; born from within $\to$ *indigenous*, *ingenious*, *ingenuous*.
- **`pro-` (Forth / Forward):** Begetting forward into time $\to$ *progeny*, *progenitor*.
- **`re-` (Again / Anew):** Producing or renewing again $\to$ *regenerate*, *regeneration*.
- **`primo-` (First):** The legal status of being the first born $\to$ *primogeniture*.
- **`misce-` (Mixed):** Intermixing of different lineages or races $\to$ *miscegenation*.

### Combining Forms (Greco-Latin Hybrids)
- **`anti-` + `-gen`:** Substance generating antibodies $\to$ *antigen*.
- **`patho-` + `-gen`:** Agent producing disease $\to$ *pathogen*.
- **`carcino-` + `-gen`:** Agent producing cancer $\to$ *carcinogen*.
- **`hydro-` + `-gen`:** Element that generates water $\to$ *hydrogen*.
- **`oxy-` + `-gen`:** Element formerly thought to generate all acids $\to$ *oxygen*.
- **`homo-` / `hetero-` + `-genous`:** Of the same kind vs. different kinds $\to$ *homogeneous*, *heterogeneous*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Genetics, Genomics & Molecular Biology:** The discovery of DNA structure, genetic coding, CRISPR gene-editing, cellular regeneration, and oncogenic mutation.
> - **Immunology & Medical Microbiology:** Diagnostic antibody testing based on antigen-antibody binding affinity; prevention of viral and bacterial pathogen transmission.
> - **Linnaean Taxonomy & Evolutionary Biology:** The hierarchy of biological classification (*Kingdom, Phylum, Class, Order, Family, Genus, Species*); phylogenetics and cladistics.
> - **Feudal Property Law & Constitutional History:** The English common-law doctrine of *primogeniture*, entailing estates to preserve noble family dynasties; the Roman law category of *sui generis*.
> - **Linguistics, Rhetoric & Artificial Intelligence:** Generative grammar (Noam Chomsky's deep structure); Generative Artificial Intelligence (LLMs producing text, image, and code); literary genre theory.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antigen]] | noun | **1.** Any substance (as a toxin or enzyme) that stimulates an immune response in the body (especially the production of antibodies). | *"In academic literature, antigen designates any substance (as a toxin or enzyme) that stimulates an immune response in the body (especially the production of antibodies)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antigenic]] | adjective | **1.** Of or relating to antigens. | *"In academic literature, antigenic designates of or relating to antigens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argent]] | noun | **1.** A metal tincture used in heraldry to give a silvery appearance.<br>**2.** Of lustrous grey; covered with or tinged with the color of silver. | *"But it is so worn that mother uses it to stir the pea-soup.” “A castle argent is certainly my crest,” said he blandly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[argentic]] | adjective | **1.** Relating to compounds in which silver is bivalent. | *"In academic literature, argentic designates relating to compounds in which silver is bivalent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentiferous]] | adjective | **1.** Containing or yielding silver. | *"In academic literature, argentiferous designates containing or yielding silver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentina]] | noun | **1.** A republic in southern south america; second largest country in south america.<br>**2.** Type genus of the argentinidae: argentines. | *"Russia, Argentina, and Australia have rapidly taken the place of America in supplying food to Western Europe, in part, no doubt, because we refused to take Europe's goods in trade."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[argentine]] | noun | **1.** Any of various small silver-scaled salmon-like marine fishes.<br>**2.** Of or relating to or characteristic of argentina or its people. | *"Celestial Dian, goddess argentine, I will obey thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[argentinian]] | noun | **1.** A native or inhabitant of argentina.<br>**2.** Of or relating to or characteristic of argentina or its people. | *"In academic literature, argentinian designates a native or inhabitant of argentina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentinidae]] | noun | **1.** Small marine soft-finned fishes with long silvery bodies; related to salmons and trouts. | *"In academic literature, argentinidae designates small marine soft-finned fishes with long silvery bodies; related to salmons and trouts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentinosaur]] | noun | **1.** Huge herbivorous dinosaur of cretaceous found in argentina. | *"In academic literature, argentinosaur designates huge herbivorous dinosaur of cretaceous found in argentina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentite]] | noun | **1.** A valuable silver ore consisting of silver sulfide (ag2s). | *"In academic literature, argentite designates a valuable silver ore consisting of silver sulfide (ag2s)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentous]] | adjective | **1.** Relating to compounds in which silver is univalent. | *"In academic literature, argentous designates relating to compounds in which silver is univalent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cogency]] | noun | **1.** Persuasive relevance.<br>**2.** The quality of being valid and rigorous. | *"And yet if we compare it with Burke, or with the great Greek exemplar of all those who would give speech the cogency of act,--we see at once the causes of its practical failure."* — F. W. H. Myers, *Wordsworth* |
| [[cogent]] | adjective | **1.** Powerfully persuasive. | *"But the last term of the definition is still more cogent, as coupled with the first."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[congenator]] | noun | **1.** An animal or plant that bears a relationship to another (as related by common descent or by membership in the same genus). | *"In academic literature, congenator designates an animal or plant that bears a relationship to another (as related by common descent or by membership in the same genus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congener]] | noun | **1.** A minor chemical constituent that gives a wine or liquor its distinctive character.<br>**2.** An animal or plant that bears a relationship to another (as related by common descent or by membership in the same genus). | *"The plants infested with this parasite are first attacked in the leaves, but afterwards the roots become spotted and diseased in a similar manner to the potatoes attacked by its congener."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[congeneric]] | noun | **1.** An animal or plant that bears a relationship to another (as related by common descent or by membership in the same genus).<br>**2.** Belonging to the same genus. | *"In academic literature, congeneric designates an animal or plant that bears a relationship to another (as related by common descent or by membership in the same genus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congenerical]] | adjective | **1.** Belonging to the same genus. | *"In academic literature, congenerical designates belonging to the same genus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congenerous]] | adjective | **1.** Belonging to the same genus. | *"In academic literature, congenerous designates belonging to the same genus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congenial]] | adjective | **1.** Suitable to your needs; ; - t.l.peacock.<br>**2.** (used of plants) capable of cross-fertilization or of being grafted. | *"At a short distance, we passed the young man and the dog, in congenial company."* — Charles Dickens, *Bleak House* |
| [[congeniality]] | noun | **1.** Compatibility between persons.<br>**2.** A congenial disposition. | *"There was a reviving pleasure in this intercourse, of a kind now tasted by me for the first time—the pleasure arising from perfect congeniality of tastes, sentiments, and principles."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[congenially]] | adverb | **1.** In a congenial manner. | *"Guppy saunters along with it congenially."* — Charles Dickens, *Bleak House* |
| [[congenialness]] | noun | **1.** Compatibility between persons. | *"In academic literature, congenialness designates compatibility between persons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[congenital]] | adjective | **1.** Present at birth but not necessarily hereditary; acquired during fetal development. | *"And it may not, therefore, be amiss to consider whether it was conditioned by anything beyond his congenital nature."* — Francis Thompson, *Shelley: An Essay* |
| [[degeneracy]] | noun | **1.** The state of being degenerate in mental or moral qualities.<br>**2.** Moral perversion; impairment of virtue and moral principles. | *"Some of that twice-blessed mercy was always with Lydgate in his work at the Hospital or in private houses, serving better than any opiate to quiet and sustain him under his anxieties and his sense of mental degeneracy."* — George Eliot, *Middlemarch* |
| [[degenerate]] | noun | **1.** A person whose behavior deviates from what is acceptable especially in sexual behavior.<br>**2.** Grow worse. | *"Thou that art like enough, through vassal fear, Base inclination, and the start of spleen, To fight against me under Percy’s pay, To dog his heels, and curtsy at his frowns, To show how much thou art degenerate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[degeneration]] | noun | **1.** The process of declining from a higher to a lower level of effective power or vitality or essential quality.<br>**2.** The state of being degenerate in mental or moral qualities. | *"In the economic realm, as is now seen to be the case in the biologic realm, competition of some effective kind is an indispensable condition not only of progress but of life without degeneration."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[degenerative]] | adjective | **1.** (of illness) marked by gradual deterioration of organs and cells along with loss of function. | *"In academic literature, degenerative designates (of illness) marked by gradual deterioration of organs and cells along with loss of function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deoxygenate]] | verb | **1.** Remove oxygen from (water). | *"In academic literature, deoxygenate designates remove oxygen from (water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digenesis]] | noun | **1.** Alternation of sexual and asexual generations. | *"In academic literature, digenesis designates alternation of sexual and asexual generations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disingenuous]] | adjective | **1.** Not straightforward or candid; giving a false appearance of frankness; - david cannadine. | *"Mr Elliot is evidently a disingenuous, artificial, worldly man, who has never had any better principle to guide him than selfishness.” But Mr Elliot was not done with."* — Jane Austen, *Persuasion* |
| [[disingenuously]] | adverb | **1.** In a disingenuous manner. | *"In academic literature, disingenuously designates in a disingenuous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disingenuousness]] | noun | **1.** The quality of being disingenuous and lacking candor. | *"In academic literature, disingenuousness designates the quality of being disingenuous and lacking candor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[engender]] | verb | **1.** Call forth.<br>**2.** Make children. | *"Ah, dear, if I be so, From my cold heart let heaven engender hail And poison it in the source, and the first stone Drop in my neck; as it determines, so Dissolve my life!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gen]] | noun | **1.** Informal term for information. | *"I shouldn’t be expected there, if I did; the beadle’s too gen-teel for me."* — Charles Dickens, *Bleak House* |
| [[gender]] | noun | **1.** A grammatical category in inflected languages governing the agreement between nouns and pronouns and adjectives; in some languages it is quite arbitrary but in indo-european languages it is usually based on sex or animateness.<br>**2.** The properties that distinguish organisms on the basis of their reproductive roles. | *"And thou treble-dated crow, That thy sable gender mak’st With the breath thou giv’st and tak’st, ’Mongst our mourners shalt thou go."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gene]] | noun | **1.** (genetics) a segment of dna that is involved in producing a polypeptide chain; it can include regions preceding and following the coding dna as well as introns between the exons; it is considered a unit of heredity. | *"In academic literature, gene designates (genetics) a segment of dna that is involved in producing a polypeptide chain; it can include regions preceding and following the coding dna as well as introns between the exons; it is considered a unit of heredity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gene-splicing]] | noun | **1.** The technology of preparing recombinant dna in vitro by cutting up dna molecules and splicing together fragments from more than one organism. | *"In academic literature, gene-splicing designates the technology of preparing recombinant dna in vitro by cutting up dna molecules and splicing together fragments from more than one organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genealogic]] | adjective | **1.** Of or relating to genealogy. | *"In academic literature, genealogic designates of or relating to genealogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genealogical]] | adjective | **1.** Of or relating to genealogy. | *"Prince Andrew, looking again at that genealogical tree, shook his head, laughing as a man laughs who looks at a portrait so characteristic of the original as to be amusing."* — graf Leo Tolstoy, *War and Peace* |
| [[genealogically]] | adverb | **1.** In a genealogical manner. | *"In academic literature, genealogically designates in a genealogical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genealogist]] | noun | **1.** An expert in genealogy. | *"Oh—nothing, nothing; except chasten yourself with the thought of ‘how are the mighty fallen.’ It is a fact of some interest to the local historian and genealogist, nothing more."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[genealogy]] | noun | **1.** Successive generations of kin.<br>**2.** The study or investigation of ancestry and family history. | *"They appear now as brothers, now as parents, now as sisters of one another; the task of unravelling their genealogy would be as difficult as it is pointless."* — Sydney Waterlow, *Shelley* |
| [[general]] | noun | **1.** A general officer of the highest rank.<br>**2.** The head of a religious order or congregation. | *"And every humour hath his adjunct pleasure, Wherein it finds a joy above the rest, But these particulars are not my measure, All these I better in one general best."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[general-purpose]] | adjective | **1.** Not limited in use or function. | *"In academic literature, general-purpose designates not limited in use or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalcy]] | noun | **1.** The office and authority of a general. | *"In academic literature, generalcy designates the office and authority of a general."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalisation]] | noun | **1.** An idea or conclusion having general application.<br>**2.** The process of formulating general concepts by abstracting common properties of instances. | *"In academic literature, generalisation designates an idea or conclusion having general application."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalise]] | verb | **1.** Speak or write in generalities.<br>**2.** Draw from specific cases for more general cases. | *"As I am now generalising a period of my life with the object of clearing my way before me, I can scarcely do so better than by at once completing the description of our usual manners and customs at Barnard’s Inn."* — Charles Dickens, *Great Expectations* |
| [[generalised]] | verb | **1.** Speak or write in generalities.<br>**2.** Draw from specific cases for more general cases. | *"In academic literature, generalised designates speak or write in generalities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalissimo]] | noun | **1.** The officer who holds the supreme command. | *"In academic literature, generalissimo designates the officer who holds the supreme command."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalist]] | noun | **1.** A modern scholar who is in a position to acquire more than superficial knowledge about many different interests. | *"In academic literature, generalist designates a modern scholar who is in a position to acquire more than superficial knowledge about many different interests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generality]] | noun | **1.** An idea or conclusion having general application.<br>**2.** The quality of being general or widespread or having general applicability. | *"Sometimes we emerged upon a wider thoroughfare or came to a larger building than the generality, well lighted."* — Charles Dickens, *Bleak House* |
| [[generalization]] | noun | **1.** Reasoning from detailed facts to general principles.<br>**2.** An idea or conclusion having general application. | *"Being thus assignable to no breed, he was the ideal embodiment of canine greatness—a generalization from what was common to all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[generalize]] | verb | **1.** Draw from specific cases for more general cases.<br>**2.** Speak or write in generalities. | *"A man just can't generalize the creatures."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[generalized]] | verb | **1.** Draw from specific cases for more general cases.<br>**2.** Speak or write in generalities. | *"More often, however, he would uncover a society in which there was little of the generalized style that characterizes even the most personal formal poetry of the period."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[generally]] | adverb | **1.** Usually; as a rule.<br>**2.** Without distinction of one from others. | *"He that so generally is at all times good, must of necessity hold his virtue to you, whose worthiness would stir it up where it wanted, rather than lack it where there is such abundance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[generalship]] | noun | **1.** The leadership ability of a military general.<br>**2.** The office and authority of a general. | *"It is a great triumph of skill to gain the former, but still greater proof of generalship to maintain possession of the latter, for the man must battle for his fortress at every door and window."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[generate]] | verb | **1.** Bring into existence.<br>**2.** Give or supply. | *"Take the options into account and assume that Slingshot will succeed on schedule and will generate sufficient refined matter over time to meet the needs of both Regions."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[generation]] | noun | **1.** All the people living at the same time or of approximately the same age.<br>**2.** Group of genetically related organisms constituting a single step in the line of descent. | *"And though we here fall down, We have supplies to second our attempt: If they miscarry, theirs shall second them; And so success of mischief shall be born, And heir from heir shall hold this quarrel up Whiles England shall have generation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[generational]] | adjective | **1.** Of or relating to a generation. | *"Tradition supports the family's sense of generational continuity."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[generative]] | adjective | **1.** Having the ability to produce or originate.<br>**2.** Producing new life or offspring. | *"If the crops did not answer to the expectation of the husbandman, this would be attributed to some failure in the generative powers of the god whose function it was to produce the fruits of the earth."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[generator]] | noun | **1.** An apparatus that produces a vapor or gas.<br>**2.** Engine that converts mechanical energy into electrical energy by electromagnetic induction. | *"Your number one job is to build, harmonize, test and whatever else it takes to create a communications interference generator."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[generic]] | noun | **1.** A wine that is a blend of several varieties of grapes with no one grape predominating; a wine that does not carry the name of any specific grape.<br>**2.** Any product that can be sold without a brand name. | *"In the fishery, they usually go by the generic name of Gay-Headers."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[generically]] | adverb | **1.** Without a trademark or brand name.<br>**2.** As sharing a common genus. | *"Generically man is one, and specifically man means all men."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[generosity]] | noun | **1.** The trait of being willing to give your money or time.<br>**2.** Acting generously. | *"Naturalness, generosity, and forbearance are shown throughout not by precept but by example."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[generous]] | adjective | **1.** Willing to give and share unstintingly.<br>**2.** Not petty in character and mind. | *"Costly thy habit as thy purse can buy, But not express’d in fancy; rich, not gaudy: For the apparel oft proclaims the man; And they in France of the best rank and station Are of a most select and generous chief in that."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[generously]] | adverb | **1.** In a generous manner. | *"The heir presumptive, the very William Walter Elliot, Esq., whose rights had been so generously supported by her father, had disappointed her."* — Jane Austen, *Persuasion* |
| [[generousness]] | noun | **1.** The trait of being willing to give your money or time. | *"In academic literature, generousness designates the trait of being willing to give your money or time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genesis]] | noun | **1.** A coming into being.<br>**2.** The first book of the old testament: tells of creation; adam and eve; the fall of man; cain and abel; noah and the flood; god's covenant with abraham; abraham and isaac; jacob and esau; joseph and his brothers. | *"A doggerel parody on _John Gilpin_, entitled "The Diverting History of John Cairns," in which a highly coloured account is given of the supposed genesis of the pamphlet, was written and found wide circulation."* — John Cairns, *Principal Cairns* |
| [[genet]] | noun | **1.** French diplomat who in 1793 tried to draw the united states into the war between france and england (1763-1834).<br>**2.** French writer of novels and dramas for the theater of the absurd (1910-1986). | *"Soon after the inauguration Citizen Genet, an envoy from the French republic, arrived and sought to excite the sympathy of the United States and involve it in a war with Great Britain."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[genetic]] | adjective | **1.** Occurring among members of a family usually by heredity.<br>**2.** Of or relating to or produced by or being a gene. | *"Mark him as a newly arrived renegade, a killer and genetic flake dangerous to Coldfield's safety."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[genetical]] | adjective | **1.** Of or relating to or produced by or being a gene.<br>**2.** Of or relating to the science of genetics. | *"In academic literature, genetical designates of or relating to or produced by or being a gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genetically]] | adverb | **1.** By genetic mechanisms. | *"In academic literature, genetically designates by genetic mechanisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geneticism]] | noun | **1.** The belief that all human characteristics are determined genetically. | *"In academic literature, geneticism designates the belief that all human characteristics are determined genetically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geneticist]] | noun | **1.** A biologist who specializes in genetics. | *"In academic literature, geneticist designates a biologist who specializes in genetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genetics]] | noun | **1.** The branch of biology that studies heredity and variation in organisms. | *"In academic literature, genetics designates the branch of biology that studies heredity and variation in organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genetta]] | noun | **1.** Genets. | *"Classical and authoritative lexicons catalog genetta as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geneva]] | noun | **1.** A city in southwestern switzerland at the western end of lake geneva; it is the headquarters of various international organizations.<br>**2.** Gin made in the netherlands. | *"This was never penn'd at _Geneva_, the Note's too sprightly."* — John Fletcher, *The Elder Brother* |
| [[genevan]] | noun | **1.** A native or resident of geneva.<br>**2.** An adherent of the theological doctrines of john calvin. | *"No Genevan gown lends its grace to his figure, but coatless he stands, an earnest man, physically fearless, powerful in the love for God and man."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[geneve]] | noun | **1.** A city in southwestern switzerland at the western end of lake geneva; it is the headquarters of various international organizations. | *"In academic literature, geneve designates a city in southwestern switzerland at the western end of lake geneva; it is the headquarters of various international organizations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genial]] | adjective | **1.** Diffusing warmth and friendliness.<br>**2.** Of or relating to the chin or median part of the lower jaw. | *"And what with his fine hilarious manner and his engaging candour and his genial way of lightly tossing his own weaknesses about, as if he had said, “I am a child, you know!"* — Charles Dickens, *Bleak House* |
| [[geniality]] | noun | **1.** A disposition to be friendly and approachable (easy to talk to). | *"Bernard's fluent geniality struck him as too good to be true--it was not in Bernard's line: and why translate a close friendship into "meeting once or twice"?"* — Anthony Pryde, *Nightfall* |
| [[genially]] | adverb | **1.** In an affable manner. | *"Then kindness requires that I shouldn’t go near them—and I won’t.” He finished by genially kissing my hand and thanking me."* — Charles Dickens, *Bleak House* |
| [[genic]] | adjective | **1.** Of or relating to or produced by or being a gene. | *"In academic literature, genic designates of or relating to or produced by or being a gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geniculate]] | adjective | **1.** Bent at a sharp angle. | *"In academic literature, geniculate designates bent at a sharp angle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genie]] | noun | **1.** (islam) an invisible spirit mentioned in the koran and believed by muslims to inhabit the earth and influence mankind by appearing in the form of humans or animals. | *"Squod, like a genie, catches him up, chair and all, and deposits him on the hearth-stone."* — Charles Dickens, *Bleak House* |
| [[genip]] | noun | **1.** Tropical american tree bearing a small edible fruit with green leathery skin and sweet juicy translucent pulp.<br>**2.** Round one-inch caribbean fruit with green leathery skin and sweet juicy translucent pulp; eaten like grapes. | *"In academic literature, genip designates tropical american tree bearing a small edible fruit with green leathery skin and sweet juicy translucent pulp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genipa]] | noun | **1.** Any tree of the genus genipa bearing yellow flowers and edible fruit with a thick rind. | *"In academic literature, genipa designates any tree of the genus genipa bearing yellow flowers and edible fruit with a thick rind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genipap]] | noun | **1.** A succulent orange-sized tropical fruit with a thick rind. | *"In academic literature, genipap designates a succulent orange-sized tropical fruit with a thick rind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genista]] | noun | **1.** Chiefly deciduous shrubs or small trees of mediterranean area and western asia: broom. | *"In academic literature, genista designates chiefly deciduous shrubs or small trees of mediterranean area and western asia: broom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genital]] | adjective | **1.** Of or relating to the external sex organs. | *"The mother lies down on her back in the thick grass near the house and places a flower of the plantain between her legs; then her husband comes and knocks the flower away with his genital member."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[genitalia]] | noun | **1.** External sex organ. | *"In academic literature, genitalia designates external sex organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genitals]] | noun | **1.** External sex organ. | *"Some confirmation of this conjecture is furnished by the savage story that the mother of Attis conceived by putting in her bosom a pomegranate sprung from the severed genitals of a man-monster named Agdestis, a sort of double of Attis."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[genitive]] | noun | **1.** The case expressing ownership.<br>**2.** Serving to express or indicate possession. | *"What is your genitive case plural, William?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[genitor]] | noun | **1.** A natural father or mother. | *"In academic literature, genitor designates a natural father or mother."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genitourinary]] | adjective | **1.** Of or related to the genital and urinary organs or their functions. | *"In academic literature, genitourinary designates of or related to the genital and urinary organs or their functions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genius]] | noun | **1.** Someone who has exceptional intellectual ability and originality.<br>**2.** Unusual mental ability. | *"One of these men is _genius_ to the other; And so of these, which is the natural man, And which the spirit?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[genlisea]] | noun | **1.** Rootless carnivorous swamp plants having at the base of the stem a rosette of foliage and leaves consisting of slender tubes swollen in the middle to form traps; each tube passes into two long spirally twisted arms with stiff hairs. | *"In academic literature, genlisea designates rootless carnivorous swamp plants having at the base of the stem a rosette of foliage and leaves consisting of slender tubes swollen in the middle to form traps; each tube passes into two long spirally twisted arms with stiff hairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genoa]] | noun | **1.** A seaport in northwestern italy; provincial capital of liguria. | *"How now, Tubal, what news from Genoa?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[genocide]] | noun | **1.** Systematic killing of a racial or cultural group. | *"That would be genocide, the one thing that every race fears more than anything else."* — Randall Garrett, *Deadly decoy* |
| [[genoese]] | noun | **1.** A native or resident of genoa.<br>**2.** Of or relating to or characteristic of genoa or its inhabitants. | *"Here were Italians, Genoese, Neapolitans, Livonians, droll, vivacious, vindictive."* — Donn Byrne, *The Wind Bloweth* |
| [[genoise]] | noun | **1.** Rich and delicate italian sponge cake. | *"In academic literature, genoise designates rich and delicate italian sponge cake."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genome]] | noun | **1.** The ordering of genes in a haploid set of chromosomes of a particular organism; the full dna sequence of an organism. | *"In academic literature, genome designates the ordering of genes in a haploid set of chromosomes of a particular organism; the full dna sequence of an organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genomics]] | noun | **1.** The branch of genetics that studies organisms in terms of their genomes (their full dna sequences). | *"In academic literature, genomics designates the branch of genetics that studies organisms in terms of their genomes (their full dna sequences)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genotype]] | noun | **1.** A group of organisms sharing a specific genetic constitution.<br>**2.** The particular alleles at specified loci present in an organism. | *"In academic literature, genotype designates a group of organisms sharing a specific genetic constitution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genotypic]] | adjective | **1.** Of or relating to or constituting a genotype. | *"In academic literature, genotypic designates of or relating to or constituting a genotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genotypical]] | adjective | **1.** Of or relating to or constituting a genotype. | *"In academic literature, genotypical designates of or relating to or constituting a genotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genova]] | noun | **1.** A seaport in northwestern italy; provincial capital of liguria. | *"In academic literature, genova designates a seaport in northwestern italy; provincial capital of liguria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genovese]] | adjective | **1.** Of or relating to or characteristic of genoa or its inhabitants. | *"In academic literature, genovese designates of or relating to or characteristic of genoa or its inhabitants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genre]] | noun | **1.** A kind of literary or artistic work.<br>**2.** A style of expressing yourself in writing. | *"We are given, as it were, a wide landscape instead of a detailed genre picture."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[gens]] | noun | **1.** Family based on male descent.<br>**2.** Informal term for information. | *"Our sacks shall be a mean to sack the city, And we be lords and rulers over Rouen; Therefore we’ll knock. [_Knocks._] WATCH. [_Within_.] _Qui est la?_ PUCELLE. _Paysans, la pauvres gens de France:_ Poor market folks that come to sell their corn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[genseric]] | noun | **1.** King of the vandals who seized roman lands and invaded north africa and sacked rome (428-477). | *"In academic literature, genseric designates king of the vandals who seized roman lands and invaded north africa and sacked rome (428-477)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gent]] | noun | **1.** Informal abbreviation of `gentleman'.<br>**2.** A boy or man. | *"I had thought I had been a younger Brother, a poor Gent."* — John Fletcher, *Beaumont and Fletcher's Works, Vol. 01 of 10: the Custom of the Country* |
| [[gentamicin]] | noun | **1.** An antibiotic (trade name garamycin) that is derived from an actinomycete; used in treating infections of the urinary tract. | *"In academic literature, gentamicin designates an antibiotic (trade name garamycin) that is derived from an actinomycete; used in treating infections of the urinary tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genteel]] | adjective | **1.** Marked by refinement in taste and manners. | *"At present, I don’t mind confessing to the wards in Jarndyce (in strict confidence) that I sometimes find it difficult to keep up a genteel appearance."* — Charles Dickens, *Bleak House* |
| [[genteelly]] | adverb | **1.** In a genteel manner. | *"I wished Joe had been rather more genteelly brought up, and then I should have been so too."* — Charles Dickens, *Great Expectations* |
| [[genteelness]] | noun | **1.** Elegance by virtue of fineness of manner and expression. | *"In academic literature, genteelness designates elegance by virtue of fineness of manner and expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentian]] | noun | **1.** Any of various plants of the family gentianaceae especially the genera gentiana and gentianella and gentianopsis. | *"To what amazing infusions of gentian, peppermint, gilliflower, sage, parsley, thyme, rue, rosemary, and dandelion, did his courageous stomach submit itself!"* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[gentiana]] | noun | **1.** Type genus of the gentianaceae; cosmopolitan genus of herbs nearly cosmopolitan in cool temperate regions; in some classifications includes genera gentianopsis and gentianella. | *"In academic literature, gentiana designates type genus of the gentianaceae; cosmopolitan genus of herbs nearly cosmopolitan in cool temperate regions; in some classifications includes genera gentianopsis and gentianella."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianaceae]] | noun | **1.** Chiefly herbaceous plants with showy flowers; some are cultivated as ornamentals. | *"In academic literature, gentianaceae designates chiefly herbaceous plants with showy flowers; some are cultivated as ornamentals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianales]] | noun | **1.** An order of dicotyledonous plants having gamopetalous flowers; gentianaceae; apocynaceae; asclepiadaceae; loganiaceae; oleaceae; salvadoraceae. | *"In academic literature, gentianales designates an order of dicotyledonous plants having gamopetalous flowers; gentianaceae; apocynaceae; asclepiadaceae; loganiaceae; oleaceae; salvadoraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianella]] | noun | **1.** Genus of herbs with flowers that resemble gentian; in some classifications included in genus gentiana.<br>**2.** Low-growing alpine plant cultivated for its dark glossy green leaves in basal rosettes and showy solitary bell-shaped blue flowers. | *"In academic literature, gentianella designates genus of herbs with flowers that resemble gentian; in some classifications included in genus gentiana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianopsis]] | noun | **1.** Genus of fringed gentians; in some classifications included in genus gentiana. | *"In academic literature, gentianopsis designates genus of fringed gentians; in some classifications included in genus gentiana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentile]] | noun | **1.** A person who does not acknowledge your god.<br>**2.** A person who is not a member of one's own religion; used in this sense by mormons and hindus. | *"We have here among us, my friends,” says Chadband, “a Gentile and a heathen, a dweller in the tents of Tom-all-Alone’s and a mover-on upon the surface of the earth."* — Charles Dickens, *Bleak House* |
| [[gentility]] | noun | **1.** Elegance by virtue of fineness of manner and expression. | *"He lets me feed with his hinds, bars me the place of a brother, and as much as in him lies, mines my gentility with my education."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentle]] | verb | **1.** Cause to be more favorably inclined; gain the good will of.<br>**2.** Give a title to someone; make someone a member of the nobility. | *"I do forgive thy robbery gentle thief Although thou steal thee all my poverty: And yet love knows it is a greater grief To bear greater wrong, than hate’s known injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentlefolk]] | noun | **1.** People of good family and breeding and high social status. | *"We’ve been found to be the greatest gentlefolk in the whole county—reaching all back long before Oliver Grumble’s time—to the days of the Pagan Turks—with monuments, and vaults, and crests, and ’scutcheons, and the Lord knows what all."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[gentleman]] | noun | **1.** A man of refinement.<br>**2.** A manservant who acts as a personal attendant to his employer. | *"FIRST GENTLEMAN. ’Tis but the boldness of his hand haply, which his heart was not consenting to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentleman's-cane]] | noun | **1.** Tall showy tropical american annual having hairy stems and long spikes of usually red flowers above leaves deeply flushed with purple; seeds often used as cereal. | *"In academic literature, gentleman's-cane designates tall showy tropical american annual having hairy stems and long spikes of usually red flowers above leaves deeply flushed with purple; seeds often used as cereal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentleman-at-arms]] | noun | **1.** One of 40 gentlemen who attend the british sovereign on state occasions. | *"In academic literature, gentleman-at-arms designates one of 40 gentlemen who attend the british sovereign on state occasions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentlemanlike]] | adjective | **1.** Befitting a man of good breeding. | *"I will tell her, sir, that you do protest, which, as I take it, is a gentlemanlike offer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentlemanly]] | adjective | **1.** Befitting a man of good breeding. | *"Turveydrop is a very gentlemanly man indeed—very gentlemanly.” “Does his wife know of it?” asked Ada."* — Charles Dickens, *Bleak House* |
| [[gentleness]] | noun | **1.** The property possessed by a slope that is very gradual.<br>**2.** Acting in a manner that is gentle and mild and even-tempered. | *"Your gentleness shall force More than your force move us to gentleness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentlewoman]] | noun | **1.** A woman of refinement. | *"HELENA, a Gentlewoman protected by the Countess."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gently]] | adverb | **1.** In a gradual manner.<br>**2.** In a gentle manner. | *"What’s amiss, May it be gently heard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentrification]] | noun | **1.** The restoration of run-down urban areas by the middle class (resulting in the displacement of low-income residents). | *"In academic literature, gentrification designates the restoration of run-down urban areas by the middle class (resulting in the displacement of low-income residents)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentrify]] | verb | **1.** Renovate so as to make it conform to middle-class aspirations. | *"In academic literature, gentrify designates renovate so as to make it conform to middle-class aspirations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentry]] | noun | **1.** The most powerful members of a society. | *"It well may serve A nursery to our gentry, who are sick For breathing and exploit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[genu]] | noun | **1.** Hinge joint in the human leg connecting the tibia and fibula with the femur and protected in front by the patella. | *"And she is an unimpeachable Christian, I am sure; perhaps of the very tribe, genus, and species you desire to propagate.” “O Angel, you are mocking!” “Mother, I beg pardon."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[genuflect]] | verb | **1.** Bend the knees and bow in church or before a religious superior or image.<br>**2.** Bend the knees and bow in a servile manner. | *"The peers do homage, one by one, approaching and genuflecting.)_ THE PEERS: I do become your liege man of life and limb to earthly worship. _(Bloom holds up his right hand on which sparkles the Koh-i-Noor diamond."* — James Joyce, *Ulysses* |
| [[genuflection]] | noun | **1.** The act of bending the knees in worship or reverence. | *"The Pilgrim acknowledged her claim to it by a low genuflection."* — Walter Scott, *Ivanhoe: A Romance* |
| [[genuflexion]] | noun | **1.** The act of bending the knees in worship or reverence. | *"There was much that recalled the ritual of the Roman Catholic Church,--processions, genuflexions, chanting, burning of incense, lighting of candles, tinkling of bells,--all centring round a great figure of Sakyamuni."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[genuine]] | adjective | **1.** Not fake or counterfeit.<br>**2.** Not pretended; sincerely felt or expressed. | *"But as Ada interposed and laughingly said she could only feel proud of such genuine admiration, Mr."* — Charles Dickens, *Bleak House* |
| [[genuinely]] | adverb | **1.** In accordance with truth or fact or reality.<br>**2.** Genuinely; with authority. | *"Compare with this the genuinely corrupt Byron, through the cracks and fissures of whose heaving versification steam up perpetually the sulphurous vapours from his central iniquity."* — Francis Thompson, *Shelley: An Essay* |
| [[genuineness]] | noun | **1.** The state of being genuine.<br>**2.** Undisputed credibility. | *"So astonished was he, that he even doubted the check, which was for _five thousand dollars,_ and sent it to the bank to test its genuineness before he would give a receipt for it!" ALL SAVED."* — Classic Author, *The wonders of prayer* |
| [[genus]] | noun | **1.** A general kind of something.<br>**2.** (biology) taxonomic group containing one or more species. | *"And she is an unimpeachable Christian, I am sure; perhaps of the very tribe, genus, and species you desire to propagate.” “O Angel, you are mocking!” “Mother, I beg pardon."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[genus-fenusa]] | noun | **1.** Birch leaf miner. | *"In academic literature, genus-fenusa designates birch leaf miner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genus-megapodius]] | noun | **1.** Type genus of the megapodiidae. | *"In academic literature, genus-megapodius designates type genus of the megapodiidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genus-milvus]] | noun | **1.** A genus including the common european kits. | *"In academic literature, genus-milvus designates a genus including the common european kits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genyonemus]] | noun | **1.** A genus of sciaenidae. | *"In academic literature, genyonemus designates a genus of sciaenidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterogeneity]] | noun | **1.** The quality of being diverse and not comparable in kind. | *"In academic literature, heterogeneity designates the quality of being diverse and not comparable in kind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterogeneous]] | adjective | **1.** Consisting of elements that are not of the same kind or nature.<br>**2.** Originating outside the body. | *"The populations of many rural neighborhoods thus became heterogeneous, with results calamitous to the social life."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[heterogeneousness]] | noun | **1.** The quality of being diverse and not comparable in kind. | *"In academic literature, heterogeneousness designates the quality of being diverse and not comparable in kind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogeneity]] | noun | **1.** The quality of being similar or comparable in kind or nature.<br>**2.** The quality of being of uniform throughout in composition or structure. | *"This is [Chinese] _yü t´ang chia ch´i_, "beautiful vessel for the Jade Hall." It is improbable that the _yü t´ang_ was a factory name, as the specimens so marked have little homogeneity."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[homogeneous]] | adjective | **1.** All of the same or similar kind or nature. | *"Ultimately he was reduced well-nigh to a homogeneous sop, and the dyes of his clothes trickled down and stood in a pool at the foot of the ladder."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[homogeneously]] | adverb | **1.** All similarly. | *"In academic literature, homogeneously designates all similarly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogeneousness]] | noun | **1.** The quality of being similar or comparable in kind or nature. | *"In academic literature, homogeneousness designates the quality of being similar or comparable in kind or nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogenous]] | adjective | **1.** All of the same or similar kind or nature. | *"In academic literature, homogenous designates all of the same or similar kind or nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogeny]] | noun | **1.** (biology) similarity because of common evolution. | *"In academic literature, homogeny designates (biology) similarity because of common evolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indigenous]] | adjective | **1.** Originating where it is found. | *"Westermarck that the midsummer festival has belonged from time immemorial to the Berber race, and that so far as it is now observed by the Arabs of Morocco, it has been learned by them from the Berbers, the old indigenous inhabitants of the country."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[indigenously]] | adverb | **1.** In an indigenous manner. | *"In academic literature, indigenously designates in an indigenous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indigenousness]] | noun | **1.** Nativeness by virtue of originating or occurring naturally (as in a particular place). | *"In academic literature, indigenousness designates nativeness by virtue of originating or occurring naturally (as in a particular place)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingenious]] | adjective | **1.** Showing inventiveness and skill. | *"Pray you, sir, use the carp as you may, for he looks like a poor, decayed, ingenious, foolish, rascally knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ingeniously]] | adverb | **1.** In an ingenious manner. | *"It has been ingeniously argued that a tariff may keep some of the natural agricultural resources of a new country from becoming quickly exhausted."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[ingeniousness]] | noun | **1.** The power of creative imagination.<br>**2.** The property of being ingenious. | *"In academic literature, ingeniousness designates the power of creative imagination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingenue]] | noun | **1.** An actress who specializes in playing the role of an artless innocent young girl.<br>**2.** An artless innocent young girl (especially as portrayed on the stage). | *"It is the simplicity of the French stage _ingenue_."* — Francis Thompson, *Shelley: An Essay* |
| [[ingenuity]] | noun | **1.** The power of creative imagination.<br>**2.** The property of being ingenious. | *"Chadband states the question as if he were propounding an entirely new riddle of much ingenuity and merit to Mr."* — Charles Dickens, *Bleak House* |
| [[ingenuous]] | adjective | **1.** Characterized by an inability to mask your feelings; not devious.<br>**2.** Lacking in sophistication or worldliness. | *"He was a handsome youth with an ingenuous face and a most engaging laugh; and after she had called him up to where we sat, he stood by us, in the light of the fire, talking gaily, like a light-hearted boy."* — Charles Dickens, *Bleak House* |
| [[ingenuously]] | adverb | **1.** In an ingenuous manner. | *"Prithee, be not sad, Thou art true and honest, ingenuously I speak, No blame belongs to thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ingenuousness]] | noun | **1.** The quality of innocent naivete.<br>**2.** Openly straightforward or frank. | *"Nor did his blushes and awkwardness take away from it: she was pleased with these healthy tokens of the young gentleman's ingenuousness."* — William Makepeace Thackeray, *Vanity Fair* |
| [[inhomogeneity]] | noun | **1.** The quality of being inhomogeneous. | *"In academic literature, inhomogeneity designates the quality of being inhomogeneous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhomogeneous]] | adjective | **1.** Not homogeneous. | *"In academic literature, inhomogeneous designates not homogeneous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overgeneralise]] | verb | **1.** Draw too general a conclusion. | *"In academic literature, overgeneralise designates draw too general a conclusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overgeneralize]] | verb | **1.** Draw too general a conclusion. | *"In academic literature, overgeneralize designates draw too general a conclusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overgenerous]] | adjective | **1.** Very generous. | *"In academic literature, overgenerous designates very generous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxygen]] | noun | **1.** A nonmetallic bivalent element that is normally a colorless odorless tasteless nonflammable diatomic gas; constitutes 21 percent of the atmosphere by volume; the most abundant element in the earth's crust. | *"The dimmest-sparked chip of a conception blazes and scintillates in the subtile oxygen of his mind."* — Francis Thompson, *Shelley: An Essay* |
| [[oxygenate]] | verb | **1.** Impregnate, combine, or supply with oxygen. | *"Between his ribs and on each side of his spine he is supplied with a remarkable involved Cretan labyrinth of vermicelli-like vessels, which vessels, when he quits the surface, are completely distended with oxygenated blood."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[oxygenation]] | noun | **1.** The process of providing or combining or treating with oxygen. | *"In academic literature, oxygenation designates the process of providing or combining or treating with oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxygenise]] | verb | **1.** Change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule).<br>**2.** Dehydrogenate with oxygen. | *"In academic literature, oxygenise designates change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxygenize]] | verb | **1.** Change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule).<br>**2.** Dehydrogenate with oxygen. | *"In academic literature, oxygenize designates change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progenitor]] | noun | **1.** An ancestor in the direct line. | *"This oldest son is represented to have been the progenitor of the _Kanaka-maoli_, the people living on the mainland of Kane (_Aina kumupuaa a Kane_): the youngest was the progenitor of the white people (_ka poe keo keo maoli_)."* — Classic Author, *Hawaiian folk tales* |
| [[progeny]] | noun | **1.** The immediate descendants of a person. | *"Besides, all French and France exclaims on thee, Doubting thy birth and lawful progeny."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regency]] | noun | **1.** The period of time during which a regent governs.<br>**2.** The period from 1811-1820 when the prince of wales was regent during george iii's periods of insanity. | *"In the last century, however, four successive heirs were of a dissolute and wasteful disposition, and the family ruin was eventually completed by a gambler in the days of the Regency."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[regenerate]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Amplify (an electron current) by causing part of the power in the output circuit to act upon the input circuit. | *"Without corrupting the State legislatures, it cannot prosecute the attempt, because the periodical change of members would otherwise regenerate the whole body."* — Alexander Hamilton, *The Federalist Papers* |
| [[regenerating]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Amplify (an electron current) by causing part of the power in the output circuit to act upon the input circuit. | *"Would not a life devoted to the task of regenerating your race be well spent?” “Yes,” I said; “but I could not go on for ever so: I want to enjoy my own faculties as well as to cultivate those of other people."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[regeneration]] | noun | **1.** (biology) growth anew of lost tissue or destroyed parts or organs.<br>**2.** Feedback in phase with (augmenting) the input. | *"I remained an inmate of its walls, after its regeneration, for eight years: six as pupil, and two as teacher; and in both capacities I bear my testimony to its value and importance."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[regent]] | noun | **1.** Members of a governing board.<br>**2.** Someone who rules during the absence or incapacity or minority of the country's monarch. | *"Enter the funeral of King Henry the Fifth, attended on by the Duke of Bedford, Regent of France; the Duke of Gloucester, Protector; the Duke of Exeter, the Earl of Warwick, the Bishop of Winchester, the Duke of Somerset with Heralds, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subgenus]] | noun | **1.** (biology) taxonomic group between a genus and a species. | *"In academic literature, subgenus designates (biology) taxonomic group between a genus and a species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transgender]] | adjective | **1.** Involving a partial or full reversal of gender. | *"In academic literature, transgender designates involving a partial or full reversal of gender."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transgene]] | noun | **1.** An exogenous gene introduced into the genome of another organism. | *"In academic literature, transgene designates an exogenous gene introduced into the genome of another organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncongenial]] | adjective | **1.** Not suitable to your tastes or needs.<br>**2.** Very unfavorable to life or growth. | *"Modern life stretched out its steam feeler to this point three or four times a day, touched the native existences, and quickly withdrew its feeler again, as if what it touched had been uncongenial."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[uncongeniality]] | noun | **1.** A disposition not to be congenial. | *"In academic literature, uncongeniality designates a disposition not to be congenial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ungenerous]] | adjective | **1.** Lacking in magnanimity; - times litt. sup.<br>**2.** Unwilling to spend. | *"She said in the same breath that it would be ungenerous not to marry Boldwood, and that she couldn’t do it to save her life."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ungentle]] | adjective | **1.** Not of the nobility. | *"For Caesar cannot lean To be ungentle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ungentlemanlike]] | adjective | **1.** Not befitting a gentleman. | *"He stopt; and, ungentlemanlike as he looked, Fanny was obliged to introduce him to Mr."* — Jane Austen, *Mansfield Park* |
| [[ungentlemanly]] | adjective | **1.** Not befitting a gentleman. | *"It's so--so ungentlemanly." "So it is."* — Anthony Pryde, *Nightfall* |
| [[unregenerate]] | adjective | **1.** Tenaciously unwilling or marked by tenacious unwillingness to yield.<br>**2.** Not reformed morally or spiritually. | *"He who had wrought her undoing was now on the side of the Spirit, while she remained unregenerate."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unregenerated]] | adjective | **1.** Not reformed morally or spiritually. | *"In academic literature, unregenerated designates not reformed morally or spiritually."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · GEN
  </div>
</div>
