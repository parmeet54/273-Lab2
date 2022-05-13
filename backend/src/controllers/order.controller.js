const OrderService = require('../services/order.service');


// Create an Order
exports.createOrder = (req,res) => {
    console.log("\nCREATE ORDER");

    const orderData = req.body;
    OrderService.createOrder(orderData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside Order CONTROLLER: ORDER Created");
            res.send(result);
        }
        else res.send("Order Already exists");
        console.log(orderData);
    })
}


// Get All Order Items
exports.getAllOrders = (req,res) => {
    console.log("\nGET ALL ORDER");

    OrderService.getAllOrders((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Get ORDER ITEMS by Username
exports.getOrdersByUsername = (req, res) => {
    console.log("Inside ORDER Controller: Get ORDER");

    OrderService.getOrdersByUsername(req.params.username  ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Orders exists");
            res.send("No Orders exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}
