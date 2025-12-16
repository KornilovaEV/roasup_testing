import { Application, Assets, Sprite, Container } from "pixi.js";
import { ParkingSpace } from "./parking/parkingSpace.js";
// import { initGame } from "./game.js";

(async () => {
  const app = new Application();
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);

})();
