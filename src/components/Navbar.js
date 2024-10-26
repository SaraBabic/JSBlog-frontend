import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className='bg-gray-100 shadow-md sticky top-0 z-40'>
        <div className='container flex items-center py-4 px-6 justify-between'>
            <div>
                <Link to="/"><img src='/images/icons/coding.png' className='w-10' alt='logo' /></Link>
            </div>
            <ul className='flex gap-4 m-0'>
                <Link to="/" className=' text-white bg-black rounded-full px-3 py-1 no-underline'>Home Page</Link>
                <Link to="/blog" className=' text-white bg-black rounded-full px-3 py-1 no-underline'>Blog</Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar