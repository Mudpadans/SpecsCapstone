import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../createContext';
import './Appointments.css'

const Appointments = () => {
    const { userId } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(false);
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        status: '',
        appointment_type: '',
        appointment_text: ''
    });
    const [filter, setFilter] = useState({
        name: "",
        type: "",
        status: ""
    })

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

    useEffect(() => {
        fetchAppointments();
    }, [userId])

    useEffect(() => {
        if(currentAppointment) {
            setFormData({
                patient_id: currentAppointment.patient_id,
                doctor_id: currentAppointment.doctor_id,
                appointment_date: currentAppointment.appointment_date,
                status: currentAppointment.status,
                appointment_type: currentAppointment.appointment_type,
                appointment_text: currentAppointment.appointment_text
            })
        }
    }, [currentAppointment])

    const filterHandler = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        })
    }

    const filteredAppointments = appointments.filter(appointment => {
        return (
            (filter.name === "" || appointment.Patient?.first_name.toLowerCase().includes(filter.name)) &&
            (filter.type === "" || appointment.appointment_type.toLowerCase().includes(filter.type)) &&
            (filter.status === "" || appointment.status.includes(filter.status))
        );
    });

    const updateAppointmentStatus = async (appointmentId, newStatus) => {
        console.log("Appointment:", appointmentId, "User:", userId)
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:4600/updateAppointmentStatus/${appointmentId}`, {
                status: newStatus,
                doctor_id: userId.id
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })

            console.log(response)

            fetchAppointments()
        } catch (err) {
            console.error('Error updating appointment status:', err)
            setError("There was an error updating the appointment status.")
        }
    }

    const openUpdateModal = (appointment) => {
        setCurrentAppointment(appointment)
        setShowModal(true)
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }   

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token')
            const res = await axios.put(
                `http://localhost:4600/updateAppointment/${currentAppointment.id}`, 
                formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

            if (res.status === 200) {
                fetchAppointments()

                window.alert("Appointment successfully updated!!")
                setShowModal(false);
            }

        } catch (err) {
            console.error("Error updating appointment", err)
            setError("There was an error updating the appointment.");
        }
    }

    const deleteHandler = async (appointment) => {

        try {
            const token = localStorage.getItem('token')
            console.log(appointment)
            const res = await axios.delete(
                `http://localhost:4600/deleteAppointment/${appointment.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (res.status === 200) {
                fetchAppointments()

                window.alert("Appointment successfully deleted!!")
            }

        } catch (err) {
            console.error("Error deleting appointment", err)
            setError("There was an error deleting the appointment.");
        }
    }
    
    return (
        <div className="appointments-page">
            <h1>Appointments</h1>
            {userId ? (
                <>
                    {error && appointments.length > 0 && <p className="error-message">{error}</p>}
                        <form className='filter-form'>
                            <input 
                                type='text'
                                placeholder='Filter by Name'
                                name='name'
                                value={filter.name}
                                onChange={filterHandler}
                            />
                            <input 
                                type='text'
                                placeholder='Filter by Type'
                                name='type'
                                value={filter.type}
                                onChange={filterHandler}
                            />
                            <select
                                name='status'
                                value={filter.status}
                                onChange={filterHandler}
                            >
                                <option value=''>All Status</option>
                                <option value='Pending'>Pending</option>
                                <option value='Confirmed'>Confirmed</option>
                                <option value='Completed'>Completed</option>
                            </select>
                        </form>
                        <ul className='appointments-container'>
                            {appointments.length > 0 ? (
                                filteredAppointments.map(appointment => (
                                    <li key={appointment.id} className='appointment-card'>
                                        <p>Patient: 
                                            {appointment.Patient && appointment.Patient.first_name} 
                                            {` `}
                                            {appointment.Patient && appointment.Patient.last_name} 
                                        </p>
                                        <p>Patient Phone Number:
                                            {appointment.Patient && appointment.Patient.phone_number}
                                        </p>
                                        <p>Doctor: 
                                            {appointment.Doctor && `Dr. ${appointment.Doctor.last_name}`}
                                        </p>
                                        <p>Doctor Phone Number:
                                            {appointment.Doctor && appointment.Doctor.phone_number}
                                        </p>
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
                                        {userId.user_type === 'patient' && (
                                            <div className="patient-buttons">
                                                <button onClick={() => openUpdateModal(appointment)}>Update</button>
                                                <button onClick={() => deleteHandler(appointment)}>Delete</button>
                                            </div>
                                        )}
                                        {showModal && (
                                             <div className='modal'>
                                                <div className='modal-content'>
                                                    <h2>Update Appointment</h2>
                                                    <form onSubmit={submitHandler}>
                                                        <div id="first-parameters">
                                                            <input 
                                                                type="date"
                                                                name="appointment_date"
                                                                value={formData.appointment_date}
                                                                onChange={changeHandler}
                                                                placeholder='Appointment Date'
                                                            />
                                                            <input 
                                                                type="text"
                                                                name="appointment_type"
                                                                value={formData.appointment_type}
                                                                onChange={changeHandler}
                                                                placeholder="e.g. Consultation, Check-up"
                                                            />
                                                        </div>
                                                        <textarea 
                                                            id="notes-area"
                                                            name="appointment_text"
                                                            value={formData.appointment_text}
                                                            onChange={changeHandler}
                                                            placeholder="Enter Appointment Details..."
                                                        ></textarea>
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                    <button onClick={() => {
                                                        setShowModal(false);
                                                    }}>Close</button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p>No appointments available, create one <a href='/createAppointment'>here</a></p>
                            )}
                        </ul>
                </>
                ) : (
                    <p className='login message'>Please <a href='/auth'>login/signup</a> to create and view appointments</p>
                )}
            </div>
    )
}

export default Appointments;