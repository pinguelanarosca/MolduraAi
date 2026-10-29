import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectAiPlatform,
  AI_PLATFORMS,
  generateManifest,
  generateContentCss,
  generateContentScript,
  generatePopupHtml,
  generatePopupJs,
  generatePopupCss,
  generateOptionsHtml,
} from './aiDetector';

test('detectAiPlatform identifies ChatGPT URLs accurately', () => {
  const result1 = detectAiPlatform('https://chatgpt.com');
  assert.equal(result1?.id, 'chatgpt');
  assert.equal(result1?.primaryNeon, '#10A37F');

  const result2 = detectAiPlatform('https://chat.openai.com/c/123-abc');
  assert.equal(result2?.id, 'chatgpt');
});

test('detectAiPlatform identifies Google Gemini and AI Studio accurately', () => {
  const result1 = detectAiPlatform('https://gemini.google.com/app');
  assert.equal(result1?.id, 'gemini');
  assert.equal(result1?.colorName, 'Azul Fluorescente');

  const result2 = detectAiPlatform('https://aistudio.google.com/apps');
  assert.equal(result2?.id, 'gemini');
});

test('detectAiPlatform identifies Claude (Anthropic) accurately', () => {
  const result = detectAiPlatform('https://claude.ai/new');
  assert.equal(result?.id, 'claude');
  assert.equal(result?.colorName, 'Alaranjado Fluorescente');
});

test('detectAiPlatform identifies Grok on grok.com and X.com accurately', () => {
  const result1 = detectAiPlatform('https://grok.com');
  assert.equal(result1?.id, 'grok');
  assert.equal(result1?.colorName, 'Amarelo Fluorescente');

  const result2 = detectAiPlatform('https://x.com/i/grok');
  assert.equal(result2?.id, 'grok');
});

test('detectAiPlatform identifies Meta AI accurately', () => {
  const result = detectAiPlatform('https://meta.ai');
  assert.equal(result?.id, 'meta');
  assert.equal(result?.colorName, 'Roxo Fluorescente');
});

test('detectAiPlatform returns null for non-AI platforms', () => {
  assert.equal(detectAiPlatform('https://google.com'), null);
  assert.equal(detectAiPlatform('https://github.com'), null);
  assert.equal(detectAiPlatform('https://wikipedia.org'), null);
  assert.equal(detectAiPlatform(''), null);
});

test('generateManifest outputs valid Manifest V3 structure with popup and storage', () => {
  const manifest = generateManifest() as any;
  assert.equal(manifest.manifest_version, 3);
  assert.ok(manifest.permissions.includes('storage'));
  assert.equal(manifest.action.default_popup, 'popup.html');
  assert.equal(manifest.options_page, 'options.html');
  assert.ok(manifest.content_scripts.length > 0);
  assert.ok(manifest.content_scripts[0].matches.some((m: string) => m.includes('chatgpt.com')));
  assert.ok(manifest.content_scripts[0].matches.some((m: string) => m.includes('gemini.google.com')));
  assert.ok(manifest.content_scripts[0].matches.some((m: string) => m.includes('claude.ai')));
  assert.ok(manifest.content_scripts[0].matches.some((m: string) => m.includes('grok.com')));
  assert.ok(manifest.content_scripts[0].matches.some((m: string) => m.includes('meta.ai')));
});

test('generateContentCss contains keyframes and border properties', () => {
  const css = generateContentCss();
  assert.ok(css.includes('aiAuraSpin'));
  assert.ok(css.includes('conic-gradient'));
  assert.ok(css.includes('#ffffff'));
  assert.ok(css.includes('border-width: var(--ai-border-thickness, 3.5px)'));
});

test('generateContentScript handles chrome.storage sync and observer', () => {
  const script = generateContentScript();
  assert.ok(script.includes('chrome.storage.sync'));
  assert.ok(script.includes('chrome.storage.onChanged'));
  assert.ok(script.includes('MutationObserver'));
});

test('generatePopupHtml contains all required control groups matching options', () => {
  const html = generatePopupHtml();
  assert.ok(html.includes('Espessura da Moldura'));
  assert.ok(html.includes('Velocidade do Fluxo'));
  assert.ok(html.includes('Aura Fluorescente'));
  assert.ok(html.includes('check_chatgpt'));
  assert.ok(html.includes('check_gemini'));
  assert.ok(html.includes('check_claude'));
  assert.ok(html.includes('check_grok'));
  assert.ok(html.includes('check_meta'));
});

test('generatePopupJs contains storage listener and button group handlers', () => {
  const js = generatePopupJs();
  assert.ok(js.includes('thicknessGroup'));
  assert.ok(js.includes('speedGroup'));
  assert.ok(js.includes('glowGroup'));
  assert.ok(js.includes('chrome.storage.sync.set'));
});
