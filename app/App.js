
import Welcome1 from './screens/welcome1';
import Welcome2 from './screens/welcome2';
import Login from './screens/login';
import Signup from './screens/Signup/signup';
import TextAnalysis from './screens/textanalysis';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../app/screens/splashscreen';
import Welcome3 from '../app/screens/welcome3';
import TermsModal from './screens/Signup/TermsModal';
import Privacypolicy from './screens/Signup/privacypolicy';
import FileAnalysis from './screens/fileanalysis';
import Home from './screens/home';

import SettingsScreen from './screens/setting';
import ProfileScreen from './screens/profile';
import NotificationsScreen from './screens/notification';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome1" component={Welcome1} />
        <Stack.Screen name="Welcome2" component={Welcome2} />
        <Stack.Screen name="Welcome3" component={Welcome3} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="TextAnalysis" component={TextAnalysis} />
        <Stack.Screen name="FileAnalysis" component={FileAnalysis} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
