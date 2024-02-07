const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 


/* Register */
router.post('/register',async(req,res)=>{
    try {
        const user =await new User(req.body);

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(user.password,salt);
        user.password = hashPassword;

        const result = await user.save();
        res.status(201).send(result);
        // res.send("Register");    
    } catch (error) {
        res.status(500).send(error);
    }
    

});

/* Login */
router.post('/login',async(req,res)=>{
    try {
        // const user =await new User(req.body);
        
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).send(`${req.body.email} not found`);
        }
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword){
            res.status(404).send(`Invalid password`);
        }

        res.status(201).send(`Login Successfully \n\n${user}`); 
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;