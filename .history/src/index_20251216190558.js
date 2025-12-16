import { Application, Assets, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { ParkingSpace } from './parking/parkingSpace.js'
import { addParkingSpace } from './parking/addParkingSpace.js'
import { assetsMap } from './game.js'
import { Car } from "./Car.js";
import { addSpaceP } from "./parking/addSpaceP.js";



(async () => {
  const app = new Application();
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);

  addParkingSpace(app);
  addSpaceP(app);

    

//    const carRed =  await Assets.load({
//   alias: 'carRed1',
//   src: './assets/TP_car_up_splite-red.png',
// });


    const runGame = () => {
    // const sprite = new Sprite(carRed);  

        // const car = new Car();
        // app.stage.addChild(car.view);
        // app.stage.addChild(sprite);


    }

//   assetsMap.sprites.forEach((val) => app.loader.add(val.name, val.url));

  app.loader.load(runGame)

})();
