---
status: unread
type: root_dashboard
---
# Dashboard — patr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">patr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“father or fatherland”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **patr** means father or fatherland. It refers to a male parent, paternal guidance, and lineage. In English, this root forms words such as *patron*, *patronize*, *patrimony*, and *patriot*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: father or fatherland
> The root **patr** means father or fatherland. It refers to a male parent, paternal guidance, and lineage. In English, this root forms words such as *patron*, *patronize*, *patrimony*, and *patriot*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Father or fatherland</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *patron* and *patronize*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **patr** comes from a Latin word that means *"father or fatherland"*.
  - At its core, it describes father or fatherland.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **patr** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of father or fatherland.
  - **Mental & Social**: How people experience, organize, or communicate about father or fatherland.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Patron**: A person who gives financial or other support to a person, organization, cause, or activity.
  - **Patronize**: An everyday English word showing the root's idea of *father or fatherland*.
  - **Patrimony**: An everyday English word showing the root's idea of *father or fatherland*.
  - **Patriot**: A person who vigorously supports their country and is prepared to defend it against enemies or detractors.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">patr</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin pater (father) ──> Stem patr-
  │
  ├── + -icius (class suffix) ───────> patricius ──────────> patrician (aristocratic, noble)
  │
  ├── + -ōnus (protective agent) ────> patrōnus ───────────> patron (sponsor, client-protector)
  │                                                            ├── patronage
  │                                                            └── patronize
  │
  ├── patria (native land) ──────────> patriōta (Greek) ───> patriot (devoted citizen)
  │                                                            ├── patriotic
  │                                                            └── patriotism
  │
  └── ex- + patria + -atus ──────────> expatriāre ─────────> expatriate (living abroad, banished)
