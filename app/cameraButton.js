"use strict";

geotab.customButtons = geotab.customButtons || {};
geotab.customButtons.cameraSolutionsButton = function(event, api, state) {
  event.preventDefault();
  window.open('https://www.gpsfms.com/geotab-camera-solutions', '_blank');
};
