const path =require('path');
const express = require('express')
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

app.use('/products' , productRoutes);
app.use('/order', orderRoutes); 
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message: 'it works!'
//     });
// });

module.exports = app;