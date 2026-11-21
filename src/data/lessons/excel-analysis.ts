import type { Lesson } from '../../types'

export const excelAnalysis: Lesson[] = [
  {
    id: 'e4-1',
    pathId: 'excel',
    unitId: 'e4',
    title: 'Conditional Formatting',
    subtitle: 'Make important values stand out with colour',
    duration: 25,
    difficulty: 'Intermediate',
    objectives: [
      'Highlight values with a ready-made rule',
      'Flag a whole row with a formula rule',
      'Edit or clear rules with Manage Rules',
    ],
    why: 'In a long tracker, one urgent number is easy to miss. A colour rule finds it for you, without checking every row.',
    explain: [
      'Conditional formatting changes how a cell looks when its value meets a rule. When the value changes, the colour changes by itself.',
      'Excel has ready-made rules for low numbers, top values, duplicates, and dates. You can also write your own formula rule.',
    ],
    terms: [
      { term: 'Conditional formatting', definition: 'Formatting that changes by itself when a value meets a rule.' },
      { term: 'Rule', definition: 'A test that decides when a cell changes its look.' },
      { term: 'Data bar', definition: 'A small bar inside a cell that shows relative size.' },
      { term: 'Rule priority', definition: 'The order Excel checks rules when more than one applies.' },
    ],
    tutorials: [
      {
        title: 'Highlight low stock',
        steps: [
          {
            instruction: 'Type this stock list in `A1:B5`.',
            detail: 'Put the headers in row 1.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Stock - Excel',
                cells: [
                  ['Item', 'Quantity'],
                  ['Printer toner', '4'],
                  ['A4 paper', '60'],
                  ['Staples', '8'],
                  ['Envelopes', '25'],
                ],
                selected: 'A1',
              },
              caption: 'Type these values in a blank sheet.',
            },
          },
          {
            instruction: 'Select the Quantity cells, `B2:B5`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Stock - Excel',
                cells: [
                  ['Item', 'Quantity'],
                  ['Printer toner', '4'],
                  ['A4 paper', '60'],
                  ['Staples', '8'],
                  ['Envelopes', '25'],
                ],
                selected: 'B2',
              },
              caption: 'Only the numbers in column B are selected.',
            },
          },
          {
            instruction: 'On the **Home** tab, click **Conditional Formatting**.',
            ui: {
              tab: 'home',
              target: 'conditional-formatting',
              caption: 'The rule categories open in a menu.',
            },
          },
          {
            instruction: 'Point to **Highlight Cells Rules**, then click **Less Than**.',
            ui: {
              tab: 'home',
              target: 'conditional-formatting',
              caption: 'The Less Than dialog opens.',
            },
          },
          {
            instruction: 'Type `10`, choose **Light Red Fill with Dark Red Text**, and click **OK**.',
            detail: 'Any quantity below 10 turns red.',
          },
          {
            instruction: 'Change `B2` to `12`, then back to `4`.',
            detail: 'The colour follows the value.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Stock - Excel',
                cells: [
                  ['Item', 'Quantity'],
                  ['Printer toner', '12'],
                  ['A4 paper', '60'],
                  ['Staples', '8'],
                  ['Envelopes', '25'],
                ],
                selected: 'B2',
              },
              caption: 'At 12 the fill disappears. Type 4 again to see it return.',
            },
          },
        ],
        result: 'Quantities below 10 are red, and the colour updates when a value changes.',
      },
      {
        title: 'Flag a row with a formula rule',
        steps: [
          {
            instruction: 'Select `D2:D4` on the attendance sheet.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Attendance - Excel',
                cells: [
                  ['Name', 'Attended', 'Total', 'Attendance %'],
                  ['Ana', '18', '20', '90%'],
                  ['Ben', '15', '20', '75%'],
                  ['Chen', '19', '20', '95%'],
                ],
                selected: 'D2',
              },
              caption: 'Column D holds the attendance percentages.',
            },
          },
          {
            instruction: 'On the **Home** tab, click **Conditional Formatting**, then click **New Rule**.',
            ui: {
              tab: 'home',
              target: 'conditional-formatting',
              caption: 'New Rule opens the New Formatting Rule dialog.',
            },
          },
          {
            instruction: 'Click **Use a formula to determine which cells to format**.',
          },
          {
            instruction: 'Type `=$D2<0.8`, then click **Format** and choose a light red fill.',
            detail: 'The `$` locks column D; row 2 changes for each row.',
          },
          {
            instruction: 'Click **OK** twice, then click **Manage Rules**.',
            detail: 'Manage Rules is where you edit, reorder, or delete rules.',
            ui: {
              tab: 'home',
              target: 'conditional-formatting',
              caption: 'Rules run from top to bottom. Manage Rules changes the order.',
            },
          },
        ],
        result: 'Ben at 75% is red, and every row is tested against its own percentage.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'Match the rule to the question',
      caption: 'Use one visual style per column so the sheet stays easy to read.',
      headers: ['Question', 'Rule type', 'Example'],
      rows: [
        ['Which items are low?', 'Highlight Cells Rules', 'Less Than 10 in light red'],
        ['Which costs are highest?', 'Top/Bottom Rules', 'Top 10 items in green'],
        ['How do values compare?', 'Data Bars', 'A bar inside each Amount cell'],
        ['Which values are high or low?', 'Color Scales', 'A two-colour gradient'],
        ['Which rows are overdue?', 'Formula rule', '=DueDate<TODAY() in red'],
        ['Which values are duplicated?', 'Highlight Cells Rules', 'Duplicate Values in orange'],
      ],
    },
    example: {
      title: 'The stockout that never happened',
      scenario:
        'The office keeps 120 items in stock. A rule turns any quantity below 10 red. On Monday the toner row is red, so you order it before the team runs out.',
      takeaway: 'Use colour to make a decision, not to decorate.',
    },
    guided: {
      title: 'Build an expense alert sheet',
      goal: 'Combine a highlight rule and a formula rule.',
      steps: [
        'Create a sheet with Category, Amount, and Budget for six rows.',
        'Highlight Amount values over 500 with **Highlight Cells Rules** > **Greater Than**.',
        'Select `A2:C7` and add a formula rule: `=$B2>$C2` with a red fill.',
        'Open **Manage Rules** to check both rules, then save as `Expense Alerts.xlsx`.',
      ],
      hint: 'If a rule colours the wrong cells, check the first cell of the range and the `$` signs.',
      expected: [
        'Values over 500 are red.',
        'Rows where Amount is over Budget are red.',
        'Both rules are listed in Manage Rules.',
      ],
    },
    independent: {
      title: 'Create a leave balance alert',
      goal: 'Format a small HR tracker.',
      steps: [
        'Create a tracker with Employee, Entitlement, Taken, and Remaining.',
        'In Remaining, type `=B2-C2` and fill it down the column.',
        'Highlight Remaining below 3 in red, then add data bars to the same column.',
      ],
      hint: 'Use one visual style per column. Two colours and bars together are hard to read.',
      expected: [
        'Low balances are easy to see.',
        'The rule updates when a number changes.',
      ],
    },
    knowledgeCheck: 'e4-1-kc',
    quickQuiz: ['e4-1-qq1', 'e4-1-qq2'],
    summary: [
      "A rule changes a cell's look when its value changes.",
      'Use **Manage Rules** to edit, reorder, or clear rules.',
    ],
    nextTeaser: 'Next, control what people type, so the data stays clean.',
  },
  {
    id: 'e4-2',
    pathId: 'excel',
    unitId: 'e4',
    title: 'Data Validation and Dropdown Lists',
    subtitle: 'Control what people can type into a cell',
    duration: 20,
    difficulty: 'Intermediate',
    objectives: [
      'Make a dropdown list for a column',
      'Set a number limit with a clear error message',
      'Check old entries with Circle Invalid Data',
    ],
    why: 'One wrong spelling, like `Fin` instead of `Finance`, breaks a count or a report. A dropdown list keeps every entry the same.',
    explain: [
      'Data validation controls what can be typed into a cell. A dropdown list lets people pick a value instead of typing it.',
      'You can also limit numbers, dates, and text length. A clear error message tells people what went wrong.',
    ],
    terms: [
      { term: 'Data validation', definition: 'A rule that controls what can be typed into a cell.' },
      { term: 'Dropdown list', definition: 'A list of allowed values that opens from a cell arrow.' },
      { term: 'Input message', definition: 'A hint that appears when a user selects the cell.' },
      { term: 'Error alert', definition: 'The message shown when someone types a value that breaks the rule.' },
    ],
    tutorials: [
      {
        title: 'Create a department dropdown',
        steps: [
          {
            instruction: 'Select the Department cells, `B2:B4`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Name', 'Department', '', 'List'],
                  ['Ana', '', '', 'Finance'],
                  ['Ben', '', '', 'HR'],
                  ['Chen', '', '', 'Operations'],
                ],
                selected: 'B2',
              },
              caption: 'Column B is empty and waits for the dropdown. Column D holds the allowed names.',
            },
          },
          {
            instruction: 'On the **Data** tab, click **Data Validation**.',
            ui: {
              tab: 'data',
              target: 'data-validation',
              caption: 'The Data Validation dialog opens on the Settings tab.',
            },
          },
          {
            instruction: 'In the **Allow** box, choose **List**.',
            detail: 'The **Source** box appears.',
          },
          {
            instruction: 'Click the **Source** box and select `D2:D4`.',
            detail: 'Tick **In-cell dropdown**.',
          },
          {
            instruction: 'Click **OK**, then click a Department cell and use the arrow.',
            detail: 'Only the three departments can be chosen.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Staff - Excel',
                cells: [
                  ['Name', 'Department', '', 'List'],
                  ['Ana', 'Finance', '', 'Finance'],
                  ['Ben', 'HR', '', 'HR'],
                  ['Chen', 'Operations', '', 'Operations'],
                ],
                selected: 'B2',
              },
              caption: 'The arrow opens the list. Pick one value for each person.',
            },
          },
        ],
        result: 'Each Department cell offers a short list, and other values are refused.',
      },
      {
        title: 'Add a number rule and a clear error',
        steps: [
          {
            instruction: 'Select the Days cells, `C2:C4`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Leave - Excel',
                cells: [
                  ['Employee', 'Leave type', 'Days'],
                  ['Ana', 'Annual', '5'],
                  ['Ben', 'Sick', '2'],
                  ['Chen', 'Annual', '10'],
                ],
                selected: 'C2',
              },
              caption: 'Days must be a whole number from 1 to 30.',
            },
          },
          {
            instruction: 'On the **Data** tab, click **Data Validation**.',
            ui: {
              tab: 'data',
              target: 'data-validation',
              caption: 'The Settings tab holds the rule.',
            },
          },
          {
            instruction: 'Set **Allow** to **Whole number**.',
          },
          {
            instruction: 'Set **Data** to **between**, **Minimum** to `1`, and **Maximum** to `30`.',
          },
          {
            instruction: 'Open the **Error Alert** tab and choose **Stop**.',
            detail: 'Stop refuses the entry. Warn and Information only ask or tell.',
          },
          {
            instruction: 'Type `Please enter 1 to 30 days.` in the **Error message** box and click **OK**.',
          },
          {
            instruction: 'Type `31` in `C4` and press Enter.',
            detail: 'Excel refuses the value and keeps the old one.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Leave - Excel',
                cells: [
                  ['Employee', 'Leave type', 'Days'],
                  ['Ana', 'Annual', '5'],
                  ['Ben', 'Sick', '2'],
                  ['Chen', 'Annual', '10'],
                ],
                selected: 'C4',
              },
              caption: 'The error message appears. Click Cancel or Retry.',
            },
          },
        ],
        result: 'Days accepts only whole numbers from 1 to 30, with a clear message for anything else.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'Validation rules for common office fields',
      caption: 'Choose the rule type that matches the data.',
      headers: ['Field', 'Allow', 'Rule'],
      rows: [
        ['Department', 'List', 'Finance, HR, Operations, Sales'],
        ['Leave days', 'Whole number', 'Between 1 and 30'],
        ['Start date', 'Date', 'Greater than or equal to today'],
        ['Phone', 'Text length', 'Equal to 10'],
      ],
    },
    example: {
      title: 'The report that split Finance in three',
      scenario:
        'Three people type department names by hand: Finance, finance, and Fin. A count for Finance misses two of them, so the headcount is wrong. A dropdown gives one exact spelling.',
      takeaway: 'Control every field that you group, filter, or count.',
    },
    guided: {
      title: 'Build a leave request form',
      goal: 'Add a dropdown and a number limit.',
      steps: [
        'Create columns: Employee, Leave Type, Start Date, End Date, Days.',
        'Add a Leave Type dropdown with Annual, Sick, Unpaid, Parental.',
        'Validate Days as a whole number between 1 and 30, with a Stop alert.',
        'Add an input message to Leave Type, then save as `Leave Request Validation.xlsx`.',
      ],
      hint: 'If the arrow does not appear, check **In-cell dropdown**. If old cells break the rule, use **Circle Invalid Data**.',
      expected: [
        'Leave Type accepts only the four values.',
        'Days rejects `0`, `31`, and text.',
        'The input message appears when you select a Leave Type cell.',
      ],
    },
    independent: {
      title: 'Control an inventory input sheet',
      goal: 'Use several rules on one sheet.',
      steps: [
        'Create a sheet with Item Code, Item Name, Category, Quantity, and Reorder Level.',
        'Add a Category dropdown with four categories.',
        'Validate Quantity and Reorder Level as whole numbers greater than or equal to `0`.',
        'Test each rule with a wrong value, then save as `Inventory Validation.xlsx`.',
      ],
      hint: 'Keep the allowed values on a separate sheet so you can change the list without editing every rule.',
      expected: [
        'Only listed categories can be chosen.',
        'Negative quantities are refused.',
        'Every rule has a clear error message.',
      ],
    },
    knowledgeCheck: 'e4-2-kc',
    quickQuiz: ['e4-2-qq1', 'e4-2-qq2'],
    summary: [
      'Validation controls what a cell accepts; a list keeps values consistent.',
      'Validation does not stop a paste, so protect the sheet for shared files.',
    ],
    nextTeaser: 'Next, turn those clean numbers into a chart.',
  },
  {
    id: 'e4-3',
    pathId: 'excel',
    unitId: 'e4',
    title: 'Charts and Visualization',
    subtitle: 'Turn rows of numbers into a clear picture',
    duration: 25,
    difficulty: 'Intermediate',
    objectives: [
      'Pick a chart that answers your question',
      'Make a column chart and a pie chart',
      'Add a title, axis titles, and data labels',
    ],
    why: 'A manager often needs the pattern first, not every number. A clear chart answers the question in seconds.',
    explain: [
      'A chart turns numbers into a picture, so a pattern is easy to see. A column chart compares values. A line chart shows a trend over time. A pie chart shows parts of one total.',
      'Choose the chart that answers your question, then add a title and labels so the chart explains itself.',
    ],
    terms: [
      { term: 'Chart', definition: 'A picture of numbers that shows a pattern.' },
      { term: 'Series', definition: 'One set of values drawn on a chart.' },
      { term: 'Axis', definition: 'The horizontal or vertical scale on a chart.' },
      { term: 'Legend', definition: 'A key that shows which colour belongs to which series.' },
    ],
    tutorials: [
      {
        title: 'Make a column chart',
        steps: [
          {
            instruction: 'Select `A1:B5`, including the headers.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Month', 'Expenses'],
                  ['Jan', '1200'],
                  ['Feb', '1350'],
                  ['Mar', '1100'],
                  ['Apr', '1600'],
                ],
                selected: 'A1',
              },
              caption: 'Month and Expenses are selected together.',
            },
          },
          {
            instruction: 'On the **Insert** tab, click **Insert Column or Bar Chart**, then choose **Clustered Column**.',
            ui: {
              tab: 'insert',
              target: 'column-chart',
              caption: 'The chart appears on the sheet.',
            },
          },
          {
            instruction: 'Click the chart title and type `Monthly Office Expenses`.',
            detail: 'A takeaway title is better than Chart 1.',
          },
          {
            instruction: 'Click the **+** button beside the chart and tick **Axis Titles**.',
            detail: 'Type `Amount (USD)` on the vertical axis.',
          },
          {
            instruction: 'Tick **Data Labels** so each bar shows its value.',
          },
        ],
        result: 'A column chart shows each month, with a clear title, a unit on the axis, and values on the bars.',
      },
      {
        title: 'Make a pie chart',
        steps: [
          {
            instruction: 'Select `A1:B5` on the category summary.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Budget - Excel',
                cells: [
                  ['Category', 'Total'],
                  ['Rent', '1200'],
                  ['Salaries', '3000'],
                  ['Supplies', '400'],
                  ['Travel', '400'],
                ],
                selected: 'A1',
              },
              caption: 'The four categories add up to one total.',
            },
          },
          {
            instruction: 'On the **Insert** tab, click **Insert Pie or Doughnut Chart**, then choose **Pie**.',
            ui: {
              tab: 'insert',
              target: 'pie-chart',
              caption: 'Use a 2D pie, not a 3D pie.',
            },
          },
          {
            instruction: 'Click the **+** button and tick **Data Labels**.',
          },
          {
            instruction: 'Right-click a label, click **Format Data Labels**, and tick **Percentage**.',
            detail: 'Untick **Value** so the labels stay short.',
          },
          {
            instruction: 'Click the chart title and type `Where the Budget Went`.',
          },
        ],
        result: 'A pie chart shows each share of the total as a percentage.',
      },
    ],
    visual: {
      kind: 'chart',
      title: 'Monthly office expenses',
      caption: 'A column chart makes the rise from January to June easy to see. Avoid 3D effects and cut axes.',
      data: [
        { label: 'Jan', value: 1200 },
        { label: 'Feb', value: 1350 },
        { label: 'Mar', value: 1100 },
        { label: 'Apr', value: 1600 },
        { label: 'May', value: 1750 },
        { label: 'Jun', value: 1900 },
      ],
      unit: ' USD',
    },
    example: {
      title: 'The chart that changed the meeting',
      scenario:
        'A facilities team shows a table of monthly power costs. Nobody sees the slow rise. A line chart makes the trend clear in two seconds, and the meeting moves to the cause.',
      takeaway: 'Pick the chart that makes the pattern impossible to miss.',
    },
    guided: {
      title: 'Make two charts for two questions',
      goal: 'Show a trend and a share of a total.',
      steps: [
        'Create a table of six months and attendance percentages.',
        'Insert a **Line** chart and title it `Attendance Trend`.',
        'Create a four-category expense summary and insert a pie chart with percentage labels.',
        'Save as `Charts Practice.xlsx`.',
      ],
      hint: 'If a chart plots the wrong range, use **Chart Design** > **Select Data**. To plot two separate columns, hold `Ctrl` while you select them.',
      expected: [
        'The line chart shows a clear trend.',
        'The pie slices add up to 100%.',
        'Both charts have a title that states the point.',
      ],
    },
    independent: {
      title: 'Build a one-page visual summary',
      goal: 'Choose a chart type for each question.',
      steps: [
        'Create three months of expenses by category.',
        'Add a column chart for monthly totals and a bar chart for categories.',
        'Write one sentence under each chart saying which question it answers.',
      ],
      hint: 'If category names are long, a bar chart is easier to read than a column chart.',
      expected: [
        'Each chart answers one clear question.',
        'No chart uses 3D effects or a cut axis.',
        'Titles and labels explain the chart without extra text.',
      ],
    },
    knowledgeCheck: 'e4-3-kc',
    quickQuiz: ['e4-3-qq1', 'e4-3-qq2'],
    summary: [
      'Column for comparison, line for a trend, pie for a few parts of one total.',
      'Use **Chart Design** > **Select Data** to fix a chart that plots the wrong range.',
    ],
    nextTeaser: 'Next, summarise thousands of rows with a PivotTable.',
  },
  {
    id: 'e4-4',
    pathId: 'excel',
    unitId: 'e4',
    title: 'PivotTables',
    subtitle: 'Summarise a long list by dragging fields',
    duration: 35,
    difficulty: 'Intermediate',
    objectives: [
      'Build a PivotTable from a flat list',
      'Show totals by row, column, and filter',
      'Refresh the data and change the calculation',
    ],
    why: 'A monthly report can take an hour of formulas. A PivotTable answers the same question in seconds.',
    explain: [
      'A PivotTable is a summary you build by dragging fields. It can add, count, or average thousands of rows in seconds.',
      'Your data must be a flat list: one header row, one record per row, and no blank rows or columns.',
    ],
    terms: [
      { term: 'PivotTable', definition: 'A summary table you build by dragging fields.' },
      { term: 'Source data', definition: 'The flat list that a PivotTable reads.' },
      { term: 'Values area', definition: 'The PivotTable area that holds the numbers being added.' },
      { term: 'Slicer', definition: 'A set of buttons that filters a PivotTable with one click.' },
    ],
    tutorials: [
      {
        title: 'Build a department-by-month summary',
        steps: [
          {
            instruction: 'Type the expense list in `A1:D5`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Month', 'Department', 'Category', 'Amount'],
                  ['Apr', 'Finance', 'Travel', '200'],
                  ['Apr', 'HR', 'Supplies', '150'],
                  ['May', 'Operations', 'Travel', '300'],
                  ['May', 'Finance', 'Supplies', '250'],
                ],
                selected: 'A1',
              },
              caption: 'One header row, one record per row, no blank rows.',
            },
          },
          {
            instruction: 'Click a cell inside the data, such as `B3`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Month', 'Department', 'Category', 'Amount'],
                  ['Apr', 'Finance', 'Travel', '200'],
                  ['Apr', 'HR', 'Supplies', '150'],
                  ['May', 'Operations', 'Travel', '300'],
                  ['May', 'Finance', 'Supplies', '250'],
                ],
                selected: 'B3',
              },
              caption: 'A PivotTable reads the whole block around the active cell.',
            },
          },
          {
            instruction: 'On the **Insert** tab, click **PivotTable**, then click **OK**.',
            detail: 'Keep **New Worksheet** selected.',
            ui: {
              tab: 'insert',
              target: 'pivottable',
              caption: 'The Create PivotTable dialog opens.',
            },
          },
          {
            instruction: 'Drag **Department** to the **Rows** area.',
            detail: 'Each department becomes a row label.',
          },
          {
            instruction: 'Drag **Amount** to the **Values** area.',
            detail: 'Excel sums the amounts for each department.',
          },
          {
            instruction: 'Drag **Month** to the **Columns** area.',
            detail: 'The table now shows a department-by-month grid.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Sheet1 - Excel',
                cells: [
                  ['Sum of Amount', 'Column Labels', '', ''],
                  ['Row Labels', 'Apr', 'May', 'Grand Total'],
                  ['Finance', '200', '250', '450'],
                  ['HR', '150', '', '150'],
                  ['Operations', '', '300', '300'],
                  ['Grand Total', '350', '550', '900'],
                ],
                selected: 'A3',
              },
              caption: 'The PivotTable appears on a new sheet.',
            },
          },
          {
            instruction: 'Drag **Category** to **Filters**.',
            detail: 'Choose a category to filter the whole table.',
          },
        ],
        result: 'A grid of totals by department and month, with a filter for category.',
      },
      {
        title: 'Refresh and change the numbers',
        steps: [
          {
            instruction: 'Add a new expense row to the source data.',
            detail: 'The PivotTable does not change yet.',
          },
          {
            instruction: 'Click a cell in the PivotTable, then press `Alt + F5`.',
            shortcut: 'Alt + F5',
            detail: 'You can also use **PivotTable Analyze** > **Refresh**.',
          },
          {
            instruction: 'Click **Sum of Amount** in **Values**, then click **Value Field Settings**.',
          },
          {
            instruction: 'Choose **Average** and click **OK**.',
            detail: 'Choose **Sum** again when you finish.',
          },
          {
            instruction: 'On the **Insert** tab, click **Slicer**, tick **Department**, and click **OK**.',
            detail: 'Click a button to filter the table.',
            ui: {
              tab: 'insert',
              target: 'slicer',
              caption: 'A slicer is a filter made of buttons.',
            },
          },
        ],
        result: 'The new row appears after a refresh, and the table can show averages.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'A simple PivotTable result',
      caption: 'Departments in rows, months in columns, amounts summed in the cells.',
      headers: ['Department', 'Apr', 'May', 'Grand Total'],
      rows: [
        ['Finance', '200', '250', '450'],
        ['HR', '150', '', '150'],
        ['Operations', '', '300', '300'],
        ['Grand Total', '350', '550', '900'],
      ],
    },
    example: {
      title: 'The monthly report that built itself',
      scenario:
        'Each month an administrator copies expenses into a summary sheet and writes new SUMIF formulas. Now she refreshes one PivotTable instead, and the department totals are ready in seconds.',
      takeaway: 'For many summaries from one list, a PivotTable is faster and safer than formulas.',
    },
    guided: {
      title: 'Build an attendance PivotTable',
      goal: 'Count records by department and status.',
      steps: [
        'Create a flat table with Date, Employee, Department, and Status for 15 rows.',
        'Insert a PivotTable on a new sheet.',
        'Put Department in Rows, Status in Columns, and Status in Values as Count.',
        'Add one new record, refresh, and save as `Attendance Pivot.xlsx`.',
      ],
      hint: 'If Status in Values shows zeros, change the summary to **Count**. Text fields are counted, not added.',
      expected: [
        'The table shows counts by department and status.',
        'The grand total matches 15 plus your new row.',
        'The new record appears after **Refresh**.',
      ],
    },
    independent: {
      title: 'Answer three questions with one PivotTable',
      goal: 'Use rows, columns, filters, and a second calculation.',
      steps: [
        'Create a sales or expense list with 25 rows, three categories, and three months.',
        'Build a PivotTable by category and month with **Sum**.',
        'Add a month filter and a slicer.',
        'Change the value to **Average**, then back to **Sum**, and write down three findings.',
      ],
      hint: 'If a percentage of total looks wrong after filtering, check whether it uses the filtered or the full total.',
      expected: [
        'The totals match the source data.',
        'The slicer changes the table with one click.',
        'Each finding is supported by a number in the table.',
      ],
    },
    knowledgeCheck: 'e4-4-kc',
    quickQuiz: ['e4-4-qq1', 'e4-4-qq2'],
    summary: [
      'A PivotTable groups a flat list by rows, columns, and filters.',
      'Refresh after the data changes; PivotTables do not update by themselves.',
    ],
    nextTeaser: 'Next, print and export a report that fits the page.',
  },
  {
    id: 'e4-5',
    pathId: 'excel',
    unitId: 'e4',
    title: 'Printing and Exporting PDF',
    subtitle: 'Fit a wide sheet on paper and in a PDF',
    duration: 20,
    difficulty: 'Beginner',
    objectives: [
      'Fit a wide sheet on one page wide',
      'Repeat the header row on every page',
      'Print only the report and export it to PDF',
    ],
    why: 'A report that splits its last column onto page 2 looks careless and is hard to read. A few print settings fix it first.',
    explain: [
      'Excel prints what it sees, and a wide sheet can push its last columns onto another page. A few page settings fix this.',
      'Print Preview shows the result before you use paper. You can change orientation, margins, and scaling, and repeat the header row.',
    ],
    terms: [
      { term: 'Print Area', definition: 'The cells you choose to print.' },
      { term: 'Print Titles', definition: 'Rows or columns repeated at the top of every printed page.' },
      { term: 'Scaling', definition: 'Shrinking or enlarging a sheet to fit the paper.' },
      { term: 'Orientation', definition: 'Portrait for tall pages, landscape for wide pages.' },
    ],
    tutorials: [
      {
        title: 'Fit a wide sheet on one page wide',
        steps: [
          {
            instruction: 'Press `Ctrl + P` to open Print.',
            shortcut: 'Ctrl + P',
            ui: {
              tab: 'file',
              target: 'file-print',
              workspace: {
                kind: 'sheet',
                title: 'Expense Report - Excel',
                cells: [
                  ['Item', 'Jan', 'Feb', 'Mar'],
                  ['Rent', '1200', '1200', '1200'],
                  ['Power', '300', '320', '280'],
                  ['Water', '120', '110', '130'],
                ],
                selected: 'A1',
              },
              caption: 'The preview shows exactly what will print.',
            },
          },
          {
            instruction: 'Check the preview, then click the back arrow.',
            detail: 'Columns that do not fit move to page 2.',
          },
          {
            instruction: 'On the **Page Layout** tab, click **Orientation**, then click **Landscape**.',
            ui: {
              tab: 'page-layout',
              target: 'orientation',
              caption: 'Landscape gives the sheet more width.',
            },
          },
          {
            instruction: 'Click **Margins**, then click **Narrow**.',
            ui: {
              tab: 'page-layout',
              target: 'margins',
              caption: 'Narrow margins leave more room for columns.',
            },
          },
          {
            instruction: 'Click **Print Titles**, then select row `1` in **Rows to repeat at top**.',
            detail: 'Click **OK**.',
            ui: {
              tab: 'page-layout',
              target: 'print-titles',
              caption: 'Row 1 will print at the top of every page.',
            },
          },
          {
            instruction: 'In the **Scale to Fit** group, set **Width** to **1 page**.',
            ui: {
              tab: 'page-layout',
              target: 'scale-width',
              caption: 'Height stays automatic, so the report can use several pages.',
            },
          },
          {
            instruction: 'Press `Ctrl + P` again and check page 1.',
            detail: 'Every column should fit.',
          },
        ],
        result: 'The report prints in landscape, one page wide, with row 1 on every page.',
      },
      {
        title: 'Print the report only, then export a PDF',
        steps: [
          {
            instruction: 'Select the report range, `A1:D4`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expense Report - Excel',
                cells: [
                  ['Item', 'Jan', 'Feb', 'Mar'],
                  ['Rent', '1200', '1200', '1200'],
                  ['Power', '300', '320', '280'],
                  ['Water', '120', '110', '130'],
                ],
                selected: 'A1',
              },
              caption: 'Leave notes and scratch calculations outside the range.',
            },
          },
          {
            instruction: 'On the **Page Layout** tab, click **Print Area**, then click **Set Print Area**.',
            ui: {
              tab: 'page-layout',
              target: 'print-area',
              caption: 'Only the selected cells will print.',
            },
          },
          {
            instruction: 'Click **File**, click **Export**, then click **Create PDF/XPS**.',
            ui: {
              tab: 'file',
              target: 'file-export',
              caption: 'The Publish as PDF or XPS dialog opens.',
            },
          },
          {
            instruction: 'Click **Options**, choose **Active sheet(s)**, and click **OK**.',
            detail: 'This leaves the other sheets out.',
          },
          {
            instruction: 'Type a file name, click **Publish**, then open the PDF and check it.',
            detail: 'Check the first and last page.',
          },
        ],
        result: 'A PDF holds only the report range, and you have checked every page.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'Print settings and what they fix',
      caption: 'Match the setting to the problem you see in Print Preview.',
      headers: ['Problem', 'Setting', 'Where'],
      rows: [
        ['Last columns on another page', 'Landscape or Width: 1 page', 'Page Layout'],
        ['No header on page 2', 'Print Titles > Rows to repeat', 'Page Layout'],
        ['Extra notes are printed', 'Set Print Area', 'Page Layout'],
        ['Too much white space', 'Narrow margins', 'Page Layout'],
        ['PDF includes working sheets', 'Active sheet(s)', 'File > Export'],
      ],
    },
    example: {
      title: 'The report with one orphan column',
      scenario:
        'A 40-row expense report prints seven columns on page 1 and the Amount column alone on page 2. Landscape and one page wide bring every column together, and the repeated header keeps each page clear.',
      takeaway: 'Always check Print Preview and the PDF before you send it.',
    },
    guided: {
      title: 'Prepare a printable attendance report',
      goal: 'Set orientation, a print area, and a repeated header.',
      steps: [
        'Create a 30-row attendance table with six columns.',
        'Set the print area to the table only.',
        'Switch to landscape, set **Width** to **1 page**, and repeat row `1`.',
        'Add a footer with the page number, then export to PDF and check both pages.',
      ],
      hint: 'If one page wide makes the text too small, remove a column or use a larger paper size instead of shrinking further.',
      expected: [
        'No column sits alone on a second page.',
        'The header appears at the top of every page.',
        'The PDF matches the preview.',
      ],
    },
    independent: {
      title: 'Send a client-ready PDF',
      goal: 'Export one sheet and leave the working notes out.',
      steps: [
        'Create a workbook with a Summary sheet and a Data sheet that holds working notes.',
        'Set a print area and a footer on Summary, then export only the active sheet.',
        'Open the PDF and confirm the working notes are absent.',
      ],
      hint: 'In the **Options** dialog, **Active sheet(s)** exports one sheet. **Entire workbook** exports them all.',
      expected: [
        'The PDF contains only the Summary sheet.',
        'Every page is readable and complete.',
        'You can explain how to include the Data sheet if asked.',
      ],
    },
    knowledgeCheck: 'e4-5-kc',
    quickQuiz: ['e4-5-qq1', 'e4-5-qq2'],
    summary: [
      'Landscape and **Width: 1 page** fix most split columns.',
      '**Print Titles** repeats headers; **Freeze Panes** only changes the screen.',
    ],
    nextTeaser: 'Finally, build a workbook that others can use safely.',
  },
  {
    id: 'e4-6',
    pathId: 'excel',
    unitId: 'e4',
    title: 'Administrative Spreadsheet Management',
    subtitle: 'Structure, protect, and hand over a shared workbook',
    duration: 40,
    difficulty: 'Intermediate',
    objectives: [
      'Split input sheets, data sheets, and a dashboard',
      'Protect formulas and keep input cells editable',
      'Keep a change log and a dated backup',
    ],
    why: 'A workbook that only its creator understands is a risk at work. Clear structure protects the formulas and helps the next person update it.',
    explain: [
      'A shared workbook must be easy for the next person to use. Keep input sheets, data sheets, and a dashboard separate.',
      'Protect the formulas, colour the input cells, and keep a change log. Then anyone can update the month without breaking the file.',
    ],
    terms: [
      { term: 'Input area', definition: 'Cells where people type data.' },
      { term: 'Calculated area', definition: 'Cells with formulas that people should not overwrite.' },
      { term: 'Dashboard', definition: 'One sheet that shows the few numbers managers need.' },
      { term: 'Change log', definition: 'A list of what changed, when, and by whom.' },
    ],
    tutorials: [
      {
        title: 'Build the sheets and a dashboard',
        steps: [
          {
            instruction: 'Name four sheets Dashboard, Staff, Attendance, and Expenses.',
            detail: 'Click **+** to add a sheet, then double-click a tab to rename it.',
          },
          {
            instruction: 'On the **Expenses** sheet, type the headers and five expense rows.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Department', 'Category', 'Amount'],
                  ['01-Apr', 'Finance', 'Travel', '200'],
                  ['02-Apr', 'HR', 'Supplies', '150'],
                  ['03-Apr', 'Operations', 'Travel', '300'],
                  ['04-Apr', 'Finance', 'Supplies', '250'],
                  ['05-May', 'HR', 'Travel', '100'],
                ],
                selected: 'A1',
              },
              caption: 'Raw data lives on its own sheet, with one header row.',
            },
          },
          {
            instruction: 'On the **Dashboard** sheet, type the title, the KPI labels, and the month totals.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Dashboard - Excel',
                cells: [
                  ['Office Dashboard', '', ''],
                  ['Headcount', '10', ''],
                  ['Month spend', '1000', ''],
                  ['Month', 'Apr', 'May'],
                  ['Spend', '900', '100'],
                ],
                selected: 'A1',
              },
              caption: 'A dashboard shows a few decisions, not every row.',
            },
          },
          {
            instruction: 'In the Month spend cell, type `=SUM(Expenses!D2:D6)`.',
            detail: 'The total updates when the expenses change.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Dashboard - Excel',
                cells: [
                  ['Office Dashboard', '', ''],
                  ['Headcount', '10', ''],
                  ['Month spend', '1000', ''],
                  ['Month', 'Apr', 'May'],
                  ['Spend', '900', '100'],
                ],
                selected: 'B3',
                formula: '=SUM(Expenses!D2:D6)',
              },
              caption: 'The Formula Bar shows the formula; the cell shows the result.',
            },
          },
          {
            instruction: 'Select `A4:C5` and insert a **Clustered Column** chart.',
            ui: {
              tab: 'insert',
              target: 'column-chart',
              caption: 'The chart uses the month names as labels.',
            },
          },
          {
            instruction: 'Save the file as `Office Admin Workbook.xlsx`.',
            shortcut: 'F12',
            ui: {
              tab: 'file',
              target: 'file-save-as',
              caption: 'Use a clear name that the team will recognise.',
            },
          },
        ],
        result: 'The workbook has named sheets, one dashboard, and totals that come from formulas.',
      },
      {
        title: 'Protect the formulas and keep a backup',
        steps: [
          {
            instruction: 'Select the input cells on the Expenses sheet, `A2:D6`.',
            ui: {
              workspace: {
                kind: 'sheet',
                title: 'Expenses - Excel',
                cells: [
                  ['Date', 'Department', 'Category', 'Amount'],
                  ['01-Apr', 'Finance', 'Travel', '200'],
                  ['02-Apr', 'HR', 'Supplies', '150'],
                  ['03-Apr', 'Operations', 'Travel', '300'],
                  ['04-Apr', 'Finance', 'Supplies', '250'],
                  ['05-May', 'HR', 'Travel', '100'],
                ],
                selected: 'A2',
              },
              caption: 'These rows are where people type. Row 1 holds the headers.',
            },
          },
          {
            instruction: 'On the **Home** tab, click **Format**, then click **Format Cells**.',
            shortcut: 'Ctrl + 1',
            ui: {
              tab: 'home',
              target: 'format-cells',
              caption: 'The Format Cells dialog opens.',
            },
          },
          {
            instruction: 'Open the **Protection** tab, clear the **Locked** box, and click **OK**.',
            detail: 'Input cells stay editable when the sheet is protected.',
          },
          {
            instruction: 'On the **Review** tab, click **Protect Sheet**, then click **OK**.',
            ui: {
              tab: 'review',
              target: 'protect-sheet',
              caption: 'Leave the password empty unless the team needs one. Repeat this on the Dashboard.',
            },
          },
          {
            instruction: 'Type in `A2`, then try to type in `A1`.',
            detail: 'The input row accepts text; the header is locked.',
          },
          {
            instruction: 'Add a **Change Log** sheet, then save a dated copy.',
            detail: 'Use a name like `Office Admin Workbook 2026-04.xlsx`.',
          },
        ],
        result: 'Formulas are locked, inputs still work, and the file has a change log and a backup.',
      },
    ],
    visual: {
      kind: 'table',
      title: 'What goes on each sheet',
      caption: 'Keep raw data apart from summaries. The dashboard only reads the data.',
      headers: ['Sheet', 'Holds', 'Example'],
      rows: [
        ['Dashboard', 'Five to seven KPIs and one chart', 'Headcount 10, spend 1150'],
        ['Staff', 'One record per employee', 'ID, name, department, start date'],
        ['Attendance', 'One record per day and person', 'Date, employee, status'],
        ['Expenses', 'One record per payment', 'Date, department, category, amount'],
        ['Lists', 'Allowed values for dropdowns', 'Departments, leave types, statuses'],
      ],
    },
    example: {
      title: 'The handover that took an hour',
      scenario:
        'An administrator leaves, and her replacement opens the monthly workbook. The dashboard, labelled input sheets, protected formulas, and change log let the new person update the month within an hour.',
      takeaway: 'Design the file for the person who inherits it, not only for yourself.',
    },
    guided: {
      title: 'Build an office management workbook',
      goal: 'Join data sheets, formulas, and a one-page dashboard.',
      steps: [
        'Create the five sheets from the tutorial and add 10 staff records and 20 expense rows.',
        'Add dropdowns for Department and Status.',
        'On the Dashboard, add four KPIs with `COUNTIF` or `SUMIF`, for example `=SUMIF(Expenses!B2:B21,"Finance",Expenses!D2:D21)`.',
        'Add one chart, protect the formula cells, and save a dated backup.',
      ],
      hint: 'If a KPI shows `0`, check the spelling in the criteria and that the range includes every row.',
      expected: [
        'Each KPI matches the data sheets.',
        'Input cells still accept text after protection.',
        'The workbook has a change log and a dated copy.',
      ],
    },
    independent: {
      title: 'Design a monthly reporting system',
      goal: 'Plan and build a workbook for someone else.',
      steps: [
        'Choose a scenario: attendance, leave, expenses, inventory, or staff.',
        'Write the sheet plan on paper before you build it.',
        'Build input sheets with validation, a dashboard with five KPIs and two charts.',
        'Protect the formulas, add a change log, and export a one-page PDF dashboard.',
      ],
      hint: 'Build and test one KPI first, then copy the pattern. Do not build all five before testing.',
      expected: [
        'Someone else can update the workbook using only the input cells.',
        'Every KPI is a formula, not a typed number.',
        'The PDF dashboard fits on one page.',
      ],
    },
    knowledgeCheck: 'e4-6-kc',
    quickQuiz: ['e4-6-qq1', 'e4-6-qq2'],
    summary: [
      'Separate input, data, and dashboard sheets, and colour the input cells.',
      'Protect formulas, keep a change log, and save a dated backup each month.',
    ],
    nextTeaser: 'You have finished the Excel path. The final assessment and projects bring it together.',
  },
]
