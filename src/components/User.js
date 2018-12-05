import React, { Component } from 'react';
import './User.css';

class User extends Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	signIn() {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup(provider).then((result) => {
			const user = result.user;
			this.props.setUser(user);
		});
	}

	signOut() {
		this.props.firebase.auth().signOut().then(() => {
			this.props.setUser(null);
		}).catch((err) => {
			console.log("An error occurred: " + err);
		});
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setUser(user);
		})
	}

	render() {
		return (
			<div className="User">
				<span>Weclome, {this.props.user}</span>
				{ this.props.user === 'Guest'? 
				<button className="signIn" onClick={this.signIn}>Sign In</button> : ''}
				<button className="signOut" onClick={this.signOut}>Sign Out</button>
				
			</div>
		);
	}
}

export default User;