const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const { statusText, status } = response;
  throw new Error (`${status} -  ${statusText}`);
}

const loadData = (serverUrl, onSuccess, onError) => {
  return fetch(serverUrl)
    .then(checkStatus)
    .then(response => response.json())
    .then(onSuccess)
    .catch(onError);
}

const sendData = (serverUrl, onSuccess, onError) => (formData) => {
  return fetch(serverUrl, {
    method: 'POST',
    body: formData,
  })
    .then(checkStatus)
    .then(onSuccess)
    .catch(onError);
}

export { loadData, sendData };
