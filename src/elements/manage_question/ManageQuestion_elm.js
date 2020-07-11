/* eslint-disable react/no-direct-mutation-state */
import { Container, Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import Table from '../../components/Table';
import Question from './Question';
import ExcelQuestion from './ExcelQuestion';
import Util from '../../Util';
import { LEVEL } from '../../containers/constant/CONSTANT';

class ManageQuestion_elm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAnswer: false,
      isOpenExel: false,
      add_or_edit: true, // true: add or false: edit
      question: {},
      questionEditUndo: {},
      indexEditUndo: undefined,
      pages: 1,
      page: 0,
      data: []
    };

    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.toggleExcel = this.toggleExcel.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  toggleAnswer() {
    this.state.isOpenAnswer = !this.state.isOpenAnswer;
    this.state.add_or_edit = true;
    this.state.question = {};
    this.setState({});
  }

  toggleExcel() {
    this.state.isOpenExel = !this.state.isOpenExel;
    this.setState({});
  }

  cancel() {
    if (!this.state.add_or_edit && this.state.indexEditUndo) {
      this.state.data[this.state.indexEditUndo] = JSON.parse(JSON.stringify(this.state.questionEditUndo));
    }
    this.state.questionEditUndo = {};
    this.state.indexEditUndo = undefined;
    this.toggleAnswer();
  }

  submitQuestion() {
    let answerQuestion = Util.createAnswers(this.state.question.listAnswers, this.state.question.answers);
    if (!answerQuestion) {
      alert('Input invalid. Check it again!');
      return;
    }
    this.state.question.listAnswers = answerQuestion.listAnswers;
    this.state.question.answers = answerQuestion.answers;
    let alarmText = Util.checkSubmitQuestion(this.state.question);
    if (alarmText) {
      alert(alarmText);
      return;
    }
    if (this.state.add_or_edit) {
      // add
      let conf = window.confirm('Do you want add new item?')
      if (conf) {
        this.props.add(this.state.question);
        // call api
        this.setState({});
      }
      this.toggleAnswer();
    } else {
      // edit
      let conf = window.confirm('Do you want edit item?')
      if (conf) {
        this.props.edit(this.state.question);
        this.toggleAnswer();
      } else {
        this.cancel();
      }
    }
  }

  addQuestion() {
    this.state.isOpenAnswer = !this.state.isOpenAnswer;
    this.state.add_or_edit = true;
    this.state.question = {};
    if (this.props.listFieldQuestions && this.props.listFieldQuestions[0])
      this.state.question.fieldQuestionId = this.props.listFieldQuestions[0]._id;
    this.state.question.level = 0;
    this.setState({});
  }

  editQuestion(question, index) {
    this.state.isOpenAnswer = !this.state.isOpenAnswer;
    this.state.add_or_edit = false;
    this.state.question = question;
    this.state.questionEditUndo = JSON.parse(JSON.stringify(question));
    this.state.indexEditUndo = index;
    this.setState({});
  }

  deleteQuestion(question, index) {
    this.props.delete(question, index);
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
        Header: 'Field of Question',
        id: 'fieldQuestionId',
        style: {
          textAlign: 'center'
        },
        Cell: (row) => {
          let str = '';
          let id = row.original.fieldQuestionId;
          if (id && this.props.listFieldQuestions && this.props.listFieldQuestions.length > 0) {
            let temp = this.props.listFieldQuestions.find(e => e._id === id);
            if (temp)
              str = temp.name;
          }
          return str;
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
            <Button color='success' onClick={() => this.editQuestion(row.original, row.index)}>
              <i className='cui-pencil'></i>
            </Button>
            &emsp;
            <Button color='danger' onClick={() => this.deleteQuestion(row.original, row.index)}>
              <i className='cui-trash'></i>
            </Button>
          </div>
        }
      },
    ];

    this.state.data = this.props.listQuestions;
    return (
      <div>
        <Row className='container'>
          <h5>List of questions</h5>
        </Row>
        <Row>
          <Col sm='8'>
            <Button color='success' onClick={this.addQuestion}>+ ADD QUESTIONS</Button>
            &emsp;
            <Button color='success' onClick={this.toggleExcel}>+ IMPORT QUESTIONS FROM FILE</Button>
          </Col>
          <Col sm='4' className='text-right'>
            <Input type='search' placeholder='Searching ...' />
          </Col>
        </Row>
        <hr />
        <Row>
          <Container>
            <Table
              style={{ width: '100%' }}
              filterable={false}
              // manual
              // pages={this.state.pages}              
              // page={this.state.page}
              columns={columns}
              data={this.state.data}
              pageSizeOptions={[10, 25, 50, 75, 100]}
              defaultPageSize={10}
            />
          </Container>
        </Row>
        <Modal isOpen={this.state.isOpenAnswer} toggle={this.toggleAnswer} size='lg'>
          <ModalHeader toggle={this.toggleAnswer} charCode='X'>
            <h5>Question</h5>
          </ModalHeader>
          <ModalBody>
            <Question
              question={this.state.question}
              listFieldQuestions={this.props.listFieldQuestions}
              add_or_edit={this.state.add_or_edit}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.submitQuestion}>Submit</Button> {' '}
            <Button color='secondary' onClick={this.cancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isOpenExel} toggle={this.toggleExcel} size='lg'>
          <ModalHeader toggle={this.toggleExcel} charCode='X'>
            <h5>Import list by excel</h5>
          </ModalHeader>
          <ModalBody>
            <ExcelQuestion submitListQuestion={this.props.submitListQuestion} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ManageQuestion_elm;