---
status: unread
type: root_dashboard
---
# Dashboard — priv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">priv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“one's own or deprived”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **priv** means one's own or deprived. It refers to one's own personal sphere or being set apart from the public. In English, this root forms words such as *private*, *privilege*, *deprive*, and *privacy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: one's own or deprived
> The root **priv** means one's own or deprived. It refers to one's own personal sphere or being set apart from the public. In English, this root forms words such as *private*, *privilege*, *deprive*, and *privacy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">One's own or deprived</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *private* and *privilege*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **priv** comes from a Latin word that means *"one's own or deprived"*.
  - At its core, it describes one's own or deprived.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **priv** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of one's own or deprived.
  - **Mental & Social**: How people experience, organize, or communicate about one's own or deprived.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Private**: Belonging to or for the use of one particular person or group only.
  - **Privilege**: A special right, advantage, or immunity granted or available only to a particular person or group.
  - **Deprive**: To deny a person or place the possession or use of something.
  - **Privacy**: A state in which one is not observed or disturbed by other people.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">priv</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin prīvus (individual, separate, one's own)
  │
  ├── prīvātus (set apart, personal) ────────> private, privacy
  │
  ├── prīvō, prīvāre (to strip, bereave)
  │     ├── dē- + prīvāre ───────────────────> deprive
  │     └── prīvātiō (state of lack) ────────> privation
  │
  ├── prīvī- (Old French privé) ─────────────> privy
  │
  └── prīvus + lēx, lēgis (private law) ────> prīvilēgium ──> privilege
