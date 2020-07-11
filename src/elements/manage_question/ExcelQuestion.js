/* eslint-disable react/no-direct-mutation-state */
import { Row, Col, Input, Button, Card, CardBody, Container } from 'reactstrap';
import React from 'react';
import readXlsxFile from 'read-excel-file';
import Util from '../../Util';
import { alphabet } from '../../containers/constant/CONSTANT';

class ExcelQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeAnswer: 4,
      listQuestion: [],
    };

    this.changeText = this.changeText.bind(this);
    this.downloadTemplate = this.downloadTemplate.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit() {
    var conf = window.confirm('Are you sure?');
    if (conf) {
      this.props.submitListQuestion(this.state.listQuestion);
    }
  }

  downloadTemplate() {
    var data = [];
    data.push('content');
    data.push('fieldQuestionId');
    data.push('level');
    data.push('virtual')
    for (let i = 0; i < this.state.sizeAnswer; i++) {
      data.push(alphabet[i]);
    }
    data.push('answers')
    Util.downloadTemplate([data])
  }

  changeText(event) {
    switch (event.target.name) {
      case 'sizeAnswer':
        this.state.sizeAnswer = Number(event.target.value);
        break;
      case 'fileListQuestion':
        if (event.target.files[0]) {
          try {
            var arr = [];
            var keys = [];
            readXlsxFile(event.target.files[0]).then((rows) => {
              rows.forEach((element, index) => {
                if (index >= 1) {
                  let temp = {};
                  temp.listAnswers = {};
                  keys.forEach((e, i) => {
                    if (i === keys.length - 1) {
                      var arr_ans = element[i].split(',');
                      temp[e] = arr_ans;
                    } else if (i <= 3) {
                      if (e === 'virtual') {
                        temp[e] = element[i] ? true : false;
                      } else {
                        temp[e] = element[i];
                      }
                    } else {
                      temp.listAnswers[e] = element[i];
                    }
                  });
                  arr.push(temp);
                } else {
                  keys = element;
                }
              });
              this.state.listQuestion = arr;
              this.setState({});
            })
              .catch((err) => {
                alert('File type excel');
              })
          } catch (err) {
            alert('File excel invalid. Please try again!!!');
          }
        }
        break;
      default:
        break;
    }

    this.setState({});
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm='9'>
            <Card>
              <CardBody>
                <Row>
                  <Input
                    type='file' name='fileListQuestion' id='fileListQuestion'
                    onChange={this.changeText}
                  />
                </Row>
                <br />
                <Row>
                  <table>
                    <tr>
                      <td>Total of questions:</td>
                      <td>&emsp;</td>
                      <td>{this.state.listQuestion.length}</td>
                    </tr>
                  </table>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm='3' className='text-right'>
            <Card>
              <CardBody>
                <Row>
                  <table style={{ width: '100%' }}>
                    <tr>
                      <td>Answers: </td>
                      <td>
                        <Input
                          type='number' name='sizeAnswer' id='sizeAnswer'
                          onChange={this.changeText}
                          value={this.state.sizeAnswer}
                        />
                      </td>
                    </tr>
                  </table>
                </Row>
                <br />
                <Row>
                  <Button
                    color='info' style={{ width: '100%' }}
                    onClick={this.downloadTemplate}
                  >Download template</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {
          this.state.listQuestion.length ?
            <Row>
              <Container>
                <Button color='danger' onClick={this.submit}>Import list Question</Button>
              </Container>
            </Row>
            :
            <div></div>
        }
      </div>
    );
  }
}

export default ExcelQuestion;