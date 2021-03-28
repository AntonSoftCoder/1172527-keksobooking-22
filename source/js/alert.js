import { isEscEvent } from './utils.js';

const Messages = {
  LOAD_SUCCESS: 'Данные загружены правильно',
  LOAD_ERROR: 'Ошибка загрузки данных',
  SEND_SUCCESS: 'Объявление размещено успешно!',
  SEND_ERROR: 'Ошибка размещения объявления',
}

const AlertNode = {
  ERROR: document.querySelector('#error').content.querySelector('.error'),
  SUCCESS: document.querySelector('#success').content.querySelector('.success'),
}

const AlertType = {
  SUCCESS: {
    popupNode: AlertNode.SUCCESS.cloneNode(true),
    messageSelector: '.success__message',
    color: 'green',
  },
  ERROR: {
    popupNode: AlertNode.ERROR.cloneNode(true),
    messageSelector: '.error__message',
    color: 'red',
  },
}

const showLoadDataAlert = (message) => () => {
  const node = document.createElement('div');
  node.style.zIndex = 1000;
  node.style.position = 'fixed';
  node.style.left = 0;
  node.style.top = 0;
  node.style.right = 0;
  node.style.padding = '10px 3px';
  node.style.fontSize = '30px';
  node.style.textAlign = 'center';
  node.style.backgroundColor = 'red';

  node.textContent = message;

  document.body.append(node);

  setTimeout(() => {
    node.remove();
  }, 5000);
}

const showAlert = (alertType, message, afterAlertClose) => () => {
  alertType.popupNode.style.zIndex = 1000;
  const messageNode = alertType.popupNode.querySelector(alertType.messageSelector);
  messageNode.style.backgroundColor = alertType.color;
  messageNode.textContent = message;
  document.body.append(alertType.popupNode);
  addPopupClosingListener(alertType, afterAlertClose);
}

const closePopupByClickHandler = (alertType, timeoutId, afterAlertClose) => () => {
  closePopup(alertType, timeoutId, afterAlertClose);
};

const closePopupByEscapeHandler = (alertType, timeoutId, afterAlertClose) => (evt) => {
  if (isEscEvent(evt)) {
    closePopup(alertType, timeoutId, afterAlertClose);
  }
};

const closePopup = (alertType, timeoutId, afterAlertClose) => {
  alertType.popupNode.removeEventListener('click', closePopupByClickHandler(alertType, timeoutId, afterAlertClose));
  alertType.popupNode.removeEventListener('keyup', closePopupByEscapeHandler(alertType, timeoutId, afterAlertClose));
  alertType.popupNode.remove();
  clearTimeout(timeoutId);
  afterAlertClose && afterAlertClose();
}

const addPopupClosingListener = (alertType, afterAlertClose) => {
  const timeoutId = setTimeout(() => {
    closePopup(alertType, timeoutId, afterAlertClose);
  }, 5000);
  alertType.popupNode.addEventListener('click', closePopupByClickHandler(alertType, timeoutId, afterAlertClose));
  document.addEventListener('keyup', closePopupByEscapeHandler(alertType, timeoutId, afterAlertClose));
}

const onSuccess = (successMessage, afterAlertClose) => () => {
  showAlert(AlertType.SUCCESS, successMessage, afterAlertClose)();
}

export { AlertType, Messages, showLoadDataAlert, showAlert, onSuccess };
