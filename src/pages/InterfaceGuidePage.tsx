import { Link, useParams } from 'react-router-dom'
import { ArrowRight, MonitorSmartphone } from 'lucide-react'
import OfficeAppIcon, { type OfficeApp } from '../components/icons/OfficeAppIcon'
import OfficeInterfacePreview from '../components/office/OfficeInterfacePreview'
import RichText from '../components/RichText'
import { OFFICE_UI } from '../data/officeUi'
import type { WorkspaceState } from '../types'
import { useLocale, useT } from '../i18n'

interface Part {
  name: string
  what: string
  nameKm: string
  whatKm: string
}

const WORD_PARTS: Part[] = [
  { name: 'Title bar', what: 'Shows the file name. On the left: **AutoSave** and the Quick Access Toolbar (**Save**, **Undo**, **Redo**). In the middle: the **Search** box.' , nameKm: 'របារចំណងជើង (Title bar)', whatKm: 'បង្ហាញឈ្មោះឯកសារ។ ខាងឆ្វេង៖ **AutoSave** និង Quick Access Toolbar (**Save**, **Undo**, **Redo**)។ នៅកណ្ដាល៖ ប្រអប់ **Search**។' },
  { name: 'Ribbon tabs', what: '**File**, **Home**, **Insert**, **Layout**, **Review**, **View** and more. Click a tab to change the commands below it.' , nameKm: 'ផ្ទាំង Ribbon', whatKm: '**File**, **Home**, **Insert**, **Layout**, **Review**, **View** និងផ្ទាំងផ្សេងទៀត។ ចុចលើផ្ទាំងមួយ ដើម្បីប្តូរពាក្យបញ្ជានៅខាងក្រោម។' },
  { name: 'Ribbon', what: 'The buttons for the selected tab. Most everyday commands are on **Home**.' , nameKm: 'Ribbon', whatKm: 'ប៊ូតុងទាំងឡាយសម្រាប់ផ្ទាំងដែលបានជ្រើស។ ពាក្យបញ្ជាប្រចាំថ្ងៃភាគច្រើនស្ថិតនៅលើ **Home**។' },
  { name: 'Group', what: 'Buttons are grouped by job, for example the **Font** group or the **Paragraph** group. The group name is under the buttons.' , nameKm: 'ក្រុម (Group)', whatKm: 'ប៊ូតុងត្រូវបានដាក់ជាក្រុមតាមការងារ ឧទាហរណ៍ ក្រុម **Font** ឬក្រុម **Paragraph**។ ឈ្មោះក្រុមស្ថិតនៅក្រោមប៊ូតុង។' },
  { name: 'Document area', what: 'The page you type on. The blinking line (the cursor) shows where your text will go.' , nameKm: 'ផ្ទៃឯកសារ', whatKm: 'ទំព័រដែលអ្នកវាយអត្ថបទ។ បន្ទាត់ភ្លឹបភ្លែត (cursor) បង្ហាញកន្លែងដែលអត្ថបទរបស់អ្នកនឹងចេញ។' },
  { name: 'Status bar', what: 'Page number, word count and language on the left; view buttons and **zoom** on the right.' , nameKm: 'របារស្ថានភាព (Status bar)', whatKm: 'លេខទំព័រ ចំនួនពាក្យ និងភាសា នៅខាងឆ្វេង។ ប៊ូតុងទិដ្ឋភាព និង **zoom** នៅខាងស្ដាំ។' },
]

