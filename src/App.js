import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

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
  render() {
    return (
      <div className="App">
          <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
