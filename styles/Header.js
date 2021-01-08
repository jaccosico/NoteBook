import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { stylesheet, colors } from './globalStyles';

export default function Header({ title }) {
  return (
    <View style={stylesheet.headerTitle}>
       <Image size={20}
        color={colors.dark} style={styles.icon}
        source = {require('../assets/header.png')}
        />
      <Text style={stylesheet.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop:1,
    marginRight: 4,
  },
});
