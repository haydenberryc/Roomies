import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import bgImg from './images/background.jpg';

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
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.container} >
                <ActivityIndicator size='large' />
            </View >
            </ImageBackground>
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroungContainer: {
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignContent:'center',
    }
});