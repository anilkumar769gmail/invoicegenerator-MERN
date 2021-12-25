//dependencies
const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');

//routes
router.put('/:invoiceId',(request,response) =>{
    //contains the informations that comes from web browser
    const input =request.body;
    
    invoiceModel.updateOne({
        _id:request.params.invoiceId
    },{
        sellerName: input.sellerName,
        sellerAddress: input.sellerAddress,
        customerName: input.customerName,
        customerAddress: input.customerAddress,
        items: input.items,
        finalPrice: input.finalPrice,
        terms: input.terms,
        invoiceDescription: input.invoiceDescription
    },(err,result) =>{
        if(err){
            //problems when updating information
            console.log('ERROR ' + err);
            response.status(500).json({message:'Problem updating information'});
        } else {
            //everything is working
            console.log('The invoice is updated in mongodb');
            response.status(200).json({message:'The invoice is updated in mangodb successfully'});
        }
    });
});


//export content of this file - make public
module.exports = router;