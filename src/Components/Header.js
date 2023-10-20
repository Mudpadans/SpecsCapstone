import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';    
import { UserContext } from '../createContext';
import { storage } from '../localStorageUtil'
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../Redux/Slices/isLoading'

const Header = () => {
    const { userId, setUserId } = useContext(UserContext);
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.loading.isLoading)

    const logoutHandler = () => {
        dispatch(startLoading())
        storage.removeItem('token');
        storage.removeItem('user');
        setUserId(null);
        window.alert("You've successfully logged out!");
        dispatch(stopLoading())
    }

    return (
        <header className='header'>
            <h1>GeneralCareClinic</h1>
            {isLoading && <div>Loading...</div>}
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