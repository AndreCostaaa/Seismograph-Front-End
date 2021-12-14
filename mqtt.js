let client = null;
const host = "ws://broker.hivemq.com:8000/mqtt";
const options = {
  keepalive: 60,
  clientId: "kAgQ!d" + Math.random().toString(16).substr(2, 8),
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
};

const topics = ["demoSismo/#"];

function connectToMqttBroker() {
  console.log("Connecting mqtt broker");
  client = mqtt.connect(host, options);
}

function subscribeToTopics() {
  topics.forEach((topic, index, arr) => {
    client.subscribe(topic);
  });
}

function onConnectionError(err) {
  console.log("Connection error: ", err);
  client.end();
}

function onConnection() {
  console.log("Connected");
  subscribeToTopics();
}

function onMessage(topic, payload) {
  if (topic == "demoSismo/xAxisOriginal") {
    addPoint(payload);
  } else {
    //console.log(topic + " " + payload);
  }
}

function setCallbacks() {
  client.on("error", onConnectionError);
  client.on("connect", onConnection);
  client.on("message", onMessage);
}

function startMQTTClient() {
  connectToMqttBroker();
  setCallbacks();
  subscribeToTopics();
}
