/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-pascal-case */
import { } from 'reactstrap';
import React from 'react';
import FieldQuestion_elm from '../elements/field-question/FieldQuestion_elm';
import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';

class FieldQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.setupParameter();
    this.delete = this.delete.bind(this);
    this.submit = this.submit.bind(this);
  }

  setupParameter() {
    // this.state.data = FieldQuestion_Actions.getAll();
    FieldQuestion_Actions.get({}).then((res) => {
      this.state.data = res.data.data;
      this.setState({});
    })
  }

  delete(id) {
    let conf = window.confirm('Are you sure?');
    if (conf) {
      FieldQuestion_Actions.delete(id).then((res) => {
        this.setupParameter();
      });
    }
  }

  submit(obj) {
    FieldQuestion_Actions.post(obj).then((res) => {
      this.setupParameter();
    })
  }

  render() {
    return (
      <div>
        <FieldQuestion_elm
          data={this.state.data}
          submit={this.submit}
          delete={this.delete}
        />
      </div>
    );
  }
}

export default FieldQuestion;