import SectionBlock from './SectionBlock';

const experiences = [ 
    { 
      role: "Software Development Associate",
      company: "Navgurukul",
      period: "Oct 2025 – Present", 
      description: "Mentoring aspiring software developers in modern Full Stack Development while conducting code reviews, debugging sessions, mock interviews, and technical assessments. Guiding students through React, Next.js, Node.js, Express, MongoDB, PostgreSQL, REST APIs, Git, and software engineering best practices. Collaborating with internal teams to improve curriculum, learning experiences, and project quality.", 
    },
    { 
      role: "Full Stack Developer", 
      company: "Fluencer Digital Pvt. Ltd.", 
      period: "Jan 2025 – Sep 2025", 
      description: "Built AI-powered SaaS products using Next.js, Node.js, MongoDB, and Tailwind CSS. Integrated OpenAI APIs, Stripe Checkout, JWT authentication, Google OAuth, and AWS EC2 deployments. Developed scalable backend APIs, role-based dashboards, appointment scheduling, and e-commerce features while working in an agile product team.", 
    }, 
    { role: "Freelance Frontend Developer", 
      company: "South India Facility Management Services (SIFMS)", 
      period: "Jun 2024 – Sep 2024", 
      description: "Designed and delivered a responsive business website using HTML, CSS, JavaScript, and Bootstrap. Focused on performance optimization, responsive UI, maintainable code, and collaborative development workflows, delivering a production-ready solution that improved client operations and digital presence.", 
    }, 
];

const ExperienceSection = () => (
  <SectionBlock id="experience" title="Experience">
    <div className="space-y-12">
      {experiences.map((exp) => (
        <div
          key={exp.role}
          className="relative pl-8 md:pl-0 border-l md:border-l-0 border-black/20 md:grid md:grid-cols-[1fr_2fr] md:gap-8 pb-12 last:pb-0"
        >
          <div className="md:text-right md:pr-8 md:border-r border-black/20 relative">
            <div className="hidden md:block absolute top-1 -right-[5px] w-[9px] h-[9px] rounded-none bg-black"></div>
            <div className="md:hidden absolute top-1 -left-[5px] w-[9px] h-[9px] rounded-none bg-black"></div>

            <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">
              {exp.period}
            </h4>
            <h3 className="font-bold text-base md:text-lg">{exp.company}</h3>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-bold text-foreground md:hidden mb-2">
              {exp.role}
            </h3>
            <h3 className="text-lg font-bold text-foreground hidden md:block mb-3">
              {exp.role}
            </h3>
            <p className="body-text text-sm">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default ExperienceSection;
