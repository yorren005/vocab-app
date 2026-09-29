---
status: unread
type: root_dashboard
---
# Dashboard — vest
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vest-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“garment or clothing”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Wrapping an outer mantle, robe, or protective layer over the body.</span>
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

The root **vest** means garment or clothing. It refers to wrapping an outer mantle, robe, or covering around the body. In English, this root forms words such as *vestment*, *divest*, and *investiture*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: garment or clothing
> The root **vest** means garment or clothing. It refers to wrapping an outer mantle, robe, or covering around the body. In English, this root forms words such as *vestment*, *divest*, and *investiture*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Garment or clothing</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Wrapping an outer mantle, robe, or protective layer over the body.</mark>
> - **Everyday Connection**: Think of familiar words like *vestment* and *divest*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vest** comes from a Latin word that means *"garment or clothing"*.
  - At its core, it describes garment or clothing.

- **The Big Picture Idea**:
  - Picture wrapping an outer mantle, robe, or protective layer over the body.
  - Whenever you see **vest** in an English word, think of **clothing, garments, and protective coverings**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of garment or clothing.
  - **Mental & Social**: How people experience, organize, or communicate about garment or clothing.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Vestment**: A ceremonial or liturgical robe worn by clergy, choristers, or officiants during religious rites.
  - **Divest**: To strip, deprive, or dispossess of clothing, property, rights, or authority.
  - **Investiture**: The formal ceremony of conferring an official title, dignity, office, or feudal estate, accompanied by the presentation of robes and regalia.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vest</mark>, think of <mark class="hl-def">clothing, garments, and protective coverings</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vest** functions as a versatile verbal and nominal base across French, Italian, and Latin borrowings:
> - **Primary Nominal & Verbal Base `vest-`:**
>   - Direct noun borrowing via French *veste* → [[vest]] (waistcoat, sleeveless garment).
>   - Direct verb borrowing from *vestīre* → [[vest]] (to confer title or property).
>   - Adjectival participle: Latin *vestītus* / English *-ed* → [[vested]] (*vested rights*, *vested interest*).
> - **Liturgical & Nominal Suffixes `-ment / -ry / -ure`:**
>   - *vest- + -mentum* → [[vestment]] (ecclesiastical robe).
>   - *vest- + -ry* (via Anglo-French *vesterie*) → [[vestry]] (robing room).
>   - *vest- + -ure* (Latin *vestītūra*) → [[vesture]] (raiment, legal possession).
>   - *vest- + -ary* → [[vestiary]].
> - **Prefixed Compounds `in-` ("into, upon"):**
>   - *in- + vestīre* → [[invest]], generating [[investor]], [[investment]], and medieval Latin *investītūra* → [[investiture]].
>   - Productive iterative: *re- + in- + vestīre* → [[reinvest]], [[reinvestment]].
> - **Prefixed Compounds `dis- / de-` ("away, off"):**
>   - Latin *dēvestīre* / Anglo-French *desvestir* → [[divest]], [[divestment]], and legal/commercial [[divestiture]].
> - **Transposed Clothing Compounds `trans-` ("across"):**
>   - Italian *travestire* (from *trans-* + *vestire*) → French *travesti* → English [[travesty]].
>   - 20th-century sexology compound: *trans-* + *vestire* + *-ite* → [[transvestite]], [[transvestism]].

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
> Although unified by the concept of **"clothing"**, the modern semantic branches span diverse fields:
> - **Sartorial & Liturgical Apparel:** In [[vest]], [[vestment]], [[vesture]], [[vestry]], and [[vestiary]], the root denotes physical garments, chasubles, stoles, and the sacred sacristies where clergy robe.
> - **Financial Markets & Capital Allocation:** In [[invest]], [[investment]], [[investor]], [[reinvest]], and [[reinvestment]], clothing represents the economic deployment of capital into securities, equity, and real assets.
> - **Corporate Restructuring & Divestment:** In [[divest]], [[divestment]], and [[divestiture]], the root describes corporate spinoffs, selling off subsidiaries, or ethical divestment from fossil fuels.
> - **Constitutional & Property Law:** In [[vested]] and [[vest]] (verb), it denotes fixed, accrued legal entitlements, non-forfeitable pension benefits, and inherent constitutional powers.
> - **Satire, Parody & Identity:** In [[travesty]], [[transvestite]], and [[transvestism]], it captures the psychological and dramatic subversion of clothing and institutional form.
> - **Classical Architecture & Spatial Transition:** In [[vestibule]], it names the welcoming entrance hall or anatomical antechamber.

