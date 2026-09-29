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
    "I build systems that sense, decide and act — from embedded firmware and machine-learning pipelines to the software that ties them together.",
  about: [
    "I'm a Mechatronics Engineer who writes software for machines. My work spans embedded systems, sensor fusion, computer vision, machine learning and industrial automation, and I enjoy owning a project end to end: CAD, firmware, models, dashboards and the final working prototype.",
    "I'm currently an Application Engineer Intern at Emerson, where I work with Fisher control valves and build Power Platform tools that digitalise workflows across departments.",
    "I'm looking for opportunities in automation, AI and robotics.",
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
      "A sensor glove that streams GSR, HRV, EMG and ECG signals from an ESP32, classifies anxiety, depression, insomnia and panic states with an explainable Random Forest model, and responds with chatbot and haptic interventions.",
    year: "2025–2026",
    badge: "Thesis · Distinction",
    tags: ["ESP32", "Python", "Random Forest", "SHAP", "Full-Stack", "Biosignals"],
    metrics: [
      { value: "97.4%", label: "accuracy" },
      { value: "4", label: "sensor modalities" },
    ],
    accent: "cyan",
    repo: "raniyaiqbal/pocket-wellness",
  },
  // Add the next project here — copy the object above and edit it.
];

export const experience: readonly Role[] = [
  {
    title: "Application Engineer Intern",
    org: "Emerson FZE",
    location: "Jebel Ali, Dubai",
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
    location: "Ajman",
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
    location: "Dubai",
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
