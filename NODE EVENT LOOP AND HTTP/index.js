const express = require("express")

const app = express();


app.get("/", function (req, res){
    res.send("hello");
});

app.get("/books", function (req, res){
    res.send([{"id":1,"book_name":"Be your Own Sunshine","book_author":"James Allen"},
    {"id":2,"book_name":"Attitude is Everything","book_author":"Jeff Keller"},
    {"id":3,"book_name":"As a Man Thinketh","book_author":"James Allen"},
    {"id":4,"book_name":"Think and Grow Rich","book_author":"Napoleon Hill"},
    {"id":5,"book_name":"Think like a Monk","book_author":"Jay Shetty"}  ]);
});

app.listen(4500, () => {
console.log("listening at port 4500");
});
