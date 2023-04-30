import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import EditTodo from './EditTodo';
import DeleteTodo from './DeleteTodo';

type Props = {
  title: string;
  status: boolean;
};

const Todo = ({ title, status }: Props) => {
  const [todoStatus, setTodoStatus] = useState<boolean>(status);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTodoStatus(!todoStatus)}
          style={styles.taskButton}
        >
          <View style={todoStatus ? styles.taskMarkerDone : styles.taskMarker}>
            {todoStatus && <AntDesign name="checksquareo" size={12} color="#FFF" />}
          </View>
          <Text style={todoStatus ? styles.taskTextDone : styles.taskText}>{title}</Text>

          <TextInput style={todoStatus ? styles.taskTextDone : styles.taskText} />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        <EditTodo />
        <DeleteTodo />
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#198754',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#198754',
    textDecorationLine: 'line-through',
  },
  iconsContainer: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 24,
  },
});
