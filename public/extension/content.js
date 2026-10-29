/**
 * Moldura de IA - Content Script com Sincronização de Opções
 * Identifica automaticamente sites de IA e aplica a moldura luminosa animada
 */

(function () {
  'use strict';

  const CONFIGS = {
    chatgpt: {
      neon: '#10A37F',
      accent: '#34D399',
      glow: 'rgba(16, 185, 129, 0.45)',
      name: 'ChatGPT'
    },
    gemini: {
      neon: '#2563EB',
      accent: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.5)',
      name: 'Google Gemini'
    },
    claude: {
      neon: '#EA580C',
      accent: '#FB923C',
      glow: 'rgba(251, 146, 60, 0.5)',
      name: 'Claude'
    },
    grok: {
      neon: '#EAB308',
      accent: '#FEF08A',
      glow: 'rgba(250, 204, 21, 0.55)',
      name: 'Grok'
    },
    meta: {
      neon: '#C026D3',
      accent: '#F472B6',
      glow: 'rgba(217, 70, 239, 0.5)',
      name: 'Meta AI'
    }
  };

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

  let currentSettings = { ...DEFAULT_SETTINGS };

  function detectCurrentAiKey() {
    const host = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const full = host + pathname;

    if (host.includes('chatgpt.com') || host.includes('chat.openai.com')) return 'chatgpt';
    if (host.includes('gemini.google.com') || host.includes('aistudio.google.com')) return 'gemini';
    if (host.includes('claude.ai')) return 'claude';
    if (host.includes('grok.com') || full.includes('x.com/i/grok') || full.includes('twitter.com/i/grok')) return 'grok';
    if (host.includes('meta.ai')) return 'meta';
    return null;
  }

  function applyAuraFrame() {
    const aiKey = detectCurrentAiKey();
    if (!aiKey) return;

    const isEnabled = currentSettings.enabledPlatforms?.[aiKey] !== false;
    let root = document.getElementById('ai-screen-aura-root');

    if (!isEnabled) {
      if (root) root.remove();
      return;
    }

    const aiConfig = CONFIGS[aiKey];
    if (!root) {
      root = document.createElement('div');
      root.id = 'ai-screen-aura-root';
      root.setAttribute('aria-hidden', 'true');

      const glowBloom = document.createElement('div');
      glowBloom.className = 'ai-aura-glow-bloom';

      const borderLine = document.createElement('div');
      borderLine.className = 'ai-aura-border-line';

      root.appendChild(glowBloom);
      root.appendChild(borderLine);
      document.documentElement.appendChild(root);
    }

    // Configura variáveis CSS com base nas opções salvas
    root.style.setProperty('--ai-neon-base', aiConfig.neon);
    root.style.setProperty('--ai-neon-accent', aiConfig.accent);
    root.style.setProperty('--ai-neon-glow', aiConfig.glow);
    root.style.setProperty('--ai-border-thickness', currentSettings.borderThickness + 'px');
    root.style.setProperty('--ai-spin-duration', currentSettings.animationSpeed + 's');
    root.style.setProperty('--ai-bloom-opacity', currentSettings.glowIntensity === 'high' ? '0.85' : '0.45');
  }

  // Carrega opções salvas do chrome.storage
  function loadSettingsAndApply() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['aiAuraSettings'], (res) => {
        if (res && res.aiAuraSettings) {
          currentSettings = { ...DEFAULT_SETTINGS, ...res.aiAuraSettings };
        }
        applyAuraFrame();
      });
    } else {
      applyAuraFrame();
    }
  }

  // Ouve mudanças de opções em tempo real (quando o usuário altera no popup ou menu)
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.aiAuraSettings) {
        currentSettings = { ...DEFAULT_SETTINGS, ...changes.aiAuraSettings.newValue };
        applyAuraFrame();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSettingsAndApply);
  } else {
    loadSettingsAndApply();
  }

  // Suporte a Single Page Apps (SPA) como Twitter/X navegando para /i/grok
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      applyAuraFrame();
    }
  }).observe(document, { subtree: true, childList: true });
})();
