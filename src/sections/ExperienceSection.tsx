import FadeIn from '../components/FadeIn'

type Entry = { period: string; title: string; detail: string }

const ENTRIES: Entry[] = [
  {
    period: 'Feb 2023 — Present',
    title: 'Sungkyunkwan University',
    detail: 'B.S. in Computer Science and Engineering',
  },
  {
    period: 'Mar 2026 — Present',
    title: 'SKKUDING',
    detail: 'Codedang — 온라인 코딩 학습 및 채점 사이트 개발',
  },
  {
    period: 'Apr 2026 — Dec 2026 (Expected)',
    title: 'PCN — Internship (University Project)',
    detail: 'On-Premise RAG 챗봇 제작 · B2B, B2G',
  },
]

export default function ExperienceSection() {
  // no rounded top here: SkillsSection above already opens the white block
  return (
    <section
      id="experience"
      className="relative z-0 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32"
      style={{ background: '#FFFFFF' }}
    >
      <h2
        className="text-center font-black uppercase mb-16 sm:mb-20 md:mb-28"
        style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </h2>

      <div className="mx-auto max-w-5xl">
        {ENTRIES.map((entry, i) => (
          <FadeIn
            key={entry.period + entry.title}
            delay={i * 0.1}
            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 md:gap-12 py-6 sm:py-8 md:py-10"
            style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="shrink-0 font-black leading-none sm:w-[220px] md:w-[300px]"
              style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
            >
              {entry.period}
            </span>

            <div className="flex flex-col gap-2">
              <h3
                className="font-medium leading-tight"
                style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {entry.title}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl"
                style={{
                  color: '#0C0C0C',
                  opacity: 0.6,
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                }}
              >
                {entry.detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
