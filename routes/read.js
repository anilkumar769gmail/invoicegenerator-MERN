//dependencies
const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js')
//routes
router.get('/all',(request,response) =>{
    //err - contains the error, docs - contains information in database
    invoiceModel.find((err,docs) =>{
        //if there is an error do following
        if(err){
            console.log('ERROR'+ err);
            response.status(500).json({message:'Problem reading information'});
        }else{
        //else if everthing is working fine
            console.log('The invoice has been found');
            response.status(200).json(docs);
        }
    });
});

router.get('/:invoiceId',(request,response) =>{
    invoiceModel.findOne({
        _id : request.params.invoiceId
    },(err,invoice) => {
        if(err){
            //something went wrong
            console.log('ERROR '+ err);
            response.status(500).json({message:'Problem when reading the invoce'});
        } else {
            //everything is working
            console.log('Invoce was found');
            response.status(200).json(invoice);
        }
    });
});


//export content of this file - make public
module.exports = router;