const express = require("express");
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('bitcoin/data')
})

module.exports = router