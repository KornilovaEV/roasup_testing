import { Sprite } from 'pixi.js';
import { PADDING_BETWEEN_SPACES, PARKING_LINE } from '../parking/constants';

export function addHand(app) {
  const hand = Sprite.from('hand');

  // Общая ширина всех элементов (парковочных мест и отступов между ними)
  const totalWidth = app.screen.width - (PARKING_LINE - 1) * PADDING_BETWEEN_SPACES;
  //ширина 1 парк места
  const parkingWidth = totalWidth / PARKING_LINE;
  //ширина 1 парк места с отступом
  const parkingWithSpacesWidth = parkingWidth + PADDING_BETWEEN_SPACES;

  const bottomY = (app.screen.height * 2) / 3;

  const scaleWidth = app.screen.width * 0.0005;

  hand.x = parkingWithSpacesWidth;
  hand.y = bottomY;
  hand.scale.set(scaleWidth);

  app.stage.addChild(hand);

  return hand;
}

export function animateHand(app, handSprite, time) {
  // Общая ширина всех элементов (парковочных мест и отступов между ними)
  const totalWidth = app.screen.width - (PARKING_LINE - 1) * PADDING_BETWEEN_SPACES;
  //ширина 1 парк места
  const parkingWidth = totalWidth / PARKING_LINE;
  //ширина 1 парк места с отступом
  const parkingWithSpacesWidth = parkingWidth + PADDING_BETWEEN_SPACES;

  const dx = time.deltaTime; // Нормализуем под 60 FPS

  // Движение: правая диагональ вверх
  handSprite.x += dx;
  handSprite.y -= dx; // Немного меньше по Y для красивой траектории

  // ✅ Точные координаты старт/финиш
  const startX = parkingWithSpacesWidth;
  const startY = (app.screen.height * 2) / 3;
  const endX = parkingWithSpacesWidth * 3;
  const endY = app.screen.height / 3;

  // ✅ Сброс только при достижении КОНЦА пути
  if (handSprite.x >= endX && handSprite.y <= endY) {
    handSprite.x = startX;
    handSprite.y = startY;
  }
}

export function disappearanceHand(app, handSprite) {
  const ticker = () => {
    handSprite.alpha -= 0.05;

    if (handSprite.alpha <= 0) {
      handSprite.alpha = 0;
      app.ticker.remove(ticker);
    }
  };

  app.ticker.add(ticker);
}
