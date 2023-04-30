import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/page/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/page/Register';
import TodoPage from './src/page/TodoPage';
import * as SecureStore from 'expo-secure-store';
import { IconButton, MD3Colors, Provider as PaperProvider } from 'react-native-paper';
import Loader from './src/components/Loader';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './src/store/useStore';
import { getUser, logout, setUser } from './src/store/loginSlice';


 function App() {
  const Stack = createNativeStackNavigator();

  const [isLoading, setLoading] = useState<boolean>(false);
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        setLoading(true);

        const token = await SecureStore.getItemAsync('token');
        const userName = await SecureStore.getItemAsync('name');

        if (token && userName) {
          dispatch(setUser({token , name:userName}))
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  const DeleteUserData = async (key: string) => {
    return await SecureStore.deleteItemAsync(key);
  };

  const handelLogout = async () => {
    await DeleteUserData('token');
    await DeleteUserData('name');
    dispatch(logout());
  };

  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isLoading ? (
              <Stack.Screen name="loading" component={Loader} options={{ headerShown: false }} />
            ) : !user.token ? (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <Stack.Screen
                name="Todo"
                component={TodoPage}
                options={{
                  title: `Welcome ${user.name}`,
                  headerRight: () => (
                    <IconButton
                      icon="logout"
                      iconColor={MD3Colors.error50}
                      size={28}
                      onPress={handelLogout}
                    />
                  ),
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
