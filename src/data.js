// Single source of truth for the site's content. Mirrors the PDF resume.

export const PROFILE = {
  name: 'Satya Surya Prajwal Kotha',
  shortName: 'Prajwal Kotha',
  title: 'Lead Engineer, IHG Hotels & Resorts',
  kicker: 'MuleSoft · Salesforce · Data Cloud — Integration Architect',
  location: 'Hyderabad, Telangana, India',
  email: 'k.satyasuryaprajwal@gmail.com',
  phone: '+91 94944 95234',
  photo: '/photo.jpg',
  resume: '/Prajwal_Kotha_Resume.pdf',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwalkotha' },
    { label: 'Trailblazer', href: 'https://www.salesforce.com/trailblazer/prajwalk' },
    { label: 'prajwalk.com', href: 'https://prajwalk.com' },
  ],
  summary:
    "Integration architect and lead engineer with 9+ years of end-to-end MuleSoft and Salesforce delivery: design, build, deploy and support. I own the integration architecture for IHG's P&T CRM & Loyalty, Partnerships and Integrations estate, set the standards every API is built and run to, and lead large Salesforce org-to-org migrations from planning to cutover.",
};

export const STATS = [
  { value: '9+', label: 'Years in integration' },
  { value: '100/s', label: 'Real-time sync throughput' },
  { value: '6×', label: 'Salesforce certified' },
  { value: '2M+', label: 'Records migrated between orgs' },
  { value: '9', label: 'Salesforce orgs integrated' },
  { value: '90%', label: 'Manual effort removed' },
];

// `kind` picks the Mule component the timeline node is drawn as.
export const EXPERIENCE = [
  {
    role: 'Lead Engineer - IT Software Development & Maintenance',
    org: 'IHG Hotels & Resorts',
    team: 'P&T CRM & Loyalty, Partnerships & Integrations',
    period: '04/2026 – Present',
    where: 'WFH · Full-time',
    kind: 'HTTP Request',
    current: true,
    bullets: [
      ['Production integrations', 'Build and maintain the production MuleSoft integration estate across Salesforce, partner and internal systems: new builds, upgrades, monitoring, incidents and enhancements.'],
      ['Migration platform', 'Designed and built a reusable Salesforce org-to-org migration tool (API, web UI and MCP tool) covering any objects including Files; migrated around 200,000 records across multiple objects and cut migration effort by around 80%.'],
      ['SOAP retirement', 'Migrated all production APIs from Salesforce SOAP login to External Client Apps (OAuth 2.0) before Salesforce retires the endpoint, and removed all stored usernames, passwords and tokens.'],
      ['Runtime upgrade', 'Upgraded the MuleSoft estate to the Long-Term Support runtime on Java 17, moving off the EDGE channel and Java 8. This cut the forced-upgrade cycle and made the platform cheaper to maintain.'],
      ['Security', 'All secrets are now encrypted in configuration and masked at runtime, keystores were removed from the repositories and the TLS setup was reworked.'],
      ['Observability', 'Consistent logging, alerting and monitoring across all applications with Sumo Logic, deployment alerts and API Insights; fixed several applications where logs were silently being dropped.'],
      ['Shared tooling', 'Published assets that keep the standards in place: an API template with logging and security built in, a performance dashboard, a migration tracker, a secure properties UI and a CyberArk connector.'],
      ['Deal Underwriting automation', 'Pulled data from multiple sources into MuleSoft and generated the Investment Analysis Excel workbook (almost 50 sheets, over 10,000 fields with cross-referenced formulas) and the Capital Paper with all details and screenshots. Work that took 10 to 15 days per workbook and 20 days per Capital Paper now completes in minutes, around 90% less effort for the team.'],
      ['Owner Portal', "Developed and integrated the Owner Portal (IHG's self-service portal for hotel owners) and took it through testing to production."],
      ['Org migration', 'Completed the OF to OPS Salesforce org migration on a tight schedule and refreshed the environments for the Javelin, OPS, OF and GOLS Salesforce orgs.'],
    ],
    awards: [],
  },
  {
    role: 'MuleSoft Architect',
    org: 'Independent Professional Services, Inc.',
    team: 'Client: InterContinental Hotels Group (IHG)',
    period: '09/2025 – 03/2026',
    where: 'WFH · Contractor',
    kind: 'Scatter-Gather',
    bullets: [
      ['Real-time integrations', 'Architected Salesforce to AT&T integrations and delivered the Javelin to Concerto integration for real-time hotel and operational data exchange.'],
      ['AI and data', 'Designed MuleSoft integration approaches for Agentforce and Data Cloud to support data unification and analytics.'],
      ['Reusable patterns', 'Built components for structured logging, observability, error handling and fault-tolerant message flows, and contributed to the enterprise CyberArk integration for credential security.'],
    ],
    awards: [],
  },
  {
    role: 'Application Development Team Lead',
    org: 'Accenture',
    team: 'Client: InterContinental Hotels Group (IHG)',
    period: '12/2021 – 09/2025',
    where: 'Hyderabad',
    kind: 'APIkit Router',
    intro: 'Led the integration of 9 Salesforce orgs with external systems and within Salesforce itself.',
    bullets: [
      ['File transfer', 'Built the file transfer architecture between Salesforce orgs and SharePoint, a reusable asset that worked around MuleSoft connector limits and beat the standard Salesforce component.'],
      ['2 million records', 'Led the migration of 14 objects and 2 million records between Salesforce orgs on MuleSoft, with web-based Excel tooling for input and output and completion notifications to users.'],
      ['Real-time sync', 'Designed a real-time data sync architecture between Salesforce orgs covering 40 objects on API-led architecture, handling 100 requests per second.'],
      ['ETL replacement', 'Replaced the legacy Salesforce ETL integrations with MuleSoft and set up a real-time Tableau to Salesforce sync that cut licensing costs.'],
      ['CI/CD and automation', 'Built the GitHub to Jenkins pipeline, led the Buxton, IMT and GRS integrations, documented all APIs and delivered automation that cut manual effort by 90%.'],
    ],
    awards: ['TechStars of the Year, Accenture Global (2024-25)', 'PINACCLE Award (North America)', 'ACE Award, twice'],
  },
  {
    role: 'Application Development Senior Analyst',
    org: 'Accenture',
    team: 'Client: InterContinental Hotels Group (IHG)',
    period: '08/2020 – 11/2021',
    where: 'Hyderabad',
    kind: 'Choice',
    bullets: [
      ['External systems', 'Integrated Salesforce with Cvent, MDM, ServiceNow, ChargeAfter and SFTP on API-led architecture, including complex logic and transformations where external responses were delayed.'],
      ['Data automation', 'Automated multi-org Salesforce data extraction to SFTP for Cvent and built the MDM to Salesforce API that updates D&B and other fields in bulk with a reconciliation sheet.'],
    ],
    awards: ['Star Performer of the Month: Nov 2020, Mar 2021, Jul 2021'],
  },
  {
    role: 'Systems Engineer',
    org: 'TCS',
    team: 'Client: Farmers Insurance',
    period: '08/2019 – 06/2020',
    where: 'Hyderabad',
    kind: 'Transform Message',
    bullets: [
      ['Mule 4 migration', 'Built document and data management APIs for Farmers Insurance, migrated 20 APIs from Mule 3 to Mule 4 and wrote MUnit tests for around 50 APIs with complex DataWeave transformations.'],
      ['Releases and support', 'Prepared deployment checklists, handled production support within SLA and built a GitHub property audit tool.'],
    ],
    awards: ['Star Performer of the Quarter (Q3 2019)'],
  },
  {
    role: 'Assistant System Engineer',
    org: 'TCS',
    team: 'Clients: Farmers Insurance and TCS Internal',
    period: '08/2017 – 07/2019',
    where: 'Hyderabad',
    kind: 'HTTP Listener',
    bullets: [
      ['DocuSign and connectors', 'Integrated DocuSign with the document management system and delivered pass-through APIs on CloudHub and on-premises using WMQ, Database, FTP, SFTP, HTTP and Salesforce connectors.'],
      ['Chatbot and Java', 'Developed an internal chatbot (EIVA and Timesheet) for TCS using Azure LUIS and Node.js, and worked on Java implementations for the United Airlines project.'],
    ],
    awards: ['Quick Learner Award, for picking up MuleSoft fast and shipping APIs early'],
  },
];

