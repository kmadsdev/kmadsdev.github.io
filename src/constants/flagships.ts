import type { FlagshipId, Lang, Localized, Stat } from '@/types';

/* User-revised flagship content (2026-07-09). Shipped/live voice throughout.
   Flagship EYEBROWS stay English in both languages (user ruling); prose,
   stat labels and sources localize. Agentic placeholder numbers are
   user-sanctioned — marked PLACEHOLDER below. */

export interface FlagshipContent {
  id: FlagshipId;
  anchor: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  stats: Stat[];
  tags: string[];
  links: { label: string; href: string; external?: boolean }[];
  layout: 'left' | 'right' | 'flood';
}

const EN: Record<FlagshipId, FlagshipContent> = {
  agentic: {
    id: 'agentic',
    anchor: 'flagship-agentic',
    eyebrow: 'FLAGSHIP · AGENT-NATIVE · LIVE',
    title: 'Agentic Template',
    paragraphs: ['The pipeline is the product. An all-in-one agentic template:'],
    bullets: [
      '16+ MCPs · 50+ selected skills',
      'Custom constraints + instructions to prevent hallucination and ensure memory/context retrieval',
      'FinOps ruleset for devs on a budget',
      'Multi-agent orchestration',
      'Typecheck + test gates; guard workflow with auto-revert on failed smoke test',
      'Auto-filed incident issues and secret scanning',
      'Works with Claude Code, Codex, OpenCode, Copilot, OpenClaw, Hermes — or any markdown agent, including local Qwen / Llama / DeepSeek',
    ],
    stats: [
      /* PLACEHOLDER numbers — user fills real ones later */
      { value: '16+', label: 'MCP SERVERS WIRED', source: 'template registry — agentic-template' },
      { value: '50+', label: 'CURATED SKILLS', source: 'skills library — agentic-template' },
      { value: '31%', label: 'CONTEXT SAVED', source: 'dry-run preview — landing benchmark', win: true },
    ],
    tags: ['GitHub Actions', 'auto-revert', 'smoke tests', 'secret scanning', 'MCP', 'FinOps'],
    links: [
      { label: 'KMADS.DEV/AGENTIC', href: 'https://kmads.dev/agentic', external: true },
      { label: 'USE THIS TEMPLATE', href: 'https://github.com/kmadsdev/agentic-template', external: true },
    ],
    layout: 'left',
  },
  offmode: {
    id: 'offmode',
    anchor: 'flagship-offmode',
    eyebrow: 'SAAS · PRODUCTIVITY · LIVE',
    title: 'OffMode',
    paragraphs: [
      'Pomodoro productivity app on a full 3-tier production architecture: a React frontend talks to an Express gateway fronting a FastAPI + PostgreSQL (Supabase) backend.',
      'Email/password + Google OAuth, cloud backup every 15 minutes, streaks and focus-session tracking — deployed on Vercel serverless with JWT sessions.',
    ],
    stats: [
      { value: '3', label: 'PRODUCTION TIERS', source: 'React → Express gateway → FastAPI/PostgreSQL' },
      { value: '15 MIN', label: 'CLOUD BACKUP CYCLE', source: 'offmode backend autosave interval' },
    ],
    tags: ['React', 'Vite', 'Express', 'FastAPI', 'PostgreSQL', 'Supabase', 'JWT', 'Vercel'],
    links: [{ label: 'KMADS.DEV/OFFMODE', href: 'https://kmads.dev/offmode', external: true }],
    layout: 'right',
  },
  hivemind: {
    id: 'hivemind',
    anchor: 'flagship-hivemind',
    eyebrow: 'STARTUP · MACHINE LEARNING · 2025',
    title: 'HiveMind Client Potential',
    paragraphs: [
      'A 10-question survey that predicts whether a company becomes a sales-qualified lead for our startup — Logistic Regression / Random Forest models trained, benchmarked and deployed at 97.9% accuracy.',
      'On the latest optimization not only did the predictive model size go from 756MB (RFC) to a whopping 1.2 kilobytes (LR) — accuracy went up 0.22% too.',
    ],
    stats: [
      { value: '97.9%', label: 'ML ACCURACY', source: 'model benchmark — HiveMind (CV/LinkedIn)', win: true },
      { value: '~99.99%', label: 'AWS S3 COST REDUCTION', source: 'model footprint optimization', win: true },
    ],
    tags: ['Python', 'scikit-learn', 'pandas', 'FastAPI', 'AWS EC2', 'S3', 'MySQL', 'boto3'],
    links: [
      {
        label: 'KMADSDEV/HIVEMIND-CLIENT-POTENTIAL',
        href: 'https://github.com/kmadsdev/hivemind-client-potential',
        external: true,
      },
    ],
    layout: 'left',
  },
  diabetes: {
    id: 'diabetes',
    anchor: 'flagship-diabetes-indicator',
    eyebrow: 'MACHINE LEARNING · HARVARD CS50X · LIVE',
    title: 'Diabetes Indicator',
    paragraphs: [
      'A 17-question health survey scored by a scikit-learn model (public Kaggle dataset) — returns a risk verdict of having or not having diabetes (with a confidence %), plus BMI calculation, in a dark, mobile-first UI.',
      'Showcased on CS50x 2025 (Final Project).',
    ],
    stats: [
      { value: '17', label: 'SURVEY QUESTIONS', source: 'diabetes-indicator frontend' },
      { value: 'V1.1.0', label: 'SHIPPED RELEASE', source: 'changelog — diabetes-indicator-backend', animate: false },
    ],
    tags: ['FastAPI', 'scikit-learn', 'Python', 'Kaggle', 'Vanilla JS'],
    links: [
      { label: 'KMADS.DEV/DIABETES-INDICATOR', href: 'https://kmads.dev/diabetes-indicator', external: true },
    ],
    layout: 'right',
  },
  doom: {
    id: 'doom',
    anchor: 'flagship-doom',
    eyebrow: 'CRAFT · WASM · LIVE',
    title: 'DOOM Offline',
    paragraphs: [
      'DOOM (1993) compiled to WASM — linuxdoom-1.10 via Clang → wasm32 — then gzip + base64 packed into a self-extracting HTML data:URI. Zero hosting, zero files, zero cookies.',
      'The inflate is hand-rolled RFC 1951/1952 JavaScript. A hand-written MicroDOOM raycaster ships at ~44KB (smaller than a favicon).',
    ],
    stats: [
      {
        value: '-51%',
        label: 'WASM COMPRESSED SIZE',
        source: '7MB → 4.4MB — auto decompress in real time using gzip',
        win: true,
      },
      { value: '44KB', label: 'MICRODOOM SIZE', source: 'hand-written — smaller than a favicon' },
    ],
    tags: ['WASM', 'C', 'JavaScript', 'gzip', 'base64'],
    links: [{ label: 'KMADS.DEV/DOOM', href: 'https://kmads.dev/doom', external: true }],
    layout: 'left',
  },
  notes: {
    id: 'notes',
    anchor: 'flagship-notes',
    eyebrow: 'CRAFT · EDITOR · LIVE',
    title: 'Browser Notes',
    paragraphs: [
      'A VSCode-inspired web editor living in a single HTML file — uses the Monaco engine and the File System Access API to autosave straight to disk.',
      'If you like the VSCode codeblock appearance and don’t want to open a whole IDE just to type quick notes, this application is perfect for you.',
      'It can preview Markdown, YAML, JSON, Swagger and PlantUML files too.',
    ],
    stats: [
      { value: '1', label: 'FILE, LESS THAN 60KB', source: 'Zero-install, works offline' },
      { value: '5', label: 'BUILT-IN PREVIEW FORMATS', source: 'Markdown · JSON · YAML · Swagger · PlantUML' },
    ],
    tags: ['Lightweight', 'File System Access API', 'Vanilla JS'],
    links: [{ label: 'KMADS.DEV/NOTES', href: 'https://kmads.dev/notes', external: true }],
    layout: 'flood',
  },
};

