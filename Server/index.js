const express = require('express');
const cors=require('cors');
const dotenv= require('dotenv')
const  app= express();
const mongoose=require('mongoose');
dotenv.config();


//MongoDB connection
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connected to MongoDB')
})
.catch((error)=>{
    console.error("Error connecting to MOngoDB:",error)
}
)

// port creation of server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})