const express = require('express');
const mongoose = require("mongoose");
const user = require('./route/user.route');
const app = express();
let port = 4000;
require("dotenv/config");

//connecting database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTING_STRING,(req,res)=>{
    console.log("Connected to the database");
});

app.use(express.json());
app.use('/users', user);

app.listen(port, function () {
    console.log(`server running at ${port}`);
});