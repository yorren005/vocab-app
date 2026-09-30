# Agent Instructions: Vocabulary Word Creation & Curation Standard

> [!IMPORTANT]
> **Mandatory Guidelines for All Future Agents Working on `App database/`**
> Read this document in full before creating, editing, or enriching any vocabulary word `.md` files in `App database/Latin roots`, `App database/Greek roots`, or `App database/English vocabulary master`.

---

## 1. Individualized Word-by-Word Approach (No Generalized Bulk Scripts)

1. **Every Word Is Unique:**
   - The database contains ~50,000 words across classical Latin roots, Greek roots, and English Vocabulary Master semantic clusters. Each word has its own distinct usage profile, register, grammatical behavior, and domain.
   - **NEVER** run a single blind script to bulk-extract regex matches and append generalized templates across the database.
   - **NEVER** force every word into a rigid, one-size-fits-all template. How a word's secondary definition and example citations are framed depends entirely on the nature of that specific word (e.g., biochemical vs. poetic vs. legal vs. everyday).

2. **Strict Sense & Homograph Disambiguation:**
   - Always verify that definitions and example sentences match the **exact lexical sense and etymological root** of the headword.
   - Never pull blind substring or dialectal matches (for example, never match dialectal *"actin'"* [slang for *acting*] when curating the cellular protein **`actin`**).

---

## 2. Authoritative Definitions & Multi-Source Lookup Cascade

Every word entry must have two high-quality, authoritative, yet simple-to-understand definitions inside the `> [!book]` callout:

- **1. Primary Definition:**
  - The authoritative core dictionary definition written in clear, accessible modern English so the reader grasps the meaning immediately.
- **2. Secondary / Nuanced Definition:**
  - Must **never** duplicate the Primary Definition.
  - Tailored to the specific word: provides the genuine secondary dictionary sense, figurative/extended usage, connotative nuance, or specialized domain function (e.g., how a scientific, medical, anatomical, or philosophical term operates in context).

### Mandatory Multi-Source Lookup Cascade (Until Dictionary Definition Is Found)
If an authoritative dictionary definition is not immediately available, the agent **must** search across multiple tools and sources in the following order until the true dictionary definition is found:

1. **All Available MCP Servers:**
   - `Dictionary-MCP` (`meaning`, `part_of_speech`, `full_info`, `stems`, `stem_info`)
   - `lexicon-mcp` (`dictionary_lookup`, `dictionary_synonyms`, `dictionary_relations`, `dictionary_semantic_neighbors`)
   - `wikipedia` MCP (`get_summary`, `get_article`, `search_wikipedia`) for scientific, taxonomic, anatomical, and encyclopedic terms
   - `project-gutenberg` MCP (`search_books`, `get_passage`) for literary context
   - `philosophy` MCP (`sep_search`, `iep_search`, `philosophy_lookup`) for philosophical/epistemological terms
   - `parallel-search` MCP (`web_search`, `web_fetch`)
2. **`crw` (fastCRW Web Scraper CLI & MCP):**
   - Use `crw <url>`, `crw <url> --js`, `crw_scrape`, or `crw_extract` to scrape authoritative dictionary pages directly:
     - Merriam-Webster (`https://www.merriam-webster.com/dictionary/<word>`)
     - Wiktionary (`https://en.wiktionary.org/wiki/<word>`)
     - Collins Dictionary / American Heritage / Century Dictionary / OneLook
     - Online Etymology Dictionary (`https://www.etymonline.com/word/<word>`)
3. **Web Search (`search_web` & `read_url_content`):**
   - Query across general and specialized web sources (medical lexicons, botanical/zoological glossaries, legal dictionaries, literary archives).
4. **Agent Generation (Last Resort Only):**
   - Rely on your own lexical/morphological generation **only as an absolute last resort** when exhaustive checks across all MCPs, `crw` dictionary scrapes, and web searches confirm the word is an unindexed rare morphological derivative.

---

## 3. Three Concise, Authentic Literary / Contextual Citations

Every word entry must contain **3 example sentences** inside `> [!quote] 💬 Contextual Usage & Authentic Quotations`:

1. **Small, Punchy Literary & Contextual Citations:**
   - Keep each citation **concise and uncluttered** (a crisp, self-contained 1-sentence quotation or usage phrase) so the user can read and grasp the word effortlessly on mobile.
2. **Organic Source Diversity:**
   - Citations can come from any authentic source appropriate to the word: classic literature and books, scientific/academic texts (for scientific definitions), notable quotes of famous people, essays, blogs, journalism, and reputable internet sources.
   - Never repeat the same author or book multiple times within the same word entry.
   - Never use synthetic placeholder sentences such as `*"In academic literature, <word> designates..."*`.
3. **Target Word Highlighting:**
   - Bold the target word (`**word**`) inside the italicized quotation so the eye locks onto its syntactic usage immediately.

---

## 4. Original App Tracking Button at the Top of the Definition

