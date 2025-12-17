import { Application, Assets, Graphics, Rectangle} from "pixi.js";
import { addParkingSpace } from './parking/addParkingSpace.js'
import { addSpaceP } from "./parking/addSpaceP.js";
import { addCars, animateHand } from "./parking/addCars.js";
import { preload } from "./preload.js";

const app = new Application();


async function setup() {
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);
}

const handSprite = [];
const activeSprite = [];

let isDrawing = false;      // Флаг, определяющий состояние рисования
let lastPoint = null;       // Хранение последней точки для рисования линий

// Функция для начала рисования
const startDrawing = ({data}) => {
  isDrawing = true;
  lastPoint = data.getLocalPosition(app.stage);
};

const onYellowLine = ({data}) => {
  if (!isDrawing || !lastPoint) return;
  const currentPos = data.getLocalPosition(app.stage);

  const lineGraphics = new Graphics().moveTo(lastPoint.x, lastPoint.y).lineTo(currentPos.x, currentPos.y).stroke( {color: '#ffc841', pixelLine: true});

  app.stage.addChild(lineGraphics);

  lastPoint = currentPos; 
};

const stopDrawing = () => {
  isDrawing = false;
  lastPoint = null;
};

const onRedLine = ({data}) => {
  
  if (!isDrawing || !lastPoint) return;
  const currentPos = data.getLocalPosition(app.stage);

  const lineGraphics = new Graphics().moveTo(lastPoint.x, lastPoint.y).lineTo(currentPos.x, currentPos.y).stroke( {color: '#d1191f', pixelLine: true});

  app.stage.addChild(lineGraphics);

  lastPoint = currentPos; 
};

// Asynchronous IIFE
(async () => {
  await setup();
  await preload();
  
  addParkingSpace(app);
  addSpaceP(app);
  addCars(app, handSprite, activeSprite);

  activeSprite[0].eventMode = 'static';
  activeSprite[0].on('pointerdown', startDrawing);
  activeSprite[0].on('pointermove', onRedLine);
  activeSprite[0].on('pointerup', stopDrawing);
  activeSprite[0].hitArea = new Rectangle(-400, -400, 800, 800)
 activeSprite[1].eventMode = 'static';
  activeSprite[1].on('pointerdown', startDrawing);
  activeSprite[1].on('pointermove', onYellowLine);
  activeSprite[1].on('pointerup', stopDrawing);
  activeSprite[1].hitArea = new Rectangle(-400, -400, 800, 800)




//   app.stage.on('pointerdown', onPointerdown, undefined);
// app.stage.interactive = true;

  // Add the animation callbacks to the application's ticker.
  // if()
  // app.ticker.add((time) => {
  //   animateHand(app, handSprite, time);
  // });

//   setTimeout(() => {
//     console.log('timer')
//     const obj = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill({
//     color: 0x000000,
//     alpha: 0,
// });
    
//     app.stage.addChild(obj); // Добавляем затемняющий слой на сцену
//   }, 3000); // Задержка в миллисекундах (5 сек.)

  //   const obj = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill({
  //     color: 0x000000,
  //     alpha: 0,
  //   });
    
  // app.stage.addChild(obj); // Добавляем затемняющий слой на сцену

  //     // Таймер, запускающий затемнение
  //   setTimeout(() => {
  //     console.log('timer')
  //     obj.alpha = 0.5
  //       // updateOverlay(); // Начало анимации затемнения
  //   }, 3000); // Затемнение начнется ровно через 5 секунд


  
})();
