import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  Code2,
  Terminal,
  Cloud,
  Database,
  Shield,
  Zap,
  GitBranch,
  FileCode,
  Layers,
  Settings,
  Cpu,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Globe,
  Lock,
  Activity,
  Wrench,
  Boxes,
  Sparkles,
  ExternalLink,
  Copy,
  X,
  Workflow,
  Award,
  GraduationCap,
  Briefcase,
  Trophy,
  BadgeCheck,
  Maximize2,
  Minimize2,
  Variable,
  Split,
  Send,
  Inbox,
  Repeat,
  Hash,
  MessageSquare,
  FileText,
  ChevronsRight,
  Wifi,
  Save,
  Bug,
  Server,
} from 'lucide-react';

// ==================== DATA ====================

const PALETTE = [
  {
    name: 'Connectors',
    icon: Cloud,
    color: '#00B4FF',
    items: [
      'HTTP Listener',
      'HTTP Request',
      'Salesforce',
      'Database',
      'SFTP',
      'FTP',
      'WMQ',
      'JMS',
      'ServiceNow',
      'SharePoint',
      'Workday',
      'DocuSign',
      'Cvent',
    ],
  },
  {
    name: 'Core Components',
    icon: Settings,
    color: '#7C9EFF',
    items: [
      'Logger',
      'Choice',
      'Transform Message',
      'Set Variable',
      'Try / Catch',
      'For Each',
      'Flow Reference',
      'Scatter-Gather',
      'Async',
    ],
  },
  {
    name: 'DataWeave 2.0',
    icon: Workflow,
    color: '#00E5C5',
    items: [
      'Mappings',
      'Custom Functions',
      'Modules',
      'CSV / JSON / XML',
      'Type Validation',
      'Recursion',
    ],
  },
  {
    name: 'APIs & Specs',
    icon: FileCode,
    color: '#9F7CFF',
    items: [
      'REST',
      'SOAP',
      'RAML',
      'OAS / Swagger',
      'Postman',
      'API-Led Architecture',
    ],
  },
  {
    name: 'Platforms',
    icon: Boxes,
    color: '#7C9EFF',
    items: [
      'Anypoint Platform',
      'CloudHub',
      'MuleSoft 4.x',
      'MuleSoft 3.x',
      'On-Premises',
      'Anypoint Exchange',
    ],
  },
  {
    name: 'Security',
    icon: Shield,
    color: '#FF8A4D',
    items: [
      'CyberArk Conjur',
      'OAuth 2.0',
      'API Policies',
      'Client Credentials',
    ],
  },
  {
    name: 'DevOps & Testing',
    icon: GitBranch,
    color: '#FFD24D',
    items: [
      'GitHub',
      'Bitbucket',
      'SVN',
      'Jenkins',
      'Apache Maven',
      'CI/CD Pipelines',
      'MUnit',
    ],
  },
  {
    name: 'Languages',
    icon: Code2,
    color: '#00FF99',
    items: [
      'Core Java',
      'Node.js',
      'JavaScript',
      'SQL / MySQL',
      'JSON',
      'XML',
      'YAML',
    ],
  },
  {
    name: 'Salesforce Ecosystem',
    icon: Sparkles,
    color: '#00B4FF',
    items: [
      'Salesforce',
      'Agentforce',
      'Data Cloud',
      'Tableau',
      'MDM',
      'ETL Migration',
    ],
  },
  {
    name: 'Systems Integrated',
    icon: Cpu,
    color: '#FF6B6B',
    items: [
      'IHG',
      'AT&T',
      'Buxton',
      'IMT',
      'GRS',
      'Charge After',
      'ServiceNow',
      'Cvent',
      'MDM',
      'Farmers Insurance',
      'United Airlines',
    ],
  },
];

const CERTIFICATIONS = [
  { short: 'Developer', full: 'MuleSoft Certified Developer' },
  { short: 'Developer II', full: 'MuleSoft Certified Developer II' },
  {
    short: 'Integration Architect',
    full: 'MuleSoft Platform Integration Architect',
  },
  { short: 'Platform Architect', full: 'MuleSoft Platform Architect' },
  { short: 'Administrator', full: 'MuleSoft Platform Administrator' },
];

