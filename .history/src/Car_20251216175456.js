import { Container } from "pixi.js"

export class Car {
    constructor(){
        this._view = new Container 
    };

    get view() {
        return this._view
    }
}