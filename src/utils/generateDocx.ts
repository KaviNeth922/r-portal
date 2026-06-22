import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  ShadingType,
  VerticalAlign,
  TableLayoutType,
} from 'docx';
import { saveAs } from 'file-saver';

export interface FormData {
  progressReportNumber: string;
  periodFrom: string;
  periodTo: string;
  projectTitle: string;
  executiveSummary: string;
  principalInvestigator: string;
  coInvestigators: string;
  dateOfAward: string;
  dateOfCommencement: string;
  faculty: string;
  department: string;
  researchAssistants: { name: string; contact: string; pgd: string; degree: string; dateReg: string; regNo: string }[];
  numTechAssistants: string;
  objectives: string;
  objectivesAchieved: string;
  deviations: string;
  describeDeviations: string;
  priorApproval: string;
  explainNoApproval: string;
  workOnSchedule: string;
  ifNotReasons: string;
  commentsImplementation: string;
  nextWorkPlan: string;
  personal: string;
  equipment: string;
  consumables: string;
  labServices: string;
  statisticalAnalysis: string;
  calibration: string;
  pgRegFee: string;
  travelSubsistence: string;
  miscellaneous: string;
  total: string;
  equipmentItems: { name: string; datePurchase: string; value: string; description: string }[];
  listPublications: string;
}

const DARK_BLUE = '1E3A5F';
const MID_BLUE = '1E40AF';
const LIGHT_BLUE_BG = 'EFF6FF';
const HEADER_BG = '1E3A5F';
const ALT_ROW = 'F8FAFF';
const WHITE = 'FFFFFF';
const BORDER_COLOR = 'CBD5E1';
const TEXT_DARK = '1E293B';
const TEXT_MID = '334155';

const cellBorder = (color = BORDER_COLOR) => ({
  top: { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left: { style: BorderStyle.SINGLE, size: 1, color },
  right: { style: BorderStyle.SINGLE, size: 1, color },
});

const noBorder = () => ({
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
});

const makeHeaderCell = (text: string, width: number) =>
  new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.SOLID, color: HEADER_BG },
    verticalAlign: VerticalAlign.CENTER,
    borders: cellBorder('FFFFFF'),
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: true, color: WHITE, size: 18, font: 'Calibri' })],
        spacing: { before: 80, after: 80 },
      }),
    ],
  });

const makeDataCell = (
  text: string,
  width: number,
  isAlt = false,
  align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT
) =>
  new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.SOLID, color: isAlt ? ALT_ROW : WHITE },
    verticalAlign: VerticalAlign.CENTER,
    borders: cellBorder(),
    children: [
      new Paragraph({
        alignment: align,
        children: [new TextRun({ text: text || '—', size: 18, color: TEXT_DARK, font: 'Calibri' })],
        spacing: { before: 60, after: 60 },
        indent: { left: 80, right: 80 },
      }),
    ],
  });

const sectionHeading = (text: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 140 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: MID_BLUE },
    },
    children: [
      new TextRun({
        text,
        bold: true,
        color: DARK_BLUE,
        size: 24,
        font: 'Calibri',
        allCaps: true,
      }),
    ],
  });

const fieldBlock = (label: string, value: string) => [
  new Paragraph({
    spacing: { before: 140, after: 40 },
    children: [
      new TextRun({ text: `${label}:`, bold: true, color: MID_BLUE, size: 20, font: 'Calibri' }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 120 },
    indent: { left: 240 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: MID_BLUE },
    },
    children: [
      new TextRun({ text: value || 'N/A', size: 20, color: TEXT_MID, font: 'Calibri' }),
    ],
  }),
];

const inlineField = (label: string, value: string): Paragraph =>
  new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 80 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 18, color: DARK_BLUE, font: 'Calibri' }),
      new TextRun({ text: value || 'N/A', size: 18, color: TEXT_DARK, font: 'Calibri' }),
    ],
  });

