
import { ParkingSpace } from './parkingSpace';

export function addParkingSpace(app) {
  for (let i = 0; i < 5; i++) {
      let positionX = i * ( app.screen.width/10 )  + 20; // Каждое новое место сдвигаем вправо на ширину предыдущего плюс небольшой отступ
      const parking = new ParkingSpace(positionX); // Передаем позицию X для каждого места
      app.stage.addChild(parking); // Добавляем каждое парковочное место на сцену
    }
}
