---
status: unread
type: root_dashboard
---
# Dashboard — don
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">don-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to give”</span>
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

The root **don** means to give. It refers to offering a gift, handing something over, or granting permission. In English, this root forms words such as *donate*, *donation*, *donor*, and *pardon*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to give
> The root **don** means to give. It refers to offering a gift, handing something over, or granting permission. In English, this root forms words such as *donate*, *donation*, *donor*, and *pardon*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To give</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *donate* and *donation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **don** comes from a Latin word that means *"to give"*.
  - At its core, it describes the action of give.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **don** in an English word, think of **to give**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to give).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Donate**: To give to help a person or organization, especially a charity.
  - **Donation**: Something that is given to a charity, especially a sum of money.
  - **Donor**: A person who donates something, especially money to a charity.
  - **Pardon**: The action of forgiving or being forgiven for an error or offense.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">don</mark>, think of <mark class="hl-def">to give</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **don** produces words through classical and Romance affixes:
> - **Direct Base Formations (`don-` / `donat-`):**
>   - *dōnātiō* → *donation*.
>   - *dōnāre* (back-formation) → *donate*.
>   - *dōnātor* → *donor*, *donator*.
>   - Anglo-Norman legal recipient: *donee* (the recipient of a gift).
>   - *dōnātīvum* → *donative* (a gift or military bonus).
> - **Prefix Combinations:**
>   - *con-* + *dōnāre* → *condone* (to give up resentment, overlook an offense), *condonation*.
>   - *per-* + *dōnāre* (via Old French *pardoner*) → *pardon*, *pardonable*, *unpardonable*.

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
> Although the root fundamentally denotes **"a gift or giving"**, its semantic register branches across distinct applications:
> - **Philanthropic & Charitable Sense:** In [[donate]], [[donation]], and [[donor]], it denotes giving money, goods, or services to support a social cause.
> - **Biomedical & Organ Sense:** In [[donor]], it describes living or deceased individuals providing blood, bone marrow, or organs to save lives.
> - **Legal Property Sense:** In [[donee]] and [[donative]], it defines property transfers and powers of appointment under trust law.
> - **Moral Tolerance & Overlooking Sense:** In [[condone]], it describes the passive acceptance or tacit overlooking of unethical conduct.
> - **Judicial Clemency & Absolution Sense:** In [[pardon]], [[pardonable]], and [[unpardonable]], it denotes executive remission of legal punishment or interpersonal forgiveness.

---

