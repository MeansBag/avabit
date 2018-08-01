import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView, StyleSheet, Vibration } from 'react-native';
//import { RNCamera } from 'react-native-camera';
import Camera from 'react-native-camera';
import { Header } from '../../components';
import I18n from '../../language/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    marginTop: 15,
  },
});

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          onBarCodeRead: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    scannedText: '',
  };

  // constructor(props) {
  //   super(props);
  //   //this.state = { showText: true }; // 每1000毫秒对showText状态做一次取反操作
  //   setInterval(() => { this.setState({
  //     			visible: true
  //     		});
  //   }, 50);
  // }

  // componentDidMount() {
  // 	setTimeout(() => {
  // 		this.setState({
  // 			visible: true
  // 		});
  // 	}, 50); // Delay 300 ms
  // }

  onBarCodeRead = e => {
    if (!this.state.scannedText) {
      this.setState(
        {
          scannedText: e.data,
        },
        () => {
          if (Platform.OS === 'ios') {
            Vibration.vibrate(500, false);
          } else {
            Vibration.vibrate([0, 500], false);
          }
          this.props.navigation.state.params.onBarCodeRead(
            this.state.scannedText,
          );
          this.props.navigation.goBack();
        },
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={I18n.t('qr_scan')}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <Camera onBarCodeRead={this.onBarCodeRead} style={styles.preview} />
      </SafeAreaView>
    );
  }
}
