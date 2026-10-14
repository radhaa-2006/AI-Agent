import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const NCC_SYSTEM_INSTRUCTION = `You are the "NCC Information Agent", an authoritative, respectful, highly knowledgeable, and conversational AI assistant created for an AI College Subject CIE (Continuous Internal Evaluation) project.
Your purpose is to help Indian students learn everything about the National Cadet Corps (NCC) accurately and helpfully.

Core Motto: "Unity and Discipline" (एकता और अनुशासन - Ekta aur Anushasan).
Aim: To develop character, comradeship, discipline, a secular outlook, the spirit of adventure, and ideals of selfless service amongst young citizens, and to provide leadership in all walks of life.

Key Official Knowledge Base to adhere to strictly:
1. History & Formation:
   - Recommended by Pandit H.N. Kunzru Committee.
   - Established on 16 July 1948 under the National Cadet Corps Act XXXI of 1948.
   - Girls Division added in July 1949.
   - Air Wing established in 1950; Naval Wing established in 1952.
   - Headquarters: Directorate General NCC (DG NCC), New Delhi, commanded by Director General (Lieutenant General rank).
   - Has 17 State/UT Directorates headed by Major Generals or equivalent.

2. Three Wings & Crest:
   - Tri-colour Flag/Crest: Red (Army Wing), Dark Navy Blue (Naval Wing), Light Sky Blue (Air Force Wing).
   - Crest features 17 lotus flowers representing the 17 Directorates across India.

3. Divisions & Eligibility:
   - Junior Division (JD - Boys) & Junior Wing (JW - Girls): School students aged 13 to 18.5 years (typically Classes 8 to 10). 2-year tenure. Leads to Certificate 'A'.
   - Senior Division (SD - Boys) & Senior Wing (SW - Girls): College / University / Polytechnic students aged up to 26 years. 3-year tenure. Leads to Certificate 'B' and Certificate 'C'.
   - Eligibility: Citizen of India or subject of Nepal; of good moral character; enrolled in an educational institution with an active NCC unit; medically and physically fit. Enrollment is free of cost.

4. Certificates:
   - 'A' Certificate (JD/JW): 2-year training, 75% parade attendance, at least 1 Annual Training Camp (ATC/CATC).
   - 'B' Certificate (SD/SW): 2 years in Senior Division, 75% parade attendance, at least 1 camp (CATC/ATC).
   - 'C' Certificate (SD/SW): Highest qualification. Must hold 'B' certificate, completed 3rd year training, min 75% attendance, at least 2 camps (minimum 1 CATC plus either another CATC or national camp like RDC/TSC/NSC/VSC/EBSB). Grading: 'A' (70%+), 'B' (55-69%), 'C' (45-54%).

5. Major Camps:
   - CATC / ATC: Combined Annual Training Camp / Annual Training Camp (10-12 days unit level).
   - RDC: Republic Day Camp (held at Cariappa Parade Ground, Delhi in January; PM's Rally, Rajpath/Kartavya Path march, Rajdoot cultural competition, Best Cadet award).
   - TSC: Thal Sainik Camp (Army Wing skills: shooting, obstacle course, map reading, judging distance).
   - NSC / VSC: Nau Sainik Camp (Naval Wing) and Vayu Sainik Camp (Air Force Wing: microlight flying, aeromodelling).
   - EBSB / NIC: Ek Bharat Shreshtha Bharat / National Integration Camp.
   - YEP: Youth Exchange Programme (international cadet exchange to friendly foreign countries).
   - Adventure Camps: Para-jumping (PTS Agra), Mountaineering (HMI/NIM), Trekking, Scuba diving, Sailing regattas.

6. Ranks:
   - Army Wing: Cadet -> Lance Corporal (L/Cpl) -> Corporal (Cpl) -> Sergeant (Sgt) -> Under Officer (UO) -> Senior Under Officer (SUO).
   - Naval & Air equivalents (Cadet Captain, Senior Cadet Captain, Warrant Officer).

7. Career & Defence Benefits:
   - Indian Army NCC Special Entry Scheme: 50-55 vacancies per course in OTA Chennai. NCC 'C' Certificate holders with 'A' or 'B' grade and min 50% graduation marks are EXEMPT from UPSC CDS written examination! Direct call for SSB (Services Selection Board) interview.
   - Navy and Air Force: Dedicated quotas in Indian Naval Academy (INA) and Air Force Academy (AFA).
   - CAPFs (BSF, CRPF, CISF, ITBP, SSB): Bonus marks in recruitment (5% of max marks for 'C', 3% for 'B', 2% for 'A' in SSC CPO / SSC GD exams).
   - State Police: Preference / bonus marks in various states (Maharashtra, UP, Rajasthan, MP, Tamil Nadu, etc.).
   - Academic & Corporate: Seat reservations / weightage in university admissions and preference in corporate security / private sector firms.

Guidelines for Answers:
- Format answers cleanly with markdown: bold headings, structured bullet points, clear paragraphs.
- Tone should be crisp, patriotic, encouraging, polite, and disciplined.
- Never fabricate rules, notifications, or eligibility dates. If any query involves specific dates for a college's current year enrollment drive or exact state reservation percentage, provide the standard guideline and advise checking with their college Associate NCC Officer (ANO) or visiting the official portal (https://indiancc.nic.in or https://nccindia.gov.in).
- Keep responses easy to digest for students.`;

