import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="logo">Home</Link>
                <Link to="/login" className="logo">Login</Link>
                <Link to="/signup" className="logo">Signup</Link>
            </div>
        </nav>
    )
}

export default Navbar