'use strict';
var picturesContainer = document.querySelector('.pictures');
document.forms[0].hidden = true;
var templateElement = document.querySelector('.template');
var elementToClone;
if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}
var getPictureElement;
getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.picture-stats').textContent = data.date;
  element.querySelector('.picture-stat picture-comments').textContent = data.comments;
  element.querySelector('.picture-stat picture-likes').textContent = data.likes;
  container.appendChild('element');
  var contentImage = new Image();
  contentImage.onload = function(evt) {
    element.firstChild.src = evt.target.url;
    element.firstChild.width = '182px';
    element.firstChild.height = '182px';
  };
  contentImage.onerror = function() {
    element.classList.add('.picture-load-failure');
  };
  contentImage.src = data.url;
  return element;
};
window.pictures.forEach(function(picture) {
  getPictureElement(picture, picturesContainer);
});
document.forms[0].hidden = false;
