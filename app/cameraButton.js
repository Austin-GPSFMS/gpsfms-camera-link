"use strict";

geotab.customButtons = geotab.customButtons || {};
geotab.customButtons.cameraSolutionsButton = function(event, api, state) {
  event.preventDefault();
  window.open('https://info.gpsfms.com/gpsfms-ai-safety-cameras', '_blank');
};
