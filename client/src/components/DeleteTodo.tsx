import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {};

const DeleteTodo = (props: Props) => {
  return (
    <TouchableOpacity>
      <AntDesign name="delete" size={20} color="#dc3545" />
    </TouchableOpacity>
  );
};

export default DeleteTodo;

