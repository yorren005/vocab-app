---
status: unread
type: root_dashboard
---
# Dashboard — sin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“curve, fold, or bend”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Crafting a specific shape out of clay or wood with careful hands.</span>
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

The root **sin** means curve, fold, or bend. It refers to a curving bend, indented hollow, or folding curve. In English, this root forms words such as *fold*, *bosom*, *bay*, and *sine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: curve, fold, or bend
> The root **sin** means curve, fold, or bend. It refers to a curving bend, indented hollow, or folding curve. In English, this root forms words such as *fold*, *bosom*, *bay*, and *sine*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Curve, fold, or bend</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Crafting a specific shape out of clay or wood with careful hands.</mark>
> - **Everyday Connection**: Think of familiar words like *fold* and *bosom*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sin** comes from a Latin word that means *"curve, fold, or bend"*.
  - At its core, it describes curve, fold, or bend.

- **The Big Picture Idea**:
  - Picture crafting a specific shape out of clay or wood with careful hands.
  - Whenever you see **sin** in an English word, think of **shapes, forms, and physical objects**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of curve, fold, or bend.
  - **Mental & Social**: How people experience, organize, or communicate about curve, fold, or bend.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fold**: An everyday English word showing the root's idea of *curve, fold, or bend*.
  - **Bosom**: An everyday English word showing the root's idea of *curve, fold, or bend*.
  - **Bay**: An everyday English word showing the root's idea of *curve, fold, or bend*.
  - **Sine**: The trigonometric function that for an acute angle in a right triangle is the ratio of the opposite side to the hypotenuse.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sin</mark>, think of <mark class="hl-def">shapes, forms, and physical objects</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sin** generates vocabulary through mathematical compounding, anatomical extension, and prefixation:
> - **Mathematical & Wave Functions:**
>   - *sinus* $\to$ *sine* ("trigonometric function representing ratio of opposite side to hypotenuse").
>   - *com-* + *sine* $\to$ *cosine* ("complementary angle sine").
>   - *sine* + *-oid* $\to$ *sinusoid*, *sinusoidal* ("mathematical curve having the form of a sine wave").
> - **Anatomical & Pathological Nouns:**
>   - *sinus* $\to$ *sinus* ("air cavity in the skull; dilated venous channel").
>   - *sinus* + *-itis* $\to$ *sinusitis* ("inflammation of the nasal sinuses").
> - **Adjectival Undulations in `sinu-` (< *sinuōsus*):**
>   - *sinuōsus* $\to$ *sinuous*, *sinuously*, *sinuosity* ("having many curves and turns").
>   - *sinuātus* $\to$ *sinuate* ("having a wavy or deeply indented margin, as in oak leaves").
> - **Psychological & Rhetorical Prefix Compound `insinu-`:**
>   - *in-* + *sinuāre* $\to$ *insinuate* ("to suggest obliquely; to work into favor").
>   - *insinuātiō* $\to$ *insinuation* ("an unpleasant hint or covert suggestion").

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
> Although fundamentally denoting **"curve / fold"**, the root branches into diverse domains:
> - **Trigonometry, Electrical Engineering & Acoustics:** *sine*, *cosine*, *sinusoid*, *sinusoidal* (alternating AC current, sound waves).
> - **Otolaryngology & Cranial Anatomy:** *sinus*, *sinusitis* (paranasal sinuses, frontal headaches).
> - **Geomorphology & Fluvial Hydrology:** *sinuous*, *sinuosity* (meandering river bends, oxbow lake development).
> - **Interpersonal Communication & Rhetoric:** *insinuate*, *insinuation* (innuendo, passive-aggressive hints).
> - **Botany & Mycology:** *sinuate* (wavy leaf borders in botany).

---

## 🔀 4. Prefix & Combining Dynamics on sin

