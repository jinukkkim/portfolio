import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import LiveProjectButton from '../components/LiveProjectButton'

type Link = { label: string; href: string }

const PROJECTS: {
  number: string
  name: string
  category: string
  detail: string
  links: Link[]
}[] = [
  {
    number: '01',
    name: 'Codedang',
    category: 'SKKUDING',
    detail: '온라인 코딩 학습 및 채점 사이트',
    links: [{ label: 'Live Project', href: 'https://codedang.com/' }],
  },
  {
    number: '02',
    name: 'On-Premise RAG Chatbot',
    category: 'PCN · 산학협력',
    detail: '사내망에서 동작하는 B2B / B2G RAG 챗봇',
    links: [],
  },
  {
    number: '03',
    name: 'Exhibition Congestion Prediction',
    category: 'Personal',
    detail: '전시장 혼잡도 예측 서비스',
    links: [
      { label: 'Live Project', href: 'https://exhibition-traffic.duckdns.org/' },
      { label: 'GitHub', href: 'https://github.com/jinukkkim/exhibition-congestion-prediction' },
    ],
  },
]

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

// px each card sits below the one above it, for the stacked-paper look
const STAGGER = 28

// placeholder until the real screenshots land
function ImageSlot({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-white ${RADIUS} ${className}`}
    >
      <span
        className="px-3 text-center font-light tracking-wide"
        style={{ color: '#0C0C0C', opacity: 0.35, fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)' }}
      >
        이미지 업로드 예정
      </span>
    </div>
  )
}

type ProjectCardProps = {
  project: (typeof PROJECTS)[number]
  index: number
  total: number
  progress: MotionValue<number>
}

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  // each card settles a little smaller than the one on top of it
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  // the sticky wrapper is exactly one viewport and the card is sized below that, so a card
  // can never grow past its own slot and get clipped by the one stacking after it. the height
  // also subtracts this card's stagger, so the offset never pushes it off the bottom. it is a
  // fixed height, not a cap: the placeholder slots have no intrinsic size to push the card open.
  return (
    <div className="h-screen sticky top-0 flex items-center justify-center">
      <motion.article
        className={`relative flex flex-col w-full max-w-6xl border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 ${RADIUS}`}
        style={{
          scale,
          top: `${index * STAGGER}px`,
          height: `calc(88vh - ${index * STAGGER}px)`,
          background: '#0C0C0C',
        }}
      >
        <div className="shrink-0 flex items-center justify-between gap-4 pb-4 sm:pb-6 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span
              className="shrink-0 font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="uppercase tracking-widest text-[#D7E2EA]/60 text-xs sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA] truncate"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm md:text-base truncate">
                {project.detail}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-2">
            {project.links.map((link) => (
              <LiveProjectButton key={link.href} href={link.href} label={link.label} />
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 flex gap-3 sm:gap-4 items-stretch">
          {/* the two stacked slots split the leftover height 2:3 instead of taking a
              fixed size, so the card shrinks to fit short viewports */}
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
            <ImageSlot className="w-full flex-[2] min-h-0" />
            <ImageSlot className="w-full flex-[3] min-h-0" />
          </div>

          <ImageSlot className="w-[60%] min-h-0" />
        </div>
      </motion.article>
    </div>
  )
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="work"
      ref={ref}
      className={`relative z-10 -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 ${RADIUS.replace(/rounded-/g, 'rounded-t-')}`}
      style={{ background: '#0C0C0C' }}
    >
      <h2
        className="hero-heading text-center font-black uppercase leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Work
      </h2>

      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.number}
          project={project}
          index={i}
          total={PROJECTS.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  )
}
