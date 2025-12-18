import { Graphics, Rectangle, Sprite } from "pixi.js";

export function finalScen(app){
    const background = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill({
      color: 0x000000,
    });

    background.alpha = 0; 
    app.stage.addChild(background);

    const logoSprite = Sprite.from('gamelogo');

    logoSprite.anchor.set(0.5);        
    logoSprite.x = app.screen.width/2;
    logoSprite.y = app.screen.height/2 - 100;
    logoSprite.scale.set(0);
    logoSprite.alpha = 0;
    app.stage.addChild(logoSprite);

    const buttonSprite = Sprite.from('button');

    buttonSprite.anchor.set(0.5);        
    buttonSprite.x = app.screen.width/2;
    buttonSprite.y = app.screen.height/2 + 100;
    buttonSprite.scale.set(0);
    buttonSprite.alpha = 0;

    const buttonBounds = buttonSprite.getBounds();
    buttonSprite.hitArea = new Rectangle(-buttonBounds.width *0.8, -100, buttonBounds.width *1.6 , buttonBounds.height*0.5 - 50 );

    // Включаем интерактивность
    buttonSprite.eventMode = 'static';
    buttonSprite.cursor = 'pointer';

    // Обработчик клика
    buttonSprite.on('pointerdown', () => {
    window.open('https://roasup.com/', '_blank'); 
    });
    app.stage.addChild(buttonSprite);

    let scaleProgress = 0

    const ticerFinalScen = (delta) => {
        background.alpha += 0.005 * delta.deltaTime; 
        logoSprite.alpha += 0.02 * delta.deltaTime; 
        buttonSprite.alpha += 0.02 * delta.deltaTime; 
        
        scaleProgress += 0.001 * delta.deltaTime;
        logoSprite.scale.set(scaleProgress); 

        buttonSprite.scale.set(scaleProgress * 5)

        if (background.alpha >= 0.5 && logoSprite.alpha >= 1 && buttonSprite.alpha >= 1 &&
            scaleProgress >= 0.1
        ) {
            background.alpha = 0.5; 
            logoSprite.alpha = 1; 
            buttonSprite.alpha = 1; 
            logoSprite.scale.set(0.1);
            app.ticker.remove(ticerFinalScen); 
        }
    };

    app.ticker.add(ticerFinalScen);
}