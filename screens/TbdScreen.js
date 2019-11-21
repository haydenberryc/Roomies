import React, { Component } from 'react';
import bgImg from './images/background.jpg';
import { View, Text, StyleSheet,ImageBackground, Button, Platform, FlatList } from 'react-native';
import Header from './userComponents/header';
import InputBar from './userComponents/InputBar';
import TodoItem from './userComponents/TodoItem';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class App extends React.Component {

  constructor(){
    super();

    this.state={
      todoInput:'',
      todos: [
        {id: 0, title: "Quote of the Day: Hustle Until your HATERS ask if you are HIRING", done: false},
      ]
    }
  }

addNewTodo(){
  let todos = this.state.todos;
  todos.unshift({
    id: todos.length +1,
    title: this.state.todoInput,
    done: false
  });
  this.setState({
    todos,
    todoInput:''
  });
}

toggleDone(item){
  let todos = this.state.todos;
  todos = todos.map((todo)=>{
    if(todo.id==item.id){
      todo.done=!todo.done;
    }

    return todo;
  })

  this.setState({todos});
}

removeTodo(item){
  let todos=this.state.todos;
  todos=todos.filter((todo)=>todo.id !== item.id);
  this.setState({todos});
}



  render(){
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>

    return (
    <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
      <View style={styles.header}>
        <View>
        {statusbar}
        </View>
        <Header title='My Feed'/>

        <InputBar 
          textChange={todoInput => this.setState({todoInput})}
          addNewTodo={()=> {
              this.addNewTodo()
            }}
        />
        <FlatList 
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ ({item,index}) => {
            return(
              <TodoItem todoItem={item} toggleDone={()=>this.toggleDone(item)} removeTodo={()=>this.removeTodo(item)}/>
            )
          }}
        />
          <Button title='Back' onPress={() => this.props.navigation.navigate('ProfileHome')}></Button>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
    },
    statusbar: {
        height: 20
    }
});


  

  