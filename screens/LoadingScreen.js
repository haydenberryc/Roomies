import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import bgImg from './images/background.jpg';

let UserInfo = require('../Info');

class LoadingScreen extends Component {

    getUserID() {
        UserInfo.userID = firebase.auth().currentUser.uid;
    }

    getGroupID() {
        firebase.database().ref('/users/' + UserInfo.userID + '/group').on('value', function (snapshot) {
            UserInfo.groupID = snapshot.val();
        }.bind(this));
    }

    getEvents() {
        try {
            firebase.database().ref('/groups/' + UserInfo.groupID + '/events/').on('value', function (snapshot) {
                UserInfo.myMarkedDates = {};
                let eDate, eName;
                snapshot.forEach((event) => {
                    eDate = event.child('date').val();
                    eName = event.child('name').val();
                    if (UserInfo.myMarkedDates[eDate]) {
                        UserInfo.myMarkedDates[eDate].dots.push({ key: eName, color: 'blue' })
                    } else {
                        UserInfo.myMarkedDates[eDate] = { dots: [{ key: eName, color: 'red' }] };
                    }
                })
            }.bind(this));
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        console.log("loading screen mounted..")
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/group').on('value', function (snapshot) {
                    if (snapshot.val() == null) { this.props.navigation.navigate('GroupScreen'); }
                    else {
                        this.getUserID();
                        this.getGroupID();
                        this.getEvents();
                        this.props.navigation.navigate('DashboardScreen');
                    }
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