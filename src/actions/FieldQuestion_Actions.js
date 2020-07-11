/* eslint-disable no-unused-vars */
import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.fieldQuestions}`

var data = [];

var FieldQuestion_Actions = {
  get(obj) {
    return action.get(link, obj);
  },

  post(obj) {
    return action.post(link, obj);
  },

  delete(id) {
    return action.delete(link, { _id: id });
  },

  getListById(arr) {
    let _arr = [];
    arr.forEach(e => {
      let temp = data.find(t => t._id === e)
      if (temp) {
        _arr.push(temp);
      }
    });
    return _arr;
  }
}

export default FieldQuestion_Actions;