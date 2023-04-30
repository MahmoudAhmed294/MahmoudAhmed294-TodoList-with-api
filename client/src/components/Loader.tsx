import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.background, styles.container]} />
      <View style={styles.row}>
        <ActivityIndicator
          animating={true}
          size={'large'}
          color={MD2Colors.blue800}
          hidesWhenStopped={true}
        />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  background: {
    backgroundColor: '#eee',
    opacity: 0.5,
  },
  row: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1000,
  },
});
