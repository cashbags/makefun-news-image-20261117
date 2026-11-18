# DESIGN.md — "The World in One Day": one front page for 17 November 2026

This is the design record for the entry image: what the page is trying to do
for the judge, why each story was chosen, where each fact came from, and what
was deliberately left out. It is written for the next person who opens the
code, and for the judge reading the source outline.

## The idea in one paragraph

A newspaper front page, not a collage. The judge has no news feed and is not
told which day the contest is about, so the image has to do three jobs at
once: name the day unmistakably, show the day's most consequential stories
across regions and fields, and stay legible when it is shrunk to about 300
pixels across. A front page does all three by convention — a masthead with
the date in full, a lead story with the biggest headline, smaller stories in
ranked order, and a source line — so a viewer who missed the day can tell
what happened from the image alone, and a viewer at 300 pixels can still
read the masthead, the date, and every headline.

## Why these six stories

The day's news was gathered from the daily briefs published for Tuesday 17
November 2026 and then checked story by story against wire reporting
(Reuters, AP, BBC, Al Jazeera). The six that made the page are the ones that
recur across every brief of the day and that span the most ground:

1. **The bridge war (lead).** Ukraine struck the Kerch Bridge — the
   road-and-rail link from Russia to occupied Crimea — for a second straight
   day; the Ukrainian General Staff said an arch and a span of the road
   section collapsed, severing the road link, while the rail part stood with
   a damaged arch. In the same night Russian missiles hit two of Kyiv's main
   bridges over the Dnipro (the Pivnichnyi and Pivdennyi), closing both and
   damaging part of the metro. This is the lead because it is the day's most
   consequential event and because both sides' bridge strikes belong in one
   story, not two.
2. **Hormuz.** Iran's Revolutionary Guard navy said two oil tankers struck
   mines and caught fire on a route south of the Strait of Hormuz that
   Tehran considers unauthorised; a third US carrier, USS Theodore
   Roosevelt, reached the region. The page says the tankers were hit and
   burned and the carrier arrived, and says nothing about who laid the
   mines, because no outlet had established that on the day.
3. **Asia.** Trump arrived in Manila for the ASEAN summit, and China's
   foreign ministry confirmed a three-way meeting of Xi, Trump and Putin in
   Shenzhen on Thursday 19 November on the APEC sidelines. The page states
   the meeting as set for Thursday, not as having happened.
4. **Chase.** A software bug at JPMorgan Chase slowed online banking, branch
   transactions and Zelle payments; the bank said there was no indication it
   was cyber-related. The page says "a software bug, not a cyberattack"
   because that distinction is the story.
5. **Vulcan.** A ULA Vulcan rocket failed about ten minutes into flight,
   destroying its payload of 40 Amazon Leo internet satellites. It is a
   smaller story on the page because it is a launch failure, not a war or a
   summit — but it is the day's space story, and the briefs of the day all
   carry it.
6. **Rwanda hub (strip).** Germany, Denmark, Austria, Greece and the
   Netherlands announced a joint return facility in Rwanda for rejected
   asylum seekers. It runs as the bottom strip because it is an announcement
   of a plan, not an event that happened, and the strip is where a front
   page puts exactly that kind of story.

Stories that were considered and cut: Nvidia's earnings (a company result,
not world news at this scale), the US House Democrats' opening agenda
(domestic politics, one country), and the South Africa shootings (reported
Monday, 17 dead — real, but the page holds six stories and the six chosen
cover more regions and fields).

## What the page does not claim

- No casualty numbers. The Crimea strike and the Kyiv strikes each killed
  people, but the counts differed between outlets on the day and the two
  events are easy to conflate, so the page carries none.
- No attribution the reporting did not support: the mines are "hit by
  mines", not "laid by" anyone; the tanker route is one "Tehran calls
  unauthorised", which is what Tehran said.
- No day attached to the Vulcan or Chase items beyond the page's own date:
  both were first reported before Tuesday in some time zones and led the
  Tuesday briefs; the masthead dates the page, the stories do not re-date
  themselves.
- The trilateral meeting is dated Thursday, in the future relative to the
  page: "to meet", "set for Thursday", never "met".

## The layout, and why it is shaped this way

- **Masthead (top, ~150 px).** "The World in One Day" in 56 pt serif, then
  "TUESDAY · 17 NOVEMBER 2026" in 28 pt letterspaced sans. The date is the
  second-biggest text on the page on purpose: the judge's first criterion
  is that the image names its day, and a date that size cannot be missed
  at 300 pixels either.
- **Lead (~270 px).** One illustration on the left, headline and deck on
  the right. The bridge drawing shows the fact itself: two standing arches,
  a gap where the middle arch was, a span tilted down into the water,
  smoke, a stopped car. A reader who reads no words still gets "bridge
  broken".
- **Two rows of two stories (~170 px each).** Each story gets a small
  140 px illustration and a headline of 26 pt. The illustrations are
  pictograms of the fact — a tanker with flames and a spiked mine, a dashed
  flight arc from Manila to Shenzhen, a bank front with a BUG sign, a rocket
  breaking apart over falling satellites — drawn as inline SVG in
  `design.html`, every shape original to this entry. No photographs: the
  entry must be ours to license, and a photo would also be unreadable at
  300 pixels.
- **Bottom strip.** The sixth story in one line, with its tag. The strip
  exists so the page reaches six stories without a seventh box crowding the
  grid.
- **Footer.** "As reported on the day by Reuters · AP · BBC · Al Jazeera"
  plus the date again. The second date is belt and braces: if the masthead
  were ever cropped in a repost, the footer still dates the page.

## Legibility at 300 pixels

The page was downscaled to 300×300 and viewed. The masthead title, the
date line, the lead headline and all four story headlines remain readable;
the deck paragraphs blur into grey, which is expected and acceptable — the
headlines carry the news, the decks carry the detail for the full-size
viewer. Nothing on the page depends on text smaller than 17 pt at full
size, and no headline wraps past three lines.

## The build

`design.html` is the whole design: one HTML file, inline CSS, inline SVG,
DejaVu Serif/Sans (the fonts the capture machine has). `scripts/capture.mjs`
loads it in headless Chromium through playwright-core and screenshots the
`.page` element at 1024×1024 as PNG. `main.ts` copies the resulting
`entry.png` to `/output/entry.png` and verifies the PNG signature and the
byte length, so a corrupt source fails at build time instead of at the
gate. The image is 231,849 bytes — well under the 1 MiB cap — and the
program is deterministic: two runs write byte-identical output (see
`CHECK.md`).