// Component icon types map to Mule visual archetypes
const FLOW = [
  {
    id: 'edu',
    label: 'career-start-listener',
    type: 'HTTP Listener',
    componentKind: 'http-listener',
    color: '#00B4FF',
    icon: GraduationCap,
    docId: 'cs-http-listener',
    summary: 'B.E. Computer Science',
    period: '04/2017',
    org: 'Andhra University',
    role: "Bachelor's degree",
    location: 'India',
    config: ['Path: /career/start', 'Method: GET', 'Output: foundation'],
    bullets: [
      "Bachelor's degree in Computer Science and Engineering.",
      'Foundation in software engineering, data structures, and systems design.',
      'Graduated April 2017.',
    ],
    awards: [],
  },
  {
    id: 'tcs-trainee',
    label: 'tcs-trainee-flow',
    type: 'Set Variable',
    componentKind: 'set-variable',
    color: '#7C9EFF',
    icon: FileCode,
    docId: 'tcs-trainee-set-var',
    summary: 'Asst. System Engineer — Trainee',
    period: '08/2017 – 07/2018',
    org: 'TCS · TCS Internal',
    role: 'Trainee',
    location: 'Hyderabad',
    config: [
      'Variable: career',
      'Scope: trainee',
      'Stack: Azure LUIS, Node.js, Java',
    ],
    bullets: [
      'Developed Chat-BOT (EIVA and Timesheet) for TCS internally using Azure LUIS and Node.js.',
      'Worked on Java implementations in the United Airlines Project.',
      'Built foundation in enterprise development and AI-adjacent tooling.',
    ],
    awards: [],
  },
  {
    id: 'tcs-asst',
    label: 'tcs-farmers-asst-flow',
    type: 'Set Variable',
    componentKind: 'set-variable',
    color: '#7C9EFF',
    icon: FileCode,
    docId: 'tcs-asst-set-var',
    summary: 'Asst. System Engineer',
    period: '08/2018 – 07/2019',
    org: 'TCS · Farmers Insurance',
    role: 'Assistant System Engineer',
    location: 'Hyderabad',
    config: [
      'Variable: experience',
      'Connectors: WMQ, DB, FTP, SFTP, HTTPS, Salesforce',
      'Runtime: CloudHub + On-Premises',
    ],
    bullets: [
      'Integrated DocuSign with the Farmers Insurance document management system.',
      'Worked across WMQ, Database, FTP, SFTP, HTTP/HTTPS, and Salesforce connectors.',
      'Implemented pass-through APIs in CloudHub and on-premises.',
      'Strong DataWeave foundation — solved complex transformation problems.',
    ],
    awards: ['🚀 Quick Learner Award — rapid MuleSoft adoption'],
  },
  {
    id: 'tcs-systems',
    label: 'tcs-farmers-engineer-flow',
    type: 'Transform Message',
    componentKind: 'transform',
    color: '#00E5C5',
    icon: Workflow,
    docId: 'tcs-systems-transform',
    summary: 'Systems Engineer',
    period: '08/2019 – 06/2020',
    org: 'TCS · Farmers Insurance',
    role: 'Systems Engineer',
    location: 'Hyderabad',
    config: [
      'Output: application/java',
      'MUnit coverage: 50+ APIs',
      'Migration: MuleSoft 3 → 4 (20 APIs)',
    ],
    bullets: [
      'Built APIs for an insurance company focused on document and data management.',
      'Migrated 20 APIs from MuleSoft 3 to MuleSoft 4.',
      'Created reusable component to read GitHub project files and validate environment properties via Excel.',
      'Implemented MUnits for ~50 APIs and developed complex DataWeave transformations.',
      'Owned PROD deployment checklists, documentation, and hyper-care production support.',
    ],
    awards: ['⭐ Star Performer of the Quarter (Q3 2019)'],
  },
  {
    id: 'accenture-senior',
    label: 'accenture-senior-analyst-choice',
    type: 'Choice',
    componentKind: 'choice',
    color: '#9F7CFF',
    icon: Layers,
    docId: 'accenture-senior-choice',
    summary: 'Application Dev Senior Analyst',
    period: '08/2020 – 11/2021',
    org: 'Accenture · IHG',
    role: 'Senior Analyst',
    location: 'Hyderabad',
    config: [
      'Routes: Cvent / MDM / SFTP / ServiceNow / Charge After',
      'Pattern: API-Led',
      'Real-time sync: enabled',
    ],
    bullets: [
      'Integrated Salesforce with Cvent, MDM, SFTP, and other systems with complex transformations.',
      'Built MuleSoft automation pulling data across Salesforce orgs into SFTP for Cvent ingestion.',
      'Real-time sync between Charge After and Salesforce for case comments and attachments.',
      'ServiceNow ↔ Salesforce case sync via API-Led architecture.',
      'High-volume MDM API updating D&B fields across Salesforce objects with SFTP response logging.',
    ],
    awards: [
      '⭐ Star Performer of the Month — Nov 2020',
      '⭐ Star Performer of the Month — Mar 2021',
      '⭐ Star Performer of the Month — Jul 2021',
    ],
  },
  {
    id: 'accenture-lead',
    label: 'accenture-team-lead-router',
    type: 'APIKit Router',
    componentKind: 'apikit-router',
    color: '#FF6B6B',
    icon: Trophy,
    docId: 'accenture-lead-router',
    summary: 'Application Dev Team Lead',
    period: '12/2021 – 09/2025',
    org: 'Accenture · IHG',
    role: 'Team Lead',
    location: 'Hyderabad',
    config: [
      'API: ihg-salesforce-orchestrator',
      'Routes: 9 Salesforce orgs + Buxton + IMT + GRS',
      'Throughput: 100 req/sec real-time sync',
      'Migration: 14 objects · 2M records',
      'Automation gain: 90%',
    ],
    bullets: [
      'Led integration of 9 Salesforce orgs across external systems and Salesforce-to-Salesforce flows.',
      'Built reusable file-transfer asset between Salesforce orgs, Salesforce ↔ SharePoint — broke through MuleSoft connector limits.',
      'Established real-time Tableau ↔ Salesforce sync, reducing licensing costs and improving forecast accuracy.',
      'Led migration of 14 objects and 2M records between Salesforce orgs using MuleSoft, with Excel-driven web UI for input/output.',
      'Designed real-time data sync across 40 objects with API-Led architecture handling 100 req/sec.',
      'Replaced Salesforce legacy ETL integrations with MuleSoft — superior performance and reliability via automation.',
      'Built Jenkins CI/CD pipeline integrating GitHub and Jenkins.',
      'Led integrations with Buxton, IMT, GRS and other third-party systems.',
      'Reduced manual effort by 90% through proactive automation.',
    ],
    awards: [
      '🏆 TechStars of the Year — Accenture Global (2024-25)',
      '🏆 PINACCLE Award — Across NA',
      '🏆 ACE Award × 2 (SME)',
    ],
  },
  {
    id: 'ihg-current',
    label: 'ihg-mulesoft-architect-request',
    type: 'HTTP Request',
    componentKind: 'http-request',
    color: '#00FF99',
    icon: Briefcase,
    docId: 'ihg-architect-current',
    summary: 'MuleSoft Architect — IHG',
    period: '09/2025 – Present',
    org: 'Independent Professional Services · IHG',
    role: 'MuleSoft Architect (Contractor, WFH)',
    location: 'Remote',
    isCurrent: true,
    config: [
      'Target: Salesforce ↔ AT&T',
      'Pattern: API-Led, real-time',
      'Roadmap: Agentforce + Data Cloud',
      'Security: CyberArk Conjur',
      'Status: live',
    ],
    bullets: [
      'Architecting and implementing Salesforce ↔ AT&T integrations using scalable API-Led designs for real-time hotel and operational data exchange.',
      'Designing integration approaches for MuleSoft Agentforce and Salesforce Data Cloud for future data unification and analytics.',
      'Building reliable integration patterns with reusable components for structured logging, observability, error handling, and fault-tolerant flows.',
      'Contributing to enterprise CyberArk integration strengthening credential security and API authentication across MuleSoft systems.',
      'Delivered and supported the Javelin–Concerto integration — seamless data flow and system interoperability.',
    ],
    awards: [],
  },
];

