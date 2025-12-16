import { Application, Graphics, Text, TextStyle } from "pixi.js";
import { ParkingSpace } from './parking/parkingSpace.js'
import { assetsMap } from './game.js'



(async () => {
  const app = new Application();
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);
// const runGame = () => {
//     const marker = new Graphics();
//     marker.b
// }
//   assetsMap.sprites.forEach((val) => app.loader.add(val.name, val.url ));
//   app.loader.load()


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

    app.stage.addChild(textRed);

const textYellow = new Text({
    text: 'P',
    style: {
      fill: '#ffc841',
      fontSize: 72,
      fontFamily: 'Arial',
        align: 'center'
    }
});

    textYellow.x = (app.screen.width / 10 ) * 5 + 40;
    textYellow.y =  textYellow.height / 2;

    app.stage.addChild(textYellow);',


    textRed.x = (app.screen.width / 10 ) * 5 + 40;
    textRed.y =  textRed.height / 2;

    app.stage.addChild(textRed);


})();