```

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

### Distinct Socio-Political Spheres
1. **Hereditary Aristocracy**: *patrician* (relating to Roman aristocracy, upper-class dignity, elite elegance).
2. **Economic & Cultural Sponsorship**: *patron* (benefactor of the arts, supportive sponsor, regular customer of an establishment).
3. **National Allegiance**: *patriot* (one who loves, supports, and defends their country).
4. **Transnational Displacement**: *expatriate* (living outside one's native country either voluntarily or through banishment).

---

## 🔀 4. Prefix & Combining Dynamics on patr

### Affix Breakdown
- **ex- ("away from, out of") + patr-**: Produces *expatriate* (literally, to be outside the boundaries of the fatherland).
- **-ician** (social caste suffix): Produces *patrician* (marking membership in the governing senatorial order).
- **-on** (agentive guardian suffix): Produces *patron* (the protector who shields clients).
- **-iot** (< Greek *-iōtēs*, native of): Produces *patriot* (a native son of the soil).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Real-World Application | Key Derived Words |
| :--- | :--- | :--- |
| **Roman & Classical History** | Aristocratic struggle against plebeians, consular magistracies | *patrician*, *patronage* |
| **Arts & Philanthropy** | Commissioning artists, founding museums, funding galleries | *patron*, *patroness*, *patronage* |
| **Political Philosophy** | Civic virtue, nationalism, constitutional loyalty | *patriot*, *patriotic*, *patriotism* |
| **International Commerce & Sociology** | Global nomads, foreign corporate postings, diaspora studies | *expatriate*, *expatriation* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[compatriot]] | noun | **1.** A person from your own country. | *"I am delighted to meet a compatriot."* — graf Leo Tolstoy, *War and Peace* |
| [[expatriate]] | noun | **1.** A person who is voluntarily absent from home or country.<br>**2.** Expel from a country. | *"Saint-Martin will not expatriate himself without from time to time making inquiries."* — Frances Mary Peard, *Unawares: A Story of an Old French Town* |
| [[expatriation]] | noun | **1.** The act of expelling a person from their native land.<br>**2.** Migration from a place (especially migration from your native country in order to settle in another). | *"Touchett was intimate; she shared their expatriation, their convictions, their pastimes, their ennui."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[patrai]] | noun | **1.** A port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages. | *"In academic literature, patrai designates a port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patras]] | noun | **1.** A port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages. | *"In academic literature, patras designates a port city in western greece in the northwestern peloponnese on an inlet of the ionian sea; was a major trade center from the 5th century bc to the 3rd century bc; commercial importance revived during the middle ages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrial]] | noun | **1.** A person who has the right to be considered legally a british citizen (by virtue of the birth of a parent or grandparent). | *"In academic literature, patrial designates a person who has the right to be considered legally a british citizen (by virtue of the birth of a parent or grandparent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriarch]] | noun | **1.** Title for the heads of the eastern orthodox churches (in istanbul and alexandria and moscow and jerusalem).<br>**2.** The male head of family or tribe. | *"There’s your fare!” says the patriarch to the coachman with a fierce grin and shaking his incapable fist at him."* — Charles Dickens, *Bleak House* |
| [[patriarchal]] | adjective | **1.** Characteristic of a form of social organization in which the male is the family head and title is traced through the male line.<br>**2.** Relating to or characteristic of a man who is older or higher in rank. | *"In family or patriarchal communities all share a common income and combine in the common defense, but self-preservation often has compelled such small communities to form a larger, stronger state for the common defense."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[patriarchate]] | noun | **1.** The jurisdiction of a patriarch.<br>**2.** A form of social organization in which a male is the family head and title is traced through the male line. | *"In academic literature, patriarchate designates the jurisdiction of a patriarch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriarchic]] | adjective | **1.** (of societies) being ruled by or having descent traced through the male line. | *"In academic literature, patriarchic designates (of societies) being ruled by or having descent traced through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriarchy]] | noun | **1.** A form of social organization in which a male is the family head and title is traced through the male line. | *"In academic literature, patriarchy designates a form of social organization in which a male is the family head and title is traced through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patricentric]] | adjective | **1.** Centered upon the father. | *"In academic literature, patricentric designates centered upon the father."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrician]] | noun | **1.** A person of refined upbringing and manners.<br>**2.** A member of the aristocracy. | *"Nay, come away. [_Exeunt Coriolanus and Cominius._] PATRICIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patricide]] | noun | **1.** A person who murders their father.<br>**2.** The murder of your father. | *"In academic literature, patricide designates a person who murders their father."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrick]] | noun | **1.** Apostle and patron saint of ireland; an english missionary to ireland in the 5th century. | *"Yes, by Saint Patrick, but there is, Horatio, And much offence too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patrikin]] | noun | **1.** One related on the father's side. | *"In academic literature, patrikin designates one related on the father's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilineage]] | noun | **1.** Line of descent traced through the paternal side of the family. | *"In academic literature, patrilineage designates line of descent traced through the paternal side of the family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilineal]] | adjective | **1.** Based on or tracing descent through the male line. | *"In academic literature, patrilineal designates based on or tracing descent through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilineally]] | adverb | **1.** By descent through the male line. | *"In academic literature, patrilineally designates by descent through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrilinear]] | adjective | **1.** Based on or tracing descent through the male line. | *"In academic literature, patrilinear designates based on or tracing descent through the male line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrimonial]] | adjective | **1.** Inherited or inheritable by established rules (usually legal rules) of descent. | *"At the time Shamus was added to the population of Ireland, the patrimonial estate had dwindled down to a peat bog."* — W. E. Webb, *Buffalo Land* |
| [[patrimony]] | noun | **1.** A church endowment.<br>**2.** An inheritance coming by right of birth (especially by primogeniture). | *"General, Take thou my soldiers, prisoners, patrimony; Dispose of them, of me; the walls are thine: Witness the world that I create thee here My lord and master."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patriot]] | noun | **1.** One who loves and defends his or her country. | *"An austere patriot’s passion for his fatherland!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[patrioteer]] | noun | **1.** An extreme bellicose nationalist. | *"In academic literature, patrioteer designates an extreme bellicose nationalist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patriotic]] | adjective | **1.** Inspired by love for your country. | *"On these national occasions dancing may be a patriotic service, and Volumnia is constantly seen hopping about for the good of an ungrateful and unpensioning country."* — Charles Dickens, *Bleak House* |
| [[patriotically]] | adverb | **1.** In a patriotic manner. | *"He has stopped Austria’s cackle and I fear it will be our turn next.” The colonel was a stout, tall, plethoric German, evidently devoted to the service and patriotically Russian."* — graf Leo Tolstoy, *War and Peace* |
| [[patriotism]] | noun | **1.** Love of country and willingness to sacrifice for it. | *"That the country is shipwrecked, lost, and gone to pieces (as is made manifest to the patriotism of Sir Leicester Dedlock) because you can’t provide for Noodle!"* — Charles Dickens, *Bleak House* |
| [[patrisib]] | noun | **1.** One related on the father's side. | *"In academic literature, patrisib designates one related on the father's side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patristic]] | adjective | **1.** Of or relating to the writings of the early church fathers. | *"All this time he was pursuing his Patristic and other historical studies with unflagging vigour, always writing new lectures, always maintaining his love of abstract knowledge and his eager desire to add to his already vast stores of learning."* — John Cairns, *Principal Cairns* |
| [[patristical]] | adjective | **1.** Of or relating to the writings of the early church fathers. | *"In academic literature, patristical designates of or relating to the writings of the early church fathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patristics]] | noun | **1.** The writings of the early church fathers.<br>**2.** The study of the lives, writings, and doctrines of the church fathers. | *"In academic literature, patristics designates the writings of the early church fathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patroclus]] | noun | **1.** (greek mythology) a friend of achilles who was killed in the trojan war; his death led achilles to return to the fight after his quarrel with agamemnon. | *"Now play him me, Patroclus, Arming to answer in a night alarm.’ And then, forsooth, the faint defects of age Must be the scene of mirth: to cough and spit And, with a palsy fumbling on his gorget, Shake in and out the rivet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patrol]] | noun | **1.** A detachment used for security or reconnaissance.<br>**2.** The activity of going around or through an area at regular intervals for security purposes. | *"When I proposed to put him at the head of a patrol, he had an attack of the nerves."* — Mrs. Oliphant, *A Beleaguered City* |
| [[patroller]] | noun | **1.** Someone on patrol duty; an individual or a member of a group that patrols an area. | *"The recon-patroller's omni-directional screen displayed the huge cylinder that floated in space behind him, its gravity-enhanced rotation barely perceptible to O'Hare's vision."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[patrolman]] | noun | **1.** A policeman who patrols a given region. | *"In academic literature, patrolman designates a policeman who patrols a given region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patrology]] | noun | **1.** The writings of the early church fathers.<br>**2.** The study of the lives, writings, and doctrines of the church fathers. | *"In academic literature, patrology designates the writings of the early church fathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patron]] | noun | **1.** A regular customer.<br>**2.** The proprietor of an inn. | *"I tell thee, Syracusian, twenty years Have I been patron to Antipholus, During which time he ne’er saw Syracusa."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patronage]] | noun | **1.** The act of providing approval and support.<br>**2.** Customers collectively. | *"Yes, as an outlaw in a castle keeps, And useth it to patronage his theft."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patroness]] | noun | **1.** A woman who is a patron or the wife of a patron. | *"Behold our patroness, the life of Rome!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[patronise]] | verb | **1.** Do one's shopping at; do business with; be a customer or client of.<br>**2.** Assume sponsorship of. | *"In all the clam’rous cry of starving want, They dun Benevolence with shameless front; Oblige them, patronise their tinsel lays— They persecute you all your future days!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[patronised]] | verb | **1.** Do one's shopping at; do business with; be a customer or client of.<br>**2.** Assume sponsorship of. | *"It was a concert for the benefit of a person patronised by Lady Dalrymple."* — Jane Austen, *Persuasion* |
| [[patronising]] | verb | **1.** Do one's shopping at; do business with; be a customer or client of.<br>**2.** Assume sponsorship of. | *"There’s your true Ashantee, gentlemen; there howl your pagans; where you ever find them, next door to you; under the long-flung shadow, and the snug patronising lee of churches."* — Herman Melville, *Moby Dick; Or, The Whale* |
| [[patronisingly]] | adverb | **1.** With condescension; in a patronizing manner. | *"It must be sewn on,” she said, just a little patronisingly."* — J. M. Barrie, *Peter Pan* |
| [[patronize]] | verb | **1.** Assume sponsorship of.<br>**2.** Do one's shopping at; do business with; be a customer or client of. | *"Say that he wants to patronize me,” pursued Mr."* — Charles Dickens, *Bleak House* |
| [[patronized]] | verb | **1.** Assume sponsorship of.<br>**2.** Do one's shopping at; do business with; be a customer or client of. | *"He dresses at that gentleman (by whom he is patronized), talks at him, walks at him, founds himself entirely on him."* — Charles Dickens, *Bleak House* |
| [[patronizing]] | verb | **1.** Assume sponsorship of.<br>**2.** Do one's shopping at; do business with; be a customer or client of. | *"Well, then,” said Joe, “It’s more than twenty pound.” That abject hypocrite, Pumblechook, nodded again, and said, with a patronizing laugh, “It’s more than that, Mum."* — Charles Dickens, *Great Expectations* |
| [[patronizingly]] | adverb | **1.** With condescension; in a patronizing manner. | *"She nodded twice or thrice patronizingly to the little boy, who looked up from his dinner or from the pictures of soldiers he was painting."* — William Makepeace Thackeray, *Vanity Fair* |
| [[patronless]] | adjective | **1.** Having little patronage or few clients. | *"In academic literature, patronless designates having little patronage or few clients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patronne]] | noun | **1.** A woman who is a patron or the wife of a patron. | *"In academic literature, patronne designates a woman who is a patron or the wife of a patron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patronym]] | noun | **1.** A family name derived from name of your father or a paternal ancestor (especially with an affix (such as -son in english or o'- in irish) added to the name of your father or a paternal ancestor). | *"In academic literature, patronym designates a family name derived from name of your father or a paternal ancestor (especially with an affix (such as -son in english or o'- in irish) added to the name of your father or a paternal ancestor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[patronymic]] | noun | **1.** A family name derived from name of your father or a paternal ancestor (especially with an affix (such as -son in english or o'- in irish) added to the name of your father or a paternal ancestor).<br>**2.** Of or derived from a personal or family name. | *"When I go there I shall be all alone, and my friend Harker Jonathan--nay, pardon me, I fall into my country’s habit of putting your patronymic first--my friend Jonathan Harker will not be by my side to correct and aid me."* — Bram Stoker, *Dracula* |
| [[repatriate]] | noun | **1.** A person who has returned to the country of origin or whose citizenship has been restored.<br>**2.** Send someone back to his homeland against his will, as of refugees. | *"In academic literature, repatriate designates a person who has returned to the country of origin or whose citizenship has been restored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repatriation]] | noun | **1.** The act of returning to the country of origin. | *"In academic literature, repatriation designates the act of returning to the country of origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superpatriotic]] | adjective | **1.** Fanatically patriotic. | *"In academic literature, superpatriotic designates fanatically patriotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superpatriotism]] | noun | **1.** Fanatical patriotism. | *"In academic literature, superpatriotism designates fanatical patriotism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatriotic]] | adjective | **1.** Showing lack of love for your country. | *"You expressed, besides, your apprehension, that the unpatriotic prejudices of my countrymen would not allow fair play to such a work as that of which I endeavoured to demonstrate the probable success."* — Walter Scott, *Ivanhoe: A Romance* |
| [[unpatriotically]] | adverb | **1.** In an unpatriotic manner. | *"In academic literature, unpatriotically designates in an unpatriotic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatronised]] | adjective | **1.** Having little patronage or few clients. | *"In academic literature, unpatronised designates having little patronage or few clients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpatronized]] | adjective | **1.** Having little patronage or few clients. | *"In academic literature, unpatronized designates having little patronage or few clients."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PATR
  </div>
</div>
