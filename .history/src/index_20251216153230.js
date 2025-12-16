import * as PIXI from 'pixi.js';

// Создаем приложение PixiJS
const app = new PIXI.Application({ width: 800, height: 600 });
document.getElementById("app").appendChild(app.view);

// Рисуем простой прямоугольник
const rectangle = new PIXI.Graphics();
rectangle.beginFill(0xffcc00); // Цвет заливки
rectangle.drawRect(50, 50, 100, 100); // Прямоугольник размером 100х100 пикселей
rectangle.endFill(); // Завершаем заливку
app.stage.addChild(rectangle); // Добавляем объект на сцену
