import HeroBanner from '@/_components/ui/home/hero-banner'
import ParallaxBalls from '@/_components/ui/home/parallax-balls'
import DividerText from '@/_components/ui/home/divider-text'
import GridImages from '@/_components/ui/home/grid-images'
import SvgText from '@/_components/ui/home/svg-text'
import Brands from '@/_components/ui/home/brands'

export default function HomePage() {
  return (
    <section data-no-scrollbar className="ignore select-none">
      <HeroBanner />
      <ParallaxBalls />
      <DividerText />
      <GridImages />
      <SvgText />
      <Brands />
    </section>
  )
}
