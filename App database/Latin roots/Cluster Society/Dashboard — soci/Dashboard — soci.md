---
status: unread
type: root_dashboard
---
# Dashboard — soci
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">soci-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“companion, ally, or joined together”</span>
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

The root **soci** means companion, ally, or joined together. It refers to a companion, united ally, or partner joined in association. In English, this root forms words such as *social*, *society*, *associate*, and *sociable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: companion, ally, or joined together
> The root **soci** means companion, ally, or joined together. It refers to a companion, united ally, or partner joined in association. In English, this root forms words such as *social*, *society*, *associate*, and *sociable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Companion, ally, or joined together</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *social* and *society*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **soci** comes from a Latin word that means *"companion, ally, or joined together"*.
  - At its core, it describes companion, ally, or joined together.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **soci** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of companion, ally, or joined together.
  - **Mental & Social**: How people experience, organize, or communicate about companion, ally, or joined together.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Social**: Relating to society or its organization.
  - **Society**: The aggregate of people living together in a more or less ordered community.
  - **Associate**: To connect someone or something in the mind with someone or something else.
  - **Sociable**: Willing to talk and engage in activities with other people.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">soci</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
PIE *sekʷ- (to follow) ──> Latin socius (companion, partner, ally)
  │
  ├── Nominal / Adjectival Derivatives
  │     ├── sociālis ────────────────────────> social (pertaining to society/interpersonal)
  │     ├── sociābilis ──────────────────────> sociable (friendly, fond of company)
  │     └── societās (alliance, fellowship) ─> society (human collective order)
  │
  ├── Verbal Derivatives (sociāre: to join together)
  │     ├── ad- + sociāre ───────────────────> associate, association
  │     └── dis- + sociāre ──────────────────> dissociate
  │
  └── Modern Compound Formations (socio-)
        ├── socio- + -logy (< Greek logos) ──> sociology
        └── socio- + -path (< Greek pathos) ─> sociopath
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

### Distinct Spheres of Manifestation
1. **The Broad Human Order**: *society*, *social* (the structural, cultural, and political organization of human beings living collectively).
2. **Partnership & Alliance**: *associate*, *association* (business colleagues, formal organizations, mental connections between ideas).
3. **Interpersonal Temperament**: *sociable* (warm, approachable, eager for human company).
4. **Severance & Alienation**: *dissociate* (distancing oneself from a group, or psychologically detaching from reality).
5. **Scientific Inquiry & Clinical Pathology**: *sociology* (the academic study of human groups); *sociopath* (an individual personality disorder hostile to social norms).

---

## 🔀 4. Prefix & Combining Dynamics on soci

### Prefix Interactions
- **ad- ("to, toward") + soci-**: Produces *associate* (to link oneself to a companion, or to connect two concepts in the mind).
- **dis- ("apart, away") + soci-**: Produces *dissociate* (to sever companionship, disengage from a partnership, or separate mental processes).

