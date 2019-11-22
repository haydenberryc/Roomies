import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

let UserInfo = require('../Info');

import firebase from 'firebase';

class GroupJoinScreen extends React.Component {

    joinExistingGroup = (givenCode) => {
        firebase.database().ref('/groups/').on('value', function (snapshot) {
            snapshot.forEach((group) => {
                if (group.child("code").val() == givenCode) {
                    console.log("access code match!");
                    //console.log(typeof (group.child("members")), group.child("members"));
                    let members = 0;
                    group.child("members").forEach(mem => {
                        members++;
                    });
                    firebase.database().ref('/groups/' + group.key + '/members/').push(firebase.auth().currentUser.uid);
                }
            });
        }.bind(this));
    }

    render() {
        return (
            <View>
                <View style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <Text>Group Name</Text>
                    <TextInput placeholder='Group Name'></TextInput>
                </View>
                <View style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <Text>Access Code</Text>
                    <TextInput placeholder='Access Code'></TextInput>
                </View>
                <Button title='Submit' onPress={() => this.joinExistingGroup("12345")} />
            </View>
        );
    }
}

export default GroupJoinScreen;