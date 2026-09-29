---
status: unread
type: root_dashboard
---
# Dashboard — vic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“change, turn, or succession”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **vic** means change, turn, or succession. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *curve*, *wind*, *alternate*, and *vicar*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: change, turn, or succession
> The root **vic** means change, turn, or succession. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *curve*, *wind*, *alternate*, and *vicar*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Change, turn, or succession</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *curve* and *wind*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vic** comes from a Latin word that means *"change, turn, or succession"*.
  - At its core, it describes change, turn, or succession.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **vic** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of change, turn, or succession.
  - **Mental & Social**: How people experience, organize, or communicate about change, turn, or succession.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Curve**: An everyday English word showing the root's idea of *change, turn, or succession*.
  - **Wind**: An everyday English word showing the root's idea of *change, turn, or succession*.
  - **Alternate**: An everyday English word showing the root's idea of *change, turn, or succession*.
  - **Vicar**: An ecclesiastical deputy or representative.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vic</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vic** operates through several distinct morphological engines:
> - **Prepositional Prefix `vice-` (from Latin ablative *vice* "in the place of"):** Attaches to executive titles to denote the second-in-command or delegated stand-in:
>   - *vice-* + *president* $\to$ *vice-president*
>   - *vice-* + *chancellor* $\to$ *vice-chancellor*
>   - *vice-* + *admiral* $\to$ *vice-admiral*
>   - *vice-* + *consul* $\to$ *vice-consul*
>   - *vice-* + *gerere* ("to carry, execute") $\to$ *vicegerent*
>   - *vice* + *versā* ("turned") $\to$ *vice versa*
> - **Adjectival / Agent Base `vicar-` (from Latin *vicārius*):** Forms ecclesiastical, administrative, and psychological vocabulary:
>   - *vicar*, *vicarage*, *vicarial*, *vicariate*, *vicarious*, *vicariously*, *vicariousness*
> - **Romance Vernacular Reductions (`vis-` / `vice-roi`):**
>   - *vice* + *roi* (French for "king") $\to$ *viceroy*, *viceregal*, *viceroyalty*
>   - *vice* + *comte* (French for "count") $\to$ *viscount*, *viscountess*, *viscounty*
> - **Abstract Inchoative / Temporal Stem `vicissitūd-` (from Latin *vicissitūdō*):** Captures cosmic, meteorological, and economic shifts:
>   - *vicissitude*, *vicissitudinous*

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
> The root manifests across five distinct conceptual spheres:
> - **Constitutional & Corporate Succession:** Executive officers designated to assume power upon the death, disability, or absence of the principal (*vice-president*, *vice-presidency*, *vice-chancellor*, *vice-chair*).
> - **Imperial & Feudal Aristocracy:** Sovereign representatives ruling entire continents or colonies (*viceroy*, *viceregal*, *viceroyalty*), noble peerage rankings originating from deputy counts (*viscount*, *viscountess*), and monarchical delegates (*vicegerent*).
> - **Ecclesiastical Governance:** The earthly administration of the Catholic and Anglican communions (*Vicar of Christ*, *vicar*, *vicarage*, *vicariate*).
> - **Jurisprudence & Tort Liability:** Imputing legal fault and financial liability to an innocent principal for the tortious acts of an agent (*vicarious liability*).
> - **Psychology, Literature & Philosophy:** Experiencing emotions through empathetic proxy (*vicarious*, *vicariously*) and the unpredictable changes of life and history (*vicissitude*, *vicissitudinous*).

---

## 🔀 4. Prefix & Combining Dynamics on vic

