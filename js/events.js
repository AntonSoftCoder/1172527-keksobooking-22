export const synchronizeCheckInOutTime = () => {
  const checkinTime = document.querySelector('#timein');
  const checkoutTime = document.querySelector('#timeout');

  checkinTime.addEventListener('change', (evt) => {
    checkoutTime.value = evt.target.value;
  });

  checkoutTime.addEventListener('change', (evt) => {
    checkinTime.value = evt.target.value;
  });
}
