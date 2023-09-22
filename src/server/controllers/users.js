const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const Joi = require('joi')
const rateLimit = require('express-rate-limit')

const Patient = require('../models/patient');
const Doctor = require('../models/doctor')
const SECRET = process.env.SECRET;

const patientSignupSchema = Joi.object({
    user_type : Joi.string().valid('patient').required(),
    email : Joi.string().email().required(), 
    password : Joi.string().min(8).required(), 
    first_name : Joi.string().required(), 
    last_name : Joi.string().required(), 
    phone_number : Joi.number().required(), 
    dob : Joi.date().required(), 
    medical_history : Joi.string().allow('')
})

// const doctorSignupSchema = Joi.object({
//     user_type : Joi.string().valid('doctor').required(),
//     email : Joi.string().email().required(), 
//     password : Joi.string().min(8).required(), 
//     first_name : Joi.string().required(), 
//     last_name : Joi.string().required(), 
//     phone_number : Joi.number().required(), 
//     dob : Joi.date().required(), 
//     credentials : Joi.string().required(),
//     specializations : Joi.string().required()
// })

const loginSchema = Joi.object({
    email: Joi.string().email().required(), 
    password: Joi.string().min(8).required(), 
})

const typeChecker = async (user_type, parameter, value) => {
    let query = { [parameter]: value }
    if (user_type === 'doctor') {
        return await Doctor.findOne(query);
    } else if (user_type === 'patient') {
        return await Patient.findOne(query);
    }
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

module.exports = {
    signup: async (req, res, next) => {
        console.log('received request body:', req.body)

        const { user_type } = req.body
    
        let validationResult;
        if (user_type === 'doctor') {
            validationResult = Doctor.validate(req.body)
        } else if (user_type === 'patient') {
            validationResult = Patient.validate(req.body)
        }
    
        if (validationResult.error) {
            return res.status(400).json({ 
                error: validationResult.error.details[0].message 
            })
        }
    
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let newUser;
    
            if (user_type === 'patient') {
                newUser = new Patient({
                    user_type : 'patient',
                    email : req.body.email,
                    password : hashedPassword,
                    first_name : req.body.firstName,
                    last_name : req.body.lastName,
                    phone_number : req.body.phoneNumber,
                    dob : req.body.birthDate,
                    medicalHistory : req.body.medicalHistory,
                });
            }
    
            if (user_type === 'doctor') {
                newUser = new Doctor({
                    user_type : 'doctor',
                    email : req.body.email,
                    password : hashedPassword,
                    first_name : req.body.firstName,
                    last_name : req.body.lastName,
                    phone_number : req.body.phoneNumber,
                    dob : req.body.birthDate,
                    credentials : req.body.credentials,
                    specializations : req.body.specializations,
                });
            }
    
            const refreshToken = crypto.randomBytes(64).toString('hex');
            newUser.refreshToken = refreshToken;
    
            await newUser.save();
    
            const token = jwt.sign(
                { id: newUser.id }, 
                SECRET, 
                { expiresIn: '1h', algorithm: 'HS256'}
            )
    
            const safeUser = {
                id : newUser.id,
                email : newUser.email,
            }
    
            res.status(201).json({ 
                message: 'user created', 
                user: safeUser, 
                token,
                refreshToken
            })
        } catch(err) {
            next(err);
        }
    },
    
    login: async (req, res, next) => {
        const { email, password, user_type } = req.body; 
        const validationResult = loginSchema.validate(req.body)
    
        if (user_type !== 'doctor' && user_type !== 'patient') {
            return res.status(400).json({ error: 'Invalid user type' });
        }
    
        if (validationResult.error) {
            return res.status(400).json({ 
                error: validationResult.error.details[0].message 
            })
        }
    
        try {
            const user = await typeChecker(user_type, 'email', email)
    
            if (!user) {
                return res.status(401).json({ 
                    message: 'Invalid email' 
                })
            }
    
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ 
                    message: 'Invalid password' 
                })
            }
    
            const refreshToken = crypto.randomBytes(64).toString('hex');
            user.refreshToken = refreshToken;
            await user.save();
    
            const token = jwt.sign({ id: user.id }, SECRET, {
                expiresIn: '1h'
            })
    
            res.status(200).json({ 
                message: 'Login successful', 
                user, 
                token,
                refreshToken 
            });
        } catch(err) {
            next(err);
        }
    },
    
    refresh: async (req, res, next) => {
        const { refreshToken, user_type } = req.body;
    
        if(!refreshToken) {
            return res.status(400).json({ 
                message: 'Refresh token is required.' 
            });
        }
    
        if (user_type !== 'doctor' && user_type !== 'patient') {
            return res.status(400).json({ error: 'Invalid user type' });
        }
    
        try {
            const user = await typeChecker(user_type, 'refreshToken', refreshToken)
    
            if (!user) {
                return res.status(401).json({ 
                    message: 'Invalid refresh token.' 
                })
            }
    
            const newAccessToken = jwt.sign(
                { id: user.id }, 
                SECRET, 
                { expiresIn: '1h' });
    
            res.status(200).json({
                accessToken: newAccessToken
            })
        } catch(err) {
            next(err);
        }
    }
}



