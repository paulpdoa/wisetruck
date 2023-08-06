require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const mainRoute = require('./routes/mainRoute');

// Port Connection
const port = 8000;

//Database Connection
const uri = process.env.DB_URI;

app.listen(port, async () => {
    try {
        await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Listening to port ${port} and connected to database successfully`);
    } catch(err) {
        console.log(err);
    }  
})

// Use
app.use(cors());
app.use(express.json());

app.use('/api/',mainRoute);