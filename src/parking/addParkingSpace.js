import { Container, Graphics } from 'pixi.js';
import { PADDING_BETWEEN_SPACES, PARKING_LINE } from './constants';

export function addParkingSpace(app) {
  const parkingSpace = new Container();

  // Общая ширина всех элементов (парковочных мест и отступов между ними)
  const totalWidth = app.screen.width - ((PARKING_LINE - 1) * PADDING_BETWEEN_SPACES)

  //ширина 1 парк места
  const parkingWidth = totalWidth/PARKING_LINE;

  // Выравниваем контейнер по центру сцены
  parkingSpace.position.x = (app.screen.width - totalWidth) / 2;

  
// Низ парковки
const bottomY = app.screen.height/3;

  for (let i = 0; i < PARKING_LINE; i++) {
      let positionX =  (parkingWidth + PADDING_BETWEEN_SPACES) * i ;

      const parking = new Graphics().rect(positionX, 0, 20, bottomY)
        .rect(positionX - 10, bottomY, 40, 10).fill(0xFFFFFF);
        
      parkingSpace.addChild(parking); 
    }
    
  app.stage.addChild(parkingSpace);

}
