import { Sprite } from "pixi.js";
import { finalScen } from "../finalScen";

const CONFIG = {
  DISTANCE_THRESHOLD: 8,
  FADE_SPEED: 0.2,
  FAIL_DISPLAY_TIME: 2000,
  BASE_SPEED: 0.3,
};

function smoothRotate(sprite, targetAngle, speed = 0.1) {
  const currentAngle = sprite.rotation;
  const diff = targetAngle - currentAngle;
  
  // Нормализуем угол (-PI до PI)
  const normalizedDiff = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI;
  
  sprite.rotation += normalizedDiff * speed;
}


export function driveCars(activeSprite, line, coordTrash, app) {
  const coordDriwRedCar = line['#d1191f'].slice(0, coordTrash[0] + 1);
  const coordDriwYellowCar = line['#ffc841'].slice(0, coordTrash[1]);
  const [redCar, yellowCar] = activeSprite;

  // Состояние анимации
  const state = {
    currentIndexRed: 0,
    currentIndexYellow: 0,
    isComplete: false
  };

  const moveCar = (delta) => {
    if (state.isComplete) return;

    // Красная машина
    if (state.currentIndexRed < coordDriwRedCar.length - 1) {
      const target = coordDriwRedCar[state.currentIndexRed];
      const targetAngle = -Math.atan2(target.y - redCar.y, target.x - redCar.x);
      
      smoothRotate(redCar, targetAngle, 0.04 * delta.deltaTime);
      moveToTarget(redCar, target, delta, CONFIG.BASE_SPEED);
      
      if (Math.hypot(target.x - redCar.x, target.y - redCar.y) < CONFIG.DISTANCE_THRESHOLD) {
        state.currentIndexRed++;
      }
    }

    // Желтая машина
    if (state.currentIndexYellow < coordDriwYellowCar.length - 1) {
      const target = coordDriwYellowCar[state.currentIndexYellow];
      const targetAngle = Math.atan2(target.y - yellowCar.y, target.x - yellowCar.x);
      
      smoothRotate(yellowCar, targetAngle, 0.04 * delta.deltaTime);
      moveToTarget(yellowCar, target, delta, CONFIG.BASE_SPEED);
      
      if (Math.hypot(target.x - yellowCar.x, target.y - yellowCar.y) < CONFIG.DISTANCE_THRESHOLD) {
        state.currentIndexYellow++;
      }
    }

    // Проверка завершения
    if (state.currentIndexRed >= coordDriwRedCar.length - 1 && 
        state.currentIndexYellow >= coordDriwYellowCar.length - 1) {
      
      state.isComplete = true;
      app.ticker.remove(moveCar);
      showFailScreen(app);
    }
  };

  app.ticker.add(moveCar);
}

// ф-ция движение по линии
function moveToTarget(sprite, target, delta, speed) {
  sprite.x += (target.x - sprite.x) * speed * delta.deltaTime;
  sprite.y += (target.y - sprite.y) * speed * delta.deltaTime;
}

// проигрыш
function showFailScreen(app) {
  const fail = Sprite.from('fail');
  fail.anchor.set(0.5);
  fail.x = app.screen.width / 2;
  fail.y = app.screen.height / 2;
  fail.scale.set(0.5);
  fail.alpha = 0;
  app.stage.addChild(fail);

  let fadeTicker = null;

  const fadeIn = (delta) => {
    fail.alpha += CONFIG.FADE_SPEED * delta.deltaTime;
    if (fail.alpha >= 1) {
      fail.alpha = 1;
      app.ticker.remove(fadeTicker);
      setTimeout(() => {
        app.stage.removeChild(fail);
        finalScen(app);
      }, CONFIG.FAIL_DISPLAY_TIME);
    }
  };

  fadeTicker = fadeIn;
  app.ticker.add(fadeTicker);
};
