const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors =require('cors');
app.use(cors());
app.options('*',cors());

require('dotenv/config');
const api = process.env.API_URL;
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/products`,productRouter);
app.use(`${api}/categories`,categoryRouter);



mongoose.connect(process.env.CONNECTION_STRING,{
    useUnifiedTopology: true,
    useNewUrlParser :true
})
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})