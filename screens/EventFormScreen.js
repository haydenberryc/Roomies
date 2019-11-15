import React, { Component } from 'react';
import { View, TextInput, StyleSheet,ImageBackground, Button, Text } from 'react-native';
import bgImg from './images/background.jpg';

import firebase from 'firebase';

class EventFormScreen extends Component {

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
                <TextInput
                    style={styles.textInput}
                    placeholder="Please Enter The Event Date"
                    maxLength={20}
                    fontSize={28}
                />
            </View >
            </ImageBackground>
        );
    }
}

export default EventFormScreen;

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