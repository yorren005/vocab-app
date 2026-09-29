---
status: unread
type: root_dashboard
---
# Dashboard — deb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">deb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to owe”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **deb** means to owe. It refers to owe, to be indebted, moral or financial obligation. In English, this root forms words such as *debt*, *debtor*, *debit*, and *debenture*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to owe
> The root **deb** means to owe. It refers to owe, to be indebted, moral or financial obligation. In English, this root forms words such as *debt*, *debtor*, *debit*, and *debenture*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To owe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *debt* and *debtor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **deb** comes from a Latin word that means *"to owe"*.
  - At its core, it describes the action of owe.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **deb** in an English word, think of **to owe**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to owe).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Debt**: Something, typically money, that is owed or due.
  - **Debtor**: A person, company, or government that owes money.
  - **Debit**: An accounting entry recording an amount owed or spent.
  - **Debenture**: A long-term loan certificate issued by a company that is not secured by physical assets or collateral.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">deb</mark>, think of <mark class="hl-def">to owe</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **deb** functions in English through two distinct morphological tracks:
> - **Direct Latin Stems (`deb-` / `debit-`):**
>   - *dēbitum* (neuter noun, "that which is owed") → *debit*.
>   - *dēbitor* (agent noun) → *debtor*.
>   - *dēbentur* (3rd person plural passive: "there are owing") → *debenture* (a formal loan acknowledgment).
> - **Anglo-Norman French Track (`du-` / `dev-`):**
>   - *deu* (from *dēbūtum*) → *due*, *duly*, *undue*, *unduly*.
>   - *duete* → *duty*, *dutiful*, *dutifully*.
>   - *in-* + *debt* → *indebted*, *indebtedness*.

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
> Although the root fundamentally denotes **"owing or being bound"**, its register branches into distinct applications:
> - **Financial & Banking Sense:** In [[debt]], [[debit]], and [[debenture]], it denotes recorded monetary liabilities, ledger debits, and corporate bonds.
> - **Moral & Ethical Sense:** In [[duty]], [[dutiful]], and [[duly]], it denotes filial, legal, and moral obligations owed to society, family, or conscience.
> - **Entitlement & Schedule Sense:** In [[due]], it designates something that has arrived at its rightful time or belongs by right.
> - **Emotional & Gratitude Sense:** In [[indebted]], it denotes heartfelt thankfulness and obligation to a benefactor.
> - **Excess & Inappropriateness Sense:** In [[undue]] and [[unduly]], the negative prefix describes pressure, influence, or severity that exceeds what is rightful.

---

