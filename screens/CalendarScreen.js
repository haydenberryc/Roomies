import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

let UserInfo = require('../Info');

import firebase from 'firebase';

class CalendarScreen extends Component {

    componentDidMount() {
        console.log("Calendar Mounted....");
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Calendar
                        markedDates={
                            UserInfo.myMarkedDates
                        }
                        markingType={'multi-dot'}
                    />
                    <Button title='Back to Dashboard' onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>
                    <Button title='Add A New Event' onPress={() => this.props.navigation.navigate('EventFormScreen')}></Button>
                </View>
                <View style={styles.text}>
                    <Text style={styles.text}>Event List</Text>
                </View>
            </View>
        );
    }
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        alignItems: 'center',
        padding: 10,
        fontWeight: 'bold'
    }
});