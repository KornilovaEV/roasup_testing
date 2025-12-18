import { Text } from "pixi.js";
import { PADDING_BETWEEN_SPACES, PARKING_LINE } from "./constants";


export function addSpaceP(app, sizeText) {
    const appScreenWidth = app.screen.width;

    // Общая ширина всех элементов (парковочных мест и отступов между ними)
    const totalWidth = appScreenWidth - ((PARKING_LINE - 1) * PADDING_BETWEEN_SPACES)

    //ширина 1 парк места
    const parkingWidth = totalWidth/PARKING_LINE;

    const textYellowX = parkingWidth * 2;
    const textYellowY =  100;

    const textRedX = (parkingWidth ) * 3;
    const textRedY =  100;

    sizeText.textYellowX = textYellowX;
    sizeText.textYellowY = textYellowY;
    sizeText.textRedX = textRedX;
    sizeText.textRedY = textRedY;
    

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
