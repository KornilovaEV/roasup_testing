import { Sprite } from 'pixi.js';
import { finalScen } from '../finalScen/finalScen';
import { gameState } from '../state';

const CONFIG = {
  DISTANCE_THRESHOLD: 8,
  FADE_SPEED: 0.2,
  FAIL_DISPLAY_TIME: 2000,
  BASE_SPEED: 0.3,
};

function smoothRotate(sprite, targetAngle, speed = 0.1) {
  const currentAngle = sprite.rotation;
  const diff = targetAngle - currentAngle;

  const normalizedDiff = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI / 2;

  sprite.rotation += normalizedDiff * speed;
}

export function driveCars(activeSprite, line, coordTrash, app, finalLayer) {
  const coordDriwRedCar = line['#d1191f'].slice(0, coordTrash[0] + 1);
  const coordDriwYellowCar = line['#ffc841'].slice(0, coordTrash[1]);
  const [redCar, yellowCar] = activeSprite;

  const { speedRed, speedYellow } = syncCarSpeeds(coordDriwRedCar, coordDriwYellowCar);

  const state = {
    currentIndexRed: 0,
    currentIndexYellow: 0,
    isComplete: false,
  };

  const moveCar = (delta) => {
    if (state.isComplete) return;

    // Красная машина
    if (state.currentIndexRed < coordDriwRedCar.length - 1) {
      const target = coordDriwRedCar[state.currentIndexRed];
      const targetAngle = Math.atan2(target.y - redCar.y, target.x - redCar.x);

      smoothRotate(redCar, targetAngle, 0.4 * delta.deltaTime);
      moveToTarget(redCar, target, delta, speedRed);

      if (Math.hypot(target.x - redCar.x, target.y - redCar.y) < CONFIG.DISTANCE_THRESHOLD) {
        state.currentIndexRed++;
      }
    }

    // Желтая машина
    if (state.currentIndexYellow < coordDriwYellowCar.length - 1) {
      const target = coordDriwYellowCar[state.currentIndexYellow];
      const targetAngle = Math.atan2(target.y - yellowCar.y, target.x - yellowCar.x);

      smoothRotate(yellowCar, targetAngle, 0.4 * delta.deltaTime);
      moveToTarget(yellowCar, target, delta, speedYellow);

      if (Math.hypot(target.x - yellowCar.x, target.y - yellowCar.y) < CONFIG.DISTANCE_THRESHOLD) {
        state.currentIndexYellow++;
      }
    }

    // Проверка завершения
    if (
      state.currentIndexRed >= coordDriwRedCar.length - 1 &&
      state.currentIndexYellow >= coordDriwYellowCar.length - 1
    ) {
      state.isComplete = true;
      app.ticker.remove(moveCar);
      showFailScreen(app, finalLayer);
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
export function showFailScreen(app, finalLayer) {
  const { width, height } = gameState;
  gameState.failScen = true;
  const fail = Sprite.from('fail');
  fail.anchor.set(0.5);
  fail.x = width / 2;
  fail.y = height / 2;
  fail.scale.set(0.5);
  fail.alpha = 0;
  app.stage.addChild(fail);

  const failTicker = (delta) => {
    fail.alpha += CONFIG.FADE_SPEED * delta.deltaTime;
    if (fail.alpha >= 1) {
      let timer;
      fail.alpha = 1;
      app.ticker.remove(failTicker);
      gameState.failScen = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        app.stage.removeChild(fail);
        finalScen(app, finalLayer);
      }, CONFIG.FAIL_DISPLAY_TIME);
    }
  };

  gameState.failScen = failTicker;
  app.ticker.add(failTicker);
}

// ф-ция для синхронизации скорости
function calculatePathLength(path) {
  if (path.length < 2) return 0;
  let length = 0;
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;
    length += Math.sqrt(dx * dx + dy * dy);
  }
  return length;
}

function syncCarSpeeds(pathRed, pathYellow) {
  const lengthRed = calculatePathLength(pathRed);
  const lengthYellow = calculatePathLength(pathYellow);
  const maxLength = Math.max(lengthRed, lengthYellow);

  const totalTime = maxLength / CONFIG.BASE_SPEED;

  return {
    speedRed: lengthRed / totalTime,
    speedYellow: lengthYellow / totalTime,
  };
}
