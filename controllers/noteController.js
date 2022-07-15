const { Notifications } = require('../models') //to have an instance of the request table
const { Requests } = require('../models') //to have an instance of the request table
const { Users } = require('../models') //to have an instance of the request table

//to send emails to notify
const nodemailer = require('nodemailer');




// sending mesg to the person that post the msg
const sendNotifyPoster = async (req, res) => {
    let userid = req.body.userid;
    let reqid = req.body.requestid;

    let user = await Users.findByPk(userid);
    let request = await Requests.findByPk(reqid)

    let notify = await Notifications.create({
        noteMsg: user.firstname + " " + user.lastname + " has accepted your request. You can call or email on " + user.phone + " or " + user.email + ".",
        UserId: request.UserId,
        RequestId: reqid
    })


    if (!notify) {
        res.json({ error: "Invalid Request" })
    } else {

        //to send link to the user email address
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'johnoliver6p@gmail.com',
                pass: 'zvlorbrzoxyxvkzb'
            }
        });

        let mailOptions = {
            from: 'REQCO',
            to: request.email,
            subject: 'Request Accepted',
            text: user.firstname + " " + user.lastname + " has accepted your request. You can call or email on " + user.phone + " or " + user.email + "."
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ error: "server error" })
            } else {
                console.log('Email sent: ' + info.response);
                res.json(res.statusCode)
            }
        });

    }


}



// sending mesg to the person that post the msg
const sendNotifyAccepter = async (req, res) => {
    let userid = req.body.userid;
    let reqid = req.body.requestid;

    let request = await Requests.findByPk(reqid)
    let user = await Users.findByPk(request.UserId);

    let notify = await Notifications.create({
        noteMsg: "You have accepted a request from " + user.firstname + " " + user.lastname + " You can call or email on " + user.phone + " or " + user.email + ".",
        UserId: userid,
        RequestId: reqid
    })

    if(!notify){
        res.json({error:"Inavlid Request"})
        console.log("not doe")
    }else{
        res.json(res.statusCode)
        console.log("no doe")

    }
}





const fetchNotify = async (req, res) => {
    res.json(res.statusCode)
}








module.exports = {
    sendNotifyPoster,
    sendNotifyAccepter,
    fetchNotify
}