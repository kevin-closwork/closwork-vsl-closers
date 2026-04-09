import { trackCTAClick } from '../lib/pixel'

export default function TrackedAgendaLink({ location, href = '#agenda', className = '', children, onClick, ...rest }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        trackCTAClick(location)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
