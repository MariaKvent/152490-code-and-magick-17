'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария', 'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var WIZARD_NUMBER = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var inputFireballColor = document.querySelector('input[name="fireball-color"]');

var dialogHandler = setup.querySelector('.upload');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getSimilarWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_NUMBER; i++) {
    wizards.push(
        {
          name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
          coatColor: getRandomElement(COAT_COLOR),
          eyesColor: getRandomElement(EYES_COLOR)
        });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var insertWizardTemplate = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

};

var openPopup = function () { // функция открытия поп-ап
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) { // закрытие поп-ап при нажатии ESC
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () { // функция закрытия
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = '';
  setup.style.left = '';
};

setupOpen.addEventListener('click', function () { // открытие окна
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) { // открытие окна с помощью Enter
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () { // закрытие окна
  closePopup();
});

// убирает закрытие при фокусе на имени
setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

// возвращает закрытие при выведении имени из фокуса
setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});


setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) { // закрытие окна с помощью Enter
    closePopup();
  }
});

var onWizardCoatClick = function () { // функция изменения цвета мантии
  var getRandomColor = getRandomElement(COAT_COLOR);
  wizardCoat.style.fill = getRandomColor;
  inputCoatColor.value = getRandomColor;
};

var onWizardEyesClick = function () { // функция изменения цвета глаз
  var getRandomColor = getRandomElement(EYES_COLOR);
  wizardEyes.style.fill = getRandomColor;
  inputEyesColor.value = getRandomColor;
};

var onWizardFireballClick = function () { // функция изменения цвета файербола
  var getRandomColor = getRandomElement(FIREBALL_COLOR);
  wizardFireball.style.background = getRandomColor;
  inputFireballColor.value = getRandomColor;
};

wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
wizardFireball.addEventListener('click', onWizardFireballClick);

insertWizardTemplate(getSimilarWizards(WIZARD_NUMBER));

document.querySelector('.setup-similar').classList.remove('hidden');

// перемещение окна

var startCoords = {
  x: 0,
  y: 0
};

var dragged;

// функция при нажатии на кнопку мыши
var onMouseDown = function (evtDown) {
  evtDown.preventDefault();
  dragged = false;
  startCoords = {
    x: evtDown.clientX,
    y: evtDown.clientY
  };
  return startCoords;
};

// функция при перемещении мыши
var onMouseMove = function (evtMove) {
  evtMove.preventDefault();
  dragged = true;

  var shift = {
    x: startCoords.x - evtMove.clientX,
    y: startCoords.y - evtMove.clientY
  };

  startCoords = {
    x: evtMove.clientX,
    y: evtMove.clientY
  };

  setup.style.top = (setup.offsetTop - shift.y) + 'px';
  setup.style.left = (setup.offsetLeft - shift.x) + 'px';
};

// функция при отпускании кнопки мыши
var onMouseUp = function (evtUp) {
  evtUp.preventDefault();

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  if (dragged) {
    var onClickPreventDefault = function (evtOn) {
      evtOn.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    };
    dialogHandler.addEventListener('click', onClickPreventDefault);
  }
};

dialogHandler.addEventListener('mousedown', function (evtDown) {
  evtDown.preventDefault();
  onMouseDown(evtDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
