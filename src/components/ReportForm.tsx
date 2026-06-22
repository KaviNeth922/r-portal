import React, { useState } from 'react';
import { Language, translations } from '../i18n/translations';
import FormSection from './FormSection';
import { generateProgressReportDocx, FormData } from '../utils/generateDocx';

interface ResearchAssistant {
  id: number;
  name: string;
  contact: string;
  pgd: string;
  degree: string;
  dateReg: string;
  regNo: string;
}

interface EquipmentItem {
  id: number;
  name: string;
  datePurchase: string;
  value: string;
  description: string;
}

interface ReportFormProps {
  language: Language;
}

const inputClass = `w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm
  transition-all duration-200 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100
  placeholder-gray-400`;

const labelClass = `block text-sm font-semibold text-gray-700 mb-1.5`;

const FileUploadField: React.FC<{ label: string; t: typeof translations['en']; lang: Language }> = ({ label, t, lang }) => {
  const [fileName, setFileName] = useState('');
  const ff = lang === 'si' ? 'Noto Sans Sinhala, Inter, sans-serif' : 'Inter, sans-serif';
  return (
    <div>
      <label className={labelClass} style={{ fontFamily: ff }}>{label}</label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
          style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 10.5V3.5a1 1 0 011-1h5l3 3v5a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="#2563eb" strokeWidth="1.2" />
            <path d="M8 2.5v3h3" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <a href="#" className="text-blue-600 font-medium underline underline-offset-1" style={{ fontFamily: ff }}>
            {t.existingFile} {t.viewDownload}
          </a>
        </div>
        <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs font-semibold transition-all duration-200"
          style={{ background: '#f1f5f9', border: '1.5px dashed #94a3b8', color: '#475569' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#e2e8f0'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9'; }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 4l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 10.5v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: ff }}>{t.chooseFile}</span>
          <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
        </label>
        <span className="text-xs text-gray-400 italic" style={{ fontFamily: ff }}>
          {fileName || t.noFileChosen}
        </span>
      </div>
    </div>
  );
};

const ReportForm: React.FC<ReportFormProps> = ({ language }) => {
  const t = translations[language];
  const ff = language === 'si' ? 'Noto Sans Sinhala, Inter, sans-serif' : 'Inter, sans-serif';

  // ── State ─────────────────────────────────────────────────────────────────
  const [progressReportNumber] = useState('1');
  const [periodFrom, setPeriodFrom] = useState('2026-09-05');
  const [periodTo, setPeriodTo] = useState('2027-05-10');
  const [projectTitle, setProjectTitle] = useState('Electoral Democracy and Voting Behavior in Sri Lankan Electoral Politics (A Case Study in Selected Three Districts)');
  const [executiveSummary, setExecutiveSummary] = useState('Electoral Democracy and Voting Behavior in Sri Lankan Electoral Politics (A Case Study in Selected Three Districts)');
  const [principalInvestigator, setPrincipalInvestigator] = useState('Prof. K. B. G. S. K. Gamlath');
  const [coInvestigators, setCoInvestigators] = useState('');
  const [dateOfAward, setDateOfAward] = useState('2026-08-04');
  const [dateOfCommencement, setDateOfCommencement] = useState('2026-04-05');
  const [faculty, setFaculty] = useState('Faculty of Humanities and Social Sciences');
  const [department, setDepartment] = useState('Department of Political Science');
  const [numTechAssistants, setNumTechAssistants] = useState('');
  const [objectives, setObjectives] = useState('decline in voter turnout.');
  const [objectivesAchieved, setObjectivesAchieved] = useState('data collection instruments, particularly the structured questionnaire, have been fully developed, refined, translated and adapted for future field deployment.');
  const [deviations, setDeviations] = useState('No');
  const [describeDeviations, setDescribeDeviations] = useState('');
  const [priorApproval, setPriorApproval] = useState('No');
  const [explainNoApproval, setExplainNoApproval] = useState('');
  const [workOnSchedule, setWorkOnSchedule] = useState('Yes');
  const [ifNotReasons, setIfNotReasons] = useState('');
  const [commentsImplementation, setCommentsImplementation] = useState('');
  const [nextWorkPlan, setNextWorkPlan] = useState('');
  const [listPublications, setListPublications] = useState('');
  // Expenditure
  const [personal, setPersonal] = useState('550000');
  const [equipment, setEquipment] = useState('');
  const [consumables, setConsumables] = useState('');
  const [labServices, setLabServices] = useState('');
  const [statisticalAnalysis, setStatisticalAnalysis] = useState('');
  const [calibration, setCalibration] = useState('');
  const [pgRegFee, setPgRegFee] = useState('');
  const [travelSubsistence, setTravelSubsistence] = useState('289050');
  const [miscellaneous, setMiscellaneous] = useState('9500');

  const computeTotal = () => {
    const vals = [personal, equipment, consumables, labServices, statisticalAnalysis, calibration, pgRegFee, travelSubsistence, miscellaneous];
    const sum = vals.reduce((acc, v) => acc + (parseFloat(v.replace(/,/g, '')) || 0), 0);
    return sum > 0 ? sum.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '848,550.00';
  };

  // ── Research Assistants ────────────────────────────────────────────────────
  const [assistants, setAssistants] = useState<ResearchAssistant[]>([
    { id: 1, name: 'R.P.Kavindya Nethranjali', contact: '0768863075', pgd: 'No', degree: 'N/A', dateReg: 'N/A', regNo: 'N/A' },
  ]);

  const addAssistant = () => {
    setAssistants(prev => [...prev, { id: Date.now(), name: '', contact: '', pgd: 'No', degree: '', dateReg: '', regNo: '' }]);
  };
  const removeAssistant = (id: number) => setAssistants(prev => prev.filter(a => a.id !== id));
  const updateAssistant = (id: number, field: keyof ResearchAssistant, value: string) => {
    setAssistants(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  // ── Equipment Items ────────────────────────────────────────────────────────
  const [equipmentItems, setEquipmentItems] = useState<EquipmentItem[]>([]);
  const addEquipmentItem = () => {
    setEquipmentItems(prev => [...prev, { id: Date.now(), name: '', datePurchase: '', value: '', description: '' }]);
  };
  const removeEquipmentItem = (id: number) => setEquipmentItems(prev => prev.filter(e => e.id !== id));
  const updateEquipmentItem = (id: number, field: keyof EquipmentItem, value: string) => {
    setEquipmentItems(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  // ── Save as Word ───────────────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAsWord = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    const formData: FormData = {
      progressReportNumber,
      periodFrom,
      periodTo,
      projectTitle,
      executiveSummary,
      principalInvestigator,
      coInvestigators,
      dateOfAward,
      dateOfCommencement,
      faculty,
      department,
      researchAssistants: assistants.map(a => ({ name: a.name, contact: a.contact, pgd: a.pgd, degree: a.degree, dateReg: a.dateReg, regNo: a.regNo })),
      numTechAssistants,
      objectives,
      objectivesAchieved,
      deviations,
      describeDeviations,
      priorApproval,
      explainNoApproval,
      workOnSchedule,
      ifNotReasons,
      commentsImplementation,
      nextWorkPlan,
      personal,
      equipment,
      consumables,
      labServices,
      statisticalAnalysis,
      calibration,
      pgRegFee,
      travelSubsistence,
      miscellaneous,
      total: computeTotal(),
      equipmentItems: equipmentItems.map(e => ({ name: e.name, datePurchase: e.datePurchase, value: e.value, description: e.description })),
      listPublications,
    };
    try {
      await generateProgressReportDocx(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('DOCX generation error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const SelectField: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; required?: boolean }> = ({ label, value, onChange, options, required }) => (
    <div>
      <label className={labelClass} style={{ fontFamily: ff }}>{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass + ' appearance-none pr-9 cursor-pointer'}
          style={{ fontFamily: ff }}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );

  const TextField: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; rows?: number; type?: string }> = ({ label, value, onChange, placeholder, required, rows, type = 'text' }) => (
    <div>
      <label className={labelClass} style={{ fontFamily: ff }}>{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={inputClass + ' resize-y min-h-[80px]'}
          style={{ fontFamily: ff }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
          style={{ fontFamily: ff }}
        />
      )}
    </div>
  );

  const expendCategories = [
    { key: 'personal', label: t.personal, value: personal, setter: setPersonal },
    { key: 'equipment', label: t.equipment, value: equipment, setter: setEquipment },
    { key: 'consumables', label: t.consumables, value: consumables, setter: setConsumables },
    { key: 'labServices', label: t.labServices, value: labServices, setter: setLabServices },
    { key: 'statisticalAnalysis', label: t.statisticalAnalysis, value: statisticalAnalysis, setter: setStatisticalAnalysis },
    { key: 'calibration', label: t.calibration, value: calibration, setter: setCalibration },
    { key: 'pgRegFee', label: t.pgRegFee, value: pgRegFee, setter: setPgRegFee },
    { key: 'travelSubsistence', label: t.travelSubsistence, value: travelSubsistence, setter: setTravelSubsistence },
    { key: 'miscellaneous', label: t.miscellaneous, value: miscellaneous, setter: setMiscellaneous },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

      {/* ── HERO BANNER ────────────────────────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
        <div className="px-8 py-6 text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #2563eb 100%)' }}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="text-blue-200 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: ff }}>
              {t.researchDetails}
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="#93c5fd" strokeWidth="1.2" />
                <path d="M5 2v2M9 2v2" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M2 7h10" stroke="#93c5fd" strokeWidth="1.2" />
              </svg>
              <span className="text-blue-100 text-sm font-semibold" style={{ fontFamily: ff }}>
                {t.grantAppYear} <span className="text-white font-bold">2026</span>
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2L8.5 5.5H12L9.5 7.5l1 3.5L7 9l-3.5 2 1-3.5L2 5.5h3.5L7 2z" stroke="#fde68a" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <span className="text-blue-100 text-sm font-semibold" style={{ fontFamily: ff }}>
                {t.grantAppNo} <span className="text-white font-bold">RC/URG/HSS/2026/01</span>
              </span>
            </div>
          </div>
        </div>
        {/* Progress indicator */}
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #22c55e 0%, #3b82f6 40%, #e2e8f0 60%)' }} />
      </div>

      {/* ── SECTION 1: PROGRESS REPORT ─────────────────────────────────────── */}
      <FormSection
        title={t.progressReportSection}
        accentColor="#1e40af"
        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 14V9M7 14V6M11 14V3M14 3H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass} style={{ fontFamily: ff }}>{t.progressReportNumber}<span className="text-red-500 ml-0.5">*</span></label>
            <div className={inputClass + ' bg-gray-100 cursor-not-allowed text-gray-500'} style={{ fontFamily: ff, display: 'flex', alignItems: 'center' }}>
              <span className="font-semibold text-blue-700">1</span>
            </div>
          </div>
          <div>
            <label className={labelClass} style={{ fontFamily: ff }}>{t.periodCoveredFrom}<span className="text-red-500 ml-0.5">*</span></label>
            <input type="date" value={periodFrom} onChange={e => setPeriodFrom(e.target.value)} className={inputClass} style={{ fontFamily: ff }} />
          </div>
          <div>
            <label className={labelClass} style={{ fontFamily: ff }}>{t.periodCoveredTo}<span className="text-red-500 ml-0.5">*</span></label>
            <input type="date" value={periodTo} onChange={e => setPeriodTo(e.target.value)} className={inputClass} style={{ fontFamily: ff }} />
          </div>
        </div>
      </FormSection>

      {/* ── SECTION 2: GENERAL INFO ─────────────────────────────────────────── */}
      <FormSection
        title={t.generalInfoSection}
        accentColor="#0891b2"
        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
      >
        <TextField label={t.projectTitle} value={projectTitle} onChange={setProjectTitle} rows={3} required />
        <TextField label={t.executiveSummary} value={executiveSummary} onChange={setExecutiveSummary} rows={3} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField label={t.principalInvestigator} value={principalInvestigator} onChange={setPrincipalInvestigator} required />
          <TextField label={t.coInvestigators} value={coInvestigators} onChange={setCoInvestigators} placeholder="Separate by comma" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} style={{ fontFamily: ff }}>{t.dateOfAward}<span className="text-red-500 ml-0.5">*</span></label>
            <input type="date" value={dateOfAward} onChange={e => setDateOfAward(e.target.value)} className={inputClass} style={{ fontFamily: ff }} />
          </div>
          <div>
            <label className={labelClass} style={{ fontFamily: ff }}>{t.dateOfCommencement}<span className="text-red-500 ml-0.5">*</span></label>
            <input type="date" value={dateOfCommencement} onChange={e => setDateOfCommencement(e.target.value)} className={inputClass} style={{ fontFamily: ff }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectField
            label={t.faculty}
            value={faculty}
            onChange={setFaculty}
            required
            options={[
              { value: 'Faculty of Humanities and Social Sciences', label: t.facultyHSS },
              { value: 'Faculty of Medicine', label: 'Faculty of Medicine' },
              { value: 'Faculty of Science', label: 'Faculty of Science' },
              { value: 'Faculty of Management Studies and Commerce', label: 'Faculty of Management Studies and Commerce' },
              { value: 'Faculty of Applied Sciences', label: 'Faculty of Applied Sciences' },
              { value: 'Faculty of Engineering', label: 'Faculty of Engineering' },
            ]}
          />
          <SelectField
            label={t.department}
            value={department}
            onChange={setDepartment}
            required
            options={[
              { value: 'Department of Political Science', label: t.deptPoliticalScience },
              { value: 'Department of Economics', label: 'Department of Economics' },
              { value: 'Department of History', label: 'Department of History' },
              { value: 'Department of Languages', label: 'Department of Languages' },
              { value: 'Department of Sociology', label: 'Department of Sociology' },
            ]}
          />
        </div>
      </FormSection>

      {/* ── SECTION 3: RESEARCH ASSISTANTS ─────────────────────────────────── */}
      <FormSection
        title={t.researchStudentsSection}
        accentColor="#7c3aed"
        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M1 13c0-2.5 2.24-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M13 8.5c1.5.5 2.5 2 2.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-xl" style={{ border: '1px solid #e2e8f0' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #1e3a5f, #1e40af)' }}>
                {[t.raName, t.raContact, t.raPGD, t.raDegree, t.raDateReg, t.raRegNo, t.raAction].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-white text-xs font-semibold tracking-wide" style={{ fontFamily: ff }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assistants.map((a, idx) => (
                <tr key={a.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f8faff' }}>
                  {(['name', 'contact'] as const).map(field => (
                    <td key={field} className="px-2 py-2">
                      <input
                        type="text"
                        value={a[field]}
                        onChange={e => updateAssistant(a.id, field, e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                        style={{ fontFamily: ff }}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2">
                    <select value={a.pgd} onChange={e => updateAssistant(a.id, 'pgd', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-blue-400"
                      style={{ fontFamily: ff }}>
                      <option value="Yes">{t.yes}</option>
                      <option value="No">{t.no}</option>
                    </select>
                  </td>
                  {(['degree', 'dateReg', 'regNo'] as const).map(field => (
                    <td key={field} className="px-2 py-2">
                      <input
                        type="text"
                        value={a[field]}
                        onChange={e => updateAssistant(a.id, field, e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                        style={{ fontFamily: ff }}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center">
                    <button onClick={() => removeAssistant(a.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-all duration-200 hover:scale-110"
                      style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 3h8M5 3V2h2v1M4.5 5v4M7.5 5v4M3 3l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {assistants.map((a, idx) => (
            <div key={a.id} className="p-4 rounded-xl border border-gray-200 space-y-3" style={{ background: idx % 2 === 0 ? '#fff' : '#f8faff' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-blue-700" style={{ fontFamily: ff }}>Assistant #{idx + 1}</span>
                <button onClick={() => removeAssistant(a.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: '#fee2e2', color: '#dc2626' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M5 3V2h2v1M3 3l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                </button>
              </div>
              {([['name', t.raName], ['contact', t.raContact], ['degree', t.raDegree], ['dateReg', t.raDateReg], ['regNo', t.raRegNo]] as [keyof ResearchAssistant, string][]).map(([field, label]) => (
                <div key={field}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1" style={{ fontFamily: ff }}>{label}</label>
                  <input type="text" value={a[field] as string} onChange={e => updateAssistant(a.id, field, e.target.value)}
                    className={inputClass + ' text-xs'} style={{ fontFamily: ff }} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <button onClick={addAssistant}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 mt-3"
          style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: 'white', boxShadow: '0 4px 12px rgba(37,99,235,0.3)', fontFamily: ff }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.3" />
            <path d="M8 5v6M5 8h6" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {t.addResearchAssistant}
        </button>

        <TextField label={t.numTechAssistants} value={numTechAssistants} onChange={setNumTechAssistants} />
      </FormSection>

      {/* ── SECTION 4: PROJECT DETAILS ──────────────────────────────────────── */}
      <FormSection
        title={t.projectDetailsSection}
        accentColor="#059669"
        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12V4a1 1 0 011-1h5l3 3v6a1 1 0 01-1 1H4a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.3" /><path d="M9 3v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M5 9h4M5 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
      >
        <TextField label={t.objectives} value={objectives} onChange={setObjectives} rows={3} required />
        <TextField label={t.objectivesAchieved} value={objectivesAchieved} onChange={setObjectivesAchieved} rows={4} required />

        <FileUploadField label={t.descriptionResearch} t={t} lang={language} />
        <FileUploadField label={t.resultsObservations} t={t} lang={language} />
        <FileUploadField label={t.ganttChart} t={t} lang={language} />

        <SelectField
          label={t.deviationsWorkPlan}
          value={deviations}
          onChange={setDeviations}
          required
          options={[{ value: 'No', label: t.no }, { value: 'Yes', label: t.yes }]}
        />
        <TextField label={t.describeDeviations} value={describeDeviations} onChange={setDescribeDeviations} rows={3}
          placeholder={language === 'si' ? 'N/A' : 'N/A – No deviations'} />

        <SelectField
          label={t.priorApproval}
          value={priorApproval}
          onChange={setPriorApproval}
          required
          options={[{ value: 'No', label: t.no }, { value: 'Yes', label: t.yes }]}
        />
        <TextField label={t.explainNoApproval} value={explainNoApproval} onChange={setExplainNoApproval} rows={3}
          placeholder="N/A" />
      </FormSection>

      {/* ── SECTION 5: PROJECT EXPENDITURE ─────────────────────────────────── */}
      <FormSection
        title={t.projectExpenditureSection}
        accentColor="#d97706"
        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" /></svg>}
      >
        <SelectField
          label={t.workOnSchedule}
          value={workOnSchedule}
          onChange={setWorkOnSchedule}
          required
          options={[{ value: 'Yes', label: t.yes }, { value: 'No', label: t.no }]}
        />
        <TextField label={t.ifNotReasons} value={ifNotReasons} onChange={setIfNotReasons} rows={3} placeholder="N/A" />

        {/* Equipment Table */}
        <div>
          <label className={labelClass} style={{ fontFamily: ff }}>{t.equipmentPurchased}</label>
          <div className="overflow-x-auto rounded-xl mb-3" style={{ border: '1px solid #e2e8f0' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #1e3a5f, #1e40af)' }}>
                  {[t.eqName, t.eqDatePurchase, t.eqValue, t.eqDescription, t.eqAction].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-white text-xs font-semibold" style={{ fontFamily: ff }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {equipmentItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400 text-xs italic" style={{ fontFamily: ff }}>
                      No items added yet. Click "+ Add Another Item" below.
                    </td>
                  </tr>
                ) : equipmentItems.map((item, idx) => (
                  <tr key={item.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f8faff' }}>
                    {(['name', 'datePurchase', 'value', 'description'] as const).map(field => (
                      <td key={field} className="px-2 py-2">
                        <input type={field === 'datePurchase' ? 'date' : 'text'} value={item[field]}
                          onChange={e => updateEquipmentItem(item.id, field, e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100"
                          style={{ fontFamily: ff }} />
                      </td>
                    ))}
                    <td className="px-2 py-2 text-center">
                      <button onClick={() => removeEquipmentItem(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-all duration-200 hover:scale-110"
                        style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 3h8M5 3V2h2v1M3 3l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addEquipmentItem}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: 'white', boxShadow: '0 4px 12px rgba(217,119,6,0.3)', fontFamily: ff }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.3" />
              <path d="M7 4.5v5M4.5 7h5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {t.addItem}
          </button>
        </div>

        <FileUploadField label={t.interimFinancial} t={t} lang={language} />
        <TextField label={t.commentsImplementation} value={commentsImplementation} onChange={setCommentsImplementation} rows={3} placeholder="N/A" />
        <TextField label={t.nextWorkPlan} value={nextWorkPlan} onChange={setNextWorkPlan} rows={4} placeholder={t.nextWorkPlanPlaceholder} required />

        {/* Expenditure Table */}
        <div>
          <label className={`${labelClass} text-base`} style={{ fontFamily: ff }}>{t.projectedExpenditure}</label>
          <div className="overflow-x-auto rounded-xl mt-2" style={{ border: '1px solid #e2e8f0' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #1e3a5f, #1e40af)' }}>
                  <th className="px-4 py-3 text-left text-white text-xs font-semibold" style={{ fontFamily: ff, width: '65%' }}>{t.category}</th>
                  <th className="px-4 py-3 text-right text-white text-xs font-semibold" style={{ fontFamily: ff, width: '35%' }}>{t.amountRs}</th>
                </tr>
              </thead>
              <tbody>
                {expendCategories.map(({ key, label, value, setter }, idx) => (
                  <tr key={key} style={{ background: idx % 2 === 0 ? '#fff' : '#f8faff' }}>
                    <td className="px-4 py-2.5 text-sm text-gray-700" style={{ fontFamily: ff }}>{label}</td>
                    <td className="px-3 py-2 text-right">
                      <input type="number" value={value} onChange={e => setter(e.target.value)} placeholder="0"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white text-right outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 font-medium"
                        style={{ fontFamily: ff }} />
                    </td>
                  </tr>
                ))}
                <tr style={{ background: '#1e3a5f' }}>
                  <td className="px-4 py-3 text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: ff }}>{t.total}</td>
                  <td className="px-4 py-3 text-white font-bold text-sm text-right" style={{ fontFamily: ff }}>
                    Rs. {computeTotal()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </FormSection>

      {/* ── SECTION 6: EVIDENCE FOR PUBLICATION ────────────────────────────── */}
      <FormSection
        title={t.evidencePublicationSection}
        accentColor="#be185d"
        icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13V3a1 1 0 011-1h6l3 3v8a1 1 0 01-1 1H4a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.3" /><path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M5 9h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>}
      >
        <TextField
          label={t.listPublications}
          value={listPublications}
          onChange={setListPublications}
          rows={4}
          placeholder={t.publicationsPlaceholder}
        />
        <FileUploadField label={t.publicationsCommunications} t={t} lang={language} />
      </FormSection>

      {/* ── ACTION BUTTONS ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-2">
        {/* Return Button */}
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: '#f1f5f9', border: '1.5px solid #cbd5e1', color: '#475569', fontFamily: ff }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.returnToGrantDetails}
        </button>

        {/* Success Toast */}
        {saveSuccess && (
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold animate-pulse"
            style={{ background: '#dcfce7', border: '1.5px solid #86efac', color: '#166534', fontFamily: ff }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" fill="#22c55e" />
              <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.savedSuccess}
          </div>
        )}

        {/* Save as Word */}
        <button
          onClick={handleSaveAsWord}
          disabled={isSaving}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          style={{
            background: isSaving ? '#94a3b8' : 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)',
            color: 'white',
            boxShadow: isSaving ? 'none' : '0 6px 20px rgba(30,64,175,0.4)',
            fontFamily: ff,
            minWidth: '200px'
          }}>
          {isSaving ? (
            <>
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="2" width="11" height="14" rx="1.5" stroke="white" strokeWidth="1.5" />
                <path d="M8 2v16M3 8h8" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M14 10l3.5 3.5M14 13.5L17.5 10" stroke="#93c5fd" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M13 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M15.5 13v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {t.saveAsWord}
            </>
          )}
        </button>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <div className="mt-4 py-5 text-center border-t border-gray-200">
        <p className="text-xs text-gray-400" style={{ fontFamily: ff }}>
          {t.designedBy}{' '}
          <span className="font-semibold text-gray-600">{t.devUnit}</span> © 2025
        </p>
        <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: ff }}>
          {t.needHelp}: <a href={`tel:${t.phone}`} className="text-blue-500 hover:text-blue-700 font-medium transition-colors">{t.phone}</a>
        </p>
      </div>
    </div>
  );
};

export default ReportForm;
