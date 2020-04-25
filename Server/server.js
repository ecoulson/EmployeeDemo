const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/employee", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to database");
    }
});

server.use('/', express.static(path.join(__dirname, '..', 'Client')))

const EmployeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    employmentDate: Date,
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

server.get("/employee", function (req, res) {
    EmployeeModel.find().then(function (employees) {
        res.json(employees);
    }); 
});

server.post("/employee", function (req, res) {
    const Employee = new EmployeeModel(req.body);
    Employee.save(function (error, document) {
        if (error) {
            return console.log(error);
        }
        return res.json({
            success: true
        });
    })
});

server.listen(8000, function () {
    console.log("Server is started on port 8000");
});