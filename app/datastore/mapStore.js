import {apiGateway} from '../config/params'
const API_BASE_URL = apiGateway.URL;

export getMapDataApiAsync() {
  let url = API_BASE_URL + '/' + 'clusters/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.map;
    })
    .catch((error) => {
      console.error(error);
    });
};
