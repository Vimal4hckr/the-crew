export interface CrewMember {
  id: string;
  number: string;
  role: 'DIRECTOR' | 'WRITER' | 'CINEMATOGRAPHER' | 'ACTRESS' | 'EDITOR & SFX' | string;
  name: string;
  designation: string;
  imageFilename: string;
  imagePath: string;
  defaultImagePath: string;
  bio: string;
  introduction: string;
  credits: string[];
  buttonLabel?: 'VIEW PORTFOLIO' | 'VIEW INSTAGRAM';
  link?: string;
  accentColor: string;
  cameraSpec?: string;
  focalQuote: string;
}

export const CREW_MEMBERS: CrewMember[] = [
  {
    id: 'director',
    number: '01',
    role: 'DIRECTOR',
    name: 'Balaji',
    designation: 'Director',
    imageFilename: 'writer-director.jpg',
    imagePath: '/images/writer-director.jpg',
    defaultImagePath: '/images/writer-director.jpg',
    introduction: 'The narrative architect crafting cinema through precise authorial vision and atmospheric tension.',
    bio: 'Balaji is a film director dedicated to visceral, character-centered storytelling. Conceiving projects from blank manuscript to final theatrical composition, his directorial philosophy unites evocative camera grammar, psychological realism, and deliberate narrative cadence.',
    credits: [
      'Directorial Vision & Visual Mise-en-scène',
      'Dramatic Scene Blocking & Actor Collaboration',
      'Atmospheric Narrative & Cinematic Direction'
    ],
    buttonLabel: 'VIEW PORTFOLIO',
    link: 'https://balaji-s-portfolio-orcin.vercel.app/',
    accentColor: '#e5b869',
    cameraSpec: '35mm T1.5 · Anamorphic 2.39:1',
    focalQuote: 'Directing is the art of revealing what silence cannot hide.'
  },
  {
    id: 'writer',
    number: '02',
    role: 'WRITER',
    name: 'Selvaraj',
    designation: 'Writer',
    imageFilename: 'writer.jpg',
    imagePath: '/images/writer.jpg',
    defaultImagePath: '/images/writer.jpg',
    introduction: 'Crafting the narrative spine, dialogue rhythms, and thematic architecture of the story.',
    bio: 'Selvaraj is a screenwriter and narrative architect shaping deeply engaging cinematic worlds. Focused on dialogue authenticity, psychological tension, and story structure, he writes the blueprint from which cinematic moments emerge.',
    credits: [
      'Original Screenplay & Dialogue Architecture',
      'Narrative Structure, Pacing & Arc Design',
      'Character Psychology & Scene Construction'
    ],
    accentColor: '#e5a93c',
    cameraSpec: 'SHOOTING SCRIPT · UNIFIED STORY ARCHITECTURE',
    focalQuote: 'The script is the foundation upon which every visual emotion is built.'
  },
  {
    id: 'cinematographer',
    number: '03',
    role: 'CINEMATOGRAPHER',
    name: 'Pradeep',
    designation: 'Cinematographer',
    imageFilename: 'cinematographer.jpg',
    imagePath: '/images/cinematographer.jpg',
    defaultImagePath: '/images/cinematographer.jpg',
    introduction: 'Sculpting light, shadow, and camera movement to translate human emotion into frame.',
    bio: 'Pradeep is a cinematographer and director of photography known for evocative framing, atmospheric lighting, and fluid camera movement. His visual style blends naturalistic lighting with stylized cinematic grammar to serve the emotional truth of each scene.',
    credits: [
      'Lighting Architecture & Visual Tone',
      'Anamorphic & Prime Lens Cinematography',
      'Camera Movement & Spatial Composition'
    ],
    buttonLabel: 'VIEW INSTAGRAM',
    link: 'https://www.instagram.com/pradhenair?dlrf=M3NwMHY5M2NmNmU2',
    accentColor: '#64b5f6',
    cameraSpec: 'ARRI MASTER ANAMORPHIC · T1.4 · 2.39:1',
    focalQuote: 'Light does not just illuminate a scene; it reveals the interior soul of the story.'
  },
  {
    id: 'actress',
    number: '04',
    role: 'ACTRESS',
    name: 'Nisha',
    designation: 'Actress',
    imageFilename: 'actress.jpg',
    imagePath: '/images/actress.jpg',
    defaultImagePath: '/images/actress.jpg',
    introduction: 'A captivating dramatic screen performer defined by poetic emotional depth and effortless poise.',
    bio: 'Nisha is a versatile screen actress acclaimed for evocative emotional subtlety and radiant authenticity. Her performances balance fragility with steely resolve, breathing immediate life, nuance, and haunting resonance into cinematic narratives.',
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
    number: '05',
    role: 'EDITOR & SFX',
    name: 'Raj',
    designation: 'Editor & SFX',
    imageFilename: 'editor.jpg',
    imagePath: '/images/editor.jpg',
    defaultImagePath: '/images/editor.jpg',
    introduction: 'Sculpting time, pacing, and sonic texture to discover the final soul of the film in the cutting room.',
    bio: 'Raj is an editor and sound/visual effects architect specializing in temporal rhythm, montage storytelling, and immersive sound effects. In the post suite, raw takes are synthesized into a propulsive, emotionally arresting audiovisual journey.',
    credits: [
      'Feature & Short Film Narrative Editing',
      'Sound Effects (SFX) Design & Atmospheric Foley',
      'Montage Architecture & Audio-Visual Picture Lock'
    ],
    buttonLabel: 'VIEW INSTAGRAM',
    link: 'https://www.instagram.com/ben10_x_23?cplk=d3cxY2Y2cWhkZXFv',
    accentColor: '#45a29e',
    cameraSpec: 'DOLBY ATMOS & REC.709',
    focalQuote: 'Cinema is made in the space between two frames and the resonance of sound.'
  }
];
