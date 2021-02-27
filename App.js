import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
import Test from './store/Screens/Test'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ConfigureStore from './store/store/configureStore';
import List from './screens/List';
import { store, persistor } from './redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <List />
      </PersistGate>
    </Provider>
  );
};

export default App;
