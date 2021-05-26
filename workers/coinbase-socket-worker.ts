import moment from "moment";

let marker = moment();

const tickerChannel = new BroadcastChannel("ticker");

function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      if (callback != null) {
        callback();
      }
    } else {
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 milisecond for the connection...
}

function sendMessage(msg) {
  // Wait until the state of the socket is not ready and send the message when it is...
  waitForSocketConnection(coinbaseSocket, function () {
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
  if (price)
    tickerChannel.postMessage(
      JSON.stringify({ from: "coinbase-socket-worker", price })
    );

  const now = moment();
  if (now - marker >= 5000) {
    marker = now;
  }
  if (JSON.parse(e.data).from === "death") this.close();
};

export default self;
