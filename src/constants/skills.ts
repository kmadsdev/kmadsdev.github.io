import type { SkillGroup } from '@/types';

/* Groups exactly per CV. `fill` is a declared ordinal scale (primary .9 /
   strong .72 / working .55) mapped from the CV's ranked stack order.
   `years` = years of use shown next to each bar (recruiter-requested numbers;
   estimates derived from the timeline — user adjusts as needed). */
const PRIMARY = 0.9;
const STRONG = 0.72;
const WORKING = 0.55;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    group: 'Languages',
    cells: [
      { name: 'Python', fill: PRIMARY, years: '5Y' },
      { name: 'TypeScript / JavaScript', fill: PRIMARY, years: '8Y' },
      { name: 'Go', fill: STRONG, years: '2Y' },
      { name: 'PHP', fill: STRONG, years: '2Y' },
      { name: 'Java', fill: WORKING, years: '3Y' },
      { name: 'C', fill: WORKING, years: '2Y' },
    ],
  },
  {
    group: 'Frontend',
    cells: [
      { name: 'React', fill: PRIMARY, years: '4Y' },
      { name: 'Vite', fill: STRONG, years: '3Y' },
      { name: 'Next.js', fill: WORKING, years: '2Y' },
      { name: 'Angular', fill: WORKING, years: '1Y' },
    ],
  },
  {
    group: 'Backend',
    cells: [
      { name: 'FastAPI', fill: PRIMARY, years: '4Y' },
      { name: 'Node.js', fill: STRONG, years: '8Y' },
      { name: 'Hyperf (PHP)', fill: STRONG, years: '1Y' },
      { name: 'Gin (Go)', fill: WORKING, years: '1Y' },
      { name: 'Laravel', fill: WORKING, years: '1Y' },
    ],
  },
  {
    group: 'Data & ML',
    cells: [
      { name: 'SQL (Oracle · PG · MySQL)', fill: PRIMARY, years: '4Y' },
      { name: 'pandas', fill: STRONG, years: '3Y' },
      { name: 'scikit-learn', fill: STRONG, years: '2Y' },
      { name: 'PySpark', fill: WORKING, years: '1Y' },
      { name: 'Databricks', fill: WORKING, years: '1Y' },
    ],
  },
  {
    group: 'Cloud & DevOps',
    cells: [
      { name: 'AWS (EC2 · S3)', fill: STRONG, years: '2Y' },
      { name: 'Docker', fill: STRONG, years: '3Y' },
      { name: 'GitHub Actions', fill: STRONG, years: '3Y' },
      { name: 'Vercel', fill: WORKING, years: '2Y' },
      { name: 'Cloudflare', fill: WORKING, years: '2Y' },
    ],
  },
  {
    group: 'Agentic-AI',
    cells: [
      { name: 'Agentic Workflows', fill: PRIMARY, years: '2Y' },
      { name: 'AI Engineering', fill: STRONG, years: '2Y' },
      { name: 'RPA Orchestration', fill: WORKING, years: '1Y' },
    ],
  },
];
