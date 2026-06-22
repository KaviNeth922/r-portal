/* ═══════════════════════════════════════════════════════
   USJ RESEARCHER PORTAL — app.js
   Works 100% client-side. No server needed. GitHub Pages ready.
═══════════════════════════════════════════════════════ */

'use strict';

// ─── 1. LIVE DATE/TIME ────────────────────────────────
function updateDateTime() {
  const el = document.getElementById('nav-datetime');
  if (!el) return;
  const now  = new Date();
  const opts = { day:'2-digit', month:'2-digit', year:'numeric',
                 hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true };
  el.textContent = now.toLocaleString('en-GB', opts);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ─── 2. LANGUAGE SYSTEM ──────────────────────────────
let currentLang = localStorage.getItem('usj-lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('usj-lang', lang);

  // Update all [data-en] / [data-si] elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang) || '';
  });

  // Update button active states
  const btnEn = document.getElementById('btn-en');
  const btnSi = document.getElementById('btn-si');
  if (btnEn && btnSi) {
    btnEn.classList.toggle('active', lang === 'en');
    btnSi.classList.toggle('active', lang === 'si');
  }

  // Update html lang attribute
  document.getElementById('html-root')?.setAttribute('lang', lang === 'si' ? 'si' : 'en');
}

// Apply saved language on load
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});

// ─── 3. TOGGLE HELPERS ───────────────────────────────
function toggleDeviation() {
  const val = document.getElementById('deviations')?.value;
  const grp = document.getElementById('deviation-desc-group');
  if (grp) grp.style.display = (val === 'Yes') ? 'block' : 'none';
}

function toggleApprovalReason() {
  const val = document.getElementById('prior-approval')?.value;
  const grp = document.getElementById('approval-reason-group');
  if (grp) grp.style.display = (val === 'No') ? 'block' : 'none';
}

function toggleScheduleReason() {
  const val = document.getElementById('on-schedule')?.value;
  const grp = document.getElementById('schedule-reason-group');
  if (grp) grp.style.display = (val === 'No') ? 'block' : 'none';
}

function togglePassword() {
  const inp  = document.getElementById('password');
  const icon = document.getElementById('eye-icon');
  if (!inp) return;
  const isPass = inp.type === 'password';
  inp.type = isPass ? 'text' : 'password';
  if (icon) {
    icon.classList.toggle('fa-eye',      !isPass);
    icon.classList.toggle('fa-eye-slash', isPass);
  }
}

// ─── 4. FILE INPUT DISPLAY ───────────────────────────
document.addEventListener('change', function(e) {
  if (e.target.type !== 'file') return;
  const nameSpan = e.target.nextElementSibling?.nextElementSibling;
  if (nameSpan && nameSpan.classList.contains('file-name')) {
    nameSpan.textContent = e.target.files[0]?.name || 'No file chosen';
  }
});

// ─── 5. EXPENDITURE AUTO-TOTAL ───────────────────────
function calcTotal() {
  const ids = ['exp-personal','exp-equipment','exp-consumables',
               'exp-lab','exp-stats','exp-calib','exp-pgfee',
               'exp-travel','exp-misc'];
  let total = 0;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) total += parseFloat(el.value) || 0;
  });
  const totalEl = document.getElementById('exp-total');
  if (totalEl) totalEl.value = total.toLocaleString('en-LK', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });
}
// Run on load to set initial total
document.addEventListener('DOMContentLoaded', calcTotal);

// ─── 6. DYNAMIC TABLE — RESEARCH ASSISTANTS ──────────
function addAssistantRow() {
  const tbody = document.getElementById('assistants-tbody');
  if (!tbody) return;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" placeholder="Full Name"></td>
    <td><input type="text" placeholder="Phone / Email"></td>
    <td>
      <select>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    </td>
    <td><input type="text" placeholder="e.g. MSc, PhD"></td>
    <td><input type="date"></td>
    <td><input type="text" placeholder="Reg No."></td>
    <td>
      <button type="button" class="btn-delete" onclick="deleteRow(this)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>`;
  tbody.appendChild(row);
}

