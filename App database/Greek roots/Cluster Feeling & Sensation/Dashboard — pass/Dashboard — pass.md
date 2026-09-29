---
status: unread
type: root_dashboard
---
# Dashboard — pass
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πάσσειν παστός (pássein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sprinkle”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'sprinkle'.</span>
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

The Greek root **pass** (πάσσειν παστός (pássein)) signifies sprinkle. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *pass*, *paste*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sprinkle
> The Greek root **pass** fundamentally denotes **sprinkle**. The physical sensory observation and cognitive anchor underlying 'sprinkle'. In classical Greek antiquity, the root denoted 'sprinkle', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">sprinkle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'sprinkle'.</mark>
> - **Everyday Connection**: Think of familiar words like *pass*, *paste*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pass** derives from Ancient Greek <mark class="hl-stem">πάσσειν παστός (pássein)</mark>, meaning "sprinkle".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with pass**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'sprinkle'.
  - Whenever you see **pass** in an English word, think immediately of **sprinkle**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pass</mark>, think of <mark class="hl-def">sprinkle</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `pass-` (from *πάσσειν παστός (pássein)*).
> - **Combining Stem with -o- Connective:** `passo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Pass
> - **1. Direct & Concrete Anchor:** Literal instantiation of sprinkle in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on pass

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `pass-` | [[pass]] | Primary root semantic foundation denoting sprinkle. |
| **Connecting -o-** | `passo-` | [[paste]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `pass` | [[pass]] | Relational or directional modification of the core root sense. |

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
| [[pass]] | noun | **1.** Move, proceed, go.<br>**2.** To go away : depart. | *"For to no other pass my verses tend, Than of your graces and your gifts to tell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passable]] | adjective | **1.** Able to be passed or traversed or crossed.<br>**2.** About average; acceptable. | *"The virtue of your name Is not here passable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passably]] | adverb | **1.** To a moderately sufficient extent or degree. | *"He does his duties passably well."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[passado]] | noun | **1.** (fencing) an attacking thrust made with one foot forward and the back leg straight and with the sword arm outstretched forward. | *"The first and second cause will not serve my turn; the _passado_ he respects not, the _duello_ he regards not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passage]] | noun | **1.** The act of passing from one state or place to the next.<br>**2.** A section of text; particularly a section of medium length. | *"This young gentlewoman had a father—O that “had!”, how sad a passage ’tis!—whose skill was almost as great as his honesty; had it stretch’d so far, would have made nature immortal, and death should have play for lack of work."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passageway]] | noun | **1.** A passage between rooms or between buildings.<br>**2.** A path or channel or duct through or along which something may pass. | *"He strode briskly toward a hatch at the far end of the passageway."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[passamaquody]] | noun | **1.** A member of the algonquian people related to the malecite and living in northeastern maine and new brunswick. | *"In academic literature, passamaquody designates a member of the algonquian people related to the malecite and living in northeastern maine and new brunswick."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passant]] | adjective | **1.** In walking position with right foreleg raised. | *"I would say, en passant, that Love is always treated by Browning as a SPIRITUAL claim; while DUTY may be only a worldly one."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[passe]] | adjective | **1.** Out of fashion. | *"No, if thou had'st thould'st nere marryed a woman In thy bosome, they're Cataplasmes made oth' deadly sins: I nere saw any yet but mine own mother; Or if I did, I did regard them but As shadowes that passe by of under Creatures. _And_."* — John Fletcher, *The Elder Brother* |
| [[passe-partout]] | noun | **1.** Key that secures entrance everywhere.<br>**2.** A mounting for a picture using gummed tape. | *"In academic literature, passe-partout designates key that secures entrance everywhere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passee]] | adjective | **1.** Out of fashion. | *"In academic literature, passee designates out of fashion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passel]] | noun | **1.** (often followed by `of') a large number or amount or extent. | *"T warn't so that I could be spared from home to learn the dressmaker's trade." "'T would a come handy later on, I declare," answered the sympathetic driver, "bein' 's you went an' had such a passel o' gals to clothe an' feed."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[passementerie]] | noun | **1.** A decoration or adornment on a garment. | *"In academic literature, passementerie designates a decoration or adornment on a garment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passenger]] | noun | **1.** A traveler riding in a vehicle (a boat or bus or car or plane or train etc) who is not operating it. | *"These are my mates, that make their wills their law, Have some unhappy passenger in chase."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passer]] | noun | **1.** A person who passes by casually or by chance.<br>**2.** A person who passes as a member of a different ethnic or racial group. | *"Norcombe Hill—not far from lonely Toller-Down—was one of the spots which suggest to a passer-by that he is in the presence of a shape approaching the indestructible as nearly as any to be found on earth."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[passer-by]] | noun | **1.** A person who passes by casually or by chance. | *"In academic literature, passer-by designates a person who passes by casually or by chance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passerby]] | noun | **1.** A person who passes by casually or by chance. | *"It is well that you should call to every passerby, “Look here!” With the night comes a slouching figure through the tunnel-court to the outside of the iron gate."* — Charles Dickens, *Bleak House* |
| [[passeres]] | noun | **1.** Two names for the suborder of typical songbirds. | *"In academic literature, passeres designates two names for the suborder of typical songbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passeridae]] | noun | **1.** True sparrows: old world birds formerly considered weaverbirds. | *"In academic literature, passeridae designates true sparrows: old world birds formerly considered weaverbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passeriformes]] | noun | **1.** Largest order of birds comprising about half the known species; rooks; finches; sparrows; tits; warblers; robins; wrens; swallows; etc.; the four suborders are eurylaimi and tyranni and menurae and oscines or passeres. | *"In academic literature, passeriformes designates largest order of birds comprising about half the known species; rooks; finches; sparrows; tits; warblers; robins; wrens; swallows; etc.; the four suborders are eurylaimi and tyranni and menurae and oscines or passeres."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passerina]] | noun | **1.** A genus of small north american finches including the new world buntings. | *"In academic literature, passerina designates a genus of small north american finches including the new world buntings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passerine]] | noun | **1.** Perching birds mostly small and living near the ground with feet having 4 toes arranged to allow for gripping the perch; most are songbirds; hatchlings are helpless.<br>**2.** Relating to or characteristic of the passeriform birds. | *"In academic literature, passerine designates perching birds mostly small and living near the ground with feet having 4 toes arranged to allow for gripping the perch; most are songbirds; hatchlings are helpless."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passero]] | noun | **1.** A naval battle in the mediterranean sea off cape passero in which the spanish navy was destroyed by france and england while attempting to recover sicily and sardinia from italy (1719). | *"In academic literature, passero designates a naval battle in the mediterranean sea off cape passero in which the spanish navy was destroyed by france and england while attempting to recover sicily and sardinia from italy (1719)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passiflora]] | noun | **1.** Type genus of the passifloraceae. | *"In academic literature, passiflora designates type genus of the passifloraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passifloraceae]] | noun | **1.** Tropical woody tendril-climbing vines. | *"In academic literature, passifloraceae designates tropical woody tendril-climbing vines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passim]] | adverb | **1.** Used to refer to cited works. | *"Clement quoted, ch. ix. _passim_, and on pp. 149, 166, 242, 243, 244, 247, 248, 251, 257, 258, 259, 260."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[passing]] | noun | **1.** (american football) a play that involves one player throwing the ball to a teammate.<br>**2.** Euphemistic expressions for death. | *"I will be bitter with him and passing short."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passion]] | noun | **1.** A strong feeling or emotion.<br>**2.** The trait of being intensely emotional. | *"Now to all sense ’tis gross You love my son; invention is asham’d, Against the proclamation of thy passion To say thou dost not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passionate]] | adjective | **1.** Having or expressing strong emotions. | *"The Queen returns, finds the King dead, and makes passionate action."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[passionately]] | adverb | **1.** With passion.<br>**2.** In a stormy or violent manner. | *"There would be nothing to mourn over." Mea, however, fought passionately for her friend and never gave way till Kurt had promised not to go on with his ditty."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[passionateness]] | noun | **1.** A strong feeling or emotion. | *"In academic literature, passionateness designates a strong feeling or emotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passionflower]] | noun | **1.** Any of various chiefly tropical american vines some bearing edible fruit. | *"In academic literature, passionflower designates any of various chiefly tropical american vines some bearing edible fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passionless]] | adjective | **1.** Not passionate.<br>**2.** Unmoved by feeling; ; -margaret deland. | *"Don’t you come none of that or I shall make blessed short work of you!” says the constable, giving him a passionless shake."* — Charles Dickens, *Bleak House* |
| [[passive]] | noun | **1.** The voice used to indicate that the grammatical subject of the verb is the recipient (not the source) of the action denoted by the verb.<br>**2.** Lacking in energy or will; - george meredith. | *"In the twilight of the morning, light seems active, darkness passive; in the twilight of evening it is the darkness which is active and crescent, and the light which is the drowsy reverse."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[passively]] | adverb | **1.** In a passive manner. | *"But by the time she had got back to the village she was passively trusting to the favour of accident."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[passiveness]] | noun | **1.** Submission to others or to outside influences.<br>**2.** The trait of remaining inactive; a lack of initiative. | *"In other words it is the negative quality of passiveness either in recoverable latency or insipient latescence."* — Mark Twain, *What Is Man? and Other Essays* |
| [[passivism]] | noun | **1.** The doctrine that all violence is unjustifiable. | *"In academic literature, passivism designates the doctrine that all violence is unjustifiable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[passivity]] | noun | **1.** The trait of remaining inactive; a lack of initiative.<br>**2.** Submission to others or to outside influences. | *"But no; stay, I insist!” He seized her hand, and then volition seemed to leave her, and she went off into a state of passivity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[passover]] | noun | **1.** (judaism) a jewish festival (traditionally 8 days from nissan 15) celebrating the exodus of the israelites from egypt. | *"The fast called the Passover—a religious affair, of course—was near, and thousands were pouring in from the country, according to custom, to celebrate the feast in Jerusalem."* — Jack London, *The Jacket (The Star-Rover)* |
| [[past]] | noun | **1.** The time that has elapsed.<br>**2.** A earlier period in someone's life (especially one that they have reason to keep secret). | *"Thou art as fair in knowledge as in hue, Finding thy worth a limit past my praise, And therefore art enforced to seek anew, Some fresher stamp of the time-bettering days."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paste]] | noun | **1.** A dough that contains a considerable proportion of fat and is used for pastry crust or fancy rolls.<br>**2.** A confection made by evaporating fruit with sugar or by flavoring a gelatin, starch, or gum arabic preparation. | *"Cry to it, nuncle, as the cockney did to the eels when she put ’em i’ the paste alive; she knapped ’em o’ the coxcombs with a stick and cried ‘Down, wantons, down!’ ’Twas her brother that, in pure kindness to his horse buttered his hay."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pasted]] | verb | **1.** Join or attach with or as if with glue.<br>**2.** Hit with the fists. | *"There was a bill, pasted on the door-post, announcing a room to let on the second floor."* — Charles Dickens, *Bleak House* |
| [[paster]] | noun | **1.** A workman who pastes.<br>**2.** An adhesive label. | *"In academic literature, paster designates a workman who pastes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pastness]] | noun | **1.** The quality of being past. | *"In academic literature, pastness designates the quality of being past."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pastor]] | noun | **1.** A person authorized to conduct religious worship.<br>**2.** Only the rose-colored starlings; in some classifications considered a separate genus. | *"Cleaveland, of Boston, relates the following incident: "In a revival of religion in the church of which he was pastor, he was visited one morning by a member of his church, a widow, whose only son was a sailor."* — Classic Author, *The wonders of prayer* |
| [[pastoral]] | noun | **1.** A musical composition that evokes rural life.<br>**2.** A letter from a pastor to the congregation. | *"The best actors in the world, either for tragedy, comedy, history, pastoral, pastoral-comical, historical-pastoral, tragical-historical, tragical-comical-historical-pastoral, scene individable, or poem unlimited."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pastorate]] | noun | **1.** Pastors collectively.<br>**2.** The position of pastor. | *"A clergyman says, "I was very anxious for the building of a mission chapel to accommodate a flourishing mission-school that had been organized under my pastorate."* — Classic Author, *The wonders of prayer* |
| [[pastorship]] | noun | **1.** The position of pastor. | *"In academic literature, pastorship designates the position of pastor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pasturage]] | noun | **1.** Succulent herbaceous vegetation of pasture land.<br>**2.** Bulky food like grass or hay for browsing or grazing horses or cattle. | *"These hills would make excellent pasturage for cattle, and after a time for sheep also, the grass at present being a little too rank."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[pasture]] | noun | **1.** A field covered with grass or herbage and suitable for grazing by livestock.<br>**2.** Bulky food like grass or hay for browsing or grazing horses or cattle. | *"Yea, like the stag when snow the pasture sheets, The barks of trees thou browsed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pasty]] | noun | **1.** Small meat pie or turnover.<br>**2.** (usually used in the plural) one of a pair of adhesive patches worn to cover the nipples of exotic dancers and striptease performers. | *"If ye pinch me like a pasty I can say no more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repast]] | noun | **1.** The food served and eaten at one time. | *"So, if I prove a good repast to the spectators, the dish pays the shot."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unpassable]] | adjective | **1.** Incapable of being passed. | *"In academic literature, unpassable designates incapable of being passed."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PASS
  </div>
</div>
