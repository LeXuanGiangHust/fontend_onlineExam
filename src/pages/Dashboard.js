/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import Feedback_Actions from '../actions/Feedback_Actions';
import GroupExam_Actions from '../actions/GroupExam_Actions';
import SubjectTest_Actions from '../actions/SubjectTest_Actions';
import FieldQuestion_Actions from '../actions/FieldQuestion_Actions';
import User_Actions from '../actions/User_Actions';

import Table from '../components/Table';
import { Row, Col, Input, Button } from 'reactstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      scores: [],
      grades: [],
      fieldQuestions: [],
    };

    this.setup();

    this.filterFieldQuestion = this.filterFieldQuestion.bind(this);
  }

  setup() {
    var role = this.props.authentication.user.role;
    switch (role) {
      case 'admin':
        Feedback_Actions.get({}).then((res) => {
          this.state.feedbacks = res.data.data;
          this.setState({});
        })
        break;
      case 'teacher':
        SubjectTest_Actions.get({}).then((res) => {
          let arr_fieldQuestion = [];
          res.data.data.forEach(e => {
            let x = arr_fieldQuestion.find(xx => xx === e.fieldQuestionId)
            if (!x)
              arr_fieldQuestion.push(e.fieldQuestionId);
          });
          if (arr_fieldQuestion.length === 0) {
            this.setState({ fieldQuestions: [] });
          } else {
            FieldQuestion_Actions.get({ _id: { $in: arr_fieldQuestion } }).then((res1) => {
              res1.data.data.forEach(e => {
                let _temp = res.data.data.find(t => t.fieldQuestionId === e._id)
                if (_temp) {
                  this.state.fieldQuestions.push({
                    name: e.name,
                    ..._temp
                  });
                }
              });
              this.setState({});
            })
          }
        })
        break;
      case 'student':
        GroupExam_Actions.get({}).then((res) => {
          let arr_Subjects = [];
          res.data.data.forEach(e => {
            if (e.userId === this.props.authentication.user._id)
              arr_Subjects.push(e.fieldQuestionId);
          });
          if (arr_Subjects.length === 0) return;
          SubjectTest_Actions.get({ _id: { $in: arr_Subjects } }).then((res1) => {
            let arr_fieldQuestion = [];
            res1.data.data.forEach(e => {
              let x = arr_Subjects.find(xx => xx === e._id)
              if (x)
                arr_fieldQuestion.push(e.fieldQuestionId);
            });
            if (arr_fieldQuestion.length === 0) return;
            FieldQuestion_Actions.get({ _id: { $in: arr_fieldQuestion } }).then((res2) => {
              res2.data.data.forEach(e => {
                let y1 = arr_fieldQuestion.find(yy => yy === e._id);
                if (!y1) return;
                let y2 = res1.data.data.find(yy => yy.fieldQuestionId === e._id);
                if (!y2) return;
                let y3 = res.data.data.find(yy => yy.fieldQuestionId === y2._id);
                if (!y3) return;
                this.state.grades.push({
                  name: e.name,
                  code: y2.code,
                  score: y3.score
                })
              });
              this.setState({});
            })
          })
        });
        this.setState({});
        break;
      default:
        break;
    }
  }

  filterFieldQuestion() {
    this.state.scores = [];
    let name = document.getElementById('fieldQuestions').value;
    let temp = this.state.fieldQuestions.find(e => e.name === name);
    if (temp) {
      GroupExam_Actions.get({}).then((res) => {
        let arr_userId = [];
        res.data.data.forEach(e => {
          if (e.fieldQuestionId === temp._id)
            arr_userId.push(e.userId);
        });
        if (arr_userId.length === 0)
          return;
        User_Actions.get({ _id: { $in: arr_userId } }).then((res1) => {
          res1.data.data.forEach(e => {
            let _temp = res.data.data.find(g => g.userId === e._id);
            if (_temp) {
              this.state.scores.push({
                userId: e._id,
                username: e.username,
                name: e.name,
                score: _temp.score
              });
            }
          });
          this.setState({});
        })
      })
    }
    this.setState({});
  }

  render() {
    var role = this.props.authentication.user.role;
    if (role === 'admin') {
      const columnFeedbacks = [
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
          Header: 'Email',
          accessor: 'email',
          filterable: false
        },
        {
          Header: 'Subject',
          accessor: 'subject',
          filterable: false
        },
        {
          Header: 'Content',
          accessor: 'content',
          filterable: false
        },
      ];
      return (
        <div>
          <Table
            style={{ width: '100%' }}
            filterable={false}
            // manual
            // pages={this.state.pages}              
            // page={this.state.page}
            columns={columnFeedbacks}
            data={this.state.feedbacks}
            pageSizeOptions={[10, 25, 50, 75, 100]}
            defaultPageSize={10}
          />
        </div>
      );
    }

    if (role === 'teacher') {
      const columnScore = [
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
          Header: 'Username',
          accessor: 'username',
          filterable: false
        },
        {
          Header: 'Name',
          accessor: 'name',
          filterable: false
        },
        {
          Header: 'Score',
          accessor: 'score',
          filterable: false
        },
      ];

      return (
        <div>
          <Row>
            <Col>
              <Input type='select' id='fieldQuestions'>
                {
                  this.state.fieldQuestions.map((e, i) => <option key={e._id}>{e.name}</option>)
                }
              </Input>
            </Col>
            <Col>
              <Button color='success' onClick={this.filterFieldQuestion}>Filter</Button>
            </Col>
          </Row>
          <Row>
            <Table
              style={{ width: '100%' }}
              filterable={false}
              // manual
              // pages={this.state.pages}              
              // page={this.state.page}
              columns={columnScore}
              data={this.state.scores}
              pageSizeOptions={[10, 25, 50, 75, 100]}
              defaultPageSize={10}
            />
          </Row>
        </div>
      );
    }

    if (role === 'student') {
      const columnGrades = [
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
          Header: 'FieldQuestion',
          accessor: 'name',
          filterable: false
        },
        {
          Header: 'Code',
          accessor: 'code',
          filterable: false
        },
        {
          Header: 'Score',
          accessor: 'score',
          filterable: false
        },
      ];

      return (
        <div>
          <Table
            style={{ width: '100%' }}
            filterable={false}
            // manual
            // pages={this.state.pages}              
            // page={this.state.page}
            columns={columnGrades}
            data={this.state.grades}
            pageSizeOptions={[10, 25, 50, 75, 100]}
            defaultPageSize={10}
          />
        </div>
      );
    }

    return (
      <div>
        <h4>Hello world</h4>
      </div>
    );
  }
}

export default Dashboard;