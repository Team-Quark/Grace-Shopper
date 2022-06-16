const router = require('express').Router();
const { models: { User }} = require('../db');
module.exports = router;

router.get('/', async (req,res,next)=>{
    try{
        const cart = await User.findByToken(req.headers.authorization)
        res.send(cart)
    } catch(e){
        next(e)
    }
})