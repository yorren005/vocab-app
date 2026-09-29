import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\chrome_debug_test_' + Date.now(),
  'http://127.0.0.1:3080/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9231/json');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('3080'));
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
      await send('Runtime.enable');
      await new Promise(r => setTimeout(r, 2000));

      async function evalJs(expr) {
        const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
        return res.result ? res.result.value : null;
      }

      console.log('=== TEST 1: Open English vocabulary master section on Home Tab ===');
      await evalJs(`window.mobileVocabApp.openHomeSection('English vocabulary master/English vocabulary master.md', 'Vocabulary Master')`);
      await new Promise(r => setTimeout(r, 1200));

      const pageState = await evalJs(`({
        title: document.querySelector('.note-page-title')?.innerText,
        hasCta: !!document.querySelector('.home-study-feed-cta'),
        activeScope: window.mobileVocabApp.activeScope,
        internalLinksCount: document.querySelectorAll('.note-body-content a.internal-link').length,
        links: Array.from(document.querySelectorAll('.note-body-content a.internal-link')).map(a => ({ text: a.innerText, href: a.dataset.href }))
      })`);
      console.log('English vocabulary master links count:', pageState.internalLinksCount);
      console.log('All links in page:');
      pageState.links.forEach(l => console.log('  -', l.text, '=>', l.href));


      console.log('\n=== TEST 2: Switch to Tab 2 (Cards) ===');
      await evalJs(`window.mobileVocabApp.switchTab('cards')`);
      await new Promise(r => setTimeout(r, 500));

      const tab2State = await evalJs(`({
        filteredCardsLen: window.mobileVocabApp.filteredCards.length,
        firstCardHero: document.querySelector('.tiktok-word-hero')?.innerText,
        firstCardCat: document.querySelector('.tiktok-cat-badge')?.innerText,
        scopeBannerDisplay: document.getElementById('cards-scope-banner')?.style.display,
        scopeBannerText: document.getElementById('scope-banner-text')?.innerText,
        activeScope: window.mobileVocabApp.activeScope
      })`);
      console.log('Tab 2 state after opening Vocab Master:\n', JSON.stringify(tab2State, null, 2));

      console.log('\n=== TEST 3: Click "Vocab Master" category chip in Tab 2 ===');
      await evalJs(`document.querySelector('#cards-category-chips [data-cat="vocab"]')?.click()`);
      await new Promise(r => setTimeout(r, 500));

      const chipClickState = await evalJs(`({
        filteredCardsLen: window.mobileVocabApp.filteredCards.length,
        firstCardHero: document.querySelector('.tiktok-word-hero')?.innerText,
        firstCardCat: document.querySelector('.tiktok-cat-badge')?.innerText,
        scopeBannerDisplay: document.getElementById('cards-scope-banner')?.style.display,
        scopeBannerText: document.getElementById('scope-banner-text')?.innerText,
        catActiveChip: document.querySelector('#cards-category-chips .filter-chip.active')?.dataset.cat,
        feedCardDetails: {
          word: document.querySelector('.tiktok-word-hero')?.innerText,
          def: document.querySelector('.tiktok-def-text')?.innerText,
          quote: document.querySelector('.tiktok-quote-text')?.innerText,
          author: document.querySelector('.tiktok-quote-author')?.innerText
        }
      })`);
      console.log('Tab 2 state after clicking Vocab Master filter chip:\n', JSON.stringify(chipClickState, null, 2));

      ws.close();
      proc.kill();
      process.exit(0);
    };
  } catch (e) {
    console.error(e);
    proc.kill();
    process.exit(1);
  }
}
run();
