import { Application, Assets, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { addParkingSpace } from './parking/addParkingSpace.js'
import { addSpaceP } from "./parking/addSpaceP.js";
import { addCars } from "./parking/addCars.js";
import { preload } from "./preload.js";


const app = new Application();

async function setup() {
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);
}

// Asynchronous IIFE
(async () => {
  await setup();
  await preload();
  
  addParkingSpace(app);
  addSpaceP(app);
  addCars(app);
})();
