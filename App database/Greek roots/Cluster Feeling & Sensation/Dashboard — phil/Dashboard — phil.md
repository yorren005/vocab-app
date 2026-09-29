---
status: unread
type: root_dashboard
---
# Dashboard — phil
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">φίλος φιλικός φιλεῖν φιλία φίλτρον (phílos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“love, friendship”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'love, friendship'.</span>
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

The Greek root **phil** (φίλος φιλικός φιλεῖν φιλία φίλτρον (phílos)) signifies love, friendship. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *bibliophile*, *heterophil*, *hydrophile*, *paraphilia*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: love, friendship
> The Greek root **phil** fundamentally denotes **love, friendship**. The physical sensory observation and cognitive anchor underlying 'love, friendship'. In classical Greek antiquity, the root denoted 'love, friendship', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">love, friendship</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'love, friendship'.</mark>
> - **Everyday Connection**: Think of familiar words like *bibliophile*, *heterophil*, *hydrophile*, *paraphilia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phil** derives from Ancient Greek <mark class="hl-stem">φίλος φιλικός φιλεῖν φιλία φίλτρον (phílos)</mark>, meaning "love, friendship".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with phil**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'love, friendship'.
  - Whenever you see **phil** in an English word, think immediately of **love, friendship**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phil</mark>, think of <mark class="hl-def">love, friendship</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `phil-` (from *φίλος φιλικός φιλεῖν φιλία φίλτρον (phílos)*).
> - **Combining Stem with -o- Connective:** `philo-` (standard Greek combining vowel utilized before consonants).
> - **Ablaut & Dialectal Variations:** Demonstrates standard apophonic grade shifts and dialectal adaptations in classical compounding.
> - **Prefix Dynamics:** Readily compounds with Greek prepositions (*anti-*, *syn-*, *dia-*, *peri-*, *hyper-*, *hypo-*, *ana-*, *cata-*) to alter direction, degree, or relation.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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

