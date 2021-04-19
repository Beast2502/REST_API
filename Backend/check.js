const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')

require('dotenv/config');
const api = process.env.API_URL;


//middleware
app.use(express.json())
app.use(morgan('tiny'));


const productSchema =mongoose.Schema({
    name: String,
    image : String,
    countInStock : Number
})

const Product = mongoose.model('Product',productSchema
)




app.post(`${api}/products`,(req,res)=>{
    const product = new Product({
        name : req.body.name,
        image : req.body.image,
        countInStock : req.body.countInStock
    });

    product.save().then((createProducts =>{
        res.status(201).json(createProducts)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
    // data.push(newData);
    // res.send(data)
    // console.log(newData)
})

app.get(`${api}/products`,async (req,res)=>{
    const productList = await Product.find();

    if(!productList){
        res.status(500).json({success : false})
    }

    res.send(productList);
    

})

mongoose.connect(process.env.CONNECTION_STRING,{
    useUnifiedTopology: true ,
    useNewUrlParser: true 
})
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log("http://localhost:3000");
    
})
