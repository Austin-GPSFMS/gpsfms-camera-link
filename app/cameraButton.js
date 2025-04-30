/**
 * The function is called whenever the Add-In button is clicked.
 *
 * @param {object} event - The event dispatched from the button click.
 * @param {object} api - The GeotabApi object for making calls to MyGeotab.
 * @param {object} state - The page state object allows access to URL, page navigation and global group filter.
 */
geotab.customButtons = geotab.customButtons || {};
geotab.customButtons.cameraSolutionsButton = (event, api, state) => {
  'use strict';

  const noVehiclesText = 'Select a vehicle first';
  const multipleVehiclesText = 'This button only works with one vehicle selected';

  event.preventDefault();

  const selectedDevice = (() => {
    let pageState = state.getState();
    return (pageState && pageState.id && pageState.id.length) ? pageState.id : null;
  })();

  const isMultiple = selectedDevice !== null && Array.isArray(selectedDevice);

  const messenger = (() => {
    let timer, mainContainer, textContainer, closeIcon;

    const add = (el, attrs) => { for (let k in attrs) el.setAttribute(k, attrs[k]); };
    const css = (el, styles) => { for (let k in styles) el.style[k] = styles[k]; };

    const create = (tag, attrs, styles, parent) => {
      const el = document.createElement(tag);
      if (attrs) add(el, attrs);
      if (styles) css(el, styles);
      if (parent) parent.appendChild(el);
      return el;
    };

    const destroy = () => {
      clearInterval(timer);
      if (closeIcon) closeIcon.removeEventListener('click', destroy, false);
      if (mainContainer?.parentNode) mainContainer.parentNode.removeChild(mainContainer);
    };

    const getMain = () => document.querySelector('#cameraSolutionsMessage');

    const createMain = () => {
      mainContainer = create('div', { id: 'cameraSolutionsMessage' }, {
        border: '1px solid #ffeb94',
        backgroundColor: '#fffcdd',
        color: '#222',
        margin: '0 auto',
        position: 'relative',
        width: '600px',
        zIndex: 10004,
        opacity: 0.95,
        textAlign: 'center',
        fontSize: '1.2em'
      }, document.body);

      mainContainer.destroy = destroy;

      textContainer = create('h2', null, { margin: '5px 0' }, mainContainer);
      closeIcon = create('span', null, {
        float: 'right',
        marginTop: '5px',
        fontSize: '18px',
        cursor: 'pointer'
      }, mainContainer);
      closeIcon.textContent = '×';
      closeIcon.addEventListener('click', destroy, false);
    };

    return {
      showMessage: (msg) => {
        mainContainer = getMain();
        if (!mainContainer) {
          createMain();
          timer = setInterval(destroy, 5000);
        }
        textContainer.textContent = msg;
      },
      destroy
    };
  })();

  if (selectedDevice && selectedDevice !== 'all' && !isMultiple) {
    messenger.destroy();
    window.open('https://www.gpsfms.com/geotab-camera-solutions', '_blank');
  } else {
    messenger.showMessage(isMultiple ? multipleVehiclesText : noVehiclesText);
  }
};
