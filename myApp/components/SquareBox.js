import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SquareBox = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: 'red' }]}>
        <Text style={styles.text}>Hello, world</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'green' }]}>
        <Text style={styles.text}>Hello, world</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'blue' }]}>
        <Text style={styles.text}>Hello, world</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center', // căn giữa dọc
    alignItems: 'center',     // căn giữa ngang
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default SquareBox;