
function getMessage(a,b) {
  switch (typeof a) {
    case 'boolean':
      if (a) {
        return 'Переданное GIF-изображение анимировано и содержит [' + b + '] кадров';
      }
      else {
        return 'Переданное GIF-изображение не анимировано';
      }
    case 'number' :
      return 'Переданное SVG-изображение содержит [' + a + '] объектов и [' + (b * 4) + '] атрибутов';

    case 'object' :
      if (Array.isArray(a)) {
        if (Array.isArray(b)) {
          for (i = 0; i < a.length; i++) {
            square = 0;
            square += a[i] * b[i];
          }
          return 'Общая площадь артефактов сжатия: [' + square + '] пикселей';
        }
        else {
          var sum = 0;
          for (i = 0; i < a.length; i++) {
            sum += a[i];
          }

          return 'Количество красных точек во всех строчках изображения: [' + sum + ']';
        }
      }

  }



}
