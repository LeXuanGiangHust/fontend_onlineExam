/* eslint-disable no-unused-vars */
import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.users}`

var User_Actions = {
  get(obj) {
    return action.get(link);
  },

  post(obj) {
    return action.post(link, obj);
  },

  patch(obj) {
    return action.patch(link, obj);
  },

  delete(obj) {
    return action.delete(link, obj);
  },

  login(username, password) {
    return action.post(`${SERVER_ADDRESS}/login`, {
      username: username,
      password: password
    });
  }
}

export default User_Actions;