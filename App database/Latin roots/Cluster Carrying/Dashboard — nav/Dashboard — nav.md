---
status: unread
type: root_dashboard
---
# Dashboard — nav
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nav-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“ship”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lifting a heavy load and carrying it forward with steady strength.</span>
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

The root **nav** means ship. It refers to a large water vessel used for navigation and transport. In English, this root forms words such as *navy*, *navigate*, *naval*, and *navigation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: ship
> The root **nav** means ship. It refers to a large water vessel used for navigation and transport. In English, this root forms words such as *navy*, *navigate*, *naval*, and *navigation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Ship</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lifting a heavy load and carrying it forward with steady strength.</mark>
> - **Everyday Connection**: Think of familiar words like *navy* and *navigate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nav** comes from a Latin word that means *"ship"*.
  - At its core, it describes ship.

- **The Big Picture Idea**:
  - Picture lifting a heavy load and carrying it forward with steady strength.
  - Whenever you see **nav** in an English word, think of **carrying weight and transporting goods**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of ship.
  - **Mental & Social**: How people experience, organize, or communicate about ship.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Navy**: A nation's entire military organization for sea warfare, including warships, sailors, aircraft, and shore establishments.
  - **Navigate**: To plan, direct, plot, and manage the course of a ship, aircraft, or vehicle.
  - **Naval**: Of, relating to, or belonging to a navy, warships, or maritime armed forces.
  - **Navigation**: The art, science, or technology of determining the position, course, and speed of a vessel or vehicle.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nav</mark>, think of <mark class="hl-def">carrying weight and transporting goods</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Stem Variants
> The root **nav** surfaces in English across several primary morphological stems:
> - **Primary Latin Nominal Stem:** `nav-` (from *nāvis*):
>   - *nav- + -al* → [[naval]] (pertaining to warships or the navy).
>   - Old French *navie* (from *nāvis*) → [[navy]].
>   - Architectural substantive: Latin *nāvis* → English [[nave]].
> - **Compound Verbal Stem:** `navig-` (from *nāvigāre* < *nāvis* + *agere*):
>   - Verb: *navig- + -ate* → [[navigate]].
>   - Result Noun: *navig- + -ation* → [[navigation]].
>   - Agent Noun: *navig- + -ator* → [[navigator]].
>   - Capacity Adjective: *navig- + -able* → [[navigable]], [[navigability]], [[unnavigable]].
>   - Circumferential Compound: *circum- + navig- + -ate* → [[circumnavigate]], [[circumnavigation]], [[circumnavigator]].
> - **Diminutive Anatomical Stem:** `navicul-` (from *nāvicula* "little boat"):
>   - *navicul- + -ar* → [[navicular]] (boat-shaped tarsal bone).
> - **Physiological Seasickness Stem:** `nause-` (Greek ναυσία *nausía* via Latin *nausea* "ship-sickness"):
>   - Substantive: [[nausea]].
>   - Causative Verb: *nause- + -ate* → [[nauseate]], [[nauseating]], [[nauseated]], [[nauseous]].
> - **Greco-Latin Cognate Agent Suffix:** `-naut` (Greek ναύτης *naútēs* "sailor" < ναῦς *naûs*):
>   - *astron* (star) + *-naut* → [[astronaut]].
>   - *kosmos* (universe) + *-naut* → [[cosmonaut]].
>   - *aqua* (water) + *-naut* → [[aquanaut]].
>   - Adjective: *nautic- + -al* → [[nautical]].

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

> [!tip] 🌈 Spectrum of Meaning Across Four Concentric Domains
> 1. **Maritime Wayfinding, Seamanship & Global Exploration:** Steering vessels across oceans, charting courses, determining geographic coordinates, and sailing entirely around the globe ([[navigate]], [[navigation]], [[navigator]], [[navigable]], [[circumnavigate]], [[circumnavigation]], [[nautical]]).
> 2. **Military Sea Power & National Fleets:** Sovereign warships, naval warfare, fleets, and administrative admiralties ([[naval]], [[navy]]).
> 3. **Architectural Sanctuaries & Skeletal Anatomy:** The central hull-shaped congregation body of a cathedral, and the curved, boat-shaped tarsal bone supporting the human arch ([[nave]], [[navicular]]).
> 4. **Physiological Seasickness & Celestial Voyaging:** Vestibular motion sickness triggered by undulating ship movement, expanding figuratively to intense disgust, contrasted with daring expeditions into the ocean of the cosmos ([[nausea]], [[nauseate]], [[nauseated]], [[nauseous]], [[astronaut]], [[cosmonaut]], [[aquanaut]]).

