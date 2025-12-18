import { Sprite } from "pixi.js";

export function addHand(app) {
    const hand = Sprite.from('hand');

    hand.x = 220;
    hand.y = 400;
    hand.scale.set(0.2);

    app.stage.addChild(hand);

    return hand;
};

export function animateHand(app, handSprite, time) {

    const dx = time.deltaTime *1.5;

    const hand = handSprite;
    hand.x += dx;
    hand.y -= dx;

    if (hand.x >= (app.screen.width / 10 ) * 5 + 40) {
      hand.x = 220;
      hand.y = 400;
    }
};