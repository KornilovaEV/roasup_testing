import { AnimatedSprite, Container, Texture } from "pixi.js"

export class Car {
    constructor(){
        this._view = new Container();
        this._car = new AnimatedSprite([
            Texture.from('carRed')
        ]);

        this._view.addChild(this._car)
    };

    get view() {
        return this._view
    }
}