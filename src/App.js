import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import About from './Components/About';
import Services from './Compoents/Services';
import Contact from './Components/Contact';
import Appointment from './Components/Appointment';
import Auth from './Components/Auth';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <main>
                        <Section id="home" title="Welcome to our Healthcare Clinic">
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
                        </main>
                    </Route>
                    <Route path="/about" component={About}/>
                    <Route path="/services" component={Services}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/appointment" component={Appointment}/>
                    <Route path="/auth" component={Auth}/>
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App;