/* PT-BR: prose, stat labels/sources and link CTAs translate; eyebrows, tech
   tags, project names and values stay. */
const PT: Record<FlagshipId, FlagshipContent> = {
  agentic: {
    ...EN.agentic,
    paragraphs: ['O pipeline é o produto. Um template agêntico all-in-one:'],
    bullets: [
      '16+ MCPs · 50+ skills selecionadas',
      'Constraints e instruções customizadas para prevenir alucinação e garantir recuperação de memória/contexto',
      'Regras de FinOps para devs com orçamento apertado',
      'Orquestração multiagente',
      'Gates de typecheck + testes; workflow guardião com auto-revert em smoke test falho',
      'Issues de incidente abertas automaticamente e secret scanning',
      'Funciona com Claude Code, Codex, OpenCode, Copilot, OpenClaw, Hermes — ou qualquer agente markdown, incluindo Qwen / Llama / DeepSeek locais',
    ],
    stats: [
      { value: '16+', label: 'SERVIDORES MCP INTEGRADOS', source: 'registro do template — agentic-template' },
      { value: '50+', label: 'SKILLS CURADAS', source: 'biblioteca de skills — agentic-template' },
      { value: '31%', label: 'DE CONTEXTO ECONOMIZADO', source: 'dry-run preview — benchmark da landing', win: true },
    ],
    links: [
      { label: 'KMADS.DEV/AGENTIC', href: 'https://kmads.dev/agentic', external: true },
      { label: 'USE ESTE TEMPLATE', href: 'https://github.com/kmadsdev/agentic-template', external: true },
    ],
  },
  offmode: {
    ...EN.offmode,
    paragraphs: [
      'App de produtividade Pomodoro em uma arquitetura de produção 3-tier completa: frontend React conversa com um gateway Express na frente de um backend FastAPI + PostgreSQL (Supabase).',
      'Email/senha + Google OAuth, backup na nuvem a cada 15 minutos, streaks e acompanhamento de sessões de foco — deploy em Vercel serverless com sessões JWT.',
    ],
    stats: [
      { value: '3', label: 'CAMADAS EM PRODUÇÃO', source: 'React → gateway Express → FastAPI/PostgreSQL' },
      { value: '15 MIN', label: 'CICLO DE BACKUP NA NUVEM', source: 'intervalo de autosave — backend do offmode' },
    ],
  },
  hivemind: {
    ...EN.hivemind,
    paragraphs: [
      'Um questionário de 10 perguntas que prevê se uma empresa vira lead qualificado para a nossa startup — modelos de Regressão Logística / Random Forest treinados, avaliados e em produção com 97.9% de acurácia.',
      'Na última otimização, o modelo preditivo não só caiu de 756MB (RFC) para impressionantes 1.2 kilobytes (LR) — a acurácia ainda subiu 0.22%.',
    ],
    stats: [
      { value: '97.9%', label: 'ACURÁCIA DO MODELO', source: 'benchmark do modelo — HiveMind (CV/LinkedIn)', win: true },
      { value: '~99.99%', label: 'REDUÇÃO DE CUSTO AWS S3', source: 'otimização do footprint do modelo', win: true },
    ],
  },
  diabetes: {
    ...EN.diabetes,
    paragraphs: [
      'Um questionário de saúde com 17 perguntas avaliado por um modelo scikit-learn (dataset público do Kaggle) — retorna um veredito de risco de ter ou não diabetes (com % de confiança), além de cálculo de IMC, em uma UI dark e mobile-first.',
      'Apresentado no CS50x 2025 (Projeto Final).',
    ],
    stats: [
      { value: '17', label: 'PERGUNTAS NO QUESTIONÁRIO', source: 'frontend — diabetes-indicator' },
      { value: 'V1.1.0', label: 'RELEASE PUBLICADA', source: 'changelog — diabetes-indicator-backend', animate: false },
    ],
  },
  doom: {
    ...EN.doom,
    paragraphs: [
      'DOOM (1993) compilado para WASM — linuxdoom-1.10 via Clang → wasm32 — depois empacotado com gzip + base64 em um HTML data:URI autoextraível. Zero hospedagem, zero arquivos, zero cookies.',
      'O inflate é RFC 1951/1952 escrito à mão em JavaScript. Um raycaster MicroDOOM feito do zero pesa ~44KB (menor que um favicon).',
    ],
    stats: [
      {
        value: '-51%',
        label: 'TAMANHO WASM COMPRIMIDO',
        source: '7MB → 4.4MB — descompressão em tempo real com gzip',
        win: true,
      },
      { value: '44KB', label: 'TAMANHO DO MICRODOOM', source: 'escrito à mão — menor que um favicon' },
    ],
  },
  notes: {
    ...EN.notes,
    paragraphs: [
      'Um editor web inspirado no VSCode que vive em um único arquivo HTML — usa o engine Monaco e a File System Access API para salvar direto no disco.',
      'Se você gosta do visual de codeblock do VSCode e não quer abrir uma IDE inteira só pra anotar algo rápido, esta aplicação é perfeita pra você.',
      'Também faz preview de arquivos Markdown, YAML, JSON, Swagger e PlantUML.',
    ],
    stats: [
      { value: '1', label: 'ARQUIVO, MENOS DE 60KB', source: 'Zero instalação, funciona offline' },
      { value: '5', label: 'FORMATOS DE PREVIEW NATIVOS', source: 'Markdown · JSON · YAML · Swagger · PlantUML' },
    ],
  },
};

export const FLAGSHIPS: Localized<Record<FlagshipId, FlagshipContent>> = { en: EN, pt: PT };

/* Single display order (Recruiter/Builder split removed, user 2026-07-09). */
export const FLAGSHIP_ORDER: FlagshipId[] = ['agentic', 'offmode', 'hivemind', 'diabetes', 'doom', 'notes'];

export function flagshipAnchor(id: FlagshipId): string {
  return EN[id].anchor;
}
