const express = require('express');
const router = express.Router();
router.get('/' ,(req,res,next)=>{
    res.status(200).json({
        message: ' order fetched'    
    });


});

router.post('/' ,(req,res,next) =>{
    res.status (201).json({
        message: ' order created'
    })
});

router.get('/:orderId' , (req,res,next)=>{
    const id = req.params.productId;
    if(id=== 'special'){
        res.status(200).json({
           message: 'you discovered the special id' ,
            orderID: req.params.orderID
        })
    }
    else {
        res.status(200).json({
            message: "you passed an ID"
        })
    }
})

router.patch('/:orderid' ,(req,res,next)=>{
    res.status(200).json({
        message: 'update product|'
    })
})

router.delete('/:orderid' ,(req,res,next)=>{
    res.status(200).json({
        message: 'delete order|'
    })
})

module.exports = router;