// "Case files" section: one problem, the decisions, the result, and a flowchart.
//
// flow.nodes: one label per node id of facts.cases[id].flow.nodes.
// flow.steps: one sentence per edge of facts.cases[id].flow.edges, in the same order.
import { facts } from '../facts.js';

const { picpay, startups } = facts;
const { bodyshop, survey, oracle } = picpay;
const { hivemind } = startups;

export const cases = {
    label: 'Case files',
    title: 'Five systems, opened up.',
    intro: 'Each file has the problem, the decisions I made and what came out. The flowcharts show how the parts talk to each other.',
    labels: {
        problem: 'The problem',
        decisions: 'What I decided',
        result: 'The result',
        flow: 'How it runs',
        stack: 'Stack',
        step: 'Step',
        links: 'Links',
        prev: 'Previous step',
        next: 'Next step',
        play: 'Play the steps',
        pause: 'Pause the steps',
    },
    items: [
        {
            id: 'bodyshop',
            kicker: `${picpay.name} · internal platform · in QA`,
            title: `${bodyshop.name}: every customer sees their own car`,
            problem: `${bodyshop.customers} customers opened the app and saw a car that was not theirs: a generic picture, or the wrong model, year or color. An internal study showed that satisfaction and retention can rise when the exact car appears.`,
            decisions: [
                'Generate once. One image for each brand, model, year and color. A registry answers before any model is called.',
                'Reserve the storage path first. The image always lives at the same S3 path, so a better image replaces a bad one and the app needs no release.',
                `Let people correct the machine. Staff write what is wrong, a more accurate model returns ${bodyshop.curationVariants} variants, and the one they pick overwrites the old file.`,
                'One layered Go monolith with REST APIs, MongoDB as an indexed registry, and S3 behind CloudFront.',
            ],
            result: `In the pilot, ${bodyshop.approvalRate} of the images passed approval at generation, with no manual curation, in under ${bodyshop.endToEnd} from request to image. The team ran latency, uptime, concurrency and security tests in QA, with governance approval.`,
            stats: [
                { value: bodyshop.customers, label: 'customers in scope' },
                { value: bodyshop.approvalRate, label: 'approved at generation (pilot)' },
                { value: `< ${bodyshop.endToEnd}`, label: 'request to image' },
                { value: `${bodyshop.engineersLed}`, label: 'engineers I led' },
            ],
            flow: {
                title: 'Generate once, then curate',
                nodes: {
                    app: 'Customer app',
                    api: 'Go API (Gin)',
                    registry: 'Vehicle registry (MongoDB)',
                    model: 'Image model',
                    storage: 'Amazon S3',
                    cdn: 'CloudFront',
                    curation: 'Curation app (React)',
                },
                steps: [
                    'The app asks for the image of one car: brand, model, year and color.',
                    'The API looks in the registry. A car that already has an image gets its path at once.',
                    'For a new car, the API reserves one S3 path.',
                    'The API calls the image model one time, with the business rules.',
                    'The image is stored at the reserved path.',
                    'CloudFront serves the image to the app.',
                    'A staff member marks a bad image and writes what to fix.',
                    `The API calls a more accurate model and gets ${bodyshop.curationVariants} variants.`,
                    'The chosen variant overwrites the same path. The app shows the new image with no release.',
                ],
            },
        },
        {
            id: 'survey',
            kicker: `${picpay.name} · internal platform`,
            title: `${survey.name}: one platform in place of many paid tools`,
            problem: `About ${survey.employees} employees answered NPS and workplace surveys on several paid tools, with little room to customize them and little control of privacy. The first plan for the replacement was a set of microservices.`,
            decisions: [
                'I asked why the plan needed microservices. One product, one team and one database did not need them. The team moved to a layered monolith.',
                'I worked on the backend API and its CI/CD tests in PHP (Hyperf).',
                'I planned the MySQL schema and indexes for survey and answer data, with Redis as a cache.',
            ],
            result: 'The old setup cost tens of thousands of US dollars a year in licenses. The projected saving is hundreds of thousands of BRL a year, with more control of privacy and of the questions.',
            stats: [
                { value: survey.employees, label: 'employees served' },
                { value: `${survey.teamSize}`, label: 'people on the team' },
                { value: '1', label: 'monolith, not a set of services' },
            ],
            flow: {
                title: 'One request, one service',
                nodes: {
                    people: 'Employees',
                    cdn: 'CloudFront',
                    web: 'Angular app',
                    api: 'PHP API (Hyperf)',
                    cache: 'Redis',
                    db: 'MySQL',
                },
                steps: [
                    'An employee opens a survey.',
                    'CloudFront delivers the Angular app.',
                    'The app sends the answers to one API.',
                    'The API reads survey data from the Redis cache.',
                    'The API writes the answers to MySQL, on indexed tables.',
                ],
            },
        },
        {
            id: 'oracle',
            kicker: `${picpay.name} · HR data`,
            title: 'Oracle HCM: a map for data that had none',
            problem: `Hundreds of Oracle Cloud HCM databases, some from systems that run since the ${oracle.legacySince}, and no documents. People kept writing new queries on top of legacy views of ${oracle.viewLines} lines, with no index and no cache.`,
            decisions: [
                'I read the data itself to find what each table and column means, and I wrote it down as an index.',
                'I wrote SQL automations and decision-support queries on top of the index.',
                'I planned a database design that replaces the legacy views.',
            ],
            result: 'The index saved hundreds of hours of research for engineers and analysts, and HR got organized data for predictive models.',
            stats: [
                { value: '100s', label: 'of databases mapped' },
                { value: oracle.viewLines, label: 'lines in one legacy view' },
                { value: oracle.legacySince, label: 'oldest system, no documents' },
            ],
            flow: {
                title: 'From unknown data to answers',
                nodes: {
                    hcm: 'Oracle Cloud HCM',
                    map: 'Data index',
                    queries: 'SQL automations',
                    views: 'Legacy views',
                    design: 'New database design',
                    science: 'Predictive models',
                },
                steps: [
                    'I map each database: tables, columns and what they mean.',
                    'Queries and automations use the index, not a guess.',
                    'The design that replaces the legacy views comes from the same index.',
                    'Organized HR data goes to the data science team.',
                ],
            },
        },
        {
            id: 'hivemind',
            kicker: `Startup MVP · ${hivemind.year}`,
            title: `${hivemind.name}: a ${hivemind.modelBefore} model that became ${hivemind.modelAfter}`,
            problem: `${hivemind.name} scores how well a company matches a product, from a short survey. The first model was a Random Forest file of about ${hivemind.modelBefore}, stored in S3 and loaded by the API.`,
            decisions: [
                `I moved the model from Random Forest to Logistic Regression: about ${hivemind.trainingAccuracy} training accuracy in a file of ${hivemind.modelAfter}.`,
                'I built a FastAPI service that loads the newest model from S3 and swaps it while it runs. A new model needs no redeploy.',
                'I modeled the data in PostgreSQL, MongoDB and Redis, and set up CI/CD on AWS and GitHub.',
            ],
            result: `Storage cost for models fell by up to ${hivemind.storageSaving}. About ${hivemind.visitors} visitors at ExpoTech ${hivemind.year} rated the product ${hivemind.rating}. It was an MVP before launch, with no real users.`,
            stats: [
                { value: hivemind.modelAfter, label: `model file, from ${hivemind.modelBefore}` },
                { value: hivemind.storageSaving, label: 'lower model storage cost' },
                { value: hivemind.trainingAccuracy, label: 'training accuracy' },
                { value: hivemind.rating, label: `from about ${hivemind.visitors} visitors` },
            ],
            flow: {
                title: 'A new model with no redeploy',
                nodes: {
                    train: 'Training run',
                    bucket: 'Amazon S3',
                    api: 'FastAPI service',
                    client: 'Sales survey',
                },
                steps: [
                    'A training run writes a new model file to S3.',
                    'The service loads the newest model and swaps it in memory.',
                    'The survey sends the answers of a company.',
                    'The service returns the match score.',
                ],
            },
        },
        {
            id: 'ruph',
            kicker: 'My own platform · in production',
            title: 'Ruph: one control plane for every app I run',
            problem: 'I run several apps on GCP, Cloudflare, Vercel, Supabase and Neon. I wanted one place that knows every app and every environment, and I wanted AI agents to help with the work without the power to change production alone.',
            decisions: [
                'One registry of apps and environments, with one API. The web dashboard, the CLI and the MCP server all use it.',
                'No change without a plan. An agent or a person writes the plan. Only a person approves it.',
                'Each apply is written to an append-only ledger. Budgets warn or pause the work.',
                'Provider plugins for GCP, Cloudflare, Vercel, Supabase and Neon. Terraform manages the access rules.',
            ],
            result: `Ruph deploys and provisions my own apps in QA and in production. GitHub Actions runs ${facts.cases.ruph.tests} tests and the PostgreSQL migration tests, and deploys only after the health checks pass. It is a private platform: I am its only operator.`,
            stats: [
                { value: facts.cases.ruph.tests, label: 'automated tests' },
                { value: '4', label: 'ways in: web, REST, CLI, MCP' },
                { value: '5', label: 'cloud providers behind one API' },
            ],
            flow: {
                title: 'Plan, approve, apply, record',
                nodes: {
                    agent: 'AI agent',
                    human: 'Me',
                    api: 'Ruph API (Hono)',
                    ledger: 'Ledger (PostgreSQL)',
                    providers: 'Cloud providers',
                    ci: 'GitHub Actions',
                },
                steps: [
                    'An agent writes a plan through the MCP server or the CLI.',
                    'I read the plan and approve it. An agent cannot approve.',
                    'The API writes the apply to the append-only ledger.',
                    'The API changes the resources at the cloud providers.',
                    'GitHub Actions deploys a new version only after tests and health checks pass.',
                ],
            },
        },
    ],
};
