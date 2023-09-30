import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../createContext';

const Appointment = () => {
    const { userId } = useContext(UserContext);

    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appoinment_date: '',
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
        event.preventDefault;

        const appointmentData = {
            ...formData,
            patient_id: userId
        }

        try {
            const res = await axios.post('http://localhost:4600/createAppointment', appointmentData);
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
                    value={formData.appoinment_date}
                    onChange={changeHandler}
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={changeHandler}
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Completed">Completed</option>
                </select>
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

export default Appointment;
