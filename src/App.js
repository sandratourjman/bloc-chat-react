import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBV8uOfWmqfPGhJtUvF3ZzZuanLIvrpTF8",
    authDomain: "bloc-chat-4c3dd.firebaseapp.com",
    databaseURL: "https://bloc-chat-4c3dd.firebaseio.com",
    projectId: "bloc-chat-4c3dd",
    storageBucket: "bloc-chat-4c3dd.appspot.com",
    messagingSenderId: "652757721493"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: ''
    };
    this.selectActiveRoom = this.selectActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  selectActiveRoom(room) {
    this.setState({
      activeRoom: room
    });
  }

  setUser(user) {
    this.setState({
      user: user
    });
  }


  render() {
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="App">
        <nav>
          <User firebase={firebase} setUser={this.setUser} user={currentUser}/>
        </nav>
        <aside className="sidebar">
          <RoomList 
          firebase={firebase} 
          activeRoom={this.state.activeRoom} 
          selectActiveRoom={this.selectActiveRoom}
          />
        </aside>
        <section className="messages">
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} />
        </section>

      </div>
    );
  }
}

export default App;
