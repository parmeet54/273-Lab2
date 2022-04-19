const ShopModel = require('../models/shop.model');

// Get All Shops
exports.getAllShops = async (params, body, result) => {
    try{
        const shops = await ShopModel.find();
        result(null, shops);
    }
    catch(err){
        result(err);
    }
}


// Create Shop
exports.createShop = async (params, shopReqData, result) => {

    const shop_ID = shopReqData.shop_ID;
    const name = shopReqData.name;
    const username = shopReqData.username;
    const image = shopReqData.image;

    try{
        
        await ShopModel.create({shop_ID,name, username, image});

        result(null, {status: true, message:'Shop Created'});
    }
    catch(err){
        result(null, {status:false, message:"Shop exists"},err);
    }
}



// Get Shop By Shop_ID
exports.getShopByID = async (shop_ID, body, result) => {
    try{
        const shop = await ShopModel.findOne({shop_ID:shop_ID});

        result(null, shop);

    }
    catch(err){
        result(null, err);
    }
}


// Get Shop By username
exports.getShopByUser = async (username, body, result) => {
    try{
        const shop = await ShopModel.findOne({username:username});

        result(null, shop);

    }
    catch(err){
        result(null, err);
    }
}


// Update Shop
exports.updateShop = async (shop_ID, shopReqData, result) => {
    try{
        const updatedShop = await ShopModel.findOneAndUpdate({shop_ID}, 
            {
                $set:{
                    name:shopReqData.name,
                    total_sales:shopReqData.total_sales
                }
            },
            {returnOriginal:false});

        result(null, updatedShop);
    }
    catch(err){
        result(null, err);
    }
}


// Update Shop Sales
exports.updateShopSales = async (shop_ID, shopReqData, result) => {
    try{
        await ShopModel.findOneAndUpdate({shop_ID}, 
            {
                $set:{
                    total_sales:shopReqData.total_sales
                }
            },
            {returnOriginal:false});

        result(null, {status: true, message:"Shop total sales updated"});    
    }
    catch(err){
        result(null, err);
    }
}


// Update Shop Image
exports.updateShopImage = async (shop_ID, shopReqData, result) => {
    try{
        await ShopModel.findOneAndUpdate({shop_ID}, 
            {
                $set:{
                    image:shopReqData.image
                }
            },
            {returnOriginal:false});

        result(null, {status: true, message:"Shop image updated"});
    }
    catch(err){
        result(null, err);
    }
}