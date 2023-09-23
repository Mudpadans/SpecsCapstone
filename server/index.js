require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const {PORT} = process.env || 4000;
const {MONGOURI} = process.env; 

const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
const Appointment = require('./models/appointment');
 
const userController = require('./controllers/users');
const appointmentController = require('./controllers/appointments');

mongoose.connect(MONGOURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('Mongodb connected')
  }) 
  .catch(err => {
    console.log('Error connecting to Mongodb', err)
  })

app.use(express.json());
app.use(cors());

app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.post('/refresh', userController.refresh)

app.post('/createAppointment', appointmentController.createAppointment)
app.get('/getAppointments', appointmentController.getAppointments)
app.get('/getDetails/:appointment_id', appointmentController.getDetails)
app.put('/updateAppointment/:appointment_id', appointmentController.updateAppointment)
app.delete('/deleteAppointment/:appointment_id', appointmentController.deleteAppointment)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})