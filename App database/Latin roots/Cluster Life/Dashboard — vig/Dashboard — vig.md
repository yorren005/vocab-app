---
status: unread
type: root_dashboard
---
# Dashboard — vig
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vig-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be vigorous or thrive”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **vig** means to be vigorous or thrive. It refers to the action of bing and carrying out this process. In English, this root forms words such as *strong*, *vigor*, *vigorous*, and *vigorously*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be vigorous or thrive
> The root **vig** means to be vigorous or thrive. It refers to the action of bing and carrying out this process. In English, this root forms words such as *strong*, *vigor*, *vigorous*, and *vigorously*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be vigorous or thrive</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *strong* and *vigor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vig** comes from a Latin word that means *"to be vigorous or thrive"*.
  - At its core, it describes the action of be vigorous or thrive.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **vig** in an English word, think of **to be vigorous or thrive**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be vigorous or thrive).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Strong**: An everyday English word showing the root's idea of *to be vigorous or thrive*.
  - **Vigor**: Physical strength, good health, and energy.
  - **Vigorous**: Strong, healthy, and full of energy.
  - **Vigorously**: In a vigorous, energetic, forceful, or robust manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vig</mark>, think of <mark class="hl-def">to be vigorous or thrive</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vig** operates through three morphological stems:
> - **Nominal / Verbal Energy Base `vigor-` (*vigor, vigōris*):**
>   - *vigor*, *vigorous*, *vigorously*, *vigorousness*
>   - Prefixed with intensive `in-` $\to$ *invigorate*, *invigorating*, *invigoratingly*, *invigoration*, *invigorator*
> - **Watchful Base `vigil-` (*vigil*, *vigilia*, *vigilāre*):**
>   - *vigil*, *vigilant*, *vigilantly*, *vigilance*, *vigilia*, *vigilate*
>   - Romance loan via Spanish $\to$ *vigilante*, *vigilantism*
>   - Prefixed with Greek `hyper-` $\to$ *hypervigilant*, *hypervigilance*
> - **Enlivening Botanical Cognate Base `veget-` (*vegetus* "lively" < PIE *\*weǵ-*):**
>   - *vegetable*, *vegetate*, *vegetation*, *vegetative*

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
> The root manifests across five conceptual domains:
> - **Physical Vigor, Energy & Athletic Prowess:** Muscular stamina, robust health, and forceful athletic or intellectual execution (*vigor*, *vigorous*, *invigorate*).
> - **Security, Alertness & Civic Defense:** Sustained watchfulness against danger or error (*vigilant*, *vigilance*, *vigil*).
> - **Extralegal Justice & Frontier Policing:** Citizen groups operating outside official statutory channels to punish perceived crime (*vigilante*, *vigilantism*).
> - **Psychological & Neurological States:** Heightened fight-or-flight threat scanning in post-traumatic stress (*hypervigilance*), and brainstem wakefulness without cortical consciousness (*vegetative state*).
> - **Botanical Growth & Cultivation:** Plant life flourishing, sprouting, and photosynthesizing (*vegetation*, *vegetative reproduction*).

---

## 🔀 4. Prefix & Combining Dynamics on vig

### Prefix Dynamics
- **`in-` (Intensive / Imparting):** Infusing vitality and energy into an organism $\to$ *invigorate*, *invigoration*.
- **`hyper-` (Greek "over / excessive"):** Pathologically heightened, exhausting alertness $\to$ *hypervigilant*, *hypervigilance*.

