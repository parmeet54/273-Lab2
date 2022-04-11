const UserService = require('../services/user.services')

// Get All Users
exports.getAllUsers = (req,res) => {
    console.log("\nGET ALL USERS");

    UserService.getAllUsers((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
            console.log(result);
        }
    })
}


// Get User by username
exports.getUserByUsername = (req, res) => {
    console.log("Inside Controller: Get Profile: ", req.params.username);

    UserService.getUserByUsername(req.params.username ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such User exists");
            res.send("No such user exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Update Profile
exports.updateProfile = (req, res) => {
    console.log("Inside User Controller: Update Profile: ", req.params.username);

    UserService.updateProfile(req.params.username, req.body , (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            console.log("\nUser Updated")
            res.send(result)
        }
    })
}