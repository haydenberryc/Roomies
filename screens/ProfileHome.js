import React, { Component } from 'react';
import bgImg from './images/background.jpg';
import { Constants } from 'expo';
import {StyleSheet, Text, View, Image, Button, ImageBackground, Linking, TouchableHighlight} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'



export default class ProfileHome extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://pics.loveforquotes.com/funny-emoji-memes-49472562.png?fbclid=IwAR0HopRyd_UpklIPwG5jcrRNYEexfzfWrDKtvudPCA522wcU7EZ_Cv1jlT0'}}/>
                <Text style={styles.name}>
                  Your Name
                </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>


              <TouchableHighlight onPress={()=>{
                  this.props.navigation.navigate('CalendarScreen')
                  }}>
              <View style={styles.menuBox}>
                <Text style={styles.info}>All</Text>

              </View>
              </TouchableHighlight>

            <TouchableHighlight onPress={()=>{
                  this.props.navigation.navigate('EventFormScreen')
                  }}>
              <View style={styles.menuBox}>
                <Text style={styles.info}>Add</Text>

              </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={()=>{
                  this.props.navigation.navigate('FeedScreen')
                  }}>
              <View style={styles.menuBox}>
                <Text style={styles.info}>Feed</Text>

              </View>
              </TouchableHighlight>

              
              <View style={styles.menuBox}>
              <Text style={styles.info}>TBD</Text>

              </View>

              <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://www.dominos.com/en/')}}>
              <View style={styles.menuBox}>
                <Text style={styles.info}>Food</Text>

              </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://www.walmart.com')}}>
              <View style={styles.menuBox}>
                <Text style={styles.info}>Grocery</Text>

              </View>
              </TouchableHighlight>


            </View>
        </View>
        <Button title='Back' onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>

      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "purple",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  }
});
  