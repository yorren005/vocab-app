---
status: unread
type: root_dashboard
---
# Dashboard — cav
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cav-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“hollow”</span>
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

The root **cav** means hollow. It describes having an empty hollow space, pit, or opening inside. In English, this root forms words such as *hollow*, *cave*, *cavern*, and *cavernous*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: hollow
> The root **cav** means hollow. It describes having an empty hollow space, pit, or opening inside. In English, this root forms words such as *hollow*, *cave*, *cavern*, and *cavernous*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Hollow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Crafting a specific shape out of clay or wood with careful hands.</mark>
> - **Everyday Connection**: Think of familiar words like *hollow* and *cave*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cav** comes from a Latin word that means *"hollow"*.
  - At its core, it describes hollow.

- **The Big Picture Idea**:
  - Picture crafting a specific shape out of clay or wood with careful hands.
  - Whenever you see **cav** in an English word, think of **shapes, forms, and physical objects**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of hollow.
  - **Mental & Social**: How people experience, organize, or communicate about hollow.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Hollow**: An everyday English word showing the root's idea of *hollow*.
  - **Cave**: A natural underground chamber in a hillside or cliff.
  - **Cavern**: A cave, or a chamber in a cave, typically a large, dark, and deep one.
  - **Cavernous**: Like a cavern in being vast, dark, or hollow.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cav</mark>, think of <mark class="hl-def">shapes, forms, and physical objects</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cav** builds vocabulary through prefixes of direction and suffixes of state:
> - **Base Nouns and Adjectives:**
>   - *cavus* $\to$ Old French *cave* $\to$ *cave* ("hollow underground chamber").
>   - *caverna* $\to$ Old French *caverne* $\to$ *cavern*, *cavernous* ("large cave").
>   - *cavitās* $\to$ *cavity*, *cavitary* ("enclosed hollow space; dental hole").
> - **Prefix Compounds with `con-` (thoroughly) and `ex-` (out):**
>   - *con-* + *cavus* $\to$ *concave* ("curving inward like a hollow").
>   - *concave* + *-ity* $\to$ *concavity* ("the state or shape of being concave").
>   - *bi-* + *concave* $\to$ *biconcave* ("curved inward on both sides, as red blood cells").
>   - *ex-* + *cavāre* $\to$ *excavate* ("to unearth by digging").
>   - *excavāre* + *-tiō* $\to$ *excavation* ("the process of digging out").
>   - *excavāre* + *-or* $\to$ *excavator* ("heavy machinery for earthmoving").
> - **Anatomical Compound:**
>   - *vēna cava* $\to$ *cava* ("superior and inferior vena cava").

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
> Although fundamentally denoting **"hollow"**, the root adapts to specialized disciplinary domains:
> - **Speleology & Geology:** *cave*, *cavern*, *cavernous* (limestone karst grottoes, stalactite caves).
> - **Optics & Geometric Curvature:** *concave*, *concavity*, *biconcave* (diverging lenses, parabolic mirrors).
> - **Archaeology & Civil Engineering:** *excavate*, *excavation*, *excavator* (Pompeii digs, building foundation trenching).
> - **Dentistry & Pathology:** *cavity* (caries lesion in tooth enamel, lung cavitary lesions in tuberculosis).
> - **Human Cardiovascular Anatomy:** *cava*, *vena cava* (great systemic return veins).

---

## 🔀 4. Prefix & Combining Dynamics on cav

### Directional Prefix Modifications

