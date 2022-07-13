const express = require('express');
const router = express.Router(); // to create a new instance on the router object in express

//importing the users controller into the users Route
const RequestController = require('../controllers/RequestController')

const {ValidateToken} = require('../middleswares/Authmiddleware')



router.post('/', ValidateToken, RequestController.CreateRequest)
router.get('/', RequestController.getAllRequests)
router.get('/view/:requestId', ValidateToken, RequestController.viewRequest)
router.put('/accept-request', ValidateToken, RequestController.acceptReq)
router.get('/accepted-requests/:Id', ValidateToken, RequestController.accpetedRed)
router.get('/personal-requests/:Id', ValidateToken, RequestController.personalReq)
router.put('/edit-request/:id', ValidateToken, RequestController.editRequest)
router.delete('/delete/:id', ValidateToken, RequestController.deleteReq)


module.exports = router;