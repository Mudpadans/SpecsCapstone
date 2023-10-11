require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const {sequelize} = require('./database')

app.use(express.json());
app.use(cors());

const isAuthenticated = require('./middleware/isAuthenticated')

app.get(`http://localhost:${PORT}`, isAuthenticated, (req, res) => {
    const user = req.user

    const userData = {
        userId: user.id,
        email: user.email,
        user_type: user.user_type,
        token: token
    }
    res.status(200).json({ userData, message: 'Access granted' })
})

const userController = require('./controllers/users');
const appointmentController = require('./controllers/appointments');

app.post('/signup', userController.signup);
app.post('/login', userController.login);
// app.post('/refresh', userController.refresh);

app.post('/createAppointment', isAuthenticated, appointmentController.createAppointment);
app.get('/getAppointments', isAuthenticated, appointmentController.getAppointments);
app.get('/patient/:patientId/appointments', isAuthenticated, appointmentController.getPatientAppointments);
app.get('/getDetails/:appointment_id', isAuthenticated, appointmentController.getDetails);
app.put('/updateAppointment/:appointment_id', isAuthenticated, appointmentController.updateAppointment);
app.delete('/deleteAppointment/:appointment_id', isAuthenticated, appointmentController.deleteAppointment);

sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))

