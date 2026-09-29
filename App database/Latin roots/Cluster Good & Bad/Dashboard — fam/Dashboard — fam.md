---
status: unread
type: root_dashboard
---
# Dashboard — fam
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fam-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“report, rumour, or fame”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **fam** means report, rumour, or fame. It refers to public reputation, verbal defamation, physical starvation. In English, this root forms words such as *fame*, *famed*, *famous*, and *famously*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: report, rumour, or fame
> The root **fam** means report, rumour, or fame. It refers to public reputation, verbal defamation, physical starvation. In English, this root forms words such as *fame*, *famed*, *famous*, and *famously*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Report, rumour, or fame</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *fame* and *famed*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fam** comes from a Latin word that means *"report, rumour, or fame"*.
  - At its core, it describes report, rumour, or fame.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **fam** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of report, rumour, or fame.
  - **Mental & Social**: How people experience, organize, or communicate about report, rumour, or fame.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fame**: The state of being known or talked about by many people.
  - **Famed**: An everyday English word showing the root's idea of *report, rumour, or fame*.
  - **Famous**: Known, recognized, or talked about by many people.
  - **Famously**: In a famous manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fam</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `fam`
> English derivations split across the two Latin parents:
> 1. **The Reputation Family (`fām-` < *fāma*):**
>    - Base Positive Noun & Adjectives: **fame**, **famed**, **famous**, **famously**, **famousness**, **unfamed**.
>    - The Negated / Disgrace Branch (`in-` + *fāma*): **infamy**, **infamous**, **infamously**, **infamousness**.
>    - The Reversal / Injury Branch (`de-` / `dis-` + *fāma*): **defame**, **defamer**, **defaming**, **defamation**, **defamatory**.
> 2. **The Starvation Family (`fam-` < *famēs*):**
>    - Nouns: **famine**, **famishment**.
>    - Verbs & Participles: **famish**, **famished**, **famishing**.

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

