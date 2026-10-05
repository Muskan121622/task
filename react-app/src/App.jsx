import BackgroundShapes from './components/BackgroundShapes.jsx'
import Topbar from './components/Topbar.jsx'
import LoginCard from './components/LoginCard.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <BackgroundShapes />
      <Topbar />
      <main className="page">
        <LoginCard />
      </main>
      <Footer />
    </>
  )
}
