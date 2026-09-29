---
status: unread
type: root_dashboard
---
# Dashboard — ferr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ferr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“iron”</span>
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

The root **ferr** means iron. It refers to strong, heavy metallic elements and rigid unbending firmness. In English, this root forms words such as *ferrous*, *ferric*, *ferrite*, and *ferroconcrete*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: iron
> The root **ferr** means iron. It refers to strong, heavy metallic elements and rigid unbending firmness. In English, this root forms words such as *ferrous*, *ferric*, *ferrite*, and *ferroconcrete*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Iron</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *ferrous* and *ferric*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ferr** comes from a Latin word that means *"iron"*.
  - At its core, it describes iron.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **ferr** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of iron.
  - **Mental & Social**: How people experience, organize, or communicate about iron.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ferrous**: Containing or relating to iron, specifically in its divalent oxidation state.
  - **Ferric**: Containing or relating to iron in its trivalent oxidation state.
  - **Ferrite**: A solid interstitial solution of carbon in alpha-iron having a body-centered cubic crystal structure.
  - **Ferroconcrete**: Concrete reinforced with embedded iron rods, steel bars, or wire mesh to withstand tensile stresses.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ferr</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ferr** manifests across multiple productive morphological conduits:
> - **Chemical Adjectival Valences `ferr-ous` and `ferr-ic`:**
>   - *ferrous* (divalent $Fe^{2+}$) vs. *ferric* (trivalent $Fe^{3+}$).
> - **Combining Form `ferro-` (Iron Alloys, Compounds & Physics):**
>   - Engineering composites: *ferroconcrete*, *ferroalloy*, *ferrochrome*.
>   - Physics phenomena: *ferromagnetic*, *ferromagnetism*, *ferroelectric*, *ferrofluid*.
>   - Historical media: *ferrotype* (tintype photograph).
> - **Rust & Color Stem `ferrugin-` (*ferrūgō*):**
>   - Adjective: *ferruginous* (rust-colored, rich in iron oxides).
> - **Biochemical Protein Nomenclature:**
>   - Storage & transport: *ferritin* (iron storage protein), *transferrin* (iron transport globulin).
> - **Vernacular French/Norman Reflexes:**
>   - *farrier* (< *ferrārī*), *ferrule* (< *virole* + *ferrum*).

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
> - **Structural Metallurgy & Civil Architecture:** Reinforced concrete incorporating steel/iron rebar, heavy alloys, and construction components (*ferroconcrete*, *ferroalloy*, *ferrochrome*).
> - **Classical Inorganic Chemistry:** Systematic chemical nomenclature distinguishing lower and higher oxidation states of iron (*ferrous*, *ferric*).
> - **Condensed Matter Physics & Electromagnetism:** Spontaneous magnetic ordering of electron spins, ceramic inductor cores, and magnetic liquids (*ferromagnetic*, *ferrite*, *ferrofluid*, *ferroelectricity*).
> - **Biochemistry & Human Hematology:** Vital physiological proteins responsible for storing and transporting iron ions through blood plasma (*ferritin*, *transferrin*).
> - **Geology, Mineralogy & Soil Science:** Dark mafic silicate minerals, rusty soils, and bog iron deposits (*ferruginous*, *ferromagnesian*).
> - **Traditional Mechanical Crafts:** Equine hoof management, shoe forging, and reinforced protective rings (*farrier*, *ferrule*).

---

## 🔀 4. Prefix & Combining Dynamics on ferr

### Prefix Dynamics
- **`trans-` (Across / Through):**
  - $\to$ *transferrin*: Glycoprotein that carries iron *across* membranes and through the bloodstream.

