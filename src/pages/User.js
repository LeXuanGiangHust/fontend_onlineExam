/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-pascal-case */
import { } from 'reactstrap';
import React from 'react';
import User_elm from '../elements/user/User_elm';

import User_Actions from '../actions/User_Actions';
import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fieldQuestions: [],
    };

    this.setupParameters();

    this.deleteSubject = this.deleteSubject.bind(this);
    this.addSubject = this.addSubject.bind(this);
  }

  setupParameters() {
    User_Actions.get({}).then((res) => {
      this.state.data = res.data.data;
      // this.state.fieldQuestions = FieldQuestion_Actions.getAll();
      this.setState({});
    })
  }

  deleteSubject(id) {
    // call api
    // not update state
    console.log(id);
  }

  addSubject(fieldQuestionId, userId) {
    console.log(fieldQuestionId);
    console.log(userId);
    this.setState({});
  }

  render() {
    return (
      <div>
        <h4>User</h4>
        <hr />
        <User_elm
          data={this.state.data}
          fieldQuestions={this.state.fieldQuestions}
          deleteSubject={this.deleteSubject}
          addSubject={this.addSubject}
          role={this.props.authentication.user.role}
          delete={(item, index) => {
            this.state.data = this.state.data.filter(e => e._id !== item._id);
            this.setState({});
          }}
        />
      </div>
    );
  }
}

export default User;