> [!tip] 🌈 The Conceptual Facets of Phil
> - **1. Direct & Concrete Anchor:** Literal instantiation of love, friendship in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on phil

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `phil-` | [[bibliophile]] | Primary root semantic foundation denoting love, friendship. |
| **Connecting -o-** | `philo-` | [[heterophil]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `phil` | [[hydrophile]] | Relational or directional modification of the core root sense. |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences & Biology:** Morphological categorization and taxonomic naming conventions.
- **Medicine & Healthcare:** Clinical diagnostic terminology, anatomical structures, and pathology.
- **Philosophy, Logic & Rhetoric:** Theoretical frameworks, dialectical categories, and cognitive models.
- **Modern Academic English:** High-register lexicon across humanities, social sciences, and technical literature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bibliophile]] | noun | **1.** A lover of books especially for qualities of format; also : a book collector. | *"In academic literature, bibliophile designates a lover of books especially for qualities of format; also : a book collector."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bibliophilic]] | adjective | **1.** Of or relating to bibliophiles. | *"In academic literature, bibliophilic designates of or relating to bibliophiles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterophil]] | noun | **1.** Of, relating to, or being an antibody circulating in blood serum that is reactive with antigen originating in a different species. | *"In academic literature, heterophil designates of, relating to, or being an antibody circulating in blood serum that is reactive with antigen originating in a different species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophile]] | noun | **1.** Someone who practices homosexuality; having a sexual attraction to persons of the same sex.<br>**2.** Homosexual or arousing homosexual desires. | *"In academic literature, homophile designates someone who practices homosexuality; having a sexual attraction to persons of the same sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophile]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of love, friendship. | *"In academic literature, hydrophile designates adjective*) pertaining to, derived from, or characteristic of love, friendship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophilic]] | noun | **1.** Of, relating to, or having a strong affinity for water. | *"In academic literature, hydrophilic designates of, relating to, or having a strong affinity for water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraphilia]] | noun | **1.** A pattern of recurring sexually arousing mental imagery or behavior that involves unusual and especially socially unacceptable sexual practices (such as sadism or pedophilia). | *"In academic literature, paraphilia designates a pattern of recurring sexually arousing mental imagery or behavior that involves unusual and especially socially unacceptable sexual practices (such as sadism or pedophilia)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phil]] | noun | **1.** Philippians.<br>**2.** Loving : having an affinity for. | *"Phil!” says the trooper in a quiet voice."* — Charles Dickens, *Bleak House* |
| [[philadelphaceae]] | noun | **1.** One genus; usually included in family hydrangeaceae. | *"In academic literature, philadelphaceae designates one genus; usually included in family hydrangeaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philadelphia]] | noun | **1.** The largest city in pennsylvania; located in the southeastern part of the state on the delaware river; site of independence hall where the declaration of independence and the constitution were signed; site of the university of pennsylvania. | *"Adams, of Philadelphia, stated in his Thanksgiving sermon that, having an appointment to meet the President at 5 o'clock in the morning, he went a quarter of an hour before the time."* — Classic Author, *The wonders of prayer* |
| [[philadelphus]] | noun | **1.** Any of various chiefly deciduous ornamental shrubs of the genus philadelphus having white sweet-scented flowers, single or in clusters; widely grown in temperate regions. | *"Anyone can read them in the Greek version, which was made by the seventy elders for Ptolemy Philadelphus."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[philaenus]] | noun | **1.** A genus of cercopidae. | *"In academic literature, philaenus designates a genus of cercopidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philander]] | noun | **1.** To have casual or illicit sex with a person or with many people; especially : to be sexually unfaithful to one's spouse —usually used of a man.<br>**2.** Philander Chase 1853—1921 American statesman. | *"Mark,” said Gabriel, sternly, “now you mind this: none of that dalliance-talk—that philandering way—that dandle-smack-and-coddle style of yours—about Miss Everdene."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[philanderer]] | noun | **1.** A man who likes many women and has short sexual relationships with them. | *"In academic literature, philanderer designates a man who likes many women and has short sexual relationships with them."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philanthropic]] | adjective | **1.** Generous in assistance to the poor.<br>**2.** Of or relating to or characterized by philanthropy. | *"In their legal aspect these banks have a philanthropic character."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[philanthropically]] | adverb | **1.** In a philanthropic manner. | *"In academic literature, philanthropically designates in a philanthropic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philanthropist]] | noun | **1.** Someone who makes charitable donations intended to increase human well-being. | *"Quale, with large shining knobs for temples and his hair all brushed to the back of his head, who came in the evening, and told Ada he was a philanthropist, also informed her that he called the matrimonial alliance of Mrs."* — Charles Dickens, *Bleak House* |
| [[philanthropy]] | noun | **1.** Goodwill to fellow members of the human race; especially : active effort to promote human welfare.<br>**2.** An act or gift done or made for humanitarian purposes. | *"He seemed to project those two shining knobs of temples of his into everything that went on and to brush his hair farther and farther back, until the very roots were almost ready to fly out of his head in inappeasable philanthropy."* — Charles Dickens, *Bleak House* |
| [[philatelic]] | adjective | **1.** Of or relating to philately or of interest to philatelists. | *"In academic literature, philatelic designates of or relating to philately or of interest to philatelists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philatelical]] | adjective | **1.** Of or relating to philately or of interest to philatelists. | *"In academic literature, philatelical designates of or relating to philately or of interest to philatelists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philatelically]] | adverb | **1.** In a philatelic manner. | *"In academic literature, philatelically designates in a philatelic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philatelist]] | noun | **1.** A collector and student of postage stamps. | *"In academic literature, philatelist designates a collector and student of postage stamps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philately]] | noun | **1.** The collection and study of postage stamps. | *"In academic literature, philately designates the collection and study of postage stamps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philemon]] | noun | **1.** (greek mythology) a simple countryman who offered hospitality to zeus and hermes when they came to earth without revealing their identities in order to test people's piety.<br>**2.** (new testament) a christian (probably living in colossae) whose slave escaped and went to see saint paul. | *"My visor is Philemon’s roof; within the house is Jove."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philharmonic]] | noun | **1.** Symphony orchestra. | *"In academic literature, philharmonic designates symphony orchestra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philia]] | noun | **1.** A positive feeling of liking. | *"In academic literature, philia designates a positive feeling of liking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philip]] | noun | **1.** Englishman and husband of elizabeth ii (born 1921). | *"His father was called Philip of Macedon, as I take it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philippi]] | noun | **1.** A city in ancient macedonia that was important in early christianity.<br>**2.** Octavian and mark antony defeated brutus and cassius in 42 bc. | *"AGRIPPA. [_Aside to Enobarbus_.] Why, Enobarbus, When Antony found Julius Caesar dead, He cried almost to roaring, and he wept When at Philippi he found Brutus slain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philippian]] | noun | **1.** A native or inhabitant of philippi in ancient macedonia. | *"Work 99:6 out your own salvation with fear and trembling," says the apostle, and he straightway adds: "for it is God which worketh in you both to will and to do of His good 99:9 pleasure" (Philippians ii. 12, 13)."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[philippians]] | noun | **1.** A new testament book containing an epistle from saint paul to the church at philippi in macedonia.<br>**2.** A native or inhabitant of philippi in ancient macedonia. | *"Work 99:6 out your own salvation with fear and trembling," says the apostle, and he straightway adds: "for it is God which worketh in you both to will and to do of His good 99:9 pleasure" (Philippians ii. 12, 13)."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[philippic]] | noun | **1.** A speech of violent denunciation. | *"Bickerdyke's philippic--She procures his dismissal--His interview with General Sherman--"She ranks me"--The commanding generals appreciate her--Convalescent soldiers _vs._ colored nurses--The Medical Director's order--Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[philippine]] | noun | **1.** Official language of the philippines; based on tagalog; draws its lexicon from other philippine languages.<br>**2.** Of or relating to or characteristic of the philippines or its people or customs. | *"Some of the Philippine Islanders believe that the souls of their ancestors are in certain trees, which they therefore spare."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[philippines]] | noun | **1.** A republic on the philippine islands; achieved independence from the united states in 1946.<br>**2.** An archipelago in the southwestern pacific including some 7000 islands. | *"I, the last of the Standings, dying soon without issue, fought as a common soldier in the Philippines, in our latest war, and to do so I resigned, in the full early ripeness of career, my professorship in the University of Nebraska."* — Jack London, *The Jacket (The Star-Rover)* |
| [[philippopolis]] | noun | **1.** An ancient city in southern bulgaria; commercial center of an agricultural region. | *"In academic literature, philippopolis designates an ancient city in southern bulgaria; commercial center of an agricultural region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philistia]] | noun | **1.** An ancient region on the coast of southwestern palestine that was strategically located on a trade route between syria and egypt; important in biblical times. | *"In academic literature, philistia designates an ancient region on the coast of southwestern palestine that was strategically located on a trade route between syria and egypt; important in biblical times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philistine]] | noun | **1.** A person who is uninterested in intellectual pursuits.<br>**2.** A member of an aegean people who settled ancient philistia around the 12th century bc. | *"Casaubon’s entirely new view of the Philistine god Dagon and other fish-deities, thinking that hereafter she should see this subject which touched him so nearly from the same high ground whence doubtless it had become so important to him."* — George Eliot, *Middlemarch* |
| [[philistinism]] | noun | **1.** A desire for wealth and material possessions with little interest in ethical or spiritual matters. | *"It was a time rich in hidden intellectual forces, and yet it bore the stamp of that uninspired Philistinism which is so abundantly evidenced by the barren commonplace character of its architecture and art."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[phillidae]] | noun | **1.** Leaf insects. | *"In academic literature, phillidae designates leaf insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phillipsite]] | noun | **1.** A group of white or reddish crystalline minerals of the zeolite family consisting of a hydrous silicate of calcium and potassium and aluminum. | *"In academic literature, phillipsite designates a group of white or reddish crystalline minerals of the zeolite family consisting of a hydrous silicate of calcium and potassium and aluminum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phillyrea]] | noun | **1.** Small genus of evergreen shrubs of the mediterranean region. | *"In academic literature, phillyrea designates small genus of evergreen shrubs of the mediterranean region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philodendron]] | noun | **1.** Often grown as a houseplant. | *"In academic literature, philodendron designates often grown as a houseplant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philogyny]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gyn.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, philogyny designates a term designating an entity, condition, or phenomenon derived from greek gyn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philohela]] | noun | **1.** American woodcocks. | *"In academic literature, philohela designates american woodcocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philological]] | adjective | **1.** Of or relating to or dealing with philology. | *"In academic literature, philological designates of or relating to or dealing with philology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philologist]] | noun | **1.** A humanist specializing in classical scholarship. | *"Something of that sort.” “Colonial, is it not?” pursued Lydia, with the air of a philologist."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[philologue]] | noun | **1.** A humanist specializing in classical scholarship. | *"In academic literature, philologue designates a humanist specializing in classical scholarship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philology]] | noun | **1.** The study of literature and of disciplines relevant to literature or to language as used in literature.<br>**2.** Linguistics; especially : historical and comparative linguistics. | *"At least it seems more likely that the rule sprang from a superstition of this sort than from a simple calculation of expediency, as I formerly suggested (_Journal of Philology_, xiv. (1885) p. 158)."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[philomachus]] | noun | **1.** Ruffs. | *"Classical and authoritative lexicons catalog philomachus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philomath]] | noun | **1.** A lover of learning. | *"In academic literature, philomath designates a lover of learning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phil.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, philophobia designates a term designating an entity, condition, or phenomenon derived from greek phil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philophylla]] | noun | **1.** Leaf miners. | *"In academic literature, philophylla designates leaf miners."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philos]] | noun | **1.** Philosophy. | *"In academic literature, philos designates philosophy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philosopher]] | noun | **1.** A specialist in philosophy.<br>**2.** A wise person who is calm and rational; someone who lives a life of reason with equanimity. | *"Such a one is a natural philosopher."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philosophic]] | adjective | **1.** Of or relating to philosophy or philosophers.<br>**2.** Characterized by the attitude of a philosopher; meeting trouble with level-headed detachment. | *"A _snell_ remark of his brother William suggesting some new and comic association with a philosophic term dropped in the course of the discussion, would bring him back with a roar of laughter to the actual world and to more sublunary themes."* — John Cairns, *Principal Cairns* |
| [[philosophical]] | adjective | **1.** Of or relating to philosophy or philosophers.<br>**2.** Characterized by the attitude of a philosopher; meeting trouble with level-headed detachment. | *"They say miracles are past; and we have our philosophical persons to make modern and familiar things supernatural and causeless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philosophically]] | adverb | **1.** In a philosophic manner.<br>**2.** With respect to philosophy. | *"He hurt her, but she had been bred to accept pain philosophically."* — Anthony Pryde, *Nightfall* |
| [[philosophise]] | verb | **1.** Reason philosophically. | *"For he began to philosophise in order to judge his impressions (_phantasias_) and to discover which of them are true and which false, so as to be free from perturbation."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[philosophiser]] | noun | **1.** Someone who considers situations from a philosophical point of view. | *"In academic literature, philosophiser designates someone who considers situations from a philosophical point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philosophize]] | noun | **1.** To reason in the manner of a philosopher.<br>**2.** To expound a moralizing and often superficial philosophy. | *"If we are to use abstract terms and philosophize his thought a little, we may agree that the four facts Jesus notes in Nature are its mystery, its regularity, its impartiality, and its peacefulness[11]."* — T. R. Glover, *The Jesus of History* |
| [[philosophizer]] | noun | **1.** Someone who considers situations from a philosophical point of view. | *"In academic literature, philosophizer designates someone who considers situations from a philosophical point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philosophizing]] | noun | **1.** The exposition (often superficially) of a particular philosophy.<br>**2.** Reason philosophically. | *"Why,” thought Prince Andrew, “that’s the captain who stood up in the sutler’s hut without his boots.” He recognized the agreeable, philosophizing voice with pleasure."* — graf Leo Tolstoy, *War and Peace* |
| [[philosophy]] | noun | **1.** A discipline comprising primarily logic, aesthetics, ethics, metaphysics, and epistemology.<br>**2.** The sciences and liberal arts exclusive of medicine, law, and theology. | *"Hast any philosophy in thee, shepherd?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philter]] | noun | **1.** A potion credited with magical power.<br>**2.** A potion, drug, or charm held to have the power to arouse sexual passion. | *"And, perchance still failing, then might I expect the common bravo’s steel in my back or the common poisoner’s philter in my wine, my meat, or bread."* — Jack London, *The Jacket (The Star-Rover)* |
| [[philtre]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phil.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"Teufelsbürst, without philosophising about it, called his preparation simply a love-philtre, a concoction well known by name, but the composition of which was the secret of only a few."* — George MacDonald, *The Portent and Other Stories* |
| [[philtrum]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phil.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, philtrum designates a term designating an entity, condition, or phenomenon derived from greek phil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphilid]] | noun | **1.** Minute arthropod often infesting the underground parts of truck-garden and greenhouse crops. | *"In academic literature, symphilid designates minute arthropod often infesting the underground parts of truck-garden and greenhouse crops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[xenophile]] | noun | **1.** One attracted to foreign things (such as styles or people). | *"In academic literature, xenophile designates one attracted to foreign things (such as styles or people)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Feeling & Sensation]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHIL
  </div>
</div>
