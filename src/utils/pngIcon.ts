import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';

// Standard CRC32 table for PNG chunk checksums
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type: string, data: Buffer): Buffer {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Creates a valid RGBA PNG Buffer for an extension icon of given size.
 * Draws a dark rounded rectangle with glowing border and AI star motif.
 */
export function createPngIcon(size: number): Buffer {
  const width = size;
  const height = size;
  const rawBytesPerRow = 1 + width * 4; // 1 filter byte + RGBA pixels
  const rawData = Buffer.alloc(height * rawBytesPerRow, 0);

  const cx = width / 2;
  const cy = height / 2;
  const r = width / 2 - 1;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rawBytesPerRow;
    rawData[rowOffset] = 0; // Filter byte 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx + 0.5;
      const dy = y - cy + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= r) {
        // Outer glowing border
        if (dist >= r - Math.max(1.5, size * 0.15)) {
          // Gradient between Blue (#38BDF8) and Purple (#C026D3)
          const angle = Math.atan2(dy, dx);
          const t = (Math.sin(angle) + 1) / 2;
          const red = Math.round(56 * (1 - t) + 192 * t);
          const green = Math.round(189 * (1 - t) + 38 * t);
          const blue = Math.round(248 * (1 - t) + 211 * t);

          rawData[pxOffset + 0] = red;
          rawData[pxOffset + 1] = green;
          rawData[pxOffset + 2] = blue;
          rawData[pxOffset + 3] = 255;
        } else {
          // Dark background #0F172A
          rawData[pxOffset + 0] = 15;
          rawData[pxOffset + 1] = 23;
          rawData[pxOffset + 2] = 42;
          rawData[pxOffset + 3] = 255;

          // AI Sparkle star in center
          const ax = Math.abs(dx);
          const ay = Math.abs(dy);
          const starDist = ax + ay;
          if (starDist <= size * 0.35) {
            rawData[pxOffset + 0] = 255;
            rawData[pxOffset + 1] = 255;
            rawData[pxOffset + 2] = 255;
            rawData[pxOffset + 3] = 255;
          }
        }
      } else {
        // Transparent outside circular radius
        rawData[pxOffset + 0] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk: width, height, bitDepth(8), colorType(6 = RGBA), compression(0), filter(0), interlace(0)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // Color type 6 (RGBA)
  ihdrData[10] = 0; // Compression 0
  ihdrData[11] = 0; // Filter method 0
  ihdrData[12] = 0; // Interlace 0
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT chunk with zlib compressed scanlines
  const compressed = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}