const SUB_FLOW_CERTS = {
  name: 'certifications-validation-subflow',
  docId: 'certs-validation-sf',
  components: CERTIFICATIONS.map((c, i) => ({
    id: `cert-${i}`,
    label: c.short.toLowerCase().replace(/\s+/g, '-'),
    type: 'Logger',
    componentKind: 'logger',
    color: '#9F7CFF',
    summary: c.short,
    fullName: c.full,
    docId: `cert-${i}-logger`,
  })),
};

const STATS = [
  { label: 'Years experience', value: '8+', color: '#00B4FF' },
  { label: 'MuleSoft certs', value: '5×', color: '#9F7CFF' },
  { label: 'Salesforce orgs led', value: '9', color: '#00E5C5' },
  { label: 'Records migrated', value: '2M+', color: '#FF6B6B' },
  { label: 'Throughput', value: '100/s', color: '#FFD24D' },
  { label: 'Effort reduced', value: '90%', color: '#00FF99' },
  { label: 'APIs MS3→MS4', value: '20', color: '#7C9EFF' },
  { label: 'Major awards', value: '4', color: '#FF8A4D' },
];

// Realistic Mule log lines
const formatTimestamp = (offset = 0) => {
  const base = new Date('2026-04-30T10:45:23.123');
  const d = new Date(base.getTime() + offset);
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(
    d.getMilliseconds(),
    3
  )}`;
};

const BOOT_LOGS = [
  {
    offset: 0,
    level: 'INFO',
    logger: 'org.mule.runtime.MuleContextLifecycleManager',
    text: 'Mule Runtime 4.6.0 starting up...',
  },
  {
    offset: 142,
    level: 'INFO',
    logger: 'o.m.r.module.deployment.internal.DefaultArchiveDeployer',
    text: 'Deploying application: prajwal-kotha-resume',
  },
  {
    offset: 287,
    level: 'INFO',
    logger:
      'org.mule.runtime.core.api.config.bootstrap.ArtifactBootstrapServiceDiscoverer',
    text: 'Loading flow: career-progression-flow',
  },
  {
    offset: 401,
    level: 'INFO',
    logger: 'org.mule.extension.http.internal.listener.HttpListener',
    text: 'Started HTTP Listener on path: /career/start',
  },
  {
    offset: 489,
    level: 'INFO',
    logger: 'org.mule.extension.cyberark.conjur.ConjurConnectionProvider',
    text: 'CyberArk Conjur vault connected · 5 secrets resolved',
  },
  {
    offset: 612,
    level: 'INFO',
    logger: 'org.mule.extension.salesforce.SalesforceConnectionProvider',
    text: 'Authenticated 9 Salesforce organizations · session active',
  },
  {
    offset: 738,
    level: 'INFO',
    logger: 'org.mule.runtime.module.apikit.console.APIKitConsoleService',
    text: 'APIKit router registered: ihg-salesforce-orchestrator',
  },
  {
    offset: 825,
    level: 'INFO',
    logger: 'org.mule.runtime.module.deployment.internal.MuleApplicationStatus',
    text: 'Application prajwal-kotha-resume :: STARTED',
  },
];

// ==================== MULE COMPONENT VISUAL ====================
// Renders the iconic shape for each Mule component type
const ComponentVisual = ({
  kind,
  color,
  size = 56,
  glow = false,
  icon: Icon,
}) => {
  const baseStyle = {
    width: size,
    height: size,
    background: `linear-gradient(180deg, ${color}33 0%, ${color}11 100%)`,
    border: `1.5px solid ${color}`,
    boxShadow: glow
      ? `0 0 24px ${color}88, inset 0 0 12px ${color}33`
      : `0 2px 8px rgba(0,0,0,0.4)`,
    transition: 'all 0.3s ease',
  };

  // Different shapes for different component kinds
  if (kind === 'http-listener') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ ...baseStyle, borderRadius: '50%' }}
      >
        {Icon && <Icon size={size * 0.4} style={{ color }} strokeWidth={1.8} />}
        <div
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    );
  }
  if (kind === 'http-request') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ ...baseStyle, borderRadius: '50%' }}
      >
        {Icon && <Icon size={size * 0.4} style={{ color }} strokeWidth={1.8} />}
        <div
          className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    );
  }
  if (kind === 'choice') {
    // Diamond shape via rotated square
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute"
          style={{
            ...baseStyle,
            transform: 'rotate(45deg)',
            borderRadius: '8px',
            width: size * 0.85,
            height: size * 0.85,
            top: size * 0.075,
            left: size * 0.075,
          }}
        />
        <div className="relative" style={{ color }}>
          {Icon && <Icon size={size * 0.4} strokeWidth={1.8} />}
        </div>
      </div>
    );
  }
  if (kind === 'apikit-router') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ ...baseStyle, borderRadius: '8px', width: size * 1.15 }}
      >
        {Icon && <Icon size={size * 0.4} style={{ color }} strokeWidth={1.8} />}
        {/* output dots indicating multiple routes */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute -right-1 w-1.5 h-1.5 rounded-full"
            style={{
              background: color,
              top: `${30 + i * 18}%`,
              boxShadow: `0 0 4px ${color}`,
            }}
          />
        ))}
      </div>
    );
  }
  if (kind === 'transform') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ ...baseStyle, borderRadius: '8px' }}
      >
        {Icon && <Icon size={size * 0.4} style={{ color }} strokeWidth={1.8} />}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 rounded text-[7px] font-mono font-bold"
          style={{ background: color, color: '#0A0E1A' }}
        >
          DW
        </div>
      </div>
    );
  }
  if (kind === 'logger') {
    return (
      <div
        className="flex items-center justify-center"
        style={{ ...baseStyle, borderRadius: '6px' }}
      >
        <MessageSquare size={size * 0.4} style={{ color }} strokeWidth={1.8} />
      </div>
    );
  }
  // default: set-variable, flow-ref, etc.
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ ...baseStyle, borderRadius: '8px' }}
    >
      {Icon && <Icon size={size * 0.4} style={{ color }} strokeWidth={1.8} />}
    </div>
  );
};

// ==================== FLOW NODE ====================
const FlowNode = ({ node, isSelected, isActive, onClick, index }) => {
  const Icon = node.icon;
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer flex flex-col items-center group flex-shrink-0"
      style={{ width: 110 }}
    >
      {/* Index badge */}
      <div
        className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold z-20"
        style={{ background: node.color, color: '#0A0E1A' }}
      >
        {index + 1}
      </div>

      {/* Live badge */}
      {node.isCurrent && (
        <div
          className="absolute -top-1 right-2 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider z-20 flex items-center gap-1"
          style={{ background: '#00FF99', color: '#0A0E1A' }}
        >
          <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
          Live
        </div>
      )}

      {/* Selection ring */}
      {isSelected && (
        <div
          className="absolute -inset-2 rounded-xl border-2 border-dashed pointer-events-none"
          style={{ borderColor: node.color, opacity: 0.6 }}
        />
      )}

      {/* The component visual */}
      <div className="pt-3">
        <ComponentVisual
          kind={node.componentKind}
          color={node.color}
          size={56}
          glow={isActive}
          icon={Icon}
        />
      </div>

      {/* Component type label */}
      <div
        className="text-[9px] font-mono uppercase tracking-wider mt-2 px-1 text-center"
        style={{ color: node.color }}
      >
        {node.type}
      </div>

      {/* Display name */}
      <div className="text-[10px] font-semibold text-slate-100 leading-tight text-center mt-0.5 px-1 line-clamp-2 max-w-full">
        {node.summary}
      </div>

      {/* Period */}
      <div className="text-[8px] font-mono text-slate-500 mt-0.5 truncate max-w-full">
        {node.period}
      </div>

      {/* doc:id */}
      <div className="text-[7px] font-mono text-slate-600 mt-0.5 truncate max-w-full opacity-70">
        {node.docId}
      </div>
    </div>
  );
};

// ==================== FLOW CONTAINER ====================
// The labeled box wrapping a flow's components — the iconic Mule visual
const FlowContainer = ({
  name,
  docId,
  type = 'flow',
  children,
  color = '#00B4FF',
  subtitle,
}) => {
  const isSubFlow = type === 'sub-flow';
  return (
    <div
      className="relative mb-8 rounded-lg overflow-hidden"
      style={{
        background: isSubFlow
          ? 'rgba(159, 124, 255, 0.04)'
          : 'rgba(0, 180, 255, 0.04)',
        border: `1px solid ${color}55`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 ${color}22`,
      }}
    >
      {/* Flow header bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{
          borderColor: `${color}33`,
          background: `linear-gradient(90deg, ${color}22, transparent)`,
        }}
      >
        {isSubFlow ? (
          <ChevronsRight size={12} style={{ color }} />
        ) : (
          <Workflow size={12} style={{ color }} />
        )}
        <span
          className="text-[10px] font-mono uppercase tracking-wider opacity-70"
          style={{ color }}
        >
          {type}
        </span>
        <span className="text-[12px] font-mono font-semibold text-slate-100">
          {name}
        </span>
        <span className="text-[10px] font-mono text-slate-500">
          doc:id="{docId}"
        </span>
        {subtitle && (
          <span className="text-[10px] font-mono text-slate-500 ml-2">
            · {subtitle}
          </span>
        )}
        <div className="flex-1" />
        <button className="text-slate-500 hover:text-slate-300 p-0.5">
          <Minimize2 size={10} />
        </button>
        <button className="text-slate-500 hover:text-slate-300 p-0.5">
          <Copy size={10} />
        </button>
      </div>
      {/* Body */}
      <div className="p-4">{children}</div>
    </div>
  );
};

