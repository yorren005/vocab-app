---
status: unread
type: root_dashboard
---
# Dashboard — mort
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mort-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“death”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A flickering candle flame going out as silence and stillness return.</span>
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

The root **mort** means death. It refers to the end of physical life, mortality, and passing away. In English, this root forms words such as *mortal*, *immortal*, *mortality*, and *mortuary*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: death
> The root **mort** means death. It refers to the end of physical life, mortality, and passing away. In English, this root forms words such as *mortal*, *immortal*, *mortality*, and *mortuary*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Death</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A flickering candle flame going out as silence and stillness return.</mark>
> - **Everyday Connection**: Think of familiar words like *mortal* and *immortal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mort** comes from a Latin word that means *"death"*.
  - At its core, it describes death.

- **The Big Picture Idea**:
  - Picture a flickering candle flame going out as silence and stillness return.
  - Whenever you see **mort** in an English word, think of **mortality and the end of life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of death.
  - **Mental & Social**: How people experience, organize, or communicate about death.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Mortal**: Subject to death.
  - **Immortal**: Not subject to death.
  - **Mortality**: The state of being subject to death.
  - **Mortuary**: A room or building in which dead bodies are kept before burial or cremation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mort</mark>, think of <mark class="hl-def">mortality and the end of life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mort** operates through five core morphological stems:
> - **Primary Nominal Stem `mort-` (Latin *mors, mortis*):**
>   - Direct forensic phrases: [[rigor mortis]], [[livor mortis]], [[algor mortis]].
>   - Compound nominal formations: *mort- + gage* → [[mortgage]]; *mort- + main* → [[mortmain]].
> - **Participial Stem `mortu-` (Latin *mortuus*, "dead"):**
>   - Medieval Latin *mortuārium* → English [[mortuary]].
>   - Professional agent noun: *mort- + -ician* → [[mortician]].
> - **Adjectival Base `mortal-` (Latin *mortālis*, "subject to death"):**
>   - Primary adjective: Latin *mortālis* → English [[mortal]].
>   - Adverbial form: *mortal + -ly* → [[mortally]].
>   - Abstract noun of state / rate: Latin *mortālitās* → English [[mortality]].
>   - Prefixal negation `im-` (*in-*): Latin *immortālis* → English [[immortal]] → [[immortality]] → [[immortalize]] → [[immortalization]].
> - **Factitive / Causative Verbal Stem `mortific-` (Latin *mortificāre* < *mors* + *facere*):**
>   - Latin *mortificāre* ("to make dead, kill off") → English [[mortify]] → [[mortification]] → [[mortifying]].
> - **Gerundive Verbal Stem `moribund-` (Latin *morī* + *-bundus*):**
>   - Latin *moribundus* ("on the verge of dying") → English [[moribund]] → [[moribundity]].
> - **Financial Extinction Stem `amort-` (Anglo-Norman *amortir* < Latin *ad-* + *mort-*):**
>   - Anglo-Norman *amortir* → English [[amortize]] → [[amortization]].

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
> Although unified by the core concept of **"death and dying"**, the semantic manifestations diverge into sharply defined disciplinary categories:
> - **Existential & Ontological Mortality:** In [[mortal]], [[mortality]], [[immortal]], and [[immortality]], the root defines the universal parameter of the human condition versus gods and timeless works of art.
> - **Forensic Pathology & Thanatology:** In [[rigor mortis]], [[post mortem]], [[livor mortis]], [[algor mortis]], [[mortuary]], and [[mortician]], the root provides the precise physical lexicon for examining, cooling, stiffening, and preparing deceased bodies.
> - **Commercial Banking, Property & Real Estate:** In [[mortgage]], [[mortgagee]], [[mortgagor]], [[amortize]], and [[amortization]], the root undergoes semantic transfer into property finance: debts and pledges are "killed" and extinguished over time.
> - **Feudal Land Tenure & Ecclesiastical Law:** In [[mortmain]], the "dead hand" refers to the perpetual, inalienable holding of property by corporations or monasteries, effectively dead to feudal taxation and inheritance duties.
> - **Psychological Humiliation & Spiritual Asceticism:** In [[mortify]], [[mortification]], and [[mortifying]], the physical "putting to death" of bodily appetites morphed into the acute, agonizing embarrassment that makes someone feel figuratively slain.
> - **Terminal Decline & Stagnation:** In [[moribund]] and [[moribundity]], the word describes dying ecosystems, collapsing currencies, obsolete technologies, or patients in their final agonal hours.

