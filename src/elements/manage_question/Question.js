import { Container, Row, Label, Input, Col, Card, CardBody, Button } from 'reactstrap';
import React from 'react';
import { alphabet } from '../../containers/constant/CONSTANT';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAnswer: [],
    };

    this.changeText = this.changeText.bind(this);
    this.changeChecked = this.changeChecked.bind(this);
    this.addNewAnswer = this.addNewAnswer.bind(this);
  }

  changeText(event) {
    if (!this.props.question.listAnswers)
      this.props.question.listAnswers = {};
    switch (event.target.name) {
      case 'content':
        this.props.question.content = event.target.value;
        break;
      case 'fieldQuestionId':
        this.props.listFieldQuestions && this.props.listFieldQuestions.forEach((field, index) => {
          if (field.name === event.target.value) {
            this.props.question.fieldQuestionId = field._id;
            return;
          }
        });
        break;
      default:
        this.props.question.listAnswers[event.target.name] = event.target.value;
        break;
    }
  }

  changeChecked(event) {
    if (!this.props.question.answers)
      this.props.question.answers = [];
    switch (event.target.name) {
      case 'level':
        this.props.question.level = event.target.value;
        break;
      default:
        if (event.target.checked)
          this.props.question.answers.push(event.target.name);
        else
          this.props.question.answers = this.props.question.answers.filter(e => e !== event.target.name);
        break;
    }
  }

  addNewAnswer(event) {
    let lengthAnswer = this.props.question.listAnswers ? Object.keys(this.props.question.listAnswers).length : 0;
    if (lengthAnswer >= 4)
      this.state.addAnswer.push(alphabet[lengthAnswer]);
    else
      alert('Please enter >= 4 answer');

    this.setState({});
  }

  // set value display on edit item
  renderEdit() {
    if (!this.props.add_or_edit) {
      if (document.getElementById(`level_${this.props.question.level}`))
        document.getElementById(`level_${this.props.question.level}`).checked = true;
      if (document.getElementById('fieldQuestionId') && this.props.listFieldQuestions.find(e => e._id === this.props.question.fieldQuestionId))
        document.getElementById('fieldQuestionId').value = this.props.listFieldQuestions.find(e => e._id === this.props.question.fieldQuestionId).name;
      if (document.getElementById('content'))
        document.getElementById('content').value = this.props.question.content;
      this.props.question.listAnswers && Object.keys(this.props.question.listAnswers).forEach(e => {
        if (document.getElementById(`answer_question_${e}`))
          document.getElementById(`answer_question_${e}`).value = this.props.question.listAnswers[e];
      });
      this.props.question.answers && this.props.question.answers.forEach(e => {
        if (document.getElementById(`answer_${e}`))
          document.getElementById(`answer_${e}`).checked = true;
      });
    }

    return <div></div>;
  }

  render() {

    // edit item
    if (!this.props.add_or_edit) {
      for (let i = 4; i < Object.keys(this.props.question.listAnswers).length; i++) {
        if (!this.state.addAnswer.find(e => e === alphabet[i]))
          this.state.addAnswer.push(alphabet[i]);
      }
    }

    return (
      <Container>
        <Row>
          <Col sm='5'>
            <Card>
              <CardBody>
                <Row><h4>Content Question</h4></Row>
                <br />
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
                  <Label>Content Question:</Label>
                </Row>
                <Row>
                  <Input type='textarea' style={{ height: 200 }} name='content' id='content' onChange={this.changeText} />
                </Row>
                <Row>
                  <Label>Level</Label>
                </Row>
                <Row>
                  <Container>
                    <Label check sm='4'>
                      <Input
                        type='radio' name='level' value={2} id='level_2'
                        // defaultChecked={this.props.question.level && this.props.question.level === 2}
                        onChange={this.changeChecked}
                      />{' '}Hard
                  </Label>
                    <Label check sm='4'>
                      <Input
                        type='radio' name='level' value={1} id='level_1'
                        // defaultChecked={this.props.question.level && this.props.question.level === 1}
                        onChange={this.changeChecked}
                      />{' '}Medium
                  </Label>
                    <Label check sm='4'>
                      <Input
                        type='radio' name='level' value={0} id='level_0'
                        // defaultChecked={this.props.question.level && this.props.question.level === 0}
                        // checked={true}
                        onChange={this.changeChecked}
                      />{' '}Easy
                  </Label>
                  </Container>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm='7'>
            <Card>
              <CardBody>
                <Row><h4>List of Answers</h4></Row>
                <Row>
                  <Col sm='1'>
                    <Container>
                      <Input type='checkbox' name='A' id='answer_A' onChange={this.changeChecked} />
                    </Container>
                  </Col>
                  <Col sm='11'><Input onChange={this.changeText} name='A' id='answer_question_A' /></Col>
                </Row>
                <br />
                <Row>
                  <Col sm='1'>
                    <Container>
                      <Input type='checkbox' name='B' id='answer_B' onChange={this.changeChecked} />
                    </Container>
                  </Col>
                  <Col sm='11'><Input onChange={this.changeText} name='B' id='answer_question_B' /></Col>
                </Row>
                <br />
                <Row>
                  <Col sm='1'>
                    <Container>
                      <Input type='checkbox' name='C' id='answer_C' onChange={this.changeChecked} />
                    </Container>
                  </Col>
                  <Col sm='11'><Input onChange={this.changeText} name='C' id='answer_question_C' /></Col>
                </Row>
                <br />
                <Row>
                  <Col sm='1'>
                    <Container>
                      <Input type='checkbox' name='D' id='answer_D' onChange={this.changeChecked} />
                    </Container>
                  </Col>
                  <Col sm='11'><Input onChange={this.changeText} name='D' id='answer_question_D' /></Col>
                </Row>
                {
                  this.state.addAnswer.map((e, i) => <div key={i}>
                    <br />
                    <Row>
                      <Col sm='1'>
                        <Container>
                          <Input type='checkbox' name={e} id={`answer_${e}`} onChange={this.changeChecked} />
                        </Container>
                      </Col>
                      <Col sm='11'><Input onChange={this.changeText} name={e} id={`answer_question_${e}`} /></Col>
                    </Row>
                  </div>)
                }
              </CardBody>
            </Card>
            <Container>
              <Row>
                <Button
                  color='success'
                  style={{ width: '100%' }}
                  onClick={this.addNewAnswer}
                >+ ADD NEW ANSWER</Button>
              </Row>
            </Container>
          </Col>
        </Row>
        {this.renderEdit()}
      </Container>
    );
  }
}

export default Question;