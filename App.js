import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { clearItems } from './utils/storage';
import { Provider } from 'react-redux';
import store from './utils/reduxStore';
import { setLocalNotification } from './utils/notification';
import { Tabs } from './utils/navigation';


export default class App extends React.Component {
  componentDidMount() {
    // clearItems();
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar hidden={false} />
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginTop: 20
  },
});
