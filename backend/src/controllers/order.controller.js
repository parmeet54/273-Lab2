// Kafka
var kafka = require('../../kafka/client');

// Create an Order
// TOPIC: create_order
exports.createOrder = (req,res) => {
    console.log("\nCREATE ORDER");

    const orderData = req.body;
    kafka.make_request('create_order', "params", orderData, (err, result) => {
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
// TOPIC: get_all_orders
exports.getAllOrders = (req,res) => {
    console.log("\nGET ALL ORDER");

    kafka.make_request('get_all_orders', "params" , "body", (err, result) => {
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
// TOPIC: get_orders_by_user
exports.getOrdersByUsername = (req, res) => {
    console.log("Inside ORDER Controller: Get ORDER");

    kafka.make_request('get_orders_by_user', req.params.username, "body"  ,(err, result) => {
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
