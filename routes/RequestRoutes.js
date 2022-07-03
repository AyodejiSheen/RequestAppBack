const express = require('express');
const router = express.Router(); // to create a new instance on the router object in express

//importing the users controller into the users Route
const RequestController = require('../controllers/RequestController')

const {ValidateToken} = require('../middleswares/Authmiddleware')



router.post('/', ValidateToken, RequestController.CreateRequest)
router.get('/', RequestController.getAllRequests)





module.exports = router;