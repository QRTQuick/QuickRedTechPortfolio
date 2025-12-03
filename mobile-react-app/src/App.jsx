import React from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'

export default function App(){
  return (
    <div className="app">
      <Nav />
      <main className="page">
        <Home />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
    </div>
  )
}
