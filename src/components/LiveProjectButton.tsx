type LiveProjectButtonProps = {
  href: string
  label?: string
  className?: string
}

export default function LiveProjectButton({
  href,
  label = 'Live Project',
  className = '',
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`shrink-0 whitespace-nowrap rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm ${className}`}
    >
      {label}
    </a>
  )
}
