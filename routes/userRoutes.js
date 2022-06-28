//to set up the express router

const express = require('express');
const router = express.Router(); // to create a new instance on the router object in express

//importing the users controller into the users Route
const usersController = require('../controllers/userControllers')

const {ValidateToken} = require('../middleswares/Authmiddleware')





router.post('/', usersController.registration )  //this route handle registration
router.post('/login',  usersController.login )  //this route handle login
router.get('/auth', ValidateToken, usersController.auth )  //this route handle auth 
router.put('/edit', ValidateToken, usersController.EditProfile )  //this route handle edit profile
router.put('/changepassword', ValidateToken, usersController.ChangePassword )  //this route handle change password
router.post('/resetlink', usersController.resetLink )  //this route handle sending reset password link
router.get('/verify-resetlink/:id/:token', usersController.verifyLink )  //this route handle reset password link verification
router.put('/reset-password', usersController.resetPassword )  //this route handle reset password








module.exports = router;