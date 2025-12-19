import { Graphics } from 'pixi.js';
import { driveCars } from '../driveCars/driveCars.js';
import { findCoordinatesTrash } from '../driveCars/findCoordinatesTrash.js';
import { gameState } from '../state.js';

// Функция для начала рисования
export const startDrawing = (app, { data }) => {
  gameState.lastPoint = data.getLocalPosition(app.stage);
  const [red, yellow] = gameState.activeSprite;

  const colors = {
    '#d1191f': red,
    '#ffc841': yellow,
  };

  for (const [color, sprite] of Object.entries(colors)) {
    if (checkCollision(gameState.lastPoint, sprite) && gameState.line[color].length === 0) {
      gameState.activeColor = color;
      gameState.isDrawing = true;
      gameState.handVisible = false;
      return;
    }
  }
};

export const onDrawLine = (app, wayLayer, { data }) => {
  if (!gameState.isDrawing || !gameState.activeColor) return;
  const currentPos = data.getLocalPosition(app.stage);
  const color = gameState.activeColor;
  const line = gameState.line[color];
  const sprites = gameState.lineSprite[color];

  const lineGraphics = sprites.length ? sprites[sprites.length - 1] : new Graphics();

  lineGraphics
    .setStrokeStyle({
      width: 8,
      cap: 'round',
      color,
    })
    .moveTo(gameState.lastPoint.x, gameState.lastPoint.y)
    .lineTo(currentPos.x, currentPos.y)
    .stroke();

  if (!sprites.length) {
    wayLayer.addChild(lineGraphics);
    sprites.push(lineGraphics);
  }

  line.push({ x: Math.round(currentPos.x), y: Math.round(currentPos.y) });
  gameState.lastPoint = currentPos;
};

export const stopDrawing = (app, wayLayer, finalLayer) => {
  const { activeColor, line, lineSprite, sizeText } = gameState;

  gameState.isDrawing = false;
  gameState.lastPoint = null;
  if (!activeColor) return;

  const lastPoint = line[activeColor]?.at(-1);
  if (!lastPoint) return;

  const textArea = sizeText[activeColor];
  const inTargetArea =
    lastPoint.x >= textArea.x &&
    lastPoint.x <= textArea.x + 72 &&
    lastPoint.y >= textArea.y &&
    lastPoint.y <= textArea.y + 72;

  if (!inTargetArea) {
    lineSprite[activeColor].forEach((sprite) => wayLayer.removeChild(sprite));
    lineSprite[activeColor].length = 0;
    line[activeColor].length = 0;
    gameState.activeColor = null;
    return;
  }

  const trashCoord =
    line['#d1191f'].length > 0 &&
    line['#ffc841'].length > 0 &&
    findCoordinatesTrash(line['#d1191f'], line['#ffc841']);

  if (trashCoord) driveCars(gameState.activeSprite, line, trashCoord, app, finalLayer);
};

function checkCollision(point, sprite) {
  //т.к. спрайты смешены по центру координат
  const xSprite = sprite.x - sprite.width / 2;
  const ySprite = sprite.y - sprite.height / 2;
  return (
    point.x >= xSprite &&
    point.x <= xSprite + sprite.width &&
    point.y >= ySprite &&
    point.y <= ySprite + sprite.height
  );
}
