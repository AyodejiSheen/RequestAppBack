const { Requests } = require('../models') //to have an instance of the request table
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


//to get each requests
const viewRequest = async (req, res) => {
    let id = req.params.requestId;
    let request = await Requests.findByPk(id);
    res.json(request);
}




module.exports ={
    CreateRequest,
    getAllRequests,
    viewRequest
};


