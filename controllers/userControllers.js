// creating the function for each of the users routes

const { Users } = require('../models') //to have an instance of the users table
const bcrypt = require('bcryptjs') // a library to hash passwords

//importing JWT library
const { sign } = require('jsonwebtoken');

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
                gender: user.gender,
                password: hash,
                about:user.about
            });

        }).catch((err) => {
            res.json({ error: "Registrattion cannot be finished" });
        })

        res.json(res.statusCode)
    }

}




const login = async (req, res) => {

    const loginDetails = req.body;
    const finduser = await Users.findOne({ where: { email: loginDetails.email } });

    if (!finduser) {
        res.json({ error: "User doesnt exist" });
    } else {

        let passcomp = await bcrypt.compare(loginDetails.password, finduser.password);

        if (!passcomp) {
            res.json({ error: "invalid Credentials" });
        } else {
            const user = await Users.findOne({ where: { id: finduser.id }, attributes: { exclude: ["password"] } });
            //to generate Token
            const accessToken = sign({ user }, "secret", { expiresIn: '30m' });
            res.json({ token: accessToken, user }); //then you send the JWT token to the frontend as response when detail is verify
        }

    }
}





const auth = async (req, res) => {
    res.json(req.user.user)
}



const EditProfile = async (req, res) => {
    let newdetails = req.body;

    await Users.update({
        firstname: newdetails.firstname,
        lastname:newdetails.lastname,
        email:newdetails.email,
        phone:newdetails.phone,
        about:newdetails.about
    }, { where: { id: newdetails.id } });

    res.json(res.statusCode);

}















module.exports = {
    registration,
    login,
    auth,
    EditProfile
}