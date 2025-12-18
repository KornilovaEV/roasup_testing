import { Sprite } from "pixi.js";

export function addHand(app, handSprite) {
    const hand = Sprite.from('hand');

    hand.x = 220;
    hand.y = 400;
    hand.scale.set(0.2);

  app.stage.addChild(hand);
  handSprite.push(hand);

};

export function animateHand(app, handSprite, time) {


        // Calculate the amount of distance to move the mountain groups per tick.
    const dx = time.deltaTime *1.5;


          // Move the mountain groups leftwards.
    const hand = handSprite[0];
    hand.x += dx;
    hand.y -= dx;

    if (hand.x >= (app.screen.width / 10 ) * 5 + 40) {
      hand.x = 220;
      hand.y = 400;

    }

}

