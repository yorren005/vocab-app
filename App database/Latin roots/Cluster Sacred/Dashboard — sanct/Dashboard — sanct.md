---
status: unread
type: root_dashboard
---
# Dashboard — sanct
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sanct-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“holy or consecrated”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</span>
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

The root **sanct** means holy or consecrated. It describes being blessed, made holy, or held sacred. In English, this root forms words such as *sanctuary*, *sanction*, *sanctity*, and *sanctify*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: holy or consecrated
> The root **sanct** means holy or consecrated. It describes being blessed, made holy, or held sacred. In English, this root forms words such as *sanctuary*, *sanction*, *sanctity*, and *sanctify*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Holy or consecrated</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</mark>
> - **Everyday Connection**: Think of familiar words like *sanctuary* and *sanction*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sanct** comes from a Latin word that means *"holy or consecrated"*.
  - At its core, it describes holy or consecrated.

- **The Big Picture Idea**:
  - Picture standing quietly inside a peaceful sanctuary dedicated to solemn devotion.
  - Whenever you see **sanct** in an English word, think of **sacred things, holiness, and reverence**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of holy or consecrated.
  - **Mental & Social**: How people experience, organize, or communicate about holy or consecrated.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Sanctuary**: A place of refuge or safety.
  - **Sanction**: An everyday English word showing the root's idea of *holy or consecrated*.
  - **Sanctity**: The state or quality of being holy, sacred, or saintly.
  - **Sanctify**: To set apart as or declare holy.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sanct</mark>, think of <mark class="hl-def">sacred things, holiness, and reverence</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Participial Base:** *sanct-* (*sanctus, sancta, sanctum*) $	o$ *sanctity, sanctum, sanctum sanctorum*.

- **Factitive Formations:** *sanctificāre* (*sanctus* + *facere*) $	o$ *sanctify, sanctification, sanctifier*.

- **Judicial / Legal Base:** *sanctiō* (genitive *sanctiōnis*) $	o$ *sanction, sanctionable*.

- **Asylum / Locative Stem:** *sanctuārium* $	o$ *sanctuary*.

- **Phonological Softening in Old French:** *sanctus* $	o$ *saint, saintly, sainthood, saintliness*.

- **Hypocritical / Pejorative Compounds:** *sanctimōnia* ("feigned holiness") $	o$ *sanctimony, sanctimonious, sanctimoniously*.

- **Compound Inviolability:** *sacrō-sānctus* $	o$ *sacrosanct, sacrosanctity*.



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



### 1. Spiritual Holiness & Moral Purity

- *saint* (a person acknowledged as holy or virtuous and regarded in Christian tradition as being in heaven).

- *saintly* (of, like, or suitable for a saint; very holy or virtuous).

- *sainthood* (the status or condition of being a saint).

- *sanctity* (the state or quality of being holy, sacred, or saintly; ultimate inviolability).

- *sanctify* (to set apart as or declare holy; consecrate; free from sin).



### 2. Legal Authority, Approval & Penal Pressure

- *sanction (n)* (a threatened penalty for disobeying a law or rule; official permission or approval).

- *sanction (v)* (to give official permission or approval for; to impose a penalty on).

- *sanctionable* (deserving or liable to receive a punitive sanction).



### 3. Sacred Spaces & Protective Asylums

- *sanctuary* (a holy place; a church, temple, or holy precinct; a place of refuge or safety; a nature reserve).

- *sanctum* (a sacred place; a private retreat or study).

- *sanctum sanctorum* (the Holy of Holies in the Jerusalem Temple; the most confidential or sacred private room).

- *sacrosanct* (regarded as too important, respected, or sacred to be changed, criticized, or interfered with).



### 4. Hypocritical Piety

- *sanctimonious* (making a show of being morally superior to other people; hypocritically pious).

- *sanctimony* (the action or practice of acting morally superior to others; hypocritical religious devotion).



---



## 🔀 4. Prefix & Combining Dynamics on sanct



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Factitive `-fy`** | *sanctus* + *facere* | **sanctify** | Actively purifying and making holy | *"The priest prayed that divine grace would sanctify the bread and wine."* |

| **Locative `-ary`** | *sanctus* + *-ārium* | **sanctuary** | Consecrated space providing asylum | *"Escaped political dissidents sought sanctuary inside the foreign embassy."* |

| **Legal Action `-tion`** | *sancīre* + *-tiō* | **sanction** | Legal ratification OR punitive penalty | *"The UN Security Council voted to impose economic sanctions on the aggressor."* |

| **Pejorative `-ious`** | *sanctimōnia* + *-ous* | **sanctimonious** | Ostentatiously displaying feigned holiness | *"He delivered a sanctimonious lecture on honesty after being caught in a lie."* |

| **Compound `sacr-`** | *sacer* + *sanctus* | **sacrosanct** | Doubly holy; utterly immune to violation | *"Freedom of the press is regarded as sacrosanct in democratic societies."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **International Diplomacy & Trade Law:** *multilateral economic sanctions*, *smart sanctions against oligarchs*.

- ⛪ **Canon Law & Hagiography:** *canonization of saints*, *veneration of saintly relics*.

- 🌳 **Environmental Conservation:** *wildlife sanctuary*, *marine protected sanctuary*.

- ⚖️ **Constitutional Theory:** *the sanctity of human life*, *sacrosanct rights under constitutional charters*.

- 🎭 **Literature & Satire:** *sanctimonious hypocrites in Molière's Tartuffe*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[sacrosanct]] | adjective | **1.** Must be kept sacred. | *"In academic literature, sacrosanct designates must be kept sacred."* — Academic Lexicon, *Morphological & Etymological Survey* |
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
    <span>↑ [[Cluster Sacred]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SANCT
  </div>
</div>
