'use strict';

(function () {
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  var onWizardCoatClick = function () { // функция изменения цвета мантии
    var getRandomColor = window.utils.getRandomElement(window.data.COAT_COLOR);
    wizardCoat.style.fill = getRandomColor;
    inputCoatColor.value = getRandomColor;
  };

  var onWizardEyesClick = function () { // функция изменения цвета глаз
    var getRandomColor = window.utils.getRandomElement(window.data.EYES_COLOR);
    wizardEyes.style.fill = getRandomColor;
    inputEyesColor.value = getRandomColor;
  };

  var onWizardFireballClick = function () { // функция изменения цвета файербола
    var getRandomColor = window.utils.getRandomElement(window.data.FIREBALL_COLOR);
    wizardFireball.style.background = getRandomColor;
    inputFireballColor.value = getRandomColor;
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);

})();
