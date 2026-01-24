//Import the libraries - express - mongoose - cors
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//create Express server
const app = express();
app.use(express.json());
app.use(cors());

//connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentinfo")
.then(() => console.log("MongoDb is Connected....."))
.catch(err => console.error(err))

//Create a model
const Person = mongoose.model("Person",{name:String, regno:Number, dept:String, dob:Date, age:Number,email:String, year:Number,phone:String, address:String, skills:String}, "person");

//Read all students
app.get("/",async(req, res) => {
    const people = await Person.find();
    res.json(people);
});

//Add new student
app.post("/",async(req,res) => {
    const newperson = await Person.create(req.body);
    res.json(newperson);
});

//Update student
app.put("/:id", async(req,res) => {
    const updated = await Person.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(updated);
});

//Delete student
app.delete("/:id",async(req,res) => {
    await Person.findByIdAndDelete(req.params.id);
    res.json({message:"Student Deleted"});
});

//Connection
app.listen(5000, () =>{
    console.log("Server is running on http://localhost:5000");
});