'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');

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

})();
