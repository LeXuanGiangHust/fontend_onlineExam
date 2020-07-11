/* eslint-disable react/no-direct-mutation-state */
import { Container, Card, CardBody, Button, CardFooter, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import React from 'react';
import ReactToPrint from 'react-to-print';
import GroupExam_Actions from '../../actions/GroupExam_Actions';
import User_Actions from '../../actions/User_Actions';

class ExamComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPrint: [],
      isPrint: false,
      pdf: {}
    };

    this.togglePrint = this.togglePrint.bind(this);
  }

  togglePrint() {
    this.state.isPrint = !this.state.isPrint;
    this.setState({});
  }

  render() {
    return (
      <Container>
        <Card style={{ width: 300, height: 300 }}>
          <CardBody className='text-center'>
            <h1>{this.props.item.name}</h1>
            <h3>{this.props.item._id}</h3>
            <p>{this.props.item.score ? this.props.item.score : ''}</p>
          </CardBody>
          <CardFooter>
            <Row>
              <Button color='primary' onClick={() => {
                if (!this.props.item.score) {
                  this.props.startTest(this.props.item._id);
                }
              }}>Enter</Button>&nbsp;
              {
                this.props.enablePrint &&
                <Button onClick={() => {
                  var subjectId = this.props.item._id;
                  GroupExam_Actions.get({ fieldQuestionId: subjectId }).then((res_group) => {
                    User_Actions.get({}).then((res_users) => {
                      res_users.data.data.forEach((e, i) => {
                        var _temp = res_group.data.data.find(g => g.userId === e._id);
                        if (_temp) {
                          this.state.dataPrint.push({
                            name: e.name,
                            username: e.username,
                            email: e.email,
                            className: e.class,
                            score: _temp.score
                          })
                        }
                      });
                      this.state.pdf.fieldQuestion = this.props.item.name;
                      this.togglePrint();
                    })
                  })
                }}>Print Result</Button>
              }
            </Row>
          </CardFooter>
        </Card>
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
                    {/* <tr>
                      <td><p>Code:</p></td>
                      <td><p>{this.state.pdf.code}</p></td>
                    </tr> */}
                  </table>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <table style={{ width: '100%' }}>
                  <thead>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Account</th>
                    <th>Email</th>
                    <th>ClassName</th>
                    <th>Score</th>
                    <th>Note</th>
                  </thead>
                  <tbody>
                    {
                      this.state.dataPrint.map((e, i) => <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{e.name}</td>
                        <td>{e.username}</td>
                        <td>{e.email}</td>
                        <td>{e.className}</td>
                        <td>{e.score}</td>
                        <td></td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default ExamComponent;