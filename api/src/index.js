require('dotenv').config();
const express= require('express');
const mongoose= require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

require('./db/conn');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app = express();
const port = process.env.PORT || 4003;

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);

// app.get('/', (req,res)=>{
//     res.send("Home Page");
// });

// app.get('/users', (req,res)=>{
//     res.send("Users Page");
// });

app.listen(port,()=>{
    console.log(`Start On Port: ${port}`);
})