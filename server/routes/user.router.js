const express = require('express');
const {authenticate} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/profile', authenticate, (req,res)=>{
    res.status(200).json({user: req.user});
});

module.exports = router;