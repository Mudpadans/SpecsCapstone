import React from 'react';
import './App.css'

import Header from './Components/Header';
import Footer from './Components/Footer';

const Section = ({ id, title, children }) => {
    return (
        <section id={id}>
            <h2>{title}</h2>
            <p>{children}</p>
        </section>
    )
}

function App() {
    return (
        <div className='App'>
            <Header />
            <Section id="home" title="Wecomen to Healthcare Clinic">
                Your health is our top priority.
            </Section>
            <Section id="about" title="About Us">
                We are a dedicated team of healthcare professionals.
            </Section>
            <Section id="services" title="Our Services">
                <ul>
                    <li>General Medicine</li>
                    <li>Pediatrics</li>
                    <li>Dermatology</li>
                    <li>Chiropractics</li>
                </ul>
             </Section>
            <Section id="contact" title="Contact Us">
                Email: info@GeneralCareClinic.com
            </Section>
            <Footer />
        </div>
    )
}

export default App;