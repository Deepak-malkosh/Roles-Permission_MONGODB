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

//auth route
const authRoute = require('./routes/auth.routes');
app.use('/api',authRoute);

//admin route
const adminRoute = require('./routes/admin.routes');
app.use('/admin',adminRoute); 

//common route
const commonRoute = require('./routes/common.routes');
app.use('/api',commonRoute)


const auth = require('./middleware/auth');
const { onlyAdminCanAccess } = require('./middleware/adminMiddleware');

const routerController = require('./controller/admin/routerController')

app.get('/admin/all-routes', auth, onlyAdminCanAccess, routerController.getAllRoutes);



app.listen(port, () =>{
    console.log(`server running at port : ${port}`)
});

