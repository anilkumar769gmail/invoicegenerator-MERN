//dependencies
const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js')
//routes
router.post('/',(request,response) =>{
    //contains information sent from web browser
    const input = request.body;

    //information that will be stored in database
    const newDocument =new invoiceModel({
        sellerName: input.sellerName,
        sellerAddress: input.sellerAddress,
        customerName: input.customerName,
        customerAddress: input.customerAddress,
        items: input.items,
        finalPrice: input.finalPrice,
        terms: input.terms,
        invoiceDescription: input.invoiceDescription
    });

    //saving the information inside the database
    newDocument.save((err, doc) =>{
        if(err){
            //something went wrong
            console.log('ERROR' + err);
            response.status(500).json({message:'Problem when saving the information'});
        } else{
            //everything running fine
            console.log('The invoice has been save successfully');
            response.status(200).json({message:'The invoce was created successfully'});
        }
    });
   
});

//export content of this file - make public
module.exports = router;