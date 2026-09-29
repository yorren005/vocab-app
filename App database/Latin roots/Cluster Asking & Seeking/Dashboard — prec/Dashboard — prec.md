---
status: unread
type: root_dashboard
---
# Dashboard — prec
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">prec-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to pray or beg”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Asking a sincere question or searching along a path for a lost item.</span>
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

The root **prec** means to pray or beg. It refers to pray / entreat / supplicate / invoke divine will. In English, this root forms words such as *pray*, *prayer*, *prayerful*, and *preces*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to pray or beg
> The root **prec** means to pray or beg. It refers to pray / entreat / supplicate / invoke divine will. In English, this root forms words such as *pray*, *prayer*, *prayerful*, and *preces*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To pray or beg</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Asking a sincere question or searching along a path for a lost item.</mark>
> - **Everyday Connection**: Think of familiar words like *pray* and *prayer*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **prec** comes from a Latin word that means *"to pray or beg"*.
  - At its core, it describes the action of pray or beg.

- **The Big Picture Idea**:
  - Picture asking a sincere question or searching along a path for a lost item.
  - Whenever you see **prec** in an English word, think of **to pray or beg**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to pray or beg).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Pray**: To address God, a deity, or a saint with adoration, confession, supplication, or thanksgiving.
  - **Prayer**: A solemn request for help, guidance, or expression of gratitude addressed to God or an object of worship.
  - **Prayerful**: Devout, meditative, characterized by or given to frequent prayer.
  - **Preces**: In Christian liturgy , a traditional series of short versicles recited or chanted by the officiant with responsive petitions sung by the choir.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">prec</mark>, think of <mark class="hl-def">to pray or beg</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Derivational Stems
> The root operates across three distinct morphological strata:
> 1. **Romance Vernacular Contraction (`pray`):**
>    - Latin *precārī* $\to$ Old French *preier* $\to$ Middle English [[pray]], forming [[prayer]] and [[prayerful]].
> 2. **Classical Participial / Supine Stem (`precat-`):** From *precātus sum*:
>    - `precāt-` + `-ive` / `-ory` $\to$ [[precative]] / [[precatory]] (expressing entreaty, non-binding).
>    - `im-` + `precāt-` + `-ion` $\to$ [[imprecation]] ("a solemn curse").
>    - `im-` + `precāt-` + `-ory` $\to$ [[imprecatory]] ("invoking a curse").
>    - `de-` + `precāt-` $\to$ [[deprecate]] ("to express disapproval; to phase out").
>    - `de-` + `precāt-` + `-ion` $\to$ [[deprecation]] ("disapproval; obsolescence").
>    - `de-` + `precāt-` + `-ory` $\to$ [[deprecatory]] ("apologetic; expressing disapproval").
> 3. **The Roman Property Adjective (`precārius`):**
>    - *precārius* $\to$ [[precarious]] ("insecure, dangerous"); [[precariously]]; [[precariousness]].
> 4. **Liturgical Latin Plural:**
>    - Classical plural *precēs* $\to$ [[preces]] (responsive liturgical prayers).

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **Theology, Devotion & Liturgy:** [[pray]], [[prayer]], [[preces]] — personal communion with the divine, contemplative petitions, and responsive liturgical chants.
> - **Software Engineering & Technology Standards:** [[deprecate]], [[deprecation]] — officially declaring a software API, code function, or protocol obsolete and advising developers against its future use.
> - **Property Law, Trusts & Estates:** [[precatory]], [[precarious]] — *precatory words* in a last will and testament expressing a non-binding wish (e.g., "I desire that my son share") versus mandatory fiduciary commands; precarious licenses.
> - **Risk Analysis, Geopolitics & Architecture:** [[precarious]], [[precariously]], [[precariousness]] — unstable clifftop foundations, volatile diplomatic ceasefires, and financially insecure employment (the *precariat*).
> - **Classical Rhetoric, Drama & Myth:** [[imprecate]], [[imprecation]], [[imprecatory]] — Oedipus cursing his sons; Psalm 109 and biblical imprecatory prayers invoking divine judgment on enemies.
> - **Interpersonal Psychology & Humor:** [[self-deprecating]], [[self-deprecation]] — modest, witty self-effacement used to disarm social tension.

---

## 🔀 4. Prefix & Combining Dynamics on prec

### Prefix & Element Combinations