// ==================== FLOW RAIL ====================
// The line connecting components, with optional message bubble
const FlowRail = ({ children, messagePosition, showMessage, sourceColor }) => {
  const railTop = 56; // matches ComponentVisual y-center after pt-3 padding
  return (
    <div className="relative" style={{ minHeight: 140 }}>
      {/* The rail line - extends across the full width */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: railTop, height: 2 }}
      >
        {/* Source attachment indicator on the left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <div
            className="w-3 h-3 rounded-full border-2"
            style={{
              borderColor: sourceColor,
              background: 'rgba(0,180,255,0.2)',
            }}
          />
          <div
            className="h-0.5"
            style={{
              width: 16,
              background: `linear-gradient(90deg, ${sourceColor}, transparent)`,
            }}
          />
        </div>
        {/* Main rail line */}
        <div
          className="absolute"
          style={{
            left: 24,
            right: 24,
            top: 0,
            height: 2,
            background: 'linear-gradient(90deg, #2A3348 0%, #2A3348 100%)',
          }}
        />
        {/* End indicator on the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <ArrowRight size={14} className="text-slate-600" />
        </div>
        {/* Message bubble */}
        {showMessage && (
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
            style={{ left: `${messagePosition}px` }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: '#00FF99',
                boxShadow: '0 0 16px #00FF99, 0 0 32px #00FF9988',
              }}
            >
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: '#00FF99', opacity: 0.6 }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Components */}
      <div
        className="relative flex items-start gap-2"
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        {children}
      </div>
    </div>
  );
};

