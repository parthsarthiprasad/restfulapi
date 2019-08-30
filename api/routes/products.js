const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product  = require('../models/product');
router.get('/' ,(req,res,next)=>{
    
    product.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    })
    
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });

    });
    
    
    
    res.status(200).json({
        message: 'handling GET requests to /products'    
    });


});

router.post('/' ,(req,res,next) =>{
    // const product ={ 
    //                  name: req.body.name,
    //                  price: req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //product.save().exec();
    // exec helps to return a promise , else product.save with require a callback
    //exec is a function of mongoose , not require for save funtion
    //product.save(err ,result)
    product
    .save()
    .then(result=>{
        console.log(result);
        res.status (200).json({
        message: 'handling POST requests to /products' ,
        createdProduct: result         
        }) 
    })
    .catch(err =>{console.log(err)
                res.status(500).json({
                error: err
          })  
    });
        
});

router.get('/:productId' , (req,res,next)=>{
   
    const id = req.params.productId;

    Product
    .findById(id)
    .exec()
    .then( doc => {
        console.log("from database" , doc);
        if (doc){
        res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: "no valid entry found for provided ID"});
        }

    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:productsid' ,(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for( const aps of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update( {_id: id} ,{ $set : updateOps} )
    .exec()
    .then(result =>{ console.log( result);
        res.status(200).json( result)

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })   
})

router.delete('/:productsid' ,(req,res,next)=>{
   const id = req.params.productId;
    Product.remove({_id : id}) .exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch( err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;