import Link from 'next/link'
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
  className,
  ...props
}) {
  return href ? (
    <Link href={href}>
      <SVG className={className} size={size} name={name} {...props} />
    </Link>
  ) : (
    <SVG className={className} size={size} name={name} {...props} />
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
