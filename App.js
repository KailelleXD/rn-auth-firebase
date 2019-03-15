import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyBt54L9qu7ftgc2x44jrxt734m_C0gofWA',
        authDomain: 'crmapp-c3a20.firebaseapp.com',
        databaseURL: 'https://crmapp-c3a20.firebaseio.com',
        projectId: 'crmapp-c3a20',
        storageBucket: 'crmapp-c3a20.appspot.com',
        messagingSenderId: '687056951240'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText='Authentication' />
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
