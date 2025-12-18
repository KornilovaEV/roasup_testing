import { Application, Assets, Graphics, Rectangle} from "pixi.js";
import { addParkingSpace } from './parking/addParkingSpace.js'
import { addSpaceP } from "./parking/addSpaceP.js";
import { addCars } from "./parking/addCars.js";
import { preload } from "./preload.js";
import { addHand, animateHand } from "./hand/addHand.js";

const app = new Application();


async function setup() {
  await app.init({ background: "#545454", }); //  resizeTo: window 
  document.body.appendChild(app.canvas);
}


const handSprite = [];
const activeSprite = [];
const sizeText = {};
const redLine = [];
let redLineSprite = [];

let isDrawing = false;      // Флаг, определяющий состояние рисования
let lastPoint = null;       // Хранение последней точки для рисования линий
let handVisible = true;     // Отображение анимации руки


// Функция для начала рисования
const startDrawing = ({data}) => {
  lastPoint = data.getLocalPosition(app.stage);
  if(lastPoint.x >  activeSprite[0].x && lastPoint.x <  activeSprite[0].x + 60 && 
    lastPoint.y >  activeSprite[0].y && lastPoint.y <  activeSprite[0].y + 110 &&
    redLineSprite.length === 0
  ){
      isDrawing = true;
      handVisible = false;
    }
};

// const onYellowLine = ({data}) => {
//   if (!isDrawing || !lastPoint) return;
//   const currentPos = data.getLocalPosition(app.stage);

//   const lineGraphics = new Graphics().moveTo(lastPoint.x, lastPoint.y).lineTo(currentPos.x, currentPos.y).stroke( {color: '#ffc841', pixelLine: true});

//   app.stage.addChild(lineGraphics);

//   lastPoint = currentPos; 
// };

const stopDrawing = () => {
  isDrawing = false;
  lastPoint = null;

  if(
    !(redLine[redLine.length - 1].x > sizeText.textRedX && redLine[redLine.length - 1].x < sizeText.textRedX + 72 &&
     redLine[redLine.length - 1].y > sizeText.textRedY && redLine[redLine.length - 1].y < sizeText.textRedY + 72)
  ){
    for( let i of redLineSprite){
        app.stage.removeChild(i)
    };
    redLineSprite = []
  }   
};
     
const onRedLine = ({data}) => {
  
  if (!isDrawing || !lastPoint) return;
  const currentPos = data.getLocalPosition(app.stage);

  const lineGraphics = new Graphics().moveTo(lastPoint.x, lastPoint.y).lineTo(currentPos.x, currentPos.y).stroke( {color: '#d1191f'});

  // if( currentPos.x > sizeText.textRedX && currentPos.x < sizeText.textRedX + 72 &&
  //    currentPos.y > sizeText.textRedY && currentPos.y < sizeText.textRedY + 72
  //   ){
  //   app.stage.addChild(lineGraphics);
  // };

  redLine.push({x: currentPos.x, y: currentPos.y});
  redLineSprite.push(lineGraphics)

  app.stage.addChild(lineGraphics);

  lastPoint = currentPos; 

};
// Asynchronous IIFE
(async () => {
  await setup();
  await preload();
  
  addParkingSpace(app);
  addSpaceP(app, sizeText);
  addCars(app, activeSprite);
  addHand(app, handSprite);

  activeSprite[0].eventMode = 'static';
  activeSprite[0].on('pointerdown', startDrawing);
  activeSprite[0].on('pointermove', onRedLine);
  activeSprite[0].on('pointerup', stopDrawing);
  activeSprite[0].hitArea = new Rectangle(-400, -4000, 5500, 5500);

//  activeSprite[1].eventMode = 'static';
//   activeSprite[1].on('pointerdown', startDrawing);
//   activeSprite[1].on('pointermove', onYellowLine);
//   activeSprite[1].on('pointerup', stopDrawing);
//   activeSprite[1].hitArea = new Rectangle(-400, -400, 800, 800)

    app.ticker.add((time) => {
      if(handVisible){
        animateHand(app, handSprite, time);
      } else {
        handSprite[0].visible = false;
      }
    });



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
