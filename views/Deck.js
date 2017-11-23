import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { fetchDeck } from '../actions';
import { connect } from 'react-redux';
import { grey, black, white, transparent } from '../utils/colors';
import { Button } from '../components';
import { get } from 'lodash';

class Deck extends Component{
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title}`
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const title = get(navigation, 'state.params.title', '');
    if (title) {
      this.props.fetchDeck(title);
    }
  }

  render() {
    const { deck, navigation } = this.props;
    return (deck && deck.title && deck.questions &&
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckQuestionCount}>{deck.questions && deck.questions.length} cards</Text>
        </View>
        <View style={styles.inputContainer}>
          <Button
            style={styles.btnStyle}
            label="Add Card"
            buttonStyle={{ backgroundColor: transparent, borderWidth: 2, borderColor: black }}
            buttonTextStyle={{ color: black }}
            onPress={() => navigation.navigate('AddCard', { title: deck.title })}
          />
          { deck.questions.length > 0 && (
            <Button
              style={styles.btnStyle}
              label="Start Quiz"
              onPress={() => navigation.navigate('Quiz', { title: deck.title })}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  deckTitle: {
    padding: 10,
    fontSize: 40,
    color: black,
    alignSelf: 'center'
  },
  deckQuestionCount: {
    padding: 10,
    fontSize: 20,
    color: grey,
    alignSelf: 'center'
  },
  btnStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40
  }
});

Deck.propTypes = {
  deck: PropTypes.object.isRequired,
  fetchDeck: PropTypes.func.isRequired,
};

Deck.defaultPropTypes = {
  deck: {}
};

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const title = get(navigation, 'state.params.title', '');
  const decksList = state.decks;
  return {
    deck: title ? decksList[title] : {}
  };
};

export default connect(mapStateToProps, {
  fetchDeck
})(Deck);