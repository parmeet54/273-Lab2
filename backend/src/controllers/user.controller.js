// Kafka
var kafka = require('../../kafka/client');

// Get All Users
// TOPIC: get_all_users
exports.getAllUsers = (req,res) => {
    console.log("\nGET ALL USERS");

    kafka.make_request('get_all_users', "params" , "body", (err, result) => {
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
// TOPIC: get_user
exports.getUserByUsername = (req, res) => {
    console.log("Inside Controller: Get Profile: ", req.params.username);

    kafka.make_request('get_user', req.params.username, "body" ,(err, result) => {
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
// TOPIC: update_user
exports.updateProfile = (req, res) => {
    console.log("Inside User Controller: Update Profile: ", req.params.username);

    kafka.make_request('update_user',req.params.username, req.body , (err, result) => {
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