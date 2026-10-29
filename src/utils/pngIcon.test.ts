import test from 'node:test';
import assert from 'node:assert/strict';
import { createPngIcon } from './pngIcon';

test('createPngIcon generates valid PNG buffer for 16, 48, and 128 px', () => {
  const png16 = createPngIcon(16);
  const png48 = createPngIcon(48);
  const png128 = createPngIcon(128);

  const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // Check magic bytes
  assert.equal(png16.subarray(0, 8).compare(pngMagic), 0);
  assert.equal(png48.subarray(0, 8).compare(pngMagic), 0);
  assert.equal(png128.subarray(0, 8).compare(pngMagic), 0);

  // Check IHDR chunk type at byte 12
  assert.equal(png16.subarray(12, 16).toString('ascii'), 'IHDR');
  // Check width and height in IHDR
  assert.equal(png16.readUInt32BE(16), 16);
  assert.equal(png16.readUInt32BE(20), 16);

  assert.equal(png48.readUInt32BE(16), 48);
  assert.equal(png48.readUInt32BE(20), 48);

  assert.equal(png128.readUInt32BE(16), 128);
  assert.equal(png128.readUInt32BE(20), 128);

  // Check IEND at end
  assert.equal(png16.subarray(png16.length - 8, png16.length - 4).toString('ascii'), 'IEND');
});
