/* eslint-disable react/no-direct-mutation-state */
import { ListGroupItem, Row, Col, Card, CardHeader, CardBody, Button, Input } from 'reactstrap';
import React from 'react';
import GroupExam_Actions from '../../actions/GroupExam_Actions';
import User_Actions from '../../actions/User_Actions';

class UserExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListExam: false,
      listExam: [],
      fieldQuestionIdADD: undefined,
    };

    this.change = this.change.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
    this.addSubject = this.addSubject.bind(this);
  }

  deleteSubject(id) {
    let conf = window.confirm('Are you sure?');
    if (conf) {
      this.props.deleteSubject(id);
      this.state.listExam = this.state.listExam.filter(e => e._id !== id);
      this.setState({});
    }
  }

  addSubject() {
    this.props.addSubject(this.state.fieldQuestionIdADD, this.props.item._id);
    GroupExam_Actions.add({
      fieldQuestionId: this.state.fieldQuestionIdADD,
      userId: this.props.item._id
    })
    this.setState({});
  }

  change() {
    // if (!this.state.isListExam) {
    //   let listExam = GroupExam_Actions.getList(this.props.item._id);
    //   let arrId = [];
    //   listExam.forEach((e, i) => arrId.push(e.fieldQuestionId));
    //   let arr_field = FieldQuestion_Actions.getListById(arrId);
    //   listExam.forEach((e, i) => {
    //     let temp = arr_field.find(e_field => e_field._id === e.fieldQuestionId);
    //     if (temp)
    //       e.name = temp.name;
    //   })
    //   this.state.listExam = listExam;
    // } else {
    //   this.state.listExam = [];
    // }

    // this.state.isListExam = !this.state.isListExam;
    // this.setState({});
  }

  render() {
    var item = this.props.item;
    if (this.state.isListExam) {
      return <Card>
        <CardHeader>
          <Row>
            <Col>{item.username}</Col>
            <Col className='text-right'>
              <Button color='link' onClick={this.change}>X</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Input type='select' onChange={(event) => {
                let temp = this.props.fieldQuestions.find(e => e.name === event.target.value);
                if (temp) {
                  this.state.fieldQuestionIdADD = temp._id;
                  this.setState({});
                }
              }}>
                {
                  this.props.fieldQuestions.map((e, i) => {
                    return <option key={e._id}>{e.name}</option>
                  })
                }
              </Input>
            </Col>
            <Col>
              <Button color='success' onClick={this.addSubject}>+ ADD NEW SUBJECT</Button>
            </Col>
          </Row>
          <table>
            {
              this.state.listExam.map((e, i) => <tr key={i}>
                <td>{e.name}</td>
                <td>&emsp;</td>
                <td>{e.score ? e.score : 'null'}</td>
                <td>
                  <Button color='link' onClick={() => this.deleteSubject(e._id)}>
                    <i className='cui-trash'></i>
                  </Button>
                </td>
              </tr>
              )
            }
          </table>
        </CardBody>
      </Card>
    }

    return (
      <ListGroupItem action tag='button' onClick={this.change}>
        <Row>
          <Col sm='1'><b>{this.props.stt}</b></Col>
          <Col><p>{item.username}</p></Col>
          <Col><p>{item.email}</p></Col>
          <Col><p>{item.name}</p></Col>
          <Col><p>{item.role}</p></Col>
          {
            this.props.role === 'admin' &&
            <Col>
              <Button onClick={() => {
                User_Actions.patch({
                  _id: item._id,
                  role: "teacher"
                }).then((res) => {
                  if (res.data.message)
                    alert("OK");
                })
              }}>Set Role Teacher</Button>{' '}
              <Button color='danger' onClick={() => {
                User_Actions.delete({
                  _id: item._id
                }).then((res) => {
                  if (res.data.message) {
                    this.props.delete(item, this.props.stt);
                    alert("OK");
                  }
                })
              }}><i className='cui-trash'></i></Button>
            </Col>
          }
          {/* <Col><p><b>Total: </b>{item.total | 0}</p></Col> */}
          {/* <Col><p><b>Complete: </b>{item.complete | 0}</p></Col> */}
        </Row>
      </ListGroupItem>
    );
  }
}

export default UserExam;