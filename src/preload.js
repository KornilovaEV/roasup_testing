import { Assets } from 'pixi.js';

import carRed from './assets/carRed.png';
import carYellow from './assets/carYellow.png';
import carBlue from './assets/carBlue.png';
import carGreen from './assets/carGreen.png';
import hand from './assets/hand.png';
import gamelogo from './assets/gamelogo.png';
import fail from './assets/fail.png';
import button from './assets/button.png';

export async function preload() {
  const assets = [
    { alias: 'carRed', src: carRed },
    { alias: 'carYellow', src: carYellow },
    { alias: 'carBlue', src: carBlue },
    { alias: 'carGreen', src: carGreen },
    { alias: 'hand', src: hand },
    { alias: 'gamelogo', src: gamelogo },
    { alias: 'fail', src: fail },
    { alias: 'button', src: button },
  ];
  await Assets.load(assets);
}
