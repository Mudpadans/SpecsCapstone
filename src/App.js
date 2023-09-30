import React, { useState, useEffect } from 'react';
import { UserContext } from './createContext';
import './App.css'
import storage from './localStorageUtil'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Appointment from './Components/Appointment';
import Auth from './Components/Auth';

const App = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = storage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            storage.setItem('userId', userId);
        } else {
            storage.removeItem('userId')
        }
    }, [userId])

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            <Router>
                <div className='App'>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/services" element={<Services />}/>
                        <Route path="/contact" element={<Contact />}/>
                        <Route path="/appointment" element={<Appointment />}/>
                        <Route path="/auth" element={<Auth />}/>
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </UserContext.Provider>
    )
}

export default App;