import ContactButton from '../components/ContactButton'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact']

const PORTRAIT =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

// feel knobs for the cursor-follow. padding = how far from the portrait the cursor
// still pulls it (2000px ≈ the whole viewport); strength = divisor, higher is subtler.
// maxOffset caps the travel: the portrait sits flush at the hero's bottom edge, and the
// marquee below only clears it by 128px (sm) / 160px (md+), so it must never exceed that.
const MAGNET_PADDING = 2000
const MAGNET_STRENGTH = 6
const MAGNET_MAX_OFFSET = 80

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-20 flex justify-between px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {link}
          </a>
        ))}
      </FadeIn>

      <div className="relative z-20 overflow-hidden px-6 md:px-10 mt-6 sm:mt-4 md:-mt-5">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading w-full font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
        >
          Hi, i&apos;m jack
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          a 3d creator driven by crafting striking and unforgettable projects
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* positioning lives on this static div — FadeIn writes an inline `transform`,
          which would otherwise override Tailwind's -translate-x-1/2 / -translate-y-1/2 */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[320px] sm:w-[440px] md:w-[560px] lg:w-[680px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={MAGNET_PADDING}
            strength={MAGNET_STRENGTH}
            maxOffset={MAGNET_MAX_OFFSET}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img src={PORTRAIT} alt="Jack" className="w-full h-auto select-none" />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
