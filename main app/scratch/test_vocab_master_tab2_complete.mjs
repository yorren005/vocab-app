import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const proc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9233',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\chrome_debug_test_' + Date.now(),
  'http://127.0.0.1:3080/'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9233/json');
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

    const browserExceptions = [];

    ws.onopen = async () => {
      await send('Runtime.enable');
      ws.addEventListener('message', (e) => {
        const d = JSON.parse(e.data);
        if (d.method === 'Runtime.exceptionThrown') {
          browserExceptions.push(d.params.exceptionDetails);
          console.error('[BROWSER EXCEPTION]', d.params.exceptionDetails);
        }
      });

      await new Promise(r => setTimeout(r, 2000));

      async function evalJs(expr) {
        const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
        return res.result ? res.result.value : null;
      }

      console.log('=== TEST 1: Open English Vocabulary Master Master Section in Tab 1 ===');
      await evalJs(`window.mobileVocabApp.switchTab('home')`);
      await evalJs(`window.mobileVocabApp.openHomeSection('English vocabulary master/English vocabulary master.md', 'English Vocabulary Master')`);
      await new Promise(r => setTimeout(r, 800));

      const t1 = await evalJs(`({
        title: document.querySelector('.note-page-title')?.innerText,
        hasCta: !!document.querySelector('.home-study-feed-cta'),
        ctaTitle: document.querySelector('.home-study-feed-cta .cta-title')?.innerText,
        scopeCount: window.mobileVocabApp.activeScope?.words?.length
      })`);
      console.log('Vocabulary Master Section Tab 1 State:', t1);
      if (!t1.hasCta) throw new Error('CTA banner missing on English Vocabulary Master section!');
      if (t1.scopeCount !== 515) throw new Error(`Expected 515 scope words, got ${t1.scopeCount}`);

      console.log('\n=== TEST 2: Click CTA banner to study all 515 words in Tab 2 Feed ===');
      await evalJs(`document.querySelector('.home-study-feed-cta')?.click()`);
      await new Promise(r => setTimeout(r, 500));

      const t2 = await evalJs(`({
        activeTab: window.mobileVocabApp.activeTab,
        filteredCount: window.mobileVocabApp.filteredCards.length,
        scopeBanner: document.getElementById('scope-banner-text')?.innerText,
        word: document.querySelector('.tiktok-word-hero')?.innerText,
        cat: document.querySelector('.tiktok-cat-badge')?.innerText,
        pos: document.querySelector('.tiktok-pos-pill')?.innerText,
        def: document.querySelector('.tiktok-def-text')?.innerText,
        quote: document.querySelector('.tiktok-quote-text')?.innerText,
        author: document.querySelector('.tiktok-quote-author')?.innerText,
        hasOriginalBtn: !!document.getElementById('btn-open-original-note'),
        hasPronounceBtn: !!document.getElementById('btn-pronounce-word')
      })`);
      console.log('Tab 2 Feed State after CTA click:', t2);
      if (t2.activeTab !== 'cards') throw new Error('Did not switch to cards tab!');
      if (t2.filteredCount !== 515) throw new Error(`Expected 515 cards, got ${t2.filteredCount}`);
      if (t2.word !== 'bonny') throw new Error(`Expected first word "bonny", got ${t2.word}`);
      if (!t2.def) throw new Error('Missing definition on first vocab word!');
      if (!t2.quote) throw new Error('Missing quote on first vocab word!');

      console.log('\n=== TEST 3: Swipe through 5 words in Tab 2 TikTok Feed ===');
      for (let i = 0; i < 5; i++) {
        await evalJs(`window.mobileVocabApp.nextFeedWord()`);
        await new Promise(r => setTimeout(r, 100));
      }
      const t3 = await evalJs(`({
        feedIndex: window.mobileVocabApp.feedWordIndex,
        word: document.querySelector('.tiktok-word-hero')?.innerText,
        cat: document.querySelector('.tiktok-cat-badge')?.innerText,
        def: document.querySelector('.tiktok-def-text')?.innerText
      })`);
      console.log('After 5 Next Swipes in Vocab Feed:', t3);
      if (t3.feedIndex !== 5) throw new Error(`Expected feedIndex 5, got ${t3.feedIndex}`);
      if (!t3.word || !t3.def) throw new Error('Word or definition missing after swipe!');

      console.log('\n=== TEST 4: Open a specific cluster (Beauty and Ugliness) in Tab 1 ===');
      await evalJs(`window.mobileVocabApp.switchTab('home')`);
      await evalJs(`window.mobileVocabApp.openHomeSection('English vocabulary master/Cluster Beauty and Ugliness/Cluster Beauty and Ugliness.md', 'Cluster Beauty and Ugliness')`);
      await new Promise(r => setTimeout(r, 800));

      const t4 = await evalJs(`({
        title: document.querySelector('.note-page-title')?.innerText,
        hasCta: !!document.querySelector('.home-study-feed-cta'),
        ctaTitle: document.querySelector('.home-study-feed-cta .cta-title')?.innerText,
        scopeCount: window.mobileVocabApp.activeScope?.words?.length
      })`);
      console.log('Cluster Beauty and Ugliness State:', t4);
      if (t4.scopeCount !== 13) throw new Error(`Expected 13 cluster words, got ${t4.scopeCount}`);

      // Switch to Tab 2 via bottom tab bar (without clicking CTA button)
      await evalJs(`window.mobileVocabApp.switchTab('cards')`);
      await new Promise(r => setTimeout(r, 500));

      const t4Tab2 = await evalJs(`({
        filteredCount: window.mobileVocabApp.filteredCards.length,
        scopeBanner: document.getElementById('scope-banner-text')?.innerText,
        firstWord: document.querySelector('.tiktok-word-hero')?.innerText
      })`);
      console.log('Tab 2 Scoped to Cluster Beauty and Ugliness via bottom tab switch:', t4Tab2);
      if (t4Tab2.filteredCount !== 13) throw new Error(`Expected 13 cards, got ${t4Tab2.filteredCount}`);

      console.log('\n=== TEST 5: Open Semantic Field inside Cluster Earth and Stone ===');
      await evalJs(`window.mobileVocabApp.switchTab('home')`);
      await evalJs(`window.mobileVocabApp.openHomeSection('English vocabulary master/Cluster Earth and Stone/Semantic Field — Earth, Rock and Terrain.md', 'Semantic Field — Earth, Rock and Terrain')`);
      await new Promise(r => setTimeout(r, 800));

      const t5 = await evalJs(`({
        hasCta: !!document.querySelector('.home-study-feed-cta'),
        scopeCount: window.mobileVocabApp.activeScope?.words?.length
      })`);
      console.log('Semantic Field Earth & Stone State:', t5);
      if (t5.scopeCount !== 27) throw new Error(`Expected 27 cluster words, got ${t5.scopeCount}`);

      await evalJs(`window.mobileVocabApp.switchTab('cards')`);
      await new Promise(r => setTimeout(r, 500));
      const t5Tab2 = await evalJs(`({
        filteredCount: window.mobileVocabApp.filteredCards.length,
        scopeBanner: document.getElementById('scope-banner-text')?.innerText,
        firstWord: document.querySelector('.tiktok-word-hero')?.innerText
      })`);
      console.log('Tab 2 Scoped to Earth and Stone from Semantic Field:', t5Tab2);
      if (t5Tab2.filteredCount !== 27) throw new Error(`Expected 27 cards, got ${t5Tab2.filteredCount}`);

      console.log('\n=== TEST 6: Click "Vocab Master" category chip directly in Tab 2 ===');
      // First open a Greek root to set activeScope to Greek
      await evalJs(`window.mobileVocabApp.switchTab('home')`);
      await evalJs(`window.mobileVocabApp.openHomeSection('Greek roots/Cluster Action/Dashboard — actin/Dashboard — actin.md', 'Dashboard — actin')`);
      await new Promise(r => setTimeout(r, 600));

      // Now switch to cards tab (it will be scoped to actin - 47 words)
      await evalJs(`window.mobileVocabApp.switchTab('cards')`);
      await new Promise(r => setTimeout(r, 400));
      const beforeChip = await evalJs(`window.mobileVocabApp.filteredCards.length`);
      console.log('Before chip click (scoped to actin): count =', beforeChip);
      if (beforeChip !== 47) throw new Error(`Expected 47 actin words, got ${beforeChip}`);

      // Now click the "👑 Vocab Master" category chip!
      await evalJs(`document.querySelector('#cards-category-chips [data-cat="vocab"]')?.click()`);
      await new Promise(r => setTimeout(r, 500));

      const afterChip = await evalJs(`({
        filteredCount: window.mobileVocabApp.filteredCards.length,
        catBadge: document.querySelector('.tiktok-cat-badge')?.innerText,
        firstWord: document.querySelector('.tiktok-word-hero')?.innerText,
        scopeBannerDisplay: document.getElementById('cards-scope-banner')?.style.display
      })`);
      console.log('After clicking Vocab Master category chip in Tab 2:', afterChip);
      if (afterChip.filteredCount !== 515) throw new Error(`Expected 515 vocab cards, got ${afterChip.filteredCount}`);
      if (afterChip.catBadge !== '👑 VOCAB MASTER') throw new Error(`Expected Vocab Master cat badge, got ${afterChip.catBadge}`);

      console.log('\n=== TEST 7: Open direct word link from anywhere ===');
      await evalJs(`window.mobileVocabApp.openWordCardByPath('English vocabulary master/Cluster Fire and Heat/gleed.md')`);
      await new Promise(r => setTimeout(r, 500));

      const directWord = await evalJs(`({
        word: document.querySelector('.tiktok-word-hero')?.innerText,
        def: document.querySelector('.tiktok-def-text')?.innerText,
        quote: document.querySelector('.tiktok-quote-text')?.innerText,
        author: document.querySelector('.tiktok-quote-author')?.innerText
      })`);
      console.log('Direct word link result:', directWord);
      if (directWord.word !== 'gleed') throw new Error(`Expected word "gleed", got ${directWord.word}`);
      if (!directWord.def.includes('coal')) throw new Error(`Expected glowing coal in def, got ${directWord.def}`);

      console.log('\n=== TEST 8: Test Original Note Button for Vocab Word ===');
      await evalJs(`document.getElementById('btn-open-original-note')?.click()`);
      await new Promise(r => setTimeout(r, 600));

      const origNote = await evalJs(`({
        activeTab: window.mobileVocabApp.activeTab,
        hasReturnBar: !!document.querySelector('.return-to-feed-bar'),
        title: document.querySelector('.note-page-title')?.innerText
      })`);
      console.log('Original Note View for gleed:', origNote);
      if (origNote.activeTab !== 'home') throw new Error('Did not navigate to home for original note view!');
      if (!origNote.hasReturnBar) throw new Error('Return to feed bar missing!');

      // Return to feed
      await evalJs(`document.querySelector('.return-to-feed-bar')?.click()`);
      await new Promise(r => setTimeout(r, 400));
      const backFeed = await evalJs(`({
        activeTab: window.mobileVocabApp.activeTab,
        word: document.querySelector('.tiktok-word-hero')?.innerText
      })`);
      console.log('Back to feed state:', backFeed);
      if (backFeed.activeTab !== 'cards' || backFeed.word !== 'gleed') {
        throw new Error('Failed to return back to gleed in Tab 2 feed!');
      }

      console.log('\n=== TEST 9: Clear Scope Button ===');
      await evalJs(`document.getElementById('btn-clear-scope')?.click()`);
      await new Promise(r => setTimeout(r, 400));
      const clearedCount = await evalJs(`window.mobileVocabApp.filteredCards.length`);
      console.log('After Clear Scope: total words =', clearedCount);
      if (clearedCount !== 47440) throw new Error(`Expected 47440 words after clear scope, got ${clearedCount}`);

      console.log('\nBrowser Exceptions Count:', browserExceptions.length);
      if (browserExceptions.length > 0) {
        throw new Error(`Encountered ${browserExceptions.length} exceptions during test!`);
      }

      console.log('\n🎉 ALL 9 VOCABULARY MASTER VERIFICATION TESTS PASSED FLAWLESSLY! 🎉');
      ws.close();
      proc.kill();
      process.exit(0);
    };
  } catch (err) {
    console.error('Test error:', err);
    proc.kill();
    process.exit(1);
  }
}
run();
