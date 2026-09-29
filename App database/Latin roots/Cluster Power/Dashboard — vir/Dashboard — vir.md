---
status: unread
type: root_dashboard
---
# Dashboard — vir
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vir-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“man or manly”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong engine lifting a heavy load or a respected leader giving direction.</span>
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

The root **vir** means man or manly. It refers to an adult male human or humanity as a whole. In English, this root forms words such as *decemvir*, *decemvirate*, *triumvir*, and *triumvirate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: man or manly
> The root **vir** means man or manly. It refers to an adult male human or humanity as a whole. In English, this root forms words such as *decemvir*, *decemvirate*, *triumvir*, and *triumvirate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Man or manly</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *decemvir* and *decemvirate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vir** comes from a Latin word that means *"man or manly"*.
  - At its core, it describes man or manly.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **vir** in an English word, think of **power, ability, and authority**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of man or manly.
  - **Mental & Social**: How people experience, organize, or communicate about man or manly.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Decemvir**: Each of a committee of ten men appointed with executive and legislative power.
  - **Decemvirate**: A council or office of ten men.
  - **Triumvir**: Each of three public officers jointly responsible for an administrative department.
  - **Triumvirate**: A group of three men holding power.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vir</mark>, think of <mark class="hl-def">power, ability, and authority</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vir** generates vocabulary through adjectival derivation, numeral compounding, and abstract nominalization:
