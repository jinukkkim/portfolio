import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const ROW_ONE = IMAGES.slice(0, 11)
const ROW_TWO = IMAGES.slice(11)

function Row({ images, translate }: { images: string[]; translate: number }) {
  // tripled so the strip stays filled while it slides
  const tiles = [...images, ...images, ...images]

  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${translate}px)`, willChange: 'transform' }}
    >
      {tiles.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="shrink-0 rounded-2xl object-cover"
          style={{ width: 420, height: 270 }}
        />
      ))}
    </div>
  )
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current
      if (!el) return
      setOffset((window.scrollY - el.offsetTop + window.innerHeight) * 0.3)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shift = offset - 200

  return (
    <section
      ref={ref}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      <Row images={ROW_ONE} translate={shift} />
      <Row images={ROW_TWO} translate={-shift} />
    </section>
  )
}
