import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
// Image,
import PropTypes from 'prop-types';
import { Text } from '../../components';
import I18n from '../../language/i18n';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderTopColor: '#3C3749',
    borderTopWidth: 2,
    flexDirection: 'row',
    width: '100%',
  },
  buttonIcon: {
    height: 18,
    width: 18,
  },
  buttonText: {
    color: '#9D9D9D',
    paddingTop: 5,
  },
  button: {
    alignItems: 'center',
    borderColor: '#3C3749',
    paddingVertical: 15,
    width: '50%',
  },
  AssetButton: {
    borderRightWidth: 1,
  },
  InfoButton: {
    borderLeftWidth: 1,
  },
});

export default class FootTab extends Component {
  static propTypes = {
    onAssetPress: PropTypes.func.isRequired,
    onInfoPress: PropTypes.func.isRequired,
  };

  render() {
    const { onAssetPress, onInfoPress } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onAssetPress}
          style={[styles.button, styles.sendButton]}
        >
          {/* <Image style={styles.buttonIcon} source={sendIcon} /> */}
          <Text style={styles.buttonText}>{I18n.t('asset')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onInfoPress}
          style={[styles.button, styles.receiveButton]}
        >
          {/* <Image style={styles.buttonIcon} source={qrcodeIcon} /> */}
          <Text style={styles.buttonText}>{I18n.t('info')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
