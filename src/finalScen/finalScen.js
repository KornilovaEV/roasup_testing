import { Graphics, Rectangle, Sprite } from 'pixi.js';
import { gameState } from '../state';

export function finalScen(app, finalLayer) {
  const { width, height } = gameState;

  const scale = 0.001 * width;

  const background = new Graphics().rect(0, 0, width, height).fill({
    color: 0x000000,
  });

  background.alpha = 0;
  finalLayer.addChild(background);

  const logoSprite = Sprite.from('gamelogo');

  logoSprite.anchor.set(0.5);
  logoSprite.x = width / 2;
  logoSprite.y = height / 2 - 100;
  logoSprite.scale.set(0);
  logoSprite.alpha = 0;
  finalLayer.addChild(logoSprite);

  const buttonSprite = Sprite.from('button');

  buttonSprite.anchor.set(0.5);
  buttonSprite.x = width / 2;
  buttonSprite.y = height / 2 + 100;

  const originalBounds = buttonSprite.getBounds();

  buttonSprite.scale.set(0);
  buttonSprite.alpha = 0;

  //     buttonSprite.hitArea = new Rectangle(
  //     -buttonBounds.width / 2,    // Центр
  //     -buttonBounds.height / 2,
  //     buttonBounds.width,         // Полная ширина
  //     buttonBounds.height         // Полная высота
  //     );
  //     // Включаем интерактивность
  //     buttonSprite.eventMode = 'static';
  //     buttonSprite.cursor = 'pointer';

  //     // Обработчик клика
  //     buttonSprite.on('pointerdown', () => {
  //       window.open('https://roasup.com/', '_blank');
  // });

  finalLayer.addChild(buttonSprite);

  let scaleProgress = 0;
  let animationComplete = false;

  const ticerFinalScen = (delta) => {
    background.alpha += 0.005 * delta.deltaTime;
    logoSprite.alpha += 0.02 * delta.deltaTime;
    buttonSprite.alpha += 0.02 * delta.deltaTime;

    scaleProgress += 0.001 * delta.deltaTime;
    logoSprite.scale.set(scaleProgress);

    buttonSprite.scale.set(scaleProgress * 4);

    if (
      background.alpha >= 0.5 &&
      logoSprite.alpha >= 1 &&
      buttonSprite.alpha >= 1 &&
      scaleProgress <= scale
    ) {
      // app.ticker.remove(ticerFinalScen);

      if (!animationComplete) {
        animationComplete = true;
        app.ticker.remove(ticerFinalScen);

        // ✅ 1. Устанавливаем hitArea (оригинальные размеры)
        buttonSprite.hitArea = new Rectangle(
          -originalBounds.width / 2,
          -originalBounds.height / 2,
          originalBounds.width,
          originalBounds.height
        );

        // ✅ 2. ВКЛЮЧАЕМ интерактивность
        buttonSprite.eventMode = 'static';
        buttonSprite.cursor = 'pointer';

        // ✅ 3. Hover эффект
        buttonSprite.on('pointerover', () => {
          buttonSprite.scale.set(buttonSprite.scale.x * 1.1);
        });
        buttonSprite.on('pointerout', () => {
          buttonSprite.scale.set(buttonSprite.scale.x / 1.1);
        });

        // ✅ 4. КЛИК по ссылке
        buttonSprite.on('pointerdown', () => {
          window.open('https://roasup.com/', '_blank');
          console.log('click');
        });

        // console.log('✅ Кнопка готова к кликам!');
      }
    }
  };

  gameState.finalScen = ticerFinalScen;

  app.ticker.add(ticerFinalScen);
}
