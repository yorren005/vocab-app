---
status: unread
type: root_dashboard
---
# Dashboard — sex
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sex-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“six”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **sex** means six. It refers to the number six or a sixfold grouping. In English, this root forms words such as *sextant*, *sextet*, *sextuple*, and *sextuplet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: six
> The root **sex** means six. It refers to the number six or a sixfold grouping. In English, this root forms words such as *sextant*, *sextet*, *sextuple*, and *sextuplet*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Six</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *sextant* and *sextet*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sex** comes from a Latin word that means *"six"*.
  - At its core, it describes six.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **sex** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of six.
  - **Mental & Social**: How people experience, organize, or communicate about six.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Sextant**: An instrument with a graduated arc of used in celestial navigation for measuring the angular distance between objects.
  - **Sextet**: A group of six people playing music or singing together.
  - **Sextuple**: Consisting of six parts or elements.
  - **Sextuplet**: Each of six children born at one birth.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sex</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sex** builds vocabulary through cardinal, ordinal, and fractional Latin forms:
> - **Fractional & Navigational Stem `sext-` (< *sextāns* "one-sixth of a circle"):**
>   - *sextāns, sextantis* $\to$ *sextant* ("celestial navigational instrument with a $60^\circ$ arc").
>   - *sextus* + Italian *-etto* $\to$ *sextet* ("group or piece for six performers").
>   - *sextīlis* $\to$ *sextile* ("sixty-degree astrological aspect, $1/6$ of the zodiac").
>   - *sextuplus* $\to$ *sextuple*, *sextuplet* ("sixfold; six offspring born at once").
> - **Compound Temporal Words:**
>   - *sex* + *mēnsis* ("month") $\to$ Latin *semestris* $\to$ *semester* ("six-month academic period").
>   - *sexta* (*hōra* "sixth hour") $\to$ Spanish *siesta* ("midday rest").
>   - *bis* ("twice") + *sextus* ("sixth") $\to$ *bissextile* ("pertaining to a leap year").

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
> Although fundamentally denoting **"six"**, the root adapts to diverse practical disciplines:
> - **Marine Navigation & Cartography:** *sextant* (measuring celestial angular altitudes at sea).
> - **Chamber Music & Jazz Polyphony:** *sextet* (six-piece ensembles, Brahms's String Sextets).
> - **University & Academic Scheduling:** *semester* (half-year academic instructional term).
> - **Mediterranean Cultural Anthropology:** *siesta* (midday post-prandial rest in hot climates).
> - **Astrology & Geometry:** *sextile* (benefic 60-degree planetary aspect).
> - **Obstetrics & Multiple Births:** *sextuple*, *sextuplet* (sixfold increase, six children at one birth).
> - **Calendrical Astronomy:** *bissextile* (quadrennial leap-day calculation).

---

## 🔀 4. Prefix & Combining Dynamics on sex

### Combining Form Dynamics

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `sext-` + `ans` | sixth part | **[[sextant]]** | Instrument with a $60^\circ$ arc used for celestial navigation. |
| `sex` + `mēnsis` | six + month | **semester** | A half-year term in a school or university, typically lasting 15–18 weeks. |
| `sexta` + `hōra` | sixth + hour | **siesta** | An afternoon rest or nap, especially one taken during the heat of the day. |
| `sextu-` + `plicāre` | six + fold | **[[sextuple]]** | Consisting of six parts; six times as great. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-et` | Noun (Ensemble / Set) | **[[sextet]]** | A group of six people playing music or singing together. |
| `-let` / `-et` | Noun (Diminutive / Sibling) | **sextuplet** | Each of six children born to the same mother at one birth. |
| `-ile` | Adjective / Noun (Aspect) | **sextile** | An aspect of $60^\circ$ between two planets in astrology. |
| `-ile` | Adjective (Calendrical) | **bissextile** | Pertaining to a leap year having an intercalary day. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🚢 **Maritime Navigation & Aeronautics** | *sextant*, *index mirror*, *horizon glass* | Celestial sight reduction, measuring solar noon altitude for latitude. |
| 🎻 **Chamber Music & Jazz** | *sextet* | The Thelonious Monk Sextet, Tchaikovsky's Souvenir de Florence string sextet. |
| 🎓 **Higher Education & Academic Calendars** | *semester*, *semester credit hours* | Fall and spring academic terms, course accreditation scheduling. |
| 🌍 **Cultural Anthropology & Physiology** | *siesta* | Circadian dip in core body temperature, Mediterranean work-rest cycles. |
| 🔭 **Astrology & Coordinate Geometry** | *sextile* | Harmonious planetary aspect equal to one-sixth of the celestial sphere. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[desex]] | verb | **1.** Make infertile. | *"In academic literature, desex designates make infertile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desexualise]] | verb | **1.** Direct one's libidinous urges into another direction.<br>**2.** Make infertile. | *"In academic literature, desexualise designates direct one's libidinous urges into another direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desexualize]] | verb | **1.** Direct one's libidinous urges into another direction.<br>**2.** Make infertile. | *"In academic literature, desexualize designates direct one's libidinous urges into another direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intersex]] | noun | **1.** One having both male and female sexual characteristics and organs; at birth an unambiguous assignment of male or female cannot be made. | *"In academic literature, intersex designates one having both male and female sexual characteristics and organs; at birth an unambiguous assignment of male or female cannot be made."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intersexual]] | adjective | **1.** Existing or occurring between the sexes.<br>**2.** Having sexual characteristics intermediate between those of male and female. | *"In academic literature, intersexual designates existing or occurring between the sexes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsexual]] | adjective | **1.** Not having or involving sex. | *"In academic literature, nonsexual designates not having or involving sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oversexed]] | adjective | **1.** Having excessive sexual desire or appeal. | *"In academic literature, oversexed designates having excessive sexual desire or appeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sex]] | noun | **1.** Activities associated with sexual intercourse.<br>**2.** Either of the two categories (male or female) into which most organisms are divided. | *"Now, by my faith and honour, If seriously I may convey my thoughts In this my light deliverance, I have spoke With one that in her sex, her years, profession, Wisdom, and constancy, hath amaz’d me more Than I dare blame my weakness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sexagenarian]] | noun | **1.** Someone whose age is in the sixties.<br>**2.** Being from 60 to 69 years old. | *"In academic literature, sexagenarian designates someone whose age is in the sixties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexagesimal]] | adjective | **1.** Of or relating to or reckoning in sixtieths. | *"In academic literature, sexagesimal designates of or relating to or reckoning in sixtieths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexcapade]] | noun | **1.** A sexual escapade; an illicit affair. | *"In academic literature, sexcapade designates a sexual escapade; an illicit affair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexed]] | verb | **1.** Stimulate sexually.<br>**2.** Tell the sex (of young chickens). | *"In academic literature, sexed designates stimulate sexually."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexiness]] | noun | **1.** The arousal of feelings of sexual desire. | *"In academic literature, sexiness designates the arousal of feelings of sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexism]] | noun | **1.** Discriminatory or abusive behavior towards members of the opposite sex. | *"In academic literature, sexism designates discriminatory or abusive behavior towards members of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexist]] | noun | **1.** A man with a chauvinistic belief in the inferiority of women.<br>**2.** Discriminatory on the basis of sex (usually said of men's attitude toward women). | *"In academic literature, sexist designates a man with a chauvinistic belief in the inferiority of women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexless]] | adjective | **1.** Having no or imperfectly developed or nonfunctional sex organs.<br>**2.** Having no sexual desire. | *"In academic literature, sexless designates having no or imperfectly developed or nonfunctional sex organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexlessness]] | noun | **1.** Having no evident sex or sex organs. | *"In academic literature, sexlessness designates having no evident sex or sex organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sext]] | noun | **1.** The fourth of the seven canonical hours; about noon. | *"The "expressions" are said to go back to Xenophanes (cited by Sext."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[sextant]] | noun | **1.** A unit of angular distance equal to 60 degrees.<br>**2.** A measuring instrument for measuring the angular distance between celestial objects; resembles an octant. | *"Captain Nemo, by the help of his sextant, took the altitude of the sun, which ought also to give the latitude."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[sextet]] | noun | **1.** A musical composition written for six performers.<br>**2.** The cardinal number that is the sum of five and one. | *"In academic literature, sextet designates a musical composition written for six performers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sextette]] | noun | **1.** Six performers or singers who perform together.<br>**2.** A set of six similar things considered as a unit. | *"In academic literature, sextette designates six performers or singers who perform together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sextillion]] | noun | **1.** The number that is represented as a one followed by 21 zeros. | *"In academic literature, sextillion designates the number that is represented as a one followed by 21 zeros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexton]] | noun | **1.** United states poet (1928-1974).<br>**2.** An officer of the church who is in charge of sacred objects. | *"Why, e’en so: and now my Lady Worm’s; chapless, and knocked about the mazard with a sexton’s spade."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sextuple]] | adjective | **1.** Having six units or components. | *"In academic literature, sextuple designates having six units or components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sextuplet]] | noun | **1.** The cardinal number that is the sum of five and one. | *"In academic literature, sextuplet designates the cardinal number that is the sum of five and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexual]] | adjective | **1.** Of or relating to or characterized by sexuality.<br>**2.** Having or involving sex. | *"Should a party of villagers have gone to make salt, all sexual intercourse is forbidden among the people of the village, until the people who have gone to make the salt (from grass) return."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[sexualise]] | verb | **1.** Make sexual, endow with sex, attribute sex to. | *"In academic literature, sexualise designates make sexual, endow with sex, attribute sex to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexuality]] | noun | **1.** The properties that distinguish organisms on the basis of their reproductive roles. | *"The word is not confined to sexuality, and grammars always recognize a neuter gender, neither 508:21 male nor female."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[sexualize]] | verb | **1.** Make sexual, endow with sex, attribute sex to. | *"In academic literature, sexualize designates make sexual, endow with sex, attribute sex to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sexually]] | adverb | **1.** With respect to sexuality.<br>**2.** By sexual means. | *"Prevailingly, women are depicted as sexually insatiable, as in a piece written by a man who takes a month's vacation from sex to recoup his strength (pt. 2, p. 12)."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[sexy]] | adjective | **1.** Marked by or tending to arouse sexual desire or interest.<br>**2.** Exciting sexual desire. | *"In academic literature, sexy designates marked by or tending to arouse sexual desire or interest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sussex]] | noun | **1.** A county in southern england on the english channel; formerly an anglo-saxon kingdom that was captured by wessex in the 9th century. | *"Born at Field Place, Horsham, Sussex, on August 4, 1792, simultaneously with the French Revolution, he had more than a drop of wildness in his blood."* — Sydney Waterlow, *Shelley* |
| [[transsexual]] | noun | **1.** A person who has undergone a sex change operation.<br>**2.** A person whose sexual identification is entirely with the opposite sex. | *"In academic literature, transsexual designates a person who has undergone a sex change operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transsexualism]] | noun | **1.** Condition in which a person assumes the identity and permanently acts the part of the gender opposite to his or her biological sex. | *"In academic literature, transsexualism designates condition in which a person assumes the identity and permanently acts the part of the gender opposite to his or her biological sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersexed]] | adjective | **1.** Having a subnormal degree of sexual desire. | *"In academic literature, undersexed designates having a subnormal degree of sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsex]] | verb | **1.** Deprive of sex or sexual powers.<br>**2.** Remove the qualities typical of one's sex. | *"Now the unsexed priests of this Syrian goddess resembled those of Cybele so closely that some people took them to be the same."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[unsexed]] | verb | **1.** Deprive of sex or sexual powers.<br>**2.** Remove the qualities typical of one's sex. | *"Now the unsexed priests of this Syrian goddess resembled those of Cybele so closely that some people took them to be the same."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[unsexy]] | adjective | **1.** Not sexually aroused or arousing. | *"In academic literature, unsexy designates not sexually aroused or arousing."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SEX
  </div>
</div>