### Suffix Dynamics (Functional & Grammatical Shift)
- **`-age` (Residence / Domain):** Denotes the dwelling or parish living assigned to a vicar: *vicar* $\to$ *vicarage*.
- **`-ate` (Office / Jurisdiction):** Denotes the territory or authority of a vicar: *vicar* $\to$ *vicariate*.
- **`-ial` / `-ious` (Relational Adjective):** Forms descriptive adjectives denoting delegated nature: *vicarial*, *vicarious*.
- **`-ly` / `-ness` (Manner / State):** Modifies the psychological experience of surrogacy: *vicariously*, *vicariousness*.
- **`-ude` (Abstract State):** Formed from Latin *-tūdō* to denote perpetual fluctuation: *vicis* $\to$ *vicissitūdō* $\to$ *vicissitude*.
- **`-ess` (Feminine Honorific):** Denotes a female viscount or wife of a viscount: *viscount* $\to$ *viscountess*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Torts & Agency Law (*Vicarious Liability*):** The common-law doctrine of *respondeat superior* ("let the master answer"), where an employer is strictly liable for the negligence or intentional torts of an employee committed within the course and scope of employment, regardless of personal fault.
> - **Constitutional Law (The 25th Amendment):** The role of the American *Vice President* as President of the Senate and immediate constitutional successor to the Presidency in cases of removal, death, resignation, or inability.
> - **Higher Education Administration:** In British, Australian, and Commonwealth universities, the *Vice-Chancellor* is the de facto chief executive officer and academic head of the university, while the Chancellor serves as ceremonial figurehead.
> - **Ecclesiology & Canon Law:** The *Vicar General* (the principal deputy of a diocesan bishop), the *Vicar Forane* (dean), and the papal title *Vicārius Iēsu Chrīstī*.
> - **Colonial History:** The Council of the Indies and the Spanish Viceroys of New Spain (Mexico City) and Peru (Lima); the British Raj governed by the Viceroy and Governor-General of India (1858–1947).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advice]] | noun | **1.** A proposal for an appropriate course of action. | *"Farewell, young lords; these warlike principles Do not throw from you; and you, my lords, farewell; Share the advice betwixt you; if both gain all, The gift doth stretch itself as ’tis receiv’d, And is enough for both."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arvicola]] | noun | **1.** In some classifications considered synonymous with microtus. | *"In academic literature, arvicola designates in some classifications considered synonymous with microtus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convict]] | noun | **1.** A person serving a sentence in a jail or prison.<br>**2.** A person who has been convicted of a criminal offense. | *"Before I be convict by course of law, To threaten me with death is most unlawful."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convictfish]] | noun | **1.** Greenling with whitish body marked with black bands. | *"In academic literature, convictfish designates greenling with whitish body marked with black bands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conviction]] | noun | **1.** An unshakable belief in something without need for proof or evidence.<br>**2.** (criminal law) a final judgment of guilty in a criminal case and the punishment that is imposed. | *"Oh, mama, I have to go and see Apollonie," she would repeatedly say with firm conviction to her mother."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[device]] | noun | **1.** An instrumentality invented for a particular purpose.<br>**2.** Something in an artistic work designed to achieve a particular effect. | *"Yet he’s gentle, never schooled and yet learned, full of noble device, of all sorts enchantingly beloved, and indeed so much in the heart of the world, and especially of my own people, who best know him, that I am altogether misprized."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[devices]] | noun | **1.** An inclination or desire; used in the plural in the phrase `left to your own devices'.<br>**2.** An instrumentality invented for a particular purpose. | *"But orderly to end where I begun, Our wills and fates do so contrary run That our devices still are overthrown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evict]] | verb | **1.** Expel or eject without recourse to legal process.<br>**2.** Expel from one's property or force to move out by a legal process. | *"What do you do with gipsies? evict 'em, I suppose." He flung a second question at Val which made the son of a vicarage knit his brows."* — Anthony Pryde, *Nightfall* |
| [[eviction]] | noun | **1.** Action by a landlord that compels a tenant to leave the premises (as by rendering the premises unfit for occupancy); no physical expulsion or legal process is involved.<br>**2.** The expulsion of someone (such as a tenant) from the possession of land by process of law. | *"Two months after these evictions, two friends of mine and I had occasion to go on a vessel to the adjoining island of Sariba, in order to get our water casks filled."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[reconvict]] | verb | **1.** Convict anew. | *"In academic literature, reconvict designates convict anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicar]] | noun | **1.** A roman catholic priest who acts for another higher-ranking clergyman.<br>**2.** (episcopal church) a clergyman in charge of a chapel. | *"And to that end I have been with Sir Oliver Martext, the vicar of the next village, who hath promised to meet me in this place of the forest and to couple us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vicar-general]] | noun | **1.** (roman catholic church) an administrative deputy who assists a bishop. | *"In academic literature, vicar-general designates (roman catholic church) an administrative deputy who assists a bishop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicarage]] | noun | **1.** An official residence provided by a church for its parson or vicar or rector. | *"Some two or three years before Angel’s appearance at the Marlott dance, on a day when he had left school and was pursuing his studies at home, a parcel came to the Vicarage from the local bookseller’s, directed to the Reverend James Clare."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vicarial]] | adjective | **1.** Of or relating to or characteristic of a vicar. | *"In academic literature, vicarial designates of or relating to or characteristic of a vicar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicariate]] | noun | **1.** The religious institution under the authority of a vicar. | *"In academic literature, vicariate designates the religious institution under the authority of a vicar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicarious]] | adjective | **1.** Experienced at secondhand.<br>**2.** Occurring in an abnormal part of the body instead of the usual site involved in that function. | *"Vicarious suffering 36:30 Religious history repeats itself in the suf- fering of the just for the unjust."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[vicariously]] | adverb | **1.** Indirectly, as, by, or through a substitute. | *"My sister, having so much to do, was going to church vicariously, that is to say, Joe and I were going."* — Charles Dickens, *Great Expectations* |
| [[vicarship]] | noun | **1.** The religious institution under the authority of a vicar. | *"In academic literature, vicarship designates the religious institution under the authority of a vicar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vice]] | noun | **1.** Moral weakness.<br>**2.** A specific form of evildoing. | *"So thou be good, slander doth but approve, Thy worth the greater being wooed of time, For canker vice the sweetest buds doth love, And thou present’st a pure unstained prime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vice versa]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vic within the domain of Law, Justice & Feudal.<br>**2.** A technical or specialized form exhibiting the properties of vic in systematic terminology. | *"In academic literature, vice versa designates pertaining to, derived from, or characteristic of latin vic within the domain of law, justice & feudal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vice-]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vic within the domain of Law, Justice & Feudal.<br>**2.** A technical or specialized form exhibiting the properties of vic in systematic terminology. | *"In academic literature, vice- designates pertaining to, derived from, or characteristic of latin vic within the domain of law, justice & feudal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vice-chancellor]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vic within the domain of Law, Justice & Feudal.<br>**2.** A technical or specialized form exhibiting the properties of vic in systematic terminology. | *"In academic literature, vice-chancellor designates pertaining to, derived from, or characteristic of latin vic within the domain of law, justice & feudal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vice-presidency]] | noun | **1.** The tenure of a vice president.<br>**2.** The office and function of a vice president. | *"In academic literature, vice-presidency designates the tenure of a vice president."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vice-presidential]] | adjective | **1.** Relating to a vice president or vice-presidency. | *"In academic literature, vice-presidential designates relating to a vice president or vice-presidency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vice-regent]] | noun | **1.** A regent's deputy. | *"In academic literature, vice-regent designates a regent's deputy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicegerent]] | noun | **1.** Someone appointed by a ruler as an administrative deputy. | *"KING. [_Reads_.] _Great deputy, the welkin’s vicegerent and sole dominator of Navarre, my soul’s earth’s god and body’s fostering patron—_ COSTARD."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vicenary]] | adjective | **1.** Of or relating to or based on 20. | *"In academic literature, vicenary designates of or relating to or based on 20."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicennial]] | adjective | **1.** Occurring once every 20 years. | *"In academic literature, vicennial designates occurring once every 20 years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viceregal]] | adjective | **1.** Of or relating to a viceroy. | *"His finger leaped and struck point after point, vibrating. —T is viceregal lodge."* — James Joyce, *Ulysses* |
| [[vicereine]] | noun | **1.** Wife of a viceroy.<br>**2.** Governor of a country or province who rules as the representative of his or her king or sovereign. | *"Our gracious and popular vicereine."* — James Joyce, *Ulysses* |
| [[viceroy]] | noun | **1.** Governor of a country or province who rules as the representative of his or her king or sovereign.<br>**2.** Showy american butterfly resembling the monarch but smaller. | *"And, Charles, upon condition thou wilt swear To pay him tribute and submit thyself, Thou shalt be placed as viceroy under him, And still enjoy the regal dignity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[viceroyalty]] | noun | **1.** A district or province governed by a viceroy. | *"In academic literature, viceroyalty designates a district or province governed by a viceroy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viceroyship]] | noun | **1.** The position of viceroy. | *"In academic literature, viceroyship designates the position of viceroy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicia]] | noun | **1.** Widely distributed genus of annual or perennial and often climbing herbs. | *"VETCH BRAND; sori few and small, scattered, intermixed with pustules of _Trichobasis_; sporidia obovate, on rather long pedicels, of a tawny colour, and slightly constricted at the septum; epispore smooth.—On leaves of _Vicia sepium_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vicinal]] | adjective | **1.** Belonging to or limited to a vicinity. | *"In academic literature, vicinal designates belonging to or limited to a vicinity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicinity]] | noun | **1.** A surrounding or nearby region. | *"I'll find somebody for him," she said, eagerly running down the incline to the door, in whose vicinity Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vicious]] | adjective | **1.** (of persons or their actions) able or disposed to inflict pain or suffering.<br>**2.** Having the nature of vice. | *"He is deformed, crooked, old, and sere, Ill-fac’d, worse bodied, shapeless everywhere; Vicious, ungentle, foolish, blunt, unkind, Stigmatical in making, worse in mind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[viciously]] | adverb | **1.** In a vicious manner. | *"Rochester flung me behind him: the lunatic sprang and grappled his throat viciously, and laid her teeth to his cheek: they struggled."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[viciousness]] | noun | **1.** The trait of extreme cruelty. | *"But when we in our viciousness grow hard— O misery on’t!—the wise gods seal our eyes, In our own filth drop our clear judgments, make us Adore our errors, laugh at’s while we strut To our confusion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vicissitude]] | noun | **1.** A variation in circumstances or fortune at different times in your life or in the development of something.<br>**2.** Mutability in life or nature (especially successive alternation from one condition to another). | *"A correspondent of the _Guide to Holiness_ says: "We remember a poor woman who had had a life of sore vicissitude which she bore with remarkable Christian cheerfulness; and after a time of the suspension of trial, a bad prospect came in sight."* — Classic Author, *The wonders of prayer* |
| [[victim]] | noun | **1.** An unfortunate person who suffers from some adverse circumstance.<br>**2.** A person who is tricked or swindled. | *"His manner is the gravely impressive manner of a man who has not committed himself in life otherwise than as he has become the victim of a tender sorrow of the heart."* — Charles Dickens, *Bleak House* |
| [[victimisation]] | noun | **1.** An act that exploits or victimizes someone (treats them unfairly). | *"In academic literature, victimisation designates an act that exploits or victimizes someone (treats them unfairly)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[victimise]] | verb | **1.** Make a victim of.<br>**2.** Punish unjustly. | *"Six weeks--appropinquity--opportunity--had victimised him completely."* — William Makepeace Thackeray, *Vanity Fair* |
| [[victimised]] | verb | **1.** Make a victim of.<br>**2.** Punish unjustly. | *"Six weeks--appropinquity--opportunity--had victimised him completely."* — William Makepeace Thackeray, *Vanity Fair* |
| [[victimiser]] | noun | **1.** A person who victimizes others. | *"In academic literature, victimiser designates a person who victimizes others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[victimization]] | noun | **1.** Adversity resulting from being made a victim.<br>**2.** An act that exploits or victimizes someone (treats them unfairly). | *"In academic literature, victimization designates adversity resulting from being made a victim."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[victimize]] | verb | **1.** Make a victim of.<br>**2.** Punish unjustly. | *"She, poor innocent creature, is left to be victimized by an old man who has outlived his wits."* — graf Leo Tolstoy, *War and Peace* |
| [[victimized]] | verb | **1.** Make a victim of.<br>**2.** Punish unjustly. | *"She, poor innocent creature, is left to be victimized by an old man who has outlived his wits."* — graf Leo Tolstoy, *War and Peace* |
| [[victimizer]] | noun | **1.** A person who victimizes others. | *"For though she worked up Miss Crawley to a proper dislike of her disobedient nephew, the invalid had a great hatred and secret terror of her victimizer, and panted to escape from her."* — William Makepeace Thackeray, *Vanity Fair* |
| [[victor]] | noun | **1.** A combatant who is able to defeat rivals.<br>**2.** The contestant who wins the contest. | *"And, Caius Lucius, Although the victor, we submit to Cæsar And to the Roman empire, promising To pay our wonted tribute, from the which We were dissuaded by our wicked queen, Whom heavens in justice, both on her and hers, Have laid most heavy hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[victoria]] | noun | **1.** Queen of great britain and ireland and empress of india from 1837 to 1901; the last hanoverian ruler of england (1819-1901).<br>**2.** (roman mythology) goddess of victory; counterpart of greek nike. | *"The modern[9] movement for the minimum wage began in Victoria in 1896, and it soon extended to nearly all the other Australasian states."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[victorian]] | noun | **1.** A person who lived during the reign of victoria.<br>**2.** Of or relating to queen victoria of great britain or to the age in which she ruled. | *"But I ask all good and gentle readers to be so kind as to forget this, and to refuse steadfastly to believe that there are any inhabitants of a Victorian Wessex outside the pages of this and the companion volumes in which they were first discovered."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[victoriana]] | noun | **1.** Collection of materials of or characteristic of the victorian era. | *"In academic literature, victoriana designates collection of materials of or characteristic of the victorian era."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[victorious]] | adjective | **1.** Having won.<br>**2.** Experiencing triumph. | *"Know, my hearts, I hope well of tomorrow, and will lead you Where rather I’ll expect victorious life Than death and honour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[victoriously]] | adverb | **1.** In a victorious manner. | *"The fourth objective of the Plan, the transatlantic project, on which its members have embarked, has, four years ahead of schedule, been, to all intents and purposes, victoriously achieved."* — Effendi Shoghi, *Citadel of Faith* |
| [[victory]] | noun | **1.** A successful ending of a struggle or contest. | *"Upon your sword Sit laurel victory, and smooth success Be strewed before your feet!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[victrola]] | noun | **1.** A brand of gramophone. | *"They were speaking of the Victrola recently purchased for the Crow Hill school when Martin asked, "Have you ever heard Isabel Souders play?" "Yes, at Millersville."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[victual]] | noun | **1.** Any substance that can be used as food.<br>**2.** Supply with food. | *"I must go victual Orleans forthwith. [_A short alarum."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[victualer]] | noun | **1.** An innkeeper (especially british).<br>**2.** A supplier of victuals or supplies to an army. | *"In academic literature, victualer designates an innkeeper (especially british)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[victualler]] | noun | **1.** An innkeeper (especially british).<br>**2.** A supplier of victuals or supplies to an army. | *"At least my friends are all in the _public_ line, and it might not suit to have it moved at a special vestry by John Gage at the Crown and Horseshoe, licensed victualler, and seconded by Joseph Horner of the Green Dragon, ditto, that the Rev."* — Anne Gilchrist, *Mary Lamb* |
| [[victuals]] | noun | **1.** A stock or supply of foods.<br>**2.** A source of materials to nourish the body. | *"But that it eats our victuals, I should think Here were a fairy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vicugna]] | noun | **1.** A genus of camelidae. | *"In academic literature, vicugna designates a genus of camelidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vicuna]] | noun | **1.** The wool of the vicuna.<br>**2.** A soft wool fabric made from the fleece of the vicuna. | *"In academic literature, vicuna designates the wool of the vicuna."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VIC
  </div>
</div>
