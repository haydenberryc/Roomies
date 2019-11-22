import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

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

    addUserToGroup() {

    }

    render() {
        return (
            <View style={styles.container} >
                <Text>Dashboard Screen</Text>
                <Button title='Sign Out' onPress={() => this.signOut()}></Button>
                <Button title='Calendar View' onPress={() => this.props.navigation.navigate('CalendarScreen')}></Button>
                <Button title='Create New Event' onPress={() => this.props.navigation.navigate('EventFormScreen')}></Button>
                <Button title='PROFILE' onPress={() => this.props.navigation.navigate('ProfilePageScreen')}></Button>
                <Button title='Add User To Group' onPress={() => this.addUserToGroup()}></Button>
            </View >
        );
    }
}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});