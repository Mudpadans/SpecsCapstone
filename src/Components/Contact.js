import React from 'react';
import './Contact.css'

const Contact = () => {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
                <p>
                If you have any questions or would like to schedule 
                an appointment, please reach out to us using the 
                details below:
                </p>
            <div className="contact-details">
                <h2>Email:</h2>
                    <p>info@GeneralCareClinic.com</p>

                <h2>Phone:</h2>
                    <p>+1 (234) 567-8901</p>

                <h2>Address:</h2>
                    <p>123 Health St., Raccoon City, 12345</p>
            </div>
        </div>
    )
}

export default Contact;