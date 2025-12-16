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

    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 72,
        fill: '#ff0000',
        align: 'center'
    });
    let text = new Text('P', style);
    text.x = app.screen.width / 10 - text.width / 2;
    // text.y = app.screen.height / 2 - text.height / 2;

    app.stage.addChild(text);


})();
