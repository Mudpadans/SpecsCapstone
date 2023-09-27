import React from 'react';
import "./Services.css"

const Services = () => {
    return (
        <div className="services-page">
            <h1>Our Services</h1>
                <p>
                At GeneralCareClinic, we offer a range of 
                medical services tailored to meet the diverse 
                needs of our patients. Here's a snapshot of 
                what we provide:
                </p>
            <div className="service-card">
                <h2>General Medicine</h2>
                    <p>
                    Our general medicine department caters to 
                    a wide range of ailments and provides 
                    preventive care, diagnosis, treatment, and 
                    follow-up for all age groups.
                    </p>
            </div>
            <div className="service-card">
                <h2>Pediatrics</h2>
                    <p>
                    Our pediatric department specializes in the 
                    care of infants, children, and adolescents, 
                    ensuring their optimal health and well-being.
                    </p>
            </div>
            <div className="service-card">
                <h2>Dermatology</h2>
                    <p>
                    We offer comprehensive care for skin, hair, 
                    and nail conditions, ensuring your skin remains 
                    healthy and vibrant.
                    </p>
            </div>
            <div className="service-card">
                <h2>Chiropractics</h2>
                    <p>
                    Our chiropractic care focuses on diagnosing and 
                    treating mechanical disorders of the musculoskeletal 
                    system, ensuring pain-free mobility.
                    </p>
            </div>
        </div>
    )
}

export default Services