import React from 'react';

import primaryCareImg from "../images/cdc-vt7iAyiwpf0-unsplash.jpg"
import pediatricsImg from "../images/cdc-COV00lEV3fM-unsplash.jpg"
import dermatologyImg from "../images/bermix-studio-yooU2TAGiSQ-unsplash.jpg"
import gynecologyImg from "../images/volodymyr-hryshchenko-87ev1NvhDsU-unsplash.jpg"
import cardiologyImg from "../images/towfiqu-barbhuiya-QsBfOwMoPNY-unsplash.jpg"
import orthopedicsImg from "../images/tom-claes-CfdzNybONzc-unsplash.jpg"

const Section = ({ id, title, children}) => {
    return (
        <section id={id}>
            <h2>{title}</h2>
            <div>{children}</div>
        </section>
    )
}

const Home = () => {
    return (
        <React.Fragment>
            <Section id="home" title="Welcome to our Healthcare Clinic">
            At our Healthcare Clinic, we are deeply committed
            to ensuring that your health and well-being remain
            at the forefront of everything we do. With a team
            of highly trained professionals and a compassionate 
            approach to medicine, we aim to provide comprehensive 
            care that meets the unique needs of every patient. 
            We understand that every individual's health journey 
            is personal and distinct. As such, our focus extends 
            beyond just treating ailments; we strive to foster 
            a deep understanding of each patient's concerns and 
            aspirations. From state-of-the-art diagnostics to 
            innovative treatments, our clinic is equipped with 
            the latest advancements in medical science. Our 
            promise to you is a healthcare experience that is 
            not only effective but also compassionate, understanding, 
            and tailored to ensure that you feel seen, heard, 
            and valued. Because at the end of the day, your 
            health is not just our profession—it's our passion.
            </Section>
            <Section id="services" title="Our Services">
                <ul>
                    <div>
                        <li>Primary Care</li>
                        <img className="serviceImg" src={primaryCareImg} alt="Primary Care"/>
                    </div>
                    <div>
                        <li>Pediatrics</li>
                        <img className="serviceImg" src={pediatricsImg} alt="Pediatrics"/>
                    </div>
                    <div>
                        <li>Gynecology</li>
                        <img className="serviceImg" src={gynecologyImg} alt="Gynecology"/>
                    </div>
                    <div>
                        <li>Cardiology</li>
                        <img className="serviceImg" src={cardiologyImg} alt="Cardiology"/>
                    </div>
                    <div>
                        <li>Dermatology</li>
                        <img className="serviceImg" src={dermatologyImg} alt="Dermatology"/>
                    </div>
                    <div>
                        <li>Orthopedics</li>
                        <img className="serviceImg" src={orthopedicsImg} alt="Orthopedics"/>
                    </div> 
                </ul>
            </Section>
        </React.Fragment>
    )
} 

export default Home;