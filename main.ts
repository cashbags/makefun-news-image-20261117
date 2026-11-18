// main.ts — "The World in One Day", a news-image entry (Node 22, stdlib only).
//
// The entry is one image: entry.png beside this file, a newspaper front page
// drawn for Tuesday 17 November 2026 and captured in a real browser (see
// design.html and scripts/capture.mjs). This program's whole job is to hand
// that image to the grader: copy it to /output/entry.png, byte for byte.
//
// The copy is deterministic by construction — no clock, no randomness, no
// network, no re-encoding — so two runs write identical bytes. The check at
// the end proves the copy landed whole: the output must exist and match the
// source's byte length, otherwise the run fails loudly instead of handing
// the grader a truncated file.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');

// The gate reads the file by its first bytes, so refuse a source that is
// not a PNG at all before copying anything: a corrupt entry.png would
// otherwise sail through this program and fail at the grader instead.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const head = readFileSync(source).subarray(0, 8);
if (!head.equals(PNG_SIGNATURE)) {
  throw new Error('entry.png does not start with the PNG signature — not a PNG');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Prove the copy is whole: a partial write would hand the judge a broken
// image, so the run refuses to finish silently when the sizes disagree.
const sourceBytes = statSync(source).size;
const targetBytes = statSync(target).size;
if (targetBytes !== sourceBytes) {
  throw new Error(
    `entry.png copy is short: wrote ${targetBytes} of ${sourceBytes} bytes`,
  );
}