To optimize every `.md` file for **Tab 2** (the TikTok-style word card feed) and the **Original Note** view:

1. **In `.md` Word Files:**
   - Place the `> [!status] 🎯 **Status:**` callout and its `dataviewjs` **Apple Glide Toggle (`.apple-c`)** directly **at the top of the definition**—immediately below `# <word>` and right above `> [!book] 📖 Definitions & Semantic Range`.
2. **In Mobile App Tab 2 (`mobile-app.js`):**
   - The original app's `.apple-c` status tracking button (`unread ➔ learning ➔ learned`) must also be mounted right at the top of the definition box on Tab 2.

---

## 5. Canonical Markdown Template for Individual Word Notes

Use this exact structure when creating or updating word `.md` files:

```markdown
---
latin_root: "[[Dashboard — <root>]]"
cluster: "[[Cluster <Name>]]"
status: unread
---
# <word>

> [!status] 🎯 **Status:**

```dataviewjs
if(!document.getElementById('apple-toggle-css')){const s=document.createElement('style');s.id='apple-toggle-css';s.textContent=':root{--apple-red:#FF375F;--apple-red-glow:rgba(255,55,95,0.45);--apple-amber:#FF9F0A;--apple-amber-glow:rgba(255,159,10,0.45);--apple-green:#30D158;--apple-green-glow:rgba(48,209,88,0.45)}.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--background-secondary,#111624);border:1px solid var(--background-modifier-border,#232d42);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--text-muted,#3b4b6b);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.35)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:48px;height:18px;background:var(--background-primary,#090d17);border-radius:999px;border:1px solid var(--background-modifier-border,#1c2436);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--text-faint,#334155);opacity:.6}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:14px;height:14px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:5px;height:5px;border-radius:999px;background:#fff;box-shadow:0 0 4px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--apple-red);box-shadow:0 0 12px var(--apple-red),0 0 20px var(--apple-red-glow)}.apple-c .halo-c.p1{transform:translateX(15px);background:var(--apple-amber);box-shadow:0 0 12px var(--apple-amber),0 0 20px var(--apple-amber-glow)}.apple-c .halo-c.p2{transform:translateX(30px);background:var(--apple-green);box-shadow:0 0 12px var(--apple-green),0 0 20px var(--apple-green-glow)}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:48px}.apple-c .label.unread{color:var(--apple-red)}.apple-c .label.learning{color:var(--apple-amber)}.apple-c .label.learned{color:var(--apple-green)}';document.head.appendChild(s);}
const p = dv.current();
const rawStatus = p.status || "unread";
const states = [{ key: 'unread', label: 'unread', cls: 'unread', p: 'p0' }, { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' }, { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }];
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
toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    track.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
    label.className = 'label ' + nxt.cls;
    label.textContent = nxt.label;
    const file = app.vault.getAbstractFileByPath(p.file.path);
    if (file) {
        await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
        new Notice('' + (p.file.name) + ': marked ' + (nxt.key) + '');
    }
});
dv.container.appendChild(toggle);
```

> [!book] 📖 Definitions & Semantic Range
> 1. **Primary Definition**: <Clear, authoritative, easy-to-understand core dictionary definition>
> 2. **Secondary / Nuanced Definition**: <Distinct secondary sense, specialized domain usage, or connotative nuance tailored to this specific word>

> [!quote] 💬 Contextual Usage & Authentic Quotations
> - 📜 **<Author / Source 1> (*<Work / Publication>*):** *"<Concise, authentic sentence 1 highlighting **<word>**>."*
> - 📜 **<Author / Source 2> (*<Work / Publication>*):** *"<Concise, authentic sentence 2 highlighting **<word>**>."*
> - 📜 **<Author / Source 3> (*<Work / Publication>*):** *"<Concise, authentic sentence 3 highlighting **<word>**>."*
```

*(Note: Use `greek_root: "[[Dashboard — <root>]]"` for Greek root words, or `cluster: "[[Cluster <Name>]]"` + `section: "<Section>"` for `English vocabulary master` words.)*

---

## 6. Folder Placement & Exhaustive List Synchronization Rules

1. **Accurate Folder Tree Placement:**
   - **Latin Roots:** `App database/Latin roots/Cluster <Name>/Dashboard — <root>/<word>.md`
   - **Greek Roots:** `App database/Greek roots/Cluster <Name>/Dashboard — <root>/<word>.md`
   - **English Vocabulary Master:** `App database/English vocabulary master/Cluster <Name>/<word>.md`
2. **Exhaustive List Registration:**
   - Every word created under a Latin or Greek root **must** be linked (`[[word]]`) inside the Exhaustive List of its parent `Dashboard — <root>.md`.
   - Every word created under `English vocabulary master` **must** be linked (`[[word]]`) inside its parent `Cluster <Name>.md`.
3. **Index Verification:**
   - After adding or editing words, run `npm run verify-db` and `npm run reindex` inside `main app/` so the app's `vault-index.json` stays 100% synchronized.
