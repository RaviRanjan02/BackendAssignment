const mongoose=require("mongoose");

const mongooseConnect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/expressvalidation");
};

module.exports=mongooseConnect;