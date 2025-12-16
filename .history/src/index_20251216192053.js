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
    {alias: 'carRed', url: '../assets/TP_car_up_splite-red.png'},
    {alias: 'carYellow', url: '.../assets/TP_car_up_splite-yellow.png'},
    {alias: 'carBlue', url: '../assets/TP_car_up_splite-blue.png'},
    {alias: 'carGreen', url: '../assets/TP_car_up_splite-green.png'},
    {alias: 'carWhite', url: '../assets/TP_car_up_splite-white.png'},
    {alias: 'hand', url: '../assets/hand.png'},
    {alias: 'gamelogo', url: '../assets/gamelogo.png'},
    {alias: 'fail', url: '../assets/fail3.psd'},
    {alias: 'button', url: '../assets/Button.png'}
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
