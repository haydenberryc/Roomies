import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

let UserInfo = require('../Info');

import firebase from 'firebase';

class ProfilePage extends React.Component {

    signOut() {
        UserInfo.userID = "";
        UserInfo.groupID = "";
        UserInfo.events = [];
        UserInfo.myMarkedDates = {};
        firebase.auth().signOut();
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#1F487E' }}>
                <View style={{ height: 250, backgroundColor: '#1D3461', alignItems: 'center', padding: 10 }}>
                    <Image style={styles.profilepicture}
                        source={{ uri: firebase.auth().currentUser.photoURL }} />
                    <Text style={styles.username}>
                        {firebase.auth().currentUser.displayName}
                    </Text>
                </View>
                <View style={{ height: 425, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('CalendarScreen') }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/calendar.png')}></Image>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('EventFormScreen') }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/clipboard.png')}></Image>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableHighlight onPress={() => { this.signOut() }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/logout.png')}></Image>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}

export default ProfilePage;

const styles = StyleSheet.create({
    profilepicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#6290c8",
        marginBottom: 10,
        marginTop: 30
    },
    username: {
        fontSize: 22,
        color: "white",
        fontWeight: '600',
    },
    buttons: {
        backgroundColor: "#1F487E",
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        shadowColor: 'white',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: -2
        },
        elevation: 4
    },
    images: {
        backgroundColor: "#6290C8",
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: -2
        }
    }
});