import { Sprite } from 'pixi.js';

import { gameState } from '../state';

export function addHand(gameLayer) {
  const hand = Sprite.from('hand');

  const {
    width,
    height,
    parking: { bottomParking, parkingWithPaddingWidth, paddingBetweeenSpace },
  } = gameState;

  const scaleWidth = width * 0.00025;

  hand.x = parkingWithPaddingWidth + paddingBetweeenSpace * 2;
  hand.y = height - 30;
  hand.scale.set(scaleWidth);

  gameLayer.addChild(hand);

  gameState.handSprite = hand;
}

export function animateHand(time) {
  const { handSprite } = gameState;
  const {
    width,
    height,
    parking: { bottomParking, parkingWithPaddingWidth, paddingBetweeenSpace },
  } = gameState;

  const speed = time.deltaTime;

  handSprite.x += (speed * width) / height;
  handSprite.y -= speed * 2;

  const startX = parkingWithPaddingWidth + paddingBetweeenSpace * 2;
  const startY = height - 30;
  const endX = (parkingWithPaddingWidth + paddingBetweeenSpace) * 2.4;
  const endY = bottomParking;

  if (handSprite.x >= endX && handSprite.y <= endY) {
    handSprite.x = startX;
    handSprite.y = startY;
  }
}

export function disappearanceHand(app) {
  const { handSprite } = gameState;
  const ticker = () => {
    handSprite.alpha -= 0.05;

    if (handSprite.alpha <= 0) {
      handSprite.alpha = 0;
      app.ticker.remove(ticker);
    }
  };
  app.ticker.add(ticker);
}
