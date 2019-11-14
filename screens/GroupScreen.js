import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import uuid from 'uuid/v4';
import bgImg from './images/background.jpg';

import firebase from 'firebase';

class GroupScreen extends Component {

    createNewGroup = () => {
        let guid = uuid();

        console.log("creating new group....", guid);
        firebase.database().ref('/groups/' + guid + '/members/').set([firebase.auth().currentUser.uid]);
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/group/').set(guid);

    }

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.container} >
                <Text>GROUP SCREEN</Text>
                <Button title="Create A New Group" onPress={() => this.createNewGroup()}></Button>
                <Button title="Join Existing Group"></Button>
                <Button title="BACK" onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>
            </View >
            </ImageBackground>
        );
    }
}

export default GroupScreen;

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