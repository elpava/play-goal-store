import Link from 'next/link'
import PropTypes from 'prop-types'

const iconSize = {
  small: '1.125rem',
  medium: '1.5rem',
  large: '1.75rem',
}

export default function Icon({ name, href, size = 'medium', ...props }) {
  return href ? (
    <Link href={href}>
      <SVG size={size} name={name} {...props} />
    </Link>
  ) : (
    <SVG size={size} name={name} {...props} />
  )
}

Icon.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string.isRequired,
}

const SVG = ({ name, size, ...props }) => (
  <svg
    width={iconSize[size] ? iconSize[size] : size}
    viewBox="0 0 88 100"
    {...props}
  >
    <use href={`/icons/icons.svg#${name}`} />
  </svg>
)
