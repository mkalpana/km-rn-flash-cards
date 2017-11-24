import React, { Component } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDecks } from '../actions';
import { Button, Input } from '../components';
import { saveDeckTitle } from '../utils/storage';
import { transparent } from '../utils/colors';

export class AddDeck extends Component{
  state = {
    title: ''
  }

  _onSaveDeck = () => {
    const { title } = this.state;
    saveDeckTitle(title)
      .then(() => {
        this.props.fetchDecks();
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'DeckList'}),
            NavigationActions.navigate({ routeName: 'Deck', params: { title }})
          ]
        })
        this.props.navigation.dispatch(resetAction);
        this.setState({ title: '' });
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.description}>What is the title of your new deck?</Text>
        <Input
          underlineColorAndroid={transparent}
          placeholder="Deck Title"
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        />
        <Button
          style={styles.btnStyle}
          label="Create Deck"
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
