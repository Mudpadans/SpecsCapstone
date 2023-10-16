import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../createContext';
import './Appointments.css'

const PORT = process.env.PORT

const Appointments = () => {
    const { userId } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

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

    const updateAppointmentStatus = async (appointmentId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:4600/updateAppointmentStatus/${appointmentId.id}`, {
                status: newStatus,
                doctor_id: userId.id
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })

            setAppointments(appointments.map(app => 
                app.id === appointmentId ? {...app, status:newStatus, doctor_id: userId.id} : app
            ))
        } catch (err) {
            console.error('Error updating appointment:', err)
            setError("There was an eror updating the appointment status.")
        }
    }
    
    return (
        <div className="appointments-page">
            <h1>Appointments</h1>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        <p>Patient: 
                            {appointment.Patient && appointment.Patient.first_name} 
                            {` `}
                            {appointment.Patient && appointment.Patient.last_name} 
                        </p>
                        {appointment.Doctor && <p>Dr. {appointment.Doctor.last_name}</p>}
                        <p>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                        <p>Type: {appointment.appointment_type}</p>
                        <p>Notes: {appointment.appointment_text}</p>
                        <p>Status: {appointment.status}</p>
                        {userId.user_type === 'doctor' && (
                            <select
                                value={appointment.status}
                                onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                            </select>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Appointments;