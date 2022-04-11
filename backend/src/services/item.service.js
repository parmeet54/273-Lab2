const ItemModel = require('../models/item.model');

// Get All Item
exports.getAllItems = async (result) => {
    try{
        const items = await ItemModel.find();
        result(null, items);
    }
    catch(err){
        result(err);
    }
}


// Create Item
exports.createItem = async (itemReqData, result) => {

    const item_ID = itemReqData.shop_ID;
    const name = itemReqData.name;
    const shop = itemReqData.shop;
    const shopname = itemReqData.shopname;
    const category = itemReqData.category;
    const description = itemReqData.description;
    const image = itemReqData.image;
    const price = itemReqData.price;
    const quantity = itemReqData.quantity;
    const fav = itemReqData.fav;

    try{
        
        await ItemModel.create({item_ID,name, shop, shopname, category, description, price, quantity, fav, image});

        result(null, {status: true, message:'Item Created'});
    }
    catch(err){
        result(null, {status:false, message:"Item exists"},err);
    }
}



// Get Item By Item_ID
exports.getItemByID = async (item_ID, result) => {
    try{
        const item = await ItemModel.findOne({item_ID:item_ID});

        result(null, item);
    }
    catch(err){
        result(null, err);
    }
}


// Get Item By Shop
exports.getItemByShopID = async (shop, result) => {
    try{
        const item = await ItemModel.findOne({shop:shop});

        result(null, item);

    }
    catch(err){
        result(null, err);
    }
}


// Get Item By Name (Search)
exports.getItemByName = async (name, result) => {
    try{
        const item = await ItemModel.findOne({name:name});

        result(null, item);

    }
    catch(err){
        result(null, err);
    }
}


// Update Item
exports.updateItem = async (item_ID, itemReqData, result) => {
    try{
        const updatedItem = await ItemModel.findOneAndUpdate({item_ID}, 
            {
                $set:{
                    name:itemReqData.name,
                    image: itemReqData.image,
                    category:itemReqData.category,
                    description: itemReqData.description,
                    price: itemReqData.price,
                    quantity:itemReqData.quantity,
                    fav:itemReqData.fav
                }
            },
            {returnOriginal:false});

        result(null, updatedItem);
    }
    catch(err){
        result(null, err);
    }
}


// Update Item Quantity
exports.updateItemQuantity = async (item_ID, itemReqData, result) => {
    try{
        await ItemModel.findOneAndUpdate({item_ID}, 
            {
                $set:{
                    quantity:itemReqData.quantity
                }
            },
            {returnOriginal:false});

        result(null, {status: true, message:"Item Quantity updated"});    
    }
    catch(err){
        result(null, err);
    }
}


// Update Item Fav
exports.updateItemFav = async (item_ID, itemReqData, result) => {
    try{
        await ItemModel.findOneAndUpdate({item_ID}, 
            {
                $set:{
                    fav:itemReqData.fav
                }
            },
            {returnOriginal:false});

        result(null, {status: true, message:"Item Fav updated"});
    }
    catch(err){
        result(null, err);
    }
}


// Delete Item
exports.updateItemFav = async (item_ID, result) => {
    try{
        await ItemModel.deleteOne({item_ID});
         
        result(null, {status: true, message:'Item Deleted'});
    }

    catch(err){
        result(null, {status:false, message:"Item does not exists"},err);
    }
}