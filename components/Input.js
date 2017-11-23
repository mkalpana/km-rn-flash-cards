import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { black } from '../utils/colors';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { placeholder, value, onChangeText, style } = this.props;
    return (
      <TextInput
        style={[ styles.input, style ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        required
      />
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  style: PropTypes.any,
};

Input.defaultPropTypes = {
  value: ''
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: black,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 10
  }
});