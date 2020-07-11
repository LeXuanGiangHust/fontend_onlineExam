import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.subjects}`

var data = [];
var SubjectTest_Actions = {
  get(obj) {
    return action.get(link, obj);
  },

  post(obj) {
    return action.post(link, obj);
  },

  delete(id) {
    return action.delete(link, { _id: id });
  },

  getAll() {
    return data;
  },
  randomExam(fieldId) {
    let result = undefined;
    data.forEach(e => {
      // eslint-disable-next-line
      if (e.fieldQuestionId == fieldId) {
        result = e;
      }
    });
    return result;
  },
}

export default SubjectTest_Actions;