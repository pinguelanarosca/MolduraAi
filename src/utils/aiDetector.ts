export interface AiPlatformConfig {
  id: 'chatgpt' | 'gemini' | 'claude' | 'grok' | 'meta';
  name: string;
  tagline: string;
  domainHints: string[];
  urlPatterns: string[];
  colorName: string;
  primaryNeon: string; // The vibrant fluorescent color requested by the user
  accentColor: string; // Midpoint for glowing shine
  whiteHighlight: string; // #ffffff
  glowRgba: string; // Translucent glow for shadow aura
  badgeBg: string;
  sampleUrl: string;
  description: string;
}

export const AI_PLATFORMS: Record<string, AiPlatformConfig> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'OpenAI',
    domainHints: ['chatgpt.com', 'chat.openai.com'],
    urlPatterns: [
      '*://*.chatgpt.com/*',
      '*://chatgpt.com/*',
      '*://chat.openai.com/*',
    ],
    colorName: 'Verde Fluorescente',
    primaryNeon: '#10A37F',
    accentColor: '#34D399',
    whiteHighlight: '#FFFFFF',
    glowRgba: 'rgba(16, 185, 129, 0.45)',
    badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    sampleUrl: 'https://chatgpt.com',
    description: 'Borda verde fluorescente pulsando com fluxo branco.',
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    tagline: 'Google AI / AI Studio',
    domainHints: ['gemini.google.com', 'aistudio.google.com'],
    urlPatterns: [
      '*://gemini.google.com/*',
      '*://aistudio.google.com/*',
    ],
    colorName: 'Azul Fluorescente',
    primaryNeon: '#2563EB',
    accentColor: '#38BDF8',
    whiteHighlight: '#FFFFFF',
    glowRgba: 'rgba(56, 189, 248, 0.5)',
    badgeBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    sampleUrl: 'https://gemini.google.com',
    description: 'Borda azul fluorescente inspirada no AI Studio e Gemini.',
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    tagline: 'Anthropic',
    domainHints: ['claude.ai'],
    urlPatterns: ['*://*.claude.ai/*', '*://claude.ai/*'],
    colorName: 'Alaranjado Fluorescente',
    primaryNeon: '#EA580C',
    accentColor: '#FB923C',
    whiteHighlight: '#FFFFFF',
    glowRgba: 'rgba(251, 146, 60, 0.5)',
    badgeBg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    sampleUrl: 'https://claude.ai',
    description: 'Borda no tom alaranjado clássico característico do Claude.',
  },
  grok: {
    id: 'grok',
    name: 'Grok',
    tagline: 'xAI',
    domainHints: ['grok.com', 'x.com/i/grok', 'twitter.com/i/grok'],
    urlPatterns: [
      '*://*.grok.com/*',
      '*://grok.com/*',
      '*://x.com/i/grok*',
      '*://twitter.com/i/grok*',
    ],
    colorName: 'Amarelo Fluorescente',
    primaryNeon: '#EAB308',
    accentColor: '#FEF08A',
    whiteHighlight: '#FFFFFF',
    glowRgba: 'rgba(250, 204, 21, 0.55)',
    badgeBg: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    sampleUrl: 'https://grok.com',
    description: 'Borda amarelo fluorescente com reflexo branco em fluxo contínuo.',
  },
  meta: {
    id: 'meta',
    name: 'Meta AI',
    tagline: 'Meta',
    domainHints: ['meta.ai'],
    urlPatterns: ['*://*.meta.ai/*', '*://meta.ai/*'],
    colorName: 'Roxo Fluorescente',
    primaryNeon: '#C026D3',
    accentColor: '#F472B6',
    whiteHighlight: '#FFFFFF',
    glowRgba: 'rgba(217, 70, 239, 0.5)',
    badgeBg: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30',
    sampleUrl: 'https://meta.ai',
    description: 'Borda roxo fluorescente vibrante com ondas luminosas brancas.',
  },
};

/**
 * Normalizes and detects which AI platform a URL or host belongs to.
 */
export function detectAiPlatform(rawUrlOrHost: string): AiPlatformConfig | null {
  if (!rawUrlOrHost) return null;

  let testStr = rawUrlOrHost.trim().toLowerCase();
  
  try {
    if (testStr.includes('://')) {
      const parsed = new URL(testStr);
      testStr = `${parsed.hostname}${parsed.pathname}`;
    }
  } catch {
    // If not valid URL, use raw string
  }

  for (const platform of Object.values(AI_PLATFORMS)) {
    for (const hint of platform.domainHints) {
      if (testStr.includes(hint)) {
        return platform;
      }
    }
  }

  return null;
}

