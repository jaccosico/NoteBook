import { StyleSheet } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

export const showAlertMessage = (message, type, position) => {
  showMessage({
    message,
    type,
    position,
  });
};

export const colors = {
  primary: '#FFE66D' /* Naples Yellow */,
  secondary: '#A7FF83' /* Mint Green */,
  light: '#4ECDC4' /* Medium Turquoise */,
  dark: '#1A535C' /* Midnight Green Eagle Green */,
  gray: '#BDC3C7' /* Silver */,
  white: '#FFFFFF',
  black: '#000000',
  empty: '#8F8E8B' /* Oslo Gray */,
};

export const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.dark,
  },
  addButton: {
    position: 'absolute',
    right: 40,
    bottom: 40,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});
