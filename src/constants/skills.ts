import type { Localized, SkillGroup } from '@/types';

/* Groups per CV. `fill` is a declared ordinal scale (primary .9 / strong .72
   / working .55). `years` = years of use (user-approved estimates). Tech and
   cell names stay English in both languages. */
const PRIMARY = 0.9;
const STRONG = 0.72;
const WORKING = 0.55;

export const SKILLS_HEAD: Localized<{ eyebrow: string; title: string }> = {
  en: { eyebrow: 'STACK', title: 'Tools I use to ship' },
  pt: { eyebrow: 'STACK', title: 'Ferramentas com que eu entrego' },
};

function groups(names: [string, string, string, string, string, string]): SkillGroup[] {
  return [
    {
      group: names[0],
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
      group: names[1],
      cells: [
        { name: 'React', fill: PRIMARY, years: '4Y' },
        { name: 'Vite', fill: STRONG, years: '3Y' },
        { name: 'Next.js', fill: WORKING, years: '2Y' },
        { name: 'Angular', fill: WORKING, years: '1Y' },
      ],
    },
    {
      group: names[2],
      cells: [
        { name: 'FastAPI', fill: PRIMARY, years: '4Y' },
        { name: 'Node.js', fill: STRONG, years: '8Y' },
        { name: 'Hyperf (PHP)', fill: STRONG, years: '1Y' },
        { name: 'Gin (Go)', fill: WORKING, years: '1Y' },
        { name: 'Laravel', fill: WORKING, years: '1Y' },
      ],
    },
    {
      group: names[3],
      cells: [
        { name: 'SQL (Oracle · PG · MySQL)', fill: PRIMARY, years: '4Y' },
        { name: 'pandas', fill: STRONG, years: '3Y' },
        { name: 'scikit-learn', fill: STRONG, years: '2Y' },
        { name: 'PySpark', fill: WORKING, years: '1Y' },
        { name: 'Databricks', fill: WORKING, years: '1Y' },
      ],
    },
    {
      group: names[4],
      cells: [
        { name: 'AWS (EC2 · S3)', fill: STRONG, years: '2Y' },
        { name: 'Docker', fill: STRONG, years: '3Y' },
        { name: 'GitHub Actions', fill: STRONG, years: '3Y' },
        { name: 'Vercel', fill: WORKING, years: '2Y' },
        { name: 'Cloudflare', fill: WORKING, years: '2Y' },
      ],
    },
    {
      group: names[5],
      cells: [
        { name: 'Agentic Workflows', fill: PRIMARY, years: '2Y' },
        { name: 'AI Engineering', fill: STRONG, years: '2Y' },
        { name: 'RPA Orchestration', fill: WORKING, years: '1Y' },
      ],
    },
  ];
}

export const SKILL_GROUPS: Localized<SkillGroup[]> = {
  en: groups(['Languages', 'Frontend', 'Backend', 'Data & ML', 'Cloud & DevOps', 'Agentic-AI']),
  pt: groups(['Linguagens', 'Frontend', 'Backend', 'Dados & ML', 'Cloud & DevOps', 'IA Agêntica']),
};