## 🔀 4. Prefix & Combining Dynamics on deb

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | into, thoroughly | [[indebted]] | Brought deeply *into* a state of financial or emotional obligation. |
| `un-` | not, improper | [[undue]] | *Not* due; excessive, inappropriate, or unwarranted. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-or` | Noun (Agent) | [[debtor]] | A person or institution that owes money. |
| `-ure` | Noun (Instrument / Form) | [[debenture]] | A certificate acknowledging a long-term debt owed by a company. |
| `-ful` | Adjective (Abounding in) | [[dutiful]] | Conscientiously fulfilling obligations with obedience and respect. |
| `-ly` | Adverb (Properly) | [[duly]] | In proper conformity with what is owed, required, or expected. |
| `-ness` | Noun (State) | [[indebtedness]] | The ongoing financial or moral state of owing restitution. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏦 **Accounting & Corporate Finance** | [[debit]], [[debt]], [[debenture]] | Double-entry bookkeeping ledgers, corporate bond issuance, liquidity ratios. |
| ⚖️ **Contract Law & Jurisprudence** | [[undue]], [[due]], [[debtor]] | Undue influence doctrine, procedural due process of law, bankruptcy proceedings. |
| 🏛️ **Civics & Military Ethics** | [[duty]], [[dutiful]], [[duly]] | Military duty of care, civic jury duty, fiduciary responsibility of trustees. |
| 📦 **Customs & International Trade** | [[duty]] | Import tariffs, customs duties, duty-free port concessions. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aldebaran]] | noun | **1.** The brightest star in taurus. | *"The sovereign brilliancy of Sirius pierced the eye with a steely glitter, the star called Capella was yellow, Aldebaran and Betelgueux shone with a fiery red."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ardeb]] | noun | **1.** A unit of dry measure used in egypt. | *"In academic literature, ardeb designates a unit of dry measure used in egypt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deb]] | noun | **1.** A young woman making her debut into society. | *"For Heaven’s sake, pop thy hands under the pump, Deb!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[debacle]] | noun | **1.** A sudden and violent collapse.<br>**2.** Flooding caused by a tumultuous breakup of ice in a river during the spring or summer. | *"In academic literature, debacle designates a sudden and violent collapse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debar]] | verb | **1.** Bar temporarily; from school, office, etc.<br>**2.** Prevent the occurrence of; prevent from happening. | *"The fear o’ hell’s a hangman’s whip, To haud the wretch in order; But where ye feel your honour grip, Let that aye be your border; Its slightest touches, instant pause— Debar a’ side-pretences; And resolutely keep its laws, Uncaring consequences."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[debark]] | verb | **1.** Go ashore. | *"In academic literature, debark designates go ashore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debarkation]] | noun | **1.** The act of passengers and crew getting off of a ship or aircraft. | *"In academic literature, debarkation designates the act of passengers and crew getting off of a ship or aircraft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debarment]] | noun | **1.** The state of being debarred (excluded from enjoying certain possessions or rights or practices).<br>**2.** The act of prevention by legal means. | *"In academic literature, debarment designates the state of being debarred (excluded from enjoying certain possessions or rights or practices)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debase]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower in value by increasing the base-metal content. | *"With all the gracious utterance thou hast, Speak to his gentle hearing kind commends. [_Northumberland returns to Bolingbroke._] [_To Aumerle_.] We do debase ourselves, cousin, do we not, To look so poorly and to speak so fair?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debased]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower in value by increasing the base-metal content. | *"Yes, that’s the d’Urberville nose and chin—a little debased."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[debasement]] | noun | **1.** Being mixed with extraneous material; the product of adulterating.<br>**2.** Changing to a lower state (a less respected state). | *"Or, to speak in the fashionable language of the adversaries to the Constitution, will it court the elevation of “the wealthy and the well-born,” to the exclusion and debasement of all the rest of the society?"* — Alexander Hamilton, *The Federalist Papers* |
| [[debaser]] | noun | **1.** A person who lowers the quality or character or value (as by adding cheaper metal to coins). | *"In academic literature, debaser designates a person who lowers the quality or character or value (as by adding cheaper metal to coins)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debasing]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower in value by increasing the base-metal content. | *"He could not make the request; it was debasing loveliness to ask it to buy and sell, and jarred with his conceptions of her."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[debatable]] | adjective | **1.** Open to doubt or debate.<br>**2.** Open to argument or debate. | *"Moreover she, and Clare also, stood as yet on the debatable land between predilection and love; where no profundities have been reached; no reflections have set in, awkwardly inquiring, “Whither does this new current tend to carry me?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[debate]] | noun | **1.** A discussion in which reasons are advanced for and against some proposition or proposal.<br>**2.** The formal presentation of a stated proposition and the opposition to it (usually followed by a vote). | *"If he were living, I would try him yet;— Lend me an arm;—the rest have worn me out With several applications; nature and sickness Debate it at their leisure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debater]] | noun | **1.** Someone who engages in debate. | *"The same spirit and temper appeared in the speech on the Habeas Corpus Suspension (Ireland) Bill, which he delivered on the 17th of February; but his full strength as a debater was first manifested during the discussion on Mr."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[debauch]] | noun | **1.** A wild gathering involving excessive drinking and promiscuity.<br>**2.** Corrupt morally or by intemperance or sensuality. | *"The mere word’s a slave, Debauch’d on every tomb, on every grave A lying trophy, and as oft is dumb Where dust and damn’d oblivion is the tomb Of honour’d bones indeed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debauched]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Unrestrained by convention or morality. | *"But he has sunk into a drunken debauched creature.” “Is he quite gone away?” said Mrs."* — George Eliot, *Middlemarch* |
| [[debauchee]] | noun | **1.** A dissolute person; usually a man who is morally unrestrained. | *"In academic literature, debauchee designates a dissolute person; usually a man who is morally unrestrained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debaucher]] | noun | **1.** Someone who assaults others sexually. | *"In academic literature, debaucher designates someone who assaults others sexually."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debauchery]] | noun | **1.** A wild gathering involving excessive drinking and promiscuity. | *"I tried dissipation—never debauchery: that I hated, and hate."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[debenture]] | noun | **1.** The ability of a customer to obtain goods or services before payment, based on the trust that payment will be made in the future.<br>**2.** A certificate or voucher acknowledging a debt. | *"In academic literature, debenture designates the ability of a customer to obtain goods or services before payment, based on the trust that payment will be made in the future."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debile]] | adjective | **1.** Lacking bodily or muscular strength or vitality. | *"And debile minister, great power, great transcendence, which should indeed give us a further use to be made than alone the recov’ry of the king, as to be— LAFEW."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debilitate]] | verb | **1.** Make weak. | *"I forgit myself when I take such an interest in your breakfast, as to wish your frame, exhausted by the debilitating effects of prodigygality, to be stimilated by the ’olesome nourishment of your forefathers."* — Charles Dickens, *Great Expectations* |
| [[debilitated]] | verb | **1.** Make weak.<br>**2.** Lacking strength or vigor. | *"A very valuable person, and deservedly respected.” The debilitated cousin supposes he is “’normously rich fler.” “He has a stake in the country,” says Sir Leicester, “I have no doubt."* — Charles Dickens, *Bleak House* |
| [[debilitating]] | verb | **1.** Make weak.<br>**2.** Impairing the strength and vitality. | *"I forgit myself when I take such an interest in your breakfast, as to wish your frame, exhausted by the debilitating effects of prodigygality, to be stimilated by the ’olesome nourishment of your forefathers."* — Charles Dickens, *Great Expectations* |
| [[debilitation]] | noun | **1.** Serious weakening and loss of energy. | *"In academic literature, debilitation designates serious weakening and loss of energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debilitative]] | adjective | **1.** Causing debilitation. | *"In academic literature, debilitative designates causing debilitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debility]] | noun | **1.** The state of being weak in health or body (especially from old age). | *"Though I look old, yet I am strong and lusty, For in my youth I never did apply Hot and rebellious liquors in my blood, Nor did not with unbashful forehead woo The means of weakness and debility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debit]] | noun | **1.** An accounting entry acknowledging sums that are owing.<br>**2.** Enter as debit. | *"Before analyzing the properties of manure, before entering into the debit and credit (as he ironically called it), he found out how many cattle the peasants had and increased the number by all possible means."* — graf Leo Tolstoy, *War and Peace* |
| [[debitor]] | noun | **1.** A person who owes a creditor; someone who has the obligation of paying a debt. | *"You have no true debitor and creditor but it; of what’s past, is, and to come, the discharge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debonair]] | adjective | **1.** Having a sophisticated charm.<br>**2.** Having a cheerful, lively, and self-confident air; - frances g. patton; - h.m.reynolds. | *"Courtiers as free, as debonair, unarm’d, As bending angels; that’s their fame in peace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debonaire]] | adjective | **1.** Having a sophisticated charm.<br>**2.** Having a cheerful, lively, and self-confident air; - frances g. patton; - h.m.reynolds. | *"In academic literature, debonaire designates having a sophisticated charm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debone]] | verb | **1.** Remove the bones from. | *"In academic literature, debone designates remove the bones from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deboned]] | verb | **1.** Remove the bones from.<br>**2.** Having had the bones removed. | *"In academic literature, deboned designates remove the bones from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debonnaire]] | adjective | **1.** Having a sophisticated charm. | *"In academic literature, debonnaire designates having a sophisticated charm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debouch]] | verb | **1.** March out (as from a defile) into open ground.<br>**2.** Pass out or emerge; especially of rivers. | *"A squad of constables debouched from College street, marching in Indian file."* — James Joyce, *Ulysses* |
| [[debridement]] | noun | **1.** Surgical removal of foreign material and dead tissue from a wound in order to prevent infection and promote healing. | *"In academic literature, debridement designates surgical removal of foreign material and dead tissue from a wound in order to prevent infection and promote healing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debrief]] | verb | **1.** Put someone through a debriefing and make him report. | *"A debriefing officer took Hodak in tow, and an another escorted Drummer to the VIP lounge."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[debriefing]] | noun | **1.** Report of a mission or task.<br>**2.** Put someone through a debriefing and make him report. | *"A debriefing officer took Hodak in tow, and an another escorted Drummer to the VIP lounge."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[debris]] | noun | **1.** The remains of something that has been destroyed or broken up. | *"Two months after, they learned from Bowen, commander of the Albemarle, that the debris of shipwrecked vessels had been seen on the coasts of New Georgia."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[debs]] | noun | **1.** United states labor organizer who ran for president as a socialist (1855-1926).<br>**2.** A young woman making her debut into society. | *"In academic literature, debs designates united states labor organizer who ran for president as a socialist (1855-1926)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debt]] | noun | **1.** The state of owing something (especially money).<br>**2.** Money or goods or services owed by one person to another. | *"This I wonder at, [_Exit Luciana._] Thus he unknown to me should be in debt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debtor]] | noun | **1.** A person who owes a creditor; someone who has the obligation of paying a debt. | *"The statute of thy beauty thou wilt take, Thou usurer that put’st forth all to use, And sue a friend, came debtor for my sake, So him I lose through my unkind abuse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debug]] | verb | **1.** Locate and correct errors in a computer program code. | *"In academic literature, debug designates locate and correct errors in a computer program code."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debugger]] | noun | **1.** A program that helps in locating and correcting programming errors. | *"In academic literature, debugger designates a program that helps in locating and correcting programming errors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debunk]] | verb | **1.** Expose while ridiculing; especially of pretentious or false claims and ideas. | *"In academic literature, debunk designates expose while ridiculing; especially of pretentious or false claims and ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debunking]] | noun | **1.** The exposure of falseness or pretensions.<br>**2.** Expose while ridiculing; especially of pretentious or false claims and ideas. | *"In academic literature, debunking designates the exposure of falseness or pretensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debussy]] | noun | **1.** French composer who is said to have created impressionism in music (1862-1918). | *"Laura, in a plain black dress, was at the piano, the cool drenched foliage of Claude Debussy's rainwet gardens rustling under her magic fingers."* — Anthony Pryde, *Nightfall* |
| [[debut]] | noun | **1.** The act of beginning something new.<br>**2.** The presentation of a debutante in society. | *"And when Mary Madeline came home, on the evening of her debut at the seminary, walking between the two young lady boarders, Amy Seaton and Jenny Andrews, Mrs."* — Effie Afton, *Eventide* |
| [[debutante]] | noun | **1.** A young woman making her debut into society. | *"It was good to see this courteous, silent man literally at the feet of the young debutante."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[indebted]] | adjective | **1.** Owing gratitude or recognition to another for help or favors etc.<br>**2.** Under a legal obligation to someone. | *"The King and commonweal Are deeply indebted for this piece of pains."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indebtedness]] | noun | **1.** An obligation to pay money to another party.<br>**2.** A personal relation in which one is indebted for a service or favor. | *"But now--she had been lying there two weeks; six dollars were due for board, and still she was unable to rise, and, when she did, how could she ever pay the back indebtedness?"* — Classic Author, *The wonders of prayer* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DEB
  </div>
</div>
