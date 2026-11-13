/**
 * Reference model of the Microsoft 365 desktop (Windows) ribbons for Word and Excel.
 *
 * Tab, group and command names follow the real applications (Microsoft 365 Apps, 2024
 * ribbon; Word/Excel 2021 and 2024 match except where noted in `note`). The model drives
 * the OfficeInterfacePreview / OfficeToolbarHighlight / OfficeStepGuide components, which
 * render *diagrams* of the interface — button positions follow the actual order so a
 * learner can find the same control on their own screen.
 *
 * Button ids are stable and referenced from lesson tutorial steps (`TutorialStep.ui`);
 * `npm run check:data` verifies every reference resolves.
 */
import type { OfficeApp } from '../components/icons/OfficeAppIcon'

export interface RibbonButton {
  id: string
  label: string
  /** lucide icon name rendered by the preview (see OfficeInterfacePreview ICONS). */
  icon?: string
  /** Large (stacked icon + label) button, as in the real ribbon. */
  large?: boolean
  /** Has a drop-down arrow. */
  menu?: boolean
  shortcut?: string
  /** One-line plain-English description used in callouts. */
  help?: string
}

export interface RibbonGroup {
  id: string
  label: string
  buttons: RibbonButton[]
}

export interface RibbonTab {
  id: string
  label: string
  groups: RibbonGroup[]
  /** Shown when a tab is modelled but its groups are not drawn. */
  note?: string
}

export interface OfficeUiModel {
  app: OfficeApp
  appName: string
  version: string
  /** Default document/workbook title shown in the title bar. */
  documentTitle: string
  tabs: RibbonTab[]
}

const b = (id: string, label: string, icon?: string, extra: Partial<RibbonButton> = {}): RibbonButton => ({ id, label, icon, ...extra })
const g = (id: string, label: string, buttons: RibbonButton[]): RibbonGroup => ({ id, label, buttons })

