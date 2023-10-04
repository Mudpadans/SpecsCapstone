import React from 'react'
import { Link } from 'react-router-dom';    

const Header = () => {
    return (
        <header className='header'>
            <h1>GeneralCareClinic</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/createAppointment">Make Appointment</Link></li>
                    <li><Link to="/appointments">Appointments</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/auth">Signup/Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header