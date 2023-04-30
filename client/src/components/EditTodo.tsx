import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

type Props = {}

const EditTodo = (props: Props) => {
  return (
    <TouchableOpacity>
    <AntDesign name="edit" size={20} color="#0d6efd" />
  </TouchableOpacity>
)
}

export default EditTodo

const styles = StyleSheet.create({})