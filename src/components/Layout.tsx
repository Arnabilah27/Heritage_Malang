import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
