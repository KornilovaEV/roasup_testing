import { Text } from "pixi.js";

export function addSpaceP(app) {
    const textRed = new Text({
        text: 'P',
        style: {
        fill: '#d1191f',
        fontSize: 72,
        fontFamily: 'Arial',
        align: 'center'
        }
    });

    textRed.x = (app.screen.width / 10 ) * 5 + 40;
    textRed.y =  textRed.height / 2;

    const textYellow = new Text({
        text: 'P',
        style: {
        fill: '#ffc841',
        fontSize: 72,
        fontFamily: 'Arial',
            align: 'center'
        }
    });

    textYellow.x = (app.screen.width / 10 ) * 3 + 40;
    textYellow.y =  textYellow.height / 2;
    
    app.stage.addChild(textYellow);
    app.stage.addChild(textRed);
}

