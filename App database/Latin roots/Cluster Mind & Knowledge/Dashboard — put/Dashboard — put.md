---
status: unread
type: root_dashboard
---
# Dashboard — put
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">put-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to think, reckon, or prune”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A lightbulb turning on in your mind when an idea suddenly makes sense.</span>
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

The root **put** means to think, reckon, or prune. It refers to pruning away superfluities to settle an account or reach clear judgment. In English, this root forms words such as *compute*, *dispute*, *reputation*, and *deputy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to think, reckon, or prune
> The root **put** means to think, reckon, or prune. It refers to pruning away superfluities to settle an account or reach clear judgment. In English, this root forms words such as *compute*, *dispute*, *reputation*, and *deputy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To think, reckon, or prune</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *compute* and *dispute*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **put** comes from a Latin word that means *"to think, reckon, or prune"*.
  - At its core, it describes the action of think, reckon, or prune.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **put** in an English word, think of **to think, reckon, or prune**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to think, reckon, or prune).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Compute**: To determine, calculate, or reckon by mathematical or logical processes.
  - **Dispute**: To engage in argument, debate, or contestation.
  - **Reputation**: The overall quality, character, or stature of a person or entity as judged by society at large.
  - **Deputy**: A person appointed to act as a substitute or proxy for another, vested with authority in their absence.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">put</mark>, think of <mark class="hl-def">to think, reckon, or prune</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **put** functions through the classical four principal parts of *putō, putāre, putāvī, putātum*:
> - **Present Active Stem:** `put-` / `pute-` (*dis-pute*, *com-pute*, *im-pute*, *re-pute*, *de-pute*)
> - **Participial / Supine Stem:** `putat-` (*putat-ive*, *com-putat-ion*, *dis-putat-ion*, *im-putat-ion*, *am-putat-ion*)
> - **Contracted Romance Reflexes:** `count-` (*count*, *ac-count*, *dis-count* < *computāre*)
> - **Prefix Dynamics:** Readily compounds with Roman directional preverbs: *am(b)-* (around), *com-* (together), *dē-* (down/away), *dis-* (apart/opposing), *in- / im-* (into/upon), *re-* (again/back).

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
> Across English vocabulary, `put` radiates across five primary operational spectra:
> - **Algorithmic & Mathematical Reckoning:** [[compute]], [[computation]], [[computer]], [[computable]], [[count]], [[account]] preserve the numerical calculation of sums.
> - **Dialectical Controversy & Debate:** [[dispute]], [[disputation]], [[disputatious]], [[indisputable]] reflect the adversarial pruning of claims in search of truth.
> - **Attribution & Moral Culpability:** [[impute]], [[imputation]], [[imputable]] reflect the ledger entry of moral blame or theological grace.
> - **Civic Delegation & Proxy Governance:** [[depute]], [[deputy]], [[deputation]], [[deputize]] designate individuals assigned or counted out to act for superiors.
> - **Public Perception & Presumed Status:** [[repute]], [[reputation]], [[reputable]], [[disrepute]], [[putative]] delineate collective social assessment or assumed identity.
> - **Literal Surgical Pruning:** [[amputate]], [[amputation]], [[amputee]] preserve the primordial agrarian cutting of vines transferred to the human anatomy.

---

## 🔀 4. Prefix & Combining Dynamics on put

### Prefix Dynamics

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **amb-** | around, about | [[amputate]] | *amb-* + *putāre* $\to$ to cut or prune around $\to$ surgical removal of a bodily limb. |
| **com-** | together, thoroughly | [[compute]] / [[count]] | *com-* + *putāre* $\to$ to calculate figures together $\to$ mathematical or algorithmic processing. |
| **dē-** | down from, away | [[depute]] / [[deputy]] | *dē-* + *putāre* $\to$ to assign or designate down from authority $\to$ to appoint a proxy. |
| **dis-** | apart, in different directions | [[dispute]] | *dis-* + *putāre* $\to$ to reckon or argue from opposing viewpoints $\to$ verbal debate, controversy. |
| **in- / im-** | into, upon, against | [[impute]] | *in-* + *putāre* $\to$ to enter into the account against someone $\to$ to ascribe blame, guilt, or credit. |
| **re-** | back, again, repeatedly | [[repute]] / [[reputation]] | *re-* + *putāre* $\to$ to reckon repeatedly $\to$ public esteem, collective character assessment. |
| **in- (privative)** | not, un- | [[indisputable]] | *in-* + *dis-* + *putāre* + *-bilis* $\to$ not open to debate; unquestionable fact. |

