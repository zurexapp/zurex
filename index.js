import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import analytics from '@react-native-firebase/analytics';

const Root = () => {
  useEffect(() => {
    // Lock orientation to portrait mode
    Orientation.lockToPortrait();

    // Initialize Firebase Analytics
    const initializeAnalytics = async () => {
      try {
        const appInstanceId = await analytics().getAppInstanceId();
        console.log('Firebase Analytics Instance ID:', appInstanceId);
      } catch (error) {
        console.error('Error getting App Instance ID:', error);
      }
    };

    initializeAnalytics();

    return () => {
      Orientation.unlockAllOrientations(); // Unlock orientations on unmount
    };
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
