const app= require('./index');

const connect= require('./configs/db.js');

app.listen(4500, async()=>{
    try {
        await connect()
        console.log('listening on port 4500');

    }catch(err){

        console.log(err.message);
   }

});