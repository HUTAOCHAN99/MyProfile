'use client'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import BackToTop from '../components/BackToTop'
import Contact from '../components/Contact'
import Division from '../components/Division'
import Footer from '../components/Footer'
import ActivityComponent from '../components/Activity'
import Experience from '../components/Experience'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <>
      <BackToTop />
      <Header />
      <main>
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Division />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <ActivityComponent />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Reveal>
        <Footer />
      </Reveal>
    </>
  )
}