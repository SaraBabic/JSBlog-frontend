import React from 'react'
import { Link } from 'react-router-dom'

function Button( {path, type}) {
  return (
    <Link to={path} className="bg-nodeGreen max-w-[200px] text-center text-black no-underline py-2 px-4 font-bold relative hover:after:block hover:after:bg-jsYellow hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 c">
    Read More
  </Link>
  )
}

export default Button