/* eslint-disable react/no-direct-mutation-state */
import { Row, Col, Card, CardBody, Label, Input, Button, Container } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import React from 'react';
import Table from '../../components/Table';
import { LEVEL } from '../../containers/constant/CONSTANT';
import Util from '../../Util';
import Question_Actions from '../../actions/Question_Actions';

class SubjectTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: 1,
      page: 0,
      data: [],
      subjectTest: {
        listQuestions: [],
        virtual: false,
      },
      timeOpen: undefined,
      timeClose: undefined,
      timeLive: 0,
      timeLive_h: 0,
      timeLive_m: 0,
      timeLive_s: 0,
    };

    this.createRandomQuestion = this.createRandomQuestion.bind(this);
    this.deleteAllQuestion = this.deleteAllQuestion.bind(this);
    this.changeTimeLive = this.changeTimeLive.bind(this);
    this.changeText = this.changeText.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
  }

  changeTimeLive(event) {
    let temp = parseInt(event.target.value);
    switch (event.target.name) {
      case 'timeLive_h':
        this.state.timeLive_h = temp >= 0 ? temp : 0;
        break;
      case 'timeLive_m':
        this.state.timeLive_m = temp >= 0 ? temp : 0;
        break;
      case 'timeLive_s':
        this.state.timeLive_s = temp >= 0 ? temp : 0;
        break;
      default:
        break;
    }
    this.state.timeLive = this.state.timeLive_h * 60 * 60 + this.state.timeLive_m * 60 + this.state.timeLive_s;
    this.setState({});
  }

  changeText(event) {
    if (!this.state.subjectTest.level)
      this.state.subjectTest.level = {};
    switch (event.target.name) {
      case 'level_2':
        let level_2 = parseInt(event.target.value);
        this.state.subjectTest.level['2'] = level_2 >= 0 ? level_2 : 0;
        break;
      case 'level_1':
        let level_1 = parseInt(event.target.value);
        this.state.subjectTest.level['1'] = level_1 >= 0 ? level_1 : 0;
        break;
      case 'level_0':
        let level_0 = parseInt(event.target.value);
        this.state.subjectTest.level['0'] = level_0 >= 0 ? level_0 : 0;
        break;
      case 'fieldQuestionId':
        this.props.listFieldQuestions && this.props.listFieldQuestions.forEach((field, index) => {
          if (field.name === event.target.value) {
            this.state.subjectTest.fieldQuestionId = field._id;
            return;
          }
        });
        break;
      case 'code':
        this.state.subjectTest.code = event.target.value;
        break;
      case 'virtual':
        this.state.subjectTest.virtual = event.target.checked;
        break;
      default:
        break;
    }

    this.setState({});
  }

  createRandomQuestion() {
    let alarm = Util.checkCreateRandomQuestion(this.state.subjectTest.level, this.state.timeOpen, this.state.timeClose, this.state.timeLive);
    if (alarm) {
      alert(alarm);
      return;
    }
    if (!this.state.subjectTest.fieldQuestionId)
      this.state.subjectTest.fieldQuestionId = this.props.listFieldQuestions[0]._id;
    Question_Actions.random(this.state.subjectTest.level, this.state.subjectTest.fieldQuestionId).then((res) => {
      this.state.subjectTest.listQuestions = res.data;
      this.setState({});
    })
  }

  deleteAllQuestion() {
    this.state.subjectTest.listQuestions = [];
    this.setState({});
  }

  checkSubmit() {
    let alarm = Util.checkCreateRandomQuestion(this.state.subjectTest.level, this.state.timeOpen, this.state.timeClose, this.state.timeLive);
    if (alarm) {
      alert(alarm);
      return;
    }
    if (!this.state.subjectTest.code) {
      alert('Code exam null');
      return;
    }
    if (!this.state.subjectTest.listQuestions.length || this.state.subjectTest.listQuestions.length === 0) {
      alert('List of questions empty');
      return;
    }
    this.props.createSubjectTest({
      timeOpen: this.state.timeOpen,
      timeClose: this.state.timeClose,
      timeLive: this.state.timeLive,
      ...this.state.subjectTest
    });
  }

  render() {
    const columns = [
      {
        Header: 'STT',
        id: 'stt',
        width: 50,
        Cell: ({ index }) => index + 1,
        filterable: false,
        style: {
          textAlign: 'center'
        }
      },
      {
        Header: 'Content Question',
        accessor: 'content',
        filterable: false,
        style: {
          wordBreak: 'break-word',
          whiteSpace: 'initial',
          overflow: 'initial'
        },
        Cell: (row) => {
          var str = row.original.content;
          if (str) {
            var arr = str.split('\n');
            return <div>
              {
                arr.map(e => <p>{e}</p>)
              }
            </div>;
          } else {
            return <div></div>
          }
        }
      },
      {
        Header: 'List Answers',
        id: 'listAnswers',
        filterable: false,
        style: {
          wordBreak: 'break-word',
          whiteSpace: 'initial',
          overflow: 'initial'
        },
        Cell: (row) => {
          var arr = row.original.listAnswers;
          if (arr) {
            return <div>
              {
                Object.keys(arr).map((e, i) => {
                  let answer = row.original.answers.find(ans => ans === e);
                  return <p style={answer && { color: 'red' }}><b>{e}: </b>{arr[e]}</p>;
                })
              }
            </div >;
          } else {
            return <div></div>;
          }
        }
      },
      {
        Header: 'Level',
        id: 'level',
        style: {
          textAlign: 'center'
        },
        filterable: false,
        width: 100,
        Cell: (row) => {
          let level = row.original.level;
          let str = '';
          if (level !== undefined) {
            str = LEVEL[level];
          }
          return <p>{str}</p>;
        }
      }
    ];

    return (
      <div>
        <Row>
          <Col sm='4'>
            <Card>
              <CardBody>
                <Row>
                  <Label>Field Question:</Label>
                </Row>
                <Row>
                  <Input type='select' name='fieldQuestionId' id='fieldQuestionId' onChange={this.changeText}>
                    {
                      this.props.listFieldQuestions && this.props.listFieldQuestions.map((e, i) => {
                        return <option key={e._id}>{e.name}</option>
                      })
                    }
                  </Input>
                </Row>
                <Row>
                  <Label>Level Question:</Label>
                </Row>
                <Row className='text-center'>
                  <table>
                    <tr>
                      <td>
                        <Input type='number' name='level_2' onChange={this.changeText} />
                      </td>
                      <td>
                        <Input type='number' name='level_1' onChange={this.changeText} />
                      </td>
                      <td>
                        <Input type='number' name='level_0' onChange={this.changeText} />
                      </td>
                    </tr>
                    <tr>
                      <td>Hard</td>
                      <td>Medium</td>
                      <td>Easy</td>
                    </tr>
                  </table>
                </Row>
                <hr />
                <Row>
                  <Label>Time Open:</Label>
                </Row>
                <Row>
                  <DateTimePicker
                    id='timeOpen'
                    value={this.state.timeOpen}
                    onChange={(date) => { this.setState({ timeOpen: date }) }}
                  />
                </Row>
                <Row>
                  <Label>Time Close:</Label>
                </Row>
                <Row>
                  <DateTimePicker
                    id='timeClose'
                    value={this.state.timeClose}
                    onChange={(date) => { this.setState({ timeClose: date }); }}
                  />
                </Row>
                <Row>
                  <Label>Time live:</Label>
                </Row>
                <Row>
                  <table>
                    <tr>
                      <td><Input type='number' name='timeLive_h' value={this.state.timeLive_h} onChange={this.changeTimeLive} /></td>
                      <td><b>h</b></td>
                      <td><Input type='number' name='timeLive_m' value={this.state.timeLive_m} onChange={this.changeTimeLive} /></td>
                      <td><b>m</b></td>
                      <td><Input type='number' name='timeLive_s' value={this.state.timeLive_s} onChange={this.changeTimeLive} /></td>
                      <td><b>s</b></td>
                    </tr>
                  </table>
                </Row>
                <hr />
                <Row>
                  <Button
                    color='success' style={{ width: '100%' }}
                    onClick={this.createRandomQuestion}
                  >Create random list questions</Button>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Row><Label>Code Exam:</Label></Row>
                <Row>
                  <Input id='code' name='code' value={this.state.subjectTest.code} onChange={this.changeText} />
                </Row>
                <br />
                <Row>
                  <Container>
                    <Row>
                      <Col sm='1'>
                        <Container>
                          <Input type='checkbox' id='virtual' name='virtual' value={this.state.subjectTest.virtual} onChange={this.changeText} />
                        </Container>
                      </Col>
                      <Col><p>virtual</p></Col>
                    </Row>
                  </Container>
                </Row>
                <br />
                <Row>
                  <Button color='danger' style={{ width: '100%' }} onClick={this.checkSubmit}>Check data submit</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm='8'>
            <Card>
              <CardBody>
                <Row>
                  <Button color='danger' onClick={this.deleteAllQuestion}>
                    <i className='cui-trash'></i> Delete All Question
                  </Button>
                </Row>
                <hr />
                <Row>
                  <Table
                    style={{ width: '100%' }}
                    filterable={false}
                    // manual
                    // pages={this.state.pages}
                    // page={this.state.page}
                    columns={columns}
                    data={this.state.subjectTest.listQuestions}
                    pageSizeOptions={[5, 10, 25, 50, 75, 100]}
                    defaultPageSize={5}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubjectTest;