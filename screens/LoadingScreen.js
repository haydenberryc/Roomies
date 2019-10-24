import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/group').on('value', function (snapshot) {
                    if (snapshot.val() == null) { this.props.navigation.navigate('GroupScreen'); }
                    else { this.props.navigation.navigate('DashboardScreen'); }
                }.bind(this));
            }
            else {
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this));
    }

    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator size='large' />
            </View >
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});