// ─── 7. DYNAMIC TABLE — EQUIPMENT ────────────────────
function addEquipmentRow() {
  const tbody = document.getElementById('equipment-tbody');
  if (!tbody) return;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" placeholder="Item name"></td>
    <td><input type="date"></td>
    <td><input type="number" placeholder="0.00"></td>
    <td><input type="text" placeholder="Description"></td>
    <td>
      <button type="button" class="btn-delete" onclick="deleteRow(this)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>`;
  tbody.appendChild(row);
}

function deleteRow(btn) {
  btn.closest('tr').remove();
}

// ─── 8. LOGIN HANDLER ────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const u = document.getElementById('username')?.value.trim();
  const p = document.getElementById('password')?.value.trim();
  if (!u || !p) {
    alert(currentLang === 'si'
      ? 'කරුණාකර පරිශීලක නාමය සහ මුරපදය ඇතුළු කරන්න.'
      : 'Please enter your username and password.');
    return;
  }
  window.location.href = 'portal.html';
}

// ─── 9. COLLECT ASSISTANTS TABLE DATA ────────────────
function getAssistantsData() {
  const rows = document.querySelectorAll('#assistants-tbody tr');
  const data = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 6) {
      data.push({
        name:    cells[0].querySelector('input')?.value   || '',
        contact: cells[1].querySelector('input')?.value   || '',
        pgd:     cells[2].querySelector('select')?.value  || '',
        degree:  cells[3].querySelector('input')?.value   || '',
        date:    cells[4].querySelector('input')?.value   || '',
        regNo:   cells[5].querySelector('input')?.value   || ''
      });
    }
  });
  return data;
}

// ─── 10. COLLECT EQUIPMENT TABLE DATA ────────────────
function getEquipmentData() {
  const rows = document.querySelectorAll('#equipment-tbody tr');
  const data = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 4) {
      data.push({
        name:  cells[0].querySelector('input')?.value || '',
        date:  cells[1].querySelector('input')?.value || '',
        value: cells[2].querySelector('input')?.value || '',
        desc:  cells[3].querySelector('input')?.value || ''
      });
    }
  });
  return data;
}

