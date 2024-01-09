const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const Products = require('./models/product.model');
const productRoute = require('./routes/product.route');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res)=>{
    res.send('hello ecommerce API');
});
app.use('/api/products', productRoute);


// mongooose configuration
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log('connected to database..');
    app.listen(3000, ()=>{
        console.log('listening on port 3000...');
    });
}).catch((err)=>{
    console.log(err);
});

