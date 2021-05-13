import moment from "moment";

let marker = moment();

console.log(`From worker: worker started at ${moment().format("HH:mm:ss")}`);

function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      console.log("Connection is made");
      if (callback != null) {
        callback();
      }
    } else {
      console.log("wait for connection...");
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 milisecond for the connection...
}

function sendMessage(msg) {
  // Wait until the state of the socket is not ready and send the message when it is...
  waitForSocketConnection(coinbaseSocket, function () {
    console.log("message sent!!!");
    coinbaseSocket.send(msg);
  });
}

const coinbaseSocket = new WebSocket("wss://ws-feed.pro.coinbase.com");

const toSend = {
  type: "subscribe",
  channels: [
    {
      name: "ticker",
      product_ids: ["BTC-USD"],
    },
  ],
};

sendMessage(JSON.stringify(toSend));

coinbaseSocket.onmessage = function (e) {
  const price = parseFloat(JSON.parse(e.data).price);
  if (price) postMessage(JSON.stringify({ price }));

  const now = moment();
  if (now - marker >= 5000) {
    console.log(`New marker set at ${now.format("hh:mm:ss")}`);
    marker = now;
  }
};

onmessage = function (e) {
  console.log("Worker: Message received from main script");
  this.postMessage("sent back from worker");
};

export default self;