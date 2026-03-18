/* ── Section library ── */
const SECTION_LIBRARY = [
  {
    id: 'title',
    label: 'Project Title & Description',
    icon: '📄',
    heading: 'Project Title',
    template: `**Replace this with your project name.**

MDDN242 2026 — Your Name

What is this project? One or two sentences. What does it do, what is it made with, and why does it exist?`,
  },
  {
    id: 'intent',
    label: 'Design Intent',
    icon: '🎯',
    heading: 'Design Intent',
    template: `What were you trying to achieve?

### The goal

Write a sentence or two about the core intent. Not what you built — what you were going for.

### Why this direction

Why is this what you wanted to make? What parts of you does this website respond to? What makes it yours and not just "get AI to make it"?

### Who is this for

Who is the audience? What do you want them to feel or take away?`,
  },
  {
    id: 'inspiration',
    label: 'Inspiration & References',
    icon: '✨',
    heading: 'Inspiration & References',
    template: `What influenced this project? Cite anything that isn't yours.

### Visual references

- [Reference name](URL) — what you took from it
- [Reference name](URL) — what you took from it

### Artists, designers, sites

- Name — what about their work resonated

### Movements or aesthetics

- e.g. brutalism, wabi-sabi, Y2K — what drew you to it`,
  },
  {
    id: 'ideation',
    label: 'Ideation & Brainstorming',
    icon: '💡',
    heading: 'Ideation & Brainstorming',
    template: `What directions did you explore before committing?

### Directions considered

1. **Direction A** — brief description, why you did or didn't pursue it
2. **Direction B** — brief description, why you did or didn't pursue it
3. **Direction C** — brief description, why you did or didn't pursue it

### How you narrowed it down

What made you commit to the direction you chose? Was it a feeling, feedback, a constraint, something else?

### Early sketches or mood boards

Add images here: \`![description](path-or-url)\``,
  },
  {
    id: 'decisions',
    label: 'Design Decisions',
    icon: '⚖️',
    heading: 'Design Decisions',
    template: `The key choices you made and why.

### Colour

Talk about your colour choices. What palette did you land on? Why those colours and not others?

### Typography

What typefaces did you choose? What do they communicate?

### Layout & structure

How did you organise the space? What hierarchy decisions did you make?

### Interaction & motion

If applicable — what moves, responds, or changes? Why did you add it?

### Other decisions

Any other notable choices: naming, tone of voice, imagery style, etc.`,
  },
  {
    id: 'ai',
    label: 'AI & Prompting Process',
    icon: '🤖',
    heading: 'AI & Prompting Process',
    template: `How did you use AI tools in this project? This section is important. We want to see how you worked with AI, not just that you did.

### Tools used

- e.g. ChatGPT, Claude, Midjourney, GitHub Copilot

### How you used them

Copy-pasting back and forth? Inside VS Code? A conversation over multiple sessions?

### What you used AI for

Generation, ideation, code, copy, imagery, debugging, other?

### What worked

Describe prompts or approaches that got useful results. Include examples.

\`\`\`
Example prompt that worked well:
[paste prompt here]
\`\`\`

### What didn't work

What did you prompt that gave poor results? How did you adjust?`,
  },
  {
    id: 'failures',
    label: "What I Tried That Didn't Work",
    icon: '🔧',
    heading: "What I Tried That Didn't Work",
    template: `Dead ends and failed experiments are part of the process. Don't skip this section.

### Attempt 1: name it

**What I tried:** describe it

**Why it didn't work:** be honest

**What I learned:** the takeaway

### Attempt 2: name it

**What I tried:** describe it

**Why it didn't work:** be honest

**What I learned:** the takeaway`,
  },
  {
    id: 'technical',
    label: 'Technical Notes',
    icon: '⚙️',
    heading: 'Technical Notes',
    template: `Anything worth noting about how this was built.

### Tools & libraries

| Tool | Purpose |
|------|---------|
| e.g. p5.js | canvas drawing |
| e.g. Google Fonts | typography |

### Browser & mobile testing

- Tested on: e.g. Chrome, Firefox, Safari
- Mobile tested on: e.g. iPhone, Android — any issues?
- Known issues: if something breaks in a specific browser, note it here. That's fine.`,
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: '♿',
    heading: 'Accessibility',
    template: `Everyone should have good contrast between text and background. Check yours at [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

- **Colour contrast:** pass / fail — what's your ratio?
- **Alt text on images:** added / not added
- **Keyboard navigation:** works / not tested

If your design is unconventional and making it fully accessible would mean significant redesign, you don't need to redesign it. Instead, write up what best practice is and explain honestly where your design diverges and why.

e.g. "My site uses low-contrast text as a deliberate aesthetic choice. Best practice is a contrast ratio of at least 4.5:1 for body text. My palette sits at around 2.8:1. A fully accessible version would require..."`,
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    icon: '🌱',
    heading: 'Sustainability',
    template: `Using HTML + CSS + JS with no backend is already a low-carbon architecture. Good start.

- **Biggest file:** name it, approximate size (check DevTools → Network tab)
- **Fonts:** system fonts or web fonts? Web fonts add load weight.
- **Images:** compressed or not?
- **Video / animation:** autoplay? loops? Not applicable?

Did you take any steps to reduce page weight?`,
  },
  {
    id: 'reflection',
    label: 'Reflection',
    icon: '🪞',
    heading: 'Reflection',
    template: `### What I learned

Be specific. "I learned CSS Grid" is less useful than "I learned how to use CSS Grid to build a layout that adapts without media queries."

### What I'd do differently

If you started again tomorrow, what would change?

### What I'm most proud of

What moment, decision, or detail are you happiest with?

### Where this sits in my practice

How does this project connect to your broader interests as a designer?

---

> **Before you hand in:** read this README one more time. Does it show your thinking, or is it just a list of what you did? The best READMEs make the reader feel like they were in the room with you while you designed it.`,
  },
  {
    id: 'custom',
    label: 'Custom Section',
    icon: '➕',
    heading: 'Custom Section',
    template: `*Write anything here that doesn't fit the other sections.*`,
    custom: true,
  },
];

