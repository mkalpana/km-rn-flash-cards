import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../components';
import { fetchDeck } from '../actions';
import { connect } from 'react-redux';
import { blue, black, green, red } from '../utils/colors';
import { get } from 'lodash';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

const INITIAL_STATE = {
  currentQuestionIndex: 0,
  correctAnswers: 0,
  showQuestion: true
};

class Quiz extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { navigation } = this.props;
    clearLocalNotification()
      .then(setLocalNotification);
    const title = get(navigation, 'state.params.title', '');
    if (title) {
      this.props.fetchDeck(title);
    }
  }

  _onAnswer = (correct) => {
    this.setState(state => ({
      showQuestion: true,
      correctAnswers: correct ? state.correctAnswers + 1 : state.correctAnswers,
      currentQuestionIndex: state.currentQuestionIndex + 1,
    }));
  };

  resetQuiz = () => {
    this.setState(INITIAL_STATE);
  };

  renderQuestion = (question, index) => {
    const { deck } = this.props;
    const { showQuestion, currentQuestionIndex } = this.state;
    const showCurrentQuestion = currentQuestionIndex <= deck.questions.length - 1 && currentQuestionIndex  === index;
    return ( showCurrentQuestion &&
      <View key={index} style={styles.container}>
        <Text style={styles.questionNumber}>{index+1} / {deck.questions.length} </Text>
        <View style={styles.textContainer}>
          { showQuestion ? (
            <View>
              <Text style={styles.textStyle}>{question.question}</Text>
              <Text style={styles.textBtnStyle} onPress={() => this.setState({ showQuestion: false })}>
                Answer
              </Text>
            </View>
          ): (
            <View>
              <Text style={styles.textStyle}>{question.answer}</Text>
              <Text style={styles.textBtnStyle} onPress={() => this.setState({ showQuestion: true })}>
                Question
              </Text>
            </View>
          )}
        </View>
      <View style={styles.inputContainer}>
        <Button
          style={styles.btnStyle}
          buttonStyle={{ backgroundColor: green, borderWidth: 0 }}
          label="Correct"
          onPress={() => this._onAnswer(true)}
        />
        <Button
          style={styles.btnStyle}
          buttonStyle={{ backgroundColor: red, borderWidth: 0 }}
          label="Incorrect"
          onPress={() => this._onAnswer(false)}
        />
      </View>
    </View>
    )
  };

  resultsScreen = () => {
    const { deck, navigation } = this.props;
    const { currentQuestionIndex, correctAnswers } = this.state;
    if (currentQuestionIndex === deck.questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.resultTextStyle}>
              You have completed the quiz!
            </Text>
            <Text style={styles.resultTextStyle}>
              You scored {correctAnswers}/{deck.questions.length} questions correctly!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Button
              style={styles.btnStyle}
              label="Retry Quiz"
              onPress={this.resetQuiz}
            />
            <Button
              style={styles.btnStyle}
              label="Back to Deck"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      )
    }
  };

  render() {
    const { deck } = this.props;

    // No questions in deck
    if (!deck || !deck.questions || !deck.questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text>Sorry there are no questions in this deck.</Text>
        </View>
      );
    }

    // Show questions in the deck.
    return (
      <View style={styles.container}>
        { deck.questions.map((question, index) => this.renderQuestion(question, index)) }
        { this.resultsScreen() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  questionNumber: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    padding: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  btnStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  textStyle: {
    color: black,
    fontSize: 36,
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  textBtnStyle: {
    color: blue,
    fontSize: 24,
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  resultTextStyle: {
    color: black,
    fontSize: 16,
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
});

Quiz.propTypes = {
  deck: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  fetchDeck: PropTypes.func.isRequired,
};

Quiz.defaultPropTypes = {
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
})(Quiz);