import React, { Component } from 'react';
import { View, TextInput, StyleSheet,ImageBackground, Button, Text, DatePickerIOS } from 'react-native';
import bgImg from './images/background.jpg';

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
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.container} >
                <Text>New Event Form Screen</Text>
                <Button title='Back to Dashboard' onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>
                <TextInput
                    style={styles.textInput}
                    placeholder="Please Enter An Event Name"
                    maxLength={20}
                    fontSize={28}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Please Enter An Event Descrition"
                    maxLength={20}
                    fontSize={28}
                />
                <View style={styles.textInput}>
                    <DatePickerIOS date={this.state.eventDate} onDateChange={this.setDate} />
                </View>
                <Button title="submit" onPress={() => this.createEvent()} />
                <Button title="back" onPress={() => this.props.navigation.navigate('DashboardScreen')} />
            </View >
            </ImageBackground>
        );
    }
}

export default EventFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