### Suffix Dynamics
- **`-ous` (Lower Oxidation State / Full of):** *ferrous* $\to$ containing divalent $Fe^{2+}$ iron.
- **`-ic` (Higher Oxidation State):** *ferric* $\to$ containing trivalent $Fe^{3+}$ iron.
- **`-ite` (Mineral / Chemical Salt):** *ferrite* $\to$ ceramic iron-oxide compound or alpha-iron phase.
- **`-in` (Biochemical Substance):** *ferritin* $\to$ iron-binding storage protein complex.
- **`-inous` (*-īnus* / Characterized by):** *ferruginous* $\to$ rust-colored, oxide-bearing.
- **`-er` (Agent / Craft Specialist):** *farrier* $\to$ craftsman who shoes horses.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Structural Engineering & Architecture:** Auguste Perret and Le Corbusier utilizing *ferroconcrete* (reinforced concrete) to pioneer modern cantilevered high-rises and bridges.
> - **Hematology & Clinical Medicine:** Diagnostic screening of serum *ferritin* and total iron-binding capacity (*transferrin*) to evaluate hemochromatosis and microcytic anemia.
> - **Electrical Engineering & Computing:** High-permeability *ferrite* beads for electromagnetic interference (EMI) suppression in power supplies and telecommunication antennas.
> - **Solid-State Physics & Nanotechnology:** Synthesis of colloidal *ferrofluids* for magnetic resonance imaging (MRI) contrast agents and high-fidelity loudspeaker dampening.
> - **Petrology & Vulcanology:** Analysis of dark *ferromagnesian* minerals (pyroxene, amphibole, biotite) in basaltic and andesitic magma crystallization.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiferromagnetic]] | adjective | **1.** Relating to antiferromagnetism. | *"In academic literature, antiferromagnetic designates relating to antiferromagnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiferromagnetism]] | noun | **1.** Magnetic field creates parallel but opposing spins; varies with temperature. | *"In academic literature, antiferromagnetism designates magnetic field creates parallel but opposing spins; varies with temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conferral]] | noun | **1.** The act of conferring an honor or presenting a gift. | *"In academic literature, conferral designates the act of conferring an honor or presenting a gift."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conferrer]] | noun | **1.** Person who makes a gift of property.<br>**2.** Someone who converses or confers (as in a conference). | *"In academic literature, conferrer designates person who makes a gift of property."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deferral]] | noun | **1.** A state of abeyance or suspended business.<br>**2.** Act of putting off to a future time. | *"In academic literature, deferral designates a state of abeyance or suspended business."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferrara]] | noun | **1.** A city in northern italy. | *"Item, you sent a large commission To Gregory de Cassado, to conclude, Without the King’s will or the state’s allowance, A league between his Highness and Ferrara."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ferret]] | noun | **1.** Musteline mammal of prairie regions of united states; nearly extinct.<br>**2.** Domesticated albino variety of the european polecat bred for hunting rats and rabbits. | *"I’ll fer him, and firk him, and ferret him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ferret-sized]] | adjective | **1.** Having the approximate size of a ferret. | *"In academic literature, ferret-sized designates having the approximate size of a ferret."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferric]] | adjective | **1.** Of or relating to or containing iron. | *"Aëration of the solution, especially when warmed, leads to the formation of basic ferric sulphates which are insoluble, and which therefore accumulate at the bottom of the tank."* — Donald M. Levy, *Modern Copper Smelting* |
| [[ferricyanide]] | noun | **1.** Salt of ferricyanic acid obtained by oxidation of a ferrocyanide. | *"In academic literature, ferricyanide designates salt of ferricyanic acid obtained by oxidation of a ferrocyanide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferrimagnetism]] | noun | **1.** A phenomenon in ferrites where there can be incomplete cancellation of antiferromagnetic arranged spins giving a net magnetic moment. | *"In academic literature, ferrimagnetism designates a phenomenon in ferrites where there can be incomplete cancellation of antiferromagnetic arranged spins giving a net magnetic moment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferrite]] | noun | **1.** A solid solution in which alpha iron is the solvent. | *"In academic literature, ferrite designates a solid solution in which alpha iron is the solvent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferritin]] | noun | **1.** A protein containing 20% iron that is found in the intestines and liver and spleen; it is one of the chief forms in which iron is stored in the body. | *"In academic literature, ferritin designates a protein containing 20% iron that is found in the intestines and liver and spleen; it is one of the chief forms in which iron is stored in the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferrocerium]] | noun | **1.** A pyrophoric alloy of iron with cerium; used for lighter flints. | *"In academic literature, ferrocerium designates a pyrophoric alloy of iron with cerium; used for lighter flints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferroconcrete]] | noun | **1.** Concrete with metal and/or mesh added to provide extra support against stresses. | *"In academic literature, ferroconcrete designates concrete with metal and/or mesh added to provide extra support against stresses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferrocyanide]] | noun | **1.** Salt of ferrocyanic acid usually obtained by a reaction of a cyanide with iron sulphate. | *"In academic literature, ferrocyanide designates salt of ferrocyanic acid usually obtained by a reaction of a cyanide with iron sulphate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferromagnetic]] | adjective | **1.** Relating to or demonstrating ferromagnetism. | *"In academic literature, ferromagnetic designates relating to or demonstrating ferromagnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferromagnetism]] | noun | **1.** Phenomenon exhibited by materials like iron (nickel or cobalt) that become magnetized in a magnetic field and retain their magnetism when the field is removed. | *"In academic literature, ferromagnetism designates phenomenon exhibited by materials like iron (nickel or cobalt) that become magnetized in a magnetic field and retain their magnetism when the field is removed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ferrous]] | adjective | **1.** Of or relating to or containing iron. | *"The principle had, indeed, been utilised in certain branches of iron smelting before this date, but for non-ferrous work the idea was new."* — Donald M. Levy, *Modern Copper Smelting* |
| [[ferruginous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ferr within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of ferr in systematic terminology. | *"Sir Leicester receives that ferruginous person graciously."* — Charles Dickens, *Bleak House* |
| [[ferrule]] | noun | **1.** A metal cap or band placed on a wooden pole to prevent splitting. | *"Look, did not this stump come from thy shop?” “I believe it did, sir; does the ferrule stand, sir?” “Well enough."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[ferry]] | noun | **1.** A boat that transports people or vehicles across a body of water and operates on a regular schedule.<br>**2.** Transport by boat or aircraft. | *"Now for this charm that I told you of: you must bring a piece of silver on the tip of your tongue, or no ferry."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ferryboat]] | noun | **1.** A boat that transports people or vehicles across a body of water and operates on a regular schedule. | *"And many a goodly cargo of corn from Hereford, and wine from Normandy, has been disembarked at that old pier, where the abbot’s galley has degenerated into a clumsy ferryboat, with old Richard Tamplin, the ferryman, for its commander."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[ferrying]] | noun | **1.** Transport by boat or aircraft.<br>**2.** Transport from one place to another. | *"But such as it is, this is the one connecting link between China and Tibet, for ferrying across the upper reaches of the Ta Tu is impracticable most of the year."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[ferryman]] | noun | **1.** A man who operates a ferry. | *"I passed, methought, the melancholy flood, With that sour ferryman which poets write of, Unto the kingdom of perpetual night."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preferred]] | verb | **1.** Like better; value more highly.<br>**2.** Select as an alternative over another. | *"Peace, son!—And show some reason, Buckingham, Why Somerset should be preferred in this."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[referral]] | noun | **1.** A person whose case has been referred to a specialist or professional group.<br>**2.** A recommendation to consult the (professional) person or group to whom one has been referred. | *"Each MAJCOM will ensure that all squadron commanders receive training in basic suicide risk factor identification and referral procedures for at risk personnel as part of the new squadron commanders course."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[transferrable]] | adjective | **1.** Capable of being moved or conveyed from one place to another.<br>**2.** Legally transferable to the ownership of another. | *"In academic literature, transferrable designates capable of being moved or conveyed from one place to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transferral]] | noun | **1.** The act of moving something from one location to another. | *"In academic literature, transferral designates the act of moving something from one location to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transferrer]] | noun | **1.** Someone who transfers something. | *"In academic literature, transferrer designates someone who transfers something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transferrin]] | noun | **1.** A globulin in blood plasma that carries iron. | *"In academic literature, transferrin designates a globulin in blood plasma that carries iron."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · FERR
  </div>
</div>
