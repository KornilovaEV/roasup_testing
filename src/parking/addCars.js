import { Container, Sprite } from 'pixi.js';

export function addCars(app) {
  // Create a container to hold all the fish sprites.
  const carStatic = new Container();

  // Add the fish container to the stage.
  app.stage.addChild(carStatic);
  
    const carBlue = Sprite.from('carBlue');
    carBlue.x = 110;
    carBlue.y = 130;
    carBlue.scale.set(0.3); 
    carBlue.scale.y *= -1; 
    carStatic.addChild(carBlue);

    const carGreen = Sprite.from('carGreen');

    carGreen.x = 590;
    carGreen.y = 130;
    carGreen.scale.set(0.3);
    carGreen.scale.y *= -1; 
    carStatic.addChild(carGreen);

    const carRed = Sprite.from('carRed');

    carRed.x = 150;
    carRed.y = 430;
    carRed.scale.set(0.3);
    carStatic.addChild(carRed);


    const carYellow = Sprite.from('carYellow');

    carYellow.x = 550;
    carYellow.y = 430;
    carYellow.scale.set(0.3);
    carStatic.addChild(carYellow);



}
