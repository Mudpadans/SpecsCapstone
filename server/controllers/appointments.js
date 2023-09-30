const express = require('express');

const {sequelize} = require('../database');

const Appointment = require('../models/appointment');
const isAuthenticated = require('../middleware/isAuthenticated');

// const errorHandler = (res, err, statusCode = 500) => {
//     res.status(statusCode).json({ error: err.message })
// }

const getPaginationOptions = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let sort = {};
    if (req.query.sortBy) {
        const str = req.query.sortBy.split(',');
        sort[str[0]] = str[1] === 'desc' ? -1 : 1;    
    }

    return { page, limit, skip, sort };
}

module.exports = {
    createAppointment: [isAuthenticated, async (req, res) => {
        try {
            const { 
                patient_id, 
                doctor_id, 
                appointment_date, 
                status, 
                appointment_type,
                appointment_text
            } = req.body;

           const newAppointment = await Appointment.create({
                patient_id, 
                doctor_id, 
                appointment_date, 
                status, 
                appointment_type,
                appointment_text
            })

            res.status(201).json({
                message: 'Appointment created successfully',
                appointment: newAppointment
            });
        } 
        catch(err) {
            console.log(err, 'ERROR IN createAppointment');
            res.status(400).send(err);
        }
    }],
    
    getAppointments: [isAuthenticated, async (req, res) => {
        const { page, limit, skip, sort } = getPaginationOptions(req);

        let query = {};
        if (req.query.status) {
            query.status = req.query.status;
        }
    
        if (req.query.appointmentType) {
            query.appointmen_type = req.query.appointment_type;
        }
    
        try {
            const allAppointments = await Appointment.find(query)
                .skip(skip)
                .limit(limit)
                .sort(sort)
    
            const total = await Appointment.countDocuments(query)
    
            res.status(200).json({
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                appointments: allAppointments
            })
        } catch(err) {
            errorHandler(res, err)
        }
    }],
    
    getDetails: [isAuthenticated, async (req, res) => {
        try {
            const appointment = await Appointment.findById(req.params.id)
            if (!appointment) {
                return res.status(404).json({ 
                    message: 'Appointment not found'
                })
            }
            res.status(200).json({ appointment })
        } catch(err) {
            errorHandler(res, err)
        }
    }],
    
    updateAppointment: [isAuthenticated, async (req, res) => {
        try {
            const appointmentId = req.params.id;
            const updatedFields = req.body;
    
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                appointmentId,
                updatedFields,
                { new: true }
            )
    
            if (!updatedAppointment) {
                return res.status(404).json({ 
                    message: 'Appointment not found' 
                })
            }
    
            res.status(200).json({ 
                message: 'Appointment updated',
                appointment: updatedAppointment
            })
        } catch(err) {
            errorHandler(res, err)
        }
    }],
    
    deleteAppointment: [isAuthenticated, async (req, res) => {
        try {
            const appointmentId = req.params.id;
    
            const deletedAppointment = await Appointment.findByIdAndDelete(
                appointmentId
            )
    
            if (!deletedAppointment) {
                return res.status(404).json({ 
                    message: 'Appointment not found' 
                })
            }
    
            res.status(200).json({
                message: 'Appointment deleted',
                appointment: deletedAppointment
            })
        } catch(err) {
            errorHandler(res, err)
        }
    }]
}



 