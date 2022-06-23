const express = require('express')
const app = express();  //an instance of express.
const cors = require('cors'); //to allow access from the frontend

//to be able to read json format from post request
app.use(express.json());


app.use(cors({
    origin:['https://requestappserver.herokuapp.com', 'http://localhost:5000']
})); //to allow access from the frontend



const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});  //to have access to the enviroment variables


const PORT = process.env.PORT || 5000 //the port number specified in the env config


//importing the database models
const db = require('./models')


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



