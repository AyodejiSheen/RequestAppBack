// creating the function for each of the users routes

const { Users } = require('../models') //to have an instance of the users table
const { Requests } = require('../models') //to have an instance of the request table

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
                about: user.about
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
            res.json({ error: "Invalid Credentials" });
        } else {
            const user = await Users.findOne({ where: { id: finduser.id }, attributes: { exclude: ["password"] } });
            //to generate Token
            const accessToken = sign({ user }, "secret", { expiresIn: '30m' });
            res.json({ token: accessToken, user }); //then you send the JWT token to the frontend as response when detail is verify
        }

    }
}


const auth = async (req, res) => {
    res.json(req.user.user);
}





const EditProfile = async (req, res) => {
    let data = req.body;
   let edit = await Users.update({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        about: data.about
    }, { where: { id: data.id } });

    let editReq = await Requests.update({ email:data.email}, {where:{UserId : data.id}})

    //to set a new JWT with the new information updated.
    const user = await Users.findOne({ where: { id: data.id }, attributes: { exclude: ["password"] } });
    //to generate Token
    const accessToken = sign({ user }, "secret", { expiresIn: '30m' });
    res.json({ token: accessToken, user }); //then you send the JWT token to the frontend as response when detail is verify
}




const ChangePassword = async (req, res) => {
    const data = req.body;
    const user = await Users.findByPk(req.user.user.id);
    bcrypt.compare(data.oldPassword, user.password).then((match) => {
        if (!match) {
            res.json({ error: "Wrong old password" });  //if the password is wrong compare to the user password.... it will continue automatically if its matched
        } else {
            //to grap the new password and hash it using bcrypt
            bcrypt.hash(data.NewPassword, 10).then((hash) => {
                Users.update({ password: hash }, { where: { id: req.user.user.id } })          //{} what you want to update,,,, {} where you want to update it      
                res.json(res.statusCode)// to send the status code of the operation
            });
        }
    })
}




const resetLink = async (req, res) => {
    let {data}  = req.body;
    let finduser = await Users.findOne({ where: { email: data } });
    if (finduser) {
        const payload = {
            email: finduser.email,
            id: finduser.id
        }
        const token = sign(payload, "main secret", { expiresIn: '10m' });
        const link = `https://requestapp.netlify.app/reset-password/${finduser.id}/${token}`;
        // const link = `http://localhost:3000/reset-password/${finduser.id}/${token}`;

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
            to: payload.email,
            subject: 'Reset Password',
            text: 'Completed resetting your password with this link ' + link + '. This link expires in 10mins'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({error: "server error"})
            } else {
                console.log('Email sent: ' + info.response);
                res.json("Check your email for the link to reset your password")
            }
        });
        //email sending ends

    } else {
        res.json({error: "User not found"})
    }

}



//to verify reset Password link
const verifyLink = async (req, res) => {
    const { id, token } = req.params;
    let userId = await Users.findOne({ where: { id: id } })
    if (userId) {
        try {
            const validToken = sign(token, "main secret");
            if(validToken){
                res.json({ verify: true });  //if token is valid else send error.message
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    } else {
        res.json({ error: "Invalid user" })
    }
}

//to reset password
const resetPassword = async (req, res) => {
    const { newPassword, id } = req.body;
    //to update the newpassword entered, 
    bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { id: id } })  
        res.json(res.statusCode)// to send the status code of the operation
    });
}


//to view profile
const viewProfile = async (req, res) => {
    let {id} = req.params;
    const user = await Users.findOne({where: {id : id}, attributes:{exclude:["password"]}})
    res.json(user)
}








module.exports = {
    registration,
    login,
    auth,
    EditProfile,
    ChangePassword,
    resetLink,
    verifyLink,
    resetPassword,
    viewProfile
}