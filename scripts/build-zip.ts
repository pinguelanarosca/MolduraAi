import fs from 'node:fs';
import path from 'node:path';
import JSZip from 'jszip';
import {
  generateContentCss,
  generateContentScript,
  generateManifest,
  generateReadme,
  generatePopupHtml,
  generatePopupJs,
  generatePopupCss,
  generateOptionsHtml,
} from '../src/utils/aiDetector';
import { createPngIcon } from '../src/utils/pngIcon';

async function buildZip() {
  const zip = new JSZip();

  // 1. Generate PNG icon buffers
  const icon16Buf = createPngIcon(16);
  const icon48Buf = createPngIcon(48);
  const icon128Buf = createPngIcon(128);

  // Write PNG icons to public/extension folder as well
  const extensionDir = path.resolve(process.cwd(), 'public/extension');
  if (!fs.existsSync(extensionDir)) {
    fs.mkdirSync(extensionDir, { recursive: true });
  }

  fs.writeFileSync(path.join(extensionDir, 'icon16.png'), icon16Buf);
  fs.writeFileSync(path.join(extensionDir, 'icon48.png'), icon48Buf);
  fs.writeFileSync(path.join(extensionDir, 'icon128.png'), icon128Buf);

  // 2. manifest.json
  const manifest = generateManifest();
  const manifestStr = JSON.stringify(manifest, null, 2);
  zip.file('manifest.json', manifestStr);
  fs.writeFileSync(path.join(extensionDir, 'manifest.json'), manifestStr);

  // 3. content scripts & styles
  const contentScript = generateContentScript();
  const contentCss = generateContentCss();
  zip.file('content.js', contentScript);
  zip.file('styles.css', contentCss);
  fs.writeFileSync(path.join(extensionDir, 'content.js'), contentScript);
  fs.writeFileSync(path.join(extensionDir, 'styles.css'), contentCss);

  // 4. popup menu & options
  const popupHtml = generatePopupHtml();
  const popupJs = generatePopupJs();
  const popupCss = generatePopupCss();
  const optionsHtml = generateOptionsHtml();
  zip.file('popup.html', popupHtml);
  zip.file('popup.js', popupJs);
  zip.file('popup.css', popupCss);
  zip.file('options.html', optionsHtml);
  fs.writeFileSync(path.join(extensionDir, 'popup.html'), popupHtml);
  fs.writeFileSync(path.join(extensionDir, 'popup.js'), popupJs);
  fs.writeFileSync(path.join(extensionDir, 'popup.css'), popupCss);
  fs.writeFileSync(path.join(extensionDir, 'options.html'), optionsHtml);

  // 5. documentation
  const readme = generateReadme();
  zip.file('README.md', readme);
  fs.writeFileSync(path.join(extensionDir, 'README.md'), readme);

  // 6. icons in ZIP
  zip.file('icon16.png', icon16Buf);
  zip.file('icon48.png', icon48Buf);
  zip.file('icon128.png', icon128Buf);

  const iconSvgPath = path.resolve(process.cwd(), 'public/extension/icon.svg');
  if (fs.existsSync(iconSvgPath)) {
    const iconData = fs.readFileSync(iconSvgPath, 'utf-8');
    zip.file('icon.svg', iconData);
  }

  const outDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const destZipPath = path.join(outDir, 'extensao-moldura-ia-chrome.zip');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(destZipPath, buffer);
  console.log(`ZIP gerado com sucesso em: ${destZipPath} (${buffer.length} bytes)`);

  // List all files in zip
  const readZip = await JSZip.loadAsync(buffer);
  console.log('Arquivos contidos no .ZIP:');
  Object.keys(readZip.files).forEach((filename) => {
    console.log(` - ${filename}`);
  });
}

buildZip().catch((err) => {
  console.error('Erro ao gerar ZIP:', err);
  process.exit(1);
});
