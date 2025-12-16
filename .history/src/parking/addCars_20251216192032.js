import { Container, Sprite } from 'pixi.js';

export function addCars(app, cars) {
  // Create a container to hold all the fish sprites.
  const fishContainer = new Container();

  // Add the fish container to the stage.
  app.stage.addChild(fishContainer);


  const fishCount = 20;
  const fishAssets = ['carRed', 'carYellow', 'carBlue', 'carGreen'];

  // Create a fish sprite for each fish.
  for (let i = 0; i < fishCount; i++) {
    // Cycle through the fish assets for each sprite.
    const fishAsset = fishAssets[i % fishAssets.length];

    // Create a fish sprite.
    const fish = Sprite.from(fishAsset);

    // Center the sprite anchor.
    fish.anchor.set(0.5);

    // Assign additional properties for the animation.
    fish.direction = Math.random() * Math.PI * 2;
    fish.speed = 2 + Math.random() * 2;
    fish.turnSpeed = Math.random() - 0.8;

    // Randomly position the fish sprite around the stage.
    fish.x = Math.random() * app.screen.width;
    fish.y = Math.random() * app.screen.height;

    // Randomly scale the fish sprite to create some variety.
    fish.scale.set(0.5 + Math.random() * 0.2);

    // Add the fish sprite to the fish container.
    fishContainer.addChild(fish);

    // Add the fish sprite to the fish array.
    cars.push(fish);
  }
}
