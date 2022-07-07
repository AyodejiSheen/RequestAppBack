//to create the users table
module.exports = (sequelize, DataTypes) => {

    const Notifications = sequelize.define("Notifications", {


        //the columns in the table and their properties
        noteMsg: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        firstname: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        lastname: {
            type: DataTypes.STRING,
            allowNullL: false,
        },


    });




    return Notifications;
}