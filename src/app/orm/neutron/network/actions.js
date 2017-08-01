import { combineURL, getToken } from 'app/commons/common';

const getNetworksSuccess = (networks) => ({
  type: 'GET_NETWORKS_SUCCESS',
  networks
});

const getNetworksRequest = () => ({
  type: 'GET_NETWORKS_REQUEST',
});

export const getNetworks = () => {
  return (dispatch) => {
    dispatch(getNetworksRequest());
    let scopedToken = getToken();
    let url = combineURL('getNetworks');
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then(res => {
      res.json().then(resBody => {
        dispatch(getNetworksSuccess(resBody.networks));
      }).catch(err => {
        throw err;
      })
    }).catch(err => {

    })
  }
};