export async function generateProgressReportDocx(data: FormData): Promise<void> {
  // ── RESEARCH ASSISTANTS TABLE ──────────────────────────────────────────
  const raHeaders = ['Name', 'Contact', 'PGD Status', 'Degree', 'Date of Reg', 'Reg No'];
  const raWidths = [22, 18, 14, 16, 15, 15];

  const raHeaderRow = new TableRow({
    tableHeader: true,
    children: raHeaders.map((h, i) => makeHeaderCell(h, raWidths[i])),
  });

  const raSource = data.researchAssistants.length > 0
    ? data.researchAssistants
    : [{ name: 'R.P.Kavindya Nethranjali', contact: '0768863075', pgd: 'No', degree: 'N/A', dateReg: 'N/A', regNo: 'N/A' }];

  const raDataRows = raSource.map((ra, idx) =>
    new TableRow({
      children: [
        makeDataCell(ra.name, raWidths[0], idx % 2 === 1),
        makeDataCell(ra.contact, raWidths[1], idx % 2 === 1),
        makeDataCell(ra.pgd, raWidths[2], idx % 2 === 1, AlignmentType.CENTER),
        makeDataCell(ra.degree, raWidths[3], idx % 2 === 1),
        makeDataCell(ra.dateReg, raWidths[4], idx % 2 === 1, AlignmentType.CENTER),
        makeDataCell(ra.regNo, raWidths[5], idx % 2 === 1, AlignmentType.CENTER),
      ],
    })
  );

  const raTable = new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [raHeaderRow, ...raDataRows],
  });

  // ── EXPENDITURE TABLE ──────────────────────────────────────────────────
  const expCategories: [string, string][] = [
    ['Personal', data.personal],
    ['Equipment', data.equipment],
    ['Consumables', data.consumables],
    ['Lab services and sample analysis', data.labServices],
    ['Statistical analysis', data.statisticalAnalysis],
    ['Calibration of instruments', data.calibration],
    ['Post-Graduate Registration Fee', data.pgRegFee],
    ['Travel and subsistence', data.travelSubsistence],
    ['Miscellaneous', data.miscellaneous],
  ];

  const expHeaderRow = new TableRow({
    tableHeader: true,
    children: [
      makeHeaderCell('Category', 70),
      makeHeaderCell('Amount (Rs.)', 30),
    ],
  });

  const expDataRows = expCategories.map(([cat, val], idx) =>
    new TableRow({
      children: [
        makeDataCell(cat, 70, idx % 2 === 1),
        makeDataCell(val || '—', 30, idx % 2 === 1, AlignmentType.RIGHT),
      ],
    })
  );

  const expTotalRow = new TableRow({
    children: [
      new TableCell({
        width: { size: 70, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, color: DARK_BLUE },
        borders: cellBorder('FFFFFF'),
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            indent: { left: 80 },
            spacing: { before: 80, after: 80 },
            children: [new TextRun({ text: 'TOTAL', bold: true, color: WHITE, size: 20, font: 'Calibri', allCaps: true })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 30, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, color: DARK_BLUE },
        borders: cellBorder('FFFFFF'),
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            indent: { right: 80 },
            spacing: { before: 80, after: 80 },
            children: [new TextRun({ text: data.total || '848,550.00', bold: true, color: WHITE, size: 20, font: 'Calibri' })],
          }),
        ],
      }),
    ],
  });

  const expTable = new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [expHeaderRow, ...expDataRows, expTotalRow],
  });

  // ── DOCUMENT BUILD ─────────────────────────────────────────────────────
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 20, color: TEXT_DARK },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: [
          // ── COVER HEADER ─────────────────────────────────────────────
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: HEADER_BG },
                    borders: noBorder(),
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 60 },
                        children: [
                          new TextRun({ text: 'USJ – Research Council – Researcher Portal', bold: true, color: WHITE, size: 28, font: 'Calibri' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 40, after: 60 },
                        children: [
                          new TextRun({ text: 'University of Sri Jayewardenepura', color: 'BFD7FF', size: 20, font: 'Calibri' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 80, after: 200 },
                        children: [
                          new TextRun({ text: 'PROGRESS REPORT', bold: true, color: 'FDE68A', size: 36, font: 'Calibri', allCaps: true }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 120 }, children: [] }),

          // ── META INFO TABLE ──────────────────────────────────────────
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.SOLID, color: LIGHT_BLUE_BG },
                    borders: cellBorder(),
                    children: [inlineField('Grant Application Year', '2026')],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.SOLID, color: LIGHT_BLUE_BG },
                    borders: cellBorder(),
                    children: [inlineField('Grant Application No', 'RC/URG/HSS/2026/01')],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorder(),
                    shading: { type: ShadingType.SOLID, color: WHITE },
                    children: [inlineField('Progress Report No', data.progressReportNumber || '1')],
                  }),
                  new TableCell({
                    borders: cellBorder(),
                    shading: { type: ShadingType.SOLID, color: WHITE },
                    children: [inlineField('Period Covered', `${data.periodFrom || '05/09/2026'} to ${data.periodTo || '10/05/2027'}`)],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 80 }, children: [] }),

          // ── SECTION 1: GENERAL INFO ───────────────────────────────────
          sectionHeading('1. Details of General Information'),
          ...fieldBlock('Title of the Project', data.projectTitle || 'Electoral Democracy and Voting Behavior in Sri Lankan Electoral Politics (A Case Study in Selected Three Districts)'),
          ...fieldBlock('Executive Summary', data.executiveSummary || 'Electoral Democracy and Voting Behavior in Sri Lankan Electoral Politics (A Case Study in Selected Three Districts)'),
          ...fieldBlock('Principal Investigator', data.principalInvestigator || 'Prof. K. B. G. S. K. Gamlath'),
          ...fieldBlock('Co-Investigators', data.coInvestigators || 'N/A'),
          ...fieldBlock('Date of Award', data.dateOfAward || '04/08/2026'),
          ...fieldBlock('Date of Commencement', data.dateOfCommencement || '05/04/2026'),
          ...fieldBlock('Faculty', data.faculty || 'Faculty of Humanities and Social Sciences'),
          ...fieldBlock('Department', data.department || 'Department of Political Science'),

          new Paragraph({ spacing: { after: 60 }, children: [] }),

          // ── SECTION 2: RESEARCH ASSISTANTS ────────────────────────────
          sectionHeading('2. Details of Research Students/Assistants Employed'),
          new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
          raTable,
          new Paragraph({ spacing: { after: 60 }, children: [] }),
          ...fieldBlock('Number of Technical Assistants/Labourers Employed', data.numTechAssistants || 'N/A'),

          new Paragraph({ spacing: { after: 60 }, children: [] }),

          // ── SECTION 3: PROJECT DETAILS ────────────────────────────────
          sectionHeading('3. Details of the Project'),
          ...fieldBlock('Objectives of the Project', data.objectives || 'Decline in voter turnout.'),
          ...fieldBlock('Objectives Achieved to Date', data.objectivesAchieved || 'Data collection instruments, particularly the structured questionnaire, have been fully developed, refined, translated and adapted for future field deployment.'),
          ...fieldBlock('Description of Research During Reporting Period', '[Refer to attached file]'),
          ...fieldBlock('Results / Observations / Outputs', '[Refer to attached file]'),
          ...fieldBlock('Gantt Chart for Work Done', '[Refer to attached file]'),
          ...fieldBlock('Deviations in Work Plan', data.deviations || 'No'),
          ...fieldBlock('Description of Deviations', data.describeDeviations || 'N/A'),
          ...fieldBlock('Prior Approval from Research Council', data.priorApproval || 'No'),
          ...fieldBlock('Explanation for Not Obtaining Approval', data.explainNoApproval || 'N/A'),

          new Paragraph({ spacing: { after: 60 }, children: [] }),

          // ── SECTION 4: EXPENDITURE ────────────────────────────────────
          sectionHeading('4. Project Expenditure'),
          ...fieldBlock('Is the Work on Schedule?', data.workOnSchedule || 'Yes'),
          ...fieldBlock('If Not, Give Reasons', data.ifNotReasons || 'N/A'),
          ...fieldBlock('Major Equipment Purchased During Reporting Period', 'None listed during this reporting period.'),

          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: 'Projected Expenditure for Next 6 Months (Rs.):', bold: true, color: MID_BLUE, size: 22, font: 'Calibri' })],
          }),
          expTable,

          new Paragraph({ spacing: { after: 60 }, children: [] }),
          ...fieldBlock('Comments Regarding Project Implementation', data.commentsImplementation || 'N/A'),
          ...fieldBlock('Brief Work Plan for the Next 06 Months', data.nextWorkPlan || 'N/A'),

          new Paragraph({ spacing: { after: 60 }, children: [] }),

          // ── SECTION 5: PUBLICATIONS ───────────────────────────────────
          sectionHeading('5. Evidence for Publication'),
          ...fieldBlock('List of Publications', data.listPublications || 'N/A'),
          ...fieldBlock('Publications/Communications from the Project', '[Refer to attached evidence file]'),

          new Paragraph({ spacing: { after: 240 }, children: [] }),

          // ── FOOTER ────────────────────────────────────────────────────
          new Table({
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.SOLID, color: HEADER_BG },
                    borders: noBorder(),
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 120, after: 60 },
                        children: [
                          new TextRun({ text: 'Designed & Developed by FoC – Software Development Unit (FoC – SDU) © 2025', color: 'BFD7FF', size: 16, font: 'Calibri' }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 120 },
                        children: [
                          new TextRun({ text: 'Need Help: Call Now 011-2802034', color: 'FDE68A', size: 16, font: 'Calibri' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `USJ_Progress_Report_${new Date().toISOString().slice(0, 10)}.docx`);
}
