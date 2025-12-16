import { Application, Assets, Graphics, Text, TextStyle } from "pixi.js";
import { ParkingSpace } from './parking/parkingSpace.js'
import { assetsMap } from './game.js'
import { Car } from "./Car.js";



(async () => {
  const app = new Application();
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);

    // Отображаем три парковочные зоны подряд
  for (let i = 0; i < 5; i++) {
    let positionX = i * ( app.screen.width/10 )  + 20; // Каждое новое место сдвигаем вправо на ширину предыдущего плюс небольшой отступ
    const parking = new ParkingSpace(positionX); // Передаем позицию X для каждого места
    app.stage.addChild(parking); // Добавляем каждое парковочное место на сцену
  }

    const textRed = new Text({
        text: 'P',
        style: {
        fill: '#d1191f',
        fontSize: 72,
        fontFamily: 'Arial',
        align: 'center'
        }
    });

    textRed.x = (app.screen.width / 10 ) * 5 + 40;
    textRed.y =  textRed.height / 2;

    const textYellow = new Text({
        text: 'P',
        style: {
        fill: '#ffc841',
        fontSize: 72,
        fontFamily: 'Arial',
            align: 'center'
        }
    });

    textYellow.x = (app.screen.width / 10 ) * 3 + 40;
    textYellow.y =  textYellow.height / 2;

    await Assets.load({
  alias: 'carRed',
  src: './assets/TP_car_up_splite-red.png',
});


    const runGame = () => {
    const sprite = new Sprite(carRed);  
        // const car = new Car();
        // app.stage.addChild(car.view);
        app.stage.addChild(carRed);

        app.stage.addChild(textYellow);
        app.stage.addChild(textRed);

    }

//   assetsMap.sprites.forEach((val) => app.loader.add(val.name, val.url));

  app.loader.load(runGame)

})();
