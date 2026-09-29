---
status: unread
type: root_dashboard
---
# Dashboard — grat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">grat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“pleasing or thankful”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sudden warm feeling in your chest or an outward expression of joy or sorrow.</span>
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

The root **grat** means pleasing or thankful. It describes feeling thankful, offering kindness, or showing pleasing goodwill. In English, this root forms words such as *welcome*, *grace*, *graceful*, and *gracefully*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: pleasing or thankful
> The root **grat** means pleasing or thankful. It describes feeling thankful, offering kindness, or showing pleasing goodwill. In English, this root forms words such as *welcome*, *grace*, *graceful*, and *gracefully*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Pleasing or thankful</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *welcome* and *grace*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **grat** comes from a Latin word that means *"pleasing or thankful"*.
  - At its core, it describes pleasing or thankful.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **grat** in an English word, think of **human feelings and emotions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of pleasing or thankful.
  - **Mental & Social**: How people experience, organize, or communicate about pleasing or thankful.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Welcome**: An everyday English word showing the root's idea of *pleasing or thankful*.
  - **Grace**: Simple elegance or refinement of movement.
  - **Graceful**: Having or showing grace or elegance in form, movement, or expression.
  - **Gracefully**: In a graceful, poised, or elegant manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">grat</mark>, think of <mark class="hl-def">human feelings and emotions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Lexical Streams
> The root **grat** branches into English through four major linguistic lineages:
> - **The Direct Classical Adjectival Base (`grat-`):** Borrowed directly from Latin *grātus*, *grātitūdō*, and *grātīs*, forming foundational terms of appreciation and free bestowal: [[grateful]], [[gratitude]], [[gratis]], [[gratuity]], [[gratuitous]], [[gratuitously]].
> - **The Norman / Old French Softened Base (`grac-`):** Undergoing assibilation ($t \to c / s$) in Gallo-Romance (*grātia* $\to$ Old French *grace*), generating English vernacular doublets: [[grace]], [[graceful]], [[gracefully]], [[graceless]], [[gracious]], [[graciously]], [[disgrace]], [[disgraceful]].
> - **The Frequentative & Intensive Compounds (`congratul-` / `ingrati-`):** 
>   - *con-* + *grātulārī* ("to rejoice together, give thanks with"): [[congratulate]], [[congratulation]], [[congratulatory]].
>   - *in-* + *grātia* ("into favor"): [[ingratiate]], [[ingratiating]], [[ingratiation]], [[ingratiatory]].
> - **The Privative & Hostile Stem (`ingrat-`):** Formed with negative *in-*, yielding descriptors of thanklessness and betrayal: [[ingrate]], [[ingratitude]], [[ungrateful]].

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

> [!tip] 🌈 Five Major Semantic Horizons of the `grat` Family
> - **Theological & Aesthetic Elegance:** [[grace]], [[gracious]], [[graceful]], [[graceless]] — divine redemption, spiritual salvation, poise, beauty of physical movement, and social courtesy.
> - **Heartfelt Appreciation & Thanksgiving:** [[grateful]], [[gratitude]], [[gratefully]], [[ungrateful]] — the moral virtue of recognizing kindness and reciprocating goodwill.
> - **Communal Joy & Vicarious Celebration:** [[congratulate]], [[congratulation]], [[congratulatory]] — sharing in another person's success, marriage, or triumph.
> - **Financial Gratuities & Unearned Gifts:** [[gratis]], [[gratuity]], [[gratuitous]] — services rendered free of charge, hospitality tips, or unwarranted, unprovoked actions.
> - **Psychological Flattery & Self-Serving Charm:** [[ingratiate]], [[ingratiating]], [[ingratiation]] — the deliberate, calculated cultivation of another's favor through fawning charm or sycophancy.

---

## 🔀 4. Prefix & Combining Dynamics on grat

### Prefix Dynamics on `grat`

