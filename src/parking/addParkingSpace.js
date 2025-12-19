import { Text } from 'pixi.js';
import { gameState } from '../state';

function createText(color, sizeTextLetter) {
  return new Text({
    text: 'P',
    style: {
      fill: color,
      fontSize: sizeTextLetter,
      fontFamily: 'Arial',
      align: 'center',
      resolution: window.devicePixelRatio || 2,
      letterSpacing: 0,
    },
  });
}

export function addParkingSpace(backgroundLayer) {
  const {
    width,
    parking: { bottomParking, parkingWithPaddingWidth, paddingBetweeenSpace },
  } = gameState;

  const sizeTextLetter = Math.floor(width * 0.08);

  const textYellowX = (parkingWithPaddingWidth + paddingBetweeenSpace) * 1.5;
  const textRedX = (parkingWithPaddingWidth + paddingBetweeenSpace) * 2.4;
  const textY = bottomParking - sizeTextLetter;

  gameState.sizeText['#d1191f'] = {
    x: textRedX,
    y: textY,
  };

  gameState.sizeText['#ffc841'] = {
    x: textYellowX,
    y: textY,
  };

  const textRed = createText('#d1191f', sizeTextLetter);
  const textYellow = createText('#ffc841', sizeTextLetter);

  textYellow.x = textYellowX;
  textYellow.y = textY;

  textRed.x = textRedX;
  textRed.y = textY;

  backgroundLayer.addChild(textYellow, textRed);
}
