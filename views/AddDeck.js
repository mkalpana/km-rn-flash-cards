import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Input } from '../components';
import { saveDeckTitle } from '../utils/storage';
import { fetchDecks } from '../actions';
import { connect } from 'react-redux';

class AddDeck extends Component{
  state = {
    title: ''
  }

  _onSaveDeck = () => {
    saveDeckTitle(this.state.title)
      .then(() => {
        this.props.fetchDecks();
        this.setState({ title: '' });
        this.props.navigation.navigate('Decks');
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.description}>What is the title of your new deck?</Text>
        <Input
          placeholder="Deck Title"
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        />
        <Button
          style={styles.btnStyle}
          label="Submit"
          onPress={this._onSaveDeck}
          disabled={this.state.title === ''}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  description: {
    fontSize: 30,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
    textAlign: 'center'
  },
  btnStyle: {
    marginTop: 40,
    marginBottom: 10
  }
});

AddDeck.propTypes = {
  fetchDecks: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, { fetchDecks })(AddDeck);
