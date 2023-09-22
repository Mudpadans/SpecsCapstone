import React from 'react';
import './App.css'

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