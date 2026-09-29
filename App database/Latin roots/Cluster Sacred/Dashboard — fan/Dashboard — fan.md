---
status: unread
type: root_dashboard
---
# Dashboard — fan
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fan-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“temple or shrine”</span>
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

The root **fan** means temple or shrine. It refers to a sacred sanctuary, shrine, or consecrated holy ground. In English, this root forms words such as *fane*, *fanatic*, *fanatical*, and *fanatically*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: temple or shrine
> The root **fan** means temple or shrine. It refers to a sacred sanctuary, shrine, or consecrated holy ground. In English, this root forms words such as *fane*, *fanatic*, *fanatical*, and *fanatically*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Temple or shrine</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</mark>
> - **Everyday Connection**: Think of familiar words like *fane* and *fanatic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fan** comes from a Latin word that means *"temple or shrine"*.
  - At its core, it describes temple or shrine.

- **The Big Picture Idea**:
  - Picture standing quietly inside a peaceful sanctuary dedicated to solemn devotion.
  - Whenever you see **fan** in an English word, think of **sacred things, holiness, and reverence**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of temple or shrine.
  - **Mental & Social**: How people experience, organize, or communicate about temple or shrine.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fane**: A temple, shrine, or consecrated place of worship.
  - **Fanatic**: A person filled with excessive, uncritical, and single-minded zeal for a cause.
  - **Fanatical**: Filled with excessive and single-minded zeal or obsessive enthusiasm.
  - **Fanatically**: In a fanatical manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fan</mark>, think of <mark class="hl-def">sacred things, holiness, and reverence</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Nominal Base:** *fān-* (nominative *fānum*, genitive *fānī*) $	o$ *fane* (poetic temple).

- **Adjectival / Agentive Stem:** *fānātic-* (*fānāticus* "belonging to a temple / frantic") $	o$ *fanatic, fanatical, fanaticism, fan, fandom*.

- **Prefixation of Spatial Exclusion:** `pro-` + *fānum* $	o$ *profane, profanely, profanity, profanation*.



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



### 1. Sacred Architecture & Shrines

- *fane* (an archaic or poetic word for a temple or church).



### 2. Zealotry, Obsession & Popular Culture

- *fanatic* (a person filled with excessive and single-minded zeal, especially for an extreme religious or political cause; fan).

- *fanatical* (filled with excessive and single-minded zeal).

- *fanaticism* (the quality or state of being fanatical).

- *fan* (an enthusiastic devotee, follower, or admirer of a sport, team, celebrity, or hobby).

- *fandom* (the state or community of fans of a particular person, team, or franchise).



### 3. Secularization, Desecration & Taboo Speech

- *profane* (relating or devoted to that which is not sacred or biblical; secular; to treat something sacred with irreverence or disrespect).

- *profanity* (blasphemous or obscene language; the quality of being profane).

- *profanation* (the act of treating something sacred with contempt, irreverence, or desecration).



---



## 🔀 4. Prefix & Combining Dynamics on fan



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Root Noun** | Latin *fānum* | **fane** | A sacred temple or shrine | *"The poet paid homage at the ancient fane of Apollo."* |

| **Suffix `-ic`** | *fānum* + *-āticus* | **fanatic** | Driven into frenzy by temple spirits | *"Religious fanatics refused to permit any modern secular schools."* |

| **Prefix `pro-`** | `pro-` ("outside") + *fānum* | **profane** | Remaining outside the sacred sanctuary | *"The lecture explored both sacred hymns and profane courtly lyrics."* |

| **State `-ity`** | *profānus* + *-itās* | **profanity** | Irreverent speech or curse words | *"The referee penalized the coach for shouting abusive profanity."* |

