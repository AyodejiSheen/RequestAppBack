const { Requests } = require('../models') //to have an instance of the request table
const bcrypt = require('bcryptjs') // a library to hash passwords

//importing JWT library
const { sign } = require('jsonwebtoken');

//to send emails to reset password
const nodemailer = require('nodemailer');
const notifications = require('../models/notifications');





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
    let request = await Requests.findByPk(id)
    if (!request) {
        res.json({ error: "Invalid Request Id" })
    } else {
        res.json(request)
    }
}


const acceptReq = async (req, res) => {
    let userid = req.body.userid;
    let reqid = req.body.requestid;
    let accept = await Requests.update({ status: "Approved", acceptId: userid }, { where: { id: reqid} });
    if (!accept) {
        res.json({ error: "Try Again" })
    } else {
        res.json(res.statusCode)
    }
}


const accpetedRed = async (req, res) => {
    let userId = req.params.Id;
    let request = await Requests.findAll({ where: { acceptId: userId } });
    if (!request) {
        res.json({ error: "Invalid Id" })
    } else {
        res.json(request)
    }

}


const personalReq = async (req, res) => {
    let userId = req.params.Id;
    let request = await Requests.findAll({ where: { UserId: userId } });
    if (!request) {
        res.json({ error: "Invalid Id" })
    } else {
        res.json(request)
    }

}



const editRequest = async (req, res) => {
    let data = req.body;
    let reqId = req.params.id;
    let edit = await Requests.update({
        requestTitle: data.requestTitle,
        itemName: data.itemName,
        itemDesc: data.itemDesc,
        quantity: data.quantity,
        itemLoc: data.itemLoc,
        requestBody: data.requestBody,
    }, { where: { id: reqId } })
    if (!edit) {
        res.json({ error: "Request cannot be complete" })
    } else {
        res.json(res.statusCode)
    }
}


const deleteReq = async (req, res) => {
    let id = req.params.id;
    let del = await Requests.destroy({where:{id:id}})

    if(!del){
        res.json({error : "The request cannot be delete"})
    }else{
        res.json(res.statusCode)
    }
}





module.exports = {
    CreateRequest,
    getAllRequests,
    viewRequest,
    acceptReq,
    accpetedRed,
    personalReq,
    editRequest,
    deleteReq
};


