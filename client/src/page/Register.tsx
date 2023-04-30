import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import authStyle from '../style/auth.style';
import {  IRegister } from '../model/auth';
import { Button, MD3Colors, Snackbar, Text, TextInput } from 'react-native-paper';
import { useRegisterMutation } from '../api/login.api';
import { useAppDispatch } from '../store/useStore';
import { setUser } from '../store/loginSlice';
import * as SecureStore from 'expo-secure-store';

const Register = ({ navigation }: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [RegisterForm, setRegisterForm] = useState<IRegister>({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const [register, { data, isLoading, error }]: any = useRegisterMutation();

  const onDismissSnackBar = () => setVisible(false);

  const handleInputChange = (key: string, value: string): void => {
    setRegisterForm({
      ...RegisterForm,
      [key]: value,
    });
  };

  const handleRegister = async () => {
    if (RegisterForm.email !== '' && RegisterForm.password !== '' && RegisterForm.name) {
      await register(RegisterForm);
    } else {
      setVisible(true);
      setMessage('this field are required!');
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      SecureStore.setItemAsync('token', data.token);
      SecureStore.setItemAsync('name', data.name);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setVisible(true)
      setMessage(error.data);
    }
  }, [error]);

  return (
    <View style={authStyle.container}>
      <Text variant="displayMedium" style={{ marginBottom: 24 }}>
        Register
      </Text>

      <TextInput
        style={authStyle.input}
        mode="outlined"
        placeholder="name"
        value={RegisterForm.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <TextInput
        style={authStyle.input}
        mode="outlined"
        placeholder="email"
        value={RegisterForm.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />

      <TextInput
        style={authStyle.input}
        mode="outlined"
        placeholder=" password"
        secureTextEntry={true}
        value={RegisterForm.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />

      <Button mode="contained" loading={isLoading} onPress={handleRegister} style={{ marginTop: 40 }}>
        Submit
      </Button>

      <Button
        textColor={MD3Colors.neutral0}
        mode="text"
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate('Register')}
      >
        you have an account? Login here.
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
        }}
        style={{
          backgroundColor: MD3Colors.error50,
          bottom: 16,
        }}
        duration={3000}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default Register;
