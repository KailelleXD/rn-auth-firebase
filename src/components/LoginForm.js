import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';

export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
    }

    onButtonPress() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => {
                        this.setState({
                            error: 'authentication failed.'
                        });
                    });
            });
    }

  render() {
    return (
      <Card>
        <CardSection>
            <Input
                placeholder={"user@gmail.com"}
                label={"Email"}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
            />
        </CardSection>
        <CardSection>
            <Input
                secureTextEntry={true}
                placeholder={"password"}
                label={"Password"}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
            />
        </CardSection>

        <Text
            style={styles.errorTextStyle}
        >
            {this.state.error}
        </Text>

        <CardSection>
            <Button
                onPress={this.onButtonPress.bind(this)}
            >
                Log in
            </Button>
        </CardSection>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#f00',
    },
  });
