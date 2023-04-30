import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUpdateTitleMutation } from '../api/todo.api';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { useAppDispatch } from '../store/useStore';
import { updateTodoTitleInList } from '../store/todoSlice';

type Props = {
  id: string;
  title: string;
};

const EditTodo = ({ id, title }: Props) => {
  const dispatch = useAppDispatch();
  const [updateTitle, { data, isLoading, error }] = useUpdateTitleMutation();

  const [visible, setVisible] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>(title);

  const hideDialog = () => setVisible(false);

  const handleUpdateTitle = () => {
    if (id && title !== updatedTitle) {
      updateTitle({ id, title: updatedTitle });
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(updateTodoTitleInList(data));
      hideDialog();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              placeholder="Add todo"
              value={updatedTitle}
              onChangeText={(text) => setUpdatedTitle(text)}
            />
            <Button
              mode="contained"
              loading={isLoading}
              style={{ marginTop: 16 }}
              onPress={handleUpdateTitle}
            >
              Update
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <AntDesign name="edit" size={20} color="#0d6efd" />
      </TouchableOpacity>
    </>
  );
};

export default EditTodo;
