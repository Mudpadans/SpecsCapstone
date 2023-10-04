import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../createContext';
import './Appointments.css'

const Appointments = () => {
    const { userId } = useContext(UserContext);

    if (userId.user_type === "patient") {

    } else if (userId.user_type === "doctor") {

    }
}

export default Appointments;