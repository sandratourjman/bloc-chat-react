import React, { Component } from 'react';
import './RoomList.css';
import Modal from 'react-modal';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			name: '',
			modalIsOpen: false
			};

		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	createRoom(newRoomName) {
		this.roomsRef.push({
  			name: newRoomName
		});
		this.setState({
			name: ''
		});
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.createRoom(e.target.elements.name.value);
		let form = document.getElementById("room-form");
		form.reset();
		this.closeModal();
	}

	handleChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	componentWillMount() {
		Modal.setAppElement('body');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ 
				rooms: this.state.rooms.concat( room )
			});
		});
	}

	render() {
		return(
			<div className="rooms">
			<table>
				<thead>
					<tr>
						<th>Bloc Chat</th>
						<th>
							<button className="newRoomButton" onClick={this.openModal}>New Room</button>
						</th>
					</tr>
				</thead> 
	          <tbody>
				{this.state.rooms.map((room) =>
					<tr key={room.key}>
						<td onClick={()=> this.props.selectActiveRoom(room)}>{room.name}</td>
					</tr>
					)}
				</tbody>
			</table>

			<Modal isOpen={this.state.modalIsOpen} className="modal-style">
				<form id="room-form" onSubmit={(e) => this.handleSubmit(e)}>
						<h4>Create new room</h4>
						<p>Enter a room name</p>
						<input type="text" name="name" onChange={(e) => this.handleChange(e)}/>
						<div className="modal-buttons">
							<button className="inner-button cancel-button" onClick={this.closeModal}>Cancel</button>
							<button type="submit"className="inner-button newroom-button" disabled={!this.state.name} >Create Room</button>
						</div>
				</form>
				
			</Modal>
				
			</div>
		);
	}
}

export default RoomList;