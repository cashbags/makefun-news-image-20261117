# CHECK.md — "The World in One Day" (news-image-20261117)

What was actually run against this entry, and what each run said. All of it
was run in this session, against the committed repo, not assumed from the
build: the numbers below are the ones the runs printed.

## The repo and the kit

- Repo `cashbags/makefun-news-image-20261117`, public, created
  2026-11-18T00:25:58Z — after the competition opened (2026-11-17T23:43:00Z).
  License MIT (SPDX line on top). README carries the three make.fun badges
  and the referral `qrg7fvky` (the account's own code, verified live via
  `/api/me/referrals`, is `6sknhk5z`; the user decided READMEs point to
  Pino's code `qrg7fvky`).
- Kit downloaded from the live API and unpacked at
  `../kit/news-image-20261117-kit` (bundle sha256 `029664c9…` per kit.json);
  the starter's `main.ts` was read, not copied — this entry's `main.ts` is
  written fresh in this session with its own structure (PNG signature check
  plus byte-length proof).
- Competition verified live before building: $250, entryFeeUsd null (free),
  acceptingSubmissions true, 740 submissions at check time, deadline
  2026-11-19T00:00:00Z, escrow funded $250 USDC on mainnet.

## The image: real browser capture, verified from disk

- `node scripts/capture.mjs` (playwright-core 1.55.0, headless Chromium):
  `entry.png bytes=231849 OK (<=1 MiB)`, zero page errors, zero console
  errors. First capture was 209,933 bytes; the layout was then revised
  (tighter masthead/lead/rows, SHENZHEN label un-clipped) and re-captured:
  231,849 bytes.
- PNG header bytes `89 50 4e 47 0d 0a 1a 0a`; dimensions 1024×1024
  (read from the IHDR, not assumed); sha256
  `7ed9dc90aa3fe74e80cd3341fa10e21ec6a11632ff6e482a67a75c234ed1419f`.
- Viewed at full size: masthead, date, lead headline, all four story
  headlines, the Rwanda strip and the footer all present and legible; the
  first capture had clipped the strip and footer (content overflowed the
  1024 px page), which the revision fixed — the second view confirms all
  six stories and the footer are in frame.
- Downscaled to 300×300 with PIL (LANCZOS) and viewed: the masthead title,
  "TUESDAY · 17 NOVEMBER 2026", the lead headline ("Kerch Bridge span falls
  as Kyiv's bridges are hit") and all four story headlines still read. The
  deck paragraphs blur at that size, as expected — the headlines carry the
  news.

## Determinism

- `MAKEFUN_OUTPUT_DIR=/tmp/nw-out1 node main.ts` and the same into
  `/tmp/nw-out2`, then `diff -r`: byte-identical. Run before the main.ts
  revision and again after it (PNG signature check added): byte-identical
  both times, output sha256 `7ed9dc90…1419f`, identical to `entry.png`.
- No clock, no randomness, no network in `main.ts` or in the capture: the
  program copies one file and checks its length.

## Entry tree size (tiny-chess lesson)

- Local kit check does NOT enforce the competition's snapshot tree cap, so
  it is checked by hand here: the entry tree is 6 files
  (`main.ts`, `entry.png`, `design.html`, `scripts/capture.mjs`, `README.md`,
  `LICENSE`, plus this file and `DESIGN.md`) — the image dominates at
  231,849 bytes and the text files total under 16 KiB. The kit check result
  below is the authority on the intake caps; the tree is far under the
  caps the gta6 entry (2.8 MB) passed.

## Kit check

- (Filled in after the bundle: command, pass/fail counts, and the
  thinking_reproduces / authored-share figures.)
