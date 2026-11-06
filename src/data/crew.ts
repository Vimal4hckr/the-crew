export interface CrewMember {
  id: string;
  number: string;
  role: 'WRITER & DIRECTOR' | 'ACTOR' | 'ACTRESS' | 'EDITOR';
  name: string;
  designation: string;
  imageFilename: string;
  imagePath: string;
  defaultImagePath: string;
  bio: string;
  introduction: string;
  credits: string[];
  buttonLabel: 'VIEW PORTFOLIO' | 'VIEW INSTAGRAM';
  link: string;
  accentColor: string;
  cameraSpec: string;
  focalQuote: string;
}

export const CREW_MEMBERS: CrewMember[] = [
  {
    id: 'writer-director',
    number: '01',
    role: 'WRITER & DIRECTOR',
    name: 'Balaji',
    designation: 'Writer & Director',
    imageFilename: 'writer-director.jpg',
    imagePath: '/images/writer-director.jpg',
    defaultImagePath: '/images/writer-director.jpg',
    introduction: 'The narrative architect crafting cinema through precise authorial vision and atmospheric tension.',
    bio: 'Balaji is a writer and film director dedicated to visceral, character-centered storytelling. Conceiving projects from blank manuscript to final theatrical composition, his directorial philosophy unites evocative camera grammar, psychological realism, and deliberate narrative cadence.',
    credits: [
      'Original Screenplay & Story Architecture',
      'Directorial Blocking & Visual Mise-en-scène',
      'Atmospheric Dramatic Narrative Direction'
    ],
    buttonLabel: 'VIEW PORTFOLIO',
    link: 'https://balaji-s-portfolio-orcin.vercel.app/',
    accentColor: '#e5b869',
    cameraSpec: '35mm T1.5 · Anamorphic 2.39:1',
    focalQuote: 'Directing is the art of revealing what silence cannot hide.'
  },
  {
    id: 'actor',
    number: '02',
    role: 'ACTOR',
    name: 'Pradhen',
    designation: 'Actor',
    imageFilename: 'actor.jpg',
    imagePath: '/images/actor.jpg',
    defaultImagePath: '/images/actor.jpg',
    introduction: 'Commanding the screen with emotional ferocity, method commitment, and raw interior stillness.',
    bio: 'Pradhen brings an intense, magnetic presence to cinematic storytelling. Grounded in method discipline and dynamic physical range, he embodies complex protagonists and antiheroes with palpable vulnerability, psychological conviction, and nuanced intensity.',
    credits: [
      'Lead Dramatic & Character Performance',
      'Method Character Development & Physicality',
      'Psychological Tension & Screen Realism'
    ],
    buttonLabel: 'VIEW INSTAGRAM',
    link: 'https://www.instagram.com/pradhenair?dlrf=M3NwMHY5M2NmNmU2',
    accentColor: '#e07a5f',
    cameraSpec: '85mm T1.4 · Spherical 1.85:1',
    focalQuote: 'Truth on screen happens between the words and behind the eyes.'
  },
  {
    id: 'actress',
    number: '03',
    role: 'ACTRESS',
    name: 'Nisha Riya',
    designation: 'Actress',
    imageFilename: 'actress.jpg',
    imagePath: '/images/actress.jpg',
    defaultImagePath: '/images/actress.jpg',
    introduction: 'A captivating dramatic screen performer defined by poetic emotional depth and effortless poise.',
    bio: 'Nisha Riya is a versatile screen actress acclaimed for evocative emotional subtlety and radiant authenticity. Her performances balance fragility with steely resolve, breathing immediate life, nuance, and haunting resonance into cinematic narratives.',
    credits: [
      'Lead Dramatic Performance & Protagonist Roles',
      'Subtle Micro-Expression & Emotional Arc',
      'Collaborative Directorial Character Work'
    ],
    buttonLabel: 'VIEW INSTAGRAM',
    link: 'https://www.instagram.com/nisha_riya_1727?dlrf=a3I2aHBic2lxbzF5',
    accentColor: '#c8d1db',
    cameraSpec: '50mm T1.2 · Univisium 2.00:1',
    focalQuote: 'Every glance is a dialogue; every breath carries history.'
  },
  {
    id: 'editor',
    number: '04',
    role: 'EDITOR',
    name: 'Ben10',
    designation: 'Editor',
    imageFilename: 'editor.jpg',
    imagePath: '/images/editor.jpg',
    defaultImagePath: '/images/editor.jpg',
    introduction: 'Sculpting time, pacing, and tension to discover the final soul of the film in the cutting room.',
    bio: 'Ben10 is a film editor and visual pacing architect specializing in temporal rhythm, montage storytelling, and narrative continuity. In the edit suite, raw takes are synthesized into a propulsive, emotionally arresting cinematic journey where every cut serves the story.',
    credits: [
      'Feature & Short Film Narrative Editing',
      'Montage Theory, Temporal Rhythm & Cutflow',
      'Sound Design Integration & Picture Lock'
    ],
    buttonLabel: 'VIEW INSTAGRAM',
    link: 'https://www.instagram.com/ben10_x_23?cplk=d3cxY2Y2cWhkZXFv',
    accentColor: '#45a29e',
    cameraSpec: '24.000 FPS · SMPTE Timecode Lock',
    focalQuote: 'Cinema is made in the space between two frames.'
  }
];
