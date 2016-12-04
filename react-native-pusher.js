'use strict';

const { NativeModules, Platform, PushNotificationIOS, Alert } = require('react-native');
const DeviceInfo = require('react-native-device-info');

const Pusher = NativeModules.RNPusher ;

const nativePusher = function(options) {
  const { deviceId, pusherKey } = options;
  const onRegister = (deviceToken) => {
    Pusher.registerWithDeviceToken(deviceToken);
  };
  const onRegistrationError = (error) => {
    console.error(error);
    Alert.alert('PN Error', error, [{text: 'OK', onPress: () => console.log('OK Pressed')},]);
  };

  return {
    register() {
      if (Platform.OS === 'ios' && DeviceInfo.isEmulator()) { return; }

      Pusher.pusherWithKey(pusherKey);
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addEventListener('register', onRegister);
        PushNotificationIOS.addEventListener('registrationError', onRegistrationError);

        PushNotificationIOS.requestPermissions();
      } else {
        Pusher.registerWithDeviceToken(deviceId);

        Pusher.requestPermissions(deviceId);
      }
    },

    unregister() {
      if (Platform.OS === 'ios' && DeviceInfo.isEmulator()) { return; }

      if (Platform.OS === 'ios') {
        PushNotificationIOS.removeEventListener('register', onRegister);
        PushNotificationIOS.removeEventListener('registrationError', onRegistrationError);
      }
    },

    subscribe(interest) {
      if (Platform.OS === 'ios' && DeviceInfo.isEmulator()) { return; }

      Pusher.subscribe(interest);
    },

    unsubscribe(interest) {
      if (Platform.OS === 'ios' && DeviceInfo.isEmulator()) { return; }

      Pusher.unsubscribe(interest);
    }
  };
}

module.exports = nativePusher;
