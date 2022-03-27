const express = require("express");
const connect = require("./configs/db.js");
const app = express();
app.use(express.json());

const userController = require("./controllers/user.controllers.js");
app.use("/users", userController)

const { register, login } = require("./controllers/auth.controllers.js");
app.post("/register", register);
app.post("/login", login)

const productController= require("./controllers/product.controllers.js");
app.use("/products",productController);




app.listen(4400, async () => {
    try {
        await connect();
        console.log("Listening on port 4400");
    } catch (err) {
        console.log(err.message);
    }

})