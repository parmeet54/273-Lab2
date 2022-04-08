const db = require('../../config/db.config');

var Shop = function(shop){
    this.shop_ID = shop.shop_ID;
    this.username = shop.username;
    this.total_sales = shop.total_sales;
    this.name = shop.name;
    this.image = shop.image;
}


Shop.getAllShops = (result) =>{
    db.query('SELECT * FROM shop', (err,res) =>{
        if(err){
            console.log("Error while getting shops: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create Shop
Shop.createShop = async (shopReqData, result) => {

    db.query('INSERT INTO shop SET ?', shopReqData, (err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Shop exists"},err);
        }
        else{
            result(null, {status: true, message:'Shop Created'});
        }
    })
}


// Get Shop by shop_ID
Shop.getShopByID = (shop_ID, result) => {

    db.query('SELECT * FROM shop WHERE shop_ID = ?', shop_ID , (err,res) => {
        if(err){
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else{
            console.log("Shop Fetched");
            result(null , res);
        }
    })
}


// Get Shop by Username
Shop.getShopByUser = (username, result) => {

    db.query('SELECT * FROM shop WHERE username = ?', username , (err,res) => {
        if(err){
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else{
            console.log("Shop Fetched");
            //console.log(result);
            result(null , res);
        }
    })

}


// Update Shop
Shop.updateShop = async(shop_ID, shopReqData, result) => {

    db.query('UPDATE shop SET name=?, total_sales=?, image=? WHERE shop_ID=?' , 
    [shopReqData.name, shopReqData.total_sales, shopReqData.image, shop_ID], 
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


// Update Shop Sales
Shop.updateShopSales = (shop_ID, shopReqData, result) => {
    db.query('UPDATE shop SET total_sales = ? WHERE shop_ID=?', 
    [shopReqData.total_sales,  shop_ID], 
    (err, res) => {
        if(err){
            console.log('Error while updating Shop total sales', err);
            result(null, err);
        }
        else{
            console.log("Shop total sales  updated successfully");
            result(null, {status: true, message:"Shop total sales udated"});
        }
    })
}


// UPDATE IMAGE
Shop.updateShopImage = async(shop_ID, shopReqData, result) => {

    db.query('UPDATE shop SET image = ? WHERE shop_ID=?', 
    [shopReqData.image,  shop_ID], 
    (err, res) => {
        if(err){
            console.log('Error while updating Shop image', err);
            result(null, err);
        }
        else{
            console.log("Shop image  updated successfully");
            result(null, {status: true, message:"Shop image udated"});
        }
    })
}

module.exports = Shop;