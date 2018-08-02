/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null

    }
  }

  render() {
    return (
        <View style={Style.rootContainer}>
            <View style={Style.displayContainer}>
              <Text style={Style.displayText}>{this.state.inputValue}</Text>
            </View>
            <View style={Style.inputContainer}>
              {this._renderInputButtons()}
            </View>
        </View>
    )
  }

      /**
     * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
     */
    _renderInputButtons() {
      let views = [];

      for (var r = 0; r < inputButtons.length; r ++) {
          let row = inputButtons[r];

          let inputRow = [];
          for (var i = 0; i < row.length; i ++) {
              let input = row[i];

              inputRow.push(
                  <InputButton 
                    value={input} 
                    highlight={this.state.selectedSymbol === input}
                    onPress={this._onInputButtonPressed.bind(this, input)} 
                    key={r + "-" + i} 
                  />
              );
          }

          views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
      }

      return views;
  }

  _onInputButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this._handleNumberInput(input);
      case 'string':
        return this._handleStringInput(input);
    }
}

_handleNumberInput(num) {
  let inputValue = (this.state.inputValue * 10) + num;

  this.setState({
    inputValue: inputValue
  });
}

_handleStringInput(str) {
  switch (str) {
    case '/':
    case '*':
    case '+':
    case '-':
      this.setState({
        selectedSymbol: str,
        previousInputValue: this.state.inputValue,
        inputValue: 0
      });

      case '=':
        let symbol = this.state.selectedSymbol,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;

          if  (!symbol) {
            return;
          }

          this.setState({
            previousInputValue: 0,
            inputValue: eval(previousInputValue + symbol + inputValue),
            selectedSymbol: null
          });
      break;
  }
}

}

export default App;

/* const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}); */