// ==================== SUB-FLOW (Certifications) ====================
const SubFlowCerts = ({ activeIndex, isRunning }) => {
  return (
    <FlowContainer
      name={SUB_FLOW_CERTS.name}
      docId={SUB_FLOW_CERTS.docId}
      type="sub-flow"
      color="#9F7CFF"
      subtitle="5× MuleSoft certified"
    >
      <div
        className="relative flex items-start gap-3"
        style={{ paddingLeft: 8 }}
      >
        {/* Rail line for subflow */}
        <div
          className="absolute left-2 right-2 pointer-events-none"
          style={{ top: 56, height: 2, background: '#2A3348' }}
        />
        {SUB_FLOW_CERTS.components.map((c, i) => (
          <React.Fragment key={c.id}>
            <div
              className="relative flex flex-col items-center flex-shrink-0"
              style={{ width: 110 }}
            >
              <div className="pt-3">
                <ComponentVisual
                  kind="logger"
                  color={c.color}
                  size={48}
                  icon={BadgeCheck}
                />
              </div>
              <div
                className="text-[9px] font-mono uppercase tracking-wider mt-2 text-center"
                style={{ color: c.color }}
              >
                Logger
              </div>
              <div className="text-[10px] font-semibold text-slate-100 text-center mt-0.5 px-1 leading-tight">
                {c.summary}
              </div>
              <div
                className="text-[7px] font-mono text-slate-500 mt-1 truncate max-w-full text-center"
                title={c.fullName}
              >
                {c.fullName.length > 22
                  ? c.fullName.slice(0, 22) + '…'
                  : c.fullName}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </FlowContainer>
  );
};

// ==================== PALETTE ====================
const PaletteCategory = ({ cat, expanded, onToggle, search }) => {
  const Icon = cat.icon;
  const filtered = cat.items.filter(
    (i) => !search || i.toLowerCase().includes(search.toLowerCase())
  );
  if (search && filtered.length === 0) return null;
  const showExpanded = expanded || search;

  return (
    <div className="border-b border-slate-800/60">
      <button
        onClick={onToggle}
        className="w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-800/40 transition-colors"
      >
        {showExpanded ? (
          <ChevronDown size={12} className="text-slate-500" />
        ) : (
          <ChevronRight size={12} className="text-slate-500" />
        )}
        <Icon size={14} style={{ color: cat.color }} />
        <span className="text-xs font-medium text-slate-300 flex-1 text-left">
          {cat.name}
        </span>
        <span className="text-[10px] font-mono text-slate-600">
          {filtered.length}
        </span>
      </button>
      {showExpanded && (
        <div className="pb-2">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="px-3 py-1 ml-6 mr-2 rounded text-[11px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 cursor-default flex items-center gap-2 group relative"
              title={item}
            >
              <span
                className="w-1 h-1 rounded-full opacity-60 flex-shrink-0"
                style={{ background: cat.color }}
              />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== PROPERTIES PANEL (TABBED) ====================
const PropertiesPanel = ({ node, onClose }) => {
  const [tab, setTab] = useState('general');
  if (!node) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900/80 border-l border-slate-800 p-6">
        <div className="text-center">
          <Boxes size={32} className="mx-auto text-slate-600 mb-2" />
          <div className="text-xs text-slate-500">
            Select a component to inspect its properties
          </div>
        </div>
      </div>
    );
  }
  const Icon = node.icon;
  const hasAwards = node.awards && node.awards.length > 0;

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'config', label: 'Config', icon: Code2 },
    { id: 'achievements', label: 'Output', icon: ChevronsRight },
    { id: 'awards', label: 'Awards', icon: Trophy, disabled: !hasAwards },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900/80 backdrop-blur border-l border-slate-800">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-2 border-b border-slate-800"
        style={{
          background: `linear-gradient(90deg, ${node.color}22, transparent)`,
        }}
      >
        <ComponentVisual
          kind={node.componentKind}
          color={node.color}
          size={32}
          icon={Icon}
        />
        <div className="flex-1 min-w-0 ml-1">
          <div
            className="text-[9px] font-mono uppercase tracking-wider opacity-70"
            style={{ color: node.color }}
          >
            {node.type}
          </div>
          <div className="text-sm font-semibold text-slate-100 truncate">
            {node.summary}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 flex-shrink-0">
        {tabs.map((t) => {
          const TIcon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => !t.disabled && setTab(t.id)}
              disabled={t.disabled}
              className={`flex-1 px-2 py-2 flex items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider border-b-2 transition-colors ${
                isActive
                  ? 'text-white'
                  : t.disabled
                  ? 'text-slate-700 cursor-not-allowed'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              style={{ borderColor: isActive ? node.color : 'transparent' }}
            >
              <TIcon size={10} />
              <span className="hidden xl:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {tab === 'general' && (
          <>
            <div className="bg-slate-950/60 rounded border border-slate-800 p-3 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">name:</span>
                <span className="text-slate-200 truncate text-right">
                  {node.label}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">doc:id:</span>
                <span className="text-slate-200 truncate text-right">
                  {node.docId}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">type:</span>
                <span className="text-slate-200 text-right">{node.type}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">period:</span>
                <span className="text-slate-200 text-right">{node.period}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">org:</span>
                <span className="text-slate-200 text-right truncate">
                  {node.org}
                </span>
              </div>
              {node.location && (
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">location:</span>
                  <span className="text-slate-200 text-right">
                    {node.location}
                  </span>
                </div>
              )}
              {node.role && (
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">role:</span>
                  <span className="text-slate-200 text-right truncate">
                    {node.role}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'config' && (
          <div className="bg-slate-950/60 rounded border border-slate-800 p-3 space-y-1 font-mono text-[11px]">
            {node.config.map((c, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-slate-600">›</span> {c}
              </div>
            ))}
          </div>
        )}

        {tab === 'achievements' && (
          <div className="space-y-2">
            {node.bullets.map((b, i) => (
              <div
                key={i}
                className="flex gap-2 text-[12px] text-slate-300 leading-relaxed"
              >
                <span
                  style={{ color: node.color }}
                  className="flex-shrink-0 mt-1"
                >
                  ▸
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'awards' && hasAwards && (
          <div className="space-y-2">
            {node.awards.map((a, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded text-[11px] leading-relaxed"
                style={{
                  background: '#FFD24D11',
                  border: '1px solid #FFD24D33',
                  color: '#FFE89A',
                }}
              >
                {a}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== CONSOLE (REALISTIC MULE LOGS) ====================
const Console = ({ isRunning, activeIndex, expanded, onToggle }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeIndex, isRunning]);

  // Compose log lines: boot logs + dynamic per-component logs
  const dynamicLogs =
    activeIndex >= 0
      ? FLOW.slice(0, activeIndex + 1).map((n, i) => ({
          offset: 1000 + i * 247,
          level: 'INFO',
          logger:
            'org.mule.runtime.core.privileged.processor.AbstractMessageProcessorChain',
          text: `Executing [${n.label}] :: ${n.type} :: doc:id="${n.docId}"`,
        }))
      : [];

  const allLogs = [...BOOT_LOGS, ...dynamicLogs];
  if (!isRunning && activeIndex === FLOW.length - 1) {
    allLogs.push({
      offset: 9999,
      level: 'INFO',
      logger: 'org.mule.runtime.core.api.lifecycle.LifecycleManager',
      text: 'Flow [career-progression-flow] :: BUILD SUCCESS — 8+ years compiled',
    });
  }

  return (
    <div
      className="border-t border-slate-800 bg-slate-950/95 backdrop-blur flex flex-col flex-shrink-0"
      style={{ height: expanded ? 200 : 36 }}
    >
      <button
        onClick={onToggle}
        className="px-3 h-9 flex items-center gap-2 hover:bg-slate-900/60 transition-colors flex-shrink-0 border-b border-slate-800"
      >
        <Terminal size={12} className="text-slate-500" />
        <span className="text-[11px] font-mono text-slate-400">Console</span>
        <span className="text-[10px] font-mono text-slate-600">
          — {allLogs.length} lines · prajwal-kotha-resume
        </span>
        <div className="flex-1" />
        {isRunning && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            running
          </span>
        )}
        {expanded ? (
          <ChevronDown size={12} className="text-slate-500" />
        ) : (
          <ChevronRight size={12} className="text-slate-500 -rotate-90" />
        )}
      </button>
      {expanded && (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 py-1.5 font-mono text-[10.5px] leading-[1.55]"
        >
          {allLogs.map((line, i) => (
            <div
              key={i}
              className="flex gap-2 hover:bg-slate-900/40 px-1 -mx-1 rounded"
            >
              <span className="text-slate-600 flex-shrink-0">
                {formatTimestamp(line.offset)}
              </span>
              <span
                className={
                  line.level === 'INFO'
                    ? 'text-emerald-400'
                    : line.level === 'WARN'
                    ? 'text-amber-400'
                    : line.level === 'ERROR'
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }
              >
                {line.level.padEnd(5)}
              </span>
              <span
                className="text-sky-400 flex-shrink-0 max-w-[280px] truncate"
                title={line.logger}
              >
                {line.logger.split('.').slice(-2).join('.')}
              </span>
              <span className="text-slate-600">-</span>
              <span className="text-slate-200">{line.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== MINI MAP ====================
const MiniMap = ({ activeIndex }) => {
  return (
    <div className="absolute bottom-3 right-3 w-44 bg-slate-900/95 backdrop-blur rounded-lg border border-slate-700 p-2 shadow-2xl z-30">
      <div className="flex items-center gap-1 mb-1.5 px-1">
        <Maximize2 size={9} className="text-slate-500" />
        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
          Mini-map
        </span>
      </div>
      <div className="bg-slate-950/60 rounded p-1.5 space-y-1">
        {/* Main flow rep */}
        <div
          className="flex items-center gap-0.5 px-1 py-1 rounded"
          style={{ background: '#00B4FF11', border: '1px solid #00B4FF33' }}
        >
          <Workflow size={8} className="text-sky-400 flex-shrink-0" />
          <div className="flex gap-0.5 flex-1 justify-around">
            {FLOW.map((n, i) => (
              <div
                key={i}
                className="rounded transition-all"
                style={{
                  width: 6,
                  height: 6,
                  background: i === activeIndex ? n.color : `${n.color}55`,
                  boxShadow: i === activeIndex ? `0 0 4px ${n.color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
        {/* Sub-flow rep */}
        <div
          className="flex items-center gap-0.5 px-1 py-1 rounded"
          style={{ background: '#9F7CFF11', border: '1px solid #9F7CFF33' }}
        >
          <ChevronsRight size={8} className="text-violet-400 flex-shrink-0" />
          <div className="flex gap-0.5 flex-1 justify-around">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded"
                style={{ width: 5, height: 5, background: '#9F7CFF55' }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="text-[8px] font-mono text-slate-600 mt-1 px-1 flex justify-between">
        <span>2 flows</span>
        <span>{FLOW.length + SUB_FLOW_CERTS.components.length} components</span>
      </div>
    </div>
  );
};

// ==================== MAIN ====================
export default function MuleSoftStudioResume() {
  const [selected, setSelected] = useState(FLOW[6]);
  const [search, setSearch] = useState('');
  const [expandedCats, setExpandedCats] = useState(
    new Set([
      'Connectors',
      'Core Components',
      'Salesforce Ecosystem',
      'Systems Integrated',
    ])
  );
  const [isRunning, setIsRunning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(true);
  const [propsOpen, setPropsOpen] = useState(true);

  const componentSpacing = 118; // matches FlowNode width + gap
  const messagePosition = 24 + activeIndex * componentSpacing + 55; // 55 = half of node width (110)

  const toggleCat = (name) => {
    const next = new Set(expandedCats);
    next.has(name) ? next.delete(name) : next.add(name);
    setExpandedCats(next);
  };

  const runFlow = () => {
    if (isRunning) {
      setIsRunning(false);
      setActiveIndex(-1);
      return;
    }
    setIsRunning(true);
    setActiveIndex(-1);
    setConsoleOpen(true);
    let i = 0;
    const tick = () => {
      if (i >= FLOW.length) {
        setIsRunning(false);
        return;
      }
      setActiveIndex(i);
      setSelected(FLOW[i]);
      i++;
      setTimeout(tick, 1100);
    };
    setTimeout(tick, 400);
  };

  return (
    <div
      className="w-full h-screen flex flex-col text-slate-200 overflow-hidden"
      style={{
        background: '#0A0E1A',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-mono, [class*="font-mono"] { font-family: 'IBM Plex Mono', ui-monospace, monospace !important; }
        .grid-bg {
          background-color: #0A0E1A;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0);
          background-size: 22px 22px;
        }
        .canvas-scroll::-webkit-scrollbar { height: 10px; width: 10px; }
        .canvas-scroll::-webkit-scrollbar-track { background: #0A0E1A; }
        .canvas-scroll::-webkit-scrollbar-thumb { background: #2A3348; border-radius: 5px; border: 2px solid #0A0E1A; }
        .canvas-scroll::-webkit-scrollbar-thumb:hover { background: #3A4358; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* TOP BAR */}
      <div className="h-12 border-b border-slate-800 bg-slate-950/80 backdrop-blur flex items-center px-3 gap-3 flex-shrink-0 z-20">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #00B4FF, #9F7CFF)',
              color: '#0A0E1A',
            }}
          >
            P
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-slate-100 leading-tight truncate">
              Satya Surya Prajwal Kotha
            </div>
            <div className="text-[9px] font-mono text-slate-500 leading-tight">
              Anypoint Studio · Mule 4.6.0 · 8+ years · 5× certified
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 rounded p-0.5 border border-slate-800">
          <button className="px-3 py-1 rounded text-[11px] font-mono bg-slate-800 text-slate-100 flex items-center gap-1">
            <Workflow size={11} /> Flow
          </button>
          <button className="px-3 py-1 rounded text-[11px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1">
            <Code2 size={11} /> XML
          </button>
          <button className="px-3 py-1 rounded text-[11px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1">
            <Settings size={11} /> Global
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 px-2 border-l border-slate-800 ml-1 pl-3 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <Server size={10} /> CloudHub 2.0
          </span>
          <span className="flex items-center gap-1">
            <Wifi size={10} className="text-emerald-400" /> Connected
          </span>
        </div>

        <button
          onClick={runFlow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono font-semibold transition-all flex-shrink-0"
          style={{
            background: isRunning ? '#FF4D6D' : '#00FF99',
            color: '#0A0E1A',
            boxShadow: isRunning ? '0 0 16px #FF4D6D88' : '0 0 16px #00FF9988',
          }}
        >
          {isRunning ? (
            <>
              <Square size={12} fill="#0A0E1A" /> Stop
            </>
          ) : (
            <>
              <Play size={12} fill="#0A0E1A" /> Run Flow
            </>
          )}
        </button>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* PALETTE */}
        <div
          className="border-r border-slate-800 bg-slate-950/40 flex-shrink-0 flex flex-col transition-all"
          style={{ width: paletteOpen ? 240 : 40 }}
        >
          <div className="h-9 border-b border-slate-800 flex items-center px-3 gap-2 flex-shrink-0">
            <button
              onClick={() => setPaletteOpen(!paletteOpen)}
              className="text-slate-500 hover:text-slate-200"
            >
              <Boxes size={14} />
            </button>
            {paletteOpen && (
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Mule Palette
              </span>
            )}
          </div>
          {paletteOpen && (
            <>
              <div className="px-2 py-2 border-b border-slate-800/60">
                <div className="relative">
                  <Search
                    size={12}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Filter components..."
                    className="w-full bg-slate-900 border border-slate-800 rounded pl-7 pr-2 py-1.5 text-[11px] font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-700"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto canvas-scroll">
                {PALETTE.map((cat) => (
                  <PaletteCategory
                    key={cat.name}
                    cat={cat}
                    expanded={expandedCats.has(cat.name)}
                    onToggle={() => toggleCat(cat.name)}
                    search={search}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CANVAS AREA */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Canvas tab bar */}
          <div className="h-9 border-b border-slate-800 flex items-center px-3 gap-3 bg-slate-950/40 flex-shrink-0">
            <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
              <FileCode size={11} className="text-sky-400" />
              prajwal-kotha-career.xml
            </span>
            <span className="text-[10px] font-mono text-slate-600">·</span>
            <span className="text-[10px] font-mono text-slate-500">
              {FLOW.length + SUB_FLOW_CERTS.components.length} components in 2
              flows
            </span>
            <div className="flex-1" />
            <button
              onClick={() => setPropsOpen(!propsOpen)}
              className="text-[10px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1"
            >
              <Layers size={11} /> {propsOpen ? 'Hide' : 'Show'} Properties
            </button>
            <button className="text-[10px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1">
              <Save size={11} /> Save
            </button>
          </div>

          {/* Canvas content */}
          <div className="flex-1 overflow-auto grid-bg canvas-scroll p-6 relative">
            {/* Identity card */}
            <div className="mb-4 inline-flex items-center gap-3 px-4 py-2 bg-slate-900/60 rounded-lg border border-slate-800 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  Deployed
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">·</div>
              <div className="text-[11px] text-slate-300">
                Hyderabad · Telangana · India
              </div>
              <div className="text-[10px] font-mono text-slate-500">·</div>
              <div className="text-[11px] text-slate-300">
                k.satyasuryaprajwal@gmail.com
              </div>
              <div className="text-[10px] font-mono text-slate-500">·</div>
              <div className="text-[11px] text-slate-300">+91 9494495234</div>
            </div>

            {/* Cert ribbon */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <BadgeCheck size={14} className="text-violet-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Certified ×5
                </span>
              </div>
              {CERTIFICATIONS.map((c, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded text-[10px] font-mono"
                  style={{
                    background: '#9F7CFF15',
                    border: '1px solid #9F7CFF44',
                    color: '#C4B0FF',
                  }}
                >
                  {c.full}
                </div>
              ))}
            </div>

            {/* MAIN FLOW */}
            <FlowContainer
              name="career-progression-flow"
              docId="career-main-flow"
              type="flow"
              color="#00B4FF"
              subtitle={`${FLOW.length} components · chronological`}
            >
              <FlowRail
                showMessage={isRunning && activeIndex >= 0}
                messagePosition={messagePosition}
                sourceColor="#00B4FF"
              >
                {FLOW.map((node, idx) => (
                  <FlowNode
                    key={node.id}
                    node={node}
                    index={idx}
                    isSelected={selected?.id === node.id}
                    isActive={isRunning && activeIndex === idx}
                    onClick={() => setSelected(node)}
                  />
                ))}
              </FlowRail>
            </FlowContainer>

            {/* SUB-FLOW: Certifications */}
            <SubFlowCerts activeIndex={activeIndex} isRunning={isRunning} />

            {/* Stats grid */}
            <div className="mt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Activity size={11} className="text-sky-400" /> Runtime
                Statistics
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-4xl">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/40 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                      {s.label}
                    </div>
                    <div
                      className="text-2xl font-bold mt-1"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards strip */}
            <div className="mt-5 max-w-4xl pb-44">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                <Trophy size={12} className="text-amber-400" /> Recognition Log
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '🏆 TechStars of the Year — Accenture Global (2024-25)',
                  '🏆 PINACCLE Award — Across NA',
                  '🏆 ACE Award × 2 (SME)',
                  '⭐ Star Performer of the Month × 3',
                  '⭐ Star Performer of the Quarter (Q3 2019)',
                  '🚀 Quick Learner Award',
                ].map((a, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded text-[11px]"
                    style={{
                      background: '#FFD24D11',
                      border: '1px solid #FFD24D33',
                      color: '#FFE89A',
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Mini-map */}
            <MiniMap activeIndex={activeIndex} />
          </div>

          <Console
            isRunning={isRunning}
            activeIndex={activeIndex}
            expanded={consoleOpen}
            onToggle={() => setConsoleOpen(!consoleOpen)}
          />
        </div>

        {/* PROPERTIES PANEL */}
        {propsOpen && (
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <PropertiesPanel
              node={selected}
              onClose={() => setPropsOpen(false)}
            />
          </div>
        )}
      </div>

      {/* STATUS BAR */}
      <div
        className="h-6 flex items-center px-2 text-[10px] font-mono text-white gap-3 flex-shrink-0"
        style={{ background: '#0078D4' }}
      >
        <span className="flex items-center gap-1">
          <GitBranch size={11} /> main
        </span>
        <span className="flex items-center gap-1">✓ 0 errors</span>
        <span className="flex items-center gap-1">⚠ 0 warnings</span>
        <div className="flex-1" />
        <span>Mule Runtime 4.6.0</span>
        <span>UTF-8</span>
        <span>XML</span>
        <span className="flex items-center gap-1">
          <Cloud size={11} /> CloudHub 2.0
        </span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
