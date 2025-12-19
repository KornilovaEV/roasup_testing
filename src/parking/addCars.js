import { Container, Sprite } from 'pixi.js';
import { PADDING_BETWEEN_SPACES, PARKING_LINE } from './constants';

export function addCars(app, activeSprite) {
  const carStatic = new Container();
  // Общая ширина всех элементов (парковочных мест и отступов между ними)
  const totalWidth = app.screen.width - (PARKING_LINE - 1) * PADDING_BETWEEN_SPACES;

  //ширина 1 парк места
  const parkingWidth = totalWidth / PARKING_LINE;
  //ширина 1 парк места с отступом
  const parkingWithSpacesWidth = parkingWidth + PADDING_BETWEEN_SPACES;

  // Низ парковки
  const bottomY = app.screen.height / 3;

  const scaleWidth = app.screen.width * 0.0001;

  app.stage.addChild(carStatic);

  const carBlue = Sprite.from('carBlue');
  carBlue.x = parkingWithSpacesWidth / 2 + 20; //20 ширина полосы
  carBlue.y = bottomY;
  carBlue.scale.set(scaleWidth);
  carBlue.scale.y *= -1;
  carStatic.addChild(carBlue);

  const carGreen = Sprite.from('carGreen');

  carGreen.x = 3 * parkingWithSpacesWidth + parkingWithSpacesWidth / 2 + 20;
  carGreen.y = bottomY;
  carGreen.scale.set(scaleWidth);
  carGreen.scale.y *= -1;
  carStatic.addChild(carGreen);

  const carRed = Sprite.from('carRed');

  carRed.x = parkingWithSpacesWidth;
  carRed.y = bottomY * 2;
  carRed.scale.set(scaleWidth);
  carStatic.addChild(carRed);

  const carYellow = Sprite.from('carYellow');

  carYellow.x = parkingWithSpacesWidth * 3;
  carYellow.y = bottomY * 2;
  carYellow.scale.set(scaleWidth);
  carStatic.addChild(carYellow);

  activeSprite.push(carRed);
  activeSprite.push(carYellow);
}
