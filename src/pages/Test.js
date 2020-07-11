/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-pascal-case */
import { Row, Form, Card, CardBody, Input, Container } from 'reactstrap';
import React from 'react';
import Exam_elm from '../elements/exam/Exam_elm';
import Test from '../elements/exam/Test';

import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';
import Question_Actions from '../actions/Question_Actions';

import Util from '../Util';

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTest: false,
      test: {},
      data: [],
      level: {
        0: 0,
        1: 0,
        2: 0
      },
      timeLive: 0
    };

    this.getList();

    this.toggleTest = this.toggleTest.bind(this);
    this.submit = this.submit.bind(this);
    this.submitExpired = this.submitExpired.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  getList() {
    FieldQuestion_Actions.get({}).then((res) => {
      this.state.data = res.data.data;
      this.setState({});
    });
  }

  toggleTest(fieldId) {
    if (this.state.timeLive <= 0) {
      alert('You must set time live');
      return;
    }
    if (this.state.level['0'] + this.state.level['1'] + this.state.level['2'] === 0) {
      alert('You must set question level');
      return;
    }
    Question_Actions.randomTest(this.state.level, fieldId).then((res) => {
      if (res.data && res.data.length) {
        this.state.isTest = true;
        this.state.test = {
          listQuestions: res.data,
          timeLive: this.state.timeLive * 60
        }
        this.setState({});
      } else {
        alert('Data empty');
      }
    })

  }

  submit(event) {
    let conf = window.confirm('Do you want submit test?');
    if (conf) {
      alert(Util.resultExam(this.state.test.listQuestions));
      window.location.reload();
    }
  }

  submitExpired(event) {
    // event.preventDefault();
    alert(Util.resultExam(this.state.test.listQuestions));
    window.location.reload();
  }

  changeText(event) {
    switch (event.target.name) {
      case 'level_0':
        this.state.level['0'] = Number(event.target.value);
        break;
      case 'level_1':
        this.state.level['1'] = Number(event.target.value);
        break;
      case 'level_2':
        this.state.level['2'] = Number(event.target.value);
        break;
      case 'timeLive':
        this.state.timeLive = Number(event.target.value);
        break;
      default:
        break;
    }

    this.setState({});
  }

  render() {
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
        <Row>
          <Card>
            <CardBody>
              <Container>
                <table>
                  <tr>
                    <td>
                      <p>Time Live(min)</p>
                    </td>
                    <td>
                      <Input type='number' name='timeLive' value={this.state.timeLive} onChange={this.changeText} />
                    </td>
                    <td>&emsp;</td>
                    <td>
                      <p>Level:</p>
                    </td>
                    <td>
                      <table>
                        <tr>
                          <td>
                            <Input type='number' name='level_0' value={this.state.level['0']} onChange={this.changeText} />
                          </td>
                          <td>
                            <Input type='number' name='level_1' value={this.state.level['1']} onChange={this.changeText} />
                          </td>
                          <td>
                            <Input type='number' name='level_2' value={this.state.level['2']} onChange={this.changeText} />
                          </td>
                        </tr>
                        <tr>
                          <td>Hard</td>
                          <td>Medium</td>
                          <td>Easy</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </Container>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Exam_elm
            data={this.state.data}
            testOnline={this.toggleTest}
          />
        </Row>
      </div>
    );
  }
}

export default TestPage;