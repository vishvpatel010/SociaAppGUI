const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

/* Update User */
router.patch('/:id',async(req,res)=>{
    try {
        if(req.body.userId == req.params.id || req.body.isAdmin){
            if(req.body.password){
                const salt = await bcrypt.genSalt(12);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
            const user = await User.findByIdAndUpdate({_id:req.params.id},{$set: req.body},{ new: true,useFindAndModify: false});
            res.status(201).send(`Successfully updated \n\n ${user}`);
            
        }else{
            res.status(403).send("You can Update only Your Account")
        }

    } catch (error) {
        res.status(500).send(error);
    }
});
/* Delete User */
router.delete('/:id',async(req,res)=>{
    try {
        if(req.body.userId == req.params.id || req.body.isAdmin){
            const user = await User.deleteOne({_id:req.params.id});
            res.status(201).send(`Successfully Deleted \n\n ${user}`);
            
        }else{
            res.status(403).send("You can Delete only Your Account")
            
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});
/* Get User */
router.get('/',async(req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId? await User.findById(userId): await User.findOne({username: username});
        const {password,updatedAt, ...other} = user._doc;
        res.status(200).send(other);
    } catch (error) {
        res.status(500).send(error)
    }
});

/* Follow User */
router.patch('/:id/follow',async(req,res)=>{
    try {
        if(req.body.userId != req.params.id){
            console.log('a');
            const user = await User.findById({_id: req.params.id});
            console.log('b');
            const currentUser = await User.findById({_id: req.body.userId});
            // console.log(user.followers.includes(req.body.userId));
            if(!user.followers.includes(req.body.userId)){
                console.log('d');
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.body.userId}});
                res.status(200).send("user has been followed");
            }else{
                res.status(403).send("You already follow this user")
            }
            
        }else{
            res.status(403).send("You can't Follow Your self")
        }

    } catch (error) {
        res.status(500).send(error);
    }
});

/* Unfollow User */
router.patch('/:id/unfollow',async(req,res)=>{
    try {
        if(req.body.userId != req.params.id){
            console.log('a');
            const user = await User.findById({_id: req.params.id});
            console.log('b');
            const currentUser = await User.findById({_id: req.body.userId});
            // console.log(user.followers.includes(req.body.userId));
            if(user.followers.includes(req.body.userId)){
                console.log('d');
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.body.userId}});
                res.status(200).send("user has been unfollowed");
            }else{
                res.status(403).send("You are not follow this user")
            }
            
        }else{
            res.status(403).send("You can't Unollow Your self")
        }

    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;