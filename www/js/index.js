/* Script File */

/*global console: true */

(function () {
  'use strict';
  var dragElement, preventedFirstMove, startX, startY, deltaX, deltaY, x, y;
  
  dragElement = document.getElementById('dragElement');
  x = 0;
  y = 0;
  
  function moveDragElement() {
    console.log('deltaX', deltaX, 'deltaY', deltaY);
    dragElement.style.marginLeft = String(x + deltaX) + 'px';
    dragElement.style.marginTop = String(y + deltaY) + 'px';
  }
  
  function calculateDelta(event) {
    deltaX = event.changedTouches[0].pageX - startX;
    deltaY = event.changedTouches[0].pageY - startY;
  }
  
  function onTouchStart(event) {
    console.log(event.type, event);
    preventedFirstMove = false;
    startX = event.changedTouches[0].pageX;
    startY = event.changedTouches[0].pageY;
  }
  
  function onTouchMove(event) {
    console.log(event.type, event);
    if (!preventedFirstMove) {
      // To keep the touchmove events coming in, we need to prevent default on the first move.
      // Otherwise, the browser takes over and performs native scrolling.
      event.preventDefault();
      preventedFirstMove = true;
    }
    calculateDelta(event);
    moveDragElement();
  }
  
  function onTouchRelease(event) {
    console.log(event.type, event);
    calculateDelta(event);
    moveDragElement();
    x = x + deltaX;
    y = y + deltaY;
  }
  
  function initialize() {
    dragElement.addEventListener('touchstart', onTouchStart, false);
    dragElement.addEventListener('touchmove', onTouchMove, false);
    dragElement.addEventListener('touchend', onTouchRelease, false);
    dragElement.addEventListener('touchcancel', onTouchRelease, false);
  }
  
  function onDeviceReady(event) {
    console.log('onDeviceReady', event);
    initialize();
  }
  
  document.addEventListener('deviceready', onDeviceReady, false);
}());