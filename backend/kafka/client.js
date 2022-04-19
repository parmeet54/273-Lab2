var rpc = new (require("./kafkarpc"))();

//make request to kafka
//updated function to send params as well
function make_request(queue_name, params, msg_payload, callback) {
  console.log("in make request");
  console.log(msg_payload);
  // updated function to send params as well
  rpc.makeRequest(queue_name, params, msg_payload, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
