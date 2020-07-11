import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.feedbacks}`;

var Feedback_Actions = {
  get(obj) {
    return action.get(link, obj);
  },

  post(obj) {
    return action.post(link, obj);
  },

  delete(id) {
    return action.delete(link, { _id: id });
  },
}

export default Feedback_Actions;