/* ── State ── */
let activeSections = []; // [{id, instanceId, heading, content}]
let activeTextarea = null; // currently focused textarea element
let saveTimeout = null;
let saveTimestamp = null;
let sortable = null;

/* ── Helpers ── */
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function showToast(msg, duration = 2000) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

function formatSaveTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return 'Last saved: ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ── Persistence ── */
function saveToStorage() {
  localStorage.setItem('readme-editor-v1', JSON.stringify(activeSections));
  saveTimestamp = Date.now();
  localStorage.setItem('readme-editor-saved', saveTimestamp);
  document.getElementById('save-status').textContent = formatSaveTime(saveTimestamp);
}

function scheduleSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveToStorage, 800);
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('readme-editor-v1');
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && parsed.length > 0) {
      activeSections = parsed;
    } else {
      // First visit — start with one blank custom section ready to paste into
      activeSections = [{
        id: 'custom',
        instanceId: uid(),
        heading: '',
        content: '',
      }];
    }
    saveTimestamp = parseInt(localStorage.getItem('readme-editor-saved') || '0', 10) || null;
  } catch (e) {
    activeSections = [];
  }
}

/* ── Theme ── */
function initTheme() {
  const stored = localStorage.getItem('readme-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('readme-theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ── Sidebar rendering ── */
function renderSidebar() {
  renderSidebarActive();
  renderSidebarLibrary();
}

function renderSidebarActive() {
  const list = document.getElementById('sidebar-active-list');
  list.innerHTML = '';

  if (activeSections.length === 0) {
    list.innerHTML = '<div class="sidebar-empty-hint">No sections yet — add one below.</div>';
    return;
  }

  activeSections.forEach((section, idx) => {
    const card = document.createElement('div');
    card.className = 'sidebar-active-card';
    card.dataset.instanceId = section.instanceId;
    const label = section.heading.trim() || 'Untitled';
    card.innerHTML = `
      <span class="card-drag" title="Drag to reorder">⠿</span>
      <span class="card-label">${escapeHtml(label)}</span>
      <button class="card-remove" title="Remove section">×</button>
    `;
    card.querySelector('.card-remove').setAttribute('aria-label', `Remove ${label} section`);
    card.querySelector('.card-remove').addEventListener('click', e => {
      e.stopPropagation();
      activeSections.splice(idx, 1);
      renderAll();
      scheduleSave();
    });
    card.addEventListener('click', e => {
      if (e.target.classList.contains('card-remove')) return;
      const block = document.querySelector(`.section-block[data-instance-id="${section.instanceId}"]`);
      if (block) {
        block.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const ta = block.querySelector('.section-textarea');
        if (ta) ta.focus();
      }
    });
    list.appendChild(card);
  });

  initSortable();
}

function renderSidebarLibrary() {
  const list = document.getElementById('sidebar-library-list');
  const activeIds = activeSections.map(s => s.id);
  list.innerHTML = '';

  SECTION_LIBRARY.forEach(def => {
    const btn = document.createElement('button');
    const isAdded = !def.custom && activeIds.includes(def.id);
    btn.className = 'sidebar-lib-item' + (def.custom ? ' lib-custom' : '') + (isAdded ? ' added' : '');
    btn.innerHTML = `${def.custom ? '<span>+</span>' : ''}<span>${def.label}</span>${isAdded ? ' <span style="margin-left:auto;font-size:11px;color:var(--accent)">✓</span>' : ''}`;
    btn.addEventListener('click', () => toggleSection(def.id));
    list.appendChild(btn);
  });
}

/* ── Section toggle ── */
function toggleSection(defId) {
  const def = SECTION_LIBRARY.find(d => d.id === defId);
  if (!def) return;

  if (def.custom) {
    addSection(def);
  } else {
    const idx = activeSections.findIndex(s => s.id === defId);
    if (idx !== -1) {
      activeSections.splice(idx, 1);
    } else {
      addSection(def);
    }
  }
  renderAll();
  scheduleSave();
}

function addSection(def) {
  activeSections.push({
    id: def.id,
    instanceId: uid(),
    heading: def.heading,
    content: def.template,
  });
}

/* ── Auto-resize textarea ── */
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

/* ── Syntax highlighting ── */
// Inline formatting — called on any text fragment after line-level tokens are handled
function highlightInline(s) {
  s = s.replace(/(`[^`]+`)/g,           m => `<span class="syn-code">${m}</span>`);
  s = s.replace(/(!\[[^\]]*\]\([^)]*\))/g, m => `<span class="syn-image">${m}</span>`);
  s = s.replace(/(\[[^\]]+\]\([^)]*\))/g,  m => `<span class="syn-link">${m}</span>`);
  s = s.replace(/(~~[^~\n]+~~)/g,        m => `<span class="syn-strike">${m}</span>`);
  s = s.replace(/(\*\*\*[^*\n]+\*\*\*)/g, m => `<span class="syn-bold"><em>${m}</em></span>`);
  s = s.replace(/(\*\*[^*\n]+\*\*)/g,   m => `<span class="syn-bold">${m}</span>`);
  s = s.replace(/(\*[^*\n]+\*)/g,       m => `<span class="syn-italic">${m}</span>`);
  return s;
}

function highlight(raw) {
  // 1. Escape HTML
  let text = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Protect multi-line code blocks
  const blocks = [];
  text = text.replace(/(```[\s\S]*?```)/g, m => {
    blocks.push(`<span class="syn-code">${m}</span>`);
    return `\x00BLOCK${blocks.length - 1}\x00`;
  });

  // 3. Line-by-line processing
  text = text.split('\n').map(line => {
    // Heading — colour the # marker, then process the rest inline
    const hMatch = line.match(/^(#{1,6} )(.*)/);
    if (hMatch) {
      const lvl = Math.min(hMatch[1].trim().length, 3);
      return `<span class="syn-h${lvl}">${hMatch[1]}</span>${highlightInline(hMatch[2])}`;
    }
    // Blockquote — colour the > marker, process rest inline
    const bqMatch = line.match(/^(&gt; ?)(.*)/);
    if (bqMatch) {
      return `<span class="syn-quote">${bqMatch[1]}</span>${highlightInline(bqMatch[2])}`;
    }
    // HR
    if (/^---+$/.test(line.trim())) return `<span class="syn-quote">${line}</span>`;
    // List marker colour, then inline on the rest
    const ulMatch = line.match(/^(\s*)([-*+] )(.*)/);
    if (ulMatch) {
      return `${ulMatch[1]}<span class="syn-list">${ulMatch[2]}</span>${highlightInline(ulMatch[3])}`;
    }
    const olMatch = line.match(/^(\s*)(\d+\. )(.*)/);
    if (olMatch) {
      return `${olMatch[1]}<span class="syn-list">${olMatch[2]}</span>${highlightInline(olMatch[3])}`;
    }

    return highlightInline(line);
  }).join('\n');

  // 4. Restore code blocks
  text = text.replace(/\x00BLOCK(\d+)\x00/g, (_, i) => blocks[i]);

  return text;
}

function updateOverlay(overlay, content) {
  overlay.innerHTML = highlight(content);
}

/* ── Active sections rendering ── */
function renderActiveSections() {
  const container = document.getElementById('active-sections');

  if (activeSections.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>Start your README</h3>
        <p>Click sections in the sidebar to add them to your document.</p>
      </div>`;
    return;
  }

  container.innerHTML = '';

  activeSections.forEach((section, idx) => {
    const block = document.createElement('div');
    block.className = 'section-block';
    block.dataset.instanceId = section.instanceId;

    block.innerHTML = `
      <div class="section-block-header">
        <input class="section-title-input" type="text" value="${escapeAttr(section.heading)}" placeholder="Section heading" />
        <button class="section-remove" title="Remove section">×</button>
      </div>
      <div class="editor-wrapper">
        <div class="syntax-overlay" aria-hidden="true"></div>
        <textarea class="section-textarea" spellcheck="false" placeholder="Write here…">${escapeHtml(section.content)}</textarea>
      </div>
    `;

    const titleInput = block.querySelector('.section-title-input');
    titleInput.addEventListener('input', () => {
      section.heading = titleInput.value;
      // Keep sidebar card label in sync without full re-render
      const card = document.querySelector(`.sidebar-active-card[data-instance-id="${section.instanceId}"] .card-label`);
      if (card) card.textContent = titleInput.value.trim() || 'Untitled';
      textarea.setAttribute('aria-label', (titleInput.value.trim() || 'Untitled section') + ' content');
      scheduleSave();
      updatePreview();
    });

    const overlay = block.querySelector('.syntax-overlay');
    updateOverlay(overlay, section.content);

    const textarea = block.querySelector('.section-textarea');
    textarea.setAttribute('aria-label', (section.heading.trim() || 'Untitled section') + ' content');
    textarea.addEventListener('focus', () => { activeTextarea = textarea; });
    textarea.addEventListener('blur', () => { if (activeTextarea === textarea) activeTextarea = null; });
    textarea.addEventListener('input', () => {
      section.content = textarea.value;
      autoResize(textarea);
      updateOverlay(overlay, textarea.value);
      scheduleSave();
      updatePreview();
    });
    textarea.addEventListener('keydown', handleTabKey);

    const removeBtn = block.querySelector('.section-remove');
    removeBtn.setAttribute('aria-label', `Remove ${section.heading.trim() || 'untitled'} section`);
    removeBtn.addEventListener('click', () => {
      activeSections.splice(idx, 1);
      renderAll();
      scheduleSave();
    });

    container.appendChild(block);
    autoResize(textarea);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ── Sortable ── */
function initSortable() {
  const container = document.getElementById('sidebar-active-list');
  if (sortable) sortable.destroy();
  sortable = Sortable.create(container, {
    animation: 150,
    handle: '.card-drag',
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    onEnd(evt) {
      const moved = activeSections.splice(evt.oldIndex, 1)[0];
      activeSections.splice(evt.newIndex, 0, moved);
      scheduleSave();
      // Re-render editor and preview to match new order
      renderActiveSections();
      updatePreview();
    },
  });
}

/* ── Preview ── */
function updatePreview() {
  const md = buildMarkdown(false);
  document.getElementById('preview-content').innerHTML = marked.parse(md || '*No content yet.*');
}

function buildMarkdown(forExport = true) {
  const parts = [];
  activeSections.forEach(section => {
    const content = section.content.trim();
    // Skip template placeholders for export
    if (forExport && isPlaceholder(content)) return;
    const heading = section.heading.trim();
    parts.push(heading ? `## ${heading}\n\n${content}` : content);
  });
  return parts.join('\n\n---\n\n');
}

function isPlaceholder(content) {
  // If content matches the original template exactly, consider it empty for export
  return SECTION_LIBRARY.some(def => content === def.template.trim()) || content === '';
}

/* ── Tab key in textarea ── */
function handleTabKey(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    ta.value = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
    ta.selectionStart = ta.selectionEnd = start + 2;
    ta.dispatchEvent(new Event('input'));
  }
}

/* ── Formatting toolbar ── */

// Returns the last-focused textarea. Because toolbar buttons use preventDefault
// on mousedown, the textarea never loses focus — so activeTextarea is always current.
function getTA() {
  return activeTextarea;
}

function triggerUpdate(ta) {
  autoResize(ta);
  ta.dispatchEvent(new Event('input'));
}

// Wrap selection in markers. If nothing selected, insert markers and place cursor inside.
function wrapSelection(before, after = before) {
  const ta = getTA();
  if (!ta) return;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const selected = ta.value.slice(start, end);
  ta.value = ta.value.slice(0, start) + before + selected + after + ta.value.slice(end);
  if (selected.length > 0) {
    // Had selection: keep it selected inside the markers
    ta.selectionStart = start + before.length;
    ta.selectionEnd = start + before.length + selected.length;
  } else {
    // No selection: place cursor between markers so user types straight into them
    ta.selectionStart = ta.selectionEnd = start + before.length;
  }
  ta.focus();
  triggerUpdate(ta);
}

function insertLine(prefix) {
  const ta = getTA();
  if (!ta) return;
  const start = ta.selectionStart;
  const lineStart = ta.value.lastIndexOf('\n', start - 1) + 1;
  ta.value = ta.value.slice(0, lineStart) + prefix + ta.value.slice(lineStart);
  ta.selectionStart = ta.selectionEnd = start + prefix.length;
  ta.focus();
  triggerUpdate(ta);
}

function insertAtCursor(text, cursorOffset = null) {
  const ta = getTA();
  if (!ta) return;
  const start = ta.selectionStart;
  ta.value = ta.value.slice(0, start) + text + ta.value.slice(ta.selectionEnd);
  ta.selectionStart = ta.selectionEnd = cursorOffset !== null ? start + cursorOffset : start + text.length;
  ta.focus();
  triggerUpdate(ta);
}

function applyHeading(level) {
  const ta = getTA();
  if (!ta) return;
  const prefix = '#'.repeat(level) + ' ';
  const start = ta.selectionStart;
  const lineStart = ta.value.lastIndexOf('\n', start - 1) + 1;
  const lineEnd = ta.value.indexOf('\n', start);
  const end = lineEnd === -1 ? ta.value.length : lineEnd;
  const line = ta.value.slice(lineStart, end);
  // Strip any existing heading prefix before applying the new one
  const stripped = line.replace(/^#{1,6} /, '');
  const newLine = prefix + stripped;
  ta.value = ta.value.slice(0, lineStart) + newLine + ta.value.slice(end);
  ta.selectionStart = ta.selectionEnd = lineStart + newLine.length;
  ta.focus();
  triggerUpdate(ta);
}

function applyLink() {
  const ta = getTA();
  if (!ta) return;
  // Capture selection before prompt (prompt doesn't steal textarea selection)
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const sel = ta.value.slice(start, end);
  const url = prompt('Enter URL:');
  if (!url) { ta.focus(); return; }
  const linkText = sel || 'link text';
  const replacement = `[${linkText}](${url})`;
  ta.value = ta.value.slice(0, start) + replacement + ta.value.slice(end);
  // Select the link text so student can immediately overtype it
  ta.selectionStart = start + 1;
  ta.selectionEnd = start + 1 + linkText.length;
  ta.focus();
  triggerUpdate(ta);
}

function applyImage() {
  const ta = getTA();
  if (!ta) return;
  const url = prompt('Enter image URL or path:');
  if (!url) { ta.focus(); return; }
  const alt = prompt('Alt text (describe the image):') || 'image';
  insertAtCursor(`![${alt}](${url})`);
}

function applyCodeBlock() {
  const ta = getTA();
  if (!ta) return;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const selected = ta.value.slice(start, end);
  const inner = selected || '';
  const replacement = '```\n' + inner + '\n```';
  ta.value = ta.value.slice(0, start) + replacement + ta.value.slice(end);
  // Place cursor on the blank line inside the block
  ta.selectionStart = ta.selectionEnd = start + 4 + inner.length;
  ta.focus();
  triggerUpdate(ta);
}

/* ── Keyboard shortcuts ── */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    const ta = activeTextarea || document.querySelector('.section-textarea:focus');
    if (!ta) return;
    if (e.key === 'b') { e.preventDefault(); wrapSelection('**'); }
    if (e.key === 'i') { e.preventDefault(); wrapSelection('*'); }
    if (e.key === 'k') { e.preventDefault(); applyLink(); }
  });
}

/* ── Export ── */
function copyMarkdown() {
  const md = buildMarkdown(true);
  if (!md) { showToast('Nothing to copy — add some sections first!'); return; }
  navigator.clipboard.writeText(md).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = md;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied to clipboard!');
  });
}

