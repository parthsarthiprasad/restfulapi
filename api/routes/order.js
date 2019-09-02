const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order.js')
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: ' order fetched'
    });


});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        })
    // const order = {
    //     productId: req.body.productId,
    //     quantity: req.body.quantity
    // }
    res.status(201).json({
        message: ' order created',
        order: order
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'you discovered the special id',
            orderID: req.params.orderID
        })
    } else {
        res.status(200).json({
            message: "you passed an ID"
        })
    }
})

router.patch('/:orderid', (req, res, next) => {
    res.status(200).json({
        message: 'update product|'
    })
})

router.delete('/:orderid', (req, res, next) => {
    res.status(200).json({
        message: 'delete order|'
    })
})

module.exports = router;