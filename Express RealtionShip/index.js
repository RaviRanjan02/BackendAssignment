const express=require("express");
const mongoose=require("mongoose");

const app=express();

app.use(express.json())



const connectDB=()=>{

    return  mongoose.connect("mongodb://127.0.0.1:27017/realtionships")
}


const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: false },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );
  
// Step 2 : creating the model
const User = mongoose.model("detail", userSchema);

// POST schema
const postSchema= new mongoose.Schema({
 title:{type:String,required:true},
 body:{type:String,required:true},
 userId:{type:mongoose.Schema.Types.ObjectId,ref:"detail",require:true},

},{
    timestamps:true,
});


const post= mongoose.model("post",postSchema);


// commentSchema

const commentSchema= new mongoose.Schema({
    body:{type:String,required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"detail",require:true},

   },{
       timestamps:true,
   });
   
   
   const comment= mongoose.model("comment",commentSchema);



// createing the uers crud
app.get(("/users"),async(req,res)=>{
    try {

        const userdata=await User.find({}).lean().exec();
        return res.status(201).send(userdata);
        
    } catch (error) {

        return res.status(500).send("something went wrong");
    
    }

});




app.post("/users",async(req,res)=>{
    try {

        const user=await User.create(req.body)

        console.log(req.body)
        return res.status(201).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});


// finding single one with ID

app.get(("/users/:ID"),async(req,res)=>{
    try {

        const user=await User.findById(req.params.ID).lean().exec()
        return res.status(201).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

// updating the values

app.patch(("/users/:ID"),async(req,res)=>{
    try {

        const user=await User.findByIdAndUpdate(req.params.ID,req.body,{new:true}).lean().exec()
        return res.status(201).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

// deleting the user

app.delete(("/users/:ID"),async(req,res)=>{
    try {

        const user=await User.findByIdAndDelete(req.params.ID).lean().exec();
        return res.status(201).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});



// POST CRUD


app.get(("/posts"),async(req,res)=>{
    try {

        const postdata=await post.find().populate({path:"userId",select:{first_name: 1,email: 1,_id: 0}}).lean().exec();

        return res.status(201).send(postdata);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});


app.post(("/posts"),async(req,res)=>{
    try {
        
        const userpost=await post.create(req.body)
        return res.status(201).send(userpost);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
        
    }
    
});


app.post(("/posts/:id"),async(req,res)=>{
    try {

        const postfind=await post.findById(req.params.id).lean().exec();
        return res.status(201).send(postfind);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

// update the post

app.post(("/posts/:id"),async(req,res)=>{
    try {

        const postupdate=await post.findByIdAndUpdate(req.params.id,{new:true}).lean().exec();
        return res.status(201).send(postupdate);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

// delete post

app.delete(("/posts/:id"),async(req,res)=>{
    try {

        const postdelete=await post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(postdelete);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

app.get(("/posts/:postId/comments"),async(req,res)=>{
    try {

        const comments=await comment.find(req.params.postId).lean().exec();
        return res.status(201).send(comments);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

// comment crud

app.get(("/comments"),async(req,res)=>{

    try {
        
        const comments=await comment.find({}).populate({path:"postId",select:["title"],populate:{path:"userId",select:["email"]},})
        .populate({path:"userId",select:["email"]}).lean().exec();
    
        return res.status(201).send(comments)
    } catch (error) {
        return res.send(error.message)
    }
});


app.post(("/comments"),async(req,res)=>{

    try {
        
        const comments=await comment.create(req.body);
    
        return res.status(201).send(comments)
    } catch (error) {
        return res.send(error.message)
    }
});

// get comment by id


app.get(("/comments/:id"),async(req,res)=>{

    try {
        
        const comments=await comment.findById(req.params.id)
        .populate({path:"postId",select:["title","body"],populate:{path:"userId",select:["password"]},})
        .populate({path:"userId",select:["email"]}).lean().exec();
    
        return res.status(201).send(comments)
    } catch (error) {
        return res.send(error.message)
    }
});

// update the comment

app.patch(("/comments/:id"),async(req,res)=>{

    try {
        
        const comments=await comment.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .populate({path:"postId",select:["title"],populate:{path:"userId",select:["email"]},})
        .populate({path:"userId",select:["email"]}).lean().exec();
    
        return res.status(201).send(comments)
    } catch (error) {
        return res.send(error.message)
    }
});

// delete the comment

app.delete(("/comments/:id"),async(req,res)=>{

    try {
        
        const comments=await comment.findByIdAndDelete(req.params.id).lean().exec();
    
        return res.status(201).send(comments)
    } catch (error) {
        return res.send(error.message)
    }
});


app.listen(4100,async()=>{
try {

await connectDB()

} catch (error) {
    console.log(error)
}
console.log("listening on port 4100")

})