import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='Navbar-container'>
      <div className='logoTitle'>
        <Link to="/">Sasta E-commerce</Link>
      </div>
      <div className='addProductBtn'>
        <Link to="/addProduct">Add Products</Link>
      </div>
    </div>
  )
}

export default Navbar