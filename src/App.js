import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom: ''
    };
    this.selectActiveRoom = this.selectActiveRoom.bind(this);
  }

  selectActiveRoom(room) {
    this.setState({
      activeRoom: room
    });
  }

  render() {
    return (
      <div className="App">
        <aside className="sidebar">
          <RoomList 
          firebase={firebase} 
          activeRoom={this.state.activeRoom} 
          selectActiveRoom={this.selectActiveRoom}
          />
        </aside>
        <section className="messages">
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </section>
      </div>
    );
  }
}

export default App;
