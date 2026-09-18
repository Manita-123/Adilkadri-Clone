
import { Bounce, ToastContainer } from 'react-toastify'

import TopNav from "../user/component/TopNav"
import Navbar from '../user/component/Navbar'
import Footer from '../user/component/Footer'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' transition={Bounce} />
        <header className='sticky top-0 z-40 p-0 bg-white'>
          <TopNav />
          <Navbar />
        </header>
        <main>
            <Outlet/>
        </main>
          <Footer />
    </div>
  )
}
