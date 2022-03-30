import {Provider} from 'react-redux';
import React from 'react';
import {store} from './src/redux/store';
import {Navigation} from './src/shared/navigation';
import {useColorScheme} from './src/shared/hook';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
