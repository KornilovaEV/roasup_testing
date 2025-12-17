import { Text } from "pixi.js";
import { PADDING_BETWEEN_SPACES, PARKING_LINE } from "./constants";

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

    const textYellow = new Text({
        text: 'P',
        style: {
            fill: '#ffc841',
            fontSize: 72,
            fontFamily: 'Arial',
            align: 'center'
        }
    });

    // Общая ширина всех элементов (парковочных мест и отступов между ними)
    const totalWidth = app.screen.width - ((PARKING_LINE - 1) * PADDING_BETWEEN_SPACES)

    //ширина 1 парк места
    const parkingWidth = totalWidth/PARKING_LINE;

    textYellow.x = parkingWidth * 2;
    textYellow.y =  100;

    textRed.x = (parkingWidth ) * 3;
    textRed.y =  100;
    
    app.stage.addChild(textYellow);
    app.stage.addChild(textRed);
}

