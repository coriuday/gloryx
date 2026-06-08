/**
 * BinaryScouts — Team Data Store
 *
 * Profiles of the developers and specialists working at BinaryScouts.
 * Admin UI can extend this; TeamSection reads from it.
 */

export interface TeamSkill {
  name: string;
  /** Proficiency 0–100 */
  level: number;
  /** Category for grouping */
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'devops' | 'other';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Optional avatar image path */
  avatar?: string;
  skills: TeamSkill[];
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  /** Highlight badges shown on card */
  badges: string[];
  /** Years of experience */
  experience: number;
  /** Projects shipped */
  projectsShipped: number;
}

/* ─── Team Members ─────────────────────────────────────────── */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Zaid',
    role: 'Founder & Lead Engineer',
    bio: 'Full-stack engineer and AI systems architect. Designs and ships intelligent digital infrastructure from idea to production.',
    skills: [
      { name: 'Next.js', level: 96, category: 'frontend' },
      { name: 'TypeScript', level: 94, category: 'frontend' },
      { name: 'React', level: 95, category: 'frontend' },
      { name: 'Node.js', level: 90, category: 'backend' },
      { name: 'Supabase', level: 88, category: 'backend' },
      { name: 'PostgreSQL', level: 85, category: 'backend' },
      { name: 'OpenAI / GPT-4', level: 92, category: 'ai' },
      { name: 'n8n Automation', level: 88, category: 'ai' },
      { name: 'Framer Motion', level: 90, category: 'frontend' },
      { name: 'Vercel / AWS', level: 84, category: 'devops' },
    ],
    badges: ['AI Systems', 'Full Stack', 'Automation', 'UI/UX'],
    experience: 5,
    projectsShipped: 30,
  },
  {
    id: '2',
    name: 'Backend Specialist',
    role: 'Backend & Infrastructure Engineer',
    bio: 'Designs scalable server architectures, real-time data pipelines, and API systems that handle millions of requests.',
    skills: [
      { name: 'Rust', level: 88, category: 'backend' },
      { name: 'Python', level: 92, category: 'backend' },
      { name: 'FastAPI', level: 90, category: 'backend' },
      { name: 'PostgreSQL', level: 94, category: 'backend' },
      { name: 'Redis', level: 86, category: 'backend' },
      { name: 'Docker', level: 88, category: 'devops' },
      { name: 'Kubernetes', level: 82, category: 'devops' },
      { name: 'AWS', level: 85, category: 'devops' },
    ],
    badges: ['Rust', 'Python', 'Infrastructure', 'APIs'],
    experience: 4,
    projectsShipped: 20,
  },
  {
    id: '3',
    name: 'AI/ML Engineer',
    role: 'AI & ML Systems Engineer',
    bio: 'Builds production-grade AI pipelines, fine-tuned models, and intelligent automation systems that compound in value over time.',
    skills: [
      { name: 'Python', level: 95, category: 'ai' },
      { name: 'LangChain', level: 90, category: 'ai' },
      { name: 'OpenAI API', level: 94, category: 'ai' },
      { name: 'Vector Databases', level: 86, category: 'ai' },
      { name: 'RAG Systems', level: 88, category: 'ai' },
      { name: 'Prompt Engineering', level: 93, category: 'ai' },
      { name: 'n8n', level: 85, category: 'ai' },
      { name: 'TensorFlow', level: 80, category: 'ai' },
    ],
    badges: ['LLMs', 'RAG', 'Pipelines', 'Automation'],
    experience: 3,
    projectsShipped: 15,
  },
  {
    id: '4',
    name: 'Frontend Designer',
    role: 'UI Engineer & Motion Designer',
    bio: 'Crafts cinematic interfaces with obsessive attention to interaction quality, animation physics, and visual refinement.',
    skills: [
      { name: 'React', level: 92, category: 'frontend' },
      { name: 'TypeScript', level: 88, category: 'frontend' },
      { name: 'Framer Motion', level: 95, category: 'frontend' },
      { name: 'CSS / Tailwind', level: 96, category: 'frontend' },
      { name: 'Figma', level: 90, category: 'design' },
      { name: 'Three.js', level: 78, category: 'frontend' },
      { name: 'GSAP', level: 82, category: 'frontend' },
      { name: 'WebGL', level: 72, category: 'frontend' },
    ],
    badges: ['Motion', 'Design Systems', '3D', 'Interaction'],
    experience: 4,
    projectsShipped: 25,
  },
];

/* ─── Helpers ──────────────────────────────────────────────── */
export function getTeamMembers(): TeamMember[] {
  return TEAM_MEMBERS;
}

export const SKILL_CATEGORY_COLORS: Record<TeamSkill['category'], string> = {
  frontend: '#8B5CF6',
  backend:  '#10B981',
  ai:       '#F59E0B',
  design:   '#EC4899',
  devops:   '#3B82F6',
  other:    '#6B7280',
};
