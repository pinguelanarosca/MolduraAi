import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import JSZip from 'jszip';

test('Verify extensao-moldura-ia-chrome.zip contains all updated extension files with valid PNG icons', async () => {
  const zipPath = path.resolve(process.cwd(), 'public/extensao-moldura-ia-chrome.zip');
  assert.ok(fs.existsSync(zipPath), 'O arquivo public/extensao-moldura-ia-chrome.zip deve existir');

  const zipData = fs.readFileSync(zipPath);
  const zip = await JSZip.loadAsync(zipData);

  // Assert expected files
  const expectedFiles = [
    'manifest.json',
    'popup.html',
    'popup.js',
    'popup.css',
    'options.html',
    'content.js',
    'styles.css',
    'README.md',
    'icon16.png',
    'icon48.png',
    'icon128.png',
  ];

  for (const file of expectedFiles) {
    assert.ok(zip.file(file), `Arquivo ${file} deve estar dentro do .zip`);
  }

  // Assert manifest details
  const manifestRaw = await zip.file('manifest.json')!.async('string');
  const manifest = JSON.parse(manifestRaw);
  assert.equal(manifest.version, '1.2.0');
  assert.equal(manifest.action.default_popup, 'popup.html');
  assert.ok(manifest.permissions.includes('storage'));
  assert.equal(manifest.icons['16'], 'icon16.png');
  assert.equal(manifest.icons['48'], 'icon48.png');
  assert.equal(manifest.icons['128'], 'icon128.png');

  // Assert icon16.png is a valid binary PNG
  const icon16Data = await zip.file('icon16.png')!.async('nodebuffer');
  assert.ok(icon16Data.length > 0);
  assert.equal(icon16Data[0], 0x89);
  assert.equal(icon16Data[1], 0x50); // 'P'
  assert.equal(icon16Data[2], 0x4e); // 'N'
  assert.equal(icon16Data[3], 0x47); // 'G'

  // Assert icon48.png is a valid binary PNG
  const icon48Data = await zip.file('icon48.png')!.async('nodebuffer');
  assert.equal(icon48Data[0], 0x89);
  assert.equal(icon48Data[1], 0x50);

  // Assert icon128.png is a valid binary PNG
  const icon128Data = await zip.file('icon128.png')!.async('nodebuffer');
  assert.equal(icon128Data[0], 0x89);
  assert.equal(icon128Data[1], 0x50);
});
