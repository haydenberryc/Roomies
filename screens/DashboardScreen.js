import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, Button } from 'react-native';
import bgImg from './images/background.jpg';

let UserInfo = require('../Info');
import firebase from 'firebase';

class DashboardScreen extends Component {

    signOut() {
        UserInfo.userID = "";
        UserInfo.groupID = "";
        UserInfo.events = [];
        UserInfo.myMarkedDates = {};
        firebase.auth().signOut();
    }

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.container} >
                <Text>Dashboard Screen</Text>
                <Button title='Sign Out' onPress={() => this.signOut()}></Button>
                <Button title='Calendar View' onPress={() => this.props.navigation.navigate('CalendarScreen')}></Button>
                <Button title='Create New Event' onPress={() => this.props.navigation.navigate('EventFormScreen')}></Button>
            </View >
            </ImageBackground>

        );
    }
}

export default DashboardScreen;

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