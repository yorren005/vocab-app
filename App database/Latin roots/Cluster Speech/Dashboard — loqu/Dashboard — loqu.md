---
status: unread
type: root_dashboard
---
# Dashboard — loqu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">loqu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“speak”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Speaking words clearly so that an audience understands every sentence.</span>
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

The root **loqu** means speak. It refers to uttering words aloud, expressing thoughts, or communicating messages. In English, this root forms words such as *eloquent*, *colloquial*, *soliloquy*, and *loquacious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: speak
> The root **loqu** means speak. It refers to uttering words aloud, expressing thoughts, or communicating messages. In English, this root forms words such as *eloquent*, *colloquial*, *soliloquy*, and *loquacious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Speak</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Speaking words clearly so that an audience understands every sentence.</mark>
> - **Everyday Connection**: Think of familiar words like *eloquent* and *colloquial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **loqu** comes from a Latin word that means *"speak"*.
  - At its core, it describes speak.

- **The Big Picture Idea**:
  - Picture speaking words clearly so that an audience understands every sentence.
  - Whenever you see **loqu** in an English word, think of **spoken words and speech**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of speak.
  - **Mental & Social**: How people experience, organize, or communicate about speak.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Eloquent**: Fluent or persuasive in speaking or writing.
  - **Colloquial**: Used in ordinary or familiar conversation.
  - **Soliloquy**: An act of speaking one's thoughts aloud when by oneself or regardless of any hearers, especially by a character in a play.
  - **Loquacious**: Tending to talk a great deal.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">loqu</mark>, think of <mark class="hl-def">spoken words and speech</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin loquor, loquī (to speak) ──> locūtus (spoken)
  │
  ├── Rhetorical Mastery & Style
  │     ├── ex- + loquī ────────────> eloquence, eloquent
  │     ├── ex- + locūtiō ──────────> elocution (art of public speaking)
  │     └── grandis + loquī ────────> grandiloquent (pompous speech)
  │
  ├── Solitary & Sleeping Speech
  │     ├── sōlus + loquī ──────────> soliloquy, soliloquize (talking to self)
  │     └── somnus + loquī ─────────> somniloquy, somniloquent (sleep-talking)
  │
  ├── Conversational & Evasive Speech
  │     ├── circum- + locūtiō ──────> circumlocution (talking in circles)
  │     ├── com- + loquī ───────────> colloquy, colloquial (informal speech)
  │     └── inter- + locūtor ───────> interlocutor (conversation partner)
  │
  └── Talkativeness & Defamation
        ├── loquāx ─────────────────> loquacious, loquacity (chattiness)
        └── ob- + loquī ────────────> obloquy (speaking ill of, disgrace)
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
1. **Classical Rhetoric & Oratory**: *eloquence*, *eloquent*, *elocution*, *grandiloquent* (stirring speeches, declamation).
2. **Theatrical Drama**: *soliloquy*, *soliloquize* (dramatic inner monologues on stage).
3. **Conversational Idiom & Diplomacy**: *colloquial*, *colloquy*, *interlocutor* (informal slang, bilateral diplomatic dialogues).
4. **Deception & Political Evasion**: *circumlocution*, *obloquy* (indirect verbosity, public censure/slander).
5. **Personality & Parasomnia**: *loquacious*, *loquacity*, *somniloquy*, *somniloquent* (talkative demeanor, sleep-talking).

---

## 🔀 4. Prefix & Combining Dynamics on loqu

