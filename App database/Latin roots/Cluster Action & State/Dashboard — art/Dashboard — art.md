---
status: unread
type: root_dashboard
---
# Dashboard — art
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">art-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“skill or craft”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **art** means skill or craft. It refers to skill, craft, technique, human method. In English, this root forms words such as *natura*, *artist*, *artistic*, and *artistry*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: skill or craft
> The root **art** means skill or craft. It refers to skill, craft, technique, human method. In English, this root forms words such as *natura*, *artist*, *artistic*, and *artistry*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Skill or craft</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *natura* and *artist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **art** comes from a Latin word that means *"skill or craft"*.
  - At its core, it describes skill or craft.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **art** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of skill or craft.
  - **Mental & Social**: How people experience, organize, or communicate about skill or craft.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Natura**: An everyday English word showing the root's idea of *skill or craft*.
  - **Artist**: A person who produces paintings or drawings as a profession or hobby.
  - **Artistic**: Having or revealing natural creative skill.
  - **Artistry**: Creative skill or ability, especially of an exceptional quality.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">art</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **art** builds vocabulary across three primary morphological mechanisms:
> - **Direct Nominal & Adjectival Base:**
>   - *ars, artis* → *art*, *artist*, *artistic*, *artistry*, *artisan*, *artisanal*.
>   - Anglo-Saxon suffixation: *artful* (cunning), *artless* (natural, guileless).
> - **Latin Compounds with *facere* (to make):**
>   - *ars* + *facere* → *artificium* → *artifice*, *artificer*, *artificial*, *artificiality*.
> - **Privative Negative Prefix (*in-*):**
>   - *in-* + *ars* → *iners, inertis* ("without art/skill") → *inert*, *inertia*, *inertial*.
> - **Military Engine Formations:**
>   - *artiller* (to equip with engines) → *artillery*.

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
> Although the root fundamentally denotes **"skill and craft"**, its modern semantic range encompasses distinct domains:
> - **Aesthetic & Creative Sense:** In [[art]], [[artist]], and [[artistic]], it denotes creative expression and the production of beautiful works.
> - **Craftsmanship & Trade Sense:** In [[artisan]] and [[artisanal]], it emphasizes traditional manual trade skills and small-batch production.
> - **Cunning & Contrivance Sense:** In [[artful]] and [[artifice]], it denotes clever trickery, deceit, and strategic ingenuity.
> - **Synthetic & Manufactured Sense:** In [[artificial]] and [[artificiality]], it describes products made by humans as copies of natural phenomena.
> - **Guileless & Innocent Sense:** In [[artless]], it describes natural, unforced simplicity devoid of pretense or deceit.
> - **Physical Sluggishness & Mechanics Sense:** In [[inert]] and [[inertia]], it captures the total absence of self-initiated movement or chemical reactivity.

---

