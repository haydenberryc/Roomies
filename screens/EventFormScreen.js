import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, DatePickerIOS } from 'react-native';

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

        this.state.eventDate = new Date();
        this.state.eventName = '';
        this.state.eventDesc = '';
    }

    setDate(newDate) {
        this.setState({ eventDate: newDate });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.eventInfo}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Please Enter An Event Name</Text>
                    <TextInput ref={ref => (this.eventnameref = ref)} style={{ fontSize: 28 }} value={this.state.eventName} onChangeText={eventName => this.setState({ eventName })} placeholder="ev"></TextInput>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Please Enter An Event Description</Text>
                    <TextInput ref={ref => (this.eventdescriptionref = ref)} style={{ fontSize: 28 }} value={this.state.eventDesc} onChangeText={eventDesc => this.setState({ eventDesc })} ></TextInput>
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
        alignItems: 'center'
    }

});