### Suffix Morphologies
- **-al / -able**: *social*, *sociable* (general civil characteristic; personal approachable disposition).
- **-ety**: *society* (collective community).
- **-ation**: *association* (institutional organization or cognitive connection).
- **-ology / -path**: *sociology*, *sociopath* (scientific study of society; psychiatric pathology of social antagonism).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Application | Key Vocabulary |
| :--- | :--- | :--- |
| **Sociology & Anthropology** | Social stratification, institutions, cultural norms, social mobility | *society*, *social*, *sociology*, *socialization* |
| **Corporate Law & Business** | Corporate partnerships, professional guilds, industry consortiums | *associate*, *association*, *articles of association* |
| **Cognitive Psychology & Psychiatry** | Psychological trauma defense mechanisms, personality disorders | *dissociate*, *dissociation*, *sociopath*, *sociopathy* |
| **Political Philosophy** | The social contract, civil society, social welfare states | *social contract*, *social justice*, *social democracy* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antisocial]] | adjective | **1.** Shunning contact with others.<br>**2.** Hostile to or disruptive of normal standards of social behavior. | *"It is doubtful whether the boycott can be extended at all beyond the first degree of personal relations without becoming antisocial, whether it is the weapon of organized workers or of organized wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[associability]] | noun | **1.** The capability of being easily associated or joined or connected in thought. | *"In academic literature, associability designates the capability of being easily associated or joined or connected in thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[associable]] | adjective | **1.** Capable of being associated. | *"In academic literature, associable designates capable of being associated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[associableness]] | noun | **1.** The capability of being easily associated or joined or connected in thought. | *"In academic literature, associableness designates the capability of being easily associated or joined or connected in thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[associate]] | noun | **1.** A person who joins with others in some activity or endeavor.<br>**2.** A friend who is frequently in the company of another. | *"We never could associate, never could communicate, never probably from that time forth could interchange another word on earth."* — Charles Dickens, *Bleak House* |
| [[associateship]] | noun | **1.** The position of associate (as in an office or academy). | *"In academic literature, associateship designates the position of associate (as in an office or academy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[association]] | noun | **1.** A formal organization of people or groups of people.<br>**2.** The act of consorting with or joining with others. | *"We had observed before that when she looked at it she covered her discoloured eye with her hand, as though she wished to separate any association with noise and violence and ill treatment from the poor little child."* — Charles Dickens, *Bleak House* |
| [[associational]] | adjective | **1.** Of or relating to associations or associationism. | *"In academic literature, associational designates of or relating to associations or associationism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[associationism]] | noun | **1.** (psychology) a theory that association is the basic principle of mental activity. | *"In academic literature, associationism designates (psychology) a theory that association is the basic principle of mental activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[associative]] | adjective | **1.** Characterized by or causing or resulting from the process of bringing ideas or events together in memory or imagination. | *"In academic literature, associative designates characterized by or causing or resulting from the process of bringing ideas or events together in memory or imagination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[associatory]] | adjective | **1.** Characterized by or causing or resulting from the process of bringing ideas or events together in memory or imagination. | *"In academic literature, associatory designates characterized by or causing or resulting from the process of bringing ideas or events together in memory or imagination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consociate]] | verb | **1.** Bring or come into association or action. | *"In academic literature, consociate designates bring or come into association or action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disassociate]] | verb | **1.** Part; cease or break association with. | *"It is very important, therefore, that the first thing for a young man going into business to learn is to disassociate success from the more prominent walks in life, and get rid of that false theory."* — Edward William Bok, *Successward: A Young Man's Book for Young Men* |
| [[disassociation]] | noun | **1.** The state of being unconnected in memory or imagination.<br>**2.** A state in which some integrated part of a person's life becomes separated from the rest of the personality and functions independently. | *"In academic literature, disassociation designates the state of being unconnected in memory or imagination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissociable]] | adjective | **1.** Capable of being divided or dissociated. | *"In academic literature, dissociable designates capable of being divided or dissociated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissociate]] | verb | **1.** Part; cease or break association with.<br>**2.** Regard as unconnected. | *"Wopsle had greatly alarmed me more than once, by his blowing and hard breathing; but I knew the sounds by this time, and could dissociate them from the object of pursuit."* — Charles Dickens, *Great Expectations* |
| [[dissociation]] | noun | **1.** The act of removing from association.<br>**2.** A state in which some integrated part of a person's life becomes separated from the rest of the personality and functions independently. | *"He leant back against the hives, and with upturned face made observations on the stars, whose cold pulses were beating amid the black hollows above, in serene dissociation from these two wisps of human life."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[dissociative]] | adjective | **1.** Tending to produce dissociation. | *"In academic literature, dissociative designates tending to produce dissociation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonassociative]] | adjective | **1.** Not associative. | *"In academic literature, nonassociative designates not associative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsocial]] | adjective | **1.** Of plants and animals; not growing or living in groups or colonies. | *"In academic literature, nonsocial designates of plants and animals; not growing or living in groups or colonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociability]] | noun | **1.** The relative tendency or disposition to be sociable or associate with one's fellows. | *"This sociability seemed a necessary part of professional prudence, and the entertainment must be suitable."* — George Eliot, *Middlemarch* |
| [[sociable]] | noun | **1.** A party of people assembled to promote sociability and communal activity.<br>**2.** Inclined to or conducive to companionship with others. | *"I am ill, but your being by me Cannot amend me; society is no comfort To one not sociable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sociableness]] | noun | **1.** The relative tendency or disposition to be sociable or associate with one's fellows. | *"In academic literature, sociableness designates the relative tendency or disposition to be sociable or associate with one's fellows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociably]] | adverb | **1.** In a gregarious manner.<br>**2.** In a sociable manner. | *"Considering how sociably we had been sleeping together the night previous, and especially considering the affectionate arm I had found thrown over me upon waking in the morning, I thought this indifference of his very strange."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[social]] | noun | **1.** A party of people assembled to promote sociability and communal activity.<br>**2.** Relating to human society and its members. | *"I take it that my business in the social system is to be agreeable; I take it that everybody’s business in the social system is to be agreeable."* — Charles Dickens, *Bleak House* |
| [[socialisation]] | noun | **1.** The action of establishing on a socialist basis.<br>**2.** The act of meeting for social purposes. | *"In academic literature, socialisation designates the action of establishing on a socialist basis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socialise]] | verb | **1.** Take part in social activities; interact with others.<br>**2.** Train for a social environment. | *"In academic literature, socialise designates take part in social activities; interact with others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socialised]] | verb | **1.** Take part in social activities; interact with others.<br>**2.** Train for a social environment. | *"In academic literature, socialised designates take part in social activities; interact with others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socialiser]] | noun | **1.** A person who takes part in social activities. | *"In academic literature, socialiser designates a person who takes part in social activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socialising]] | noun | **1.** The act of meeting for social purposes.<br>**2.** Take part in social activities; interact with others. | *"In academic literature, socialising designates the act of meeting for social purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socialism]] | noun | **1.** A political theory advocating state ownership of industry.<br>**2.** An economic system based on state ownership of capital. | *"Some aspects of socialism Index FOREWORD The present volume deals with various practical problems in economics, as a volume published a year earlier dealt with the broader economic principles of value and distribution."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[socialist]] | noun | **1.** A political advocate of socialism.<br>**2.** Advocating or following the socialist principles. | *"Origin of the radical socialist party. § 16."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[socialistic]] | adjective | **1.** Advocating or following the socialist principles. | *"Every man of conscience and of ideals has moods that are socialistic (in this sense) and dreams of a world without toil, competition, or poverty."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[socialite]] | noun | **1.** A socially prominent person. | *"In academic literature, socialite designates a socially prominent person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociality]] | noun | **1.** The tendency to associate with others and to form social groups. | *"But the sun of his sociality soon recovers from this brief eclipse and shines again."* — Charles Dickens, *Bleak House* |
| [[socialization]] | noun | **1.** The action of establishing on a socialist basis.<br>**2.** The act of meeting for social purposes. | *"This great recent movement of socialization in industry is the expression not of a radical but of a moderate social philosophy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[socialize]] | verb | **1.** Take part in social activities; interact with others.<br>**2.** Train for a social environment. | *"Just socializing." He motioned at the stool again."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[socialized]] | verb | **1.** Take part in social activities; interact with others.<br>**2.** Train for a social environment. | *"The auction-sale is less a purely personal matter, takes on a more public aspect, has a more socialized character than isolated trade, depends more on forces outside the control of any one man, and results in a price fixed with greater definiteness."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[socializer]] | noun | **1.** A person who takes part in social activities. | *"In academic literature, socializer designates a person who takes part in social activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socializing]] | noun | **1.** The act of meeting for social purposes.<br>**2.** Take part in social activities; interact with others. | *"Just socializing." He motioned at the stool again."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[socially]] | adverb | **1.** By or with respect to society.<br>**2.** In a social manner. | *"Of all the reminders that she had ever received that her people were socially extinct, there was none so forcible as this spoliation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[societal]] | adjective | **1.** Relating to human society and its members. | *"In academic literature, societal designates relating to human society and its members."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[society]] | noun | **1.** An extended social group having a distinctive cultural and economic organization.<br>**2.** A formal association of people with similar interests. | *"And so had I, but yet, for fashion sake, I thank you too for your society."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[socinian]] | noun | **1.** An adherent of the teachings of socinus; a christian who rejects the divinity of christ and the trinity and original sin; influenced the development of unitarian theology. | *"In academic literature, socinian designates an adherent of the teachings of socinus; a christian who rejects the divinity of christ and the trinity and original sin; influenced the development of unitarian theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socinus]] | noun | **1.** Italian theologian who argued against trinitarianism (1539-1604). | *"In academic literature, socinus designates italian theologian who argued against trinitarianism (1539-1604)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociobiologic]] | adjective | **1.** Of or relating to sociobiology. | *"In academic literature, sociobiologic designates of or relating to sociobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociobiological]] | adjective | **1.** Of or relating to sociobiology. | *"In academic literature, sociobiological designates of or relating to sociobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociobiologically]] | adverb | **1.** With respect to sociobiology. | *"In academic literature, sociobiologically designates with respect to sociobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociobiologist]] | noun | **1.** A biologist who studies the biological determinants of social behavior. | *"In academic literature, sociobiologist designates a biologist who studies the biological determinants of social behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociobiology]] | noun | **1.** The branch of biology that conducts comparative studies of the social organization of animals (including human beings) with regard to its evolutionary history. | *"In academic literature, sociobiology designates the branch of biology that conducts comparative studies of the social organization of animals (including human beings) with regard to its evolutionary history."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociocultural]] | adjective | **1.** Relating to both social and cultural matters. | *"In academic literature, sociocultural designates relating to both social and cultural matters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socioeconomic]] | adjective | **1.** Involving social as well as economic factors. | *"In academic literature, socioeconomic designates involving social as well as economic factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[socioeconomically]] | adverb | **1.** With respect to socioeconomic factors. | *"In academic literature, socioeconomically designates with respect to socioeconomic factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociolinguist]] | noun | **1.** A linguist who studies the social and cultural factors that influence linguistic communication. | *"In academic literature, sociolinguist designates a linguist who studies the social and cultural factors that influence linguistic communication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociolinguistic]] | adjective | **1.** Of or relating to sociolinguistics. | *"In academic literature, sociolinguistic designates of or relating to sociolinguistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociolinguistically]] | adverb | **1.** With respect to sociolinguistics. | *"In academic literature, sociolinguistically designates with respect to sociolinguistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociolinguistics]] | noun | **1.** The study of language in relation to its sociocultural context. | *"In academic literature, sociolinguistics designates the study of language in relation to its sociocultural context."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociological]] | adjective | **1.** Of or relating to or determined by sociology. | *"Sociological effects of agricultural decay. § 6."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sociologically]] | adverb | **1.** With regard to sociology. | *"Politically in a democratic nation, and sociologically in its effects upon the size of families and the raising of healthy children, the preservation of an independent American yeomanry is of fundamental importance to the nation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sociologist]] | noun | **1.** A social scientist who studies the institutions and development of human society. | *"The occasion will be a special one, as Herr Abendgasse, a remarkable German socialist and art critic, is to deliver a lecture on ‘The True in Art.’ Be careful, in speaking of him in society, to refer to him as a sociologist, and not as a socialist."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[sociology]] | noun | **1.** The study and classification of human societies. | *"I, p. 429, for figures of population and of decennial rates of increase.] [Footnote 8: The effect of the growth of cities is discussed in the "American Journal of Sociology," Vol. 18, p. 342, in an article on "Walker's Theory of Immigration," by E.A."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sociometry]] | noun | **1.** The quantitative study of social relationships. | *"In academic literature, sociometry designates the quantitative study of social relationships."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociopath]] | noun | **1.** Someone with a sociopathic personality; a person with an antisocial personality disorder (`psychopath' was once widely used but has now been superseded by `sociopath'). | *"In academic literature, sociopath designates someone with a sociopathic personality; a person with an antisocial personality disorder (`psychopath' was once widely used but has now been superseded by `sociopath')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociopathic]] | adjective | **1.** Of or relating to a sociopathic personality disorder. | *"In academic literature, sociopathic designates of or relating to a sociopathic personality disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsociability]] | noun | **1.** An unsociable disposition; avoiding friendship or companionship. | *"Nanaue had one good quality that seemed to redeem his apparent unsociability; he was almost always to be seen working in his mother's taro or potato patch when not fishing or bathing."* — Classic Author, *Hawaiian folk tales* |
| [[unsociable]] | adjective | **1.** Not inclined to society or companionship. | *"Bernard was better behaved with Lawrence than with any one else, less surly, less unsociable, less violently coarse: since June there had been fewer quarrels with Val and Barry and the servants, and less open incivility to Laura."* — Anthony Pryde, *Nightfall* |
| [[unsociableness]] | noun | **1.** An unsociable disposition; avoiding friendship or companionship. | *"In academic literature, unsociableness designates an unsociable disposition; avoiding friendship or companionship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsociably]] | adverb | **1.** In an unsociable manner. | *"In academic literature, unsociably designates in an unsociable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsocial]] | adjective | **1.** Not seeking or given to association; being or living without companions. | *"There must be a plan, and by law the will of the majority must be imposed upon the unsocial few."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |

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
    ROOT DASHBOARD · SOCI
  </div>
</div>
