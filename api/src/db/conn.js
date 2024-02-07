require('dotenv').config();
const mongoose = require('mongoose');

const connection = async()=>{
    try{
        const result = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        if(!result){
            throw new Error("Couldn't connect to Database");
        } else{
            console.log("Connected to Database");
        }
    }catch(e){
        console.error(e);
    }
}
connection();