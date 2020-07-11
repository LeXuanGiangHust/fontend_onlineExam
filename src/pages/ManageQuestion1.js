import { Button, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Label, Input } from 'reactstrap';
import React from 'react';
import Table from '../components/Table';
import Question1_Actions from '../actions/Questions1_Actions';

class ManageQuestion1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isCreate: false,
			question: {},
		};

		this.getAll();
		this.toggleCreate = this.toggleCreate.bind(this);
		this.changeText = this.changeText.bind(this);
	}

	changeText(event) {
		switch (event.target.name) {
			case 'content':
				this.state.question.content = event.target.value;
				break;

			default: break;
		}
		this.setState({});
	}

	toggleCreate() {
		this.state.question = {};
		this.state.isCreate = !this.state.isCreate;
		this.setState({});

		// this.setState({
		// 	isCreate: !this.state.isCreate
		// })
	}

	getAll() {
		Question1_Actions.get({}).then((res) => {
			if (res.data.total) {
				this.state.data = res.data.data;
				this.setState({});
			}
		})
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
				Header: 'Content',
				accessor: 'content',
			},
			{
				Header: 'Option',
				accessor: 'option',
				Cell: (row) => {
					return <div>
						<Button color='success'><i className='cui-pencil'></i></Button>
						<Button color='danger' onClick={() => {
							let question = row.original;
							Question1_Actions.Xoa({ _id: question._id }).then((res) => {
								this.getAll({});
							})
						}}><i className='cui-trash'></i></Button>
					</div>
				}
			}
		]
		return (
			<div>
				<Row>
					<h3>List of Questions</h3>
				</Row>
				<Row>
					<Button color='danger' onClick={this.toggleCreate}>+ ADD Question</Button>
					<Button color='success'>+ Import Question from excel</Button>
				</Row>
				<Table
					style={{ width: '100%' }}
					filterable={false}
					columns={columns}
					data={this.state.data}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					defaultPageSize={10}
				/>
				<Modal isOpen={this.state.isCreate} toggle={this.toggleCreate} size='lg' >
					<ModalHeader>Them</ModalHeader>
					<ModalBody>
						<Label>Content</Label>
						<Input id='content' name='content' value={this.state.question.content} onChange={this.changeText} />
					</ModalBody>
					<ModalFooter>
						<Button color='danger' onClick={() => {
							Question1_Actions.Them(this.state.question).then((res) => {
								this.toggleCreate();
								this.getAll({});
							})
						}}>Submit</Button>
						<Button onClick={this.toggleCreate}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ManageQuestion1;