//to create the users table
module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {

        //the columns in the table and their properties
        firstname: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        phone: {
            type: DataTypes.BIGINT(11),
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        password: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        about: {
            type: DataTypes.STRING,
            allowNullL: true,
        }

    });


    //Linking the user table to the post table (Association)
    Users.associate = (models) => {
        Users.hasMany(models.Requests, {   //i.e (userId will be in the request table) a user will have many requests 
            //adding properties
            onDelete: "cascade" //i.e on delete of a user all the request under it will also be deleted
        });

        //to link the users table to the notifications table (when accepting a partiular request)
        Users.hasMany(models.Notifications, {   //i.e (UserId will be in the notification table through asociation) a user can have  many notification
            //adding properties
            onDelete: "cascade" //i.e on delete of a post all the comments under it will also be deleted
        });
    }



    return Users;
}