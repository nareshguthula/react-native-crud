import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthScreen } from './screens';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <AuthScreen />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
