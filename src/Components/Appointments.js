import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../createContext';
import './Appointments.css'

const PORT = process.env.PORT

const Appointments = () => {
    const { userId } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null)
    const [hasDoctor, setHasDoctor] = useState(null)

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!userId) return;

            try {
                const token = localStorage.getItem('token')
                let response;

                if (userId.user_type === "patient") {
                    response = await axios.get(`http://localhost:4600/getPatientAppointments/${userId.id}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    });
                } else if (userId.user_type === "doctor") {
                    response = await axios.get(`http://localhost:4600/getAllAppointments`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    })
                }

                setAppointments(response.data.appointments)
                console.log(response.data.appointments)
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError("There was an error getting the appointments.")
            }
        };

        fetchAppointments();
    }, [userId])
    
    return (
        <div className="appointments-page">
            <h1>Appointments</h1>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        <p>Patient: 
                            {appointment.patient_id.first_name} 
                            {` `}
                            {appointment.patient_id.last_name} 
                        </p>
                        {/* {<p>Dr. {appointment.doctor_id.last_name}</p>} */}
                        <p>Date: {appointment.appointment_date}</p>
                        <p>Type: {appointment.appointment_type}</p>
                        <p>Notes: {appointment.appointment_text}</p>
                        <p>Status: {appointment.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Appointments;