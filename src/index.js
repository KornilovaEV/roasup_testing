import { Application, Container, Rectangle } from 'pixi.js';

import { addParkingSpace } from './parking/addParkingSpace.js';
import { parkingMarkings } from './parking/parkingMarkings.js';
import { addCars } from './parking/addCars.js';
import { preload } from './preload.js';
import { addHand, animateHand, disappearanceHand } from './hand/addHand.js';
import { onDrawLine, startDrawing, stopDrawing } from './drawWayCar/drawWayCar.js';
import { finalScen } from './finalScen/finalScen.js';
import { gameState } from './state.js';
import { sizeCalculationsParking } from './parking/sizeCalculationsParking.js';

import './style.css';
import { showFailScreen } from './driveCars/driveCars.js';

const app = new Application();

let backgroundLayer;
let gameLayer;
let finalLayer;
let wayLayer;
let timer;
let tickerHand;

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
  wayLayer = new Container();
  finalLayer = new Container();

  gameState.width = window.innerWidth;
  gameState.height = window.innerHeight;
  sizeCalculationsParking();

  app.stage.addChild(backgroundLayer, wayLayer, gameLayer, finalLayer);

  parkingMarkings(backgroundLayer);
  addParkingSpace(backgroundLayer);
  addCars(backgroundLayer, gameLayer);
  addHand(gameLayer);

  app.stage.on('pointerdown', (event) => startDrawing(app, event));
  app.stage.on('pointermove', (event) => onDrawLine(app, wayLayer, event));
  app.stage.on('pointerup', () => stopDrawing(app, wayLayer, finalLayer));
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(50, 50, gameState.width - 100, gameState.height - 50); //ограничила размер возможной области, чтобы пути точно пересеклись

  clearTimeout(timer);
  timer = setTimeout(() => {
    disappearanceHand(app);
    finalScen(app, backgroundLayer);
  }, 20 * 1000);

  tickerHand = (time) => {
    if (gameState.handVisible) {
      animateHand(time);
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      app.ticker.remove(tickerHand);
      disappearanceHand(app);
    }
  };
  app.ticker.add(tickerHand);
})();

const resizeHandler = () => {
  // 1. Очищаем слои
  backgroundLayer.removeChildren();
  gameLayer.removeChildren();
  wayLayer.removeChildren();
  finalLayer.removeChildren();

  gameState.failTicker && app.ticker.remove(gameState.failTicker);
  gameState.finalScen && app.ticker.remove(gameState.finalScen);

  backgroundLayer = new Container();
  wayLayer = new Container();
  gameLayer = new Container();
  finalLayer = new Container();

  gameState.prevWidth =
    gameState.prevWidth !== gameState.width ? gameState.width : gameState.prevWidth;
  gameState.prevHeight =
    gameState.prevHeight !== gameState.height ? gameState.height : gameState.prevHeight;

  gameState.width = window.innerWidth;
  gameState.height = window.innerHeight;

  sizeCalculationsParking();
  app.stage.addChild(backgroundLayer, wayLayer, gameLayer, finalLayer);

  // 2. Пересоздаём ВСЁ
  parkingMarkings(backgroundLayer);
  addParkingSpace(backgroundLayer);
  addCars(backgroundLayer, gameLayer);
  if (gameState.failScen) {
    showFailScreen(app, finalLayer);
  } else if (!gameState.finalScen) {
    if (gameState.line['#d1191f'].length === 0 && gameState.line['#ffc841'].length === 0) {
      addHand(gameLayer);
    }

    // 3. Обновляем hitArea
    app.stage.hitArea = new Rectangle(50, 50, gameState.width - 100, gameState.height - 50);

    clearTimeout(timer);
    timer = setTimeout(() => {
      disappearanceHand(app);
      finalScen(app, finalLayer);
    }, 20 * 1000);

    app.ticker.remove(tickerHand);
    tickerHand = (time) => {
      if (gameState.handVisible) {
        animateHand(time);
      } else {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        app.ticker.remove(tickerHand);
        disappearanceHand(app);
      }
    };
    app.ticker.add(tickerHand);
  } else {
    finalScen(app, finalLayer);
  }
};

window.addEventListener('resize', resizeHandler);
window.addEventListener('orientationchange', () => setTimeout(resizeHandler, 100));
