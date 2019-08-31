const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
router.get('/', (req, res, next) => {

    Product.find()
        .select('name price _id')
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                products: doc.map(doc => {
                    return {
                        //...docs,
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'https://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        });



    // res.status(200).json({
    //     message: 'handling GET requests to /products'
    // });


});

router.post('/', (req, res, next) => {
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
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'created product sucessfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

});

router.get('/:productId', (req, res, next) => {

    const id = req.params.productId;

    Product
        .findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json({
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }

                });
            } else {
                res.status(404).json({
                    message: "no valid entry found for provided ID"
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// patching sysntax 
// [
//     { "propName" : "name" , "value": "harry potter 6" }
// ]

router.patch('/:productsid', (req, res, next) => {
    const id = req.params.productsid;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "product updated",
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" + id
                }
            })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:productsid', (req, res, next) => {
    const id = req.params.productsid;
    Product.remove({
            _id: id
        }).exec()
        .then(result => {
            res.status(200).json({
                message: 'product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: {
                        name: 'string',
                        price: 'number'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;