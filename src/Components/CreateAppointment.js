import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../createContext';
import './CreateAppointment.css'
import { storage } from '../localStorageUtil';

const PORT = process.env.PORT

const CreateAppointment = () => {
    const { userId } = useContext(UserContext);

    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        status: '',
        appointment_type: '',
        appointment_text: ''
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }   

    const submitHandler = async (event) => {
        event.preventDefault();

        let {
            patient_id, 
            doctor_id,
            appointment_date,
            status,
            appointment_type,
            appointment_text
        } = formData

        if (doctor_id === '') {
            doctor_id = null;
        }

        const appointmentData = {
            patient_id: userId.id,
            doctor_id,
            appointment_date,
            status: "Pending",
            appointment_type, 
            appointment_text
        }

        try {
            console.log('Sending the following data:', appointmentData);
            const token = storage.getItem('token')
            console.log(token)
            const res = await axios.post(
                `http://localhost:4600/createAppointment`, 
                appointmentData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log(res.data.message)
        } catch (err) {
            console.error("Error creating appointment", err)
        }
    }

    return (
        <div className="appointment-page">
            <h1>Create an Appoinment</h1>
            <form onSubmit={submitHandler}>
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
                    placeholder="Appointment Type"
                />
                <textarea 
                    name="appointment_text"
                    value={formData.appointment_text}
                    onChange={changeHandler}
                    placeholder="Appointment Notes"
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateAppointment;
