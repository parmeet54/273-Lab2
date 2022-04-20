var connection =  new require('./kafka/Connection');

// Mongo Setup
const mongoose = require('mongoose');
require("dotenv").config();

//topics files
// Services
const ItemService = require('./services/item.service')
const UserService = require('./services/user.service')
const OrderService = require('./services/order.service')
const ShopService = require('./services/shop.service')


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        console.log("PARAMS:", data.params)
        console.log("BODY:", data.data)


        fname(data.params, data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// connect to mongodb cluster
mongoose
  .connect(process.env.MONGO_CONNECTION_URI,  { maxPoolSize:500, useNewUrlParser: true })
  .then(() => {
      console.log("Mongo Connected Successfully");
  })
  .catch(err => {
    console.error("Failed to connect to mongo database: ", err);
  });


// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

// ITEM REQUESTS
handleTopicRequest("get_all_items", ItemService.getAllItems);                // Get all items
handleTopicRequest("create_item", ItemService.createItem);                   // create item
handleTopicRequest("get_item_by_id", ItemService.getItemByID);               // get item by id
handleTopicRequest("get_item_by_shopid", ItemService.getItemByShopID);       // get item by shop id
handleTopicRequest("get_item_by_name", ItemService.getItemByName);           // get item by name
handleTopicRequest("update_item", ItemService.updateItem);                   // update item
handleTopicRequest("update_item_quantity", ItemService.updateItemQuantity);  // update item quantity
handleTopicRequest("update_item_fav", ItemService.updateItemFav);            // update item fav
handleTopicRequest("delete_item", ItemService.deleteItem);                   // delete item


// USER REQUESTS
handleTopicRequest("get_all_users", UserService.getAllUsers);                // Get all users
handleTopicRequest("get_user", UserService.getUserByUsername);               // Get user
handleTopicRequest("update_user", UserService.updateProfile);                // Update user profile



// ORDER REQUESTS
handleTopicRequest("create_order", OrderService.createOrder);                // Create Order
handleTopicRequest("get_all_orders", OrderService.getAllOrders);             // Get All orders
handleTopicRequest("get_orders_by_user", OrderService.getOrdersByUsername);  // Get user orders



// SHOP REQUESTS
handleTopicRequest("get_all_shops", ShopService.getAllShops);                // Get all Shops
handleTopicRequest("create_shop", ShopService.createShop);                   // create shop
handleTopicRequest("get_shop_by_id", ShopService.getShopByID);               // get shop by id
handleTopicRequest("get_shop_by_user", ShopService.getShopByUser);           // get shop by user
handleTopicRequest("update_shop", ShopService.updateShop);                   // update shop
handleTopicRequest("update_shop_sales", ShopService.updateShopSales);        // update shop sales
handleTopicRequest("update_shop_image", ShopService.updateShopImage);        // update shop image