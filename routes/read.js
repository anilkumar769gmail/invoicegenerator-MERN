//dependencies
const express = require('express');
const router = express.Router();

//routes
router.get('/',(request,response) =>{
    response.send('<h1>Hello from router read.js</h1>')
})


//export content of this file - make public
module.exports = router;