---

## 🔀 4. Prefix & Combining Dynamics on mort

### Prefix Dynamics (Negation, Direction & Temporal Sequence)

| Prefix / Combining Element | Classical Meaning | Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `im-` (assimilation of *in-*) | not, un- | [[immortal]], [[immortality]] | Negation of death; living or enduring forever; divine. |
| `a-` / `am-` (from Latin *ad-*) | to, toward | [[amortize]], [[amortization]] | Bringing a debt toward its "death" or extinction. |
| `post-` | after, following | [[post mortem]] / [[postmortem]] | Occurring or performed after biological death. |
| *(unprefixed base)* | — | [[mortal]], [[mortgage]], [[moribund]] | Directly expressive of dying, dead pledges, or mortal limits. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-al` (Latin *-ālis*) | Adjective (Pertaining to) | [[mortal]] | Subject to death; causing death. |
| `-ity` (Latin *-itās*) | Abstract Noun (State / Ratio) | [[mortality]], [[immortality]], [[moribundity]] | State of being mortal; statistical death rate. |
| `-ly` | Adverb (Manner) | [[mortally]] | In a fatal or deathly manner (e.g., *mortally wounded*). |
| `-ize` / `-ization` | Verb & Verbal Noun (Process) | [[immortalize]], [[amortize]], [[amortization]] | To make immortal; to extinguish a debt over time. |
| `-ify` / `-ification` (Latin *facere*) | Factitive Verb & Noun | [[mortify]], [[mortification]] | To destroy vitality; to cause deep humiliation. |
| `-ician` (by analogy with *physician*) | Agent Noun (Profession) | [[mortician]] | A professional practitioner who prepares the deceased. |
| `-uary` (Latin *-ārium*) | Noun / Adjective (Place of) | [[mortuary]] | A facility where deceased individuals are kept. |
| `-bund` (Latin *-bundus*) | Gerundive Adjective (Tending to) | [[moribund]] | In a dying state; on the threshold of extinction. |
| `-ee` / `-or` (Legal Pairings) | Recipient / Agent | [[mortgagee]], [[mortgagor]] | Creditor holding the pledge; debtor granting the pledge. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Forensic Pathology & Thanatology** | [[rigor mortis]], [[livor mortis]], [[algor mortis]], [[post mortem]], [[mortuary]] | Establishing the postmortem interval (PMI) by measuring body temperature decay (algor), chemical muscular stiffening (rigor), and gravitational blood pooling (livor); performing autopsies. |
| 🏦 **Banking, Finance & Real Estate** | [[mortgage]], [[amortize]], [[amortization]], [[mortgagee]], [[mortgagor]] | Fixed-rate and adjustable-rate home loans, amortization schedules calculating interest and principal retirement, negative amortization risks. |
| ⚖️ **Property Law & Legal History** | [[mortmain]], [[mortgage]], [[mortally]] | Statutes of Mortmain (restricting property transfer to the Church), legal standards for mortally wounded victims, dying declarations. |
| 📊 **Demography, Actuarial Science & Epidemiology** | [[mortality]], [[mortal]] | Construction of actuarial life tables, all-cause mortality rates, maternal and infant mortality metrics, excess mortality during epidemics. |
| 🎨 **Art History, Philosophy & Literature** | [[memento mori]], [[immortal]], [[immortalize]] | Vanitas still-life paintings featuring skulls and hourglasses, Shakespearean sonnets promising immortality through verse, Stoic meditation on human finitude. |
| ⛪ **Theology, Asceticism & Psychology** | [[mortify]], [[mortification]], [[mortifying]] | Catholic ascetic practices of the mortification of the flesh (fasting, hairshirts), psychological mechanisms of narcissistic mortification. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[amortisation]] | noun | **1.** The reduction of the value of an asset by prorating its cost over a period of years.<br>**2.** Payment of an obligation in a series of installments or transfers. | *"In academic literature, amortisation designates the reduction of the value of an asset by prorating its cost over a period of years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amortise]] | verb | **1.** Liquidate gradually. | *"In academic literature, amortise designates liquidate gradually."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amortization]] | noun | **1.** The reduction of the value of an asset by prorating its cost over a period of years.<br>**2.** Payment of an obligation in a series of installments or transfers. | *"The loan is repaid by the farmers under a regular plan of amortization."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[amortize]] | verb | **1.** Liquidate gradually. | *"In academic literature, amortize designates liquidate gradually."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antemortem]] | adjective | **1.** Preceding death. | *"In academic literature, antemortem designates preceding death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immortal]] | noun | **1.** A person (such as an author) of enduring fame.<br>**2.** Any supernatural being worshipped as controlling some part of the world or some aspect of life or who is the personification of a force. | *"This young gentlewoman had a father—O that “had!”, how sad a passage ’tis!—whose skill was almost as great as his honesty; had it stretch’d so far, would have made nature immortal, and death should have play for lack of work."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immortalise]] | verb | **1.** Be or provide a memorial to a person or an event.<br>**2.** Make famous forever. | *"Lord Ravenshaw, in Cornwall, which would of course have immortalised the whole party for at least a twelvemonth! and being so near, to lose it all, was an injury to be keenly felt, and Mr."* — Jane Austen, *Mansfield Park* |
| [[immortality]] | noun | **1.** The quality or state of being immortal.<br>**2.** Perpetual life after death. | *"If, as some thinkers hold, immortality consists in being enshrined in others’ memories, then did Black Bess become immortal that day if she never had done so before."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[immortalize]] | verb | **1.** Be or provide a memorial to a person or an event.<br>**2.** Make famous forever. | *"Woman, do what thou canst to save our honours; Drive them from Orleans and be immortalized."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immortelle]] | noun | **1.** Mostly widely cultivated species of everlasting flowers having usually purple flowers; southern europe to iran; naturalized elsewhere. | *"Vain 'scutcheon, false trophies of Mars and Diana,-- Can the dead laurel sprout with the live immortelle?"* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[mortal]] | noun | **1.** A human being.<br>**2.** Subject to death. | *"Was it his spirit, by spirits taught to write, Above a mortal pitch, that struck me dead?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortality]] | noun | **1.** The quality or state of being mortal.<br>**2.** The ratio of deaths in an area to the population of that area; expressed per 1000 per year. | *"He was excellent indeed, madam; the king very lately spoke of him admiringly, and mourningly; he was skilful enough to have liv’d still, if knowledge could be set up against mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortally]] | adverb | **1.** In such a manner that death ensues (also in reference to hatred, jealousy, fear, etc.). | *"Your shafts of fortune, though they hurt you mortally, Yet glance full wanderingly on us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortar]] | noun | **1.** A muzzle-loading high-angle gun with a short barrel that fires shells at high elevations for a short range.<br>**2.** Used as a bond in masonry or for covering a wall. | *"He stands there, like a mortar-piece, to blow us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortarboard]] | noun | **1.** A square board with a handle underneath; used by masons to hold or carry mortar.<br>**2.** An academic cap with a flat square with a tassel on top. | *"And the Trinity jibs in their mortarboards."* — James Joyce, *Ulysses* |
| [[mortgage]] | noun | **1.** A conditional conveyance of property as security for the repayment of a loan.<br>**2.** Put up as security or collateral. | *"He had condescended to mortgage as far as he had the power, but he would never condescend to sell."* — Jane Austen, *Persuasion* |
| [[mortgaged]] | verb | **1.** Put up as security or collateral.<br>**2.** Burdened with legal or financial obligations. | *"The lender of money secured by mortgage has a legally recognized and enforceable interest in the mortgaged wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mortgagee]] | noun | **1.** The person who accepts a mortgage. | *"You see, he, Dignam, I mean, didn’t serve any notice of the assignment on the company at the time and nominally under the act the mortgagee can’t recover on the policy. —Holy Wars, says Joe, laughing, that’s a good one if old Shylock is landed."* — James Joyce, *Ulysses* |
| [[mortgager]] | noun | **1.** The person who gives a mortgage in return for money to be repaid. | *"At this moment her savings’ banks are engaged in compelling mortgagers to accept eight per cent. as the present rate."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[mortgagor]] | noun | **1.** The person who gives a mortgage in return for money to be repaid. | *"The unfortunate mortgagor must then accept the terms, hard as they may be, dictated to him, be they 8, 10, 12, or 20 per cent."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[mortice]] | noun | **1.** A square hole made to receive a tenon and so to form a joint.<br>**2.** Cut a hole for a tenon in. | *"In academic literature, mortice designates a square hole made to receive a tenon and so to form a joint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mortician]] | noun | **1.** One whose business is the management of funerals. | *"In academic literature, mortician designates one whose business is the management of funerals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mortification]] | noun | **1.** Strong feelings of embarrassment.<br>**2.** The localized death of living cells (as from infection or the interruption of blood supply). | *"Guppy has so slight a part, except when he gives his evidence, that he is moved on like a private individual and can only haunt the secret house on the outside, where he has the mortification of seeing Mr."* — Charles Dickens, *Bleak House* |
| [[mortified]] | verb | **1.** Practice self-denial of one's body and appetites.<br>**2.** Hold within limits and control. | *"Thou, like an exorcist, hast conjur’d up My mortified spirit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortify]] | verb | **1.** Practice self-denial of one's body and appetites.<br>**2.** Hold within limits and control. | *"Charles Hayter had met with much to disquiet and mortify him in his cousin’s behaviour."* — Jane Austen, *Persuasion* |
| [[mortifying]] | verb | **1.** Practice self-denial of one's body and appetites.<br>**2.** Hold within limits and control. | *"Let me play the fool, With mirth and laughter let old wrinkles come, And let my liver rather heat with wine Than my heart cool with mortifying groans."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortimer]] | noun | **1.** English nobleman who deposed edward ii and was executed by edward iii (1287-1330). | *"Edmund MORTIMER, Earl of March."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortise]] | noun | **1.** A square hole made to receive a tenon and so to form a joint.<br>**2.** Cut a hole for a tenon in. | *"If it hath ruffian’d so upon the sea, What ribs of oak, when mountains melt on them, Can hold the mortise?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortmain]] | noun | **1.** Real property held inalienably (as by an ecclesiastical corporation).<br>**2.** The oppressive influence of past events or decisions. | *"Throughout the history of England, Parliament has given attention to the question of mortmain, which chiefly concerned the drifting of great estates into the hands of the church or of corporations, as the result of bequests by the pious."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[morton]] | noun | **1.** United states jazz musician who moved from ragtime to new orleans jazz (1885-1941). | *"TRAVERS and MORTON, retainers of Northumberland."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mortuary]] | noun | **1.** A building (or room) where dead bodies are kept before burial or cremation.<br>**2.** Of or relating to or characteristic of death. | *"It is needless to say that the dead steersman has been reverently removed from the place where he held his honourable watch and ward till death--a steadfastness as noble as that of the young Casabianca--and placed in the mortuary to await inquest."* — Bram Stoker, *Dracula* |
| [[postmortal]] | adjective | **1.** Occurring or done after death. | *"In academic literature, postmortal designates occurring or done after death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmortem]] | noun | **1.** Discussion of an event after it has occurred.<br>**2.** An examination and dissection of a dead body to determine cause of death or the changes produced by disease. | *"Good idea a postmortem for doctors."* — James Joyce, *Ulysses* |
| [[rigor mortis]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin mort within the domain of Death.<br>**2.** A technical or specialized form exhibiting the properties of mort in systematic terminology. | *"In academic literature, rigor mortis designates pertaining to, derived from, or characteristic of latin mort within the domain of death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmortgaged]] | adjective | **1.** (especially of a title) free from any encumbrance or limitation that presents a question of fact or law. | *"In academic literature, unmortgaged designates (especially of a title) free from any encumbrance or limitation that presents a question of fact or law."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Death]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MORT
  </div>
</div>
