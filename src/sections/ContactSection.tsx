import { SECTION_HEADING, SECTION_HEADING_SIZE } from '../theme'
import FadeIn from '../components/FadeIn'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from '../contact'

const LOCATION = 'Suwon, South Korea'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/jinukkkim' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jinuk-kim-a74b9742a/' },
]

export default function ContactSection() {
  // min-h-screen: as the last section it must be a full viewport tall, or the #contact
  // anchor stops short at the page's own scroll limit instead of at the section top
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center gap-8 sm:gap-12 px-5 sm:px-8 md:px-10 py-28 sm:py-36 md:py-44"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        y={40}
        className={`hero-heading ${SECTION_HEADING} leading-none tracking-tight`}
        style={{ fontSize: SECTION_HEADING_SIZE }}
      >
        Contact
      </FadeIn>

      <FadeIn delay={0.15} y={20} className="w-full flex justify-center">
        <a
          href={CONTACT_EMAIL_HREF}
          className="text-[#D7E2EA] font-medium text-center break-all leading-tight transition-opacity duration-200 hover:opacity-70 underline underline-offset-8 decoration-1"
          style={{ fontSize: 'clamp(1.1rem, 4vw, 3rem)' }}
        >
          {CONTACT_EMAIL}
        </a>
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.25}
        y={20}
        className="text-[#D7E2EA]/60 uppercase tracking-widest text-sm sm:text-base text-center"
      >
        {LOCATION}
      </FadeIn>

      <FadeIn
        delay={0.35}
        y={20}
        className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[#D7E2EA]/60 uppercase tracking-widest text-sm sm:text-base"
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#D7E2EA]"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.45}
        className="text-[#D7E2EA]/30 text-xs sm:text-sm tracking-widest uppercase pt-6"
      >
        © {new Date().getFullYear()} Jinuk Kim
      </FadeIn>
    </section>
  )
}