```
                                  ┌── Renown & Celebrity ────── fame, famed, famous, famously, famousness
                                  │
    [FAM- / FĀMA] ────────────────┼── Legal Disgrace & Evil ─── infamy, infamous, infamously, infamousness
(reputation / public report)      │
                                  └── Slander, Libel & Torts ── defame, defamer, defaming, defamation, defamatory
    ══════════════════════════════╪══════════════════════════════════════════════════════════════════════════════
    [FAM- / FAMĒS] ───────────────┴── Biological Starvation ─── famine, famish, famished, famishing, famishment
(hunger / food scarcity)
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Celebrity, Public Honor & Renown:** *fame*, *famed*, *famous*, *famously*, *famousness*, *unfamed*.
> 2. **Notoriety, Criminal Disgrace & Historical Shame:** *infamy*, *infamous*, *infamously*, *infamousness*.
> 3. **Tort Law, Libel & Slander:** *defame*, *defamer*, *defaming*, *defamation*, *defamatory*.
> 4. **Agrarian Catastrophe & Extreme Hunger:** *famine*, *famish*, *famished*, *famishing*, *famishment*.

---

## 🔀 4. Prefix & Combining Dynamics on fam

### Prefix Dynamics

| Prefix | Classical Meaning | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `in-` | not, un- (privative) | **infamous**, **infamy** | Stripped of good name; holding a reputation of the most shocking notoriety. |
| `de-` / `dis-` | down from, away | **defame**, **defamation** | Pulling down another's public reputation through malicious or false speech. |
| `un-` | not (Germanic) | **unfamed** | Not known to fame; obscure, uncelebrated. |
| `ad-` | to, toward (in *famēs*) | **famish** (< *affamāre*) | Bringing someone toward the point of biological starvation. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Tort Law & First Amendment Jurisprudence:** The tort of *defamation* (divided into spoken *slander* and written *libel*) requires public figures to prove "actual malice" under *New York Times Co. v. Sullivan*.
> 2. **Constitutional & Legal History:** The Fifth Amendment to the U.S. Constitution requires grand jury indictments for capital or "otherwise *infamous* crimes" (felonies entailing civic disgrace).
> 3. **International History & Statecraft:** President Franklin D. Roosevelt immortalized December 7, 1941, as "a date which will live in *infamy*" following the attack on Pearl Harbor.
> 4. **Humanitarian Aid & Agrarian Economics:** The UN World Food Programme monitors acute food insecurity to avert widespread regional *famine*.
> 5. **Celebrity Culture & Media Studies:** The sociology of *fame* tracks how digital mass media transforms private personas into commercial brands.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[defamation]] | noun | **1.** A false accusation of an offense or a malicious misrepresentation of someone's words or actions.<br>**2.** An abusive attack on a person's character or good name. | *"The Holy Fair^1 A robe of seeming truth and trust Hid crafty Observation; And secret hung, with poison’d crust, The dirk of Defamation: [Footnote 1: “Holy Fair” is a common phrase in the west of Scotland for a sacramental occasion.—R."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[defamatory]] | adjective | **1.** (used of statements) harmful and often untrue; tending to discredit or malign. | *"The editor of the _Aurora_ having, in his paper of February 19, 1800, inserted some paragraphs defamatory of the Senate, and failed in his appearance, he was ordered to be committed."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[defame]] | verb | **1.** Charge falsely or with malicious intent; attack the good name and reputation of someone. | *"Feast-finding minstrels, tuning my defame, Will tie the hearers to attend each line, How Tarquin wronged me, I Collatine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defamer]] | noun | **1.** One who attacks the reputation of another by slander or libel. | *"Blaine marched down the halls of the American Congress, and threw his shining lance full and fair against the brazen foreheads of the defamers of his country and the maligners of his honor."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[fame]] | noun | **1.** The state or quality of being widely honored and acclaimed.<br>**2.** Favorable public reputation. | *"Let him but copy what in you is writ, Not making worse what nature made so clear, And such a counterpart shall fame his wit, Making his style admired every where."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famed]] | adjective | **1.** Widely known and esteemed. | *"As surely as my soul intends to live With that dread King that took our state upon Him To free us from His Father’s wrathful curse, I do believe that violent hands were laid Upon the life of this thrice-famed duke."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[familial]] | adjective | **1.** Relating to or having the characteristics of a family.<br>**2.** Occurring among members of a family usually by heredity. | *"In academic literature, familial designates relating to or having the characteristics of a family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[familiar]] | noun | **1.** A person attached to the household of a high official (as a pope or bishop) who renders service in return for support.<br>**2.** A friend who is frequently in the company of another. | *"He nor that affable familiar ghost Which nightly gulls him with intelligence, As victors of my silence cannot boast, I was not sick of any fear from thence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[familiarisation]] | noun | **1.** The experience of becoming familiar with something. | *"In academic literature, familiarisation designates the experience of becoming familiar with something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[familiarise]] | verb | **1.** Make familiar or conversant with. | *"However, seeing it motionless, by degrees they took courage, and sought to familiarise themselves with it."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[familiarised]] | verb | **1.** Make familiar or conversant with.<br>**2.** Having achieved a comfortable relation with your environment. | *"Afterwards, when familiarised with the visions of enjoyment so suddenly opened, she could speak more largely to William and Edmund of what she felt; but still there were emotions of tenderness that could not be clothed in words."* — Jane Austen, *Mansfield Park* |
| [[familiarising]] | verb | **1.** Make familiar or conversant with.<br>**2.** Serving to make familiar. | *"In academic literature, familiarising designates make familiar or conversant with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[familiarity]] | noun | **1.** Personal knowledge or information about someone or something.<br>**2.** Usualness by virtue of being familiar or well known. | *"And didst thou not, when she was gone downstairs, desire me to be no more so familiarity with such poor people, saying that ere long they should call me madam?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[familiarization]] | noun | **1.** The experience of becoming familiar with something. | *"In academic literature, familiarization designates the experience of becoming familiar with something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[familiarize]] | verb | **1.** Make familiar or conversant with. | *"In his shrinking from the humiliation of a dependent attitude towards Bulstrode, he began to familiarize his imagination with another step even more unlike his remembered self."* — George Eliot, *Middlemarch* |
| [[familiarized]] | verb | **1.** Make familiar or conversant with.<br>**2.** Having achieved a comfortable relation with your environment. | *"On the contrary, he would have despised any ostentation of expense; his profession had familiarized him with all grades of poverty, and he cared much for those who suffered hardships."* — George Eliot, *Middlemarch* |
| [[familiarizing]] | verb | **1.** Make familiar or conversant with.<br>**2.** Serving to make familiar. | *"In academic literature, familiarizing designates make familiar or conversant with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[familiarly]] | adverb | **1.** In an intimately familiar manner. | *"Because that I familiarly sometimes Do use you for my fool, and chat with you, Your sauciness will jest upon my love, And make a common of my serious hours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[family]] | noun | **1.** A social unit living together.<br>**2.** Primary social group; parents and children. | *"My gracious lord, here in the parliament Let us assail the family of York."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famine]] | noun | **1.** An acute insufficiency.<br>**2.** A severe shortage of food (as through crop failure) resulting in violent hunger and starvation and death. | *"E’en as the o’erflowing Nilus presageth famine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famish]] | verb | **1.** Be hungry; go without food.<br>**2.** Deprive of food. | *"You are all resolved rather to die than to famish?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famished]] | verb | **1.** Be hungry; go without food.<br>**2.** Deprive of food. | *"I’ll tell you what, you thin man in a censer, I will have you as soundly swinged for this, you bluebottle rogue, you filthy famished correctioner, if you be not swinged, I’ll forswear half-kirtles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famishment]] | noun | **1.** A state of extreme hunger resulting from lack of essential nutrients over a prolonged period. | *"In academic literature, famishment designates a state of extreme hunger resulting from lack of essential nutrients over a prolonged period."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[famotidine]] | noun | **1.** A histamine blocker (trade name pepcid) used to treat peptic ulcers and gastritis and esophageal reflux. | *"In academic literature, famotidine designates a histamine blocker (trade name pepcid) used to treat peptic ulcers and gastritis and esophageal reflux."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[famous]] | adjective | **1.** Widely known and esteemed. | *"He was famous, sir, in his profession, and it was his great right to be so: Gerard de Narbon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famously]] | adverb | **1.** In a manner or to an extent that is well known.<br>**2.** Extremely well. | *"I say unto you, what he hath done famously he did it to that end."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[famulus]] | noun | **1.** A close attendant (as to a scholar). | *"In academic literature, famulus designates a close attendant (as to a scholar)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infamous]] | adjective | **1.** Known widely and usually unfavorably. | *"O Antony, Nobler than my revolt is infamous, Forgive me in thine own particular, But let the world rank me in register A master-leaver and a fugitive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infamy]] | noun | **1.** A state of extreme dishonor; - f.d.roosevelt.<br>**2.** Evil fame or public reputation. | *"Well, the truth is, Sir John, you live in great infamy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overfamiliar]] | adjective | **1.** Taking undue liberties. | *"In academic literature, overfamiliar designates taking undue liberties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subfamily]] | noun | **1.** (biology) a taxonomic category below a family. | *"In academic literature, subfamily designates (biology) a taxonomic category below a family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superfamily]] | noun | **1.** (biology) a taxonomic group ranking below an order but above a family. | *"In academic literature, superfamily designates (biology) a taxonomic group ranking below an order but above a family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unfamiliar]] | adjective | **1.** Not known or well known. | *"To shuffle through the streets, unfamiliar with the shapes, and in utter darkness as to the meaning, of those mysterious symbols, so abundant over the shops, and at the corners of streets, and on the doors, and in the windows!"* — Charles Dickens, *Bleak House* |
| [[unfamiliarity]] | noun | **1.** Unusualness as a consequence of not being well known. | *"Jellyby’s lambs, being wholly unconnected with Borrioboola-Gha; he is not softened by distance and unfamiliarity; he is not a genuine foreign-grown savage; he is the ordinary home-made article."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FAM
  </div>
</div>
