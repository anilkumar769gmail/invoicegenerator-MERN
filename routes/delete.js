//dependencies
const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');
//routes
router.delete('/:invoiceId',(request,response) =>{
    invoiceModel.deleteOne({
        _id : request.params.invoiceId
    },(err) =>{
        if(err){
            //problem removing invoice
            console.log('ERROR ' + err);
            response.status(500).json({message:'Problem removing a invoice'})
        } else {
            //everything is working
            console.log('The invoce is removed from mongodb');
            response.status(200).json({message:'The invoice is removed from mangodb'})
        }
    });
});


//export content of this file - make public
module.exports = router;