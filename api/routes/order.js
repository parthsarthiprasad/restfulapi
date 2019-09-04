const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order')
const Product = require('../models/product')


router.get('/', (req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
<<<<<<< HEAD
        .populate('product', ' name')
=======
>>>>>>> 7c22f59f97f1a752f81581414e8a9798c2bb84b6
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/order/' + doc._id
                        }
                    }
                })

            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })


    // res.status(200).json({
    //     message: ' order fetched'
    // });


});

router.post('/', (req, res, next) => {
    Product
        .findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "product not found"
                })
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'order stored ',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/order/" + result._id

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        })



    // .catch(err => {
    //     res.status(500).json({
    //         message: 'product not found',
    //         error: err
    //     })
    // })


});

// const order = {
//     productId: req.body.productId,
//     quantity: req.body.quantity
// }
// res.status(201).json({
//     message: ' order created',
//     order: order
// })

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
<<<<<<< HEAD
        .populate('product')
=======
>>>>>>> 7c22f59f97f1a752f81581414e8a9798c2bb84b6
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: "order not found"
                })
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/order/"
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

router.patch('/:orderid', (req, res, next) => {
    res.status(200).json({
        message: 'update product|'
    })
})

router.delete('/:orderid', (req, res, next) => {
    Order.deleteOne({
            _id: req.params.orderid
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/order",
                    body: {
                        productId: "ID",
                        quantity: "Number"
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err

            })
        })
})

module.exports = router;