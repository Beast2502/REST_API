const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');
const api = process.env.API_URL;
const productRouter = require('./routers/products');

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/products`,productRouter)



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