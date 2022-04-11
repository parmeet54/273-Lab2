const ShopService = require('../services/shop.service');

// Get All Shops
exports.getAllShops = (req,res) => {
    console.log("\nGET ALL SHOPS");

    ShopService.getAllShops((err, result) => {
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
exports.createShop = (req,res) => {
    console.log("\nInside SHOP Controller: CREATE SHOP");

    const shopData = req.body;
    ShopService.createShop(shopData, (err, result) => {
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
exports.getShopByID = (req, res) => {
    console.log("\nInside SHOP Controller: Get SHOP By USER");

    ShopService.getShopByID(req.params.shop_ID ,(err, result) => {
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
exports.getShopByUser = (req, res) => {
    console.log("Inside SHOP Controller: Get SHOP by USER");

    ShopService.getShopByUser(req.params.username ,(err, result) => {
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
exports.updateShop = (req, res) => {
    console.log("Inside Shop Controller: Update Shop");

    const shopReqData = req.body;
    ShopService.updateShop(req.params.shop_ID, shopReqData , (err, result) => {
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
exports.updateShopSales = (req, res) => {

    const shopReqData = req.body;
    ShopService.updateShopSales(req.params.shop_ID, shopReqData, (err,result) => {
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
exports.updateShopImage = (req, res) => {

    console.log("Inside Shop Controller: Update Shop Image");
    const shopReqData = req.body;
    ShopService.updateShopImage(req.params.shop_ID, shopReqData, (err,result) => {
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


