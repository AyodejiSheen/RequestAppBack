const { Notifications } = require('../models') //to have an instance of the request table
const { Requests } = require('../models') //to have an instance of the request table
const { Users } = require('../models') //to have an instance of the request table



// sending mesg to the person that post the msg
const sendNotifyPoster = async (req, res) => {
    let userid = req.body.userid;
    let reqid = req.body.requestid;

    let user = await Users.findByPk(userid);
    let request = await Requests.findByPk(reqid)

    await Notifications.create({
        noteMsg: user.firstname + " " + user.lastname + " has accepted your request. You can call or email on " + user.phone + " or " +  user.email + ".",
        UserId : request.UserId,
        RequestId : reqid
    })

    res.json(res.statusCode)
}


// sending mesg to the person that post the msg
const sendNotifyAccepter = async (req, res) => {
    let userid = req.body.userid;
    let reqid = req.body.requestid;

    let request = await Requests.findByPk(reqid)
    let user = await Users.findByPk(request.UserId);

    await Notifications.create({
        noteMsg: "You have accepted a request from " + user.firstname + " " + user.lastname + " You can call or email on " + user.phone + " or " + user.email + ".",
        UserId : userid,
        RequestId : reqid
    })

    res.json(res.statusCode)
}



const fetchNotify = async (req, res) => {
    console.log(req.body)

    res.json(res.statusCode)
}








module.exports = {
    sendNotifyPoster,
    sendNotifyAccepter,
    fetchNotify
}