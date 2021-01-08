import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from './globalStyles';

export default function Template(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {props.children}
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  card: {
    height: '21%',
    borderRadius: 15,
    elevation: 3,
    backgroundColor: colors.white,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding:5,
  },
});