---

## 🔀 4. Prefix & Combining Dynamics on nav

### Prefix Dynamics

| Prefix / Combining Form | Semantic Meaning | Derived Form | Resulting Synthesis |
| :--- | :--- | :--- | :--- |
| `circum-` | around, about | [[circumnavigate]] | To steer or sail a ship completely *around* the earth or an island. |
| `un-` | not (negation) | [[unnavigable]] | *Not* capable of being navigated or sailed through by boats. |
| `astro-` *(Greek)* | star, celestial | [[astronaut]] | A "star-sailor" voyaging through outer space. |
| `cosmo-` *(Greek)* | universe, cosmos | [[cosmonaut]] | A "cosmos-sailor" (specifically in Soviet/Russian space programs). |
| `aqua-` *(Latin)* | water | [[aquanaut]] | An "underwater-sailor" who remains submerged for extended periods. |

### Suffix Transformations (Grammatical Function)

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Pertaining to) | [[naval]] | Pertaining to ships, maritime defense, or a navy. |
| `-y` *(via OF)* | Noun (Collective Fleet) | [[navy]] | The entire armed fleet and maritime military branch of a nation. |
| `-ate` | Verb (Perform action) | [[navigate]], [[circumnavigate]], [[nauseate]] | To drive a ship; to cause seasickness. |
| `-ation` | Noun (Process / State) | [[navigation]], [[circumnavigation]] | The science of wayfinding; sailing around the globe. |
| `-ator` | Noun (Agent / Practitioner) | [[navigator]], [[circumnavigator]] | One who directs the course of a ship or aircraft. |
| `-able` | Adjective (Capacity) | [[navigable]] | Deep and wide enough to permit the passage of vessels. |
| `-ular` *(diminutive)* | Adjective (Shape) | [[navicular]] | Shaped like a small boat (*nāvicula*). |
| `-ous` | Adjective (Characterized by) | [[nauseous]] | Causing or suffering from acute motion sickness or disgust. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🚢 **Maritime History & Global Navigation** | [[navigate]], [[navigation]], [[navigator]], [[circumnavigate]], [[circumnavigation]], [[nautical]] | The Age of Discovery: Ferdinand Magellan and Juan Sebastián Elcano completing the first circumnavigation of the globe (1519–1522); sextant celestial navigation, dead reckoning, and modern satellite Global Positioning Systems (GPS). |
| ⚔️ **Geopolitics & Military Strategy** | [[naval]], [[navy]] | Alfred Thayer Mahan's doctrine of sea power; blue-water navies, aircraft carrier strike groups, ballistic missile submarines, and maintaining freedom of navigation in international straits. |
| ⛪ **Ecclesiastical Architecture** | [[nave]] | Romanesque and Gothic cathedral architecture: the central nave flanked by side aisles, triforium galleries, clerestory windows, and ribbed vaulting symbolizing the ship of the church. |
| 🩺 **Orthopedics & Clinical Medicine** | [[navicular]], [[nausea]], [[nauseate]], [[nauseous]] | Fracture of the tarsal navicular bone in athletes (stress fractures of the foot arch); vestibular motion sickness treated with dimenhydrinate; post-chemotherapy antiemetic therapy. |
| 🚀 **Aerospace & Space Exploration** | [[astronaut]], [[cosmonaut]], [[aquanaut]] | NASA Apollo lunar landings, the Artemis lunar program, deep-sea saturation habitats (NOAA Aquarius Reef Base), and long-duration space station orbital habitation. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circumnavigate]] | verb | **1.** Travel around, either by plane or ship. | *"So that Monsoons, Pampas, Nor-Westers, Harmattans, Trades; any wind but the Levanter and Simoom, might blow Moby Dick into the devious zig-zag world-circle of the Pequod’s circumnavigating wake."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[circumnavigation]] | noun | **1.** Traveling around something (by ship or plane). | *"Harris Coll._ “Here they saw such huge troops of whales, that they were forced to proceed with a great deal of caution for fear they should run their ship upon them.” _Schouten’s Sixth Circumnavigation._ “We set sail from the Elbe, wind N."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[navaho]] | noun | **1.** A member of an athapaskan people that migrated to arizona and new mexico and utah.<br>**2.** The athapaskan language spoken by the navaho. | *"In academic literature, navaho designates a member of an athapaskan people that migrated to arizona and new mexico and utah."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[navajo]] | noun | **1.** A member of an athapaskan people that migrated to arizona and new mexico and utah.<br>**2.** The athapaskan language spoken by the navaho. | *"Once a Navajo tried to buy it for a ladle; loaded with indignant reproaches, he was turned out of the house."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[naval]] | adjective | **1.** Connected with or belonging to or used in a navy. | *"It was his naval way of mentioning my eyes.” Mrs."* — Charles Dickens, *Bleak House* |
| [[navane]] | noun | **1.** A tranquilizer (trade name navane) used to treat schizophrenia. | *"In academic literature, navane designates a tranquilizer (trade name navane) used to treat schizophrenia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[navarino]] | noun | **1.** A decisive naval battle in the war of greek independence (1827); the turkish and egyptian fleet was defeated by an allied fleet of british and french and russian warships. | *"In academic literature, navarino designates a decisive naval battle in the war of greek independence (1827); the turkish and egyptian fleet was defeated by an allied fleet of british and french and russian warships."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nave]] | noun | **1.** The central area of a church. | *"All you gods, In general synod, take away her power; Break all the spokes and fellies from her wheel, And bowl the round nave down the hill of heaven, As low as to the fiends._ POLONIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[navel]] | noun | **1.** A scar where the umbilical cord was attached.<br>**2.** The center point or middle of something. | *"Being pressed to th’ war, Even when the navel of the state was touched, They would not thread the gates."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[navel-gazing]] | noun | **1.** Literally, the contemplation of one's navel, which is an idiom usually meaning complacent self-absorption. | *"In academic literature, navel-gazing designates literally, the contemplation of one's navel, which is an idiom usually meaning complacent self-absorption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[navicular]] | noun | **1.** The largest wrist bone on the thumb side.<br>**2.** Shaped like a boat. | *"In academic literature, navicular designates the largest wrist bone on the thumb side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[navigability]] | noun | **1.** The quality of being suitable for the passage of a ship or aircraft. | *"In academic literature, navigability designates the quality of being suitable for the passage of a ship or aircraft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[navigable]] | adjective | **1.** Able to be sailed on or through safely. | *"First to mention among the means of transportation are the navigable waters--oceans, lakes, rivers, and canals, with the necessary equipment of dredged inlets, harbors, docks, locks, and lighthouses."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[navigate]] | verb | **1.** Travel on water propelled by wind or by other means.<br>**2.** Act as the navigator in a car, plane, or vessel and plan, direct, plot the path and position of the conveyance. | *"They could not navigate the vessel, and were left to the mercy of the winds and waves, or rather to the care of Him who ruleth wind and waves."* — Classic Author, *The wonders of prayer* |
| [[navigation]] | noun | **1.** The guidance of ships or airplanes from place to place.<br>**2.** Ship traffic. | *"Chadband’s being much given to describe himself, both verbally and in writing, as a vessel, he is occasionally mistaken by strangers for a gentleman connected with navigation, but he is, as he expresses it, “in the ministry.” Mr."* — Charles Dickens, *Bleak House* |
| [[navigational]] | adjective | **1.** Of or relating to navigation. | *"She and the tug driver exchanged salutations and prattled navigational details as the escort moved off with the Raven following like an elephant leashed to a flea."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[navigator]] | noun | **1.** The ship's officer in charge of navigation.<br>**2.** The member of an aircrew who is responsible for the aircraft's course. | *"Hendrik Hamel might be one time part-owner of the old _Sparwehr_, with a navigator’s knowledge of the stars and deep versed in books, but with women, no, there I would not give him better."* — Jack London, *The Jacket (The Star-Rover)* |
| [[navratilova]] | noun | **1.** United states tennis player (born in czechoslovakia) who won nine wimbledon women's singles championships (born in 1956). | *"In academic literature, navratilova designates united states tennis player (born in czechoslovakia) who won nine wimbledon women's singles championships (born in 1956)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[navy]] | noun | **1.** An organization of military vessels belonging to a country and available for sea warfare.<br>**2.** A dark shade of blue. | *"And that is it Hath made me rig my navy, at whose burden The angered ocean foams, with which I meant To scourge th’ ingratitude that despiteful Rome Cast on my noble father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unnavigable]] | adjective | **1.** Incapable of being navigated. | *"The grey, forbidding mountains, showing hardly a foothold for man or beast, tree or house, matched the grey, swirling river, here unnavigable even for rafts."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Carrying]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NAV
  </div>
</div>
