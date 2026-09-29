---
status: unread
type: root_dashboard
---
# Dashboard — ann
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ann-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“year”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The rhythmic hands of a clock ticking forward as hours and days pass by.</span>
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

The root **ann** means year. It refers to the cyclical measure of time marked by the passage of a calendar year. In English, this root forms words such as *annual*, *anniversary*, *annuity*, and *perennial*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: year
> The root **ann** means year. It refers to the cyclical measure of time marked by the passage of a calendar year. In English, this root forms words such as *annual*, *anniversary*, *annuity*, and *perennial*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Year</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The rhythmic hands of a clock ticking forward as hours and days pass by.</mark>
> - **Everyday Connection**: Think of familiar words like *annual* and *anniversary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ann** comes from a Latin word that means *"year"*.
  - At its core, it describes year.

- **The Big Picture Idea**:
  - Picture the rhythmic hands of a clock ticking forward as hours and days pass by.
  - Whenever you see **ann** in an English word, think of **time, seasons, and duration**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of year.
  - **Mental & Social**: How people experience, organize, or communicate about year.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Annual**: Adj.* Occurring once every year.
  - **Anniversary**: An everyday English word showing the root's idea of *year*.
  - **Annuity**: A fixed sum of money paid to someone each year, typically for the rest of their life.
  - **Perennial**: Adj.* Lasting or existing for a long or apparently infinite time.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ann</mark>, think of <mark class="hl-def">time, seasons, and duration</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root displays systematic apophonic variation:
1. **The Base Stem `ann-`**: Appears in uncompounded forms or post-classical formations: *annual*, *annuity*, *annals*, *per annum*, *semiannual*, *anniversary* (< *annus* + *vertere* "the turning of the year").
2. **The Apophonic Weakened Stem `-enn-`**: The classical internal vowel shift from *a* to *e* in compound forms: *perennial*, *biennial*, *triennial*, *centennial*, *millennium*, *millennial*, *bicentennial*.
3. **Participial & Adjectival Suffixation**: *superannuated* (< Medieval Latin *superannuātus* < *super-* "beyond" + *annus*).

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

The root covers four principal temporal and institutional dimensions:
- **Historical Chronicle & Archival Record**: [[annals]]
- **Chronological Frequency & Routine**: [[annual]], [[semiannual]], `anniversary`, `biennial`, `centennial`
- **Commerce & Financial Allocation**: [[annuity]], [[per annum]]
- **Duration, Persistence & Senescence**: [[perennial]], [[superannuated]], `millennium`

---

## 🔀 4. Prefix & Combining Dynamics on ann

1. **`per-` + `ann`** (*per* "through, thoroughly"):
   - *perennial* $\to$ lasting through the years; enduring, perpetual; a plant living more than two years.
2. **`semi-` + `ann`** (*semi-* "half"):
   - *semiannual* $\to$ occurring, published, or evaluated twice a year (every six months).
3. **`super-` + `ann`** (*super* "above, beyond"):
   - *superannuated* $\to$ disqualified or retired on account of old age; obsolete.
4. **Numeral Combinations**:
   - `bi-` + `ann` $\to$ *biennial* (taking place every two years).
   - `centum` + `ann` $\to$ *centennial* (relating to a 100th anniversary).
   - `mīlle` + `ann` $\to$ *millennium* (a period of 1,000 years).

---

## 🌐 5. Disciplinary & Real-World Domains

