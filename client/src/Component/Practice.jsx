import React from 'react'
import { Link } from 'react-router-dom'


const Practice = () => {
  return (
    <div>
      <ul>
        <Link to="/dashboard">Home</Link>
        <li>
          Dashboard
        </li>
      </ul>
    </div>
  )
}

export default Practice