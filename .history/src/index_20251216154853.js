import { Application } from "pixi.js";
import { ParkingSpace } from './parking'



(async () => {
  const app = new Application();
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);


    // Отображаем три парковочные зоны подряд
  for (let i = 0; i < 5; i++) {
    let positionX = i * 70 + 20; // Каждое новое место сдвигаем вправо на ширину предыдущего плюс небольшой отступ
    const parking = new ParkingSpace(positionX); // Передаем позицию X для каждого места
    app.stage.addChild(parking); // Добавляем каждое парковочное место на сцену
  }


})();
