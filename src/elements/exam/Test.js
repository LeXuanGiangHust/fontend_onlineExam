/* eslint-disable react/no-direct-mutation-state */
import { Row, Label, Col, Button } from 'reactstrap';
import React from 'react';
import QuestionComponent from './QuestionComponent';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 0,
      h: 0,
      m: 0,
      s: 0
    };

    this.setTimer();

    this.submit = this.submit.bind(this);
  }

  setTimer() {
    // this.state.countdown = this.props.test.timeLive;
    // this.state.h = Math.floor(this.props.test.timeLive / 3600);
    // this.state.m = Math.floor((this.props.test.timeLive - this.state.h * 3600) / 60);
    // this.state.s = this.props.test.timeLive - this.state.h * 3600 - this.state.m * 60;

    var countDown = this.props.test.timeLive;
    var x = setInterval(function () {
      let h = Math.floor(countDown / 3600);
      let m = Math.floor((countDown - h * 3600) / 60);
      let s = countDown - h * 3600 - m * 60;
      if (!document.getElementById("timerTest")) {
        clearInterval(x);
        return;
      }
      document.getElementById("timerTest").innerHTML = h + 'h ' + m + 'm ' + s + 's';
      countDown--;
      if (countDown < 0) {
        clearInterval(x);
        document.getElementById("timerTest").innerHTML = "EXPIRED";
        document.getElementById("expiredExam").click();
      }
    }, 1000);
  }

  submit() {

  }

  render() {
    return (
      <div>
        <Row>
          <Label sm='3'>Test</Label>
          <Col sm='6' className='text-center'>
            <p id="timerTest"></p>
          </Col>
          <Col sm='3' className='text-right'>
            <Button id='expiredExam' style={{ visibility: 'hidden' }}></Button>
            <Button id='submitAnswer' onClick={() => this.props.submit()} color='success'>Submit</Button>
          </Col>
        </Row>
        <hr />
        <div>
          {
            this.props.test.listQuestions && this.props.test.listQuestions.map((e, i) =>
              <Row key={e._id}>
                <QuestionComponent
                  question={e}
                  stt={i}
                />
              </Row>
            )
          }
        </div>
      </div>
    );
  }
}

export default Test;