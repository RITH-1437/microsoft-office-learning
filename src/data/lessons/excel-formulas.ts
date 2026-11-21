import type { Lesson } from '../../types'

export const excelFormulas: Lesson[] = [
  {
    id: 'e3-1',
    pathId: 'excel',
    unitId: 'e3',
    title: 'Basic Formulas',
    subtitle: 'Write your first formula with cell references',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Start a formula with `=`',
      'Use cell references such as `B2`',
      'Copy a formula with the fill handle',
      'Read the Formula Bar and a common error',
    ],
    why: 'A total built from cells updates itself when a number changes. You save time and avoid mistakes.',
    explain: [
      'A formula is a calculation in a cell. Every formula starts with `=`.',
      'A cell reference is a cell address, such as `B2`. `=B2*C2` multiplies the two values. Change a value and the result updates.',
      'The cell shows the result. The Formula Bar shows the formula. An error such as `#DIV/0!` means Excel cannot calculate.',
    ],
    terms: [
      { term: 'Formula', definition: 'A calculation in a cell. It starts with =.' },
      { term: 'Cell reference', definition: 'A cell address used in a formula, such as B2.' },
      { term: 'Fill handle', definition: 'The small square that copies a formula down or across.' },
      { term: 'Formula Bar', definition: 'The bar above the sheet. It shows the formula.' },
    ],
    tutorials: [
      {
        title: 'Calculate quantity times price',
        steps: [
          {
            instruction: 'Type `Item`, `Qty`, `Price`, and `Total` in row 1.',
            detail: 'Use `A1` to `D1`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Supplies - Excel',
                cells: [['Item', 'Qty', 'Price', 'Total']],
                selected: 'A1',
              },
              caption: 'Row 1 holds the column headers.',
            },
          },
          {
            instruction: 'Type `Paper`, `10`, and `6.50` in row 2.',
            detail: 'The price goes in `C2`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Supplies - Excel',
                cells: [
                  ['Item', 'Qty', 'Price', 'Total'],
                  ['Paper', '10', '6.50', ''],
                ],
                selected: 'C2',
              },
            },
          },
          {
            instruction: 'Click `D2`. Type `=B2*C2` and press Enter.',
            detail: '`D2` shows `65`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Supplies - Excel',
                cells: [
                  ['Item', 'Qty', 'Price', 'Total'],
                  ['Paper', '10', '6.50', '65'],
                ],
                selected: 'D2',
                formula: '=B2*C2',
              },
              caption: 'The Formula Bar shows the formula; the cell shows the result.',
            },
          },
          {
            instruction: 'Click `D2` and look at the Formula Bar.',
            detail: 'It shows `=B2*C2`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Supplies - Excel',
                cells: [
                  ['Item', 'Qty', 'Price', 'Total'],
                  ['Paper', '10', '6.50', '65'],
                ],
                selected: 'D2',
                formula: '=B2*C2',
              },
            },
          },
          {
            instruction: 'Drag the fill handle from `D2` down to `D4`.',
            detail: 'Rows 3 and 4 calculate too.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Supplies - Excel',
                cells: [
                  ['Item', 'Qty', 'Price', 'Total'],
                  ['Paper', '10', '6.50', '65'],
                  ['Pens', '5', '2.00', '10'],
                  ['Folders', '20', '1.25', '25'],
                ],
                selected: 'D4',
                formula: '=B4*C4',
              },
              caption: 'Each row has its own formula: =B3*C3, then =B4*C4.',
            },
          },
          {
            instruction: 'Change `B2` to `20` and press Enter.',
            detail: '`D2` changes to `130`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Supplies - Excel',
                cells: [
                  ['Item', 'Qty', 'Price', 'Total'],
                  ['Paper', '20', '6.50', '130'],
                  ['Pens', '5', '2.00', '10'],
                  ['Folders', '20', '1.25', '25'],
                ],
                selected: 'B2',
              },
              caption: 'One change updates the total at once.',
            },
          },
        ],
        result: 'A total column that updates when a quantity changes.',
      },
      {
        title: 'See an error and show formulas',
        steps: [
          {
            instruction: 'Click `E4`. Type `=E2/E3` and press Enter.',
            detail: '`E3` is empty, so Excel shows `#DIV/0!`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Error check - Excel',
                cells: [
                  ['', '', '', '', 'Check'],
                  ['', '', '', '', '100'],
                  ['', '', '', '', ''],
                  ['', '', '', '', '#DIV/0!'],
                ],
                selected: 'E4',
                formula: '=E2/E3',
              },
              caption: '#DIV/0! means division by zero or by an empty cell.',
            },
          },
          {
            instruction: 'Click `E4` and read the Formula Bar.',
            detail: 'The formula is correct. The empty cell is the problem.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Error check - Excel',
                cells: [
                  ['', '', '', '', 'Check'],
                  ['', '', '', '', '100'],
                  ['', '', '', '', ''],
                  ['', '', '', '', '#DIV/0!'],
                ],
                selected: 'E4',
                formula: '=E2/E3',
              },
            },
          },
          {
            instruction: 'Type `50` in `E3` and press Enter.',
            detail: '`E4` changes to `2`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Error check - Excel',
                cells: [
                  ['', '', '', '', 'Check'],
                  ['', '', '', '', '100'],
                  ['', '', '', '', '50'],
                  ['', '', '', '', '2'],
                ],
                selected: 'E3',
              },
            },
          },
          {
            instruction: 'On the **Formulas** tab, click **Show Formulas**.',
            shortcut: 'Ctrl + `',
            detail: 'Every formula appears as text.',
            ui: {
              tab: 'formulas',
              target: 'show-formulas',
              workspace: {
                kind: 'sheet',
                title: 'Error check - Excel',
                cells: [
                  ['', '', '', '', 'Check'],
                  ['', '', '', '', '100'],
                  ['', '', '', '', '50'],
                  ['', '', '', '', '2'],
                ],
                selected: 'E4',
                formula: '=E2/E3',
              },
              caption: 'Show Formulas displays the formula in each cell.',
            },
          },
          {
            instruction: 'Click **Show Formulas** again.',
            detail: 'The cells show results again.',
            ui: { tab: 'formulas', target: 'show-formulas' },
          },
        ],
        result: 'You can read a common error and switch between formulas and results.',
      },
    ],
    visual: {
      kind: 'formula',
      title: 'A formula uses cell addresses',
      formula: '=B2*C2',
      result: '10 × 6.50 = 65',
      note: 'Change B2 to 20 and the result becomes 130. The formula still says =B2*C2.',
      caption: 'The cell shows 65. The Formula Bar shows =B2*C2.',
    },
    example: {
      title: 'The supply order that fixed itself',
      scenario:
        'An admin assistant lists supplies with quantity and price. Each line total uses `=B2*C2`. When an order changes from 10 to 20, every total updates at once.',
      takeaway: 'Build totals from cell references, not typed numbers.',
    },
    guided: {
      title: 'Build a line-total column',
      goal: 'Write and fill your first formula.',
      steps: [
        'Type the headers `Item`, `Qty`, `Price`, and `Total` in row 1.',
        'Add three items with a quantity and a price.',
        'In `D2`, type `=B2*C2` and press Enter.',
        'Drag the fill handle from `D2` down to `D4`.',
        'Change one quantity. Check that its total updates.',
      ],
      hint: 'If the fill handle is hard to grab, double-click it. Excel fills down while the next column has data.',
      expected: [
        'Every line total is correct.',
        'The Formula Bar shows a formula in each total cell.',
        'Changing a quantity changes its total.',
      ],
    },
    independent: {
      title: 'Make a small invoice',
      goal: 'Use formulas for every total.',
      steps: [
        'Make an invoice with `Item`, `Qty`, `Price`, and `Total`.',
        'Add four items. Use a formula for every line total.',
        'Add a grand total with `=D2+D3+D4+D5`.',
        'Change one price and check the grand total.',
      ],
      hint: 'Do not type results. Every total must be a formula.',
      expected: [
        'All five totals are formulas.',
        'The grand total matches the line totals.',
        'A price change updates the grand total.',
      ],
    },
    knowledgeCheck: 'e3-1-kc',
    quickQuiz: ['e3-1-qq1', 'e3-1-qq2'],
    summary: [
      'Start with `=` and use cell references. The cell shows the result; the Formula Bar shows the formula.',
      'Drag the fill handle to copy a formula. Read an error before you edit the formula.',
    ],
    nextTeaser: 'Next, you will use operators and brackets to control a calculation.',
  },
  {
    id: 'e3-2',
    pathId: 'excel',
    unitId: 'e3',
    title: 'Mathematical Operators and Order of Operations',
    subtitle: 'Use + - * / and brackets to get the right answer',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Use `+`, `-`, `*`, `/`, `^`, and `%`',
      'Apply the order of operations',
      'Use brackets to change a result',
      'Calculate a discount and a percentage change',
    ],
    why: 'A missing bracket can change a total by hundreds. The correct order gives you the right discount, tax, and price.',
    explain: [
      'Excel uses `+` to add, `-` to subtract, `*` to multiply, and `/` to divide. It uses `^` for a power and `%` for percent.',
      'Excel multiplies and divides before it adds and subtracts. So `=2+3*4` gives 14.',
      'Brackets change the order. `=(2+3)*4` gives 20. Add brackets when you want to be sure.',
    ],
    terms: [
      { term: 'Operator', definition: 'A symbol that calculates, such as + or *.' },
      { term: 'Order of operations', definition: 'The rules for which calculation happens first.' },
      { term: 'Brackets', definition: 'Grouping symbols that make part of a formula calculate first.' },
      { term: 'Percentage change', definition: 'The change divided by the old value, shown as a percent.' },
    ],
    tutorials: [
      {
        title: 'Calculate a discount and a tax',
        steps: [
          {
            instruction: 'Type `Price`, `Discount`, and `Final Price` in row 1.',
            detail: 'Use `A1` to `C1`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Pricing - Excel',
                cells: [['Price', 'Discount', 'Final Price']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type `100` in `A2` and `15%` in `B2`.',
            detail: 'Excel stores 15% as 0.15.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Pricing - Excel',
                cells: [
                  ['Price', 'Discount', 'Final Price'],
                  ['100', '15%', ''],
                ],
                selected: 'B2',
              },
            },
          },
          {
            instruction: 'Click `C2`. Type `=A2*(1-B2)` and press Enter.',
            detail: '`C2` shows `85`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Pricing - Excel',
                cells: [
                  ['Price', 'Discount', 'Final Price'],
                  ['100', '15%', '85'],
                ],
                selected: 'C2',
                formula: '=A2*(1-B2)',
              },
              caption: 'The brackets make Excel subtract the discount before it multiplies.',
            },
          },
          {
            instruction: 'Type `Tax` in `D1` and `8%` in `D2`.',
            detail: 'This is the tax rate.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Pricing - Excel',
                cells: [
                  ['Price', 'Discount', 'Final Price', 'Tax'],
                  ['100', '15%', '85', '8%'],
                ],
                selected: 'D2',
              },
            },
          },
          {
            instruction: 'Type `With Tax` in `E1`. In `E2`, type `=C2*(1+D2)`.',
            detail: '`E2` shows `91.8`: the price plus 8% tax.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Pricing - Excel',
                cells: [
                  ['Price', 'Discount', 'Final Price', 'Tax', 'With Tax'],
                  ['100', '15%', '85', '8%', '91.8'],
                ],
                selected: 'E2',
                formula: '=C2*(1+D2)',
              },
            },
          },
          {
            instruction: 'In `C3`, type `=A2*1-B2`.',
            detail: 'The result is `99.85`, not `85`. Without brackets, Excel multiplies first.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Pricing - Excel',
                cells: [
                  ['Price', 'Discount', 'Final Price', 'Tax', 'With Tax'],
                  ['100', '15%', '85', '8%', '91.8'],
                  ['', '', '99.85', '', ''],
                ],
                selected: 'C3',
                formula: '=A2*1-B2',
              },
              caption: 'Compare 85 with 99.85. The brackets change the meaning.',
            },
          },
        ],
        result: 'A correct discount and tax, and a clear view of why brackets matter.',
      },
      {
        title: 'Calculate percentage change',
        steps: [
          {
            instruction: 'Type `Last Month`, `This Month`, and `Change %` in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Monthly change - Excel',
                cells: [['Last Month', 'This Month', 'Change %']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type `1200` in `A2` and `1500` in `B2`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Monthly change - Excel',
                cells: [
                  ['Last Month', 'This Month', 'Change %'],
                  ['1200', '1500', ''],
                ],
                selected: 'B2',
              },
            },
          },
          {
            instruction: 'Click `C2`. Type `=(B2-A2)/A2` and press Enter.',
            detail: '`C2` shows `0.25`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Monthly change - Excel',
                cells: [
                  ['Last Month', 'This Month', 'Change %'],
                  ['1200', '1500', '0.25'],
                ],
                selected: 'C2',
                formula: '=(B2-A2)/A2',
              },
            },
          },
          {
            instruction: 'On the **Home** tab, click **Percent Style**.',
            shortcut: 'Ctrl + Shift + %',
            detail: '`C2` shows `25%`.',
            ui: {
              tab: 'home',
              target: 'percent',
              workspace: {
                kind: 'sheet',
                title: 'Monthly change - Excel',
                cells: [
                  ['Last Month', 'This Month', 'Change %'],
                  ['1200', '1500', '25%'],
                ],
                selected: 'C2',
                formula: '=(B2-A2)/A2',
              },
              caption: 'Percent Style changes how the number looks, not its value.',
            },
          },
          {
            instruction: 'Change `A2` to `2000`.',
            detail: '`C2` shows `-25%`: a decrease.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Monthly change - Excel',
                cells: [
                  ['Last Month', 'This Month', 'Change %'],
                  ['2000', '1500', '-25%'],
                ],
                selected: 'A2',
              },
            },
          },
        ],
        result: 'A percentage change that shows an increase or a decrease.',
      },
    ],
    visual: {
      kind: 'formula',
      title: 'Order of operations',
      formula: '=2+3*4',
      result: '14',
      note: 'Multiplication happens first: 3 × 4 = 12, then 2 + 12 = 14. Use =(2+3)*4 to get 20.',
      caption: 'When in doubt, add brackets. They make your intention visible.',
    },
    example: {
      title: 'The discount that was wrong',
      scenario:
        'A sales sheet has a 20% discount in `B2`. A formula `=A2*B2` returns 20, not 80, for a price of 100. The correct formula is `=A2*(1-B2)`, which returns 80.',
      takeaway: 'A discount is what is left after you subtract the rate.',
    },
    guided: {
      title: 'Build a price calculator',
      goal: 'Use brackets for a discount and tax.',
      steps: [
        'Type `Price`, `Discount`, `Final Price`, `Tax`, and `With Tax` in row 1.',
        'Add three products with prices and discount rates.',
        'In `C2`, type `=A2*(1-B2)` and fill down.',
        'In `E2`, type `=C2*(1+D2)` and fill down.',
        'Check one row by hand.',
      ],
      hint: 'Use `=Price*(1-Discount)` for a discount and `=Price*(1+Tax)` to add tax.',
      expected: [
        'Every final price is lower than its list price.',
        'Every with-tax price is higher than its final price.',
        'Your hand check matches the formula.',
      ],
    },
    independent: {
      title: 'Compare two months of expenses',
      goal: 'Use operators and percentage change on your own.',
      steps: [
        'Type `Category`, `Last Month`, `This Month`, `Change`, and `Change %` in row 1.',
        'Add four categories with amounts.',
        'In `D2`, type `=C2-B2` and fill down.',
        'In `E2`, type `=(C2-B2)/B2`, fill down, and format as Percent Style.',
      ],
      hint: 'If `Change %` shows an error, the Last Month value may be zero.',
      expected: [
        'Each change is positive or negative correctly.',
        'Each percentage change is formatted as a percent.',
        'The formulas work for all four rows.',
      ],
    },
    knowledgeCheck: 'e3-2-kc',
    quickQuiz: ['e3-2-qq1', 'e3-2-qq2'],
    summary: [
      'Excel uses `+ - * / ^` and `%`. Multiplication and division happen before addition and subtraction.',
      'Brackets control the order. Discount: `=A2*(1-B2)`. Percentage change: `=(B2-A2)/A2`.',
    ],
    nextTeaser: 'Next, you will total and average a whole column with SUM and AVERAGE.',
  },
  {
    id: 'e3-3',
    pathId: 'excel',
    unitId: 'e3',
    title: 'SUM, AVERAGE, MIN and MAX',
    subtitle: 'Summarize a column in seconds with AutoSum',
    duration: 25,
    difficulty: 'Beginner',
    objectives: [
      'Total a range with `SUM`',
      'Find the average, smallest, and largest value',
      'Use AutoSum and check its range',
      'Add two ranges in one formula',
    ],
    why: 'Totals and averages answer most office questions. They update when the numbers change, so your report stays current.',
    explain: [
      'A function is a ready-made formula with a name. `SUM` adds a range: `=SUM(B2:B6)`.',
      '`AVERAGE` gives the mean. `MIN` gives the smallest value. `MAX` gives the largest.',
      'AutoSum writes a SUM formula for you. Press `Alt + =` and check the range. These functions ignore text and empty cells; AVERAGE includes zeros.',
    ],
    terms: [
      { term: 'Function', definition: 'A built-in formula with a name, such as SUM.' },
      { term: 'Range', definition: 'Two or more cells selected together, such as B2:B6.' },
      { term: 'Argument', definition: 'The input inside a function, such as a range.' },
      { term: 'AutoSum', definition: 'A button that writes a SUM formula for you.' },
    ],
    tutorials: [
      {
        title: 'Summarize four expenses',
        steps: [
          {
            instruction: 'Type `Expense` in `A1` and `Amount` in `B1`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [['Expense', 'Amount']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type four expenses in `A2:B5`.',
            detail: 'Use 120, 80, 200, and 50.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Expense', 'Amount'],
                  ['Rent', '120'],
                  ['Power', '80'],
                  ['Paper', '200'],
                  ['Water', '50'],
                ],
                selected: 'B5',
              },
            },
          },
          {
            instruction: 'Click `B6` and press `Alt + =`.',
            shortcut: 'Alt + =',
            detail: 'AutoSum writes `=SUM(B2:B5)`. Check the range.',
            ui: {
              tab: 'home',
              target: 'autosum',
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Expense', 'Amount'],
                  ['Rent', '120'],
                  ['Power', '80'],
                  ['Paper', '200'],
                  ['Water', '50'],
                  ['', ''],
                ],
                selected: 'B6',
                formula: '=SUM(B2:B5)',
              },
              caption: 'AutoSum guesses the range above. Always check it before Enter.',
            },
          },
          {
            instruction: 'Press Enter.',
            detail: '`B6` shows `450`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Expense', 'Amount'],
                  ['Rent', '120'],
                  ['Power', '80'],
                  ['Paper', '200'],
                  ['Water', '50'],
                  ['', '450'],
                ],
                selected: 'B6',
                formula: '=SUM(B2:B5)',
              },
            },
          },
          {
            instruction: 'Click `E2`. Type `=AVERAGE(B2:B5)`.',
            detail: '`E2` shows `112.5`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Expense', 'Amount'],
                  ['Rent', '120'],
                  ['Power', '80'],
                  ['Paper', '200'],
                  ['Water', '50'],
                  ['', '450'],
                ],
                selected: 'E2',
                formula: '=AVERAGE(B2:B5)',
              },
            },
          },
          {
            instruction: 'Click `E3`. Type `=MIN(B2:B5)`.',
            detail: '`E3` shows `50`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Expense', 'Amount'],
                  ['Rent', '120'],
                  ['Power', '80'],
                  ['Paper', '200'],
                  ['Water', '50'],
                  ['', '450'],
                ],
                selected: 'E3',
                formula: '=MIN(B2:B5)',
              },
            },
          },
          {
            instruction: 'Click `E4`. Type `=MAX(B2:B5)`.',
            detail: '`E4` shows `200`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Expense', 'Amount'],
                  ['Rent', '120'],
                  ['Power', '80'],
                  ['Paper', '200'],
                  ['Water', '50'],
                  ['', '450'],
                ],
                selected: 'E4',
                formula: '=MAX(B2:B5)',
              },
            },
          },
        ],
        result: 'A summary of total, average, smallest, and largest expense.',
      },
      {
        title: 'Add two ranges',
        steps: [
          {
            instruction: 'Type `Team A`, `Amount`, `Team B`, and `Amount` in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Two teams - Excel',
                cells: [['Team A', 'Amount', 'Team B', 'Amount']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type `10`, `20`, and `30` in `B2:B4`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Two teams - Excel',
                cells: [
                  ['Team A', 'Amount', 'Team B', 'Amount'],
                  ['Mon', '10', '', ''],
                  ['Tue', '20', '', ''],
                  ['Wed', '30', '', ''],
                ],
                selected: 'B4',
              },
            },
          },
          {
            instruction: 'Type `5`, `15`, and `25` in `D2:D4`.',
            detail: 'Leave column C empty.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Two teams - Excel',
                cells: [
                  ['Team A', 'Amount', 'Team B', 'Amount'],
                  ['Mon', '10', 'Mon', '5'],
                  ['Tue', '20', 'Tue', '15'],
                  ['Wed', '30', 'Wed', '25'],
                ],
                selected: 'D4',
              },
            },
          },
          {
            instruction: 'Click `B5` and press `Alt + =`.',
            shortcut: 'Alt + =',
            detail: 'AutoSum may include only `B2:B4`.',
            ui: {
              tab: 'home',
              target: 'autosum',
              workspace: {
                kind: 'sheet',
                title: 'Two teams - Excel',
                cells: [
                  ['Team A', 'Amount', 'Team B', 'Amount'],
                  ['Mon', '10', 'Mon', '5'],
                  ['Tue', '20', 'Tue', '15'],
                  ['Wed', '30', 'Wed', '25'],
                  ['', ''],
                ],
                selected: 'B5',
                formula: '=SUM(B2:B4)',
              },
              caption: 'AutoSum guesses one block. You will add the second range.',
            },
          },
          {
            instruction: 'Change the formula to `=SUM(B2:B4,D2:D4)` and press Enter.',
            detail: '`B5` shows `105`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Two teams - Excel',
                cells: [
                  ['Team A', 'Amount', 'Team B', 'Amount'],
                  ['Mon', '10', 'Mon', '5'],
                  ['Tue', '20', 'Tue', '15'],
                  ['Wed', '30', 'Wed', '25'],
                  ['', '105'],
                ],
                selected: 'B5',
                formula: '=SUM(B2:B4,D2:D4)',
              },
              caption: 'The comma adds the second range.',
            },
          },
          {
            instruction: 'Change `D4` to `30` and press Enter.',
            detail: '`B5` changes to `110`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Two teams - Excel',
                cells: [
                  ['Team A', 'Amount', 'Team B', 'Amount'],
                  ['Mon', '10', 'Mon', '5'],
                  ['Tue', '20', 'Tue', '15'],
                  ['Wed', '30', 'Wed', '30'],
                  ['', '110'],
                ],
                selected: 'D4',
              },
            },
          },
        ],
        result: 'You can add separate ranges and you check AutoSum before you accept it.',
      },
    ],
    visual: {
      kind: 'formula',
      title: 'One range, four questions',
      formula: '=SUM(B2:B5)',
      result: '450',
      note: 'The values are 120, 80, 200, and 50. AVERAGE(B2:B5) = 112.5, MIN = 50, and MAX = 200.',
      caption: 'Every function uses the same range and ignores empty cells.',
    },
    example: {
      title: 'The average that was too low',
      scenario:
        'A training register leaves scores blank for staff who did not attend. Someone enters 0 for those staff, and the average drops. If the cells stay blank, AVERAGE ignores them and the result is fair.',
      takeaway: 'Blank and zero mean different things. Choose deliberately for averages.',
    },
    guided: {
      title: 'Summarize attendance days',
      goal: 'Use all four functions on one column.',
      steps: [
        'Type `Staff` and `Days Present` in row 1.',
        'Add four staff with days present in `B2:B5`.',
        'In `B6`, use AutoSum (`Alt + =`) and check the range.',
        'In `D2`, `D3`, and `D4`, write AVERAGE, MIN, and MAX for `B2:B5`.',
        'Format the average with one decimal place.',
      ],
      hint: 'Do not use SUM on percentages unless you want the total. An average is usually the useful summary.',
      expected: [
        'The total equals the four days added by hand.',
        'The average is between the smallest and largest value.',
        'The average shows one decimal place.',
      ],
    },
    independent: {
      title: 'Summarize a year of expenses',
      goal: 'Choose the right function for each question.',
      steps: [
        'Type `Month` and `Amount` in row 1.',
        'Add 12 monthly amounts in `B2:B13`.',
        'Find the total, the monthly average, the highest month, and the lowest month.',
        'Add `=SUM(B2:B13)*1.05` in `D2` for a 5% contingency.',
      ],
      hint: 'Use `=SUM(B2:B13)*1.05`. The brackets keep the intent clear.',
      expected: [
        'The total equals all 12 amounts added.',
        'The average equals the total divided by 12.',
        'The contingency is 5% higher than the total.',
      ],
    },
    knowledgeCheck: 'e3-3-kc',
    quickQuiz: ['e3-3-qq1', 'e3-3-qq2'],
    summary: [
      '`SUM`, `AVERAGE`, `MIN`, and `MAX` summarize a range. They ignore text and empty cells, but AVERAGE includes zeros.',
      'AutoSum (`Alt + =`) guesses the range. Check it before you press Enter.',
    ],
    nextTeaser: 'Next, you will count records and find gaps with COUNT and COUNTA.',
  },
  {
    id: 'e3-4',
    pathId: 'excel',
    unitId: 'e3',
    title: 'COUNT and COUNTA',
    subtitle: 'Count records and find missing data',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Count numeric cells with `COUNT`',
      'Count all non-empty cells with `COUNTA`',
      'Find empty cells with `COUNTBLANK`',
      'Audit a list for missing data',
    ],
    why: 'A total is not useful if half the rows are missing. Counting shows you where the gaps are before you send a report.',
    explain: [
      '`COUNT` counts cells that contain numbers. `COUNTA` counts every non-empty cell, including text.',
      '`COUNTBLANK` counts empty cells. Use it to find missing phone numbers or dates.',
      'Counting shows how complete your list is. A full list of names can still have missing data in other columns.',
    ],
    terms: [
      { term: 'COUNT', definition: 'Counts cells that contain numbers only.' },
      { term: 'COUNTA', definition: 'Counts all non-empty cells, including text.' },
      { term: 'COUNTBLANK', definition: 'Counts empty cells in a range.' },
      { term: 'Data audit', definition: 'A check for missing or invalid entries.' },
    ],
    tutorials: [
      {
        title: 'Audit a staff list',
        steps: [
          {
            instruction: 'Type `ID`, `Name`, and `Score` in row 1.',
            detail: 'Use `A1` to `C1`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff list - Excel',
                cells: [['ID', 'Name', 'Score']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type five staff records. Leave two scores empty.',
            detail: 'Use IDs such as `E-001` to keep the leading zero.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff list - Excel',
                cells: [
                  ['ID', 'Name', 'Score'],
                  ['E-001', 'Amina', '80'],
                  ['E-002', 'Daniel', ''],
                  ['E-003', 'Sofia', '90'],
                  ['E-004', 'Liam', '70'],
                  ['E-005', 'Nora', ''],
                ],
                selected: 'C6',
              },
            },
          },
          {
            instruction: 'Click `E2` and type `=COUNTA(A2:A6)`.',
            detail: 'The result is `5`: five IDs are present.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff list - Excel',
                cells: [
                  ['ID', 'Name', 'Score', '', ''],
                  ['E-001', 'Amina', '80', '', '5'],
                  ['E-002', 'Daniel', '', '', ''],
                  ['E-003', 'Sofia', '90', '', ''],
                  ['E-004', 'Liam', '70', '', ''],
                  ['E-005', 'Nora', '', '', ''],
                ],
                selected: 'E2',
                formula: '=COUNTA(A2:A6)',
              },
              caption: 'COUNTA counts the text IDs that COUNT would ignore.',
            },
          },
          {
            instruction: 'In `E3`, type `=COUNT(C2:C6)`.',
            detail: 'The result is `3`: only three scores are numbers.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff list - Excel',
                cells: [
                  ['ID', 'Name', 'Score', '', ''],
                  ['E-001', 'Amina', '80', '', '5'],
                  ['E-002', 'Daniel', '', '', '3'],
                  ['E-003', 'Sofia', '90', '', ''],
                  ['E-004', 'Liam', '70', '', ''],
                  ['E-005', 'Nora', '', '', ''],
                ],
                selected: 'E3',
                formula: '=COUNT(C2:C6)',
              },
            },
          },
          {
            instruction: 'In `E4`, type `=COUNTA(C2:C6)`.',
            detail: 'The result is `3`: three score cells are non-empty.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff list - Excel',
                cells: [
                  ['ID', 'Name', 'Score', '', ''],
                  ['E-001', 'Amina', '80', '', '5'],
                  ['E-002', 'Daniel', '', '', '3'],
                  ['E-003', 'Sofia', '90', '', '3'],
                  ['E-004', 'Liam', '70', '', ''],
                  ['E-005', 'Nora', '', '', ''],
                ],
                selected: 'E4',
                formula: '=COUNTA(C2:C6)',
              },
            },
          },
          {
            instruction: 'In `E5`, type `=COUNTBLANK(C2:C6)`.',
            detail: 'The result is `2`: two scores are missing.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff list - Excel',
                cells: [
                  ['ID', 'Name', 'Score', '', ''],
                  ['E-001', 'Amina', '80', '', '5'],
                  ['E-002', 'Daniel', '', '', '3'],
                  ['E-003', 'Sofia', '90', '', '3'],
                  ['E-004', 'Liam', '70', '', '2'],
                  ['E-005', 'Nora', '', '', ''],
                ],
                selected: 'E5',
                formula: '=COUNTBLANK(C2:C6)',
              },
              caption: 'A count of records and a count of missing scores.',
            },
          },
        ],
        result: 'A count of records and a clear number of missing scores.',
      },
    ],
    visual: {
      kind: 'formula',
      title: 'Count what is there and what is missing',
      formula: '=COUNTA(A2:A6)',
      result: '5',
      note: 'COUNT counts numbers only. COUNTA counts text too. COUNTBLANK(C2:C6) returns 2.',
      caption: 'In this list, five IDs exist and two scores are missing.',
    },
    example: {
      title: 'The register that looked complete',
      scenario:
        'A staff register has 40 names, so it looks full. But the start-date column has 12 blanks. COUNTA counts 40 records; COUNTBLANK finds the 12 missing dates. HR can follow up before payroll runs.',
      takeaway: 'Count completeness in each column, not just the number of rows.',
    },
    guided: {
      title: 'Check a contact list',
      goal: 'Use COUNT, COUNTA, and COUNTBLANK together.',
      steps: [
        'Type `Name`, `Email`, and `Phone` in row 1.',
        'Add six contacts. Leave two emails and one phone empty.',
        'Count the names with COUNTA.',
        'Count the missing emails with COUNTBLANK.',
        'Count the phone cells with COUNTA.',
      ],
      hint: 'Phone numbers with spaces or hyphens are text. COUNT would return 0 on them; COUNTA counts them.',
      expected: [
        'The record count is 6.',
        'The missing email count is 2.',
        'The phone count is 5.',
      ],
    },
    independent: {
      title: 'Audit a training register',
      goal: 'Measure completeness and explain the result.',
      steps: [
        'Type `Name`, `Course`, `Score`, and `Date` in row 1.',
        'Add 10 records. Leave some scores and dates empty.',
        'Count the records, the numeric scores, and the missing dates.',
        'Write one sentence for each count.',
      ],
      hint: 'A blank score is not the same as a score of zero.',
      expected: [
        'Each count matches the gaps in your list.',
        'Your sentences explain COUNT and COUNTA correctly.',
      ],
    },
    knowledgeCheck: 'e3-4-kc',
    quickQuiz: ['e3-4-qq1', 'e3-4-qq2'],
    summary: [
      '`COUNT` counts numbers. `COUNTA` counts all non-empty cells, including text.',
      '`COUNTBLANK` finds missing data. Check each column, not just the rows.',
    ],
    nextTeaser: 'Next, you will make Excel decide with IF, COUNTIF, and SUMIF.',
  },
  {
    id: 'e3-5',
    pathId: 'excel',
    unitId: 'e3',
    title: 'IF, COUNTIF and SUMIF',
    subtitle: 'Make Excel decide, count, and total by condition',
    duration: 30,
    difficulty: 'Intermediate',
    objectives: [
      'Write an `IF` formula with a logical test',
      'Count matching cells with `COUNTIF`',
      'Total matching amounts with `SUMIF`',
      'Use quotes in criteria correctly',
    ],
    why: 'Office reports often ask who worked overtime, how many were absent, or how much each department spent. These functions answer in seconds.',
    explain: [
      '`IF` checks a condition and returns one of two values. Syntax: `=IF(test, value_if_true, value_if_false)`.',
      'Use `>=`, `>`, `<`, `<=`, `=`, or `<>` in the test. Text results need double quotes: `=IF(B2>=40,"Overtime","Standard")`.',
      '`COUNTIF` counts matching cells: `=COUNTIF(range, criteria)`. `SUMIF` adds matching values: `=SUMIF(range, criteria, sum_range)`.',
    ],
    terms: [
      { term: 'Logical test', definition: 'A condition that is either true or false.' },
      { term: 'Criteria', definition: 'The value or condition that COUNTIF or SUMIF matches.' },
      { term: 'Nested IF', definition: 'An IF formula placed inside another IF formula.' },
      { term: 'SUMIFS', definition: 'Adds values that meet two or more conditions.' },
    ],
    tutorials: [
      {
        title: 'Flag overtime with IF',
        steps: [
          {
            instruction: 'Type `Employee`, `Hours`, and `Status` in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Hours - Excel',
                cells: [['Employee', 'Hours', 'Status']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type four employees and their hours in rows 2 to 5.',
            detail: 'Use 38, 42, 45, and 40.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Hours - Excel',
                cells: [
                  ['Employee', 'Hours', 'Status'],
                  ['Amina', '38', ''],
                  ['Daniel', '42', ''],
                  ['Sofia', '45', ''],
                  ['Liam', '40', ''],
                ],
                selected: 'B5',
              },
            },
          },
          {
            instruction: 'Click `C2`. Type `=IF(B2>=40,"Overtime","Standard")` and press Enter.',
            detail: '`38` is below 40, so `C2` shows `Standard`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Hours - Excel',
                cells: [
                  ['Employee', 'Hours', 'Status'],
                  ['Amina', '38', 'Standard'],
                  ['Daniel', '42', ''],
                  ['Sofia', '45', ''],
                  ['Liam', '40', ''],
                ],
                selected: 'C2',
                formula: '=IF(B2>=40,"Overtime","Standard")',
              },
              caption: 'The test is B2>=40. The text answers need double quotes.',
            },
          },
          {
            instruction: 'Drag the fill handle from `C2` down to `C5`.',
            detail: 'Each row is checked. 40 or more hours shows `Overtime`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Hours - Excel',
                cells: [
                  ['Employee', 'Hours', 'Status'],
                  ['Amina', '38', 'Standard'],
                  ['Daniel', '42', 'Overtime'],
                  ['Sofia', '45', 'Overtime'],
                  ['Liam', '40', 'Overtime'],
                ],
                selected: 'C5',
                formula: '=IF(B5>=40,"Overtime","Standard")',
              },
            },
          },
          {
            instruction: 'Change `B2` to `40` and press Enter.',
            detail: '`C2` changes to `Overtime`. The test uses `>=`, so 40 counts.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Hours - Excel',
                cells: [
                  ['Employee', 'Hours', 'Status'],
                  ['Amina', '40', 'Overtime'],
                  ['Daniel', '42', 'Overtime'],
                  ['Sofia', '45', 'Overtime'],
                  ['Liam', '40', 'Overtime'],
                ],
                selected: 'B2',
              },
            },
          },
        ],
        result: 'A status column that updates when hours change.',
      },
      {
        title: 'Count and total by category',
        steps: [
          {
            instruction: 'Type `Category` and `Amount` in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [['Category', 'Amount']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Add five expenses in rows 2 to 6. Use `Travel`, `Supplies`, and `Utilities`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Category', 'Amount'],
                  ['Travel', '120'],
                  ['Supplies', '80'],
                  ['Travel', '150'],
                  ['Utilities', '90'],
                  ['Travel', '60'],
                ],
                selected: 'B6',
              },
            },
          },
          {
            instruction: 'Click `D2`. Type `=COUNTIF(A2:A6,"Travel")` and press Enter.',
            detail: 'The result is `3`: three Travel rows.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Category', 'Amount', '', ''],
                  ['Travel', '120', '', '3'],
                  ['Supplies', '80', '', ''],
                  ['Travel', '150', '', ''],
                  ['Utilities', '90', '', ''],
                  ['Travel', '60', '', ''],
                ],
                selected: 'D2',
                formula: '=COUNTIF(A2:A6,"Travel")',
              },
              caption: 'Text criteria go in double quotes.',
            },
          },
          {
            instruction: 'Click `D3`. Type `=SUMIF(A2:A6,"Travel",B2:B6)` and press Enter.',
            detail: 'The result is `330`: 120 + 150 + 60.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Category', 'Amount', '', ''],
                  ['Travel', '120', '', '3'],
                  ['Supplies', '80', '', '330'],
                  ['Travel', '150', '', ''],
                  ['Utilities', '90', '', ''],
                  ['Travel', '60', '', ''],
                ],
                selected: 'D3',
                formula: '=SUMIF(A2:A6,"Travel",B2:B6)',
              },
              caption: 'SUMIF checks the first range, then adds the matching values from the third range.',
            },
          },
          {
            instruction: 'Change `B4` from `150` to `200`.',
            detail: '`D3` changes to `380`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Category', 'Amount', '', ''],
                  ['Travel', '120', '', '3'],
                  ['Supplies', '80', '', '380'],
                  ['Travel', '200', '', ''],
                  ['Utilities', '90', '', ''],
                  ['Travel', '60', '', ''],
                ],
                selected: 'B4',
              },
            },
          },
          {
            instruction: 'In `D4`, type `=SUMIF(A2:A6,"Supplies",B2:B6)`.',
            detail: 'The result is `80`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Category', 'Amount', '', ''],
                  ['Travel', '120', '', '3'],
                  ['Supplies', '80', '', '380'],
                  ['Travel', '200', '', '80'],
                  ['Utilities', '90', '', ''],
                  ['Travel', '60', '', ''],
                ],
                selected: 'D4',
                formula: '=SUMIF(A2:A6,"Supplies",B2:B6)',
              },
            },
          },
        ],
        result: 'A count of Travel rows and a total of Travel amounts that update with the data.',
      },
    ],
    visual: {
      kind: 'formula',
      title: 'IF returns one of two answers',
      formula: '=IF(B2>=40,"Overtime","Standard")',
      result: 'Standard',
      note: 'B2 is 38, so the test is false. If B2 were 42, the result would be Overtime.',
      caption: 'Syntax: =IF(test, value_if_true, value_if_false). Text needs double quotes.',
    },
    example: {
      title: 'The attendance summary in one minute',
      scenario:
        'A 31-day attendance sheet uses `P`, `A`, and `L` codes. The assistant uses `COUNTIF` for each code and `SUMIF` to total leave days by type. The summary updates itself every month.',
      takeaway: 'Use COUNTIF or SUMIF instead of filtering by hand.',
    },
    guided: {
      title: 'Build a mini HR summary',
      goal: 'Use IF, COUNTIF, and SUMIF together.',
      steps: [
        'Type `Name`, `Department`, and `Hours` in row 1.',
        'Add five employees with departments and hours.',
        'Add a `Status` column. Use IF to show `Overtime` for 40 hours or more.',
        'Count the Finance staff with COUNTIF.',
        'Use SUMIF to total the hours for Finance.',
      ],
      hint: 'Text criteria need quotes: `"Finance"`. A cell reference does not need quotes.',
      expected: [
        'Every status label is correct.',
        'The Finance count matches your list.',
        'The Finance hours total matches the rows.',
      ],
    },
    independent: {
      title: 'Analyze leave records',
      goal: 'Answer conditional questions with formulas.',
      steps: [
        'Type `Employee`, `Leave Type`, `Days`, and `Status` in row 1.',
        'Add 10 records with `Approved` and `Pending` status.',
        'Count the Approved records with COUNTIF.',
        'Total the Approved Sick days with SUMIFS.',
      ],
      hint: 'For two conditions, use `=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)`. The sum range comes first.',
      expected: [
        'The Approved count matches the list.',
        'The Sick days total is correct.',
        'The formulas use quotes around text criteria.',
      ],
    },
    knowledgeCheck: 'e3-5-kc',
    quickQuiz: ['e3-5-qq1', 'e3-5-qq2'],
    summary: [
      '`IF` returns one of two values based on a test. Text results and text criteria need double quotes.',
      '`COUNTIF` counts matches. `SUMIF` adds matches. For two conditions, use COUNTIFS or SUMIFS.',
    ],
    nextTeaser: 'Next, you will lock a rate with absolute references so formulas copy safely.',
  },
  {
    id: 'e3-6',
    pathId: 'excel',
    unitId: 'e3',
    title: 'Relative and Absolute References',
    subtitle: 'The dollar sign that decides what moves when you copy',
    duration: 25,
    difficulty: 'Intermediate',
    objectives: [
      'Tell relative, absolute, and mixed references apart',
      'Lock a cell with `$`',
      'Use `F4` to change a reference type',
      'Copy one formula safely down a column',
    ],
    why: 'One shared rate should stay in one cell. A locked reference stops every copied row from using the wrong value.',
    explain: [
      'A relative reference such as `B2` changes when you copy the formula. Copy `=A2*B2` down one row and it becomes `=A3*B3`.',
      'An absolute reference such as `$B$2` stays fixed. The dollar signs lock the column and the row.',
      'A mixed reference locks one part: `$B2` locks the column; `B$2` locks the row.',
    ],
    terms: [
      { term: 'Relative reference', definition: 'A reference such as B2 that changes when copied.' },
      { term: 'Absolute reference', definition: 'A reference such as $B$2 that stays fixed when copied.' },
      { term: 'Mixed reference', definition: 'A reference with one locked part, such as $B2.' },
      { term: '#REF!', definition: 'An error caused by a reference to a deleted cell.' },
    ],
    tutorials: [
      {
        title: 'Apply one tax rate to every row',
        steps: [
          {
            instruction: 'Type `Amount`, `Tax Rate`, and `Tax` in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Tax - Excel',
                cells: [['Amount', 'Tax Rate', 'Tax']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Type `8%` in `B2` and four amounts in `A2:A5`.',
            detail: 'Use 100, 200, 300, and 400.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Tax - Excel',
                cells: [
                  ['Amount', 'Tax Rate', 'Tax'],
                  ['100', '8%', ''],
                  ['200', '', ''],
                  ['300', '', ''],
                  ['400', '', ''],
                ],
                selected: 'A5',
              },
            },
          },
          {
            instruction: 'Click `C2`. Type `=A2*B2` and press Enter.',
            detail: '`C2` shows `8`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Tax - Excel',
                cells: [
                  ['Amount', 'Tax Rate', 'Tax'],
                  ['100', '8%', '8'],
                  ['200', '', ''],
                  ['300', '', ''],
                  ['400', '', ''],
                ],
                selected: 'C2',
                formula: '=A2*B2',
              },
            },
          },
          {
            instruction: 'Drag the fill handle from `C2` down to `C5`.',
            detail: '`C3` shows `0` because `B3` is empty.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Tax - Excel',
                cells: [
                  ['Amount', 'Tax Rate', 'Tax'],
                  ['100', '8%', '8'],
                  ['200', '', '0'],
                  ['300', '', '0'],
                  ['400', '', '0'],
                ],
                selected: 'C3',
                formula: '=A3*B3',
              },
              caption: 'Each copied row looks one row lower for the rate.',
            },
          },
          {
            instruction: 'Click `C2`. Change the formula to `=A2*$B$2` and press Enter.',
            shortcut: 'F4',
            detail: 'The dollar signs lock the rate in `B2`. Press `F4` to cycle `B2`, `$B$2`, `B$2`, and `$B2`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Tax - Excel',
                cells: [
                  ['Amount', 'Tax Rate', 'Tax'],
                  ['100', '8%', '8'],
                  ['200', '', '0'],
                  ['300', '', '0'],
                  ['400', '', '0'],
                ],
                selected: 'C2',
                formula: '=A2*$B$2',
              },
            },
          },
          {
            instruction: 'Drag the fill handle down to `C5` again.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Tax - Excel',
                cells: [
                  ['Amount', 'Tax Rate', 'Tax'],
                  ['100', '8%', '8'],
                  ['200', '', '16'],
                  ['300', '', '24'],
                  ['400', '', '32'],
                ],
                selected: 'C5',
                formula: '=A5*$B$2',
              },
            },
          },
        ],
        result: 'One fixed tax rate applies to every row, no matter how far you copy the formula.',
      },
      {
        title: 'Build a multiplication grid',
        steps: [
          {
            instruction: 'Type `1`, `2`, and `3` across `B1:D1` and down `A2:A4`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Grid - Excel',
                cells: [
                  ['', '1', '2', '3'],
                  ['1', '', '', ''],
                  ['2', '', '', ''],
                  ['3', '', '', ''],
                ],
                selected: 'A4',
              },
            },
          },
          {
            instruction: 'Click `B2`. Type `=$A2*B$1` and press Enter.',
            detail: '`$A2` locks the column; `B$1` locks the row.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Grid - Excel',
                cells: [
                  ['', '1', '2', '3'],
                  ['1', '1', '', ''],
                  ['2', '', '', ''],
                  ['3', '', '', ''],
                ],
                selected: 'B2',
                formula: '=$A2*B$1',
              },
              caption: 'One formula can use both row and column headers.',
            },
          },
          {
            instruction: 'Drag the fill handle across to `D2`, then down to `D4`.',
            detail: 'Each cell uses its row and column header.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Grid - Excel',
                cells: [
                  ['', '1', '2', '3'],
                  ['1', '1', '2', '3'],
                  ['2', '2', '4', '6'],
                  ['3', '3', '6', '9'],
                ],
                selected: 'D4',
                formula: '=$A4*D$1',
              },
            },
          },
          {
            instruction: 'Click `D4` and read the Formula Bar.',
            detail: 'It shows `=$A4*D$1`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Grid - Excel',
                cells: [
                  ['', '1', '2', '3'],
                  ['1', '1', '2', '3'],
                  ['2', '2', '4', '6'],
                  ['3', '3', '6', '9'],
                ],
                selected: 'D4',
                formula: '=$A4*D$1',
              },
            },
          },
        ],
        result: 'A complete multiplication grid from one formula with mixed references.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'Reference types at a glance',
      caption: 'Dollar signs lock the column, the row, or both.',
      headers: ['Reference', 'Type', 'Copied down becomes', 'Use when'],
      rows: [
        ['B2', 'Relative', 'B3', 'Each row has its own data'],
        ['$B$2', 'Absolute', '$B$2', 'One fixed rate or constant'],
        ['$B2', 'Mixed', '$B3', 'Column stays fixed'],
        ['B$2', 'Mixed', 'B$2', 'Row stays fixed'],
      ],
    },
    example: {
      title: 'The payroll that used the wrong tax rate',
      scenario:
        'A payroll sheet stores the tax rate in `F2`. The assistant writes `=B2*F2` and fills down. Row 3 uses `F3`, a deduction. `=B2*$F$2` fixes it.',
      takeaway: 'Lock any single input that many formulas use.',
    },
    guided: {
      title: 'Build a locked-rate calculator',
      goal: 'Use an absolute reference for a shared rate.',
      steps: [
        'Type `Hours` in `A1` and `Rate` in `B1`.',
        'Type `20` in `B2` and five hour values in `A2:A6`.',
        'In `C2`, type `=A2*B2` and fill down. Notice the wrong results.',
        'Change `C2` to `=A2*$B$2` and fill down again.',
        'Change the rate in `B2` and check every row.',
      ],
      hint: 'Click the reference in the Formula Bar and press `F4` to add the dollar signs.',
      expected: [
        'Every row uses the same rate.',
        'The formula shows `$B$2`.',
        'A rate change updates all rows.',
      ],
    },
    independent: {
      title: 'Make a department cost sheet',
      goal: 'Mix absolute and relative references.',
      steps: [
        'Type departments in `A2:A5` and months in `B1:E1`.',
        'Put one allocation rate in `F1`.',
        'Write one formula that multiplies a department base by the rate.',
        'Copy it across and down. Check three cells in the Formula Bar.',
      ],
      hint: 'If copying changes a reference you wanted fixed, add a dollar sign before the column letter or row number.',
      expected: [
        'The same rate applies everywhere.',
        'Each row uses its own department base.',
        'No `#REF!` errors appear.',
      ],
    },
    knowledgeCheck: 'e3-6-kc',
    quickQuiz: ['e3-6-qq1', 'e3-6-qq2'],
    summary: [
      'Relative references change when copied. Absolute references stay fixed.',
      'Press `F4` to cycle reference types. Lock a shared rate before you fill down.',
    ],
    nextTeaser: 'Next, you will find data in a table with VLOOKUP and XLOOKUP.',
  },
  {
    id: 'e3-7',
    pathId: 'excel',
    unitId: 'e3',
    title: 'Lookup Functions: VLOOKUP, XLOOKUP and IFERROR',
    subtitle: 'Pull the right detail from a reference table',
    duration: 30,
    difficulty: 'Intermediate',
    objectives: [
      'Explain what a lookup does',
      'Write a `VLOOKUP` with an exact match',
      'Use `XLOOKUP` in Microsoft 365',
      'Replace an error with `IFERROR`',
    ],
    why: 'Offices keep lists of IDs, products, and departments. A lookup fills in the details once, so nobody types them by hand.',
    explain: [
      'A lookup uses a value you know to find related information. You know an ID; the lookup returns the department.',
      '`VLOOKUP` searches the leftmost column: `=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)`. It looks only to the right, and a new column can break the column number.',
      '`XLOOKUP` searches one column and returns from another: `=XLOOKUP(lookup_value, lookup_array, return_array)`. `IFERROR` replaces an error with a message.',
    ],
    terms: [
      { term: 'Lookup', definition: 'Finding related information from a value you know.' },
      { term: 'Table array', definition: 'The range of columns that VLOOKUP searches.' },
      { term: 'Exact match', definition: 'A match that must be identical; use FALSE or 0.' },
      { term: '#N/A', definition: 'The error when a lookup value is not found.' },
    ],
    tutorials: [
      {
        title: 'Look up a department by employee ID',
        steps: [
          {
            instruction: 'Type `ID`, `Name`, and `Department` in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [['ID', 'Name', 'Department']],
                selected: 'A1',
              },
            },
          },
          {
            instruction: 'Add four employees in rows 2 to 5.',
            detail: 'Use IDs such as `E-001`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department'],
                  ['E-001', 'Amina', 'Finance'],
                  ['E-002', 'Daniel', 'Operations'],
                  ['E-003', 'Sofia', 'HR'],
                  ['E-004', 'Liam', 'Finance'],
                ],
                selected: 'C5',
              },
            },
          },
          {
            instruction: 'Click `E1` and type `E-003`.',
            detail: 'This is the ID you want to find.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-003'],
                  ['E-001', 'Amina', 'Finance', '', ''],
                  ['E-002', 'Daniel', 'Operations', '', ''],
                  ['E-003', 'Sofia', 'HR', '', ''],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E1',
              },
            },
          },
          {
            instruction: 'Click `E2`. Type `=VLOOKUP(E1,$A$2:$C$5,3,FALSE)` and press Enter.',
            detail: 'The result is `HR` from column 3.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-003'],
                  ['E-001', 'Amina', 'Finance', '', 'HR'],
                  ['E-002', 'Daniel', 'Operations', '', ''],
                  ['E-003', 'Sofia', 'HR', '', ''],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E2',
                formula: '=VLOOKUP(E1,$A$2:$C$5,3,FALSE)',
              },
              caption: 'FALSE means exact match. The dollar signs keep the table fixed.',
            },
          },
          {
            instruction: 'Change `E1` to `E-004` and press Enter.',
            detail: '`E2` changes to `Finance`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-004'],
                  ['E-001', 'Amina', 'Finance', '', 'Finance'],
                  ['E-002', 'Daniel', 'Operations', '', ''],
                  ['E-003', 'Sofia', 'HR', '', ''],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E1',
              },
            },
          },
          {
            instruction: 'Change `E1` to `E-999`.',
            detail: '`E2` shows `#N/A`: the ID is not in the table.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-999'],
                  ['E-001', 'Amina', 'Finance', '', '#N/A'],
                  ['E-002', 'Daniel', 'Operations', '', ''],
                  ['E-003', 'Sofia', 'HR', '', ''],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E1',
              },
            },
          },
        ],
        result: 'A working VLOOKUP that returns the correct department for each ID.',
      },
      {
        title: 'Make the lookup safer',
        steps: [
          {
            instruction: 'Click `E3`. Type `=XLOOKUP(E1,$A$2:$A$5,$C$2:$C$5,"Not found")` and press Enter.',
            detail: 'The result is `HR`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-003'],
                  ['E-001', 'Amina', 'Finance', '', 'HR'],
                  ['E-002', 'Daniel', 'Operations', '', 'HR'],
                  ['E-003', 'Sofia', 'HR', '', ''],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E3',
                formula: '=XLOOKUP(E1,$A$2:$A$5,$C$2:$C$5,"Not found")',
              },
              caption: 'XLOOKUP is available in Microsoft 365 and Excel 2021 or newer.',
            },
          },
          {
            instruction: 'Change `E1` to `E-999`.',
            detail: '`E2` shows `#N/A`, but `E3` shows `Not found`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-999'],
                  ['E-001', 'Amina', 'Finance', '', '#N/A'],
                  ['E-002', 'Daniel', 'Operations', '', 'Not found'],
                  ['E-003', 'Sofia', 'HR', '', ''],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E1',
              },
            },
          },
          {
            instruction: 'Click `E4`. Type `=IFERROR(VLOOKUP(E1,$A$2:$C$5,3,FALSE),"Not found")` and press Enter.',
            detail: '`E4` shows `Not found`. This works in older Excel versions.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-999'],
                  ['E-001', 'Amina', 'Finance', '', '#N/A'],
                  ['E-002', 'Daniel', 'Operations', '', 'Not found'],
                  ['E-003', 'Sofia', 'HR', '', 'Not found'],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E4',
                formula: '=IFERROR(VLOOKUP(E1,$A$2:$C$5,3,FALSE),"Not found")',
              },
            },
          },
          {
            instruction: 'Change `E1` back to `E-003`.',
            detail: 'All three formulas show `HR`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['ID', 'Name', 'Department', '', 'E-003'],
                  ['E-001', 'Amina', 'Finance', '', 'HR'],
                  ['E-002', 'Daniel', 'Operations', '', 'HR'],
                  ['E-003', 'Sofia', 'HR', '', 'HR'],
                  ['E-004', 'Liam', 'Finance', '', ''],
                ],
                selected: 'E1',
              },
            },
          },
        ],
        result: 'You can choose XLOOKUP where it is available and use IFERROR to keep older VLOOKUP reports clean.',
      },
    ],
    visual: {
      kind: 'formula',
      title: 'VLOOKUP finds a value to the right',
      formula: '=VLOOKUP("E-003",$A$2:$C$5,3,FALSE)',
      result: 'HR',
      note: 'The ID is in the leftmost column. Column 3 of the range is Department. FALSE means exact match.',
      caption: 'If the ID is missing, VLOOKUP returns #N/A. IFERROR can replace it with a message.',
    },
    example: {
      title: 'One ID, the whole record',
      scenario:
        'A timesheet asks staff to enter only their employee ID. A VLOOKUP fills in the name and department. When someone changes team, update the table once.',
      takeaway: 'Enter the key once, and let Excel fill the rest.',
    },
    guided: {
      title: 'Build an employee lookup sheet',
      goal: 'Return a name and a department from an ID.',
      steps: [
        'Type `ID`, `Name`, `Department`, and `Phone` in row 1.',
        'Add five employees in rows 2 to 6.',
        'On a second sheet, type five IDs in column A.',
        'Use VLOOKUP to return the name in column B and the department in column C.',
        'Wrap both formulas in IFERROR with the message `"Check ID"`.',
      ],
      hint: 'If VLOOKUP returns the wrong field, count the columns in the table array again. The first column is 1.',
      expected: [
        'Names and departments match the reference table.',
        'An invalid ID shows `Check ID`.',
        'The table array uses absolute references.',
      ],
    },
    independent: {
      title: 'Make an inventory price lookup',
      goal: 'Connect item codes to descriptions and prices.',
      steps: [
        'Type `Item Code`, `Description`, `Unit Price`, and `Supplier` in row 1.',
        'Add six products.',
        'On an order sheet, enter item codes and quantities.',
        'Use VLOOKUP or XLOOKUP to return the description and unit price. Add line totals.',
      ],
      hint: 'If a lookup fails, check for extra spaces in the item codes. `TRIM` can clean them.',
      expected: [
        'Every valid code returns the correct details.',
        'An invalid code shows a clear message.',
        'Line totals calculate automatically.',
      ],
    },
    knowledgeCheck: 'e3-7-kc',
    quickQuiz: ['e3-7-qq1', 'e3-7-qq2'],
    summary: [
      'VLOOKUP searches the leftmost column and needs `FALSE` for an exact match. It cannot look left.',
      'XLOOKUP searches and returns from separate columns. `IFERROR` replaces an error with a message.',
    ],
    nextTeaser: 'Next, you will make important values stand out with conditional formatting.',
  },
]