/**
 * Generates the CSS rules for the animated flowing border.
 */
export function generateContentCss(): string {
  return `/* ============================================================
   Moldura de IA - Google Chrome Extension
   Borda luminosa animada sincronizada entre branco e cor neon
   ============================================================ */

@property --ai-aura-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

#ai-screen-aura-root {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
  z-index: 2147483647 !important;
  overflow: hidden !important;
  transition: opacity 0.3s ease;
}

.ai-aura-border-line {
  position: absolute !important;
  inset: 0 !important;
  box-sizing: border-box !important;
  border-radius: 0px !important;
  pointer-events: none !important;
  border-style: solid !important;
  border-color: transparent !important;
  border-width: var(--ai-border-thickness, 3.5px) !important;
  
  /* Gradiente cônico que faz o feixe fluir continuamente entre branco e neon */
  background: 
    conic-gradient(
      from var(--ai-aura-angle),
      var(--ai-neon-base) 0deg,
      #ffffff 35deg,
      var(--ai-neon-accent) 70deg,
      var(--ai-neon-base) 140deg,
      #ffffff 180deg,
      var(--ai-neon-accent) 215deg,
      var(--ai-neon-base) 280deg,
      #ffffff 320deg,
      var(--ai-neon-base) 360deg
    ) border-box !important;
    
  -webkit-mask: 
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
          
  animation: aiAuraSpin var(--ai-spin-duration, 4s) linear infinite !important;
}

/* Aura / Bloom exterior suave */
.ai-aura-glow-bloom {
  position: absolute !important;
  inset: 0 !important;
  pointer-events: none !important;
  box-shadow: 
    inset 0 0 16px 2px var(--ai-neon-glow),
    0 0 18px 3px var(--ai-neon-glow) !important;
  animation: aiAuraPulse 3s ease-in-out infinite alternate !important;
  opacity: var(--ai-bloom-opacity, 0.75) !important;
}

/* Rotação angular contínua */
@keyframes aiAuraSpin {
  0% {
    --ai-aura-angle: 0deg;
  }
  100% {
    --ai-aura-angle: 360deg;
  }
}

/* Pulsação sutil na intensidade da aura */
@keyframes aiAuraPulse {
  0% {
    opacity: calc(var(--ai-bloom-opacity, 0.75) * 0.7);
  }
  100% {
    opacity: var(--ai-bloom-opacity, 0.75);
  }
}
`;
}

/**
 * Generates the content script for Chrome Extension with real-time settings support.
 */
export function generateContentScript(): string {
  return `/**
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
`;
}

/**
 * Generates Manifest V3 with action popup, options page and storage permissions.
 */
export function generateManifest(): object {
  const allMatches: string[] = [];
  for (const p of Object.values(AI_PLATFORMS)) {
    allMatches.push(...p.urlPatterns);
  }

  return {
    manifest_version: 3,
    name: 'Moldura de IA - Identificador Visual',
    version: '1.2.0',
    description: 'Moldura luminosa animada ao redor da tela com menu de opções idêntico para configurar espessura, velocidade, aura e IAs ativas.',
    permissions: ['storage'],
    action: {
      default_popup: 'popup.html',
      default_title: 'Moldura de IA - Opções',
      default_icon: {
        16: 'icon16.png',
        48: 'icon48.png',
        128: 'icon128.png',
      },
    },
    options_page: 'options.html',
    icons: {
      16: 'icon16.png',
      48: 'icon48.png',
      128: 'icon128.png',
    },
    content_scripts: [
      {
        matches: Array.from(new Set(allMatches)),
        js: ['content.js'],
        css: ['styles.css'],
        run_at: 'document_start',
        all_frames: false,
      },
    ],
  };
}

/**
 * Generates popup.html matching the exact options menu requested by the user.
 */
export function generatePopupHtml(): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Moldura de IA - Opções</title>
  <link rel="stylesheet" href="popup.css" />