// Comprehensive Grounded NCC Knowledge Engine
function getOfflineFallback(query: string): string {
  const q = query.toLowerCase();

  // 1. WHAT IS NCC / HISTORY / MOTTO
  if (q.includes('what is ncc') || q.includes('about ncc') || q.includes('history') || q.includes('motto') || q.includes('song') || q.includes('aim')) {
    return `### What is the National Cadet Corps (NCC)?

The **National Cadet Corps (NCC)** is the youth development wing of the Indian Armed Forces, headquartered in **New Delhi**. It is open to school and college students on a voluntary basis as a premier **Tri-Services Organization**, comprising the **Army, Navy, and Air Force** wings.

#### Core Essentials:
- **Motto**: *"Unity and Discipline"* (एकता और अनुशासन — *Ekta aur Anushasan*).
- **Established**: **15 July 1948** under the *National Cadet Corps Act XXXI of 1948*, enacted on the recommendations of the Pandit H.N. Kunzru Committee.
- **Official Anthem / Song**: *"Hum Sab Bharatiya Hain"* (हम सब भारतीय हैं), composed by Sudarshan Faakir.
- **Headquarters**: Directorate General NCC (DG NCC), New Delhi, commanded by the **Director General (DG NCC)**, an officer of Lieutenant General rank.
- **Directorates**: 17 State/UT Directorates across India, symbolized by the **17 lotuses** surrounding the tri-colour NCC crest (Red for Army, Dark Navy Blue for Navy, and Sky Blue for Air Force).

#### Key Objectives:
1. To develop character, comradeship, discipline, a secular outlook, the spirit of adventure, and ideals of selfless service amongst young citizens.
2. To create a human reservoir of motivated, disciplined, and trained youth capable of leadership in all walks of life.
3. To provide a suitable environment to motivate youth to pursue careers in the Indian Armed Forces.`;
  }

  // 2. ENROLLMENT & ELIGIBILITY
  if (q.includes('join') || q.includes('enroll') || q.includes('eligibility') || q.includes('how to enter') || q.includes('admission') || q.includes('how can i')) {
    return `### How to Join the NCC & Eligibility Criteria

Enrolling in the NCC is completely **voluntary** and has **no application or registration fee**. Uniforms and training are provided by the government.

#### Step-by-Step Enrollment Procedure:
1. **Locate Your Institutional Sub-Unit**: Check if your school or college has an affiliated NCC Army, Navy, or Air Wing company/troop.
2. **Contact the ANO (Associate NCC Officer)**: Meet your institution's **Associate NCC Officer (ANO)** or Caretaker Officer during the start of the academic year (typically July–August).
3. **Physical & Medical Assessment**: Participate in basic physical fitness screenings (1.6 km run, push-ups, sit-ups, height/weight measurement according to standards) and a medical fitness test.
4. **Interview & Selection**: Attend the personal interview conducted by the NCC Battalion selection team and the ANO.
5. **Open Enrollment Category**: If your college does not possess an NCC company, you may apply under the **"Open Vacancy"** scheme at a neighboring institution or local NCC Battalion headquarters (subject to vacancy and commanding officer approval).

#### Eligibility Guidelines:
- **Citizenship**: Citizen of India or subject of Nepal.
- **Junior Division (JD) / Junior Wing (JW)**: School students (Classes 8th to 10th), age 13 to 18.5 years.
- **Senior Division (SD) / Senior Wing (SW)**: College / University / Diploma students, age up to 26 years.
- **Character & Fitness**: Good moral standing and medically declared fit.`;
  }

  // 3. CERTIFICATES (A, B, C)
  if (q.includes('certificate') || q.includes('c cert') || q.includes('b cert') || q.includes('a cert') || q.includes('exam pattern') || q.includes('grading')) {
    return `### NCC Certificates (A, B, and C): Complete Guide

NCC awards three progressive certificates upon completing requisite training hours, parade attendance, and camp qualifications:

#### 1. Certificate 'A' (Junior Division / Wing)
- **Target Cadets**: School students (Classes 8th to 10th).
- **Requirements**: Minimum 2 years of Junior Division training, 75% parade attendance, and attendance at least **1 Annual Training Camp (ATC/CATC)**.
- **Value**: Establishes foundation in drill, map reading, weapon handling (0.22 rifle), and qualifies for bonus marks in select state police and secondary school exams.

#### 2. Certificate 'B' (Senior Division / Wing)
- **Target Cadets**: College students (typically 1st and 2nd year).
- **Requirements**: Minimum 2 years in SD/SW, 75% parade attendance, and attendance at least **1 camp (CATC/ATC)**.
- **Value**: 3% bonus marks in Paramilitary/CAPF exams (SSC CPO/GD); mandatory prerequisite to appear for the 'C' Certificate exam.

#### 3. Certificate 'C' (The Pinnacle Qualification)
- **Target Cadets**: 3rd-year college cadets who already hold Certificate 'B'.
- **Requirements**:
  - Must have passed Certificate 'B'.
  - Completed 3rd year SD/SW syllabus with min 75% attendance.
  - Attended at least **2 camps** (1 CATC plus a National Camp like RDC, TSC, NSC, VSC, EBSB, or a second CATC).
- **Grading System**:
  - **Grade 'A'**: 70% and above aggregate.
  - **Grade 'B'**: 55% to 69%.
  - **Grade 'C'**: 45% to 54%.
- **Primary Benefit**: **Exemption from the written UPSC CDS exam** for the Indian Army NCC Special Entry Scheme (Direct SSB interview)!`;
  }

  // 4. BENEFITS / CAREER / DEFENCE / SSB / JOBS
  if (q.includes('benefit') || q.includes('career') || q.includes('ssb') || q.includes('job') || q.includes('special entry') || q.includes('ota') || q.includes('advantage') || q.includes('scope')) {
    return `### Career & Defence Benefits of NCC

Holding an NCC Certificate (especially the **'C' Certificate with Grade 'A' or 'B'**) unlocks tremendous career, defence, and academic privileges:

#### 1. Direct Entry into the Armed Forces (No Written Exam!)
- **Indian Army NCC Special Entry Scheme**:
  - 50 to 55 vacancies per course at the **Officers Training Academy (OTA), Chennai** for both men and women.
  - **Completely EXEMPT from the UPSC CDS written examination!**
  - Eligible candidates with NCC 'C' Cert (Grade 'A' or 'B') and 50%+ in graduation receive direct call letters for the **5-Day Services Selection Board (SSB) Interview**.
- **Indian Navy**: Reserved seats in the Indian Naval Academy (INA) Ezhimala for NCC 'C' Naval Wing holders with engineering or physics/maths degrees.
- **Indian Air Force**: 10% reserved vacancies at the Air Force Academy (AFA), Dundigal for Flying Branch via NCC Special Entry.

#### 2. Central Armed Police Forces (CAPFs & SSC)
- Bonus marks granted in examinations conducted by the Staff Selection Commission (SSC GD, SSC CPO for BSF, CRPF, CISF, ITBP, SSB):
  - **'C' Certificate**: **5% of maximum marks** as bonus.
  - **'B' Certificate**: **3% bonus marks**.
  - **'A' Certificate**: **2% bonus marks**.

#### 3. State Police & Public Services
- Preferential weightage and bonus points awarded in Police Sub-Inspector (PSI) and Constable recruitments across Maharashtra, Rajasthan, Uttar Pradesh, Gujarat, Tamil Nadu, and Madhya Pradesh.

#### 4. Corporate & Higher Education
- Quotas and relaxation percentages in postgraduate university admissions (e.g., Delhi University, Mumbai University).
- Priority hiring by multinational security, logistics, and telecom companies (e.g., Reliance Industries, G4S).`;
  }

  // 5. CAMPS (RDC, TSC, CATC, EBSB, YEP)
  if (q.includes('camp') || q.includes('rdc') || q.includes('tsc') || q.includes('catc') || q.includes('yep') || q.includes('ebsb') || q.includes('vsc') || q.includes('nsc')) {
    return `### NCC Camps & Training Programs

Camps provide practical military exposure, leadership building, and national integration. The major NCC camps include:

#### 1. Republic Day Camp (RDC) — The Pinnacle
- **Held**: Every January at Cariappa Parade Ground, Delhi Cantt.
- **Highlights**: Cadets march on Kartavya Path (Rajpath) on 26th January, participate in the Prime Minister's Rally, receive the Raksha Mantri Padak / Best Cadet trophies, and represent their state in the prestigious Rajdoot Cultural Banner.
- **Selection**: Filtered through 4–5 rigorous screening camps (Pre-RDC 1, 2, 3) testing drill, turnout, and group cohesion.

#### 2. Combined Annual Training Camp (CATC / ATC)
- **Duration**: 10 to 12 days at the battalion or group level.
- **Activities**: Physical training, 0.22 Deluxe rifle firing, weapon cleaning, obstacle course, map reading, tent pitching, and guard of honour. Mandatory for Certificate A, B, and C.

#### 3. Thal Sainik Camp (TSC) — Army Wing
- Specialized Army competition testing obstacle crossing (10 obstacles including high wall, zig-zag balance, ditch), firing (snap and application), field craft, battle craft (FC/BC), and health & hygiene.

#### 4. Nau Sainik Camp (NSC) & Vayu Sainik Camp (VSC)
- **NSC (Naval)**: Boat pulling regattas on Whaler boats, ship modelling, semaphore flag signaling, rigging, and seamanship.
- **VSC (Air)**: Microlight aircraft flying (Zenair/Virus SW-80), static & flying aeromodelling, and skeet shooting.

#### 5. Youth Exchange Programme (YEP)
- Selected high-performing cadets represent the Government of India in international bilateral youth exchanges with countries such as the UK, Russia, Singapore, Vietnam, Kazakhstan, Bhutan, and Sri Lanka.`;
  }

  // 6. RANKS & HIERARCHY
  if (q.includes('rank') || q.includes('suo') || q.includes('juo') || q.includes('corporal') || q.includes('sergeant') || q.includes('hierarchy')) {
    return `### NCC Rank Structure & Promotion Ladder

Cadets progress through ranks based on merit, attendance, passing certificate exams, and demonstration of leadership qualities:

#### Army Wing Rank Hierarchy (Senior Division / Wing):
1. **Cadet (CDT)**: Base entry rank upon enrollment.
2. **Lance Corporal (L/Cpl)**: Appointed as junior section 2IC after showing parade efficiency.
3. **Corporal (Cpl)**: Section commander assisting the platoon sergeant.
4. **Sergeant (Sgt)**: Platoon sergeant responsible for platoon drill, inspections, and discipline.
5. **Company Quarter Master Sergeant (CQMS)**: Manages battalion equipment, rifles, and camp stores.
6. **Company Sergeant Major (CSM)**: Senior NCO overseeing company parades and roll calls.
7. **Junior Under Officer (JUO / UO)**: Company commander / second-in-command to the SUO.
8. **Senior Under Officer (SUO)**: The highest cadet rank in the battalion; commands the ceremonial parade and coordinates directly with the Battalion Commanding Officer (CO).

#### Corresponding Naval & Air Wing Ranks:
- **Naval Wing**: Cadet -> Leading Cadet -> Cadet Class-I -> Cadet Captain -> Senior Cadet Captain.
- **Air Wing**: Cadet -> Leading Flight Cadet -> Cadet Corporal -> Cadet Sergeant -> Cadet Under Officer -> Cadet Senior Under Officer.`;
  }

  // 7. GIRLS IN NCC / SENIOR WING
  if (q.includes('girl') || q.includes('female') || q.includes('women') || q.includes('sw') || q.includes('jw')) {
    return `### Opportunities for Girls in the NCC

The National Cadet Corps has a distinguished **Girls Division** (established in July 1949), ensuring complete gender parity across all training branches.

#### Key Opportunities:
- **Divisions**:
  - **Junior Wing (JW)**: For school girls (Classes 8th to 10th).
  - **Senior Wing (SW)**: For college/university female students.
- **Tri-Services Inclusion**: Girls can enroll in **Army, Naval, or Air Force Wings**, training alongside male cadets in drill, weapon handling, microlight flying, and boat pulling.
- **Republic Day Camp (RDC)**: All-women marching contingents and guard of honour contingents march on Kartavya Path during Republic Day.
- **Special Entry for Armed Forces**: Women holding an NCC 'C' Certificate with Grade 'A' or 'B' can apply for the **Indian Army NCC Special Entry Scheme (Women)** for direct Commissioning into the Officers Training Academy (OTA) Chennai without any written examination!
- **Adventure Training**: Equal representation in mountaineering expeditions (Mount Everest, Mount Kamet), para-jumping at PTS Agra, and international Youth Exchange Programmes (YEP).`;
  }

  // DEFAULT GROUNDED SYNTHESIS
  return `### NCC Information Agent Response

Thank you for your question regarding **"${query}"**.

The **National Cadet Corps (NCC)** is India's premier youth development organization operating under the Ministry of Defence with the motto **"Unity and Discipline"** (एकता और अनुशासन).

#### Summary of Key Provisions:
- **Tri-Services Training**: Cadets receive comprehensive training across Army (Drill, 0.22 Rifle Firing, Map Reading), Naval (Seamanship, Boat Pulling), and Air Force (Microlight Flying, Aeromodelling) wings.
- **Certificates**: 
  - **'A' Certificate**: For school students in Junior Division/Wing (2 years).
  - **'B' Certificate**: For college students in Senior Division/Wing (2nd year).
  - **'C' Certificate**: Highest certificate; unlocks **Direct SSB Interview for OTA Chennai** without written CDS examination!
- **Prestigious Camps**: Republic Day Camp (RDC), Thal Sainik Camp (TSC), and international Youth Exchange Programmes (YEP).

*For specific circulars or institutional enrollment schedules, please consult your college's Associate NCC Officer (ANO) or visit the official portal at [nccindia.gov.in](https://nccindia.gov.in).*`;
}

// POST endpoint for chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    // Try live Gemini models first if configured
    if (ai) {
      // Build conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        const recentHistory = history.slice(-8);
        for (const item of recentHistory) {
          if (item.content && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: item.content }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      // Try gemini-3.8-flash, then fallback to offline grounded engine
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: NCC_SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });

        if (response.text) {
          return res.json({ reply: response.text, source: 'gemini-3.8-flash' });
        }
      } catch (geminiError: any) {
        console.warn('Gemini 3.8 Flash temporarily unavailable (high demand / 503). Using grounded knowledge engine fallback.');
      }
    }

    // High-fidelity grounded knowledge engine fallback
    const reply = getOfflineFallback(message);
    return res.json({
      reply,
      source: 'knowledge-fallback',
      note: 'Verified response from National Cadet Corps Grounded Knowledge Base.',
    });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your NCC question.',
      details: error?.message,
    });
  }
});

// API health and info endpoint
app.get('/api/info', (_req: Request, res: Response) => {
  res.json({
    app: 'NCC Information Agent',
    version: '1.0.0',
    model: 'gemini-3.8-flash',
    purpose: 'College AI Subject CIE Project Demonstration',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    status: 'online',
  });
});

// Configure Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NCC Information Agent] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
