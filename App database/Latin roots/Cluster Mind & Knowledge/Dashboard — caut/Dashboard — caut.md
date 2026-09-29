---
status: unread
type: root_dashboard
---
# Dashboard — caut
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">caut-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to beware”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A lightbulb turning on in your mind when an idea suddenly makes sense.</span>
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

The root **caut** means to beware. It refers to the action of bewaring and carrying out this process. In English, this root forms words such as *observe*, *watch*, *caution*, and *cautious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to beware
> The root **caut** means to beware. It refers to the action of bewaring and carrying out this process. In English, this root forms words such as *observe*, *watch*, *caution*, and *cautious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To beware</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *observe* and *watch*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **caut** comes from a Latin word that means *"to beware"*.
  - At its core, it describes the action of beware.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **caut** in an English word, think of **to beware**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to beware).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Observe**: An everyday English word showing the root's idea of *to beware*.
  - **Watch**: An everyday English word showing the root's idea of *to beware*.
  - **Caution**: Care taken to avoid danger, risk, or error.
  - **Cautious**: Exercising care and foresight to avoid potential hazards.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">caut</mark>, think of <mark class="hl-def">to beware</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root manifests across three primary morphological stems:
>
> - **Supine / Participial Stem `caut-` (*cautus*, *cautum*):**
>   - Adjectival derivation: *cautious*, *cautiously*, *cautiousness*
>   - Negative prefix `in-` ("not") $\to$ *incautious*, *incautiously*, *incautiousness*
>   - Degree prefix `over-` $\to$ *overcautious*, *overcautiously*, *overcautiousness*
> - **Nominal Suffixation Base `caution-` (*cautiō, cautiōnis*):**
>   - Direct noun/verb: *caution*
>   - Adjective of function: *cautionary*
>   - Legal agent / institution (Scots law): *cautioner*, *cautionry*
> - **Temporal Anticipatory Prefix `prae-` $\to$ `precaution-` (*praecautiō*):**
>   - Direct noun/verb: *precaution*
>   - Adjectives: *precautionary*, *precautional*, *precautionous*
>   - Adverb: *precautionally*
> - **Subjunctive Judicial Stem `caveat-` (*caveat* < *cavēre*):**
>   - Direct noun/verb: *caveat*
>   - Legal maxims: *caveat emptor*, *caveat venditor*
>   - Legal agent noun: *caveator*

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
> The root spans five distinct operational territories:
>
> 1. **Cognitive Psychology & Behavioral Temperament:**
>    - Deliberate prudence, circumspection, and calculated hesitation (*cautious steps*, *cautious optimism*).
>    - Rash, heedless, unguarded indiscretion (*an incautious remark*).
>    - Paralyzing, excessive timidity (*overcautious paralysis*).
> 2. **Physical Safety, Engineering & Biosafety:**
>    - Concrete safety barriers, personal protective equipment (PPE), and emergency protocols (*fire precautions*, *universal biosafety precautions*).
> 3. **Criminal Justice & Law Enforcement:**
>    - Formal warnings issued by police in lieu of prosecution (*to receive a formal caution*).
>    - The statutory reading of rights upon criminal arrest (*the police caution: "You do not have to say anything..."*).
> 4. **Commercial, Property & Contract Law:**
>    - The traditional burden on purchasers to inspect goods (*caveat emptor*).
>    - Formal legal holds preventing probate or property transactions (*entering a caveat*).
>    - Scots legal bonds and guarantors (*cautioner*, *cautionry*).
> 5. **Environmental Science, Pharmacology & Literature:**
>    - The global regulatory principle mandating preventive action against unproven but catastrophic ecological threats (*the precautionary principle*).
>    - Fables and moral literature illustrating the disastrous consequences of folly (*cautionary tales*).

---

## 🔀 4. Prefix & Combining Dynamics on caut

### Prefix Dynamics
- **`prae-` / `pre-` ("before, in advance"):** Shifts wariness from a reaction into proactive structural defense $\to$ *precaution*, *precautionary*.
- **`in-` ("not, un-"):** Strips away rational vigilance $\to$ *incautious* (rash, imprudent, unguarded).
- **`over-` ("excessive"):** Amplifies caution into an impediment to decisive action $\to$ *overcautious*.

