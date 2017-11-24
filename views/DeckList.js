import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { grey } from '../utils/colors';
import { fetchDecks } from '../actions';
import { connect } from 'react-redux';

export class DeckList extends Component{
  componentDidMount() {
    this.props.fetchDecks();
  }

  renderCard = (deck) => {
    const { navigation } = this.props;
    return (deck && deck.title && deck.questions &&
      <TouchableOpacity onPress={() => navigation.navigate('Deck', { title: deck.title })}>
        <View key={deck.title} style={styles.card}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.cardCount}>{deck.questions && deck.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item }) => this.renderCard(item)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  deckTitle: {
    color: 'black',
    fontSize: 40,
  },
  cardCount: {
    color: 'grey',
    fontSize: 16,
  }
});

DeckList.propTypes = {
  decks: PropTypes.array.isRequired,
  fetchDecks: PropTypes.func.isRequired,
};

DeckList.defaultPropTypes = {
  decks: []
};

const mapStateToProps = (state) => {
  const decksList = state.decks;
  const decks = Object.keys(decksList).map(title => decksList[title]);
  return { decks };
};

export default connect(mapStateToProps, {
  fetchDecks
})(DeckList);

