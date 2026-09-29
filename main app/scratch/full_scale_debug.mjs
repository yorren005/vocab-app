import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\chrome_debug_' + Date.now(),
  'http://127.0.0.1:3080/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9229/json');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('3080'));
    if (!tab) throw new Error('No 3080 tab found');

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const consoleLogs = [];
    const browserExceptions = [];

    ws.onopen = async () => {
      try {
        await send('Runtime.enable');
        await send('Log.enable');

        ws.addEventListener('message', (e) => {
          const d = JSON.parse(e.data);
          if (d.method === 'Runtime.consoleAPICalled') {
            consoleLogs.push({ type: d.params.type, args: d.params.args.map(a => a.value || a.description) });
          } else if (d.method === 'Runtime.exceptionThrown') {
            browserExceptions.push(d.params.exceptionDetails);
            console.error('[BROWSER EXCEPTION]', d.params.exceptionDetails);
          }
        });

        // Wait 2.0s for data loading
        await new Promise(r => setTimeout(r, 2000));

        async function evalJs(expr) {
          const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
          return res.result ? res.result.value : null;
        }

        console.log('=== PHASE 1: DATA INTEGRITY & INITIAL STATE ===');
        const state1 = await evalJs(`({
          totalIndexed: window.mobileVocabApp.vaultIndex.totalNotes,
          allWordCardsLen: window.mobileVocabApp.allWordCards.length,
          coreNotesLoaded: Object.keys(window.mobileVocabApp.coreNotes).length,
          activeTab: window.mobileVocabApp.activeTab,
          theme: window.mobileVocabApp.theme
        })`);
        console.log('Initial App State:', state1);
        if (state1.totalIndexed !== 51599) throw new Error(`Unexpected total notes count: ${state1.totalIndexed}`);
        if (state1.allWordCardsLen !== 47440) throw new Error(`Unexpected word cards count: ${state1.allWordCardsLen}`);

        console.log('\n=== PHASE 2: SEARCH ENGINE STRESS & SPECIAL CHARS ===');
        const queries = ['act', 'phil', 'appetite', 'unknownword999', 'bio-', 'a*b', ''];
        for (const q of queries) {
          await evalJs(`(() => {
            const input = document.getElementById('cards-search-input');
            input.value = ${JSON.stringify(q)};
            input.dispatchEvent(new Event('input'));
          })()`);
          await new Promise(r => setTimeout(r, 150));
          const resCount = await evalJs(`window.mobileVocabApp.filteredCards.length`);
          console.log(`Query "${q}" => ${resCount} results`);
        }

        console.log('\n=== PHASE 3: TAB 2 RAPID SWIPE & DOM STABILITY ===');
        // Reset search
        await evalJs(`document.getElementById('cards-search-clear')?.click()`);
        await evalJs(`window.mobileVocabApp.switchTab('cards')`);
        await new Promise(r => setTimeout(r, 300));

        // Rapid 10-step next
        for (let i = 0; i < 10; i++) {
          await evalJs(`window.mobileVocabApp.nextFeedWord()`);
        }
        await new Promise(r => setTimeout(r, 400));
        const slideCountAfterNext = await evalJs(`document.querySelectorAll('#tiktok-feed-wrapper .tiktok-slide').length`);
        const currIndex = await evalJs(`window.mobileVocabApp.feedWordIndex`);
        console.log(`After 10 nextWord: feedIndex = ${currIndex}, slide DOM elements in wrapper = ${slideCountAfterNext}`);
        if (slideCountAfterNext > 1) {
          console.warn(`WARNING: Multiple slides left in DOM after animation: ${slideCountAfterNext}`);
        }

        // Rapid 5-step prev
        for (let i = 0; i < 5; i++) {
          await evalJs(`window.mobileVocabApp.prevFeedWord()`);
        }
        await new Promise(r => setTimeout(r, 400));
        const currIndex2 = await evalJs(`window.mobileVocabApp.feedWordIndex`);
        console.log(`After 5 prevWord: feedIndex = ${currIndex2}`);

        console.log('\n=== PHASE 4: LIST VIEW / FEED VIEW TOGGLE ===');
        await evalJs(`document.getElementById('btn-mode-list')?.click()`);
        await new Promise(r => setTimeout(r, 200));
        const listItemsCount = await evalJs(`document.querySelectorAll('.card-list-item').length`);
        console.log(`List mode items rendered: ${listItemsCount}`);
        if (listItemsCount === 0) throw new Error('List view rendered 0 items!');

        // Click 5th item in list view
        await evalJs(`document.querySelectorAll('.card-list-item')[4]?.click()`);
        await new Promise(r => setTimeout(r, 300));
        const viewModeBack = await evalJs(`({
          mode: window.mobileVocabApp.cardsViewMode,
          feedIndex: window.mobileVocabApp.feedWordIndex,
          cardName: document.querySelector('.tiktok-word-hero')?.innerText
        })`);
        console.log('List item click restored feed view:', viewModeBack);
        if (viewModeBack.mode !== 'feed') throw new Error('Failed to restore feed mode on list item click!');

        console.log('\n=== PHASE 5: GREEK ROOT DASHBOARD LINKING & EXHAUSTIVE SCOPE ===');
        await evalJs(`window.mobileVocabApp.switchTab('home')`);
        await evalJs(`window.mobileVocabApp.openHomeSection('Greek roots/01_Root_Dashboards/Dashboard — Greek Roots.md', 'Dashboard — Greek Roots')`);
        await new Promise(r => setTimeout(r, 800));

        const greekDashCheck = await evalJs(`({
          homeStackLen: window.mobileVocabApp.homeStack.length,
          title: document.querySelector('.note-page-title')?.innerText,
          hasMarkdownBody: document.querySelector('.note-body-content')?.innerText?.length > 100
        })`);
        console.log('Greek Roots Master Dashboard check:', greekDashCheck);

        // Open a specific Greek root dashboard: Dashboard — actin.md
        await evalJs(`window.mobileVocabApp.openHomeSection('Greek roots/Cluster Action/Dashboard — actin/Dashboard — actin.md', 'Dashboard — actin')`);
        await new Promise(r => setTimeout(r, 800));
        const greekActinCheck = await evalJs(`({
          homeStackLen: window.mobileVocabApp.homeStack.length,
          title: document.querySelector('.note-page-title')?.innerText,
          hasCta: !!document.querySelector('.home-study-feed-cta'),
          ctaTitle: document.querySelector('.home-study-feed-cta .cta-title')?.innerText,
          scopeCount: window.mobileVocabApp.activeScope?.words?.length
        })`);
        console.log('Greek root [actin] dashboard check:', greekActinCheck);
        if (!greekActinCheck.hasCta) throw new Error('CTA missing on Greek root dashboard!');

        // Click CTA to link feed
        await evalJs(`document.querySelector('.home-study-feed-cta')?.click()`);
        await new Promise(r => setTimeout(r, 600));

        const greekFeedCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          scopeBanner: document.getElementById('scope-banner-text')?.innerText,
          filteredCount: window.mobileVocabApp.filteredCards.length,
          activeWord: document.querySelector('.tiktok-word-hero')?.innerText,
          posPill: document.querySelector('.tiktok-pos-pill')?.innerText,
          defText: document.querySelector('.tiktok-def-text')?.innerText,
          hasQuote: !!document.querySelector('.tiktok-quote-box')
        })`);
        console.log('Greek Feed Scope check:', greekFeedCheck);
        if (greekFeedCheck.filteredCount === 0) throw new Error('Greek scope has 0 cards!');

        console.log('\n=== PHASE 6: ORIGINAL NOTE READER & BACK NAVIGATION STACK ===');
        await evalJs(`document.getElementById('btn-open-original-note')?.click()`);
        await new Promise(r => setTimeout(r, 800));

        const originalViewCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          homeStackLen: window.mobileVocabApp.homeStack.length,
          hasReturnBar: !!document.querySelector('.return-to-feed-bar'),
          title: document.querySelector('.note-page-title')?.innerText
        })`);
        console.log('Original Note Reader check:', originalViewCheck);
        if (!originalViewCheck.hasReturnBar) throw new Error('Missing return to feed bar in original view!');

        // Return back to feed
        await evalJs(`document.querySelector('.return-to-feed-bar')?.click()`);
        await new Promise(r => setTimeout(r, 400));
        const backToFeedTab = await evalJs(`window.mobileVocabApp.activeTab`);
        console.log('Back to feed activeTab:', backToFeedTab);
        if (backToFeedTab !== 'cards') throw new Error('Failed to return to cards tab!');

        console.log('\n=== PHASE 7: VOCABULARY MASTER CLUSTER LINKING ===');
        await evalJs(`window.mobileVocabApp.switchTab('home')`);
        await evalJs(`window.mobileVocabApp.openHomeSection('English vocabulary master/Cluster Beauty and Ugliness/Cluster Beauty and Ugliness.md', 'Cluster Beauty and Ugliness')`);
        await new Promise(r => setTimeout(r, 800));

        const beautyCheck = await evalJs(`({
          hasCta: !!document.querySelector('.home-study-feed-cta'),
          ctaTitle: document.querySelector('.home-study-feed-cta .cta-title')?.innerText,
          wordsCount: window.mobileVocabApp.activeScope?.words?.length
        })`);
        console.log('Vocab Master Cluster check:', beautyCheck);
        if (!beautyCheck.hasCta) throw new Error('CTA missing on Vocab Master cluster!');

        // Open in feed
        await evalJs(`document.querySelector('.home-study-feed-cta')?.click()`);
        await new Promise(r => setTimeout(r, 500));
        const beautyFeed = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          filteredCount: window.mobileVocabApp.filteredCards.length,
          firstWord: document.querySelector('.tiktok-word-hero')?.innerText
        })`);
        console.log('Beauty cluster feed check:', beautyFeed);

        console.log('\n=== PHASE 8: DAILY WORD DRILL & SHUFFLE STRESS ===');
        await evalJs(`window.mobileVocabApp.switchTab('daily')`);
        await new Promise(r => setTimeout(r, 400));

        for (let i = 0; i < 15; i++) {
          await evalJs(`document.getElementById('btn-daily-shuffle')?.click()`);
          await new Promise(r => setTimeout(r, 80));
        }

        const dailyStats = await evalJs(`({
          dailyWord: document.querySelector('.daily-word-prominent')?.innerText,
          hasDef: !!document.querySelector('#view-daily .tiktok-def-text')?.innerText,
          hasOriginal: !!document.getElementById('btn-daily-original'),
          hasPronounce: !!document.getElementById('btn-daily-pronounce')
        })`);
        console.log('Daily word 15-shuffle stress check:', dailyStats);
        if (!dailyStats.dailyWord || !dailyStats.hasDef) throw new Error('Daily word definition missing after rapid shuffles!');

        console.log('\n=== PHASE 9: TRACKING HUD & PERSISTENCE CHECK ===');
        // Rate current daily word
        await evalJs(`document.querySelector('#view-daily [data-daily-status="learned"]')?.click()`);
        await new Promise(r => setTimeout(r, 400));

        const statusDbCheck = await evalJs(`(() => {
          const db = window.mobileVocabApp.statusDb;
          const learnedCount = Object.values(db).filter(s => s === 'learned').length;
          return { learnedCount, totalInDb: Object.keys(db).length };
        })()`);
        console.log('Status DB check:', statusDbCheck);
        if (statusDbCheck.learnedCount < 1) throw new Error('Status rating failed to persist to statusDb!');

        console.log('\n=== PHASE 10: THEME & TYPOGRAPHY SYSTEM CHECK ===');
        await evalJs(`window.mobileVocabApp.switchTab('settings')`);
        await evalJs(`window.mobileVocabApp.applyTheme('light')`);
        const lightThemeCheck = await evalJs(`document.documentElement.getAttribute('data-theme')`);
        if (lightThemeCheck !== 'light') throw new Error('Light theme failed to apply!');

        await evalJs(`window.mobileVocabApp.applyTheme('dark')`);
        const darkThemeCheck = await evalJs(`document.documentElement.getAttribute('data-theme')`);
        if (darkThemeCheck !== 'dark') throw new Error('Dark theme failed to apply!');

        console.log('\n=== PHASE 11: UNHANDLED BROWSER EXCEPTIONS CHECK ===');
        console.log('Browser Exceptions Count:', browserExceptions.length);
        if (browserExceptions.length > 0) {
          console.error('Captured Exceptions:', browserExceptions);
          throw new Error(`Encountered ${browserExceptions.length} browser exceptions during test run!`);
        }

        console.log('\n🎉🎉🎉 FULL-SCALE DEBUG AUDIT COMPLETE: 11 / 11 PHASES PASSED WITH ZERO ERRORS! 🎉🎉🎉');
        process.exit(0);
      } catch (err) {
        console.error('\n❌ FULL-SCALE DEBUG DETECTED A FAW:', err);
        process.exit(1);
      }
    };
  } catch (e) {
    console.error('Runner error:', e);
    process.exit(1);
  }
}

run();