</head>
<body>
  <div class="popup-container">
    <!-- Header -->
    <header class="popup-header">
      <div class="header-title-box">
        <div class="header-icon">✨</div>
        <div>
          <h1 class="header-title">Moldura de IA</h1>
          <p class="header-subtitle">Menu de Opções da Extensão</p>
        </div>
      </div>
      <span class="badge-v3">Manifest V3</span>
    </header>

    <!-- Mini Live Preview -->
    <div class="preview-card" id="miniPreviewBox">
      <div class="mini-bloom" id="miniBloom"></div>
      <div class="mini-border" id="miniBorder"></div>
      <div class="preview-inner">
        <span class="preview-tag" id="previewTag">Preview em Tempo Real</span>
        <span class="preview-sub" id="previewSub">Google Gemini (Azul)</span>
      </div>
    </div>

    <!-- Controls Section Identical to Applet Bar -->
    <section class="controls-panel">
      <!-- 1. Espessura da Moldura -->
      <div class="control-group">
        <label class="control-label">
          <span>📏 Espessura da Moldura:</span>
        </label>
        <div class="btn-group" id="thicknessGroup">
          <button type="button" class="ctrl-btn" data-val="2.5">2.5px</button>
          <button type="button" class="ctrl-btn active" data-val="3.5">3.5px (Ideal)</button>
          <button type="button" class="ctrl-btn" data-val="5.0">5px</button>
        </div>
      </div>

      <!-- 2. Velocidade do Fluxo -->
      <div class="control-group">
        <label class="control-label">
          <span>⚡ Velocidade do Fluxo:</span>
        </label>
        <div class="btn-group" id="speedGroup">
          <button type="button" class="ctrl-btn" data-val="5.5">Suave</button>
          <button type="button" class="ctrl-btn active" data-val="4.0">Normal</button>
          <button type="button" class="ctrl-btn" data-val="2.2">Rápido</button>
        </div>
      </div>

      <!-- 3. Aura Fluorescente -->
      <div class="control-group">
        <label class="control-label">
          <span>🔮 Aura Fluorescente:</span>
        </label>
        <div class="btn-group" id="glowGroup">
          <button type="button" class="ctrl-btn active" data-val="high">Neon Intenso</button>
          <button type="button" class="ctrl-btn" data-val="normal">Discreto</button>
        </div>
      </div>
    </section>

    <!-- Platform Toggles -->
    <section class="platforms-panel">
      <div class="section-heading">Ativar/Desativar por IA:</div>
      <div class="platform-list">
        <!-- ChatGPT -->
        <label class="platform-row">
          <div class="row-info">
            <span class="color-dot" style="background:#10A37F; box-shadow: 0 0 8px #10A37F;"></span>
            <span class="platform-name">ChatGPT</span>
            <span class="platform-color">Verde</span>
          </div>
          <input type="checkbox" id="check_chatgpt" checked />
        </label>

        <!-- Gemini -->
        <label class="platform-row">
          <div class="row-info">
            <span class="color-dot" style="background:#2563EB; box-shadow: 0 0 8px #2563EB;"></span>
            <span class="platform-name">Google Gemini</span>
            <span class="platform-color">Azul</span>
          </div>
          <input type="checkbox" id="check_gemini" checked />
        </label>

        <!-- Claude -->
        <label class="platform-row">
          <div class="row-info">
            <span class="color-dot" style="background:#EA580C; box-shadow: 0 0 8px #EA580C;"></span>
            <span class="platform-name">Claude</span>
            <span class="platform-color">Alaranjado</span>
          </div>
          <input type="checkbox" id="check_claude" checked />
        </label>

        <!-- Grok -->
        <label class="platform-row">
          <div class="row-info">
            <span class="color-dot" style="background:#EAB308; box-shadow: 0 0 8px #EAB308;"></span>
            <span class="platform-name">Grok</span>
            <span class="platform-color">Amarelo</span>
          </div>
          <input type="checkbox" id="check_grok" checked />
        </label>

        <!-- Meta AI -->
        <label class="platform-row">
          <div class="row-info">
            <span class="color-dot" style="background:#C026D3; box-shadow: 0 0 8px #C026D3;"></span>
            <span class="platform-name">Meta AI</span>
            <span class="platform-color">Roxo</span>
          </div>
          <input type="checkbox" id="check_meta" checked />
        </label>
      </div>
    </section>

    <!-- Footer status -->
    <footer class="popup-footer">
      <span class="status-indicator">✓ Opções sincronizadas automaticamente</span>
    </footer>
  </div>

  <script src="popup.js"></script>
</body>
</html>
`;
}

/**
 * Generates popup.css with matching dark palette, sleek buttons, and animations.
 */
export function generatePopupCss(): string {
  return `/* Estilos do Menu de Opções / Popup da Extensão */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  width: 360px;
  background-color: #020617;
  color: #f8fafc;
  user-select: none;
}

.popup-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 10px;
}

.header-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #2563eb, #c026d3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 11px;
  color: #94a3b8;
}

.badge-v3 {
  font-size: 10px;
  font-weight: 600;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  padding: 2px 6px;
  border-radius: 9999px;
}

