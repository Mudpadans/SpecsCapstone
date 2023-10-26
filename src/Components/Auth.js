import React, { useState, useContext } from 'react';
import axios from 'axios';
import { storage } from '../localStorageUtil';
import { UserContext } from '../createContext';
import './Auth.css'

const PORT = process.env.PORT

const Auth = () => {
    const [formStep, setFormStep] = useState('login');
    const [formData, setFormData] = useState({
        user_type: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        dob: '',
        phone_number: '',
        immunizations: '',
        surgeries: '',
        hospitalizations: '',
        medications: '',
        allergies: '',
        weight: '',
        credentials: '',
        specializations: ''
    })
    const { userId, setUserId } = useContext(UserContext)

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
            if (formStep === 'login') {
                const url = `http://localhost:4600/login`
                const res = await axios.post(url, formData)

                if (res.data.token) {
                    storage.setItem('token', res.data.token)
                }

                if (res.data.userId) {
                    const user = {
                        id: res.data.userId,
                        user_type: res.data.user_type
                    }
                    setUserId(user)
                    storage.setItem('userId', JSON.stringify(user))
                    window.alert("You've successfully logged in!");
                }
            } else if (formStep === 'signup1') { 
                setFormStep('signup2')
            } else if (formStep === 'signup2') {
                const url = `http://localhost:4600/signup`
                const res = await axios.post(url, formData)

                if (res.data.token) {
                    storage.setItem('token', res.data.token)
                }

                if (res.data.userId) {
                    const user = {
                        id: res.data.userId,
                        user_type: res.data.user_type
                    }
                    setUserId(user)
                    storage.setItem('userId', JSON.stringify(user))
                    window.alert("You've successfully signed up!");
                }
            }
        } catch (err) {
            console.error("Error during Authentication:", err)
            console.error("Error Details:", err.response);
        }
    }

    const toggleFormStep = () => {
        if (formStep === 'login') {
            setFormStep('signup1')
        } else {
            setFormStep('login')
        }
    }

    const logoutHandler = () => {
        storage.removeItem('token');
        storage.removeItem('userId');
        setUserId(null);
        window.alert("You've successfully logged out!");
    }

    return (
        <div className="auth-page">
            <h1>{formStep.toUpperCase()}</h1>
            <form onSubmit={submitHandler}>
                {formStep === 'signup1' || 'login' && (
                    <div id='first-parameters'>
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
                    </div>     
                )}
                {formStep === 'signup1' && (
                    <div>
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
                        <div className='names'>
                            <input 
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={changeHandler}
                                placeholder="First Name"
                            />
                            <input 
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={changeHandler}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className='personal-info'>
                            <input 
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={changeHandler}
                                placeholder="Birth Date"
                            />
                            <input 
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={changeHandler}
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                )}
                {formStep === 'signup2' && formData.user_type === "patient" && (
                    <>
                        <textarea 
                            name="immunizations"
                            value={formData.immunizations}
                            onChange={changeHandler}
                            placeholder="Immunizations"
                        ></textarea>
                        <textarea 
                            name="surgeries"
                            value={formData.surgeries}
                            onChange={changeHandler}
                            placeholder="Surgeries"
                        ></textarea>
                        <textarea 
                            name="hospitalizations"
                            value={formData.hospitalizations}
                            onChange={changeHandler}
                            placeholder="Hospitalizations"
                        ></textarea>
                        <textarea 
                            name="medications"
                            value={formData.medications}
                            onChange={changeHandler}
                            placeholder="Medications"
                        ></textarea>
                        <textarea 
                            name="supplements"
                            value={formData.supplements }
                            onChange={changeHandler}
                            placeholder="Supplements"
                        ></textarea>
                        <textarea 
                            name="allergies"
                            value={formData.allergies}
                            onChange={changeHandler}
                            placeholder="Allergies"
                        ></textarea>
                        <input 
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={changeHandler}
                            placeholder="Weight"
                        />
                    </>
                )}
                {formStep === 'signup2' && formData.user_type === "doctor" && (
                    <>
                        <textarea
                            name="credentials"
                            value={formData.credentials}
                            onChange={changeHandler}
                            placeholder="Credentials"
                        ></textarea>
                        <textarea
                            name="specializations"
                            value={formData.specializations}
                            onChange={changeHandler}
                            placeholder="Specializations"
                        ></textarea>
                    </>
                )}
                
                <button type="submit">
                    {formStep === 'login' && 'Login'}
                    {formStep === 'signup1' && 'Next'}
                    {formStep === 'signup2' && 'Signup'}
                </button> 
            </form>
            <button onClick={toggleFormStep}>
                {formStep === 'login' ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
            </button>
        </div>
    )
}

export default Auth;