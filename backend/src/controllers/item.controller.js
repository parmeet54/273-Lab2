// Kafka
var kafka = require('../../kafka/client');

// Get All Items
// TOPIC: get_all_items
exports.getAllItems = (req,res) => {
    console.log("\nGET ALL ITEMS");

        kafka.make_request('get_all_items', "params" , "body" ,(err, result) => {
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
// TOPIC: create_item
exports.createItem = (req,res) => {
    console.log("\nCREATE ITEM");

    const itemData = req.body;
    kafka.make_request('create_item', "params" ,itemData,(err, result) => {

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
// TOPIC: get_item_by_id
exports.getItemByID = (req, res) => {
    console.log("Inside ITEM Controller: Get ITEM");

    kafka.make_request('get_item_by_id', req.params.item_ID , "body",(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
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
// TOPIC: get_item_by_shopid
exports.getItemByShopID = (req, res) => {
    console.log("Inside ITEM Controller: Get ITEM by SHOP");

    kafka.make_request('get_item_by_shopid', req.params.shop , "body",(err, result) => {
        if(err){
            console.log(err);
            res.status(200).send(err);
        }
        if(result.length == 0)
        {
            console.log("No Item exists in this Shop");
            res.status(404).send("No Item exists in this Shop");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Get ITEM by NAME
// TOPIC: get_item_by_name
exports.getItemByName = (req, res) => {
    console.log("Inside ITEM Controller: Get ITEM by NAME");

    kafka.make_request('get_item_by_name', req.params.name, "body" ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.status(404).send("No such item Exists");
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
}




// Update ITEM
// TOPIC: update_item
exports.updateItem = (req, res) => {
    console.log("Inside Item Controller: Update Item");

    const itemData = req.body;
    kafka.make_request('update_item', req.params.item_ID, itemData , (err, result) => {
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
// TOPIC: update_item_quantity
exports.updateItemQuantity = (req, res) => {

    const itemData = req.body;
    kafka.make_request('update_item_quantity', req.params.item_ID, itemData, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// Favorite/Unfav Item
// TOPIC: update_item_fav
exports.updateItemFav = (req, res) => {

    const itemData = req.body;
    kafka.make_request('update_item_fav', req.params.item_ID, itemData, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// delete Item by ID
// TOPIC: delete_item
exports.deleteItem = (req, res) => {
    kafka.make_request('delete_item', req.params.item_ID, "body" , (err, result) =>{
        if(err)
        res.send(err);

        console.log(result)
        res.json({success: true, message: "Item Deleted"});
    });
}