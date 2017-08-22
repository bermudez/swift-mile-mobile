import {apiGateway} from '../config/params'
const API_BASE_URL = apiGateway.URL;

export postAppDataApiAsync() {
  let url = API_BASE_URL + '/' + 'clients/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.client;
    })
    .catch((error) => {
      console.error(error);
    });
};

export getAppDataApiAsync() {
  let url = API_BASE_URL + '/' + 'client/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.client;
    })
    .catch((error) => {
      console.error(error);
    });
};
