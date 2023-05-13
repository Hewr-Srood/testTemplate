import Application from './src/navigation/Application';

import * as React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';

enableFreeze(true);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Application />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
