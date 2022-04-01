import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {Navigation} from './src/shared/navigation';
import {useColorScheme} from './src/shared/hook';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/redux/store';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  // Variable that holds color scheme
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
