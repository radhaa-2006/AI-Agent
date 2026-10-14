import { SuggestedTopic, NCCCamp, NCCCertificate } from '../types/chat';

export const SUGGESTED_PROMPTS: SuggestedTopic[] = [
  {
    title: 'What is NCC?',
    prompt: 'What is NCC? Explain its history, motto, and organizational structure.',
    category: 'General',
    icon: 'Shield',
  },
  {
    title: 'How can I join NCC?',
    prompt: 'How can I join NCC? What is the enrollment procedure and eligibility criteria for college students?',
    category: 'Enrollment',
    icon: 'UserPlus',
  },
  {
    title: 'What is the C Certificate?',
    prompt: 'What is the NCC C Certificate? What are its prerequisites, exam pattern, and grading system?',
    category: 'Certificates',
    icon: 'Award',
  },
  {
    title: 'What are the benefits of NCC?',
    prompt: 'What are the benefits of NCC in defence forces (Army, Navy, Air Force) and direct SSB interviews?',
    category: 'Benefits',
    icon: 'Briefcase',
  },
  {
    title: 'Republic Day Camp (RDC)',
    prompt: 'What is the Republic Day Camp (RDC)? How are cadets selected for the Kartavya Path march and PM Rally?',
    category: 'Camps',
    icon: 'Flag',
  },
  {
    title: 'NCC Special Entry (OTA)',
    prompt: 'Explain the Indian Army NCC Special Entry Scheme for Officers Training Academy (OTA) Chennai.',
    category: 'Benefits',
    icon: 'Target',
  },
  {
    title: 'Rank Hierarchy in NCC',
    prompt: 'What are the ranks in NCC from Cadet to Senior Under Officer (SUO)? How are ranks promoted?',
    category: 'Ranks',
    icon: 'ChevronUp',
  },
  {
    title: 'Can girls join NCC?',
    prompt: 'What are the opportunities, training programs, and camps for girls in the NCC Senior Wing (SW)?',
    category: 'Enrollment',
    icon: 'Users',
  },
];

export const NCC_CAMPS: NCCCamp[] = [
  {
    shortName: 'RDC',
    name: 'Republic Day Camp',
    description: 'The pinnacle national camp held at Delhi every January. Features PM’s Rally, marching contingent on Kartavya Path, Best Cadet competition, and cultural exchanges.',
    wing: 'All',
    location: 'Cariappa Parade Ground, New Delhi',
  },
  {
    shortName: 'CATC / ATC',
    name: 'Combined Annual Training Camp',
    description: 'Compulsory 10-day unit camp covering military training, PT, drill, weapon training (0.22 Deluxe rifle), night guard, and community living.',
    wing: 'All',
    location: 'Respective Unit / Directorate Regions',
  },
  {
    shortName: 'TSC',
    name: 'Thal Sainik Camp',
    description: 'Army Wing premier competition testing firing, field craft, battle craft (FC/BC), map reading, obstacle crossing, and tent pitching.',
    wing: 'Army',
    location: 'DG NCC Camp, New Delhi',
  },
  {
    shortName: 'NSC',
    name: 'Nau Sainik Camp',
    description: 'Naval Wing national competition featuring boat pulling regatta, sailing, ship modelling, semaphore signalling, and seamanship skills.',
    wing: 'Navy',
    location: 'Karwar / Ezhimala Naval Academy',
  },
  {
    shortName: 'VSC',
    name: 'Vayu Sainik Camp',
    description: 'Air Force Wing national competition testing microlight aircraft flying, aeromodelling, skeet shooting, and air navigation principles.',
    wing: 'Air',
    location: 'Jodhpur / Bangalore Air Force Station',
  },
  {
    shortName: 'EBSB',
    name: 'Ek Bharat Shreshtha Bharat (formerly NIC)',
    description: 'National Integration Camp connecting cadets from two distinct Indian states/cultures to foster national unity, heritage sharing, and languages.',
    wing: 'All',
    location: 'Host State Directorate Across India',
  },
  {
    shortName: 'YEP',
    name: 'Youth Exchange Programme',
    description: 'Cadets represent India internationally in bilateral youth exchange with countries like Singapore, UK, Russia, Vietnam, Kazakhstan, and Sri Lanka.',
    wing: 'All',
    location: 'Partner Nations Globally',
  },
];

export const NCC_CERTIFICATES: NCCCertificate[] = [
  {
    level: 'Certificate A',
    division: 'Junior Division / Junior Wing (School Cadets - Classes 8th to 10th)',
    duration: '2 Years (Minimum 75% parade attendance)',
    prerequisites: 'Attend at least 1 Annual Training Camp (ATC/CATC)',
    defenceBenefit: '2% bonus marks in SSC GD/CPO, priority for Senior Division enrollment, foundation in drill & weapon handling.',
  },
  {
    level: 'Certificate B',
    division: 'Senior Division / Senior Wing (College Students - 1st/2nd Year)',
    duration: '2 Years of Senior Division training',
    prerequisites: 'Attend at least 1 Combined Annual Training Camp (CATC)',
    defenceBenefit: '3% bonus marks in Paramilitary / CAPF recruitments, bonus points in State Police Constable/SI hiring.',
  },
  {
    level: 'Certificate C',
    division: 'Senior Division / Senior Wing (College Students - 3rd Year)',
    duration: 'Must hold Certificate B + 1 additional year of SD/SW training',
    prerequisites: 'Minimum 2 camps (1 CATC + 1 National or second CATC); pass written, practical, drill & firing exam.',
    defenceBenefit: 'Direct SSB Interview for Indian Army (NCC Special Entry, OTA Chennai - EXEMPT from written CDS exam), dedicated quotas in Indian Navy and Air Force Academy, 5% bonus marks in CAPF exams.',
  },
];

export const NCC_RANKS = [
  { rank: 'Senior Under Officer (SUO)', wing: 'Army / All', abbreviation: 'SUO', level: 'Highest Cadet Rank, commands the battalion parade' },
  { rank: 'Under Officer (UO / JUO)', wing: 'Army / All', abbreviation: 'JUO', level: 'Company Commander / Second-in-Command' },
  { rank: 'Company Sergeant Major (CSM)', wing: 'Army', abbreviation: 'CSM', level: 'Senior NCO responsible for discipline and parade logistics' },
  { rank: 'Company Quarter Master Sergeant (CQMS)', wing: 'Army', abbreviation: 'CQMS', level: 'Responsible for stores, rifles, and equipment' },
  { rank: 'Sergeant (Sgt)', wing: 'All Wings', abbreviation: 'SGT', level: 'Platoon Sergeant leading sections' },
  { rank: 'Corporal (Cpl)', wing: 'All Wings', abbreviation: 'CPL', level: 'Section 2IC assisting the Sergeant' },
  { rank: 'Lance Corporal (L/Cpl)', wing: 'All Wings', abbreviation: 'L/CPL', level: 'First junior non-commissioned officer appointment' },
  { rank: 'Cadet', wing: 'All Wings', abbreviation: 'CDT', level: 'Base entry rank upon enrollment and passing basic recruit test' },
];
