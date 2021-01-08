import React, { useState, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { stylesheet, colors } from '../styles/globalStyles';
import Template from '../styles/Template';
import CardNote from '../styles/CardNote';

export default function NoteDetails({ navigation }) {
  let subject = navigation.getParam('subject');
  let schedule = navigation.getParam('schedule');
  let professor = navigation.getParam('professor');
  let topic = navigation.getParam('topic');
  let notes = navigation.getParam('notes');

  return (
    <View style={styles.container}>
      <Template>
        <ScrollView>
          {subjectText(subject)}

          <View style={styles.line}>
            <MaterialIcons
              name="schedule"
              size={20}
              color={colors.dark}
              style={styles.icon}
            />
            <Text style={styles.subTitle}>Schedule: </Text>
            {scheduleText(schedule)}
          </View>

          <View style={styles.line}>
            <MaterialIcons
              name="account-circle"
              size={20}
              color={colors.dark}
              style={styles.icon}
            />
            <Text style={styles.subTitle}>Professor: </Text>
            {professorText(professor)}
          </View>
        </ScrollView>
      </Template>

      <View style={styles.container}>
        <CardNote>
         {topicText(topic)}
          <ScrollView style={{ marginBottom: 48 }}>
            {noteText(notes)}
          </ScrollView>
        </CardNote>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: colors.dark,
    alignSelf: 'center',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    fontSize: 14,
  },
  paragraph: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    width: '65%',
  },
  line: {
    flexDirection: 'row',
    lineHeight: 20,
    marginVertical: 2,
    alignItems: 'flex-start',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  noteParagraph: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30,
  },
});

const subjectText = (subject) => {
  if (subject !== '') return <Text style={styles.title}>{subject}</Text>;
  else return <Text style={{ ...styles.title, color: colors.empty }}>No Subject</Text>;
};

const scheduleText = (schedule) => {
  if (schedule !== '') return <Text style={{ ...styles.paragraph, textTransform: 'uppercase' }}>{schedule}</Text>;
  else return <Text style={{ ...styles.paragraph, color: colors.empty }}>None</Text>;
};

const professorText = (professor) => {
  if (professor !== '') return <Text style={styles.paragraph}>{professor}</Text>;
  else return <Text style={{ ...styles.paragraph, color: colors.empty }}> None</Text>;
};

const topicText = (topic) => {
  if (topic !== '') return <Text style={styles.title}>{topic}</Text>;
  else return <Text style={{ ...styles.title, color: colors.empty }}>Untitled</Text>;
};

const noteText = (notes) => {
  if (notes !== '') return <Text style={styles.noteParagraph}>{notes}</Text>;
  else return null;
};