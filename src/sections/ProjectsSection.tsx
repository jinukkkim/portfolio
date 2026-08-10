import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import LiveProjectButton from '../components/LiveProjectButton'

const CDN = (file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${file}&w=1280&q=85`

const PROJECTS = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    images: [
      CDN('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png'),
      CDN('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png'),
      CDN('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png'),
    ],
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: [
      CDN('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png'),
      CDN('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png'),
      CDN('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png'),
    ],
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      CDN('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png'),
      CDN('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png'),
      CDN('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png'),
    ],
  },
]

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

// px each card sits below the one above it, for the stacked-paper look
const STAGGER = 28

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

  // the sticky wrapper is exactly one viewport and the card is capped below that, so a card
  // can never grow past its own slot and get clipped by the one stacking after it. the cap
  // also subtracts this card's stagger, so the offset never pushes it off the bottom.
  return (
    <div className="h-screen sticky top-0 flex items-center justify-center">
      <motion.article
        className={`relative flex flex-col w-full max-w-6xl border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 ${RADIUS}`}
        style={{
          scale,
          top: `${index * STAGGER}px`,
          maxHeight: `calc(88vh - ${index * STAGGER}px)`,
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
            </div>
          </div>

          <LiveProjectButton className="hidden sm:block" />
        </div>

        <div className="flex-1 min-h-0 flex gap-3 sm:gap-4 items-stretch">
          {/* the two stacked images split the leftover height 2:3 instead of taking a
              fixed size, so the card shrinks to fit short viewports */}
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
            <img
              src={project.images[0]}
              alt={`${project.name} 1`}
              loading="lazy"
              className={`w-full flex-[2] min-h-0 object-cover ${RADIUS}`}
            />
            <img
              src={project.images[1]}
              alt={`${project.name} 2`}
              loading="lazy"
              className={`w-full flex-[3] min-h-0 object-cover ${RADIUS}`}
            />
          </div>

          <div className="w-[60%]">
            <img
              src={project.images[2]}
              alt={`${project.name} 3`}
              loading="lazy"
              className={`w-full h-full object-cover ${RADIUS}`}
            />
          </div>
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
      id="projects"
      ref={ref}
      className={`relative z-10 -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 ${RADIUS.replace(/rounded-/g, 'rounded-t-')}`}
      style={{ background: '#0C0C0C' }}
    >
      <h2
        className="hero-heading text-center font-black uppercase leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
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
