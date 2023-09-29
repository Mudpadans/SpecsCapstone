import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get("api/appointments")
            .then(response => setAppointments(response.data))
            .catch(error => console.error("Error fetching appointments:", error))
    }, [])

    return (
        <div className="appointment-page">
            <h1>Appointment</h1>
            {appointments.map(app => (
                <div key={app.id} className="appointment">
                <h3>{app.appointment_type}</h3>
                <p>Date: {app.appointment_date}</p>
                <p>Doctor: {app.doctor_id}</p> {/* Ideally, this should display the doctor's name rather than ID */}
                <p>Status: {app.status}</p>
                <p>Notes: {app.appointment_text}</p>
            </div>
            ))}
        </div>
    )
}

export default Appointment;
