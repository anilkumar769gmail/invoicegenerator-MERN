//dependencies
const express = require('express');
const app =express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

//connection to mangodb
mongoose.connect(
    'mongodb+srv://anilkumar769:lucky769@'+
    'invoicegeneratorapp.0neut.mongodb.net/invoiceStorage?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

//if connection fails
mongoose.connection.on('error',(error) => {
    console.log('ERROR' + error);
});

//if connection is successful
mongoose.connection.once('open',() => {
    console.log('Connection to mongodb Atlas is successful');
});

//body-parser enables app to handle input comes from web browser and stores as json object
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//static web server
app.use(express.static(path.join(__dirname,'dist')));

//REST API
app.use('/api/createinvoice',require('./routes/create.js'));

app.use('/api/readinvoice',require('./routes/read.js'))

app.use('/api/updateinvoice',require('./routes/update.js'))

app.use('/api/deleteinvoice',require('./routes/delete.js'))

//specifiy port number

app.listen(3000,()=>{
    console.log('listening at localhost:3000');
});