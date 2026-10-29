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
} from './aiDetector';
import { createPngIcon } from './pngIcon';

/**
 * Generates an SVG string for the extension icon.
 */
export function generateIconSvg(size: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="25%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#10A37F" />
      <stop offset="75%" stop-color="#C026D3" />
      <stop offset="100%" stop-color="#EA580C" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="128" height="128" rx="28" fill="#0A0F1D" />
  <rect x="14" y="14" width="100" height="100" rx="14" fill="none" stroke="url(#g1)" stroke-width="8" filter="url(#glow)" />
  <rect x="14" y="14" width="100" height="100" rx="14" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.8" />
  <path d="M64 36 L67 55 L86 64 L67 73 L64 92 L61 73 L42 64 L61 55 Z" fill="#FFFFFF" />
</svg>`;
}

/**
 * Generates the full ZIP package for the Chrome extension ready for installation.
 */
export async function createExtensionZip(): Promise<Blob> {
  const zip = new JSZip();

  // 1. manifest.json
  const manifestObj = generateManifest();
  zip.file('manifest.json', JSON.stringify(manifestObj, null, 2));

  // 2. content.js
  zip.file('content.js', generateContentScript());

  // 3. styles.css
  zip.file('styles.css', generateContentCss());

  // 4. popup.html, popup.js, popup.css
  zip.file('popup.html', generatePopupHtml());
  zip.file('popup.js', generatePopupJs());
  zip.file('popup.css', generatePopupCss());

  // 5. options.html
  zip.file('options.html', generateOptionsHtml());

  // 6. README.md
  zip.file('README.md', generateReadme());

  // 7. Embed guaranteed valid PNG icons
  const icon16Buf = createPngIcon(16);
  const icon48Buf = createPngIcon(48);
  const icon128Buf = createPngIcon(128);

  zip.file('icon16.png', icon16Buf);
  zip.file('icon48.png', icon48Buf);
  zip.file('icon128.png', icon128Buf);
  zip.file('icon.svg', generateIconSvg(128));

  return await zip.generateAsync({ type: 'blob' });
}
