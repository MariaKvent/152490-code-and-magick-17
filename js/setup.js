'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

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


  document.querySelector('.setup-similar').classList.remove('hidden');

})();
