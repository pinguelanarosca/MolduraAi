import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSettings, DEFAULT_SETTINGS } from './settings';

test('validateSettings returns default settings on null or undefined input', () => {
  assert.deepEqual(validateSettings(null), DEFAULT_SETTINGS);
  assert.deepEqual(validateSettings(undefined), DEFAULT_SETTINGS);
});

test('validateSettings validates thickness values correctly', () => {
  assert.equal(validateSettings({ borderThickness: 2.5 }).borderThickness, 2.5);
  assert.equal(validateSettings({ borderThickness: 3.5 }).borderThickness, 3.5);
  assert.equal(validateSettings({ borderThickness: 5.0 }).borderThickness, 5.0);
  assert.equal(validateSettings({ borderThickness: 99.0 as any }).borderThickness, 3.5); // Fallback
});

test('validateSettings validates animation speed correctly', () => {
  assert.equal(validateSettings({ animationSpeed: 2.2 }).animationSpeed, 2.2);
  assert.equal(validateSettings({ animationSpeed: 5.5 }).animationSpeed, 5.5);
  assert.equal(validateSettings({ animationSpeed: -1 }).animationSpeed, 4.0);
});

test('validateSettings preserves enabledPlatforms states', () => {
  const settings = validateSettings({
    enabledPlatforms: {
      chatgpt: false,
      gemini: true,
      claude: false,
      grok: true,
      meta: false,
    },
  });
  assert.equal(settings.enabledPlatforms.chatgpt, false);
  assert.equal(settings.enabledPlatforms.gemini, true);
  assert.equal(settings.enabledPlatforms.claude, false);
});
