import React from 'react'
// import Navbar from './partials/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        {/* <Navbar /> */}
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout