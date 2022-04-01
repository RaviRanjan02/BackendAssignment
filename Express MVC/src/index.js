const express = require("express");


const app = express();

app.use(express.json());

const userController= require("./controllers/user.Controllers");
const batchController= require("./controllers/batch.Controllers");
const evaluationController= require("./controllers/eval.Controllers");
const studentController= require("./controllers/student.Controllers");
const submissionController= require("./controllers/submission.Controllers");

app.use("/user",userController);
app.use("/batch",batchController);
app.use("/evaluation",evaluationController);
app.use("/student",studentController);
app.use("/submission",submissionController);

module.exports = app;