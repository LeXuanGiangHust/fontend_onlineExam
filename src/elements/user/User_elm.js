import { ListGroup } from 'reactstrap';
import React from 'react';
import UserExam from './UserExam';

class User_elm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ListGroup>
          {
            this.props.data.map((e, i) => {
              return <UserExam
                item={e} key={e._id} stt={i + 1}
                fieldQuestions={this.props.fieldQuestions}
                deleteSubject={this.props.deleteSubject}
                addSubject={this.props.addSubject}
                role={this.props.role}
                delete={this.props.delete}
              />
            })
          }
        </ListGroup>
      </div>
    );
  }
}

export default User_elm;