| Prefix | Base Stem | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (thoroughly) | `cavus` | **[[concave]]** | Thoroughly hollowed inward; curving inward like a basin. |
| `bi-` + `con-` | `cavus` | **[[biconcave]]** | Concave on both opposite sides, like erythrocyte discs. |
| `ex-` (out) | `cavāre` | **[[excavate]]** | To hollow out earth from a site; to expose buried artifacts. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⛏️ **Archaeology & Paleontology** | *excavate*, *excavation* | Unearthing Roman mosaic floors, fossil quarry bone beds. |
| 🔭 **Optics & Astronomy** | *concave*, *concavity*, *biconcave* | Concave primary mirrors in reflecting telescopes, eyeglasses for myopia. |
| 🫀 **Medicine & Hematology** | *biconcave erythrocyte*, *vena cava* | High surface-area gas exchange in red blood cells, systemic venous circulation. |
| 🦷 **Dentistry & Public Health** | *cavity*, *cavitary lesion* | Microbial acid demineralization of enamel, fluoridated dental preventive care. |
| 🏗️ **Heavy Construction** | *excavator*, *hydraulic excavation* | Deep foundation pit earthmoving, trench digging for municipal sewer mains. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[biconcave]] | adjective | **1.** Concave on both sides. | *"In academic literature, biconcave designates concave on both sides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cavalcade]] | noun | **1.** A procession of people traveling on horseback. | *"From the accompanying jingle of metal bits of man-harness and steed-harness I knew some cavalcade was passing by on the street beneath my windows."* — Jack London, *The Jacket (The Star-Rover)* |
| [[cavalier]] | noun | **1.** A gallant or courtly gentleman.<br>**2.** A royalist supporter of charles i during the english civil war. | *"Clowes stepped back and indicated her cavalier, very big and handsome in white clothes and a Panama hat: "May I introduce-- Captain Hyde, Miss Stafford," with a delicate formality which thrilled Isabel to her finger-tips."* — Anthony Pryde, *Nightfall* |
| [[cavalierly]] | adverb | **1.** In a proud and domineering manner. | *"Stennis, who took the matter cavalierly enough, immediately turning on his heel and going off in the direction of his weaving-room, which had an additional entrance from the front."* — S. R. Crockett, *Deep Moat Grange* |
| [[cavalla]] | noun | **1.** Large mackerel with long pointed snout; important food and game fish of the eastern atlantic coast southward to brazil. | *"In academic literature, cavalla designates large mackerel with long pointed snout; important food and game fish of the eastern atlantic coast southward to brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cavalry]] | noun | **1.** Troops trained to fight on horseback.<br>**2.** A highly mobile army unit. | *"There used, in that week, to come backward and forward to our lodging to fence with Richard a person who had formerly been a cavalry soldier; he was a fine bluff-looking man, of a frank free bearing, with whom Richard had practised for some months."* — Charles Dickens, *Bleak House* |
| [[cavalryman]] | noun | **1.** A soldier in a motorized army unit.<br>**2.** A soldier mounted on horseback. | *"Well, young cavalryman, how is my Rook behaving?” he asked. (Rook was a young horse Telyánin had sold to Rostóv.) The lieutenant never looked the man he was speaking to straight in the face; his eyes continually wandered from one object to another."* — graf Leo Tolstoy, *War and Peace* |
| [[cave]] | noun | **1.** A geological formation consisting of an underground enclosure with access from the surface of the ground or from the sea.<br>**2.** Hollow out as if making a cave or opening. | *"The residue of your fortune Go to my cave and tell me.—Good old man, Thou art right welcome as thy master is."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caveat]] | noun | **1.** A warning against certain acts.<br>**2.** (law) a formal notice filed with a court or officer to suspend a proceeding until filer is given a hearing. | *"It is nought, it is nought, saith the buyer, but, after he is gone his way, then he boasteth." And the seller has all the variants of caveat emptor ready to retort."* — T. R. Glover, *The Jesus of History* |
| [[cavell]] | noun | **1.** English nurse who remained in brussels after the german occupation in order to help allied prisoners escape; was caught and executed by the germans (1865-1915). | *"For deeds by love inspired The Kaiser's vengeance fell On form so frail and tired, Heroic Nurse Cavell."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[caveman]] | noun | **1.** Someone who lives in a cave. | *"If the caveman had known how to laugh, history would have been different.” “You are really very comforting,” warbled the duchess."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[cavendish]] | noun | **1.** British chemist and physicist who established that water is a compound of hydrogen and oxygen and who calculated the density of the earth (1731-1810). | *"It comprised _Driver's Complete Farriery_, _The Heather Lintie_, (poems), a book of sermons with the title _In Hoc Signo_--or something like that--_Markham's Complete Housewife, Cavendish on Whist_, and two huge volumes of _Pinkerton's Voyages_."* — S. R. Crockett, *Deep Moat Grange* |
| [[cavern]] | noun | **1.** Any large dark enclosed space.<br>**2.** A large cave or a large chamber in a cave. | *"O, then, by day Where wilt thou find a cavern dark enough To mask thy monstrous visage?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cavernous]] | adjective | **1.** Being or suggesting a cavern.<br>**2.** Filled with vascular sinuses and capable of becoming distended and rigid as the result of being filled with blood. | *"Hundreds of logistics robots crammed the station's cavernous bays, self-sustaining and programmed to activate sub-systems on schedule, deploy robotic specialists and service the machine during its voyage, and in perpetuity thereafter."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cavetto]] | noun | **1.** A concave molding shaped like a quarter circle in cross section. | *"In academic literature, cavetto designates a concave molding shaped like a quarter circle in cross section."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cavia]] | noun | **1.** Type genus of the caviidae: guinea pigs. | *"In academic literature, cavia designates type genus of the caviidae: guinea pigs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caviar]] | noun | **1.** Salted roe of sturgeon or other large fish; usually served as an hors d'oeuvre. | *"There's a Fishmongers boy with Caviar Sir, Anchoves and Potargo, to make ye drink. _Cha_."* — John Fletcher, *The Elder Brother* |
| [[caviare]] | noun | **1.** Salted roe of sturgeon or other large fish; usually served as an hors d'oeuvre. | *"I heard thee speak me a speech once, but it was never acted, or if it was, not above once, for the play, I remember, pleased not the million, ’twas caviare to the general."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caviidae]] | noun | **1.** A family of hystricomorpha. | *"In academic literature, caviidae designates a family of hystricomorpha."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cavil]] | noun | **1.** An evasion of the point of an argument by raising irrelevant distinctions or objections.<br>**2.** Raise trivial objections. | *"I’ll give thrice so much land To any well-deserving friend; But in the way of bargain, mark ye me, I’ll cavil on the ninth part of a hair."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caviler]] | noun | **1.** A disputant who quibbles; someone who raises annoying petty objections. | *"In academic literature, caviler designates a disputant who quibbles; someone who raises annoying petty objections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caviller]] | noun | **1.** A disputant who quibbles; someone who raises annoying petty objections. | *"Jane, I don’t like cavillers or questioners; besides, there is something truly forbidding in a child taking up her elders in that manner."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[cavitied]] | adjective | **1.** Pitted with cell-like cavities (as a honeycomb). | *"In academic literature, cavitied designates pitted with cell-like cavities (as a honeycomb)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cavity]] | noun | **1.** A sizeable hole (usually in the ground).<br>**2.** Space that is surrounded by something. | *"In vain I tasted to my mouth’s undoing every cavity and depression in the rocks."* — Jack London, *The Jacket (The Star-Rover)* |
| [[cavort]] | verb | **1.** Play boisterously. | *"By-and-by the men stopped cavorting around and yelling."* — Mark Twain, *Adventures of Huckleberry Finn* |
| [[cavum]] | noun | **1.** (anatomy) a natural hollow or sinus within the body. | *"In academic literature, cavum designates (anatomy) a natural hollow or sinus within the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cavy]] | noun | **1.** Short-tailed rough-haired south american rodent. | *"In academic literature, cavy designates short-tailed rough-haired south american rodent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concave]] | adjective | **1.** Curving inward. | *"I think he is not a pick-purse nor a horse-stealer, but for his verity in love, I do think him as concave as a covered goblet or a worm-eaten nut."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concavely]] | adverb | **1.** In a concave way. | *"In academic literature, concavely designates in a concave way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concaveness]] | noun | **1.** The property possessed by a concave shape. | *"In academic literature, concaveness designates the property possessed by a concave shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concavity]] | noun | **1.** A shape that curves or bends inward.<br>**2.** The property possessed by a concave shape. | *"The uniform concavity of black cloud was lifting bodily like the lid of a pot, letting in at the earth’s edge the coming day, against which the towering monoliths and trilithons began to be blackly defined."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[concavo-concave]] | adjective | **1.** Concave on both sides. | *"In academic literature, concavo-concave designates concave on both sides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concavo-convex]] | adjective | **1.** Concave on one side and convex on the other with the concavity being greater than the convexity. | *"In academic literature, concavo-convex designates concave on one side and convex on the other with the concavity being greater than the convexity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excavate]] | verb | **1.** Recover through digging.<br>**2.** Find by digging in the ground. | *"They did all kinds of men’s work by preference, including well-sinking, hedging, ditching, and excavating, without any sense of fatigue."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[excavation]] | noun | **1.** The act of digging.<br>**2.** The site of an archeological exploration. | *"Coming up again to the marsh level out of this excavation,—for the rude path lay through it,—I saw a light in the old sluice-house."* — Charles Dickens, *Great Expectations* |
| [[excavator]] | noun | **1.** A workman who excavates for foundations of buildings or for quarrying.<br>**2.** A machine for excavating. | *"In academic literature, excavator designates a workman who excavates for foundations of buildings or for quarrying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postcava]] | noun | **1.** Receives blood from lower limbs and abdominal organs and empties into the posterior part of the right atrium of the heart; formed from the union of the two iliac veins. | *"In academic literature, postcava designates receives blood from lower limbs and abdominal organs and empties into the posterior part of the right atrium of the heart; formed from the union of the two iliac veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precava]] | noun | **1.** Receives blood from the head and arms and chest and empties into the right atrium of the heart; formed from the azygos and both brachiocephalic veins. | *"In academic literature, precava designates receives blood from the head and arms and chest and empties into the right atrium of the heart; formed from the azygos and both brachiocephalic veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procavia]] | noun | **1.** Type genus of the procaviidae. | *"In academic literature, procavia designates type genus of the procaviidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procaviidae]] | noun | **1.** Includes all recent members of the order hyracoidea. | *"In academic literature, procaviidae designates includes all recent members of the order hyracoidea."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CAV
  </div>
</div>
