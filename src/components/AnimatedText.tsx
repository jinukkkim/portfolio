import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type CharProps = {
  char: string
  range: [number, number]
  progress: MotionValue<number>
}

function Char({ char, range, progress }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      {/* invisible placeholder keeps layout; the animated copy sits on top */}
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

type AnimatedTextProps = {
  text: string
  className?: string
  style?: CSSProperties
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  const total = text.length
  let cursor = 0

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word) => {
        const start = cursor
        cursor += word.length + 1 // +1 for the space that follows

        return (
          // word-level wrapper so characters never break mid-word
          <span key={start} className="inline-block whitespace-nowrap">
            {[...word].map((char, i) => (
              <Char
                key={i}
                char={char}
                range={[(start + i) / total, (start + i + 1) / total]}
                progress={scrollYProgress}
              />
            ))}
            <span>&nbsp;</span>
          </span>
        )
      })}
    </p>
  )
}
