import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import authStyle from '../style/auth.style';
import { ILogin } from '../model/auth';
import { Button, MD3Colors, Snackbar, Text, TextInput } from 'react-native-paper';
import { useLoginMutation } from '../api/login.api';
import { useAppDispatch } from '../store/useStore';
import { setUser } from '../store/loginSlice';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [loginForm, setLoginFrom] = useState<ILogin>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const [login, { data, isLoading, error }]: any = useLoginMutation();

  const onDismissSnackBar = () => setVisible(false);

  const handleInputChange = (key: string, value: string): void => {
    setLoginFrom({
      ...loginForm,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    if (loginForm.email !== '' && loginForm.password !== '') {
      await login(loginForm);
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
        Login
      </Text>

      <TextInput
        style={authStyle.input}
        mode="outlined"
        placeholder="email"
        value={loginForm.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />

      <TextInput
        style={authStyle.input}
        mode="outlined"
        placeholder=" password"
        secureTextEntry={true}
        value={loginForm.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />

      <Button mode="contained" loading={isLoading} onPress={handleLogin} style={{ marginTop: 40 }}>
        Submit
      </Button>

      <Button
        textColor={MD3Colors.neutral0}
        mode="text"
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate('Register')}
      >
        need an account? Register here.
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

export default Login;
