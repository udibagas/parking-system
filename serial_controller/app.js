const Api = require("./models/api");

(async () => {
  await Api.login();
  const gates = await Api.getGates();
  gates.forEach((gate) => {
    try {
      gate.scan();
    } catch (error) {
      console.error(error.message);
    }
  });
})();
