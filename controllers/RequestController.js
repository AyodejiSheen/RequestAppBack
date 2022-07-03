const { Requests } = require('../models') //to have an instance of the users table
const bcrypt = require('bcryptjs') // a library to hash passwords

//importing JWT library
const { sign } = require('jsonwebtoken');

//to send emails to reset password
const nodemailer = require('nodemailer');





const CreateRequest = async (req, res) => {
    let data = req.body;
    await Requests.create(data);
    res.json(res.statusCode)
}


//to get all the requests to dashboard
const getAllRequests = async (req, res) => {
    let allRequests = await Requests.findAll();
    res.json(allRequests)
}




module.exports ={
    CreateRequest,
    getAllRequests
};


