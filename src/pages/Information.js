/* eslint-disable react/no-direct-mutation-state */
import { } from 'reactstrap';
import React from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import User_Actions from '../actions/User_Actions';
import { BASE_ADDRESS } from '../containers/constant/CONSTANT';

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.getUser();

    this.changeText = this.changeText.bind(this);
  }

  changeText(event) {
    switch (event.target.name) {
      case 'name':
        this.state.user.name = event.target.value;
        break;
      case 'password':
        this.state.user.password = event.target.value;
        break;
      case 'email':
        this.state.user.email = event.target.value;
        break;
      case 'class':
        this.state.user.class = event.target.value;
        break;
      case 'age':
        this.state.user.age = event.target.value;
        break;
      default:
        break;
    }
    this.setState({});
  }

  getUser() {
    User_Actions.get({ _id: this.props.authentication.user._id }).then((res) => {
      this.state.user = res.data.data.find(e => e._id === this.props.authentication.user._id);
      this.setState({});
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={(event) => {
                    event.preventDefault();
                    this.state.password = event.target.password.value;
                    this.state.name = event.target.name.value;
                    this.state.email = event.target.email.value;
                    this.state.age = event.target.age.value;
                    this.state.class = event.target.class.value;

                    User_Actions.patch({
                      _id: this.state.user._id,
                      password: this.state.password,
                      name: this.state.name,
                      email: this.state.email,
                      age: this.state.age,
                      class: this.state.class,
                    }).then((res) => {
                      this.getUser();
                    })
                  }
                  }>
                    <h1>Change information</h1>
                    <p className="text-muted">Change information:</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" name="password" value={this.state.user.password} onChange={this.changeText} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Name" autoComplete="name" name="name" value={this.state.user.name} onChange={this.changeText} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" name="email" value={this.state.user.email} onChange={this.changeText} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Age" autoComplete="age" name="age" value={this.state.user.age} onChange={this.changeText} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Class" autoComplete="class" name="class" value={this.state.user.class} onChange={this.changeText} />
                    </InputGroup>
                    <Button color="success" block>Edit</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div >

    );
  }
}

export default Information;