import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Image } from 'react-native';

import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import bgImg from './images/background.jpg'
import ourlogo from './images/logo.png'
class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }
    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    console.log('user signed in ');
                    if (result.additionalUserInfo.isNewUser) {
                        firebase.database()
                            .ref('/users/' + result.user.uid)
                            .set({
                                gmail: result.user.email,
                                profile_picture: result.additionalUserInfo.profile.picture,
                                locale: result.additionalUserInfo.profile.locale,
                                first_name: result.additionalUserInfo.profile.given_name,
                                last_name: result.additionalUserInfo.profile.family_name
                            });
                    }
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    }

    signInAsync = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: '85029936204-nqmmpb4bmgem13hu82clsjsmv0iiefam.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        }
        catch (e) {
            return { error: true };
        }
    }

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.logoContainer} >
            {/* <View style={styles.container} > */}
                <Image source={ourlogo} style={styles.logo}/>
                <Text style={styles.logoText}>ROMMIES</Text>
                <Button title='Sign In With Google' onPress={() => this.signInAsync()}></Button>
            </View >
            </ImageBackground>
        );
    }
}

export default LoginScreen;

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
    },
    logoContainer: {
        alignItems:'center'
    },
    logo:{
        width:120,
        height:120,
    },
    logoText:{
        color:'red',
        fontSize: 20,
        fontWeight: 'normal',
        marginTop: 10,
        opacity: 0.5,
        padding: 10,

    },
    btnSignIn:{
        height:45,
        borderRadius:25,
        fontSize:16,
        justifyContent: 'center',
       
    }
});