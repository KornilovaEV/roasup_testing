import { Application, Container, Rectangle } from 'pixi.js';

import { addParkingSpace } from './parking/addParkingSpace.js';
import { parkingMarkings } from './parking/parkingMarkings.js';
import { addCars } from './parking/addCars.js';
import { preload } from './preload.js';
import { addHand, animateHand, disappearanceHand } from './hand/addHand.js';
import { onDrawLine, startDrawing, stopDrawing } from './drawWayCar/drawWayCar.js';
import { finalScen } from './finalScen.js';
import { gameState } from './state.js';

import './style.css';
import { sizeCalculationsParking } from './parking/sizeCalculationsParking.js';

const app = new Application();

let backgroundLayer;
let gameLayer;

async function setup() {
  await app.init({ background: '#545454', resizeTo: window });
  document.body.appendChild(app.canvas);
}

// Asynchronous IIFE
(async () => {
  await setup();
  await preload();

  backgroundLayer = new Container();
  gameLayer = new Container();

  gameState.width = window.innerWidth;
  gameState.height = window.innerHeight;
  sizeCalculationsParking();

  app.stage.addChild(backgroundLayer, gameLayer);

  parkingMarkings(backgroundLayer);
  addParkingSpace(backgroundLayer);
  addCars(backgroundLayer, gameLayer);

  const handSprite = addHand(gameLayer);

  const heightHitArea = gameState.height + 50 - gameState.height / 3;

  app.stage.on('pointerdown', (event) => startDrawing(event, gameState, app));
  app.stage.on('pointermove', (event) => onDrawLine(event, gameState, backgroundLayer, app));
  app.stage.on('pointerup', () => stopDrawing(app, gameState, backgroundLayer));
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(
    50,
    50,
    gameState.width - 100,
    gameState.parking.bottomParking * 2 - 50
  ); //ограничила размер возможной области, чтобы пути точно пересклись

  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    disappearanceHand(app, handSprite);
    finalScen(app);
  }, 20 * 1000);

  const tickerHand = (time) => {
    if (gameState.handVisible) {
      animateHand(handSprite, time);
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

// const resizeHandler = () => {
//   // 1. Очищаем слои
//   backgroundLayer.removeChildren();
//   gameLayer.removeChildren();

//   // 2. Пересоздаём ВСЁ
//   addParkingSpace(app, backgroundLayer);
//   addSpaceP(app, sizeText, backgroundLayer);
//   addCars(app, activeSprite, gameLayer);

//   // 3. Обновляем hitArea
//   const heightHitArea = app.screen.height + 50 - app.screen.height / 3;
//   app.stage.hitArea = new Rectangle(50, 50, app.screen.width - 100, heightHitArea);
// };

// window.addEventListener('resize', resizeHandler);
// window.addEventListener('orientationchange', () => setTimeout(resizeHandler, 100));
