import React from 'react'
import { Link } from 'react-router-dom'

function NavLink({ linkText, path, handle}) {
  return (
    <Link
            to={path}
            onClick={handle}
            className="bg-jsYellow text-black font-bold px-3 py-1 no-underline relative hover:after:block hover:after:bg-nodeGreen hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 hover:after:bottom-0"
          >
            {linkText}
          </Link>
  )
}

export default NavLink