// ─── 11. SAVE AS WORD FILE (.docx) ───────────────────
async function saveAsWord() {
  // ── Guard: check libraries loaded globally ──
  if (typeof docx === 'undefined') {
    alert('The Word document library failed to load. Please check your internet connection.');
    return;
  }
  if (typeof saveAs === 'undefined') {
    alert('The FileSaver library failed to load. Please check your internet connection.');
    return;
  }

  // UI Feedback
  const btn = document.querySelector('.btn-save-word');
  const originalText = btn ? btn.innerHTML : 'Save as Word File';
  if (btn) {
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Generating...</span>`;
    btn.disabled = true;
  }

  try {
    const {
      Document, Packer, Paragraph, TextRun, Table, TableRow,
      TableCell, WidthType, AlignmentType, HeadingLevel,
      BorderStyle, ShadingType, Header, Footer
    } = docx;

    // ── Helper: section heading ──
    const sectionHead = (text) => new Paragraph({
      children: [new TextRun({
        text, bold: true, size: 26, color: '1a6b3c', font: 'Calibri'
      })],
      spacing: { before: 300, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '1a6b3c' } }
    });

    // ── Helper: label + value row ──
    const field = (label, value) => new Paragraph({
      children: [
        new TextRun({ text: label + ': ', bold: true, size: 22, font: 'Calibri' }),
        new TextRun({ text: value || 'N/A',   size: 22, font: 'Calibri' })
      ],
      spacing: { after: 80 }
    });

    // ── Helper: get file name ──
    const getFileName = (id) => {
      const fileInput = document.getElementById(id);
      if (fileInput && fileInput.files.length > 0) {
        return "Attached File: " + fileInput.files[0].name;
      }
      return 'No file attached';
    };

    // ── Helper: table with header row ──
    const makeTable = (headers, rows) => new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: headers.map(h => new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 20, font: 'Calibri' })]
            })],
            shading: { type: ShadingType.CLEAR, fill: '1A1A2E' },
            margins: { top: 80, bottom: 80, left: 120, right: 120 }
          }))
        }),
        ...rows.map(r => new TableRow({
          children: r.map(cell => new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: cell, size: 20, font: 'Calibri' })]
            })],
            margins: { top: 60, bottom: 60, left: 120, right: 120 }
          }))
        }))
      ]
    });

    // ── Collect all form data ──
    const gv = (id) => document.getElementById(id)?.value || '';

    const assistants = getAssistantsData();
    const equipment  = getEquipmentData();

    const assistantRows = assistants.map(a => [
      a.name, a.contact, a.pgd, a.degree, a.date, a.regNo
    ]);
    if (assistantRows.length === 0) assistantRows.push(['—','—','—','—','—','—']);

    const equipRows = equipment.map(e => [e.name, e.date, e.value, e.desc]);
    if (equipRows.length === 0) equipRows.push(['—','—','—','—']);

    // ── Build Document ──
    const doc = new Document({
      creator:     'USJ Research Council Portal',
      title:       'Progress Report — ' + gv('project-title'),
      description: 'Generated by USJ Researcher Portal',
      styles: {
        default: {
          document: {
            run: { font: 'Calibri', size: 22, color: '1a1a2e' }
          }
        }
      },
      sections: [{
        properties: {
          page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } }
        },
        headers: {
          default: new Header({
            children: [new Paragraph({
              children: [
                new TextRun({
                  text: 'USJ – Research Council – Researcher Portal | Progress Report',
                  bold: true, size: 18, color: '1a6b3c', font: 'Calibri'
                })
              ],
              alignment: AlignmentType.CENTER,
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' } }
            })]
          })
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              children: [
                new TextRun({
                  text: 'Designed & Developed by FoC – Software Development Unit (FoC – SDU) © 2026 | Need Help: 011-2802034',
                  size: 16, color: '888888', font: 'Calibri'
                })
              ],
              alignment: AlignmentType.CENTER
            })]
          })
        },
        children: [

          // ── TITLE ──
          new Paragraph({
            children: [new TextRun({
              text: 'PROGRESS REPORT', bold: true, size: 48,
              color: '1a6b3c', font: 'Calibri'
            })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 }
          }),
          new Paragraph({
            children: [new TextRun({
              text: 'University of Sri Jayewardenepura – Research Council',
              size: 24, color: '555555', font: 'Calibri'
            })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 }
          }),
          new Paragraph({
            children: [new TextRun({
              text: 'Grant Application Year: 2026  |  Grant Application No: RC/URG/HSS/2026/01',
              size: 22, bold: true, color: '333333', font: 'Calibri'
            })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 360 }
          }),

          // ── SECTION 1: Progress Report Details ──
          sectionHead('1. Details of Progress Report'),
          field('Progress Report Number', gv('report-number')),
          field('Period Covered: From',   gv('period-from')),
          field('Period Covered: To',     gv('period-to')),

          // ── SECTION 2: General Information ──
          sectionHead('2. Details of General Information'),
          field('Title of the Project',         gv('project-title')),
          field('Executive Summary',            gv('exec-summary')),
          field('Principal Investigator',       gv('principal-inv')),
          field('Co-Investigators',             gv('co-inv') || 'N/A'),
          field('Date of Award',                gv('date-award')),
          field('Date of Commencement',         gv('date-commence')),
          field('Faculty',                      gv('faculty')),
          field('Department',                   gv('department')),

          // ── SECTION 3: Research Assistants ──
          sectionHead('3. Research Students/Assistants Employed'),
          makeTable(
            ['Name','Contact','PGD Status','Degree','Date of Reg','Reg No'],
            assistantRows
          ),
          new Paragraph({ spacing: { after: 100 } }),
          field('Number of Technical Assistants/Labourers', gv('tech-assistants') || '0'),

            // ── SECTION 4: Project Details ──
          sectionHead('4. Details of the Project'),
          field('Objectives of the project',                        gv('objectives')),
          field('Objectives achieved to date',                      gv('obj-achieved')),
          field('Description of research carried out',              getFileName('file-description')),
          field('Results/Observations/Outputs',                     getFileName('file-results')),
          field('Gantt chart for work done',                        getFileName('file-gantt')),
          field('Are there any deviations in the work plan when compared to the original?', gv('deviations')),
          field('Please describe the deviations',                   gv('deviation-desc') || 'N/A'),
          field('Did you obtain prior approval from the Research Council for the deviations?', gv('prior-approval')),
          field('Please explain why approval was not obtained',     gv('approval-reason') || 'N/A'),

          // ── SECTION 5: Project Expenditure ──
          sectionHead('5. Project Expenditure'),
          field('Is the work on schedule?', gv('on-schedule')),
          field('If not give reasons', gv('schedule-reason') || 'N/A'),

          new Paragraph({
            children: [new TextRun({
              text: 'List major items of equipment purchased during the reporting period:', bold: true, size: 22, font: 'Calibri'
            })],
            spacing: { before: 120, after: 80 }
          }),
          makeTable(
            ['Name','Date of Purchase','Value (Rs.)','Description'],
            equipRows
          ),
          new Paragraph({ spacing: { after: 160 } }),
          
          field('Please provide the Interim Financial Statement issued by the Bursar of the faculty', getFileName('file-financial')),
          field('Comments regarding project implementation, if any', gv('impl-comments') || 'N/A'),
          field('Submit a brief work plan for the next 06 months',    gv('work-plan')),

          new Paragraph({
            children: [new TextRun({
              text: 'Give projected expenditure for the next 6 months (Rs.)i.e. grantee’s estimate:', bold: true, size: 22, font: 'Calibri'
            })],
            spacing: { before: 120, after: 80 }
          }),
          makeTable(
            ['Category','Amount (Rs.)'],
            [
              ['Personal',                      gv('exp-personal')    || '0'],
              ['Equipment',                     gv('exp-equipment')   || '0'],
              ['Consumables',                   gv('exp-consumables') || '0'],
              ['Lab Services & Sample Analysis',gv('exp-lab')         || '0'],
              ['Statistical Analysis',          gv('exp-stats')       || '0'],
              ['Calibration of Instruments',    gv('exp-calib')       || '0'],
              ['Post-Graduate Registration Fee',gv('exp-pgfee')       || '0'],
              ['Travel and Subsistence',        gv('exp-travel')      || '0'],
              ['Miscellaneous',                 gv('exp-misc')        || '0'],
              ['TOTAL',                         gv('exp-total')       || '0']
            ]
          ),
          new Paragraph({ spacing: { after: 120 } }),

          // ── SECTION 6: Evidence for Publication ──
          sectionHead('6. Evidence for Publication'),
          field('List of Publications', gv('publications') || 'N/A'),
          field('Publications/Communications Evidence', getFileName('file-publications')),

          // ── CLOSING ──
          new Paragraph({ spacing: { before: 400 } }),
          new Paragraph({
            children: [new TextRun({
              text: 'Generated by USJ Researcher Portal — ' + new Date().toLocaleString(),
              size: 16, color: 'AAAAAA', italics: true, font: 'Calibri'
            })],
            alignment: AlignmentType.CENTER
          })

        ]
      }]
    });

    // ── Pack and Save ──
    const blob = await Packer.toBlob(doc);
    const filename = `USJ_Progress_Report_${gv('report-number') || '1'}_${Date.now()}.docx`;
    window.saveAs(blob, filename);

  } catch (err) {
    console.error('DOCX generation error:', err);
    alert('Error generating document. Please check the browser console for details.');
  } finally {
    // Revert button state
    if (btn) {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
}