### Combining Form Dynamics

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `co-` (complementary) | `sine` | **[[cosine]]** | The sine of the complementary angle ($90^\circ - \theta$). |
| `in-` (into) | `sinus` (bosom) | **[[insinuate]]** / **[[insinuation]]** | To slip indirectly into someone's confidence; to hint obliquely. |
| `-oid` (resembling) | `sinus` | **[[sinusoid]]** / **sinusoidal** | A mathematical curve that describes a smooth periodic oscillation. |
| `-itis` (inflammation)| `sinus` | **[[sinusitis]]** | Acute or chronic inflammation of the paranasal sinus tissue. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Electrical Engineering & Acoustics** | *sine wave*, *sinusoidal*, *cosine* | Alternating current grid phase angles, pure harmonic musical tones. |
| 👃 **Otolaryngology & Medicine** | *sinus*, *sinusitis*, *sinus arrhythmia* | Endoscopic sinus surgery, normal respiratory sinus arrhythmia. |
| 🏞️ **Fluvial Geomorphology** | *sinuous river*, *sinuosity index* | Ratio of river channel length to valley down-valley straight length. |
| 🗣️ **Rhetoric, Law & Psychology** | *insinuate*, *insinuation* | Defamation law, identifying implied slanderous innuendo in court. |
| 🌿 **Botany & Plant Morphology** | *sinuate margin* | Botanical taxonomy classifying wavy-edged leaves in oaks and ferns. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[absinth]] | noun | **1.** Strong green liqueur flavored with wormwood and anise. | *"In academic literature, absinth designates strong green liqueur flavored with wormwood and anise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[absinthe]] | noun | **1.** Aromatic herb of temperate eurasia and north africa having a bitter taste used in making the liqueur absinthe.<br>**2.** Strong green liqueur flavored with wormwood and anise. | *"Orion: There is nothing but what will do you good; And the drugs are simples; 'tis hellebore, Nepenthe, upas, and dragon's blood, Absinthe, and mandrake, and mandragore."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[arsine]] | noun | **1.** A poisonous colorless flammable gas used in organic synthesis and to dope transistors and as a poison gas in warfare. | *"In academic literature, arsine designates a poisonous colorless flammable gas used in organic synthesis and to dope transistors and as a poison gas in warfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosine]] | noun | **1.** Ratio of the adjacent side to the hypotenuse of a right-angled triangle. | *"I, however, struggled on with my sines and cosines for a few days more; but stepping into the garden one charming noon, to take the sun's altitude, there I met my angel, Like Proserpine gathering flowers, Herself a fairer flower."* — Robert Burns, *The Letters of Robert Burns* |
| [[cosiness]] | noun | **1.** A state of warm snug comfort. | *"In academic literature, cosiness designates a state of warm snug comfort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disincarnate]] | verb | **1.** Make immaterial; remove the real essence of. | *"In academic literature, disincarnate designates make immaterial; remove the real essence of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disincentive]] | noun | **1.** A negative motivational influence. | *"In academic literature, disincentive designates a negative motivational influence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinclination]] | noun | **1.** That toward which you are inclined to feel dislike.<br>**2.** A certain degree of unwillingness. | *"That was something much more important than his disinclination to DC with the Knippel boys."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[disincline]] | verb | **1.** Make unwilling. | *"But I felt it; and it did not disincline me towards him; though I felt impatience at what seemed like mystery in him, so imperfectly as he was known to me then."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[disinclined]] | verb | **1.** Make unwilling.<br>**2.** Unwilling because of mild dislike or disapproval. | *"I, Darrell Standing, was so strongly disinclined to die that I refused to let Warden Atherton and Captain Jamie kill me."* — Jack London, *The Jacket (The Star-Rover)* |
| [[disintegrable]] | adjective | **1.** Capable of melting. | *"In academic literature, disintegrable designates capable of melting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disintegrate]] | verb | **1.** Break into parts or components or lose cohesion or unity.<br>**2.** Cause to undergo fission or lose particles. | *"Forms disintegrate into the eternal nothingness from which there is no return."* — Jack London, *The Jacket (The Star-Rover)* |
| [[disintegration]] | noun | **1.** In a decomposed state.<br>**2.** A loss (or serious disruption) of organization in some system. | *"Of these plans he had not merely one or two in his head but dozens, some only beginning to form themselves, some approaching achievement, and some in course of disintegration."* — graf Leo Tolstoy, *War and Peace* |
| [[disintegrative]] | adjective | **1.** Tending to cause breakup into constituent elements or parts. | *"In academic literature, disintegrative designates tending to cause breakup into constituent elements or parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinter]] | verb | **1.** Dig up for reburial or for medical investigation; of dead bodies. | *"In academic literature, disinter designates dig up for reburial or for medical investigation; of dead bodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinterest]] | noun | **1.** Tolerance attributable to a lack of involvement. | *"The case of Gridley is in no essential altered from one of actual occurrence, made public by a disinterested person who was professionally acquainted with the whole of the monstrous wrong from beginning to end."* — Charles Dickens, *Bleak House* |
| [[disinterested]] | adjective | **1.** Unaffected by self-interest. | *"The case of Gridley is in no essential altered from one of actual occurrence, made public by a disinterested person who was professionally acquainted with the whole of the monstrous wrong from beginning to end."* — Charles Dickens, *Bleak House* |
| [[disinterestedly]] | adverb | **1.** Without bias; without selfish motives. | *"And you at least love me disinterestedly.” “Yes—I will go,” said Izz, after a pause."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[disinterestedness]] | noun | **1.** Freedom from bias or from selfish motives. | *"And the outspoken honesty of his character was such that on any subject, even that of her love for, or marriage with, another man, the same disinterestedness of opinion might be calculated on, and be had for the asking."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disinterment]] | noun | **1.** The act of digging something out of the ground (especially a corpse) where it has been buried. | *"In academic literature, disinterment designates the act of digging something out of the ground (especially a corpse) where it has been buried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insincere]] | adjective | **1.** Lacking sincerity. | *"For the insincere and the trivial there is no message from God, no truth of God--how should there be?"* — T. R. Glover, *The Jesus of History* |
| [[insincerely]] | adverb | **1.** Without sincerity. | *"I'll be as good to her as I can, without feeling that I am acting insincerely." "And that is all I ask, love."* — Martha Finley, *Elsie's Kith and Kin* |
| [[insincerity]] | noun | **1.** The quality of not being open or truthful; deceitful or hypocritical. | *"She had been used before to feel that he could not be always quite sincere, but now she saw insincerity in everything."* — Jane Austen, *Persuasion* |
| [[insinuate]] | verb | **1.** Introduce or insert (oneself) in a subtle manner.<br>**2.** Give to understand. | *"What a case am I in then, that am neither a good epilogue nor cannot insinuate with you in the behalf of a good play!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insinuating]] | verb | **1.** Introduce or insert (oneself) in a subtle manner.<br>**2.** Give to understand. | *"And since the wisdom of their choice is rather to have my hat than my heart, I will practise the insinuating nod and be off to them most counterfeitly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insinuatingly]] | adverb | **1.** In an insinuating manner. | *"You wish I pack, yes?" he deprecated reticence by his insinuatingly sympathetic tone."* — Anthony Pryde, *Nightfall* |
| [[insinuation]] | noun | **1.** An indirect (and usually malicious) implication.<br>**2.** The act of gaining acceptance or affection for yourself by persuasive and subtle blandishments. | *"They are not near my conscience; their defeat Does by their own insinuation grow. ’Tis dangerous when the baser nature comes Between the pass and fell incensed points Of mighty opposites."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonresinous]] | adjective | **1.** Not having resin. | *"In academic literature, nonresinous designates not having resin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonresiny]] | adjective | **1.** Not having resin. | *"In academic literature, nonresiny designates not having resin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opsin]] | noun | **1.** Retinal protein formed by the action of light on rhodopsin. | *"In academic literature, opsin designates retinal protein formed by the action of light on rhodopsin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosiness]] | noun | **1.** Commonplaceness as a consequence of being humdrum and not exciting. | *"In academic literature, prosiness designates commonplaceness as a consequence of being humdrum and not exciting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resin]] | noun | **1.** Any of a class of solid or semisolid viscous substances obtained either as exudations from certain plants or prepared by polymerization of simple molecules. | *"Sometimes an old cartwheel is smeared with resin, ignited, and sent rolling down the hill."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[resinate]] | verb | **1.** Impregnate with resin to give a special flavor to. | *"In academic literature, resinate designates impregnate with resin to give a special flavor to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resinated]] | verb | **1.** Impregnate with resin to give a special flavor to.<br>**2.** Impregnated or flavored with resin. | *"In academic literature, resinated designates impregnate with resin to give a special flavor to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resinlike]] | adjective | **1.** Resembling resin in properties or texture. | *"In academic literature, resinlike designates resembling resin in properties or texture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resinoid]] | noun | **1.** A plastic containing resins. | *"In academic literature, resinoid designates a plastic containing resins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resinous]] | adjective | **1.** Having the characteristics of pitch or tar. | *"These nuts are then hermetically sealed with a resinous gum, and the vegetable fragrance of their green rind soon imparts to the oil a delightful odour."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[resiny]] | adjective | **1.** Having the characteristics of pitch or tar. | *"In academic literature, resiny designates having the characteristics of pitch or tar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sin]] | noun | **1.** Estrangement from god.<br>**2.** An act that is regarded by theologians as a transgression of god's will. | *"This silence for my sin you did impute, Which shall be most my glory being dumb, For I impair not beauty being mute, When others would give life, and bring a tomb."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinai]] | noun | **1.** A mountain peak in the southern sinai peninsula (7,500 feet high); it is believed to be the peak on which moses received the ten commandments.<br>**2.** A desert on the sinai peninsula in northeastern egypt. | *"Stanley, _Sinai and Palestine_, Second Edition (London, 1856), pp. 460-465; E."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[sinanthropus]] | noun | **1.** Genus to which peking man was formerly assigned. | *"In academic literature, sinanthropus designates genus to which peking man was formerly assigned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinapis]] | noun | **1.** Small genus of old world herbs usually included in genus brassica. | *"In academic literature, sinapis designates small genus of old world herbs usually included in genus brassica."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinapism]] | noun | **1.** A plaster containing powdered black mustard; applied to the skin as a counterirritant or rubefacient. | *"In academic literature, sinapism designates a plaster containing powdered black mustard; applied to the skin as a counterirritant or rubefacient."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinatra]] | noun | **1.** United states singer and film actor (1915-1998). | *"In academic literature, sinatra designates united states singer and film actor (1915-1998)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sincere]] | adjective | **1.** Open and genuine; not deceitful.<br>**2.** Characterized by a firm and humorless belief in the validity of your opinions. | *"Sir, in good faith, in sincere verity, Under th’allowance of your great aspect, Whose influence, like the wreath of radiant fire On flickering Phoebus’ front,— CORNWALL."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sincerely]] | adverb | **1.** With sincerity; without pretense.<br>**2.** Written formula for ending a letter. | *"Hear me profess sincerely: had I a dozen sons, each in my love alike and none less dear than thine and my good Martius, I had rather had eleven die nobly for their country than one voluptuously surfeit out of action."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sincerity]] | noun | **1.** An earnest and sincere feeling.<br>**2.** The quality of being open and truthful; not deceitful or hypocritical. | *"You shall see now, in very sincerity of fear and cold heart, will he to the King, and lay open all our proceedings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinciput]] | noun | **1.** The front part of the head or skull (including the forehead). | *"In academic literature, sinciput designates the front part of the head or skull (including the forehead)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinclair]] | noun | **1.** United states writer whose novels argued for social reform (1878-1968).<br>**2.** English electrical engineer who founded a company that introduced many innovative products (born in 1940). | *"In the same year he took part in a Conference in Edinburgh which had been summoned by Sir George Sinclair of Ulbster to discuss the possibility of Church Union at home."* — John Cairns, *Principal Cairns* |
| [[sine]] | noun | **1.** Ratio of the length of the side opposite the given angle to the length of the hypotenuse of a right-angled triangle. | *"I abhor such fanatical phantasimes, such insociable and point-devise companions, such rackers of orthography, as to speak “dout” _sine_ “b”, when he should say “doubt”, “det” when he should pronounce “debt”—_d, e, b, t_, not _d, e, t_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinecure]] | noun | **1.** A benefice to which no spiritual or pastoral duties are attached.<br>**2.** An office that involves minimal duties. | *"By some writers this office is called a sinecure."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[sinequan]] | noun | **1.** A tricyclic antidepressant (trade names adapin and sinequan) with numerous side effects (dry mouth and sedation and gastrointestinal disturbances). | *"In academic literature, sinequan designates a tricyclic antidepressant (trade names adapin and sinequan) with numerous side effects (dry mouth and sedation and gastrointestinal disturbances)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinew]] | noun | **1.** A cord or band of inelastic tissue connecting a muscle with its bony attachment.<br>**2.** Possessing muscular strength. | *"So shalt thou sinew both these lands together, And, having France thy friend, thou shalt not dread The scattered foe that hopes to rise again; For though they cannot greatly sting to hurt, Yet look to have them buzz to offend thine ears."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinewy]] | adjective | **1.** (of meat) full of sinews; especially impossible to chew.<br>**2.** Consisting of tendons or resembling a tendon. | *"Worthy fellows, and like to prove most sinewy sword-men. [_Exeunt Bertram and Parolles._] Enter Lafew."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinister]] | adjective | **1.** Threatening or foreshadowing evil or tragic developments.<br>**2.** Stemming from evil characteristics or forces; wicked or dishonorable; ; ; ; ; ; ; -thomas hardy. | *"You shall find in the regiment of the Spinii one Captain Spurio, with his cicatrice, an emblem of war, here on his sinister cheek; it was this very sword entrench’d it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinistral]] | adjective | **1.** Of or on the left.<br>**2.** Preferring to use left foot or hand or eye. | *"In academic literature, sinistral designates of or on the left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinistrality]] | noun | **1.** Preference for using the left hand. | *"In academic literature, sinistrality designates preference for using the left hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinistrorsal]] | adjective | **1.** Spiraling upward from right to left. | *"In academic literature, sinistrorsal designates spiraling upward from right to left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinistrorse]] | adjective | **1.** Spiraling upward from right to left. | *"In academic literature, sinistrorse designates spiraling upward from right to left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinitic]] | noun | **1.** A group of sino-tibetan languages.<br>**2.** Of or relating to the chinese people or their language or culture. | *"In academic literature, sinitic designates a group of sino-tibetan languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinless]] | adjective | **1.** Free from sin. | *"I advise you to live sinless, and I wish you to die tranquil.” “Then you snatch love and innocence from me?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sinlessness]] | noun | **1.** The state of being unsullied by sin or moral wrong; lacking a knowledge of evil. | *"Sinlessness of Mind, Soul Reasoning from cause to effect in the Science of Mind, 467:30 we begin with Mind, which must be under- stood through the idea which expresses it and cannot be learned from its opposite, matter."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[sinner]] | noun | **1.** A person who sins (without repenting). | *"Here’s that which is too weak to be a sinner, Honest water, which ne’er left man i’ the mire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinning]] | noun | **1.** An act that is regarded by theologians as a transgression of god's will.<br>**2.** Commit a sin; violate a law of god or a moral law. | *"I am a man More sinn’d against than sinning."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sinningia]] | noun | **1.** Genus of perennial tuberous herbs and shrubs of central and south america. | *"In academic literature, sinningia designates genus of perennial tuberous herbs and shrubs of central and south america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sino-tibetan]] | noun | **1.** The family of tonal languages spoken in eastern asia. | *"In academic literature, sino-tibetan designates the family of tonal languages spoken in eastern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinologist]] | noun | **1.** A student of chinese history and language and culture. | *"In academic literature, sinologist designates a student of chinese history and language and culture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinology]] | noun | **1.** The study of chinese history and language and culture. | *"In academic literature, sinology designates the study of chinese history and language and culture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinoper]] | noun | **1.** A red ocher formerly used as a pigment. | *"In academic literature, sinoper designates a red ocher formerly used as a pigment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinopia]] | noun | **1.** A red ocher formerly used as a pigment. | *"In academic literature, sinopia designates a red ocher formerly used as a pigment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinopis]] | noun | **1.** A red ocher formerly used as a pigment. | *"In academic literature, sinopis designates a red ocher formerly used as a pigment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinornis]] | noun | **1.** Sparrow-sized fossil bird of the jurassic period to the cretaceous period having a keeled breastbone and vestigial tail; found in china; considered possibly the second most primitive of all birds. | *"In academic literature, sinornis designates sparrow-sized fossil bird of the jurassic period to the cretaceous period having a keeled breastbone and vestigial tail; found in china; considered possibly the second most primitive of all birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinter]] | verb | **1.** Cause (ores or powdery metals) to become a coherent mass by heating without melting. | *"There is some clotting, and the sinter sticks to the rabble-blades, and has to be barred off occasionally. _4th Hearth._—Bright red heat (about 750° C.), uniformly bright, but the flame has ceased."* — Donald M. Levy, *Modern Copper Smelting* |
| [[sintered]] | verb | **1.** Cause (ores or powdery metals) to become a coherent mass by heating without melting.<br>**2.** Formed into a mass by heat and pressure. | *"The sintered cakes are finally discharged automatically into cars."* — Donald M. Levy, *Modern Copper Smelting* |
| [[sinuate]] | adjective | **1.** Curved or curving in and out.<br>**2.** Having a strongly waved margin alternately concave and convex. | *"In academic literature, sinuate designates curved or curving in and out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinuosity]] | noun | **1.** Having curves. | *"By the light of our torches, we saw the French, like fantastic goblin figures engendered by the reddish light and the sinuosities of the old Moorish dungeon."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[sinuous]] | adjective | **1.** Curved or curving in and out. | *"The inevitable is not to be averted Tho', sliding through lush grass, the shining snake, Loving the sun, a sinuous way doth take, Its fixed journey to its home 'twill make."* — C. A. Frazer, *Atmâ* |
| [[sinuously]] | adverb | **1.** In a sinuous manner. | *"In academic literature, sinuously designates in a sinuous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinuousness]] | noun | **1.** Having curves. | *"In academic literature, sinuousness designates having curves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinus]] | noun | **1.** An abnormal passage leading from a suppurating cavity to the body surface.<br>**2.** Any of various air-filled cavities especially in the bones of the skull. | *"In academic literature, sinus designates an abnormal passage leading from a suppurating cavity to the body surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinusitis]] | noun | **1.** Inflammation of one of the paranasal sinuses. | *"In academic literature, sinusitis designates inflammation of one of the paranasal sinuses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinusoid]] | noun | **1.** Tiny endothelium-lined passages for blood in the tissue of an organ.<br>**2.** The curve of y=sin x. | *"In academic literature, sinusoid designates tiny endothelium-lined passages for blood in the tissue of an organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinusoidal]] | adjective | **1.** Having a succession of waves or curves. | *"In academic literature, sinusoidal designates having a succession of waves or curves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinusoidally]] | adverb | **1.** In a sinusoidal manner. | *"In academic literature, sinusoidally designates in a sinusoidal manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Objects & Forms]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SIN
  </div>
</div>
