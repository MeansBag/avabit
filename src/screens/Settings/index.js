import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Header, Menu, Text } from '../../components';
import { LOGOUT } from '../../config/actionTypes';
import { persistor } from '../../config/store';
import I18n from '../../language/i18n';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#59D8E8',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  networkNameContainer: {
    alignItems: 'center',
  },
  networkName: {
    color: '#fff',
    fontSize: 16,
  },
});

class Settings extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    network: PropTypes.string.isRequired,
  };

  getNetworkName = () => {
    switch (this.props.network) {
      case 'ropsten':
        return 'ETH Ropsten';
      case 'kovan':
        return 'ETH Kovan';
      case 'rinkeby':
        return 'ETH Rinkeby';
      default:
        return 'ETH Mainnet';
    }
  };

  menuOptions = [
    {
      title: I18n.t('change_pin'),
      onPress: () => {
        this.props.navigation.navigate('CreateWallet', {
          editMode: true,
        });
      },
    },
    // {
    //   title: 'Change network',
    //   onPress: () => {
    //     this.props.navigation.navigate('NetworkPicker');
    //   },
    // },
    {
      title: I18n.t('view_private_key'),
      onPress: () => {
        this.props.navigation.navigate('PrivateKey');
      },
    },
    {
      title: I18n.t('logout'),
      onPress: () => {
        Alert.alert(
          I18n.t('logout'),
          I18n.t('logout_alert'),
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                await this.props.logout();

                this.props.navigation.navigate('Welcome');
              },
            },
          ],
          { cancelable: false },
        );
      },
    },
  ];

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title={I18n.t('settings')}
          />
          <Menu options={this.menuOptions} />
          {/* <View style={styles.networkNameContainer}>
            <Text style={styles.networkName}>
              Connected to {this.getNetworkName()}
            </Text>
          </View> */}
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  network: state.network,
});

const mapDispatchToProps = dispatch => ({
  logout: async () => {
    dispatch({ type: LOGOUT });
    await persistor.flush();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
