import { Button } from '@atoms';
import { Signup, LetsIn, OnboardingScreen } from '@screens';

import Icon from 'react-native-vector-icons/Feather';

import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Colors, SCREENS, StackParamList } from '@configs';

const Stack = createNativeStackNavigator<StackParamList>();
export interface OptionsType {
  arrow?: boolean;
  title?: string;
  headerShadowVisible?: boolean;
  headerShown?: boolean;
}

export function getOptions(param?: OptionsType) {
  return ({ navigation }: { navigation: any }) => {
    const options: NativeStackNavigationOptions = {
      headerStyle: { backgroundColor: Colors.white },
      title: param?.title || '',
      headerShown: param?.headerShown,
      headerShadowVisible: false,
      headerLeft: param?.arrow
        ? () => {
            return (
              <Button
                containerStyle={{
                  height: 'auto',
                  width: 50,
                  borderRadius: 0,
                }}
                style={{ paddingTop: 3 }}
                LEFT_ICON={<Icon size={20} name='arrow-left' />}
                color={Colors.black}
                onPress={() => navigation.goBack()}
              />
            );
          }
        : undefined,
    };

    return options;
  };
}
export type NavigationProps = NativeStackNavigationProp<StackParamList>;

const Application = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name={SCREENS.ONBOARDING}
          component={OnboardingScreen}
          options={getOptions({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name={SCREENS.LETSIN}
          component={LetsIn}
          options={getOptions({
            arrow: true,
          })}
        /> */}
        <Stack.Screen
          name={SCREENS.SINGUP}
          component={Signup}
          options={getOptions({
            arrow: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
