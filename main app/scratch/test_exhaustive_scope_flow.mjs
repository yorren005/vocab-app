import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\chrome_test_scope_' + Date.now(),
  'http://127.0.0.1:3080/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9228/json');
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

    ws.onopen = async () => {
      try {
        await send('Runtime.enable');
        await send('Log.enable');

        ws.addEventListener('message', (e) => {
          const d = JSON.parse(e.data);
          if (d.method === 'Runtime.consoleAPICalled') {
            console.log('[BROWSER LOG]', d.params.type, d.params.args.map(a => a.value || a.description));
          } else if (d.method === 'Runtime.exceptionThrown') {
            console.error('[BROWSER EXCEPTION]', d.params.exceptionDetails);
          }
        });

        // Wait 2.0s for data loading
        await new Promise(r => setTimeout(r, 2000));

        async function evalJs(expr) {
          const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
          return res.result ? res.result.value : null;
        }

        console.log('--- TEST 1: OPEN ROOT DASHBOARD IN TAB 1 (HOME) ---');
        await evalJs(`window.mobileVocabApp.openHomeSection('Latin roots/Cluster Asking & Seeking/Dashboard — pet/Dashboard — pet.md', 'Dashboard — pet')`);
        await new Promise(r => setTimeout(r, 1000));

        const dashCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          stackLen: window.mobileVocabApp.homeStack.length,
          hasCta: !!document.querySelector('.home-study-feed-cta'),
          ctaTitle: document.querySelector('.home-study-feed-cta .cta-title')?.innerText,
          ctaSub: document.querySelector('.home-study-feed-cta .cta-sub')?.innerText,
          activeScope: window.mobileVocabApp.activeScope ? {
            type: window.mobileVocabApp.activeScope.type,
            title: window.mobileVocabApp.activeScope.title,
            wordsCount: window.mobileVocabApp.activeScope.words?.length
          } : null
        })`);
        console.log('Dashboard & Scope CTA check:', dashCheck);
        if (!dashCheck.hasCta) throw new Error('Home study feed CTA missing on Root Dashboard!');

        console.log('--- TEST 2: CLICK STUDY FEED CTA -> TRANSITIONS TO TAB 2 SCOPED ---');
        await evalJs(`document.querySelector('.home-study-feed-cta')?.click()`);
        await new Promise(r => setTimeout(r, 600));

        const feedScopeCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          scopeBannerVisible: document.getElementById('cards-scope-banner')?.style?.display !== 'none',
          scopeBannerText: document.getElementById('scope-banner-text')?.innerText,
          filteredCount: window.mobileVocabApp.filteredCards.length,
          currentWord: document.querySelector('.tiktok-word-hero')?.innerText,
          posPill: document.querySelector('.tiktok-pos-pill')?.innerText,
          exhaustiveBadge: document.querySelector('.tiktok-exhaustive-badge')?.innerText,
          hasOriginalBtn: !!document.getElementById('btn-open-original-note'),
          hasPronounceBtn: !!document.getElementById('btn-pronounce-word'),
          defTitle: document.querySelector('.tiktok-def-title')?.innerText,
          defText: document.querySelector('.tiktok-def-text')?.innerText,
          hasQuoteBox: !!document.querySelector('.tiktok-quote-box')
        })`);
        console.log('Feed Scope check:', feedScopeCheck);
        if (!feedScopeCheck.scopeBannerVisible) throw new Error('Scope banner is not visible on Tab 2!');
        if (!feedScopeCheck.hasOriginalBtn) throw new Error('Original note button missing on word card!');

        console.log('--- TEST 3: CLICK [📄 ORIGINAL NOTE] -> OPENS FULL NOTE IN HOME READER ---');
        await evalJs(`document.getElementById('btn-open-original-note')?.click()`);
        await new Promise(r => setTimeout(r, 800));

        const originalViewCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          homeStackLen: window.mobileVocabApp.homeStack.length,
          pageTitle: document.querySelector('.note-page-title')?.innerText,
          hasReturnBar: !!document.querySelector('.return-to-feed-bar'),
          returnBarText: document.querySelector('.return-to-feed-bar')?.innerText,
          hasMarkdownContent: document.querySelector('.note-body-content')?.innerText?.length > 100
        })`);
        console.log('Original Note View check:', originalViewCheck);
        if (!originalViewCheck.hasReturnBar) throw new Error('Return to feed bar missing in original note view!');

        console.log('--- TEST 4: CLICK RETURN TO FEED BAR -> RETURNS TO TAB 2 ---');
        await evalJs(`document.querySelector('.return-to-feed-bar')?.click()`);
        await new Promise(r => setTimeout(r, 500));

        const returnedCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          feedWordIndex: window.mobileVocabApp.feedWordIndex,
          scopeBannerVisible: document.getElementById('cards-scope-banner')?.style?.display !== 'none'
        })`);
        console.log('Returned to feed check:', returnedCheck);
        if (returnedCheck.activeTab !== 'cards') throw new Error('Did not return to cards tab!');

        console.log('--- TEST 5: CLEAR SCOPE -> RESTORES FULL DECK ---');
        await evalJs(`document.getElementById('btn-clear-scope')?.click()`);
        await new Promise(r => setTimeout(r, 500));

        const clearScopeCheck = await evalJs(`({
          activeScope: window.mobileVocabApp.activeScope,
          scopeBannerVisible: document.getElementById('cards-scope-banner')?.style?.display !== 'none',
          totalFilteredCards: window.mobileVocabApp.filteredCards.length
        })`);
        console.log('Clear Scope check:', clearScopeCheck);
        if (clearScopeCheck.scopeBannerVisible) throw new Error('Scope banner still visible after clear!');
        if (clearScopeCheck.totalFilteredCards < 40000) throw new Error('Full deck was not restored after clear!');

        console.log('--- TEST 6: DAILY WORD HAS PRONOUNCE & ORIGINAL BUTTON ---');
        await evalJs(`window.mobileVocabApp.switchTab('daily')`);
        await new Promise(r => setTimeout(r, 600));

        const dailyCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          hasDailyPronounce: !!document.getElementById('btn-daily-pronounce'),
          hasDailyOriginal: !!document.getElementById('btn-daily-original'),
          dailyWord: document.querySelector('.daily-word-prominent')?.innerText,
          hasExhaustiveBadge: !!document.querySelector('#view-daily .tiktok-exhaustive-badge')
        })`);
        console.log('Daily Word check:', dailyCheck);
        if (!dailyCheck.hasDailyPronounce || !dailyCheck.hasDailyOriginal) {
          throw new Error('Daily word missing Pronounce or Original button!');
        }

        console.log('\n🌟 ALL 6 SUITES PASSED WITH 100% SUCCESS! 🌟');
        process.exit(0);
      } catch (err) {
        console.error('TEST SUITE FAILED:', err);
        process.exit(1);
      }
    };
  } catch (e) {
    console.error('Runner error:', e);
    process.exit(1);
  }
}

run();
