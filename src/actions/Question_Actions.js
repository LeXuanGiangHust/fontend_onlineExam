/* eslint-disable no-unused-vars */
import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.questions}`

var Question_Actions = {
  get(obj) {
    return action.get(link, {
      params: { ...obj }
    });
  },

  post(obj) {
    return action.post(link, obj);
  },

  patch(obj) {
    return action.patch(link, obj);
  },

  delete(id) {
    return action.delete(link, { _id: id });
  },

  random(level, fieldId) {
    return action.post(`${SERVER_ADDRESS}/random-question`, {
      level: level,
      fieldId: fieldId
    });
  },

  randomTest(level, fieldId) {
    return action.post(`${SERVER_ADDRESS}/random-test`, {
      fieldId: fieldId,
      level: level
    });
  }
}

export default Question_Actions;