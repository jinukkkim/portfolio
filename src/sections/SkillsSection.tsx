import FadeIn from '../components/FadeIn'

// icon = a filename in public/icons (Simple Icons, self-hosted). omit it and the
// item renders with the neutral dot instead — for skills with no brand mark.
type Skill = { name: string; icon?: string }
type Group = { heading: string; skills: Skill[] }

const GROUPS: Group[] = [
  {
    heading: 'Languages',
    skills: [
      { name: 'C', icon: 'c' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'Python', icon: 'python' },
      { name: 'TypeScript', icon: 'typescript' },
    ],
  },
  {
    heading: 'Frontend',
    skills: [
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    heading: 'Backend',
    skills: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'SQLAlchemy', icon: 'sqlalchemy' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Redis', icon: 'redis' },
      { name: 'APScheduler' },
    ],
  },
  {
    heading: 'AI / RAG',
    skills: [
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'vLLM', icon: 'vllm' },
      { name: 'Hybrid Retrieval — Qdrant · FAISS · Chroma + BM25 → RRF' },
      { name: 'Ingestion — Docling · OCR' },
      { name: 'MLflow', icon: 'mlflow' },
    ],
  },
  {
    heading: 'LLM Safety',
    skills: [
      { name: 'Input · Ingestion Guardrail' },
      { name: 'PII Masking' },
      { name: 'Red-team Regression Suite' },
      { name: 'ACL' },
    ],
  },
  {
    heading: 'Infra',
    skills: [
      { name: 'AWS' },
      { name: 'Docker', icon: 'docker' },
      { name: 'CI/CD', icon: 'githubactions' },
      { name: 'Git', icon: 'git' },
    ],
  },
]

function Chip({ skill }: { skill: Skill }) {
  return (
    <li
      className="flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2"
      style={{ background: 'rgba(12, 12, 12, 0.05)' }}
    >
      {skill.icon ? (
        <img
          src={`/icons/${skill.icon}.svg`}
          alt=""
          className="w-5 h-5 shrink-0 object-contain"
        />
      ) : (
        <span
          aria-hidden
          className="w-5 h-5 shrink-0 flex items-center justify-center"
        >
          <span
            className="block w-2 h-2 rounded-full"
            style={{ background: 'rgba(12, 12, 12, 0.35)' }}
          />
        </span>
      )}
      <span
        className="font-medium leading-none"
        style={{ color: '#0C0C0C', fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
      >
        {skill.name}
      </span>
    </li>
  )
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-0 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-4"
      style={{ background: '#FFFFFF' }}
    >
      <h2
        className="text-center font-black uppercase mb-16 sm:mb-20 md:mb-28"
        style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </h2>

      <div className="mx-auto max-w-5xl flex flex-col gap-10 sm:gap-12 md:gap-14">
        {GROUPS.map((group, i) => (
          <FadeIn
            key={group.heading}
            delay={i * 0.05}
            className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8 md:gap-12 pt-6 sm:pt-8"
            style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <h3
              className="shrink-0 font-medium uppercase tracking-widest sm:w-[160px] md:w-[200px]"
              style={{
                color: '#0C0C0C',
                opacity: 0.45,
                fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
              }}
            >
              {group.heading}
            </h3>

            <ul className="flex flex-wrap gap-2 sm:gap-2.5">
              {group.skills.map((skill) => (
                <Chip key={skill.name} skill={skill} />
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
