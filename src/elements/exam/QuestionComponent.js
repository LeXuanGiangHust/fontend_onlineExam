import { Card, CardBody, Row, Label, Container, Input } from 'reactstrap';
import React from 'react';

class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.changeAnswer = this.changeAnswer.bind(this);
  }

  changeAnswer(event) {
    if (!this.props.question.answerTest)
      this.props.question.answerTest = [];
    if (event.target.checked) {
      this.props.question.answerTest.push(event.target.name);
    } else {
      // eslint-disable-next-line
      this.props.question.answerTest = this.props.question.answerTest.filter(e => e != event.target.name);
    }
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Card>
          <CardBody>
            <Row>
              <Label><b>{this.props.stt + 1}. </b>{this.props.question.content}</Label>
            </Row>
            <Container>
              {
                this.props.question.listAnswers &&
                Object.keys(this.props.question.listAnswers).map((e, i) =>
                  <Row key={i + this.props.stt * 10}>
                    <Container>
                      <Input type='checkbox' name={e} onClick={this.changeAnswer} />
                      <Label><b>{e}. </b>{this.props.question.listAnswers[e]}</Label>
                    </Container>
                  </Row>
                )
              }
            </Container>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default QuestionComponent;