import { Row, Col } from 'reactstrap';
import React from 'react';
import ExamComponent from './ExamComponent';

class Exam_elm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.startTest = this.startTest.bind(this);
  }

  startTest(fieldId) {
    let conf = window.confirm('Do you want go on test?');
    if (conf) {
      this.props.testOnline(fieldId);
    }
  }

  renderListExam() {
    var arrComponent = [];
    for (let i = 0; i < this.props.data.length; i += 3) {
      arrComponent.push(
        <Row>
          <Col sm='4'>
            {this.props.data[i] && <ExamComponent key={i} item={this.props.data[i]} startTest={this.startTest} enablePrint={this.props.enablePrint} />}
          </Col>
          <Col sm='4'>
            {this.props.data[i + 1] && <ExamComponent key={i + 1} item={this.props.data[i + 1]} startTest={this.startTest} enablePrint={this.props.enablePrint} />}
          </Col>
          <Col sm='4'>
            {this.props.data[i + 2] && <ExamComponent key={i + 2} item={this.props.data[i + 2]} startTest={this.startTest} enablePrint={this.props.enablePrint} />}
          </Col>
        </Row>
      )
    }

    return <div>
      {
        arrComponent.map((e, i) => {
          return e;
        })
      }
    </div>
  }

  render() {
    return (
      <div>
        {
          this.renderListExam()
          // this.props.data.map((e, i) => <ExamComponent key={i} item={e} startTest={this.startTest} />)
        }
      </div>
    );
  }
}

export default Exam_elm;