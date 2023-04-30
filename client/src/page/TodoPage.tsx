import { View,  StyleSheet } from 'react-native'
import React from 'react'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import Loader from '../components/Loader'

type Props = {}

const TodoPage = (props: Props) => {
  return (
    <>
    <View style={styles.container}>
      <TodoList />
      <AddTodo />
    </View>

    </>
  )
}

export default TodoPage;


const styles = StyleSheet.create({
    container:{
      height:'100%',
      backgroundColor:"#fff",
      padding:16,
      marginTop:16
    } 
  })
  