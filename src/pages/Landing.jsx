import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Intro from '../components/Intro'
import Services from '../components/Services'
import Work from '../components/Work'
import Contact from '../components/Contact'

export default function Landing() {
  return (
    <main id="top">
      <Hero />
      <Intro />
      <Marquee />
      <Services />
      <Work />
      <Contact />
    </main>
  )
}
