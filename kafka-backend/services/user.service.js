const UserModel = require('../models/user.model')


// Get All Users
exports.getAllUsers = async (params, body, result) => {
    try{
        const users = await UserModel.find();
        console.log(users)
        result(null, users);
    }
    catch(err){
        result(err);
    }

}

// Get User By Username
exports.getUserByUsername = async (username, body, result) => {
    try{
        const user = await UserModel.findOne({username:username});

        result(null, user);

    }
    catch(err){
        result(err);
    }
}


// Update User by Username
exports.updateProfile = async (username, userReqData, result) => {
    try{
        const updatedUser = await UserModel.findOneAndUpdate({username}, 
            {
                $set:{
                    name:userReqData.name,
                    about:userReqData.about,
                    city:userReqData.city,
                    dob:userReqData.dob,
                    address:userReqData.address,
                    country:userReqData.country,
                    phone_no:userReqData.phone_no,
                    image:userReqData.image
                }
            },
            {returnOriginal:false});

        result(null, updatedUser);
    }
    catch(err){
        result(err);
    }
}
