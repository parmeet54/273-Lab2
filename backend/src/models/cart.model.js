const db = require('../../config/db.config');


var Cart = function(cart){
    this.cart_item_ID = cart.cart_item_ID;
    this.image = cart.image;
    this.name = cart.name;
    this.shop = cart.shop;
    this.quantity = cart.quantity;
    this.stock = cart.stock;
    this.price = cart.price;
    this.username = cart.username;
}

// Get all Cart Items

Cart.getAllItems = (result) =>{
    db.query('SELECT * FROM cart', (err,res) =>{
        if(err){
            console.log("Error while getting cart items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create Cart Item
Cart.createItem = (cartReqData, result) => {

    db.query('INSERT INTO cart SET ?', cartReqData, (err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"cart item exists"},err);
        }
        else{
            result(null, {status: true, message:'Cart item Created'});
        }
    })
}

// Get Cart Item by cart_item_ID
Cart.getItemByID = (cart_item_ID, result) => {

    db.query('SELECT * FROM cart WHERE cart_item_ID = ?', cart_item_ID , (err,res) => {
        if(err){
            console.log("Error while fetching cart item data", err);
            result(null, err);
        }
        else{
            console.log("Cart Item Fetched");
            result(null , res);
        }
    })
}


// Get Cart Item by username
Cart.getItemByUsername = (username, result) => {

    db.query('SELECT * FROM cart WHERE username = ?', username , (err,res) => {
        if(err){
            console.log("Error while fetching cart data", err);
            result(null, err);
        }
        else{
            console.log("Cart Items Fetched");
            result(null , res);
        }
    })
}


// Delete Item
Cart.deleteItem = (username, result) => {

    db.query("DELETE FROM cart WHERE username = ?", username, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Items Cleared"});
        }
    })
}



module.exports = Cart;