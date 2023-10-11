import React from 'react';

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
                    <li>Primary Care</li>
                    <li>Pediatrics</li>
                    <li>Gynecology</li>
                    <li>Cardiology</li>
                    <li>Dermatology</li>
                    <li>Orthopedics</li>
                </ul>
            </Section>
        </React.Fragment>
    )
} 

export default Home;