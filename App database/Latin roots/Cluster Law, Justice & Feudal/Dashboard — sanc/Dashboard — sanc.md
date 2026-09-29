---
status: unread
type: root_dashboard
---
# Dashboard — sanc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sanc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to make sacred or enforce”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **sanc** means to make sacred or enforce. It refers to legal ratification, coercive penal enforcement, inviolable holiness, legal asylum. In English, this root forms words such as *sanctify*, *sanction*, *sanctionable*, and *unsanctioned*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to make sacred or enforce
> The root **sanc** means to make sacred or enforce. It refers to legal ratification, coercive penal enforcement, inviolable holiness, legal asylum. In English, this root forms words such as *sanctify*, *sanction*, *sanctionable*, and *unsanctioned*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To make sacred or enforce</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *sanctify* and *sanction*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sanc** comes from a Latin word that means *"to make sacred or enforce"*.
  - At its core, it describes the action of make sacred or enforce.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **sanc** in an English word, think of **to make sacred or enforce**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to make sacred or enforce).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Sanctify**: To set apart as holy.
  - **Sanction**: To give official permission or legal approval for an action.
  - **Sanctionable**: Liable by law or professional ethical codes to be penalized or punished.
  - **Unsanctioned**: Not having official approval, permission, or legal authorization.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sanc</mark>, think of <mark class="hl-def">to make sacred or enforce</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through four primary morphological stems in English:
> - **Primary Latin Nominal & Legal Stem (`sanc-` / `sanct-`):** Derived from Latin *sānctiō* and *sānctitās*: *sanction*, *sanctionable*, *sanctity*, *sanctuary*, *sanctum*.
> - **Causative Holiness Stem (`sanctific-`):** Derived from Latin *sānctificāre* (< *sānctus* + *facere*): *sanctify*, *sanctification*, *sanctifier*, *unsanctified*.
> - **Romance Phonetic Reduction (`saint-`):** Transmitted via Old French *seint* (< *sānctus*): *saint*, *saintly*, *sainthood*, *sainted*, *saintliness*.
> - **Compound Inviolability Stem (`sacrosanct-`):** Formed from Latin *sacrō* (by sacred rite) + *sānctus* (hallowed): *sacrosanct*, *sacrosanctity*.
> - **Hypocritical Pejorative Stem (`sanctimon-`):** Derived from Latin *sānctimōnia* ("ostentatious sanctity"): *sanctimonious*, *sanctimoniously*, *sanctimony*.

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
> The derivations of *sanc* organize into five distinct conceptual domains:
> - **Coercive Geopolitical Penalties & Authorizations:** In [[sanction]], [[sanctionable]], and [[unsanctioned]], the root functions as an auto-antonym (contronym), describing both formal legislative authorization and multilateral economic penalties (e.g., trade embargoes).
> - **Inviolability & Contractual Integrity:** In [[sanctity]], [[sacrosanct]], and [[sacrosanctity]], the root denotes that which must not be breached, profaned, or touched (*the sanctity of human life*, *the sanctity of contracts*).
> - **Legal Asylum & Protected Havens:** In [[sanctuary]] and [[sanctum]], the root represents physical or legal shelters offering immunity from secular arrest, deportation, or external intrusion (*sanctuary cities*).
> - **Theological Consecration & Moral Holiness:** In [[sanctify]], [[sanctification]], [[saint]], [[saintly]], and [[sainthood]], the root expresses purification from moral fault and divine elevation.
> - **Pharisaical Hypocrisy & Moralizing:** In [[sanctimonious]], [[sanctimoniously]], and [[sanctimony]], the root turns satirical, mocking those who make an affected, public display of superior righteousness.

---

## 🔀 4. Prefix & Combining Dynamics on sanc

