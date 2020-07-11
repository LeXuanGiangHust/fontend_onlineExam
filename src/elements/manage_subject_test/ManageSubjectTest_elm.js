/* eslint-disable react/no-direct-mutation-state */
import { Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Container, Card, CardBody, Input, Label } from 'reactstrap';
import React from 'react';
import ReactToPrint from 'react-to-print';
import SubjectTest from './SubjectTest';
import Table from '../../components/Table';
import Question_Actions from '../../actions/Question_Actions';
import Util from '../../Util';

class ManageSubjectTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      add_or_edit: true,
      subjectTest: {},
      isReady: false,
      isPrint: false,
      pdf: {
        listQuestions: [],
      },
    };

    this.toggle = this.toggle.bind(this);
    this.togglePrint = this.togglePrint.bind(this);
    this.cancel = this.cancel.bind(this);
    this.addSubjectTest = this.addSubjectTest.bind(this);
    this.createSubjectTest = this.createSubjectTest.bind(this);
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggle() {
    this.state.isOpen = !this.state.isOpen;
    this.setState({});
  }

  togglePrint() {
    this.state.isPrint = !this.state.isPrint;
    this.setState({});
  }

  cancel() {
    this.state.isReady = false;
    this.state.subjectTest = {};
    this.toggle();
  }

  addSubjectTest() {
    this.state.add_or_edit = true;
    this.toggle();
  }

  createSubjectTest(subjectTest) {
    let arrID = [];
    subjectTest.listQuestions.forEach(e => {
      arrID.push(e._id);
    });
    subjectTest.listQuestions = arrID;
    this.state.subjectTest = subjectTest;
    this.state.isReady = true;
    this.setState({});
    alert('Data ready');
  }

  submit() {
    let conf = window.confirm('Are you sure?');
    if (!conf)
      return;
    if (this.state.isReady) {
      this.props.add(this.state.subjectTest);
      this.cancel();
    } else {
      alert('Data invalid');
    }
  }

  delete(value, index) {
    let conf = window.confirm('Are you sure?');
    if (conf) {
      this.props.delete(value, index);
    }
  }

  convertTimeBySecond(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds - h * 3600) / 60);
    let s = seconds - h * 3600 - m * 60;
    let str = '';
    if (h > 0)
      str += `${h} h - `;
    if (m > 0)
      str += `${m} m - `;
    if (s > 0)
      str += `${s} s - `;
    if (str.length > 2)
      str = str.substr(0, str.length - 2);
    return str;
  }

  convertDateByString(text) {
    let date = new Date(text);
    let str = date.toLocaleString();
    return str;
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
        Header: 'Time open',
        id: 'timeOpen',
        filterable: false,
        Cell: (row) => {
          let time = row.original.timeOpen;
          if (!time)
            return <p></p>;
          return <p>{this.convertDateByString(time)}</p>;
        }
      },
      {
        Header: 'Time close',
        id: 'timeClose',
        filterable: false,
        Cell: (row) => {
          let time = row.original.timeClose;
          if (!time)
            return <p></p>;
          return <p>{this.convertDateByString(time)}</p>;
        }
      },
      {
        Header: 'Time live',
        id: 'timeLive',
        width: 130,
        style: {
          textAlign: 'center'
        },
        filterable: false,
        Cell: (row) => {
          if (!row.original.timeLive)
            return <p></p>;

          return <p>{this.convertTimeBySecond(row.original.timeLive)}</p>;
        }
      },
      {
        Header: 'Questions',
        id: 'level',
        width: 130,
        style: {
          textAlign: 'center'
        },
        filterable: false,
        Cell: (row) => {
          let level = row.original.level;
          if (!level)
            return <p></p>;
          return <div>
            <p><b>Hard: </b>{level['2'] ? level['2'] : 0}</p>
            <p><b>Medium: </b>{level['1'] ? level['1'] : 0}</p>
            <p><b>Easy: </b>{level['0'] ? level['0'] : 0}</p>
          </div>
        }
      },
      {
        Header: 'Field Question',
        id: 'fieldQuestion',
        width: 130,
        style: {
          textAlign: 'center'
        },
        filterable: false,
        Cell: (row) => {
          let id = row.original.fieldQuestionId;
          if (!id)
            return <p></p>;
          let field = this.props.listFieldQuestions.find(e => e._id === id);
          if (!field)
            return <p></p>;
          return <div>
            <p><b>{field.name}</b></p>
            <p>{row.original.code}</p>
          </div>;
        }
      },
      {
        Header: 'Option',
        id: 'option',
        width: 130,
        style: {
          textAlign: 'center'
        },
        filterable: false,
        Cell: (row) => {
          return <div>
            <Button onClick={() => {
	      this.state.pdf.listQuestions = [];
              let id = row.original.fieldQuestionId;
              let field = this.props.listFieldQuestions.find(e => e._id === id);
              if (field)
                this.state.pdf.fieldQuestion = field.name;
              this.state.pdf.code = row.original.code;

              Question_Actions.get({}).then((res) => {
                res.data.data.forEach(e => {
                  var temp = row.original.listQuestions.find(q => q === e._id);
                  if (temp)
                    this.state.pdf.listQuestions.push(e);
                });
                this.togglePrint();
              })
            }}>
              <i className='cui-print'></i>
            </Button>
            &emsp;
            <Button color='danger' onClick={() => this.delete(row.original, row.index)}>
              <i className='cui-trash'></i>
            </Button>
          </div>
        }
      }
    ];
    return (
      <div>
        <Row>
          <h4>List of Subject Test</h4>
        </Row>
        <Row>
          <Button color='success' onClick={this.addSubjectTest}>+ ADD SUBJECT TEST</Button>
        </Row>
        <hr />
        <Row>
          <Table
            style={{ width: '100%' }}
            filterable={false}
            // manual
            // pages={this.state.pages}
            // page={this.state.page}Oki
            columns={columns}
            data={this.props.data}
            pageSizeOptions={[5, 10, 25, 50, 75, 100]}
            defaultPageSize={5}
          />
        </Row>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} size='lg'>
          <ModalHeader toggle={this.toggle} charCode='X'>
            <h5>Subject Test</h5>
          </ModalHeader>
          <ModalBody>
            <SubjectTest
              listFieldQuestions={this.props.listFieldQuestions}
              createSubjectTest={this.createSubjectTest}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.submit}>Submit</Button> {' '}
            <Button color='secondary' onClick={this.cancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isPrint} toggle={this.togglePrint} size='lg'>
          <ModalHeader toggle={this.togglePrint} charCode='X'>
            <ReactToPrint
              trigger={() => <Button >
                <i className='cui-print'></i>
              </Button>}
              content={() => this.componentRef}
            />
          </ModalHeader>
          <ModalBody>
            <div ref={elm => this.componentRef = elm}>
              <Row>
                <Col sm={6} className='text-center'>
                  <h6><b>HA NOI UNIVERSITY OF SCIENCE AND TECHNOLOGY</b></h6>
                  <p>School of Electronics and Telecommunications</p>
                </Col>
                <Col sm={3}></Col>
                <Col sm={3} className='text-right'>
                  <table className='text-right'>
                    <tr>
                      <td><h6>Field Question:</h6></td>
                      <td><h6>{this.state.pdf.fieldQuestion}</h6></td>
                    </tr>
                    <tr>
                      <td><p>Code:</p></td>
                      <td><p>{this.state.pdf.code}</p></td>
                    </tr>
                  </table>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col style={{ width: '100%' }}>
                  {
                    Util.shuffle(this.state.pdf.listQuestions).map((e, i) => {
                      return <Row key={e._id} style={{ width: '100%' }}>
                        <Card style={{ width: '100%' }}>
                          <CardBody>
                            <Row>
                              <p><b>{i + 1}</b>{e.content}</p>
                            </Row>
                            <Container>
                              {
                                Object.keys(e.listAnswers).map((_e, _i) => <Row>
                                  {/* <Input type='checkbox' name={_e} onClick={this.changeAnswer} /> */}
                                  <Label><b>{_e}. </b>{e.listAnswers[_e]}</Label>
                                </Row>)
                              }
                            </Container>
                          </CardBody>
                        </Card>
                      </Row>
                    })
                  }
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ManageSubjectTest;