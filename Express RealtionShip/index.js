const express=require("express");
const mongoose=require("mongoose");

const app=express();

app.use(express.json())



const connectDB=()=>{

    return  mongoose.connect("mongodb://127.0.0.1:27017/realtionships")
}


// Schema for section


const sectionSchema = new mongoose.Schema({
    "sectionName":{type:String,required:true},
});



//  Connecting the schema to section collection


const Section = mongoose.model("section", sectionSchema);



//   Schema for books

const bookSchema = new mongoose.Schema({
    "sectionId":{type:mongoose.Schema.Types.ObjectId,ref:"section",required:true},
   "name":{type:String,required:true},
   "body":{type:String,required:true},
})


//  Connecting the schema to books collections

const Book = mongoose.model("book", bookSchema);


// Schema for author

const authorSchema = new mongoose.Schema({
    "authorName":{type:String,required:true},
})

// Connecting the schema to authors collections

const Author = mongoose.model("author", authorSchema)


// Schema for book author

const bookAuthorSchema = new mongoose.Schema({
    "bookId":{type:mongoose.Schema.Types.ObjectId, ref:"book", required:true},
    "authorId":{type:mongoose.Schema.Types.ObjectId,ref:"author", required:true},
})
//Connecting the Schema to bookAuthors collection

const BookAuthor = mongoose.model("bookAuthor", bookAuthorSchema)

//checkedout schema

const checkedOutSchema=new mongoose.Schema(
    {
       
        "checkOutTime":{type:Number, required:true},
        "checkInTime":{type:Number, required:true},
    
    },
   
    );
    //model for checkedout
    
    const CheckedOut = mongoose.model("checkout",checkedOutSchema);

///CRUD API for Section

app.post("/sections", async (req, res)=>{
    const sec = await Section.create(req.body)

    return res.status(201).send({sec})
});

app.get("/sections", async (req,res)=>{
    const sec = await Section.find().lean().exec();
    res.status(200).send({sec})
});



//CRUD API for Books


app.post("/books", async (req, res)=>{
    const book = await Book.create(req.body)

    return res.status(201).send({book})
});

app.get("/books", async (req,res)=>{
    const book = await Book.find().populate("sectionId").lean().exec()
    res.status(200).send({book})
});


app.get("/books/:id", async(req, res)=>{
    const book = await Book.findById(req.params.id).lean().exec();
    res.status(200).send({book})
});



//CRUD API for Authors


app.post("/authors", async (req, res)=>{
    const author = await Author.create(req.body)

    return res.status(201).send({author})
});

app.get("/authors", async (req,res)=>{
    const author = await Author.find().lean().exec();
    res.status(200).send({author})
});


//CRUD API for bookAuthor

app.post("/bookauthors", async(req,res)=>{
    const bookauthor = await BookAuthor.create(req.body);
    return res.status(201).send({bookauthor})
})
app.get("/bookauthors", async (req,res)=>{
    const bookauthor = await BookAuthor.find().populate("authorId").populate("bookId").lean().exec();
    res.status(200).send({bookauthor})
});



// All books written by an Author

app.get("/bookauthors/:id", async(req, res)=>{
    const bookauthors = await BookAuthor.find({authorId:req.params.id}).lean().populate("bookId").exec();
    res.send(bookauthors)
})

// searching books in a section

app.get("/books/:id", async(req,res)=>{
    const books = await Book.find({sectionId:req.params.id}).lean().populate("sectionId").exec();
    res.send(books)
})



app.listen(4100,async()=>{
try {

await connectDB()

} catch (error) {
    console.log(error)
}
console.log("listening on port 4100")

})