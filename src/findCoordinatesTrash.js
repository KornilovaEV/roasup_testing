export function findCoordinatesTrash(arr1, arr2) {
    const tolerance = 10; // Погрешность в единицах измерения, т.к. линия шириной 10
    
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            // Проверяем попадание точек в диапазон с погрешностью
            if (
                Math.abs(arr1[i].x - arr2[j].x) <= tolerance &&
                Math.abs(arr1[i].y - arr2[j].y) <= tolerance
            ) {
                return [i + 1, j + 1]; // Возврат первого подходящего элемента
            }
        }
    }
    return null; // Если совпадений не нашли
}