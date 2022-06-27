
const express = require('express')
const app = express();  //an instance of express.
const cors = require('cors'); //to allow access from the frontend

require("dotenv").config(); // to switch to web hosting port or localhost port



//to be able to read json format from post request
app.use(express.json());

let corsOptions = {
    origin:['https://requestapp.netlify.app', 'http://localhost:3000'],
    optionSuccessStatus:200,
};

app.use(cors(corsOptions)); //to allow access from the frontend


//importing the database models
const db = require('./models')



//importing the routers
const usersRouter = require('./routes/userRoutes');









//creating the  routers middleware
app.use('/user', usersRouter);





//to connect to database when app starts
db.sequelize.sync().then(() => {

    //to start listening to request at a port
    app.listen(process.env.PORT || 5000, () => {
    console.log("the server ")
    })

})
.catch((err) => {
    console.log(err);
})