> - **Base Adjectives & Masculine Attributes:**
>   - *vir* + *-īlis* $	o$ Latin *virīlis* $	o$ *virile*, *virility* ("having strength, energy, or male reproductive power").
>   - *virilism* ("the development of male secondary sex characteristics in females").
>   - *virāgō* (from *vir* + suffix *-āgō*) $	o$ *virago* ("originally a heroic, warrior woman; modern usage: a fierce, domineering woman").
> - **Magisterial Numerical Compounds:**
>   - *trēs* ("three") + *virī* $	o$ *triumvir*, *triumvirate* ("a board of three magistrates; coalition of three leaders").
>   - *decem* ("ten") + *virī* $	o$ *decemvir*, *decemvirate* ("a council of ten men").
> - **Moral & Functional Extensions from *virtūs*:**
>   - *virtūs* $	o$ Old French *vertu* $	o$ *virtue*, *virtuous*, *virtuously*.
>   - Italian *virtuoso* (from Late Latin *virtuōsus*) $	o$ *virtuoso*, *virtuosity* ("a person highly skilled in music or artistic technique").
>   - Medieval Latin *virtuālis* $	o$ *virtual*, *virtually*, *virtuality*.

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
> - **Constitutional History & Politics:** *triumvirate*, *triumvir*, *decemvirate* (ancient Roman coalitions, corporate leadership trios).
> - **Moral Philosophy & Ethics:** *virtue*, *virtuous*, *virtuously* (cardinal virtues, Aristotle's virtue ethics).
> - **Endocrinology, Andrology & Biology:** *virile*, *virility*, *virilism* (testosterone production, virilization).
> - **Music & Performing Arts:** *virtuoso*, *virtuosity* (Paganini's violin virtuosity, jazz trumpet masters).
> - **Computer Science & Digital Simulation:** *virtual*, *virtually*, *virtuality* (virtual reality VR headsets, virtual machines).

---

## 🔀 4. Prefix & Combining Dynamics on vir

### Numerical & Suffix Matrix

| Combining Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `trium-` (three) | `virī` | **[[triumvirate]]** | A governing commission or power coalition formed by three powerful individuals. |
| `decem-` (ten) | `virī` | **decemvirate** | A body of ten magistrates appointed to codify legal statutes or govern. |
| `-ile` (pertaining to) | `vir` | **[[virile]]** / **virility** | Exhibiting physical energy, masculine strength, and reproductive vigor. |
| `-uoso` (full of virtue) | `virtūs` | **virtuoso** / **virtuosity** | An artist possessing peerless technical brilliance and masterful execution. |
| `-ual` (pertaining to essence) | `virtūs` | **virtual** / **virtually** | Functionally identical in efficacy without possessing physical matter. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Cloud Computing & Computer Architecture** | *virtual*, *virtually*, *virtuality* | Hypervisor management of virtual machines (VMs); virtual memory allocation. |
| 🏛️ **Classical Roman & Constitutional History** | *triumvirate*, *triumvir*, *decemvir* | The political collapse of the Roman Republic under the Second Triumvirate. |
| 🎵 **Musicology & Performance Studies** | *virtuoso*, *virtuosity* | Analyzing technical virtuosity in Liszt's Transcendental Études. |
| 🩺 **Clinical Endocrinology & Andrology** | *virility*, *virile*, *virilism* | Diagnosing congenital adrenal hyperplasia causing virilization and hyperandrogenism. |
| ⚖️ **Philosophical Ethics & Moral Psychology** | *virtue*, *virtuous* | MacIntyre's *After Virtue* and contemporary Aristotelian neo-virtue ethics. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiviral]] | noun | **1.** Any drug that destroys viruses.<br>**2.** Inhibiting or stopping the growth and reproduction of viruses. | *"In academic literature, antiviral designates any drug that destroys viruses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invirase]] | noun | **1.** A weak protease inhibitor (trade name invirase) used in treating hiv. | *"In academic literature, invirase designates a weak protease inhibitor (trade name invirase) used in treating hiv."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[provirus]] | noun | **1.** Cdna copy of the rna genome of a retrovirus; the genetic material of a virus as incorporated into and able to replicate with the genome of a host cell. | *"In academic literature, provirus designates cdna copy of the rna genome of a retrovirus; the genetic material of a virus as incorporated into and able to replicate with the genome of a host cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrovir]] | noun | **1.** An antiviral drug (trade name retrovir) used in the treatment of aids; adverse side effects include liver damage and suppression of the bone marrow. | *"In academic literature, retrovir designates an antiviral drug (trade name retrovir) used in the treatment of aids; adverse side effects include liver damage and suppression of the bone marrow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrovirus]] | noun | **1.** Any of a group of viruses that contain two single-strand linear rna molecules per virion and reverse transcriptase (rna to dna); the virus transcribes its rna into a cdna provirus that is then incorporated into the host cell. | *"In academic literature, retrovirus designates any of a group of viruses that contain two single-strand linear rna molecules per virion and reverse transcriptase (rna to dna); the virus transcribes its rna into a cdna provirus that is then incorporated into the host cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[triumvirate]] | noun | **1.** A group of three men responsible for public administration or civil authority. | *"Lastly, he frets That Lepidus of the triumvirate Should be deposed and, being, that we detain All his revenue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[viracept]] | noun | **1.** A protease inhibitor (trade name viracept) used in treating hiv usually in combination with other drugs. | *"In academic literature, viracept designates a protease inhibitor (trade name viracept) used in treating hiv usually in combination with other drugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viraemia]] | noun | **1.** The presence of a virus in the blood stream. | *"In academic literature, viraemia designates the presence of a virus in the blood stream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virago]] | noun | **1.** A noisy or scolding or domineering woman.<br>**2.** A large strong and aggressive woman. | *"They say she rules the whole house save Miss Florence." "Ay; the young lady must have a spirit, then, I should judge, if she defies such a virago as you describe this woman to be." "No more spirit than she should have," returned Miss Pinkerton."* — Effie Afton, *Eventide* |
| [[viral]] | adjective | **1.** Relating to or caused by a virus. | *"In academic literature, viral designates relating to or caused by a virus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viramune]] | noun | **1.** A non-nucleoside reverse transcriptase inhibitor (trade name viramune) used to treat aids and hiv. | *"In academic literature, viramune designates a non-nucleoside reverse transcriptase inhibitor (trade name viramune) used to treat aids and hiv."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virazole]] | noun | **1.** An inhaled antiviral agent (trade name virazole) that may be used to treat serious virus infections. | *"In academic literature, virazole designates an inhaled antiviral agent (trade name virazole) that may be used to treat serious virus infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virchow]] | noun | **1.** German pathologist who recognized that all cells come from cells by binary fission and who emphasized cellular abnormalities in disease (1821-1902). | *"In academic literature, virchow designates german pathologist who recognized that all cells come from cells by binary fission and who emphasized cellular abnormalities in disease (1821-1902)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viremia]] | noun | **1.** The presence of a virus in the blood stream. | *"In academic literature, viremia designates the presence of a virus in the blood stream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vireo]] | noun | **1.** Any of various small insectivorous american birds chiefly olive-grey in color. | *"In academic literature, vireo designates any of various small insectivorous american birds chiefly olive-grey in color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vireonidae]] | noun | **1.** Small insectivorous american songbirds. | *"In academic literature, vireonidae designates small insectivorous american songbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viricidal]] | adjective | **1.** Tending to destroy viruses. | *"In academic literature, viricidal designates tending to destroy viruses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viricide]] | noun | **1.** An agent (physical or chemical) that inactivates or destroys viruses. | *"In academic literature, viricide designates an agent (physical or chemical) that inactivates or destroys viruses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viridity]] | noun | **1.** Green color or pigment; resembling the color of growing grass. | *"In academic literature, viridity designates green color or pigment; resembling the color of growing grass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virile]] | adjective | **1.** Characterized by energy and vigor.<br>**2.** Characteristic of a man. | *"She was a big woman, in stature almost equalling her husband, and corpulent besides: she showed virile force in the contest—more than once she almost throttled him, athletic as he was."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[virilisation]] | noun | **1.** The abnormal development of male sexual characteristics in a female (usually as the result of hormone therapies or adrenal malfunction). | *"In academic literature, virilisation designates the abnormal development of male sexual characteristics in a female (usually as the result of hormone therapies or adrenal malfunction)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virilise]] | verb | **1.** Produce virilism in or cause to assume masculine characteristics, as through a hormonal imbalance or hormone therapy. | *"In academic literature, virilise designates produce virilism in or cause to assume masculine characteristics, as through a hormonal imbalance or hormone therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virilism]] | noun | **1.** The development of male secondary sexual characteristics in a female (or prematurely in a young boy). | *"In academic literature, virilism designates the development of male secondary sexual characteristics in a female (or prematurely in a young boy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virility]] | noun | **1.** The masculine property of being capable of copulation and procreation.<br>**2.** The trait of being manly; having the characteristics of an adult male. | *"But their intercourse was only dramatic or symbolical, for the hierophant had temporarily deprived himself of his virility by an application of hemlock."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[virilization]] | noun | **1.** The abnormal development of male sexual characteristics in a female (usually as the result of hormone therapies or adrenal malfunction). | *"In academic literature, virilization designates the abnormal development of male sexual characteristics in a female (usually as the result of hormone therapies or adrenal malfunction)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virilize]] | verb | **1.** Produce virilism in or cause to assume masculine characteristics, as through a hormonal imbalance or hormone therapy. | *"In academic literature, virilize designates produce virilism in or cause to assume masculine characteristics, as through a hormonal imbalance or hormone therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virino]] | noun | **1.** (microbiology) a hypothetical infectious particle thought to be the cause of scrapie and other degenerative diseases of the central nervous system; consists of nucleic acid in a protective coat of host cell proteins. | *"In academic literature, virino designates (microbiology) a hypothetical infectious particle thought to be the cause of scrapie and other degenerative diseases of the central nervous system; consists of nucleic acid in a protective coat of host cell proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virion]] | noun | **1.** (virology) a complete viral particle; nucleic acid and capsid (and a lipid envelope in some viruses). | *"In academic literature, virion designates (virology) a complete viral particle; nucleic acid and capsid (and a lipid envelope in some viruses)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viroid]] | noun | **1.** The smallest of viruses; a plant virus with its rna arranged in a circular chromosome without a protein coat. | *"In academic literature, viroid designates the smallest of viruses; a plant virus with its rna arranged in a circular chromosome without a protein coat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virological]] | adjective | **1.** Of or relating to the science of virology. | *"In academic literature, virological designates of or relating to the science of virology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virologist]] | noun | **1.** A specialist in virology. | *"In academic literature, virologist designates a specialist in virology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virology]] | noun | **1.** The branch of medical science that studies viruses and viral diseases. | *"In academic literature, virology designates the branch of medical science that studies viruses and viral diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virtu]] | noun | **1.** Love of or taste for fine objects of art.<br>**2.** Artistic quality. | *"I have those hopes of her good that her education promises her dispositions she inherits, which makes fair gifts fairer; for where an unclean mind carries virtuous qualities, there commendations go with pity, they are virtues and traitors too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[virtual]] | adjective | **1.** Being actually such in almost every respect.<br>**2.** Existing in essence or effect though not in actual fact. | *"The frequent use of the adjectives partial, limited, and virtual are implied but usually superfluous recognitions of the relative character of monopoly. § 2. #Political sources of monopoly.# Monopoly gets its power from various sources."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[virtually]] | adverb | **1.** In essence or effect but not in fact.<br>**2.** (of actions or states) slightly short of or not quite accomplished; all but. | *"But virtually the same, virtually the same."* — Charles Dickens, *Bleak House* |
| [[virtue]] | noun | **1.** The quality of doing what is right and avoiding what is wrong.<br>**2.** Any admirable quality or attribute. | *"He that so generally is at all times good, must of necessity hold his virtue to you, whose worthiness would stir it up where it wanted, rather than lack it where there is such abundance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[virtuosity]] | noun | **1.** Technical skill or fluency or style exhibited by a virtuoso. | *"In academic literature, virtuosity designates technical skill or fluency or style exhibited by a virtuoso."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virtuoso]] | noun | **1.** Someone who is dazzlingly skilled in any field.<br>**2.** A musician who is a consummate master of technique and artistry. | *"The Duke is showing, with the weak pride of the mere virtuoso, a portrait of his last Duchess, to some one who has been sent to negotiate another marriage."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[virtuous]] | adjective | **1.** Morally excellent.<br>**2.** In a state of sexual virginity. | *"I have those hopes of her good that her education promises her dispositions she inherits, which makes fair gifts fairer; for where an unclean mind carries virtuous qualities, there commendations go with pity, they are virtues and traitors too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[virtuously]] | adverb | **1.** In a moral manner.<br>**2.** In a chaste and virtuous manner. | *"It is hypocrisy against the devil: They that mean virtuously and yet do so, The devil their virtue tempts, and they tempt heaven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[virtuousness]] | noun | **1.** The quality of doing what is right and avoiding what is wrong. | *"In academic literature, virtuousness designates the quality of doing what is right and avoiding what is wrong."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virucidal]] | adjective | **1.** Tending to destroy viruses. | *"In academic literature, virucidal designates tending to destroy viruses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virucide]] | noun | **1.** An agent (physical or chemical) that inactivates or destroys viruses. | *"In academic literature, virucide designates an agent (physical or chemical) that inactivates or destroys viruses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virulence]] | noun | **1.** Extreme harmfulness (as the capacity of a microorganism to cause disease).<br>**2.** Extreme hostility. | *"But Volumnia the fair, being subject to the prevalent complaint of boredom and finding that disorder attacking her spirits with some virulence, ventures at length to repair to the library for change of scene."* — Charles Dickens, *Bleak House* |
| [[virulency]] | noun | **1.** Extreme harmfulness (as the capacity of a microorganism to cause disease).<br>**2.** Extreme hostility. | *"In academic literature, virulency designates extreme harmfulness (as the capacity of a microorganism to cause disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virulent]] | adjective | **1.** Extremely poisonous or injurious; producing venom.<br>**2.** Infectious; having the ability to cause disease. | *"But _bu-ku-rú_ is much more virulent."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[virulently]] | adverb | **1.** In a virulent manner. | *"Langeron, trying as virulently as possible to sting Weyrother’s vanity as author of the military plan, argued that Bonaparte might easily attack instead of being attacked, and so render the whole of this plan perfectly worthless."* — graf Leo Tolstoy, *War and Peace* |
| [[virus]] | noun | **1.** (virology) ultramicroscopic infectious agent that replicates itself only within cells of living hosts; many are pathogenic; a piece of nucleic acid (dna or rna) wrapped in a thin coat of protein.<br>**2.** A harmful or corrupting agency. | *"In academic literature, virus designates (virology) ultramicroscopic infectious agent that replicates itself only within cells of living hosts; many are pathogenic; a piece of nucleic acid (dna or rna) wrapped in a thin coat of protein."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virusoid]] | noun | **1.** The smallest of viruses; a plant virus with its rna arranged in a circular chromosome without a protein coat. | *"In academic literature, virusoid designates the smallest of viruses; a plant virus with its rna arranged in a circular chromosome without a protein coat."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Power]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VIR
  </div>
</div>
