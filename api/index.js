const express = require('express')
const mongoose = require('mongoose');
const app = express()
const appRoute = require('./routes/authRoutes')
const cors = require('cors')

const cookieParser = require('cookie-parser')

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    method: ["GET", "POST", "DELETE", "PUT"],
    // credentials:true,            
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}));
app.use(express.urlencoded({ extended: false }));

//monogodb connection
const dbURI = 'mongodb://127.0.0.1:27017/Major'
// const dbURI=process.env.DB_URL
mongoose.connect(dbURI)
    .then((result) => app.listen(4000))
    .catch((err) => console.log('My error', err));

app.use(appRoute)



