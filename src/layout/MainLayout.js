import React from 'react'
import Navbar from '../components/Navbar'

function MainLayout({children}) {
  return (
    <>
        <Navbar />
        <div className='container my-10'>
            { children }
        </div>
    </>
  )
}

export default MainLayout