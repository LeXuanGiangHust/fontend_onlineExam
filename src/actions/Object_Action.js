/* eslint-disable no-unused-vars */
import axios from 'axios';

var Action = {
  get(link, obj) {
    return axios.get(link, obj);
  },

  post(link, obj) {
    return axios({
      method: 'POST',
      url: link,
      data: obj
    });
  },

  patch(link, obj) {
    return axios({
      method: 'PATCH',
      url: link,
      data: obj
    })
  },

  delete(link, obj) {
    return axios({
      method: 'DELETE',
      url: link,
      data: obj
    })
  }
}

export default Action;