---

## 🔀 4. Prefix & Combining Dynamics on vest

### Prefix & First-Element Shifts (Directional & Semantic Modification)

| Prefix / Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | into, upon | [[invest]], [[investment]], [[investiture]] | To clothe with authority, office, or capital; to bestow rights upon. |
| `dis-` / `de-` | away from, stripping off | [[divest]], [[divestiture]], [[divestment]] | To strip of clothing, rights, office, or corporate assets. |
| `re-` + `in-` | again + into | [[reinvest]], [[reinvestment]] | To plow back earnings or capital into new productive ventures. |
| `trans-` (→ tra-) | across, changing over | [[travesty]], [[transvestite]] | To dress in the clothing of another; to disguise, cross-dress, or grotesquely parody. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ment` | Noun (Concrete Result / Action) | [[vestment]], [[investment]], [[divestment]] | Liturgical robe; financial deployment of capital; asset liquidation. |
| `-ure` | Noun (Feudal / Legal Action) | [[investiture]], [[divestiture]], [[vesture]] | Formal ceremony of conferring office; court-ordered sale of assets; clothing. |
| `-or` | Noun (Agent / Subject) | [[investor]] | An entity or person deploying capital in search of returns. |
| `-ry` / `-ary` | Noun & Adj (Place / Function) | [[vestry]], [[vestiary]] | The room in a church where vestments are kept; relating to clothing. |
| `-ite` / `-ism` | Noun (Person / Behavioral Practice) | [[transvestite]], [[transvestism]] | Cross-dressing identity or psychiatric/sociological categorization. |
| `-ed` | Adjective (Participial / Accrued) | [[vested]] | Fully accrued, legally fixed, and non-contingent (as in pension vesting). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📈 **Finance, Banking & Economics** | [[invest]], [[investment]], [[investor]], [[reinvest]], [[reinvestment]] | Venture capital, portfolio management, capital expenditure (CapEx), return on investment (ROI). |
| ⚖️ **Corporate Law & Antitrust** | [[divest]], [[divestiture]], [[vested]], [[vest]] | FTC antitrust merger remedies requiring structural divestiture, vested employee stock options, statutory power. |
| ⛪ **Liturgical History & Ecclesiology** | [[vestment]], [[vestry]], [[vesture]], [[investiture]] | The medieval Investiture Controversy (Pope Gregory VII vs Emperor Henry IV), Anglican parish vestry councils. |
| 🎭 **Literary Criticism & Cultural Studies** | [[travesty]], [[transvestite]], [[transvestism]] | Satirical burlesque, parody of classic drama, gender presentation, historical history of carnival disguise. |
| 🏛️ **Architecture & Human Anatomy** | [[vestibule]] | Entrance halls in public buildings, nasal vestibule, vestibular system of the inner ear mediating balance. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[disinvest]] | verb | **1.** Deprive of status or authority.<br>**2.** Reduce or dispose of; cease to hold (an investment). | *"In academic literature, disinvest designates deprive of status or authority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinvestment]] | noun | **1.** The withdrawal of capital from a country or corporation. | *"In academic literature, disinvestment designates the withdrawal of capital from a country or corporation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divest]] | verb | **1.** Take away possessions from someone.<br>**2.** Deprive of status or authority. | *"Tell me, my daughters,— Since now we will divest us both of rule, Interest of territory, cares of state,— Which of you shall we say doth love us most?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divestiture]] | noun | **1.** An order to an offending party to rid itself of property; it has the purpose of depriving the defendant of the gains of wrongful behavior.<br>**2.** The sale by a company of a product line or a subsidiary or a division. | *"The United States, as now composed, have no powers to exact obedience, or punish disobedience to their resolutions, either by pecuniary mulcts, by a suspension or divestiture of privileges, or by any other constitutional mode."* — Alexander Hamilton, *The Federalist Papers* |
| [[divestment]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vest within the domain of Clothing & Covering.<br>**2.** A technical or specialized form exhibiting the properties of vest in systematic terminology. | *"In academic literature, divestment designates pertaining to, derived from, or characteristic of latin vest within the domain of clothing & covering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invest]] | verb | **1.** Make an investment.<br>**2.** Give qualities or abilities to. | *"Dost thou so hunger for mine empty chair That thou wilt needs invest thee with my honours Before thy hour be ripe?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[investigate]] | verb | **1.** Investigate scientifically.<br>**2.** Conduct an inquiry or investigation of. | *"I have no need to observe that I do not wilfully or negligently mislead my readers and that before I wrote that description I took pains to investigate the subject."* — Charles Dickens, *Bleak House* |
| [[investigating]] | noun | **1.** The work of inquiring into something thoroughly and systematically.<br>**2.** Investigate scientifically. | *"To drop metaphor, while nominally investigating a particular problem of ancient mythology, I have really been discussing questions of more general interest which concern the gradual evolution of human thought from savagery to civilization."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[investigation]] | noun | **1.** An inquiry into unfamiliar or questionable activities.<br>**2.** The work of inquiring into something thoroughly and systematically. | *"Suppose you do!” While she is gone, the surgeon abandons his hopeless investigation and covers its subject with the patchwork counterpane."* — Charles Dickens, *Bleak House* |
| [[investigative]] | adjective | **1.** Designed to find information or ascertain facts. | *"In academic literature, investigative designates designed to find information or ascertain facts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[investigator]] | noun | **1.** A scientist who devotes himself to doing research.<br>**2.** Someone who investigates. | *"A theory which had the support of so learned and sagacious an investigator as W."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[investigatory]] | adjective | **1.** Designed to find information or ascertain facts. | *"In academic literature, investigatory designates designed to find information or ascertain facts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[investing]] | noun | **1.** The act of investing; laying out money or capital in an enterprise with the expectation of profit.<br>**2.** Make an investment. | *"From 1864 to 1870, fortunes were made from this source, but thereafter banks could make little more from note issues than they could by investing the same amount in other ways."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[investiture]] | noun | **1.** The ceremony of installing a new monarch.<br>**2.** The ceremonial act of clothing someone in the insignia of an office; the formal promotion of a person to an office or rank. | *"But this august dignity I treat of, is not the dignity of kings and robes, but that abounding dignity which has no robed investiture."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[investment]] | noun | **1.** The act of investing; laying out money or capital in an enterprise with the expectation of profit.<br>**2.** Money that is invested with an expectation of profit. | *"Institutions for saving and investment 12."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[investor]] | noun | **1.** Someone who commits capital in order to gain financial returns. | *"The investor in a corporation bought shares, and his liability for debts and losses was limited by charter to his share capital."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[transvestic]] | adjective | **1.** Receiving sexual gratification from wearing clothing of the opposite sex. | *"In academic literature, transvestic designates receiving sexual gratification from wearing clothing of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transvestism]] | noun | **1.** The practice of adopting the clothes or the manner or the sexual role of the opposite sex. | *"In academic literature, transvestism designates the practice of adopting the clothes or the manner or the sexual role of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transvestite]] | noun | **1.** Someone who adopts the dress or manner or sexual role of the opposite sex.<br>**2.** Receiving sexual gratification from wearing clothing of the opposite sex. | *"In academic literature, transvestite designates someone who adopts the dress or manner or sexual role of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transvestitism]] | noun | **1.** The practice of adopting the clothes or the manner or the sexual role of the opposite sex. | *"In academic literature, transvestitism designates the practice of adopting the clothes or the manner or the sexual role of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[travesty]] | noun | **1.** A comedy characterized by broad satire and improbable situations.<br>**2.** A composition that imitates or misrepresents somebody's style, usually in a humorous way. | *"Liddy, elevating her feelings to the occasion from a sense of grandeur, floated off behind Bathsheba with a milder dignity not entirely free from travesty, and the door was closed."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vest]] | noun | **1.** A man's sleeveless garment worn underneath a coat.<br>**2.** A collarless men's undergarment for the upper part of the body. | *"We know you always give when it is in your power.' "We parted; and after I had proceeded some distance, I bethought me of the piece of gold in my vest pocket."* — Classic Author, *The wonders of prayer* |
| [[vesta]] | noun | **1.** (roman mythology) goddess of the hearth and its fire whose flame was tended by vestal virgins; counterpart of greek hestia.<br>**2.** The brightest asteroid but the fourth to be discovered. | *"We shall go and see her to-morrow--I told her about you, Elsie." She flashed a look at me--like striking a vesta at night, it was."* — S. R. Crockett, *Deep Moat Grange* |
| [[vestal]] | noun | **1.** A chaste woman.<br>**2.** Of or relating to vesta. | *"Women are not In their best fortunes strong, but want will perjure The ne’er-touch’d vestal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vested]] | verb | **1.** Provide with power and authority.<br>**2.** Place (authority, property, or rights) in the control of a person or group of persons. | *"Your fortune is vested in the English funds; Briggs has the will and the necessary documents.” Here was a new card turned up!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[vestiary]] | adjective | **1.** Relating to clothing (especially vestments). | *"Their clothes were to be taken from one common <g>Vestiary</g>, and their food from one Larder."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[vestibular]] | adjective | **1.** Relating to the sense of equilibrium. | *"In academic literature, vestibular designates relating to the sense of equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vestibule]] | noun | **1.** A large entrance or reception room or area.<br>**2.** Any of various bodily cavities leading to another cavity (as of the ear or vagina). | *"She was obliged to kneel down by the sofa, and remain there to satisfy her patient; and thus they continued a few minutes, when, to her very great satisfaction, she heard some other person crossing the little vestibule."* — Jane Austen, *Persuasion* |
| [[vestige]] | noun | **1.** An indication that something has been present. | *"There was nothing smothered or furtive about it; there was not even the vestige of a chuckle in it."* — John Cairns, *Principal Cairns* |
| [[vestigial]] | adjective | **1.** Not fully developed in mature animals. | *"In academic literature, vestigial designates not fully developed in mature animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vestiture]] | noun | **1.** An archaic term for clothing. | *"In academic literature, vestiture designates an archaic term for clothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vestment]] | noun | **1.** Gown (especially ceremonial garments) worn by the clergy. | *"There Platón Karatáev was sitting covered up—head and all—with his greatcoat as if it were a vestment, telling the soldiers in his effective and pleasant though now feeble voice a story Pierre knew."* — graf Leo Tolstoy, *War and Peace* |
| [[vestmental]] | adjective | **1.** Of or relating to or resembling a vestment. | *"In academic literature, vestmental designates of or relating to or resembling a vestment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vestmented]] | adjective | **1.** Dressed in ceremonial garments especially clerical vestment. | *"In academic literature, vestmented designates dressed in ceremonial garments especially clerical vestment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vestris]] | noun | **1.** Italian dancing-master for louis xvi who was considered the greatest dancer of his day; he was the first to discard the mask in mime (1729-1808). | *"Marc._ ii, 4. [57] _de cor. mil._ 15. [58] _de praescr._ 40, _et si adhuc memini, Mithra signat_, etc. [59] Apol. 18. _Haec et nos risimus aliquando_. _De vestris sumus_. [60] _de test. animae_, 1. [61] So Arnobius (i, 58, 59) and Augustine felt."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[vestry]] | noun | **1.** In the protestant episcopal church: a committee elected by the congregation to work with the churchwardens in managing the temporal affairs of the church.<br>**2.** A room in a church where sacred vessels and vestments are kept or meetings are held. | *"The clergyman glided into the vestry, and the clerk vanished."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vestryman]] | noun | **1.** A man who is a member of a church vestry. | *"To them he was an infinitely superior vestryman with a tremendous power for dispensing coal and food to the poor."* — Donn Byrne, *The Wind Bloweth* |
| [[vestrywoman]] | noun | **1.** A woman who is a member of a church vestry. | *"In academic literature, vestrywoman designates a woman who is a member of a church vestry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vesture]] | noun | **1.** Something that covers or cloaks like a garment.<br>**2.** A covering designed to be worn on a person's body. | *"I heard him swear, Were he to stand for consul, never would he Appear i’ th’ marketplace nor on him put The napless vesture of humility, Nor showing, as the manner is, his wounds To th’ people, beg their stinking breaths."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Clothing & Covering]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VEST
  </div>
</div>
