import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import { Header, Button, Spinner, CardSection } from './components/common';

class App extends Component {
  state = {
    loggedIn: null
  };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD24jW0x9XLdGI0WGCE7Og1M4nAoztvTWA',
      authDomain: 'rn-auth-50086.firebaseapp.com',
      databaseURL: 'https://rn-auth-50086.firebaseio.com',
      projectId: 'rn-auth-50086',
      storageBucket: 'rn-auth-50086.appspot.com',
      messagingSenderId: '717199039009'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