export const SKILLS = [
  {
    group: 'MuleSoft',
    items: ['MuleSoft 4.x (LTS, Java 17)', 'Anypoint Platform', 'CloudHub', 'API-led architecture', 'RAML / OAS', 'REST / SOAP', 'DataWeave 2.0', 'MUnit', 'Exchange', 'Runtime Manager'],
  },
  {
    group: 'Salesforce',
    items: ['Data Cloud (Data 360)', 'Agentforce', 'Platform Events', 'External Client Apps / OAuth', 'Org-to-org migration', 'Files'],
  },
  {
    group: 'Security & operations',
    items: ['CyberArk', 'Secure Properties', 'Sumo Logic', 'API Insights', 'Git (Bitbucket, GitHub)', 'Jenkins CI/CD', 'Maven', 'Postman'],
  },
  {
    group: 'Languages & data',
    items: ['Java', 'Node.js', 'Python', 'SQL', 'JSON / XML / YAML', 'SFTP', 'SharePoint', 'MDM', 'Agile Scrum', 'MCP tooling'],
  },
];

export const CERTIFICATIONS = [
  { name: 'MuleSoft Developer', img: '/certs/mulesoft-developer.png' },
  { name: 'MuleSoft Developer II', img: '/certs/mulesoft-developer-2.png' },
  { name: 'MuleSoft Platform Integration Architect', img: '/certs/mulesoft-integration-architect.png' },
  { name: 'MuleSoft Platform Architect', img: '/certs/mulesoft-platform-architect.png' },
  { name: 'Platform Administrator', img: '/certs/platform-administrator.png' },
  { name: 'Data 360 Consultant', img: '/certs/data-360-consultant.png' },
];

export const EDUCATION = {
  school: 'Andhra University',
  degree: "Bachelor's Degree, Computer Science and Engineering",
  date: '04/2017',
};
