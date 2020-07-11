/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-pascal-case */
import { Row, Form, Container, Input, Button, Card, CardBody, Col } from 'reactstrap';
import React from 'react';
import Exam_elm from '../elements/exam/Exam_elm';
import Test from '../elements/exam/Test';

import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';
import SubjectTest_Actions from '../actions/SubjectTest_Actions';
import Question_Actions from '../actions/Question_Actions';
import GroupExam_Actions from '../actions/GroupExam_Actions';

import Util from '../Util';

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTest: false,
      test: {},
      data: [],
      process: {},
      history: [],
      isShowHistory: false
    };

    this.getList();

    this.toggleTest = this.toggleTest.bind(this);
    this.submit = this.submit.bind(this);
    this.submitExpired = this.submitExpired.bind(this);
    this.showHistory = this.showHistory.bind(this);
  }

  getList(userId) {
    SubjectTest_Actions.get({}).then((res) => {
      FieldQuestion_Actions.get({}).then((res1) => {
        res.data.data.forEach((e, i) => {
          let temp = res1.data.data.find(e1 => e1._id === e.fieldQuestionId);
          if (temp) {
            e.name = temp.name;
            this.state.data.push(e);
          }
        });
        this.setState({});
      });
    });
  }

  toggleTest(fieldId) {
    GroupExam_Actions.get({
      userId: this.props.authentication.user._id,
      fieldQuestionId: fieldId
    }).then((res) => {
      if (res.data.data)
        var data_res_user = res.data.data.find(e => e.userId === this.props.authentication.user._id);
      if (!data_res_user) {
        alert('You must to register subject');
        return;
      }
      if (data_res_user.score != undefined) {
        alert('Score : ' + res.data.data[0].score);
        this.state.history = res.data.data[0].history;
        this.showHistory();
        return;
      }

      SubjectTest_Actions.get({}).then((res1) => {
        if (res1.data.data && res1.data.data.length) {
          var subjects1 = [];
          var _timeLive = 0;
          for (let index = 0; index < res1.data.data.length; index++) {
            if (res1.data.data[index]._id === fieldId) {
              subjects1 = res1.data.data[index].listQuestions;
              _timeLive = res1.data.data[index].timeLive;
              break;
            }
          }
          var listQuestions = [];
          Question_Actions.get({}).then((res2) => {
            if (res2.data.data) {
              res2.data.data.forEach((e2, i2) => {
                let t2 = subjects1.find(x => x === e2._id);
                if (t2) {
                  listQuestions.push(e2);
                }
              });
              this.state.test = {
                listQuestions: Util.shuffle(listQuestions),
                timeLive: _timeLive
              }

              this.state.process = {
                userId: this.props.authentication.user._id,
                fieldQuestionId: fieldId,
                _id: res.data.data[0]._id
              }
              this.state.isTest = true;
              this.setState({});
            }
          });
        }
      })
    })
  }

  submit(event) {
    // event.preventDefault();
    let conf = window.confirm('Do you want submit test?');
    if (conf) {
      var score = Util.resultExam(this.state.test.listQuestions);
      alert(score);
      if (this.state.process.userId && this.state.process.fieldQuestionId) {
        GroupExam_Actions.patch({
          ...this.state.process,
          score: score,
          history: this.state.test.listQuestions
        }).then((res) => {
          this.state.history = this.state.test.listQuestions;
          this.showHistory();
        })
      }
    }
  }

  submitExpired(event) {
    // event.preventDefault();
    var score = Util.resultExam(this.state.test.listQuestions);
    alert(score);
    if (this.state.process.userId && this.state.process.fieldQuestionId) {
      GroupExam_Actions.patch({
        ...this.state.process,
        score: score
      }).then((res) => {
        // window.location.reload();
        this.state.history = this.state.test.listQuestions;
        this.showHistory();
      })
    }
  }

  showHistory() {
    this.state.isShowHistory = !this.state.isShowHistory;
    this.setState({});
  }

  render() {
    if (this.state.isShowHistory) {
      return (
        <div>
          <Row className='text-center'>
            <Container>
              <Button onClick={this.showHistory}>Back</Button>
            </Container>
          </Row>
          <br />
          {
            this.state.history.map((e, i) => {
              return (
                <Card key={i}>
                  <CardBody>
                    <Row><p><b>{i + 1}. </b> {e.content}</p></Row>
                    <Row>
                      <Col>
                        {
                          Object.keys(e.listAnswers).map((_k, _i) => {
                            let answer = false;
                            let _answer = false;
                            let _color = 'black';
                            if (e.answers) {
                              let a1 = e.answers.find(a => a == _k);
                              if (a1)
                                answer = true;
                            }
                            if (e.answerTest) {
                              let a1 = e.answerTest.find(a => a == _k);
                              if (a1)
                                _answer = true;
                            }
                            if (answer && _answer)
                              _color = 'green';
                            if (!answer && _answer)
                              _color = 'yellow';
                            if (answer && !_answer)
                              _color = 'red';

                            return (
                              <Row>
                                <p style={{ color: _color }}><b>{_k}. </b> {e.listAnswers[_k]}</p>
                                <br />
                              </Row>
                            )
                          })
                        }
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              );
            })
          }
        </div>
      );
    }

    if (this.state.isTest) {
      return <Form onSubmit={this.submitExpired}>
        <Test
          test={this.state.test}
          submit={this.submit}
        />
      </Form>;
    }

    return (
      <div>
        <table>
          <tr>
            <td>Register :</td>
            <td><Input id='idFieldQuestionRegister' /></td>
            <td><Button onClick={() => {
              var fieldId = document.getElementById('idFieldQuestionRegister').value;
              GroupExam_Actions.post({
                userId: this.props.authentication.user._id,
                fieldQuestionId: fieldId
              }).then((res) => {
                alert('OK');
              })
            }}>OK</Button></td>
          </tr>
        </table>
        <Row className='text-center'>
          <Container>
            <h3>List of your exam</h3>
          </Container>
        </Row>
        <Row>
          <Exam_elm
            enablePrint={this.props.authentication.user.role !== 'student'}
            data={this.state.data}
            testOnline={this.toggleTest}
          />
        </Row>
      </div>
    );
  }
}

export default Exam;