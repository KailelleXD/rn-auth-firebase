import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    }

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({
            error: '',
            loading: true,
        })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        })
    }

    onLoginFail() {
        this.setState({
            error: 'authentication failed.',
            loading: false,
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }

        return (
            <Button
                onPress={this.onButtonPress.bind(this)}
            >
                Log in
            </Button>
        )
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
            {this.renderButton()}
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
