import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        user_type: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
        medicalHistory: ''
    })

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
            let res;

            if (isSignup) {
                res = await axios.post('/signup', formData);
            } else {
                res = await axios.post('/login', formData);
            }
            console.log(res.data)
        } catch (err) {
            console.error("Error during Authentication:", err)
            res.sendStatus(500)
        }
    }

    return (
        <div className="auth-page">
            <h1>{isSignup ? 'Signup' : 'login'}</h1>
            <form onSubmit={submitHandler}>
                <div className="user-type-buttons">
                    <label>
                        <input 
                            type="radio"
                            name="user_type"
                            value="patient"
                            checked={formData.user_type === 'patient'}
                            onChange={changeHandler}
                        />
                        Patient
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="user_type"
                            value="doctor"
                            checked={formData.user_type === 'doctor'}
                            onChange={changeHandler}
                        />
                        Doctor
                    </label>
                </div>
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Email"
                />
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Password"
                />
                <input 
                    type="text"
                    name="first_name"
                    value={formData.firstName}
                    onChange={changeHandler}
                    placeholder="First Name"
                />
                <input 
                    type="text"
                    name="last_name"
                    value={formData.lastName}
                    onChange={changeHandler}
                    placeholder="Last Name"
                />
                <input 
                    type="date"
                    name="dob"
                    value={formData.birthDate}
                    onChange={changeHandler}
                    placeholder="Birth Date"
                />
                <input 
                    type="text"
                    name="phone_number"
                    value={formData.phoneNumber}
                    onChange={changeHandler}
                    placeholder="Phone Number"
                />
                <input 
                    type="text"
                    name="medical_history"
                    value={formData.medicalHistory}
                    onChange={changeHandler}
                    placeholder="Medical History"
                />
                <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            </form>
            <button>
                {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
            </button>
        </div>
    )
}

export default Auth;