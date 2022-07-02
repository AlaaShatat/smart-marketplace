const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const expressValidator = require('express-validator');
require('dotenv').config();

//import routes
 const authRoutes = require('./routes/auth'); 
 const userRoutes = require('./routes/user');
 const productRoutes = require('./routes/product');
 const categoryRoutes = require('./routes/category');
 const braintreeRoutes = require('./routes/braintree');
 const orderRoutes = require('./routes/order');
 const storeRoutes = require('./routes/store');

// start server 
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("SERVER IS RUNNING")
});
mongoose.
    connect(process.env.mongoURL)
    .then(()=>{console.log("DATABASE CONNECTED")})
    .catch((err) =>{console.log("error connection",err)})

// middlewares 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
// routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", braintreeRoutes)
app.use("/api", orderRoutes)
app.use("/api", storeRoutes)