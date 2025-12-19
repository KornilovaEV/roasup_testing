import { gameState } from '../state';

export function sizeCalculationsParking() {
  const {
    width,
    height,
    parking: { parkingLine },
  } = gameState;

  // расстояние между парковками
  const paddingBetweeenSpace = (width / parkingLine) * 0.15;
  // Общая ширина всех элементов (парковочных мест и отступов между ними)
  const totalWidthParking = width - (parkingLine - 1) * paddingBetweeenSpace;

  //ширина 1 парк места
  const parkingWidth = totalWidthParking / parkingLine;
  //ширина 1 парк места с отступом
  const parkingWithPaddingWidth = width / parkingLine;

  // Низ парковки
  const bottomParking = height / 3;

  gameState.parking.paddingBetweeenSpace = Math.floor(paddingBetweeenSpace);
  gameState.parking.parkingWithPaddingWidth = Math.floor(parkingWithPaddingWidth);
  gameState.parking.totalWidthParking = Math.floor(totalWidthParking);
  gameState.parking.parkingWidth = Math.floor(parkingWidth);
  gameState.parking.bottomParking = Math.floor(bottomParking);
}
