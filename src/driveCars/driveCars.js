import { Sprite, Ticker } from "pixi.js";
import { finalScen } from "../finalScen";

export function driveCars(activeSprite, line, coordTrash, app) {
  const coordDriwRedCar = line['#d1191f'].slice(0, coordTrash[0] + 1);
  const coordDriwYellowCar = line['#ffc841'].slice(0, coordTrash[1]);
  const [redCar, yellowCar] = activeSprite;

  let currentIndexRed = 0;
  let currentIndexYellow = 0;
  const speed = 0.5;

  const moveCar = (delta) => {
    // Проверяем КРАСНУЮ машину
    if (currentIndexRed <= coordDriwRedCar.length - 1) {
    const targetPointRed = coordDriwRedCar[currentIndexRed];
          
    redCar.x += (targetPointRed.x - redCar.x) * speed * delta.deltaTime;
    redCar.y += (targetPointRed.y - redCar.y) * speed * delta.deltaTime;

    // Проверяем расстояние ДО увеличения индекса
    const distRed = Math.hypot(targetPointRed.x - redCar.x, targetPointRed.y - redCar.y);
    if (distRed < 8) {
        currentIndexRed++;
    }
    }

    // Проверяем ЖЕЛТУЮ машину
    if (currentIndexYellow < coordDriwYellowCar.length - 1) {
      const targetPointYellow = coordDriwYellowCar[currentIndexYellow];
      
    
    yellowCar.x += (targetPointYellow.x - yellowCar.x)* speed * delta.deltaTime;
    yellowCar.y += (targetPointYellow.y - yellowCar.y)  * speed * delta.deltaTime;

      const distYellow = Math.hypot(targetPointYellow.x - yellowCar.x, targetPointYellow.y - yellowCar.y);
      if (distYellow < 8) {
        currentIndexYellow++;
      }
    }

    // Полная остановка, если ОБЕ машины дошли до конца
    if (currentIndexRed >= coordDriwRedCar.length - 1 && 
        currentIndexYellow >= coordDriwYellowCar.length - 1) {
      app.ticker.remove(moveCar);

        const fail = Sprite.from('fail');

        fail.anchor.set(0.5);        
        fail.x = app.screen.width/2;
        fail.y = app.screen.height/2;
        fail.scale.set(0.5);
        fail.alpha = 0;
        app.stage.addChild(fail);


        const ticker = (delta) => {
        fail.alpha += 0.02 * delta.deltaTime;
        
        if (fail.alpha >= 1) {
            fail.alpha = 1; 
            app.ticker.remove(ticker); 
            setTimeout(() => {
                finalScen(app);
            }, 0)
        }}
    
    app.ticker.add(ticker);


    }
  };

  app.ticker.add(moveCar);
}
