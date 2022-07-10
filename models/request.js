//to create the users table
module.exports = (sequelize, DataTypes) => {

    const Requests = sequelize.define("Requests", {


        //the columns in the table and their properties
        requestTitle: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        itemName: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        itemDesc: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        itemLoc: {
            type: DataTypes.STRING,
            allowNull: false, //it cannot be empty to know the username of the person making the post
        },

        requestBody: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        firstname: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        lastname: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNullL: false,
        },

        acceptId: {
            type:DataTypes.STRING,
        }

        
        
    });


    //to link the request tabel to notification table
    Requests.associate = (models) => {
        Requests.hasMany(models.Notifications, {
            onDelete:"cascade"
        })
    }




    return Requests;
}
  
