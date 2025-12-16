import { Application, Assets, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { addParkingSpace } from './parking/addParkingSpace.js'
import { addSpaceP } from "./parking/addSpaceP.js";
import { addCars } from "./parking/addCars.js";



  const app = new Application();
  const cars = [];
//   await app.init({ background: "#545454", }); //  resizeTo: window 
//   document.body.appendChild(app.canvas);

async function setup() {
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);
}

  async function preload() {
  const assets = [
    {name: 'carRed', url: '../assets/TP_car_up_splite-red.png'},
    {name: 'carYellow', url: '.../assets/TP_car_up_splite-yellow.png'},
    {name: 'carBlue', url: '../assets/TP_car_up_splite-blue.png'},
    {name: 'carGreen', url: '../assets/TP_car_up_splite-green.png'},
    {name: 'carWhite', url: '../assets/TP_car_up_splite-white.png'},
    {name: 'hand', url: '../assets/hand.png'},
    {name: 'gamelogo', url: '../assets/gamelogo.png'},
    {name: 'fail', url: '../assets/fail3.psd'},
    {name: 'button', url: '../assets/Button.png'}
  ];

  // Load the assets defined above.
  await Assets.load(assets);
}


// Asynchronous IIFE
(async () => {
  await setup();
  await preload();

  
  addParkingSpace(app);
  addSpaceP(app);
  addCars(app, cars)

})();
