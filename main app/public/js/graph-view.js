/**
 * Interactive Force-Directed Obsidian Graph View
 * Supports Global Corpus Graph & Local Note Graph, discipline color coding,
 * pan, zoom, node dragging, search highlighting, and click-to-open.
 */

const DISCIPLINE_COLORS = {
  'Hub': '#EF4444',
  'Basic English': '#D4A359',
  'Advanced english': '#4D725C',
  'English vocabulary master': '#B58514',
  'Greek roots': '#3B82F6',
  'Latin roots': '#C67D5A',
  'Philosophy': '#64A0D8',
  'Other': '#8C8273'
};

export function renderGraphView(containerEl, controller, focusNotePath = null) {
  containerEl.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative; width:100%; height:100%; display:flex; flex-direction:column; overflow:hidden; background:var(--web-surface-0);';

  const controls = document.createElement('div');
  controls.style.cssText = 'position:absolute; top:14px; left:14px; right:14px; z-index:10; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; pointer-events:none;';

  controls.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; pointer-events:auto; background:var(--web-surface-2); border:1px solid var(--web-border); padding:8px 12px; border-radius:10px; box-shadow:var(--web-shadow-md);">
      <span style="font-weight:800; font-size:12px; color:var(--web-text-primary); display:flex; align-items:center; gap:6px;">
        🕸️ Knowledge Graph
      </span>
      <select id="graph-discipline-filter" style="background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:6px; padding:4px 8px; font-size:12px;">
        <option value="all">All 6 Disciplines (Hub & MOCs)</option>
        <option value="Basic English">🧱 Basic English</option>
        <option value="Advanced english">🖋️ Advanced English</option>
        <option value="English vocabulary master">👑 Vocabulary Master</option>
        <option value="Greek roots">🏛️ Greek Roots (Clusters)</option>
        <option value="Latin roots">📜 Latin Roots (Clusters)</option>
        <option value="Philosophy">🦉 Philosophy</option>
      </select>
      <input id="graph-search-input" type="text" placeholder="Filter nodes..." style="background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:6px; padding:4px 9px; font-size:12px; width:150px;">
      <button id="graph-reset-btn" style="padding:4px 10px; font-size:11.5px;">Reset View</button>
    </div>
    <div style="display:flex; gap:10px; flex-wrap:wrap; pointer-events:auto; background:var(--web-surface-2); border:1px solid var(--web-border); padding:7px 12px; border-radius:10px; box-shadow:var(--web-shadow-sm); font-size:11px; color:var(--web-text-secondary);">
      <span style="display:inline-flex; align-items:center; gap:4px;"><i style="width:8px;height:8px;border-radius:50%;background:#D4A359;display:inline-block;"></i>Basic</span>
      <span style="display:inline-flex; align-items:center; gap:4px;"><i style="width:8px;height:8px;border-radius:50%;background:#4D725C;display:inline-block;"></i>Advanced</span>
      <span style="display:inline-flex; align-items:center; gap:4px;"><i style="width:8px;height:8px;border-radius:50%;background:#B58514;display:inline-block;"></i>Vocab</span>
      <span style="display:inline-flex; align-items:center; gap:4px;"><i style="width:8px;height:8px;border-radius:50%;background:#3B82F6;display:inline-block;"></i>Greek</span>
      <span style="display:inline-flex; align-items:center; gap:4px;"><i style="width:8px;height:8px;border-radius:50%;background:#C67D5A;display:inline-block;"></i>Latin</span>
      <span style="display:inline-flex; align-items:center; gap:4px;"><i style="width:8px;height:8px;border-radius:50%;background:#64A0D8;display:inline-block;"></i>Philosophy</span>
    </div>
  `;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%; height:100%; display:block; cursor:grab;';
  wrap.appendChild(controls);
  wrap.appendChild(canvas);
  containerEl.appendChild(wrap);

  const ctx = canvas.getContext('2d');
  let width = 800;
  let height = 600;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = wrap.getBoundingClientRect();
    if (rect.width < 2 && rect.height < 2) return;
    width = Math.max(rect.width, 300);
    height = Math.max(rect.height, 300);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Re-fit the canvas whenever the pane resizes; abort all globals when the view closes
  const viewLifecycle = new AbortController();
  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(wrap);

  let nodes = [];
  let edges = [];
  let camX = 0;
  let camY = 0;
  let zoom = 1;
  let hoveredNode = null;
  let draggedNode = null;
  let isPanning = false;
  let panStartX = 0;
  let panStartY = 0;
  let searchQuery = '';
  let animFrame = null;

  function buildGraphData(disciplineFilter = 'all') {
    const nodeMap = new Map();
    const rawEdges = controller.vaultLinks || [];

    const addNode = (path) => {
      if (nodeMap.has(path)) return nodeMap.get(path);
      const top = path.includes('/') ? path.split('/')[0] : 'Hub';
      const label = path.split('/').pop().replace(/\.md$/i, '');
      const isHub = path === '00 Language Hub.md' || label === top || label.includes('Progress');
      const isClusterOrModule = label.startsWith('Cluster ') || /^\d+\./.test(label);
      const radius = path === '00 Language Hub.md' ? 11 : isHub ? 8 : isClusterOrModule ? 6 : 4.5;
      const color = DISCIPLINE_COLORS[top] || DISCIPLINE_COLORS.Other;
      const angle = Math.random() * Math.PI * 2;
      const dist = path === '00 Language Hub.md' ? 0 : 60 + Math.random() * 260;

      const n = {
        id: path,
        label,
        discipline: top,
        color,
        radius,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        degree: 0
      };
      nodeMap.set(path, n);
      return n;
    };

    addNode('00 Language Hub.md');

    const maxNodes = disciplineFilter === 'all' ? 220 : 260;
    const filteredEdges = [];

    for (const [src, rawTarget] of rawEdges) {
      if (disciplineFilter !== 'all' && !src.startsWith(disciplineFilter + '/') && src !== '00 Language Hub.md') {
        continue;
      }
      const targetPath = controller.runtime.resolveLinkPath(rawTarget, src);
      if (!controller.runtime.pagesByPath.has(targetPath)) continue;
      if (disciplineFilter !== 'all' && !targetPath.startsWith(disciplineFilter + '/') && targetPath !== '00 Language Hub.md') {
        continue;
      }
      if (disciplineFilter === 'all') {
        // In global overview, focus on hubs, MOCs, clusters, modules, and philosophy inquiries for clarity
        const isHighLevel =
          src.split('/').length <= 2 ||
          targetPath.split('/').length <= 2 ||
          src.startsWith('Philosophy/') ||
          src.startsWith('Basic English/');
        if (!isHighLevel && nodeMap.size > 160) continue;
      }

      if (nodeMap.size < maxNodes || (nodeMap.has(src) && nodeMap.has(targetPath))) {
        const u = addNode(src);
        const v = addNode(targetPath);
        if (u !== v) {
          u.degree++;
          v.degree++;
          filteredEdges.push({ source: u, target: v });
        }
      }
    }

    nodes = Array.from(nodeMap.values());
    edges = filteredEdges;
    camX = 0;
    camY = 0;
    zoom = 1;
  }

  function stepPhysics() {
    const nLen = nodes.length;
    // Repulsion
    for (let i = 0; i < nLen; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nLen; j++) {
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distSq = dx * dx + dy * dy + 1;
        if (distSq < 36000) {
          const force = 520 / distSq;
          const fx = dx * force;
          const fy = dy * force;
          if (a !== draggedNode) { a.vx -= fx; a.vy -= fy; }
          if (b !== draggedNode) { b.vx += fx; b.vy += fy; }
        }
      }
    }

    // Spring attraction along edges
    for (let i = 0; i < edges.length; i++) {
      const { source, target } = edges[i];
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const targetLen = 85;
      const force = (dist - targetLen) * 0.018;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      if (source !== draggedNode) { source.vx += fx; source.vy += fy; }
      if (target !== draggedNode) { target.vx -= fx; target.vy -= fy; }
    }

    // Center gravity & damping
    for (let i = 0; i < nLen; i++) {
      const n = nodes[i];
      if (n === draggedNode) continue;
      if (n.id === '00 Language Hub.md') {
        n.x *= 0.9;
        n.y *= 0.9;
        continue;
      }
      n.vx -= n.x * 0.004;
      n.vy -= n.y * 0.004;
      n.vx *= 0.82;
      n.vy *= 0.82;
      n.x += n.vx;
      n.y += n.vy;
    }
  }

  function draw() {
    stepPhysics();
    ctx.clearRect(0, 0, width, height);
    const isDark = document.body.classList.contains('theme-dark');

    ctx.save();
    ctx.translate(width / 2 + camX, height / 2 + camY);
    ctx.scale(zoom, zoom);

    // Draw edges
    ctx.lineWidth = 1 / Math.max(zoom, 0.6);
    for (const e of edges) {
      const isHighlighted = hoveredNode && (e.source === hoveredNode || e.target === hoveredNode);
      ctx.strokeStyle = isHighlighted
        ? (isDark ? 'rgba(239, 68, 68, 0.75)' : 'rgba(77, 114, 92, 0.75)')
        : (isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(42, 39, 35, 0.12)');
      ctx.beginPath();
      ctx.moveTo(e.source.x, e.source.y);
      ctx.lineTo(e.target.x, e.target.y);
      ctx.stroke();
    }

    // Draw nodes
    for (const n of nodes) {
      const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery);
      const isHovered = n === hoveredNode;
      ctx.globalAlpha = matchesSearch ? 1 : 0.18;

      ctx.beginPath();
      ctx.arc(n.x, n.y, isHovered ? n.radius * 1.35 : n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      if (isHovered || n.radius >= 7 || zoom > 1.35 || (searchQuery && matchesSearch)) {
        ctx.font = `${isHovered || n.radius >= 8 ? '600' : '500'} ${Math.max(10, 11 / Math.sqrt(zoom))}px sans-serif`;
        ctx.fillStyle = isDark ? '#F0EDEA' : '#2A2723';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + n.radius + 12 / Math.sqrt(zoom));
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    if (containerEl.isConnected) {
      animFrame = requestAnimationFrame(draw);
    } else {
      // View closed: stop the loop and release global listeners/observer
      animFrame = null;
      viewLifecycle.abort();
      resizeObserver.disconnect();
    }
  }

  function startDrawLoop() {
    if (animFrame !== null || !containerEl.isConnected) return;
    animFrame = requestAnimationFrame(draw);
  }

  function startView() {
    resize();
    if (!nodes.length) buildGraphData(filterSelect.value);
    startDrawLoop();
  }

  function screenToWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    return {
      x: (sx - width / 2 - camX) / zoom,
      y: (sy - height / 2 - camY) / zoom
    };
  }

  function findNodeAt(wx, wy) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = n.x - wx;
      const dy = n.y - wy;
      const hitRadius = Math.max(n.radius + 5, 10 / zoom);
      if (dx * dx + dy * dy <= hitRadius * hitRadius) return n;
    }
    return null;
  }

  let pointerDownPos = null;
  canvas.addEventListener('pointerdown', (e) => {
    const pt = screenToWorld(e.clientX, e.clientY);
    pointerDownPos = { x: e.clientX, y: e.clientY };
    const hit = findNodeAt(pt.x, pt.y);
    if (hit) {
      draggedNode = hit;
      canvas.style.cursor = 'grabbing';
    } else {
      isPanning = true;
      panStartX = e.clientX - camX;
      panStartY = e.clientY - camY;
      canvas.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('pointermove', (e) => {
    if (!containerEl.isConnected) return;
    const pt = screenToWorld(e.clientX, e.clientY);
    if (draggedNode) {
      draggedNode.x = pt.x;
      draggedNode.y = pt.y;
      return;
    }
    if (isPanning) {
      camX = e.clientX - panStartX;
      camY = e.clientY - panStartY;
      return;
    }
    hoveredNode = findNodeAt(pt.x, pt.y);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
  }, { signal: viewLifecycle.signal });

  window.addEventListener('pointerup', (e) => {
    if (draggedNode && pointerDownPos) {
      const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moved < 6) {
        controller.openNote(draggedNode.id);
      }
    }
    draggedNode = null;
    isPanning = false;
    pointerDownPos = null;
    canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
  }, { signal: viewLifecycle.signal });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    zoom = Math.min(Math.max(zoom * factor, 0.25), 4.5);
  }, { passive: false });

  const filterSelect = controls.querySelector('#graph-discipline-filter');
  if (focusNotePath && focusNotePath.includes('/')) {
    const top = focusNotePath.split('/')[0];
    if ([...filterSelect.options].some(o => o.value === top)) {
      filterSelect.value = top;
    }
  }

  filterSelect.addEventListener('change', () => {
    buildGraphData(filterSelect.value);
  });

  controls.querySelector('#graph-search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
  });

  controls.querySelector('#graph-reset-btn').addEventListener('click', () => {
    camX = 0;
    camY = 0;
    zoom = 1;
  });

  // First paint once layout has settled; ResizeObserver keeps it fitted afterwards.
  // The settle timers guarantee correct sizing even when rAF/ResizeObserver are
  // throttled (occluded tabs) — timers still fire there.
  setTimeout(startView, 300);
  setTimeout(resize, 1200);
}
