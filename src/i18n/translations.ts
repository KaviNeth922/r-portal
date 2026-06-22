export type Language = 'en' | 'si';

export const translations = {
  en: {
    // Login Page
    portalTitle: 'Researcher Portal',
    researchCouncil: 'Research Council',
    university: 'University of Sri Jayewardenepura',
    loginPrompt: 'If you are already registered please login. If not',
    signUpNow: 'sign up now',
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot? Reset Now',
    signIn: 'Sign In',
    designedBy: 'Designed & Developed by',
    devUnit: 'FoC – Software Development Unit (FoC – SDU)',
    needHelp: 'Need Help: Call Now',
    phone: '011-2802034',

    // Navbar
    greetingPrefix: 'Good Morning',
    navHome: 'Home',
    navGrantDetails: 'Grant Details',
    navSubmitReport: 'Submit Progress Report',
    logout: 'Logout',

    // Section Titles
    researchDetails: 'Research Details',
    grantAppYear: 'Grant Application Year:',
    grantAppNo: 'Grant Application No:',
    progressReportSection: 'Details of Progress Report',
    generalInfoSection: 'Details of General Information',
    researchStudentsSection: 'Details of Research Students/Assistants Employed',
    projectDetailsSection: 'Details of the Project',
    projectExpenditureSection: 'Project Expenditure',
    evidencePublicationSection: 'Evidence for Publication',

    // Progress Report Fields
    progressReportNumber: 'Progress Report-Number',
    periodCoveredFrom: 'Period Covered: From',
    periodCoveredTo: 'Period Covered: To',

    // General Info Fields
    projectTitle: 'Title of the project',
    executiveSummary: 'Executive summary of the project',
    principalInvestigator: 'Principal investigator (Rev./Prof./Dr./Ms./Mr.)',
    coInvestigators: 'Co-investigators (Separate by Comma)',
    dateOfAward: 'Date of award',
    dateOfCommencement: 'Date of commencement of the project',
    faculty: 'Faculty',
    department: 'Department',

    // Research Assistants Table
    raName: 'Name',
    raContact: 'Contact Details',
    raPGD: 'PGD Status',
    raDegree: 'Specify the Degree',
    raDateReg: 'Date of Reg',
    raRegNo: 'Reg No',
    raAction: 'Action',
    addResearchAssistant: '+ Add Another Research Assistant',
    numTechAssistants: 'Number of technical assistants/labourers employed',

    // Project Details Fields
    objectives: 'Objectives of the project',
    objectivesAchieved: 'Objectives achieved to date',
    descriptionResearch: 'Description of research carried out during the reporting period',
    resultsObservations: 'Results/Observations/Outputs (in detail)',
    ganttChart: 'Gantt chart for work done',
    deviationsWorkPlan: 'Are there any deviations in the work plan when compared to the original?',
    describeDeviations: 'Please describe the deviations (If No for the above please type N/A)',
    priorApproval: 'Did you obtain prior approval from the Research Council for the deviations?',
    explainNoApproval: 'Please explain why approval was not obtained (If No for the above please type N/A)',
    existingFile: 'Existing file:',
    viewDownload: 'View/Download',
    chooseFile: 'Choose File',
    noFileChosen: 'No file chosen',

    // Expenditure Fields
    workOnSchedule: 'Is the work on schedule?',
    ifNotReasons: 'If not, give reasons (If Yes for the above please type N/A)',
    equipmentPurchased: 'List major items of equipment purchased during the reporting period',
    interimFinancial: 'Please provide the Interim Financial Statement issued by the Bursar of the faculty',
    commentsImplementation: 'Comments regarding project implementation, if any',
    nextWorkPlan: 'Submit a brief work plan for the next 06 months',
    nextWorkPlanPlaceholder: 'Please type brief work plan for the next 06 months',
    projectedExpenditure: 'Give projected expenditure for the next 6 months (Rs.) i.e. grantee\'s estimate:',

    // Equipment Table
    eqName: 'Name',
    eqDatePurchase: 'Date of Purchase',
    eqValue: 'Value',
    eqDescription: 'Description',
    eqAction: 'Action',
    addItem: '+ Add Another Item',

    // Expenditure Categories
    personal: 'Personal',
    equipment: 'Equipment',
    consumables: 'Consumables',
    labServices: 'Lab services and sample analysis',
    statisticalAnalysis: 'Statistical analysis',
    calibration: 'Calibration of instruments',
    pgRegFee: 'Post-Graduate Registration Fee',
    travelSubsistence: 'Travel and subsistence',
    miscellaneous: 'Miscellaneous',
    total: 'Total',
    category: 'Category',
    amountRs: 'Amount (Rs.)',

    // Publications
    listPublications: 'List of Publications',
    publicationsPlaceholder: 'Please type list of publications',
    publicationsCommunications: 'Publications/Communications arising from the project during the reporting period (Please provide evidence)',

    // Buttons
    saveAsWord: 'Save as Word File',
    returnToGrantDetails: 'Return to Grant Details',

    // Yes/No options
    yes: 'Yes',
    no: 'No',

    // Dropdowns
    selectFaculty: 'Select Faculty',
    selectDepartment: 'Select Department',
    facultyHSS: 'Faculty of Humanities and Social Sciences',
    deptPoliticalScience: 'Department of Political Science',

    // Language Toggle
    switchLanguage: 'සිංහල',

    // Alerts
    savedSuccess: 'Report saved successfully!',
    docxGenerating: 'Generating Word document...',
  },

  si: {
    // Login Page
    portalTitle: 'පර්යේෂක ද්වාරය',
    researchCouncil: 'පර්යේෂණ මණ්ඩලය',
    university: 'ශ්‍රී ජයවර්ධනේපුර විශ්වවිද්‍යාලය',
    loginPrompt: 'ඔබ දැනටමත් ලියාපදිංචි වී ඇත්නම් පිවිසෙන්න. නැතිනම්',
    signUpNow: 'දැන් ලියාපදිංචි වන්න',
    username: 'පරිශීලක නාමය',
    password: 'මුරපදය',
    forgotPassword: 'අමතක වුණා ද? දැන් යළි පිහිටුවන්න',
    signIn: 'පිවිසෙන්න',
    designedBy: 'සැලසුම් කර සංවර්ධනය කරන ලද්දේ',
    devUnit: 'FoC – මෘදුකාංග සංවර්ධන ඒකකය (FoC – SDU)',
    needHelp: 'උදවු අවශ්‍යද: දැන් අමතන්න',
    phone: '011-2802034',

    // Navbar
    greetingPrefix: 'සුභ උදෑසනක්',
    navHome: 'මුල් පිටුව',
    navGrantDetails: 'ප්‍රදාන විස්තර',
    navSubmitReport: 'ප්‍රගති වාර්තාව ඉදිරිපත් කරන්න',
    logout: 'පිටවෙන්න',

    // Section Titles
    researchDetails: 'පර්යේෂණ විස්තර',
    grantAppYear: 'ප්‍රදාන අයදුම් කිරීමේ වර්ෂය:',
    grantAppNo: 'ප්‍රදාන අයදුම් අංකය:',
    progressReportSection: 'ප්‍රගති වාර්තාවේ විස්තර',
    generalInfoSection: 'සාමාන්‍ය තොරතුරු විස්තර',
    researchStudentsSection: 'නියුක්ත පර්යේෂණ සිසුන්/සහායකයින් විස්තර',
    projectDetailsSection: 'ව්‍යාපෘතියේ විස්තර',
    projectExpenditureSection: 'ව්‍යාපෘති වියදම්',
    evidencePublicationSection: 'ප්‍රකාශනය සඳහා සාක්ෂි',

    // Progress Report Fields
    progressReportNumber: 'ප්‍රගති වාර්තා අංකය',
    periodCoveredFrom: 'ආවරණය කළ කාලය: සිට',
    periodCoveredTo: 'ආවරණය කළ කාලය: දක්වා',

    // General Info Fields
    projectTitle: 'ව්‍යාපෘතියේ මාතෘකාව',
    executiveSummary: 'ව්‍යාපෘතියේ විධායක සාරාංශය',
    principalInvestigator: 'ප්‍රධාන පර්යේෂක (Rev./Prof./Dr./Ms./Mr.)',
    coInvestigators: 'සහ-පර්යේෂකයින් (කොමාවෙන් වෙන් කරන්න)',
    dateOfAward: 'ප්‍රදානය කළ දිනය',
    dateOfCommencement: 'ව්‍යාපෘතිය ආරම්භ කළ දිනය',
    faculty: 'පීඨය',
    department: 'දෙපාර්තමේන්තුව',

    // Research Assistants Table
    raName: 'නම',
    raContact: 'සම්බන්ධතා විස්තර',
    raPGD: 'PGD තත්ත්වය',
    raDegree: 'උපාධිය සඳහන් කරන්න',
    raDateReg: 'ලියාපදිංචි දිනය',
    raRegNo: 'ලියාපදිංචි අංකය',
    raAction: 'ක්‍රියාව',
    addResearchAssistant: '+ තවත් පර්යේෂණ සහායකයෙකු එකතු කරන්න',
    numTechAssistants: 'නියුක්ත තාක්ෂණික සහායකයින්/කම්කරුවන් සංඛ්‍යාව',

    // Project Details Fields
    objectives: 'ව්‍යාපෘතියේ අරමුණු',
    objectivesAchieved: 'මේ දක්වා සාක්ෂාත් කළ අරමුණු',
    descriptionResearch: 'වාර්තා කිරීමේ කාලය තුළ සිදු කළ පර්යේෂණ විස්තරය',
    resultsObservations: 'ප්‍රතිඵල/නිරීක්ෂණ/ප්‍රතිදාන (විස්තරාත්මකව)',
    ganttChart: 'සිදු කළ කාර්ය සඳහා ගාන්ට් සටහන',
    deviationsWorkPlan: 'මුල් සැලැස්මට සාපේක්ෂව කාර්ය සැලැස්මේ බිදීම් තිබේද?',
    describeDeviations: 'බිදීම් විස්තර කරන්න (ඉහතට "නැහැ" නම් N/A ටයිප් කරන්න)',
    priorApproval: 'බිදීම් සඳහා පර්යේෂණ මණ්ඩලයෙන් පූර්ව අනුමැතිය ලැබුණේද?',
    explainNoApproval: 'අනුමැතිය නොලද හේතු පැහැදිලි කරන්න (ඉහතට "නැහැ" නම් N/A ටයිප් කරන්න)',
    existingFile: 'පවතින ගොනුව:',
    viewDownload: 'බලන්න/බාගන්න',
    chooseFile: 'ගොනුව තෝරන්න',
    noFileChosen: 'ගොනුවක් තෝරා නැත',

    // Expenditure Fields
    workOnSchedule: 'කාර්යය නියමිත කාලසටහනට අනුව සිදු වෙමිද?',
    ifNotReasons: 'නැතිනම් හේතු ලබා දෙන්න (ඔව් නම් N/A ටයිප් කරන්න)',
    equipmentPurchased: 'වාර්තා කිරීමේ කාලය තුළ මිලදී ගත් ප්‍රධාන උපකරණ ලැයිස්තුව',
    interimFinancial: 'පීඨයේ භාණ්ඩාගාරික නිකුත් කළ අතරමැදි මූල්‍ය ප්‍රකාශය ඉදිරිපත් කරන්න',
    commentsImplementation: 'ව්‍යාපෘති ක්‍රියාත්මක කිරීම පිළිබඳ අදහස්, ඇත්නම්',
    nextWorkPlan: 'ඉදිරි මාස 06 සඳහා කෙටි කාර්ය සැලැස්මක් ඉදිරිපත් කරන්න',
    nextWorkPlanPlaceholder: 'ඉදිරි මාස 06 සඳහා කෙටි කාර්ය සැලැස්ම ටයිප් කරන්න',
    projectedExpenditure: 'ඉදිරි මාස 6 සඳහා ව්‍යාපෘති වියදම් ඇස්තමේන්තුව (රු.):',

    // Equipment Table
    eqName: 'නම',
    eqDatePurchase: 'මිලදී ගත් දිනය',
    eqValue: 'වටිනාකම',
    eqDescription: 'විස්තරය',
    eqAction: 'ක්‍රියාව',
    addItem: '+ තවත් අයිතමයක් එකතු කරන්න',

    // Expenditure Categories
    personal: 'පුද්ගලික',
    equipment: 'උපකරණ',
    consumables: 'පාරිභෝජ්‍ය',
    labServices: 'රසායනාගාර සේවා සහ නිදර්ශ විශ්ලේෂණය',
    statisticalAnalysis: 'සංඛ්‍යාන විශ්ලේෂණය',
    calibration: 'උපකරණ සංශෝධනය',
    pgRegFee: 'පශ්චාත් උපාධි ලියාපදිංචි ගාස්තු',
    travelSubsistence: 'ගමන් සහ නවාතැන්',
    miscellaneous: 'විවිධ',
    total: 'එකතුව',
    category: 'කාණ්ඩය',
    amountRs: 'මුදල (රු.)',

    // Publications
    listPublications: 'ප්‍රකාශන ලැයිස්තුව',
    publicationsPlaceholder: 'ප්‍රකාශන ලැයිස්තුව ටයිප් කරන්න',
    publicationsCommunications: 'වාර්තා කිරීමේ කාලය තුළ ව්‍යාපෘතියෙන් ඇති වූ ප්‍රකාශන/සන්නිවේදන (සාක්ෂි ඉදිරිපත් කරන්න)',

    // Buttons
    saveAsWord: 'Word ගොනුවක් ලෙස සුරකින්න',
    returnToGrantDetails: 'ප්‍රදාන විස්තරයට ආපසු',

    // Yes/No options
    yes: 'ඔව්',
    no: 'නැහැ',

    // Dropdowns
    selectFaculty: 'පීඨය තෝරන්න',
    selectDepartment: 'දෙපාර්තමේන්තුව තෝරන්න',
    facultyHSS: 'මානවීය හා සමාජීය විද්‍යා පීඨය',
    deptPoliticalScience: 'දේශපාලන විද්‍යා දෙපාර්තමේන්තුව',

    // Language Toggle
    switchLanguage: 'English',

    // Alerts
    savedSuccess: 'වාර්තාව සාර්ථකව සුරකින ලදී!',
    docxGenerating: 'Word ලේඛනය සකස් කෙරේ...',
  }
};
