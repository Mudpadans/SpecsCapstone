import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';    
import { UserContext } from '../createContext';
import { storage } from '../localStorageUtil'

const Header = () => {
    const { userId, setUserId } = useContext(UserContext);

    const logoutHandler = () => {
        storage.removeItem('token');
        storage.removeItem('user');
        setUserId(null);
        window.alert("You've successfully logged out!");
    }

    return (
        <header className='header'>
            <h1>GeneralCareClinic</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    {userId 
                        && userId.user_type === 'patient' 
                        && <li><Link to="/createAppointment">Make Appointment</Link></li>
                    }
                    <li><Link to="/appointments">Appointments</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {userId 
                        ? <li><Link onClick={logoutHandler}>Logout</Link></li> 
                        : <li><Link to="/auth">Signup/Login</Link></li>
                    }       
                </ul>
            </nav>
        </header>
    )
}

export default Header