## 🔀 4. Prefix & Combining Dynamics on don

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` | completely, together | [[condone]] | To give up *completely* one's moral claim against an offense; to overlook. |
| `per-` | thoroughly, completely | [[pardon]] | To grant forgiveness *thoroughly*; to remit legal penalty. |
| `un-` | not | [[unpardonable]] | *Not* capable of being excused, forgiven, or legally pardoned. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-or` | Noun (Agent / Giver) | [[donor]] | A person or organization that makes a gift or contribution. |
| `-ee` | Noun (Recipient) | [[donee]] | The legal beneficiary who receives a gift or trust appointment. |
| `-ation` | Noun (Act / Gift) | [[donation]] | The act of bestowing, or the physical sum or item given. |
| `-ate` | Verb (Action) | [[donate]] | To present as a gift, grant, or charitable contribution. |
| `-able` | Adjective (Forgivable) | [[pardonable]] | Capable of being excused, overlooked, or forgiven. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩸 **Transfusion & Transplant Medicine** | [[donor]], [[donation]] | Allogeneic organ matching, blood bank logistics, bone marrow registries. |
| 🏛️ **Constitutional Law & Executive Power** | [[pardon]], [[condone]] | Presidential pardons, gubernatorial commutations, sovereign clemency doctrines. |
| 💼 **Estate Planning & Trust Law** | [[donor]], [[donee]], [[donative]] | Inter vivos gifts, testamentary powers of appointment, unified gift tax credits. |
| 🎗️ **Nonprofit Management & Philanthropy** | [[donation]], [[donate]], [[donor]] | Capital campaigns, endowment fund cultivation, charitable tax deduction rules. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antedon]] | noun | **1.** A genus of echinoderms of the family antedonidae. | *"In academic literature, antedon designates a genus of echinoderms of the family antedonidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antedonidae]] | noun | **1.** Feather stars. | *"In academic literature, antedonidae designates feather stars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[codon]] | noun | **1.** A specific sequence of three adjacent nucleotides on a strand of dna or rna that specifies the genetic code information for synthesizing a particular amino acid. | *"In academic literature, codon designates a specific sequence of three adjacent nucleotides on a strand of dna or rna that specifies the genetic code information for synthesizing a particular amino acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[condonation]] | noun | **1.** A pardon by treating the offender as if the offense had not occurred. | *"In academic literature, condonation designates a pardon by treating the offender as if the offense had not occurred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[condone]] | verb | **1.** Excuse, overlook, or make allowances for; be lenient with. | *"No sanctity could condone for the devouring of widows' houses (Matt. 23:14)."* — T. R. Glover, *The Jesus of History* |
| [[cordon]] | noun | **1.** A series of sentinels or of military posts enclosing or guarding some place or thing.<br>**2.** Cord or ribbon worn as an insignia of honor or rank. | *"He turned his back and addressed the head man of the village while his six silken satellites made a cordon between us."* — Jack London, *The Jacket (The Star-Rover)* |
| [[don]] | noun | **1.** A spanish gentleman or nobleman.<br>**2.** Teacher at a university or college (especially at cambridge or oxford). | *"Thine, in all compliments of devoted and heartburning heat of duty, Don Adriano de Armado._ BEROWNE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dona]] | noun | **1.** A spanish courtesy title or form of address for a woman. | *"The Captive Ribband Tune—“Robaidh dona gorach.” Dear Myra, the captive ribband’s mine, ’Twas all my faithful love could gain; And would you ask me to resign The sole reward that crowns my pain?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[donar]] | noun | **1.** The teutonic god of thunder; counterpart of norse thor. | *"In academic literature, donar designates the teutonic god of thunder; counterpart of norse thor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donate]] | verb | **1.** Give to a charity or good cause. | *"DAMES DONATE DUBLIN’S CITS SPEEDPILLS VELOCITOUS AEROLITHS, BELIEF —It gives them a crick in their necks, Stephen said, and they are too tired to look up or down or to speak."* — James Joyce, *Ulysses* |
| [[donatello]] | noun | **1.** Florentine sculptor famous for his lifelike sculptures (1386-1466). | *"In academic literature, donatello designates florentine sculptor famous for his lifelike sculptures (1386-1466)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donation]] | noun | **1.** A voluntary gift (as of money or service or ideas) made to some worthwhile cause.<br>**2.** Act of giving in common with others for a common purpose especially to a charity. | *"Th’ accusation Which they have often made against the Senate, All cause unborn, could never be the native Of our so frank donation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[donatism]] | noun | **1.** A schismatic christian religion in northern africa from the 4th to the 7th century; held that only those who led a blameless life belonged in the church or could administer the sacraments. | *"In academic literature, donatism designates a schismatic christian religion in northern africa from the 4th to the 7th century; held that only those who led a blameless life belonged in the church or could administer the sacraments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donatist]] | noun | **1.** An adherent of donatism.<br>**2.** Of or relating to donatism. | *"In academic literature, donatist designates an adherent of donatism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donatus]] | noun | **1.** Roman grammarian whose textbook on latin grammar was used throughout the middle ages (fourth century). | *"In academic literature, donatus designates roman grammarian whose textbook on latin grammar was used throughout the middle ages (fourth century)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[done]] | verb | **1.** Engage in.<br>**2.** Carry out or perform an action. | *"O that record could with a backward look, Even of five hundred courses of the sun, Show me your image in some antique book, Since mind at first in character was done."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[donee]] | noun | **1.** The recipient of funds or other benefits. | *"In academic literature, donee designates the recipient of funds or other benefits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donetsk]] | noun | **1.** An industrial city in the donets basin. | *"In academic literature, donetsk designates an industrial city in the donets basin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donetske]] | noun | **1.** An industrial city in the donets basin. | *"In academic literature, donetske designates an industrial city in the donets basin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donizetti]] | noun | **1.** Italian composer of operas (1797-1848). | *"In academic literature, donizetti designates italian composer of operas (1797-1848)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donna]] | noun | **1.** An italian woman of rank. | *"Negli occhi porta la mia donna Amore; Per che si fa gentil ciò ch’ella mira: Ov’ella passa, ogni uom ver lei si gira, E cui saluta fa tremar lo core."* — George Eliot, *Middlemarch* |
| [[donne]] | noun | **1.** English clergyman and metaphysical poet celebrated as a preacher (1572-1631). | *"John Donne, the English poet, went farther, and said: "All divinity is love or wonder." When a man then begins to wonder about Jesus Christ in earnest, Jesus comes to be for him a new figure."* — T. R. Glover, *The Jesus of History* |
| [[donnean]] | adjective | **1.** Of or relating to or in the manner of john donne. | *"In academic literature, donnean designates of or relating to or in the manner of john donne."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donnian]] | adjective | **1.** Of or relating to or in the manner of john donne. | *"In academic literature, donnian designates of or relating to or in the manner of john donne."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donnish]] | adjective | **1.** Marked by a narrow focus on or display of learning especially its trivial aspects. | *"In academic literature, donnish designates marked by a narrow focus on or display of learning especially its trivial aspects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[donor]] | noun | **1.** Person who makes a gift of property.<br>**2.** (medicine) someone who gives blood or tissue or an organ to be used in another person (the host). | *"An unknown donor sends in 20 tons of coal."* — Classic Author, *The wonders of prayer* |
| [[donut]] | noun | **1.** A small ring-shaped friedcake. | *"In academic literature, donut designates a small ring-shaped friedcake."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indonesia]] | noun | **1.** A republic in southeastern asia on an archipelago including more than 13,000 islands; achieved independence from the netherlands in 1945; the principal oil producer in the far east and pacific regions. | *"In academic literature, indonesia designates a republic in southeastern asia on an archipelago including more than 13,000 islands; achieved independence from the netherlands in 1945; the principal oil producer in the far east and pacific regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indonesian]] | noun | **1.** A native or inhabitant of indonesia.<br>**2.** The dialect of malay used as the national language of the republic of indonesia or of malaysia. | *"Among the Indonesian peoples who thus personify the rice we may take the Kayans or Bahaus of Central Borneo as typical."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[overdone]] | verb | **1.** Do something to an excessive degree.<br>**2.** Represented as greater than is true or reasonable. | *"Now, this overdone, or come tardy off, though it make the unskilful laugh, cannot but make the judicious grieve; the censure of the which one must in your allowance o’erweigh a whole theatre of others."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pardon]] | noun | **1.** The act of excusing a mistake or offense.<br>**2.** A warrant granting release from punishment for an offense. | *"Be where you list, your charter is so strong, That you yourself may privilage your time To what you will, to you it doth belong, Yourself to pardon of self-doing crime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pardonable]] | adjective | **1.** Admitting of being pardoned. | *"He thought it a very degrading alliance; and Lady Russell, though with more tempered and pardonable pride, received it as a most unfortunate one."* — Jane Austen, *Persuasion* |
| [[pardoner]] | noun | **1.** A person who pardons or forgives or excuses a fault or offense.<br>**2.** A medieval cleric who raised money for the church by selling papal indulgences. | *"I shall obey him. [_Exit Messenger._] DUKE. [_Aside_.] This is his pardon, purchased by such sin For which the pardoner himself is in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underdone]] | adjective | **1.** Insufficiently cooked. | *"Without prejudice to the cold beef if it's underdone."* — Anthony Pryde, *Nightfall* |
| [[undone]] | verb | **1.** Cancel, annul, or reverse an action or its effect.<br>**2.** Deprive of certain characteristics. | *"I am undone: there is no living, none, If Bertram be away. ’Twere all one That I should love a bright particular star, And think to wed it, he is so above me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unpardonable]] | adjective | **1.** Not admitting of pardon. | *"O, ’tis a fault too too unpardonable."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · DON
  </div>
</div>
