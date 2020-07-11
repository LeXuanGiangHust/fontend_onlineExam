/* eslint-disable no-unused-vars */
import action from './Object_Action';
import { db_collection, SERVER_ADDRESS } from '../containers/constant/CONSTANT';
const link = `${SERVER_ADDRESS}/${db_collection.questions}`

var Question1_Actions = {
    get(obj) {
        return action.get(link, {
            params: { ...obj }
        });
    },
    Them(obj){
        return action.post(link, obj);
    },
    Xoa(obj){
        return action.delete(link, {
            ...obj
        })
    }
}

export default Question1_Actions;