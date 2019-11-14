import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

let UserInfo = require('../Info');

import firebase from 'firebase';

class CalendarScreen extends Component {

    componentDidMount() {
        console.log("Calendar Mounted....");
    }

    render() {
        return (
            <View styles={styles.container}>
                <Calendar
                    markedDates={
                        UserInfo.myMarkedDates
                    }
                    markingType={'multi-dot'}
                />
                <Button title='Back to Dashboard' onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>
                <Button title='Add A New Event' onPress={() => this.props.navigation.navigate('EventFormScreen')}></Button>
            </View>

        );
    }
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});