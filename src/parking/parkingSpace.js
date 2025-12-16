import { Graphics } from 'pixi.js';

export class ParkingSpace extends Graphics {
  constructor(xPosition) {
    super(); // Вызываем конструктор родительского класса Graphics
    
    this.x = xPosition; // Устанавливаем положение относительно оси X


    // Рисуем левый прямоугольник и линию сверху
    this.rect(xPosition + 10, 0, 20, 150)
      .rect(xPosition, 150, 40, 10).fill(0xFFFFFF);

  }
}