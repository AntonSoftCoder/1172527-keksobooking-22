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

const showLoadDataErrorAlert = () => {
  const node = document.querySelector('#error-server').content.querySelector('.error-server');
  node.textContent = Messages.LOAD_ERROR;
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

const addPopupClosingListener = (alertType, afterAlertClose) => {

  const closePopupByEscapeHandler = (evt) => {
    if (isEscEvent(evt)) {
      closePopupHandler();
    }
  };

  const closePopupHandler = () => {
    alertType.popupNode.removeEventListener('click', closePopupHandler);
    alertType.popupNode.removeEventListener('keyup', closePopupByEscapeHandler);
    alertType.popupNode.remove();
    clearTimeout(timeoutId);
    afterAlertClose && afterAlertClose();
  }

  const timeoutId = setTimeout(() => {
    closePopupHandler(timeoutId);
  }, 5000);
  alertType.popupNode.addEventListener('click', closePopupHandler);
  document.addEventListener('keyup', closePopupByEscapeHandler);
}

const onSuccess = (successMessage, afterAlertClose) => () => {
  showAlert(AlertType.SUCCESS, successMessage, afterAlertClose)();
}

export { AlertType, Messages, showLoadDataErrorAlert, showAlert, onSuccess };
