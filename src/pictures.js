'use strict';
console.dir(pictures);
/*var picturesContainer = document.querySelector('.pictures');
document.forms[0].hidden = true;
var templateElement = document.querySelector('template');
var elementToClone;
if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('picture');
} else {
  elementToClone = templateElement.querySelector('picture');
}
var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('picture-stat picture-comments').textContent = data.comments;
  element.querySelector('picture-stat picture-likes').textContent = data.likes;
  container.appendChild('element');
  var contentImage = new Image();
  contentImage.onload(evt) {
    element.firstChild.src = 'evt.target.src';
    element.firstChild.width = '182';
    element.firstChild.height = '182';
  };
  contentImage.onerror(evt) {
    element.classList.add('picture-load-failure');
  };

  contentImage.scr = data.preview;
  return element;
};
pictures.forEach(function(picture) {
  getPictureElement(picture, picturesContainer);
});
document.forms[0].hidden = false;*/
