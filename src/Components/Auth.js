import React, { useState, useContext } from 'react';
import axios from 'axios';
import { storage } from '../localStorageUtil';
import { UserContext } from '../createContext';


const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        user_type: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        dob: '',
        phone_number: '',
        medical_history: '',
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
        const url = isSignup ? 'http://localhost:4600/signup' : 'http://localhost:4600/login'

        try {
            const res = await axios.post(url, formData)

            if (res.data.token) {
                storage.setItem('token', res.data.token)
            }

            console.log(res.data.token)

            if (res.data.userId) {
                const user = {
                    id: res.data.userId,
                    user_type: res.data.user_type
                }
                setUserId(user)
                storage.setItem('userId', JSON.stringify(user))
                window.alert("You've successfully logged in!");
            }
            
        } catch (err) {
            console.error("Error during Authentication:", err)
            console.error("Error Details:", err.response);
        }
    }

    const toggleIsSignup = () => {
        setIsSignup(!isSignup)  
        setFormData({
            ...formData,
            user_type: ''
        })
    }

    const logoutHandler = () => {
        storage.removeItem('token');
        storage.removeItem('userId');
        setUserId(null);
        window.alert("You've successfully logged out!");
    }

    return (
        <div className="auth-page">
            <h1>{isSignup ? 'Signup' : 'Login'}</h1>
            <form onSubmit={submitHandler}>
                
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
                {isSignup && (
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
                )}
                
                
                {isSignup && formData.user_type === "patient" && (
                    <textarea 
                        name="medical_history"
                        value={formData.medical_history}
                        onChange={changeHandler}
                        placeholder="Medical History"
                    ></textarea>
                )}

                {isSignup && formData.user_type === "doctor" && (
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
                
                <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            </form>
            <button onClick={toggleIsSignup}>
                {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
            </button>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Auth;