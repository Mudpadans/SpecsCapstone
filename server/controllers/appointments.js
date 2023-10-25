
const express = require('express');

const { Appointment } = require('../models/models');
const { Doctor } = require('../models/models');
const { Patient } = require('../models/models')

module.exports = {
    createAppointment: async (req, res) => {
        console.log('Received request data:', req.body);

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
            }, {
                include: [
                    { model: Patient, attributes: ['first_name', 'last_name', 'phone_number'] },
                    { model: Doctor, attributes: ['first_name', 'last_name', 'phone_number'] }
                ]
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
    },
    
    getAppointments: async (req, res) => {
    
        try {
            const allAppointments = await Appointment.findAll({
                include: [
                    { model: Patient, attributes: ['first_name', 'last_name', 'phone_number'] },
                    { model: Doctor, attributes: ['first_name', 'last_name', 'phone_number'] }
                ]
            })    
            console.log(allAppointments)
    
            res.status(200).json({
                appointments: allAppointments
            })
        } catch(err) {
            console.error("Error fetching all appointments:", err);
            res.status(500).send(err)
        }
    },

    getPatientAppointments: async (req, res) => {
        try {
            const patientId = req.params.patientId;

            const patientAppointments = await Appointment.findAll({
                where: { patient_id: patientId },
                include: [
                    { model: Patient, attributes: ['first_name', 'last_name', 'phone_number'] },
                    { model: Doctor, attributes: ['first_name', 'last_name', 'phone_number'] }
                ]
            });

            if (!patientAppointments || patientAppointments.length === 0) {
                return res.status(404).json({
                    message: 'No appointments found for this patient'
                });
            }

            res.status(200).json({
                message: 'Appointments fetched successfully',
                appointments: patientAppointments
            })
        } catch (err) {
            console.error("Error fetching patient's appointments:", err)
            res.status(500).send(err)
        }
    },

    updateAppointmentStatus: async (req, res) => {
        try {
            const appointmentId = req.params.appointment_id;
            const { status } = req.body;
            const doctor_id = req.userId.id

            if (!req.userId) {
                return res.status(403).json({
                    message: 'User not authenticated!'
                })
            }

            if (req.userId.user_type !== "doctor") {
                return res.status(403).json({
                    message: 'Only doctors can update appointments'
                })
            }

            if (!appointmentId) {
                return res.status(400).json({
                    message: 'Appointment ID missing'
                })
            }

            const existingAppointment = await Appointment.findOne({
                where: { id: appointmentId }
            })

            if (!existingAppointment) {
                return res.status(404).json({
                    message: 'Appointment not found'
                })
            }

            if (existingAppointment.doctor_id && existingAppointment.doctor_id !== doctor_id) {
                return res.status(403).json({
                    message: 'Another doctor has scheduled this appointment'
                })
            }

            const newDoctorId = status === 'Pending' ? null : doctor_id

            const updatedAppointment = await Appointment.update(
                { status, doctor_id: newDoctorId },
                {
                    where: { id: appointmentId },
                    returning: true
                }
            );

            if(!updatedAppointment || updatedAppointment[0] === 0) {
                return res.status(404).json({
                    message: 'Appointment not found'
                });
            }

            res.status(200).json({
                message: 'Appointment status updated',
                appointment: updatedAppointment[1][0]
            })
        }
        catch (err) {
            console.error("Error updating patient's appointment status:", err)
            res.status(500).send(err)
        }
    },
    
    updateAppointment: async (req, res) => {
        try {
            const appointmentId = req.params.appointment_id;
            console.log('Params: ', req.params)
            const updatedFields = req.body;
    
            const [updatedRows, [updatedAppointment]] = await Appointment.update(
                updatedFields,
                { 
                    where: { id: appointmentId },
                    returning: true 
                }
            );
    
            if (updatedRows === 0) {
                return res.status(404).json({ 
                    message: 'Appointment not found' 
                })
            }
    
            res.status(200).json({ 
                message: 'Appointment updated',
                appointment: updatedAppointment
            })
        } catch(err) {
            console.error("Error updating patient's appointment:", err)
            res.status(500).send(err)
        }
    },
    
    deleteAppointment: async (req, res) => {
        try {
            const appointmentId = req.params.appointment_id;

            const deletedRows = await Appointment.destroy({
                where: { id: appointmentId }
            })
    
            if (deletedRows === 0) {
                return res.status(404).json({ 
                    message: 'Appointment not found' 
                })
            }
    
            res.status(200).json({
                message: 'Appointment deleted'
            })
        } catch(err) {
            console.error("Error deleting patient's appointment:", err)
            res.status(500).send(err)
        }
    }
}



 