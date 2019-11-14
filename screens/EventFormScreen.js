import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, DatePickerIOS } from 'react-native';

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
        this.props.navigation.navigate('DashboardScreen');
    }

    setDate(newDate) {
        this.setState({ eventDate: newDate });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.eventInfo}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Event Creation Form</Text>
                </View>
                <View style={styles.eventInfo}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Please Enter An Event Name</Text>
                    <TextInput style={{ fontSize: 28 }} value={this.state.eventName} onChangeText={eventName => this.setState({ eventName })} placeholder="event name"></TextInput>
                </View>
                <View style={styles.eventInfo}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Please Enter An Event Description</Text>
                    <TextInput style={{ fontSize: 28 }} value={this.state.eventDesc} onChangeText={eventDesc => this.setState({ eventDesc })} placeholder="event description" ></TextInput>
                </View>
                <View style={styles.datepicker}>
                    <DatePickerIOS date={this.state.eventDate} onDateChange={this.setDate} />
                </View>
                <Button title="submit" onPress={() => this.createEvent()} />
                <Button title="back" onPress={() => this.props.navigation.navigate('DashboardScreen')} />
            </View>
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
    }

});

