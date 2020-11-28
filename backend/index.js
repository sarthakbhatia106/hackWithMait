const express= require('express');
const app= express();
const OnemgRouter= require("./1mg/router");
const netMedRouter=require("./netmeds/router");
const pharmEasyRouter=require("./pharmEasy/router");


app.use("/1mg",OnemgRouter);
app.use("/netmed",netMedRouter);
app.use("/pharmeasy",pharmEasyRouter);

app.listen(8000,(req,res)=>{
    console.log(`app is running at 8000`);
})