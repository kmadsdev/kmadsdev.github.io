// Page title, navigation, footer, the 404 page and the "From my Figma" row.
import { facts } from '../facts.js';

const { person, picpay, consignado } = facts;

export const meta = {
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: `${person.name} (${person.aliasUpper}) · Software Engineer · Architecture & Cloud`,
    description: `Software Engineer at ${picpay.name}. Backend, architecture and cloud on AWS, GCP and Azure, in Java, Go, Python and SQL. Work experience, applications in production with their architecture, and public code.`,
};

export const nav = {
    skip: 'Skip to content',
    home: 'Back to the top',
    menu: 'Sections',
    items: [
        { id: 'intro', label: 'Introduction' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'applications', label: 'Applications' },
        { id: 'more', label: 'More' },
        { id: 'contact', label: 'Contact' },
    ],
    open: 'Open the menu',
    close: 'Close the menu',
    language: 'Language',
    languages: { en: 'English', pt: 'Portuguese' },
};

export const footer = {
    line: `Designed and built by ${person.name}.`,
    source: 'Source code of this site',
    license: 'Code under the MIT license. Texts and images are mine.',
    top: 'Back to the top',
};

export const notFound = {
    title: 'This page does not exist',
    text: 'The address is wrong, or the page moved. The portfolio is one page, and it starts here:',
    cta: 'Open the portfolio',
};

// The row of original diagrams. Files, sizes and places: facts.figma, in the order of facts.figmaOrder.
export const figma = {
    title: 'From my Figma',
    lead: 'The drawings I made while I designed these systems.',
    open: 'Open the diagram large',
    close: 'Close the diagram',
    items: {
        'consignado-aks': {
            title: 'Consignado API on AKS, first version',
            caption: `My first drawing of the Kubernetes host of ${consignado.name}: a load balancer, one service, two pods and PostgreSQL over TLS. The live platform now has a gateway and an internal load balancer in front.`,
            alt: 'Architecture diagram. A user sends HTTP to a load balancer that accepts only allowed IP addresses. The load balancer sends the request to the service consignado-api in an AKS cluster with 2 to 3 pods. Two Spring Boot pods connect to Azure PostgreSQL over TLS. Dashed lines go from the cluster to ACR, Key Vault and Entra ID, which are used only when a pod starts. Logs and metrics go to Azure Monitor.',
        },
        'consignado-pod-start': {
            title: 'How a pod starts with no stored secret',
            caption: 'Seven steps, from the schedule of the pod to its first traffic. The pink lines are trust with no stored secret.',
            alt: 'Diagram of seven steps in a line. 1: AKS schedules the pod on the node. 2: the kubelet pulls the image from ACR. 3: the service account token becomes an Azure token at Entra ID, by workload identity. 4: the CSI driver reads the database password from Key Vault. 5: the Spring Boot container starts with the password. 6: Flyway migrates Azure PostgreSQL over TLS and readiness is up. 7: the pod is ready and the Service sends traffic to it.',
        },
        'ruph-ship': {
            title: 'How Ruph ships',
            caption: 'A change on GitHub triggers the automatic tests and a build. The build goes to QA and then to PROD. It signs in with no stored key (WIF), and a rollback is one click.',
            alt: 'Flow diagram with the title "How we ship". GitHub triggers automatic tests, which lead to a build of the app in a container. The build is deployed to QA, where it is checked first, and then promoted to PROD. A dashed line from the build goes to a box "No stored keys: GitHub proves who it is (WIF)". A dashed line from PROD goes to "One-click rollback". A note says that nothing reaches PROD without passing tests and QA.',
        },
        'devops-challenge': {
            title: 'DevOps challenge architecture',
            caption: 'A browser, a frontend, a Python writer and a Go reader, with Redis between the two services.',
            alt: 'Diagram with four boxes. The browser talks to the frontend over HTTP. The frontend sends and fetches data: it posts to a writer service in Python and gets from a reader service in Go. The writer posts to Redis and the reader gets from Redis.',
        },
    },
};
