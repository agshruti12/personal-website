export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface AdditionalLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  category: 'hacks' | 'clicks' | 'thoughts';
  overview: string;
  team: TeamMember[];
  technologies: string[];
  implementation: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  additionalLinks?: AdditionalLink[];
}

export const projects: Project[] = [
  // Hacks Projects
  {
    id: 'hack-1',
    title: 'PennOS',
    tagline: 'A UNIX-like operating system built in C',
    category: 'hacks',
    overview: 'PennOS models a UNIX-like operating system; it’s designed around subsystems that model those of standard UNIX. This will include programming a priority scheduler, File Allocation Table (FAT) file system, standard kernel operations, job control, signals, and user shell interactions. Unlike a real operating system, PennOS doesn’t boot on hardware; rather, it runs as a guest OS within a single process running on a host OS.',
    team: [
      { name: 'Shruti Agarwal', role: 'Kernel Developer', initials: 'SA' },
      { name: 'Divita Taduvayi', role: 'Kernel Developer', initials: 'DT' },
      { name: 'Mahika Calyanakoti', role: 'File System Developer', initials: 'MC' },
      { name: 'Logan Brassington', role: 'Shell Developer', initials: 'LB' }
    ],
    technologies: ['C'],
    implementation: 'PennOS breaks down into 3 fundamental parts: the FAT file system, the kernel, and the shell. The file system served to organize allocation, access, and updates to files on disk; loading a File Allocation Table into memory allowed for efficient queries to files. The kernel was built to handle the scheduling of various processes; it manages processes in all sorts of states (ready, blocked, stopped, sleeping), inflicted by user/system-delivered signals. PennOS can accept a host of familiar UNIX commands, as well as background and non-interactive scripts. It leverages concurrence to execute lengthier jobs, that involve pipes and redirection, similar to UNIX. The shell, at last, is how the user interacts with the entire PennOS system; they can input their commands, signals, files, scripts, etc., into the shell, which will be sent to the kernel and FAT for downstream processing.',
    images: [],
    githubUrl: 'https://github.com/CIS548/25sp-cis5480-pennos-17',

  },
  {
    id: 'hack-2',
    title: "Stayin' Alive",
    tagline: 'A fully functional baby CPR training device',
    category: 'hacks',
    overview: 'Sudden cardiac arrest in infants requires immediate and precise CPR. Manual CPR can be inconsistent and tiring, especially for untrained or stressed individuals. Stayin’ Alive aims to provide an automated CPR solution for infants that ensures precise compression timing and force, giving caregivers and responders a reliable way to administer emergency resuscitation. Using a motorized crank-slider mechanism, with adjustable compression speed and synchronized audio instructions, this device presents a fully functional baby CPR training device.',
    team: [
      { name: 'Shruti Agarwal', role: 'Software Developer', initials: 'SA' },
      { name: 'Howard Xu', role: 'Hardware Developer', initials: 'HX' },
      { name: 'Zora Mardjoko', role: 'Firmware Developer', initials: 'ZM' }
    ],
    technologies: ['C', 'SolidWorks', 'ATMega328PB MCU', '12V Metal Gearmotor', 'Adafruit Audio FX Sound Board', 'Digikey Slider', 'LCD Screen', 'Breadboards', 'Wires'],
    implementation: 'This project leveraged a crank-slider in order to perform the vertical compressions; we implemented Pulse Width Modulation (PWM)-based motor control on our 12V brushed DC motor to vary compressions between 100–120 BPM. We incorporated a slider into the design, so users would vary compression speeds within this range; this was facilitated by our firmware, which received a digital input from the slider component, and reflected that into our PWM duty cycle calculations. In addition to the core motorized component of Stayin’ Alive, we also included audio instructions, facilitated through an external soundboard component, that would relay information at relevant points in the CPR process. We also projected compression frequency on an LCD screen, which is calculated by an encoder. As a fun twist, we also coordinated the cadence of the compressions to music delivered by the soundboard; for instance, if the compressions were ~105BPM, then we would play a song (Stayin’ Alive) that matches this tempo. Watch the video linked below for the full demonstration!',

    images: ['images/hacks/stayin-alive-cover.webp', 'images/hacks/stayin-alive-1.png', 'images/hacks/stayin-alive-2.png', 'images/hacks/stayin-alive-3.png', 'images/hacks/stayin-alive-4.png', 'images/hacks/stayin-alive-5.png', 'images/hacks/stayin-alive-6.png', 'images/hacks/stayin-alive-7.png', 'images/hacks/stayin-alive-8.png', 'images/hacks/stayin-alive-9.png'],
    githubUrl: 'https://github.com/agshruti12/stayin-alive',
    liveUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    additionalLinks: [
      { label: 'Website', url: 'https://upenn-embedded.github.io/final-project-s25-stayin-alive/'},
    ],
  },
  {
    id: 'hack-3',
    title: "Chat Servers",
    tagline: 'A fully functional baby CPR training device',
    category: 'hacks',
    overview: 'This project implements a distributed replicated chat system where multiple servers coordinate using UDP-based multicast to deliver messages across clients in different chat rooms.',
    team: [
      { name: 'Shruti Agarwal', role: 'Software Developer', initials: 'SA' },
      { name: 'Howard Xu', role: 'Hardware Developer', initials: 'HX' },
      { name: 'Zora Mardjoko', role: 'Firmware Developer', initials: 'ZM' }
    ],
    technologies: ['C', 'SolidWorks', 'ATMega328PB MCU', '12V Metal Gearmotor', 'Adafruit Audio FX Sound Board', 'Digikey Slider', 'LCD Screen', 'Breadboards', 'Wires'],
    implementation: 'This project implements a distributed replicated chat system where multiple servers coordinate using UDP-based multicast to deliver messages across clients in different chat rooms. Each client connects to a single server, sends commands or messages, and receives updates, while servers communicate with one another to ensure messages are propagated to all relevant clients across replicas. The system supports key functionalities such as joining/leaving chat rooms, nickname management, and message broadcasting, and implements three ordering guarantees (unordered, FIFO, and total ordering) using mechanisms like sequence tracking and holdback queues to handle out-of-order delivery between servers. The architecture is fully decentralized with no central coordinator, relying on configuration-based server membership and socket communication to maintain consistency and scalability across up to hundreds of clients.',

    images: ['images/hacks/stayin-alive-cover.webp', 'images/hacks/stayin-alive-1.png', 'images/hacks/stayin-alive-2.png', 'images/hacks/stayin-alive-3.png', 'images/hacks/stayin-alive-4.png', 'images/hacks/stayin-alive-5.png', 'images/hacks/stayin-alive-6.png', 'images/hacks/stayin-alive-7.png', 'images/hacks/stayin-alive-8.png', 'images/hacks/stayin-alive-9.png'],
    githubUrl: 'https://github.com/agshruti12/stayin-alive',
    liveUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    additionalLinks: [
      { label: 'Website', url: 'https://upenn-embedded.github.io/final-project-s25-stayin-alive/'},
    ],
  },
  {
    id: 'hack-4',
    title: 'Illume',
    tagline: 'A quick solution to a technical challenge',
    category: 'hacks',
    overview: 'A scalable API gateway that handles authentication, rate limiting, and request routing. Built with microservices architecture.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
    implementation: 'Developed with a focus on scalability and performance optimization.',
    images: ['placeholder-3-1', 'placeholder-3-2', 'placeholder-3-3'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
    liveUrl: 'https://api-gateway.herokuapp.com',
  },
  {
    id: 'hack-5',
    title: 'Stryde',
    tagline: 'An iOS application that intelligently sequences music to match the cadence of your run.',
    category: 'hacks',
    overview: 'An iOS application that intelligently sequences music to match the cadence of your run, creating a seamless workout experience.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['Swift', 'UIKit', 'Python', 'Spotify APIs', 'Cerebras AI'],
    implementation: 'Built natively for iOS using Swift and UIKit, with Python backend for music analysis and Spotify API integration.',
    images: ['placeholder-3-1', 'placeholder-3-2', 'placeholder-3-3'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
    liveUrl: 'https://api-gateway.herokuapp.com',
  },
  {
    id: 'hack-6',
    title: 'Mini-Instagram',
    tagline: 'A complex, feature-filled photo-sharing social media platform.',
    category: 'hacks',
    overview: "A complex, feature-filled photo-sharing social media platform, inspired by Meta's Instagram. Supports standard user functions (like, comment, post, message, search), plus more!",
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['Typescript', 'React', 'CSS', 'Spark Java', 'mySQL', 'AWS services (RDS, EC2)', 'Apache Kafka', 'ChromaDB', 'ChatGPT API'],
    implementation: 'Full-stack application with React frontend, Spark Java backend, and MySQL database hosted on AWS. Integrated Apache Kafka for real-time updates, ChromaDB for vector-based actor matching, and ChatGPT API for intelligent search functionality.',
    images: ['images/hacks/insta-cover.webp', 'images/hacks/insta-2.png', 'images/hacks/insta-3.png', 'images/hacks/insta-4.png', 'images/hacks/insta-5.png', 'images/hacks/insta-6.png', 'images/hacks/insta-7.png', 'images/hacks/insta-8.png', 'images/hacks/insta-9.png'],
    githubUrl: 'https://github.com/agshruti12/mini-instagram',
  },
  {
    id: 'hack-7',
    title: 'Communication Toolkit',
    tagline: 'A sentiment analysis package to quantify various semantic levers of team/group communication!',
    category: 'hacks',
    overview: 'TCT is a Python package that takes a series of chat messages (i.e. a conversation) as input, and featurizes it into 150+ quantified, semantic metrics. These features are computed in varying ways, drawing inspiration from social science literature, external frameworks, and original methods as well.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['Python', 'Matplotlib', 'RoBERTa', 'LIWC', 'ConvoKit', 'GitHub Actions', 'Pytest'],
    implementation: 'Developed as a Python package with comprehensive feature extraction pipelines. Implemented automated testing via GitHub Actions with Pytest for validation. Utilized Sentence Transformer models (SBert) for computing semantic metrics like discursive diversity.',
    images: ['images/hacks/tct-cover.webp', 'images/hacks/tct-1.png', 'images/hacks/tct-2.png', 'images/hacks/tct-3.png', 'images/hacks/tct-4.png'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
    liveUrl: 'https://api-gateway.herokuapp.com',
  },
  {
    id: 'hack-8',
    title: 'AdTracker',
    tagline: 'A neuromarketing tool that employs advanced eye tracking and breathing rate analytics to gauge consumer interaction with digital advertisements.',
    category: 'hacks',
    overview: 'AdTracker emerged from the vision that every business, regardless of size or budget, should have access to sophisticated tools that decode consumer behavior. The foundational ethos was to level the playing field, empowering small companies and creative minds with the same arsenal of insights previously reserved for industry giants.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['React', 'Javascript', 'CSS', 'Flask'],
    implementation: 'Integrated WebGazer.js for eye tracking with machine learning-based gaze prediction. Implemented radio frequency chirp emission for contactless breathing rate detection by measuring chest movement oscillations.',
    images: ['placeholder-3-1', 'placeholder-3-2', 'placeholder-3-3'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
    liveUrl: 'https://api-gateway.herokuapp.com',
  },
  {
    id: 'hack-9',
    title: 'ClubBuddy',
    tagline: 'A tool for managing communication between users and AI agents.',
    category: 'hacks',
    overview: 'A scalable API gateway that handles authentication, rate limiting, and request routing. Built with microservices architecture.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
    implementation: 'Developed using microservices architecture with Redis for caching and Docker for containerization.',
    images: ['placeholder-3-1', 'placeholder-3-2', 'placeholder-3-3'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
    liveUrl: 'https://api-gateway.herokuapp.com',
  },

  // Clicks Projects
  {
    id: 'click-1',
    title: 'Atma Spring 2024',
    tagline: "Live shots from Atma's Spring 2024 show.",
    category: 'clicks',
    overview: "Live shots from Atma's Spring 2024 show.",
    team: [],
    technologies: [],
    implementation: '',
    images: ['images/clicks/spring_atma_3.jpg', 'images/clicks/spring_atma_1.jpg', 'images/clicks/spring_atma_4.jpg', 'images/clicks/spring_atma_5.jpg', 'images/clicks/spring_atma_6.jpg', 'images/clicks/spring_atma_2.jpg', 'images/clicks/spring_atma_7.jpg'],
  },
  {
    id: 'click-2',
    title: 'Atma Fall 2024',
    tagline: "Live shots from Atma's Fall 2024 show.",
    category: 'clicks',
    overview: "Live shots from Atma's Fall 2024 show.",
    team: [],
    technologies: [],
    implementation: '',
    images: ['/images/clicks/fall_atma_1.jpg', '/images/clicks/fall_atma_2.jpg', '/images/clicks/fall_atma_3.jpg', '/images/clicks/fall_atma_4.jpg'],
  },

  // Thought Children Projects
  {
    id: 'thought-1',
    title: 'The Future of AI in Design',
    tagline: 'Exploring the intersection of artificial intelligence and creative design',
    category: 'thoughts',
    overview: 'A deep dive into how AI is reshaping the creative landscape and what it means for designers and artists.',
    team: [
      { name: 'Shruti Agarwal', role: 'Author', initials: 'SA' }
    ],
    technologies: ['Research', 'Analysis', 'Writing'],
    implementation: '',
    images: ['thought-1-1'],
  },
  {
    id: 'thought-2',
    title: 'Digital Minimalism',
    tagline: 'Thoughts on technology and mindfulness',
    category: 'thoughts',
    overview: 'Exploring the balance between digital connectivity and mental well-being in our hyperconnected world.',
    team: [
      { name: 'Shruti Agarwal', role: 'Author', initials: 'SA' }
    ],
    technologies: ['Philosophy', 'Technology', 'Psychology'],
    implementation: '',
    images: ['thought-2-1'],
  }
];

export const getProjectsByCategory = (category: 'hacks' | 'clicks' | 'thoughts') => {
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};
