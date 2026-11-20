# Khmer (ខ្មែរ) translation style guide

Office Academy's Khmer mode translates **everything except the keywords**. A learner reads
the explanation in Khmer, but sees the exact English words that appear on their screen in
Word and Excel (the Khmer UI of Office is rarely installed on office PCs).

## Where translations live

- English data in `src/data/**` is the source of truth. **Never edit it** for translation.
- Khmer text lives in `src/data/km/**` as overlays typed by `src/data/km/types.ts`, keyed by
  the same ids (`w1-1`, `w1-1-kc`, `excel-final` …). Anything missing falls back to English.
- Arrays merge **by index**: keep the same order and length. Quiz `options` must stay in the
  same order (the answer key is an index). Use `null` to keep an English item as-is.
- Leave out structural fields (ids, `answer`, `tab`, `target`, `shortcut`, `formula`,
  `duration`, `difficulty` …); the types forbid them anyway.
- Run `npm run check:i18n` after editing (ids resolve, lengths match, keywords preserved).

## Keep in English (do not translate)

1. Product names: Microsoft 365, Word, Excel, Office, Windows, Mac, OneDrive, PDF, .docx, .xlsx, .csv.
2. Everything inside `**…**` (ribbon tabs, groups, buttons, dialog and menu names) — copy the
   `**Home**`, `**Insert**`, `**Bold**`, `**Save As**` token **exactly**, then explain it in Khmer
   around it. Do not add or remove `**…**` tokens.
3. Everything inside backticks: formulas, cell references, typed text, file names —
   `` `=SUM(B2:B6)` ``, `` `A1` ``, `` `#DIV/0!` ``. Copy exactly.
4. Keyboard shortcuts and key names: Ctrl + S, Enter, Tab, Shift, F4, Alt.
5. Function names (SUM, AVERAGE, IF, COUNTIF, SUMIF, VLOOKUP, XLOOKUP) and feature names that
   appear on screen when not already in `**…**` (PivotTable, Excel Table, Mail Merge, Styles,
   Track Changes, Name Box, Formula Bar, Ribbon, Quick Access Toolbar, Backstage view).
   On first use in a lesson you may add a short Khmer gloss: `Name Box (ប្រអប់ឈ្មោះ)`.
6. Example data people type (names, invoice numbers, sample sheet cells) may stay English
   when it is what the learner types; free-text sentences in examples are translated.

## Translate into Khmer

All sentences: titles, subtitles, objectives, explanations, tutorial instructions and
details, results, captions, practice goals/steps/hints/expected results, examples,
summaries, quiz prompts, options, explanations, project text, FAQ and glossary definitions.

## Voice

- Audience: absolute beginners, office/admin staff. Plain, friendly, modern Khmer.
  Short sentences, active voice, one idea per sentence. Address the reader as «អ្នក».
- Use «។» for full stops and «៖» before a list/explanation. Keep `?` and `!`.
- Use Western digits (1, 2, 15) — they match what Excel shows.
- Do not add content, do not drop content. Same meaning, same steps, same number of items.

## Glossary (use these consistently)

| English | Khmer |
| --- | --- |
| lesson / unit / path | មេរៀន / ជំពូក / ផ្លូវសិក្សា |
| document | ឯកសារ |
| file / folder | ឯកសារ (file) / ថត |
| workbook / worksheet (sheet) | សៀវភៅបញ្ជី (workbook) / សន្លឹកកិច្ចការ (sheet) |
| spreadsheet | តារាងទិន្នន័យ |
| cell / row / column / range | ក្រឡា / ជួរដេក / ជួរឈរ / ជួរក្រឡា (range) |
| formula / function / argument | រូបមន្ត / អនុគមន៍ / អាគុយម៉ង់ |
| cell reference (relative/absolute) | ការយោងក្រឡា (ទាក់ទង/ដាច់ខាត) |
| tab / group / button / menu / dialog box | ផ្ទាំង / ក្រុម / ប៊ូតុង / ម៉ឺនុយ / ប្រអប់សន្ទនា |
| ribbon | Ribbon (របារពាក្យបញ្ជា) |
| click / double-click / right-click | ចុច / ចុចពីរដង / ចុចកណ្ដុរស្ដាំ |
| select / drag / type / press | ជ្រើស / អូស / វាយ / ចុច (key) |
| save / open / close / print | រក្សាទុក / បើក / បិទ / បោះពុម្ព |
| font / size / bold / italic / underline | ពុម្ពអក្សរ / ទំហំ / ដិត / ទ្រេត / គូសបន្ទាត់ពីក្រោម |
| paragraph / line spacing / indent / alignment | កថាខណ្ឌ / គម្លាតបន្ទាត់ / ការចូលបន្ទាត់ / ការតម្រឹម |
| heading / style / template | ចំណងជើង / ស្ទីល / គំរូ (template) |
| table / chart / picture | តារាង / ក្រាហ្វ / រូបភាព |
| header / footer / page number / margin | Header / Footer / លេខទំព័រ / រឹមទំព័រ |
| sort / filter | តម្រៀប (Sort) / ត្រង (Filter) |
| data validation / conditional formatting | ការផ្ទៀងផ្ទាត់ទិន្នន័យ / ការធ្វើទ្រង់ទ្រាយតាមលក្ខខណ្ឌ |
| memo / letter / agenda / minutes / report | អនុស្សរណៈ / លិខិត / របៀបវារៈ / កំណត់ហេតុប្រជុំ / របាយការណ៍ |
| invoice / expense / budget / inventory / attendance / leave | វិក្កយបត្រ / ចំណាយ / ថវិកា / ស្តុក / វត្តមាន / ច្បាប់ឈប់សម្រាក |
| shortcut | ផ្លូវកាត់ |
| tip / hint / step / result | គន្លឹះ / គន្លឹះជំនួយ / ជំហាន / លទ្ធផល |
| practice / quiz / project | អនុវត្ត / តេស្ត / គម្រោង |

## Example

English:

```ts
{ instruction: 'On the **Home** tab, click **Bold**.', detail: 'Or press Ctrl + B.' }
```

Khmer overlay:

```ts
{ instruction: 'នៅលើផ្ទាំង **Home** សូមចុច **Bold**។', detail: 'ឬចុច Ctrl + B។' }
```