const EXCEL_PARTS: Part[] = [
  { name: 'Title bar', what: 'Shows the workbook name, **AutoSave**, the Quick Access Toolbar and the **Search** box.' , nameKm: 'របារចំណងជើង (Title bar)', whatKm: 'បង្ហាញឈ្មោះសៀវភៅបញ្ជី **AutoSave** Quick Access Toolbar និងប្រអប់ **Search**។' },
  { name: 'Ribbon tabs', what: '**File**, **Home**, **Insert**, **Page Layout**, **Formulas**, **Data**, **Review**, **View** and more.' , nameKm: 'ផ្ទាំង Ribbon', whatKm: '**File**, **Home**, **Insert**, **Page Layout**, **Formulas**, **Data**, **Review**, **View** និងផ្ទាំងផ្សេងទៀត។' },
  { name: 'Ribbon', what: 'The buttons for the selected tab, grouped by job.' , nameKm: 'Ribbon', whatKm: 'ប៊ូតុងទាំងឡាយសម្រាប់ផ្ទាំងដែលបានជ្រើស ដែលដាក់ជាក្រុមតាមការងារ។' },
  { name: 'Group', what: 'For example **Font**, **Alignment** or **Number**. The group name is under its buttons.' , nameKm: 'ក្រុម (Group)', whatKm: 'ឧទាហរណ៍ **Font**, **Alignment** ឬ **Number**។ ឈ្មោះក្រុមស្ថិតនៅក្រោមប៊ូតុងរបស់វា។' },
  { name: 'Name Box', what: 'Shows the address of the selected cell, such as `B4`. You can type an address here to jump to it.' , nameKm: 'Name Box (ប្រអប់ឈ្មោះ)', whatKm: 'បង្ហាញអាសយដ្ឋាននៃក្រឡាដែលបានជ្រើស ដូចជា `B4`។ អ្នកអាចវាយអាសយដ្ឋាននៅទីនេះ ដើម្បីលោតទៅកាន់វា។' },
  { name: 'Formula bar', what: 'Shows what is really in the selected cell — a value or a formula such as `=SUM(B2:B4)`. You can edit it here.' , nameKm: 'Formula Bar (របាររូបមន្ត)', whatKm: 'បង្ហាញអ្វីដែលពិតជាមាននៅក្នុងក្រឡាដែលបានជ្រើស — តម្លៃ ឬរូបមន្តដូចជា `=SUM(B2:B4)`។ អ្នកអាចកែវានៅទីនេះ។' },
  { name: 'Column headers', what: 'Letters **A, B, C…** at the top. Click a letter to select the whole column.' , nameKm: 'ក្បាលជួរឈរ', whatKm: 'អក្សរ **A, B, C…** នៅខាងលើ។ ចុចលើអក្សរមួយ ដើម្បីជ្រើសជួរឈរទាំងមូល។' },
  { name: 'Row numbers', what: 'Numbers **1, 2, 3…** on the left. Click a number to select the whole row.' , nameKm: 'លេខជួរដេក', whatKm: 'លេខ **1, 2, 3…** នៅខាងឆ្វេង។ ចុចលើលេខមួយ ដើម្បីជ្រើសជួរដេកទាំងមូល។' },
  { name: 'Active cell', what: 'The cell with the green border. What you type goes here. Its address is column letter + row number.' , nameKm: 'ក្រឡាសកម្ម (Active cell)', whatKm: 'ក្រឡាដែលមានស៊ុមពណ៌បៃតង។ អ្វីដែលអ្នកវាយនឹងចូលទីនេះ។ អាសយដ្ឋានរបស់វាគឺ អក្សរជួរឈរ + លេខជួរដេក។' },
  { name: 'Sheet tabs', what: 'Each tab is a worksheet in the workbook. Click **+** to add a sheet.' , nameKm: 'ផ្ទាំងសន្លឹក (Sheet tabs)', whatKm: 'ផ្ទាំងនីមួយៗគឺជាសន្លឹកកិច្ចការមួយក្នុងសៀវភៅបញ្ជី។ ចុច **+** ដើម្បីបន្ថែមសន្លឹក។' },
]

const WORD_DOC: WorkspaceState = {
  kind: 'doc',
  title: 'Team Update - Word',
  lines: ['# Team Update', 'Hello everyone,', 'Our new office opens on **Monday**. Please bring:', '- Your laptop', '- Your ID card'],
}

