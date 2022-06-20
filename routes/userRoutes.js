//to set up the express router

const express = require('express');
const router = express.Router(); // to create a new instance on the router object in express

//importing the users controller into the users Route
const usersController = require('../controllers/userControllers')

const {ValidateToken} = require('../middleswares/midtest')





router.post('/', ValidateToken, usersController.registration )  //this route handle registration
router.post('/login', ValidateToken, usersController.login )  //this route handle registration








module.exports = router;