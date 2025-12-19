import { Sprite } from 'pixi.js';
import { gameState } from '../state';

export function addCars(backgroundLayer, gameLayer) {
  const {
    width,
    parking: { parkingWithPaddingWidth, paddingBetweeenSpace, bottomParking, parkingWidth },
  } = gameState;
  const scaleWidth = width * 0.0001;

  const carBlue = Sprite.from('carBlue');
  carBlue.x = parkingWidth - paddingBetweeenSpace;
  carBlue.y = bottomParking;
  carBlue.scale.set(scaleWidth);
  carBlue.scale.y *= -1;

  const carGreen = Sprite.from('carGreen');

  carGreen.x = parkingWithPaddingWidth * 3.75;
  carGreen.y = bottomParking;
  carGreen.scale.set(scaleWidth);
  carGreen.scale.y *= -1;

  const carRed = Sprite.from('carRed');

  carRed.x = parkingWithPaddingWidth + paddingBetweeenSpace * 2;
  carRed.y = bottomParking * 2;
  carRed.scale.set(scaleWidth);
  carRed.anchor.set(0.5);

  const carYellow = Sprite.from('carYellow');

  carYellow.x = (parkingWithPaddingWidth + paddingBetweeenSpace) * 3 - paddingBetweeenSpace * 0.5;
  carYellow.y = bottomParking * 2;
  carYellow.scale.set(scaleWidth);
  carYellow.anchor.set(0.5);

  backgroundLayer.addChild(carBlue, carGreen);
  gameLayer.addChild(carRed, carYellow);

  gameState.activeSprite.push(carRed, carYellow);
}
