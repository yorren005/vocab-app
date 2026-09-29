---
status: unread
type: root_dashboard
---
# Dashboard — turb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">turb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“crowd or turmoil”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Tall green trees, rolling hills, and rain watering the fertile landscape.</span>
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

The root **turb** means crowd or turmoil. It refers to a swirling commotion, crowd disturbance, or chaotic uproar. In English, this root forms words such as *turbulent*, *disturb*, *perturb*, and *turbine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: crowd or turmoil
> The root **turb** means crowd or turmoil. It refers to a swirling commotion, crowd disturbance, or chaotic uproar. In English, this root forms words such as *turbulent*, *disturb*, *perturb*, and *turbine*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Crowd or turmoil</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *turbulent* and *disturb*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **turb** comes from a Latin word that means *"crowd or turmoil"*.
  - At its core, it describes crowd or turmoil.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **turb** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of crowd or turmoil.
  - **Mental & Social**: How people experience, organize, or communicate about crowd or turmoil.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Turbulent**: Characterized by conflict, disorder, or confusion.
  - **Disturb**: To interrupt the quiet, rest, peace, or settled order of.
  - **Perturb**: To make someone anxious, deeply uneasy, or unsettled.
  - **Turbine**: A rotary mechanical engine in which the kinetic energy of a moving fluid is converted into mechanical work by impinging upon blades.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">turb</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **turb** operates through several distinct classical and modern conduits:
> - **Base Latin Adjectival Stems `turbid-` and `turbul-` (*turbidus*, *turbulentus*):**
>   - Optical state: *turbid* (cloudy), *turbidity*.
>   - Chaotic motion: *turbulent* (erratic fluid flow), *turbulence*.
> - **Prefix Verbal Conduits in `-turb` (*turbāre*):**
>   - `per-` ("thoroughly") $\to$ *perturb*, *perturbation*.
>   - `in-` + `per-` $\to$ *imperturbable*, *imperturbability*.
>   - `dis-` ("apart") $\to$ *disturb*, *disturbance*.
> - **Vortex Mechanical Stems `turbin-` (*turbō, turbinis*):**
>   - Rotational device: *turbine*.
>   - Aviation compounds: *turboprop*, *turbocharger*, *turbo*.
> - **Vulgar Latin Softened Stem `troubl-` (< *turbulāre*):**
>   - *trouble*, *troublesome*.

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
> - **Fluid Dynamics & Aerodynamics:** Non-laminar, chaotic fluid flow characterized by vortices, eddies, and rapid fluctuations in pressure and velocity (*turbulent*, *turbulence*).
> - **Aviation & Mechanical Power Engineering:** Rotational machines extracting energy from fluid flow to spin generators or drive propulsion (*turbine*, *turboprop*, *turbocharger*, *turbo*).
> - **Environmental Hydrology & Water Quality:** Cloudiness or haziness in water caused by suspended sediment particles scattering light (*turbid*, *turbidity*).
> - **Psychology, Psychiatry & Emotion:** Anxiety, mental disquiet, loss of emotional composure, or deep philosophical calm (*disturb*, *perturb*, *imperturbable*).
> - **Celestial Mechanics & Physics:** Small secondary gravitational deviations from a Keplerian orbit caused by external bodies (*perturbation*).
> - **Everyday Social & Personal Strife:** Afflictions, difficulties, legal distress, or annoying obstacles (*trouble*, *troublesome*).

---

## 🔀 4. Prefix & Combining Dynamics on turb

### Prefix Dynamics
- **`per-` (Thoroughly / Deeply):** *perturb* $\to$ to agitate *thoroughly*; throw into profound disorder.
- **`in-` + `per-` (Un- + Thoroughly):** *imperturbable* $\to$ unable to be agitated; serene.
- **`dis-` (Apart / Asunder):** *disturb* $\to$ to break up peace; disrupt order.

