import type { Lesson } from '../../types'

export const excelFoundations: Lesson[] = [
  {
    id: 'e1-1',
    pathId: 'excel',
    unitId: 'e1',
    title: 'Introduction to Microsoft Excel',
    subtitle: 'What a spreadsheet is and why offices use it',
    duration: 15,
    difficulty: 'Beginner',
    objectives: [
      'Name rows, columns and cells',
      'Tell a workbook from a worksheet',
      'Read a cell address such as `B5`',
      'Save a workbook as an `.xlsx` file',
    ],
    why: 'Offices use Excel for lists that change: staff, attendance, stock and expenses. A formula updates a total when one number changes, so you save time and avoid maths errors.',
    explain: [
      'A spreadsheet is a grid for numbers and text. A row goes across, a column goes down, and the box where they meet is a cell.',
      'The whole file is a workbook, and each tab inside it is a worksheet.',
      'Columns use letters and rows use numbers, so `B5` means column B, row 5.',
    ],
    terms: [
      { term: 'Spreadsheet', definition: 'A grid of rows and columns for data.' },
      { term: 'Workbook', definition: 'The whole Excel file, with all its sheets.' },
      { term: 'Worksheet', definition: 'One sheet or tab inside a workbook.' },
      { term: '.xlsx', definition: 'The normal Excel file type. You can edit it.' },
    ],
    tutorials: [
      {
        title: 'Create and save a workbook',
        steps: [
          {
            instruction: 'Click **Start**, type `Excel`, then click **Microsoft Excel**.',
            detail: 'The Excel start screen opens.',
          },
          {
            instruction: 'Click **Blank workbook**.',
            detail: 'A new workbook opens with one sheet, `Sheet1`.',
          },
          {
            instruction: 'Click `A1`, type `Office Supply List`, then press `Enter`.',
            detail: 'The text shows in the cell and the **Formula Bar**.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['Office Supply List']],
                selected: 'A1',
              },
              caption: 'The active cell is A1. The Name Box shows A1.',
            },
          },
          {
            instruction: 'In `A2`, type `Printer paper`, press `Tab`, then type `24`.',
            detail: 'Text aligns left. Numbers align right.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [
                  ['Office Supply List', ''],
                  ['Printer paper', '24'],
                ],
                selected: 'B2',
              },
              caption: 'B2 holds 24. The number sits on the right.',
            },
          },
          {
            instruction: 'Press `Ctrl + S`, type `First Workbook`, then click **Save**.',
            detail: 'The file is saved as an `.xlsx` workbook.',
            shortcut: 'Ctrl + S',
            ui: {
              tab: 'file',
              target: 'file-save',
              workspace: {
                kind: 'sheet',
                title: 'First Workbook - Excel',
                cells: [
                  ['Office Supply List', ''],
                  ['Printer paper', '24'],
                ],
                selected: 'B2',
              },
              caption: 'The File tab opens the Backstage view. Save is in the list on the left.',
            },
          },
        ],
        result: 'A saved workbook holds a title, an item and a quantity.',
      },
    ],
    visual: {
      kind: 'mockup',
      variant: 'excel',
      title: 'A spreadsheet is a grid',
      caption: 'Columns use letters, rows use numbers, and each cell has an address.',
      lines: [
        '        A                  B',
        '   ┌──────────────────┬──────────┐',
        ' 1 │ Office Supply List│ Quantity │',
        '   ├──────────────────┼──────────┤',
        ' 2 │ Printer paper     │ 24       │',
        '   ├──────────────────┼──────────┤',
        ' 3 │ Toner             │ 8        │',
        '   └──────────────────┴──────────┘',
        'Cell B2 is selected. The Name Box shows B2.',
      ],
    },
    example: {
      title: 'One workbook, four jobs',
      scenario:
        'Mia keeps one workbook for the office. The **Staff** sheet lists names, **Attendance** records leave, and **Summary** adds the totals. When she changes one cell, the summary updates.',
      takeaway: 'One workbook can hold many related sheets.',
    },
    guided: {
      title: 'Your first mini spreadsheet',
      goal: 'Create, fill and save a small list.',
      steps: [
        'Create a blank workbook.',
        'In `A1`, type `My Office List`.',
        'In `A2` to `A5`, type four office items, one per row.',
        'In `B2` to `B5`, type a quantity for each item.',
        'Save the file as `Practice - First Workbook.xlsx`.',
      ],
      hint: 'If a name is cut off, double-click the line between the A and B column headers.',
      expected: [
        'Four items and four quantities are visible.',
        'The file reopens with the same data.',
        'You can name the address of the last quantity cell.',
      ],
    },
    independent: {
      title: 'Plan a supply list',
      goal: 'Build a small list without step-by-step help.',
      steps: [
        'Create a workbook named `Supply Plan.xlsx`.',
        'Type these headers in row 1: `Item`, `Category`, `Quantity`, `Reorder?`.',
        'Add six items, one per row, with a category and a quantity.',
        'Save, close and reopen the workbook.',
      ],
      hint: 'Keep one item per row. Do not put two values in one cell.',
      expected: [
        'Each column holds one type of information.',
        'The workbook reopens with all six rows.',
      ],
    },
    knowledgeCheck: 'e1-1-kc',
    quickQuiz: ['e1-1-qq1', 'e1-1-qq2'],
    summary: [
      'A workbook is the file. Worksheets are the tabs inside it.',
      'A cell address joins a column letter and a row number, such as `B5`.',
    ],
    nextTeaser: 'Next, you will tour the Excel window.',
  },
  {
    id: 'e1-2',
    pathId: 'excel',
    unitId: 'e1',
    title: 'Understanding the Excel Interface',
    subtitle: 'Find commands and read any cell',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Find the **Name Box** and **Formula Bar**',
      'Read the address of the active cell',
      'Select a range such as `A1:C5`',
      'Jump to a cell with the **Name Box** or `F5`',
    ],
    why: 'A cell can show `150` but hold `=SUM(B2:B4)`. When you know where to look, you can check any number and follow any tutorial.',
    explain: [
      'The ribbon groups commands by task. **Home** holds formatting, **Data** holds sorting, and **View** holds view settings.',
      'The **Name Box** shows the active cell address, and the **Formula Bar** shows what the cell really contains, such as `=SUM(B2:B4)`.',
      'A range is a rectangle of cells written with a colon, like `B2:D5`.',
    ],
    terms: [
      { term: 'Active cell', definition: 'The cell selected now. It has a thicker border.' },
      { term: 'Name Box', definition: 'The box that shows the active cell address.' },
      { term: 'Formula Bar', definition: 'The bar that shows the true content of a cell.' },
    ],
    tutorials: [
      {
        title: 'Read a cell and its formula',
        steps: [
          {
            instruction: 'In `A1`, type `10`, then press `Enter`.',
            detail: 'The active cell moves to `A2`.',
            ui: {
              tab: 'home',
              workspace: { kind: 'sheet', title: 'Book1 - Excel', cells: [['10']], selected: 'A1' },
              caption: 'The value 10 is in A1.',
            },
          },
          {
            instruction: 'Type `20`, then press `Enter`.',
            detail: 'The active cell moves to `A3`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['10'], ['20']],
                selected: 'A2',
              },
              caption: 'The value 20 is in A2.',
            },
          },
          {
            instruction: 'Type `=A1+A2`, then press `Enter`.',
            detail: '`A3` shows `30`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['10'], ['20'], ['30']],
                selected: 'A3',
                formula: '=A1+A2',
              },
              caption: 'A3 shows the result: 30.',
            },
          },
          {
            instruction: 'Click `A3` and look at the **Formula Bar**.',
            detail: 'It shows `=A1+A2`, not `30`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['10'], ['20'], ['30']],
                selected: 'A3',
                formula: '=A1+A2',
              },
              caption: 'The Formula Bar shows the formula. The cell shows the result.',
            },
          },
          {
            instruction: 'Click the **Name Box**, type `C5`, then press `Enter`.',
            detail: 'The active cell jumps to `C5`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [
                  ['10', '', ''],
                  ['20', '', ''],
                  ['30', '', ''],
                  ['', '', ''],
                  ['', '', ''],
                ],
                selected: 'C5',
              },
              caption: 'The Name Box accepts any cell address.',
            },
          },
          {
            instruction: 'Select `A1:A3` and read the status bar.',
            detail: 'It shows Sum: 60.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['10'], ['20'], ['30']],
                selected: 'A3',
              },
              caption: 'With A1:A3 selected, the status bar shows Sum: 60.',
            },
          },
          {
            instruction: 'Click `A3`, then press `F2`.',
            detail: 'The formula opens for editing inside the cell.',
            shortcut: 'F2',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['10'], ['20'], ['30']],
                selected: 'A3',
                formula: '=A1+A2',
              },
              caption: 'The cursor is now inside A3.',
            },
          },
        ],
        result: 'You can read a cell address, its formula and its total.',
      },
    ],
    visual: {
      kind: 'mockup',
      variant: 'excel',
      title: 'The Excel window',
      caption: 'A simple map of the parts you will use most.',
      lines: [
        'Ribbon tabs  File  Home  Insert  Page Layout  Formulas  Data  Review  View',
        'Name Box: C5        Formula Bar: =SUM(C2:C4)',
        '     A        B        C',
        '1   Item     Cost     Total',
        '2   Paper    6.50     30',
        '3   Toner    48.00',
        'Sheet tabs:  Staff | Attendance | Summary   [+]',
        'Status bar: Ready   Sum: 54.50   [Zoom - +]',
      ],
    },
    example: {
      title: 'A total that looks too low',
      scenario:
        'An expense sheet shows a total that looks too low. You click the total cell. The **Formula Bar** shows `=SUM(C2:C10)`, but the data goes to row 15. The formula misses five rows.',
      takeaway: 'When a number looks wrong, read the **Formula Bar**.',
    },
    guided: {
      title: 'Explore the window',
      goal: 'Use the **Name Box**, **Formula Bar** and status bar.',
      steps: [
        'Open a blank workbook. Type `Item` in `A1` and three amounts in `A2:A4`.',
        'Click `A4` and find `A4` in the **Name Box**.',
        'In `A5`, type `=SUM(A2:A4)` and read the **Formula Bar**.',
        'Select `A2:A4` and check the Sum on the status bar.',
        'Use `Ctrl + Home`, `Ctrl + End` and `F5` to move around.',
      ],
      hint: 'If the status bar does not show Sum, right-click it and tick **Sum**.',
      expected: [
        'The **Name Box** matches the active cell.',
        'The **Formula Bar** shows the formula in `A5`.',
        'The status bar sum matches the formula result.',
      ],
    },
    independent: {
      title: 'Build a navigation playground',
      goal: 'Move around a sheet by address.',
      steps: [
        'Type a value in `A1`, `C3`, `F6` and `J10`.',
        'Use the **Name Box** to visit each cell in turn.',
        'Select `A1:J10` and read the status bar.',
        'Save the file as `Navigation Practice.xlsx`.',
      ],
      hint: '`Ctrl + End` goes to the last cell that has data or formatting.',
      expected: [
        'You can reach any cell by typing its address.',
        'You can explain what the status bar shows.',
      ],
    },
    knowledgeCheck: 'e1-2-kc',
    quickQuiz: ['e1-2-qq1', 'e1-2-qq2'],
    summary: [
      'The **Name Box** shows the address. The **Formula Bar** shows the content.',
      '`Ctrl + Home` goes to `A1`; `Ctrl + End` goes to the last used cell.',
    ],
    nextTeaser: 'Next, you will manage sheets, rows and columns.',
  },
  {
    id: 'e1-3',
    pathId: 'excel',
    unitId: 'e1',
    title: 'Workbooks, Worksheets, Rows and Columns',
    subtitle: 'Organize a workbook that stays easy to use',
    duration: 25,
    difficulty: 'Beginner',
    objectives: [
      'Rename a worksheet tab',
      'Insert and delete a row or column',
      'AutoFit a column width',
      'Freeze the top row',
    ],
    why: 'A long list needs clear tabs and a visible header. When you scroll, row 1 should stay on screen.',
    explain: [
      'The tabs at the bottom are the workbook contents. Double-click a tab to rename it, or right-click it for **Insert**, **Delete** and **Move or Copy**.',
      'To add a row or column, right-click its number or letter and click **Insert**.',
      '**Freeze Panes** keeps the header on screen while you scroll. It changes the view, not the data.',
    ],
    terms: [
      { term: 'Worksheet tab', definition: 'The label at the bottom that opens a sheet.' },
      { term: 'AutoFit', definition: 'Resize a column to fit its longest entry.' },
      { term: 'Freeze Panes', definition: 'Keeps rows or columns on screen while you scroll.' },
    ],
    tutorials: [
      {
        title: 'Name the sheets',
        steps: [
          {
            instruction: 'Double-click the **Sheet1** tab, type `Staff`, then press `Enter`.',
            detail: 'The tab is renamed.',
          },
          {
            instruction: 'Click **New sheet**.',
            detail: 'A new tab appears, named `Sheet2`.',
          },
          {
            instruction: 'Double-click the new tab, type `Attendance`, then press `Enter`.',
          },
          {
            instruction: 'Click **New sheet**, then name the new tab `Summary`.',
            detail: 'The workbook now has three named sheets.',
          },
          {
            instruction: 'Click the **Staff** tab, then type these headers in row 1: `Employee ID`, `Name`, `Department`, `Phone`.',
            detail: 'Keep the header row in row 1.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [['Employee ID', 'Name', 'Department', 'Phone']],
                selected: 'A1',
              },
              caption: 'The header row is ready for staff records.',
            },
          },
        ],
        result: 'Three named tabs sit in a clear order.',
      },
      {
        title: 'Insert a row and freeze the header',
        steps: [
          {
            instruction: 'Right-click row `3`, then click **Insert**.',
            detail: 'A blank row appears above row 3.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Phone'],
                  ['E-001', 'Amina Yusuf', 'Finance', '555-0101'],
                  ['', '', '', ''],
                  ['E-002', 'Daniel Kim', 'Operations', '555-0102'],
                ],
                selected: 'A3',
              },
              caption: 'The blank row is ready for a new record.',
            },
          },
          {
            instruction: 'Type `E-003`, `Sara Ali`, `Admin`, `555-0103` in row 3.',
            detail: 'Use `Tab` to move across the row.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Phone'],
                  ['E-001', 'Amina Yusuf', 'Finance', '555-0101'],
                  ['E-003', 'Sara Ali', 'Admin', '555-0103'],
                  ['E-002', 'Daniel Kim', 'Operations', '555-0102'],
                ],
                selected: 'A3',
              },
              caption: 'The new record sits between the two older records.',
            },
          },
          {
            instruction: 'Right-click column `D`, then click **Insert**.',
            detail: 'A new column D appears.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', '', 'Phone'],
                  ['E-001', 'Amina Yusuf', 'Finance', '', '555-0101'],
                  ['E-003', 'Sara Ali', 'Admin', '', '555-0103'],
                  ['E-002', 'Daniel Kim', 'Operations', '', '555-0102'],
                ],
                selected: 'D1',
              },
              caption: 'Column D is empty and ready for email addresses.',
            },
          },
          {
            instruction: 'Type `Email` in `D1`.',
            detail: 'The new column has a header.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Email', 'Phone'],
                  ['E-001', 'Amina Yusuf', 'Finance', '', '555-0101'],
                  ['E-003', 'Sara Ali', 'Admin', '', '555-0103'],
                  ['E-002', 'Daniel Kim', 'Operations', '', '555-0102'],
                ],
                selected: 'D1',
              },
              caption: 'The header row now names every column.',
            },
          },
          {
            instruction: 'Select columns `A:E`, then on the **Home** tab click **Format** > **AutoFit Column Width**.',
            detail: 'Every header fits.',
            ui: {
              tab: 'home',
              target: 'format-cells',
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Email', 'Phone'],
                  ['E-001', 'Amina Yusuf', 'Finance', '', '555-0101'],
                  ['E-003', 'Sara Ali', 'Admin', '', '555-0103'],
                  ['E-002', 'Daniel Kim', 'Operations', '', '555-0102'],
                ],
                selected: 'A1',
              },
              caption: 'AutoFit sets each column to its longest entry.',
            },
          },
          {
            instruction: 'Click `A2`, then on the **View** tab click **Freeze Panes** > **Freeze Panes**.',
            detail: 'Row 1 stays visible when you scroll.',
            ui: {
              tab: 'view',
              target: 'freeze-panes',
              workspace: {
                kind: 'sheet',
                title: 'Office Workbook - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Email', 'Phone'],
                  ['E-001', 'Amina Yusuf', 'Finance', '', '555-0101'],
                  ['E-003', 'Sara Ali', 'Admin', '', '555-0103'],
                  ['E-002', 'Daniel Kim', 'Operations', '', '555-0102'],
                ],
                selected: 'A2',
              },
              caption: 'Row 1 is now frozen above the scrolling rows.',
            },
          },
        ],
        result: 'The header stays on screen, and every column fits its content.',
      },
    ],
    visual: {
      kind: 'mockup',
      variant: 'excel',
      title: 'A well-organized workbook',
      caption: 'Descriptive tabs and a frozen header row make the workbook easy to use.',
      lines: [
        'Frozen row 1:  Employee ID | Name | Department | Email | Phone',
        'Row 2:  E-001 | Amina Yusuf | Finance | amina@example.com | 555-0101',
        'Row 3:  E-002 | Daniel Kim | Operations | daniel@example.com | 555-0102',
        '...scroll...',
        '',
        'Sheet tabs:  [Staff] [Attendance] [Summary]  [+]',
      ],
    },
    example: {
      title: 'The workbook nobody could navigate',
      scenario:
        'An office keeps staff, attendance and expenses in one sheet called **Sheet1**. A new assistant cannot see where one table ends, so three named sheets with frozen headers make the file easy to use.',
      takeaway: 'Name each sheet for its job, and freeze the header row.',
    },
    guided: {
      title: 'Organize a small office workbook',
      goal: 'Create clear sheets and keep a header visible.',
      steps: [
        'Create a workbook with sheets named `Staff`, `Leave` and `Summary`.',
        'Add a header row with five fields on `Staff`.',
        'Insert two rows and add two sample records.',
        'Freeze the header row on `Staff`.',
        'Save as `Office Workbook Organized.xlsx`.',
      ],
      hint: 'If **Freeze Panes** is grey, click a cell first. It is not available while you edit a cell.',
      expected: [
        'Three named sheets exist in a clear order.',
        '`Staff` has a frozen header row.',
        'The file reopens with the same tabs.',
      ],
    },
    independent: {
      title: 'Plan a monthly tracker',
      goal: 'Design the structure before you add data.',
      steps: [
        'Create sheets for `Staff`, `Attendance`, `Leave`, `Expenses` and `Dashboard`.',
        'Add at least four headers to each data sheet.',
        'Freeze the header row on every data sheet.',
        'Save as `Monthly Tracker Template.xlsx`.',
      ],
      hint: 'Set up the structure first. Adding data before you choose the columns creates messy insertions.',
      expected: [
        'Every sheet has one clear purpose.',
        'Each header row stays visible when you scroll.',
      ],
    },
    knowledgeCheck: 'e1-3-kc',
    quickQuiz: ['e1-3-qq1', 'e1-3-qq2'],
    summary: [
      'Rename tabs for their job, and keep the header in row 1.',
      '**Freeze Panes** keeps the header on screen while you scroll.',
    ],
    nextTeaser: 'Next, you will enter and edit data without mistakes.',
  },
  {
    id: 'e1-4',
    pathId: 'excel',
    unitId: 'e1',
    title: 'Entering and Editing Data',
    subtitle: 'Accuracy habits and faster entry',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Enter text, numbers and dates',
      'Edit a cell with `F2`',
      'Continue a series with **AutoFill**',
      'Spot a number stored as text',
    ],
    why: 'A formula only works with clean data. One extra space or a text date can stop a total.',
    explain: [
      'Text aligns left. Numbers and dates align right, so a number on the left may be stored as text.',
      'Press `Enter` to move down, `Tab` to move right, and `F2` to edit inside a cell.',
      '**AutoFill** continues a pattern when you drag the fill handle, the small square at the bottom-right of the selection.',
    ],
    terms: [
      { term: 'Edit mode', definition: 'The state where the cursor is inside a cell.' },
      { term: 'Fill handle', definition: 'The small square at the bottom-right of a selection.' },
      { term: 'AutoFill', definition: 'Copies or continues a pattern into nearby cells.' },
    ],
    tutorials: [
      {
        title: 'Enter an employee list',
        steps: [
          {
            instruction: 'Type `Employee ID`, `Name` and `Start Date` in row 1. Press `Tab` after each.',
            detail: '`Tab` moves you right.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [['Employee ID', 'Name', 'Start Date']],
                selected: 'A1',
              },
              caption: 'The header row is ready.',
            },
          },
          {
            instruction: 'In `A2`, type `E-001`.',
            detail: 'Text aligns left.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date'],
                  ['E-001', '', ''],
                ],
                selected: 'A2',
              },
              caption: 'The ID is stored as text.',
            },
          },
          {
            instruction: 'Press `Tab`, type `Amina Yusuf`, press `Tab`, then type `2026-06-01`.',
            detail: 'The date aligns right when Excel recognises it.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date'],
                  ['E-001', 'Amina Yusuf', '2026-06-01'],
                ],
                selected: 'C2',
              },
              caption: 'A real date sits on the right.',
            },
          },
          {
            instruction: 'Click `A2` and drag the **fill handle** down to `A6`.',
            detail: 'Excel fills `E-002` to `E-005`. Use **AutoFill Options** > **Fill Series** if it only copies.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date'],
                  ['E-001', 'Amina Yusuf', '2026-06-01'],
                  ['E-002', '', ''],
                  ['E-003', '', ''],
                  ['E-004', '', ''],
                  ['E-005', '', ''],
                ],
                selected: 'A2',
              },
              caption: 'The fill handle is the small square at the bottom-right of A2.',
            },
          },
          {
            instruction: 'Select `C2` and drag its fill handle down to `C6`.',
            detail: 'Each date moves on by one day.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Book1 - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date'],
                  ['E-001', 'Amina Yusuf', '2026-06-01'],
                  ['E-002', '', '2026-06-02'],
                  ['E-003', '', '2026-06-03'],
                  ['E-004', '', '2026-06-04'],
                  ['E-005', '', '2026-06-05'],
                ],
                selected: 'C2',
              },
              caption: 'AutoFill adds one day to each date.',
            },
          },
          {
            instruction: 'Press `Ctrl + S` and save as `Employee Entry Practice.xlsx`.',
            detail: 'Check that every date aligns right.',
            shortcut: 'Ctrl + S',
            ui: {
              tab: 'file',
              target: 'file-save',
              workspace: {
                kind: 'sheet',
                title: 'Employee Entry Practice - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date'],
                  ['E-001', 'Amina Yusuf', '2026-06-01'],
                  ['E-002', '', '2026-06-02'],
                  ['E-003', '', '2026-06-03'],
                  ['E-004', '', '2026-06-04'],
                  ['E-005', '', '2026-06-05'],
                ],
                selected: 'C2',
              },
              caption: 'The workbook keeps its data after saving.',
            },
          },
        ],
        result: 'A five-person list with a clear ID pattern and real dates.',
      },
      {
        title: 'Edit a cell and fill a pattern',
        steps: [
          {
            instruction: 'In `D1`, type `First Name`.',
            detail: 'This column will hold each first name.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Employee Entry Practice - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date', 'First Name'],
                  ['E-001', 'Amina Yusuf', '2026-06-01', ''],
                ],
                selected: 'D1',
              },
              caption: 'A fourth column is ready.',
            },
          },
          {
            instruction: 'In `D2`, type `Amina`.',
            detail: 'Type the first name by hand.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Employee Entry Practice - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date', 'First Name'],
                  ['E-001', 'Amina Yusuf', '2026-06-01', 'Amina'],
                ],
                selected: 'D2',
              },
              caption: 'One example shows Excel the pattern.',
            },
          },
          {
            instruction: 'Click `D3`, then on the **Data** tab click **Flash Fill**.',
            detail: 'Excel fills the other first names.',
            shortcut: 'Ctrl + E',
            ui: {
              tab: 'data',
              target: 'flash-fill',
              workspace: {
                kind: 'sheet',
                title: 'Employee Entry Practice - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Start Date', 'First Name'],
                  ['E-001', 'Amina Yusuf', '2026-06-01', 'Amina'],
                  ['E-002', 'Daniel Kim', '2026-06-02', 'Daniel'],
                  ['E-003', 'Sara Ali', '2026-06-03', 'Sara'],
                  ['E-004', 'Tom Becker', '2026-06-04', 'Tom'],
                  ['E-005', 'Lena Ortiz', '2026-06-05', 'Lena'],
                ],
                selected: 'D3',
              },
              caption: 'Flash Fill fills the other first names.',
            },
          },
          {
            instruction: 'Press `Ctrl + Z`, then `Ctrl + Y`.',
            detail: 'Undo removes the fill. Redo brings it back.',
            shortcut: 'Ctrl + Z',
          },
        ],
        result: 'You can edit inside a cell and fill a pattern in seconds.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'How Excel sees common entries',
      caption: 'Alignment is your first clue about the data type.',
      headers: ['Entry', 'Stored as', 'Alignment', 'Watch out for'],
      rows: [
        ['John Doe', 'Text', 'Left', 'Extra spaces'],
        ['1250.50', 'Number', 'Right', 'A leading apostrophe forces text'],
        ['2026-06-01', 'Date', 'Right', 'Text dates break sorting'],
        ['15%', 'Number (0.15)', 'Right', 'Formatting shows the % sign'],
        ['E-001', 'Text', 'Left', 'IDs with leading zeros must stay text'],
      ],
    },
    example: {
      title: 'The attendance sheet that would not total',
      scenario:
        'An attendance sheet shows a total of zero. The days were typed with a trailing space, so every value is text. Retyping the numbers fixes the column.',
      takeaway: 'Check alignment: numbers and dates should sit on the right.',
    },
    guided: {
      title: 'Enter a clean contact list',
      goal: 'Practise entry, editing and AutoFill.',
      steps: [
        'Create headers: `ID`, `Full Name`, `Department`, `Phone`, `Join Date`.',
        'Enter five records. Start a phone number with an apostrophe if it begins with 0.',
        'Use **AutoFill** to continue the ID pattern.',
        'Press `F2` to correct one misspelled department.',
        'Save as `Contact Entry Practice.xlsx`.',
      ],
      hint: "To keep a phone number as text, type an apostrophe first, like `'05551234`. Excel hides the apostrophe.",
      expected: [
        'Five complete records exist.',
        'Dates align right and sort correctly.',
        'IDs follow one pattern.',
      ],
    },
    independent: {
      title: 'Prepare a training register',
      goal: 'Build a clean data set from scratch.',
      steps: [
        'Create headers: `Employee`, `Department`, `Course`, `Completion Date`, `Score`.',
        'Enter eight records with realistic values.',
        'Fix one date typed as text. Retype it so it aligns right.',
        'Save as `Training Register.xlsx`.',
      ],
      hint: 'If a date will not align right, retype it in `YYYY-MM-DD` form.',
      expected: [
        'All eight records are complete.',
        'Dates and scores are stored as numbers or dates.',
      ],
    },
    knowledgeCheck: 'e1-4-kc',
    quickQuiz: ['e1-4-qq1', 'e1-4-qq2'],
    summary: [
      'Text aligns left. Numbers and dates align right.',
      '`Enter` moves down, `Tab` moves right, and `F2` edits inside a cell.',
    ],
    nextTeaser: 'Next, you will format cells so the data is easy to read.',
  },
  {
    id: 'e2-1',
    pathId: 'excel',
    unitId: 'e2',
    title: 'Cell Formatting',
    subtitle: 'Make a sheet easy to scan',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Apply **Bold**, **Fill Color** and **Borders**',
      'Wrap long text in a cell',
      'Copy formatting with **Format Painter**',
      'Explain why merged cells cause problems',
    ],
    why: 'A header row with fill and borders helps readers scan a list. Clear formatting makes your work look professional and reduces mistakes.',
    explain: [
      'Formatting changes how a cell looks, not what it holds. Select the cells first, then apply the format.',
      'The **Home** tab holds **Bold**, **Fill Color**, **Borders**, **Wrap Text** and **Cell Styles**.',
      '**Wrap Text** puts long text on more lines. **Merge & Center** joins cells, but it breaks sorting and filtering, so avoid it in a data table.',
    ],
    terms: [
      { term: 'Fill color', definition: 'The background colour of a cell.' },
      { term: 'Wrap Text', definition: 'Shows long text on several lines in one cell.' },
      { term: 'Cell Style', definition: 'A named set of formats, such as **Total**.' },
    ],
    tutorials: [
      {
        title: 'Format an expense header',
        steps: [
          {
            instruction: 'Select `A1`.',
            detail: 'The first header cell is selected.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A1',
              },
              caption: 'The header row A1:E1 is selected.',
            },
          },
          {
            instruction: 'On the **Home** tab, click **Bold**.',
            detail: 'The header text becomes thicker.',
            shortcut: 'Ctrl + B',
            ui: {
              tab: 'home',
              target: 'bold',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A1',
              },
              caption: 'Bold makes the header heavier.',
            },
          },
          {
            instruction: 'Click **Fill Color** and choose a dark blue.',
            detail: 'The header gets a blue background.',
            ui: {
              tab: 'home',
              target: 'fill-color',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A1',
              },
              caption: 'The fill sits behind the header text.',
            },
          },
          {
            instruction: 'Click **Font Color** and choose white.',
            detail: 'The text is easy to read on the dark fill.',
            ui: {
              tab: 'home',
              target: 'font-color',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A1',
              },
              caption: 'White text on a dark fill is easy to read.',
            },
          },
          {
            instruction: 'Select `A2:E4`, then click **Borders** > **All Borders**.',
            detail: 'Thin lines separate every cell.',
            ui: {
              tab: 'home',
              target: 'borders',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A2',
              },
              caption: 'All Borders draws a thin line around every selected cell.',
            },
          },
          {
            instruction: 'Select `A1`, then click **Wrap Text**.',
            detail: 'Long headers move onto two lines.',
            ui: {
              tab: 'home',
              target: 'wrap-text',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A1',
              },
              caption: 'Wrapped text stays inside its cell.',
            },
          },
        ],
        result: 'The first header cell stands out, and the data cells have clean borders.',
      },
      {
        title: 'Copy and clear formatting',
        steps: [
          {
            instruction: 'Click `A1`, then click **Format Painter**.',
            detail: 'The pointer shows a paintbrush.',
            ui: {
              tab: 'home',
              target: 'format-painter',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A1',
              },
              caption: 'Format Painter copies the look of A1.',
            },
          },
          {
            instruction: 'Drag across `B1:E1`.',
            detail: 'The same fill and font apply.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'C1',
              },
              caption: 'The header format is copied across the row.',
            },
          },
          {
            instruction: 'Select `A5:E5`, then click **Cell Styles** and choose **Total**.',
            detail: 'A bold line appears above the total.',
            ui: {
              tab: 'home',
              target: 'cell-styles',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A5',
              },
              caption: 'The Total style adds a top border and bold text.',
            },
          },
          {
            instruction: 'With `A5:E5` selected, click **Clear** > **Clear Formats**.',
            detail: 'The formats go. The values stay.',
            ui: {
              tab: 'home',
              target: 'clear',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Category', 'Amount', 'Payment Method'],
                  ['2026-06-01', 'Printer paper', 'Office', '120.50', ''],
                  ['2026-06-03', 'Toner', 'Office', '45.00', ''],
                  ['2026-06-05', 'Train ticket', 'Travel', '89.99', ''],
                  ['', 'Total', '', '255.49', ''],
                ],
                selected: 'A5',
              },
              caption: 'Clear Formats removes the look but keeps the data.',
            },
          },
        ],
        result: 'You can copy a format in seconds and remove it without deleting data.',
      },
    ],
    visual: {
      kind: 'compare',
      title: 'Plain cells vs. formatted cells',
      caption: 'The same data is much easier to scan with a clear header and borders.',
      left: {
        label: 'Plain cells',
        points: [
          'Every cell looks the same',
          'Readers must hunt for the header',
          'Long labels are cut off',
        ],
      },
      right: {
        label: 'Formatted cells',
        points: [
          'Bold header with a fill',
          'Thin borders separate rows',
          'Wrap Text keeps labels visible',
          'Format Painter copies the look',
        ],
      },
    },
    example: {
      title: 'The merged title that broke the filter',
      scenario:
        'An assistant merges `A1:E1` for a report title, then tries to filter the data. Excel warns that merged cells cause problems. Moving the title to one cell keeps the look without breaking the filter.',
      takeaway: 'Keep data cells unmerged. Format the header instead.',
    },
    guided: {
      title: 'Format an attendance sheet',
      goal: 'Make a header and data area easy to read.',
      steps: [
        'Create headers: `Name`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Total`.',
        'Make the header bold with white text on a dark green fill.',
        'Add **All Borders** to the data range.',
        'Centre the day columns and right-align `Total`.',
        'Wrap the header row, then save as `Attendance Formatting.xlsx`.',
      ],
      hint: 'If wrapped text disappears, the row is too short. Drag the row boundary down.',
      expected: [
        'The header is clearly different from the data.',
        'No text is cut off.',
        'Day values are centred; totals align right.',
      ],
    },
    independent: {
      title: 'Format a stock sheet',
      goal: 'Apply formatting choices that help scanning.',
      steps: [
        'Create columns `Item`, `Qty`, `Unit Cost` and `Total`.',
        'Format the header with bold text and a fill colour.',
        'Add borders and widen each column so no text is cut off.',
        'Save as `Stock Formatting.xlsx`.',
      ],
      hint: 'To widen a column, double-click the line between its letter and the next letter.',
      expected: [
        'The header row is easy to find.',
        'No merged cells sit in the data range.',
      ],
    },
    knowledgeCheck: 'e2-1-kc',
    quickQuiz: ['e2-1-qq1', 'e2-1-qq2'],
    summary: [
      'Formatting changes the look, not the value.',
      '**Wrap Text** keeps long labels visible. **Format Painter** copies a format.',
    ],
    nextTeaser: 'Next, you will format numbers, money and dates.',
  },
  {
    id: 'e2-2',
    pathId: 'excel',
    unitId: 'e2',
    title: 'Number, Currency and Date Formats',
    subtitle: 'Show values the way the office reads them',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Apply **Currency**, **Percentage** and **Date** formats',
      'Change the number of decimals',
      'Fix `#####` in a cell',
      'Explain what Excel stores for `15%`',
    ],
    why: 'The same value can read `1250.5`, `1,250.50` or `$1,250.50`. The right format stops a budget or a deadline from being misread.',
    explain: [
      'A number format changes how a value looks, but the stored value stays the same.',
      'Excel stores `15%` as `0.15`, so typing `15` and applying **Percentage** gives `1500%`.',
      '`#####` means the column is too narrow. Widen it to show the number.',
    ],
    terms: [
      { term: 'Number format', definition: 'Instructions for how a value is displayed.' },
      { term: 'Percentage', definition: 'A value shown as part of 100. `15%` equals `0.15`.' },
      { term: '#####', definition: 'A sign that the column is too narrow.' },
    ],
    tutorials: [
      {
        title: 'Format dates and amounts',
        steps: [
          {
            instruction: 'Type `Date`, `Item` and `Amount` in row 1.',
            detail: 'Press `Tab` after each header.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [['Date', 'Item', 'Amount']],
                selected: 'A1',
              },
              caption: 'The header row is ready.',
            },
          },
          {
            instruction: 'Add three expenses with a date, an item and an amount.',
            detail: 'Keep one expense per row.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Amount'],
                  ['2026-06-01', 'Printer paper', '1250.5'],
                  ['2026-06-03', 'Toner', '48'],
                  ['2026-06-05', 'Pens', '12.25'],
                ],
                selected: 'A2',
              },
              caption: 'The amounts are typed as plain numbers.',
            },
          },
          {
            instruction: 'Select `C2:C4`, then click **Accounting Number Format**.',
            detail: 'A currency symbol and two decimals appear.',
            ui: {
              tab: 'home',
              target: 'accounting',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Amount'],
                  ['2026-06-01', 'Printer paper', '1,250.50'],
                  ['2026-06-03', 'Toner', '48.00'],
                  ['2026-06-05', 'Pens', '12.25'],
                ],
                selected: 'C2',
              },
              caption: 'Accounting lines up the currency symbols and decimals.',
            },
          },
          {
            instruction: 'Select `A2:A4`, then press `Ctrl + 1`.',
            detail: 'The **Format Cells** dialog opens.',
            shortcut: 'Ctrl + 1',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Amount'],
                  ['2026-06-01', 'Printer paper', '1,250.50'],
                  ['2026-06-03', 'Toner', '48.00'],
                  ['2026-06-05', 'Pens', '12.25'],
                ],
                selected: 'A2',
              },
              caption: 'The Format Cells dialog gives full control.',
            },
          },
          {
            instruction: 'Click **Date**, choose `14-Mar-2012`, then click **OK**.',
            detail: 'Every date shows the same pattern.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Amount'],
                  ['1-Jun-2026', 'Printer paper', '1,250.50'],
                  ['3-Jun-2026', 'Toner', '48.00'],
                  ['5-Jun-2026', 'Pens', '12.25'],
                ],
                selected: 'A2',
              },
              caption: 'The dates now share one clear format.',
            },
          },
          {
            instruction: 'Select `C2:C4`, then click **Increase Decimal**.',
            detail: 'The amounts show three decimals.',
            ui: {
              tab: 'home',
              target: 'increase-decimal',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Amount'],
                  ['1-Jun-2026', 'Printer paper', '1,250.500'],
                  ['3-Jun-2026', 'Toner', '48.000'],
                  ['5-Jun-2026', 'Pens', '12.250'],
                ],
                selected: 'C2',
              },
              caption: 'Only the display changes.',
            },
          },
          {
            instruction: 'Click **Decrease Decimal** to return to two decimals.',
            detail: 'The values do not change.',
            ui: {
              tab: 'home',
              target: 'decrease-decimal',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Item', 'Amount'],
                  ['1-Jun-2026', 'Printer paper', '1,250.50'],
                  ['3-Jun-2026', 'Toner', '48.00'],
                  ['5-Jun-2026', 'Pens', '12.25'],
                ],
                selected: 'C2',
              },
              caption: 'Two decimals are enough for most office lists.',
            },
          },
        ],
        result: 'The dates look the same, and every amount shows a currency symbol.',
      },
      {
        title: 'Fix a percentage and a narrow column',
        steps: [
          {
            instruction: 'In `A1`, type `0.15`.',
            detail: 'Excel stores fifteen hundredths.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [['0.15']],
                selected: 'A1',
              },
              caption: 'General format shows 0.15.',
            },
          },
          {
            instruction: 'In `A2`, type `15%`.',
            detail: 'The cell shows `15%`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [['0.15'], ['15%']],
                selected: 'A2',
              },
              caption: 'Both cells hold the same value.',
            },
          },
          {
            instruction: 'Select `A1:A2`, then click **Percentage**.',
            detail: 'Both cells show `15%`.',
            ui: {
              tab: 'home',
              target: 'percent',
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [['15%'], ['15%']],
                selected: 'A1',
              },
              caption: 'Percentage format multiplies the display by 100.',
            },
          },
          {
            instruction: 'In `C1`, type `1234567.89`, then press `Enter`.',
            detail: 'The full number is stored.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [
                  ['15%', '', '1234567.89'],
                  ['15%', '', ''],
                ],
                selected: 'C1',
              },
              caption: 'The value is wider than the column.',
            },
          },
          {
            instruction: 'Click **Accounting Number Format**.',
            detail: 'The cell shows `#####`.',
            ui: {
              tab: 'home',
              target: 'accounting',
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [
                  ['15%', '', '#####'],
                  ['15%', '', ''],
                ],
                selected: 'C1',
              },
              caption: 'The column is too narrow for the formatted number.',
            },
          },
          {
            instruction: 'Double-click the line between the `C` and `D` column headers.',
            detail: 'The column widens to fit the number.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [
                  ['15%', '', '$1,234,567.89'],
                  ['15%', '', ''],
                ],
                selected: 'C1',
              },
              caption: 'AutoFit shows the full value; your region may use a different symbol.',
            },
          },
          {
            instruction: 'Select `C1`, then click **Comma Style**.',
            detail: 'It reads `1,234,567.89`.',
            ui: {
              tab: 'home',
              target: 'comma',
              workspace: {
                kind: 'sheet',
                title: 'Rates - Excel',
                cells: [
                  ['15%', '', '1,234,567.89'],
                  ['15%', '', ''],
                ],
                selected: 'C1',
              },
              caption: 'Comma Style adds thousands separators.',
            },
          },
        ],
        result: 'You can show a rate as a percentage and fix a column that is too narrow.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'Same value, different display',
      caption: 'The stored value is 1250.5 in every row.',
      headers: ['Format', 'Display', 'Typical use'],
      rows: [
        ['General', '1250.5', 'Raw data'],
        ['Number (2 decimals)', '1,250.50', 'Quantities'],
        ['Currency', '$1,250.50', 'Prices and invoices'],
        ['Accounting', '$      1,250.50', 'Aligned financial lists'],
        ['Percentage', '125,050.00%', 'Rates stored as 1250.5'],
      ],
    },
    example: {
      title: 'The budget that looked ten times too large',
      scenario:
        'A manager types `15` in a cell and applies **Percentage**. The cell shows `1500%`, and the budget looks absurd. The correct entry is `15%` or `0.15`.',
      takeaway: 'Type a percentage as a percentage. Formatting only changes the display.',
    },
    guided: {
      title: 'Format a financial summary',
      goal: 'Use date, currency and percentage formats.',
      steps: [
        'Create a table with `Date`, `Category`, `Amount` and `Tax Rate`.',
        'Enter four rows with real dates and amounts.',
        'Format `Amount` as **Currency** with two decimals.',
        'Format `Tax Rate` as **Percentage**, then click **Increase Decimal** once.',
        'Widen any column showing `#####`, then save as `Financial Formats.xlsx`.',
      ],
      hint: 'If a rate shows `1500%`, you typed `15`. Enter `15%` or `0.15` instead.',
      expected: [
        'Dates look the same and sort correctly.',
        'Amounts show a currency symbol.',
        'Tax rates show as percentages.',
      ],
    },
    independent: {
      title: 'Prepare an invoice summary',
      goal: 'Choose a format that matches each field.',
      steps: [
        'Create `Invoice Date`, `Due Date`, `Subtotal`, `Tax` and `Total`.',
        'In `B2`, type `=A2+30` to set a due date 30 days later.',
        'Format both dates the same way and money columns as **Accounting**.',
        'Save as `Invoice Summary.xlsx`.',
      ],
      hint: 'A real date plus a number of days gives a new date. Text dates cannot do this.',
      expected: [
        'Due dates are 30 days after invoice dates.',
        'Money columns line up on the decimal point.',
      ],
    },
    knowledgeCheck: 'e2-2-kc',
    quickQuiz: ['e2-2-qq1', 'e2-2-qq2'],
    summary: [
      'A format changes the display. The value stays the same.',
      '`15%` is stored as `0.15`. `#####` means the column is too narrow.',
    ],
    nextTeaser: 'Next, you will sort and filter a list.',
  },
  {
    id: 'e2-3',
    pathId: 'excel',
    unitId: 'e2',
    title: 'Sorting and Filtering',
    subtitle: 'Find the records you need',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Sort a list by one column',
      'Sort by two columns',
      'Filter to one department',
      'Clear a filter and restore every row',
    ],
    why: 'A list of 200 staff is hard to read. Sorting groups records, and filtering hides the rows you do not need.',
    explain: [
      'Sorting changes the order of rows. Click a cell inside the data, then use **Data** > **Sort A to Z**.',
      'Filtering hides rows that do not match. Press `Ctrl + Shift + L`, then click an arrow in the header row.',
      'Filtering never deletes data, and clearing the filter brings every row back.',
    ],
    terms: [
      { term: 'Sort', definition: 'Put rows in a new order, such as A to Z.' },
      { term: 'Filter', definition: 'Hide rows that do not match your choice.' },
      { term: 'AutoFilter', definition: 'The filter arrows in a header row.' },
    ],
    tutorials: [
      {
        title: 'Sort by department and name',
        steps: [
          {
            instruction: 'Click any cell inside the list.',
            detail: 'Do not select one column. Excel must move whole rows.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'A2',
              },
              caption: 'The active cell sits inside the list.',
            },
          },
          {
            instruction: 'On the **Data** tab, click **Sort**.',
            detail: 'The **Sort** dialog opens.',
            ui: {
              tab: 'data',
              target: 'sort',
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'A2',
              },
              caption: 'Sort opens the full sort dialog with levels.',
            },
          },
          {
            instruction: 'Set **Sort by** to `Department` and **Order** to `A to Z`.',
            detail: 'This groups the departments.',
          },
          {
            instruction: 'Click **Add Level**, set **Then by** to `Name` and **Order** to `A to Z`.',
            detail: 'Names sort inside each department.',
          },
          {
            instruction: 'Click **OK**.',
            detail: 'Each row moves as one record.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'A2',
              },
              caption: 'Departments are grouped, and names run A to Z inside each group.',
            },
          },
        ],
        result: 'The list is grouped by department, with names in order.',
      },
      {
        title: 'Filter to one department',
        steps: [
          {
            instruction: 'Click a header cell, then on the **Data** tab click **Filter**.',
            detail: 'Arrows appear in the header row.',
            shortcut: 'Ctrl + Shift + L',
            ui: {
              tab: 'data',
              target: 'filter',
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'A1',
              },
              caption: 'Filter arrows appear on every header cell.',
            },
          },
          {
            instruction: 'Click the **Department** arrow.',
            detail: 'A list of departments opens.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'C1',
              },
              caption: 'The Department filter is open.',
            },
          },
          {
            instruction: 'Untick **Select All**, tick `Finance`, then click **OK**.',
            detail: 'Only Finance rows stay visible.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                ],
                selected: 'A2',
              },
              caption: 'The other departments are hidden, not deleted.',
            },
          },
          {
            instruction: 'Look at the row numbers.',
            detail: 'Blue numbers show that a filter is on.',
          },
          {
            instruction: 'Click the **Department** arrow, then click **Clear Filter From "Department"**.',
            detail: 'Every row returns.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'C1',
              },
              caption: 'All five records are visible again.',
            },
          },
          {
            instruction: 'On the **Data** tab, click **Filter** again.',
            detail: 'The arrows are removed. No data is lost.',
            ui: {
              tab: 'data',
              target: 'filter',
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Employee ID', 'Name', 'Department', 'Start Date'],
                  ['E-003', 'Tom Becker', 'Admin', '2026-03-01'],
                  ['E-001', 'Amina Yusuf', 'Finance', '2026-01-12'],
                  ['E-004', 'Sara Ali', 'Finance', '2025-11-03'],
                  ['E-002', 'Daniel Kim', 'Operations', '2026-02-20'],
                  ['E-005', 'Lena Ortiz', 'Operations', '2025-09-15'],
                ],
                selected: 'A1',
              },
              caption: 'The filter arrows are gone and the list is complete.',
            },
          },
        ],
        result: 'You can show one department and bring the full list back.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'Sorting vs. filtering',
      caption: 'Both help you find records, but they behave differently.',
      headers: ['Action', 'What it does', 'What changes'],
      rows: [
        ['Sort A to Z', 'Reorders all rows', 'Row order'],
        ['Filter Department = Finance', 'Hides other rows', 'Visible rows'],
        ['Multi-level sort', 'Sorts by Department, then Name', 'Row order'],
        ['Clear filter', 'Shows every row again', 'Visibility'],
      ],
    },
    example: {
      title: 'The list that lost its names',
      scenario:
        'An assistant selects only the **Name** column and clicks **Sort A to Z**. The names move, but the departments stay behind. The list is now wrong. Undo restores it, and sorting from inside the list prevents the mistake.',
      takeaway: 'Sort whole rows, never one column.',
    },
    guided: {
      title: 'Organize a contact list',
      goal: 'Sort by two levels and filter by department.',
      steps: [
        'Create a list with five columns and ten records.',
        'Sort by `Department`, then by `Name`.',
        'Filter to show only `Operations`.',
        'Clear the filter, then save as `Sorted Contacts.xlsx`.',
      ],
      hint: 'A funnel icon on a header means a filter is active. Clear it before you sort the whole list.',
      expected: [
        'Rows stay together after sorting.',
        'Only Operations rows show while the filter is on.',
        'Clearing the filter restores all ten rows.',
      ],
    },
    independent: {
      title: 'Review an attendance list',
      goal: 'Use filters to answer a real question.',
      steps: [
        'Create `Name`, `Department`, `Status` and `Date` columns with 15 records.',
        'Filter to show only `Absent` records. Count them.',
        'Filter `Late` records in one department.',
        'Clear every filter, then save as `Attendance Review.xlsx`.',
      ],
      hint: 'Filters combine. Set one column, then set another to narrow the list further.',
      expected: [
        'You can state the number of absent records.',
        'The full list returns after you clear the filters.',
      ],
    },
    knowledgeCheck: 'e2-3-kc',
    quickQuiz: ['e2-3-qq1', 'e2-3-qq2'],
    summary: [
      'Sorting reorders whole rows. Filtering hides rows without deleting them.',
      '`Ctrl + Shift + L` turns the filter arrows on and off.',
    ],
    nextTeaser: 'Next, you will turn a list into an Excel Table.',
  },
  {
    id: 'e2-4',
    pathId: 'excel',
    unitId: 'e2',
    title: 'Excel Tables',
    subtitle: 'A list that grows with its formulas',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Create a table with `Ctrl + T`',
      'Name a table and add a **Total Row**',
      'Read a structured reference',
      'Explain how a table grows',
    ],
    why: 'A table keeps its style, filters and totals when you add rows. A plain range can leave new rows outside your formula.',
    explain: [
      'An Excel Table is a data object, not just colour. It adds filters, a style and a name.',
      'Type in the row below a table, and the table grows with the format and formulas.',
      'A structured reference uses the table and column name, such as `=SUM(Expenses[Amount])`, and grows with the table.',
    ],
    terms: [
      { term: 'Excel Table', definition: 'A named data object with filters, style and automatic growth.' },
      { term: 'Structured reference', definition: 'A formula that uses table and column names.' },
      { term: 'Total Row', definition: 'A summary row at the bottom of a table.' },
    ],
    tutorials: [
      {
        title: 'Turn a range into a table',
        steps: [
          {
            instruction: 'Click any cell inside the data.',
            ui: {
              tab: 'home',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                ],
                selected: 'A2',
              },
              caption: 'The list has one header row and two expenses.',
            },
          },
          {
            instruction: 'Press `Ctrl + T`.',
            detail: 'The **Create Table** dialog opens.',
            shortcut: 'Ctrl + T',
            ui: {
              tab: 'insert',
              target: 'table',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                ],
                selected: 'A2',
              },
              caption: 'Insert > Table does the same job.',
            },
          },
          {
            instruction: 'Check that **My table has headers** is ticked, then click **OK**.',
            detail: 'The range gets a style and filter arrows.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                ],
                selected: 'A2',
              },
              caption: 'The table style and filter arrows appear.',
            },
          },
          {
            instruction: 'On the **Table Design** tab, type `Expenses` in **Table Name**, then press `Enter`.',
            detail: 'The table has a clear name.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                ],
                selected: 'A2',
              },
              caption: 'Table Design is a contextual tab. It appears only when the table is active.',
            },
          },
          {
            instruction: 'Type a new expense below the table, then press `Enter`.',
            detail: 'The table grows to include the new row.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                  ['2026-06-05', 'Travel', 'Train ticket', '89.99'],
                ],
                selected: 'A4',
              },
              caption: 'The new row joins the table and keeps its style.',
            },
          },
          {
            instruction: 'On the **Table Design** tab, tick **Total Row**.',
            detail: 'A summary row appears at the bottom.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                  ['2026-06-05', 'Travel', 'Train ticket', '89.99'],
                  ['', 'Total', '', '255.49'],
                ],
                selected: 'D5',
              },
              caption: 'The total row sits inside the table.',
            },
          },
          {
            instruction: 'Click the **Amount** total cell and look at the **Formula Bar**.',
            detail: 'It shows `=SUBTOTAL(109,[Amount])`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Category', 'Description', 'Amount'],
                  ['2026-06-01', 'Office', 'Printer paper', '120.50'],
                  ['2026-06-03', 'Office', 'Toner', '45.00'],
                  ['2026-06-05', 'Travel', 'Train ticket', '89.99'],
                  ['', 'Total', '', '255.49'],
                ],
                selected: 'D5',
              },
              caption: 'The Formula Bar shows the structured reference.',
            },
          },
        ],
        result: 'A named **Expenses** table with filters and a total that grows.',
      },
      {
        title: 'Use a structured reference',
        steps: [
          {
            instruction: 'Click an empty cell one row below the table.',
            detail: 'The formula will sit outside the table.',
          },
          {
            instruction: 'Type `=SUM(Expenses[Amount])` and press `Enter`.',
            detail: 'The cell shows `255.49`, the same total as the table.',
          },
          {
            instruction: 'Change the Toner amount to `50.00`.',
            detail: 'Both totals show `260.49`.',
          },
          {
            instruction: 'Press `Ctrl + Z` to restore `45.00`.',
            detail: 'Both totals return to `255.49`.',
            shortcut: 'Ctrl + Z',
          },
        ],
        result: 'Structured references use table and column names, so they stay correct.',
      },
    ],
    visual: {
      kind: 'compare',
      title: 'Plain range vs. Excel Table',
      caption: 'Tables are the better default for lists that grow.',
      left: {
        label: 'Plain range',
        points: [
          'No filter arrows unless you add them',
          'Formatting does not grow',
          'A fixed SUM can miss new rows',
        ],
      },
      right: {
        label: 'Excel Table',
        points: [
          'Filters and a style are automatic',
          'Grows when you type below it',
          'Structured references stay readable',
          'The total row respects filters',
        ],
      },
    },
    example: {
      title: 'The expense total that kept missing rows',
      scenario:
        'A monthly expense sheet uses `=SUM(D2:D30)`. In December, expenses reach row 34, so the total misses four rows. A table with `=SUM(Expenses[Amount])` fixes this for good.',
      takeaway: 'For a list that grows, use a table and a structured reference.',
    },
    guided: {
      title: 'Create a leave tracker table',
      goal: 'Use a table for a growing list.',
      steps: [
        'Create columns `Employee`, `Leave Type`, `Start`, `End`, `Days` and `Status` with five rows.',
        'Press `Ctrl + T` and name the table `LeaveLog`.',
        'Add a **Total Row** and sum the `Days` column.',
        'Add two leave records above the total row. Save as `Leave Tracker Table.xlsx`.',
      ],
      hint: 'If the **Table Name** box is grey, click inside the table first. The **Table Design** tab appears only then.',
      expected: [
        'The table has filters, banded rows and a working total.',
        'New rows join the table.',
        'The total includes the new rows.',
      ],
    },
    independent: {
      title: 'Build an inventory table',
      goal: 'Apply table features to stock data.',
      steps: [
        'Create columns `Item Code`, `Description`, `Quantity`, `Reorder Level` and `Unit Cost` for eight items.',
        'Convert the range to a table named `Inventory`.',
        'Add a **Total Row** that sums `Quantity`.',
        'Filter the table to items with `Quantity` below 10, then save as `Inventory Table.xlsx`.',
      ],
      hint: 'Structured references use the table name and the column header exactly as written.',
      expected: [
        'The total row sums the `Quantity` column.',
        'Filters work in every column.',
      ],
    },
    knowledgeCheck: 'e2-4-kc',
    quickQuiz: ['e2-4-qq1', 'e2-4-qq2'],
    summary: [
      '`Ctrl + T` turns a range into a table with filters and a style.',
      'A table grows with new rows, and structured references grow with it.',
    ],
    nextTeaser: 'Next, you will write your first formulas.',
  },
]
