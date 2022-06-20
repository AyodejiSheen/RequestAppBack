const express = require('express')
const cors = require('cors'); //to allow access from the frontend
const dotenv = require('dotenv');


dotenv.config({path: './config/config.env'});  //to have access to the enviroment variables




const PORT = process.env.PORT || 5000 //the port number specified in the env config




//settung up the express app
const app = express();




//importing the database models
const db = require('./models')



//to be able to read json format from post request
app.use(express.json());
app.use(cors()); //to allow access from the frontend






//importing the router
const usersRouter = require('./routes/userRoutes');












app.use('/user', usersRouter);









//to connect to database when app starts
db.sequelize.sync().then(() => {

    //to start listening to request at a port
    app.listen(PORT, () => {
    console.log("the server in running")
    })

})
.catch((err) => {
    console.log(err);
})



