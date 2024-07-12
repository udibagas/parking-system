var Player = require("./models/player");
const player = new Player();

player.stopAndPlay("./sounds/kidung-reksabumi.aac");

// setTimeout(function () {
// player.stopAndPlay("./sounds/rayuan-pulau-kelapa.aac");
// }, 10000);

// you can also listen for various callbacks:
player.on("complete", function () {
  console.log("Done with playback!");
});

player.on("error", (err) => {
  console.log(err);
});
