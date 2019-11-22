import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import uuid from 'uuid/v4';

let UserInfo = require('../Info');

import firebase from 'firebase';

class GroupScreen extends Component {

    createNewGroup = () => {
        let guid = uuid();

        console.log("creating new group....", guid);
        firebase.database().ref('/groups/' + guid + '/members/').set([firebase.auth().currentUser.uid]);
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/group/').set(guid);

        UserInfo.groupID = guid;
    }

    render() {
        return (
            <View style={styles.container} >
                <Text>GROUP SCREEN</Text>
                <Button title="Create A New Group" onPress={() => this.createNewGroup()}></Button>
                <Button title="Join Existing Group" onPress={() => this.props.navigation.navigate('GroupJoinScreen')}></Button>
                <Button title="BACK" onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>
            </View >
        );
    }
}

export default GroupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});