import { Application, Graphics, Rectangle } from 'pixi.js';

import { addParkingSpace } from './parking/addParkingSpace.js';
import { addSpaceP } from './parking/addSpaceP.js';
import { addCars } from './parking/addCars.js';
import { preload } from './preload.js';
import { addHand, animateHand, disappearanceHand } from './hand/addHand.js';
import { findCoordinatesTrash } from './findCoordinatesTrash.js';
import { driveCars } from './driveCars/driveCars.js';
import { finalScen } from './finalScen.js';

const app = new Application();

async function setup() {
  await app.init({ background: '#545454', resizeTo: window });
  document.body.appendChild(app.canvas);
}

const activeSprite = [];
const sizeText = {};

const line = {
  '#d1191f': [],
  '#ffc841': [],
};

const lineSprite = {
  '#d1191f': [],
  '#ffc841': [],
};

let isDrawing = false; // Флаг, определяющий состояние рисования
let lastPoint = null; // Хранение последней точки для рисования линий
let handVisible = true; // Отображение анимации руки

let activeColor = null;
let trashCoord = null;

function checkCollision(point, sprite) {
  return (
    point.x >= sprite.x &&
    point.x <= sprite.x + sprite.width + 60 &&
    point.y >= sprite.y &&
    point.y <= sprite.y + sprite.height + 100
  );
}

// Функция для начала рисования
const startDrawing = ({ data }, activeSprite, line) => {
  lastPoint = data.getLocalPosition(app.stage);
  const [red, yellow] = activeSprite;

  const redCar = checkCollision(lastPoint, red);
  const yellowCar = checkCollision(lastPoint, yellow);

  // если красная машинка
  if (redCar && line['#d1191f'].length === 0) {
    activeColor = '#d1191f';
    isDrawing = true;
    handVisible = false;
  } //если желтая
  else if (yellowCar && line['#ffc841'].length === 0) {
    activeColor = '#ffc841';
    isDrawing = true;
    handVisible = false;
  }
};

const onDrawLine = ({ data }, line, lineSprite) => {
  if (!isDrawing || !lastPoint || !activeColor) return;
  const currentPos = data.getLocalPosition(app.stage);

  const lineGraphics = new Graphics()
    .moveTo(lastPoint.x, lastPoint.y)
    .lineTo(currentPos.x, currentPos.y)
    .stroke({ color: activeColor, width: 10 });

  line[activeColor].push({ x: Math.round(currentPos.x), y: Math.round(currentPos.y) });
  lineSprite[activeColor].push(lineGraphics);

  app.stage.addChild(lineGraphics);
  lastPoint = currentPos;
};

const stopDrawing = (line, lineSprite, color) => {
  isDrawing = false;
  lastPoint = null;

  if (!activeColor) return;

  const lastPoints = line[activeColor][line[activeColor].length - 1];

  if (!lastPoints) return;

  if (
    !(
      lastPoints.x > sizeText[color].x &&
      lastPoints.x < sizeText[color].x + 72 &&
      lastPoints.y > sizeText[color].y &&
      lastPoints.y < sizeText[color].y + 72
    )
  ) {
    for (let i of lineSprite[activeColor]) {
      app.stage.removeChild(i);
    }
    lineSprite[activeColor].length = 0;
    line[activeColor].length = 0;
    activeColor = null;
  }
  if (line['#d1191f'].length > 0 && line['#ffc841'].length > 0) {
    trashCoord = findCoordinatesTrash(line['#d1191f'], line['#ffc841']);
  }

  if (trashCoord) {
    driveCars(activeSprite, line, trashCoord, app);
  }
};

// Asynchronous IIFE
(async () => {
  await setup();
  await preload();

  addParkingSpace(app);
  addSpaceP(app, sizeText);
  addCars(app, activeSprite);
  const handSprite = addHand(app);

  const heightHitArea = app.screen.height + 50 - app.screen.height / 3;

  app.stage.on('pointerdown', (event) => startDrawing(event, activeSprite, line));
  app.stage.on('pointermove', (event) => onDrawLine(event, line, lineSprite));
  app.stage.on('pointerup', () => stopDrawing(line, lineSprite, activeColor));
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(50, 50, app.screen.width - 100, heightHitArea); //ограничела размер возможной области, чтобы пути точно пересклись

  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    disappearanceHand(app, handSprite);
    finalScen(app);
  }, 20 * 1000);

  const tickerHand = (time) => {
    if (handVisible) {
      animateHand(app, handSprite, time);
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      app.ticker.remove(tickerHand);
      disappearanceHand(app, handSprite);
    }
  };
  app.ticker.add(tickerHand);
})();