```

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

### Distinct Semantic Streams
1. **Confidentiality & Personal Autonomy**: *private*, *privacy*, *privy* (shielded from public observation, personal property, confidential access).
2. **Scarcity & Dispossession**: *deprive*, *privation* (loss of essentials, chronic poverty, spiritual or sensory starvation).
3. **Legal Prerogative & Social Advantage**: *privilege* (exclusive benefit, aristocratic exemption, constitutional immunity).

---

## 🔀 4. Prefix & Combining Dynamics on priv

### Affixes & Compounds
- **de- ("completely, away") + priv-**: Intensifies the act of stripping away possessions or rights (*deprive*).
- **-acy / -ate**: *privacy*, *private* (state of individual seclusion; characteristic of personal sphere).
- **-ation**: *privation* (substantive condition of severe material lack).
- **-lege** (< *lēx*, *lēgis* "law"): *privilege* (an enactment tailored for an individual).
- **-y**: *privy* (secret, intimate, sharing private knowledge).

---

## 🌐 5. Disciplinary & Real-World Domains

| Discipline | Real-World Application | Key Derived Words |
| :--- | :--- | :--- |
| **Constitutional Law & Civil Liberties** | Fourth Amendment rights, search and seizure, surveillance | *privacy*, *right to privacy*, *private property* |
| **Political Science & Statecraft** | Executive privilege, cabinet councils, royal prerogative | *privilege*, *Privy Council*, *privy* |
| **Sociology & Social Justice** | Economic inequality, systemic privilege, poverty analysis | *privilege*, *underprivileged*, *privation* |
| **Psychology & Medicine** | Sensory deprivation, developmental lack, emotional neglect | *deprive*, *sensory deprivation*, *sleep deprivation* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deprivation]] | noun | **1.** A state of extreme poverty.<br>**2.** The disadvantage that results from losing something. | *"You must feel it as a deprivation to you, miss,” replies Mr."* — Charles Dickens, *Bleak House* |
| [[deprive]] | verb | **1.** Take away possessions from someone.<br>**2.** Keep from having, keeping, or obtaining. | *"What if it tempt you toward the flood, my lord, Or to the dreadful summit of the cliff That beetles o’er his base into the sea, And there assume some other horrible form Which might deprive your sovereignty of reason, And draw you into madness?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deprived]] | verb | **1.** Take away possessions from someone.<br>**2.** Keep from having, keeping, or obtaining. | *"In short time after, he deposed the King, Soon after that deprived him of his life, And, in the neck of that, task’d the whole state."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[privacy]] | noun | **1.** The quality of being secluded from the presence or view of others.<br>**2.** The condition of being concealed or hidden. | *"Of this my privacy I have strong reasons."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[private]] | noun | **1.** An enlisted man of the lowest rank in the army or marines.<br>**2.** Confined to particular persons or groups or providing privacy. | *"I have, sir, as I was commanded from you, Spoke with the king, and have procur’d his leave For present parting; only he desires Some private speech with you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[private-enterprise]] | adjective | **1.** Subscribing to capitalistic competition. | *"In academic literature, private-enterprise designates subscribing to capitalistic competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privateer]] | noun | **1.** An officer or crew member of a privateer.<br>**2.** A privately owned warship commissioned to prey on the commercial shipping or warships of an enemy nation. | *"I only wish I had the command of a clipping privateer to begin with and could carry off the Chancellor and keep him on short allowance until he gave judgment in our cause."* — Charles Dickens, *Bleak House* |
| [[privateersman]] | noun | **1.** An officer or crew member of a privateer. | *"In academic literature, privateersman designates an officer or crew member of a privateer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privately]] | adverb | **1.** Kept private or confined to those intimately concerned.<br>**2.** By a private person or interest. | *"Marry, sir, I think, if you handled her privately, she would sooner confess; perchance, publicly, she’ll be ashamed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[privateness]] | noun | **1.** The condition of being concealed or hidden.<br>**2.** The quality of being secluded from the presence or view of others. | *"In academic literature, privateness designates the condition of being concealed or hidden."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privates]] | noun | **1.** External sex organ.<br>**2.** An enlisted man of the lowest rank in the army or marines. | *"And what have kings, that privates have not too, Save ceremony, save general ceremony?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[privation]] | noun | **1.** A state of extreme poverty.<br>**2.** Act of depriving someone of food or money or rights. | *"His father returned a negative, and then for the first time it occurred to Angel that her pride had stood in her way, and that she had suffered privation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[privatisation]] | noun | **1.** Changing something from state to private ownership or control. | *"In academic literature, privatisation designates changing something from state to private ownership or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privatise]] | verb | **1.** Change from governmental to private control or ownership. | *"In academic literature, privatise designates change from governmental to private control or ownership."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privatization]] | noun | **1.** Changing something from state to private ownership or control. | *"In academic literature, privatization designates changing something from state to private ownership or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privatize]] | verb | **1.** Change from governmental to private control or ownership. | *"In academic literature, privatize designates change from governmental to private control or ownership."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privet]] | noun | **1.** Any of various old world shrubs having smooth entire leaves and terminal panicles of small white flowers followed by small black berries; many used for hedges. | *"All over China, but especially in this part of Szechuan, there grows a tree of the large-leaved privet species."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[privilege]] | noun | **1.** A special advantage or immunity or benefit not enjoyed by all.<br>**2.** A right reserved exclusively by a particular person or group (especially a hereditary or official right). | *"Hadst thou not the privilege of antiquity upon thee— LAFEW."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[privileged]] | verb | **1.** Bestow a privilege upon.<br>**2.** Blessed with privileges. | *"Draw, men, for all this privileged place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[privily]] | adverb | **1.** Confidentially or in secret. | *"Thou, Richard, shalt to the Duke of Norfolk And tell him privily of our intent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[privine]] | noun | **1.** Vasoconstrictor (trade names privine and sudafed) used in nasal sprays to treat symptoms of nasal congestion and in eyedrops to treat eye irritation. | *"In academic literature, privine designates vasoconstrictor (trade names privine and sudafed) used in nasal sprays to treat symptoms of nasal congestion and in eyedrops to treat eye irritation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[privy]] | noun | **1.** A room or building equipped with one or more toilets.<br>**2.** A small outbuilding with a bench having holes through which a user can defecate. | *"You think none but your sheets are privy to your wishes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underprivileged]] | adjective | **1.** Lacking the rights and advantages of other members of society. | *"In academic literature, underprivileged designates lacking the rights and advantages of other members of society."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PRIV
  </div>
</div>
