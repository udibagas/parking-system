const Transport = require("winston-transport");
const { WebSocketServer } = require("ws");

class WebSocketTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.ws = null;
    this.wss = new WebSocketServer({ port: 8090 });

    this.wss.on("connection", (ws) => {
      this.ws = ws;
    });
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    if (!this.ws) {
      return callback();
    }

    this.ws.send(JSON.stringify(info));
    callback();
  }
}

module.exports = WebSocketTransport;
