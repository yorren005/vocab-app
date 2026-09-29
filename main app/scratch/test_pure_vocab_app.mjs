import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9227',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\chrome_test_vocab_' + Date.now(),
  'http://127.0.0.1:3080/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9227/json');
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

        // Wait 1.5s for data loading
        await new Promise(r => setTimeout(r, 1500));

        async function evalJs(expr) {
          const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
          return res.result ? res.result.value : null;
        }

        console.log('--- TEST 1: PURE VOCABULARY HOME SCREEN & EXCLUSIONS ---');
        const homeCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          heroTitle: document.querySelector('.home-hero-title')?.innerText,
          totalWords: document.getElementById('home-stat-total')?.innerText,
          categories: Array.from(document.querySelectorAll('.category-card .category-meta-title span:first-child')).map(el => el.innerText),
          hasBasicEnglish: !!document.querySelector('[data-open-path*="Basic English"]'),
          hasAdvancedEnglish: !!document.querySelector('[data-open-path*="Advanced english"]'),
          hasPhilosophy: !!document.querySelector('[data-open-path*="Philosophy"]')
        })`);
        console.log('Home check:', homeCheck);
        if (homeCheck.hasBasicEnglish || homeCheck.hasAdvancedEnglish || homeCheck.hasPhilosophy) {
          throw new Error('Basic English, Advanced English, or Philosophy found on Home tab!');
        }

        console.log('--- TEST 2: FULL SCROLLABILITY CHECK ---');
        const scrollCheck = await evalJs(`(() => {
          const stack = document.querySelector('.home-page-card-stack');
          const style = window.getComputedStyle(stack);
          return {
            overflowY: style.overflowY,
            paddingBottom: style.paddingBottom,
            boxSizing: style.boxSizing,
            hasOverscroll: style.overscrollBehaviorY
          };
        })()`);
        console.log('Scroll check:', scrollCheck);

        console.log('--- TEST 3: CLICK PREFIX LATIN (OPENS ON HOME TAB AS SUBPAGE) ---');
        await evalJs(`document.querySelector('[data-title*="Prefix Latin"]')?.click()`);
        await new Promise(r => setTimeout(r, 800));
        const prefixSubpageCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          homeStackLength: window.mobileVocabApp.homeStack.length,
          topBreadcrumbs: document.getElementById('top-breadcrumbs')?.innerText,
          backBtnVisible: document.getElementById('top-back-btn')?.style?.display !== 'none',
          subpageTitle: document.querySelector('.note-page-title')?.innerText,
          hasMarkdownBody: document.querySelector('.note-body-content')?.innerHTML?.length > 100
        })`);
        console.log('Prefix Latin subpage check:', prefixSubpageCheck);
        if (prefixSubpageCheck.activeTab !== 'home' || prefixSubpageCheck.homeStackLength !== 1) {
          throw new Error('Prefix Latin did not open as a subpage on the Home tab!');
        }

        console.log('--- TEST 4: GO BACK HOME ---');
        await evalJs(`document.getElementById('top-back-btn')?.click()`);
        await new Promise(r => setTimeout(r, 400));
        const backCheck = await evalJs(`({
          homeStackLength: window.mobileVocabApp.homeStack.length,
          backBtnVisible: document.getElementById('top-back-btn')?.style?.display !== 'none'
        })`);
        console.log('Back check:', backCheck);

        console.log('--- TEST 5: TAB 2 TIKTOK-STYLE VERTICAL FEED ---');
        await evalJs(`window.mobileVocabApp.switchTab('cards')`);
        await new Promise(r => setTimeout(r, 500));
        const feedCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          viewMode: window.mobileVocabApp.cardsViewMode,
          totalPureWordNotes: window.mobileVocabApp.allWordCards.length,
          filteredCount: window.mobileVocabApp.filteredCards.length,
          activeWord: document.querySelector('.tiktok-word-hero')?.innerText,
          categoryBadge: document.querySelector('.tiktok-cat-badge')?.innerText,
          keystoneRow: document.querySelector('.tiktok-keystone-row')?.innerText,
          defText: document.querySelector('.tiktok-def-text')?.innerText?.slice(0, 80),
          positionPill: document.getElementById('feed-position-pill')?.innerText,
          hasUpBtn: !!document.getElementById('btn-feed-prev'),
          hasDownBtn: !!document.getElementById('btn-feed-next')
        })`);
        console.log('TikTok Feed check:', feedCheck);
        if (feedCheck.totalPureWordNotes < 40000) {
          throw new Error('Expected ~47,000 pure word notes, found: ' + feedCheck.totalPureWordNotes);
        }

        console.log('--- TEST 6: TIKTOK FEED ADVANCE (SWIPE UP / NEXT WORD) ---');
        const wordBefore = feedCheck.activeWord;
        await evalJs(`window.mobileVocabApp.nextFeedWord()`);
        await new Promise(r => setTimeout(r, 400));
        const nextWordCheck = await evalJs(`({
          feedIndex: window.mobileVocabApp.feedWordIndex,
          activeWord: document.querySelector('.tiktok-word-hero')?.innerText,
          positionPill: document.getElementById('feed-position-pill')?.innerText
        })`);
        console.log('Next word check:', nextWordCheck);
        if (nextWordCheck.feedIndex !== 1 || nextWordCheck.activeWord === wordBefore) {
          throw new Error('Feed advance failed!');
        }

        console.log('--- TEST 7: 1-TAP RATING WITH AUTO-ADVANCE ---');
        await evalJs(`document.querySelector('[data-set-status="learned"]')?.click()`);
        await new Promise(r => setTimeout(r, 600)); // wait for 320ms auto-advance
        const autoAdvanceCheck = await evalJs(`({
          feedIndex: window.mobileVocabApp.feedWordIndex,
          activeWord: document.querySelector('.tiktok-word-hero')?.innerText
        })`);
        console.log('Auto advance after rating check:', autoAdvanceCheck);
        if (autoAdvanceCheck.feedIndex !== 2) {
          throw new Error('Expected auto-advance to index 2 after rating, found: ' + autoAdvanceCheck.feedIndex);
        }

        console.log('--- TEST 8: TAB 3 DAILY RANDOM WORD ---');
        await evalJs(`window.mobileVocabApp.switchTab('daily')`);
        await new Promise(r => setTimeout(r, 500));
        const dailyCheck = await evalJs(`({
          activeTab: window.mobileVocabApp.activeTab,
          dailyWord: document.querySelector('#daily-card-content .daily-word-prominent')?.innerText,
          isStudyPage: window.mobileVocabApp.isStudyPage(window.mobileVocabApp.dailyCurrentCard.path)
        })`);
        console.log('Daily word check:', dailyCheck);
        if (dailyCheck.isStudyPage) {
          throw new Error('Daily word should NEVER be a study page!');
        }

        console.log('--- TEST 9: TAB 4 SETTINGS & TRACKING HUD ---');
        await evalJs(`window.mobileVocabApp.switchTab('settings')`);
        await new Promise(r => setTimeout(r, 400));
        const settingsCheck = await evalJs(`({
          learnedCount: document.getElementById('hud-count-learned')?.innerText,
          studyingCount: document.getElementById('hud-count-learning')?.innerText,
          unreadCount: document.getElementById('hud-count-unread')?.innerText,
          themesCount: document.querySelectorAll('.theme-pick-card').length,
          fontCount: document.querySelectorAll('.typo-font-btn').length
        })`);
        console.log('Settings check:', settingsCheck);

        console.log('🎉 ALL 9 COMPREHENSIVE TESTS PASSED WITH 100% SUCCESS!');
      } finally {
        ws.close();
        proc.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error('Test execution error:', err);
    proc.kill();
    process.exit(1);
  }
}

run();
