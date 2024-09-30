import Link from 'next/link'
import PageTransition from '@/_components/ui/animation/page-transition'
import PropTypes from 'prop-types'

const iconSize = {
  small: '1.125rem',
  medium: '1.5rem',
  large: '1.75rem',
}

export default function Icon({
  name,
  href,
  size = 'medium',
  withPageTransition,
  className,
  ...props
}) {
  return href ? (
    withPageTransition ? (
      <PageTransition href={href}>
        <SVG {...props} className={className} size={size} name={name} />
      </PageTransition>
    ) : (
      <Link href={href}>
        <SVG {...props} className={className} size={size} name={name} />
      </Link>
    )
  ) : (
    <SVG {...props} className={className} size={size} name={name} />
  )
}

Icon.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string.isRequired,
}

const SVG = ({ name, size, className, ...props }) => (
  <svg
    width={iconSize[size] ? iconSize[size] : size}
    viewBox="0 0 88 100"
    className={`inline-block ${className}`}
    {...props}
  >
    <use href={`/icons/icons.svg#${name}`} />
  </svg>
)
