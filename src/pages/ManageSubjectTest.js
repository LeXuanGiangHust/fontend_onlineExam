/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-pascal-case */
import { } from 'reactstrap';
import React from 'react';
import ManageSubjectTest_elm from '../elements/manage_subject_test/ManageSubjectTest_elm';
import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';
import SubjectTest_Actions from '../actions/SubjectTest_Actions';

class ManageSubjectTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listFieldQuestions: [],
      data: [],
    };
    // action
    this.setupParam();

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  setupParam() {
    SubjectTest_Actions.get({}).then((res) => {
      FieldQuestion_Actions.get({}).then((res1) => {
        this.state.data = res.data.data;
        this.state.listFieldQuestions = res1.data.data;
        this.setState({});
      })
    });
  }

  add(subjectTest) {
    SubjectTest_Actions.post(subjectTest).then((res) => {
      this.state.data.push(subjectTest);
      this.setState({});
    })
  }

  delete(value, index) {
    SubjectTest_Actions.delete(value._id).then((res) => {
      this.state.data.splice(index, 1);
      this.setState({});
    })
  }

  render() {
    return (
      <ManageSubjectTest_elm
        data={this.state.data}
        listFieldQuestions={this.state.listFieldQuestions}
        add={this.add}
        delete={this.delete}
      />
    );
  }
}

export default ManageSubjectTest;