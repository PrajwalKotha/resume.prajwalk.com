// Content for /3d. Résumé facts come from ../data so both pages stay in step;
// this file only holds what is specific to the talking intro and the ID card.
// Word timings measured from the clip (Whisper), in seconds.
export const INTRO = {
  video: '/3d/intro.mp4',
  poster: '/3d/poster.webp',
  lines: [
    {
      from: 0,
      to: 2.75,
      words: [
        [0, 'Hi,'],
        [1.36, "I'm"],
        [1.72, 'Prajwal'],
        [2.06, 'Kotha,'],
      ],
    },
    {
      from: 2.75,
      to: 6.0,
      words: [
        [2.88, 'a'],
        [2.94, 'MuleSoft'],
        [3.38, 'and'],
        [3.68, 'Salesforce'],
        [4.16, 'integration'],
        [4.62, 'architect.'],
      ],
    },
    {
      from: 6.0,
      to: 7.9,
      words: [
        [6.06, 'Scroll'],
        [6.08, 'down'],
        [6.34, 'to'],
        [6.52, 'see'],
        [6.68, 'what'],
        [6.84, 'I'],
        [7.02, 'build.'],
      ],
    },
  ],
};

export const CARD = {
  portrait: '/3d/portrait.webp',
  qr: '/3d/qr.svg',
  id: 'PK-0817',
  since: 'Aug 2017',
  base: 'Hyderabad, IN',
  role: 'Integration Architect',
  org: 'Lead Engineer · IHG Hotels & Resorts',
  stack: ['MuleSoft', 'DataWeave', 'Salesforce', 'Data Cloud', 'Agentforce', 'CyberArk'],
};

// What the side panel says while the card turns: front, back, front again.
export const STEPS = [
  {
    kicker: '01 · Front',
    title: 'Who I am',
    text: 'Nine years designing, building and running MuleSoft and Salesforce integrations. Now leading them at IHG.',
  },
  {
    kicker: '02 · Back',
    title: 'Certified six times',
    text: 'The MuleSoft developer and architect tracks, Salesforce Platform Administrator and Data 360 Consultant.',
  },
  {
    kicker: '03 · Keep it',
    title: 'Scan it, or take the PDF',
    text: 'The code on the back opens my full résumé, or grab the PDF.',
  },
];

// Key colour per skills group in ../data, for the toolbox boards.
export const TONES = {
  MuleSoft: '#0b63c4',
  Salesforce: '#0a9cc4',
  'Security & operations': '#0f9d68',
  'Languages & data': '#c27a12',
};
