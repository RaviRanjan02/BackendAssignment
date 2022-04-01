const app=require("./index");

const mongooseConnect=require("./configs/db")



app.listen(6500,async()=>{
    try {
        await mongooseConnect();
        console.log("listening on port 6500");
    } catch (err) {
        return send(err.message)
    }
})