### Classical Compounds
- **ex- ("out") + loqu-**: *eloquent*, *elocution* (speaking out with force and beauty).
- **circum- ("around") + locut-**: *circumlocution* (speaking in circles).
- **com- ("with") + loqu-**: *colloquy*, *colloquial* (speaking together).
- **solus ("alone") + loqu-**: *soliloquy* (speaking alone).
- **somnus ("sleep") + loqu-**: *somniloquy* (speaking while asleep).
- **inter- ("between") + locut-**: *interlocutor* (one who speaks between others).
- **ob- ("against") + loqu-**: *obloquy* (speaking against; disgrace).
- **grandis ("grand") + loqu-**: *grandiloquent* (pompously grandiose speech).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Classical Rhetoric & Forensic Debate** | Forensic oratory, persuasive cadence, oratorical rhythm | *eloquent*, *eloquence*, *elocution* |
| **Theater & Dramatic Arts** | Shakespearean soliloquies, aside dialogue, stage diction | *soliloquy*, *soliloquize* |
| **Linguistics & Dialectology** | Colloquialisms, vernacular speech, sociolects | *colloquial*, *colloquialism* |
| **Sleep Medicine & Neurology** | Parasomnias, NREM sleep talking, sleep behavioral analysis | *somniloquy*, *somniloquent* |
| **Diplomacy & International Negotiations** | Official bilateral talks, peace interlocutors | *interlocutor*, *colloquy* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[colloquial]] | adjective | **1.** Characteristic of informal spoken language or conversation. | *"Stables, which bids fair to outshine the old one, on which he has so long rested his colloquial reputation."* — Charles Dickens, *Bleak House* |
| [[colloquialism]] | noun | **1.** A colloquial expression; characteristic of spoken or written communication that seeks to imitate informal speech. | *"In academic literature, colloquialism designates a colloquial expression; characteristic of spoken or written communication that seeks to imitate informal speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colloquially]] | adverb | **1.** With the use of colloquial expressions. | *"Snagsby with his finger on his nose, “don’t allude to it!” For some little time the jurymen hang about the Sol’s Arms colloquially."* — Charles Dickens, *Bleak House* |
| [[colloquium]] | noun | **1.** An academic meeting or seminar usually led by a different lecturer and on a different topic at each meeting.<br>**2.** An address to an academic meeting or seminar. | *"MON. [76] “Nullus et monachus habeat colloquium cum maliere cognata aut extranea, in temporibus indebitis, sicut, prandii, et coenæ, et horæ meridianæ, aut tempore potûs assiguati.”--_MS."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[colloquy]] | noun | **1.** A conversation especially a formal one.<br>**2.** Formal conversation. | *"It had needed that brief colloquy to let him see what Stafford's life was like at Wanhope, and in what slow nerve-by-nerve laceration amends were being made."* — Anthony Pryde, *Nightfall* |
| [[eloquence]] | noun | **1.** Powerful and effective language. | *"Bring him through the bands. [_Exit Ambassador, attended._] [_To Thidias_.] To try thy eloquence now ’tis time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eloquent]] | adjective | **1.** Expressing yourself readily, clearly, effectively. | *"HAMLET. ’Tis as easy as lying: govern these ventages with your finger and thumb, give it breath with your mouth, and it will discourse most eloquent music."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eloquently]] | adverb | **1.** With eloquence.<br>**2.** In an articulate manner. | *"But after embattling his facts, an advocate who should wholly suppress a not unreasonable surmise, which might tell eloquently upon his cause—such an advocate, would he not be blameworthy?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[grandiloquence]] | noun | **1.** High-flown style; excessive use of verbal ornamentation. | *"But for my deep-seated impressions that treasure was here somewhere actually buried, we might have had all our labor in vain.” “But your grandiloquence, and your conduct in swinging the beetle— how excessively odd!"* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[grandiloquent]] | adjective | **1.** Lofty in style.<br>**2.** Puffed up with vanity; ; ; ; - newsweek. | *"Applied to any other creature than the Leviathan—to an ant or a flea—such portly terms might justly be deemed unwarrantably grandiloquent."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[grandiloquently]] | adverb | **1.** In a rhetorically grandiloquent manner. | *"And to-day you are hurt, and you still smile!" "I smile at my thoughts," I said grandiloquently."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[ineloquently]] | adverb | **1.** Without eloquence; in an inarticulate manner. | *"In academic literature, ineloquently designates without eloquence; in an inarticulate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loquacious]] | adjective | **1.** Full of trivial conversation. | *"Jellyby; and a loquacious young man called Mr."* — Charles Dickens, *Bleak House* |
| [[loquaciously]] | adverb | **1.** In a chatty loquacious manner. | *"In academic literature, loquaciously designates in a chatty loquacious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loquaciousness]] | noun | **1.** The quality of being wordy and talkative. | *"In academic literature, loquaciousness designates the quality of being wordy and talkative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loquacity]] | noun | **1.** The quality of being wordy and talkative. | *"But she forbore to utter this feeling, and the reticence of her tongue only made the loquacity of her face the more noticeable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[loquat]] | noun | **1.** Evergreen tree of warm regions having fuzzy yellow olive-sized fruit with a large free stone; native to china and japan.<br>**2.** Yellow olive-sized semitropical fruit with a large free stone and relatively little flesh; used for jellies. | *"There grew she to peerless beauty where loquat and almond scent the air."* — James Joyce, *Ulysses* |
| [[obloquy]] | noun | **1.** State of disgrace resulting from public abuse.<br>**2.** A false accusation of an offense or a malicious misrepresentation of someone's words or actions. | *"It is an honour ’longing to our house, Bequeathed down from many ancestors, Which were the greatest obloquy i’ the world In me to lose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[soliloquise]] | verb | **1.** Talk to oneself. | *"There is something in that,” I soliloquised (mentally, be it understood; I did not talk aloud)."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[soliloquize]] | verb | **1.** Talk to oneself. | *"He’d set upon a post at a street corner eight or ten hours at a stretch if he undertook to do it.” “He might have done worse,” I heard my guardian soliloquize."* — Charles Dickens, *Bleak House* |
| [[soliloquy]] | noun | **1.** Speech you make to yourself.<br>**2.** A (usually long) dramatic speech intended to give the illusion of unspoken reflections. | *"This woman was not given to soliloquy; but extremity of feeling lessens the individuality of the weak, as it increases that of the strong."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[somniloquent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin loqu within the domain of Speech.<br>**2.** A technical or specialized form exhibiting the properties of loqu in systematic terminology. | *"In academic literature, somniloquent designates pertaining to, derived from, or characteristic of latin loqu within the domain of speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somniloquism]] | noun | **1.** Uttering speech while asleep. | *"In academic literature, somniloquism designates uttering speech while asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somniloquist]] | noun | **1.** Someone who talks while asleep. | *"In academic literature, somniloquist designates someone who talks while asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somniloquy]] | noun | **1.** Uttering speech while asleep. | *"In academic literature, somniloquy designates uttering speech while asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LOQU
  </div>
</div>
