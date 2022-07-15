const express = require('express')
const router = express.Router();

const noteController  = require('../controllers/noteController')

const {ValidateToken} = require('../middleswares/Authmiddleware')




router.post('/', ValidateToken, noteController.sendNotifyPoster); // to send notification to the pesron that upload the request
router.post('/accepter', ValidateToken, noteController.sendNotifyAccepter); // to send notification to the pesron that accept the request
router.get('/', ValidateToken, noteController.fetchNotify); // to send notification to the pesron that upload the request




module.exports = router;