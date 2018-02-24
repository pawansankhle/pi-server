const mqtt = require("mqtt");

var appConfig = require("./config");
var config = appConfig.config;
var clientIds = appConfig.client_ids;


var light_action = require('./light');
const TOPICS = ['light'];

const client = mqtt.connect(config.broker_url,{
    port : config.broker_port,
    username: config.broker_username,
    password: config.broker_password
});


client.on('connect', function () {
    console.log("client connected...");
    client.subscribe('home/#')
});


client.on('message', function (topic, message) {
    var myTopic = get_topic(topic);
    var clientId = get_client_id(topic);
    perform_action(myTopic, clientId, message)
});


function perform_action(topic, clientId, msg){
    switch(topic){
        case TOPICS[0]:
            perform_light_action(clientId,msg);
    }
  }

  
  function perform_light_action(clientId, msg){
      switch(clientId){
        case clientIds.my_room:
            light_action.on_off_myroom_light(msg);
    }
  }

  
  function get_topic(topic) {
      if(undefined !== topic)
        return topic.split("/")[1];
    
  }

  function get_client_id(topic) {
      if(undefined !== topic)
        return topic.split("/")[2];
  }