import { Container, Graphics } from 'pixi.js';
import { gameState } from '../state';

export function parkingMarkings(backgroundLayer) {
  const parkingSpace = new Container();

  const {
    width,
    parking: {
      parkingLine,
      totalWidthParking,
      paddingBetweeenSpace,
      parkingWithPaddingWidth,
      bottomParking,
    },
  } = gameState;

  // Выравниваем контейнер по центру сцены
  parkingSpace.position.x = (width - totalWidthParking) / 2;

  for (let i = 0; i < parkingLine; i++) {
    let positionX = parkingWithPaddingWidth * i;

    const parking = new Graphics()
      .rect(positionX, 0, paddingBetweeenSpace, bottomParking)
      .rect(positionX - paddingBetweeenSpace / 2, bottomParking, paddingBetweeenSpace * 2, 10)
      .fill(0xffffff);

    parkingSpace.addChild(parking);
  }

  backgroundLayer.addChild(parkingSpace);
}