## 🔀 4. Prefix & Combining Dynamics on art

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | without, not | [[inert]] | *Without* skill or motion; sluggish, chemically unreactive. |
| `in-` | without, not | [[inertia]] | The physical property of matter resisting any change in motion. |
| `anti-` | against, opposing | [[anti-art]] | A philosophical movement rejecting traditional concepts of fine art. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ist` | Noun (Practitioner) | [[artist]] | A person who produces creative works of art. |
| `-an` | Noun (Craftsman) | [[artisan]] | A skilled manual worker in a specialized trade. |
| `-ful` | Adjective (Abounding in) | [[artful]] | Clever, crafty, or deceitfully ingenious. |
| `-less` | Adjective (Lacking) | [[artless]] | Devoid of guile, trickery, or pretense; simple and genuine. |
| `-ery` | Noun (Collective Gear) | [[artillery]] | Large-caliber mounted firearms and ordnance. |
| `-ice` | Noun (Device / Trick) | [[artifice]] | A clever, deceptive trick or cunning contrivance. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎨 **Fine Arts & Museology** | [[art]], [[artist]], [[artistic]], [[artistry]] | Gallery exhibitions, visual composition, aesthetic critique, art conservation. |
| ⚙️ **Classical Physics & Mechanics** | [[inertia]], [[inertial]], [[inert]] | Newton's first law of motion, inertial guidance systems, noble gases. |
| 🍷 **Culinary Arts & Craft Brewing** | [[artisan]], [[artisanal]] | Handcrafted sourdough bread, small-batch cheese-making, microbrewing. |
| 🤖 **Computer Science & AI** | [[artificial]], [[artifice]] | Artificial intelligence (AI), machine learning models, artificial neural networks. |
| 🎖️ **Military Science & Ballistics** | [[artillery]] | Long-range howitzer barrages, field artillery tactics, naval gunnery. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abarticulation]] | noun | **1.** Dislocation of a joint. | *"In academic literature, abarticulation designates dislocation of a joint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apart]] | adjective | **1.** Remote and separate physically or socially; ; - w.h.hudson.<br>**2.** Having characteristics not shared by others; - vannever bush. | *"I dare him therefore To lay his gay comparisons apart, And answer me declined, sword against sword, Ourselves alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[apartment]] | noun | **1.** A suite of rooms usually on one floor of an apartment house. | *"An Apartment in Caesar’s House Scene V."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[art]] | noun | **1.** The products of human creativity; works of art collectively.<br>**2.** The creation of beautiful or significant things. | *"Thou art thy mother’s glass and she in thee Calls back the lovely April of her prime, So thou through windows of thine age shalt see, Despite of wrinkles this thy golden time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artamidae]] | noun | **1.** Wood swallows. | *"In academic literature, artamidae designates wood swallows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artamus]] | noun | **1.** Type genus of the artamidae. | *"In academic literature, artamus designates type genus of the artamidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artaxerxes]] | noun | **1.** King of persia who subdued numerous revolutions and made peace with sparta (?-359 bc).<br>**2.** King of persia who sanctioned the practice of judaism in jerusalem (?-424 bc). | *"In academic literature, artaxerxes designates king of persia who subdued numerous revolutions and made peace with sparta (?-359 bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artefact]] | noun | **1.** A man-made object taken as a whole. | *"In academic literature, artefact designates a man-made object taken as a whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artefactual]] | adjective | **1.** Of or relating to artifacts. | *"In academic literature, artefactual designates of or relating to artifacts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artemia]] | noun | **1.** Fairy shrimp; brine shrimp. | *"In academic literature, artemia designates fairy shrimp; brine shrimp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artemis]] | noun | **1.** (greek mythology) the virgin goddess of the hunt and the moon; daughter of leto and twin sister of apollo; identified with roman diana. | *"He called her Artemis, Demeter, and other fanciful names half teasingly, which she did not like because she did not understand them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[artemisia]] | noun | **1.** Any of various composite shrubs or herbs of the genus artemisia having aromatic green or greyish foliage. | *"Another One Queen Artemisia, as old stories tell, When deprived of her husband she loved so well, In respect for the love and affection he show’d her, She reduc’d him to dust and she drank up the powder."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[arteria]] | noun | **1.** A blood vessel that carries blood from the heart to the body. | *"In academic literature, arteria designates a blood vessel that carries blood from the heart to the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arterial]] | adjective | **1.** Of or involving or contained in the arteries. | *"Some were marked with great splotches, red as arterial blood, others were saffron yellow, and others tall and attenuated, with stems like macaroni."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[arterialise]] | verb | **1.** Change venous blood into arterial blood. | *"In academic literature, arterialise designates change venous blood into arterial blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arterialize]] | verb | **1.** Change venous blood into arterial blood. | *"In academic literature, arterialize designates change venous blood into arterial blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriectasia]] | noun | **1.** An abnormal distension of an artery. | *"In academic literature, arteriectasia designates an abnormal distension of an artery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriectasis]] | noun | **1.** An abnormal distension of an artery. | *"In academic literature, arteriectasis designates an abnormal distension of an artery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriogram]] | noun | **1.** An x ray of an artery filled with a contrast medium. | *"In academic literature, arteriogram designates an x ray of an artery filled with a contrast medium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriography]] | noun | **1.** Roentgenographic examination of arteries. | *"In academic literature, arteriography designates roentgenographic examination of arteries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriola]] | noun | **1.** One of the small thin-walled arteries that end in capillaries. | *"In academic literature, arteriola designates one of the small thin-walled arteries that end in capillaries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriolar]] | adjective | **1.** Of or relating to or involving arterioles. | *"In academic literature, arteriolar designates of or relating to or involving arterioles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriole]] | noun | **1.** One of the small thin-walled arteries that end in capillaries. | *"In academic literature, arteriole designates one of the small thin-walled arteries that end in capillaries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriolosclerosis]] | noun | **1.** Sclerosis of the arterioles. | *"In academic literature, arteriolosclerosis designates sclerosis of the arterioles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriosclerosis]] | noun | **1.** Sclerosis of the arterial walls. | *"In academic literature, arteriosclerosis designates sclerosis of the arterial walls."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriosclerotic]] | adjective | **1.** Affected by arteriosclerosis. | *"In academic literature, arteriosclerotic designates affected by arteriosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteriovenous]] | adjective | **1.** Connecting an artery to a vein. | *"In academic literature, arteriovenous designates connecting an artery to a vein."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arteritis]] | noun | **1.** Inflammation of an artery. | *"In academic literature, arteritis designates inflammation of an artery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artery]] | noun | **1.** A blood vessel that carries blood from the heart to the body.<br>**2.** A major thoroughfare that bears important traffic. | *"My fate cries out, And makes each petty artery in this body As hardy as the Nemean lion’s nerve. [_Ghost beckons._] Still am I call’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artesian]] | adjective | **1.** (of water) rising to the surface under internal hydrostatic pressure. | *"A people who made paved roads, and sunk artesian wells, and used Roman beads and pins."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[artichoke]] | noun | **1.** Mediterranean thistlelike plant widely cultivated for its large edible flower head.<br>**2.** A thistlelike flower head with edible fleshy leaves and heart. | *"The interior looked like a white pasty, a sort of soft crumb, the flavour of which was like that of an artichoke."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[article]] | noun | **1.** Nonfictional prose forming an independent part of a publication.<br>**2.** One of a class of artifacts. | *"You have broken The article of your oath, which you shall never Have tongue to charge me with."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[articled]] | verb | **1.** Bind by a contract; especially for a training period.<br>**2.** Bound by contract. | *"Articled clerks have been in the habit of fleshing their legal wit upon it."* — Charles Dickens, *Bleak House* |
| [[articular]] | adjective | **1.** Relating to or affecting the joints of the body. | *"In academic literature, articular designates relating to or affecting the joints of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulary]] | adjective | **1.** Relating to or affecting the joints of the body. | *"In academic literature, articulary designates relating to or affecting the joints of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulate]] | verb | **1.** Provide with a joint.<br>**2.** Put into words or an expression. | *"Send us to Rome The best, with whom we may articulate For their own good and ours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[articulated]] | verb | **1.** Provide with a joint.<br>**2.** Put into words or an expression. | *"Sir Clifford’s whale has been articulated throughout; so that, like a great chest of drawers, you can open and shut him, in all his bony cavities—spread out his ribs like a gigantic fan—and swing all day upon his lower jaw."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[articulately]] | adverb | **1.** With eloquence.<br>**2.** In an articulate manner. | *"In academic literature, articulately designates with eloquence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulateness]] | noun | **1.** The quality of being facile in speech and writing. | *"In academic literature, articulateness designates the quality of being facile in speech and writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulatio]] | noun | **1.** (anatomy) the point of connection between two bones or elements of a skeleton (especially if it allows motion). | *"In academic literature, articulatio designates (anatomy) the point of connection between two bones or elements of a skeleton (especially if it allows motion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulation]] | noun | **1.** The aspect of pronunciation that involves bringing articulatory organs together so as to shape the sounds of speech.<br>**2.** The shape or manner in which things come together and a connection is made. | *"To savages generally is imputed a guttural articulation."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[articulative]] | adjective | **1.** Of or relating to articulation. | *"In academic literature, articulative designates of or relating to articulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulator]] | noun | **1.** Someone who pronounces words.<br>**2.** A movable speech organ. | *"In academic literature, articulator designates someone who pronounces words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulatory]] | adjective | **1.** Of or relating to articulation. | *"In academic literature, articulatory designates of or relating to articulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artifact]] | noun | **1.** A man-made object taken as a whole. | *"OK, so this or that artifact doesn't have museum value; it could still be of enduring interest to your family and to the progeny of your progeny's progeny, even unto the xth generation."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[artifactual]] | adjective | **1.** Of or relating to artifacts. | *"In academic literature, artifactual designates of or relating to artifacts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artifice]] | noun | **1.** A deceptive maneuver (especially to avoid capture). | *"Bagnet resorts to his standard artifice for the maintenance of discipline."* — Charles Dickens, *Bleak House* |
| [[artificer]] | noun | **1.** Someone who is the first to think of or make something.<br>**2.** A skilled worker who practices some trade or handicraft. | *"Another lean unwash’d artificer Cuts off his tale and talks of Arthur’s death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artificial]] | adjective | **1.** Contrived by art rather than nature.<br>**2.** Artificially formal. | *"Why, I can smile, and murder while I smile, And cry “Content!” to that which grieves my heart, And wet my cheeks with artificial tears, And frame my face to all occasions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artificiality]] | noun | **1.** The quality of being produced by people and not occurring naturally. | *"To Dorothea this was adorable genuineness, and religious abstinence from that artificiality which uses up the soul in the efforts of pretence."* — George Eliot, *Middlemarch* |
| [[artificially]] | adverb | **1.** Not according to nature; not by natural means. | *"Into the dining-house, unaffected by the seductive show in the window of artificially whitened cauliflowers and poultry, verdant baskets of peas, coolly blooming cucumbers, and joints ready for the spit, Mr."* — Charles Dickens, *Bleak House* |
| [[artillery]] | noun | **1.** Large but transportable armament.<br>**2.** An army unit that uses big guns. | *"I’ll to the Tower with all the haste I can To view th’ artillery and munition; And then I will proclaim young Henry king. [_Exit._] EXETER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artilleryman]] | noun | **1.** A serviceman in the artillery. | *"Bagnet is an ex-artilleryman, tall and upright, with shaggy eyebrows and whiskers like the fibres of a coco-nut, not a hair upon his head, and a torrid complexion."* — Charles Dickens, *Bleak House* |
| [[artiodactyl]] | noun | **1.** Placental mammal having hooves with an even number of functional toes on each foot.<br>**2.** Of or relating to or belonging to mammals of the order artiodactyla. | *"In academic literature, artiodactyl designates placental mammal having hooves with an even number of functional toes on each foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artiodactyla]] | noun | **1.** An order of hooved mammals of the subclass eutheria (including pigs and peccaries and hippopotami and members of the suborder ruminantia) having an even number of functional toes. | *"In academic literature, artiodactyla designates an order of hooved mammals of the subclass eutheria (including pigs and peccaries and hippopotami and members of the suborder ruminantia) having an even number of functional toes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artiodactylous]] | adjective | **1.** Of or relating to or belonging to mammals of the order artiodactyla. | *"In academic literature, artiodactylous designates of or relating to or belonging to mammals of the order artiodactyla."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artisan]] | noun | **1.** A skilled worker who practices some trade or handicraft. | *"He appeared to be an artisan of some sort, and carried a tin pot of red paint in his hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[artist]] | noun | **1.** A person whose creative work shows sensitivity and imagination. | *"In framing an artist, art hath thus decreed, To make some good, but others to exceed; And you are her labour’d scholar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artiste]] | noun | **1.** A public performer (a dancer or singer). | *"In academic literature, artiste designates a public performer (a dancer or singer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artistic]] | adjective | **1.** Relating to or characteristic of art or artists.<br>**2.** Satisfying aesthetic standards and sensibilities. | *"There IS a way,” says Phil with a highly artistic turn of his brush; “what I’m a-doing at present.” “Whitewashing.” Phil nods."* — Charles Dickens, *Bleak House* |
| [[artistically]] | adverb | **1.** In an artistic manner. | *"Artistically he is perfectly beautiful in an Old-Testament fashion."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[artistry]] | noun | **1.** A superior skill that you can learn by study and practice and observation. | *"On all sides this was the verdict, one long-haired critic of international fame even claiming openly that Henshaw had not only equaled his former best work, but had gone beyond it, in both artistry and technique."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[artless]] | adjective | **1.** Characterized by an inability to mask your feelings; not devious.<br>**2.** Simple and natural; without cunning or deceit. | *"So full of artless jealousy is guilt, It spills itself in fearing to be spilt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artlessly]] | adverb | **1.** In a crude and unskilled manner.<br>**2.** In an ingenuous manner. | *"He showed his appetites and designs too simply and artlessly; when one was alone with him he talked too much about the same subject, and when other people were present he talked too little about anything."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[artlessness]] | noun | **1.** The quality of innocent naivete.<br>**2.** Ingenuousness by virtue of being free from artful deceit. | *"I thought we were an old family; but this is all new!” she said, in her artlessness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[artocarpus]] | noun | **1.** Evergreen asiatic trees now grown through the tropics: breadfruit; jackfruit. | *"The sago pasty, the artocarpus bread, some mangoes, half a dozen pineapples, and the liquor fermented from some coco-nuts, overjoyed us."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[artois]] | noun | **1.** A former province of northern france near the english channel (between picardy and flanders). | *"Lord Regent, and redoubted Burgundy, By whose approach the regions of Artois, Walloon and Picardy are friends to us, This happy night the Frenchmen are secure, Having all day caroused and banqueted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arts]] | noun | **1.** Studies intended to provide general knowledge and intellectual skills (rather than occupational or professional skills).<br>**2.** The products of human creativity; works of art collectively. | *"Yet be most proud of that which I compile, Whose influence is thine, and born of thee, In others’ works thou dost but mend the style, And arts with thy sweet graces graced be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artsd]] | noun | **1.** An honorary arts degree. | *"In academic literature, artsd designates an honorary arts degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artsy-craftsy]] | adjective | **1.** Pretentiously artistic; cloyingly charming. | *"In academic literature, artsy-craftsy designates pretentiously artistic; cloyingly charming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arty]] | adjective | **1.** Showily imitative of art or artists. | *"That accounts for the arty strain in him."* — Anthony Pryde, *Nightfall* |
| [[arty-crafty]] | adjective | **1.** Pretentiously artistic; cloyingly charming. | *"In academic literature, arty-crafty designates pretentiously artistic; cloyingly charming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disarticulate]] | verb | **1.** Separate at the joints. | *"In academic literature, disarticulate designates separate at the joints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inarticulate]] | adjective | **1.** Without or deprived of the use of speech or words. | *"Bucket soon detects an unusual slowness in his speech, with now and then a curious trouble in beginning, which occasions him to utter inarticulate sounds."* — Charles Dickens, *Bleak House* |
| [[inarticulately]] | adverb | **1.** Without eloquence; in an inarticulate manner.<br>**2.** In an inarticulate manner. | *"Let go, master,” he cried, almost inarticulately."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[inartistic]] | adjective | **1.** Lacking aesthetic sensibility. | *"In academic literature, inartistic designates lacking aesthetic sensibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subartesian]] | adjective | **1.** (of water) rising naturally in a well to a height appreciably above that of the surrounding water table but not flowing out of the well. | *"In academic literature, subartesian designates (of water) rising naturally in a well to a height appreciably above that of the surrounding water table but not flowing out of the well."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tripartite]] | adjective | **1.** Involving three parties or elements. | *"In academic literature, tripartite designates involving three parties or elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unarticulate]] | adjective | **1.** Without or deprived of the use of speech or words. | *"In academic literature, unarticulate designates without or deprived of the use of speech or words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unarticulated]] | adjective | **1.** Not consisting of segments that are held together by joints.<br>**2.** Uttered without the use of normal words or syllables. | *"In academic literature, unarticulated designates not consisting of segments that are held together by joints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unartistic]] | adjective | **1.** Lacking aesthetic sensibility. | *"In academic literature, unartistic designates lacking aesthetic sensibility."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ART
  </div>
</div>
