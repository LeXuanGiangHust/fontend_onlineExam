import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.groupExams}`

var GroupExam_Actions = {
  get(obj) {
    return action.get(link);
  },

  post(obj) {
    return action.post(link, obj);
  },

  patch(obj) {
    return action.patch(link, obj);
  },
}

export default GroupExam_Actions;