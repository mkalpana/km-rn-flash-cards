import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { DeckList, AddDeck, Deck, AddCard, Quiz } from '../views';

export const Stack = StackNavigator({
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

export const Tabs = TabNavigator({
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