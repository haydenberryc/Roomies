import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import bgImg from './images/background.jpg';
let UserInfo = require('../Info');

import firebase from 'firebase';

class CalendarScreen extends Component {

    componentDidMount() {
        console.log("Calendar Mounted....");
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
        margin: 10,
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
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