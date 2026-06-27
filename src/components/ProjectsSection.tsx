import { useState, useRef } from 'react';
import { Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBlock from './SectionBlock';
import ProjectCard from './ProjectCard';
import { playHover, playClick } from '@/hooks/useSoundEffects';

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterKey = 'all' | 'ai' | 'web' | 'mobile' | 'ecommerce';

interface Project {
  title: string;
  isNew?: boolean;
  description: string;
  tags: string[];
  categories: FilterKey[];
  githubUrl: string;
  liveUrl?: string;
}

// ─── Filter definitions ───────────────────────────────────────────────────────
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'ecommerce', label: 'E-Commerce' },
];

// ─── Project data ────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: 'Prescripto – Doctor Appointment Platform',
    isNew: true,
    description:
      'A full-stack healthcare platform that enables patients to book appointments while providing dedicated dashboards for doctors and administrators. Features secure authentication, role-based access, appointment scheduling, and responsive UI.',
    tags: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'JWT',
      'REST API',
    ],
    categories: ['web'],
    githubUrl: 'https://github.com/mishrabhi/Prescripto',
    liveUrl: 'YOUR_DEPLOYMENT_LINK',
  },

  {
    title: 'YDD – AI Content Generation Platform',
    description:
      'Built an AI-powered SaaS platform that generates dynamic content using OpenAI APIs. Integrated Stripe subscriptions, Google OAuth, JWT authentication, automated email delivery, and deployed the application on AWS EC2.',
    tags: [
      'Next.js',
      'Node.js',
      'MongoDB',
      'OpenAI',
      'AWS EC2',
      'Stripe',
      'Tailwind CSS',
      'Node Cron',
    ],
    categories: ['ai', 'web'],
    githubUrl: 'PRIVATE',
  },

  {
    title: 'Clinic & E-Commerce Platform',
    description:
      'Developed a scalable full-stack platform featuring appointment booking, membership plans, product ordering, Razorpay payments, admin dashboards, and role-based access control for healthcare and commerce workflows.',
    tags: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Razorpay',
      'JWT',
      'REST API',
    ],
    categories: ['web', 'ecommerce'],
    githubUrl: 'PRIVATE',
  },

  {
    title: 'SIFMS Business Website',
    description:
      'Designed and deployed a responsive corporate website for South India Facility Management Services with a focus on performance, accessibility, responsive layouts, and maintainable frontend architecture.',
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Bitbucket',
    ],
    categories: ['web'],
    githubUrl: 'PRIVATE',
    liveUrl: 'YOUR_LIVE_LINK',
  },

  {
    title: 'Weather App',
    description:
      'A responsive weather application that fetches live weather data using the OpenWeatherMap API, providing city-based search, dynamic weather icons, and real-time forecasts.',
    tags: [
      'React.js',
      'REST API',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    categories: ['web'],
    githubUrl: 'YOUR_GITHUB_LINK',
    liveUrl: 'YOUR_DEPLOYMENT_LINK',
  },
];



// ─── Card enter/exit variants ─────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.06,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    transition: { duration: 0.22, ease: 'easeIn' as const },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <SectionBlock id="projects" title="Projects">
      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => {
          const count =
            f.key === 'all'
              ? projects.length
              : projects.filter((p) => p.categories.includes(f.key)).length;

          const isActive = activeFilter === f.key;

          return (
            <button
              key={f.key}
              id={`filter-${f.key}`}
              onClick={() => {
                playClick();
                setActiveFilter(f.key);
              }}
              onMouseEnter={playHover}
              aria-pressed={isActive}
              aria-label={`Filter by ${f.label} (${count} projects)`}
              className={[
                'relative flex items-center gap-2 px-4 py-2 border-2 font-mono text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-none select-none',
                isActive
                  ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
                  : 'bg-white text-foreground border-black/40 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.08)] hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px]',
              ].join(' ')}
            >
              <span>{f.label}</span>
              {/* Live count pill */}
              <span
                className={[
                  'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[9px] font-black rounded-none border transition-colors duration-200',
                  isActive
                    ? 'bg-white text-black border-white/40'
                    : 'bg-black/8 text-black border-black/10',
                ].join(' ')}
              >
                {count}
              </span>

              {/* Active indicator — animated underline */}
              {isActive && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/40"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          );
        })}

        {/* Total label */}
        <span className="ml-auto self-center font-mono text-[10px] text-foreground/40 uppercase tracking-widest hidden sm:block">
          {filtered.length} / {projects.length} shown
        </span>
      </div>

      {/* ── Project Grid ── */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:snap-none">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const categories = project.categories.map((cat) => {
              const match = FILTERS.find((f) => f.key === cat);
              return match
                ? { key: cat, label: match.label }
                : { key: cat, label: cat };
            });
            return (
              <motion.div
                key={project.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="gsap-project-card w-[85vw] max-w-[350px] shrink-0 snap-center md:w-auto md:max-w-none h-full"
              >
                <ProjectCard
                  project={{
                    ...project,
                    categories,
                  }}
                  index={i}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state — when no projects match */}
        {filtered.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full py-20 text-center"
          >
            <p className="font-mono text-sm uppercase tracking-widest text-foreground/40">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      {/* ── GitHub Link ── */}
      <div className="mt-8">
        <a
          href="https://github.com/mishrabhi"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:gap-5 transition-all w-fit"
        >
          <Github className="w-4 h-4" />
          Explore Original Repositories
        </a>
      </div>
    </SectionBlock>
  );
};

export default ProjectsSection;