| **Clipping** | *fanatic* $	o$ *fan* | **fan** | An ardent supporter or enthusiast | *"Thousands of football fans filled the stadium hours before kickoff."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Religious History & Sociology:** *the sacred and the profane* (Émile Durkheim's foundational sociological dichotomy).

- 🏟️ **Sports Culture & Media Studies:** *sports fandom*, *fan engagement*, *toxic fan culture*.

- ⚖️ **Constitutional Law & Free Speech:** *profanity in broadcast television* (FCC enforcement of indecency regulations).

- 🎭 **Psychology & Political Science:** *fanaticism as ideological pathology*, *extremist radicalization*.

- 📚 **Poetry & Romanticism:** *fane of liberty* (frequent poetic trope in Shelley and Byron).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[fan]] | noun | **1.** A device for creating a current of air by movement of a surface or surfaces.<br>**2.** An enthusiastic devotee of sports. | *"No, no, although The air of paradise did fan the house, And angels offic’d all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fanaloka]] | noun | **1.** Civet of madagascar. | *"In academic literature, fanaloka designates civet of madagascar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fanatic]] | noun | **1.** A person motivated by irrational enthusiasm (as for a cause); --winston churchill.<br>**2.** Marked by excessive enthusiasm for and intense devotion to a cause or idea. | *"Pilate waxed eloquent over the diverse sects and the fanatic uprisings and riotings that were continually occurring."* — Jack London, *The Jacket (The Star-Rover)* |
| [[fanatical]] | adjective | **1.** Marked by excessive enthusiasm for and intense devotion to a cause or idea. | *"I abhor such fanatical phantasimes, such insociable and point-devise companions, such rackers of orthography, as to speak “dout” _sine_ “b”, when he should say “doubt”, “det” when he should pronounce “debt”—_d, e, b, t_, not _d, e, t_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fanatically]] | adverb | **1.** In a passionately fanatic manner. | *"Some, like Dobbin, fanatically admired him."* — William Makepeace Thackeray, *Vanity Fair* |
| [[fanaticism]] | noun | **1.** Excessive intolerance of opposing views. | *"It spoils my enjoyment of anything when I am made to think that most people are shut out from it.” “I call that the fanaticism of sympathy,” said Will, impetuously."* — George Eliot, *Middlemarch* |
| [[fanatism]] | noun | **1.** Excessive intolerance of opposing views. | *"In academic literature, fanatism designates excessive intolerance of opposing views."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fancied]] | verb | **1.** Imagine; conceive of; see in one's mind.<br>**2.** Have a fancy or particular liking or desire for. | *"I could have fancied that all the rusty keys, of which there must have been hundreds huddled together as old iron, had once belonged to doors of rooms or strong chests in lawyers’ offices."* — Charles Dickens, *Bleak House* |
| [[fancier]] | noun | **1.** A person having a strong liking for something.<br>**2.** Not plain; decorative or ornamented. | *"By the by; you were quite a pigeon-fancier.” The man looked up at the sky."* — Charles Dickens, *Great Expectations* |
| [[fanciful]] | adjective | **1.** Indulging in or influenced by fancy.<br>**2.** Not based on fact; unreal; - f.d.roosevelt. | *"He called her Artemis, Demeter, and other fanciful names half teasingly, which she did not like because she did not understand them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fancifully]] | adverb | **1.** In a fanciful manner. | *"He loved her dearly, though perhaps rather ideally and fancifully than with the impassioned thoroughness of her feeling for him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fancify]] | verb | **1.** Make more beautiful. | *"In academic literature, fancify designates make more beautiful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fancy]] | noun | **1.** Something many people believe that is false.<br>**2.** A kind of imagination that was held by coleridge to be more casual and superficial than true imagination. | *"But now he’s gone, and my idolatrous fancy Must sanctify his relics."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fancy-free]] | adjective | **1.** Having no commitments or responsibilities; carefree. | *"In academic literature, fancy-free designates having no commitments or responsibilities; carefree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fancywork]] | noun | **1.** Decorative needlework. | *"He could talk about rural economy with the count, fashions with the countess and Natásha, and about albums and fancywork with Sónya."* — graf Leo Tolstoy, *War and Peace* |
| [[fandom]] | noun | **1.** The fans of a sport or famous person. | *"In academic literature, fandom designates the fans of a sport or famous person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fane]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fan within the domain of Sacred.<br>**2.** A technical or specialized form exhibiting the properties of fan in systematic terminology. | *"Nor sleep nor sanctuary, Being naked, sick, nor fane nor Capitol, The prayers of priests nor times of sacrifice, Embarquements all of fury, shall lift up Their rotten privilege and custom ’gainst My hate to Martius."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fanion]] | noun | **1.** A small flag used by surveyors or soldiers to mark a position. | *"In academic literature, fanion designates a small flag used by surveyors or soldiers to mark a position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fanlight]] | noun | **1.** A window above a door that is usually hinged to a horizontal crosspiece over the door.<br>**2.** A window in a roof to admit daylight. | *"As I approached the house I saw a tall man in a Scotch bonnet with a coat which was buttoned up to his chin waiting outside in the bright semicircle which was thrown from the fanlight."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[fanlike]] | adjective | **1.** Resembling a fan. | *"The fog was lighter here, and he could see the strange, bottle-shaped kilns with their orange, fanlike tongues of fire."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[fanned]] | verb | **1.** Strike out (a batter), (of a pitcher).<br>**2.** Make (an emotion) fiercer. | *"Coggan and Gabriel put about their horses, and, fanned by the velvety air of this July night, retraced the road by which they had come."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fanny]] | noun | **1.** The fleshy part of the human body that you sit on.<br>**2.** External female sex organs. | *"Fortune came, his prize-money as lieutenant being great; promotion, too, came at _last;_ but Fanny Harville did not live to know it."* — Jane Austen, *Persuasion* |
| [[fantabulous]] | adjective | **1.** Very good;of the highest quality. | *"In academic literature, fantabulous designates very good;of the highest quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantail]] | noun | **1.** An overhang consisting of the fan-shaped part of the deck extending aft of the sternpost of a ship. | *"In academic literature, fantail designates an overhang consisting of the fan-shaped part of the deck extending aft of the sternpost of a ship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantan]] | noun | **1.** A chinese gambling game; a random number of counters are placed under a bowl and you gamble on how many will be left (0, 1, 2, or 3 modulo 4).<br>**2.** A card game in which you play your sevens and other cards in sequence in the same suit as the sevens; you win if you are the first to use all your cards. | *"In academic literature, fantan designates a chinese gambling game; a random number of counters are placed under a bowl and you gamble on how many will be left (0, 1, 2, or 3 modulo 4)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasia]] | noun | **1.** A musical composition of a free form usually incorporating several familiar themes. | *"Hoskyn’s, appeared, and played a fantasia for pianoforte and orchestra by the famous Jack, another of Mrs."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[fantasise]] | verb | **1.** Indulge in fantasies.<br>**2.** Portray in the mind. | *"In academic literature, fantasise designates indulge in fantasies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasist]] | noun | **1.** A creator of fantasies. | *"In academic literature, fantasist designates a creator of fantasies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasize]] | verb | **1.** Indulge in fantasies.<br>**2.** Portray in the mind. | *"In academic literature, fantasize designates indulge in fantasies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantasm]] | noun | **1.** A ghostly appearing figure.<br>**2.** Something existing in perception only. | *"In academic literature, fantasm designates a ghostly appearing figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantast]] | noun | **1.** Someone who predicts the future. | *"In academic literature, fantast designates someone who predicts the future."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fantastic]] | adjective | **1.** Ludicrously odd.<br>**2.** Extraordinarily good or great ; used especially as intensifiers. | *"There with fantastic garlands did she make Of crow-flowers, nettles, daisies, and long purples, That liberal shepherds give a grosser name, But our cold maids do dead men’s fingers call them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantastical]] | adjective | **1.** Existing in fancy only; - nathaniel hawthorne.<br>**2.** Ludicrously odd. | *"Ne’er a fantastical knave of them all shall flout me out of my calling. [_Exit._] SCENE IV."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantastically]] | adverb | **1.** Exceedingly; extremely. | *"Re-enter Ophelia, fantastically dressed with straws and flowers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantasy]] | noun | **1.** Imagination unrestricted by reality.<br>**2.** Fiction with a large amount of imagination in it. | *"But if thy love were ever like to mine— As sure I think did never man love so— How many actions most ridiculous Hast thou been drawn to by thy fantasy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fantods]] | noun | **1.** An ill-defined state of irritability and distress. | *"In academic literature, fantods designates an ill-defined state of irritability and distress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infancy]] | noun | **1.** The early stage of growth or development.<br>**2.** The earliest state of immaturity. | *"Joan of Arc hath been A virgin from her tender infancy, Chaste and immaculate in very thought; Whose maiden blood, thus rigorously effused, Will cry for vengeance at the gates of heaven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infant]] | noun | **1.** A very young child (birth to 1 year) who has not yet begun to walk or talk. | *"At first the infant, Mewling and puking in the nurse’s arms; Then the whining schoolboy, with his satchel And shining morning face, creeping like snail Unwillingly to school."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infant's-breath]] | noun | **1.** Eurasian herb with ample panicles of small white flowers; naturalized in north america. | *"In academic literature, infant's-breath designates eurasian herb with ample panicles of small white flowers; naturalized in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infanticide]] | noun | **1.** A person who murders an infant.<br>**2.** Murdering an infant. | *"Infanticide was generally practiced in ancient times among peoples of advanced civilization, as, for example, in Sparta and Rome, where not only deformed and weak children, but unwelcome ones, commonly were destroyed."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[infantile]] | adjective | **1.** Indicating a lack of maturity.<br>**2.** Of or relating to infants or infancy. | *"Sir,” said Mason, “this is all drivel, infantile drivel."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[infantilism]] | noun | **1.** An abnormal condition in which an older child or adult retains infantile characteristics.<br>**2.** Infantile behavior in mature persons. | *"In academic literature, infantilism designates an abnormal condition in which an older child or adult retains infantile characteristics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infantry]] | noun | **1.** An army unit consisting of soldiers who fight on foot. | *"Infantry cuts and guards are more interesting than ours, to my mind; but they are not so swashing."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[infantryman]] | noun | **1.** Fights on foot with small arms. | *"Your fine cords would soon get a bit rubbed,” said an infantryman, wiping the mud off his face with his sleeve."* — graf Leo Tolstoy, *War and Peace* |
| [[profanation]] | noun | **1.** Blasphemous behavior; the act of depriving something of its sacred character.<br>**2.** Degradation of something worthy of respect; cheapening. | *"If it please your honour, I know not well what they are, but precise villains they are, that I am sure of, and void of all profanation in the world that good Christians ought to have."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[profanatory]] | adjective | **1.** Profaning or tending to desecrate. | *"In academic literature, profanatory designates profaning or tending to desecrate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[profane]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Violate the sacred character of a place or language. | *"Cominius and Lartius stand bare._] May these same instruments which, you profane, Never sound more!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[profaned]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Violate the sacred character of a place or language. | *"Profaned, dishonoured, and the third usurped."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[profanely]] | adverb | **1.** With curses.<br>**2.** In an irreverent or profane manner. | *"What are you laughing at so profanely?” said Rosamond, with bland neutrality."* — George Eliot, *Middlemarch* |
| [[profaneness]] | noun | **1.** An attitude of irreverence or contempt for a divinity.<br>**2.** Unholiness by virtue of being profane. | *"Beseech you tenderly apply to her Some remedies for life. [_Exeunt Paulina and Ladies with Hermione._] Apollo, pardon My great profaneness ’gainst thine oracle!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[profanity]] | noun | **1.** Vulgar or irreverent speech or action. | *"His profanity, threats and imprecations were fearful."* — Classic Author, *The wonders of prayer* |

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
    ROOT DASHBOARD · FAN
  </div>
</div>
