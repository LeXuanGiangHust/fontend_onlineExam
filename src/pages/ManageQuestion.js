/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-pascal-case */
import { } from 'reactstrap';
import React from 'react';
import ManageQuestion_elm from '../elements/manage_question/ManageQuestion_elm';

import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';
import Question_Actions from '../actions/Question_Actions';

class ManageQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuestions: [],
      listFieldQuestions: [],
    };

    this.setupParam();

    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.submitListQuestion = this.submitListQuestion.bind(this);
  }

  setupParam() {
    Question_Actions.get({}).then((res) => {
      this.state.listQuestions = res.data.data;
      this.setState({});
      FieldQuestion_Actions.get({}).then((res1) => {
        this.state.listFieldQuestions = res1.data.data;
        this.setState({});
      })
    })
  }

  add(question) {
    Question_Actions.post(question).then((res) => {
      this.state.listQuestions.push(question);
      this.setState({});
    });
  }

  edit(question) {
    Question_Actions.patch(question).then((res) => {
      // this.setupParam();
    });
  }

  delete(question, index) {
    let conf = window.confirm('Do you want delete item?')
    if (conf) {
      Question_Actions.delete(question._id).then((res) => {
        console.log(res);
        this.state.listQuestions.splice(index, 1);
        this.setState({});
      })
    }
  }

  submitListQuestion(listQuestions) {
    Question_Actions.post(listQuestions).then((res) => {
      console.log(res);
    })
  }

  render() {
    return (
      <ManageQuestion_elm
        listQuestions={this.state.listQuestions}
        listFieldQuestions={this.state.listFieldQuestions}
        add={this.add}
        edit={this.edit}
        delete={this.delete}
        submitListQuestion={this.submitListQuestion}
      />
    );
  }
}

export default ManageQuestion;