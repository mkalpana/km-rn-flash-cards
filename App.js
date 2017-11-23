import React from 'react';
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
import { DeckList, AddDeck, Deck, AddCard, Quiz } from './views';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { clearItems } from './utils/storage';
import { Provider } from 'react-redux';
import store from './utils/reduxStore';
import { setLocalNotification } from './utils/notification';

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
});

const Tabs = TabNavigator({
  Decks: {
    screen: Stack,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => (<Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} size={32} color={tintColor} />)
    }
  },
  NewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => (<Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} size={32} color={tintColor} />)
    }
  }
}, {
  swipeEnabled: true,
  lazy: false,
});

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
