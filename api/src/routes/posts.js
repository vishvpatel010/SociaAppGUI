const router = require('express').Router();
const Post = require('../models/post'); 
const User = require('../models/user'); 

/* Create A Post */
router.post('/',async(req,res)=>{
    try {
        const newPost = await Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).send(savedPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Update A Post */
router.patch('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId== req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).send("post updated successfully");
        } else{
            res.status(403).send("You can update only your posts");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Delete A Post */
router.delete('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId== req.body.userId){
            await post.deleteOne();
            res.status(200).send("post Deleted successfully");
        } else{
            res.status(403).send("You can delete only your posts");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Like A Post */
router.patch('/:id/like',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){

            await post.updateOne({$push: {likes:req.body.userId}});
            res.status(200).send("post liked successfully");
        } else{
            await post.updateOne({$pull: {likes:req.body.userId}});
            res.status(200).send("post disliked successfully");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Get A Post */
router.get('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Get timeline Posts */
router.get('/timeline/:userId',async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        // console.log(userPosts);
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error);
    }
});


/* Get users all posts */
router.get('/profile/:username',async(req,res)=>{
    try {
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;