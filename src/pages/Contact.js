import { Row, Col, Label, Input, Container, Button } from 'reactstrap';
import React from 'react';
import Feedback_Actions from '../actions/Feedback_Actions';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sendFeedBack = this.sendFeedBack.bind(this);
  }

  sendFeedBack() {
    Feedback_Actions.post({
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      content: document.getElementById('feedback').value
    }).then((res) => {

    })
  }

  render() {
    return (
      <Container>
        <h1>Please enter feedback:</h1>
        <Row>
          <Label sm='2'>Email:</Label>
          <Col sm='10'>
            <Input id='email' />
          </Col>
        </Row>
        <br />
        <Row>
          <Label sm='2'>Subject:</Label>
          <Col sm='10'>
            <Input id='subject' />
          </Col>
        </Row>
        <br />
        <Row>
          <Label sm='2'>Feedback:</Label>
          <Col sm='10'>
            <Input type='textarea' id='feedback' />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm='2'></Col>
          <Col sm='10'>
            <Button color='success' onClick={this.sendFeedBack}>Send</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;