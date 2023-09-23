require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION_STRING = process.env.CONNECTION_STRING; // Replace with your database connection string

// Initialize Sequelize
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres', // Adjust according to your database type
  logging: false,
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error connecting to the database', err));

// Models
const Patient = require('./models/patient'); // Assuming Sequelize-based Patient model
const Doctor = require('./models/doctor'); // Assuming Sequelize-based Doctor model
const Appointment = require('./models/appointment'); // Assuming Sequelize-based Appointment model

// Controllers
const userController = require('./controllers/users');
const appointmentController = require('./controllers/appointments');

Patient.init(sequelize);
Doctor.init(sequelize);
Appointment.init(sequelize);

app.use(express.json());
app.use(cors());

// Routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/refresh', userController.refresh);

app.post('/createAppointment', appointmentController.createAppointment);
app.get('/getAppointments', appointmentController.getAppointments);
app.get('/getDetails/:appointment_id', appointmentController.getDetails);
app.put('/updateAppointment/:appointment_id', appointmentController.updateAppointment);
app.delete('/deleteAppointment/:appointment_id', appointmentController.deleteAppointment);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