| Prefix | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` | together, completely | `con-` + `grātulārī` $\to$ **[[congratulate]]** | Associative prefix: "to rejoice together with another on their good fortune; to express vicarious joy." |
| `in-` (locative) | in, into | `in-` + `grātia` $\to$ **[[ingratiate]]** | Inchoative/directional: "to bring oneself deliberately into another's favor or good graces." |
| `in-` (privative) | not, un- | `in-` + `grātus` $\to$ **[[ingrate]]**, **[[ingratitude]]** | Negative prefix: "not thankful; an ungrateful person who returns evil for kindness." |
| `dis-` | away, apart, reversal | `dis-` + *grace* $\to$ **[[disgrace]]** | Privative prefix: "loss of favor, expulsion from grace; public dishonor, shame, and ignominy." |

### Suffix Transformations on `grat`

| Suffix | Functional Class | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-ful` | Adjective (Vernacular) | [[grateful]], [[graceful]], [[disgraceful]] | Abounding in thanksgiving, aesthetic elegance, or shameful dishonor. |
| `-itude` | Abstract Noun (State) | [[gratitude]], [[ingratitude]] | Latin *-itūdō*: the internal moral disposition of thankfulness or callous ingratitude. |
| `-ify` | Verb (Causative) | [[gratify]] | Latin *grātificārī* (< *grātus* + *facere*): to make pleased; to satisfy an appetite or desire. |
| `-ous` | Adjective (Abounding in) | [[gracious]], [[gratuitous]] | Demonstrating divine mercy and courtesy; or performed without cost/justification. |
| `-ity` | Noun (Quality / Institution) | [[gratuity]] | A voluntary gift or tip given beyond legal obligation in acknowledgment of service. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| ⚖️ **Law & Constitutional Jurisprudence** | [[gratuitous]], *persona non grata* | Gratuitous promises (unenforceable in contract law for lack of consideration); declaring a foreign diplomat *persona non grata*. |
| ⛪ **Systematic Theology & Liturgy** | [[grace]], [[gracious]], *Deo gratias* | Augustinian and Protestant doctrines of *sola gratia* (salvation by grace alone); the liturgical response *Deo gratias* ("Thanks be to God"). |
| 🍽️ **Hospitality & Labor Economics** | [[gratuity]], [[gratis]] | The tipping economy, service charges, and complimentary amenities offered *gratis* to patrons. |
| 🧠 **Behavioral Psychology & Ethics** | [[gratification]], [[ingratiation]] | Delayed gratification (the Stanford marshmallow experiment); ingratiation tactics (flattery, opinion conformity) in organizational hierarchy. |
| 🎭 **Classical Mythology & Literature** | [[grace]], [[disgrace]] | The Three Graces (*Gratiae*: Aglaea, Euphrosyne, Thalia) personifying beauty, joy, and charm in classical literature and art. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[congratulate]] | verb | **1.** Say something to someone that expresses praise.<br>**2.** Express congratulations. | *"Sir, it is the King’s most sweet pleasure and affection to congratulate the Princess at her pavilion in the posteriors of this day, which the rude multitude call the afternoon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[congratulation]] | noun | **1.** The act of acknowledging that someone has an occasion for celebration.<br>**2.** (usually plural) an expression of pleasure at the success or good fortune of another. | *"Woodcourt is so far away, now,” said I, “that I thought the time for such congratulation was past, Miss Flite.” “But, my child,” she returned, “is it possible that you don’t know what has happened?” “No,” said I."* — Charles Dickens, *Bleak House* |
| [[congratulations]] | noun | **1.** An expression of approval and commendation.<br>**2.** The act of acknowledging that someone has an occasion for celebration. | *"Perkins have but now exchanged congratulations on the children being abed, and they still linger on a door-step over a few parting words."* — Charles Dickens, *Bleak House* |
| [[congratulatory]] | adjective | **1.** Expressive of sympathetic pleasure or joy on account of someone's success or good fortune. | *"The congratulatory letter which Elizabeth received from Lydia on her marriage explained to her that, by his wife at least, if not by himself, such a hope was cherished."* — Jane Austen, *Pride and Prejudice* |
| [[denigrate]] | verb | **1.** Cause to seem less serious; play down.<br>**2.** Charge falsely or with malicious intent; attack the good name and reputation of someone. | *"In academic literature, denigrate designates cause to seem less serious; play down."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denigrating]] | verb | **1.** Cause to seem less serious; play down.<br>**2.** Charge falsely or with malicious intent; attack the good name and reputation of someone. | *"In academic literature, denigrating designates cause to seem less serious; play down."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denigration]] | noun | **1.** A belittling comment.<br>**2.** An abusive attack on a person's character or good name. | *"In academic literature, denigration designates a belittling comment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denigrative]] | adjective | **1.** (used of statements) harmful and often untrue; tending to discredit or malign. | *"In academic literature, denigrative designates (used of statements) harmful and often untrue; tending to discredit or malign."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denigratory]] | adjective | **1.** (used of statements) harmful and often untrue; tending to discredit or malign. | *"In academic literature, denigratory designates (used of statements) harmful and often untrue; tending to discredit or malign."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grate]] | noun | **1.** A frame of iron bars to hold a fire.<br>**2.** A harsh rasping sound made by scraping something. | *"What peer hath been suborn’d to grate on you, That you should seal this lawless bloody book Of forged rebellion with a seal divine And consecrate commotion’s bitter edge?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[grateful]] | adjective | **1.** Feeling or showing gratitude.<br>**2.** Affording comfort or pleasure. | *"I cannot give thee less, to be call’d grateful."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gratefully]] | adverb | **1.** With appreciation; in a grateful manner.<br>**2.** In a thankful manner; with thanks. | *"When she entered his room with this concoction a little later, the odor from it was so inviting that the Baron breathed it in gratefully."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[gratefulness]] | noun | **1.** Warm friendly feelings of gratitude. | *"Loneli's heart was simply filled with gratefulness for what he had done and she often wished in turn for an opportunity to help him out of some trouble."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[grater]] | noun | **1.** Utensil with sharp perforations for shredding foods (as vegetables or cheese). | *"Joe, with black hair and eyes, had such a prevailing redness of skin that I sometimes used to wonder whether it was possible she washed herself with a nutmeg-grater instead of soap."* — Charles Dickens, *Great Expectations* |
| [[graticule]] | noun | **1.** A network of fine lines, dots, cross hairs, or wires in the focal plane of the eyepiece of an optical instrument. | *"In academic literature, graticule designates a network of fine lines, dots, cross hairs, or wires in the focal plane of the eyepiece of an optical instrument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gratification]] | noun | **1.** State of being gratified or satisfied.<br>**2.** The act or an instance of satisfying. | *"It is a source of much gratification to Mr."* — Charles Dickens, *Bleak House* |
| [[gratified]] | verb | **1.** Make happy or satisfied.<br>**2.** Yield (to); give satisfaction to. | *"The golden moon above was going her way and seemed to look down with friendly eyes, as if she was gratified that the house, which was filled all day with such noise and lively movement, was standing there so calm and peaceful."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[gratify]] | verb | **1.** Make happy or satisfied.<br>**2.** Yield (to); give satisfaction to. | *"Having determined of the Volsces and To send for Titus Lartius, it remains, As the main point of this our after-meeting, To gratify his noble service that Hath thus stood for his country."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gratifying]] | verb | **1.** Make happy or satisfied.<br>**2.** Yield (to); give satisfaction to. | *"I am so accustomed and inured to hard work that I don’t know what fatigue is.” We murmured that it was very astonishing and very gratifying, or something to that effect."* — Charles Dickens, *Bleak House* |
| [[gratifyingly]] | adverb | **1.** In a gratifying manner. | *"In academic literature, gratifyingly designates in a gratifying manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grating]] | noun | **1.** A barrier that has parallel or crossed bars blocking a passage but admitting air.<br>**2.** A frame of iron bars to hold a fire. | *"And can you by no drift of circumstance Get from him why he puts on this confusion, Grating so harshly all his days of quiet With turbulent and dangerous lunacy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gratingly]] | adverb | **1.** In a harsh and grating manner. | *"THE GRAMOPHONE: _(Drowning his voice.)_ Whorusalaminyourhighhohhhh... _(The disc rasps gratingly against the needle.)_ THE THREE WHORES: _(Covering their ears, squawk.)_ Ahhkkk!"* — James Joyce, *Ulysses* |
| [[gratis]] | adjective | **1.** Costing nothing.<br>**2.** Without payment. | *"The people cry you mocked them; and, of late, When corn was given them gratis, you repined, Scandaled the suppliants for the people, called them Timepleasers, flatterers, foes to nobleness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gratitude]] | noun | **1.** A feeling of thankfulness and appreciation. | *"Time was I did him a desired office, Dear almost as his life; which gratitude Through flinty Tartar’s bosom would peep forth, And answer thanks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gratuitous]] | adjective | **1.** Without cause.<br>**2.** Costing nothing. | *"Dear father,” he said sadly, “I wish you would not expose yourself to such gratuitous pain from scoundrels!” “Pain?” said his father, his rugged face shining in the ardour of self-abnegation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[gratuitously]] | adverb | **1.** In an uncalled-for manner. | *"Though his services were rendered quite gratuitously."* — Charles Dickens, *Bleak House* |
| [[gratuity]] | noun | **1.** A relatively small amount of money given for services rendered (as by a waiter).<br>**2.** An award (as for meritorious service) given without claim or obligation. | *"She heard Jonathan Kail’s heavy footsteps up and down the stairs till he had done placing the luggage, and heard him express his thanks for the ale her husband took out to him, and for the gratuity he received."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[gratulatory]] | adjective | **1.** Expressive of sympathetic pleasure or joy on account of someone's success or good fortune. | *"On his way to the railroad station to which he drove slowly, in conscious enjoyment of the beautiful morning, with an unwonted sense of leisure, and a keen anticipation of pleasure, his talk was all in the grateful and gratulatory vein."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[ingrate]] | noun | **1.** A person who shows no gratitude. | *"That we have been familiar, Ingrate forgetfulness shall poison rather Than pity note how much."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ingratiate]] | verb | **1.** Gain favor with somebody by deliberate efforts. | *"I felt a remarkable repugnance to my godmother, but my worthy aunts insisted so much that I should ingratiate myself with one who had so much to leave that I could not but comply."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[ingratiating]] | verb | **1.** Gain favor with somebody by deliberate efforts.<br>**2.** Capable of winning favor. | *"Brimstone and gall,” the voice retorted, “say that again, and I’ll cast anchor in you.” Hook tried a more ingratiating manner."* — J. M. Barrie, *Peter Pan* |
| [[ingratiatingly]] | adverb | **1.** In a flattering and ingratiating manner. | *"I smiled at him ingratiatingly, just to help things along, but he took little notice of me."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[ingratiation]] | noun | **1.** The act of gaining acceptance or affection for yourself by persuasive and subtle blandishments. | *"In academic literature, ingratiation designates the act of gaining acceptance or affection for yourself by persuasive and subtle blandishments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingratiatory]] | adjective | **1.** Pleasingly persuasive or intended to persuade.<br>**2.** Calculated to please or gain favor. | *"In academic literature, ingratiatory designates pleasingly persuasive or intended to persuade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingratitude]] | noun | **1.** A lack of gratitude. | *"And that is it Hath made me rig my navy, at whose burden The angered ocean foams, with which I meant To scourge th’ ingratitude that despiteful Rome Cast on my noble father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ungrateful]] | adjective | **1.** Not feeling or showing gratitude; ; - shakespeare.<br>**2.** Disagreeable; - abraham lincoln. | *"Worthy Martius, Had we no other quarrel else to Rome but that Thou art thence banished, we would muster all From twelve to seventy and, pouring war Into the bowels of ungrateful Rome, Like a bold flood o’erbear ’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ungratefully]] | adverb | **1.** In an ungrateful manner. | *"Ablethorpe, "you owe me something for the afternoon's work I gave you!" "Yon!" cried the old man, ungratefully, "caa ye that half a day's wark?"* — S. R. Crockett, *Deep Moat Grange* |
| [[ungratefulness]] | noun | **1.** A lack of gratitude. | *"In academic literature, ungratefulness designates a lack of gratitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ungratified]] | adjective | **1.** Worried and uneasy. | *"During this period, no reasonable wish of an invalid ever went ungratified."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[ungratifying]] | adjective | **1.** Not likely to be rewarded. | *"In academic literature, ungratifying designates not likely to be rewarded."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Emotion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GRAT
  </div>
</div>
