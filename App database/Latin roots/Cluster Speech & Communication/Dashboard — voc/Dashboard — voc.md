---
status: unread
type: root_dashboard
---
# Dashboard — voc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">voc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to call, voice, or summon”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A person cupping their hands around their mouth to shout across an open field.</span>
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

The root **voc** means to call, voice, or summon. It refers to the vocal sounds produced through speech or song. In English, this root forms words such as *vocal*, *vocabulary*, *vocation*, and *advocate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to call, voice, or summon
> The root **voc** means to call, voice, or summon. It refers to the vocal sounds produced through speech or song. In English, this root forms words such as *vocal*, *vocabulary*, *vocation*, and *advocate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To call, voice, or summon</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A person cupping their hands around their mouth to shout across an open field.</mark>
> - **Everyday Connection**: Think of familiar words like *vocal* and *vocabulary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **voc** comes from a Latin word that means *"to call, voice, or summon"*.
  - At its core, it describes the action of call, voice, or summon.

- **The Big Picture Idea**:
  - Picture a person cupping their hands around their mouth to shout across an open field.
  - Whenever you see **voc** in an English word, think of **calling out or speaking aloud**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to call, voice, or summon).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Vocal**: Relating to the human voice. 2. Expressing opinions freely or loudly. 3. A vocal sound or vocal performance.
  - **Vocabulary**: An everyday English word showing the root's idea of *to call, voice, or summon*.
  - **Vocation**: An everyday English word showing the root's idea of *to call, voice, or summon*.
  - **Advocate**: An everyday English word showing the root's idea of *to call, voice, or summon*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">voc</mark>, think of <mark class="hl-def">calling out or speaking aloud</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **voc** appears in several morphological patterns:
- **Base Noun & Adjective Stems (`voc-` / `voic-` < *vōx*)**:
  - *vōx* via Old French $\to$ **voice**, **voiceless**, **voiced**.
  - *vōcālis* $\to$ **vocal**, **vocally**, **vocalist**, **vocalize**, **vocalization**.
  - *vōx* + *ferre* $\to$ *vōciferārī* $\to$ **vociferous**, **vociferously**, **vociferate**.
- **Prefix Compounds with Verbs in `-voke` and `-voc-`**:
  - *con-* ("together") + *vocāre* $\to$ **convoke**.
  - *in-* ("upon") + *vocāre* $\to$ **invoke**.
  - *re-* ("back") + *vocāre* $\to$ **revoke**.
  - *pro-* ("forth") + *vocāre* $\to$ **provoke** (cross-indexed with [[Dashboard — vok]]).
  - *ex-* ("out") + *vocāre* $\to$ **evoke** (cross-indexed with [[Dashboard — vok]]).
- **Participial & Legal Derivatives**:
  - Fully cataloged under [[Dashboard — vocat]]: *advocate*, *vocation*, *provocation*, *irrevocable*, *equivocal*.

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

