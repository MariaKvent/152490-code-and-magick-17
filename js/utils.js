'use strict';

(function () {
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.utils = {
    getRandomElement: getRandomElement
  };

})();
