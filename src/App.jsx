import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import ChatWidget from './components/ChatWidget'
import Landing from './pages/Landing'
import Team from './pages/Team'
import Lab from './pages/Lab'
import Playbook from './pages/Playbook'
import Service from './pages/Service'
import Member from './pages/Member'

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollManager />
      <Header />
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:slug" element={<Member />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/playbook" element={<Playbook />} />
        <Route path="/services/:slug" element={<Service />} />
      </Routes>
      <Footer />
    </>
  )
}
