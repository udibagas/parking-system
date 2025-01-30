const GateIn = require("./models/GateIn");

GateIn.findAll().then((gateIns) => {
  gateIns.forEach((g) => {
    g.connect();
  });
});
