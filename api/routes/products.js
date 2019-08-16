const express = require('express');
const router = express.Router();
router.get('/' ,(req,res,next)=>{
    res.status(200).json({
        message: 'handling GET requests to /products'    
    });


});

router.post('/' ,(req,res,next) =>{
    res.status (200).json({
        message: 'handling POST requests to /products'
    })
});

router.get('/:productId' , (req,res,next)=>{
    const id = req.params.productId;
    if(id=== 'special'){
        res.status(200).json({
           message: 'you discovered the special id' 
        })
    }
    else {
        res.status(200).json({
            message: "you passed an ID"
        })
    }
})

router.patch('/:productsid' ,(req,res,next)=>{
    res.status(200).json({
        message: 'update product|'
    })
})

router.delete('/:productsid' ,(req,res,next)=>{
    res.status(200).json({
        message: 'delete product|'
    })
})

module.exports = router;