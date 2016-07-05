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
var PICTURES_LOAD_URL = 'http://o0.github.io/assets/json/pictures.json';
var FOUR_DAY_MS = 345600000;
var loadedPictures = [];
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
var getPictures = function(callback) {
  var xhr = new XMLHttpRequest();
  picturesContainer.classList.add('pictures-loading');
  xhr.onload = function(evt) {
    picturesContainer.classList.remove('pictures-loading');
    loadedPictures = JSON.parse(evt.target.response);
    callback(loadedPictures);
  };
  xhr.onerror = function() {
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.add('picture-load-failure');
  };
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.add('picture-load-failure');
  };
  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.send();
};
var renderPictures = function(pictures) {
  picturesContainer.innerHTML = '';
  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};
var getFilteredPictures = function(pictures, filter) {
  var picturesToFilter = pictures.slice(0);
  var filteredPictures;
  switch (filter) {
    case 'filter-popular': filteredPictures = picturesToFilter;
      break;
    case 'filter-new': filteredPictures = picturesToFilter.filter(function(picture) {
      return (Date.now() - new Date(picture.date).valueOf()) < FOUR_DAY_MS;
    }).sort(function(a, b) {
      return new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds();
    });
      break;
    case 'filter-discussed': filteredPictures = picturesToFilter.sort(function(a, b) {
      return a.comments - b.comments;
    });
      break;
  }
  if(filteredPictures.length === 0) {
    picturesContainer.innerHTML = 'Ни один элемент из списка не подходит под выбранные критерии';
  }
  return filteredPictures;
};
var setFilterEnabled = function(filter) {
  var filteredPictures = getFilteredPictures(loadedPictures, filter);
  renderPictures(filteredPictures);
  var filterToActive = document.getElementById(filter);
  filterToActive.checked = true;
};
var setFiltrationEnabled = function() {
  var filters = filtersContainer.querySelectorAll('.filters-radio');
  for (var i = 0; i < filters.length; i++) {
    filters[i].checked = false;
    filters[i].onclick = function(evt) {
      setFilterEnabled(evt.target.id);
    };
  }
};
getPictures(function(pictures) {
  setFiltrationEnabled();
  renderPictures(pictures);
});
filtersContainer.classList.remove('hidden');
filtersContainer.querySelector('#filter-popular').checked = true;
