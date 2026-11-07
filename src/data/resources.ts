import type { FaqItem, GlossaryEntry, Shortcut } from '../types'

export const shortcuts: Shortcut[] = [
  { keys: 'Ctrl + N', mac: 'Cmd + N', action: 'Create a new document or workbook', app: 'Both', category: 'File' },
  { keys: 'Ctrl + O', mac: 'Cmd + O', action: 'Open an existing file', app: 'Both', category: 'File' },
  { keys: 'Ctrl + S', mac: 'Cmd + S', action: 'Save the current file', app: 'Both', category: 'File' },
  { keys: 'F12', mac: 'Cmd + Shift + S', action: 'Open Save As', app: 'Both', category: 'File' },
  { keys: 'Ctrl + P', mac: 'Cmd + P', action: 'Open Print', app: 'Both', category: 'File' },
  { keys: 'Ctrl + W', mac: 'Cmd + W', action: 'Close the current document', app: 'Both', category: 'File' },
  { keys: 'Ctrl + F', mac: 'Cmd + F', action: 'Open Find or the Navigation Pane', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + H', mac: 'Cmd + H', action: 'Open Find and Replace', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + Z', mac: 'Cmd + Z', action: 'Undo the last action', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + Y', mac: 'Cmd + Y', action: 'Redo the last undone action', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + C', mac: 'Cmd + C', action: 'Copy the selection', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + X', mac: 'Cmd + X', action: 'Cut the selection', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + V', mac: 'Cmd + V', action: 'Paste the clipboard contents', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + A', mac: 'Cmd + A', action: 'Select all', app: 'Both', category: 'Editing' },
  { keys: 'Ctrl + B', mac: 'Cmd + B', action: 'Apply or remove bold', app: 'Both', category: 'Formatting' },
  { keys: 'Ctrl + I', mac: 'Cmd + I', action: 'Apply or remove italic', app: 'Both', category: 'Formatting' },
  { keys: 'Ctrl + U', mac: 'Cmd + U', action: 'Apply or remove underline', app: 'Both', category: 'Formatting' },
  { keys: 'Ctrl + E', mac: 'Cmd + E', action: 'Center text or the active cell', app: 'Both', category: 'Formatting' },
  { keys: 'Ctrl + L', mac: 'Cmd + L', action: 'Align left', app: 'Word', category: 'Formatting' },
  { keys: 'Ctrl + R', mac: 'Cmd + R', action: 'Align right', app: 'Word', category: 'Formatting' },
  { keys: 'Ctrl + J', mac: 'Cmd + J', action: 'Justify text', app: 'Word', category: 'Formatting' },
  { keys: 'Ctrl + K', mac: 'Cmd + K', action: 'Insert a hyperlink', app: 'Both', category: 'Formatting' },
  { keys: 'Ctrl + Shift + C', mac: 'Cmd + Shift + C', action: 'Copy formatting (Format Painter)', app: 'Word', category: 'Formatting' },
  { keys: 'Ctrl + Shift + V', mac: 'Cmd + Shift + V', action: 'Paste without formatting', app: 'Both', category: 'Formatting' },
  { keys: 'Ctrl + Enter', mac: 'Cmd + Enter', action: 'Insert a page break', app: 'Word', category: 'Layout' },
  { keys: 'Shift + Enter', mac: 'Shift + Return', action: 'Insert a line break', app: 'Word', category: 'Layout' },
  { keys: 'Ctrl + Home', mac: 'Cmd + Home', action: 'Go to the beginning of the document or cell A1', app: 'Both', category: 'Navigation' },
  { keys: 'Ctrl + End', mac: 'Cmd + End', action: 'Go to the end of the document or last used cell', app: 'Both', category: 'Navigation' },
  { keys: 'Ctrl + Arrow key', mac: 'Cmd + Arrow key', action: 'Jump to the edge of the data or document', app: 'Both', category: 'Navigation' },
  { keys: 'Ctrl + F6', mac: 'Cmd + F6', action: 'Switch to the next open document window', app: 'Both', category: 'Navigation' },
  { keys: 'Alt + Tab', mac: 'Cmd + Tab', action: 'Switch between open applications', app: 'Both', category: 'Navigation' },
  { keys: 'Alt + F5', mac: 'Option + F5', action: 'Refresh a PivotTable', app: 'Excel', category: 'Data' },
  { keys: 'Ctrl + T', mac: 'Cmd + T', action: 'Create an Excel Table', app: 'Excel', category: 'Data' },
  { keys: 'Ctrl + Shift + L', mac: 'Cmd + Shift + L', action: 'Turn filters on or off', app: 'Excel', category: 'Data' },
  { keys: 'Ctrl + ;', mac: 'Ctrl + ;', action: 'Insert today\'s date', app: 'Excel', category: 'Data' },
  { keys: 'Ctrl + D', mac: 'Cmd + D', action: 'Fill down from the cell above', app: 'Excel', category: 'Data' },
  { keys: 'Ctrl + R', mac: 'Cmd + R', action: 'Fill right from the cell to the left', app: 'Excel', category: 'Data' },
  { keys: 'F2', mac: 'F2', action: 'Edit the active cell or text', app: 'Excel', category: 'Data' },
  { keys: 'F4', mac: 'F4', action: 'Toggle absolute and relative references', app: 'Excel', category: 'Data' },
  { keys: 'Ctrl + Shift + $', mac: 'Cmd + Shift + $', action: 'Apply currency format', app: 'Excel', category: 'Formatting' },
  { keys: 'Ctrl + Shift + %', mac: 'Cmd + Shift + %', action: 'Apply percentage format', app: 'Excel', category: 'Formatting' },
  { keys: 'Ctrl + 1', mac: 'Cmd + 1', action: 'Open Format Cells dialog', app: 'Excel', category: 'Formatting' },
  { keys: 'Ctrl + F1', mac: 'Cmd + Option + R', action: 'Show or hide the ribbon', app: 'Both', category: 'Navigation' },
  { keys: 'Ctrl + Shift + E', mac: 'Cmd + Shift + E', action: 'Turn Track Changes on or off', app: 'Word', category: 'Review' },
  { keys: 'Ctrl + Shift + 8', mac: 'Cmd + Shift + 8', action: 'Show or hide paragraph marks', app: 'Word', category: 'Review' },
  { keys: 'F7', mac: 'F7', action: 'Run Spelling & Grammar check', app: 'Both', category: 'Review' },
  { keys: 'Shift + F7', mac: 'Shift + F7', action: 'Open the thesaurus', app: 'Word', category: 'Review' },
  { keys: 'Ctrl + Shift + F', mac: 'Cmd + Shift + F', action: 'Open the Font dialog', app: 'Word', category: 'Formatting' },
]

export const glossary: GlossaryEntry[] = [
  { term: 'Alignment', definition: 'How text sits within its space: left, center, right, or justified.', app: 'Both' },
  { term: 'Absolute reference', definition: 'A cell reference locked with dollar signs, such as $B$2, so it does not change when copied.', app: 'Excel' },
  { term: 'Cell', definition: 'The intersection of a row and a column in a spreadsheet; identified by an address such as B5.', app: 'Excel' },
  { term: 'Column', definition: 'A vertical set of cells labeled with letters in Excel; a vertical layout section in Word.', app: 'Both' },
  { term: 'Conditional formatting', definition: 'Formatting that changes automatically when a cell value meets a rule.', app: 'Excel' },
  { term: 'Data source', definition: 'The list of records used to fill merge fields in a mail merge, often an Excel sheet.', app: 'Word' },
  { term: 'Data validation', definition: 'A rule that limits what can be entered into a cell, such as a dropdown list or date range.', app: 'Excel' },
  { term: 'Dialog launcher', definition: 'The small arrow in the corner of a ribbon group that opens more detailed settings.', app: 'Both' },
  { term: 'Field', definition: 'A dynamic placeholder that updates automatically, such as a page number or date.', app: 'Both' },
  { term: 'Filter', definition: 'A temporary view that hides rows or records that do not match chosen criteria.', app: 'Excel' },
  { term: 'Footer', definition: 'The area at the bottom of each page, often used for page numbers or document names.', app: 'Word' },
  { term: 'Formula', definition: 'A calculation in Excel that begins with an equals sign and can use values, cells, and functions.', app: 'Excel' },
  { term: 'Freeze Panes', definition: 'A view setting that keeps chosen rows or columns visible while scrolling.', app: 'Excel' },
  { term: 'Function', definition: 'A built-in calculation with a name, such as SUM or AVERAGE.', app: 'Excel' },
  { term: 'Header', definition: 'The area at the top of each page, often used for titles or document details.', app: 'Word' },
  { term: 'Hanging indent', definition: 'A paragraph indent where the first line starts at the margin and later lines are indented.', app: 'Word' },
  { term: 'Mail merge', definition: 'A process that combines one template with a list of records to create personalized documents.', app: 'Word' },
  { term: 'Margin', definition: 'The blank space between the page content and the edge of the paper.', app: 'Both' },
  { term: 'Merge field', definition: 'A placeholder in a mail merge main document that is replaced by data from the source list.', app: 'Word' },
  { term: 'Number format', definition: 'A display setting such as currency or percentage that does not change the stored value.', app: 'Excel' },
  { term: 'Orientation', definition: 'The page direction: portrait (tall) or landscape (wide).', app: 'Both' },
  { term: 'PivotTable', definition: 'An interactive summary that groups and totals data by chosen fields.', app: 'Excel' },
  { term: 'Range', definition: 'A rectangular block of cells identified by its top-left and bottom-right corners, such as A1:C5.', app: 'Excel' },
  { term: 'Relative reference', definition: 'A cell reference that changes when a formula is copied, such as A1.', app: 'Excel' },
  { term: 'Ribbon', definition: 'The band of tabs and commands at the top of Word and Excel.', app: 'Both' },
  { term: 'Section break', definition: 'A break that lets part of a Word document use different page settings, headers, or columns.', app: 'Word' },
  { term: 'Style', definition: 'A saved set of formatting rules applied to text, such as Heading 1 or Normal.', app: 'Word' },
  { term: 'Table', definition: 'In Word, a grid of rows and columns; in Excel, a structured range with filters and automatic expansion.', app: 'Both' },
  { term: 'Table of contents', definition: 'An automatic list of headings and page numbers generated from heading styles.', app: 'Word' },
  { term: 'Track Changes', definition: 'A review mode that records insertions, deletions, and formatting edits.', app: 'Word' },
  { term: 'VLOOKUP', definition: 'A function that searches the first column of a range and returns a value from a column to the right.', app: 'Excel' },
  { term: 'Workbook', definition: 'The entire Excel file, which can contain many worksheets.', app: 'Excel' },
  { term: 'Worksheet', definition: 'One sheet or tab inside an Excel workbook.', app: 'Excel' },
  { term: 'Wrap text', definition: 'A setting that moves text to a new line inside the same cell or shape.', app: 'Excel' },
]

export const faqs: FaqItem[] = [
  {
    question: 'Do I need Microsoft Office installed to use this course?',
    answer:
      'The lessons are written for Microsoft 365 or Office 2019 and later, and the screenshots and menus follow those versions. You can read everything without Office, but you will learn faster if you practice in Word and Excel. The browser labs are simulations, not the real applications.',
  },
  {
    question: 'Are the labs the real Microsoft Word and Excel?',
    answer:
      'No. The labs are simplified simulations that let you practice a few core ideas without installing anything. They do not reproduce every ribbon command, and nothing you type in a lab is saved to a real Office file.',
  },
  {
    question: 'How long does the full course take?',
    answer:
      'The 38 lessons take roughly 20 to 30 hours including practice. The 12 projects add another 8 to 12 hours. You can work through a single path in a weekend or spread the lessons over several weeks.',
  },
  {
    question: 'Do I need to complete the lessons in order?',
    answer:
      'For each path, yes, especially in the first unit. Later units assume earlier skills such as paragraph spacing, formulas, and cell references. You can switch between the Word and Excel paths whenever you like.',
  },
  {
    question: 'How is progress saved?',
    answer:
      'Progress is stored in your browser using local storage. It stays on the same browser and device. Clearing browser data, using private browsing, or switching devices will remove or hide your progress. There is no account or cloud sync.',
  },
  {
    question: 'What score do I need to pass?',
    answer:
      'Checkpoint quizzes require 70 percent. Final assessments require 75 percent. You can retake any quiz, and your best score is kept.',
  },
  {
    question: 'Can I download a certificate?',
    answer:
      'There is no certificate in this version. The progress page records completed lessons, quiz best scores, and finished projects so you can show your own record of work.',
  },
  {
    question: 'Why do some shortcuts not work on my Mac?',
    answer:
      'Word and Excel for Mac use Command in place of Ctrl for many shortcuts, and a few differ more widely. The shortcuts page lists Mac alternatives where they are known. Menu names are also slightly different in some versions.',
  },
  {
    question: 'Where can I get the practice files?',
    answer:
      'Each project on the Practice page includes a starter file download in CSV or text format. Open CSV files in Excel and text files in Word, then follow the project steps. The files are deliberately simple so you can focus on the skills.',
  },
  {
    question: 'The quiz answer I chose was marked wrong, but I think it is right.',
    answer:
      'The questions follow the Microsoft 365 interface and standard office practice. Some questions have more than one defensible answer in the real world; the explanation states the reasoning used here. If a question is genuinely ambiguous, treat it as a discussion point and check the current Microsoft documentation.',
  },
]