function downloadMarkdown() {
  const md = buildMarkdown(true);
  if (!md) { showToast('Nothing to download — add some sections first!'); return; }
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'README.md';
  a.click();
  URL.revokeObjectURL(url);
  showToast('README.md downloaded!');
}

/* ── Reset ── */
function confirmReset() {
  document.getElementById('modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('modal-cancel').focus(), 50);
}

function doReset() {
  activeSections = [];
  localStorage.removeItem('readme-editor-v1');
  localStorage.removeItem('readme-editor-saved');
  saveTimestamp = null;
  document.getElementById('modal-overlay').classList.remove('open');
  renderAll();
  showToast('Editor reset.');
}

/* ── Cheat sheet ── */
function toggleCheatsheet() {
  const panel = document.getElementById('cheatsheet');
  const btn = document.getElementById('cheatsheet-btn');
  const isOpen = panel.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}

/* ── Render all ── */
function renderAll() {
  renderSidebar();
  renderActiveSections();
  updatePreview();
}

/* ── Synchronized scrolling ── */
function initSyncScroll() {
  const editor = document.getElementById('active-sections');
  const preview = document.getElementById('preview');
  let scrollingEditor = false;
  let scrollingPreview = false;

  function syncScroll(source, target, lockSource, lockTarget) {
    if (lockTarget) return; // the other pane triggered this, ignore
    lockSource = true;
    const ratio = source.scrollTop / (source.scrollHeight - source.clientHeight || 1);
    target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);
    requestAnimationFrame(() => { lockSource = false; });
  }

  editor.addEventListener('scroll', () => {
    if (scrollingPreview) return;
    scrollingEditor = true;
    const ratio = editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);
    preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);
    requestAnimationFrame(() => { scrollingEditor = false; });
  });

  preview.addEventListener('scroll', () => {
    if (scrollingEditor) return;
    scrollingPreview = true;
    const ratio = preview.scrollTop / (preview.scrollHeight - preview.clientHeight || 1);
    editor.scrollTop = ratio * (editor.scrollHeight - editor.clientHeight);
    requestAnimationFrame(() => { scrollingPreview = false; });
  });
}

