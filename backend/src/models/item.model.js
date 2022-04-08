const db = require('../../config/db.config');

var Item = function(item){
    this.item_ID = item.item_ID;
    this.shop = item.shop;
    this.name = item.name;
    this.category = item.category;
    this.description = item.description;
    this.price = item.price;
    this.quantity = item.quantity;
    this.fav = item.fav;
    this.image = item.image;
    this.shopname = item.shopname;
}


Item.getAllItems = (result) =>{
    db.query('SELECT * FROM item', (err,res) =>{
        if(err){
            console.log("Error while getting items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create Item
Item.createItem = async (itemReqData, result) => {

    db.query('INSERT INTO item SET ?', itemReqData, (err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Item exists"},err);
        }
        else{
            result(null, {status: true, message:'Item Created'});
        }
    })
}


// Get Item by item_ID
Item.getItemByID = (item_ID, result) => {

    db.query('SELECT * FROM item WHERE item_ID = ?', item_ID , (err,res) => {
        if(err){
            console.log("Error while fetching Item data", err);
            result(null, err);
        }
        else{
            console.log("Item Fetched");
            result(null , res);
        }
    })
}




// Get Item by shop_ID
Item.getItemByShopID = (shop, result) => {

    db.query('SELECT * FROM item WHERE shop = ?', shop , (err,res) => {
        if(err){
            console.log("Error while fetching Item data", err);
            result(null, err);
        }
        else{
            console.log("Item Fetched");
            result(null , res);
        }
    })
}


// Get Item by NAME
Item.getItemByName = (name, result) => {

    db.query('SELECT * FROM item WHERE INSTR(name , ?) > 0', name , (err,res) => {
        if(err){
            console.log("Error while fetching Item data", err);
            result(null, err);
        }
        else{
            console.log("Item Fetched");
            result(null , res);
        }
    })
}


// Update Item
Item.updateItem = (item_ID, itemData, result) => {

    db.query('UPDATE item SET name=?, category=?, description=?, price=?, quantity=?, fav=?, image=? WHERE item_ID=?' , 
    [itemData.name, itemData.category, itemData.description, itemData.price, itemData.quantity, itemData.fav, itemData.image, item_ID], 
    (err, res) => {
        if(err){
            console.log(err);
            result(null ,err);
        }
        else{
            console.log("Shop updated");
            console.log(res);
            result(null , {message: "Shop Updated" , status: true});
        }
    })
}


// Update Item Quantity
Item.updateItemQuantity = (item_ID, itemData, result) => {
    db.query('UPDATE item SET quantity = ? WHERE item_ID=?', 
    [itemData.quantity,  item_ID], 
    (err, res) => {
        if(err){
            console.log('Error while updating Item quantity', err);
            result(null, err);
        }
        else{
            console.log("Item quantity  updated successfully");
            result(null, {status: true, message:"Item quantity udated"});
        }
    })
}

// Update Item Fav
Item.updateItemFav = (item_ID, itemData, result) => {
    db.query('UPDATE item SET fav = ? WHERE item_ID=?', 
    [itemData.fav,  item_ID], 
    (err, res) => {
        if(err){
            console.log('Error while Favoriting Item', err);
            result(null, err);
        }
        else{
            console.log("Item Favorite/Unfav successfully");
            result(null, {status: true, message:"Item Fav udated"});
        }
    })
}


// Delete Item
Item.deleteItem = (item_ID, result) => {

    db.query("DELETE FROM item WHERE item_ID = ?", item_ID, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Item Deleted"});
        }
    })
}


module.exports = Item;