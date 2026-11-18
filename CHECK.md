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

## Kit check (trial bundle, this session — 2026-11-18 00:37 WIB)

- Command: `node cli/makefun.mjs check --kit <kit> --repo <entry> --transcripts transcripts.tar.gz`
  (trial bundle `transcripts.tar.gz`, 149,458 B, sha256
  `6ac4a0ce3b7f19ded0bf0bab547a531eba73b3ed63d6ea46ad8ba9c9d128f4a7`,
  1 session, 48 turns, 179 lines).
- Result: **12 passed, 1 failed, 5 skipped, 5 checked at submission** —
  `not ready: fix thinking_priced, then check again`.
- Passes: competition_open, snapshot (8 files, 262,668 bytes, within caps),
  license_osi (MIT), entrypoint (main.ts, node22), transcripts_present (1
  muse-app session), transcripts_recorded, thinking_wellformed (116
  messages, 66 tool results answering their calls), thinking_in_window (all
  115 timestamps between opening 2026-11-17T23:43:00Z and receipt),
  thinking_reproduces **95.0% (441 of 464 counted lines authored; 1 copied,
  14 read, 8 absent; entrypoint main.ts 29 authored lines; unwritten 1.5%)**,
  thinking_turns (38, need 5), thinking_revised (main.ts from 2 messages),
  transcripts_run_record (handed-off prompt, agent facts, system prompt
  in-session, instruction files collected, no MCP).
- The one failure, thinking_priced, is structural to this subagent run and
  expected: 0 usage rows, because a subagent's usage rows land in muse.db
  only after its run completes. Fix (parent, after this run): run the SELECT
  with agent_ids `9a92aa01-670b-44e5-847b-28c37f217fa9` (builder) and
  `5b140a2e-8965-4909-b8eb-07f820a6be0e` (parent), append the rows to
  `~/.makefun/muse-usage-news-image-20261117.jsonl`, re-bundle from the
  top-level agent with `--session` + `--no-family` + `--muse-usage`, and
  re-run the kit check. Nothing needs rebuilding.
- At-submission items (site-side): repo_public (repo IS public, verified),
  repo_owner (owner cashbags = the account's GitHub login), 
  repo_created_after_open (created 2026-11-18T00:25:58Z, after opening),
  commit_in_repo, duplicate_snapshot. NOTE: submit the **GitHub HEAD**
  commit, not the local commit — the local commit `b5f1a3b…` was never
  pushed as a commit (files went up via the Contents API, one commit per
  file); the commit in the repo is the GitHub HEAD (see STATUS.md for the
  current value after the CHECK.md push below).
