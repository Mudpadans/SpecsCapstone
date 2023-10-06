require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const {sequelize} = require('./database')

app.use(express.json());
app.use(cors());

const isAuthenticated = require('./middleware/isAuthenticated')

const userController = require('./controllers/users');
const appointmentController = require('./controllers/appointments');

app.post('/signup', userController.signup);
app.post('/login', userController.login);
// app.post('/refresh', userController.refresh);

app.post('/createAppointment', isAuthenticated, appointmentController.createAppointment);
app.get('/getAppointments', appointmentController.getAppointments);
app.get('/patient/:patientId/appointments', appointmentController.getPatientAppointments);
app.get('/getDetails/:appointment_id', appointmentController.getDetails);
app.put('/updateAppointment/:appointment_id', appointmentController.updateAppointment);
app.delete('/deleteAppointment/:appointment_id', appointmentController.deleteAppointment);

sequelize.sync()
.then(() => {
    app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))