### Suffix Dynamics
- **`-tion` (Action / State / Legal Instrument):** *caution*, *precaution*.
- **`-ous` (Characterized By / Disposed To):** Possessing wariness as an ingrained habit $\to$ *cautious*, *incautious*, *precautionous*.
- **`-ary` (Serving To / Characterized By):** Functional role of warning or preventive policy $\to$ *cautionary*, *precautionary*.
- **`-er` / `-or` (Legal Agent):** One who warns or stands surety (*cautioner*); one who files a formal court hold (*caveator*).
- **`-ry` (Abstract Institution / Collective Obligation):** The Scots law status of suretyship $\to$ *cautionry*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **International Environmental Law & Governance:** The *precautionary principle* (Principle 15 of the 1992 Rio Declaration and Article 191 of the Treaty on the Functioning of the European Union) mandates that when human activities may lead to morally unacceptable harm that is scientifically plausible but uncertain, actions shall be taken to avoid or diminish that harm.
> - **Infection Control & Hospital Epidemiology:** The CDC mandates *standard precautions*, *contact precautions*, *droplet precautions*, and *airborne precautions* in healthcare facilities to block transmission of infectious pathogens.
> - **Criminal Procedure (England & Wales):** Under the Police and Criminal Evidence Act 1984 (PACE), police officers must recite the statutory *arrest caution* before questioning: *"You do not have to say anything. But it may harm your defence if you do not mention when questioned something which you later rely on in court..."*
> - **Probate & Real Estate Law:** In jurisdictions influenced by English common law, an interested party who suspects a forged will or contested title registers a *caveat* with the registrar, halting probate proceedings until the *caveator* can present objections.
> - **Commercial Contract Jurisprudence:** The doctrine of *caveat emptor* historically dominated sales of real estate and used goods, but has been steadily modified by modern consumer protection statutes and implied warranties of merchantability (*caveat venditor*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cauterant]] | noun | **1.** An instrument or substance used to destroy tissue for medical reasons (eg removal of a wart) by burning it with a hot iron or an electric current or a caustic or by freezing it. | *"In academic literature, cauterant designates an instrument or substance used to destroy tissue for medical reasons (eg removal of a wart) by burning it with a hot iron or an electric current or a caustic or by freezing it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cauterisation]] | noun | **1.** The act of coagulating blood and destroying tissue with a hot iron or caustic agent or by freezing. | *"In academic literature, cauterisation designates the act of coagulating blood and destroying tissue with a hot iron or caustic agent or by freezing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cauterise]] | verb | **1.** Burn, sear, or freeze (tissue) using a hot iron or electric current or a caustic agent.<br>**2.** Make insensitive or callous; deaden feelings or morals. | *"In academic literature, cauterise designates burn, sear, or freeze (tissue) using a hot iron or electric current or a caustic agent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cauterization]] | noun | **1.** The act of coagulating blood and destroying tissue with a hot iron or caustic agent or by freezing. | *"In academic literature, cauterization designates the act of coagulating blood and destroying tissue with a hot iron or caustic agent or by freezing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cauterize]] | verb | **1.** Burn, sear, or freeze (tissue) using a hot iron or electric current or a caustic agent.<br>**2.** Make insensitive or callous; deaden feelings or morals. | *"In academic literature, cauterize designates burn, sear, or freeze (tissue) using a hot iron or electric current or a caustic agent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cautery]] | noun | **1.** An instrument or substance used to destroy tissue for medical reasons (eg removal of a wart) by burning it with a hot iron or an electric current or a caustic or by freezing it.<br>**2.** The act of coagulating blood and destroying tissue with a hot iron or caustic agent or by freezing. | *"In academic literature, cautery designates an instrument or substance used to destroy tissue for medical reasons (eg removal of a wart) by burning it with a hot iron or an electric current or a caustic or by freezing it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caution]] | noun | **1.** The trait of being cautious; being attentive to possible danger.<br>**2.** A warning against certain acts. | *"Nay, ’tis most credible, we here receive it, A certainty, vouch’d from our cousin Austria, With caution, that the Florentine will move us For speedy aid; wherein our dearest friend Prejudicates the business, and would seem To have us make denial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cautionary]] | adjective | **1.** Warding off; - victor schultze.<br>**2.** Serving to warn. | *"They quickened in her when she felt the glow of his life so near her own, but there was a touch of Miranda in Isabel, and no cautionary withdrawal followed."* — Anthony Pryde, *Nightfall* |
| [[cautious]] | noun | **1.** People who are fearful and cautious.<br>**2.** Showing careful forethought. | *"Tulkinghorn, “and as they are short, and as I proceed upon the troublesome principle of begging leave to possess my clients with any new proceedings in a cause”—cautious man Mr."* — Charles Dickens, *Bleak House* |
| [[cautiously]] | adverb | **1.** As if with kid gloves; with caution or prudence or tact.<br>**2.** In a conservative manner. | *"Trius take his big stick along when he comes down to the gate?" she asked, looking cautiously about her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[cautiousness]] | noun | **1.** The trait of being cautious; being attentive to possible danger. | *"I only fear that the sort of cautiousness to which you, I imagine, have been alluding, is merely adopted on his visits to his aunt, of whose good opinion and judgment he stands much in awe."* — Jane Austen, *Pride and Prejudice* |
| [[incaution]] | noun | **1.** The trait of forgetting or ignoring possible danger. | *"Tempted to incaution by the sight of the noble elk standing wounded and at bay, or else excited by its blood, the dog sprang forward."* — W. E. Webb, *Buffalo Land* |
| [[incautious]] | adjective | **1.** Lacking in caution.<br>**2.** Carelessly failing to exercise proper caution. | *"Those were slow, silent, often turbid; flowing over beds of mud into which the incautious wader might sink and vanish unawares."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[incautiously]] | adverb | **1.** Without caution or prudence. | *"His behaviour to herself could now have had no tolerable motive: he had either been deceived with regard to her fortune, or had been gratifying his vanity by encouraging the preference which she believed she had most incautiously shown."* — Jane Austen, *Pride and Prejudice* |
| [[incautiousness]] | noun | **1.** The trait of forgetting or ignoring possible danger. | *"In academic literature, incautiousness designates the trait of forgetting or ignoring possible danger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcautious]] | adjective | **1.** Unnecessarily cautious. | *"But it was soon clear that even some of the older fighting men were beginning to think that perhaps the chief was overcautious."* — F. H. Costello, *Sure-dart* |
| [[precaution]] | noun | **1.** A precautionary measure warding off impending danger or damage or injury etc.<br>**2.** The trait of practicing caution in advance. | *"You may go into Holborn, without precaution, and be run over."* — Charles Dickens, *Bleak House* |
| [[precautional]] | adjective | **1.** Taken in advance to protect against possible danger or failure. | *"In academic literature, precautional designates taken in advance to protect against possible danger or failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precautionary]] | adjective | **1.** Taken in advance to protect against possible danger or failure. | *"Bulstrode with precautionary information for his daughters and servants, and accounting for his allowing no one but himself to enter the room even with food and drink."* — George Eliot, *Middlemarch* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Mind & Knowledge]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAUT
  </div>
</div>
