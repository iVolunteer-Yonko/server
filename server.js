import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import volunteerAuthRoute from './routes/Volunteer/authRoutes.js'
import organizerAuthRoute from './routes/Organizer/authRoutes.js'
import volunteerUserRoute from './routes/Volunteer/userRoutes.js'
import organizerUserRoute from './routes/Organizer/userRoutes.js'
import organizerEventRoute from './routes/Organizer/eventRoutes.js'
import 'express-async-errors';
import cookieParser from 'cookie-parser';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import cloudinary from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dk1qph45j',
//   api_key: '924628675212681',
//   api_secret: 'GUc308neCUM8u010rME1kwpz4IQ',
// });

// const __dirname = dirname(fileURLToPath(import.meta.url));
import http from "http";

const app = express()
import cors from "cors";




// app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json())
app.use(cookieParser())


app.use(morgan('dev'))


app.get('/home', (req, res) => {
    res.send('hello world')
})  

// import cors from 'cors';
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/v1/auth', volunteerAuthRoute)
app.use('/api/v1/auth', organizerAuthRoute)
app.use('/api/v1/user', volunteerUserRoute)
app.use('/api/v1/user', organizerUserRoute)
app.use('/api/v1', organizerEventRoute)


  
// Not found
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});
  
// Error
app.use(errorHandlerMiddleware);

const port = 5100

try{
    await mongoose.connect('mongodb+srv://Ranish:ranish1234@iVolunteer.5ajfr.mongodb.net/iVolunteer')
    app.listen(port, () => {
    console.log(`server is running on ${port}`)
})}catch(error){
    console.log(error)
    process.exit(1)
}