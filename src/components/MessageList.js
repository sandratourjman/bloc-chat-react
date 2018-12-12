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

	sendMessage(e) {
    	e.preventDefault();
    	this.messageRef.push({
  			username : this.props.user.displayName,
  			content : this.state.content,
  			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  			roomId: this.props.activeRoom.key
		});
		this.setState({
			username: '',
			content: '',
			sentAt: '',
		 	roomId: ''
		});
  	}

  	convertTime(milliseconds) {
		 //let seconds = (milliseconds / 1000) % 60;
		let minutes = parseInt(((milliseconds / (1000 * 60)) % 60));
		let hours = parseInt(((milliseconds / (1000 * 60 * 60)) % 24));
		hours = hours > 12 ? hours - 12 : hours

		let date = new Date();
		let dateHours = date.getHours();
		let ampm = dateHours >= 12 ? "pm" : "am";

		
		return (
			hours + ":" + (minutes < 10 ? '0' + minutes : minutes) + " "  + ampm
			);
  	}

  	handleChange(e) {
  		this.setState({
  			content: e.target.value
  		});
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
										<span className="lbl-timestamp">{ this.convertTime(message.sentAt) }</span>
										<span className="lbl-content">{message.content}</span>
									</td>
								</tr>
								)
							}
						})}
					</tbody>
				</table>
				<footer className="footer">
				{ this.props.activeRoom !== '' ? 
		          <form className="messageBar-form">
		          	<textarea rows="4" cols="150" 
		          	placeholder="Write your message here..." value={this.state.content} onChange={(e) => this.handleChange(e)}></textarea>
		          	<input type="submit" className="message-submit" value="Send" onClick={(e) => this.sendMessage(e)}/>
		          </form>
		          : ''}
		        </footer>
			</div>

		);
	}
}


export default MessageList;