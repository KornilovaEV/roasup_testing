import { Text } from "pixi.js";
import { PADDING_BETWEEN_SPACES, PARKING_LINE } from "./constants";


export function addSpaceP(app, sizeText) {
    const appScreenWidth = app.screen.width;

    
    // Низ парковки
    const bottomY = app.screen.height/3;

    // Общая ширина всех элементов (парковочных мест и отступов между ними)
    const totalWidth = appScreenWidth - ((PARKING_LINE - 1) * PADDING_BETWEEN_SPACES)

    //ширина 1 парк места
    const parkingWidth = totalWidth/PARKING_LINE;

    const textYellowX = parkingWidth * 2;
    const textYellowY =  bottomY - 72;

    const textRedX = (parkingWidth ) * 3;
    const textRedY =  bottomY - 72;

    sizeText['#d1191f'] = {
        x: textRedX,
        y: textRedY
    };

    sizeText['#ffc841'] = {
        x: textYellowX,
        y: textYellowY
    };
    
    const textRed = new Text({
        text: 'P',
        style: {
            fill: '#d1191f',
            fontSize: 72,
            fontFamily: 'Arial',
            align: 'center'
        }
    });

    const textYellow = new Text({
        text: 'P',
        style: {
            fill: '#ffc841',
            fontSize: 72,
            fontFamily: 'Arial',
            align: 'center'
        }
    });


    textYellow.x = textYellowX;
    textYellow.y = textYellowY;

    textRed.x = textRedX;
    textRed.y = textRedY;
    
    app.stage.addChild(textYellow);
    app.stage.addChild(textRed);
}
