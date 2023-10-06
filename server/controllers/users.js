const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');

const {Patient} = require('../models/patient');
const {Doctor} = require('../models/doctor');
const {SECRET} = process.env;


const typeChecker = async (user_type, parameter, value) => {
    let query = { where: { [parameter]: value } };
    try {
        if (user_type === 'doctor') {
            return await Doctor.findOne(query);
        } else if (user_type === 'patient') {
            return await Patient.findOne(query);
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}
    

module.exports = {
    signup: async (req, res) => {
        console.log('received request body:', req.body)
    
        try {
            const { 
                user_type,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                dob,
                medical_history,
                credentials,
                specializations
            } = req.body

            const emailExistsInPatients = await Patient.findOne({ where: { email } });
            const emailExistsInDoctors = await Doctor.findOne({ where: { email } });

            if (emailExistsInPatients || emailExistsInDoctors) {
                return res.status(409).send('Email is already taken!');
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            let newUser;
    
            if (user_type === 'patient') {
                newUser = await Patient.create({
                    user_type,
                    email,
                    password: hash,
                    first_name,
                    last_name,
                    phone_number,
                    dob,
                    medical_history,
                });
            } else if (user_type === 'doctor') {
                newUser = await Doctor.create({
                    user_type,
                    email,
                    password: hash,
                    first_name,
                    last_name,
                    phone_number,
                    dob,
                    credentials,
                    specializations,
                });
            } else {
                return res.status(400).send('Invalid user type provided!')
            }

            res.status(200).send({
                message: 'User registered successfully',
                userId: newUser.id,
                username: newUser.email,
                user_type: newUser.user_type
            });
            // console.log(data)

        } catch(err) {
            console.log(err);
            res.status(400).send('Registration failed!')
        }
    },
    
    login: async (req, res) => {

        try {
            const { email, password, user_type } = req.body; 
        
            if (user_type !== 'doctor' && user_type !== 'patient') {
                return res.status(400).json({ error: 'Invalid user type' });
            }
        
            let foundUser = await typeChecker(user_type, 'email', email)
            console.log('User found:', foundUser ? 'Yes' : 'No');
        
            if (!foundUser) {
                return res.status(403).send('User not found')
            }

            const isAuthenticated = bcrypt.compareSync(
                password,
                foundUser[0].password
            )
            console.log('Password matches:', isAuthenticated ? 'Yes' : 'No');
    
            if (isAuthenticated) {
                const token = jwt.sign({ id: foundUser.id }, SECRET, {
                    expiresIn: '1d'
                });

                // const refreshToken = crypto.randomBytes(64).toString('hex');
                // foundUser.refreshToken = refreshToken;
                // await foundUser.save();
    
                const exp = Date.now() + 1000 * 60 * 60 * 48;

                const data = {
                    username: foundUser.email,
                    userId: foundUser.id,
                    user_type: foundUser.user_type,
                    token: token,
                    // refreshToken: refreshToken,
                    exp: exp,
                };
                console.log("Found user: ", foundUser.dataValues);
                return res.status(200).send(data);
            } else {
                return res.status(403).send('Incorrect credentials!');
            }

        } catch(err) {
            console.log(err);
            return res.status(500).send('login failed')
        }
    },
    
    // refresh: async (req, res, next) => {
    //     const { refreshToken, user_type } = req.body;
    //     console.log(refreshToken)
    
    //     if(!refreshToken) {
    //         return res.status(400).json({ 
    //             message: 'Refresh token is required.' 
    //         });
    //     }
    
    //     if (user_type !== 'doctor' && user_type !== 'patient') {
    //         return res.status(400).json({ error: 'Invalid user type' });
    //     }
    
    //     try {
    //         const user = await typeChecker(user_type, 'refreshToken', refreshToken)
    
    //         if (!user) {
    //             return res.status(401).json({ 
    //                 message: 'Invalid refresh token.' 
    //             })
    //         }
    
    //         const newAccessToken = jwt.sign(
    //             { id: user.id }, 
    //             SECRET, 
    //             { expiresIn: '1h' });
    
    //         res.status(200).json({
    //             accessToken: newAccessToken
    //         })
    //     } catch(err) {
    //         next(err);
    //     }
    // }
}



