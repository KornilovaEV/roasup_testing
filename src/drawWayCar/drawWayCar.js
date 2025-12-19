import { Graphics } from 'pixi.js';
import { driveCars } from '../driveCars/driveCars.js';
import { findCoordinatesTrash } from '../findCoordinatesTrash.js';

// Функция для начала рисования
export const startDrawing = ({ data }, gameState, app) => {
  gameState.lastPoint = data.getLocalPosition(app.stage);
  const [red, yellow] = gameState.activeSprite;

  const redCar = checkCollision(gameState.lastPoint, red);
  console.log('red ', red.x, red.y);
  console.log('gameState.lastPoint   ', gameState.lastPoint);
  const yellowCar = checkCollision(gameState.lastPoint, yellow);

  // если красная машинка
  if (redCar && gameState.line['#d1191f'].length === 0) {
    gameState.activeColor = '#d1191f';
    gameState.isDrawing = true;
    gameState.handVisible = false;
  } //если желтая
  else if (yellowCar && gameState.line['#ffc841'].length === 0) {
    gameState.activeColor = '#ffc841';
    gameState.isDrawing = true;
    gameState.handVisible = false;
  }
};

export const onDrawLine = ({ data }, gameState, backgroundLayer, app) => {
  if (!gameState.isDrawing || !gameState.lastPoint || !gameState.activeColor) return;
  const currentPos = data.getLocalPosition(app.stage);

  const lineGraphics = new Graphics()
    .moveTo(gameState.lastPoint.x, gameState.lastPoint.y)
    .lineTo(currentPos.x, currentPos.y)
    .stroke({ color: gameState.activeColor, width: 10 });

  gameState.line[gameState.activeColor].push({
    x: Math.round(currentPos.x),
    y: Math.round(currentPos.y),
  });
  gameState.lineSprite[gameState.activeColor].push(lineGraphics);

  backgroundLayer.addChild(lineGraphics);
  gameState.lastPoint = currentPos;
};

export const stopDrawing = (app, gameState, backgroundLayer) => {
  gameState.isDrawing = false;
  gameState.lastPoint = null;
  let trashCoord;

  if (!gameState.activeColor) return;

  const lastPoints =
    gameState.line[gameState.activeColor][gameState.line[gameState.activeColor].length - 1];

  if (!lastPoints) return;

  if (
    !(
      lastPoints.x > gameState.sizeText[gameState.activeColor].x &&
      lastPoints.x < gameState.sizeText[gameState.activeColor].x + 72 &&
      lastPoints.y > gameState.sizeText[gameState.activeColor].y &&
      lastPoints.y < gameState.sizeText[gameState.activeColor].y + 72
    )
  ) {
    for (let i of gameState.lineSprite[gameState.activeColor]) {
      backgroundLayer.removeChild(i);
    }
    gameState.lineSprite[gameState.activeColor].length = 0;
    gameState.line[gameState.activeColor].length = 0;
    gameState.activeColor = null;
  }
  if (gameState.line['#d1191f'].length > 0 && gameState.line['#ffc841'].length > 0) {
    trashCoord = findCoordinatesTrash(gameState.line['#d1191f'], gameState.line['#ffc841']);
  }

  if (trashCoord) {
    driveCars(gameState.activeSprite, gameState.line, trashCoord, app);
  }
};

function checkCollision(point, sprite) {
  return (
    point.x >= sprite.x &&
    point.x <= sprite.x + sprite.width + 60 &&
    point.y >= sprite.y &&
    point.y <= sprite.y + sprite.height + 100
  );
}
