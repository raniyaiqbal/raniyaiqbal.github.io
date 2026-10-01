import type {
  Certification,
  Profile,
  Project,
  Role,
  SkillGroup,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Edit this file to update the site. Every section reads from here. */
/* ------------------------------------------------------------------ */

export const profile: Profile = {
  name: "Raniya Iqbal",
  handle: "raniyaiqbal",
  title: "Mechatronics Engineer",
  location: "Dubai, UAE",
  email: "raniyaiqbalofficial@gmail.com",
  cv: "/Raniya-Iqbal-CV.pdf",
  roles: [
    "Mechatronics Engineer",
    "Robotics Developer",
    "Embedded AI Builder",
    "Automation Engineer",
  ],
  summary:
    "I’m a Mechatronics Engineer with an interest in automation, robotics, and intelligent systems. I enjoy working across hardware and software to develop practical solutions to engineering problems.",
  about: [
    "I'm a Mechatronics Engineer with a background in mechanical, electrical, and software systems. My interests include robotics, embedded systems, and industrial automation, particularly where hardware and software come together to solve practical engineering problems.",
    "I currently work as an Application Engineer Intern at Emerson, supporting Fisher control valve applications and developing digital tools to improve engineering workflows. My previous experience includes robotics, embedded programming, and electrical engineering.",
    "I'm interested in roles where I can continue developing my technical skills and contribute to projects in automation, robotics, and intelligent systems.",
  ],
  education: "B.Eng (Hons) Mechatronics Engineering — University of Wollongong in Dubai",
  languages: ["English", "Malayalam", "Hindi", "French (basic)", "Arabic (basic)"],
  socials: [
    { label: "GitHub", href: "https://github.com/raniyaiqbal" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/raniya-iqbal" },
    { label: "Email", href: "mailto:raniyaiqbalofficial@gmail.com" },
  ],
};

export const projects: readonly Project[] = [
  {
    id: "pocket-wellness",
    title: "Pocket Wellness",
    tagline: "AI wearable for real-time mental health monitoring",
    description:
      "A wearable system that fuses HRV, GSR and EMG signals through an Arduino Nano ESP32 into an 18-feature vector, classifies four stress tiers with an explainable Random Forest (SHAP), and responds through a four-tier intervention framework: guided breathing, a physiologically aware chatbot and dual-pathway crisis escalation, all on a live Flask dashboard.",
    year: "2025–2026",
    badge: "Thesis · Distinction",
    tags: ["ESP32", "Arduino", "Python", "Flask", "Random Forest", "SHAP", "Biosignals"],
    metrics: [
      { value: "97.4%", label: "test accuracy" },
      { value: "18", label: "features" },
      { value: "3", label: "sensor modalities" },
    ],
    accent: "cyan",
    repo: "raniyaiqbal/pocket-wellness",
    report: "/Pocket-Wellness-Thesis.pdf",
  },
  {
    id: "paveway",
    title: "PaveWay",
    tagline: "Autonomous pothole detection & mapping robot",
    description:
      "A TurtleBot3 robot running ROS 2 that maps its surroundings with LiDAR SLAM (Cartographer), navigates autonomously with Nav2, detects potholes with a YOLOv8 model on a Raspberry Pi camera, geotags each defect on the map and streams everything to a live React dashboard over rosbridge.",
    year: "2024–2025",
    badge: "Innovation Fair · 2nd Place",
    tags: ["ROS 2", "TurtleBot3", "LiDAR SLAM", "Nav2", "YOLOv8", "OpenCV", "Gazebo", "React"],
    metrics: [
      { value: "88.4%", label: "detection mAP" },
      { value: "<15 cm", label: "geotag error" },
      { value: "6", label: "engineer team" },
    ],
    accent: "fuchsia",
    repo: "raniyaiqbal/Paveway",
    report: "/PaveWay-Final-Report.pdf",
  },
  // Add the next project here — copy an object above and edit it.
];

export const experience: readonly Role[] = [
  {
    title: "Application Engineer Intern",
    org: "Emerson FZE",
    location: "Jebel Ali, Dubai, United Arab Emirates",
    start: "Aug 2026",
    end: "Present",
    highlights: [
      "Specification, selection and sizing of Fisher control valves for quotations.",
      "Built Power Apps, Power Automate and Power BI solutions that digitalise cross-department workflows.",
      "Analysed multi-year RFQ and sales datasets to surface trends for business decisions.",
    ],
  },
  {
    title: "Electrical Engineer Intern",
    org: "Al Fisht Electromechanical Works",
    location: "Al Rashidiya 3, Ajman, United Arab Emirates",
    start: "Apr 2026",
    end: "Jul 2026",
    highlights: [
      "Diagnosed ELV and fibre-optic faults using OTDR testing and optical power measurement.",
      "Prepared technical documentation and coordinated with district cooling operators on site.",
    ],
  },
  {
    title: "Robotics Intern",
    org: "Unique World Robotics",
    location: "Al Karama, Dubai, United Arab Emirates",
    start: "Sep 2025",
    end: "Jan 2026",
    highlights: [
      "Taught robotics and AI programming on Arduino, Raspberry Pi, LEGO Spike and DOBOT arms.",
      "Coached a FIRST LEGO League team through robot design and autonomous programming.",
    ],
  },
];

export const skills: readonly SkillGroup[] = [
  { id: "software", label: "Software", items: ["TypeScript", "Python", "C / C++", "Java", "React", "Next.js", "Git"] },
  { id: "ai", label: "AI & Vision", items: ["Machine Learning", "Random Forest", "SHAP", "OpenCV", "Sensor Fusion", "AI Agents"] },
  { id: "robotics", label: "Robotics", items: ["ROS2", "Gazebo", "LiDAR", "TurtleBot3", "DOBOT"] },
  { id: "embedded", label: "Embedded", items: ["ESP32", "Arduino", "Raspberry Pi", "micro:bit", "AVR Assembly"] },
  { id: "automation", label: "Automation", items: ["PLC (Codesys)", "Power Automate", "Power Apps", "Power BI", "SAP S/4HANA", "Control Valves"] },
  { id: "design", label: "Design & Sim", items: ["SolidWorks", "Fusion 360", "AutoCAD", "ANSYS", "MATLAB", "Simulink"] },
];

export const certifications: readonly Certification[] = [
  { name: "SAP S/4HANA Cloud Public Edition Consultant", issuer: "SAP" },
  { name: "ROS2 Jazzy", issuer: "Udemy" },
  { name: "PLC Programming", issuer: "Udemy & PLCDojo" },
  { name: "Understanding AI · Introduction to AI Agents", issuer: "DataCamp" },
];
