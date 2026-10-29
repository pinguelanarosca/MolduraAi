// Lógica do Popup / Menu de Opções
(function () {
  const DEFAULT_SETTINGS = {
    borderThickness: 3.5,
    animationSpeed: 4.0,
    glowIntensity: 'high',
    enabledPlatforms: {
      chatgpt: true,
      gemini: true,
      claude: true,
      grok: true,
      meta: true
    }
  };

  let state = { ...DEFAULT_SETTINGS };

  function updatePreview() {
    const box = document.getElementById('miniPreviewBox');
    const border = document.getElementById('miniBorder');
    const bloom = document.getElementById('miniBloom');
    if (!box || !border) return;

    border.style.borderWidth = state.borderThickness + 'px';
    border.style.setProperty('--active-speed', state.animationSpeed + 's');
    bloom.style.opacity = state.glowIntensity === 'high' ? '1' : '0.4';
  }

  function saveSettings() {
    updatePreview();
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ aiAuraSettings: state });
    } else {
      localStorage.setItem('aiAuraSettings', JSON.stringify(state));
    }
  }

  function setupButtonGroup(containerId, stateKey, parser) {
    const group = document.getElementById(containerId);
    if (!group) return;

    const buttons = group.querySelectorAll('.ctrl-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state[stateKey] = parser ? parser(btn.dataset.val) : btn.dataset.val;
        saveSettings();
      });
    });
  }

  function setupCheckbox(id, platformKey) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      state.enabledPlatforms[platformKey] = el.checked;
      saveSettings();
    });
  }

  function renderState() {
    // Thickness
    const thicknessBtns = document.querySelectorAll('#thicknessGroup .ctrl-btn');
    thicknessBtns.forEach((b) => {
      b.classList.toggle('active', parseFloat(b.dataset.val) === state.borderThickness);
    });

    // Speed
    const speedBtns = document.querySelectorAll('#speedGroup .ctrl-btn');
    speedBtns.forEach((b) => {
      b.classList.toggle('active', parseFloat(b.dataset.val) === state.animationSpeed);
    });

    // Glow
    const glowBtns = document.querySelectorAll('#glowGroup .ctrl-btn');
    glowBtns.forEach((b) => {
      b.classList.toggle('active', b.dataset.val === state.glowIntensity);
    });

    // Checkboxes
    const keys = ['chatgpt', 'gemini', 'claude', 'grok', 'meta'];
    keys.forEach((k) => {
      const el = document.getElementById('check_' + k);
      if (el) {
        el.checked = state.enabledPlatforms?.[k] !== false;
      }
    });

    updatePreview();
  }

  function init() {
    setupButtonGroup('thicknessGroup', 'borderThickness', parseFloat);
    setupButtonGroup('speedGroup', 'animationSpeed', parseFloat);
    setupButtonGroup('glowGroup', 'glowIntensity', String);

    setupCheckbox('check_chatgpt', 'chatgpt');
    setupCheckbox('check_gemini', 'gemini');
    setupCheckbox('check_claude', 'claude');
    setupCheckbox('check_grok', 'grok');
    setupCheckbox('check_meta', 'meta');

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['aiAuraSettings'], (res) => {
        if (res && res.aiAuraSettings) {
          state = { ...DEFAULT_SETTINGS, ...res.aiAuraSettings };
        }
        renderState();
      });
    } else {
      const stored = localStorage.getItem('aiAuraSettings');
      if (stored) {
        try {
          state = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        } catch (e) {}
      }
      renderState();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