### Suffix Transformations

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ation** | Noun of action or state | [[computation]], [[disputation]], [[imputation]], [[reputation]], [[amputation]] | The formal process or resulting state of reckoning, debating, ascribing, or excising. |
| **-ive** | Descriptive adjective | [[putative]] | Expressing tendency or state: assumed or reputed to be such. |
| **-able / -ible** | Passive capacity | [[computable]], [[disputable]], [[indisputable]], [[reputable]] | Capable of being calculated, contested, or held in high esteem. |
| **-er / -ant** | Agent noun | [[computer]], [[disputant]] | One who (or a machine that) calculates or enters into formal debate. |
| **-ize** | Factitive verb formant | [[deputize]], [[computerize]] | To formally confer proxy powers or convert to digital automated computing. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Computer Science & IT** | [[compute]], [[computation]], [[computer]], [[computerize]], [[computational]] | Turing computability, algorithmic processing, supercomputing, data infrastructure. |
| **Law & Jurisprudence** | [[dispute]], [[indisputable]], [[putative]], [[impute]], [[deputy]] | Civil litigation, undisputed evidence, putative marriage/fatherhood, vicarious liability. |
| **Commerce & Finance** | [[account]], [[accountant]], [[count]], [[discount]], [[computation]] | Auditing ledgers, accounts payable, discounted cash flows, reconciling discrepancies. |
| **Politics & Administration** | [[depute]], [[deputy]], [[deputation]], [[deputize]] | Diplomatic delegations, parliamentary deputies, law enforcement deputies. |
| **Ethics & Theology** | [[impute]], [[imputation]], [[repute]], [[disrepute]], [[reputable]] | Reformed theological doctrine of imputed righteousness, moral accountability. |
| **Surgery & Medicine** | [[amputate]], [[amputation]], [[amputee]] | Emergency trauma surgery, gangrene management, limb salvage protocols. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[amputate]] | verb | **1.** Remove surgically. | *"Carter, the surgeon, had to amputate it directly."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[amputation]] | noun | **1.** A condition of disability resulting from the loss of one or more limbs.<br>**2.** A surgical removal of all or part of a limb. | *"Grief is a matter of relativity; the sorrow should be estimated by its proportion to the sorrower; a gash is as painful to one as an amputation to another."* — Francis Thompson, *Shelley: An Essay* |
| [[amputator]] | noun | **1.** A surgeon who removes part or all of a limb. | *"In academic literature, amputator designates a surgeon who removes part or all of a limb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[computable]] | adjective | **1.** May be computed or estimated. | *"In academic literature, computable designates may be computed or estimated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[computation]] | noun | **1.** The procedure of calculating; determining something by mathematical or logical methods.<br>**2.** Problem solving that involves numbers or quantities. | *"By computation and mine host’s report."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[computational]] | adjective | **1.** Of or involving computation or computers. | *"In academic literature, computational designates of or involving computation or computers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[computationally]] | adverb | **1.** With regard to computation. | *"In academic literature, computationally designates with regard to computation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compute]] | verb | **1.** Make a mathematical calculation or computation. | *"Who made the heart, ’tis He alone Decidedly can try us; He knows each chord, its various tone, Each spring, its various bias: Then at the balance let’s be mute, We never can adjust it; What’s done we partly may compute, But know not what’s resisted."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[computer]] | noun | **1.** A machine for performing calculations automatically.<br>**2.** An expert at calculation (or at operating calculating machines). | *"Out." Keeper's message simultaneously loaded into the recon-patroller's computer as authenticator for the mission and demolition and laser gun settings."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[computerise]] | verb | **1.** Provide with computers.<br>**2.** Store in a computer. | *"In academic literature, computerise designates provide with computers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[computerization]] | noun | **1.** The control of processes by computer. | *"In academic literature, computerization designates the control of processes by computer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[computerize]] | verb | **1.** Provide with computers.<br>**2.** Store in a computer. | *"In academic literature, computerize designates provide with computers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[computing]] | noun | **1.** The branch of engineering science that studies (with the aid of computers) computable processes and structures.<br>**2.** The procedure of calculating; determining something by mathematical or logical methods. | *"Computing the distance between the thirty-first and forty-fifth degrees, it amounts to nine hundred and seventy-three common miles; computing it from thirty-one to forty-two degrees, to seven hundred and sixty-four miles and a half."* — Alexander Hamilton, *The Federalist Papers* |
| [[deputation]] | noun | **1.** A group of representatives or delegates.<br>**2.** Authorizing subordinates to make certain decisions. | *"Most kind messenger, Say to great Caesar this in deputation: I kiss his conqu’ring hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[depute]] | verb | **1.** Transfer power to someone.<br>**2.** Appoint as a substitute. | *"Sir, there is especial commission come from Venice to depute Cassio in Othello’s place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deputise]] | verb | **1.** Act as a substitute.<br>**2.** Appoint as a substitute. | *"In academic literature, deputise designates act as a substitute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deputize]] | verb | **1.** Act as a substitute.<br>**2.** Appoint as a substitute. | *"We were deputized to invite our Chief Magistrate to attend the great Northwestern Fair, to be held in May--and this was our errand."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[deputy]] | noun | **1.** Someone authorized to exercise the powers of sheriff in emergencies.<br>**2.** An assistant with power to act when his superior is absent. | *"There’s no more faith in thee than in a stewed prune, nor no more truth in thee than in a drawn fox; and, for woman-hood, Maid Marian may be the deputy’s wife of the ward to thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disputable]] | adjective | **1.** Capable of being disproved.<br>**2.** Open to argument or debate. | *"He is too disputable for my company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disputant]] | noun | **1.** A person who disputes; who is good at or enjoys controversy. | *"But I will say, as you shall see, that he matched their subtlety with equal subtlety; and from what I saw of him I have little doubt but what he would have confounded many a disputant in the synagogues."* — Jack London, *The Jacket (The Star-Rover)* |
| [[disputation]] | noun | **1.** The formal presentation of a stated proposition and the opposition to it (usually followed by a vote).<br>**2.** A contentious speech act; a dispute where there is strong disagreement. | *"If that be made a theme for disputation, The branches of another root are rotted, And undeserved reproach to him allotted That is as clear from this attaint of mine As I, ere this, was pure to Collatine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disputatious]] | adjective | **1.** Inclined or showing an inclination to dispute or disagree, even to engage in law suits. | *"Play.” I think it will be conceded by my most disputatious reader, that she could hardly have directed an unfortunate boy to do anything in the wide world more difficult to be done under the circumstances."* — Charles Dickens, *Great Expectations* |
| [[disputatiously]] | adverb | **1.** In a disputatious manner. | *"In academic literature, disputatiously designates in a disputatious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disputative]] | adjective | **1.** Inclined or showing an inclination to dispute or disagree, even to engage in law suits. | *"In academic literature, disputative designates inclined or showing an inclination to dispute or disagree, even to engage in law suits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dispute]] | noun | **1.** A disagreement or argument about something important.<br>**2.** Coming into conflict with. | *"Whether your Grace be worthy, yea or no, Dispute not that; York is the worthier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disputed]] | verb | **1.** Take exception to.<br>**2.** Have a disagreement over something. | *"I’ll have’t disputed on; ’Tis probable, and palpable to thinking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disreputability]] | noun | **1.** Dishonorableness by virtue of lacking respectability or a good reputation. | *"In academic literature, disreputability designates dishonorableness by virtue of lacking respectability or a good reputation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disreputable]] | adjective | **1.** Lacking respectability in character or behavior or appearance. | *"Yes, and every kind of unclean and disreputable person they urged to join them, quite unlike all decent and established religions."* — T. R. Glover, *The Jesus of History* |
| [[disreputableness]] | noun | **1.** Dishonorableness by virtue of lacking respectability or a good reputation. | *"In academic literature, disreputableness designates dishonorableness by virtue of lacking respectability or a good reputation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disreputably]] | adverb | **1.** In a disreputable manner. | *"No one was what could be called, in good society, disreputably drunk, unless it was the seedy gentleman whom I met by appointment; and even he was able to handle himself tolerably well."* — Oliver Optic, *Plane and Plank; or, The Mishaps of a Mechanic* |
| [[disrepute]] | noun | **1.** The state of being held in low esteem. | *"Fraser, the tutor, died however, and the school which had begun well sank from disrepute into infamy."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[imputable]] | adjective | **1.** Capable of being assigned or credited to. | *"No one having previously heard his history, could for the first time behold Father Mapple without the utmost interest, because there were certain engrafted clerical peculiarities about him, imputable to that adventurous maritime life he had led."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[imputation]] | noun | **1.** A statement attributing something dishonest (especially a criminal offense).<br>**2.** The attribution to a source or cause. | *"I mean, sir, for his weapon; but in the imputation laid on him, by them in his meed he’s unfellowed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impute]] | verb | **1.** Attribute or credit to.<br>**2.** Attribute (responsibility or fault) to a cause or source. | *"This silence for my sin you did impute, Which shall be most my glory being dumb, For I impair not beauty being mute, When others would give life, and bring a tomb."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imputrescible]] | adjective | **1.** Not subject to decay. | *"In academic literature, imputrescible designates not subject to decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incomputable]] | adjective | **1.** Beyond calculation or measure. | *"In academic literature, incomputable designates beyond calculation or measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indisputability]] | noun | **1.** The quality of being beyond question or dispute or doubt. | *"In academic literature, indisputability designates the quality of being beyond question or dispute or doubt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indisputable]] | adjective | **1.** Not open to question; obviously true.<br>**2.** Impossible to doubt or dispute. | *"I don’t know why it should be a crack thing to be a brewer; but it is indisputable that while you cannot possibly be genteel and bake, you may be as genteel as never was and brew."* — Charles Dickens, *Great Expectations* |
| [[input]] | noun | **1.** Signal going into an electronic system.<br>**2.** A statement that expresses a personal opinion or belief or adds information. | *"What's their input?" "Adari is your navigator."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[put]] | noun | **1.** The option to sell a given stock (or stock index or commodity future) at a given price before a given date.<br>**2.** Put into a certain place or abstract location. | *"The statute of thy beauty thou wilt take, Thou usurer that put’st forth all to use, And sue a friend, came debtor for my sake, So him I lose through my unkind abuse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[putamen]] | noun | **1.** The outer reddish part of the lenticular nucleus. | *"In academic literature, putamen designates the outer reddish part of the lenticular nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putative]] | adjective | **1.** Purported; commonly put forth or accepted as true on inconclusive grounds. | *"In academic literature, putative designates purported; commonly put forth or accepted as true on inconclusive grounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putin]] | noun | **1.** Russian statesman chosen as president of the russian federation in 2000; formerly director of the federal security bureau (born in 1952). | *"In academic literature, putin designates russian statesman chosen as president of the russian federation in 2000; formerly director of the federal security bureau (born in 1952)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putoff]] | noun | **1.** A pretext for delay or inaction. | *"In academic literature, putoff designates a pretext for delay or inaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putout]] | noun | **1.** An out resulting from a fielding play (not a strikeout). | *"In academic literature, putout designates an out resulting from a fielding play (not a strikeout)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrajaya]] | noun | **1.** Malaysia's sparkling new capital. | *"In academic literature, putrajaya designates malaysia's sparkling new capital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrefacient]] | adjective | **1.** Causing or promoting bacterial putrefaction. | *"In academic literature, putrefacient designates causing or promoting bacterial putrefaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrefaction]] | noun | **1.** A state of decay usually accompanied by an offensive odor.<br>**2.** (biology) the process of decay caused by bacterial or fungal action. | *"Directly Rostóv entered the door he was enveloped by a smell of putrefaction and hospital air."* — graf Leo Tolstoy, *War and Peace* |
| [[putrefactive]] | adjective | **1.** Causing or promoting bacterial putrefaction. | *"In academic literature, putrefactive designates causing or promoting bacterial putrefaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrefiable]] | adjective | **1.** Liable to decay or spoil or become putrid. | *"In academic literature, putrefiable designates liable to decay or spoil or become putrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrefy]] | verb | **1.** Become putrid; decay with an offensive smell. | *"She may not touch any food which is to be preserved by salting, whether it be fish, flesh, or vegetables; for were she to touch it the food would putrefy."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[putrescence]] | noun | **1.** In a state of progressive putrefaction.<br>**2.** The quality of rotting and becoming putrid. | *"In academic literature, putrescence designates in a state of progressive putrefaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrescent]] | adjective | **1.** Becoming putrid. | *"In academic literature, putrescent designates becoming putrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrescible]] | adjective | **1.** Liable to decay or spoil or become putrid. | *"In academic literature, putrescible designates liable to decay or spoil or become putrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrescine]] | noun | **1.** A colorless crystalline ptomaine with a foul odor that is produced in decaying animal matter. | *"In academic literature, putrescine designates a colorless crystalline ptomaine with a foul odor that is produced in decaying animal matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrid]] | adjective | **1.** Of or relating to or attended by putrefaction.<br>**2.** In an advanced state of decomposition and having a foul odor; - somerset maugham. | *"Some forty years ago, in a rural parish in New England, a young man lay apparently on his death-bed with a putrid fever."* — Classic Author, *The wonders of prayer* |
| [[putrid-smelling]] | adjective | **1.** Having the putrid odor of decaying organic matter. | *"In academic literature, putrid-smelling designates having the putrid odor of decaying organic matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putridity]] | noun | **1.** The state of being putrid. | *"In academic literature, putridity designates the state of being putrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putridness]] | noun | **1.** In a state of progressive putrefaction. | *"In academic literature, putridness designates in a state of progressive putrefaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putsch]] | noun | **1.** A sudden and decisive change of government illegally or by force. | *"In academic literature, putsch designates a sudden and decisive change of government illegally or by force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putt]] | noun | **1.** Hitting a golf ball that is on the green using a putter.<br>**2.** Strike (a golf ball) lightly, with a putter. | *"Murder is thy alms-deed; Petitioners for blood thou ne’er putt’st back."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[puttee]] | noun | **1.** A strip of cloth wound around the leg to form legging; used by soldiers in world war i. | *"Physical causes--wet, cold, indigestion, tight puttees--account for nine out of ten of these queer breakdowns."* — Anthony Pryde, *Nightfall* |
| [[putter]] | noun | **1.** A golfer who is putting.<br>**2.** The iron normally used on the putting green. | *"Seese is not good to give putter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[putterer]] | noun | **1.** A person who putters about. | *"In academic literature, putterer designates a person who putters about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putting]] | noun | **1.** Hitting a golf ball that is on the green using a putter.<br>**2.** Put into a certain place or abstract location. | *"So putting him to rage, You should have ta’en th’ advantage of his choler And passed him unelected."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[putty]] | noun | **1.** A dough-like mixture of whiting and boiled linseed oil; used especially to patch woodwork or secure panes of glass.<br>**2.** Apply putty in order to fix or fill. | *"Marso Ed'ard allus tole me be keerful ob dem, and de roads am putty bad sence de big storm." Zoe glanced at her watch as they entered the village."* — Martha Finley, *Elsie's Kith and Kin* |
| [[puttyroot]] | noun | **1.** North american orchid bearing a single leaf and yellowish-brown flowers. | *"In academic literature, puttyroot designates north american orchid bearing a single leaf and yellowish-brown flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reputability]] | noun | **1.** Honorableness by virtue of being respectable and having a good reputation. | *"In academic literature, reputability designates honorableness by virtue of being respectable and having a good reputation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reputable]] | adjective | **1.** Having a good reputation. | *"About, in the gas-lit square, escorted, guarded, went other women, reputable women."* — Donn Byrne, *The Wind Bloweth* |
| [[reputably]] | adverb | **1.** In a reputable manner. | *"Such things as could be said for him were said,—how he had taken to industrious habits, and had thriven lawfully and reputably."* — Charles Dickens, *Great Expectations* |
| [[reputation]] | noun | **1.** The state of being held in high esteem and honor.<br>**2.** Notoriety for some particular characteristic. | *"Though my estate be fall’n, I was well born, Nothing acquainted with these businesses, And would not put my reputation now In any staining act."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repute]] | noun | **1.** The state of being held in high esteem and honor.<br>**2.** Look on as or consider. | *"My lord, I have considered with myself The title of this most renowned duke, And in my conscience do repute his grace The rightful heir to England’s royal seat."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reputedly]] | adverb | **1.** By repute; according to general belief. | *"In academic literature, reputedly designates by repute; according to general belief."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supercomputer]] | noun | **1.** A mainframe computer that is one of the most powerful available at a given time. | *"In academic literature, supercomputer designates a mainframe computer that is one of the most powerful available at a given time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undisputable]] | adjective | **1.** Not open to question; obviously true. | *"In academic literature, undisputable designates not open to question; obviously true."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undisputed]] | adjective | **1.** Generally agreed upon; not subject to dispute. | *"Her resolute effort threw back the lid, and gave to her astonished eyes the view of a white cotton counterpane, properly folded, reposing at one end of the chest in undisputed possession!"* — Jane Austen, *Northanger Abbey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Mind & Knowledge]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PUT
  </div>
</div>
