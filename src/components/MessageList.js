import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			username: '',
			content: '',
			sentAt: '',
			roomId: ''
		};

		this.messageRef = this.props.firebase.database().ref('messages');
	}

	componentDidMount(){
		this.messageRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ 
				messages: this.state.messages.concat( message )
			});
		});
	}

	render() {
		return (
			<div className="main">
			<table id="messageTable">
				<thead>
					<tr>
						<th>{ this.props.activeRoom ? this.props.activeRoom.name : 'Select a room' }</th>
					</tr>
				</thead>
				<tbody>
					{this.state.messages.map((message) => {
						if(message.roomId === this.props.activeRoom.key) {
						return (
							<tr key={message.key}>
								<td>
									<span className="lbl-username">{message.username}</span>
									<span className="lbl-timestamp">{message.sentAt}</span>
									<span className="lbl-content">{message.content}</span>
								</td>
							</tr>
							)
						}
					})}
				</tbody>
			</table>
			</div>

		);
	}
}


export default MessageList;