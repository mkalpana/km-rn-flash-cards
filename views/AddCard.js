import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Input } from '../components';
import { addCard, fetchDecks } from '../actions';
import { connect } from 'react-redux';
import { get } from 'lodash';

class AddCard extends Component{
  state = {
    title: '',
    question: '',
    answer: ''
  };

  _onAddCard = () => {
    const { question, answer } = this.state;
    const { title } = this.props;
    this.props.addCard(title, { question, answer })
      .then(() => {
        this.props.fetchDecks();
        this.setState({ question: '', answer: '' });
        this.props.navigation.navigate('Deck', { title });
      });
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Input
          style={styles.inputs}
          placeholder="Enter question"
          value={this.state.question}
          onChangeText={(question) => this.setState({ question })}
        />
        <Input
          style={styles.inputs}
          placeholder="Enter answer"
          value={this.state.answer}
          onChangeText={(answer) => this.setState({ answer })}
        />
        <Button
          style={styles.btnStyle}
          label="Submit"
          disabled={!question || !answer}
          onPress={this._onAddCard} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  inputs: {
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  btnStyle: {
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  }
});

AddCard.propTypes = {
  title: PropTypes.string.isRequired,
  addCard: PropTypes.func.isRequired,
  fetchDecks: PropTypes.func.isRequired,
};

AddCard.defaultPropTypes = {
  title: ''
};

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const title = get(navigation, 'state.params.title', '');
  return {
    title
  };
};

export default connect(mapStateToProps, {
  addCard,
  fetchDecks
})(AddCard);