/* Mini Preview Box */
@property --popup-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.preview-card {
  position: relative;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #090d16;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-border {
  position: absolute;
  inset: 0;
  border: 3.5px solid transparent;
  background: conic-gradient(
    from var(--popup-angle),
    var(--active-neon, #2563eb) 0deg,
    #ffffff 35deg,
    var(--active-accent, #38bdf8) 70deg,
    var(--active-neon, #2563eb) 140deg,
    #ffffff 180deg,
    var(--active-accent, #38bdf8) 215deg,
    var(--active-neon, #2563eb) 280deg,
    #ffffff 320deg,
    var(--active-neon, #2563eb) 360deg
  ) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: popupSpin var(--active-speed, 4s) linear infinite;
}

.mini-bloom {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 12px 1px var(--active-glow, rgba(56, 189, 248, 0.5));
}

@keyframes popupSpin {
  0% { --popup-angle: 0deg; }
  100% { --popup-angle: 360deg; }
}

.preview-inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

.preview-tag {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
}

.preview-sub {
  display: block;
  font-size: 10px;
  color: #94a3b8;
}

/* Controls Panel */
.controls-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 12px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.control-label {
  font-size: 11px;
  font-weight: 600;
  color: #cbd5e1;
}

.btn-group {
  display: flex;
  background: #020617;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid #1e293b;
  gap: 3px;
}

.ctrl-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ctrl-btn:hover {
  color: #ffffff;
}

.ctrl-btn.active {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* Platforms Panel */
.platforms-panel {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-heading {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.platform-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.platform-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 8px;
  background: #090d16;
  border: 1px solid #1e293b;
  cursor: pointer;
}

.platform-row:hover {
  border-color: #334155;
}

.row-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
}

.platform-name {
  font-size: 12px;
  font-weight: 600;
  color: #f1f5f9;
}

.platform-color {
  font-size: 10px;
  color: #64748b;
}

/* Toggle Checkbox */
input[type="checkbox"] {
  appearance: none;
  width: 32px;
  height: 18px;
  background: #334155;
  border-radius: 18px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background 0.2s;
}

input[type="checkbox"]:checked {
  background: #10b981;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  background: #ffffff;
  transition: transform 0.2s;
}

input[type="checkbox"]:checked::before {
  transform: translateX(14px);
}

.popup-footer {
  text-align: center;
  padding-top: 4px;
}

.status-indicator {
  font-size: 11px;
  color: #10b981;
  font-weight: 500;
}
`;
}

/**
 * Generates popup.js for Chrome extension storage sync.
 */
export function generatePopupJs(): string {
  return `// Lógica do Popup / Menu de Opções
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
`;
}

/**
 * Generates options.html for chrome://extensions details > options
 */
export function generateOptionsHtml(): string {
  return generatePopupHtml().replace('width: 360px;', 'width: 440px; margin: 40px auto; border: 1px solid #1e293b; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);');
}

/**
 * Generates clear Portuguese README for installing the extension.
 */
export function generateReadme(): string {
  return `# Moldura de IA - Extensão para Google Chrome (v1.2.0)

Extensão com moldura luminosa animada ao redor da tela e **Menu de Opções Idêntico**, permitindo personalizar:
- **Espessura da Moldura:** 2.5px, 3.5px (Ideal), 5px
- **Velocidade do Fluxo:** Suave (5.5s), Normal (4.0s), Rápido (2.2s)
- **Aura Fluorescente:** Neon Intenso ou Discreto
- **Ativação Individual por IA:** ChatGPT, Gemini, Claude, Grok, Meta AI

---

## Como Instalar no Google Chrome (em 20 segundos)

1. **Extraia** o arquivo \`.zip\` baixado em qualquer pasta do seu computador (por exemplo: \`Documentos/extensao-moldura-ia\`).
2. Abra o Google Chrome e digite na barra de endereços:  
   \`chrome://extensions\`
3. No canto superior direito, **ative a chave "Modo do desenvolvedor"** (Developer mode).
4. No canto superior esquerdo, clique no botão **"Carregar sem compactação"** (Load unpacked).
5. Selecione a pasta onde você descompactou os arquivos (a pasta que contém o arquivo \`manifest.json\`).
6. Pronto! A extensão está instalada.

---

## Como Usar o Menu de Opções
- Clique no ícone da extensão na barra de ferramentas do Chrome para abrir o **Menu de Opções Instantâneo**.
- Ou clique com o botão direito no ícone da extensão e escolha **Opções**.
- Todas as alterações são salvas automaticamente via \`chrome.storage\` e refletidas em tempo real em todas as abas de IA abertas!
`;
}