export const WORD_UI: OfficeUiModel = {
  app: 'word',
  appName: 'Microsoft Word',
  version: 'Microsoft 365 desktop (Windows) · also matches Word 2021/2024',
  documentTitle: 'Document1 - Word',
  tabs: [
    {
      id: 'file',
      label: 'File',
      groups: [
        g('backstage', 'Backstage view', [
          b('file-home', 'Home', 'Home'),
          b('file-new', 'New', 'FilePlus2', { help: 'Start a blank document or a template.' }),
          b('file-open', 'Open', 'FolderOpen', { shortcut: 'Ctrl + O' }),
          b('file-info', 'Info', 'Info'),
          b('file-save', 'Save', 'Save', { shortcut: 'Ctrl + S' }),
          b('file-save-as', 'Save As', 'Save', { shortcut: 'F12', help: 'Save a copy with a new name, place or file type.' }),
          b('file-print', 'Print', 'Printer', { shortcut: 'Ctrl + P' }),
          b('file-share', 'Share', 'Share2'),
          b('file-export', 'Export', 'FileOutput', { help: 'Create PDF/XPS or change the file type.' }),
          b('file-close', 'Close', 'X', { shortcut: 'Ctrl + W' }),
          b('file-account', 'Account', 'User'),
          b('file-options', 'Options', 'Settings'),
        ]),
      ],
    },
    {
      id: 'home',
      label: 'Home',
      groups: [
        g('clipboard', 'Clipboard', [
          b('paste', 'Paste', 'ClipboardPaste', { large: true, menu: true, shortcut: 'Ctrl + V' }),
          b('cut', 'Cut', 'Scissors', { shortcut: 'Ctrl + X' }),
          b('copy', 'Copy', 'Copy', { shortcut: 'Ctrl + C' }),
          b('format-painter', 'Format Painter', 'Paintbrush', { help: 'Copy formatting from one place to another.' }),
        ]),
        g('font', 'Font', [
          b('font-name', 'Aptos (Body)', 'Type', { menu: true, help: 'Font name box.' }),
          b('font-size', '12', undefined, { menu: true, help: 'Font size box.' }),
          b('grow-font', 'Increase Font Size', 'AArrowUp', { shortcut: 'Ctrl + Shift + >' }),
          b('shrink-font', 'Decrease Font Size', 'AArrowDown', { shortcut: 'Ctrl + Shift + <' }),
          b('change-case', 'Change Case', 'CaseSensitive', { menu: true }),
          b('clear-formatting', 'Clear All Formatting', 'Eraser'),
          b('bold', 'Bold', 'Bold', { shortcut: 'Ctrl + B' }),
          b('italic', 'Italic', 'Italic', { shortcut: 'Ctrl + I' }),
          b('underline', 'Underline', 'Underline', { shortcut: 'Ctrl + U', menu: true }),
          b('strikethrough', 'Strikethrough', 'Strikethrough'),
          b('subscript', 'Subscript', 'Subscript'),
          b('superscript', 'Superscript', 'Superscript'),
          b('text-effects', 'Text Effects and Typography', 'Sparkles', { menu: true }),
          b('highlight', 'Text Highlight Color', 'Highlighter', { menu: true }),
          b('font-color', 'Font Color', 'Baseline', { menu: true }),
        ]),
        g('paragraph', 'Paragraph', [
          b('bullets', 'Bullets', 'List', { menu: true }),
          b('numbering', 'Numbering', 'ListOrdered', { menu: true }),
          b('multilevel-list', 'Multilevel List', 'ListTree', { menu: true }),
          b('decrease-indent', 'Decrease Indent', 'IndentDecrease'),
          b('increase-indent', 'Increase Indent', 'IndentIncrease'),
          b('sort', 'Sort', 'ArrowDownAZ'),
          b('show-formatting', 'Show/Hide ¶', 'Pilcrow', { shortcut: 'Ctrl + *' }),
          b('align-left', 'Align Left', 'AlignLeft', { shortcut: 'Ctrl + L' }),
          b('center', 'Center', 'AlignCenter', { shortcut: 'Ctrl + E' }),
          b('align-right', 'Align Right', 'AlignRight', { shortcut: 'Ctrl + R' }),
          b('justify', 'Justify', 'AlignJustify', { shortcut: 'Ctrl + J' }),
          b('line-spacing', 'Line and Paragraph Spacing', 'AlignVerticalSpaceAround', { menu: true }),
          b('shading', 'Shading', 'PaintBucket', { menu: true }),
          b('borders', 'Borders', 'Square', { menu: true }),
        ]),
        g('styles', 'Styles', [
          b('style-normal', 'Normal', undefined, { help: 'The default body text style.' }),
          b('style-no-spacing', 'No Spacing'),
          b('style-heading-1', 'Heading 1', undefined, { shortcut: 'Ctrl + Alt + 1' }),
          b('style-heading-2', 'Heading 2', undefined, { shortcut: 'Ctrl + Alt + 2' }),
          b('style-heading-3', 'Heading 3', undefined, { shortcut: 'Ctrl + Alt + 3' }),
          b('style-title', 'Title'),
          b('styles-pane', 'Styles Pane', 'ChevronDown', { help: 'Opens the full list of styles.' }),
        ]),
        g('editing', 'Editing', [
          b('find', 'Find', 'Search', { shortcut: 'Ctrl + F', menu: true }),
          b('replace', 'Replace', 'Replace', { shortcut: 'Ctrl + H' }),
          b('select', 'Select', 'MousePointer2', { menu: true }),
        ]),
        g('voice', 'Voice', [b('dictate', 'Dictate', 'Mic', { large: true })]),
        g('editor-group', 'Editor', [b('editor', 'Editor', 'SpellCheck', { large: true, shortcut: 'F7' })]),
      ],
    },
    {
      id: 'insert',
      label: 'Insert',
      groups: [
        g('pages', 'Pages', [
          b('cover-page', 'Cover Page', 'BookOpen', { menu: true }),
          b('blank-page', 'Blank Page', 'File'),
          b('page-break', 'Page Break', 'SeparatorHorizontal', { shortcut: 'Ctrl + Enter' }),
        ]),
        g('tables', 'Tables', [b('table', 'Table', 'Table', { large: true, menu: true, help: 'Drag over the grid to choose rows and columns.' })]),
        g('illustrations', 'Illustrations', [
          b('pictures', 'Pictures', 'Image', { large: true, menu: true }),
          b('shapes', 'Shapes', 'Shapes', { menu: true }),
          b('icons', 'Icons', 'Smile'),
          b('smartart', 'SmartArt', 'Workflow'),
          b('chart', 'Chart', 'BarChart3'),
          b('screenshot', 'Screenshot', 'Camera', { menu: true }),
        ]),
        g('links', 'Links', [
          b('link', 'Link', 'Link', { shortcut: 'Ctrl + K', menu: true }),
          b('bookmark', 'Bookmark', 'Bookmark'),
          b('cross-reference', 'Cross-reference', 'Link2'),
        ]),
        g('comments', 'Comments', [b('comment', 'Comment', 'MessageSquare', { large: true })]),
        g('header-footer', 'Header & Footer', [
          b('header', 'Header', 'PanelTop', { menu: true }),
          b('footer', 'Footer', 'PanelBottom', { menu: true }),
          b('page-number', 'Page Number', 'Hash', { menu: true, help: 'Choose Top of Page, Bottom of Page, …' }),
        ]),
        g('text', 'Text', [
          b('text-box', 'Text Box', 'RectangleHorizontal', { menu: true }),
          b('quick-parts', 'Quick Parts', 'Blocks', { menu: true }),
          b('wordart', 'WordArt', 'Type', { menu: true }),
          b('drop-cap', 'Drop Cap', 'ALargeSmall', { menu: true }),
          b('date-time', 'Date & Time', 'CalendarDays'),
          b('object', 'Object', 'Package', { menu: true }),
        ]),
        g('symbols', 'Symbols', [
          b('equation', 'Equation', 'Pi', { menu: true }),
          b('symbol', 'Symbol', 'Omega', { menu: true }),
        ]),
      ],
    },
    { id: 'draw', label: 'Draw', groups: [], note: 'Pens and highlighters for touch or mouse drawing.' },
    { id: 'design', label: 'Design', groups: [], note: 'Document themes, colours, fonts, watermark, page colour and borders.' },
    {
      id: 'layout',
      label: 'Layout',
      groups: [
        g('page-setup', 'Page Setup', [
          b('margins', 'Margins', 'Frame', { large: true, menu: true, help: 'Normal, Narrow, Moderate, Wide, or Custom Margins…' }),
          b('orientation', 'Orientation', 'RectangleVertical', { large: true, menu: true, help: 'Portrait or Landscape.' }),
          b('size', 'Size', 'Scaling', { large: true, menu: true, help: 'A4, Letter, …' }),
          b('columns', 'Columns', 'Columns3', { large: true, menu: true }),
          b('breaks', 'Breaks', 'SeparatorHorizontal', { menu: true, help: 'Page breaks and section breaks.' }),
          b('line-numbers', 'Line Numbers', 'ListOrdered', { menu: true }),
          b('hyphenation', 'Hyphenation', 'Minus', { menu: true }),
        ]),
        g('paragraph-layout', 'Paragraph', [
          b('indent-left', 'Indent Left', 'IndentIncrease'),
          b('indent-right', 'Indent Right', 'IndentDecrease'),
          b('spacing-before', 'Spacing Before', 'ArrowUpFromLine'),
          b('spacing-after', 'Spacing After', 'ArrowDownFromLine'),
        ]),
        g('arrange', 'Arrange', [
          b('position', 'Position', 'LayoutGrid', { menu: true }),
          b('wrap-text', 'Wrap Text', 'WrapText', { menu: true }),
          b('bring-forward', 'Bring Forward', 'BringToFront', { menu: true }),
          b('send-backward', 'Send Backward', 'SendToBack', { menu: true }),
          b('selection-pane', 'Selection Pane', 'Layers'),
          b('align', 'Align', 'AlignStartVertical', { menu: true }),
          b('group', 'Group', 'Group', { menu: true }),
          b('rotate', 'Rotate', 'RotateCw', { menu: true }),
        ]),
      ],
    },
    {
      id: 'references',
      label: 'References',
      groups: [
        g('toc', 'Table of Contents', [b('table-of-contents', 'Table of Contents', 'ListTree', { large: true, menu: true })]),
        g('footnotes', 'Footnotes', [
          b('insert-footnote', 'Insert Footnote', 'Footprints', { shortcut: 'Alt + Ctrl + F' }),
          b('insert-endnote', 'Insert Endnote', 'FileText'),
        ]),
        g('citations', 'Citations & Bibliography', [
          b('insert-citation', 'Insert Citation', 'Quote', { menu: true }),
          b('bibliography', 'Bibliography', 'Library', { menu: true }),
        ]),
        g('captions', 'Captions', [
          b('insert-caption', 'Insert Caption', 'Captions'),
          b('table-of-figures', 'Insert Table of Figures', 'Images'),
        ]),
        g('index', 'Index', [b('mark-entry', 'Mark Entry', 'Tag'), b('insert-index', 'Insert Index', 'BookMarked')]),
      ],
    },
    {
      id: 'mailings',
      label: 'Mailings',
      groups: [
        g('create', 'Create', [b('envelopes', 'Envelopes', 'Mail', { large: true }), b('labels', 'Labels', 'Tags', { large: true })]),
        g('start-merge', 'Start Mail Merge', [
          b('start-mail-merge', 'Start Mail Merge', 'Mails', { large: true, menu: true, help: 'Letters, E-mail Messages, Envelopes, Labels, Directory, or the Step-by-Step Wizard.' }),
          b('select-recipients', 'Select Recipients', 'Users', { large: true, menu: true, help: 'Type a New List, Use an Existing List (Excel), or Choose from Outlook Contacts.' }),
          b('edit-recipient-list', 'Edit Recipient List', 'UserPen', { large: true }),
        ]),
        g('fields', 'Write & Insert Fields', [
          b('highlight-merge-fields', 'Highlight Merge Fields', 'Highlighter'),
          b('address-block', 'Address Block', 'MapPin'),
          b('greeting-line', 'Greeting Line', 'Hand'),
          b('insert-merge-field', 'Insert Merge Field', 'Braces', { menu: true }),
          b('rules', 'Rules', 'GitBranch', { menu: true }),
          b('match-fields', 'Match Fields', 'Link2'),
          b('update-labels', 'Update Labels', 'RefreshCw'),
        ]),
        g('preview', 'Preview Results', [
          b('preview-results', 'Preview Results', 'Eye', { large: true }),
          b('find-recipient', 'Find Recipient', 'Search'),
          b('check-for-errors', 'Check for Errors', 'TriangleAlert'),
        ]),
        g('finish', 'Finish', [b('finish-merge', 'Finish & Merge', 'CheckCheck', { large: true, menu: true, help: 'Edit Individual Documents, Print Documents, or Send Email Messages.' })]),
      ],
    },
    {
      id: 'review',
      label: 'Review',
      groups: [
        g('proofing', 'Proofing', [
          b('editor-review', 'Editor', 'SpellCheck', { large: true, shortcut: 'F7' }),
          b('thesaurus', 'Thesaurus', 'BookA', { shortcut: 'Shift + F7' }),
          b('word-count', 'Word Count', 'Hash'),
        ]),
        g('speech', 'Speech', [b('read-aloud', 'Read Aloud', 'Volume2', { large: true })]),
        g('accessibility', 'Accessibility', [b('check-accessibility', 'Check Accessibility', 'PersonStanding', { large: true, menu: true })]),
        g('language', 'Language', [b('translate', 'Translate', 'Languages', { menu: true }), b('language', 'Language', 'Globe', { menu: true })]),
        g('comments-review', 'Comments', [
          b('new-comment', 'New Comment', 'MessageSquarePlus', { large: true, shortcut: 'Ctrl + Alt + M' }),
          b('delete-comment', 'Delete', 'MessageSquareX', { menu: true }),
          b('previous-comment', 'Previous', 'ChevronUp'),
          b('next-comment', 'Next', 'ChevronDown'),
          b('show-comments', 'Show Comments', 'MessagesSquare', { menu: true }),
        ]),
        g('tracking', 'Tracking', [
          b('track-changes', 'Track Changes', 'FilePen', { large: true, menu: true, shortcut: 'Ctrl + Shift + E' }),
          b('display-for-review', 'Simple Markup', 'Eye', { menu: true, help: 'Simple Markup, All Markup, No Markup, or Original.' }),
          b('show-markup', 'Show Markup', 'ListChecks', { menu: true }),
          b('reviewing-pane', 'Reviewing Pane', 'PanelLeft', { menu: true }),
        ]),
        g('changes', 'Changes', [
          b('accept', 'Accept', 'Check', { large: true, menu: true }),
          b('reject', 'Reject', 'X', { menu: true }),
          b('previous-change', 'Previous', 'ChevronUp'),
          b('next-change', 'Next', 'ChevronDown'),
        ]),
        g('compare', 'Compare', [b('compare', 'Compare', 'GitCompare', { large: true, menu: true })]),
        g('protect', 'Protect', [b('block-authors', 'Block Authors', 'UserX', { menu: true }), b('restrict-editing', 'Restrict Editing', 'Lock')]),
      ],
    },
    {
      id: 'view',
      label: 'View',
      groups: [
        g('views', 'Views', [
          b('read-mode', 'Read Mode', 'BookOpen', { large: true }),
          b('print-layout', 'Print Layout', 'FileText', { large: true, help: 'The normal view that shows the page as it prints.' }),
          b('web-layout', 'Web Layout', 'Globe', { large: true }),
          b('outline', 'Outline', 'ListTree'),
          b('draft', 'Draft', 'FileText'),
        ]),
        g('show', 'Show', [
          b('ruler', 'Ruler', 'Ruler', { help: 'A checkbox. Shows the ruler above the page.' }),
          b('gridlines', 'Gridlines', 'Grid3x3'),
          b('navigation-pane', 'Navigation Pane', 'PanelLeft', { help: 'A checkbox. Lists headings and pages at the left.' }),
        ]),
        g('zoom', 'Zoom', [
          b('zoom', 'Zoom', 'ZoomIn', { large: true }),
          b('zoom-100', '100%', 'Maximize2', { large: true }),
          b('one-page', 'One Page', 'File'),
          b('multiple-pages', 'Multiple Pages', 'Files'),
          b('page-width', 'Page Width', 'MoveHorizontal'),
        ]),
        g('window', 'Window', [
          b('new-window', 'New Window', 'AppWindow'),
          b('arrange-all', 'Arrange All', 'LayoutGrid'),
          b('split', 'Split', 'SplitSquareVertical'),
          b('switch-windows', 'Switch Windows', 'ArrowLeftRight', { menu: true }),
        ]),
        g('macros', 'Macros', [b('macros', 'Macros', 'Code2', { large: true, menu: true })]),
      ],
    },
    { id: 'help', label: 'Help', groups: [], note: 'Help, Contact Support, Feedback, Show Training.' },
  ],
}

