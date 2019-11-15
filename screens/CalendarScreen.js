import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import bgImg from './images/background.jpg';

import firebase from 'firebase';

class CalendarScreen extends Component {

    constructor(props) {
        super(props);
        this.getUserID();
        this.getGroupID();
        this.getEvents();
    }

    componentDidMount() {
        console.log("Calendar Mounted....");
    }

    userID;
    groupID;
    events = [];
    myMarkedDates = {};

    getUserID() {
        this.userID = firebase.auth().currentUser.uid;
    }

    getGroupID() {
        firebase.database().ref('/users/' + this.userID + '/group').on('value', function (snapshot) {
            this.groupID = snapshot.val();
        }.bind(this));
    }

    getEvents() {
        try {
            firebase.database().ref('/groups/' + this.groupID + '/events/').on('value', function (snapshot) {
                snapshot.forEach((event) => {
                    let mDate = event.child('date').val();
                    if (this.myMarkedDates[mDate]) {
                        this.myMarkedDates[mDate].dots.push({ color: 'blue' })
                    } else {
                        this.myMarkedDates[mDate] = { dots: [{ color: 'red' }] };
                    }
                })
            }.bind(this));
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View styles={styles.container}>
                <Calendar
                    markedDates={
                        this.myMarkedDates
                    }
                    markingType={'multi-dot'}
                />
                <Button title='Back to Dashboard' onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>
                <Button title='Add A New Event' onPress={() => this.props.navigation.navigate('EventFormScreen')}></Button>

            </View>
            </ImageBackground>

        );
    }
}

export default CalendarScreen;

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