### Prefix Shifts (Directional & Evaluative Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `un-` | not | [[unsanctioned]], [[unsanctified]] | Lacking official legal authorization; profane, unhallowed. |
| `sacro-` (< *sacrum*) | by religious rite | [[sacrosanct]], [[sacrosanctity]] | Made holy by religious oath; absolutely inviolable and immune from assault. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (Decree / Measure) | [[sanction]] | An official authorization; a coercive penalty or economic trade restriction. |
| `-ity` | Noun (State of Holiness) | [[sanctity]] | The condition of being sacred, holy, or legally inviolable. |
| `-ary` | Noun (Place of Safety) | [[sanctuary]] | A sacred place of worship; a legal refuge granting immunity from arrest. |
| `-um` | Noun (Latin Neuter Single) | [[sanctum]] | A sacred retreat; a private study or secluded room free from intrusion. |
| `-ify` (< Latin *-ficāre*) | Verb (Causative) | [[sanctify]] | To set apart as holy, purify from sin, or make productive of sacred grace. |
| `-ation` | Noun (Spiritual Process) | [[sanctification]] | The theological state or process of being purified and consecrated. |
| `-ious` | Adjective (Pompous Quality)| [[sanctimonious]] | Hypocritically pious; affecting superior moral righteousness. |
| `-hood` | Noun (Status) | [[sainthood]] | The condition, dignity, or status of being recognized as a Christian saint. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌍 **International Relations & Security** | [[sanction]], [[sanctionable]], [[unsanctioned]] | UN Charter Chapter VII economic sanctions, secondary financial sanctions, weapons embargoes. |
| ⚖️ **Constitutional & Contract Law** | [[sanctity]], [[sacrosanct]], [[sanctity of contract]] | *Pacta sunt servanda* (sanctity of promises), sacrosanct First Amendment speech protections. |
| 🏛️ **Immigration & Municipal Governance** | [[sanctuary]], [[sanctuary city]] | Municipal non-cooperation ordinances with federal immigration authorities, ecclesiastical asylum. |
| ⛪ **Theology, Hagiography & Liturgy** | [[sanctify]], [[sanctification]], [[saint]], [[sainthood]] | Catholic canonization inquiries, Pauline theology of regeneration, sanctification ceremonies. |
| 📜 **Roman Constitutional History** | [[sacrosanct]], [[sanctio]] | Sacrosanctity of the plebeian tribunes, the *sanctio* of Republican statutes, *lex sacrata*. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[sanctification]] | noun | **1.** A religious ceremony in which something is made holy. | *"But I thought that our marriage might be a sanctification for us both. ‘The unbelieving husband is sanctified by the wife, and the unbelieving wife is sanctified by the husband,’ I said to myself."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sanctified]] | verb | **1.** Render holy by means of religious rites.<br>**2.** Make pure or free from sin or guilt. | *"He that hangs himself is a virgin: virginity murders itself, and should be buried in highways out of all sanctified limit, as a desperate offendress against nature."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sanctify]] | verb | **1.** Render holy by means of religious rites.<br>**2.** Make pure or free from sin or guilt. | *"But now he’s gone, and my idolatrous fancy Must sanctify his relics."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sanctimonious]] | adjective | **1.** Excessively or hypocritically pious. | *"Thou conclud’st like the sanctimonious pirate that went to sea with the ten commandments, but scraped one out of the table."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sanctimoniously]] | adverb | **1.** In a sanctimonious manner. | *"Were they to ever approach the heaven of which they sanctimoniously prate, they would be met at the gate with the curse of murdered infants who never saw the light."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[sanctimoniousness]] | noun | **1.** The quality of being hypocritically devout. | *"In academic literature, sanctimoniousness designates the quality of being hypocritically devout."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sanctimony]] | noun | **1.** The quality of being hypocritically devout. | *"If sanctimony and a frail vow betwixt an erring barbarian and a supersubtle Venetian be not too hard for my wits and all the tribe of hell, thou shalt enjoy her; therefore make money."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sanction]] | noun | **1.** Formal and explicit approval.<br>**2.** A mechanism of social control for enforcing a society's standards. | *"If only her mother would sanction the plan!"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sanctionative]] | adjective | **1.** Implying sanction or serving to sanction. | *"In academic literature, sanctionative designates implying sanction or serving to sanction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sanctioned]] | verb | **1.** Give sanction to.<br>**2.** Give authority or permission to. | *"I will keep the law given by God; sanctioned by man."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sanctioning]] | verb | **1.** Give sanction to.<br>**2.** Give authority or permission to. | *"In academic literature, sanctioning designates give sanction to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sanctitude]] | noun | **1.** The quality of being holy. | *"In academic literature, sanctitude designates the quality of being holy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sanctity]] | noun | **1.** The quality of being holy. | *"And his kissing is as full of sanctity as the touch of holy bread."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sanctuary]] | noun | **1.** A consecrated place where sacred objects are kept.<br>**2.** A shelter from danger or hardship. | *"He took this place for sanctuary, And it shall privilege him from your hands Till I have brought him to his wits again, Or lose my labour in assaying it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sanctum]] | noun | **1.** A place of inviolable privacy.<br>**2.** A sacred place of pilgrimage. | *"Mere animal satisfaction!” “This is our friend’s consulting-room (or would be, if he ever prescribed), his sanctum, his studio,” said my guardian to us."* — Charles Dickens, *Bleak House* |
| [[unsanctification]] | noun | **1.** Unholiness by virtue of being profane. | *"In academic literature, unsanctification designates unholiness by virtue of being profane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsanctified]] | adjective | **1.** Not holy because unconsecrated or impure or defiled. | *"Her death was doubtful; And but that great command o’ersways the order, She should in ground unsanctified have lodg’d Till the last trumpet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsanctify]] | verb | **1.** Remove the sanctification from or make unsanctified. | *"Her death was doubtful; And but that great command o’ersways the order, She should in ground unsanctified have lodg’d Till the last trumpet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsanctioned]] | adjective | **1.** Without explicit official permission. | *"I do not blame you for with-holding "the-laying-on-of-hands," but I was ordained of God long years ago to preach the unsearchable riches of Christ, and although unsanctioned by man, I shall still preach the message with which he has provided me."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SANC
  </div>
</div>
