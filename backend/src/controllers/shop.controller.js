// Kafka
var kafka = require('../../kafka/client');

// Get All Shops
// TOPIC: get_all_shops
exports.getAllShops = (req,res) => {
    console.log("\nGET ALL SHOPS");

    kafka.make_request('get_all_shops', "params" , "body" ,(err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create a Shop
// TOPIC: create_shop
exports.createShop = (req,res) => {
    console.log("\nInside SHOP Controller: CREATE SHOP");

    const shopData = req.body;
    kafka.make_request('create_shop', "params", shopData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside SHOP CONTROLLER: SHOP Created");
            res.send(result);
        }
        else res.send("SHOP Already exists");
        console.log(shopData);
    })
}



// Get SHOP by SHOP_ID
// TOPIC: get_shop_by_id
exports.getShopByID = (req, res) => {
    console.log("\nInside SHOP Controller: Get SHOP By ID");

    kafka.make_request('get_shop_by_id',req.params.shop_ID, "body" ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such Shop exists");
            res.send("No such Shop exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}



// Get SHOP by User
// TOPIC: get_shop_by_user
exports.getShopByUser = (req, res) => {
    console.log("Inside SHOP Controller: Get SHOP by USER");

    kafka.make_request('get_shop_by_user',req.params.username, "body" ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such Shop exists");
            res.send("No such Shop exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Update Shop
// TOPIC: update_shop
exports.updateShop = (req, res) => {
    console.log("Inside Shop Controller: Update Shop");

    const shopReqData = req.body;
    kafka.make_request('update_shop',req.params.shop_ID, shopReqData , (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            res.send(result)
        }
    })
}


// Update Shop Total Sales
// TOPIC: update_shop_sales
exports.updateShopSales = (req, res) => {

    const shopReqData = req.body;
    kafka.make_request('update_shop_sales',req.params.shop_ID, shopReqData, (err,result) => {
        if(err){
            console.log(err)
            res.send(err);
        }
        else{
            console.log( result)
            res.send(result)
        }

        
    })
}

// Update Shop Image
// TOPIC: update_shop_image
exports.updateShopImage = (req, res) => {

    console.log("Inside Shop Controller: Update Shop Image");
    const shopReqData = req.body;
    kafka.make_request('update_shop_image',req.params.shop_ID, shopReqData, (err,result) => {
        if(err){
            res.send(err);
        }
        if(result){
            console.log(result)
            res.send(result)
        }
        else{
            console.log(err)
            res.send(err);
        }
    })
}


