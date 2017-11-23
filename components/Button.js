import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { black, white } from '../utils/colors';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { buttonStyle, buttonTextStyle, label, onPress, style, ...rest } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} {...rest}>
          <View style={[ styles.button, buttonStyle ]}>
            <Text style={[ styles.buttonText, buttonTextStyle ]}>{label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  style: PropTypes.any,
};

Button.defaultProps = {
  buttonColor: black,
  buttonTextColor: white,
  style: {}
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: black,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: black,
  },
  buttonText: {
    fontSize: 20,
    color: white,
    textAlign: 'center'
  }
});