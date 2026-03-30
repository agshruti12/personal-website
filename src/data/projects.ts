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
  icon?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  additionalLinks?: AdditionalLink[];
}

export const projects: Project[] = [
  {
    id: 'hack-1',
    title: 'CyclAR',
    tagline: 'A smart bike helmet that provides navigation and safety features.',
    category: 'hacks',
    overview: 'Work in Progress!',
    team: [],
    technologies: [],
    implementation: 'Work in Progress!',
    icon: '🚴',
    githubUrl: '',
  },
  {
    id: 'hack-2',
    title: 'PennCloud',
    tagline: 'A cloud storage solution for Penn students.',
    category: 'hacks',
    overview: 'Work in Progress!',
    team: [],
    technologies: [],
    implementation: 'Work in Progress!',
    icon: '☁️',
    githubUrl: '',
  },
  // Hacks Projects
  {
    id: 'hack-3',
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
    icon: '🖥️',
    githubUrl: 'https://github.com/CIS548/25sp-cis5480-pennos-17',
  },
  {
    id: 'hack-4',
    title: 'Mini-Minecraft',
    tagline: 'A small-scale Minecraft replica built in C.',
    category: 'hacks',
    overview: 'This project aims to recreate a simplified yet extensible version of a Minecraft-style 3D world, focusing on procedural generation, real-time rendering, and interactive gameplay systems. A key motivation was to build this system entirely from scratch in C/C++ without relying on existing game engines or high-level frameworks, allowing us to directly implement the underlying graphics and systems logic ourselves. Across three milestones, the goal was to progressively develop a fully explorable environment, starting from terrain generation and player physics, and evolving into a dynamic world with textures, caves, and performance optimizations. By combining computer graphics concepts such as noise-based terrain synthesis, efficient GPU rendering, and multithreaded computation, the project explores how large-scale virtual worlds can be generated and interacted with in real time.',
    team: [
      { name: 'Shruti Agarwal', role: 'Systems Developer', initials: 'SA' },
      { name: 'Annabella Tian', role: 'Player Physics Developer', initials: 'AT' },
      { name: 'Wilson Hu', role: 'Terrain Developer', initials: 'WH' }
    ],
    technologies: ['C++', 'GLSL'],
    implementation: 'Our system consists of three main parts: terrain generation, rendering optimization, and gameplay mechanics. For terrain, we used procedural noise algorithms (e.g., Perlin and Worley noise) to generate heightmaps and biomes, enabling features like rolling hills, mountains, caves, and underground lava without storing the world explicitly . The world is divided into “chunks” (small 3D regions), which allows us to generate and render only nearby terrain as the player moves. To improve performance, we implemented face culling (only drawing visible block faces), interleaved vertex buffers for efficient GPU access, and a multithreaded pipeline that separates terrain generation, mesh construction, and GPU buffering into parallel tasks. On the interaction side, we built a player system that handles keyboard and mouse input, simulates movement using basic physics (velocity, acceleration, and collision detection), and allows users to place and remove blocks via raycasting. We also added textures, transparency handling, and shader-based animations (e.g., moving water and lava), resulting in a cohesive system that balances visual detail with real-time performance.',
    icon: '⛏️',
    liveUrl: 'https://drive.google.com/file/d/1QlLQmTxQzaiPdBLUcDDnsj3JCKU9s3Ce/view?usp=sharing ',
  },
  {
    id: 'hack-5',
    title: 'Team Communication Toolkit',
    tagline: 'A sentiment analysis package to quantify various semantic levers of team/group communication!',
    category: 'hacks',
    overview: 'The Communication Toolkit (TCT) was developed to better understand and quantify how people communicate in group settings by translating qualitative conversation dynamics into measurable signals. While human communication is rich and nuanced, many aspects—such as sentiment, engagement, and semantic alignment—are difficult to analyze systematically at scale. This project was motivated by the intersection of natural language processing and social science, aiming to create a tool that captures both surface-level and deeper semantic properties of conversations. By drawing from established frameworks (e.g., LIWC, ConvoKit) and incorporating modern embedding models, TCT enables researchers and developers to analyze conversations not just by what is said, but how ideas evolve, diverge, and interact across participants. As the project matured, it evolved into an award-winning open-source package, designed to be accessible and extensible for social science researchers seeking scalable, data-driven insights into communication.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' },
      { name: 'Emily Hu', role: 'Advisor', initials: 'EH' }
    ],
    technologies: ['Python', 'Pandas', 'RoBERTa', 'Sentence-BERT', 'LIWC', 'ConvoKit', 'Pytest', 'GitHub Actions'],
    implementation: 'TCT is implemented as a Python package that takes structured chat data (in the form of a Pandas DataFrame) and computes over 150 semantic and statistical features at both the individual message (“chat”) and multi-message (“conversation”) levels. Simpler features—such as word counts or sentiment scores—are computed using rule-based methods or pretrained models like RoBERTa, while more advanced metrics rely on embedding-based techniques. For example, to measure discursive diversity, we use Sentence-BERT to embed each message into a vector space, aggregate embeddings per speaker, and compute divergence across speakers to quantify how semantically varied the conversation is. The system integrates external linguistic tools (e.g., LIWC, ConvoKit) alongside custom feature engineering approaches. To support ongoing development and ensure reliability as an open-source project, we implemented an automated testing pipeline using Pytest and GitHub Actions, enabling contributors to validate new features through standardized test cases and maintain consistency across the expanding feature set.',
    icon: '💬',
    additionalLinks: [
      { label: 'Website', url: 'https://teamcommtools.seas.upenn.edu/'},
      { label: 'Documentation', url: 'https://conversational-featurizer.readthedocs.io/en/latest/intro.html'},
    ],
  },
  {
    id: 'hack-6',
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

    icon: '🫀',
    images: ['images/hacks/stayin-alive-cover.webp', 'images/hacks/stayin-alive-1.png', 'images/hacks/stayin-alive-2.png', 'images/hacks/stayin-alive-3.png', 'images/hacks/stayin-alive-4.png', 'images/hacks/stayin-alive-5.png', 'images/hacks/stayin-alive-6.png', 'images/hacks/stayin-alive-7.png', 'images/hacks/stayin-alive-8.png', 'images/hacks/stayin-alive-9.png'],
    githubUrl: 'https://github.com/agshruti12/stayin-alive',
    liveUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    additionalLinks: [
      { label: 'Website', url: 'https://upenn-embedded.github.io/final-project-s25-stayin-alive/'},
    ],
  },
  {
    id: 'hack-7',
    title: 'AdTracker',
    tagline: 'A tool that decodes consumer behavior through eyetracking and respiratory rate analytics',
    category: 'hacks',
    overview: 'AdTracker emerged from the vision that every business, regardless of size or budget, should have access to sophisticated tools that decode consumer behavior. This tool employs advanced eyetracking and respiratory rate analytics to gauge consumer interaction with digital advertisements. An unforeseen solution thus far, AdTracker hopes to disrupt the current market of advertisement tracking, transcending past the traditional click-based tracking paradigm that companies have historically used to gauge consumer interest. ',
    team: [
      { name: 'Shruti Agarwal', role: 'Frontend Developer', initials: 'SA' },
      { name: 'August Fu', role: 'Backend Developer', initials: 'AF' },
    ],
    technologies: ['Javascript', 'CSS', 'HTML', 'Flask (Python)', 'Signal Processing'],
    implementation: 'The two core functions of this application are eye-tracking and respiratory monitoring of a given user. We used WebGazer.js, a third party Javascript library, to map users’ eye positions to coordinates on a laptop screen. Some initial calibration is necessary to provide training data to the underlying machine learning model; once the advertisement starts playing, the model can predict where exactly the user is looking on the screen. To calculate respiratory rate, while the advertisement is playing, we emit radio frequency chirps from the laptop speakers. These chirps reflect off of a user’s chest, and head back to the laptop. The time it takes to make this orbit is recorded, and the distance from the laptop to a user’s chest is calculated. As a user is breathing, their chest moves up and down, and therefore this distance oscillates. Using the recorded frequency of oscillation, we derived breathing rate. These eye-tracking screen coordinates, alongside breath rate, are displayed and fed back to ad-issuing companies later for potential exploratory data analysis. ',
    icon: '👁️',
    githubUrl: 'https://github.com/agshruti12/AdTracker',
    additionalLinks: [
      { label: 'Eye Tracking Demo', url: 'https://drive.google.com/file/d/1-phep8MApB2oGo0bJKLprS3Foang8Wca/view?resourcekey'},
      { label: 'Respiratory Rate Demo', url: 'https://drive.google.com/file/d/1IWBLBtZjsTfK3lKa54NzVWhh6d703PJY/view?usp=sharing'},
      { label: 'Paper', url: 'https://drive.google.com/file/d/1KjUUEy7nBH9feA9u4mwF2O1dLM31D81u/view?usp=sharing'},
    ],
  },
  {
    id: 'hack-8',
    title: 'Stryde',
    tagline: 'An iOS application that intelligently sequences music to match the cadence of your run.',
    category: 'hacks',
    overview: "Research has demonstrated that music, when synchronized with a person's running cadence, can provide enhanced psychological and psychophysical benefits during running. This app was developed in hopes of accomplishing this, lending athletes more motivations for their runs! Stryde’s core functionality is queuing/playing songs (from either your own Spotify playlists, or through AI-driven retrieval) that sync with the user’s running pace in real time. Leveraging sensor data from the smart devices people wear/possess while running gives us a unique window into the cadence of a user’s run; we process these signals and use them downstream to synchronize music!",
    team: [
      { name: 'Shruti Agarwal', role: 'REST APIDeveloper', initials: 'SA' },
      { name: 'Freddy Liu', role: 'Hardware Developer', initials: 'FL' },
      { name: 'George Xue', role: 'Mobile App Developer', initials: 'GX' },
      { name: 'Steven Chang', role: 'Mobile App Developer', initials: 'SC' }
    ],
    technologies: ['IMU Sensors', 'Flask', 'Python', 'Cerebras AI', 'Spotify API', 'UIKit', 'Swift'],
    implementation: "We leveraged the IMU sensor on the iPhone to measure the user's cadence, as many people run with either their phone or their Apple Watch to track their workouts, and both of these devices have IMU sensors that we can access. Although the current system is built for the iPhone, adding watch support is a relatively straightforward extension. We use a python backend server to process the raw signal data received from the IMU and compute the user's running cadence using Fourier transforms. On the mobile app, we use the Spotify API to access the user's playlists, find the tempo of the songs, and play songs that match the user's running pace in real time. Our app frontend is developed using UIKit. We also leveraged the Cerebras AI API to allow users the option to play music via an unstructured chat request (i.e. 'I want to feel positive on this run!'), rather than select playlists on their own.",
    icon: '🏃',
    images: ['placeholder-3-1', 'placeholder-3-2', 'placeholder-3-3'],
    githubUrl: 'https://github.com/agshruti12/Stryde',
    liveUrl: 'https://www.youtube.com/watch?v=3voHB-i6Xtw',
  },
  {
    id: 'hack-9',
    title: 'BatYap',
    tagline: 'A machine learning model that models bat vocalizations as an audio-language system',
    category: 'hacks',
    overview: 'This project aims to bridge the gap between animal communication and human-interpretable language by modeling Egyptian fruit bat vocalizations as an “audio-language” system. Bats rely heavily on complex social calls that encode information such as identity, context, and behavior, making them an ideal subject for studying structured acoustic communication. Inspired by recent advances in audio-language models, this project seeks to transform raw bat audio into discrete representations and align them with semantic labels, ultimately enabling tasks such as classification, next-call prediction, and natural language description of interactions. By doing so, the work contributes to both bioacoustics research and the broader goal of understanding non-human communication through machine learning.',
    team: [
      { name: 'Shruti Agarwal', role: 'Machine Learning Engineer', initials: 'SA' },
      { name: 'Mahika Calyanakoti', role: 'Data Engineer', initials: 'MC' },
      { name: 'Xiaoshen Ma', role: 'Machine Learning Engineer', initials: 'XM' },
    ],
    technologies: ['Python', 'PyTorch', 'scikit-learn', 'Hugging Face Transformers (wav2vec 2.0, HuBERT, AST)', 'VQ-VAE', 'k-means clustering', 'log-mel spectrograms (Librosa)', 'NumPy', 'pandas', 'GridSearchCV', 'transformer language models', 'GRU', 'matplotlib'],
    implementation: 'The system is built as a multi-stage pipeline that converts raw bat audio into structured and interpretable outputs. First, audio recordings are preprocessed by downsampling and converting them into log-mel spectrograms, which represent sound as a time–frequency image that models can easily process. To extract meaningful patterns, we apply several representation techniques: pretrained models like wav2vec generate frame-level embeddings (numerical summaries of short audio segments), which are then clustered using k-means to create discrete “tokens,” while VQ-VAE (a neural network that learns a compressed codebook of signals) produces tokens that can later be decoded back into audio. We also use transformer-based embeddings (AST) to capture high-level acoustic features of entire calls. These features are fed into classification models such as logistic regression and multilayer perceptrons (MLPs, i.e., simple neural networks) to predict attributes like which bat is speaking and the interaction context. Finally, we train sequence models (small transformer language models) on the token sequences to predict future sounds and combine the predicted labels into natural language descriptions using template-based and learned text generation methods. This end-to-end design allows the system to move from raw sound to structured understanding and human-readable summaries.',
    icon: '🦇',
    githubUrl: 'https://github.com/mahika-c/bat-llm',
    additionalLinks: [
      { label: 'Paper', url: 'https://drive.google.com/file/d/1wfqIzFq27drYOsfStFituVna1aht81fB/view?usp=sharing'},
    ],
  },
  {
    id: 'hack-10',
    title: "Chat Servers",
    tagline: 'Distributed replicated chat system',
    category: 'hacks',
    overview: 'This project implements a distributed replicated chat system where multiple servers coordinate using UDP-based multicast to deliver messages across clients in different chat rooms.',
    team: [],
    technologies: ['C++'],
    implementation: 'This project implements a distributed replicated chat system where multiple servers coordinate using UDP-based multicast to deliver messages across clients in different chat rooms. Each client connects to a single server, sends commands or messages, and receives updates, while servers communicate with one another to ensure messages are propagated to all relevant clients across replicas. The system supports key functionalities such as joining/leaving chat rooms, nickname management, and message broadcasting, and implements three ordering guarantees (unordered, FIFO, and total ordering) using mechanisms like sequence tracking and holdback queues to handle out-of-order delivery between servers. The architecture is fully decentralized with no central coordinator, relying on configuration-based server membership and socket communication to maintain consistency and scalability across up to hundreds of clients.',

    icon: '💬',
    githubUrl: 'https://github.com/CIS5550/26sp-CIS5050-agshruti12/tree/main/HW3',
  },
  { id: 'hack-11',
    title: 'Email Servers',
    tagline: 'A multithreaded email server that mimics a traditional email server (i.e. Gmail)',
    category: 'hacks',
    overview: 'This project mimics a traditional email server (i.e. Gmail), sending and receiving messages between users. Specifically, it implements two multithreaded servers: a Simply Mail Transfer Protocol (SMTP) server, which can be used to send emails using a normal mail client, and a Post Office Protocol (POP3) server, which can be used to retrieve emails. Referencing the SMTP and POP3 RFCs, this email server is true to Internet standards.',
    team: [],
    technologies: ['C++', 'Thunderbird'],
    implementation: 'Each server implements a host of commands that the user must interface with in order to send and/or receive a message. If using an email client (i.e. Thunderbird), then many of these interactions are abstracted away. Both servers employ a multithreaded architecture, allowing for multiple concurrent connections. The SMTP server is responsible for facilitating outgoing messages; it accepts a host of commands, including HELO, MAIL FROM, RCPT TO, and DATA, in order to process outbound mail transactions. It writes these messages to the individual mailboxes for each user. It has safeguards against edge cases, such as sending to non-existent users, sending commands out of order, or incorrectly formatted parameters (i.e. emails). The POP3 server works similarly in its structure, but it instead manages message storage and retrieval; it accepts commands to inspect and delete the contents of a user’s mailbox. Using synchronization strategies (i.e. mutexes, atomic operations, flock), the servers ensure there are no race conditions and can handle several concurrent threads operating within the same mailbox.',
    icon: '📧',
    githubUrl: 'https://github.com/CIS5550/26sp-CIS5050-agshruti12/tree/main/HW2',
  },
  {
    id: 'hack-12',
    title: 'fAIry',
    tagline: 'A platform for students and professors to collaborate on course material',
    category: 'hacks',
    overview: 'Using chat forums (i.e. Ed, Piazza) to get students’ questions answered on content typically involves disorganization, repetition, and tediousness. This decentralized approach leads to students and teaching staff wasting their time finding the answers to their questions via primitive search engines, or answering the same questions time and time again. fAIry provides a central platform for students and professors to seamlessly collaborate and iterate on course lecture material. As students study course material uploaded to our portal, they can provide feedback (i.e. typos, conceptual error, general confusion, etc.), tagged to specific portions of the notes, that will get sent straight to the teaching staff. From there, the teaching staff can leverage  a combination of their insights and our context-driven AI suggestions, to publish new versions of the lecture notes with student concerns addressed. This way, students can get clarity on their course material, and teachers have better visibility of how their students are responding to their content.',
    team: [
      { name: 'Shruti Agarwal', role: 'Developer', initials: 'SA' }
    ],
    technologies: ['React', 'Typescript', 'CSS', 'Flask', 'Claude AI'],
    implementation: "When a teacher uploads lecture notes to fAIry, the React frontend sends the content via REST API to the Flask backend, where Python stores it as a structured lecture object with discrete sections, each assigned a unique ID. As students study the material rendered through React Router's client-side navigation, they can click on any section to submit tagged feedback (typos, confusion, errors), which gets persisted on the backend with a direct reference to that section's ID—solving the disorganization problem of traditional forums.When the teacher views their dashboard, they see all feedback aggregated by section and can trigger AI suggestion generation, which calls the Anthropic Claude API with a carefully constructed prompt containing the lecture text alongside the student concerns; Claude returns JSON-formatted revision suggestions that are parsed and displayed in a diff-style view. The teacher reviews each suggestion, approving or rejecting them via dedicated Flask endpoints, and when ready, publishes a new version—the backend increments the version number while preserving the base lecture ID, applies all approved text changes, marks related student feedback as addressed, and makes the updated notes immediately available to students who can now see both the current and previous versions for reference.",
    icon: '🧚',
    githubUrl: 'https://github.com/mallikakulkarni20/AnthropicxPenn-MMSSS',
    liveUrl: 'https://www.loom.com/share/6fddb3559d054caa9c02cfa5898a1e3e',
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
    images: ['images/clicks/fall_atma_1.jpg', 'images/clicks/fall_atma_2.jpg', 'images/clicks/fall_atma_3.jpg', 'images/clicks/fall_atma_4.jpg'],
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
