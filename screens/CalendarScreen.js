import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableHighlight, Image, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

import firebase from 'firebase';

let UserInfo = require('../Info');

class CalendarScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: []
        }
        this.getEventsForDay.bind(this);
    }

    componentDidMount() {
        console.log("Calendar Mounted....");
    }

    getEventsForDay = (day) => {
        this.state.eventList = [];
        firebase.database().ref('/groups/' + UserInfo.groupID + '/events/').on("value", (snapshot) => {

            let count = 0;
            snapshot.forEach((event) => {
                if (event.child("date").val() == day.dateString) {
                    this.state.eventList.push({ id: count.toString(), title: event.child("name").val() });
                    count++;
                }
            });
            console.log(this.state.eventList);
            this.forceUpdate();
        });
    }

    render() {
        function Item({ title }) {
            return (
                <View>
                    <Text style={styles.item}>{title}</Text>
                </View>
            );
        }
        return (
            <SafeAreaView style={{ backgroundColor: '#1D3461' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('ProfilePageScreen') }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/left-arrow.png')}></Image>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('EventFormScreen') }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/add.png')}></Image>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Calendar
                        theme={{
                            backgroundColor: '#1d3461',
                            calendarBackground: '#1F487E',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#FF6600',
                            dayTextColor: 'white',
                            textDisabledColor: '#376996',
                            arrowColor: '#FF6600',
                            monthTextColor: 'white',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 20,
                            textMonthFontSize: 18,
                            textDayHeaderFontSize: 16
                        }}
                        markedDates={
                            UserInfo.myMarkedDates
                        }
                        markingType={'multi-dot'}
                        onDayPress={(day) => this.getEventsForDay(day)}
                    />
                </View>
                <View style={{ alignItems: 'center', height: '50%' }}>
                    <Text style={styles.text}>Events:</Text>
                    <FlatList
                        style={{ width: '90%', marginBottom: 20 }}
                        contentContainerStyle={{ height: '90%', alignItems: 'center', backgroundColor: '#6290C8', padding: 4 }}
                        data={this.state.eventList}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1f487e'
    },
    text: {
        fontSize: 24,
        color: 'white',
        padding: 10,
        fontWeight: 'bold'
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
    },
    item: {
        height: 35,
        color: 'white',
        fontSize: 30
    }
});