const EXCEL_SHEET: WorkspaceState = {
  kind: 'sheet',
  title: 'Office Supplies - Excel',
  cells: [
    ['Item', 'Qty', 'Price', 'Total'],
    ['Paper', '10', '4.50', '45.00'],
    ['Pens', '24', '0.80', '19.20'],
    ['Folders', '15', '1.20', '18.00'],
    ['', '', 'Total', '82.20'],
  ],
  selected: 'D5',
  formula: '=SUM(D2:D4)',
}

export default function InterfaceGuidePage() {
  const { app: param } = useParams()
  const app: OfficeApp = param === 'excel' ? 'excel' : 'word'
  const model = OFFICE_UI[app]
  const t = useT()
  const km = useLocale() === 'km'
  const appLabel = app === 'word' ? 'Word' : 'Excel'
  const parts = app === 'word' ? WORD_PARTS : EXCEL_PARTS
  const numbering =
    app === 'word'
      ? { titlebar: 1, tabs: 2, ribbon: 3, group: 4, page: 5, statusbar: 6 }
      : { titlebar: 1, tabs: 2, ribbon: 3, group: 4, namebox: 5, formula: 6, columns: 7, rows: 8, cell: 9, sheets: 10 }

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <span className="section-label">
          <MonitorSmartphone size={13} aria-hidden="true" /> {t('ui.label')}
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">{t('ui.title', { app: model.appName })}</h1>
        <p className="mt-2 text-muted">
          {t('ui.lead', { app: appLabel })}
        </p>
        <div className="mt-5 inline-flex rounded-xl border hairline bg-white/50 p-1 dark:bg-white/5" role="tablist" aria-label={t('ui.choose')}>
          {(['word', 'excel'] as const).map((option) => (
            <Link
              key={option}
              to={`/interface/${option}`}
              role="tab"
              aria-selected={option === app}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                option === app ? 'bg-white shadow-sm dark:bg-white/10' : 'text-muted hover:text-[var(--text-strong)]'
              }`}
            >
              <OfficeAppIcon app={option} size={20} />
              {option === 'word' ? 'Word' : 'Excel'}
            </Link>
          ))}
        </div>
      </header>

      <section aria-labelledby="anatomy-heading" data-no-reveal>
        <h2 id="anatomy-heading" className="sr-only">
          {t('ui.parts', { app: model.appName })}
        </h2>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <OfficeInterfacePreview key={app} app={app} workspace={app === 'word' ? WORD_DOC : EXCEL_SHEET} parts={numbering} zoomable />
          <ol className="space-y-2">
            {parts.map((part, index) => (
              <li key={part.name} className="surface-solid flex gap-3 rounded-xl p-3">
                <span className="office-part-badge office-part-badge-static" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold">{km ? part.nameKm : part.name}</div>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">
                    <RichText text={km ? part.whatKm : part.what} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="tabs-heading">
        <h2 id="tabs-heading" className="font-display text-2xl font-bold">
          {t('ui.tabsTitle')}
        </h2>
        <p className="mt-1 text-sm text-muted">{t('ui.tabsLead')}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {model.tabs.map((tab) => (
            <div key={tab.id} className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{tab.label}</h3>
                <span className="chip">{tab.groups.length ? t('ui.groups', { n: tab.groups.length }) : t('ui.tab')}</span>
              </div>
              {tab.groups.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {tab.groups.map((group) => (
                    <li key={group.id} className="rounded-md bg-ink-100/70 px-2 py-0.5 text-xs text-ink-700 dark:bg-white/10 dark:text-ink-200">
                      {group.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-muted">{tab.note}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          {t('ui.reference', { version: model.version })}
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to={app === 'word' ? '/lesson/w1-2' : '/lesson/e1-2'} className="btn-primary">
          {t('ui.openLesson', { app: appLabel })} <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link to={`/labs/${app}`} className="btn-secondary">
          {t('ui.practise', { app: appLabel })}
        </Link>
      </div>
    </div>
  )
}
