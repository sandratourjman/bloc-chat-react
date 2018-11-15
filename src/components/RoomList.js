import React, { Component } from 'react';

class RoomList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rooms: [],
			name: ''
		};

		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	createRoom(newRoomName) {
		this.roomsRef.push({
  			name: newRoomName
		});
		this.setState({
			name: ''
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		this.createRoom(e.target.elements.name.value);
		let form = document.getElementById("room-form");
		form.reset();
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
				<ul>
				{this.state.rooms.map((room) =>
					<li key={room.key}>{room.name}</li>
					)}
				</ul>

				<form id="room-form" onSubmit={(e) => this.handleSubmit(e)}>
 					<p> Add a room</p>
  					<input type="text" name="name" />
  					<input type="submit" value="Submit" />
				</form> 
			</div>
		);
	}
}

export default RoomList;