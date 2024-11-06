require("dotenv").config();

const express = require('express');
const app = express();

const mongoose =  require('mongoose');
mongoose.connect('mongodb://localhost:27017/USER_ROLES').then(() =>{
    console.log('MongoDB connected successfully!');
})
.catch((err) => {
    console.log('MongoDB connection failed:', err.message);
  });


app.use(express.static('public'));

app.use(express.json());

const port = process.env.PORT || 6001;

const authRoute = require('./routes/auth.routes');
app.use('/api', authRoute);


app.listen(port, () => {
    console.log(`server runnig at port : ${port}`);
})