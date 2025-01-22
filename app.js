require("dotenv").config();

const express = require('express');
const app = express();

const mongoose =  require('mongoose');
mongoose.connect('mongodb://localhost:27017/ROLES_PERMISSIONS').then(() =>{
    console.log('MongoDB connected successfully!');
})
.catch((err) => {
    console.log('MongoDB connection failed:', err.message);
});

app.use(express.json());

app.use(express.static('public'));

const port = process.env.PORT || 3333; 


const authRoute = require('./routes/auth.routes');
app.use('/api',authRoute);

const adminRoute = require('./routes/admin.routes');
app.use('/admin',adminRoute); 


app.listen(port, () =>{
    console.log(`server running at port : ${port}`)
});

