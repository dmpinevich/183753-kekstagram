'use strict';
var picturesContainer = document.querySelector('.pictures');
var filtersContainer = document.querySelector('.filters');
filtersContainer.classList.add('hidden');
var templateElement = document.querySelector('template');
var elementToClone;
if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}
var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);
  var contentImage = new Image();
  contentImage.onload = function() {
    var imageElement = element.querySelector('img');
    imageElement.src = data.url;
    imageElement.width = 182;
    imageElement.height = 182;
  };
  contentImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };
  contentImage.src = data.url;
  return element;
};
window.pictures.forEach(function(picture) {
  getPictureElement(picture, picturesContainer);
});
filtersContainer.classList.remove('hidden');
