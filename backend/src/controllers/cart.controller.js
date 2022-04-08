const cartModel = require('../models/cart.model');


// Get All Items
exports.getAllItems = (req,res) => {
    console.log("\nGET ALL CART ITEMS");

    cartModel.getAllItems((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create an Item
exports.createItem = (req,res) => {
    console.log("\nCREATE CART ITEM");

    const cartData = new cartModel(req.body);
    cartModel.createItem(cartData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside CART CONTROLLER: CART ITEM Created");
            res.send(result);
        }
        else res.send("ITEM Already exists");
        console.log(cartData);
    })
}



// Get ITEM by ITEM_ID
exports.getItemByID = (req, res) => {
    console.log("Inside CART Controller: Get CART ITEM");

    cartModel.getItemByID(req.params.cart_item_ID ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.send("No such Item exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Get ITEM by Username
exports.getItemByUsername = (req, res) => {
    console.log("Inside CART Controller: Get CART ITEM");

    cartModel.getItemByUsername(req.params.username  ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.send("No such Item exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// delete Items by username
exports.deleteItem = (req, res) => {
    cartModel.deleteItem(req.params.username, (err, user) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Cart items cleared"});
    });
}


