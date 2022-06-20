// creating the function for each of the users routes

const { Users } = require('../models') //to have an instance of the users table
const bcrypt = require('bcryptjs') // a library to hash passwords

//importing JWT library
const { sign } = require('jsonwebtoken');


//import middleware
// const { ValidateToken } = require('../middleswares/Authmiddleware');

//to verify JWT
const { verify } = require('jsonwebtoken');

//to send emails to reset password
const nodemailer = require('nodemailer');

















const registration = async (req, res) => {

    const user = req.body;
    const useremaildetails = await Users.findOne({ where: { email: user.email } });

    if (useremaildetails) {
        res.json({ error: "Email Address already exist" });
    } else {
        //to grap the password and hash it using bcrypt
        bcrypt.hash(user.password, 10).then((hash) => {
            Users.create({  //YOU DONT NEED TO AWAIT WHEN HASHING PASSWORD
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                phone: user.phone,
                gender:user.gender,
                password: hash
            });

        }).catch((err) => {
            res.json({ error: "Registrattion cannot be finished" });
        })


        res.json(res.statusCode)
    }

}













module.exports = {
    registration
}