# Office interface reference assets

Reference images for the lesson components in `src/components/office/` (`OfficeScreenshot`).

```text
office-assets/
  word/
    interface/   full-window references (home-tab.png, insert-tab.png, …)
    toolbar/     cropped ribbon groups (home-font-group.png, …)
    tutorials/   step results (bold-text-after.png, table-inserted.png, …)
  excel/
    interface/ · toolbar/ · tutorials/
```

Status: **no screenshots are committed yet.** The lessons currently use the schematic ribbon
diagrams rendered from `src/data/officeUi.ts`, which follow the real Microsoft 365 tab, group
and button order. Automated capture of the real applications was not permitted in the setup
session (see `docs/office-interface-integration-report.md`).

Adding real screenshots:

1. Capture Microsoft 365 desktop on Windows at 100 % zoom, window ≈ 1600 × 900, light theme,
   English (United States), default font (Aptos), with no personal data in the title bar.
2. Save as PNG (lossless; interface text must stay sharp). Name files `<app>-<tab>-<what>.png`
   in kebab-case, e.g. `word-home-bold-button.png`.
3. Reference them from a lesson with `<OfficeScreenshot src="/office-assets/word/toolbar/word-home-bold-button.png" alt="…" annotations={[{ x: 23, y: 58, label: 'Bold' }]} />`
   — annotation positions are percentages of the image size.
4. State the version in `version` (default: "Microsoft 365 desktop (Windows)").
5. Rights: Microsoft permits screenshots of its products in documentation and training materials
   under its "Use of Microsoft Copyrighted Content" guidelines (do not alter the image except
   for size/cropping/annotation callouts; do not imply Microsoft endorsement). Review those
   guidelines before publishing.
