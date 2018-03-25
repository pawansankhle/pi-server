const mqtt = require("mqtt");

var appConfig = require("./config");
var config = appConfig.config;
var clientIds = appConfig.client_ids;


var light_action = require('./src/light');
var control = require('./src/control');
const TOPICS = ['light','control'];

const client = mqtt.connect(config.broker_url,{
    port : config.broker_port,
    username: config.broker_username,
    password: config.broker_password
});

client.on('connect', function () {
    console.log("client connected...");
    client.subscribe('device/#');
    client.subscribe('home/#');
    
});


client.on('message', function (topic, message) {
    console.log('message recived..', topic);
    var myTopic = get_topic(topic);
    var clientId = get_client_id(topic);
    console.log(message.toString());
    perform_action(myTopic, clientId, message.toString())
});


function perform_action(topic, clientId, msg){
    switch(topic){
        case TOPICS[0]:
            perform_light_action(clientId,msg);
            break;
        case TOPICS[1]:
            control_device(clientId,msg);
            break;
    }
}

function control_device(clientId, msg) {
    switch(clientId){
        case clientIds.my_room:
            control.on_off(msg);
            break;
    }
}

function perform_light_action(clientId, msg){
      switch(clientId){
        case clientIds.my_room:
            light_action.on_off_myroom_light(msg);
            break;
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