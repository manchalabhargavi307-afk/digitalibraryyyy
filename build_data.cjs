const fs = require('fs');
const path = require('path');

fs.mkdirSync('src/data', { recursive: true });

// 1. Assets
const assets = JSON.parse(fs.readFileSync('extracted/assets.json', 'utf8'));
const assetsJs = `// Auto-generated assets from original portal
export const MBU_LOGO = ${JSON.stringify(assets.logo)};
export const DEFAULT_STUDENT_PIC = ${JSON.stringify(assets.me)};
`;
fs.writeFileSync('src/data/assets.js', assetsJs);

// 2. Student Data
const studentJs = `import { DEFAULT_STUDENT_PIC } from './assets';

export const defaultStudentData = {
  name: 'Manchala Bhargavi',
  roll: '24102A030088',
  dept: 'Data Science',
  sec: '2',
  subj: 'Data Science',
  courseCode: '22DS102006',
  institution: 'Mohan Babu University, Tirupati',
  academicYear: 'B.Tech 3rd Year',
  faculty: 'S.BOSUBABU SIR',
  facultyDesignation: 'ASSISTANT PROFESSOR',
  pic: DEFAULT_STUDENT_PIC,
  web: '#',
  li: 'https://www.linkedin.com/in/manchala-bhargavi-aa65222ba/',
  gh: 'https://github.com/manchalabhargavi307-afk',
  ig: '#',
  about: \`I am Manchala Bhargavi, a third-year B.Tech student in Data Science at Mohan Babu University, Tirupati. I enjoy turning data into clear insights and building practical projects, from web platforms to hackathon solutions.

My core skills are Python, Data Science, SQL, and Power BI. I am always eager to learn new tools and technologies, work well in a team, and communicate ideas clearly. I am looking for opportunities to apply and grow my skills.\`,
  resume: {
    objective: "B.Tech Data Science student specializing in Computer Science and Engineering, with hands-on experience in Python, web development, data-oriented projects, and hackathons. Seeking an internship or entry-level opportunity to apply technical, analytical, and problem-solving skills.",
    education: [
      { degree: "B.Tech – Computer Science and Engineering (Data Science)", school: "Mohan Babu University, Tirupati", status: "Currently 3rd year" },
      { degree: "Intermediate", school: "Narayana Junior College", status: "Completed" },
      { degree: "Secondary Schooling", school: "Venkateshwara Children's High School", status: "Completed" }
    ],
    technicalSkills: [
      { category: "Programming", items: ["Python", "Java"] },
      { category: "Web Development", items: ["HTML5", "CSS3", "JavaScript", "PHP", "React"] },
      { category: "Database & Cloud", items: ["MySQL", "AWS Introduction to Cloud"] },
      { category: "Data Science & Analytics", items: ["Data Science fundamentals", "Pandas", "NumPy", "Matplotlib", "Seaborn", "scikit-learn", "Power BI", "Excel"] }
    ],
    projects: [
      {
        title: "Multi-Agent AI Reasoning & Verification Engine (Hackathon)",
        description: "Built a web-based solution for AI multi-agent reasoning and verification with a team and presented it."
      },
      {
        title: "SkillSwap Platform",
        description: "Web platform to share and exchange skills, with authentication, dashboard, feedback and ratings (PHP, MySQL, HTML, CSS, JavaScript)."
      },
      {
        title: "Smart Home Fire Sensor",
        description: "Mini project for detecting fire hazards and triggering early proactive alerts."
      }
    ]
  }
};
`;
fs.writeFileSync('src/data/studentData.js', studentJs);

// 3. Modules Data
const dataset = JSON.parse(fs.readFileSync('extracted/dataset.json', 'utf8'));

const moduleTitles = [
  "Module 1: Introduction to Data Science, 3Vs, Skills & Tools",
  "Module 2: Data Extraction, Feature Selection & Preprocessing",
  "Module 3: Data Analysis & Statistical Analytics Foundations",
  "Module 4: Advanced Data Manipulation with Pandas & Tabular Structures",
  "Module 5: Data Visualization & Exploratory Analytics with Python"
];

const modules = dataset.mods.map((html, idx) => ({
  id: idx + 1,
  title: moduleTitles[idx] || `Module ${idx + 1}`,
  courseCode: '22DS102006',
  subject: 'Data Science',
  html: html
}));

fs.writeFileSync('src/data/modulesData.js', `export const modulesData = ${JSON.stringify(modules, null, 2)};\n`);

console.log('Modules written: ' + modules.length);
