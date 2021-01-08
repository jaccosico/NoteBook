import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { stylesheet, colors } from './globalStyles';

export default function NextHeader({ title }) {
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerText} numberOfLines={1} lineBreakMode="tail">
        {title}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Platform.OS == 'ios' ? 'center' : 'flex-start',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.dark,
    letterSpacing: 0.25,
    width: '75%',
  },
});
