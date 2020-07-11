/* eslint-disable react/no-direct-mutation-state */
import { Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import React from 'react';
import Table from '../../components/Table';

class FieldQuestion_elm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      fieldQuestion: {},
    };
    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  toggle() {
    this.state.isOpen = !this.state.isOpen;
    this.setState({});
  }

  submit() {
    var conf = window.confirm('Are you sure?');
    if (conf) {
      this.props.submit(this.state.fieldQuestion);
      this.state.fieldQuestion = {};
      this.toggle();
    }
  }

  changeText(event) {
    switch (event.target.name) {
      case 'name':
        this.state.fieldQuestion.name = event.target.value;
        break;
      case 'description':
        this.state.fieldQuestion.description = event.target.value;
        break;
      default:
        break;
    }
    this.setState({});
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
        Header: 'ID',
        accessor: '_id',
        filterable: false
      },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: false,
      },
      {
        Header: 'Description',
        accessor: 'description',
        filterable: false,
      },
      {
        Header: 'Option',
        id: 'option',
        width: 100,
        Cell: (row) => {
          return <div>
            <Button color='link'><i className='cui-info'></i></Button>
            <Button color='link'><i className='cui-trash' onClick={() => this.props.delete(row.original._id)}></i></Button>
          </div>
        }
      }
    ];

    return (
      <div>
        <Row>
          <Button color='success' onClick={this.toggle}>CREATE NEW</Button>
        </Row>
        <br />
        <Row>
          <Table
            style={{ width: '100%' }}
            filterable={false}
            // manual
            // pages={this.state.pages}              
            // page={this.state.page}
            columns={columns}
            data={this.props.data}
            pageSizeOptions={[10, 25, 50, 75, 100]}
            defaultPageSize={10}
          />
        </Row>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} size='lg'>
          <ModalHeader>Field Question</ModalHeader>
          <ModalBody>
            <table style={{ width: '100%' }}>
              <tr>
                <td>Name:</td>
                <td><Input name='name' onChange={this.changeText} /></td>
              </tr>
              <tr>
                <br/>
              </tr>
              <tr>
                <td>Description:</td>
                <td><Input type='textarea' name='description' onChange={this.changeText} /></td>
              </tr>
            </table>
          </ModalBody>
          <ModalFooter>
            <div className='text-right'>
              <Button color='success' onClick={this.submit}>Submit</Button>&emsp;
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FieldQuestion_elm;