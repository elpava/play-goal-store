import dynamic from 'next/dynamic'
import HeroBanner from '@/_components/ui/home/hero-banner'
import ParallaxBalls from '@/_components/ui/home/parallax-balls'
import DividerText from '@/_components/ui/home/divider-text'
import SvgText from '@/_components/ui/home/svg-text'
import Brands from '@/_components/ui/home/brands'
const DynamicGridImages = dynamic(
  () => import('@/_components/ui/home/grid-images'),
)

export default function HomePage() {
  return (
    <section data-no-scrollbar className="ignore select-none">
      <HeroBanner />
      <ParallaxBalls />
      <DividerText />
      <DynamicGridImages />
      <SvgText />
      <Brands />
    </section>
  )
}
