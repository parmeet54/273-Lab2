const itemModel = require('../models/item.model');

// Get All Items
exports.getAllItems = (req,res) => {
    console.log("\nGET ALL ITEMS");

    itemModel.getAllItems((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create a Item
exports.createItem = (req,res) => {
    console.log("\nCREATE ITEM");

    const itemData = new itemModel(req.body);
    itemModel.createItem(itemData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside ITEM CONTROLLER: ITEM Created");
            res.send(result);
        }
        else res.send("ITEM Already exists");
        //console.log(itemData);
    })
}



// Get ITEM by ITEM_ID
exports.getItemByID = (req, res) => {
    console.log("Inside ITEM Controller: Get ITEM");

    itemModel.getItemByID(req.params.item_ID ,(err, result) => {
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


// Get ITEM by SHOP_ID
exports.getItemByShopID = (req, res) => {
    console.log("Inside ITEM Controller: Get ITEM by SHOP");

    itemModel.getItemByShopID(req.params.shop ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.send("");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Get ITEM by NAME
exports.getItemByName = (req, res) => {
    console.log("Inside ITEM Controller: Get ITEM by NAME");

    itemModel.getItemByName(req.params.name ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.send("");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}




// Update ITEM
exports.updateItem = (req, res) => {
    console.log("Inside Item Controller: Update Item");

    const itemData = new itemModel(req.body);
    itemModel.updateItem(req.params.item_ID, itemData , (err, result) => {
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



// Update Item Quantity
exports.updateItemQuantity = (req, res) => {

    const itemData= new itemModel(req.body);
    itemModel.updateItemQuantity(req.params.item_ID, itemData, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// Favorite/Unfav Item
exports.updateItemFav = (req, res) => {

    const itemData= new itemModel(req.body);
    itemModel.updateItemFav(req.params.item_ID, itemData, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// delete Item by ID
exports.deleteItem = (req, res) => {
    itemModel.deleteItem(req.params.item_ID, (err, user) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Items Deleted"});
    });
}