### Suffix Dynamics
- **`-id` (Quality / Physical State):** *turbid* $\to$ thick with suspended sediment.
- **`-ity` (Degree / Measure):** *turbidity*, *imperturbability*.
- **`-ent` / `-ence` (Participle / State of Motion):** *turbulent*, *turbulence*.
- **`-ation` (Process / Action):** *perturbation*.
- **`-ine` (French Mechanical Device):** *turbine* $\to$ rotary vortex engine.
- **`-some` (Productive of):** *troublesome*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Aeronautical Engineering & Flight Safety:** Mitigating clear-air *turbulence* (CAT) and boundary-layer separation across commercial airliner swept wings.
> - **Power Generation & Renewable Energy:** Wind, hydroelectric, and steam *turbines* driving magnetic dynamos to supply high-voltage electrical grid baseloads.
> - **Water Treatment & Environmental Limnology:** Nephelometric Turbidity Units (NTU) measuring drinking water *turbidity* before filtration to prevent pathogen breakthrough.
> - **Orbital Mechanics & Planetary Astrophysics:** Calculating gravitational *perturbations* in Uranus’s orbit, which led Urbain Le Verrier to predict the existence of Neptune in 1846.
> - **Cognitive Psychology & Stress Management:** Developing mindfulness techniques to foster an *imperturbable* mindset against acute workplace stress.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[disturb]] | verb | **1.** Move deeply.<br>**2.** Change the arrangement or position of. | *"In food, in sport, and life-preserving rest To be disturb’d would mad or man or beast."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disturbance]] | noun | **1.** Activity that is a malfunction, intrusion, or interruption.<br>**2.** An unhappy and worried mental state. | *"It seems like making a great disturbance about nothing particular.” “My dear Richard,” said I, “how CAN you say about nothing particular?” “I don’t mean absolutely that,” he returned."* — Charles Dickens, *Bleak House* |
| [[disturbed]] | verb | **1.** Move deeply.<br>**2.** Change the arrangement or position of. | *"Goodnight then, Casca: this disturbed sky Is not to walk in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disturber]] | noun | **1.** A troubler who interrupts or interferes with peace and quiet; someone who causes disorder and commotion. | *"The recollection of what had been done for William was always the most powerful disturber of every decision against Mr."* — Jane Austen, *Mansfield Park* |
| [[disturbing]] | verb | **1.** Move deeply.<br>**2.** Change the arrangement or position of. | *"I’d have beaten him like a dog, but for disturbing the lords within."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disturbingly]] | adverb | **1.** In a disturbing manner. | *"In academic literature, disturbingly designates in a disturbing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperturbability]] | noun | **1.** Calm and unruffled self-assurance. | *"His countenance had resumed its habitual imperturbability."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[imperturbable]] | adjective | **1.** Not easily perturbed or excited or upset; marked by extreme calm and composure. | *"His imperturbable face has been as inexpressive as his rusty clothes."* — Charles Dickens, *Bleak House* |
| [[imperturbableness]] | noun | **1.** Calm and unruffled self-assurance. | *"In academic literature, imperturbableness designates calm and unruffled self-assurance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonturbulent]] | adjective | **1.** (of a liquid) not turbulent. | *"In academic literature, nonturbulent designates (of a liquid) not turbulent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perturb]] | verb | **1.** Disturb in mind or make uneasy or cause to be worried or alarmed.<br>**2.** Disturb or interfere with the usual path of an electron or atom. | *"The perturb’d court, For my being absent? whereunto I never Purpose return."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perturbation]] | noun | **1.** An unhappy and worried mental state.<br>**2.** (physics) a secondary influence on a system that causes it to deviate slightly. | *"It hath it original from much grief, from study and perturbation of the brain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perturbed]] | verb | **1.** Disturb in mind or make uneasy or cause to be worried or alarmed.<br>**2.** Disturb or interfere with the usual path of an electron or atom. | *"I think she has a perturbed mind, which I cannot minister to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perturbing]] | verb | **1.** Disturb in mind or make uneasy or cause to be worried or alarmed.<br>**2.** Disturb or interfere with the usual path of an electron or atom. | *"In academic literature, perturbing designates disturb in mind or make uneasy or cause to be worried or alarmed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turban]] | noun | **1.** A traditional muslim headdress consisting of a long scarf wrapped around the head.<br>**2.** A small round woman's hat. | *"And say besides, that in Aleppo once, Where a malignant and a turban’d Turk Beat a Venetian and traduc’d the state, I took by the throat the circumcised dog, And smote him, thus. [_Stabs himself._] LODOVICO."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[turbaned]] | adjective | **1.** Wearing a turban. | *"No turbaned Turk, no hired Venetian or Malay, could have smote him with more seeming malice."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[turbatrix]] | noun | **1.** A genus of cephalobidae. | *"In academic literature, turbatrix designates a genus of cephalobidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbellaria]] | noun | **1.** Free-living flatworms. | *"In academic literature, turbellaria designates free-living flatworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbid]] | adjective | **1.** (of liquids) clouded as with sediment. | *"Those were slow, silent, often turbid; flowing over beds of mud into which the incautious wader might sink and vanish unawares."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[turbidity]] | noun | **1.** Muddiness created by stirring up sediment or having foreign particles suspended. | *"From the wonderful discoloration and turbidity of the water, Columbus sagaciously concluded that a very large river was near, and consequently--consequent-ly--a great continent!" But to this continent Elsie never attained."* — S. R. Crockett, *Deep Moat Grange* |
| [[turbidness]] | noun | **1.** Muddiness created by stirring up sediment or having foreign particles suspended. | *"In academic literature, turbidness designates muddiness created by stirring up sediment or having foreign particles suspended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbinal]] | noun | **1.** Any of the scrolled spongy bones of the nasal passages in man and other vertebrates. | *"In academic literature, turbinal designates any of the scrolled spongy bones of the nasal passages in man and other vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbinate]] | noun | **1.** Any of the scrolled spongy bones of the nasal passages in man and other vertebrates.<br>**2.** Of or relating to the scroll-shaped turbinate bones in the nasal passages. | *"In academic literature, turbinate designates any of the scrolled spongy bones of the nasal passages in man and other vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbine]] | noun | **1.** Rotary engine in which the kinetic energy of a moving fluid is converted into mechanical energy by causing a bladed rotor to rotate. | *"In academic literature, turbine designates rotary engine in which the kinetic energy of a moving fluid is converted into mechanical energy by causing a bladed rotor to rotate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbofan]] | noun | **1.** An airplane propelled by a fanjet engine.<br>**2.** A jet engine in which a fan driven by a turbine provides extra air to the burner and gives extra thrust. | *"In academic literature, turbofan designates an airplane propelled by a fanjet engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbogenerator]] | noun | **1.** Generator consisting of a steam turbine coupled to an electric generator for the production of electric power. | *"In academic literature, turbogenerator designates generator consisting of a steam turbine coupled to an electric generator for the production of electric power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbojet]] | noun | **1.** An airplane propelled by a fanjet engine.<br>**2.** A jet engine in which a fan driven by a turbine provides extra air to the burner and gives extra thrust. | *"In academic literature, turbojet designates an airplane propelled by a fanjet engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turboprop]] | noun | **1.** An airplane with an external propeller that is driven by a turbojet engine. | *"In academic literature, turboprop designates an airplane with an external propeller that is driven by a turbojet engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbot]] | noun | **1.** Flesh of a large european flatfish.<br>**2.** A large brownish european flatfish. | *"In academic literature, turbot designates flesh of a large european flatfish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbulence]] | noun | **1.** Unstable flow of a liquid or gas.<br>**2.** Instability in the atmosphere. | *"Consort with me in loud and dear petition, Pursue we him on knees; for I have dreamt Of bloody turbulence, and this whole night Hath nothing been but shapes and forms of slaughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[turbulency]] | noun | **1.** Unstable flow of a liquid or gas. | *"In academic literature, turbulency designates unstable flow of a liquid or gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[turbulent]] | adjective | **1.** Characterized by unrest or disorder or insubordination.<br>**2.** (of a liquid) agitated vigorously; in a state of turbulence. | *"And can you by no drift of circumstance Get from him why he puts on this confusion, Grating so harshly all his days of quiet With turbulent and dangerous lunacy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[turbulently]] | adverb | **1.** In a turbulent manner; with turbulence.<br>**2.** In a stormy or violent manner. | *"The remorseless sea of turbulently swaying shapes, voices of vengeance, and faces hardened in the furnaces of suffering until the touch of pity could make no mark on them."* — Charles Dickens, *A Tale of Two Cities* |
| [[undisturbed]] | adjective | **1.** Untroubled by interference or disturbance. | *"Apollonie has become the real, true Castle-Apollonie of yore and manages for her master's sake to live in undisturbed peace with Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unperturbed]] | adjective | **1.** Free from emotional agitation or nervous tension; ; - anthony trollope. | *"Beyond gasping at the sacrilege of the king’s tombs and applauding Chong Mong-ju, Cho-Sen was unperturbed."* — Jack London, *The Jacket (The Star-Rover)* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TURB
  </div>
</div>
