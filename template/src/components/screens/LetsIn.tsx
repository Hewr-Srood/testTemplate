import { NavigationProps } from '../../navigation/Application';
import { Button, Text, SCREEN, Row } from '@atoms';
import { AppleIcon, FacebookIcon, GoogleIcon, LetsInSVG } from '@svg';

import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Colors,
  FontWeight,
  ResponsiveUnit,
  SCREENS,
  SCREEN_HEIGHT,
  colors,
  sizing,
} from '@configs';

interface LetsInProps {
  navigation: NavigationProps;
}
const buttonProps = {
  textProps: {
    fontWeight: FontWeight.semiBiold,
  },
  color: Colors.grey,
  textColor: Colors.black,
};
export const LetsIn: FC<LetsInProps> = ({ navigation }) => {
  return (
    <SCREEN style={styles.container}>
      <View style={{ gap: 20, alignItems: 'center' }}>
        <View
          style={{
            height: SCREEN_HEIGHT * 0.2,
            aspectRatio: 4 / 3,
          }}>
          <LetsInSVG />
        </View>
        <Text size={'H1'} fontWeight={FontWeight.bold}>
          Let's you in
        </Text>
        <View style={styles.buttonContainer}>
          <Button {...buttonProps} title='Continue with Facebook' LEFT_ICON={<FacebookIcon />} />
          <Button {...buttonProps} title='Continue with Google' LEFT_ICON={<GoogleIcon />} />
          <Button {...buttonProps} title='Continue with Apple' LEFT_ICON={<AppleIcon />} />
        </View>
        <View style={styles.orContainer}>
          <View style={styles.bar} />
          <Text fontWeight={FontWeight.semiBiold} color={Colors.darkGrey}>
            or
          </Text>
          <View style={styles.bar} />
        </View>
        <Button
          color={Colors.primary}
          textColor={Colors.white}
          textProps={{
            fontWeight: FontWeight.semiBiold,
          }}
          title='Login with email'
        />
        <Row gap={5}>
          <Text color={Colors.light}>Don’t have an account?</Text>
          <Button
            containerStyle={{ width: 'auto', height: 'auto' }}
            style={{ width: 'auto' }}
            onPress={() => {
              navigation.navigate(SCREENS.SINGUP);
            }}
            title=' Sign up'
          />
        </Row>
      </View>
    </SCREEN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },

  buttonContainer: {
    gap: ResponsiveUnit(12),
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sizing.screen.width * 0.9,
    gap: 10,
  },
  bar: {
    backgroundColor: '#EEEEEE',
    width: '45%',
    height: 1,
  },
  buttonBlue: {
    backgroundColor: colors.primary,
  },
  footerContainer: {
    // gap: 1,
    justifyContent: 'center',
  },
  text: { color: colors.primary },
  grayText: { color: '#9E9E9E' },
});