export const EXCEL_UI: OfficeUiModel = {
  app: 'excel',
  appName: 'Microsoft Excel',
  version: 'Microsoft 365 desktop (Windows) · also matches Excel 2021/2024',
  documentTitle: 'Book1 - Excel',
  tabs: [
    {
      id: 'file',
      label: 'File',
      groups: [
        g('backstage', 'Backstage view', [
          b('file-home', 'Home', 'Home'),
          b('file-new', 'New', 'FilePlus2', { help: 'Blank workbook or a template.' }),
          b('file-open', 'Open', 'FolderOpen', { shortcut: 'Ctrl + O' }),
          b('file-info', 'Info', 'Info'),
          b('file-save', 'Save', 'Save', { shortcut: 'Ctrl + S' }),
          b('file-save-as', 'Save As', 'Save', { shortcut: 'F12' }),
          b('file-print', 'Print', 'Printer', { shortcut: 'Ctrl + P' }),
          b('file-share', 'Share', 'Share2'),
          b('file-export', 'Export', 'FileOutput', { help: 'Create PDF/XPS or change the file type.' }),
          b('file-close', 'Close', 'X', { shortcut: 'Ctrl + W' }),
          b('file-account', 'Account', 'User'),
          b('file-options', 'Options', 'Settings'),
        ]),
      ],
    },
    {
      id: 'home',
      label: 'Home',
      groups: [
        g('clipboard', 'Clipboard', [
          b('paste', 'Paste', 'ClipboardPaste', { large: true, menu: true, shortcut: 'Ctrl + V' }),
          b('cut', 'Cut', 'Scissors', { shortcut: 'Ctrl + X' }),
          b('copy', 'Copy', 'Copy', { shortcut: 'Ctrl + C' }),
          b('format-painter', 'Format Painter', 'Paintbrush'),
        ]),
        g('font', 'Font', [
          b('font-name', 'Aptos Narrow', 'Type', { menu: true, help: 'Font name box.' }),
          b('font-size', '11', undefined, { menu: true, help: 'Font size box.' }),
          b('grow-font', 'Increase Font Size', 'AArrowUp'),
          b('shrink-font', 'Decrease Font Size', 'AArrowDown'),
          b('bold', 'Bold', 'Bold', { shortcut: 'Ctrl + B' }),
          b('italic', 'Italic', 'Italic', { shortcut: 'Ctrl + I' }),
          b('underline', 'Underline', 'Underline', { shortcut: 'Ctrl + U', menu: true }),
          b('borders', 'Borders', 'Square', { menu: true, help: 'All Borders, Outside Borders, Bottom Border, …' }),
          b('fill-color', 'Fill Color', 'PaintBucket', { menu: true }),
          b('font-color', 'Font Color', 'Baseline', { menu: true }),
        ]),
        g('alignment', 'Alignment', [
          b('align-top', 'Top Align', 'AlignVerticalJustifyStart'),
          b('align-middle', 'Middle Align', 'AlignVerticalJustifyCenter'),
          b('align-bottom', 'Bottom Align', 'AlignVerticalJustifyEnd'),
          b('orientation', 'Orientation', 'RotateCcw', { menu: true }),
          b('wrap-text', 'Wrap Text', 'WrapText'),
          b('align-left', 'Align Left', 'AlignLeft'),
          b('center', 'Center', 'AlignCenter'),
          b('align-right', 'Align Right', 'AlignRight'),
          b('decrease-indent', 'Decrease Indent', 'IndentDecrease'),
          b('increase-indent', 'Increase Indent', 'IndentIncrease'),
          b('merge-center', 'Merge & Center', 'Combine', { menu: true }),
        ]),
        g('number', 'Number', [
          b('number-format', 'General', undefined, { menu: true, help: 'Number Format box: General, Number, Currency, Accounting, Short Date, Long Date, Time, Percentage, Fraction, Scientific, Text.' }),
          b('accounting', 'Accounting Number Format', 'DollarSign', { menu: true }),
          b('percent', 'Percent Style', 'Percent', { shortcut: 'Ctrl + Shift + %' }),
          b('comma', 'Comma Style', 'Tally5'),
          b('increase-decimal', 'Increase Decimal', 'Plus'),
          b('decrease-decimal', 'Decrease Decimal', 'Minus'),
        ]),
        g('styles', 'Styles', [
          b('conditional-formatting', 'Conditional Formatting', 'Palette', { large: true, menu: true, help: 'Highlight Cells Rules, Top/Bottom Rules, Data Bars, Color Scales, Icon Sets.' }),
          b('format-as-table', 'Format as Table', 'Table', { large: true, menu: true, shortcut: 'Ctrl + T' }),
          b('cell-styles', 'Cell Styles', 'SwatchBook', { large: true, menu: true }),
        ]),
        g('cells', 'Cells', [
          b('insert-cells', 'Insert', 'SquarePlus', { large: true, menu: true, help: 'Insert cells, rows, columns or a sheet.' }),
          b('delete-cells', 'Delete', 'SquareMinus', { large: true, menu: true }),
          b('format-cells', 'Format', 'Settings2', { large: true, menu: true, help: 'Row Height, Column Width, AutoFit, Hide & Unhide, Rename Sheet, Protect Sheet, Format Cells…' }),
        ]),
        g('editing', 'Editing', [
          b('autosum', 'AutoSum', 'Sigma', { menu: true, shortcut: 'Alt + =' }),
          b('fill', 'Fill', 'ArrowDownToLine', { menu: true }),
          b('clear', 'Clear', 'Eraser', { menu: true }),
          b('sort-filter', 'Sort & Filter', 'ArrowDownUp', { large: true, menu: true, help: 'Sort A to Z, Sort Z to A, Custom Sort, Filter, Clear.' }),
          b('find-select', 'Find & Select', 'Search', { large: true, menu: true }),
        ]),
        g('analysis', 'Analysis', [b('analyze-data', 'Analyze Data', 'Sparkles', { large: true })]),
      ],
    },
    {
      id: 'insert',
      label: 'Insert',
      groups: [
        g('tables', 'Tables', [
          b('pivottable', 'PivotTable', 'Table2', { large: true, menu: true }),
          b('recommended-pivottables', 'Recommended PivotTables', 'TableProperties', { large: true }),
          b('table', 'Table', 'Table', { large: true, shortcut: 'Ctrl + T' }),
        ]),
        g('illustrations', 'Illustrations', [b('pictures', 'Pictures', 'Image', { menu: true }), b('shapes', 'Shapes', 'Shapes', { menu: true }), b('icons', 'Icons', 'Smile'), b('smartart', 'SmartArt', 'Workflow'), b('screenshot', 'Screenshot', 'Camera', { menu: true })]),
        g('charts', 'Charts', [
          b('recommended-charts', 'Recommended Charts', 'BarChart3', { large: true }),
          b('column-chart', 'Insert Column or Bar Chart', 'BarChart2', { menu: true }),
          b('line-chart', 'Insert Line or Area Chart', 'LineChart', { menu: true }),
          b('pie-chart', 'Insert Pie or Doughnut Chart', 'PieChart', { menu: true }),
          b('hierarchy-chart', 'Insert Hierarchy Chart', 'Network', { menu: true }),
          b('statistic-chart', 'Insert Statistic Chart', 'BarChartBig', { menu: true }),
          b('scatter-chart', 'Insert Scatter (X, Y) or Bubble Chart', 'ScatterChart', { menu: true }),
          b('pivotchart', 'PivotChart', 'BarChart3', { large: true, menu: true }),
        ]),
        g('sparklines', 'Sparklines', [b('sparkline-line', 'Line', 'Activity'), b('sparkline-column', 'Column', 'BarChart2'), b('sparkline-winloss', 'Win/Loss', 'Diff')]),
        g('filters', 'Filters', [b('slicer', 'Slicer', 'SlidersHorizontal'), b('timeline', 'Timeline', 'CalendarRange')]),
        g('links', 'Links', [b('link', 'Link', 'Link', { shortcut: 'Ctrl + K', menu: true })]),
        g('comments', 'Comments', [b('comment', 'Comment', 'MessageSquare', { large: true })]),
        g('text', 'Text', [
          b('text-box', 'Text Box', 'RectangleHorizontal'),
          b('header-footer', 'Header & Footer', 'PanelTop', { help: 'Switches to Page Layout view with header/footer areas.' }),
          b('wordart', 'WordArt', 'Type', { menu: true }),
          b('signature-line', 'Signature Line', 'PenLine', { menu: true }),
          b('object', 'Object', 'Package'),
        ]),
        g('symbols', 'Symbols', [b('equation', 'Equation', 'Pi', { menu: true }), b('symbol', 'Symbol', 'Omega')]),
      ],
    },
    { id: 'draw', label: 'Draw', groups: [], note: 'Pens and highlighters for touch or mouse drawing.' },
    {
      id: 'page-layout',
      label: 'Page Layout',
      groups: [
        g('themes', 'Themes', [b('themes', 'Themes', 'Palette', { large: true, menu: true }), b('theme-colors', 'Colors', 'Droplets', { menu: true }), b('theme-fonts', 'Fonts', 'Type', { menu: true }), b('theme-effects', 'Effects', 'Sparkles', { menu: true })]),
        g('page-setup', 'Page Setup', [
          b('margins', 'Margins', 'Frame', { large: true, menu: true }),
          b('orientation', 'Orientation', 'RectangleVertical', { large: true, menu: true, help: 'Portrait or Landscape.' }),
          b('size', 'Size', 'Scaling', { large: true, menu: true }),
          b('print-area', 'Print Area', 'Printer', { large: true, menu: true, help: 'Set Print Area or Clear Print Area.' }),
          b('breaks', 'Breaks', 'SeparatorHorizontal', { large: true, menu: true }),
          b('background', 'Background', 'Image', { large: true }),
          b('print-titles', 'Print Titles', 'Rows3', { large: true, help: 'Repeat heading rows on every printed page.' }),
        ]),
        g('scale-to-fit', 'Scale to Fit', [
          b('scale-width', 'Width: Automatic', undefined, { menu: true }),
          b('scale-height', 'Height: Automatic', undefined, { menu: true }),
          b('scale', 'Scale: 100%', undefined),
        ]),
        g('sheet-options', 'Sheet Options', [
          b('gridlines-view', 'Gridlines · View', 'Grid3x3', { help: 'Checkbox.' }),
          b('gridlines-print', 'Gridlines · Print', 'Printer', { help: 'Checkbox: print the grid lines.' }),
          b('headings-view', 'Headings · View', 'Heading', { help: 'Checkbox.' }),
          b('headings-print', 'Headings · Print', 'Printer', { help: 'Checkbox: print row numbers and column letters.' }),
        ]),
        g('arrange', 'Arrange', [b('bring-forward', 'Bring Forward', 'BringToFront', { menu: true }), b('send-backward', 'Send Backward', 'SendToBack', { menu: true }), b('selection-pane', 'Selection Pane', 'Layers'), b('align', 'Align', 'AlignStartVertical', { menu: true }), b('group', 'Group', 'Group', { menu: true }), b('rotate', 'Rotate', 'RotateCw', { menu: true })]),
      ],
    },
    {
      id: 'formulas',
      label: 'Formulas',
      groups: [
        g('function-library', 'Function Library', [
          b('insert-function', 'Insert Function', 'FunctionSquare', { large: true, shortcut: 'Shift + F3' }),
          b('autosum-formulas', 'AutoSum', 'Sigma', { large: true, menu: true, shortcut: 'Alt + =' }),
          b('recently-used', 'Recently Used', 'History', { large: true, menu: true }),
          b('financial', 'Financial', 'Landmark', { large: true, menu: true }),
          b('logical', 'Logical', 'GitBranch', { large: true, menu: true, help: 'IF, AND, OR, IFERROR, …' }),
          b('text-functions', 'Text', 'Type', { large: true, menu: true }),
          b('date-time-functions', 'Date & Time', 'CalendarDays', { large: true, menu: true, help: 'TODAY, NOW, DATE, …' }),
          b('lookup-reference', 'Lookup & Reference', 'Search', { large: true, menu: true, help: 'VLOOKUP, XLOOKUP, INDEX, MATCH, …' }),
          b('math-trig', 'Math & Trig', 'Calculator', { large: true, menu: true, help: 'SUM, ROUND, SUMIF, …' }),
          b('more-functions', 'More Functions', 'MoreHorizontal', { large: true, menu: true }),
        ]),
        g('defined-names', 'Defined Names', [
          b('name-manager', 'Name Manager', 'Tags', { large: true, shortcut: 'Ctrl + F3' }),
          b('define-name', 'Define Name', 'Tag', { menu: true }),
          b('use-in-formula', 'Use in Formula', 'Braces', { menu: true }),
          b('create-from-selection', 'Create from Selection', 'ListPlus'),
        ]),
        g('formula-auditing', 'Formula Auditing', [
          b('trace-precedents', 'Trace Precedents', 'ArrowRightFromLine'),
          b('trace-dependents', 'Trace Dependents', 'ArrowRightToLine'),
          b('remove-arrows', 'Remove Arrows', 'Eraser', { menu: true }),
          b('show-formulas', 'Show Formulas', 'Code2', { shortcut: 'Ctrl + `' }),
          b('error-checking', 'Error Checking', 'TriangleAlert', { menu: true }),
          b('evaluate-formula', 'Evaluate Formula', 'ScanSearch'),
          b('watch-window', 'Watch Window', 'Eye'),
        ]),
        g('calculation', 'Calculation', [
          b('calculation-options', 'Calculation Options', 'Settings2', { large: true, menu: true, help: 'Automatic or Manual.' }),
          b('calculate-now', 'Calculate Now', 'RefreshCw', { shortcut: 'F9' }),
          b('calculate-sheet', 'Calculate Sheet', 'RefreshCcw', { shortcut: 'Shift + F9' }),
        ]),
      ],
    },
    {
      id: 'data',
      label: 'Data',
      groups: [
        g('get-transform', 'Get & Transform Data', [
          b('get-data', 'Get Data', 'Database', { large: true, menu: true }),
          b('from-text-csv', 'From Text/CSV', 'FileText'),
          b('from-web', 'From Web', 'Globe'),
          b('from-table-range', 'From Table/Range', 'Table'),
          b('recent-sources', 'Recent Sources', 'History'),
          b('existing-connections', 'Existing Connections', 'Cable'),
        ]),
        g('queries', 'Queries & Connections', [b('refresh-all', 'Refresh All', 'RefreshCw', { large: true, menu: true }), b('queries-connections', 'Queries & Connections', 'PanelRight')]),
        g('data-types', 'Data Types', [b('data-types', 'Stocks · Geography', 'Boxes', { menu: true })]),
        g('sort-filter-data', 'Sort & Filter', [
          b('sort-az', 'Sort A to Z', 'ArrowDownAZ'),
          b('sort-za', 'Sort Z to A', 'ArrowUpZA'),
          b('sort', 'Sort', 'ArrowDownUp', { large: true, help: 'Custom sort by several columns.' }),
          b('filter', 'Filter', 'Filter', { large: true, shortcut: 'Ctrl + Shift + L', help: 'Adds drop-down arrows to the header row.' }),
          b('clear-filter', 'Clear', 'FilterX'),
          b('reapply', 'Reapply', 'RefreshCw'),
          b('advanced', 'Advanced', 'SlidersHorizontal'),
        ]),
        g('data-tools', 'Data Tools', [
          b('text-to-columns', 'Text to Columns', 'Columns3'),
          b('flash-fill', 'Flash Fill', 'Zap', { shortcut: 'Ctrl + E' }),
          b('remove-duplicates', 'Remove Duplicates', 'CopyX'),
          b('data-validation', 'Data Validation', 'ShieldCheck', { menu: true, help: 'Allow a list, whole numbers, dates, …' }),
          b('consolidate', 'Consolidate', 'Merge'),
          b('relationships', 'Relationships', 'Link2'),
        ]),
        g('forecast', 'Forecast', [b('what-if', 'What-If Analysis', 'GitBranch', { large: true, menu: true }), b('forecast-sheet', 'Forecast Sheet', 'TrendingUp', { large: true })]),
        g('outline', 'Outline', [b('group-rows', 'Group', 'Group', { menu: true }), b('ungroup', 'Ungroup', 'Ungroup', { menu: true }), b('subtotal', 'Subtotal', 'Sigma')]),
      ],
    },
    {
      id: 'review',
      label: 'Review',
      groups: [
        g('proofing', 'Proofing', [b('spelling', 'Spelling', 'SpellCheck', { large: true, shortcut: 'F7' }), b('thesaurus', 'Thesaurus', 'BookA'), b('workbook-statistics', 'Workbook Statistics', 'Hash')]),
        g('accessibility', 'Accessibility', [b('check-accessibility', 'Check Accessibility', 'PersonStanding', { large: true, menu: true })]),
        g('language', 'Language', [b('translate', 'Translate', 'Languages'), b('language', 'Language', 'Globe', { menu: true })]),
        g('comments-review', 'Comments', [
          b('new-comment', 'New Comment', 'MessageSquarePlus', { large: true }),
          b('delete-comment', 'Delete', 'MessageSquareX'),
          b('previous-comment', 'Previous Comment', 'ChevronUp'),
          b('next-comment', 'Next Comment', 'ChevronDown'),
          b('show-comments', 'Show Comments', 'MessagesSquare'),
        ]),
        g('notes', 'Notes', [b('notes', 'Notes', 'StickyNote', { large: true, menu: true })]),
        g('protect', 'Protect', [
          b('protect-sheet', 'Protect Sheet', 'Lock', { large: true, help: 'Stops changes to locked cells; you can set a password.' }),
          b('protect-workbook', 'Protect Workbook', 'LockKeyhole', { large: true }),
          b('allow-edit-ranges', 'Allow Edit Ranges', 'SquareDashedMousePointer', { large: true }),
          b('unshare-workbook', 'Unshare Workbook', 'UserX', { large: true }),
        ]),
      ],
    },
    {
      id: 'view',
      label: 'View',
      groups: [
        g('sheet-view', 'Sheet View', [b('sheet-view', 'Default', 'Eye', { menu: true })]),
        g('workbook-views', 'Workbook Views', [
          b('normal', 'Normal', 'Grid3x3', { large: true }),
          b('page-break-preview', 'Page Break Preview', 'SeparatorHorizontal', { large: true }),
          b('page-layout', 'Page Layout', 'FileText', { large: true, help: 'Shows pages, margins, headers and footers.' }),
          b('custom-views', 'Custom Views', 'Bookmark', { large: true }),
        ]),
        g('show', 'Show', [
          b('ruler', 'Ruler', 'Ruler', { help: 'Checkbox (Page Layout view only).' }),
          b('gridlines', 'Gridlines', 'Grid3x3', { help: 'Checkbox.' }),
          b('formula-bar', 'Formula Bar', 'FunctionSquare', { help: 'Checkbox.' }),
          b('headings', 'Headings', 'Heading', { help: 'Checkbox: column letters and row numbers.' }),
        ]),
        g('zoom', 'Zoom', [b('zoom', 'Zoom', 'ZoomIn', { large: true }), b('zoom-100', '100%', 'Maximize2', { large: true }), b('zoom-to-selection', 'Zoom to Selection', 'Fullscreen', { large: true })]),
        g('window', 'Window', [
          b('new-window', 'New Window', 'AppWindow'),
          b('arrange-all', 'Arrange All', 'LayoutGrid'),
          b('freeze-panes', 'Freeze Panes', 'Snowflake', { menu: true, help: 'Freeze Panes, Freeze Top Row, Freeze First Column.' }),
          b('split', 'Split', 'SplitSquareVertical'),
          b('hide', 'Hide', 'EyeOff'),
          b('unhide', 'Unhide', 'Eye'),
          b('view-side-by-side', 'View Side by Side', 'Columns2'),
          b('switch-windows', 'Switch Windows', 'ArrowLeftRight', { menu: true }),
        ]),
        g('macros', 'Macros', [b('macros', 'Macros', 'Code2', { large: true, menu: true })]),
      ],
    },
    { id: 'automate', label: 'Automate', groups: [], note: 'Office Scripts (Microsoft 365 only).' },
    { id: 'help', label: 'Help', groups: [], note: 'Help, Contact Support, Feedback, Show Training.' },
  ],
}

export const OFFICE_UI: Record<OfficeApp, OfficeUiModel> = { word: WORD_UI, excel: EXCEL_UI }

export interface ResolvedTarget {
  tab: RibbonTab
  group: RibbonGroup
  button: RibbonButton
}

/** Find a button by id anywhere in the app's ribbon (optionally within one tab). */
export function findRibbonTarget(app: OfficeApp, buttonId: string, tabId?: string): ResolvedTarget | undefined {
  const model = OFFICE_UI[app]
  const tabs = tabId ? model.tabs.filter((t) => t.id === tabId) : model.tabs
  for (const tab of tabs) {
    for (const group of tab.groups) {
      const button = group.buttons.find((candidate) => candidate.id === buttonId)
      if (button) return { tab, group, button }
    }
  }
  return undefined
}

/** "Home tab → Font group → Bold (Ctrl + B)" — the sentence learners read to find a control. */
export function describeRibbonPath(target: ResolvedTarget): string {
  const shortcut = target.button.shortcut ? ` (${target.button.shortcut})` : ''
  return `${target.tab.label} tab → ${target.group.label} group → ${target.button.label}${shortcut}`
}
