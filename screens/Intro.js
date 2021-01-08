import React, { useRef, useEffect, Component } from 'react';
import { Animated, Text, View, Image } from 'react-native';
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver:true,
      }
    ).start();
  }, [fadeAnim])
  return (
    <Animated.View                 
      style={{
        ...props.style,
        opacity: fadeAnim,         
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default class Intro extends Component{

  componentDidMount () {
    setTimeout(() => {
     this.props.navigation.replace("Notes");
    }, 2000)
  }

  render(){
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView style={{width: 150, height: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{height: 150, width: 150, resizeMode: "contain"}}
        source = {require('../assets/intro.png')}
        />
      </FadeInView>
    </View>
  );
}}