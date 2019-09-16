const path =require('path');
const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://slad_user:' + process.env.MONGO_ATLAS_PW +'@node-rest-shop-wv0yk.mongodb.net/test?retryWrites=true&w=majority',{
     useNewUrlParser: true
    }
);

// mongoose.connect(
//     "mongodb+srv://slad_user:<password>@node-rest-shop-wv0yk.mongodb.net/test?retryWrites=true&w=majority",
//       {
//         auth: {
//             user: 'slad_user',
//             password: process.env.MONGO_ATLAS_PW 
//         },
//         useNewUrlParser : true 
//     },
//     function(err, client){
//         if(err){
//             console.log(err)
//         }
//         else{
//         console.log("connected!!") ;
//         }
//     }
// );
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 
// this is done to handle cors errors (cross origin request sharing)

app.use((req,res,next)=>{
    res.header('Acess-Control-Allow-Origin' ,'*');
    res.header('Acess-Control-Allow-Headers' ,
    'Origin , X-Requested-With ,Content-Type, Accept , Authorization' 
    );

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods" ,
        "GET ,PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/products' , productRoutes);
app.use('/order', orderRoutes);
// app.use((req,res,next)=>{
//         message: 'it works!'
//     });
// });

app.use((req,res,next)=>{
    const error = new Error( 'not found');
    error.status(404);
    next(error);
    
})


module.exports = app;