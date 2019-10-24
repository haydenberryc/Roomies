import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';

import firebase from 'firebase';

class EventFormScreen extends Component {

    render() {
        return (
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
                <TextInput
                    style={styles.textInput}
                    placeholder="Please Enter The Event Date"
                    maxLength={20}
                    fontSize={28}
                />
            </View >
        );
    }
}

export default EventFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});