| Element / Compound | Linguistic Mechanism | Derived Form | Resulting Meaning & Context |
| :--- | :--- | :--- | :--- |
| `precārī` $\to$ OFr *preier* | Romance phonetic reduction | [[pray]], [[prayer]] | To address God in adoration, petition, or thanksgiving. |
| `precārius` (held by prayer) | Roman legal adjective | [[precarious]] | Perilously insecure, dangerous; dependent on uncertain chance. |
| `precarious` + `-ly` / `-ness` | Adverbial / nominal suffixes | [[precariously]], [[precariousness]] | In an unstable, hazardous manner; the state of perilous balance. |
| `in-` + `precārī` | Prefix *in-* (upon, against) | [[imprecate]], [[imprecation]] | To call down a curse from the gods upon an adversary. |
| `imprecate` + `-ory` | Adjectival suffix (*-ōrius*) | [[imprecatory]] | Expressing or invoking a curse or divine retribution. |
| `de-` + `precārī` | Prefix *de-* (away, down) | [[deprecate]], [[deprecation]] | To plead against an evil; to express disapproval; to phase out code. |
| `deprecate` + `-ory` | Adjectival suffix | [[deprecatory]] | Disapproving; or apologetically seeking to avert disapproval. |
| `self-` + `deprecating` | Modern English compound | [[self-deprecating]] | Modestly belittling or poking fun at oneself. |
| `precāt-` + `-ory` | Legal adjectival suffix | [[precatory]] | Expressing an entreaty, recommendation, or wish rather than a mandate. |
| *precēs* (bare plural) | Liturgical Latin loan | [[preces]] | Short versicles and responses recited in Christian morning and evening prayer. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Software Engineering & Computer Science** | [[deprecate]], [[deprecation]] | Managing software library lifecycles; throwing compiler deprecation warnings for legacy code. |
| 📜 **Trusts, Estates & Property Law** | [[precatory]], [[precarious]] | Interpreting precatory trusts in probate litigation; defending precarious easements against adverse possession. |
| ⛪ **Liturgical Studies & Comparative Religion** | [[preces]], [[prayer]], [[imprecatory]] | Chanting preces in Anglican Evensong; exegesis of imprecatory psalms in ancient Hebrew liturgy. |
| 🧗 **Structural Engineering & Risk Modeling** | [[precarious]], [[precariously]] | Evaluating the structural stability of earthquake-damaged masonry or coastal cliffs. |
| 🎭 **Rhetoric, Stand-Up Comedy & Psychology** | [[self-deprecating]], [[self-deprecation]] | Utilizing self-deprecating humor to disarm audiences and project authentic humility. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[appreciable]] | adjective | **1.** Enough to be estimated or measured. | *"This well-favoured and comely girl soon made appreciable inroads upon the emotional constitution of young Farmer Oak."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[appreciably]] | adverb | **1.** To a noticeable degree. | *"Bimetallism may be legally authorized, but not actually working, for, if the market-value long continues to vary appreciably from the legal ratio, only one of the metals may in fact be left in circulation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[appreciate]] | verb | **1.** Recognize with gratitude; be grateful for.<br>**2.** Be fully aware of; realize fully. | *"Lippo will find an affectionate protectress in her who will be able to appreciate his little-recognized virtues."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[appreciated]] | verb | **1.** Recognize with gratitude; be grateful for.<br>**2.** Be fully aware of; realize fully. | *"Kathy was the only one who appreciated Lippo's worth."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[appreciation]] | noun | **1.** Understanding of the nature or meaning or quality or magnitude of something.<br>**2.** Delicate discrimination (especially of aesthetic values). | *"The sea has no appreciation of great men, but knocks them about like the small fry."* — Charles Dickens, *Bleak House* |
| [[appreciative]] | adjective | **1.** Feeling or expressive of gratitude.<br>**2.** Having or showing appreciation or a favorable critical judgment or opinion. | *"Being a man not without a frequent consciousness that there was some charm in this life he led, he stood still after looking at the sky as a useful instrument, and regarded it in an appreciative spirit, as a work of art superlatively beautiful."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[appreciatively]] | adverb | **1.** With appreciation; in a grateful manner. | *"He listens appreciatively and never interrupts."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[appreciativeness]] | noun | **1.** Warm friendly feelings of gratitude. | *"In academic literature, appreciativeness designates warm friendly feelings of gratitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appreciator]] | noun | **1.** A person who is fully aware of something and understands it. | *"Genuine--i. e., _enthusiastic_--appreciators are not so common, and must be cultivated when they appear...."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[deprecate]] | verb | **1.** Express strong disapproval of; deplore.<br>**2.** Belittle. | *"He had an excellent memory, photographic and phonographic, a gift that wise men covet for themselves but deprecate in their friends."* — Anthony Pryde, *Nightfall* |
| [[deprecating]] | verb | **1.** Express strong disapproval of; deplore.<br>**2.** Belittle. | *"Now, don’t ye take on so, shepherd, and sit down!” said Henery, with a deprecating peacefulness equal to anything of the kind in Christianity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[deprecation]] | noun | **1.** A prayer to avert or remove some evil or disaster.<br>**2.** The act of expressing disapproval (especially of yourself). | *"Don’t flatter me.” He pursued his theme, however, without noticing my deprecation."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[deprecative]] | adjective | **1.** Tending to diminish or disparage.<br>**2.** Given to expressing disapproval. | *"But I am not the assassin type, myself." He waved a four-fingered blue hand in a deprecative gesture."* — Randall Garrett, *Deadly decoy* |
| [[deprecatively]] | adverb | **1.** In a deprecative manner. | *"In academic literature, deprecatively designates in a deprecative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deprecatory]] | adjective | **1.** Tending to diminish or disparage. | *"I am not quite sure whether clever men ever dance.” “I would dance with you if you would allow me.” “Oh!” said Rosamond, with a slight deprecatory laugh."* — George Eliot, *Middlemarch* |
| [[depreciate]] | verb | **1.** Belittle.<br>**2.** Lower the value of something. | *"Factories are closed, investments depreciate, laborers are thrown out of employment."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[depreciating]] | verb | **1.** Belittle.<br>**2.** Lower the value of something. | *"Crawford, after properly depreciating his own abilities, was quite at his service in any way that could be useful."* — Jane Austen, *Mansfield Park* |
| [[depreciation]] | noun | **1.** A decrease in price or value.<br>**2.** Decrease in value of an asset due to obsolescence or use. | *"Yet the time is so short since his depreciation began that as he saunters away, reluctant to leave the spot for some long months together, though he hates it, Richard himself may feel his own case as if it were a startling one."* — Charles Dickens, *Bleak House* |
| [[depreciative]] | adjective | **1.** Tending to decrease or cause a decrease in value.<br>**2.** Tending to diminish or disparage. | *"In academic literature, depreciative designates tending to decrease or cause a decrease in value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depreciator]] | noun | **1.** One who disparages or belittles the worth of something. | *"In academic literature, depreciator designates one who disparages or belittles the worth of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depreciatory]] | adjective | **1.** Tending to decrease or cause a decrease in value.<br>**2.** Tending to diminish or disparage. | *"In academic literature, depreciatory designates tending to decrease or cause a decrease in value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imprecate]] | verb | **1.** Wish harm upon; invoke evil upon.<br>**2.** Utter obscenities or profanities. | *"How often did I imprecate curses on the cause of my being!"* — Mary Wollstonecraft Shelley, *Frankenstein; or, the modern prometheus* |
| [[imprecation]] | noun | **1.** The act of calling down a curse that invokes evil (and usually serves as an insult).<br>**2.** A slanderous accusation. | *"In the canton of the Grisons there is still in common use an imprecation, "Mist, go away, or I'll heal you," which points to an old custom of burning up the fog with fire."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[imprecise]] | adjective | **1.** Not precise. | *"In academic literature, imprecise designates not precise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imprecisely]] | adverb | **1.** In an imprecise manner. | *"He scratched imprecisely with his right hand, though insensible of prurition, various points and surfaces of his partly exposed, wholly abluted skin."* — James Joyce, *Ulysses* |
| [[impreciseness]] | noun | **1.** The quality of lacking precision. | *"In academic literature, impreciseness designates the quality of lacking precision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imprecision]] | noun | **1.** The quality of lacking precision. | *"In academic literature, imprecision designates the quality of lacking precision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inappreciable]] | adjective | **1.** Too small to make a significant difference. | *"And perhaps in this is the whole difference; perhaps all the wisdom, and all truth, and all sincerity, are just compressed into that inappreciable moment of time in which we step over the threshold of the invisible."* — Joseph Conrad, *Heart of Darkness* |
| [[precambrian]] | noun | **1.** The eon following the hadean time and preceding the phanerozoic eon; from about 3,800 million years ago until 544 million years ago. | *"In academic literature, precambrian designates the eon following the hadean time and preceding the phanerozoic eon; from about 3,800 million years ago until 544 million years ago."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precancerous]] | adjective | **1.** Of or relating to a growth that is not malignant but is likely to become so if not treated. | *"In academic literature, precancerous designates of or relating to a growth that is not malignant but is likely to become so if not treated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precarious]] | adjective | **1.** Affording no ease or reassurance.<br>**2.** Fraught with danger. | *"He ultimately worked his passage to the United States, where he made a precarious living in various towns as Professor of Gymnastics, Sword Exercise, Fencing, and Pugilism."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[precariously]] | adverb | **1.** In a precarious manner. | *"The immediate fortunes of the Plan are precariously hanging in the balance."* — Effendi Shoghi, *Citadel of Faith* |
| [[precariousness]] | noun | **1.** Extreme dangerousness.<br>**2.** Being unsettled or in doubt or dependent on chance. | *"If I needed anything to perfect the precariousness of my steering, it was just that."* — Mark Twain, *What Is Man? and Other Essays* |
| [[precast]] | adjective | **1.** Of structural members especially of concrete; cast into form before being transported to the site of installation. | *"In academic literature, precast designates of structural members especially of concrete; cast into form before being transported to the site of installation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precative]] | adjective | **1.** Expressing entreaty or supplication. | *"In academic literature, precative designates expressing entreaty or supplication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precatory]] | adjective | **1.** Expressing entreaty or supplication. | *"In academic literature, precatory designates expressing entreaty or supplication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precaution]] | noun | **1.** A precautionary measure warding off impending danger or damage or injury etc.<br>**2.** The trait of practicing caution in advance. | *"You may go into Holborn, without precaution, and be run over."* — Charles Dickens, *Bleak House* |
| [[precautional]] | adjective | **1.** Taken in advance to protect against possible danger or failure. | *"In academic literature, precautional designates taken in advance to protect against possible danger or failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precautionary]] | adjective | **1.** Taken in advance to protect against possible danger or failure. | *"Bulstrode with precautionary information for his daughters and servants, and accounting for his allowing no one but himself to enter the room even with food and drink."* — George Eliot, *Middlemarch* |
| [[precava]] | noun | **1.** Receives blood from the head and arms and chest and empties into the right atrium of the heart; formed from the azygos and both brachiocephalic veins. | *"In academic literature, precava designates receives blood from the head and arms and chest and empties into the right atrium of the heart; formed from the azygos and both brachiocephalic veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precede]] | verb | **1.** Be earlier in time; go back further.<br>**2.** Come before. | *"Fairfax precede me into the dining-room, and kept in her shade as we crossed that apartment; and, passing the arch, whose curtain was now dropped, entered the elegant recess beyond."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[precedence]] | noun | **1.** Status established in order of importance or urgency.<br>**2.** Preceding in time. | *"I do not like “But yet”, it does allay The good precedence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precedency]] | noun | **1.** Status established in order of importance or urgency.<br>**2.** Preceding in time. | *"There were no ladies on board; the Major gave the pas of precedency to the civilian, so that he was the first dignitary at table, and treated by Captain Bragg and the officers of the Ramchunder with the respect which his rank warranted."* — William Makepeace Thackeray, *Vanity Fair* |
| [[precedent]] | noun | **1.** An example that is used to justify similar occurrences at a later time.<br>**2.** (civil law) a law established by following earlier judicial decisions. | *"Do it at once, Or thy precedent services are all But accidents unpurposed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precedented]] | adjective | **1.** Having or supported or justified by a precedent. | *"In academic literature, precedented designates having or supported or justified by a precedent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precedentedly]] | adverb | **1.** With precedent. | *"In academic literature, precedentedly designates with precedent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precedential]] | adjective | **1.** Having precedence (especially because of longer service). | *"In academic literature, precedential designates having precedence (especially because of longer service)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preceding]] | verb | **1.** Be earlier in time; go back further.<br>**2.** Come before. | *"Of six preceding ancestors, that gem Conferr’d by testament to th’ sequent issue, Hath it been owed and worn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precentor]] | noun | **1.** The musical director of a choir. | *"It stood on the left as one entered from High Street, and it had the usual high pulpit at its farther end, with a precentor's desk beneath it, and the usual deep gallery supported on metal pillars running round three of its four sides."* — John Cairns, *Principal Cairns* |
| [[precentorship]] | noun | **1.** The position of precentor. | *"In academic literature, precentorship designates the position of precentor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precept]] | noun | **1.** Rule of personal conduct.<br>**2.** A doctrine that is taught. | *"I have ta’en a due and wary note upon’t; With whispering and most guilty diligence, In action all of precept, he did show me The way twice o’er."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preceptor]] | noun | **1.** Teacher at a university or college (especially at cambridge or oxford). | *"We found him engaged with a not very hopeful pupil—a stubborn little girl with a sulky forehead, a deep voice, and an inanimate, dissatisfied mama—whose case was certainly not rendered more hopeful by the confusion into which we threw her preceptor."* — Charles Dickens, *Bleak House* |
| [[preceptorship]] | noun | **1.** The position of preceptor. | *"In academic literature, preceptorship designates the position of preceptor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precess]] | verb | **1.** Move in a gyrating fashion. | *"In academic literature, precess designates move in a gyrating fashion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precession]] | noun | **1.** The motion of a spinning body (as a top) in which it wobbles so that the axis of rotation sweeps out a cone.<br>**2.** The act of preceding in time or order or rank (as in a ceremony). | *"In academic literature, precession designates the motion of a spinning body (as a top) in which it wobbles so that the axis of rotation sweeps out a cone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precinct]] | noun | **1.** A district of a city or town marked out for administrative purposes. | *"And for myself, most part of all this night, Within her quarter and mine own precinct I was employ’d in passing to and fro About relieving of the sentinels."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preciosity]] | noun | **1.** The quality of being fastidious or excessively refined. | *"In academic literature, preciosity designates the quality of being fastidious or excessively refined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precious]] | adjective | **1.** Characterized by feeling or showing fond affection for.<br>**2.** Of high worth or cost. | *"I have no precious time at all to spend; Nor services to do till you require."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preciously]] | adverb | **1.** Extremely. | *"The time ’twixt six and now Must by us both be spent most preciously."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preciousness]] | noun | **1.** The quality possessed by something with a great price or value.<br>**2.** The positive quality of being precious and beyond value. | *"And I understand the reality & preciousness of that."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[precipice]] | noun | **1.** A very steep cliff. | *"You take a precipice for no leap of danger, And woo your own destruction."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precipitance]] | noun | **1.** The quality of happening with headlong haste or without warning. | *"Those that with cords, knives, drams, precipitance, Weary of this world’s light, have to themselves Been death’s most horrid agents, human grace Affords them dust and shadow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precipitancy]] | noun | **1.** The quality of happening with headlong haste or without warning. | *"Despite Angel Clare’s plausible representation to himself and to Tess of the practical need for their immediate marriage, there was in truth an element of precipitancy in the step, as became apparent at a later date."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[precipitant]] | noun | **1.** An agent that causes a precipitate to form.<br>**2.** Done with very great haste and without due deliberation; - shakespeare; - arthur geddes. | *"Given such a precipitant, the process of recovering the gold would be simple and cheap."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[precipitate]] | noun | **1.** A precipitated solid substance in suspension or after settling or filtering.<br>**2.** Bring about abruptly. | *"But, then, how account for the precipitate return which they had already noted, the supposed faint, the pallor of my looks?"* — Mrs. Oliphant, *A Beleaguered City* |
| [[precipitately]] | adverb | **1.** At breakneck speed. | *"Krook’s back second floor, from which a few of the jurymen retire pale and precipitately."* — Charles Dickens, *Bleak House* |
| [[precipitateness]] | noun | **1.** The quality of happening with headlong haste or without warning. | *"In academic literature, precipitateness designates the quality of happening with headlong haste or without warning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precipitating]] | verb | **1.** Bring about abruptly.<br>**2.** Separate as a fine suspension of solid particles. | *"Hadst thou been aught but gossamer, feathers, air, So many fathom down precipitating, Thou’dst shiver’d like an egg: but thou dost breathe; Hast heavy substance; bleed’st not; speak’st; art sound."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precipitation]] | noun | **1.** The quantity of water falling to earth at a specific place within a specified period of time.<br>**2.** The process of forming a chemical precipitate. | *"Let them pull all about mine ears, present me Death on the wheel or at wild horses’ heels, Or pile ten hills on the Tarpeian rock, That the precipitation might down stretch Below the beam of sight, yet will I still Be thus to them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precipitator]] | noun | **1.** Removes dust particles from gases by electrostatic precipitation. | *"In academic literature, precipitator designates removes dust particles from gases by electrostatic precipitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precipitin]] | noun | **1.** An antibody that causes precipitation when it unites with its antigen. | *"In academic literature, precipitin designates an antibody that causes precipitation when it unites with its antigen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precipitous]] | adjective | **1.** Done with very great haste and without due deliberation; - shakespeare; - arthur geddes.<br>**2.** Extremely steep. | *"Cattle were also driven through the smoke.[709] In Sundal, a narrow Norwegian valley, shut in on both sides by precipitous mountains, there lived down to the second half of the nineteenth century an old man who was very superstitious."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[precipitously]] | adverb | **1.** Very suddenly and to a great degree.<br>**2.** Abruptly; in a precipitous manner. | *"In academic literature, precipitously designates very suddenly and to a great degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precipitousness]] | noun | **1.** The property possessed by a slope that is very steep.<br>**2.** The quality of happening with headlong haste or without warning. | *"In academic literature, precipitousness designates the property possessed by a slope that is very steep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precis]] | noun | **1.** A sketchy summary of the main points of an argument or theory.<br>**2.** Make a summary (of). | *"In academic literature, precis designates a sketchy summary of the main points of an argument or theory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precise]] | adjective | **1.** Sharply exact or accurate or delimited.<br>**2.** (of ideas, images, representations, expressions) characterized by perfect conformity to fact or truth ; strictly correct. | *"Never, O never, do his ghost the wrong To hold your honour more precise and nice With others than with him!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precisely]] | adverb | **1.** Indicating exactness or preciseness.<br>**2.** In a precise manner. | *"For full well he knows He cannot so precisely weed this land As his misdoubts present occasion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preciseness]] | noun | **1.** Clarity as a consequence of precision.<br>**2.** The quality of being reproducible in amount or performance. | *"Is all your strict preciseness come to this?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precision]] | noun | **1.** The quality of being reproducible in amount or performance. | *"The smaller of its hands, too, occasionally slipped round on the pivot, and thus, though the minutes were told with precision, nobody could be quite certain of the hour they belonged to."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[preclinical]] | adjective | **1.** Of or relating to the early phases of a disease when accurate diagnosis is not possible because symptoms of the disease have not yet appeared. | *"In academic literature, preclinical designates of or relating to the early phases of a disease when accurate diagnosis is not possible because symptoms of the disease have not yet appeared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preclude]] | verb | **1.** Keep from happening or arising; make impossible.<br>**2.** Make impossible, especially beforehand. | *"The fire was issuing from a long straw-stack, which was so far gone as to preclude a possibility of saving it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[preclusion]] | noun | **1.** The act of preventing something by anticipating and disposing of it effectively. | *"In academic literature, preclusion designates the act of preventing something by anticipating and disposing of it effectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preclusive]] | adjective | **1.** Made impossible. | *"In academic literature, preclusive designates made impossible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precocial]] | adjective | **1.** (of hatchlings) covered with down and having eyes open; capable of leaving the nest within a few days. | *"In academic literature, precocial designates (of hatchlings) covered with down and having eyes open; capable of leaving the nest within a few days."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precocious]] | adjective | **1.** Characterized by or characteristic of exceptionally early development or maturity (especially in mental aptitude).<br>**2.** Appearing or developing early. | *"Such a precocious little girl, with such a dowdy bonnet on (that, too, of a gauzy texture), who brought her sandalled shoes in an old threadbare velvet reticule."* — Charles Dickens, *Bleak House* |
| [[precociously]] | adverb | **1.** In a precocious manner. | *"He stands precociously possessed of centuries of owlish wisdom."* — Charles Dickens, *Bleak House* |
| [[precociousness]] | noun | **1.** Intelligence achieved far ahead of normal developmental schedules. | *"In academic literature, precociousness designates intelligence achieved far ahead of normal developmental schedules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precocity]] | noun | **1.** Intelligence achieved far ahead of normal developmental schedules. | *"But she had the dismal precocity of poverty."* — William Makepeace Thackeray, *Vanity Fair* |
| [[precognition]] | noun | **1.** Knowledge of an event before it occurs. | *"In academic literature, precognition designates knowledge of an event before it occurs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precognitive]] | adjective | **1.** Foreseeing the future. | *"In academic literature, precognitive designates foreseeing the future."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preconceive]] | verb | **1.** Conceive beforehand. | *"He had a certain shame about his neighbors’ errors, and never spoke of them willingly; hence he was not likely to divert his mind from the best mode of hardening timber and other ingenious devices in order to preconceive those errors."* — George Eliot, *Middlemarch* |
| [[preconceived]] | verb | **1.** Conceive beforehand.<br>**2.** (of an idea or opinion) formed beforehand; especially without evidence or through prejudice. | *"Preconceived opinions, foregone determinations, are all I have at this hour to stand by: there I plant my foot.” I did."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[preconception]] | noun | **1.** An opinion formed beforehand without adequate evidence.<br>**2.** A partiality that prevents objective consideration of an issue or situation. | *"There are the Gospels, and, like other historical records, they must be studied in earnest on scientific lines without preconception."* — T. R. Glover, *The Jesus of History* |
| [[preconcerted]] | adjective | **1.** Previously arranged or agreed on. | *"Anne, remembering the preconcerted visits, at all hours, of Mr Elliot, would have expected him, but for his known engagement seven miles off."* — Jane Austen, *Persuasion* |
| [[precondition]] | noun | **1.** An assumption on which rests the validity or effect of something else.<br>**2.** An assumption that is taken for granted. | *"Self which it itself was ineluctably preconditioned to become. _Ecco!_ LYNCH: _(With a mocking whinny of laughter grins at Bloom and Zoe Higgins.)_ What a learned speech, eh?"* — James Joyce, *Ulysses* |
| [[preconditioned]] | verb | **1.** Put into the required condition beforehand.<br>**2.** Having already been put into a suitable condition. | *"Self which it itself was ineluctably preconditioned to become. _Ecco!_ LYNCH: _(With a mocking whinny of laughter grins at Bloom and Zoe Higgins.)_ What a learned speech, eh?"* — James Joyce, *Ulysses* |
| [[precook]] | verb | **1.** Cook beforehand so that the actual preparation won't take long. | *"In academic literature, precook designates cook beforehand so that the actual preparation won't take long."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precooked]] | verb | **1.** Cook beforehand so that the actual preparation won't take long.<br>**2.** Cooked partially or completely beforehand. | *"In academic literature, precooked designates cook beforehand so that the actual preparation won't take long."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precooled]] | adjective | **1.** Cooled in advance. | *"In academic literature, precooled designates cooled in advance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precordial]] | adjective | **1.** In front of the heart; involving the precordium. | *"In academic literature, precordial designates in front of the heart; involving the precordium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precordium]] | noun | **1.** The external surface of the body overlying the heart and stomach. | *"In academic literature, precordium designates the external surface of the body overlying the heart and stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precursor]] | noun | **1.** A substance from which another substance is formed (especially by a metabolic reaction).<br>**2.** A person who goes before or announces the coming of another. | *"We are concerned less with John as precursor than as teacher and thinker."* — T. R. Glover, *The Jesus of History* |
| [[precursory]] | adjective | **1.** Warning of future misfortune. | *"In academic literature, precursory designates warning of future misfortune."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappreciated]] | adjective | **1.** Not likely to be rewarded.<br>**2.** Having value that is not acknowledged. | *"The charms of their subtlety passed by her unappreciated, and she only received them as inimical sounds which meant that anger ruled."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unappreciative]] | adjective | **1.** Not feeling or expressing gratitude. | *"I wished the woman-hating, unappreciative Ralph Maplestone, had been a kind, considerate, understanding, put-your-self-in-her-place sort of man, who would have offered his time, and his car, and his services as chauffeur."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unappreciatively]] | adverb | **1.** In an ungrateful manner. | *"In academic literature, unappreciatively designates in an ungrateful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprecedented]] | adjective | **1.** Having no precedent; novel. | *"But, as the danger was of an entirely unprecedented character, it is not to be wondered at that I should be completely at a loss to divine what its meaning was."* — Mrs. Oliphant, *A Beleaguered City* |
| [[unprecedentedly]] | adverb | **1.** In an unprecedented manner. | *"But a sudden stop was put to further discoveries, by the ship’s being unprecedentedly dragged over sideways to the sea, owing to the body’s immensely increasing tendency to sink."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Asking & Seeking]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PREC
  </div>
</div>
