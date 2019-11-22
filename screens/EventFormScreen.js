import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight, Image, Text, DatePickerIOS, SafeAreaView } from 'react-native';

let UserInfo = require('../Info');

import firebase from 'firebase';

class EventFormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDate: new Date(),
            eventName: '',
            eventDesc: ''
        }

        this.setDate = this.setDate.bind(this);
    }

    createEvent() {
        console.log("creating event with...");
        console.log(this.state.eventName);
        console.log(this.state.eventDesc);
        console.log(this.state.eventDate);

        let date = this.state.eventDate.toLocaleDateString();
        let year = date.match(/\d{4}/g)[0];
        let month = date.match(/\d{1,2}/g)[0];
        let day = date.match(/\d{1,2}/g)[1];
        date = year + '-' + month + '-' + day;

        firebase.database().ref('/groups/' + UserInfo.groupID + '/events/').push({
            date: date,
            name: this.state.eventName,
            desc: this.state.eventDesc,
            requestee: '',
            owner: UserInfo.userID,
            isClaimable: false
        });

        this.setState({ eventName: '', eventDesc: '', eventDate: new Date() });
        this.props.navigation.navigate('CalendarScreen');
    }

    setDate(newDate) {
        this.setState({ eventDate: newDate });
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#1D3461' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <View style={{ backgroundColor: '#6290C8', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Event Creation Form</Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Please Enter An Event Name</Text>
                        <TextInput style={{ color: '#FF6600', fontSize: 28 }} value={this.state.eventName} onChangeText={eventName => this.setState({ eventName })} placeholder="event name" placeholderTextColor="#FF6600"></TextInput>
                    </View>
                    <View style={styles.input}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Please Enter An Event Description</Text>
                        <TextInput style={{ color: '#FF6600', fontSize: 28 }} value={this.state.eventDesc} onChangeText={eventDesc => this.setState({ eventDesc })} placeholder="event description" placeholderTextColor="#FF6600"></TextInput>
                    </View>
                    <View style={{ margin: 20 }}>
                        <DatePickerIOS style={{ backgroundColor: '#6290C8', marginTop: 15 }} date={this.state.eventDate} onDateChange={this.setDate} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableHighlight onPress={() => { this.props.navigation.navigate('ProfilePageScreen') }}>
                                <View style={styles.buttons}>
                                    <Image style={styles.images} source={require('../assets/left-arrow.png')}></Image>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => { this.createEvent() }}>
                                <View style={styles.buttons}>
                                    <Image style={styles.images} source={require('../assets/check-mark.png')}></Image>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default EventFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    eventInfo: {
        alignItems: 'center',
        padding: 10
    },
    input: {
        borderWidth: 2,
        borderColor: '#6290C8',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    buttons: {
        backgroundColor: "#1F487E",
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#6290c8",
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
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 12,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: -2
        }
    }
});

