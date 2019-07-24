'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var GAP_TEXT = 30;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_GAT = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var getOtherColumnsColor = function () {
    var seturation = Math.floor(Math.random() * 100);
    return seturation;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = '16px Mono';
    ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP_TEXT, CLOUD_Y + GAP_TEXT);
    ctx.fillText('Список результатов:', CLOUD_X + GAP_TEXT, CLOUD_Y + GAP_TEXT + 2 * GAP);

    var maxTime = getMaxElement(times);
    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_TEXT + i * (BAR_WIDTH + BAR_GAT), CLOUD_HEIGHT - (BAR_HEIGHT * times[i] / maxTime) - 1.2 * GAP_TEXT);
      ctx.fillText(names[i], CLOUD_X + GAP_TEXT + i * (BAR_WIDTH + BAR_GAT), CLOUD_HEIGHT);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + getOtherColumnsColor() + '%, 50%)';
      }
      ctx.fillRect(CLOUD_X + GAP_TEXT + i * (BAR_WIDTH + BAR_GAT), CLOUD_HEIGHT - GAP_TEXT, BAR_WIDTH, -(BAR_HEIGHT * times[i] / maxTime));
    }
  };

})();
