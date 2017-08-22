import {apiGateway} from '../config/params'
const API_BASE_URL = apiGateway.URL;

export getUserDataApiAsync() {
  let url = API_BASE_URL + '/' + 'users/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.user;
    })
    .catch((error) => {
      console.error(error);
    });
};

export putUserDataApiAsync(user) {
  let url = API_BASE_URL + '/' + 'users/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.user;
    })
    .catch((error) => {
      console.error(error);
    });
};

export postUserDataApiAsync(user) {
  let url = API_BASE_URL + '/' + 'users/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.user;
    })
    .catch((error) => {
      console.error(error);
    });
};
