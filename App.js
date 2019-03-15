import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { Button, CardSection, Header, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = {
    loggedIn: null,
  }

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyBt54L9qu7ftgc2x44jrxt734m_C0gofWA',
        authDomain: 'crmapp-c3a20.firebaseapp.com',
        databaseURL: 'https://crmapp-c3a20.firebaseio.com',
        projectId: 'crmapp-c3a20',
        storageBucket: 'crmapp-c3a20.appspot.com',
        messagingSenderId: '687056951240'
    });

    // Function is called when a user signs in or out.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        )
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

const styles = StyleSheet.create({
  spinnerStyle: {
    marginTop: 50,
  }
});
