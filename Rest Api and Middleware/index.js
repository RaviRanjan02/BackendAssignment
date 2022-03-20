const express = require("express");
const app=express();

app.use(allbooks)

app.get("/book1",(req,res)=>{
    res.send("Wings of fire")
})
app.get("/book2",(req,res)=>{
    res.send("Romeo Juliet")
})
app.get("/book3",(req,res)=>{
    res.send("Think like a Monk")
})
 function allbooks(req,res,next){
     console.log("getting all books")
     next();
 }

 app.get("/books/:bookName",(req,res)=>{
     res.send(req.params);
 })
app.listen(3800 ,()=>{
    console.log("Listening on port 3800")
})