// const express = require('express');
// const cors=require('cors');
// const dotenv= require('dotenv')
// const  app= express();
// const mongoose=require('mongoose');
// dotenv.config();


// //MongoDB connection
// mongoose.connect(process.env.MONGODB_URI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// .then(()=>{
//     console.log('connected to MongoDB')
// })
// .catch((error)=>{
//     console.error("Error connecting to MOngoDB:",error)
// }
// )

// // port creation of server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`)
// })


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes=require('./routes/auth');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/Server/routes/auth.js',authRoutes)


// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});