- **Historiography & Literature**: *annals* of classical warfare, Tacitus's *Annales*.
- **Finance & Insurance**: life *annuities*, actuarial mortality tables, interest rates quoted *per annum*.
- **Botany & Horticulture**: *annual* vs. *perennial* flowering plants.
- **Sociology & Labor**: *superannuation* pension funds, *superannuated* manufacturing technologies.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anna]] | noun | **1.** A former copper coin of pakistan and india. | *"Sutherland Lines To A Gentleman, Elegy On Willie Nicol’s Mare Song—The Gowden Locks Of Anna Song—I Murder Hate Song—Gudewife, Count The Lawin Election Ballad At the close of the contest for representing the Dumfries Burghs, 1790."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[annaba]] | noun | **1.** A port city of northeastern algeria near the tunisian border. | *"In academic literature, annaba designates a port city of northeastern algeria near the tunisian border."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annalist]] | noun | **1.** A historian who writes annals. | *"Gilbert, the third Abbot, resigned in July, M.CC.XIII, died the following year at Kirksted, and was succeeded by Abbot John, of whom nothing is recorded by the annalist."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[annalistic]] | adjective | **1.** Relating to annals. | *"In academic literature, annalistic designates relating to annals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annals]] | noun | **1.** Reports of the work of a society or learned body etc.<br>**2.** A chronological account of events in successive years. | *"If you have writ your annals true, ’tis there, That like an eagle in a dovecote, I Fluttered your Volscians in Corioles, Alone I did it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[annam]] | noun | **1.** A communist state in indochina on the south china sea; achieved independence from france in 1945. | *"Ibn Batutah's narrative of the demon lover and his mortal brides closely resembles a well-known type of folk-tale, of which versions have been found from Japan and Annam in the East to Senegambia, Scandinavia, and Scotland in the West."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[annamese]] | noun | **1.** A native or inhabitant of vietnam.<br>**2.** The mon-khmer language spoken in vietnam. | *"As the only lady passenger I had very comfortable quarters, and the kindest attention from French officers and Annamese stewards."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[annamite]] | noun | **1.** The mon-khmer language spoken in vietnam. | *"In academic literature, annamite designates the mon-khmer language spoken in vietnam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annapolis]] | noun | **1.** State capital of maryland; site of the united states naval academy. | *"As all of these, however, had reference, either to the recommendation from the meeting at Annapolis, in September, 1786, or to that from Congress, in February, 1787, it will be sufficient to recur to these particular acts."* — Alexander Hamilton, *The Federalist Papers* |
| [[annapurna]] | noun | **1.** Wife of siva and a benevolent aspect of devi: hindu goddess of plenty.<br>**2.** A mountain in the himalayas in nepal (26,500 feet high). | *"In academic literature, annapurna designates wife of siva and a benevolent aspect of devi: hindu goddess of plenty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anne]] | noun | **1.** Queen of england and scotland and ireland; daughter if james ii and the last of the stuart monarchs; in 1707 she was the last english ruler to exercise the royal veto over parliament (1665-1714). | *"Edmund had issue, Roger, Earl of March; Roger had issue, Edmund, Anne, and Eleanor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anneal]] | verb | **1.** Bring to a desired consistency, texture, or hardness by a process of gradually heating and cooling. | *"There was no luster of exquisitely annealed glass and highly polished metals, such as dazzles one in the laboratory of the prosperous analyst."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[annealing]] | noun | **1.** Hardening something by heat treatment.<br>**2.** Bring to a desired consistency, texture, or hardness by a process of gradually heating and cooling. | *"By annealing, diffusion is greatly assisted, and the material gradually becomes homogeneous, as is seen on microscopic examination."* — Donald M. Levy, *Modern Copper Smelting* |
| [[annelid]] | noun | **1.** Worms with cylindrical bodies segmented both internally and externally.<br>**2.** Relating to or belonging to or characteristic of any worms of the phylum annelida. | *"In their dark fractures huge crustacea, perched upon their high claws like some war-machine, watched us with fixed eyes, and under our feet crawled various kinds of annelides."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[annelida]] | noun | **1.** Segmented worms: earthworms; lugworms; leeches. | *"In academic literature, annelida designates segmented worms: earthworms; lugworms; leeches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annelidan]] | adjective | **1.** Relating to or belonging to or characteristic of any worms of the phylum annelida. | *"In academic literature, annelidan designates relating to or belonging to or characteristic of any worms of the phylum annelida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annex]] | noun | **1.** An addition that extends a main building.<br>**2.** Take (territory) as if by conquest. | *"Nothing, therefore, can be wiser in that kingdom, than to annex to the king a constitutional council, who may be responsible to the nation for the advice they give."* — Alexander Hamilton, *The Federalist Papers* |
| [[annexa]] | noun | **1.** Accessory or adjoining anatomical parts or appendages to an organ (especially of the embryo). | *"In academic literature, annexa designates accessory or adjoining anatomical parts or appendages to an organ (especially of the embryo)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annexal]] | adjective | **1.** Of or pertaining to adnexa. | *"In academic literature, annexal designates of or pertaining to adnexa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annexation]] | noun | **1.** Incorporation by joining or uniting.<br>**2.** The formal act of acquiring something (especially territory) by conquest or occupation. | *"Ask for Grosset & Dunlap’s list THE SECRET OF THE BARBICAN THE ANNEXATION SOCIETY THE WOLVES AND THE LAMB GREEN INK THE KING versus WARGRAVE THE LOST MR."* — Bram Stoker, *Dracula* |
| [[annexational]] | adjective | **1.** Relating to annexation. | *"In academic literature, annexational designates relating to annexation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annexe]] | noun | **1.** An addition that extends a main building. | *"Subsoil ploughing annexes to agricultural land new layers of soil that are just as important as new acres added to the surface."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[anniellidae]] | noun | **1.** Legless lizards. | *"In academic literature, anniellidae designates legless lizards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annihilate]] | verb | **1.** Kill in large numbers. | *"He would annihilate the six years of his life as if they were minutes—so little did he value his time on earth beside her love."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[annihilated]] | verb | **1.** Kill in large numbers.<br>**2.** Destroyed completely. | *"I am thinking of the sort of figure I cut the first time I saw you, when you annihilated my poor sketch with your criticism.” “My criticism?” said Dorothea, wondering still more."* — George Eliot, *Middlemarch* |
| [[annihilating]] | verb | **1.** Kill in large numbers.<br>**2.** Wreaking or capable of wreaking complete destruction. | *"He followed him again with a last resolve, annihilating return."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[annihilation]] | noun | **1.** Destruction by annihilating something.<br>**2.** Total destruction. | *"In truth, he had awakened that morning from a sleep deep as annihilation; and during those first few moments in which the brain, like a Samson shaking himself, is trying its strength, he had some dim notion of an unusual nocturnal proceeding."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[annihilative]] | adjective | **1.** Wreaking or capable of wreaking complete destruction. | *"In academic literature, annihilative designates wreaking or capable of wreaking complete destruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annihilator]] | noun | **1.** A total destroyer. | *"In academic literature, annihilator designates a total destroyer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anniversary]] | noun | **1.** The date on which an event occurred in some previous year (or the celebration of it). | *"On the twelfth anniversary of my wedding-day, I became the wife of Professor Dingo.” “Of European reputation,” added Mr."* — Charles Dickens, *Bleak House* |
| [[annon]] | noun | **1.** Sweet pulpy tropical fruit with thick scaly rind and shiny black seeds. | *"Tertullian, _de Baptismo_, 5. _Annon et alias sine ullo Sacramento immundi spiritus aquis incubant, adfectantes illam in primordio divini spiritus gestationem?"* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[annona]] | noun | **1.** Type genus of the annonaceae; tropical american trees or shrubs. | *"In academic literature, annona designates type genus of the annonaceae; tropical american trees or shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annonaceae]] | noun | **1.** Chiefly tropical trees or shrubs. | *"In academic literature, annonaceae designates chiefly tropical trees or shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annotate]] | verb | **1.** Add explanatory notes to or supply with critical comments.<br>**2.** Provide interlinear explanations for words or phrases. | *"He worked his way through a goodly number of the Greek and Latin classics, in copies borrowed from the libraries of the two ministers; and he not only read, but analysed and elaborately annotated what he read."* — John Cairns, *Principal Cairns* |
| [[annotating]] | noun | **1.** The act of adding notes.<br>**2.** Add explanatory notes to or supply with critical comments. | *"In academic literature, annotating designates the act of adding notes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annotation]] | noun | **1.** A comment or instruction (usually added).<br>**2.** The act of adding notes. | *"I have been led farther than I had foreseen, and various subjects for annotation have presented themselves which, though I have no direct need of them, I could not pretermit."* — George Eliot, *Middlemarch* |
| [[annotator]] | noun | **1.** A commentator who writes notes to a text. | *"In academic literature, annotator designates a commentator who writes notes to a text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[announce]] | verb | **1.** Make known; make an announcement.<br>**2.** Announce publicly or officially. | *"Much discomposed in her nerves (which were previously in the best order) by this threat, she so fearfully mutilates that point of state as to announce “Mr. and Mrs."* — Charles Dickens, *Bleak House* |
| [[announced]] | verb | **1.** Make known; make an announcement.<br>**2.** Announce publicly or officially. | *"He had announced that he was tired of the constant chattering going on in the school."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[announcement]] | noun | **1.** A formal public statement.<br>**2.** A public statement containing information about an event that has happened or is going to happen. | *"The two older boys had approached, too, as they had an announcement to make."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[announcer]] | noun | **1.** Someone who proclaims a message publicly.<br>**2.** Reads news, commercials on radio or television. | *"He claims to have seen a strange animal approach the victims shortly before the murder." The announcer repeated a very accurate description of Henig--which, he said, tallied with no species known to zoology."* — Jr. Irving E. Cox, *Export Commodity* |
| [[annoy]] | verb | **1.** Cause annoyance in; disturb, especially by minor irritations. | *"Sweets with sweets war not, joy delights in joy: Why lov’st thou that which thou receiv’st not gladly, Or else receiv’st with pleasure thine annoy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[annoyance]] | noun | **1.** The psychological state of being irritated or annoyed.<br>**2.** Anger produced by some annoying irritation. | *"O heaven, that there were but a mote in yours, A grain, a dust, a gnat, a wandering hair, Any annoyance in that precious sense!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[annoyed]] | verb | **1.** Cause annoyance in; disturb, especially by minor irritations.<br>**2.** Aroused to impatience or anger. | *"I am terribly afraid that Mäzli has annoyed you." "She has not done so at all, for she is her mother's true child," said the Baron."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[annoyer]] | noun | **1.** Someone given to teasing (as by mocking or stirring curiosity). | *"In academic literature, annoyer designates someone given to teasing (as by mocking or stirring curiosity)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annoying]] | noun | **1.** The act of troubling or annoying someone.<br>**2.** Cause annoyance in; disturb, especially by minor irritations. | *"Besides, I ha’ not since put up my sword, Against the Capitol I met a lion, Who glared upon me, and went surly by, Without annoying me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[annoyingly]] | adverb | **1.** In an annoying manner or to an annoying degree. | *"In academic literature, annoyingly designates in an annoying manner or to an annoying degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annual]] | noun | **1.** (botany) a plant that completes its entire life cycle within the space of a year.<br>**2.** A reference book that is published regularly once every year. | *"The city strived God Neptune’s annual feast to keep: from whence Lysimachus our Tyrian ship espies, His banners sable, trimm’d with rich expense; And to him in his barge with fervour hies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[annually]] | adverb | **1.** Without missing a year.<br>**2.** By the year; every year (usually with reference to a sum of money paid or received). | *"Interest is not compounded, unless the depositor withdraws the interest and redeposits it, but simple interest continues to accrue annually on a certificate so long as it is outstanding, without limitation as to time."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[annualry]] | noun | **1.** The third finger (especially of the left hand). | *"In academic literature, annualry designates the third finger (especially of the left hand)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annuitant]] | noun | **1.** The recipient of an annuity. | *"In academic literature, annuitant designates the recipient of an annuity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annuity]] | noun | **1.** Income from capital investment paid in a series of regular payments. | *"I have left an annuity for his sole support in case he should outlive me."* — Charles Dickens, *Bleak House* |
| [[annul]] | verb | **1.** Declare invalid.<br>**2.** Cancel officially. | *"Many arguments might have been adduced to prove the unfitness of two such seemingly contradictory authorities, each having power to ANNUL or REPEAL the acts of the other."* — Alexander Hamilton, *The Federalist Papers* |
| [[annular]] | adjective | **1.** Shaped like a ring. | *"But such a line passing from the vital to the annular, to the ring finger, promises honors to ensue, from or by the means of some famous lady."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[annulate]] | adjective | **1.** Shaped like a ring. | *"In academic literature, annulate designates shaped like a ring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annulated]] | adjective | **1.** Shaped like a ring. | *"In academic literature, annulated designates shaped like a ring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annulet]] | noun | **1.** (heraldry) a charge in the shape of a circle.<br>**2.** Molding in the form of a ring; at top of a column. | *"In academic literature, annulet designates (heraldry) a charge in the shape of a circle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annulment]] | noun | **1.** The state of being cancelled or annulled.<br>**2.** (law) a formal termination (of a relationship or a judicial proceeding etc). | *"Trescot and recently sent to the Senate I was greatly surprised to find a proposition looking to the annulment of these invitations, and I was still more surprised when I read the reasons assigned."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[annulus]] | noun | **1.** A toroidal shape.<br>**2.** (fungi) a remnant of the partial veil that in mature mushrooms surrounds the stem like a collar. | *"In academic literature, annulus designates a toroidal shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annum]] | noun | **1.** (latin) year. | *"There dwells near us a Gentleman of bloud, Monsieur _Brisac_, of a fair Estate, six thousand Crowns _per annum_, the happy Father of two hopeful Sons, of different breeding; the Elder, a meer Scholar; the younger, a quaint Courtier. _Ang_."* — John Fletcher, *The Elder Brother* |
| [[annunciate]] | verb | **1.** Foreshadow or presage. | *"In academic literature, annunciate designates foreshadow or presage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annunciation]] | noun | **1.** A festival commemorating the announcement of the incarnation by the angel gabriel to the virgin mary; a quarter day in england, wales, and ireland.<br>**2.** (christianity) the announcement to the virgin mary by the angel gabriel of the incarnation of christ. | *"The annunciation of the divine nature of the Redeemer must, therefore, be an essential part of _the preaching of the cross_."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[annunciator]] | noun | **1.** An indicator that announces which electrical circuit has been active (as on a telephone switchboard). | *"In academic literature, annunciator designates an indicator that announces which electrical circuit has been active (as on a telephone switchboard)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[annunciatory]] | adjective | **1.** Relating to the act of announcing or being announced. | *"In academic literature, annunciatory designates relating to the act of announcing or being announced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inanna]] | noun | **1.** Consort of dumuzi (tammuz). | *"In academic literature, inanna designates consort of dumuzi (tammuz)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[per annum]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ann within the domain of Time.<br>**2.** A technical or specialized form exhibiting the properties of ann in systematic terminology. | *"In academic literature, per annum designates pertaining to, derived from, or characteristic of latin ann within the domain of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiannual]] | adjective | **1.** Occurring or payable twice each year. | *"In academic literature, semiannual designates occurring or payable twice each year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiannually]] | adverb | **1.** Twice a year. | *"In academic literature, semiannually designates twice a year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superannuate]] | verb | **1.** Retire and pension (someone) because of age or physical inability.<br>**2.** Declare to be obsolete. | *"During this interval I had remained standing on the piazza of the ‘Ti,’ which directly fronted the Happar mountain, and with no one near me but Kory-Kory and the old superannuated savages I have described."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[superannuated]] | verb | **1.** Retire and pension (someone) because of age or physical inability.<br>**2.** Declare to be obsolete. | *"During this interval I had remained standing on the piazza of the ‘Ti,’ which directly fronted the Happar mountain, and with no one near me but Kory-Kory and the old superannuated savages I have described."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[superannuation]] | noun | **1.** A monthly payment made to someone who is retired from work.<br>**2.** The property of being out of date and not current. | *"In academic literature, superannuation designates a monthly payment made to someone who is retired from work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[susanna]] | noun | **1.** An apocryphal book consisting of text added to the book of daniel. | *"If a good dog, Susanna would have got it; if an inferior one his wife would have got a dower interest in it."* — Mark Twain, *What Is Man? and Other Essays* |
| [[unannealed]] | adjective | **1.** (of metal or glass) not annealed and consequently easily cracked or fractured. | *"In academic literature, unannealed designates (of metal or glass) not annealed and consequently easily cracked or fractured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unannounced]] | adjective | **1.** Without warning or announcement; ; - m.a.d.howe. | *"She was passionate, and her present letter, showing that her estimate of him had changed under his delay—too justly changed, he sadly owned,—made him ask himself if it would be wise to confront her unannounced in the presence of her parents."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ANN
  </div>
</div>