/* ── Init ── */
function init() {
  initTheme();
  loadFromStorage();

  // Status bar save time
  document.getElementById('save-status').textContent = formatSaveTime(saveTimestamp);

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Cheat sheet
  document.getElementById('cheatsheet-btn').addEventListener('click', toggleCheatsheet);

  // Toolbar — prevent mousedown from stealing focus off the textarea
  document.getElementById('toolbar').addEventListener('mousedown', e => {
    if (e.target.closest('button, select')) e.preventDefault();
  });

  document.getElementById('tb-bold').addEventListener('click', () => wrapSelection('**'));
  document.getElementById('tb-italic').addEventListener('click', () => wrapSelection('*'));
  document.getElementById('tb-strike').addEventListener('click', () => wrapSelection('~~'));
  document.getElementById('tb-h1').addEventListener('click', () => applyHeading(1));
  document.getElementById('tb-h2').addEventListener('click', () => applyHeading(2));
  document.getElementById('tb-h3').addEventListener('click', () => applyHeading(3));
  document.getElementById('tb-link').addEventListener('click', applyLink);
  document.getElementById('tb-image').addEventListener('click', applyImage);
  document.getElementById('tb-ul').addEventListener('click', () => insertLine('- '));
  document.getElementById('tb-ol').addEventListener('click', () => insertLine('1. '));
  document.getElementById('tb-code').addEventListener('click', applyCodeBlock);
  document.getElementById('tb-quote').addEventListener('click', () => insertLine('> '));

  // Export
  document.getElementById('copy-btn').addEventListener('click', copyMarkdown);
  document.getElementById('download-btn').addEventListener('click', downloadMarkdown);

  // Reset
  document.getElementById('reset-btn').addEventListener('click', confirmReset);
  document.getElementById('modal-cancel').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('open');
  });
  document.getElementById('modal-confirm').addEventListener('click', doReset);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) {
      document.getElementById('modal-overlay').classList.remove('open');
    }
  });

  // Modal focus trap and Escape key
  document.getElementById('modal-overlay').addEventListener('keydown', e => {
    if (!document.getElementById('modal-overlay').classList.contains('open')) return;
    if (e.key === 'Escape') {
      document.getElementById('modal-overlay').classList.remove('open');
      document.getElementById('reset-btn').focus();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = ['modal-cancel', 'modal-confirm'].map(id => document.getElementById(id));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  initKeyboardShortcuts();
  initSyncScroll();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
