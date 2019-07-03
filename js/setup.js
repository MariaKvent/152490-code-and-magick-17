'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NUMBER = 4;

document.querySelector('.setup').classList.remove('hidden');

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getSimilarWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_NUMBER; i++) {
    wizards.push(
        {
          name: WIZARD_NAMES[getRandomNumber(0, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomNumber(0, WIZARD_SURNAMES.length)],
          coatColor: COAT_COLOR[getRandomNumber(0, COAT_COLOR.length)],
          eyesColor: EYES_COLOR[getRandomNumber(0, EYES_COLOR.length)]
        });
  }
  return wizards;
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

insertWizardTemplate(getSimilarWizards(WIZARD_NUMBER));

document.querySelector('.setup-similar').classList.remove('hidden');
