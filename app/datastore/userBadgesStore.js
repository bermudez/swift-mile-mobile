import {apiGateway} from '../config/params'
const API_BASE_URL = apiGateway.URL;

export getUserBadgesDataApiAsync() {
  let url = API_BASE_URL + '/' + 'user-badges/';
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.badges;
    })
    .catch((error) => {
      console.error(error);
    });
};