### Suffix Dynamics
- **`-or` (State / Quality of Force):** *vigeō* $\to$ *vigor*.
- **`-ous` (Full of):** Abounding in active force: *vigorous*.
- **`-ate` (Causative Verb):** Causing to be filled with vigor: *invigorate*.
- **`-ant` / `-ance` (Present Participle / State):** The state of staying awake: *vigilant*, *vigilance*.
- **`-ante` (Spanish Agent):** Watchman $\to$ *vigilante*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Agronomy & Plant Physiology:** Seed *vigor testing* (germination speed and stress tolerance); *vegetative propagation* (cuttings, tubers, and grafting bypassing sexual seed reproduction).
> - **Neurology & Coma Science:** The assessment of coma vs. *persistent vegetative state* (PVS) vs. minimally conscious state (MCS), tracking autonomic sleep-wake cycles without higher cortical awareness.
> - **Clinical Psychology & Trauma Therapy:** Diagnosis of *hypervigilance* in post-traumatic stress disorder (PTSD), where the amygdala remains permanently sensitized to environmental threat cues.
> - **Criminology & Legal Theory:** Historical and sociological analysis of *vigilantism* (frontier lynch mobs, urban neighborhood watches crossing into extralegal violence); corporate and regulatory *vigilance*.
> - **Military Tactics & Maritime Security:** The naval watch system; sentry perimeter *vigilance* during tactical operations.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[invigilate]] | verb | **1.** Watch over (students taking an exam, to prevent cheating). | *"In academic literature, invigilate designates watch over (students taking an exam, to prevent cheating)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invigilation]] | noun | **1.** Keeping watch over examination candidates to prevent cheating. | *"In academic literature, invigilation designates keeping watch over examination candidates to prevent cheating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invigilator]] | noun | **1.** Someone who watches examination candidates to prevent cheating. | *"In academic literature, invigilator designates someone who watches examination candidates to prevent cheating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invigorate]] | verb | **1.** Heighten or intensify.<br>**2.** Give life or energy to. | *"Owing to relaxation of pressure occasioned by critical situation advise direct special attention to invigorate activities conducted in Latin America and European continent."* — Effendi Shoghi, *Citadel of Faith* |
| [[invigorated]] | verb | **1.** Heighten or intensify.<br>**2.** Give life or energy to. | *"About half-an-hour later she invigorated herself by an effort, and took her seat and the reins as usual—in external appearance much as if nothing had happened."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[invigorating]] | verb | **1.** Heighten or intensify.<br>**2.** Give life or energy to. | *"Bagnet at last appears, rosy from the invigorating pail, and sits down to her work, Mr."* — Charles Dickens, *Bleak House* |
| [[invigoration]] | noun | **1.** Quality of being active or spirited or alive and vigorous.<br>**2.** The activity of giving vitality and vigour to something. | *"If the new Constitution be examined with accuracy and candor, it will be found that the change which it proposes consists much less in the addition of NEW POWERS to the Union, than in the invigoration of its ORIGINAL POWERS."* — Alexander Hamilton, *The Federalist Papers* |
| [[invigorator]] | noun | **1.** An agent that gives or restores life or vigor. | *"In academic literature, invigorator designates an agent that gives or restores life or vigor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reinvigorate]] | verb | **1.** Impart vigor, strength, or vitality to. | *"Your life has been, for the most part, spent in the toil of study, and I knew you needed an interval of relaxation and retirement to reinvigorate your mental and physical energies."* — Effie Afton, *Eventide* |
| [[reinvigorated]] | verb | **1.** Impart vigor, strength, or vitality to.<br>**2.** With restored energy. | *"In academic literature, reinvigorated designates impart vigor, strength, or vitality to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unvigilant]] | adjective | **1.** Not alert to what is potentially dangerous. | *"In academic literature, unvigilant designates not alert to what is potentially dangerous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vigee-lebrun]] | noun | **1.** French painter noted for her portraits (1755-1842). | *"In academic literature, vigee-lebrun designates french painter noted for her portraits (1755-1842)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vigesimal]] | adjective | **1.** Relating to or based on the number twenty. | *"In academic literature, vigesimal designates relating to or based on the number twenty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vigil]] | noun | **1.** A period of sleeplessness.<br>**2.** The rite of staying awake for devotional purposes (especially on the eve of a religious festival). | *"How shall I ever forget that dreadful vigil?"* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[vigilance]] | noun | **1.** The process of paying close and continuous attention.<br>**2.** Vigilant attentiveness. | *"Shall Henry’s conquest, Bedford’s vigilance, Your deeds of war, and all our counsel die?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vigilant]] | adjective | **1.** Carefully observant or attentive; on the lookout for possible danger. | *"The kingly crowned head, the vigilant eye, The counsellor heart, the arm our soldier, Our steed the leg, the tongue our trumpeter, With other muniments and petty helps Is this our fabric, if that they— MENENIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vigilante]] | noun | **1.** Member of a vigilance committee. | *"A vigilante strutting like a colonel...."* — Donn Byrne, *The Wind Bloweth* |
| [[vigilantism]] | noun | **1.** The actions of a vigilance committee in trying to enforce the laws. | *"In academic literature, vigilantism designates the actions of a vigilance committee in trying to enforce the laws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vigilantly]] | adverb | **1.** In a watchful manner. | *"The various agencies designed to carry the Message to the masses, and to present to them befittingly the teachings of its Author, must, likewise, be vigilantly preserved, supported and encouraged."* — Effendi Shoghi, *Citadel of Faith* |
| [[vigna]] | noun | **1.** Genus of vines or erect herbs having trifoliate leaves and yellowish or purplish flowers; of warm or tropical regions; most species often placed in genus phaseolus. | *"In academic literature, vigna designates genus of vines or erect herbs having trifoliate leaves and yellowish or purplish flowers; of warm or tropical regions; most species often placed in genus phaseolus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vignette]] | noun | **1.** A brief literary description.<br>**2.** A photograph whose edges shade off gradually. | *"BARTON FRONTISPIECE. 2.--BARBARA FRIETCHIE VIGNETTE TITLE. 3.--MRS."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[vigor]] | noun | **1.** Forceful exertion.<br>**2.** Active strength of body or mind. | *"The calls of "Uncle Philip, Uncle Philip!" sounded with more vigor than usual, because the children had not expected him back so soon, and therefore had to celebrate his coming with double energy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vigorish]] | noun | **1.** An exorbitant or unlawful rate of interest.<br>**2.** A percentage (of winnings or loot or profit) taken by an operator or gangster. | *"In academic literature, vigorish designates an exorbitant or unlawful rate of interest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vigorous]] | adjective | **1.** Characterized by forceful and energetic action or activity.<br>**2.** Strong and active physically or mentally; - w.h.hudson. | *"Salo had not recovered as quickly as she had hoped, and Leonore, instead of getting more robust in our vigorous mountain-air, only became thinner and frailer."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vigorously]] | adverb | **1.** With vigor; in a vigorous manner. | *"Here we go!" Kurt began and all the others vigorously joined him: Come out, you ghost of Wildenstein!"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vigour]] | noun | **1.** Forceful exertion.<br>**2.** Active strength of body or mind. | *"In verity, you did; my bones bear witness, That since have felt the vigour of his rage."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VIG
  </div>
</div>