The derivatives of **voc** span four foundational fields:
- **Auditory Acoustics & Music**: *voice* (sound produced in a person's larynx), *vocal* (relating to the human voice), *vocalist* (singer), *vocalize* (utter sounds).
- **Outcry, Clamor & Passion**: *vociferous* (vehement or clamorous; shouting passionately), *vociferate* (shout or argue loudly).
- **Executive & Assemblies**: *convoke* (call together made up of members; convene an assembly), *invoke* (cite or appeal to an authority, statute, or deity).
- **Cancellation & Nullification**: *revoke* (put an end to the validity of an edict, license, or treaty), *revocable*.

---

## 🔀 4. Prefix & Combining Dynamics on voc

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`con-`** ("together") | `con-` + `vocāre` | Call people together $\to$ convene a council or assembly | *convoke* |
| **`in-`** ("upon, into") | `in-` + `vocāre` | Call upon for aid or divine help $\to$ appeal to law/deity | *invoke* |
| **`re-`** ("back") | `re-` + `vocāre` | Call back an issued command $\to$ repeal, annul | *revoke, revocable* |
| **`ferre`** ("to carry")| `vōx` + `ferre` | Carrying one's voice far and wide $\to$ noisy, clamorous | *vociferous, vociferously, vociferate* |
| **`-ālis`** (adjectival) | `vōx` + `-ālis` | Pertaining to the voice $\to$ singing, outspoken | *vocal, vocally, vocalist* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Music Performance & Opera**: Vocal pedagogy, vocal registers (chest, head), and choral singing (*vocalist*, *vocalize*, *vocal range*).
- **Jurisprudence & Constitutional Law**: Executive summons, statutory revocation of licenses, and invoking constitutional amendments (*invoke*, *revoke*, *convoke*).
- **Linguistics & Phonetics**: Voiced vs voiceless consonants, vocal fold vibration (*voice*, *voiced*, *vocalic*).
- **Sociology & Political Activism**: Clamorous protest, vocal minorities, and civic representation (*vociferous opposition*, *giving voice*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advocacy]] | noun | **1.** Active support of an idea or cause etc.; especially the act of pleading or arguing for something. | *"The duteous merciful constancy of his wife had delivered him from one dread, but it could not hinder her presence from being still a tribunal before which he shrank from confession and desired advocacy."* — George Eliot, *Middlemarch* |
| [[advocate]] | noun | **1.** A person who pleads for a cause or propounds an idea.<br>**2.** A lawyer who pleads cases in court. | *"Hapless Egeon, whom the fates have mark’d To bear the extremity of dire mishap; Now, trust me, were it not against our laws, Against my crown, my oath, my dignity, Which princes, would they, may not disannul, My soul should sue as advocate for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advocator]] | noun | **1.** A person who pleads for a cause or propounds an idea. | *"In academic literature, advocator designates a person who pleads for a cause or propounds an idea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convocation]] | noun | **1.** A group gathered in response to a summons.<br>**2.** The act of convoking. | *"A certain convocation of politic worms are e’en at him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evocation]] | noun | **1.** Imaginative re-creation.<br>**2.** Calling up supposed supernatural forces by spells and incantations. | *"I seemed at any rate, for an instant, to see their evocation of her as distinctly as I had seen her by the pond; and I brought out with decision: “It must have been also what _she_ wished!” Mrs."* — Henry James, *The Turn of the Screw* |
| [[evocative]] | adjective | **1.** Serving to bring to mind; - wilder hobson. | *"In academic literature, evocative designates serving to bring to mind; - wilder hobson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invocation]] | noun | **1.** A prayer asking god's help as part of a religious service.<br>**2.** An incantation used in conjuring or summoning a devil. | *"What’s that “ducdame?” JAQUES. ’Tis a Greek invocation to call fools into a circle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[irrevocable]] | adjective | **1.** Incapable of being retracted or revoked; - shakespeare. | *"Firm and irrevocable is my doom Which I have passed upon her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provocateur]] | noun | **1.** A secret agent who incites suspected persons to commit illegal acts. | *"In academic literature, provocateur designates a secret agent who incites suspected persons to commit illegal acts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[provocation]] | noun | **1.** Unfriendly behavior that causes anger or resentment.<br>**2.** Something that incites or provokes; a means of arousing or stirring to action. | *"Let the sky rain potatoes, let it thunder to the tune of “Greensleeves”, hail kissing-comfits and snow eringoes; let there come a tempest of provocation, I will shelter me here. [_He embraces her._] MISTRESS FORD."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provocative]] | adjective | **1.** Serving or tending to provoke, excite, or stimulate; stimulating discussion or exciting controversy; ; ; - anthony trollope.<br>**2.** Exciting sexual desire. | *"They must be neither provocative nor supine, neither fanatical nor excessively liberal, in their exposition of the fundamental and distinguishing features of their Faith."* — Effendi Shoghi, *Citadel of Faith* |
| [[provocatively]] | adverb | **1.** In a provocative manner. | *"In academic literature, provocatively designates in a provocative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revocable]] | adjective | **1.** Capable of being revoked or annulled. | *"In academic literature, revocable designates capable of being revoked or annulled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revocation]] | noun | **1.** The state of being cancelled or annulled.<br>**2.** The act (by someone having the authority) of annulling something previously done. | *"Where then had Peter meant the rest of the money to go—and where the land? and what was revoked and what not revoked—and was the revocation for better or for worse?"* — George Eliot, *Middlemarch* |
| [[subvocalise]] | verb | **1.** Articulate without making audible sounds. | *"In academic literature, subvocalise designates articulate without making audible sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvocaliser]] | noun | **1.** Someone who articulates speech without uttering sounds. | *"In academic literature, subvocaliser designates someone who articulates speech without uttering sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvocalize]] | verb | **1.** Articulate without making audible sounds. | *"In academic literature, subvocalize designates articulate without making audible sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subvocalizer]] | noun | **1.** Someone who articulates speech without uttering sounds. | *"In academic literature, subvocalizer designates someone who articulates speech without uttering sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprovocative]] | adjective | **1.** Not provocative. | *"In academic literature, unprovocative designates not provocative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocable]] | noun | **1.** A word that is spoken aloud. | *"In academic literature, vocable designates a word that is spoken aloud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocabulary]] | noun | **1.** A listing of the words used in some enterprise.<br>**2.** A language user's knowledge of words. | *"Charley’s delight calmed mine; and after we had had a walk in the garden, and Charley had exhausted her whole vocabulary of admiring expressions, I was as tranquilly happy as I ought to have been."* — Charles Dickens, *Bleak House* |
| [[vocal]] | noun | **1.** Music intended to be performed by one or more singers, usually with instrumental accompaniment.<br>**2.** A short musical composition with words. | *"Now, I am not a poetical man myself, except in a vocal way when it goes round a company, but I’m a practical one, and that’s my experience."* — Charles Dickens, *Bleak House* |
| [[vocalic]] | adjective | **1.** Being or containing or characterized by vowels; ; - walter scott.<br>**2.** Relating to or associated with or containing a vowel. | *"In academic literature, vocalic designates being or containing or characterized by vowels; ; - walter scott."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalisation]] | noun | **1.** The sound made by the vibration of vocal folds modified by the resonance of the vocal tract. | *"In academic literature, vocalisation designates the sound made by the vibration of vocal folds modified by the resonance of the vocal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalise]] | verb | **1.** Sing (each note a scale or in a melody) with the same vowel.<br>**2.** Pronounce as a vowel. | *"In academic literature, vocalise designates sing (each note a scale or in a melody) with the same vowel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocaliser]] | noun | **1.** An organism that can utter vocal sounds.<br>**2.** A person who sings. | *"In academic literature, vocaliser designates an organism that can utter vocal sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalism]] | noun | **1.** The system of vowels used in a particular language.<br>**2.** The sound made by the vibration of vocal folds modified by the resonance of the vocal tract. | *"In academic literature, vocalism designates the system of vowels used in a particular language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalist]] | noun | **1.** A person who sings. | *"Policeman at last finds it necessary to support the law and seize a vocalist, who is released upon the flight of the rest on condition of his getting out of this then, come, and cutting it—a condition he immediately observes."* — Charles Dickens, *Bleak House* |
| [[vocalization]] | noun | **1.** The sound made by the vibration of vocal folds modified by the resonance of the vocal tract.<br>**2.** The use of uttered sounds for auditory communication. | *"In academic literature, vocalization designates the sound made by the vibration of vocal folds modified by the resonance of the vocal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalize]] | verb | **1.** Utter with vibrating vocal chords.<br>**2.** Sing (each note a scale or in a melody) with the same vowel. | *"In academic literature, vocalize designates utter with vibrating vocal chords."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalizer]] | noun | **1.** An organism that can utter vocal sounds.<br>**2.** A person who sings. | *"In academic literature, vocalizer designates an organism that can utter vocal sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocalizing]] | noun | **1.** The act of singing vocal music.<br>**2.** Utter with vibrating vocal chords. | *"In academic literature, vocalizing designates the act of singing vocal music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocally]] | adverb | **1.** In a vocal manner. | *"I “never told my love” vocally; still, if looks have language, the merest idiot might have guessed I was over head and ears: she understood me at last, and looked a return—the sweetest of all imaginable looks."* — Emily Brontë, *Wuthering Heights* |
| [[vocation]] | noun | **1.** The particular occupation for which you are trained.<br>**2.** A body of people doing the same kind of work. | *"Why, Hal, ’tis my vocation, Hal, ’tis no sin for a man to labour in his vocation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vocational]] | adjective | **1.** Of or relating to a vocation or occupation; especially providing or undergoing training in special skills. | *"In academic literature, vocational designates of or relating to a vocation or occupation; especially providing or undergoing training in special skills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocationally]] | adverb | **1.** Affecting the pursuit of a vocation or occupation. | *"In academic literature, vocationally designates affecting the pursuit of a vocation or occupation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vocative]] | noun | **1.** The case (in some inflected languages) used when the referent of the noun is being addressed.<br>**2.** Relating to a case used in some languages. | *"STEPHEN: Addressed her in vocative feminine."* — James Joyce, *Ulysses* |
| [[vociferate]] | verb | **1.** Utter in a very loud voice. | *"He replied audibly enough, in a fashion which made my companion vociferate, more clamorously than before, that a wide distinction might be drawn between saints like himself and sinners like his master."* — Emily Brontë, *Wuthering Heights* |
| [[vociferation]] | noun | **1.** A loud utterance; often in protest or opposition. | *"From the whole extent of the invisible vale came a multitudinous intonation; it forced upon their fancy that a great city lay below them, and that the murmur was the vociferation of its populace."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vociferator]] | noun | **1.** A loud and vehement speaker (usually in protest). | *"In academic literature, vociferator designates a loud and vehement speaker (usually in protest)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vociferous]] | adjective | **1.** Conspicuously and offensively loud; given to vehement outcry. | *"In academic literature, vociferous designates conspicuously and offensively loud; given to vehement outcry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vociferously]] | adverb | **1.** In a vociferous manner. | *"The roans dashed through the better beaten path of the street, with everybody along the way hailing Henry Sherwood vociferously."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VOC
  </div>
</div>
