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

export default function Home() {
  return (
    <>
      <BackToTop />
      <Header />
      <main>
        <Hero />
        <About />
        <Division />
        <Experience />
        <ActivityComponent />
        <Contact />
      </main>
      <Footer />
    </>
  )
}